# KBR — Auditoria de concorrência e sincronização (Fase 4D.1)

**Data:** 10 de novembro de 2026
**Escopo:** auditoria do código real, sem aplicar migração, sem tocar no banco de produção e sem implementar o redesenho.
**Base auditada:** `HEAD` = `9ed6bf5` (`docs: record phase 4C course completion`).

## 1. Método e limites

Foram lidos o código de storage, o adapter Supabase, o `AuthProvider`, o scheduler Leitner, o fluxo de revisão, os players, a migração SQL, os testes pgTAP e os testes Vitest existentes. As conclusões abaixo distinguem:

- **Confirmado no código:** o caminho existe e pode ser reproduzido por leitura ou por teste puro.
- **Confirmado sob condição:** depende de duas sessões, relógio divergente, falha de rede etc.
- **Não verificado neste ambiente:** atomicidade real do PostgreSQL/Supabase, RLS em execução e fluxo com dois dispositivos reais. Não há Supabase CLI nem stack local configurada; o mock de e2e não persiste dados remotos (`e2e/mock-supabase.mjs:101-104` devolve `[]`).

Nenhuma migração foi executada. Nenhum dado de produção foi lido ou alterado.

## 2. Arquitetura atual, como está no código

### 2.1 Persistência

`Progress` v1 (`src/lib/storage/index.ts:17-25`) é um único documento JSON:

```ts
{
  v: 1,
  lessons: Record<id, { done: boolean; score: number }>,
  cards: Record<id, { box: 1..5; due: ISO }>,
  history: { exerciseId: string; correct: boolean; at: ISO }[],
  streak: number,
  dailyGoal: number,
  lastActive: ISO
}
```

O PostgreSQL guarda exatamente esse documento em `public.user_progress.progress` (`supabase/migrations/20261110120000_create_user_progress.sql:1-10`):

```sql
user_id uuid primary key references auth.users (id) on delete cascade,
progress jsonb not null,
sync_id uuid not null,
updated_at timestamptz not null default now()
```

Há uma linha por usuário. RLS limita SELECT/INSERT/UPDATE/DELETE ao próprio `auth.uid()`; `anon` não tem privilégio de tabela (`:12-36`).

### 2.2 Fluxo de login e hidratação

`AuthProvider` (`src/components/auth/AuthProvider.tsx:60-91`):

1. Sem usuário: usa `createLocalStorageStore(window.localStorage)` na chave `kbr:v1` (convidado).
2. Com usuário: cria o store local da conta (`kbr:user:<uuid>:v1`) e chama `syncProgressForUser`.
3. `syncProgressForUser` (`src/lib/storage/syncProgress.ts:42-72`):
   - carrega convidado e cache da conta;
   - se o convidado tem dados e o marcador `kbr:migrated:<uuid>:v1` não corresponde ao snapshot, faz `mergeProgress(account, guest)`;
   - lê o remoto;
   - faz `mergeProgress(local, remote)`;
   - grava o resultado no cache da conta;
   - faz upsert do snapshot inteiro no remoto;
   - só então grava o marcador de migração.
4. Depois do sync inicial, o `AuthProvider` cria `createSyncedProgressStore(local, remote)`.
5. Cada página chama `progressStore.load()` ao montar. O store sincronizado **lê o remoto de novo**, faz merge local+remoto, grava o cache local e, se `JSON.stringify(merged) !== JSON.stringify(remoteProgress)`, faz outro upsert remoto (`src/lib/storage/syncedProgressStore.ts:16-42`).

### 2.3 Escrita durante a sessão

Cada resposta de exercício, revisão ou conclusão gera um novo `Progress` imutável e chama `progressStore.save(next)`:

- `LessonPlayer.tsx:61-73, 91-97, 108-110`;
- `CheckpointPlayer.tsx:65-75` (mesmo padrão);
- `ReviewArea.tsx:86-99, 129-137`;
- `DashboardArea.tsx` apenas lê.

`createSyncedProgressStore.save` (`syncedProgressStore.ts:44-62`) grava primeiro no localStorage e depois chama `remote.save(progress)`. O adapter remoto (`supabaseProgressStore.ts:35-48`) faz um **upsert do documento inteiro**:

```ts
supabase.from("user_progress").upsert(
  { user_id: userId, progress, sync_id: syncId(), updated_at: now().toISOString() },
  { onConflict: "user_id" },
);
```

Não há leitura, versão esperada, `WHERE` condicional, transação, retry de conflito nem merge na gravação. `sync_id` é gerado a cada escrita, mas **nunca é lido de volta**; `updated_at` usa o relógio do cliente.

### 2.4 Leitner e histórico

- `leitner.review` (`src/lib/srs/leitner.ts:12-21`) produz `{ box, due }`: acerto avança até 5; erro volta à caixa 1; `due = now + [1,2,4,8,16][box-1]` dias.
- `SrsState` não guarda o instante da revisão. O instante é inferível por `due - intervalo[box-1]` para todo estado produzido pelo Leitner, mas o código não faz essa inferência.
- `scheduleMissedReview` (`src/lib/srs/cards.ts:82-100`) cria/atualiza cartões por erro de lição, mas **não** registra uma tentativa `review:<cardId>` no histórico.
- `applyReview` (`src/lib/review/index.ts:329-350`) atualiza o cartão e acrescenta `history` com `exerciseId: "review:<cardId>"`.
- `recordAttempt` (`src/lib/progress/lesson.ts:196-210`) acrescenta `{ exerciseId, correct, at }` sem ID estável de tentativa.
- `completeLesson`/`completeCheckpoint` (`lesson.ts:173-237`) usam `done: previous.done || passed` e `score: Math.max(previous.score, result.score)`.

## 3. Comportamento por operação

| Operação | O que o código faz | Risco de integridade |
|---|---|---|
| Login inicial | Lê cache local + remoto, faz merge e upsert do documento inteiro | Leitura-modificação-escrita não atômica; duas sessões podem perder a primeira |
| Migração de convidado | Merge conta+convidado antes do remoto; marcador só após sucesso | Retry é idempotente para lições/histórico, mas cartões podem regredir pelo merge atual |
| Leitura remota | `select progress` por `user_id` | OK; valida `isProgress` e falha fechado |
| Escrita remota | Upsert integral, sem versão esperada | Última escrita vence; perde alterações de outra sessão |
| Escrita local | Sempre primeiro, mesmo se o remoto falhar | OK, é a base do local-first |
| Merge | Lições: união + `done OR` + maior score; cartões: lado inteiro mais recente por `lastActive`; histórico: união por tupla | Cartões podem regredir; ordem do histórico não é canônica em empates |
| Sessões concorrentes | Nenhum lock, canal ou versão compartilhada | Perda silenciosa de lições, scores, cartões e histórico |
| Edição offline | Fica no localStorage; status `offline` | Ao reconectar sem recarregar, o próximo save sobrescreve o remoto com snapshot antigo |
| Retry após falha | Próximo save ou próximo load tenta de novo; sem backoff/limite | Se o response se perdeu, o upsert repetido é idempotente no documento; sem detecção de conflito |
| Logout/login | Caches por usuário permanecem; novo login refaz merge | Pode reaplicar cache antigo; cartões podem regredir |
| Estado local velho | Componentes carregam uma vez e mantêm `progressRef` | Save posterior sobrescreve o remoto sem perceber |
| Tentativas duplicadas | Dedup por `exerciseId + at + correct` | Retry do mesmo snapshot não duplica; não há ID estável para o mesmo ato lógico |
| Mesmo cartão em duas sessões | Cada uma calcula a partir da própria base; merge escolhe um lado | Uma das revisões é descartada do estado Leitner |
| Relógio divergente | `lastActive` e `updated_at` vêm do cliente | Decide o vencedor do merge e pode inverter a ordem real |
| Duas abas no mesmo navegador | Cada aba tem seu `AuthProvider`/store; não há `storage` event nem BroadcastChannel | Mesmo usuário, mesma máquina, última aba vence |
| Duplicidade de retry | Snapshot inteiro, não append no servidor | Sem duplicação hoje; um RPC que appendasse tentativas precisaria de chave de idempotência |

## 4. Defeitos confirmados

### C1 — Upsert integral sem controle de concorrência (crítico)

**Evidência:** `src/lib/storage/supabaseProgressStore.ts:35-48`, `syncedProgressStore.ts:44-62`.

Toda gravação substitui o documento inteiro. Não há `WHERE sync_id = ...`, revisão ou transação. Duas sessões que carregaram o mesmo snapshot podem gravar em sequência; a segunda apaga qualquer alteração da primeira.

**Cenário confirmado (duas lições):**

1. 10:00 — dispositivos A e B carregam o remoto `{ h01 }`.
2. 10:05 — A conclui `h02` e grava `{ h01, h02 }`.
3. 10:06 — B conclui `h03` e grava `{ h01, h03 }` (seu snapshot não tinha `h02`).
4. O remoto agora só tem `h01, h03`. O `h02` de A não está no remoto nem no cache de B.

A perda remota é **recuperável apenas se** o cache local de A sobreviver e A sincronizar de novo. Se A limpar o navegador, nunca mais abrir ou tiver o cache sobrescrito, `h02` está perdido. O `h02` também não aparece no painel de B. Não é uma perda atômica no banco; é uma perda de conteúdo por última-escrita-vence.

### C2 — Merge de login também é leitura-modificação-escrita (crítico)

**Evidência:** `src/lib/storage/syncProgress.ts:52-69`; `syncedProgressStore.ts:19-33`.

Mesmo que o merge fosse perfeito, ele ocorre antes do upsert. Duas sessões que leem o mesmo remoto e gravam em seguida ainda competem: a segunda substitui o resultado da primeira. `sync_id` não é usado como token; `updated_at` não é comparado nem é confiável (relógio do cliente).

**Cenário confirmado (primeiro login simultâneo):**

1. A e B têm convidados diferentes (`h01` e `h02`) e o remoto está vazio.
2. Ambos leem vazio, cada um faz seu merge local e grava.
3. O último upsert vence. O primeiro só pode recuperar na próxima sincronização se seu cache local ainda tiver os dados.

### C3 — Merge de cartões usa o documento inteiro, não o cartão (crítico)

**Evidência:** `src/lib/storage/mergeProgress.ts:3-10, 22-33`.

`recentSide` compara `lastActive` e, se um lado for "mais recente", **todos** os cartões desse lado substituem os do outro. Não há timestamp por cartão. Uma atividade posterior em qualquer lição pode fazer um cartão antigo vencer uma revisão mais nova.

**Cenário confirmado (revisão perdida de forma persistente):**

1. 10:00 — A erra o cartão `h:syl:가`; estado `{ box: 1, due: 11/11 10:00 }`.
2. 11:00 — B acerta o mesmo cartão; estado `{ box: 3, due: 14/11 11:00 }`; `lastActive` de B = 11:00.
3. 12:00 — A conclui `h20`; `lastActive` de A = 12:00, mas o cartão de A continua o de 10:00.
4. 12:30 — B recarrega. O merge escolhe o lado A (12:00 > 11:00) e descarta o `box: 3` de B. O cache local de B é sobrescrito pelo resultado; a revisão de 11:00 só sobrevive como `Attempt` no histórico, não como agenda Leitner.

Este é o caso mais grave: não é apenas perda remota temporária; o estado novo de B é descartado no merge e pode não existir em nenhum cache depois da gravação.

### C4 — Relógio do cliente decide o vencedor (alto)

**Evidência:** `mergeProgress.ts:8-9`; `recordAttempt`/`applyReview`/`completeLesson` usam `new Date()`; `supabaseProgressStore.ts:43` grava `updated_at` com o relógio do cliente.

Se o relógio de A estiver 10 minutos adiantado, uma revisão antiga de A pode ter `lastActive` maior que uma revisão nova de B e vencer o merge. O `updated_at` remoto também fica no futuro/passado, então não serve como versão confiável. O banco só usa `default now()` quando o cliente não envia o campo; o adapter sempre envia.

### C5 — Revisões concorrentes do mesmo cartão não são compostas (alto)

**Evidência:** `mergeProgress.ts:22-33`; `applyReview` calcula a partir de uma única base local.

Duas sessões revisam o mesmo cartão a partir da mesma base. Exemplo: base `box: 2`; A acerta e calcula `box: 3`; B erra e calcula `box: 1`. O merge escolhe um dos estados. O resultado não é a aplicação sequencial dos dois eventos (que deveria terminar em `box: 2` se B errou e A acertou depois). Sem log de eventos/base por ação, o `Progress` v1 não consegue compor as duas ações.

### C6 — Comparação de igualdade por `JSON.stringify` é sensível à ordem das chaves (médio)

**Evidência:** `syncedProgressStore.ts:25`.

O remoto é `jsonb`; o PostgreSQL normaliza a ordem das chaves. O objeto local preserva a ordem de inserção. `JSON.stringify(merged) !== JSON.stringify(remote)` pode ser verdadeiro mesmo com conteúdo semanticamente igual, provocando um upsert extra em cada carga. Esse upsert extra, combinado com C1, aumenta a janela de sobrescrita. Não é perda de dados por si só, mas é um gerador desnecessário de escritas.

### C7 — Sem ID estável de tentativa (latente)

**Evidência:** `Progress.history` (`storage/index.ts:11-15`); dedup em `mergeProgress.ts:35-40`.

A identidade é `(exerciseId, at, correct)`. Retentativas do mesmo snapshot são idempotentes porque o documento é substituído inteiro, não concatenado no servidor. Porém:

- o mesmo ato lógico re-serializado com outro timestamp vira outra tentativa;
- duas tentativas legítimas no mesmo milissegundo, mesmo exercício e mesmo resultado colapsam em uma;
- um RPC futuro que appendasse tentativas precisaria de idempotency key.

Não há evidência de perda atual por esse caminho; é uma limitação de modelo.

### C8 — Duas abas do mesmo navegador não se coordenam (alto)

**Evidência:** ausência de listener de `storage`, `BroadcastChannel` ou lock; cada `AuthProvider` cria seu próprio store (`AuthProvider.tsx:60-91`); `activeSyncs` (`syncProgress.ts:15`) só deduplica dentro do mesmo realm JavaScript.

Duas abas da mesma conta podem carregar o mesmo snapshot e gravar uma sobre a outra. Não é um cenário exótico: abrir a lição em duas abas é comum.

### C9 — Falha de rede não distingue "não gravou" de "gravou e perdi a resposta" (médio)

**Evidência:** `supabaseProgressStore.ts:35-47` retorna `error === null`; `syncedProgressStore.ts:53-55` mapeia para offline.

Se o upsert foi aplicado e o response se perdeu, o cliente marca offline. O próximo save reenvia o snapshot inteiro. Hoje isso é idempotente porque o documento é substituído; com um RPC que appendasse eventos, sem chave de idempotência duplicaria. Não há retry automático com backoff; a próxima ação do usuário ou o próximo load tenta de novo.

### C10 — Migração de convidado: marcador e multi-conta (médio)

**Evidência:** `syncProgress.ts:16-31, 48-71`.

- O marcador só é gravado após confirmação remota. Se a gravação do marcador falhar, o próximo login repete o merge. Para lições/histórico é idempotente; para cartões pode regredir por C3.
- O convidado nunca é apagado. Se outra pessoa usar o modo convidado no mesmo navegador e depois entrar em outra conta, o progresso de convidado será migrado para essa conta também (o marcador é por usuário). É um comportamento de produto/privacidade a decidir, não uma perda de dados.

### C11 — Histórico cresce sem limite e viaja inteiro em cada save (custo, não perda)

**Evidência:** `Progress.history` é um array; `recordAttempt` só acrescenta; `save` envia o documento inteiro.

Cada resposta reenvia todo o histórico. Em uso prolongado, o payload e o custo de egress crescem linearmente. Não é um bug de integridade imediato, mas afeta o custo do Supabase e o tempo de sync. Compaction/agregação é uma decisão futura; não deve ser feita sem preservar as estatísticas do painel.

### C12 — Dados remotos inválidos deixam o usuário em offline (baixo)

**Evidência:** `supabaseProgressStore.load` lança `Progresso remoto inválido` (`:31`); `syncProgressForUser` e `syncedProgressStore` tratam como offline.

O app não sobrescreve automaticamente um remoto inválido. Isso protege contra perda, mas o usuário fica preso em offline até corrigir/limpar a linha. O novo RPC deve validar a forma básica para reduzir a chance de criar esse estado.

## 5. O que **não** é bug confirmado

- **Lições e checkpoints no merge:** `done OR` e maior score são monotônicos e preservam conclusão. O problema é a gravação integral, não o merge de lições.
- **Histórico no merge:** a união por tupla evita duplicar o mesmo snapshot. O problema é a gravação integral e a falta de ID estável para novos formatos.
- **RLS:** as políticas atuais restringem corretamente SELECT/INSERT/UPDATE/DELETE ao dono; `anon` não tem acesso. Não foi encontrada escalada de privilégio na tabela atual.
- **Migração de convidado após sucesso:** o marcador evita reaplicar o mesmo snapshot; a origem não é apagada.
- **Clique duplo na UI:** `ReviewArea` usa `submittedRef`/`resultRef`; os players bloqueiam reenvio do mesmo item. Não há duplicação por clique duplo no mesmo componente.
- **`sync_id`:** existe, é trocado a cada escrita, mas não é usado. Não há bug de unicidade; é um token desperdiçado.

## 6. Cenários completos

### 6.1 Duas lições em dispositivos diferentes (C1)

| Hora | Dispositivo A | Dispositivo B | Remoto |
|---|---|---|---|
| 10:00 | carrega `{h01}` | carrega `{h01}` | `{h01}` |
| 10:05 | conclui `h02`; salva `{h01,h02}` | — | `{h01,h02}` |
| 10:06 | — | conclui `h03`; salva `{h01,h03}` | `{h01,h03}` |
| 10:10 | recarrega | — | merge local A `{h01,h02}` + remoto `{h01,h03}` → `{h01,h02,h03}` (se A ainda tiver o cache) |

Resultado: B nunca viu `h02`; o remoto perdeu `h02` até A voltar. Se A não voltar, perda definitiva. Se A salvar outra coisa antes de recarregar, pode apagar `h03` também.

### 6.2 Revisão de cartão vencida por atividade posterior (C3)

Ver C3. O histórico mantém as duas tentativas, mas a agenda Leitner regride. O painel mostra a revisão no histórico e, ao mesmo tempo, o cartão na caixa errada. É uma inconsistência observável.

### 6.3 Offline + outro dispositivo online (C1/C9)

1. A carrega `{h01}` e fica offline.
2. A conclui `h02`; o local salva, o remoto falha; status `offline`.
3. B conclui `h03`; o remoto vira `{h01,h03}`.
4. A reconecta e responde outro exercício. O save envia o snapshot local `{h01,h02,...}` e apaga `h03` do remoto.
5. Só um reload de A antes do save faria o merge trazer `h03`. O código não força esse reload.

### 6.4 Relógio adiantado (C4)

1. A está 10 minutos adiantado; conclui `h05` às 12:00 reais e grava `lastActive=12:10`.
2. B revisa um cartão às 12:05 reais e grava `lastActive=12:05`.
3. No merge, A vence o lado inteiro dos cartões; a revisão de B é descartada.

### 6.5 Duas abas da mesma conta (C8)

1. Aba 1 e aba 2 carregam `{h01}`.
2. Aba 1 conclui `h02`; grava.
3. Aba 2 conclui `h03`; grava com seu snapshot antigo.
4. O remoto fica `{h01,h03}`. O `h02` só existe no cache local da aba 1; a aba 2 não o vê.

### 6.6 Retry de rede (C9)

1. A grava `{h01,h02}`; o servidor aplica; o response se perde.
2. O cliente marca offline.
3. A próxima resposta reenvia o snapshot inteiro. O servidor substitui por um documento igual; não duplica histórico.
4. Com um RPC append-only, esse mesmo retry duplicaria tentativas sem idempotency key — por isso o desenho recomendado mantém o snapshot e usa CAS, não append cego.

### 6.7 Migração de convidado (C10)

1. Convidado tem `h01`; conta tem `h02`; remoto tem `h03`.
2. Login: `merge(account, guest)` → `{h01,h02}`; depois `merge(local, remote)` → `{h01,h02,h03}`.
3. Se a gravação remota falhar, o cache da conta guarda o merge e o marcador não é gravado.
4. Próximo login repete o merge. Lições/histórico convergem; cartões podem regredir por C3.

## 7. Requisitos que a solução precisa cumprir

1. Nenhuma gravação remota pode substituir cegamente o documento inteiro.
2. O conflito tem de ser detectado no servidor, não por leitura seguida de upsert no cliente.
3. O merge tem de ser determinístico, comutativo, associativo e idempotente.
4. Cartões precisam ser comparados por ação/revisão, não por `lastActive` do documento.
5. Lições/checkpoints nunca podem regredir; scores só podem subir.
6. Histórico nunca pode perder tentativas válidas; dedup precisa de identidade estável.
7. Retry depois de resposta perdida não pode duplicar nem corromper.
8. Offline não pode apagar o que o remoto tem; reconectar deve mesclar antes de sobrescrever.
9. Migração de convidado precisa ser idempotente e nunca apagar a origem.
10. A solução precisa funcionar com os registros existentes, sem reset.
11. O caminho de escrita precisa ser autorizado apenas para o próprio usuário.
12. O custo precisa continuar compatível com o plano atual: uma linha por usuário, sem infraestrutura nova.

## 8. Conclusão da auditoria

O risco não é hipotético: o contrato de escrita é, por construção, última-escrita-vence. O merge de lições é razoavelmente seguro, mas o de cartões tem um bug determinístico e a gravação não tem CAS. A correção mínima confiável é:

- **RPC transacional de compare-and-swap** usando o `sync_id` já existente como token;
- **merge no cliente antes de cada escrita**, com retry limitado em conflito;
- **merge por cartão** com timestamp de revisão (explícito ou inferido de `due`/`box`);
- **igualdade semântica** em vez de `JSON.stringify`;
- nenhuma migração destrutiva ou reset.

O desenho completo, as alternativas e o plano estão em `docs/sync/implementation-plan.md`; as regras determinísticas estão em `docs/sync/merge-invariants.md`.

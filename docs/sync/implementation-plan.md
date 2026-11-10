# KBR — Plano de implementação da sincronização confiável (Fase 4D.2)

**Status:** proposta para a próxima fase. Nada aqui foi aplicado ao banco nem implementado na 4D.1.
**Pré-requisitos:** `docs/sync/concurrency-audit.md` e `docs/sync/merge-invariants.md`.

## 1. Objetivo

Eliminar a perda silenciosa de progresso entre dispositivos e abas, mantendo:

- uma linha por usuário em `public.user_progress`;
- `Progress` v1 e os registros existentes, sem reset;
- o fluxo local-first e os estados de UI atuais;
- o menor custo operacional possível: nenhum serviço novo, nenhuma tabela nova, nenhum worker.

## 2. Arquitetura recomendada

**CAS transacional no PostgreSQL + merge no cliente antes de toda escrita.**

1. O cliente lê `progress` e `sync_id` do próprio usuário.
2. Em cada gravação, envia ao RPC `save_user_progress(p_expected_sync_id, p_progress)`.
3. O RPC, em uma única transação:
   - exige `auth.uid()`;
   - insere a primeira linha se `p_expected_sync_id` for `null`;
   - bloqueia a linha com `SELECT ... FOR UPDATE`;
   - aplica somente se `sync_id` atual for igual ao token esperado;
   - troca `sync_id`, grava o snapshot e atualiza `updated_at = now()`;
   - em conflito, devolve o snapshot atual e o token novo, sem gravar.
4. O cliente, em conflito, faz `mergeProgress(candidato, remoto)` e tenta de novo com o token novo, com limite e backoff.
5. O cliente mantém uma cópia da última base remota conhecida e faz merge com ela **em toda gravação**, não só em conflito. Isso evita que um snapshot local atrasado apague dados remotos já mesclados.
6. O merge por cartão usa `reviewedAt` (aditivo) ou a inferência `due - intervalo[box-1]` para escolher a revisão mais nova por cartão.
7. Igualdade e idempotência usam comparação semântica canônica, não `JSON.stringify`.

### Por que não server-side merge no RPC?

Seria uma única chamada e resolveria o conflito sem retry, mas exigiria reimplementar todas as regras de merge em PL/pgSQL. O merge é a parte mais delicada (cartões, histórico, scores, desempates) e precisa ser testável sem banco. Duplicar essa lógica em SQL e TypeScript aumenta o risco de divergência. O CAS mantém uma única implementação do merge, no TypeScript puro, e deixa o banco responsável apenas por atomicidade e autorização.

## 3. Comparação das alternativas

| # | Abordagem | Correção | Complexidade | Mudança no banco | Custo | Compatibilidade | Decisão |
|---|---|---|---|---|---|---|---|
| 1 | CAS com `sync_id`/`updated_at` via PostgREST (update condicional + insert) | Boa se o update for condicional; o insert inicial tem corrida e exige tratamento | Média-alta: 2+ requisições, corrida de primeira linha, retry | Nenhuma coluna nova | 2+ requests por save | Alta | Não escolhida: o RPC faz o mesmo com uma chamada e sem corrida |
| 2 | **CAS transacional via RPC usando `sync_id`** | **Alta**: update atômico com token; conflito explícito | **Média**: um RPC + retry no cliente | **Nenhuma coluna nova**; função e grant | 1 request por save; conflito raro devolve snapshot | **Alta** | **Recomendada** |
| 3 | RPC com merge no servidor | Alta, mas o merge vira SQL | Alta: reimplementar merge e testes | Função grande | 1 request | Média | Não agora: duplicaria a lógica |
| 4 | Merge-before-write com retry, sem CAS | Insuficiente: a janela leitura→escrita continua | Baixa | Nenhuma | 2 requests | Alta | Só como complemento do CAS |
| 5 | Merge por entidade em tabelas normalizadas (`lesson_progress`, `srs_cards`) | Alta por entidade | Muito alta: migração, dual write, consultas, RLS por tabela | Tabelas novas | Mais linhas/requests | Baixa | Fora de escopo |
| 6 | Histórico append-only em tabela própria | Alta para tentativas; não resolve sozinho lições/cartões | Alta: tabela, RPC de append, idempotência, leitura agregada | Tabela nova | Mais egress/linhas | Média | Futuro, se histórico crescer |
| 7 | Event sourcing completo | Mais forte para concorrência e auditoria | Muito alta: eventos, projeções, replay, migração | Várias tabelas | Alto | Baixa | Não justificado para um curso |

A regra “cliente lê e depois faz upsert normal” não é CAS: entre a leitura e o upsert outra transação pode gravar. O RPC elimina essa janela com lock e comparação de token na mesma transação.

## 4. Migração SQL proposta (não aplicar na 4D.1)

**Não é necessário adicionar coluna.** `sync_id uuid not null` já existe e é trocado a cada escrita; ele funciona como token opaco de versão. `updated_at` passa a ser gerado no servidor.

```sql
-- supabase/migrations/20261110HHMMSS_add_save_user_progress_rpc.sql
-- (nome exato definido na 4D.2; não aplicar em produção nesta fase)

create or replace function public.save_user_progress(
  p_expected_sync_id uuid,
  p_progress jsonb
)
returns table (
  applied boolean,
  progress jsonb,
  current_sync_id uuid
)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_inserted integer := 0;
  v_current public.user_progress%rowtype;
  v_new_sync_id uuid := pg_catalog.gen_random_uuid();
begin
  if v_user_id is null then
    raise exception 'not authenticated' using errcode = '42501';
  end if;

  if p_progress is null
     or jsonb_typeof(p_progress) <> 'object'
     or p_progress ->> 'v' is distinct from '1'
     or jsonb_typeof(p_progress -> 'lessons') is distinct from 'object'
     or jsonb_typeof(p_progress -> 'cards') is distinct from 'object'
     or jsonb_typeof(p_progress -> 'history') is distinct from 'array'
     or jsonb_typeof(p_progress -> 'streak') is distinct from 'number'
     or jsonb_typeof(p_progress -> 'dailyGoal') is distinct from 'number'
     or jsonb_typeof(p_progress -> 'lastActive') is distinct from 'string'
  then
    raise exception 'invalid progress payload' using errcode = '22023';
  end if;

  -- Primeira gravação: token esperado nulo. O INSERT é atômico; se outra
  -- sessão inserir primeiro, o ON CONFLICT não grava e caímos no caminho
  -- de leitura/conflito abaixo.
  if p_expected_sync_id is null then
    insert into public.user_progress as up (user_id, progress, sync_id, updated_at)
    values (v_user_id, p_progress, v_new_sync_id, now())
    on conflict (user_id) do nothing;

    get diagnostics v_inserted = row_count;
    if v_inserted = 1 then
      return query select true, p_progress, v_new_sync_id;
      return;
    end if;
  end if;

  -- Serializa as escritas do mesmo usuário e devolve a versão atual.
  select * into v_current
    from public.user_progress
   where user_id = v_user_id
   for update;

  if not found then
    -- Linha inexistente com token não nulo (ex.: remoção externa). O cliente
    -- deve reidratar e decidir; não inventamos um documento.
    return query select false, null::jsonb, null::uuid;
    return;
  end if;

  if v_current.sync_id is distinct from p_expected_sync_id then
    return query select false, v_current.progress, v_current.sync_id;
    return;
  end if;

  update public.user_progress as up
     set progress = p_progress,
         sync_id = v_new_sync_id,
         updated_at = now()
   where up.user_id = v_user_id
     and up.sync_id = p_expected_sync_id
  returning * into v_current;

  if not found then
    -- Defensivo; com FOR UPDATE não deve ocorrer.
    select * into v_current from public.user_progress where user_id = v_user_id;
    return query select false, v_current.progress, v_current.sync_id;
    return;
  end if;

  return query select true, v_current.progress, v_current.sync_id;
end;
$$;

revoke all on function public.save_user_progress(uuid, jsonb) from public, anon;
grant execute on function public.save_user_progress(uuid, jsonb) to authenticated;

comment on function public.save_user_progress(uuid, jsonb)
  is 'CAS save for the authenticated user Progress v1 snapshot';
```

### Segurança do RPC

- **`SECURITY INVOKER`**: executa com os privilégios do usuário autenticado; RLS continua valendo. Não há bypass de RLS.
- **Sem parâmetro `user_id`**: o dono é sempre `auth.uid()`. Um usuário não consegue gravar para outro.
- **`auth.uid()` nulo** → exceção; não há operação anônima.
- **`set search_path = ''`** e todos os objetos qualificados (`public.user_progress`, `auth.uid()`, `pg_catalog.gen_random_uuid()`): sem sequestro por schema.
- **Sem SQL dinâmico, sem `EXECUTE`, sem `SECURITY DEFINER`**: não há escalada de privilégio.
- **Grant mínimo**: `EXECUTE` só para `authenticated`; `PUBLIC` e `anon` revogados. Os grants atuais da tabela (SELECT/INSERT/UPDATE/DELETE) permanecem para permitir rollback do cliente antigo.
- **Validação de forma**: evita gravar `{"v":1}` e deixar a conta com um remoto inválido. A validação profunda continua no `isProgress` do cliente.
- **`updated_at`/`sync_id`** são gerados no servidor; o cliente não os escolhe.
- **Row lock**: `FOR UPDATE` serializa somente a linha do próprio usuário; não há lock global nem deadlock de múltiplas linhas.
- **Privacidade**: o RPC não lê nem devolve dados de outro usuário; RLS + filtro explícito.

Se no futuro for necessário revogar DML direto da tabela (para impedir clientes antigos de escreverem sem CAS), será preciso um RPC `SECURITY DEFINER` com owner dedicado, `search_path` controlado, filtro explícito, defesa contra `user_id` arbitrário e testes de escalada. **Não fazer isso na 4D.2**, porque quebraria o rollback e os clientes antigos.

Se um `SECURITY DEFINER` for realmente adotado depois, os requisitos mínimos são: owner que não seja o próprio usuário e com privilégio apenas no schema necessário; `set search_path = ''`; todas as referências qualificadas; `auth.uid()` obrigatório e nunca um `user_id` vindo do payload; `EXECUTE` revogado de `public`/`anon` e concedido só a `authenticated`; nenhum SQL dinâmico; validação de payload; e testes pgTAP provando que um usuário não lê nem grava a linha de outro. Como o RPC recomendado é `SECURITY INVOKER`, esses riscos não são introduzidos agora.

### Índices e constraints

- Nenhum índice novo: a PK `user_id` já cobre o lookup e o lock.
- Nenhuma coluna nova, nenhum backfill.
- O `CHECK` existente (`progress->>'v' = '1'`) permanece.
- Opcional futuro: `check (jsonb_typeof(progress->'lessons') = 'object')` etc., mas não adicionar agora para não falhar em linhas legadas.

## 5. Mudanças no cliente

### 5.1 `src/lib/storage/mergeProgress.ts`

- Implementar I1–I14 de `merge-invariants.md`.
- `mergeCards` por `reviewedAt`/inferência; nunca por `lastActive` global.
- `mergeHistory` com ID estável opcional e ordem canônica.
- `lastActive` máximo; `dailyGoal` do lado mais recente; `streak` máximo legado.
- Exportar helpers puros:
  - `inferCardReviewedAt(state)`;
  - `compareCardStates(a, b)`;
  - `canonicalHistory(attempts)`;
  - `progressEquals(a, b)` (comparação semântica com chaves ordenadas e histórico canônico).

### 5.2 `src/lib/srs/index.ts`, `leitner.ts`, `cards.ts`, `review/index.ts`

- Adicionar `reviewedAt?: string` a `SrsState` (aditivo, opcional).
- `applyReview` e `scheduleMissedReview` gravam `reviewedAt: now.toISOString()` no cartão atualizado. O scheduler continua puro; o carimbo é da camada de aplicação.
- `isProgress` valida `reviewedAt` apenas se presente.
- `Attempt` ganha `id?: string`; `recordAttempt` e `applyReview` aceitam um `id` opcional e o gravam quando presente. A geração do ID fica na camada de UI/ação (`crypto.randomUUID()`), não dentro da função pura, para preservar a injeção de `now` e o determinismo dos testes. Registros antigos continuam usando a tupla.
- Nenhum cartão existente é reescrito em massa; a inferência cobre o legado.

### 5.3 `src/lib/storage/supabaseProgressStore.ts`

Novo contrato interno (o `ProgressStore` público continua `load/save`):

- `load()` seleciona `progress, sync_id`; valida `isProgress`; guarda `token` e `base` (última versão remota conhecida).
- `save(progress)`:
  1. valida `isProgress`;
  2. garante `load()` se ainda não inicializado;
  3. `candidate = base ? mergeProgress(progress, base) : progress`;
  4. chama o RPC com `token`;
  5. `applied: true` → atualiza `base = candidate`, `token = current_sync_id`, chama `onMerged?.(candidate)`, retorna `true`;
  6. `applied: false` com `progress` → valida, faz `base = remoto`, `token = current_sync_id`, `candidate = mergeProgress(progress, remoto)`; se `progressEquals(candidate, remoto)`, considera sucesso sem nova escrita; senão retry;
  7. `applied: false` sem `progress` (linha ausente) → `base = null`, `token = null`, retry como primeira inserção;
  8. erro de rede transitório → retry com backoff; erro de autorização/validação → `false`.
- Serializar `load` e `save` em uma fila interna por instância para evitar corrida entre a leitura inicial e uma gravação.
- Opções injetáveis para teste: `retryLimit`, `retryDelayMs`, `sleep`, `onMerged`, `now`, `randomUUID`.

### 5.4 `src/lib/storage/syncedProgressStore.ts`

- Substituir `JSON.stringify(...) !== JSON.stringify(...)` por `progressEquals`.
- Manter a fila de escrita existente.
- Propagar `offline` após retries esgotados; `synced` apenas após confirmação.
- Não anunciar sucesso se o remoto falhou.
- Se o remote store expõe `onMerged`, o `AuthProvider` passa um callback que grava o resultado mesclado no cache local da conta. Sem isso, o cache local pode ficar atrás do remoto até o próximo load; não é perda, mas é melhor corrigir.

### 5.5 `src/lib/storage/syncProgress.ts`

- Continuar carregando convidado + conta + remoto e mesclando.
- Só gravar no remoto se `!progressEquals(merged, remote)`.
- Passar `onMerged` para atualizar o cache da conta.
- Manter o marcador após confirmação; retry idempotente.
- Não apagar `kbr:v1`.
- `activeSyncs` continua deduplicando chamadas simultâneas na mesma aba.

### 5.6 `src/components/auth/AuthProvider.tsx`

- Construir o `remote` com `onMerged` que grava no store local da conta.
- Expor, se necessário, `lastSyncedAt`/`syncErrorKind` sem mudar a UI nesta fase. A UI atual só precisa de `syncing`/`synced`/`offline`.
- Não alterar OAuth, cookies ou redirect.

### 5.7 Componentes de lição/revisão/painel

- Nenhuma mudança de fluxo obrigatória.
- Os componentes continuam chamando `load()` uma vez e `save()` por ação.
- Se o `save` remoto mesclar dados de outra sessão, a UI local pode não mostrá-los até o próximo load. Isso é aceitável para a 4D.2; a alternativa (retornar o documento mesclado e substituir o estado) é uma melhoria de 4D.3.
- O aviso de sync continua verdadeiro: “Salvo neste dispositivo… pendente” só em `offline`.

## 6. Migração de dados e compatibilidade

- **Nenhum backfill obrigatório.**
- Linhas existentes já têm `sync_id` não nulo e `progress` v1.
- Cartões antigos sem `reviewedAt` usam a inferência de `due`/`box`.
- Tentativas antigas sem `id` usam a tupla.
- `isProgress` continua aceitando v1; os novos campos são opcionais.
- Nenhum progresso é apagado, resetado ou reescrito em massa.
- O RPC é aditivo: clientes antigos continuam usando o upsert direto durante o rollout.
- Rollback do cliente antigo funciona sem reverter o banco.

## 7. Falhas e recuperação

| Falha | Comportamento | Recuperação |
|---|---|---|
| Leitura remota falha | `offline`; usa cache local; não sobrescreve remoto | Próximo load/save; sem perda local |
| Escrita remota falha | `offline`; local já gravado; retry limitado | Próxima ação/load; token preservado |
| Conflito de token | RPC devolve remoto; cliente mescla e tenta de novo | Até 3 tentativas; depois `offline` e retry futuro |
| Conflito esgotado | Local preservado; remoto não é tocado | Nova ação/load refaz o merge |
| Response perdido após aplicar | Retry com token antigo → conflito com documento igual → sucesso sem nova escrita | Idempotente |
| Remoto inválido | Load falha; `offline`; não sobrescreve | Corrigir/restaurar a linha; RPC reduz novos casos |
| Linha ausente com token | RPC devolve `applied=false, progress=null` | Cliente reidrata como vazio e reinsere |
| Não autenticado | RPC 42501; `offline`/erro | Login novamente |
| Payload inválido | RPC 22023; `false`; local preservado | Corrigir cliente; não grava lixo |
| Duas abas | CAS faz uma vencer; a outra mescla | Load na aba perdedora mostra o resultado |
| Cliente antigo durante rollout | Pode sobrescrever sem CAS | Janela curta; recarregar; ver §9 |
| Relógio divergente | Ordem lógica determinística; pode não refletir a ordem real | Documentado; sem solução completa na 4D.2 |

## 8. Retry, backoff e limites

- **Conflitos CAS:** até 3 tentativas totais (1 inicial + 2 retries).
- **Backoff:** 250 ms e 750 ms (exponencial), com jitter opcional de 0–100 ms em produção; testes injetam 0.
- **Erros de rede transitórios:** até 2 retries adicionais com o mesmo orçamento; não repetir 400/401/403/422.
- **Sem retry infinito e sem loop em background.**
- **Após esgotar:** salvar local, status `offline`, não trocar token, não fingir sucesso.
- **Deduplicação de sync inicial:** `activeSyncs` por usuário continua.
- **Sem service worker / background sync** nesta fase.
- **Timeout:** usar o timeout padrão do cliente Supabase; não criar timers globais. Se o fetch ficar pendurado, o usuário pode recarregar; o local está salvo.

## 9. Ordem de deploy

1. **Backup:** confirmar backup/PITR do projeto Supabase antes de qualquer deploy. Não há export/import na UI ainda; o backup é a rede de segurança.
2. **Migração aditiva:** aplicar a função e os grants. Clientes antigos continuam funcionando (upsert direto). Não revogar DML da tabela.
3. **Testes locais/staging:** pgTAP do RPC + testes Vitest + typecheck + build + e2e contra o mock atualizado.
4. **Deploy do cliente novo** na Vercel.
5. **Monitorar:** erros de RPC, proporção de `offline`, conflitos. Não há analytics; usar logs do Supabase/Vercel e testes manuais.
6. **Janela de rollout:** clientes com abas antigas ainda podem fazer upsert sem CAS. Manter a janela curta; pedir reload; considerar um aviso na UI em 4D.3. Não revogar DML direto nesta fase para preservar o rollback.
7. **Hardening futuro (4D.3+):** se necessário, migrar para RPC `SECURITY DEFINER` + revogar DML direto, com testes de escalada. Não fazer junto com a primeira mudança.

## 10. Rollback

- **Cliente:** reverter o deploy da Vercel para a versão anterior. O cliente antigo volta ao upsert direto na tabela, que continua com grants e RLS.
- **Banco:** manter a função e os grants; não é necessário dropar. Se for preciso remover, fazer depois do rollback do cliente e confirmar que nenhum cliente novo está ativo.
- **Dados:** nenhuma migração destrutiva; não há “down migration” de dados. Se uma versão com bug gravar um snapshot ruim, restaurar do backup/PITR é o único caminho; por isso o backup é pré-requisito.
- **Progresso do usuário:** nunca é resetado pelo rollback. Caches locais continuam válidos.
- **Migração de convidado:** o marcador pode permanecer; o retry é idempotente.

## 11. Estados observáveis

Manter o contrato atual `SyncStatus = "idle" | "syncing" | "synced" | "offline"`:

- `idle`: convidado ou ainda sem store.
- `syncing`: load/save em andamento (inclui retry de conflito).
- `synced`: última escrita confirmada pelo RPC.
- `offline`: load/save falhou ou retries esgotaram; o local está salvo.

Adicionar internamente, sem alterar a UI nesta fase:

- `lastSyncedAt?: string` no contexto;
- `lastErrorKind?: "network" | "auth" | "validation" | "conflict" | "invalid-remote"`;
- log `console.warn` sem PII em falha final (código do erro, não o documento).

A UI deve continuar dizendo apenas o que é verdade: “Sincronizando…”, “Salvo neste dispositivo… pendente” e “Progresso sincronizado com sua conta”. Um conflito resolvido não precisa aparecer; um conflito esgotado aparece como `offline`.

## 12. Estratégia de testes

### 12.1 Puros (Vitest)

- `mergeProgress`: I1–I14; comutatividade, associatividade, idempotência; permutações de dois/três documentos.
- Cartões: mais novo vence; `due` isolado não vence; empate determinístico; cartão só de um lado preservado.
- Histórico: união, dedup por `id`, fallback por tupla, repetição legítima, ordem canônica.
- `progressEquals`: ordem de chaves e histórico canônico.
- Skew: `lastActive` adiantado não decide cartão.
- Revisões concorrentes: última vence; histórico preservado; limitação documentada.

### 12.2 Store com fake CAS

- Sucesso na primeira tentativa.
- Conflito → merge → retry → sucesso.
- Conflito com documento igual → sucesso sem segunda escrita.
- Response perdido (retry com token antigo) → idempotente.
- Retries esgotados → `false`, local preservado, token não avança.
- Linha ausente → reinserção.
- Erro de autorização/validação → sem retry.
- Load e save concorrentes na mesma instância → serializados.
- `syncProgressForUser` + convidado + remoto com lições diferentes.
- Duas abas com o mesmo fake CAS: ambas convergem.

### 12.3 Banco (pgTAP, quando houver stack local)

- `anon` não executa o RPC.
- `authenticated` executa só para o próprio `auth.uid()`.
- Primeira inserção com token nulo → `applied=true`.
- Replay do mesmo token → `applied=false`, documento atual.
- Token antigo → `applied=false`, sem mutação.
- Token atual → `applied=true`, `sync_id` novo, `updated_at` do servidor.
- Outro usuário não vê nem altera a linha.
- Payload inválido → 22023.
- Sem `user_id` no payload; tentativa de forjar outro usuário não compila.
- Concorrência real: duas sessões/duas conexões; uma vence, a outra recebe conflito. Se o ambiente não permitir, documentar como não verificado.

**Limitação atual:** não há Supabase CLI nem stack local neste ambiente; `supabase test db` não foi executado. Docker existe, mas o projeto não tem `supabase/config.toml` nem CLI instalada. Não apresentar teste de mock como prova de atomicidade do PostgreSQL.

### 12.4 E2E (Playwright + mock)

- Atualizar `e2e/mock-supabase.mjs` para manter uma linha em memória e implementar o endpoint RPC (CAS) em vez de devolver sempre `[]`.
- Dois contextos de navegador com o mesmo usuário: A conclui `h01`, B conclui `h02`, ambos recarregam e veem as duas.
- Offline: abortar a rota remota, concluir uma lição, reconectar, recarregar e verificar persistência.
- Conflito: forçar token antigo e verificar merge.
- Migração de convidado: estudar como convidado, entrar, recarregar.
- O mock continua sem provar RLS/atomicidade; esses testes ficam no pgTAP.

### 12.5 Manual

- Duas abas da mesma conta.
- Chrome desktop + PWA/iPhone (quando disponível).
- Avião/offline e reconexão.
- Relógio adiantado/atrasado (opcional, documentar resultado).
- Login/logout e migração de convidado.

## 13. Escopo exato da Fase 4D.2

**Entra:**

1. Migração aditiva com `save_user_progress` (sem coluna nova) e grants.
2. Testes pgTAP do RPC e da RLS.
3. `mergeProgress` por cartão + histórico canônico + igualdade semântica.
4. `reviewedAt`/`Attempt.id` opcionais e compatíveis.
5. `createSupabaseProgressStore` com CAS, base remota, retry/backoff e fila.
6. Ajustes em `syncProgress`, `syncedProgressStore`, `AuthProvider`.
7. Atualização de testes Vitest e do mock/e2e.
8. Atualização de `docs/architecture.md`, `docs/roadmap.md` e `AGENTS.md` ao final.
9. Rodar typecheck + test + build + e2e; pgTAP se a stack local estiver disponível.

**Não entra:**

- Event sourcing, tabelas normalizadas, histórico append-only em tabela.
- Revogar DML direto / RPC `SECURITY DEFINER` (hardening posterior).
- Export/import JSON, meta diária editável, redesign de UI.
- CEFR A1, novas lições, service worker/offline shell.
- Alteração de OAuth/Google/Supabase Auth.
- Migração de produção nesta fase de auditoria.

## 14. Critérios de aceite da 4D.2

- [ ] Duas sessões que concluem lições diferentes mantêm as duas no remoto.
- [ ] Duas sessões que revisam cartões diferentes mantêm os dois.
- [ ] Duas sessões que revisam o mesmo cartão convergem deterministicamente; o histórico mantém as duas tentativas.
- [ ] Um cartão com revisão mais nova não é sobrescrito por uma lição posterior.
- [ ] Relógio adiantado não deixa uma atividade não relacionada decidir o cartão.
- [ ] Retry após response perdido não duplica nem troca o token à toa.
- [ ] Offline + reconexão preserva o local e mescla o remoto.
- [ ] Migração de convidado é idempotente e não apaga a origem.
- [ ] RPC rejeita `anon`, outro usuário e payload inválido.
- [ ] Nenhum progresso existente é resetado.
- [ ] `npm run typecheck`, `npm test`, `npm run build` e `npm run e2e` verdes.
- [ ] pgTAP executado ou limitação registrada explicitamente.

## 15. Commits sugeridos para a 4D.2

1. `test: cover merge invariants and sync conflicts` — merge puro + testes, sem banco.
2. `feat: add compare-and-swap progress rpc` — migração, pgTAP e adapter CAS.
3. `feat: retry sync conflicts and surface offline state` — store, AuthProvider, mock/e2e, observabilidade.
4. `docs: record phase 4D.2 sync hardening` — arquitetura, roadmap, AGENTS e graphify.

Cada commit com typecheck/test/build verdes; o commit 2 não deve ir a produção sem o 3.

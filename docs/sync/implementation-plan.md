# KBR — Plano de implementação da sincronização confiável (Fase 4D.2)

**Status:** implementado no código e verificado localmente na Fase 4D.2. A preparação operacional da Fase 4D.3 está em `docs/sync/deployment-runbook.md`; a migração **não foi aplicada ao projeto Supabase real**, o cliente não foi implantado e não houve teste real em dois dispositivos. As seções de operação abaixo continuam sendo o roteiro de staging/produção.
**Pré-requisitos:** `docs/sync/concurrency-audit.md` e `docs/sync/merge-invariants.md`.
**Limite de verificação:** o RPC foi testado em PostgreSQL 14 local com `auth`/roles emulados e pgTAP, incluindo duas conexões reais; não houve acesso ao Supabase de produção. O mock de e2e prova o fluxo do cliente, não a atomicidade do banco.

## 1. Objetivo

Eliminar a perda silenciosa de progresso entre dispositivos e abas, mantendo:

- uma linha por usuário em `public.user_progress`;
- `Progress` v1 e os registros existentes, sem reset;
- o fluxo local-first e os estados de UI atuais;
- o menor custo operacional possível: nenhum serviço novo, nenhuma tabela nova, nenhum worker.

## 2. Arquitetura recomendada

**CAS transacional no PostgreSQL + merge no cliente antes de toda escrita.**

1. O cliente lê `progress` e `sync_id` do próprio usuário.
2. Em cada gravação, envia ao RPC `save_user_progress(p_expected_user_id, p_expected_sync_id, p_progress)`.
3. O RPC, em uma única transação:
   - exige `auth.uid()`;
   - exige que `p_expected_user_id` seja exatamente `auth.uid()` (asserção de sessão, não seletor de linha);
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

## 4. Migração SQL implementada (não aplicada em produção)

Arquivo: `supabase/migrations/20261110180000_add_save_user_progress_rpc.sql`.

**Não é necessário adicionar coluna.** `sync_id uuid not null` já existe e é trocado a cada escrita; ele funciona como token opaco de versão. `updated_at` passa a ser gerado no servidor.

```sql
-- supabase/migrations/20261110180000_add_save_user_progress_rpc.sql
-- Migração aditiva; não aplicar em produção sem o roteiro da §9.

create or replace function public.save_user_progress(
  p_expected_user_id uuid,
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

  -- Asserção de sessão: um store antigo reutilizado após troca de conta não
  -- pode gravar o progresso do usuário anterior na conta nova.
  if p_expected_user_id is null or p_expected_user_id is distinct from v_user_id then
    raise exception 'session user mismatch' using errcode = '42501';
  end if;

  -- O envelope exige `v` como número JSON 1, não string. A validação profunda
  -- continua no isProgress do cliente.
  if p_progress is null
     or pg_catalog.jsonb_typeof(p_progress) is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_progress -> 'v') is distinct from 'number'
     or p_progress ->> 'v' is distinct from '1'
     or pg_catalog.jsonb_typeof(p_progress -> 'lessons') is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_progress -> 'cards') is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_progress -> 'history') is distinct from 'array'
     or pg_catalog.jsonb_typeof(p_progress -> 'streak') is distinct from 'number'
     or pg_catalog.jsonb_typeof(p_progress -> 'dailyGoal') is distinct from 'number'
     or pg_catalog.jsonb_typeof(p_progress -> 'lastActive') is distinct from 'string'
  then
    raise exception 'invalid progress payload' using errcode = '22023';
  end if;

  -- Primeira gravação: token esperado nulo. O INSERT é atômico; se outra
  -- sessão inserir primeiro, o ON CONFLICT não grava e caímos no caminho
  -- de leitura/conflito abaixo.
  if p_expected_sync_id is null then
    insert into public.user_progress as up (user_id, progress, sync_id, updated_at)
    values (v_user_id, p_progress, v_new_sync_id, pg_catalog.now())
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
    -- Linha removida externamente: o cliente reidrata e tenta a inserção.
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
         updated_at = pg_catalog.now()
   where up.user_id = v_user_id
     and up.sync_id = p_expected_sync_id
  returning * into v_current;

  if not found then
    -- Defensivo; com FOR UPDATE não deve ocorrer.
    select * into v_current
      from public.user_progress
     where user_id = v_user_id;

    if not found then
      return query select false, null::jsonb, null::uuid;
    end if;

    return query select false, v_current.progress, v_current.sync_id;
    return;
  end if;

  return query select true, v_current.progress, v_current.sync_id;
end;
$$;

revoke all on function public.save_user_progress(uuid, uuid, jsonb) from public, anon;
grant execute on function public.save_user_progress(uuid, uuid, jsonb) to authenticated;

comment on function public.save_user_progress(uuid, uuid, jsonb)
  is 'CAS save for the authenticated user Progress v1 snapshot; returns the winning snapshot on conflict';
```

### Segurança do RPC

- **`SECURITY INVOKER`**: executa com os privilégios do usuário autenticado; RLS continua valendo. Não há bypass de RLS.
- **Sem seletor de `user_id`**: o dono da linha é sempre `auth.uid()`. `p_expected_user_id` não escolhe a linha; é uma asserção de que o store foi construído para a sessão atual. Um store atrasado após troca de conta recebe `42501` em vez de gravar na conta nova.
- **`auth.uid()` nulo** → exceção; não há operação anônima.
- **`set search_path = ''`** e todos os objetos qualificados (`public.user_progress`, `auth.uid()`, `pg_catalog.gen_random_uuid()`, `pg_catalog.now()`): sem sequestro por schema.
- **Sem SQL dinâmico, sem `EXECUTE`, sem `SECURITY DEFINER`**: não há escalada de privilégio.
- **Grant mínimo**: `EXECUTE` só para `authenticated`; `PUBLIC` e `anon` revogados. Os grants atuais da tabela (SELECT/INSERT/UPDATE/DELETE) permanecem para permitir rollback do cliente antigo.
- **Validação de forma**: exige `v` como número JSON `1` (não string) e os tipos de `lessons`/`cards`/`history`/`streak`/`dailyGoal`/`lastActive`. Evita gravar `{"v":1}` e deixar a conta com um remoto inválido. A validação profunda continua no `isProgress` do cliente.
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
- Opções injetáveis para teste: `retryLimit`, `transientRetryLimit`, `retryDelayMs`, `sleep`, `onMerged`, `onError`, `now`.

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
- Expor `syncErrorKind` sem mudar a UI nesta fase. A UI atual só precisa de `syncing`/`synced`/`offline`; `lastSyncedAt` não foi adicionado.
- Não alterar OAuth, cookies ou redirect.
- Guards de `active`/`user.id` impedem que um load/save assíncrono antigo atualize a sessão nova após logout, troca de conta ou refresh.

### 5.7 Componentes de lição/revisão/painel

- Nenhuma mudança de fluxo obrigatória.
- Os componentes continuam chamando `load()` uma vez e `save()` por ação.
- Se o `save` remoto mesclar dados de outra sessão, a UI local pode não mostrá-los até o próximo load. Isso é aceitável para a 4D.2; a alternativa (retornar o documento mesclado e substituir o estado) fica para uma fase futura.
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

### 6.1 Comportamento misto durante o rollout

Há três versões convivendo na janela de deploy:

| Versão | Leitura | Escrita | Risco |
|---|---|---|---|
| Cliente antigo | `select progress, sync_id` ou só `progress` | upsert direto na tabela | Ignora o token e pode sobrescrever uma escrita CAS feita por um cliente novo |
| Cliente novo | `select progress, sync_id` | RPC CAS | Conflito devolve o vencedor, mescla e tenta de novo |
| Banco novo + cliente antigo | tabela/RLS inalteradas | upsert direto continua permitido | É o caminho de rollback; não revogar DML nesta fase |

Consequências práticas:

- **Não há como o cliente novo impedir um upsert antigo** sem revogar `INSERT/UPDATE` da tabela. Por isso a janela de rollout deve ser curta e os usuários devem ser orientados a recarregar.
- Um cliente antigo que gravar depois de um CAS pode apagar campos novos (`reviewedAt`, `Attempt.id`) do snapshot, porque envia o documento inteiro que tinha em memória. Os dados de lições/cartões/histórico continuam válidos; a inferência de revisão cobre cartões sem `reviewedAt`.
- O cliente novo sempre relê e mescla antes de gravar; ao voltar a uma aba antiga, o próximo load recupera o que o servidor ainda tiver. Se o cliente antigo já sobrescreveu, o dado perdido não é reconstruível sem backup.
- **Transição para hardening (4D.4+):** depois que a telemetria/logs e o teste manual mostrarem que não há clientes antigos ativos, revogar DML direto de `authenticated`/`anon` e manter apenas o RPC. Como o RPC atual é `SECURITY INVOKER`, isso exige migrá-lo para `SECURITY DEFINER` com owner dedicado (ou equivalente) e testar escalada, `search_path` e autorização. A decisão fica para a fase seguinte. **Não fazer isso na 4D.2**, porque quebraria o rollback.

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
| Store de outra conta/sessão | `p_expected_user_id` divergente → 42501; nada é gravado | Recarregar a sessão; o store antigo é descartado |
| Payload inválido | RPC 22023; `false`; local preservado | Corrigir cliente; não grava lixo |
| Duas abas | CAS faz uma vencer; a outra mescla | Load na aba perdedora mostra o resultado |
| Cliente antigo durante rollout | Pode sobrescrever sem CAS | Janela curta; recarregar; ver §9 |
| Relógio divergente | Ordem lógica determinística; pode não refletir a ordem real | Documentado; sem solução completa na 4D.2 |

## 8. Retry, backoff e limites

- **Conflitos CAS:** até 3 tentativas totais (1 inicial + 2 retries).
- **Backoff:** 250 ms e 750 ms; testes injetam `sleep`/delays determinísticos. Não há jitter implementado nesta fase.
- **Erros de rede transitórios:** até 2 retries adicionais com o mesmo orçamento; não repetir 400/401/403/422.
- **Sem retry infinito e sem loop em background.**
- **Após esgotar:** salvar local, status `offline`, não trocar token, não fingir sucesso.
- **Deduplicação de sync inicial:** `activeSyncs` por usuário continua.
- **Sem service worker / background sync** nesta fase.
- **Timeout:** usar o timeout padrão do cliente Supabase; não criar timers globais. Se o fetch ficar pendurado, o usuário pode recarregar; o local está salvo.

## 9. Ordem de deploy

### 9.1 Backup e pré-requisitos

1. **Backup/PITR:** confirmar que o projeto Supabase tem backup ou PITR ativo e registrar a janela de restauração antes de tocar no banco. Fazer um ensaio de restauração em projeto descartável se possível. Não há export/import na UI; o backup é a única rede de segurança para um snapshot ruim.
2. **Janela e responsáveis:** escolher uma janela curta, avisar que usuários com abas antigas devem recarregar e registrar o commit/migração implantados.
3. **Nunca testar com dados de produção:** usar projeto staging e usuários de teste descartáveis.

### 9.2 Staging e migração aditiva

1. Aplicar todas as migrações do zero em staging e rodar `supabase/tests/local/run-local-sql-tests.sh` (PostgreSQL local) ou `supabase test db` quando a CLI estiver disponível.
2. Rodar `npm run typecheck`, `npm test`, `npm run build` e `npm run e2e` no commit que será implantado.
3. Aplicar em produção **somente** `20261110180000_add_save_user_progress_rpc.sql`: função + grants. É aditiva; clientes antigos continuam no upsert direto. Não revogar DML da tabela nesta fase.
4. Confirmar que a migração não alterou dados: contar linhas de `public.user_progress` antes/depois e comparar alguns `sync_id`/`updated_at` (sem exportar `progress` para logs).

### 9.3 Verificação do RPC após a migração

Executar como owner/administrador no SQL editor de staging (nunca com service-role no cliente):

```sql
-- 1. Função existe, é SECURITY INVOKER e tem search_path vazio.
select p.prosecdef,
       p.proconfig,
       pg_catalog.pg_get_function_identity_arguments(p.oid) as args
  from pg_catalog.pg_proc p
  join pg_catalog.pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname = 'save_user_progress';

-- 2. Privilégios: anon sem EXECUTE; authenticated com EXECUTE.
select pg_catalog.has_function_privilege(
  'anon', 'public.save_user_progress(uuid,uuid,jsonb)', 'execute'
) as anon_execute;
select pg_catalog.has_function_privilege(
  'authenticated', 'public.save_user_progress(uuid,uuid,jsonb)', 'execute'
) as authenticated_execute;
```

Smoke test com um usuário de staging e o JWT dele (via PostgREST/SQL emulando `auth.uid()`):

- primeira chamada com `p_expected_sync_id = null` → `applied=true`, `sync_id` novo;
- repetir o mesmo token → `applied=false`, documento atual;
- token antigo → `applied=false`, sem mutação;
- `p_expected_user_id` de outro usuário → `42501`;
- `v` como string (`"1"`) ou envelope incompleto → `22023`;
- `updated_at` avança e `sync_id` muda somente quando `applied=true`;
- um usuário não lê nem altera a linha de outro (RLS).

O harness local já cobre esses casos e duas conexões concorrentes; a verificação em staging confirma que a função, os grants e o PostgREST reais estão iguais.

### 9.4 Deploy do cliente

1. Deploy da Vercel com o cliente novo (RPC CAS).
2. Abrir uma sessão autenticada e confirmar no Network que a escrita usa `POST /rest/v1/rpc/save_user_progress` e não `PATCH/POST /rest/v1/user_progress`.
3. Teste seguro em dois dispositivos (ver §9.5).
4. Manter a janela de rollout curta; clientes antigos ainda podem fazer upsert sem CAS (ver §6.1).

### 9.5 Teste seguro em dispositivos

- **Duas sessões reais:** dois perfis de navegador independentes (ou normal + janela privada) com a mesma conta Google. Não usar duas abas do mesmo perfil para concluir que há isolamento.
- **Cartões diferentes:** revisar um cartão em A e outro em B; recarregar ambos e confirmar que os dois cartões e as duas tentativas aparecem.
- **Mesmo cartão:** revisar o mesmo cartão quase ao mesmo tempo; confirmar que o histórico preserva as duas tentativas e que a agenda exibida é determinística. Não exigir ordem sequencial exata (ver §12.6).
- **Offline/reconexão:** no DevTools, modo offline; revisar; confirmar “Salvo neste dispositivo… pendente”; voltar online, recarregar e confirmar a sincronização.
- **Ciclo de conta:** logout, login de outra conta, voltar à primeira; confirmar que nenhum progresso foi enviado para a conta errada. A asserção `p_expected_user_id` deve transformar um store atrasado em `42501`, não em escrita cruzada.
- **Mobile:** repetir o fluxo principal em 375/390 px e no PWA instalado; iPhone/Chrome iOS real continua manual.
- **Relógio:** opcional, adiantar/atrasar o relógio de um dispositivo e confirmar que o cartão não é decidido por `lastActive` global; documentar o resultado.

### 9.6 Monitoramento

- Logs do Supabase/PostgREST: `42501` (sessão/troca de conta), `22023` (payload), `5xx` e timeouts do RPC.
- Logs da Vercel: `console.warn("[kbr] falha de sincronização:", kind)` — só a categoria, sem PII.
- Não há analytics nem métrica automática de `offline`/conflitos. A proporção é observada por relatos, logs e inspeção manual do localStorage; não inventar números.
- Após a janela, confirmar que não há tráfego relevante de upsert direto antes de considerar o hardening.

### 9.7 Hardening futuro (4D.4+)

Migrar para RPC `SECURITY DEFINER` com owner dedicado e revogar DML direto, com testes de escalada, `search_path`, autorização e rollback. Não fazer junto com a primeira mudança.

## 10. Rollback

- **Cliente:** reverter o deploy da Vercel para a versão anterior. O cliente antigo volta ao upsert direto na tabela, que continua com grants e RLS.
- **Banco:** manter a função e os grants; não é necessário dropar. Se for preciso remover, fazer depois do rollback do cliente e confirmar que nenhum cliente novo está ativo. `drop function` não apaga dados.
- **Dados:** nenhuma migração destrutiva; não há “down migration” de dados. Se uma versão com bug gravar um snapshot ruim, restaurar do backup/PITR é o único caminho; por isso o backup é pré-requisito. Antes de restaurar, exportar/inspecionar a linha afetada para não perder atividade posterior.
- **Progresso do usuário:** nunca é resetado pelo rollback. Caches locais continuam válidos e o próximo load mescla o que estiver no remoto.
- **Migração de convidado:** o marcador pode permanecer; o retry é idempotente.
- **Ordem segura:** (1) rollback do cliente; (2) confirmar que não há mais chamadas ao RPC; (3) opcionalmente remover a função; (4) restaurar dados somente se houver corrupção confirmada.

## 11. Estados observáveis

Manter o contrato atual `SyncStatus = "idle" | "syncing" | "synced" | "offline"`:

- `idle`: convidado ou ainda sem store.
- `syncing`: load/save em andamento (inclui retry de conflito).
- `synced`: última escrita confirmada pelo RPC.
- `offline`: load/save falhou ou retries esgotaram; o local está salvo.

Implementado internamente, sem alterar a UI nesta fase:

- `syncErrorKind: "network" | "auth" | "validation" | "invalid-remote" | "conflict" | "unexpected" | null` no contexto;
- log `console.warn` sem PII em falha final (apenas a categoria, nunca o documento);
- `lastMerged`/`lastErrorKind` no store remoto, usados por testes e pelo `onMerged`;
- `lastSyncedAt` **não** foi adicionado.

A UI deve continuar dizendo apenas o que é verdade: “Sincronizando…”, “Salvo neste dispositivo… pendente” e “Progresso sincronizado com sua conta”. Um conflito resolvido não precisa aparecer; um conflito esgotado aparece como `offline`.

## 12. Estratégia de testes

### 12.1 Puros (Vitest)

`npm test`: **20 arquivos, 290 testes**.

- `mergeProgress`: I1–I14; comutatividade, associatividade, idempotência; permutações de dois/três documentos.
- Cartões: mais novo vence; `due` isolado não vence; empate determinístico; cartão só de um lado preservado; inferência por `due - intervalo` para legado.
- Histórico: união, dedup por `id`, fallback por tupla, repetição legítima, ordem canônica.
- `progressEquals`: ordem de chaves e histórico canônico (não `JSON.stringify`).
- Skew: `lastActive` adiantado não decide cartão.
- Revisões concorrentes: última vence; histórico preservado; limitação documentada em §12.6.
- Os dois antigos `test.fails` (cartão vencido por lição posterior e por relógio adiantado) agora passam como testes normais.

### 12.2 Store com fake CAS

`tests/helpers/fakeSupabaseCas.ts` simula linha por usuário, RLS de leitura, CAS, conflito, perda de resposta e falhas injetadas, com chamadas serializadas.

- Sucesso na primeira tentativa.
- Conflito → merge → retry → sucesso.
- Conflito com documento igual → sucesso sem segunda escrita.
- Response perdido (retry com token antigo) → idempotente.
- Retries esgotados → `false`, local preservado, token não avança.
- Linha ausente → reinserção.
- Erro de autorização/validação → sem retry.
- Load e save concorrentes na mesma instância → serializados.
- `syncProgressForUser` + convidado + remoto com lições diferentes.
- Duas abas/dispositivos com o mesmo fake CAS: ambas convergem.
- Troca de conta/store atrasado: `p_expected_user_id` divergente não grava.

### 12.3 Banco (PostgreSQL local + pgTAP)

Executado com PostgreSQL 14 local, schema `auth`/roles emulados e pgTAP; **não** foi executado no Supabase real.

- `anon` não executa o RPC.
- `authenticated` executa só para o próprio `auth.uid()`; `p_expected_user_id` divergente → `42501`.
- Primeira inserção com token nulo → `applied=true`.
- Replay do mesmo token → `applied=false`, documento atual.
- Token antigo → `applied=false`, sem mutação.
- Token atual → `applied=true`, `sync_id` novo, `updated_at` do servidor.
- Outro usuário não vê nem altera a linha.
- Payload inválido → `22023`; `v` string também é rejeitado.
- Concorrência real com duas conexões: token compartilhado e primeira inserção simultânea; uma vence, a outra recebe conflito.
- Resultado: **35 asserções pgTAP** (RLS existente + RPC) e os cenários de concorrência passam. `supabase test db` não foi executado porque a CLI/stack Supabase não está instalada; o harness local é a evidência disponível.

### 12.4 E2E (Playwright + mock)

`npm run e2e`: **164 testes** em 375/390/768/1280.

- `e2e/mock-supabase.mjs` mantém uma linha por usuário, autentica pelo `sub` do JWT, filtra GET por `user_id` e implementa o RPC CAS.
- Dois contextos com o mesmo usuário: A revisa um cartão, B revisa outro; ambos recarregam e convergem com histórico preservado.
- Offline (HTTP 500 na rota REST): revisão fica local, UI não anuncia sucesso; ao reconectar e recarregar, o remoto confirma e outro dispositivo recebe o cartão.
- Migração de convidado: snapshot em `kbr:v1` é migrado para a conta no login e chega a outro dispositivo.
- O mock não prova RLS/atomicidade; esses testes ficam no pgTAP/harness local.

### 12.5 Manual (pendente)

- Dois perfis/dispositivos reais da mesma conta (ver §9.5).
- Chrome desktop + PWA/iPhone real (quando disponível).
- Avião/offline e reconexão.
- Relógio adiantado/atrasado (opcional, documentar resultado).
- Login/logout, troca de conta e migração de convidado.
- Confirmar no Network que o cliente novo não faz DML direto.

### 12.6 Limitação de revisões concorrentes no mesmo cartão

O `Progress` v1 guarda o estado do cartão e uma lista de tentativas, mas **não** tem identidade/ordem de evento por revisão. Se dois dispositivos revisarem o mesmo cartão quase ao mesmo tempo:

- o merge escolhe a revisão mais nova por `reviewedAt` (ou inferência `due - intervalo`) e desempata deterministicamente;
- o histórico preserva as duas tentativas (IDs estáveis quando o cliente os gera);
- **não é possível garantir a composição sequencial exata** das duas revisões (por exemplo, “acerto depois erro” vs. “erro depois acerto”) nem reconstruir a ordem real de eventos sem uma tabela append-only/event sourcing.

Isso é aceitável para a 4D.2 e está documentado; a UI não promete ordem exata. A solução definitiva exigiria eventos imutáveis com identidade e projeção, fora do escopo atual.

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
- Aplicação da migração ou deploy do cliente em produção nesta sessão.

## 14. Critérios de aceite da 4D.2

- [x] Duas sessões que concluem lições diferentes mantêm as duas no remoto (merge + fake CAS).
- [x] Duas sessões que revisam cartões diferentes mantêm os dois (Vitest + e2e).
- [x] Duas sessões que revisam o mesmo cartão convergem deterministicamente; o histórico mantém as duas tentativas — com a limitação de ordem exata em §12.6.
- [x] Um cartão com revisão mais nova não é sobrescrito por uma lição posterior.
- [x] Relógio adiantado não deixa uma atividade não relacionada decidir o cartão.
- [x] Retry após response perdido não duplica nem troca o token à toa.
- [x] Offline + reconexão preserva o local e mescla o remoto (Vitest + e2e).
- [x] Migração de convidado é idempotente e não apaga a origem.
- [x] RPC rejeita `anon`, outro usuário, `p_expected_user_id` divergente e payload inválido (pgTAP local).
- [x] Nenhum progresso existente é resetado; migração é aditiva e não há backfill.
- [x] `npm run typecheck`, `npm test` (290), `npm run build` e `npm run e2e` (164) verdes.
- [x] pgTAP executado no PostgreSQL local; Supabase real não acessado (limitação registrada).
- [ ] Migração aplicada em staging/produção e teste manual em dois dispositivos reais (pendente, §9).

## 15. Commits da 4D.2

1. `feat: add reliable multi-device progress sync` — merge por cartão, `reviewedAt`/`Attempt.id`, RPC CAS, stores, AuthProvider, testes Vitest, pgTAP/harness local, mock/e2e multi-dispositivo e graphify.
2. `docs: record phase 4D.2 sync implementation` — arquitetura, roadmap, AGENTS, este plano e setup do Supabase.

Cada commit com typecheck/test/build verdes. O commit 1 contém a migração, mas **não** a aplica em produção; o deploy segue a ordem da §9 e não deve ir a produção sem o cliente novo e o teste manual.

## 16. Fase 4D.3 — preparação de deploy e validação real

**Status:** preparação concluída; execução remota pendente de aprovação. Nada foi aplicado no Supabase real, nenhum push/deploy foi feito e não houve teste com dois dispositivos reais.

Entregas:

- `docs/sync/deployment-runbook.md` — avaliação de prontidão, backup, preflight read-only, aplicação da migração pelo SQL Editor/CLI/conexão direta, verificação de função/grants/RLS, smoke test CAS em transação com `rollback`, deploy da Vercel, checklist A–I em duas sessões/dispositivos, garantias versus limites, rollback e riscos dos grants de DML direto.
- Revisão do código: o cliente novo lê `progress, sync_id` e grava **somente** com `POST /rest/v1/rpc/save_user_progress`; não há fallback de upsert. A migração é aditiva, `create or replace`, sem coluna/índice/backfill, e foi reaplicada com sucesso no PostgreSQL local.
- Verificações executadas: `npm run typecheck`; `npm test` (20 arquivos, 290 testes); `npm run build`; `npm run e2e` (164 testes, mock); PostgreSQL 14.24 local com 35 asserções pgTAP e 2 cenários de concorrência real com duas conexões (3 asserções). Supabase CLI, staging/produção, Vercel e dispositivos reais **não** foram acessados.
- Ordem mantida: migração e verificação do RPC primeiro, cliente depois. Não revogar DML nem migrar para `SECURITY DEFINER` nesta fase; isso continua sendo hardening separado (4D.4+), porque quebraria o rollback e os clientes antigos.

Limitações registradas: clientes antigos ainda podem fazer upsert direto durante a janela de rollout; a ordem exata de revisões concorrentes do mesmo cartão não é reconstruível no `Progress` v1; não há atualização ao vivo entre dispositivos; o backup/PITR, o project ref e o último deploy bom precisam ser confirmados pelo responsável antes de qualquer migração.

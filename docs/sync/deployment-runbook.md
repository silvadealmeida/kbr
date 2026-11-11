# KBR — Runbook de deploy seguro do CAS (Fase 4D.3)

**Status:** preparação concluída em 2026-11-10. **Nada foi aplicado no Supabase real, nenhum deploy foi feito e nenhum `git push` foi executado.** Este documento separa o que foi verificado localmente do que ainda depende de aprovação e acesso aos painéis.

**Escopo:** aplicar a migração aditiva `save_user_progress`, verificar o RPC no Supabase, implantar o cliente novo na Vercel e validar com duas sessões/dispositivos reais da mesma conta Google.

**Fora de escopo nesta fase:** revogar DML direto, migrar o RPC para `SECURITY DEFINER` (hardening futuro), alterar conteúdo, UI, CEFR A1, OAuth ou o formato do `Progress` v1.

**Documentos relacionados:** `docs/sync/implementation-plan.md` (§9–§10), `docs/sync/concurrency-audit.md`, `docs/sync/merge-invariants.md`, `docs/architecture.md` (§Sincronização multi-dispositivo), `docs/supabase-setup.md`.

## 1. Avaliação de prontidão

| Portão | Situação | Evidência |
|---|---|---|
| Commits da 4D.2 presentes | **Sim** | `e0fb1fc`, `ed4fc33`, `6fc38d3`; verificado em `HEAD = 6fc38d3` (o commit de documentação da 4D.3 é posterior) |
| Árvore de trabalho limpa no início | **Sim** | `git status --porcelain` vazio e `main` igual a `origin/main` antes das alterações de documentação desta fase |
| Cliente novo escreve só pelo RPC | **Sim** | `src/lib/storage/supabaseProgressStore.ts` lê `progress, sync_id` e grava com `supabase.rpc("save_user_progress", ...)`; não há fallback de upsert |
| Migração compatível com a tabela existente | **Verificado só em PostgreSQL local** | Migrações aplicadas do zero; RPC reaplicado com sucesso; 35 asserções pgTAP |
| Migração idempotente | **Sim, com ressalvas** | `create or replace function` + `revoke/grant`; reaplicação local passou. Falha se existir sobrecarga incompatível ou retorno diferente |
| Backup/PITR confirmado | **Não verificado** | Depende do painel Supabase e do plano do projeto |
| Projeto Supabase de destino confirmado | **Não verificado** | Depende de acesso ao painel; não houve leitura de produção |
| Último deploy bom identificado | **Não verificado** | Depende da Vercel; o repositório não registra deployment IDs |
| Migração aplicada em staging/produção | **Não** | Nenhum acesso remoto foi feito |
| Cliente novo implantado | **Não** | Nenhum push/deploy foi feito |
| Teste real em dois dispositivos | **Não** | Depende de conta Google e dispositivos reais |

**Conclusão:** o código e os testes locais estão prontos para uma execução controlada. A produção continua **bloqueada** até que backup/PITR, projeto de destino e último deploy bom sejam confirmados e o smoke test passe em staging. A ordem é obrigatória: **migração e verificação do RPC primeiro; cliente depois**.

## 2. Ordem segura obrigatória

1. Confirmar projeto, backup/PITR e último deploy bom.
2. Rodar o preflight read-only (§4).
3. Aplicar **somente** a migração do RPC (§5).
4. Verificar função, grants, RLS e dados intactos (§6).
5. Fazer o smoke test de CAS em staging, em transação com `rollback` (§6.3).
6. Implantar o cliente novo na Vercel (§7).
7. Verificar saúde e o Network do app (§7.3).
8. Executar o checklist A–I em duas sessões/dispositivos (§8).
9. Só depois avaliar o hardening de DML/`SECURITY DEFINER`, em fase separada.

Não inverta 3 e 6: o cliente novo **não tem fallback** para DML direto. Se o RPC não existir, a gravação remota falha e o app fica em `offline`, preservando apenas o local.

## 3. Backup e janela

### 3.1 Backup do banco

1. Abra o projeto correto no Supabase Dashboard e confirme o **project ref** na URL.
2. Vá em **Database → Backups** e confirme se há backup automático ou PITR disponível no plano.
3. Registre, fora do repositório e sem dados de progresso: project ref, data/hora, ID do backup e janela de restauração.
4. Se não houver backup nem PITR, **pare**. A migração é aditiva e não altera linhas, mas um snapshot ruim gravado por um cliente com bug só é recuperável por backup.

Opcional, para uma cópia lógica antes da janela:

```bash
# A URL contém credencial: use variável de ambiente, nunca a cole em issue/log/commit.
# Prefira conexão direta/session pooler permitida pelo projeto.
export SUPABASE_DB_URL='postgresql://...'
pg_dump --no-owner --no-privileges --data-only \
  --table=public.user_progress \
  "$SUPABASE_DB_URL" > /caminho/seguro/kbr-user-progress-$(date +%Y%m%d-%H%M).sql
chmod 600 /caminho/seguro/kbr-user-progress-*.sql
```

Esse arquivo contém dados pessoais de progresso. Não o envie por chat, não o commite, não o coloque em logs e apague-o depois da janela de verificação.

### 3.2 Baseline sem expor progresso

Antes da migração, guarde apenas agregados:

```sql
select count(*) as rows,
       count(*) filter (where sync_id is null) as null_sync_ids,
       min(updated_at) as oldest_update,
       max(updated_at) as newest_update
  from public.user_progress;
```

Não selecione `progress` em logs compartilhados. Para comparar depois, repita a mesma consulta e compare os agregados.

### 3.3 Janela e comunicação

- Escolha uma janela curta e avise que abas antigas devem ser recarregadas.
- Não faça o rollout durante uma aula ao vivo ou um período de uso intenso.
- Registre o commit implantado na Vercel e o horário da migração.

## 4. Preflight read-only

### 4.1 Confirmar o alvo

- Confirme no dashboard que o projeto é o de **staging** (ou produção, se for a janela aprovada), não um projeto de outro ambiente.
- Compare o project ref da URL com o project ref de `NEXT_PUBLIC_SUPABASE_URL` usado na Vercel; não imprima a chave publicável nem o JWT.
- Confirme que você está no SQL Editor do projeto certo antes de executar qualquer DDL.

```sql
select current_database() as database,
       current_user as role,
       current_setting('server_version') as pg_version;
```

### 4.2 Estrutura existente

```sql
select to_regclass('public.user_progress') is not null as table_exists;

select column_name, data_type, is_nullable, column_default
  from information_schema.columns
 where table_schema = 'public'
   and table_name = 'user_progress'
 order by ordinal_position;

select conname, pg_get_constraintdef(oid) as definition
  from pg_catalog.pg_constraint
 where conrelid = 'public.user_progress'::regclass
 order by conname;

select policyname, cmd
  from pg_catalog.pg_policies
 where schemaname = 'public'
   and tablename = 'user_progress'
 order by policyname;

select c.relrowsecurity as rls_enabled,
       c.relforcerowsecurity as rls_forced
  from pg_catalog.pg_class c
  join pg_catalog.pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public'
   and c.relname = 'user_progress';
```

O esperado é: tabela com `user_id uuid primary key`, `progress jsonb not null`, `sync_id uuid not null`, `updated_at timestamptz not null default now()`, o `CHECK` de `v = '1'` e RLS habilitado.

### 4.3 Grants atuais (risco de cliente antigo)

```sql
select grantee, privilege_type
  from information_schema.role_table_grants
 where table_schema = 'public'
   and table_name = 'user_progress'
 order by grantee, privilege_type;
```

Esperado: `authenticated` com `SELECT`, `INSERT`, `UPDATE`, `DELETE`; `anon` sem privilégios. **Esses grants são mantidos de propósito nesta fase** para rollback e clientes antigos. Eles são o principal risco de consistência durante o rollout (§9.1).

### 4.4 Função existente

```sql
select p.oid::regprocedure as signature,
       p.prosecdef as security_definer,
       p.proconfig as config,
       p.proacl as acl
  from pg_catalog.pg_proc p
  join pg_catalog.pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname = 'save_user_progress';

select count(*) as overloads
  from pg_catalog.pg_proc p
  join pg_catalog.pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname = 'save_user_progress';
```

- `count = 0`: primeira aplicação.
- `count = 1` com assinatura `(uuid, uuid, jsonb)`: reaplicação idempotente; `create or replace` atualiza a função.
- `count > 1` ou retorno diferente: **pare** e investigue; não aplique por cima de uma sobrecarga incompatível.

### 4.5 Histórico de migrações (opcional)

```sql
select version, name
  from supabase_migrations.schema_migrations
 order by version;
```

Se a relação não existir, o projeto foi configurado manualmente pelo SQL Editor. Nesse caso, **não use `supabase db push` às cegas**: ele pode tentar reaplicar a migração inicial. Prefira o SQL Editor (§5.1) nessa janela.

## 5. Aplicar a migração

### 5.1 SQL Editor (recomendado para este repositório)

1. Abra `supabase/migrations/20261110180000_add_save_user_progress_rpc.sql`.
2. Copie o arquivo **inteiro** (não só o `create function`; os `revoke/grant/comment` fazem parte da migração).
3. Cole no SQL Editor do projeto correto e execute uma vez.
4. Confira que não houve erro. O retorno esperado é a criação/substituição da função e os grants; nenhuma linha de `user_progress` é alterada.

A migração é idempotente nas condições atuais:

- `create or replace function` pode ser executada novamente com a mesma assinatura e o mesmo tipo de retorno;
- `revoke all` e `grant execute` também são idempotentes;
- nenhum `INSERT`, `UPDATE`, `DELETE`, `ALTER TABLE` ou backfill é executado.

Ela **não** é idempotente se já existir uma função com a mesma assinatura e retorno incompatível, ou se o schema tiver sido alterado fora das migrações. O preflight §4.4 detecta isso.

### 5.2 CLI (somente com histórico consistente)

O repositório não tem `supabase/config.toml`; não rode `supabase init` sem aprovação, porque ele cria arquivos. Se o projeto já estiver vinculado e o histórico de migrações estiver consistente:

```bash
supabase --version
supabase link --project-ref "$SUPABASE_PROJECT_REF"
supabase migration list
supabase db push --dry-run
supabase db push
```

`db push` pode aplicar **todas** as migrações pendentes. Use-o apenas se o histórico estiver limpo e se você aceitar esse comportamento. Para esta janela, o SQL Editor com o arquivo único é mais controlável.

### 5.3 Conexão direta (alternativa)

```bash
export SUPABASE_DB_URL='postgresql://...' # credencial efêmera; não commitar
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 \
  -f supabase/migrations/20261110180000_add_save_user_progress_rpc.sql
```

### 5.4 Aprovação explícita

**Pare aqui.** Nenhuma migração remota deve ser aplicada sem aprovação explícita do responsável pelo projeto. Registre quem aprovou, o horário e o project ref. Esta preparação não aplicou nada.

## 6. Verificação pós-migração

### 6.1 Função e grants

```sql
select p.oid::regprocedure as signature,
       p.prosecdef as security_definer,
       p.proconfig as config,
       p.proacl as acl
  from pg_catalog.pg_proc p
  join pg_catalog.pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname = 'save_user_progress';

select pg_catalog.has_function_privilege(
         'anon',
         'public.save_user_progress(uuid,uuid,jsonb)',
         'execute'
       ) as anon_can_execute,
       pg_catalog.has_function_privilege(
         'authenticated',
         'public.save_user_progress(uuid,uuid,jsonb)',
         'execute'
       ) as authenticated_can_execute;
```

Esperado:

- assinatura `save_user_progress(p_expected_user_id uuid, p_expected_sync_id uuid, p_progress jsonb)`;
- `security_definer = false` (SECURITY INVOKER);
- `config` contém `search_path=""`;
- `anon_can_execute = false`;
- `authenticated_can_execute = true`;
- uma única sobrecarga.

### 6.2 Dados intactos

Repita a consulta de baseline (§3.2). O número de linhas, `null_sync_ids`, `oldest_update` e `newest_update` devem ser iguais aos de antes. A migração não deve alterar `progress`, `sync_id` nem `updated_at`.

### 6.3 Smoke test de CAS em staging (transação com rollback)

Pré-requisitos:

- Use um **usuário de teste descartável de staging**, com **nenhuma linha** em `public.user_progress`.
- Obtenha o UUID em **Authentication → Users**. Não use a conta de um usuário real.
- Se o usuário já tiver linha, escolha outro; não apague dados para “preparar” o teste.

```sql
begin;

-- Emula a sessão autenticada do usuário de teste.
set local role authenticated;
select set_config('request.jwt.claim.sub', '<TEST_USER_UUID>', true);
select set_config(
  'request.jwt.claims',
  json_build_object('sub', '<TEST_USER_UUID>', 'role', 'authenticated')::text,
  true
);

do $$
declare
  v_user uuid := '<TEST_USER_UUID>';
  v_payload jsonb := '{"v":1,"lessons":{},"cards":{},"history":[],"streak":0,"dailyGoal":10,"lastActive":"2026-11-10T12:00:00.000Z"}'::jsonb;
  v_first record;
  v_second record;
  v_conflict record;
begin
  -- 1. Primeira escrita com token nulo.
  select * into v_first
    from public.save_user_progress(v_user, null, v_payload);
  if not v_first.applied or v_first.current_sync_id is null then
    raise exception 'first write did not apply';
  end if;

  -- 2. Token atual aplica a próxima versão.
  select * into v_second
    from public.save_user_progress(
      v_user,
      v_first.current_sync_id,
      jsonb_set(v_payload, '{streak}', '2'::jsonb)
    );
  if not v_second.applied or (v_second.progress ->> 'streak') <> '2' then
    raise exception 'second write did not apply';
  end if;

  -- 3. Token antigo devolve conflito e não muta a linha.
  select * into v_conflict
    from public.save_user_progress(
      v_user,
      v_first.current_sync_id,
      jsonb_set(v_payload, '{streak}', '9'::jsonb)
    );
  if v_conflict.applied or (v_conflict.progress ->> 'streak') <> '2' then
    raise exception 'stale token did not conflict as expected';
  end if;

  -- 4. RLS não deve expor linhas de outra conta.
  if exists (
    select 1 from public.user_progress where user_id <> v_user
  ) then
    raise exception 'RLS leaked another user row';
  end if;

  -- 5. Asserção de sessão: outro usuário no payload deve falhar com 42501.
  begin
    perform *
      from public.save_user_progress(
        '00000000-0000-4000-8000-000000000000',
        null,
        v_payload
      );
    raise exception 'expected 42501 for session mismatch';
  exception when sqlstate '42501' then
    null;
  end;

  -- 6. Envelope inválido deve falhar com 22023.
  begin
    perform *
      from public.save_user_progress(v_user, null, '{"v":"1"}'::jsonb);
    raise exception 'expected 22023 for invalid payload';
  exception when sqlstate '22023' then
    null;
  end;

  raise notice 'CAS smoke ok (no token or progress printed)';
end $$;

rollback;
```

Resultado esperado: três operações de CAS, uma mensagem `CAS smoke ok`, `ROLLBACK` e nenhuma linha persistida para o usuário de teste. O `rollback` é obrigatório; não troque por `commit` em produção. Nenhum `sync_id`, JWT ou documento de progresso deve ser copiado para tickets ou logs.

> Observação: se o SQL Editor não aceitar `begin/rollback` no modo de execução usado, execute o mesmo bloco em uma conexão `psql` de staging. Não rode o smoke em produção com a conta de um usuário real.

### 6.4 Verificação do PostgREST e do cliente

Depois do deploy do cliente, mas antes de considerar a fase concluída:

1. Entre em staging com a conta de teste.
2. Abra o DevTools → Network e filtre `save_user_progress`.
3. Conclua uma lição ou revisão.
4. Confirme `POST /rest/v1/rpc/save_user_progress` com HTTP 200 e `applied: true`.
5. Confirme que **não** há `PATCH/POST /rest/v1/user_progress`.
6. Confirme no console apenas mensagens `[kbr] falha de sincronização: <categoria>` em caso de falha; nunca o documento.

Se o RPC retornar erro:

| Sintoma | Causa provável | Ação |
|---|---|---|
| `PGRST202` / função não encontrada | Migração não aplicada ou schema errado | Não implante o cliente; aplique a migração e repita §6.1 |
| `401/403` / `42501` | Sessão expirada ou `p_expected_user_id` divergente | Recarregue/login; confirme o usuário do store; não force DML |
| `22023` | Envelope inválido | Verifique a versão do cliente; não relaxar o RPC sem revisão |
| `5xx`/timeout | RPC/PostgREST instável | Mantenha local, status `offline`; investigue logs; não anuncie sucesso |

## 7. Deploy do cliente

### 7.1 Antes do push

```bash
git status --porcelain     # deve estar vazio
git log --oneline -5
npm run typecheck
npm test
npm run build
npm run e2e
```

Registre o SHA que será implantado. Este runbook foi preparado a partir de `6fc38d3` (mais os commits de documentação da 4D.3, se houver). Não faça push automático.

### 7.2 Variáveis de ambiente da Vercel

Confirme em **Project → Settings → Environment Variables**:

- `NEXT_PUBLIC_SUPABASE_URL` — mesmo project ref do banco migrado;
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — chave publicável, não `service_role`;
- os valores precisam existir em **Production** e, se houver preview, em **Preview**;
- não adicione `service_role`, secret key ou client secret do Google ao runtime do app. O app só lê as duas variáveis `NEXT_PUBLIC_*` (`src/lib/supabase/config.ts`).

Se qualquer variável for alterada, é necessário um novo deploy. Não copie valores para o chat ou para o commit.

### 7.3 Push e deploy

Com aprovação explícita:

```bash
git push origin main
```

Se a Vercel estiver conectada ao repositório, o push para `main` inicia o deploy de produção. Acompanhe **Deployments** até `Ready`. Se o deploy for manual, use o projeto já vinculado (`vercel --prod`) somente depois de confirmar o Project ID; não vincule um projeto errado.

### 7.4 Saúde em produção

1. Abra `/` e `/privacidade`.
2. Faça login com a conta de teste e abra `/dashboard`.
3. Conclua uma lição curta; confirme `POST /rest/v1/rpc/save_user_progress` 200.
4. Confirme que não há DML direto em `user_progress`.
5. Recarregue e confirme que o progresso persiste.
6. Verifique os logs da Vercel e do Supabase apenas por status/categoria.
7. Se houver erro de RPC, faça rollback do cliente antes de investigar mudanças no banco.

## 8. Checklist de teste real em duas sessões/dispositivos

### 8.1 Preparação

- Use **duas sessões independentes** com a mesma conta Google: por exemplo, Chrome desktop + janela anônima/perfil separado ou PWA em outro dispositivo. Duas abas do mesmo perfil não provam isolamento de sessão.
- Se possível, use uma **conta de teste** e não a conta principal, porque não há exportação/importação de progresso na UI.
- Registre o estado inicial: lições concluídas, quantidade de cartões, caixas e tamanho do histórico. Não copie o JSON completo para logs.
- Confirme que ambos os dispositivos estão no mesmo projeto Supabase e com o cliente novo (Network usando o RPC).

### 8.2 Como inspecionar sem expor dados

- **Network:** filtre `save_user_progress`; verifique status, `applied` e `current_sync_id`. Não copie o corpo com `p_progress` para tickets.
- **Console:** em falha, deve aparecer apenas `[kbr] falha de sincronização: <kind>`; não há PII.
- **localStorage:** apenas a chave da própria conta, `kbr:user:<uuid>:v1`; confira `lessons`, `cards`, `history` e os campos `reviewedAt`/`id`.
- **Supabase:** logs de API por status; não rode `select progress` em canais compartilhados.
- **Nunca** use `service_role` no navegador para “ver se está lá”.

### 8.3 Casos A–I

| Caso | Ação | Resultado esperado | Como investigar falha |
|---|---|---|---|
| **A. A conclui uma lição** | No dispositivo A, conclua uma lição desbloqueada (ex.: `h01`). Espere o status de sincronização. | Local atualizado imediatamente; status vai a “Progresso sincronizado”; o RPC retorna `applied: true`; B, após recarregar, vê a lição concluída. | RPC 404 → migração ausente; 401/403 → sessão; 22023 → payload; se a UI diz “pendente”, o remoto não confirmou. |
| **B. B carrega o progresso atualizado** | Recarregue B e abra `/dashboard` e `/hangul`. | B mostra a lição e o histórico de A; não há duplicação; o snapshot local de B é atualizado. | B só recebe no load/login; não espere atualização ao vivo. Se não aparecer, confira se B recarregou e se o RPC de A foi confirmado. |
| **C. A e B concluem lições diferentes** | A conclui uma lição; B recarrega e conclui outra lição já desbloqueada; recarregue ambos. | As duas lições aparecem nos dois; scores são monotônicos; o histórico preserva as duas tentativas. | Um dos lados ausente sugere upsert de cliente antigo ou merge não aplicado; confira `applied: false` seguido de retry e o SHA do cliente. |
| **D. A e B revisam cartões diferentes** | Em cada dispositivo, abra `/revisao` e revise um cartão diferente. Se não houver cartões, crie erros em lições diferentes e sincronize. Recarregue ambos. | As duas caixas avançam; o histórico tem duas tentativas; a fila reflete os dois cartões. | Confira `cards[chave].box`, `due`, `reviewedAt` e `history.length`; um cartão sobrescrito indica merge por lado errado ou cliente antigo. |
| **E. A e B revisam o mesmo cartão** | Garanta o mesmo cartão vencido nos dois; revise quase ao mesmo tempo. Recarregue ambos. | As duas tentativas ficam no histórico; a caixa final é a da revisão mais nova por `reviewedAt` (ou inferência), com desempate determinístico; se ambas acertarem, o resultado é o mesmo. **A ordem sequencial exata não é garantida.** | Confira os dois `Attempt.id` e `reviewedAt`; se só houver uma tentativa, verifique IDs ausentes (cliente antigo) ou sobrescrita. Não exija “erro depois acerto” reconstruído. |
| **F. A fica offline e reconecta** | Com a página já carregada, ative offline no DevTools, faça uma revisão e confirme o aviso “Salvo neste dispositivo… pendente”. Volte online e recarregue. | A revisão fica local, a UI não anuncia sucesso; após reconectar e recarregar, o remoto confirma e B recebe. | Recarregar **enquanto offline** pode falhar: não há service worker/shell offline. Verifique `localStorage` e o status; não conclua perda só porque o reload offline não abriu. |
| **G. Atualize os dois e compare** | Recarregue A e B; compare lições, cartões e contagem de histórico. | Ambos convergem para o mesmo conjunto; não há tentativas duplicadas; uma linha por usuário. | Compare contagens e chaves, não o JSON bruto; `lastActive` pode variar. Divergência persistente → colete status HTTP e `applied`, não o progresso. |
| **H. Logout e login novamente** | Faça logout, login na mesma conta, abra o painel. Depois entre em outra conta e volte à primeira. | O progresso é restaurado; a migração de convidado é idempotente; nenhum dado é enviado para a conta errada. | Se um store atrasado tentar gravar, o RPC deve retornar 42501. Confira `p_expected_user_id` no Network e as chaves `kbr:user:<uuid>:v1`. |
| **I. Isolamento entre usuários** | Entre com uma segunda conta Google; abra painel, Hangul e revisão. Tente rotas privadas. | A segunda conta vê apenas o próprio progresso (ou vazio); RLS e a asserção de sessão impedem leitura/escrita cruzada. | Se houver dado de outra conta, **pare**, faça rollback do cliente e preserve evidências sem exportar progresso. Verifique políticas RLS e grants; não “corrija” desabilitando RLS. |

### 8.4 Ordem prática sugerida

1. A conclui `h01`; B recarrega e confirma.
2. A conclui `h02`; B recarrega, conclui `h03`; ambos recarregam.
3. Criar/garantir cartões vencidos; A revisa um, B revisa outro.
4. Repetir com o mesmo cartão.
5. Fazer o teste offline em A, reconectar e confirmar em B.
6. Recarregar ambos e comparar.
7. Logout/login e troca de conta.
8. Repetir o fluxo principal em 375/390 px e no PWA instalado.

## 9. Garantias exatas e limites do `Progress` v1

### 9.1 O que o sistema garante

- **Isolamento por usuário:** RLS e o RPC usam `auth.uid()`; `p_expected_user_id` divergente gera `42501` e não grava.
- **CAS atômico por linha:** com o mesmo token, no máximo uma escrita aplica; token antigo devolve `applied=false` e o snapshot vencedor sem mutação.
- **Retry idempotente:** conflito → merge no cliente → nova tentativa com o token novo, até 3 tentativas; resposta perdida após aplicar tende a convergir sem duplicar.
- **Merge determinístico:** lições e scores são monotônicos; cartões usam `reviewedAt`/inferência; histórico é canônico, com dedup por `Attempt.id` e fallback pela tupla.
- **Local-first:** a gravação local acontece antes da remota; falha remota vira `offline` e não apaga o local.
- **Convergência após load/login:** lições/cartões diferentes feitos em duas sessões aparecem nos dois após recarregar.
- **Status honesto:** `synced` só após `applied=true`; falha/retries esgotados viram `offline`; a UI não promete nuvem quando o remoto falhou.
- **Compatibilidade de rollout:** clientes antigos continuam lendo e gravando por DML direto; a migração é aditiva.

### 9.2 O que não é garantido

- **Atualização ao vivo:** não há push/websocket; o outro dispositivo precisa recarregar ou fazer login.
- **Ordem exata de revisões concorrentes do mesmo cartão:** o v1 não tem evento imutável por revisão; a caixa final é a mais nova por carimbo do cliente, não necessariamente a ordem real. Relógios divergentes podem inverter a escolha.
- **Proteção contra cliente antigo:** durante a janela de rollout, um upsert direto pode sobrescrever um snapshot novo; campos novos (`reviewedAt`, `Attempt.id`) podem desaparecer. Dados perdidos não são reconstruíveis sem backup.
- **Merge profundo no servidor:** o RPC valida o envelope; a semântica do merge é do cliente. Um cliente com bug pode gravar um documento formalmente válido e semanticamente estranho.
- **Offline completo:** não há service worker; offline só funciona com a página já carregada.
- **Exportação/importação:** não existe na UI; limpar o navegador ou perder o dispositivo pode perder o cache local.
- **Histórico ilimitado:** o array cresce; não há poda nem tabela append-only.
- **Métricas de conflito:** não há analytics; a observação é por logs, Network e relatos.
- **Mesma conta em várias abas:** o CAS resolve a escrita, mas a aba perdedora só mostra o resultado no próximo load.
- **Validação profunda no banco:** o `CHECK` e o RPC validam forma, não todas as invariantes do `Progress`.

## 10. Rollback

### 10.1 Cliente (Vercel)

1. Abra **Deployments** e localize o deployment de produção anterior, com o commit/SHA e a data registrados antes da janela.
2. Use **Promote to Production** / **Instant Rollback** para esse deployment.
3. Confirme a URL de produção e o SHA.
4. Entre e confirme que o app volta a funcionar; o cliente antigo volta ao upsert direto, que continua permitido.

### 10.2 Banco

- A função pode permanecer: é aditiva e não altera dados.
- Se for necessário removê-la, faça **depois** do rollback do cliente e confirme que não há tráfego para o RPC:

```sql
-- Somente após o rollback do cliente e a janela sem chamadas.
drop function if exists public.save_user_progress(uuid, uuid, jsonb);
```

`drop function` não apaga `public.user_progress`. Não rode esse comando durante a janela com clientes novos ativos.

### 10.3 Dados

- Não há “down migration” de dados; a migração não altera linhas.
- Se um cliente com bug gravar um snapshot ruim, o backup/PITR é o único caminho. Antes de restaurar, exporte/inspecione a linha afetada em local seguro para não perder atividade posterior.
- Restaurar o banco reverte todas as escritas posteriores ao ponto escolhido; isso é uma decisão separada e exige aprovação.

### 10.4 Progresso local pendente

- O cache local continua válido e não é apagado pelo rollback.
- Com o cliente antigo, a próxima gravação é um upsert integral do snapshot local. Se esse snapshot estiver atrasado, ele pode sobrescrever dados remotos mais novos.
- Antes de um rollback emergencial, se possível, deixe o cliente novo sincronizar o pendente ou copie o `localStorage` da própria conta para local seguro. Não há exportação na UI; o conteúdo contém dados pessoais.
- A migração de convidado usa marcador idempotente; um retry após rollback não deve duplicar a migração, mas o upsert antigo continua sem CAS.

### 10.5 Detectar conflitos e falhas

- **Network:** resposta do RPC com `applied=false`; o cliente tenta novamente. Depois do limite, o status fica `offline` e `syncErrorKind` tende a `conflict`.
- **Console:** apenas a categoria (`network`, `auth`, `validation`, `invalid-remote`, `conflict`, `unexpected`); não há PII.
- **Supabase:** logs de API por status (`42501`, `22023`, `5xx`, timeout). Não há métrica automática de conflitos.
- **Sintoma de cliente antigo:** escrita em `PATCH/POST /rest/v1/user_progress` em vez do RPC, ou `sync_id` trocado sem `applied`.
- **Sintoma de dado perdido:** lição/cartão presente em um dispositivo e ausente no remoto após reload; nesse caso, pare o rollout e preserve evidências.

### 10.6 Risco dos grants de DML direto

`authenticated` mantém `SELECT/INSERT/UPDATE/DELETE` na tabela. Isso é intencional para rollback e clientes antigos, mas significa que:

- qualquer cliente antigo pode fazer upsert sem CAS;
- um snapshot antigo pode sobrescrever um snapshot novo;
- o RPC novo não consegue impedir esse caminho.

**Não revogue esses grants nesta fase.** O hardening exige um plano separado, RPC `SECURITY DEFINER` com owner dedicado, `search_path` controlado, testes de escalada e rollback. Atenção: `SELECT ... FOR UPDATE` no RPC atual depende do privilégio de `UPDATE`; revogar DML sem migrar o RPC quebraria a função.

## 11. Registro dos testes executados nesta preparação

| Verificação | Ambiente | Resultado |
|---|---|---|
| `npm run typecheck` | Local, Node 20 | Passou |
| `npm test` | Local, Vitest | 20 arquivos, 290 testes passaram |
| `npm run build` | Local, Next 16.4.6 | Passou |
| `npm run e2e` | Local, Playwright + Supabase mock em memória | 164 testes passaram (375/390/768/1280); não prova atomicidade real |
| Migrações do zero | PostgreSQL 14.24 local, cluster temporário | Passou |
| pgTAP | PostgreSQL local | 35 asserções (RLS + RPC), 2 arquivos, passou |
| Concorrência real | Duas conexões PostgreSQL locais | 2 cenários passaram (3 asserções) |
| Reaplicação da migração do RPC | PostgreSQL local | Passou; função e grants mantidos |
| Metadados do RPC | PostgreSQL local | `SECURITY INVOKER`, `search_path=""`, `anon=false`, `authenticated=true` |
| Supabase CLI / `supabase test db` | Não disponível | Não executado |
| Staging/produção Supabase | Não acessado | Não executado |
| Vercel / deploy | Não acessado | Não executado |
| Google OAuth real / dois dispositivos | Não disponível | Não executado |
| iPhone/Chrome iOS real | Não disponível | Não executado |

O mock de e2e usa uma linha em memória por usuário e um CAS de mentira; ele prova o fluxo do cliente, não a atomicidade do PostgreSQL. A atomicidade e a RLS foram exercitadas no cluster local e nos testes pgTAP.

## 12. Ações que exigem o usuário

1. **Aprovar** a janela e o ambiente (staging primeiro; produção depois).
2. **Confirmar backup/PITR** e registrar o ID/janela no painel Supabase.
3. **Confirmar o project ref** de destino e que ele é o mesmo de `NEXT_PUBLIC_SUPABASE_URL` na Vercel.
4. **Registrar o último deployment bom** da Vercel (URL, SHA, data) antes de qualquer mudança.
5. **Aprovar explicitamente** a aplicação da migração; depois executar §5.1 e §6.
6. **Aprovar o push/deploy** do cliente; executar §7.3 e §7.4.
7. **Executar o checklist A–I** em duas sessões/dispositivos reais e registrar apenas resultados, sem progresso, JWT ou tokens.
8. **Decidir o hardening** de DML/`SECURITY DEFINER` em uma fase separada, com plano e rollback próprios.

Até que 1–5 sejam concluídos, a fase permanece **preparada, não validada em produção**. Nenhum resultado real deve ser declarado sem esses passos.

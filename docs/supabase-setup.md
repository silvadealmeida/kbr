# Supabase e Google OAuth — configuração manual

O KBR usa somente a URL e a chave **publicável** do Supabase no app. O client secret do Google permanece no painel do Supabase. Não use nem copie uma `service_role`/secret key para o projeto, para o navegador ou para o deploy.

## 1. Criar e preparar o projeto Supabase

1. Crie um projeto no Supabase.
2. Aplique `supabase/migrations/20261110120000_create_user_progress.sql` e `supabase/migrations/20261110180000_add_save_user_progress_rpc.sql` pelo SQL Editor, ou vincule o Supabase CLI e execute `supabase db push`. A segunda é aditiva (função + grants) e não altera dados; leia a ordem de deploy em `docs/sync/implementation-plan.md` §9 antes de aplicá-la em produção.
3. Confirme no Table Editor que `public.user_progress` tem RLS habilitado e que `public.save_user_progress(uuid,uuid,jsonb)` existe com `SECURITY INVOKER`, `search_path` vazio e `EXECUTE` só para `authenticated`.
4. Para validar as políticas e o RPC com Docker e Supabase CLI, execute `supabase test db`. Os testes estão em `supabase/tests/user_progress_rls.test.sql` e `supabase/tests/save_user_progress_rpc.test.sql`; cobrem acesso anônimo, proprietário, outro usuário, CAS, validação de payload e conflito. Sem CLI, o harness local equivalente é `PGUSER=postgres ./supabase/tests/local/run-local-sql-tests.sh` (PostgreSQL + pgTAP + concorrência real com duas conexões).
5. Confirme que o cliente usa `POST /rest/v1/rpc/save_user_progress` para gravar e que não há `PATCH/POST /rest/v1/user_progress` no Network.

Não desabilite RLS para resolver erros de sincronização. Verifique primeiro se as migrations foram aplicadas e se a sessão está autenticada. Os grants de DML direto na tabela foram mantidos na 4D.2 para rollback/clientes antigos; não os revogue sem o hardening planejado (4D.3+).

## 2. Configurar o Google Auth Platform

1. No Google Cloud, abra **Google Auth Platform** e configure Branding, Audience e Data Access.
2. Mantenha apenas os escopos necessários: `openid`, email e perfil.
3. Crie um OAuth Client do tipo **Web application**.
4. Em **Authorized JavaScript origins**, adicione a origem local (`http://localhost:3000`) e a origem HTTPS de produção.
5. Em **Authorized redirect URIs**, adicione a callback exibida em Supabase → Authentication → Providers → Google. Ela tem o formato `https://<project-ref>.supabase.co/auth/v1/callback`.
6. Copie Client ID e Client Secret para o provider Google no painel Supabase. Nunca coloque o Client Secret em `.env.local`.

Referência oficial: https://supabase.com/docs/guides/auth/social-sign-in/auth-google

## 3. Configurar URLs no Supabase

Em Authentication → URL Configuration:

- **Site URL:** origem HTTPS de produção.
- **Redirect URLs:** `http://localhost:3000/auth/callback` e `https://SEU-DOMINIO/auth/callback`.
- Se houver deploys de preview, adicione somente o padrão de URL necessário para esses ambientes.

O `redirectTo` enviado pelo app precisa constar nessa lista. Referência: https://supabase.com/docs/guides/auth/redirect-urls

## 4. Variáveis do app

Copie `.env.example` para `.env.local` e preencha:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SUBSTITUA
```

As duas variáveis são públicas por projeto. A proteção dos dados vem da sessão do usuário e das políticas RLS. `.env.local` já é ignorado pelo Git.

## 5. Deploy e verificação

- Faça deploy como aplicação Next.js com runtime Node; `src/proxy.ts` renova os cookies de sessão e bloqueia as rotas privadas.
- Entre com Google no Chrome desktop e na PWA mobile.
- Confirme que um usuário cria somente uma linha em `user_progress` e que outro usuário não consegue lê-la no SQL/DB test.
- Estude como convidado antes do primeiro login e confirme que lições, cartões/revisões e streak aparecem após entrar.
- Desative a rede depois de carregar a conta, faça uma alteração e confirme o estado “Salvo neste dispositivo”; ao reconectar e entrar novamente, a sincronização deve ser repetida.

Não há suporte offline completo: o cache local protege o progresso durante falhas de rede, mas o shell PWA ainda não usa service worker.

# KBR — Auditoria de privacidade e avaliação legal (Fase 2B)

Data da auditoria: 10 de novembro de 2026.
Escopo: aplicação em `src/`, dependências em `package.json`, configuração de deploy e páginas públicas.
Status: auditoria técnica concluída; revisão jurídica e dados de contato pendentes.

Este documento registra o que o código **realmente** faz. A política pública está em `/privacidade` (`src/app/(site)/privacidade/page.tsx`) e o aviso legal em `/impressum`.

## 1. Inventário de cookies

Os cookies de autenticação são criados por `@supabase/ssr` (versão 0.12.0), não por código próprio do KBR.

| Cookie | Origem | Finalidade | Atributos observados |
|---|---|---|---|
| `sb-<project-ref>-auth-token` (com partes `.0`, `.1`…) | Supabase Auth | Sessão e refresh token; mantém o usuário conectado | `Path=/`, `SameSite=Lax`, `HttpOnly=false`, `Max-Age` padrão de 400 dias |
| `sb-<project-ref>-auth-token-code-verifier` | Supabase Auth | Verificador PKCE durante o login Google | Temporário; removido ao concluir ou falhar o fluxo |

Observações:

- `HttpOnly=false` é o padrão do SDK: o cliente no navegador precisa ler o cookie para renovar a sessão. Não há cookie de sessão próprio do KBR.
- O `Max-Age` de 400 dias é o padrão do SDK (`DEFAULT_COOKIE_OPTIONS`). A configuração do projeto Supabase pode alterar validade e rotação; o valor efetivo deve ser confirmado no painel antes do lançamento.
- Não há cookies de analytics, publicidade, personalização ou rastreamento entre sites no código da aplicação.
- Vercel pode usar cookies próprios em deploys de preview/proteção de deployment, fora do fluxo do visitante em produção. Isso deve ser confirmado nas configurações do projeto Vercel.

## 2. Inventário de `localStorage`

Todo acesso passa por `lib/storage` ou pelos pontos documentados abaixo. Não há uso de `sessionStorage` ou IndexedDB.

| Chave | Gravada em | Conteúdo | Observação |
|---|---|---|---|
| `kbr:theme` | `src/app/layout.tsx`, `ThemeToggle.tsx` | `"dark"` ou `"light"` | Preferência de tema; não identifica o usuário. |
| `kbr:v1` | `lib/storage` (modo convidado) | Snapshot `Progress` v1: lições, cartões/SRS, histórico, streak, meta diária, última atividade | Não é enviado ao servidor enquanto o usuário é convidado. |
| `kbr:user:<uuid>:v1` | `AuthProvider` / `syncProgress` | Cópia local do snapshot da conta | Isolada por UUID; usada para leitura local-first e sincronização. |
| `kbr:migrated:<uuid>:v1` | `syncProgress` | Snapshot serializado do progresso de convidado já migrado | Contém dados de aprendizagem; evita migração repetida. |

O progresso remoto fica em `public.user_progress` (PostgreSQL/Supabase), com uma linha por `auth.users.id`, protegida por RLS para SELECT/INSERT/UPDATE/DELETE do próprio usuário. Não há `service_role` no navegador nem no projeto.

## 3. Analytics, scripts e serviços de terceiros

Auditoria de `src/` e `package.json`:

- **Não há** Google Analytics, GTM, Vercel Analytics/Speed Insights, Plausible, PostHog, Hotjar, Mixpanel, Clarity, Meta Pixel ou similares.
- **Não há** iframes, embeds de vídeo, mapas, chat ou botões sociais de terceiros.
- **Não há** service worker, cache offline ou sincronização em background.
- **Google:** usado apenas como provedor OAuth via Supabase. `next/font/google` baixa a fonte Noto Sans KR durante o build e a serve pelo próprio domínio; o visitante não faz requisição ao Google Fonts em tempo de execução.
- **Supabase:** autenticação e banco de dados.
- **Vercel:** hospedagem e logs técnicos de acesso/erro.
- **GitHub:** link externo no README, não embutido no app.

O teste `tests/site.test.ts` varre `src/` e falha se um rastreador conhecido, banner de consentimento ou iframe for introduzido.

## 4. Avaliação de consentimento

Situação atual: apenas cookies estritamente necessários (sessão/autenticação) e armazenamento local necessário ao funcionamento e à preferência de tema. Não há rastreamento não essencial.

Conclusão: **não implementar banner de consentimento agora**. Um banner sem opção real de recusa seria ruído e não melhoraria a conformidade.

Se um recurso não essencial for adicionado (analytics, ads, mapas, embeds, testes A/B), o mecanismo proposto é:

1. Banner antes de qualquer script não essencial, com “Aceitar” e “Recusar” igualmente visíveis e sem opções pré-marcadas.
2. Nenhuma requisição de rastreamento antes da escolha; scripts carregados somente após consentimento.
3. Registro da escolha (data, versão do texto, categorias) e link permanente para reabrir preferências.
4. Separação por finalidade (analytics, publicidade, conteúdo externo), sem consentimento “tudo ou nada”.
5. Revisão de base legal: analytics próprio pode ter legítimo interesse, mas ePrivacy/GDPR e LGPD exigem análise caso a caso; publicidade comportamental exige consentimento.

## 5. Retenção e exclusão

O código atual **não define prazo de retenção** e **não oferece exclusão de conta pelo app**. A política pública não inventa prazos.

Pendências antes do lançamento:

- definir prazo de retenção do snapshot remoto e dos logs dos provedores;
- criar fluxo de exclusão de conta (UI + remoção no Supabase Auth/`user_progress`) ou processo manual documentado;
- definir prazo de resposta a pedidos de titulares;
- confirmar região do projeto Supabase e instrumentos de transferência internacional (SCC/DPA);
- confirmar se o Supabase e a Vercel oferecem os DPAs necessários e arquivá-los.

## 6. Avaliação de Impressum (Alemanha)

Base legal a considerar: § 5º da DDG (Digitale-Dienste-Gesetz, sucessora da TMG) para identificação do provedor e § 18, § 2º da MStV para conteúdo editorial. A obrigação alcança serviços digitais oferecidos de forma empresarial; sites estritamente privados podem estar dispensados, mas a fronteira depende do caso concreto.

Fatores que aumentam o risco de exigência:

- site público com cadastro e contas de usuário;
- oferta contínua e organizada, não apenas uma página pessoal;
- possibilidade de monetização, patrocínio ou uso profissional;
- operação a partir da Alemanha e acessibilidade ao público alemão.

**Conclusão preliminar:** a exigência é provável se o KBR for operado de forma empresarial ou profissional; a dispensa só deve ser assumida após revisão jurídica. Até lá, `/impressum` existe com aviso explícito de documento incompleto e não deve ser tratado como conformidade final.

Dados ausentes para completar o Impressum:

- nome completo ou razão social do provedor;
- endereço postal completo na Alemanha (sem caixa postal);
- e-mail e, se exigido, telefone;
- representante legal, se houver pessoa jurídica;
- registro comercial (Handelsregister) e número, se aplicável;
- USt-IdNr. (VAT ID), se aplicável;
- responsável pelo conteúdo editorial (§ 18, § 2º MStV);
- confirmação sobre a natureza privada/comercial da operação.

## 7. Riscos e limites conhecidos

- **Revisão jurídica:** o texto foi escrito a partir do comportamento do código, não por advogado. Bases legais, transferências internacionais e Impressum precisam de validação.
- **Cookies do Supabase:** validade e atributos podem mudar com versão do SDK ou configuração do projeto; revalidar antes do lançamento.
- **Logs de terceiros:** Vercel e Supabase podem reter logs conforme suas próprias políticas; os prazos não estão confirmados.
- **Exclusão:** sem automação, pedidos dependem de contato ainda não publicado.
- **iPhone/Chrome iOS:** a experiência real de cookies e PWA continua exigindo teste manual.

## 8. Checklist antes do lançamento público

- [ ] Preencher controlador, contato e eventual DPO em `/privacidade`.
- [ ] Definir prazos de retenção e processo de exclusão.
- [ ] Confirmar região Supabase, DPAs e transferências internacionais.
- [ ] Concluir a avaliação do Impressum e preencher `/impressum` ou remover a página com justificativa registrada.
- [ ] Revalidar cookies e `localStorage` após qualquer nova dependência.
- [ ] Repetir `npm run typecheck`, `npm test`, `npm run build` e `npm run e2e`.

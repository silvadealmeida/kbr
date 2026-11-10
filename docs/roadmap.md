# KBR — Roadmap

## Estado atual (atualize a cada commit — é o ponto de retomada entre agentes)
- **Fase concluída:** 3A (currículo, pesquisa pedagógica e especificação do módulo Hangul).
- **Em andamento:** nada. A Fase 3B (implementação do módulo Hangul) **não foi iniciada** e só começa com pedido explícito.
- **Próximo passo:** Fase 3B — implementar `src/content/hangul`, os nove tipos de exercício, o player e os checkpoints conforme `docs/pedagogy/`.
- **Bloqueios / decisões pendentes:** revisão de todo o conteúdo coreano por falante nativo/professor (status `in-review`); revisão jurídica da política/Impressum (faltam identidade do controlador, contato, prazos de retenção, região Supabase e DPAs); executar `supabase test db` contra a stack local; testar o fluxo completo em iPhone/Chrome iOS real (manual); validar o login real com Google no deploy após a mudança do destino pós-login para cookie.
- **Último agente:** OpenCode.

Fases pequenas, cada uma com commit(s) próprio e `npm test` verde antes de avançar.

| # | Fase | Entrega | Verificação |
|---|---|---|---|
| 0 | Pesquisa e arquitetura (**feita**) | docs/* | — |
| 1 | Scaffold (**feita**, só Chromium; WebKit/iPhone pendentes) | `git init`, Next+TS+Tailwind, Vitest, Playwright, fontes, shell com nav, tema claro/escuro | `npm run build`, smoke e2e |
| 2 | Núcleo puro (**feita**) | `lib/hangul`, `lib/exercises`, `lib/srs` (Leitner), `lib/storage` + testes | Vitest |
| 2A | Conta e sincronização (**feita no código; configuração externa pendente**) | Google OAuth, sessão SSR, guest mode, PostgreSQL/RLS, migração e sync resiliente | Vitest + Supabase DB tests |
| 2B | Landing, rotas protegidas e privacidade (**feita; revisão jurídica pendente**) | landing pública original, shell público, `/dashboard` autenticado, proteção de rotas, `/privacidade`, `/impressum`, auditoria de cookies/localStorage/terceiros | Vitest + Playwright |
| 3A | Currículo e arquitetura do Hangul (**feita**) | 5 documentos em `docs/pedagogy/`: currículo de 25 lições + 4 checkpoints, referência de Hangul, pronúncia para brasileiros, design de 9 tipos de exercício e schema de conteúdo | typecheck + test + build |
| 3B | Módulo Hangul (implementação) | `src/content/hangul`, extensão compatível de `ExerciseSpec`/`checkAnswer`, player de lição, construtor de sílabas, áudio com fallback, SRS, checkpoints | Vitest + e2e |
| 4 | Lições 1–3 | 3 lições originais (diálogo, vocabulário, nota de gramática, exercícios): ex. cumprimentos/apresentação (이에요/예요), objetos/lugares (은/는, 이/가), rotina/comida (을/를, -아요/어요) | e2e fluxo |
| 5 | Vocabulário | frases com lacuna, tradução, escuta | e2e |
| 6 | Revisão + Dashboard | cartões vencidos, histórico, estatísticas reais, streak, meta diária, "continuar" | Vitest + e2e |
| 7 | Polimento | acessibilidade, dark mode, reduced motion, estados vazios, export/import JSON (opcional) | axe/manual |
| 8 | Teste responsivo | 375/390/768/1280 em Chromium + WebKit; checklist manual iPhone/Chrome iOS | screenshots |
| 9 | README | instruções locais, limitações | — |

## Riscos
- **Qualidade do conteúdo coreano**: sem revisão nativa; marcar como "conteúdo em revisão" e pedir revisão humana.
- **TTS coreano ausente** em alguns dispositivos → fallback documentado.
- **iPhone real**: não testável neste ambiente.
- Perda de progresso (localStorage) → aviso/exportação.
- **Privacidade/Impressum**: texto técnico sem validação jurídica; identidade, contato e retenção ainda ausentes. Ver `docs/privacy-audit.md`.

## Pós-MVP (não implementar agora)
FSRS (`ts-fsrs`), cache/offline via service worker, notificações, exercícios com IA, empacotamento nativo.

## Status Fase 1 (real)
Feito: Next 16 + React 19 + TS 5.9 + Tailwind 4; Vitest (1 teste); Playwright (Chromium, 375/390/768/1280; 28 testes); shell com nav inferior (mobile) e lateral (≥md); tema claro/escuro persistido; Noto Sans KR; safe-area; 5 rotas com estados vazios "Em desenvolvimento".
Pendente: projeto WebKit do Playwright (fase 8); verificação manual em iPhone/Chrome iOS; contraste AA verificado só por escolha de tokens, sem axe; `next/font` baixa a fonte no build (precisa de rede).

## Status PWA mínima (real)
Feito: manifesto web, ícones 192/512 (incluindo ícone `maskable`), ícone Apple 180, metadados de instalação e modo `standalone`, cores de tema claro/escuro e suporte a safe-area já existente.
Limites: sem service worker, cache ou funcionamento offline; instalação e apresentação em iPhone/Chrome iOS reais exigem verificação manual fora deste ambiente.

## Status conta e sincronização (real)
Feito: Google OAuth PKCE; login/logout; cookies SSR renovados pelo Proxy do Next 16; cache isolado por conta; guest mode; merge idempotente; migração do convidado; restauração após login; gravação local-first; tabela PostgreSQL com PK por usuário; RLS separado para SELECT/INSERT/UPDATE/DELETE; testes Vitest e pgTAP; setup em `docs/supabase-setup.md`.
Correções: `safeNextPath` rejeita backslash, caracteres de controle e separadores percent-encoded; status de sync volta a “offline” após falha remota e a “synced” ao recuperar; merge preserva o maior streak entre dispositivos.
Correção da Fase 2B: o Proxy do Next 16 estava em `proxy.ts` na raiz e não era carregado (o App Router fica em `src/app`). Movido para `src/proxy.ts`; a proteção de rotas e a renovação de sessão agora são exercitadas pelo proxy. Revalidar o login real no deploy.
Validado: typecheck, 51 testes Vitest, build e 28 testes Playwright; estado convidado renderizado em 393×659 e 1280×800, alvo de login 152×44 px, sem overflow horizontal ou erros de console. Google OAuth e tabela/RLS validados na Vercel (informado pelo usuário).
Pendente externo: executar `supabase test db` contra a stack local e testar o fluxo completo em Chrome desktop/PWA móvel; iPhone/Chrome iOS real continua manual.

## Status Fase 2B (real)
Feito: landing pública original em `/` com branding, apresentação, recursos (Hangul, vocabulário contextual, diálogos progressivos, revisão espaçada), método, CTA “Entrar com Google”, entrada “Continuar no painel” para autenticados e links de privacidade/Impressum; shell público próprio (header/footer) separado do shell autenticado.
Rotas privadas: `/dashboard`, `/hangul`, `/licoes`, `/vocabulario`, `/revisao`; `src/proxy.ts` valida `getClaims()` e redireciona para `/?next=...`; layout `(app)` revalida no servidor; `ProtectedArea` trata sessão expirada no cliente; `safeNextPath` preserva retorno interno e rejeita destinos externos; callback e `/auth/error` continuam públicos; OAuth/Supabase e `ProgressStore` de convidado preservados.
Privacidade: `/privacidade` em pt-BR com dados do Google, snapshot no Supabase, cookies/localStorage reais, Vercel/Supabase/Google, finalidade e base legal, retenção/exclusão, direitos e contato pendente; `/impressum` com avaliação da DDG/MStV e lista de informações ausentes; auditoria em `docs/privacy-audit.md`. Sem banner de consentimento (não há rastreamento não essencial) e sem dados legais inventados.
Validado: `npm run typecheck`; 78 testes Vitest; `npm run build`; 40 testes Playwright (375/390/768/1280) cobrindo landing, bloqueio de rotas, ausência de vazamento no HTML, deep link seguro, sessão inválida, privacidade, Impressum, erro de auth, navegação mobile/desktop e tema. Teste e2e de login real com Google não é automatizado (exige conta externa): verificação manual.
Correção pós-login: login com Google passa a cair em `/dashboard` por padrão; usuário autenticado em `/` é redirecionado para `/dashboard` (ou para o `next` interno validado) pelo proxy; o destino do deep link viaja no cookie `kbr_auth_next` porque o Supabase pode descartar query params do `redirectTo`, com fallback de cliente (`LandingRedirect`) quando a sessão é trocada direto na Site URL; falhas continuam indo para `/auth/error`.
Validado de novo: `npm run typecheck`; 92 testes Vitest (proxy de sessão + cookie de destino); `npm run build`; 44 testes Playwright (inclui callback sem código). Login real com Google segue manual.
Pendente: preencher controlador/contato/prazos e concluir a revisão jurídica; confirmar cookies e logs efetivos da Vercel/Supabase; testar login real e expiração no deploy; iPhone/Chrome iOS manual.

## Status Fase 3A (real)
Feito: cinco documentos em `docs/pedagogy/` — `curriculum.md` (25 micro-lições + 4 checkpoints em 7 unidades, grafo de pré-requisitos, matriz de cobertura, avaliação e QA), `hangul.md` (história, princípio de construção, 19 consoantes, 21 vogais, 28 finais, batchim e fenômenos de fronteira), `pronunciation-ptbr.md` (contrastes com o português brasileiro, IPA, romanização, TTS e pontos de revisão), `exercise-design.md` (9 tipos de exercício, validação determinística, feedback, acessibilidade, SRS e plano de testes) e `content-schema.md` (tipos TS, separação conteúdo/usuário, compatibilidade com `Progress` v1 e invariantes de validação).

Decisões pedagógicas: 25 lições de 5–8 minutos + 4 checkpoints; todas as 19 consoantes até `h10`, todas as 21 vogais até `h15`, todos os 16 finais simples até `h19` e os 11 duplos em `h20`; regras de ligação, nasalização e aspiração só em `h21`–`h23`; romanização revisada apenas como apoio até `h15`; ㅐ/ㅔ, ㅚ/ㅙ/ㅞ, ㅟ, ㅢ e ㄹ tratados como variação a validar; exercícios sem reconhecimento de fala; SRS reutiliza o Leitner existente; `Progress` v1, auth, sync, banco e RLS intactos.

Validação: `npm run typecheck`; `npm test` (12 arquivos, 93 testes); `npm run build`. Nenhuma alteração de código, dependência, migração ou configuração nesta fase.

Pendente: revisão de todo o conteúdo coreano por falante nativo/professor (tudo marcado `in-review`; nenhum item `reviewed`); validar IPA, exemplos, áudios TTS e naturalidade das frases; implementar a Fase 3B somente com pedido explícito, seguindo a ordem de `docs/pedagogy/content-schema.md` (§9).

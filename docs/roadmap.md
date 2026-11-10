# KBR — Roadmap

## Estado atual (atualize a cada commit — é o ponto de retomada entre agentes)
- **Fase concluída:** 3B.2 — Unidade 3 (`h04`–`h10`), checkpoint `c1`, SRS de erros e diagnóstico por categoria.
- **Em andamento:** nada. A Fase 3B.3 (`h11`–`h15` + `c2`) **não foi iniciada** e só começa com pedido explícito.
- **Próximo passo:** Fase 3B.3 — implementar as vogais compostas de `h11`–`h15` e o checkpoint `c2`, mantendo `Progress` v1, o player compartilhado e a validação de conteúdo.
- **Bloqueios / decisões pendentes:** revisão de todo o conteúdo coreano por falante nativo/professor (status `in-review`); ausência de voz `ko-KR` em alguns navegadores (fallback textual); fluxo autenticado validado só contra Supabase mock, não contra o projeto real; revisão jurídica da política/Impressum; executar `supabase test db` contra a stack local; testar o fluxo completo em iPhone/Chrome iOS real (manual).
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
| 3B.1 | Fatia vertical do Hangul (**feita**) | `src/content/hangul` (`h01`–`h03` + validação), `checkAnswer` e 4 tipos novos, player `/hangul/[lessonId]`, navegação disponível/bloqueada/em breve, progresso em `Progress` v1 | typecheck + 123 Vitest + build + 56 Playwright |
| 3B.2 | Unidade 3 e checkpoint `c1` (**feita**) | `h04`–`h10` com ㄱ…ㅎ, `c1`, SRS de erros, diagnóstico por categoria e testes de conteúdo | typecheck + 141 Vitest + build + 64 Playwright |
| 3B.3 | Unidade 5 e checkpoint `c2` | `h11`–`h15` com vogais compostas e `c2`; retomar a validação e o player compartilhado | Vitest + e2e |
| 3B | Módulo Hangul completo | conteúdo restante, construtor de sílabas, áudio dedicado, SRS, checkpoints `c2`–`c4` | Vitest + e2e |
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

Pendente: revisão de todo o conteúdo coreano por falante nativo/professor (tudo marcado `in-review`; nenhum item `reviewed`); validar IPA, exemplos, áudios TTS e naturalidade das frases; a implementação começou pela fatia vertical 3B.1 (`h01`–`h03`), seguindo a ordem de `docs/pedagogy/content-schema.md` (§9).

## Status Fase 3B.1 (real)
Feito: conteúdo original e validado de `h01`–`h03` em `src/content/hangul/` — tipos, registro de ㅇ + seis vogais, sílabas 아/어/오/우/이/으, palavras 아우/아이/오이, telas de apresentação, objetivos e 26 exercícios no total (6 em h01, 10 em h02 e 10 em h03). Todo item está `in-review`. `validateCurriculum`/`assertCurriculum` checam IDs, DAG de pré-requisitos, cobertura de jamo, NFC/composição, jamo não ensinado, batchim antes de `h17`, revisão sem revisor e ambiguidade de alternativas.

Exercícios: `mcq` e `build-syllable` existentes + `audio-to-char`, `char-to-audio`, `minimal-pair` e `reading`. `checkAnswer(spec, ExerciseAnswer)` devolve erro controlado para tipo incompatível; `check(spec, string)` continua com o formato exato anterior. Funções puras novas: `decomposeSyllable`, `isHangulText`, `normalizeHangul`.

Player: `/hangul` agora lista unidades, lições disponíveis, bloqueadas por pré-requisito e “em breve” sem links quebrados; `/hangul/[lessonId]` resolve apenas `h01`–`h03` (404 para o resto). Fluxo com introdução, objetivos, prática item a item, feedback imediato, barra de progresso, foco no “Continuar”, alvos ≥44 px e `aria-live`. Áudio sob demanda via `speechSynthesis` (`ko-KR`) com dica textual de som; sem arquivos de áudio.

Progresso: `Progress` v1 intacto. Cada primeira resposta grava `Attempt` em `history`; concluir grava `lessons[id] = { done, score }` com o maior score e sem rebaixar conclusão anterior. Sair no meio não salva score. Nenhuma migração, tabela, coluna, RLS ou auth alterados. SRS ainda não é criado nesta fatia.

Testes: `npm run typecheck`; `npm test` (14 arquivos, 123 testes); `npm run build`; `npm run e2e` (56 testes, 375/390/768/1280). E2E autenticado usa Supabase mock local (`e2e/mock-supabase.mjs`, porta 54321, cookie de sessão de teste) para cobrir lição completa por teclado, feedback de erro, persistência após reload, liberação de `h02` e proteção de `/hangul/h01` sem sessão. O mock não substitui integração com o Supabase real.

Limitações conhecidas: voz coreana depende do navegador/SO; revisão nativa pendente; a regra “repetir o item de contraste uma vez” de h02 e o critério “≥1 acerto em ㅡ e ㅣ” de h03 foram aproximados por `minScore` + itens obrigatórios; não há retomada de sessão no meio, SRS, checkpoints, `h04`–`h25`, exportação/importação, nem teste real de login Google/sync no deploy. iPhone/Chrome iOS real continua manual.

## Status Fase 3B.2 (real)
Feito: conteúdo original e validado de `h04`–`h10` e do checkpoint `c1`, completando as 6 vogais e as 19 consoantes sem batchim. São 82 exercícios novos nas lições (10 em h04, 10 em h05, 10 em h06, 12 em h07, 14 em h08, 12 em h09 e 14 em h10) e 20 itens no `c1`; com a fatia anterior, o curso tem 108 itens de lição + 20 de checkpoint. Todo conteúdo continua `in-review`. O registro ganhou 47 sílabas e 37 palavras novas, com `introducedIn`, tradução curta, tags e metadados de revisão.

Tipos e validação: `CompletionRule` representa critérios documentados (`h05` ≥1 item com ㄹ, `h07` ≥3 dos 4 contrastes aspirados, `h09` ≥4 dos 6 contrastes tensos, `h10` ≥1 acerto em cada um dos 5 contrastes de três vias). `Checkpoint` ganhou título, objetivo, instruções e duração. O validador checa IDs, escopo de unidade do checkpoint, cartões SRS ensinados, regras de conclusão, NFC/composição, jamo não ensinado, batchim antes de `h17` e revisão sem revisor/data.

SRS e diagnóstico: `lib/srs/cards.ts` define chaves estáveis (`h:jamo:c:ㄱ`, `h:jamo:v:ㅏ`, `h:syl:가`, `h:word:고기`) e `scheduleMissedReview`; um erro cria/atualiza os cartões do item na caixa 1 do Leitner, sem duplicar chaves, e uma nova tentativa não apaga o histórico. `lib/progress/diagnostics.ts` agrupa os erros pela tag primária `diag:*` em vogais, consoantes básicas, tensas, leitura C+V e estrutura de bloco. A tela de conclusão mostra as categorias com erro e as lições relacionadas; não há tela de revisão SRS nesta fase.

Checkpoint `c1`: 20 itens em 15–20 minutos, aprovação com 80% (16/20), escopo `h01`–`h10`. Só abre com todas as dez lições concluídas; fica registrado em `Progress.lessons.c1` no mesmo formato `{ done, score }`, com `done` pegajoso e maior score preservado em retentativas. Diagnóstico e lista de itens errados aparecem ao final. Nenhuma migração, tabela, coluna, RLS, auth ou formato de `Progress` foi alterado.

Player e navegação: a UI de prática foi extraída para `components/hangul/exercise-ui.tsx` e reutilizada por `LessonPlayer` e `CheckpointPlayer`. `/hangul/[lessonId]` resolve lições e `c1`; `/hangul` mostra `h01`–`h10`, o checkpoint no fim da Unidade 4 e o restante como “em breve”, sem links quebrados. Após `h10`, o próximo passo é `c1`; depois dele não há link para `h11`, que ainda não existe.

Testes: `npm run typecheck`; `npm test` (14 arquivos, 141 testes); `npm run build`; `npm run e2e` (64 testes, 375/390/768/1280). O e2e cobre `c1` bloqueado, liberação com `h01`–`h10` concluídas, conclusão dos 20 itens, persistência do score e proteção de `/hangul/c1` sem sessão, além dos fluxos anteriores. Tudo contra o Supabase mock local.

Limitações conhecidas: revisão de falante nativo pendente em todo o conteúdo; SRS só é criado pelo erro (não há fluxo completo de cartões vencidos em `/revisao`); a recomendação extra de `h08` para quem erra ㅎ mais de uma vez é aproximada pelo item obrigatório `h08-e01`; o áudio depende de voz `ko-KR` do navegador; `h11`–`h25`, `c2`–`c4`, batchim, exportação/importação e teste real de login Google/sync continuam pendentes; iPhone/Chrome iOS real segue manual.

Próximo passo: Fase 3B.3 — `h11`–`h15` (vogais compostas) e checkpoint `c2`, somente com pedido explícito.

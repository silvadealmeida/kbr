# KBR — instruções para agentes (Codex, OpenCode, Claude Code)

App web de estudo de coreano para brasileiros (mobile-first, Chrome no Windows/iPhone), com instalação PWA mínima e sem suporte offline. Não é app nativo.
Fontes de verdade: `docs/architecture.md` (stack, estrutura, modelo de dados, interfaces), `docs/research.md` (pedagogia, limites de conteúdo), `docs/roadmap.md` (fases e status). **Leia-os antes de mexer; não repita a pesquisa e não duplique o conteúdo deles aqui.**

## Fase atual
**Fase 14 (concluída localmente) — auditoria visual, refinamento “Composição”, mobile e áudio servido por padrão.** Inspeção em navegador real (Playwright Chromium + WebKit, 9 viewports de 320×700 a 1440×900 em claro/escuro + zoom 150%): eliminada a duplicação de `<h1>` nas sessões ativas de `/revisao` e `/vocabulario/revisao` (recuperando ~160 px verticais em 375–390 px e adotando `ProgressBar`); `AccountCard` e `SyllableBuilder` compactados para a primeira dobra móvel; `LessonVocabulary` alinhado em duas linhas sem `<div>` dentro de `<span>`; `Plate` com `number` alinhado ao rótulo dentro das marcas de registro; todos os alvos interativos (`Button size="sm"`, rubrica de `ProductionTask`, sumário de `/privacidade`, rodapé e `c4`) elevados a `≥44 px`; `BilingualText`/`lang="ko"` aplicado em títulos e notas com Hangul; corrigidos `{levelLabel}` literal em `A1LessonPlayer`, numeração `01`–`04` e textos de A2/B1 em `CourseCatalog`/`A1CourseArea`. **Áudio:** decisão do dono — todo o corpus é servido e usado por padrão; o inventário foi ampliado para o B1 e os 12 textos corrigidos, 1.144 WAVs novos foram gerados com MeloTTS-Korean local e o corpus totalizou **4.051 MP3** (60.608.590 bytes). Relatórios em `docs/design/{visual-audit-2026-11,mobile-refinement-report,visual-regression-matrix}.md` e `docs/audio/{generation-guide,license-audit}.md`. Typecheck + **630 Vitest** + build + **658 Playwright** verdes. Branch `phase-14/visual-audit` (sem push/deploy).

**Fases anteriores — 12B/12C/12D, auditoria e correções verificadas do B1.** 3/4 CRÍTICO corrigidos, C001 rejeitado (`것으로` é correto), 25 MAJOR tratados e 14 INCERTOS resolvidos editorialmente (`EDITORIALLY_RESOLVED_AI`) em `docs/audits/b1/`.

**Próximo passo:** revisão nativa dos 14 INCERTOS e dos itens `in-review`; depois **B2 — planejamento** — sempre por pedido explícito. Não iniciar B2/C1/C2 sem pedido.

## Regras
- Interface em pt-BR; `lang="ko"` nos trechos coreanos (fonte Noto Sans KR).
- Mobile-first: alvos ≥ 44–48px, safe-area, 375px → desktop, contraste AA, sem animações desnecessárias.
- Sem estatísticas falsas: use estados vazios; placeholders indicam "Em desenvolvimento".
- Fora de escopo até o roadmap pedir: novas lições/conteúdo, cache offline via service worker (deferido na 6B — ver `docs/offline-pwa-decision.md`) e IA.
- `localStorage` só via `lib/storage`; lógica pura em `lib/` (com `now` injetado); conteúdo em `content/` sem lógica.
- Randomização de alternativas é apresentação: use `lib/exercises/shuffle` + `use-shuffled-order`, mantenha a ordem durante a tentativa ativa, renove só em nova tentativa e nunca corrija por posição.
- Fala experimental (`lib/speech`): nunca ativar o microfone sem clique; modo remoto/desconhecido só com consentimento; não gravar, persistir, logar nem enviar áudio ou texto reconhecido; não afirmar "no aparelho" sem `available()`; não equiparar reconhecimento a avaliação de pronúncia; não ligar a `Progress`/SRS/grading sem fase explícita.
- Conteúdo coreano original (sem copiar cursos/apps); marcar como "em revisão".
- Áudio: o corpus MP3 vive em `public/audio/v1/` e é **servido por padrão** (`NEXT_PUBLIC_KBR_STATIC_AUDIO` ligado; `=0` é kill switch). O player tenta o MP3 primeiro e só cai para a voz coreana do navegador se não houver asset ou ele falhar. O corpus cobre Hangul, A1, A2, B1 e vocabulário; o áudio é **síntese MeloTTS-Korean provisória** (`in-review`), nunca gravação nativa. Não afirmar pronúncia correta sem revisão nativa. A licença do encoder `kykim/bert-kor-base` continua não esclarecida; a decisão de risco do dono em `docs/audio/license-audit.md` §13 **não é licença**. Ver `docs/audio/generation-guide.md`.
- TypeScript estrito; poucas dependências; não use `"use client"` em módulos cujos exports não-componente o servidor importa (ex.: `lib/routes.ts`).
- Não altere arquivos fora do escopo da tarefa. Commits pequenos e descritivos.
- Commits: autor sempre `silvadealmeida`; sem trailers `Co-Authored-By` nem menções a IA nas mensagens.

## Comandos
```
npm run dev         # servidor local
npm run typecheck   # tsc --noEmit
npm test            # Vitest (tests/)
npm run build       # build de produção
npm run e2e         # Playwright (Chromium 375/390/768/1280 + WebKit 390 em smoke/PWA/a11y/webkit; porta 3100)
PGUSER=postgres ./supabase/tests/local/run-local-sql-tests.sh  # pgTAP + concorrência real (PostgreSQL local)
```
Antes de concluir qualquer tarefa: typecheck + test + build verdes. iPhone/Chrome iOS reais não são testáveis aqui — verificação manual.

## Preservar trabalho entre agentes
1. Comece com o bloco "Estado atual" de `docs/roadmap.md`, `git status` e `git log --oneline -10`; depois consulte o grafo (`graphify query "<pergunta>"`) em vez de varrer o código. Continue o que existe, não recomece.
2. Antes de cada commit que altera código, rode `graphify update .` e inclua `graphify-out/` (assim o próximo agente herda um grafo atual). Termine cada unidade de trabalho com commit; nunca deixe árvore suja ao parar.
3. Atualize `docs/roadmap.md` no mesmo commit: bloco "Estado atual" (fase, em andamento, próximo passo, bloqueios, último agente) e o status real da fase. O limite de créditos pode cortar a sessão a qualquer momento: marque o progresso **antes** de começar a tarefa seguinte e commite em passos pequenos.
4. Decisão arquitetural nova → registre em `docs/architecture.md`; não em chats.
5. Não apague nem reescreva trabalho de outro agente sem motivo registrado no commit.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

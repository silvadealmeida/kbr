# KBR — instruções para agentes (Codex, OpenCode, Claude Code)

App web de estudo de coreano para brasileiros (mobile-first, Chrome no Windows/iPhone), com instalação PWA mínima e sem suporte offline. Não é app nativo.
Fontes de verdade: `docs/architecture.md` (stack, estrutura, modelo de dados, interfaces), `docs/research.md` (pedagogia, limites de conteúdo), `docs/roadmap.md` (fases e status). **Leia-os antes de mexer; não repita a pesquisa e não duplique o conteúdo deles aqui.**

## Fase atual
**Fases 13A–13H (em andamento local) — curso B2 completo.** Blueprint de 8 módulos/40 lições/8 checkpoints e documentos `docs/curriculum/b2-*.md` concluídos; Módulos 1–6 (`b2-l01`–`b2-l30`, `b2-c01`–`b2-c06`) implementados com leitura longa, produção com rubrica e 240 identidades lexicais novas. O curso `ko-b2` permanece `in-development` até os 48 passos existirem. Próximo passo: Módulos 7–8, depois testes E2E, documentação final e fechamento. Sem push/deploy.

**Fase anterior — 12C (concluída localmente) — correções verificadas do B1, fairness e validação pedagógica.** Executado o plano da 12B com verificação na fonte: **3 dos 4 CRÍTICO corrigidos** (`b1-c03-e07` reading em coreano, `b1-c02-e08` — ID real do antigo `c02-e19` — com `줄이는 대신에`, `b1-l24` com `공사를 하는 통에`); **C001 rejeitado** porque `것` tem batchim ㅅ e `것으로` é a forma correta (a proposta `것로` era agramatical). Fairness sistêmica: builder B1 aplica `terminalPunctuationVariants` e instrução de frase completa em `listen`; **0/381** digitados exigem pontuação final exata e **0/132** `listen` pedem fragmento. Progressão: micro-ensino de `-(으)ㄹ 때`, `-라고 하다`, `-마다`, `-ㄹ게요`, `-기 바랍니다`; substituições de `-뿐`, `-를 통해`, `-ㄴ다면`, `-자` e léxico futuro em gabaritos. Dados: 3 `acceptedAnswers` redundantes removidos, `checkRedundantAccepted` ligado no B1, 65/164 `reusedIds` congeladas no baseline (297+65). UI: bancada de composição redesenhada (botões esticam na linha, áudio sem texto cortado). Áudio local: `NEXT_PUBLIC_KBR_STATIC_AUDIO=1` apenas em `.env.local` (ignorado pelo Git); produção continua opt-in e a guarda intacta. Ledger: `docs/audits/b1/correction-ledger.md`; status em `data/findings.json`. Typecheck + **613 Vitest** + build (`[audio-guard] OK`) + Playwright (matriz completa) verdes. Branch local `audit/b1-phase-12b` (sem push/deploy).

**Fase anterior — 12B, auditoria somente leitura.** 4 CRÍTICO / 25 MAJOR / 20 MINOR / 14 UNCERTAIN; cobertura integral e ferramentas reproduzíveis em `docs/audits/b1/` (detalhes abaixo na seção de auditoria e no ledger).

**Próximo passo:** concluir os Módulos 2–8 do B2, rodar typecheck/test/build/E2E, atualizar documentação e fechar a fase. C1/C2 continuam fora de escopo e não devem ser iniciados sem pedido explícito.

## Regras
- Interface em pt-BR; `lang="ko"` nos trechos coreanos (fonte Noto Sans KR).
- Mobile-first: alvos ≥ 44–48px, safe-area, 375px → desktop, contraste AA, sem animações desnecessárias.
- Sem estatísticas falsas: use estados vazios; placeholders indicam "Em desenvolvimento".
- Fora de escopo até o roadmap pedir: novas lições/conteúdo, cache offline via service worker (deferido na 6B — ver `docs/offline-pwa-decision.md`) e IA.
- `localStorage` só via `lib/storage`; lógica pura em `lib/` (com `now` injetado); conteúdo em `content/` sem lógica.
- Randomização de alternativas é apresentação: use `lib/exercises/shuffle` + `use-shuffled-order`, mantenha a ordem durante a tentativa ativa, renove só em nova tentativa e nunca corrija por posição.
- Fala experimental (`lib/speech`): nunca ativar o microfone sem clique; modo remoto/desconhecido só com consentimento; não gravar, persistir, logar nem enviar áudio ou texto reconhecido; não afirmar "no aparelho" sem `available()`; não equiparar reconhecimento a avaliação de pronúncia; não ligar a `Progress`/SRS/grading sem fase explícita.
- Conteúdo coreano original (sem copiar cursos/apps); marcar como "em revisão".
- Áudio: o corpus MP3 vive em `public/audio/v1/`, mas o áudio estático é **opt-in** (`NEXT_PUBLIC_KBR_STATIC_AUDIO=1`); sem a flag, use a voz coreana do navegador. `public/audio/` está excluído do deploy por `.vercelignore` e a guarda roda em `prebuild`/`postbuild`. O MP3 do KBR é **sintético**, nunca "gravado"/"nativo"; não afirmar pronúncia correta sem revisão nativa. A licença do encoder `kykim/bert-kor-base` continua não esclarecida; a decisão de risco do dono em `docs/audio/license-audit.md` §11 **não é licença** e não autoriza distribuição pública/comercial. Textos corrigidos sem MP3 usam TTS; ver `docs/audio/stale-audio-manifest.md`.
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

# KBR — instruções para agentes (Codex, OpenCode, Claude Code)

App web de estudo de coreano para brasileiros (mobile-first, Chrome no Windows/iPhone), com instalação PWA mínima e sem suporte offline. Não é app nativo.
Fontes de verdade: `docs/architecture.md` (stack, estrutura, modelo de dados, interfaces), `docs/research.md` (pedagogia, limites de conteúdo), `docs/roadmap.md` (fases e status). **Leia-os antes de mexer; não repita a pesquisa e não duplique o conteúdo deles aqui.**

## Fase atual
**Fase 14 (concluída em 2026-11-13; merge em `main` e push) — endurecimento de qualidade e prontidão para release.** As **237 pistas de comprimento** acima de 1,7× em A1–C2 (A1 11, A2 34, B1 32, B2 57, C1 31, C2 72) foram corrigidas com distratores plausíveis e errados pelo conteúdo; **0** permanecem acima do limite. O teste `tests/content/phase14-fairness.test.ts` cobre **1.381 itens** e impede regressão. No C2, `폐항` passou a significar apenas fechamento de porto (linhas usam `운항이 중단되다`) e o conto de `c2-l26/l27` foi uniformizado em **dois bilhetes**, com regressão em `tests/content/c2-curriculum.test.ts`. A auditoria visual final cobre Hangul e A1–C2 em 320/375/390/768/1280, prática em 320/375/390, C2 escuro e conclusão do C2 em 375, sem overflow e com alvos ≥44 px; `e2e/visual-audit.spec.ts` e `e2e/mobile.spec.ts` reproduzem a verificação. Typecheck + **722 Vitest** + build (`[audio-guard] OK`) + Playwright na matriz completa (**715 executados + 39 skips intencionais**) verdes. Relatórios em `docs/audits/phase-14/`. Merge em `main` e push. Sem force-push nem deploy manual.

**Correções vindas do feedback do usuário (2026-11-13, no mesmo push):** o resultado de erro virou “Não foi dessa vez.”; o painel ficou com um único botão de sair; a busca do vocabulário declara que cobre só as palavras das lições (e o filtro de curso tem rótulos de B2/C1/C2); a velocidade do MP3 muda sem reiniciar o clipe (com reaplicação para Safari); e os campos que pedem coreano ganharam teclado de jamo opcional (`KoreanKeyboard`, composição pura em `lib/hangul/keyboard`). O orçamento de transferência do atlas do Hangul foi ajustado de 1,20 MB para 1,25 MB porque a medida varia com os subconjuntos woff2 carregados sob demanda.

**Fase anterior — 13A–13C: C1, C2 e auditoria A1–C2 (concluída localmente).** 8 módulos/40 lições/8 checkpoints por nível; 320 identidades novas + 320 frases e 615 itens por curso; rubrica de seis critérios; auditoria assistida por IA em `docs/audits/phase-13/`. A dívida de pistas de comprimento (F13-012) foi fechada na Fase 14; o risco sistêmico de revisão nativa continua.

**Próximo passo:** revisão nativa/editorial de A1–C2 (incluindo as 237 escolhas de distratores da Fase 14) e dos itens `in-review`; nenhum nível deve ser marcado como revisado sem falante nativo. C1/C2 só avançam por pedido explícito; nenhuma fase nova sem pedido.

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

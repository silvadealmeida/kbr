# KBR — instruções para agentes (Codex, OpenCode, Claude Code)

App web de estudo de coreano para brasileiros (mobile-first, Chrome no Windows/iPhone), com instalação PWA mínima e sem suporte offline. Não é app nativo.
Fontes de verdade: `docs/architecture.md` (stack, estrutura, modelo de dados, interfaces), `docs/research.md` (pedagogia, limites de conteúdo), `docs/roadmap.md` (fases e status). **Leia-os antes de mexer; não repita a pesquisa e não duplique o conteúdo deles aqui.**

## Fase atual
**Fases 9C–9H (concluídas) — curso A1 completo.** As 40 lições (`a1-l01`–`a1-l40`) e os 8 checkpoints (`a1-c01`–`a1-c08`) estão implementados e jogáveis em `/a1/[lessonId]`. `ko-a1` está `available` com 48 passos, `requiresAllSteps: true`, `finalStepId: "a1-c08"` e sem `plannedTotals`; o catálogo mostra 40 lições, 8 checkpoints e progresso por pré-requisitos. O curso tem 443 identidades lexicais A1 novas, 443 frases contextuais próprias, 52 identidades do Hangul retomadas (495 distintas ensinadas) e 615 exercícios (79 `mcq`, 183 `cloze`, 132 `listen`, 97 `translate`, 124 `reading`): 400 de lição (10 por lição, 5 guiados + 5 independentes, mínimo 8/10) e 215 de checkpoint (25 itens/20 acertos nos checkpoints 1–7; 40/32 no `a1-c08`). A conclusão A1 exige os 48 passos e é interna, sem CEFR/TOPIK; fala/escrita aberta não são avaliadas automaticamente. `a1-l01` foi preservada (conteúdo, IDs e progresso). O vocabulário continua opt-in nos cartões `v:`; nenhum MP3 novo foi gerado e `Progress` v1/CAS/SQL/SRS do Hangul ficaram intactos. Typecheck + 525 Vitest + build (guarda de áudio OK) + 553 Playwright (+34 skips; Chromium 375/390/768/1280 + WebKit 390, axe claro/escuro) verdes. A próxima fase é **A2 — planejamento e primeira fatia**, ou a correção/native review do A1 explicitamente pedida; não iniciar sem pedido. Abaixo, a infraestrutura lexical concluída na 9A-V:

**Fase 9A-V (concluída) — vocabulário inteligente e prática contextual.** `/vocabulario` + `/vocabulario/revisao`; registro em `src/content/vocabulary`, lógica em `src/lib/vocabulary`, doc em `docs/vocabulary/`. Estado do aluno = um cartão Leitner por palavra salva em `Progress.cards["v:<id>"]` (remoção = marca `due` 9999-12-31): **sem mudar `Progress` v1, CAS ou SQL**; o SRS e o painel do Hangul ignoram chaves `v:`. Acerto com tradução/pista aberta repete a caixa (não avança). O corpus tem 468 frases originais (25 do Hangul + 443 do A1), todas em revisão nativa; áudio = voz do navegador (nenhum MP3 novo). Sincronização remota não verificada em Supabase real. Abaixo, a fase anterior:

**Fase 8F (concluída sobre a 8E) — encerramento da infraestrutura de áudio; foco passa ao currículo A1–C2.** Verificado em 2026-11-12: produção Vercel responde **404** nos MP3 (contida), mas o **GitHub público ainda serve** o corpus em `restricted-assets/audio/` e na história, e deployments antigos da Vercel não foram verificados — plano reversível e ações do dono em `docs/audio/exposure-and-removal-plan.md`; próximos passos de currículo em `docs/release/curriculum-handoff.md` (primeira fase recomendada: 9A, esquema/esqueleto do A1 sem lições). Não expandir `/fala`, não introduzir TTS novo, não gerar áudio. Texto coreano novo usa a voz do sistema. Antes: **Fase 8E — contenção do áudio.** Os 287 MP3 estão em `restricted-assets/audio/` (movidos com `git mv`; **não** em `public/`, logo não são servidos). Só `NEXT_PUBLIC_KBR_STATIC_AUDIO=1` + `npm run audio:stage` os expõe (teste local); o padrão é voz coreana do sistema. `npm run build` falha se o corpus aparecer em `public/`, `.next/` ou `.vercel/output` (`scripts/audio/verify-no-restricted-audio.mjs`). **Não** mova os MP3 de volta para `public/`, não defina a flag em deploy e não rode `git push`/deploy sem o dono; a licença do encoder segue BLOQUEADA. O repositório GitHub é público e ainda contém os MP3 em `restricted-assets/` (e na história); a produção já os nega (`docs/audio/license-audit.md` §9). Como reativar após licença resolvida: `docs/audio/generation-guide.md`. Abaixo, o resumo da 8D:

**Fase 8D — auditoria de licença do áudio, prontidão e qualidade** concluída sobre a **8C** (prática de fala experimental `/fala`) e a **8B** (287 MP3 sintéticos do MeloTTS-Korean com manifesto SHA-256 e fallback de voz do sistema). A 8D **não adicionou funcionalidade nem conteúdo**: reverificou a integridade dos 287 MP3 (todos os hashes conferem, sem órfãos/duplicados/corrompidos), corrigiu o rótulo "áudio gravado" (o áudio é **sintético**), suavizou uma afirmação não testada sobre o iPhone em `/fala` e adicionou `tests/content/curriculum-audit.test.ts` (8 verificações estruturais; nenhum outro defeito achado). **Bloqueio material: a distribuição pública/comercial do áudio está BLOQUEADA** — `kykim/bert-kor-base` (necessário na geração) não declara licença no Hugging Face; o README do autor diz Apache-2.0 e exige MOU para uso comercial; treino da voz não documentado. Não regenere nem apague os MP3 sem aprovação explícita; plano em `docs/audio/license-audit.md` (R1–R6). Checklist com PASS/BLOCKED/MANUAL em `docs/release/beta-readiness.md`; matriz de teste manual em `docs/iphone-manual-checklist.md` §14 (nada testado em aparelho real). Typecheck, 453 Vitest e 452 Playwright (+22 skips; Chromium e WebKit) passaram; reconhecedor e voz do sistema nos testes são **simulados**. Itens abertos de `docs/feedback/feedback-igo.md`: 2 (áudio nativo/aprovação + licença) e 3 (flashcards ilustrados). CEFR A1–C2, IA, cache offline e migrações de produção continuam fora. A 4D.3 foi relatada pelo usuário como concluída em produção; nenhuma sessão acessou Supabase/Vercel. Status e pendências: `docs/roadmap.md` e `docs/architecture.md`.
O Proxy do Next 16 fica em `src/proxy.ts` (o App Router está em `src/app`); não recrie `proxy.ts` na raiz.

## Padrão para A2 (próxima fase)
1. Criar um blueprint A2 validado (módulos, lições, checkpoints, pré-requisitos, resultados) antes de datasets; não copiar o A1 automaticamente.
2. Criar `src/content/curriculum/a2/` com IDs `a2-*`, contratos/validadores próprios e registrar somente datasets completos.
3. Derivar `A2_COURSE` do blueprint, com `status` coerente, `requiresAllSteps`/`finalStepId` somente quando todos os passos existirem e namespace de IDs/SRS próprio.
4. Vocabulário A2 no registro canônico, com IDs `ko:<forma>` estáveis, ao menos uma `VocabSentence` por item novo e reusos do A1/Hangul só quando forma e sentido coincidirem.
5. Usar só tipos de exercício implementados e previstos no blueprint; não usar `dialogue-choice`, `order-words` ou `short-answer` sem fase própria.
6. Reutilizar `ExerciseView`, `AudioControl`, `LessonVocabulary`, áudio do sistema e `Progress` v1; não gerar MP3.
7. Atualizar testes, `docs/architecture.md`, `docs/roadmap.md`, `docs/release/curriculum-handoff.md` e docs de currículo no mesmo commit. Conteúdo coreano novo continua `in-review`.

## Regras
- Interface em pt-BR; `lang="ko"` nos trechos coreanos (fonte Noto Sans KR).
- Mobile-first: alvos ≥ 44–48px, safe-area, 375px → desktop, contraste AA, sem animações desnecessárias.
- Sem estatísticas falsas: use estados vazios; placeholders indicam "Em desenvolvimento".
- Fora de escopo até o roadmap pedir: novas lições/conteúdo, cache offline via service worker (deferido na 6B — ver `docs/offline-pwa-decision.md`) e IA.
- `localStorage` só via `lib/storage`; lógica pura em `lib/` (com `now` injetado); conteúdo em `content/` sem lógica.
- Randomização de alternativas é apresentação: use `lib/exercises/shuffle` + `use-shuffled-order`, mantenha a ordem durante a tentativa ativa, renove só em nova tentativa e nunca corrija por posição.
- Fala experimental (`lib/speech`): nunca ativar o microfone sem clique; modo remoto/desconhecido só com consentimento; não gravar, persistir, logar nem enviar áudio ou texto reconhecido; não afirmar "no aparelho" sem `available()`; não equiparar reconhecimento a avaliação de pronúncia; não ligar a `Progress`/SRS/grading sem fase explícita.
- Conteúdo coreano original (sem copiar cursos/apps); marcar como "em revisão".
- Áudio: MP3 só em `restricted-assets/`; nunca em `public/` enquanto a licença estiver BLOQUEADA. O MP3 do KBR é **sintético**, nunca "gravado"/"nativo"; não afirmar pronúncia correta sem revisão nativa; não distribuir publicamente enquanto a licença do encoder estiver BLOQUEADA.
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

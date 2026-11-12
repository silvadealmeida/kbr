# Graph Report - kbr  (2026-11-12)

## Corpus Check
- 239 files · ~256,265 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 2097 nodes · 4262 edges · 125 communities (119 shown, 6 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 357 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `910fb226`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 4. Defeitos confirmados
- package.json
- supabase/proxy.ts
- Deep UI/UX, Motion Design & Creative Development Research — KBR
- recognition.ts
- lessons/index.ts
- dashboard.ts
- compilerOptions
- Pronúncia coreana para brasileiros
- react
- Hangul — referência pedagógica
- Currículo de Hangul — Fase 3A
- ui-primitives.test.ts
- completion.ts
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- fakeSupabaseCas.ts
- courses.test.ts
- Schema de conteúdo — módulo Hangul
- lib/courses/index.ts
- CLAUDE.md
- next.config.mjs
- Design de exercícios — módulo Hangul
- 10. Tipo 8 — `stroke-order`
- 3. Tipo 1 — `recognition`
- 4. Tipo 2 — `audio-to-char`
- 5. Tipo 3 — `char-to-audio`
- 6. Tipo 4 — `order-jamo`
- 8. Tipo 6 — `minimal-pair`
- 7. Tipo 5 — `build-syllable`
- 9. Tipo 7 — `reading`
- review/index.ts
- 11. Unidade 5 — Todas as vogais
- 12. Unidade 6 — Sílabas e batchim
- 13. Unidade 7 — Ler em contexto
- next
- hangul.spec.ts
- AuthProvider.tsx
- 9. Unidade 3 — Consoantes básicas
- DashboardArea.tsx
- 16. Avaliação
- 4. Estrutura geral
- validate.ts
- 10. Unidade 4 — Consoantes tensas
- 15. Matriz de cobertura
- 17. Integração com revisão espaçada
- 19. QA de conteúdo
- KBR — Plano de implementação da sincronização confiável (Fase 4D.2)
- 2. Pesquisa, benchmark e decisão de design
- 8. Unidade 2 — Primeiras vogais
- dashboard.test.ts
- (site)/page.tsx
- site.test.ts
- auth.test.ts
- Progress
- SyllableBuilder.tsx
- exercises/index.ts
- courses.test.ts
- CourseCompletionPanel.tsx
- createSupabaseProgressStore
- KBR — Runbook de deploy seguro do CAS (Fase 4D.3)
- mock-supabase.mjs
- mergeProgress.ts
- KBR — Checklist manual de iPhone / Chrome iOS (Fase 6B)
- dashboard.spec.ts
- exercise-order.test.ts
- Roadmap de qualidade de áudio — Fase 8B
- @playwright/test
- 5. Mudanças no cliente
- Design system — especificação
- review.spec.ts
- storage/index.ts
- hangul.ts
- testAuthCookie
- encode-audio.py
- 18. Plano de testes
- hangul-experience.test.ts
- encoding
- exercise-ui.tsx
- run-concurrency.sh
- DashboardArea.tsx
- Movimento — especificação
- 11. Tipo 9 — `srs-session`
- run-local-sql-tests.sh
- CheckpointPlayer.tsx
- courses.spec.ts
- Plano de redesign por componente
- privacidade/page.tsx
- testAuthCookie
- postLoginPath
- storage/index.ts
- KBR — Decisão sobre PWA offline e service worker (Fase 6B)
- webkit.spec.ts
- supabase-cas.test.ts
- Direção criativa — “Composição”
- KBR — Auditoria de privacidade e avaliação legal (Fase 2B)
- route.ts
- KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷
- Pesquisa visual — Heron AI e linhagens de referência
- Feedback do usuário — backlog (Igo)
- Fase 7 — roadmap de implementação
- Hangul — conceitos de interação
- KBR — Pesquisa
- 3. Invariantes por campo
- 4. Exercícios: extensão compatível
- KBR — Arquitetura
- app/layout.tsx
- Detalhe por opção
- 6. Compatibilidade com `Progress`
- Áudio atual — auditoria técnica e de experiência
- mobile.spec.ts
- sync-concurrency.test.ts
- playback.ts
- 13. Feedback
- performance.spec.ts
- Geração do áudio estático — MeloTTS-Korean
- inventory.ts
- audio-manifest.test.ts
- AudioPlayer
- design-system.test.ts
- ref_node_fs
- build-inventory.mjs
- localStorageStore.ts
- 2. Arquitetura atual, como está no código

## God Nodes (most connected - your core abstractions)
1. `Progress` - 96 edges
2. `next` - 37 edges
3. `checkAnswer()` - 35 edges
4. `Lesson` - 34 edges
5. `react` - 34 edges
6. `vitest` - 32 edges
7. `KBR — Roadmap` - 31 edges
8. `testAuthCookie()` - 26 edges
9. `useAuth()` - 25 edges
10. `mergeProgress()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `C3 — Merge de cartões usa o documento inteiro, não o cartão (crítico)` --references--> `Attempt`  [INFERRED]
  docs/sync/concurrency-audit.md → src/lib/storage/index.ts
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `6.2 Cartões SRS` --references--> `SrsState`  [INFERRED]
  docs/pedagogy/content-schema.md → src/lib/srs/index.ts
- `Fase atual` --references--> `Progress`  [INFERRED]
  AGENTS.md → src/lib/storage/index.ts
- `Decisões/limites` --references--> `Progress`  [INFERRED]
  docs/architecture.md → src/lib/storage/index.ts

## Import Cycles
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (125 total, 6 thin omitted)

### Community 0 - "4. Defeitos confirmados"
Cohesion: 0.08
Nodes (25): 1. Método e limites, 3. Comportamento por operação, 4. Defeitos confirmados, 5. O que **não** é bug confirmado, 6.1 Duas lições em dispositivos diferentes (C1), 6.2 Revisão de cartão vencida por atividade posterior (C3), 6.3 Offline + outro dispositivo online (C1/C9), 6.4 Relógio adiantado (C4) (+17 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (33): dependencies, next@^16.4.6, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5 (+25 more)

### Community 2 - "supabase/proxy.ts"
Cohesion: 0.16
Nodes (12): EXPERIMENTAL_PROTECTED_PATHS, isProtectedPath(), LEGACY_PROTECTED_PATHS, PROTECTED_PATHS, ROUTES, hadSessionCookie(), redirect(), redirectToLogin() (+4 more)

### Community 3 - "Deep UI/UX, Motion Design & Creative Development Research — KBR"
Cohesion: 0.05
Nodes (36): 10. Hangul as an Interactive Visual System, 11. Advanced Animation Technologies, 12. Prototype Concepts — Research Only, 13. Art Direction Exploration, 14. Performance and Accessibility Requirements, 15. Additional Deliverables, 8. Cinematic Motion Design and Interactive Storytelling, 9. Architectural Illustration and Editorial Drawing Styles (+28 more)

### Community 4 - "recognition.ts"
Cohesion: 0.06
Nodes (45): MicIcon(), SpeakingPractice(), SPEECH_ERROR_MESSAGES, statusText(), TranscriptFeedback(), ITEMS, modeFor(), SpeakingPracticeArea() (+37 more)

### Community 5 - "lessons/index.ts"
Cohesion: 0.07
Nodes (36): C1, C2, C3, C4, IMPLEMENTED_CHECKPOINT_IDS, H01, H02, H03 (+28 more)

### Community 6 - "dashboard.ts"
Cohesion: 0.15
Nodes (22): accuracy(), ActivitySummary, ATTEMPT_CATEGORY_LABELS, AttemptCategory, AttemptStats, AttemptTarget, buildAttemptTargets(), buildDashboardSummary() (+14 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Pronúncia coreana para brasileiros"
Cohesion: 0.06
Nodes (32): 10. Romanização: por que ela engana, 11. Tabela de aproximações para a interface, 12. Limites do TTS, 13. Roteiro de gravação (para revisão humana), 14. Pontos que exigem revisão especializada, 15. Sequência de prática para brasileiros, 16. Referências, 1. Advertência inicial (+24 more)

### Community 9 - "react"
Cohesion: 0.22
Nodes (10): react, SiteLayout(), learnLinks, legalLinks, SiteFooter(), nav, SiteHeader(), ThemeToggle() (+2 more)

### Community 10 - "Hangul — referência pedagógica"
Cohesion: 0.06
Nodes (30): 10. Notas de ensino por letra, 11. Originalidade e limites, 12. Referências, 1. Como ler este documento, 2. Terminologia mínima, 3. História em poucas linhas, 4.1 Consoantes, 4.2 Vogais (+22 more)

### Community 11 - "Currículo de Hangul — Fase 3A"
Cohesion: 0.13
Nodes (14): 14. Grafo de pré-requisitos, 18. Fluxo do player de lição, 1.1 Fora de escopo, 1. Objetivo do módulo, 20. Revisão especializada pendente, 21. Riscos e mitigação, 23. Referências, 3. Princípios pedagógicos operacionais (+6 more)

### Community 12 - "ui-primitives.test.ts"
Cohesion: 0.18
Nodes (14): Design system “Composição” (Fase 7B), Status Fase 7B (real), Button(), ButtonLinkProps, ButtonProps, ButtonSize, buttonSizes, buttonStyles() (+6 more)

### Community 13 - "completion.ts"
Cohesion: 0.07
Nodes (15): CompletedCheckpointSummary, CompletedLessonSummary, CompletionReportOptions, CompletionStats, CourseJourneyStep, FinalAssessmentFeedback, CATEGORIES, CATEGORY_ORDER (+7 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.25
Nodes (7): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras, This is NOT the Next.js you know

### Community 15 - "fakeSupabaseCas.ts"
Cohesion: 0.13
Nodes (10): @supabase/supabase-js, clone(), errorFor(), FakeCasFailure, FakeCasRpcParams, FakeCasServer, FakeRow, RpcCall (+2 more)

### Community 16 - "courses.test.ts"
Cohesion: 0.12
Nodes (15): COURSE_REGISTRY, EXERCISE_TYPE_REGISTRY, ExerciseGrading, ExerciseSkill, ExerciseTypeDefinition, ExerciseTypeId, IMPLEMENTED_EXERCISE_TYPES, ImplementedExerciseType (+7 more)

### Community 17 - "Schema de conteúdo — módulo Hangul"
Cohesion: 0.09
Nodes (21): 10. Critérios de aceite técnicos, 11. Referências, 1. O que muda e o que não muda, 2. Estrutura de arquivos recomendada, 3.1 Status de revisão, 3.2 Jamo, 3.3 Sílabas, 3.4 Palavras (+13 more)

### Community 18 - "lib/courses/index.ts"
Cohesion: 0.33
Nodes (14): Painel, Status Fase 4B (real), CourseProgressSummary, summarizeCourseProgress(), buildCourseSteps(), CourseCheckpointLike, CourseLessonLike, CourseProgressLike (+6 more)

### Community 20 - "next.config.mjs"
Cohesion: 0.33
Nodes (4): nextConfig, privateNoStore, protectedRoutes, securityHeaders

### Community 22 - "Design de exercícios — módulo Hangul"
Cohesion: 0.20
Nodes (9): 14. Pontuação e progressão, 15. Fluxo do player, 16. Acessibilidade, 17. Mobile, 19. Checklist de autoria, 1. Princípios, 20. Referências, 2. Visão geral dos nove tipos (+1 more)

### Community 23 - "10. Tipo 8 — `stroke-order`"
Cohesion: 0.22
Nodes (9): 10.1 Objetivo, 10.2 Quando usar, 10.3 Especificação, 10.4 Validação, 10.5 Distratores, 10.6 Feedback, 10.7 Acessibilidade, 10.8 Exemplo (+1 more)

### Community 24 - "3. Tipo 1 — `recognition`"
Cohesion: 0.22
Nodes (9): 3.1 Objetivo, 3.2 Quando usar, 3.3 Especificação, 3.4 Validação, 3.5 Distratores, 3.6 Feedback, 3.7 Acessibilidade, 3.8 Exemplo (+1 more)

### Community 25 - "4. Tipo 2 — `audio-to-char`"
Cohesion: 0.22
Nodes (9): 4.1 Objetivo, 4.2 Quando usar, 4.3 Especificação, 4.4 Validação, 4.5 Distratores, 4.6 Feedback, 4.7 Acessibilidade, 4.8 Exemplo (+1 more)

### Community 26 - "5. Tipo 3 — `char-to-audio`"
Cohesion: 0.22
Nodes (9): 5.1 Objetivo, 5.2 Quando usar, 5.3 Especificação, 5.4 Validação, 5.5 Distratores, 5.6 Feedback, 5.7 Acessibilidade, 5.8 Exemplo (+1 more)

### Community 27 - "6. Tipo 4 — `order-jamo`"
Cohesion: 0.22
Nodes (9): 6.1 Objetivo, 6.2 Quando usar, 6.3 Especificação, 6.4 Validação, 6.5 Distratores, 6.6 Feedback, 6.7 Acessibilidade, 6.8 Exemplo (+1 more)

### Community 28 - "8. Tipo 6 — `minimal-pair`"
Cohesion: 0.22
Nodes (9): 6.1 Objetivo, 6.2 Quando usar, 6.3 Especificação, 6.4 Validação, 6.5 Distratores, 6.6 Feedback, 6.7 Acessibilidade, 6.8 Exemplo (+1 more)

### Community 29 - "7. Tipo 5 — `build-syllable`"
Cohesion: 0.22
Nodes (9): 7.1 Objetivo, 7.2 Quando usar, 7.3 Especificação, 7.4 Validação, 7.5 Distratores, 7.6 Feedback, 7.7 Acessibilidade, 7.8 Exemplo (+1 more)

### Community 30 - "9. Tipo 7 — `reading`"
Cohesion: 0.22
Nodes (9): 7.1 Objetivo, 9.2 Quando usar, 9.3 Especificação, 9.4 Validação, 9.5 Distratores, 9.6 Feedback, 9.7 Acessibilidade, 9.8 Exemplo (+1 more)

### Community 31 - "review/index.ts"
Cohesion: 0.05
Nodes (57): C5 — Revisões concorrentes do mesmo cartão não são compostas (alto), I6 — Cartões: vence a revisão mais nova, por cartão, metadata, Page(), PART_LABELS, PartKey, POSITIONS, formatDate() (+49 more)

### Community 32 - "11. Unidade 5 — Todas as vogais"
Cohesion: 0.29
Nodes (7): 11. Unidade 5 — Todas as vogais, `c2` — Checkpoint 2: inventário completo de vogais, `h11` — ㅑ ㅕ ㅛ ㅠ, `h12` — ㅐ ㅔ ㅒ ㅖ, `h13` — ㅘ ㅝ ㅟ, `h14` — ㅙ ㅞ ㅚ, `h15` — ㅢ e o inventário completo de vogais

### Community 33 - "12. Unidade 6 — Sílabas e batchim"
Cohesion: 0.29
Nodes (7): 12. Unidade 6 — Sílabas e batchim, `c3` — Checkpoint 3: sílabas e batchim, `h16` — Montar e ler sílabas C+V, `h17` — Batchim ㅇ, ㄴ, ㅁ, `h18` — Batchim oclusivo e os sete sons representativos, `h19` — Batchim ㄹ, `h20` — Os 11 batchim duplos

### Community 34 - "13. Unidade 7 — Ler em contexto"
Cohesion: 0.29
Nodes (7): 13. Unidade 7 — Ler em contexto, `c4` — Checkpoint 4: leitura integrada, `h21` — Ligação (연음), `h22` — Nasalização, `h23` — Aspiração, `h24` — Oficina de leitura, `h25` — Consolidação e domínio

### Community 35 - "next"
Cohesion: 0.16
Nodes (14): next, generateMetadata(), Page(), PageProps, metadata, Page(), metadata, pendingItems (+6 more)

### Community 36 - "hangul.spec.ts"
Cohesion: 0.10
Nodes (19): accountKey(), C1_WRONG_STEPS, C2_STEPS, C2Step, C3_STEPS, C3Step, C4_STEPS, C4Step (+11 more)

### Community 37 - "AuthProvider.tsx"
Cohesion: 0.28
Nodes (12): GET(), redirectAndClear(), LandingRedirect(), AUTH_NEXT_COOKIE, AUTH_NEXT_COOKIE_MAX_AGE, callbackDestination(), clearAuthNextCookie(), cookieSuffix() (+4 more)

### Community 38 - "9. Unidade 3 — Consoantes básicas"
Cohesion: 0.33
Nodes (6): 9. Unidade 3 — Consoantes básicas, `h04` — ㄱ e ㄴ, `h05` — ㄷ ㄹ ㅁ, `h06` — ㅂ ㅅ ㅈ, `h07` — ㅋ ㅌ ㅍ ㅊ, `h08` — ㅎ e revisão das 14 consoantes básicas

### Community 39 - "DashboardArea.tsx"
Cohesion: 0.13
Nodes (16): activityFormatter, ActivityList(), BOXES, DashboardArea(), dateFormatter, formatActivityDate(), formatDate(), formatPercent() (+8 more)

### Community 40 - "16. Avaliação"
Cohesion: 0.40
Nodes (5): 16.1 Tipos, 16.2 Regras de pontuação, 16.3 Diagnóstico de erro, 16.4 Banco de itens, 16. Avaliação

### Community 41 - "4. Estrutura geral"
Cohesion: 0.40
Nodes (5): 4.1 Carga semanal sugerida, 4.2 Contagem de jamo, 4.3 Convenções dos IDs, 4.4 Estados de conteúdo, 4. Estrutura geral

### Community 42 - "validate.ts"
Cohesion: 0.07
Nodes (70): Hangul, 7.1 API, 7.2 Invariantes obrigatórias, 7.3 Quando rodar, 7.4 Exemplo de issue, 7. Validação do currículo, 9. Ordem de implementação da Fase 3B, Muda (+62 more)

### Community 43 - "10. Unidade 4 — Consoantes tensas"
Cohesion: 0.50
Nodes (4): 10. Unidade 4 — Consoantes tensas, `c1` — Checkpoint 1: consoantes e primeiras vogais, `h09` — ㄲ ㄸ ㅃ, `h10` — ㅆ ㅉ e o contraste de três vias

### Community 44 - "15. Matriz de cobertura"
Cohesion: 0.50
Nodes (4): 15.1 Consoantes (19), 15.2 Vogais (21), 15.3 Finais (28), 15. Matriz de cobertura

### Community 45 - "17. Integração com revisão espaçada"
Cohesion: 0.50
Nodes (4): 17.1 Cartões, 17.2 Sessão de revisão, 17.3 Relação com `Progress`, 17. Integração com revisão espaçada

### Community 46 - "19. QA de conteúdo"
Cohesion: 0.50
Nodes (4): 19.1 Verificações automáticas obrigatórias, 19.2 Verificações manuais, 19.3 Critérios de bloqueio de lançamento, 19. QA de conteúdo

### Community 47 - "KBR — Plano de implementação da sincronização confiável (Fase 4D.2)"
Cohesion: 0.06
Nodes (32): 10. Rollback, 11. Estados observáveis, 12.2 Store com fake CAS, 12.3 Banco (PostgreSQL local + pgTAP), 12.4 E2E (Playwright + mock), 12.5 Manual (relatado; não reverificado nesta sessão), 12.6 Limitação de revisões concorrentes no mesmo cartão, 12. Estratégia de testes (+24 more)

### Community 48 - "2. Pesquisa, benchmark e decisão de design"
Cohesion: 0.67
Nodes (3): 2.1 Decisões de design (hipóteses, não fatos), 2.2 O que o currículo evita por falta de evidência, 2. Pesquisa, benchmark e decisão de design

### Community 49 - "8. Unidade 2 — Primeiras vogais"
Cohesion: 0.67
Nodes (3): 8. Unidade 2 — Primeiras vogais, `h02` — ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo, `h03` — ㅡ ㅣ e as seis vogais básicas

### Community 50 - "dashboard.test.ts"
Cohesion: 0.15
Nodes (11): CHECKPOINTS, DashboardOptions, ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, ALL_STEP_IDS, markDone(), MemoryStorage, NOW (+3 more)

### Community 51 - "(site)/page.tsx"
Cohesion: 0.27
Nodes (8): first(), LandingPage(), metadata, method, resources, SearchParams, targetLabels, HangulComposition()

### Community 52 - "site.test.ts"
Cohesion: 0.17
Nodes (10): appLayout, callback, footer, impressum, landing, landingAuth, landingRedirect, privacy (+2 more)

### Community 53 - "auth.test.ts"
Cohesion: 0.23
Nodes (12): AppLayout(), dynamic, kr, metadata, AuthControl(), useAuth(), ConnectionNotice(), GateCard() (+4 more)

### Community 54 - "Progress"
Cohesion: 0.10
Nodes (30): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status conta e sincronização (real), Status Fase 1 (real), Status Fase 2B (real), Status Fase 3A (real) (+22 more)

### Community 55 - "SyllableBuilder.tsx"
Cohesion: 0.21
Nodes (11): UI/UX, Parts, PieceGroup(), positionNote(), SyllableBuilder(), Zone(), Medial, COMPOUND (+3 more)

### Community 56 - "exercises/index.ts"
Cohesion: 0.12
Nodes (25): Testes, 12.1 União de respostas, 12.2 Resultado, 12.3 `checkAnswer`, 12.4 Compatibilidade com `check`, 12.5 Invariantes, 12. Modelo de resposta e correção, AudioToCharExercise (+17 more)

### Community 57 - "courses.test.ts"
Cohesion: 0.15
Nodes (27): Cursos e catálogo (Fase 5), PLANNED_COURSES, assertCourseRegistry(), AVAILABLE_COURSES, courseStepHref(), getAvailableCourses(), getCourse(), getCourseBySlug() (+19 more)

### Community 58 - "CourseCompletionPanel.tsx"
Cohesion: 0.25
Nodes (12): 10. Área I — Conclusão do curso, CourseCompletionPanel(), formatPercent(), Stat(), CourseJourney(), statusLabel(), statusTone(), BadgeTone (+4 more)

### Community 59 - "createSupabaseProgressStore"
Cohesion: 0.20
Nodes (21): createEmptyProgress(), classifyProgressSyncError(), createSupabaseProgressStore(), clearError(), delayFor(), ensureLoaded(), loadInternal(), notifyMerged() (+13 more)

### Community 60 - "KBR — Runbook de deploy seguro do CAS (Fase 4D.3)"
Cohesion: 0.05
Nodes (42): 10.1 Cliente (Vercel), 10.2 Banco, 10.3 Dados, 10.4 Progresso local pendente, 10.5 Detectar conflitos e falhas, 10.6 Risco dos grants de DML direto, 10. Rollback, 11. Registro dos testes executados nesta preparação (+34 more)

### Community 61 - "mock-supabase.mjs"
Cohesion: 0.18
Nodes (11): base64url(), createMockSupabaseServer(), createTestAccessToken(), createTestSession(), isProgress(), json(), readJson(), startMockSupabase() (+3 more)

### Community 62 - "mergeProgress.ts"
Cohesion: 0.27
Nodes (18): 4. Algoritmo de referência, attemptIdentity(), canonicalAttempt(), canonicalCard(), canonicalCardJson(), canonicalHistory(), canonicalProgressJson(), CARD_INTERVAL_MS (+10 more)

### Community 63 - "KBR — Checklist manual de iPhone / Chrome iOS (Fase 6B)"
Cohesion: 0.13
Nodes (14): 10. Offline e reconexão, 11. Reduced motion, 12. Instalação e atualização, 1. Instalação pelo Safari (tela de início), 2. Chrome iOS, 3. Launch standalone e retomada, 4. Safe areas, notch e barra inferior, 5. Teclado, zoom e resposta textual (+6 more)

### Community 64 - "dashboard.spec.ts"
Cohesion: 0.20
Nodes (8): ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, authenticate(), progress(), Seed, seedProgress(), sessions, storageKeyFor()

### Community 65 - "exercise-order.test.ts"
Cohesion: 0.22
Nodes (9): ShuffledState, useShuffledOrder(), RandomSource, shuffle(), ALL_EXERCISES, CHOICES, ChoiceShape, choiceShape() (+1 more)

### Community 66 - "Roadmap de qualidade de áudio — Fase 8B"
Cohesion: 0.12
Nodes (15): 8B.0 — Inventário automático, 8B.1 — Sessão de gravação, 8B.2 — Pipeline de assets, 8B.4 — QA com falante nativo, 8B.5 — Testes e documentação, Acessibilidade, Critérios de aceite da 8B, Decisão de arquitetura (+7 more)

### Community 67 - "@playwright/test"
Cohesion: 0.22
Nodes (4): AXE_TAGS, protectedRoutes, @playwright/test@^1.65.0, @playwright/test

### Community 68 - "5. Mudanças no cliente"
Cohesion: 0.19
Nodes (11): Revisão, Status Fase 4A (real), 5.1 `src/lib/storage/mergeProgress.ts`, 5.3 `src/lib/storage/supabaseProgressStore.ts`, 5.4 `src/lib/storage/syncedProgressStore.ts`, 5.5 `src/lib/storage/syncProgress.ts`, 5.6 `src/components/auth/AuthProvider.tsx`, 5.7 Componentes de lição/revisão/painel (+3 more)

### Community 69 - "Design system — especificação"
Cohesion: 0.05
Nodes (42): 10. Desempenho, 11. Governança, 12. Critérios de aceite do design system, 1. Princípios técnicos, 2.1 Primitivos (não usar diretamente em componentes), 2.2 Semânticos — tema claro, 2.3 Semânticos — tema escuro (“mesa de luz”), 2.4 Regras de uso (+34 more)

### Community 70 - "review.spec.ts"
Cohesion: 0.31
Nodes (7): authenticate(), progress(), readProgress(), Seed, seedProgress(), sessions, storageKeyFor()

### Community 71 - "storage/index.ts"
Cohesion: 0.16
Nodes (22): Não muda, Status Fase 4D.2 (real), 12.1 Puros (Vitest), LessonProgress, progressStorageKeyForUser(), createLocalStorageStore(), mergeProgress(), progressEquals() (+14 more)

### Community 72 - "hangul.ts"
Cohesion: 0.25
Nodes (8): checkpointById, completionForStep(), exerciseTypes, HANGUL_COURSE, lessonById, steps, unitByStepId, units

### Community 73 - "testAuthCookie"
Cohesion: 0.32
Nodes (4): accountKeyFor(), createDevice(), progress(), Seed

### Community 74 - "encode-audio.py"
Cohesion: 0.11
Nodes (11): audio_key(), db(), encode_mp3(), main(), probe_duration(), sha256(), trim_and_normalize(), audio_key() (+3 more)

### Community 75 - "18. Plano de testes"
Cohesion: 0.40
Nodes (5): 18.1 Unitários por tipo, 18.2 Conteúdo, 18.3 E2E, 18.4 Fixtures, 18. Plano de testes

### Community 76 - "hangul-experience.test.ts"
Cohesion: 0.20
Nodes (11): 7. Área F — Ilustrações interativas de Hangul, KIND_LABEL, PronunciationLayers(), RuleExample, SyllableRail(), SyllableAnatomy(), Badge(), BuildSyllableExercise (+3 more)

### Community 77 - "encoding"
Cohesion: 0.07
Nodes (26): count, license, repo, revision, encoding, bitrateKbps, channels, codec (+18 more)

### Community 78 - "exercise-ui.tsx"
Cohesion: 0.30
Nodes (20): Lição e composição (Fase 7D), Referências internas, 6. Área E — Lição e checkpoint (player), 6. Fase 7D — Lição e composição, Status Fase 7D (real), AudioControl(), BilingualText(), AnswerArea() (+12 more)

### Community 79 - "run-concurrency.sh"
Cohesion: 0.48
Nodes (5): applied_of(), assert_pair(), run_session(), seed_row(), run-concurrency.sh script

### Community 80 - "DashboardArea.tsx"
Cohesion: 0.14
Nodes (18): 4. Área C — Catálogo de cursos, metadata, Page(), Dashboard(), metadata, metadata, Page(), metadata (+10 more)

### Community 81 - "Movimento — especificação"
Cohesion: 0.07
Nodes (27): 10. Ordem de implementação, 1. Princípios, 2. Tokens, 3.1 Navegação e transições de rota, 3.2 Landing, 3.3 Lição e checkpoint, 3.4 Revisão (Leitner), 3.5 Painel (+19 more)

### Community 82 - "11. Tipo 9 — `srs-session`"
Cohesion: 0.29
Nodes (7): 11.1 Objetivo, 11.2 Especificação, 11.3 Seleção, 11.4 Validação e nota, 11.5 Feedback, 11.6 Acessibilidade, 11. Tipo 9 — `srs-session`

### Community 84 - "CheckpointPlayer.tsx"
Cohesion: 0.11
Nodes (32): Status Fase 4C (real), C4 — Relógio do cliente decide o vencedor (alto), CheckpointPlayer(), DiagnosticsList(), LessonPlayer(), PlayerHeader(), PlayerTone, TONE (+24 more)

### Community 85 - "courses.spec.ts"
Cohesion: 0.22
Nodes (8): ALL_STEP_IDS, authenticate(), CHECKPOINT_IDS, LESSON_IDS, progress(), seedProgress(), sessions, storageKeyFor()

### Community 86 - "Plano de redesign por componente"
Cohesion: 0.13
Nodes (14): 0. Contratos que não podem mudar, 11. Área J — Navegação e responsividade, 12. Mapeamento de classes (migração), 13. Sequência de implementação, 14. Matriz de testes por área, 15. Critérios de aceite do redesign, 16. Fora de escopo, 1. Inventário de componentes (+6 more)

### Community 87 - "privacidade/page.tsx"
Cohesion: 0.38
Nodes (6): legalBasis, metadata, Pending(), PrivacyPage(), Section(), storageRows

### Community 88 - "testAuthCookie"
Cohesion: 0.18
Nodes (11): authenticate(), seedLesson(), sessions, authenticate(), createTestUser(), testAuthCookie(), accountKey(), authenticate() (+3 more)

### Community 89 - "postLoginPath"
Cohesion: 0.25
Nodes (11): Rotas e autenticação, GoogleMark(), LandingAuth(), signIn(), sizes, Variant, LoginReason, normalizeNextPath() (+3 more)

### Community 90 - "storage/index.ts"
Cohesion: 0.15
Nodes (7): vitest, PROGRESS_STORAGE_KEY, StorageLike, MemoryStorage, NOW, MemoryStorage, NOW

### Community 91 - "KBR — Decisão sobre PWA offline e service worker (Fase 6B)"
Cohesion: 0.22
Nodes (8): Alternativas avaliadas, Comportamento offline atual (honesto), Critérios para revisitar, KBR — Decisão sobre PWA offline e service worker (Fase 6B), O que já existe, Por que não implementar agora, Regras invioláveis para uma fase futura, Resumo

### Community 92 - "webkit.spec.ts"
Cohesion: 0.25
Nodes (4): accountKey(), authenticate(), H01_ANSWERS, seedProgress()

### Community 93 - "supabase-cas.test.ts"
Cohesion: 0.15
Nodes (4): clone(), MemoryStorage, memoryStore(), NOW

### Community 94 - "Direção criativa — “Composição”"
Cohesion: 0.08
Nodes (24): 10. O que esta direção muda — e o que preserva, 11. Critérios de sucesso, 12. Anti-metas, 1. A ideia em uma frase, 2. Posicionamento e promessa, 3. Três direções exploradas e a síntese, 4. Pilares, 5.1 Elementos proprietários do KBR (+16 more)

### Community 95 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.20
Nodes (10): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3.1 Cabeçalhos de segurança e cache, 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha), 7. Riscos e limites conhecidos (+2 more)

### Community 96 - "route.ts"
Cohesion: 0.31
Nodes (6): PWA, cabeçalhos e cache (Fase 6A), @supabase/ssr, getBrowserSupabaseClient(), getSupabasePublicConfig(), SupabasePublicConfig, createServerSupabaseClient()

### Community 97 - "KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷"
Cohesion: 0.20
Nodes (10): Development status, KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷, Learning approach, License, Planned learning features, Project documentation, Project philosophy, Running locally (+2 more)

### Community 98 - "Pesquisa visual — Heron AI e linhagens de referência"
Cohesion: 0.12
Nodes (16): 1. Método e limites, 2.1 Stack e comportamento de página, 2.2 Paleta observada, 2.3 Tipografia observada, 2.4 Gramática visual observada, 2.5 Movimento observado, 2.6 Mobile observado, 2.7 Privacidade e peso observados (+8 more)

### Community 99 - "Feedback do usuário — backlog (Igo)"
Cohesion: 0.40
Nodes (4): 1. Resposta correta costuma aparecer primeiro nas múltiplas escolhas, 2. Áudio coreano pouco claro, sobretudo ㄹ e algumas vogais, 3. Vontade de flashcards de vocabulário ilustrados, Feedback do usuário — backlog (Igo)

### Community 100 - "Fase 7 — roadmap de implementação"
Cohesion: 0.12
Nodes (15): 10. O que fica para depois da 7G, 11. Riscos e mitigação, 12. Critérios de saída da Fase 7, 13. Checklist de retomada (para o próximo agente), 14. Incertezas remanescentes, 1. Estado da 7A, 2.1 Stack recomendada, 2. Princípios de execução (+7 more)

### Community 101 - "Hangul — conceitos de interação"
Cohesion: 0.14
Nodes (13): 10. Ilustração de Hangul — regras, 11. Priorização, 12. Critérios de aceite, 1. Princípios, 2. Vocabulário visual comum, 3. Conceito 1 — Bancada de composição, 4. Conceito 2 — Anatomia da sílaba, 5. Conceito 3 — Régua de leitura e camadas de pronúncia (+5 more)

### Community 102 - "KBR — Pesquisa"
Cohesion: 0.10
Nodes (13): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa, 1. Criar e preparar o projeto Supabase (+5 more)

### Community 103 - "3. Invariantes por campo"
Cohesion: 0.10
Nodes (20): 1. Definições, 2. Propriedades algébricas obrigatórias, 3. Invariantes por campo, 5. Matriz de testes, 6. Limitações do `Progress` v1 que o merge não pode eliminar, 7. Compatibilidade, I10 — Retentativas idempotentes, I11 — Offline e reconexão (+12 more)

### Community 104 - "4. Exercícios: extensão compatível"
Cohesion: 0.33
Nodes (6): 4.1 Estado atual, 4.2 Novos tipos, 4.3 `build-syllable` estendido, 4.4 União final, 4. Exercícios: extensão compatível, ExerciseBase

### Community 105 - "KBR — Arquitetura"
Cohesion: 0.12
Nodes (16): Decisões/limites, Estrutura, Hardening e limpeza (Fase 7G), Interfaces de troca futura, KBR — Arquitetura, Landing e shell “Composição” (Fase 7C), Modelo de dados (TS), Movimento, anatomias e conclusão (Fase 7F) (+8 more)

### Community 106 - "app/layout.tsx"
Cohesion: 0.16
Nodes (11): archivo, metadata, plexMono, RootLayout(), viewport, AuthContext, AuthContextValue, AuthProvider() (+3 more)

### Community 107 - "Detalhe por opção"
Cohesion: 0.13
Nodes (14): 1. Web Speech API (estado atual), 2. MeloTTS-Korean, 3. Piper `ko_KR-kss-medium`, 4. XTTS v2 (Coqui), 5. Kokoro-82M, 6. Google Cloud Text-to-Speech, 7. Azure Speech, 8. Gravação com falante nativo (+6 more)

### Community 108 - "6. Compatibilidade com `Progress`"
Cohesion: 0.33
Nodes (6): 6.1 Mapeamento de lições, 6.2 Cartões SRS, 6.3 Histórico, 6.4 `mergeProgress`, 6.5 Domínio derivado (não persistido), 6. Compatibilidade com `Progress`

### Community 109 - "Áudio atual — auditoria técnica e de experiência"
Cohesion: 0.15
Nodes (12): 10. Critérios de aceite desta auditoria, 1. O que existe hoje, 2. Caminho de reprodução, 3. Onde o áudio é usado, 4. Inventário do conteúdo falado, 5. Diagnóstico de vozes no ambiente de teste, 6. Achados e severidade, 7. Causas prováveis do relato de ㄹ e vogais (+4 more)

### Community 110 - "mobile.spec.ts"
Cohesion: 0.40
Nodes (3): authenticate(), seedLessons(), sessions

### Community 111 - "sync-concurrency.test.ts"
Cohesion: 0.32
Nodes (5): clone(), lastWriteWinsRemote(), memoryStore(), NOW, progressAt()

### Community 112 - "playback.ts"
Cohesion: 0.13
Nodes (19): SpeakerIcon(), statusMessage(), createBrowserAudioPlayer(), AudioElementLike, AudioPlaybackState, AudioPlayerDependencies, AudioSource, pickKoreanVoice() (+11 more)

### Community 113 - "13. Feedback"
Cohesion: 0.50
Nodes (4): 13.1 Estrutura, 13.2 Exemplos, 13.3 O que evitar, 13. Feedback

### Community 114 - "performance.spec.ts"
Cohesion: 0.33
Nodes (3): authenticate(), seedHangulProgress(), seedLessons()

### Community 115 - "Geração do áudio estático — MeloTTS-Korean"
Cohesion: 0.12
Nodes (15): 1. Inventário, 2. Síntese, 3. Corte, normalização e MP3, Ambiente usado, Caveat de licença do encoder, Decisão: Python oficial, não imagem Docker, Download dos modelos no commit fixado, Geração do áudio estático — MeloTTS-Korean (+7 more)

### Community 117 - "inventory.ts"
Cohesion: 0.27
Nodes (13): add(), addContrastTags(), addExercise(), addRule(), addStep(), addSyllable(), addWord(), AudioInventoryItem (+5 more)

### Community 118 - "audio-manifest.test.ts"
Cohesion: 0.31
Nodes (8): AUDIO_ENTRIES, AudioAsset, audioAssetCount(), hasAudioAsset(), resolveAudioAsset(), audioKey(), normalizeAudioText(), PUBLIC_DIR

### Community 120 - "design-system.test.ts"
Cohesion: 0.20
Nodes (8): contrast(), darkPairs, globals, layout, lightPairs, luminance(), sourceFiles(), srcRoot

### Community 125 - "build-inventory.mjs"
Cohesion: 0.33
Nodes (3): outputDir, outputFile, root

### Community 126 - "localStorageStore.ts"
Cohesion: 0.80
Nodes (4): isDateString(), isProgress(), isRecord(), migrate()

### Community 127 - "2. Arquitetura atual, como está no código"
Cohesion: 0.50
Nodes (4): 2.1 Persistência, 2.2 Fluxo de login e hidratação, 2.3 Escrita durante a sessão, 2. Arquitetura atual, como está no código

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Progress` connect `Progress` to `dashboard.ts`, `completion.ts`, `KBR — instruções para agentes (Codex, OpenCode, Claude Code)`, `fakeSupabaseCas.ts`, `courses.test.ts`, `Schema de conteúdo — módulo Hangul`, `lib/courses/index.ts`, `review/index.ts`, `next`, `DashboardArea.tsx`, `validate.ts`, `17. Integração com revisão espaçada`, `KBR — Plano de implementação da sincronização confiável (Fase 4D.2)`, `dashboard.test.ts`, `courses.test.ts`, `CourseCompletionPanel.tsx`, `createSupabaseProgressStore`, `KBR — Runbook de deploy seguro do CAS (Fase 4D.3)`, `mergeProgress.ts`, `Roadmap de qualidade de áudio — Fase 8B`, `5. Mudanças no cliente`, `storage/index.ts`, `exercise-ui.tsx`, `CheckpointPlayer.tsx`, `Plano de redesign por componente`, `storage/index.ts`, `KBR — Decisão sobre PWA offline e service worker (Fase 6B)`, `supabase-cas.test.ts`, `Direção criativa — “Composição”`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`, `Feedback do usuário — backlog (Igo)`, `Fase 7 — roadmap de implementação`, `Hangul — conceitos de interação`, `3. Invariantes por campo`, `KBR — Arquitetura`, `6. Compatibilidade com `Progress``, `Áudio atual — auditoria técnica e de experiência`, `sync-concurrency.test.ts`, `localStorageStore.ts`, `2. Arquitetura atual, como está no código`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **Are the 68 inferred relationships involving `Progress` (e.g. with `Fase atual` and `Cursos e catálogo (Fase 5)`) actually correct?**
  _`Progress` has 68 INFERRED edges - model-reasoned connections that need verification._
- **Should `4. Defeitos confirmados` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `storage/index.ts` to `package.json`, `supabase/proxy.ts`, `recognition.ts`, `ui-primitives.test.ts`, `completion.ts`, `courses.test.ts`, `review/index.ts`, `AuthProvider.tsx`, `validate.ts`, `dashboard.test.ts`, `site.test.ts`, `exercises/index.ts`, `createSupabaseProgressStore`, `exercise-order.test.ts`, `hangul-experience.test.ts`, `CheckpointPlayer.tsx`, `supabase-cas.test.ts`, `sync-concurrency.test.ts`, `playback.ts`, `audio-manifest.test.ts`, `design-system.test.ts`, `ref_node_fs`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `checkAnswer()` (e.g. with `Cursos e catálogo (Fase 5)` and `Lição e composição (Fase 7D)`) actually correct?**
  _`checkAnswer()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07308377896613191 - nodes in this community are weakly interconnected._
- **Why does `Design de exercícios — módulo Hangul` connect `Design de exercícios — módulo Hangul` to `18. Plano de testes`, `13. Feedback`, `11. Tipo 9 — `srs-session``, `9. Tipo 7 — `reading``, `10. Tipo 8 — `stroke-order``, `exercises/index.ts`, `3. Tipo 1 — `recognition``, `5. Tipo 3 — `char-to-audio``, `6. Tipo 4 — `order-jamo``, `8. Tipo 6 — `minimal-pair``, `7. Tipo 5 — `build-syllable``, `4. Tipo 2 — `audio-to-char``?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
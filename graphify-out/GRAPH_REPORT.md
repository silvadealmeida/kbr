# Graph Report - kbr  (2026-11-12)

## Corpus Check
- 246 files · ~264,991 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 2157 nodes · 4355 edges · 146 communities (137 shown, 9 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 379 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c08e3267`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 4. Defeitos confirmados
- package.json
- supabase/proxy.ts
- Deep UI/UX, Motion Design & Creative Development Research — KBR
- speech.test.ts
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
- content/hangul/index.ts
- 11. Unidade 5 — Todas as vogais
- 12. Unidade 6 — Sílabas e batchim
- 13. Unidade 7 — Ler em contexto
- impressum/page.tsx
- hangul.spec.ts
- (site)/page.tsx
- 9. Unidade 3 — Consoantes básicas
- DashboardArea.tsx
- 16. Avaliação
- 4. Estrutura geral
- review/index.ts
- 10. Unidade 4 — Consoantes tensas
- 15. Matriz de cobertura
- 17. Integração com revisão espaçada
- 19. QA de conteúdo
- KBR — Plano de implementação da sincronização confiável (Fase 4D.2)
- 2. Pesquisa, benchmark e decisão de design
- 8. Unidade 2 — Primeiras vogais
- dashboard.test.ts
- checkpoints/index.ts
- site.test.ts
- auth.test.ts
- Progress
- SyllableBuilder.tsx
- exercises/index.ts
- courses.test.ts
- HangulCourse.tsx
- createSupabaseProgressStore
- KBR — Runbook de deploy seguro do CAS (Fase 4D.3)
- mock-supabase.mjs
- mergeProgress.ts
- KBR — Checklist manual de iPhone / Chrome iOS (Fase 6B)
- dashboard.spec.ts
- exercise-order.test.ts
- Roadmap de qualidade de áudio — Fase 8B
- @playwright/test
- review.test.ts
- Design system — especificação
- review.spec.ts
- mergeProgress
- hangul.ts
- testAuthCookie
- encode-audio.py
- Auditoria de licenças do áudio sintético — Fase 8D
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
- (site)/page.tsx
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
- 3. Tipos de domínio
- KBR — Arquitetura
- app/layout.tsx
- Detalhe por opção
- validate.ts
- Áudio atual — auditoria técnica e de experiência
- mobile.spec.ts
- Prontidão para beta controlado — Fase 8D
- playback.ts
- SpeakingPracticeArea.tsx
- performance.spec.ts
- Geração do áudio estático — MeloTTS-Korean
- diagnostics.ts
- inventory.ts
- audio-manifest.test.ts
- AudioPlayer
- design-system.test.ts
- exercise-media.tsx
- Inventário e prioridade
- 9. Ordem de deploy
- ref_node_fs
- build-inventory.mjs
- KBR — Prática de fala com reconhecimento nativo (Fase 8C, experimental)
- recognition.ts
- 4. Exercícios: extensão compatível
- SpeechController
- Supabase e Google OAuth — configuração manual
- sync-concurrency.test.ts
- 10. Rollback
- KBR — Invariantes de merge do Progress (Fase 4D.1)
- Relatório de qualidade e integridade do áudio — Fase 8D
- 4. Preflight read-only
- 5. Aplicar a migração
- 6. Verificação pós-migração
- 7. Deploy do cliente
- 8. Checklist de teste real em duas sessões/dispositivos
- audio.spec.ts
- localStorageStore.ts
- 13. Feedback
- 2. Arquitetura atual, como está no código

## God Nodes (most connected - your core abstractions)
1. `Progress` - 101 edges
2. `checkAnswer()` - 37 edges
3. `next` - 37 edges
4. `Lesson` - 34 edges
5. `react` - 34 edges
6. `vitest` - 33 edges
7. `KBR — Roadmap` - 31 edges
8. `testAuthCookie()` - 27 edges
9. `KBR — Arquitetura` - 25 edges
10. `useAuth()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `Consumo no app` --references--> `AudioControl()`  [INFERRED]
  docs/audio/generation-guide.md → src/components/hangul/exercise-media.tsx
- `2. Áudio coreano pouco claro, sobretudo ㄹ e algumas vogais` --references--> `AudioControl()`  [INFERRED]
  docs/feedback/feedback-igo.md → src/components/hangul/exercise-media.tsx
- `Compatibilidade observada (pesquisa em 12/11/2026)` --references--> `install()`  [INFERRED]
  docs/speech/speech-recognition.md → src/components/speaking/SpeakingPracticeArea.tsx
- `Detecção (por recurso, nunca por nome de navegador)` --references--> `install()`  [INFERRED]
  docs/speech/speech-recognition.md → src/components/speaking/SpeakingPracticeArea.tsx
- `Regras` --references--> `Progress`  [INFERRED]
  AGENTS.md → src/lib/storage/index.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (146 total, 9 thin omitted)

### Community 0 - "4. Defeitos confirmados"
Cohesion: 0.07
Nodes (26): 1. Método e limites, 3. Comportamento por operação, 4. Defeitos confirmados, 5. O que **não** é bug confirmado, 6.1 Duas lições em dispositivos diferentes (C1), 6.2 Revisão de cartão vencida por atividade posterior (C3), 6.3 Offline + outro dispositivo online (C1/C9), 6.4 Relógio adiantado (C4) (+18 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (35): dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0, tailwindcss@^4.3.5 (+27 more)

### Community 2 - "supabase/proxy.ts"
Cohesion: 0.16
Nodes (12): EXPERIMENTAL_PROTECTED_PATHS, isProtectedPath(), LEGACY_PROTECTED_PATHS, PROTECTED_PATHS, ROUTES, hadSessionCookie(), redirect(), redirectToLogin() (+4 more)

### Community 3 - "Deep UI/UX, Motion Design & Creative Development Research — KBR"
Cohesion: 0.05
Nodes (36): 10. Hangul as an Interactive Visual System, 11. Advanced Animation Technologies, 12. Prototype Concepts — Research Only, 13. Art Direction Exploration, 14. Performance and Accessibility Requirements, 15. Additional Deliverables, 8. Cinematic Motion Design and Interactive Storytelling, 9. Architectural Illustration and Editorial Drawing Styles (+28 more)

### Community 4 - "speech.test.ts"
Cohesion: 0.17
Nodes (10): compareOne(), matchTranscript(), normalizeForComparison(), TranscriptMatch, TranscriptMatchKind, RecognitionConstructorLike, RecognitionLike, FakeRecognition (+2 more)

### Community 5 - "lessons/index.ts"
Cohesion: 0.08
Nodes (31): H01, H02, H03, H04, H05, H06, H07, H08 (+23 more)

### Community 6 - "dashboard.ts"
Cohesion: 0.14
Nodes (23): accuracy(), ActivitySummary, ATTEMPT_CATEGORY_LABELS, AttemptCategory, AttemptStats, AttemptTarget, buildAttemptTargets(), buildDashboardSummary() (+15 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Pronúncia coreana para brasileiros"
Cohesion: 0.06
Nodes (32): 10. Romanização: por que ela engana, 11. Tabela de aproximações para a interface, 12. Limites do TTS, 13. Roteiro de gravação (para revisão humana), 14. Pontos que exigem revisão especializada, 15. Sequência de prática para brasileiros, 16. Referências, 1. Advertência inicial (+24 more)

### Community 9 - "react"
Cohesion: 0.21
Nodes (9): SiteLayout(), AuthControl(), Nav(), learnLinks, legalLinks, SiteFooter(), nav, SiteHeader() (+1 more)

### Community 10 - "Hangul — referência pedagógica"
Cohesion: 0.06
Nodes (30): 10. Notas de ensino por letra, 11. Originalidade e limites, 12. Referências, 1. Como ler este documento, 2. Terminologia mínima, 3. História em poucas linhas, 4.1 Consoantes, 4.2 Vogais (+22 more)

### Community 11 - "Currículo de Hangul — Fase 3A"
Cohesion: 0.13
Nodes (14): 14. Grafo de pré-requisitos, 18. Fluxo do player de lição, 1.1 Fora de escopo, 1. Objetivo do módulo, 20. Revisão especializada pendente, 21. Riscos e mitigação, 23. Referências, 3. Princípios pedagógicos operacionais (+6 more)

### Community 12 - "ui-primitives.test.ts"
Cohesion: 0.16
Nodes (16): Design system “Composição” (Fase 7B), Status Fase 7B (real), Button(), ButtonLinkProps, ButtonProps, ButtonSize, buttonSizes, buttonStyles() (+8 more)

### Community 13 - "completion.ts"
Cohesion: 0.10
Nodes (11): Status Fase 4C (real), buildCourseCompletionReport(), buildFinalAssessment(), CompletedCheckpointSummary, CompletedLessonSummary, CompletionReportOptions, CompletionStats, CourseJourneyStep (+3 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.25
Nodes (7): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras, This is NOT the Next.js you know

### Community 15 - "fakeSupabaseCas.ts"
Cohesion: 0.12
Nodes (11): @supabase/supabase-js, clone(), errorFor(), FakeCasFailure, FakeCasRpcParams, FakeCasServer, FakeRow, RpcCall (+3 more)

### Community 16 - "courses.test.ts"
Cohesion: 0.12
Nodes (15): COURSE_REGISTRY, EXERCISE_TYPE_REGISTRY, ExerciseGrading, ExerciseSkill, ExerciseTypeDefinition, ExerciseTypeId, IMPLEMENTED_EXERCISE_TYPES, ImplementedExerciseType (+7 more)

### Community 17 - "Schema de conteúdo — módulo Hangul"
Cohesion: 0.11
Nodes (18): 10. Critérios de aceite técnicos, 11. Referências, 1. O que muda e o que não muda, 2. Estrutura de arquivos recomendada, 5.1 União, 5.2 Resultado detalhado, 5.3 `check` preservado, 5.4 Normalização (+10 more)

### Community 18 - "lib/courses/index.ts"
Cohesion: 0.31
Nodes (15): Painel, Status Fase 4B (real), CourseProgressSummary, summarizeCourseProgress(), buildCourseSteps(), CourseCheckpointLike, CourseLessonLike, CourseProgressLike (+7 more)

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

### Community 31 - "content/hangul/index.ts"
Cohesion: 0.12
Nodes (22): generateMetadata(), CHECKPOINTS, getCheckpoint(), HANGUL_CURRICULUM, CONTENT_IN_REVIEW, JAMO, getLesson(), IMPLEMENTED_LESSON_IDS (+14 more)

### Community 32 - "11. Unidade 5 — Todas as vogais"
Cohesion: 0.29
Nodes (7): 11. Unidade 5 — Todas as vogais, `c2` — Checkpoint 2: inventário completo de vogais, `h11` — ㅑ ㅕ ㅛ ㅠ, `h12` — ㅐ ㅔ ㅒ ㅖ, `h13` — ㅘ ㅝ ㅟ, `h14` — ㅙ ㅞ ㅚ, `h15` — ㅢ e o inventário completo de vogais

### Community 33 - "12. Unidade 6 — Sílabas e batchim"
Cohesion: 0.29
Nodes (7): 12. Unidade 6 — Sílabas e batchim, `c3` — Checkpoint 3: sílabas e batchim, `h16` — Montar e ler sílabas C+V, `h17` — Batchim ㅇ, ㄴ, ㅁ, `h18` — Batchim oclusivo e os sete sons representativos, `h19` — Batchim ㄹ, `h20` — Os 11 batchim duplos

### Community 34 - "13. Unidade 7 — Ler em contexto"
Cohesion: 0.29
Nodes (7): 13. Unidade 7 — Ler em contexto, `c4` — Checkpoint 4: leitura integrada, `h21` — Ligação (연음), `h22` — Nasalização, `h23` — Aspiração, `h24` — Oficina de leitura, `h25` — Consolidação e domínio

### Community 36 - "hangul.spec.ts"
Cohesion: 0.10
Nodes (19): accountKey(), C1_WRONG_STEPS, C2_STEPS, C2Step, C3_STEPS, C3Step, C4_STEPS, C4Step (+11 more)

### Community 37 - "(site)/page.tsx"
Cohesion: 0.21
Nodes (14): AuthContext, AuthContextValue, AuthProvider(), LandingRedirect(), AUTH_NEXT_COOKIE_MAX_AGE, clearAuthNextCookie(), cookieSuffix(), decodeNextCookie() (+6 more)

### Community 38 - "9. Unidade 3 — Consoantes básicas"
Cohesion: 0.33
Nodes (6): 9. Unidade 3 — Consoantes básicas, `h04` — ㄱ e ㄴ, `h05` — ㄷ ㄹ ㅁ, `h06` — ㅂ ㅅ ㅈ, `h07` — ㅋ ㅌ ㅍ ㅊ, `h08` — ㅎ e revisão das 14 consoantes básicas

### Community 39 - "DashboardArea.tsx"
Cohesion: 0.14
Nodes (16): activityFormatter, ActivityList(), BOXES, DashboardArea(), dateFormatter, formatActivityDate(), formatDate(), formatPercent() (+8 more)

### Community 40 - "16. Avaliação"
Cohesion: 0.40
Nodes (5): 16.1 Tipos, 16.2 Regras de pontuação, 16.3 Diagnóstico de erro, 16.4 Banco de itens, 16. Avaliação

### Community 41 - "4. Estrutura geral"
Cohesion: 0.40
Nodes (5): 4.1 Carga semanal sugerida, 4.2 Contagem de jamo, 4.3 Convenções dos IDs, 4.4 Estados de conteúdo, 4. Estrutura geral

### Community 42 - "review/index.ts"
Cohesion: 0.23
Nodes (17): buildReviewExercise(), buildReviewQueueFromEntries(), HANGUL_REVIEW_CATALOG, isDate(), jamoExercise(), MAX_REVIEW_SESSION, nextDueAt(), optionList() (+9 more)

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
Cohesion: 0.08
Nodes (23): 10. Rollback, 11. Estados observáveis, 12.2 Store com fake CAS, 12.3 Banco (PostgreSQL local + pgTAP), 12.4 E2E (Playwright + mock), 12.5 Manual (relatado; não reverificado nesta sessão), 12.6 Limitação de revisões concorrentes no mesmo cartão, 12. Estratégia de testes (+15 more)

### Community 48 - "2. Pesquisa, benchmark e decisão de design"
Cohesion: 0.67
Nodes (3): 2.1 Decisões de design (hipóteses, não fatos), 2.2 O que o currículo evita por falta de evidência, 2. Pesquisa, benchmark e decisão de design

### Community 49 - "8. Unidade 2 — Primeiras vogais"
Cohesion: 0.67
Nodes (3): 8. Unidade 2 — Primeiras vogais, `h02` — ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo, `h03` — ㅡ ㅣ e as seis vogais básicas

### Community 50 - "dashboard.test.ts"
Cohesion: 0.16
Nodes (10): DashboardOptions, ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, ALL_STEP_IDS, markDone(), MemoryStorage, NOW, options() (+2 more)

### Community 51 - "checkpoints/index.ts"
Cohesion: 0.33
Nodes (6): C1, C2, C3, C4, IMPLEMENTED_CHECKPOINT_IDS, Checkpoint

### Community 52 - "site.test.ts"
Cohesion: 0.17
Nodes (10): appLayout, callback, footer, impressum, landing, landingAuth, landingRedirect, privacy (+2 more)

### Community 53 - "auth.test.ts"
Cohesion: 0.24
Nodes (12): AppLayout(), dynamic, kr, metadata, useAuth(), ConnectionNotice(), GateCard(), ProtectedArea() (+4 more)

### Community 54 - "Progress"
Cohesion: 0.12
Nodes (26): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status Fase 1 (real), Status Fase 3A (real), Status Fase 3B.2 (real), Status Fase 3B.3 (real) (+18 more)

### Community 55 - "SyllableBuilder.tsx"
Cohesion: 0.18
Nodes (13): react, Parts, PieceGroup(), positionNote(), SyllableBuilder(), Zone(), ShuffledState, useShuffledOrder() (+5 more)

### Community 56 - "exercises/index.ts"
Cohesion: 0.09
Nodes (30): Testes, 22. Handoff para a Fase 3B, 12.1 União de respostas, 12.2 Resultado, 12.3 `checkAnswer`, 12.4 Compatibilidade com `check`, 12.5 Invariantes, 12. Modelo de resposta e correção (+22 more)

### Community 57 - "courses.test.ts"
Cohesion: 0.15
Nodes (27): Cursos e catálogo (Fase 5), PLANNED_COURSES, assertCourseRegistry(), AVAILABLE_COURSES, courseStepHref(), getAvailableCourses(), getCourse(), getCourseBySlug() (+19 more)

### Community 58 - "HangulCourse.tsx"
Cohesion: 0.14
Nodes (23): 10. Área I — Conclusão do curso, 7. Área F — Ilustrações interativas de Hangul, metadata, Page(), CourseCompletionPanel(), formatPercent(), Stat(), CourseJourney() (+15 more)

### Community 59 - "createSupabaseProgressStore"
Cohesion: 0.17
Nodes (23): Status Fase 4D.2 (real), 13. Escopo exato da Fase 4D.2, classifyProgressSyncError(), createSupabaseProgressStore(), clearError(), delayFor(), ensureLoaded(), loadInternal() (+15 more)

### Community 60 - "KBR — Runbook de deploy seguro do CAS (Fase 4D.3)"
Cohesion: 0.22
Nodes (9): 11. Registro dos testes executados nesta preparação, 12. Ações que exigiram o usuário (histórico), 1. Avaliação de prontidão, 2. Ordem segura obrigatória, 3.1 Backup do banco, 3.2 Baseline sem expor progresso, 3.3 Janela e comunicação, 3. Backup e janela (+1 more)

### Community 61 - "mock-supabase.mjs"
Cohesion: 0.18
Nodes (11): base64url(), createMockSupabaseServer(), createTestAccessToken(), createTestSession(), isProgress(), json(), readJson(), startMockSupabase() (+3 more)

### Community 62 - "mergeProgress.ts"
Cohesion: 0.27
Nodes (18): 4. Algoritmo de referência, attemptIdentity(), canonicalAttempt(), canonicalCard(), canonicalCardJson(), canonicalHistory(), canonicalProgressJson(), CARD_INTERVAL_MS (+10 more)

### Community 63 - "KBR — Checklist manual de iPhone / Chrome iOS (Fase 6B)"
Cohesion: 0.12
Nodes (16): 10. Offline e reconexão, 11. Reduced motion, 12. Instalação e atualização, 13. Prática de fala experimental (`/fala`) e catálogo (Fase 8C), 14. Matriz de teste manual para o beta controlado (Fase 8D), 1. Instalação pelo Safari (tela de início), 2. Chrome iOS, 3. Launch standalone e retomada (+8 more)

### Community 64 - "dashboard.spec.ts"
Cohesion: 0.20
Nodes (8): ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, authenticate(), progress(), Seed, seedProgress(), sessions, storageKeyFor()

### Community 65 - "exercise-order.test.ts"
Cohesion: 0.27
Nodes (7): RandomSource, shuffle(), ALL_EXERCISES, CHOICES, ChoiceShape, choiceShape(), permutations()

### Community 66 - "Roadmap de qualidade de áudio — Fase 8B"
Cohesion: 0.20
Nodes (9): Acessibilidade, Critérios de aceite da 8B, Decisão de arquitetura, Estado da implementação (8B local), Fora de escopo, Orçamento e desempenho, Riscos e mitigação, Roadmap de qualidade de áudio — Fase 8B (+1 more)

### Community 67 - "@playwright/test"
Cohesion: 0.22
Nodes (3): AXE_TAGS, protectedRoutes, @playwright/test

### Community 68 - "review.test.ts"
Cohesion: 0.11
Nodes (16): Revisão, Status Fase 4A (real), 5.1 `src/lib/storage/mergeProgress.ts`, 5.2 `src/lib/srs/index.ts`, `leitner.ts`, `cards.ts`, `review/index.ts`, 5.3 `src/lib/storage/supabaseProgressStore.ts`, 5.4 `src/lib/storage/syncedProgressStore.ts`, 5.5 `src/lib/storage/syncProgress.ts`, 5.6 `src/components/auth/AuthProvider.tsx` (+8 more)

### Community 69 - "Design system — especificação"
Cohesion: 0.05
Nodes (42): 10. Desempenho, 11. Governança, 12. Critérios de aceite do design system, 1. Princípios técnicos, 2.1 Primitivos (não usar diretamente em componentes), 2.2 Semânticos — tema claro, 2.3 Semânticos — tema escuro (“mesa de luz”), 2.4 Regras de uso (+34 more)

### Community 70 - "review.spec.ts"
Cohesion: 0.25
Nodes (9): authenticate(), createTestUser(), authenticate(), progress(), readProgress(), Seed, seedProgress(), sessions (+1 more)

### Community 71 - "mergeProgress"
Cohesion: 0.29
Nodes (8): Não muda, 12.1 Puros (Vitest), LessonProgress, mergeProgress(), progressEquals(), createSyncedProgressStore(), loadInternal(), SyncStatusChange

### Community 72 - "hangul.ts"
Cohesion: 0.25
Nodes (8): checkpointById, completionForStep(), exerciseTypes, HANGUL_COURSE, lessonById, steps, unitByStepId, units

### Community 73 - "testAuthCookie"
Cohesion: 0.32
Nodes (4): accountKeyFor(), createDevice(), progress(), Seed

### Community 74 - "encode-audio.py"
Cohesion: 0.09
Nodes (11): audio_key(), db(), encode_mp3(), main(), probe_duration(), sha256(), trim_and_normalize(), audio_key() (+3 more)

### Community 75 - "Auditoria de licenças do áudio sintético — Fase 8D"
Cohesion: 0.20
Nodes (9): 1. Cadeia de geração e o que cada elo declara, 2. O checkpoint do `kykim/bert-kor-base` é necessário?, 3. Os MP3 contêm o BERT? Os termos alcançam a saída?, 4. Restrições aplicáveis e documentação defensável, 5. Alternativas com licença clara, 6. Plano de remediação (nada foi apagado nem regenerado), 7. Estado de distribuição, Auditoria de licenças do áudio sintético — Fase 8D (+1 more)

### Community 76 - "hangul-experience.test.ts"
Cohesion: 0.18
Nodes (14): 2. Reprodução, fallback e acessibilidade (revisão de código + testes), Defeito verificado e corrigido nesta fase, AudioControl(), SpeakerIcon(), statusMessage(), KIND_LABEL, PronunciationLayers(), RuleExample (+6 more)

### Community 77 - "encoding"
Cohesion: 0.07
Nodes (26): count, license, repo, revision, encoding, bitrateKbps, channels, codec (+18 more)

### Community 78 - "exercise-ui.tsx"
Cohesion: 0.27
Nodes (20): Lição e composição (Fase 7D), Referências internas, 6. Área E — Lição e checkpoint (player), 6. Fase 7D — Lição e composição, Status Fase 7D (real), BilingualText(), AnswerArea(), AnswerAreaProps (+12 more)

### Community 79 - "run-concurrency.sh"
Cohesion: 0.48
Nodes (5): applied_of(), assert_pair(), run_session(), seed_row(), run-concurrency.sh script

### Community 80 - "DashboardArea.tsx"
Cohesion: 0.09
Nodes (29): 4. Área C — Catálogo de cursos, next, metadata, Page(), Dashboard(), metadata, metadata, Page() (+21 more)

### Community 81 - "Movimento — especificação"
Cohesion: 0.07
Nodes (27): 10. Ordem de implementação, 1. Princípios, 2. Tokens, 3.1 Navegação e transições de rota, 3.2 Landing, 3.3 Lição e checkpoint, 3.4 Revisão (Leitner), 3.5 Painel (+19 more)

### Community 82 - "11. Tipo 9 — `srs-session`"
Cohesion: 0.29
Nodes (7): 11.1 Objetivo, 11.2 Especificação, 11.3 Seleção, 11.4 Validação e nota, 11.5 Feedback, 11.6 Acessibilidade, 11. Tipo 9 — `srs-session`

### Community 84 - "CheckpointPlayer.tsx"
Cohesion: 0.11
Nodes (32): 2.4 Leitner e histórico, C4 — Relógio do cliente decide o vencedor (alto), Page(), PageProps, CheckpointPlayer(), DiagnosticsList(), LessonPlayer(), PlayerHeader() (+24 more)

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
Cohesion: 0.21
Nodes (6): testAuthCookie(), accountKey(), authenticate(), seedProgress(), Api, authenticate()

### Community 89 - "(site)/page.tsx"
Cohesion: 0.14
Nodes (19): Rotas e autenticação, Status conta e sincronização (real), Status Fase 2B (real), first(), LandingPage(), metadata, method, resources (+11 more)

### Community 90 - "storage/index.ts"
Cohesion: 0.13
Nodes (17): PROGRESS_STORAGE_KEY, progressStorageKeyForUser(), StorageLike, createLocalStorageStore(), ProgressSyncErrorKind, activeSyncs, hasLearningData(), migrationKey() (+9 more)

### Community 91 - "KBR — Decisão sobre PWA offline e service worker (Fase 6B)"
Cohesion: 0.22
Nodes (8): Alternativas avaliadas, Comportamento offline atual (honesto), Critérios para revisitar, KBR — Decisão sobre PWA offline e service worker (Fase 6B), O que já existe, Por que não implementar agora, Regras invioláveis para uma fase futura, Resumo

### Community 92 - "webkit.spec.ts"
Cohesion: 0.25
Nodes (4): accountKey(), authenticate(), H01_ANSWERS, seedProgress()

### Community 93 - "supabase-cas.test.ts"
Cohesion: 0.13
Nodes (5): vitest, clone(), MemoryStorage, memoryStore(), NOW

### Community 94 - "Direção criativa — “Composição”"
Cohesion: 0.08
Nodes (24): 10. O que esta direção muda — e o que preserva, 11. Critérios de sucesso, 12. Anti-metas, 1. A ideia em uma frase, 2. Posicionamento e promessa, 3. Três direções exploradas e a síntese, 4. Pilares, 5.1 Elementos proprietários do KBR (+16 more)

### Community 95 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.18
Nodes (11): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3.1 Cabeçalhos de segurança e cache, 3.2 Microfone e reconhecimento de fala (Fase 8C), 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha) (+3 more)

### Community 96 - "route.ts"
Cohesion: 0.23
Nodes (9): PWA, cabeçalhos e cache (Fase 6A), GET(), redirectAndClear(), AUTH_NEXT_COOKIE, callbackDestination(), getBrowserSupabaseClient(), getSupabasePublicConfig(), SupabasePublicConfig (+1 more)

### Community 97 - "KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷"
Cohesion: 0.20
Nodes (10): Development status, KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷, Learning approach, License, Planned learning features, Project documentation, Project philosophy, Running locally (+2 more)

### Community 98 - "Pesquisa visual — Heron AI e linhagens de referência"
Cohesion: 0.12
Nodes (16): 1. Método e limites, 2.1 Stack e comportamento de página, 2.2 Paleta observada, 2.3 Tipografia observada, 2.4 Gramática visual observada, 2.5 Movimento observado, 2.6 Mobile observado, 2.7 Privacidade e peso observados (+8 more)

### Community 99 - "Feedback do usuário — backlog (Igo)"
Cohesion: 0.29
Nodes (6): 1. Resposta correta costuma aparecer primeiro nas múltiplas escolhas, 2. Áudio coreano pouco claro, sobretudo ㄹ e algumas vogais, 3. Vontade de flashcards de vocabulário ilustrados, 4. Prática de fala nativa e cartão do catálogo no iPhone (Fase 8C), Atualização da Fase 8D, Feedback do usuário — backlog (Igo)

### Community 100 - "Fase 7 — roadmap de implementação"
Cohesion: 0.12
Nodes (15): 10. O que fica para depois da 7G, 11. Riscos e mitigação, 12. Critérios de saída da Fase 7, 13. Checklist de retomada (para o próximo agente), 14. Incertezas remanescentes, 1. Estado da 7A, 2.1 Stack recomendada, 2. Princípios de execução (+7 more)

### Community 101 - "Hangul — conceitos de interação"
Cohesion: 0.14
Nodes (13): 10. Ilustração de Hangul — regras, 11. Priorização, 12. Critérios de aceite, 1. Princípios, 2. Vocabulário visual comum, 3. Conceito 1 — Bancada de composição, 4. Conceito 2 — Anatomia da sílaba, 5. Conceito 3 — Régua de leitura e camadas de pronúncia (+5 more)

### Community 102 - "KBR — Pesquisa"
Cohesion: 0.25
Nodes (7): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa

### Community 103 - "3. Invariantes por campo"
Cohesion: 0.13
Nodes (15): 3. Invariantes por campo, I10 — Retentativas idempotentes, I11 — Offline e reconexão, I12 — Migração de convidado, I13 — Conexão entre abas, I14 — Metadados não autoritativos, I1 — Lições concluídas nunca regridem, I2 — Checkpoints concluídos nunca regridem (+7 more)

### Community 104 - "3. Tipos de domínio"
Cohesion: 0.22
Nodes (9): 3.1 Status de revisão, 3.2 Jamo, 3.3 Sílabas, 3.4 Palavras, 3.5 Regras, 3.6 Lições, 3.7 Checkpoints, 3.8 Currículo (+1 more)

### Community 105 - "KBR — Arquitetura"
Cohesion: 0.13
Nodes (15): Decisões/limites, Estrutura, Hardening e limpeza (Fase 7G), Interfaces de troca futura, KBR — Arquitetura, Landing e shell “Composição” (Fase 7C), Modelo de dados (TS), Movimento, anatomias e conclusão (Fase 7F) (+7 more)

### Community 106 - "app/layout.tsx"
Cohesion: 0.29
Nodes (5): archivo, metadata, plexMono, RootLayout(), viewport

### Community 107 - "Detalhe por opção"
Cohesion: 0.13
Nodes (14): 1. Web Speech API (estado atual), 2. MeloTTS-Korean, 3. Piper `ko_KR-kss-medium`, 4. XTTS v2 (Coqui), 5. Kokoro-82M, 6. Google Cloud Text-to-Speech, 7. Azure Speech, 8. Gravação com falante nativo (+6 more)

### Community 108 - "validate.ts"
Cohesion: 0.06
Nodes (70): Hangul, 7.1 API, 7.2 Invariantes obrigatórias, 7.3 Quando rodar, 7.4 Exemplo de issue, 7. Validação do currículo, 9. Ordem de implementação da Fase 3B, Muda (+62 more)

### Community 109 - "Áudio atual — auditoria técnica e de experiência"
Cohesion: 0.15
Nodes (12): 10. Critérios de aceite desta auditoria, 1. O que existe hoje, 2. Caminho de reprodução, 3. Onde o áudio é usado, 4. Inventário do conteúdo falado, 5. Diagnóstico de vozes no ambiente de teste, 6. Achados e severidade, 7. Causas prováveis do relato de ㄹ e vogais (+4 more)

### Community 110 - "mobile.spec.ts"
Cohesion: 0.40
Nodes (3): authenticate(), seedLessons(), sessions

### Community 111 - "Prontidão para beta controlado — Fase 8D"
Cohesion: 0.20
Nodes (9): 1. Checklist de lançamento, 2. Testes executados na 8D, 4.1 Defeitos estruturais verificados, 4.2 Questões linguísticas que exigem revisão nativa (não alteradas), 4.3 Preferências subjetivas (não são defeitos), 4. Auditoria do currículo, 5. Bloqueios de lançamento, 6. Próxima fase recomendada (+1 more)

### Community 112 - "playback.ts"
Cohesion: 0.26
Nodes (7): SpeechUtteranceLike, VoiceLike, createFakeAudio(), createPlayer(), createUtterance(), FakeSpeech, KO_KR

### Community 113 - "SpeakingPracticeArea.tsx"
Cohesion: 0.16
Nodes (16): Prática de fala nativa (Fase 8C, experimental), 3. Prática de fala — auditoria de prontidão, ITEMS, modeFor(), SpeakingPracticeArea(), install(), UNSUPPORTED, Notice() (+8 more)

### Community 114 - "performance.spec.ts"
Cohesion: 0.33
Nodes (3): authenticate(), seedHangulProgress(), seedLessons()

### Community 115 - "Geração do áudio estático — MeloTTS-Korean"
Cohesion: 0.12
Nodes (16): 1. Inventário, 2. Síntese, 3. Corte, normalização e MP3, Ambiente usado, Caveat de licença do encoder, Consumo no app, Decisão: Python oficial, não imagem Docker, Download dos modelos no commit fixado (+8 more)

### Community 116 - "diagnostics.ts"
Cohesion: 0.22
Nodes (8): CATEGORIES, CATEGORY_ORDER, DiagnosticAnswer, DiagnosticCategory, diagnosticCategoryFor(), DiagnosticCategoryId, DiagnosticSummary, summarizeDiagnostics()

### Community 117 - "inventory.ts"
Cohesion: 0.27
Nodes (13): add(), addContrastTags(), addExercise(), addRule(), addStep(), addSyllable(), addWord(), AudioInventoryItem (+5 more)

### Community 118 - "audio-manifest.test.ts"
Cohesion: 0.31
Nodes (8): AUDIO_ENTRIES, AudioAsset, audioAssetCount(), hasAudioAsset(), resolveAudioAsset(), audioKey(), normalizeAudioText(), PUBLIC_DIR

### Community 120 - "design-system.test.ts"
Cohesion: 0.20
Nodes (8): contrast(), darkPairs, globals, layout, lightPairs, luminance(), sourceFiles(), srcRoot

### Community 121 - "exercise-media.tsx"
Cohesion: 0.21
Nodes (10): AudioElementLike, AudioPlaybackState, AudioPlayerDependencies, AudioSource, isKoreanVoice(), pickKoreanVoice(), PlaybackOutcome, PlaybackUnavailableReason (+2 more)

### Community 122 - "Inventário e prioridade"
Cohesion: 0.29
Nodes (7): 8B.0 — Inventário automático, 8B.1 — Sessão de gravação, 8B.2 — Pipeline de assets, 8B.3 — Camada de reprodução, 8B.4 — QA com falante nativo, 8B.5 — Testes e documentação, Inventário e prioridade

### Community 123 - "9. Ordem de deploy"
Cohesion: 0.25
Nodes (8): 9.1 Backup e pré-requisitos, 9.2 Staging e migração aditiva, 9.3 Verificação do RPC após a migração, 9.4 Deploy do cliente, 9.5 Teste seguro em dispositivos, 9.6 Monitoramento, 9.7 Hardening futuro (4D.4+), 9. Ordem de deploy

### Community 125 - "build-inventory.mjs"
Cohesion: 0.33
Nodes (3): outputDir, outputFile, root

### Community 126 - "KBR — Prática de fala com reconhecimento nativo (Fase 8C, experimental)"
Cohesion: 0.13
Nodes (14): Arquitetura, Como virar um tipo de exercício (futuro), Compatibilidade observada (pesquisa em 12/11/2026), Decisão, Detecção (por recurso, nunca por nome de navegador), Estados do controlador, Fallback opcional, Feedback e avaliação (+6 more)

### Community 127 - "recognition.ts"
Cohesion: 0.14
Nodes (20): MicIcon(), SpeakingPractice(), SPEECH_ERROR_MESSAGES, statusText(), TranscriptFeedback(), useSpeechPractice(), FINAL_TIMEOUT_MS, LISTEN_TIMEOUT_MS (+12 more)

### Community 129 - "4. Exercícios: extensão compatível"
Cohesion: 0.33
Nodes (6): 4.1 Estado atual, 4.2 Novos tipos, 4.3 `build-syllable` estendido, 4.4 União final, 4. Exercícios: extensão compatível, ExerciseBase

### Community 131 - "Supabase e Google OAuth — configuração manual"
Cohesion: 0.29
Nodes (6): 1. Criar e preparar o projeto Supabase, 2. Configurar o Google Auth Platform, 3. Configurar URLs no Supabase, 4. Variáveis do app, 5. Deploy e verificação, Supabase e Google OAuth — configuração manual

### Community 132 - "sync-concurrency.test.ts"
Cohesion: 0.27
Nodes (7): createEmptyProgress(), progressWith(), clone(), lastWriteWinsRemote(), memoryStore(), NOW, progressAt()

### Community 133 - "10. Rollback"
Cohesion: 0.29
Nodes (7): 10.1 Cliente (Vercel), 10.2 Banco, 10.3 Dados, 10.4 Progresso local pendente, 10.5 Detectar conflitos e falhas, 10.6 Risco dos grants de DML direto, 10. Rollback

### Community 134 - "KBR — Invariantes de merge do Progress (Fase 4D.1)"
Cohesion: 0.29
Nodes (6): 1. Definições, 2. Propriedades algébricas obrigatórias, 5. Matriz de testes, 6. Limitações do `Progress` v1 que o merge não pode eliminar, 7. Compatibilidade, KBR — Invariantes de merge do Progress (Fase 4D.1)

### Community 135 - "Relatório de qualidade e integridade do áudio — Fase 8D"
Cohesion: 0.33
Nodes (5): 1. Integridade técnica (reverificada), 3. Itens de alta prioridade para inspeção linguística, 4. Evidência mecânica sobre as formas faladas (`spoken`), 5. Limites e riscos remanescentes, Relatório de qualidade e integridade do áudio — Fase 8D

### Community 136 - "4. Preflight read-only"
Cohesion: 0.33
Nodes (6): 4.1 Confirmar o alvo, 4.2 Estrutura existente, 4.3 Grants atuais (risco de cliente antigo), 4.4 Função existente, 4.5 Histórico de migrações (opcional), 4. Preflight read-only

### Community 138 - "5. Aplicar a migração"
Cohesion: 0.40
Nodes (5): 5.1 SQL Editor (recomendado para este repositório), 5.2 CLI (somente com histórico consistente), 5.3 Conexão direta (alternativa), 5.4 Aprovação explícita, 5. Aplicar a migração

### Community 139 - "6. Verificação pós-migração"
Cohesion: 0.40
Nodes (5): 6.1 Função e grants, 6.2 Dados intactos, 6.3 Smoke test de CAS em staging (transação com rollback), 6.4 Verificação do PostgREST e do cliente, 6. Verificação pós-migração

### Community 140 - "7. Deploy do cliente"
Cohesion: 0.40
Nodes (5): 7.1 Antes do push, 7.2 Variáveis de ambiente da Vercel, 7.3 Push e deploy, 7.4 Saúde em produção, 7. Deploy do cliente

### Community 141 - "8. Checklist de teste real em duas sessões/dispositivos"
Cohesion: 0.40
Nodes (5): 8.1 Preparação, 8.2 Como inspecionar sem expor dados, 8.3 Casos A–I, 8.4 Ordem prática sugerida, 8. Checklist de teste real em duas sessões/dispositivos

### Community 142 - "audio.spec.ts"
Cohesion: 0.50
Nodes (3): authenticate(), seedLesson(), sessions

### Community 143 - "localStorageStore.ts"
Cohesion: 0.80
Nodes (4): isDateString(), isProgress(), isRecord(), migrate()

### Community 144 - "13. Feedback"
Cohesion: 0.50
Nodes (4): 13.1 Estrutura, 13.2 Exemplos, 13.3 O que evitar, 13. Feedback

### Community 145 - "2. Arquitetura atual, como está no código"
Cohesion: 0.50
Nodes (4): 2.1 Persistência, 2.2 Fluxo de login e hidratação, 2.3 Escrita durante a sessão, 2. Arquitetura atual, como está no código

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Progress` connect `Progress` to `4. Defeitos confirmados`, `sync-concurrency.test.ts`, `KBR — Invariantes de merge do Progress (Fase 4D.1)`, `dashboard.ts`, `completion.ts`, `KBR — instruções para agentes (Codex, OpenCode, Claude Code)`, `localStorageStore.ts`, `courses.test.ts`, `Schema de conteúdo — módulo Hangul`, `lib/courses/index.ts`, `2. Arquitetura atual, como está no código`, `fakeSupabaseCas.ts`, `DashboardArea.tsx`, `review/index.ts`, `17. Integração com revisão espaçada`, `KBR — Plano de implementação da sincronização confiável (Fase 4D.2)`, `dashboard.test.ts`, `exercises/index.ts`, `courses.test.ts`, `HangulCourse.tsx`, `createSupabaseProgressStore`, `KBR — Runbook de deploy seguro do CAS (Fase 4D.3)`, `mergeProgress.ts`, `Roadmap de qualidade de áudio — Fase 8B`, `review.test.ts`, `mergeProgress`, `exercise-ui.tsx`, `DashboardArea.tsx`, `CheckpointPlayer.tsx`, `Plano de redesign por componente`, `storage/index.ts`, `KBR — Decisão sobre PWA offline e service worker (Fase 6B)`, `supabase-cas.test.ts`, `Direção criativa — “Composição”`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`, `Feedback do usuário — backlog (Igo)`, `Fase 7 — roadmap de implementação`, `Hangul — conceitos de interação`, `3. Invariantes por campo`, `3. Tipos de domínio`, `KBR — Arquitetura`, `validate.ts`, `Áudio atual — auditoria técnica e de experiência`, `Prontidão para beta controlado — Fase 8D`, `SpeakingPracticeArea.tsx`, `KBR — Prática de fala com reconhecimento nativo (Fase 8C, experimental)`?**
  _High betweenness centrality (0.290) - this node is a cross-community bridge._
- **Are the 73 inferred relationships involving `Progress` (e.g. with `Regras` and `Cursos e catálogo (Fase 5)`) actually correct?**
  _`Progress` has 73 INFERRED edges - model-reasoned connections that need verification._
- **Should `4. Defeitos confirmados` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `supabase-cas.test.ts` to `package.json`, `supabase/proxy.ts`, `speech.test.ts`, `sync-concurrency.test.ts`, `ui-primitives.test.ts`, `completion.ts`, `fakeSupabaseCas.ts`, `courses.test.ts`, `content/hangul/index.ts`, `dashboard.test.ts`, `site.test.ts`, `auth.test.ts`, `exercises/index.ts`, `exercise-order.test.ts`, `review.test.ts`, `hangul-experience.test.ts`, `CheckpointPlayer.tsx`, `storage/index.ts`, `validate.ts`, `playback.ts`, `SpeakingPracticeArea.tsx`, `audio-manifest.test.ts`, `design-system.test.ts`, `ref_node_fs`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `checkAnswer()` (e.g. with `Cursos e catálogo (Fase 5)` and `Lição e composição (Fase 7D)`) actually correct?**
  _`checkAnswer()` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06984126984126984 - nodes in this community are weakly interconnected._
- **Why does `Currículo de Hangul — Fase 3A` connect `Currículo de Hangul — Fase 3A` to `11. Unidade 5 — Todas as vogais`, `12. Unidade 6 — Sílabas e batchim`, `13. Unidade 7 — Ler em contexto`, `9. Unidade 3 — Consoantes básicas`, `16. Avaliação`, `4. Estrutura geral`, `10. Unidade 4 — Consoantes tensas`, `15. Matriz de cobertura`, `17. Integração com revisão espaçada`, `19. QA de conteúdo`, `2. Pesquisa, benchmark e decisão de design`, `8. Unidade 2 — Primeiras vogais`, `exercises/index.ts`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
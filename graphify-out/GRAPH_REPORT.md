# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 149 files · ~136,821 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 1117 nodes · 2296 edges · 71 communities (64 shown, 7 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e7cac491`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 13. Feedback
- package.json
- supabase/proxy.ts
- Deep UI/UX, Motion Design & Creative Development Research — KBR
- dashboard/page.tsx
- types.ts
- dashboard.ts
- compilerOptions
- Pronúncia coreana para brasileiros
- postLoginPath
- Hangul — referência pedagógica
- Currículo de Hangul — Fase 3A
- storage/index.ts
- KBR — Auditoria de privacidade e avaliação legal (Fase 2B)
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- StorageLike
- exercises/index.ts
- CheckpointPlayer.tsx
- validate.ts
- CLAUDE.md
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
- progress-sync.test.ts
- mock-supabase.mjs
- next
- 9. Unidade 3 — Consoantes básicas
- types.ts
- 16. Avaliação
- 4. Estrutura geral
- progress-lesson.test.ts
- 10. Unidade 4 — Consoantes tensas
- 15. Matriz de cobertura
- 17. Integração com revisão espaçada
- 19. QA de conteúdo
- completion.ts
- 2. Pesquisa, benchmark e decisão de design
- 8. Unidade 2 — Primeiras vogais
- content/hangul.test.ts
- AuthProvider.tsx
- site.test.ts
- auth.test.ts
- next
- DashboardArea.tsx
- vitest
- Schema de conteúdo — módulo Hangul
- scripts
- localStorageStore.ts
- privacidade/page.tsx
- 5. Respostas e correção
- lesson.ts
- route.ts
- exercise-ui.tsx
- 3. Tipos de domínio
- react
- @playwright/test
- h09.ts
- h12.ts
- h17.ts

## God Nodes (most connected - your core abstractions)
1. `Progress` - 44 edges
2. `Lesson` - 33 edges
3. `next` - 33 edges
4. `checkAnswer()` - 24 edges
5. `Currículo de Hangul — Fase 3A` - 24 edges
6. `Hangul` - 23 edges
7. `validateCurriculum()` - 22 edges
8. `useAuth()` - 21 edges
9. `Design de exercícios — módulo Hangul` - 21 edges
10. `vitest` - 21 edges

## Surprising Connections (you probably didn't know these)
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `Decisões/limites` --references--> `Progress`  [INFERRED]
  docs/architecture.md → src/lib/storage/index.ts
- `Status conta e sincronização (real)` --references--> `safeNextPath()`  [INFERRED]
  docs/roadmap.md → src/lib/auth/redirect.ts
- `Status Fase 3A (real)` --references--> `Progress`  [INFERRED]
  docs/roadmap.md → src/lib/storage/index.ts
- `6.2 Cartões SRS` --references--> `SrsState`  [INFERRED]
  docs/pedagogy/content-schema.md → src/lib/srs/index.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (71 total, 7 thin omitted)

### Community 0 - "13. Feedback"
Cohesion: 0.50
Nodes (4): 13.1 Estrutura, 13.2 Exemplos, 13.3 O que evitar, 13. Feedback

### Community 1 - "package.json"
Cohesion: 0.11
Nodes (22): dependencies, next@^16.4.6, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5 (+14 more)

### Community 2 - "supabase/proxy.ts"
Cohesion: 0.18
Nodes (10): isProtectedPath(), PROTECTED_PATHS, ROUTES, hadSessionCookie(), redirect(), redirectToLogin(), updateSupabaseSession(), config (+2 more)

### Community 3 - "Deep UI/UX, Motion Design & Creative Development Research — KBR"
Cohesion: 0.05
Nodes (36): 10. Hangul as an Interactive Visual System, 11. Advanced Animation Technologies, 12. Prototype Concepts — Research Only, 13. Art Direction Exploration, 14. Performance and Accessibility Requirements, 15. Additional Deliverables, 8. Cinematic Motion Design and Interactive Storytelling, 9. Architectural Illustration and Editorial Drawing Styles (+28 more)

### Community 4 - "dashboard/page.tsx"
Cohesion: 0.16
Nodes (15): Dashboard(), metadata, metadata, Page(), metadata, Page(), metadata, Page() (+7 more)

### Community 5 - "types.ts"
Cohesion: 0.09
Nodes (23): H01, H02, H03, H04, H05, H06, H07, H08 (+15 more)

### Community 6 - "dashboard.ts"
Cohesion: 0.06
Nodes (55): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Painel, Privacidade, Revisão (+47 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Pronúncia coreana para brasileiros"
Cohesion: 0.06
Nodes (32): 10. Romanização: por que ela engana, 11. Tabela de aproximações para a interface, 12. Limites do TTS, 13. Roteiro de gravação (para revisão humana), 14. Pontos que exigem revisão especializada, 15. Sequência de prática para brasileiros, 16. Referências, 1. Advertência inicial (+24 more)

### Community 9 - "postLoginPath"
Cohesion: 0.16
Nodes (23): Rotas e autenticação, features, first(), LandingPage(), metadata, SearchParams, steps, targetLabels (+15 more)

### Community 10 - "Hangul — referência pedagógica"
Cohesion: 0.06
Nodes (30): 10. Notas de ensino por letra, 11. Originalidade e limites, 12. Referências, 1. Como ler este documento, 2. Terminologia mínima, 3. História em poucas linhas, 4.1 Consoantes, 4.2 Vogais (+22 more)

### Community 11 - "Currículo de Hangul — Fase 3A"
Cohesion: 0.13
Nodes (14): 14. Grafo de pré-requisitos, 18. Fluxo do player de lição, 1.1 Fora de escopo, 1. Objetivo do módulo, 20. Revisão especializada pendente, 21. Riscos e mitigação, 23. Referências, 3. Princípios pedagógicos operacionais (+6 more)

### Community 12 - "storage/index.ts"
Cohesion: 0.31
Nodes (11): PROGRESS_STORAGE_KEY, progressStorageKeyForUser(), createLocalStorageStore(), activeSyncs, hasLearningData(), migrationKey(), readMarker(), syncProgressForUser() (+3 more)

### Community 13 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.04
Nodes (43): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha), 7. Riscos e limites conhecidos, 8. Checklist antes do lançamento público (+35 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.25
Nodes (7): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras, This is NOT the Next.js you know

### Community 15 - "StorageLike"
Cohesion: 0.20
Nodes (4): StorageLike, MemoryStorage, MemoryStorage, NOW

### Community 16 - "exercises/index.ts"
Cohesion: 0.05
Nodes (47): Modelo de dados (TS), Testes, 4.1 Estado atual, 4.2 Novos tipos, 4.3 `build-syllable` estendido, 4.4 União final, 4. Exercícios: extensão compatível, 22. Handoff para a Fase 3B (+39 more)

### Community 17 - "CheckpointPlayer.tsx"
Cohesion: 0.26
Nodes (18): Status Fase 4C (real), generateMetadata(), Page(), PageProps, CheckpointPlayer(), HangulCourse(), StatusBadge(), CHECKPOINTS (+10 more)

### Community 18 - "validate.ts"
Cohesion: 0.07
Nodes (66): 7.1 API, 7.2 Invariantes obrigatórias, 7.3 Quando rodar, 7.4 Exemplo de issue, 7. Validação do currículo, 9. Ordem de implementação da Fase 3B, Muda, Status Fase 3B.1 (real) (+58 more)

### Community 22 - "Design de exercícios — módulo Hangul"
Cohesion: 0.22
Nodes (8): 14. Pontuação e progressão, 15. Fluxo do player, 16. Acessibilidade, 17. Mobile, 19. Checklist de autoria, 1. Princípios, 20. Referências, Design de exercícios — módulo Hangul

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
Cohesion: 0.08
Nodes (31): Status Fase 4A (real), metadata, Page(), formatDate(), Phase, ReviewArea(), ReviewedItem, SyncNote() (+23 more)

### Community 32 - "11. Unidade 5 — Todas as vogais"
Cohesion: 0.29
Nodes (7): 11. Unidade 5 — Todas as vogais, `c2` — Checkpoint 2: inventário completo de vogais, `h11` — ㅑ ㅕ ㅛ ㅠ, `h12` — ㅐ ㅔ ㅒ ㅖ, `h13` — ㅘ ㅝ ㅟ, `h14` — ㅙ ㅞ ㅚ, `h15` — ㅢ e o inventário completo de vogais

### Community 33 - "12. Unidade 6 — Sílabas e batchim"
Cohesion: 0.29
Nodes (7): 12. Unidade 6 — Sílabas e batchim, `c3` — Checkpoint 3: sílabas e batchim, `h16` — Montar e ler sílabas C+V, `h17` — Batchim ㅇ, ㄴ, ㅁ, `h18` — Batchim oclusivo e os sete sons representativos, `h19` — Batchim ㄹ, `h20` — Os 11 batchim duplos

### Community 34 - "13. Unidade 7 — Ler em contexto"
Cohesion: 0.29
Nodes (7): 13. Unidade 7 — Ler em contexto, `c4` — Checkpoint 4: leitura integrada, `h21` — Ligação (연음), `h22` — Nasalização, `h23` — Aspiração, `h24` — Oficina de leitura, `h25` — Consolidação e domínio

### Community 36 - "mock-supabase.mjs"
Cohesion: 0.05
Nodes (35): ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, authenticate(), progress(), Seed, seedProgress(), authenticate(), C2_STEPS (+27 more)

### Community 37 - "next"
Cohesion: 0.23
Nodes (8): SiteLayout(), AuthControl(), Nav(), learnLinks, legalLinks, SiteFooter(), SiteHeader(), ThemeToggle()

### Community 38 - "9. Unidade 3 — Consoantes básicas"
Cohesion: 0.33
Nodes (6): 9. Unidade 3 — Consoantes básicas, `h04` — ㄱ e ㄴ, `h05` — ㄷ ㄹ ㅁ, `h06` — ㅂ ㅅ ㅈ, `h07` — ㅋ ㅌ ㅍ ㅊ, `h08` — ㅎ e revisão das 14 consoantes básicas

### Community 39 - "types.ts"
Cohesion: 0.18
Nodes (13): Status Fase 3B.2 (real), C1, C2, C3, C4, review, Checkpoint, CompletionRule (+5 more)

### Community 40 - "16. Avaliação"
Cohesion: 0.40
Nodes (5): 16.1 Tipos, 16.2 Regras de pontuação, 16.3 Diagnóstico de erro, 16.4 Banco de itens, 16. Avaliação

### Community 41 - "4. Estrutura geral"
Cohesion: 0.40
Nodes (5): 4.1 Carga semanal sugerida, 4.2 Contagem de jamo, 4.3 Convenções dos IDs, 4.4 Estados de conteúdo, 4. Estrutura geral

### Community 42 - "progress-lesson.test.ts"
Cohesion: 0.10
Nodes (7): Status Fase 3B.3 (real), HANGUL_CURRICULUM, CompletionReportOptions, nextCourseStepAfter(), nextLessonAfter(), NOW, NOW

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

### Community 47 - "completion.ts"
Cohesion: 0.12
Nodes (16): buildFinalAssessment(), CompletedCheckpointSummary, CompletedLessonSummary, CompletionStats, CourseCompletionReport, FinalAssessmentFeedback, CATEGORIES, CATEGORY_ORDER (+8 more)

### Community 48 - "2. Pesquisa, benchmark e decisão de design"
Cohesion: 0.67
Nodes (3): 2.1 Decisões de design (hipóteses, não fatos), 2.2 O que o currículo evita por falta de evidência, 2. Pesquisa, benchmark e decisão de design

### Community 49 - "8. Unidade 2 — Primeiras vogais"
Cohesion: 0.67
Nodes (3): 8. Unidade 2 — Primeiras vogais, `h02` — ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo, `h03` — ㅡ ㅣ e as seis vogais básicas

### Community 50 - "content/hangul.test.ts"
Cohesion: 0.11
Nodes (17): IMPLEMENTED_CHECKPOINT_IDS, CONTENT_IN_REVIEW, JAMO, IMPLEMENTED_LESSON_IDS, COURSE_OUTLINE, RULES, review, SYLLABLES (+9 more)

### Community 51 - "AuthProvider.tsx"
Cohesion: 0.18
Nodes (9): kr, metadata, RootLayout(), viewport, AuthContext, AuthContextValue, AuthProvider(), AuthStatus (+1 more)

### Community 52 - "site.test.ts"
Cohesion: 0.15
Nodes (10): appLayout, callback, footer, impressum, landing, landingAuth, landingRedirect, privacy (+2 more)

### Community 53 - "auth.test.ts"
Cohesion: 0.35
Nodes (8): AppLayout(), dynamic, metadata, GateCard(), ProtectedArea(), ProtectedView, protectedView(), loginRedirectPath()

### Community 54 - "next"
Cohesion: 0.26
Nodes (8): next, metadata, pendingItems, CourseCompletionPanel(), formatPercent(), Stat(), DiagnosticsList(), ButtonLink()

### Community 55 - "DashboardArea.tsx"
Cohesion: 0.23
Nodes (13): useAuth(), activityFormatter, ActivityList(), BOXES, DashboardArea(), dateFormatter, formatActivityDate(), formatDate() (+5 more)

### Community 56 - "vitest"
Cohesion: 0.25
Nodes (4): vitest@^4.1.12, vitest, manifest(), migration

### Community 57 - "Schema de conteúdo — módulo Hangul"
Cohesion: 0.14
Nodes (20): Risco de sincronização (documentado, não resolvido), 10. Critérios de aceite técnicos, 11. Referências, 1. O que muda e o que não muda, 2. Estrutura de arquivos recomendada, 6.1 Mapeamento de lições, 6.2 Cartões SRS, 6.3 Histórico (+12 more)

### Community 58 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, e2e, start, test, typecheck

### Community 59 - "localStorageStore.ts"
Cohesion: 0.28
Nodes (9): @supabase/supabase-js, createEmptyProgress(), isDateString(), isProgress(), isRecord(), migrate(), createSupabaseProgressStore(), Options (+1 more)

### Community 60 - "privacidade/page.tsx"
Cohesion: 0.38
Nodes (6): legalBasis, metadata, Pending(), PrivacyPage(), Section(), storageRows

### Community 61 - "5. Respostas e correção"
Cohesion: 0.33
Nodes (6): 5.1 União, 5.2 Resultado detalhado, 5.3 `check` preservado, 5.4 Normalização, 5.5 Regras por tipo, 5. Respostas e correção

### Community 62 - "lesson.ts"
Cohesion: 0.30
Nodes (11): LessonPlayer(), AnswerRecord, completeLesson(), CompletionRuleResult, CourseStepKind, evaluateLesson(), isLessonUnlocked(), lessonRequiredCorrect() (+3 more)

### Community 63 - "route.ts"
Cohesion: 0.27
Nodes (9): @supabase/ssr, GET(), redirectAndClear(), AUTH_NEXT_COOKIE, callbackDestination(), getBrowserSupabaseClient(), getSupabasePublicConfig(), SupabasePublicConfig (+1 more)

### Community 64 - "exercise-ui.tsx"
Cohesion: 0.33
Nodes (10): AnswerArea(), AnswerAreaProps, AudioControl(), BilingualText(), choiceState(), ExerciseView(), optionClass(), speakKorean() (+2 more)

### Community 65 - "3. Tipos de domínio"
Cohesion: 0.22
Nodes (9): 3.1 Status de revisão, 3.2 Jamo, 3.3 Sílabas, 3.4 Palavras, 3.5 Regras, 3.6 Lições, 3.7 Checkpoints, 3.8 Currículo (+1 more)

### Community 66 - "react"
Cohesion: 0.40
Nodes (4): react, GoogleMark(), sizes, Variant

### Community 67 - "@playwright/test"
Cohesion: 0.40
Nodes (3): protectedRoutes, @playwright/test@^1.65.0, @playwright/test

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Progress` connect `Schema de conteúdo — módulo Hangul` to `3. Tipos de domínio`, `progress-sync.test.ts`, `dashboard.ts`, `types.ts`, `progress-lesson.test.ts`, `storage/index.ts`, `17. Integração com revisão espaçada`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`, `completion.ts`, `exercises/index.ts`, `CheckpointPlayer.tsx`, `validate.ts`, `localStorageStore.ts`, `lesson.ts`, `review/index.ts`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Are the 25 inferred relationships involving `Progress` (e.g. with `Decisões/limites` and `Hangul`) actually correct?**
  _`Progress` has 25 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11462450592885376 - nodes in this community are weakly interconnected._
- **Why does `Design de exercícios — módulo Hangul` connect `Design de exercícios — módulo Hangul` to `13. Feedback`, `exercises/index.ts`, `10. Tipo 8 — `stroke-order``, `3. Tipo 1 — `recognition``, `4. Tipo 2 — `audio-to-char``, `5. Tipo 3 — `char-to-audio``, `6. Tipo 4 — `order-jamo``, `8. Tipo 6 — `minimal-pair``, `7. Tipo 5 — `build-syllable``, `9. Tipo 7 — `reading``?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `checkAnswer()` (e.g. with `Revisão` and `Testes`) actually correct?**
  _`checkAnswer()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Should `Deep UI/UX, Motion Design & Creative Development Research — KBR` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Why does `Currículo de Hangul — Fase 3A` connect `Currículo de Hangul — Fase 3A` to `11. Unidade 5 — Todas as vogais`, `12. Unidade 6 — Sílabas e batchim`, `13. Unidade 7 — Ler em contexto`, `9. Unidade 3 — Consoantes básicas`, `16. Avaliação`, `4. Estrutura geral`, `10. Unidade 4 — Consoantes tensas`, `15. Matriz de cobertura`, `17. Integração com revisão espaçada`, `19. QA de conteúdo`, `exercises/index.ts`, `2. Pesquisa, benchmark e decisão de design`, `8. Unidade 2 — Primeiras vogais`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
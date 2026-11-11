# Graph Report - kbr  (2026-11-11)

## Corpus Check
- 178 files · ~173,866 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 1455 nodes · 3059 edges · 95 communities (91 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 234 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9c4f9e7b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 4. Defeitos confirmados
- package.json
- supabase/proxy.ts
- Deep UI/UX, Motion Design & Creative Development Research — KBR
- react
- types.ts
- dashboard.ts
- compilerOptions
- Pronúncia coreana para brasileiros
- postLoginPath
- Hangul — referência pedagógica
- Currículo de Hangul — Fase 3A
- storage/index.ts
- KBR — Pesquisa
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- fakeSupabaseCas.ts
- courses.test.ts
- Schema de conteúdo — módulo Hangul
- validate.ts
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
- mergeProgress
- hangul.spec.ts
- react
- 9. Unidade 3 — Consoantes básicas
- checkpoints/index.ts
- 16. Avaliação
- 4. Estrutura geral
- lesson.ts
- 10. Unidade 4 — Consoantes tensas
- 15. Matriz de cobertura
- 17. Integração com revisão espaçada
- 19. QA de conteúdo
- KBR — Plano de implementação da sincronização confiável (Fase 4D.2)
- 2. Pesquisa, benchmark e decisão de design
- 8. Unidade 2 — Primeiras vogais
- content/hangul.test.ts
- postLoginPath
- site.test.ts
- auth.test.ts
- Progress
- KBR — Auditoria de privacidade e avaliação legal (Fase 2B)
- KBR — Invariantes de merge do Progress (Fase 4D.1)
- content/courses/index.ts
- KBR — Arquitetura
- createSupabaseProgressStore
- KBR — Runbook de deploy seguro do CAS (Fase 4D.3)
- mock-supabase.mjs
- mergeProgress.ts
- route.ts
- dashboard.spec.ts
- 3. Tipos de domínio
- CheckpointPlayer.tsx
- @playwright/test
- 5. Mudanças no cliente
- KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷
- review.spec.ts
- lesson.ts
- dashboard.test.ts
- testAuthCookie
- next
- hangul.ts
- DashboardArea.tsx
- completion.ts
- LessonPlayer.tsx
- run-concurrency.sh
- vitest
- 12. Estratégia de testes
- exercises/index.ts
- run-local-sql-tests.sh
- HangulCourse.tsx
- courses.spec.ts
- 9. Ordem de deploy
- privacidade/page.tsx
- testAuthCookie
- CourseCatalog.tsx
- 13. Feedback
- MemoryStorage
- Supabase e Google OAuth — configuração manual
- 6. Compatibilidade com `Progress`
- 2. Arquitetura atual, como está no código

## God Nodes (most connected - your core abstractions)
1. `Progress` - 70 edges
2. `next` - 34 edges
3. `Lesson` - 33 edges
4. `checkAnswer()` - 25 edges
5. `vitest` - 24 edges
6. `mergeProgress()` - 24 edges
7. `createSupabaseProgressStore()` - 24 edges
8. `Currículo de Hangul — Fase 3A` - 24 edges
9. `useAuth()` - 23 edges
10. `validateCurriculum()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `7.4 Unicode e composição` --references--> `composeSyllable()`  [INFERRED]
  docs/pedagogy/hangul.md → src/lib/hangul/index.ts
- `C11 — Histórico cresce sem limite e viaja inteiro em cada save (custo, não perda)` --references--> `recordAttempt()`  [INFERRED]
  docs/sync/concurrency-audit.md → src/lib/progress/lesson.ts
- `I2 — Checkpoints concluídos nunca regridem` --references--> `isCourseComplete()`  [INFERRED]
  docs/sync/merge-invariants.md → src/lib/progress/lesson.ts
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `6.2 Cartões SRS` --references--> `SrsState`  [INFERRED]
  docs/pedagogy/content-schema.md → src/lib/srs/index.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/srs/cards.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts -> src/lib/srs/cards.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (95 total, 4 thin omitted)

### Community 0 - "4. Defeitos confirmados"
Cohesion: 0.05
Nodes (43): 1. Método e limites, 3. Comportamento por operação, 4. Defeitos confirmados, 5. O que **não** é bug confirmado, 6.1 Duas lições em dispositivos diferentes (C1), 6.2 Revisão de cartão vencida por atividade posterior (C3), 6.3 Offline + outro dispositivo online (C1/C9), 6.4 Relógio adiantado (C4) (+35 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (33): dependencies, next@^16.4.6, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5 (+25 more)

### Community 2 - "supabase/proxy.ts"
Cohesion: 0.17
Nodes (11): isProtectedPath(), LEGACY_PROTECTED_PATHS, PROTECTED_PATHS, ROUTES, hadSessionCookie(), redirect(), redirectToLogin(), updateSupabaseSession() (+3 more)

### Community 3 - "Deep UI/UX, Motion Design & Creative Development Research — KBR"
Cohesion: 0.05
Nodes (36): 10. Hangul as an Interactive Visual System, 11. Advanced Animation Technologies, 12. Prototype Concepts — Research Only, 13. Art Direction Exploration, 14. Performance and Accessibility Requirements, 15. Additional Deliverables, 8. Cinematic Motion Design and Interactive Storytelling, 9. Architectural Illustration and Editorial Drawing Styles (+28 more)

### Community 4 - "react"
Cohesion: 0.17
Nodes (14): metadata, Page(), Dashboard(), metadata, metadata, Page(), AuthErrorPage(), metadata (+6 more)

### Community 5 - "types.ts"
Cohesion: 0.08
Nodes (30): H01, H02, H03, H04, H05, H06, H07, H08 (+22 more)

### Community 6 - "dashboard.ts"
Cohesion: 0.13
Nodes (22): accuracy(), ActivitySummary, ATTEMPT_CATEGORY_LABELS, AttemptCategory, AttemptStats, AttemptTarget, buildAttemptTargets(), CourseSummary (+14 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Pronúncia coreana para brasileiros"
Cohesion: 0.06
Nodes (32): 10. Romanização: por que ela engana, 11. Tabela de aproximações para a interface, 12. Limites do TTS, 13. Roteiro de gravação (para revisão humana), 14. Pontos que exigem revisão especializada, 15. Sequência de prática para brasileiros, 16. Referências, 1. Advertência inicial (+24 more)

### Community 9 - "postLoginPath"
Cohesion: 0.13
Nodes (17): SiteLayout(), features, first(), LandingPage(), metadata, SearchParams, steps, targetLabels (+9 more)

### Community 10 - "Hangul — referência pedagógica"
Cohesion: 0.06
Nodes (30): 10. Notas de ensino por letra, 11. Originalidade e limites, 12. Referências, 1. Como ler este documento, 2. Terminologia mínima, 3. História em poucas linhas, 4.1 Consoantes, 4.2 Vogais (+22 more)

### Community 11 - "Currículo de Hangul — Fase 3A"
Cohesion: 0.13
Nodes (14): 14. Grafo de pré-requisitos, 18. Fluxo do player de lição, 1.1 Fora de escopo, 1. Objetivo do módulo, 20. Revisão especializada pendente, 21. Riscos e mitigação, 23. Referências, 3. Princípios pedagógicos operacionais (+6 more)

### Community 12 - "storage/index.ts"
Cohesion: 0.13
Nodes (22): Status Fase 4D.2 (real), metadata, RootLayout(), viewport, AuthContext, AuthContextValue, AuthProvider(), LessonProgress (+14 more)

### Community 13 - "KBR — Pesquisa"
Cohesion: 0.15
Nodes (7): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.25
Nodes (7): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras, This is NOT the Next.js you know

### Community 15 - "fakeSupabaseCas.ts"
Cohesion: 0.13
Nodes (10): @supabase/supabase-js, clone(), errorFor(), FakeCasFailure, FakeCasRpcParams, FakeCasServer, FakeRow, RpcCall (+2 more)

### Community 16 - "courses.test.ts"
Cohesion: 0.11
Nodes (17): Modelo de dados (TS), 2. Visão geral dos nove tipos, ExerciseSpec, EXERCISE_TYPE_REGISTRY, ExerciseGrading, ExerciseSkill, ExerciseTypeDefinition, ExerciseTypeId (+9 more)

### Community 17 - "Schema de conteúdo — módulo Hangul"
Cohesion: 0.15
Nodes (12): 10. Critérios de aceite técnicos, 11. Referências, 1. O que muda e o que não muda, 2. Estrutura de arquivos recomendada, 5.1 União, 5.2 Resultado detalhado, 5.3 `check` preservado, 5.4 Normalização (+4 more)

### Community 18 - "validate.ts"
Cohesion: 0.07
Nodes (69): Hangul, 7.1 API, 7.2 Invariantes obrigatórias, 7.3 Quando rodar, 7.4 Exemplo de issue, 7. Validação do currículo, 9. Ordem de implementação da Fase 3B, Muda (+61 more)

### Community 20 - "next.config.mjs"
Cohesion: 0.33
Nodes (4): nextConfig, privateNoStore, protectedRoutes, securityHeaders

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
Cohesion: 0.15
Nodes (22): JAMO, SYLLABLES, WORDS, buildReviewExercise(), buildReviewQueueFromEntries(), HANGUL_REVIEW_CATALOG, isDate(), jamoExercise() (+14 more)

### Community 32 - "11. Unidade 5 — Todas as vogais"
Cohesion: 0.29
Nodes (7): 11. Unidade 5 — Todas as vogais, `c2` — Checkpoint 2: inventário completo de vogais, `h11` — ㅑ ㅕ ㅛ ㅠ, `h12` — ㅐ ㅔ ㅒ ㅖ, `h13` — ㅘ ㅝ ㅟ, `h14` — ㅙ ㅞ ㅚ, `h15` — ㅢ e o inventário completo de vogais

### Community 33 - "12. Unidade 6 — Sílabas e batchim"
Cohesion: 0.29
Nodes (7): 12. Unidade 6 — Sílabas e batchim, `c3` — Checkpoint 3: sílabas e batchim, `h16` — Montar e ler sílabas C+V, `h17` — Batchim ㅇ, ㄴ, ㅁ, `h18` — Batchim oclusivo e os sete sons representativos, `h19` — Batchim ㄹ, `h20` — Os 11 batchim duplos

### Community 34 - "13. Unidade 7 — Ler em contexto"
Cohesion: 0.29
Nodes (7): 13. Unidade 7 — Ler em contexto, `c4` — Checkpoint 4: leitura integrada, `h21` — Ligação (연음), `h22` — Nasalização, `h23` — Aspiração, `h24` — Oficina de leitura, `h25` — Consolidação e domínio

### Community 35 - "mergeProgress"
Cohesion: 0.18
Nodes (12): Não muda, 12.1 Puros (Vitest), 13. Escopo exato da Fase 4D.2, mergeProgress(), progressEquals(), createSyncedProgressStore(), loadInternal(), clone() (+4 more)

### Community 36 - "hangul.spec.ts"
Cohesion: 0.11
Nodes (18): accountKey(), C2_STEPS, C2Step, C3_STEPS, C3Step, C4_STEPS, C4Step, CHECKPOINT_STEPS (+10 more)

### Community 37 - "react"
Cohesion: 0.43
Nodes (4): react, AuthControl(), Nav(), ThemeToggle()

### Community 38 - "9. Unidade 3 — Consoantes básicas"
Cohesion: 0.33
Nodes (6): 9. Unidade 3 — Consoantes básicas, `h04` — ㄱ e ㄴ, `h05` — ㄷ ㄹ ㅁ, `h06` — ㅂ ㅅ ㅈ, `h07` — ㅋ ㅌ ㅍ ㅊ, `h08` — ㅎ e revisão das 14 consoantes básicas

### Community 39 - "checkpoints/index.ts"
Cohesion: 0.33
Nodes (6): C1, C2, C3, C4, IMPLEMENTED_CHECKPOINT_IDS, Checkpoint

### Community 40 - "16. Avaliação"
Cohesion: 0.40
Nodes (5): 16.1 Tipos, 16.2 Regras de pontuação, 16.3 Diagnóstico de erro, 16.4 Banco de itens, 16. Avaliação

### Community 41 - "4. Estrutura geral"
Cohesion: 0.40
Nodes (5): 4.1 Carga semanal sugerida, 4.2 Contagem de jamo, 4.3 Convenções dos IDs, 4.4 Estados de conteúdo, 4. Estrutura geral

### Community 42 - "lesson.ts"
Cohesion: 0.17
Nodes (14): LessonPlayer(), HANGUL_CURRICULUM, AnswerRecord, completeLesson(), CompletionRuleResult, evaluateLesson(), isLessonUnlocked(), lessonRequiredCorrect() (+6 more)

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
Cohesion: 0.11
Nodes (17): 10. Rollback, 11. Estados observáveis, 14. Critérios de aceite da 4D.2, 15. Commits da 4D.2, 16. Fase 4D.3 — deploy seguro do CAS e validação real, 1. Objetivo, 2. Arquitetura recomendada, 3. Comparação das alternativas (+9 more)

### Community 48 - "2. Pesquisa, benchmark e decisão de design"
Cohesion: 0.67
Nodes (3): 2.1 Decisões de design (hipóteses, não fatos), 2.2 O que o currículo evita por falta de evidência, 2. Pesquisa, benchmark e decisão de design

### Community 49 - "8. Unidade 2 — Primeiras vogais"
Cohesion: 0.67
Nodes (3): 8. Unidade 2 — Primeiras vogais, `h02` — ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo, `h03` — ㅡ ㅣ e as seis vogais básicas

### Community 50 - "content/hangul.test.ts"
Cohesion: 0.13
Nodes (16): CONTENT_IN_REVIEW, IMPLEMENTED_LESSON_IDS, COURSE_OUTLINE, review, RULES, review, Curriculum, ReviewMeta (+8 more)

### Community 51 - "postLoginPath"
Cohesion: 0.21
Nodes (17): Rotas e autenticação, Status conta e sincronização (real), Status Fase 2B (real), LandingRedirect(), AUTH_NEXT_COOKIE_MAX_AGE, clearAuthNextCookie(), cookieSuffix(), decodeNextCookie() (+9 more)

### Community 52 - "site.test.ts"
Cohesion: 0.11
Nodes (12): manifest(), migration, appLayout, callback, footer, impressum, landing, landingAuth (+4 more)

### Community 53 - "auth.test.ts"
Cohesion: 0.44
Nodes (6): GateCard(), ProtectedArea(), AuthStatus, ProtectedView, protectedView(), loginRedirectPath()

### Community 54 - "Progress"
Cohesion: 0.16
Nodes (20): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status Fase 1 (real), Status Fase 3A (real), Status Fase 3B.2 (real), Status Fase 3B.3 (real) (+12 more)

### Community 55 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.20
Nodes (10): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3.1 Cabeçalhos de segurança e cache, 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha), 7. Riscos e limites conhecidos (+2 more)

### Community 56 - "KBR — Invariantes de merge do Progress (Fase 4D.1)"
Cohesion: 0.29
Nodes (6): 1. Definições, 2. Propriedades algébricas obrigatórias, 5. Matriz de testes, 6. Limitações do `Progress` v1 que o merge não pode eliminar, 7. Compatibilidade, KBR — Invariantes de merge do Progress (Fase 4D.1)

### Community 57 - "content/courses/index.ts"
Cohesion: 0.16
Nodes (24): Cursos e catálogo (Fase 5), PLANNED_COURSES, assertCourseRegistry(), AVAILABLE_COURSES, COURSE_REGISTRY, getCourse(), getCourseBySlug(), patternMatches() (+16 more)

### Community 58 - "KBR — Arquitetura"
Cohesion: 0.20
Nodes (10): Decisões/limites, Estrutura, Interfaces de troca futura, KBR — Arquitetura, Privacidade, PWA, cabeçalhos e cache (Fase 6A), Sincronização multi-dispositivo (Fase 4D.2), Stack (+2 more)

### Community 59 - "createSupabaseProgressStore"
Cohesion: 0.17
Nodes (23): createEmptyProgress(), isDateString(), isProgress(), isRecord(), migrate(), classifyProgressSyncError(), createSupabaseProgressStore(), clearError() (+15 more)

### Community 60 - "KBR — Runbook de deploy seguro do CAS (Fase 4D.3)"
Cohesion: 0.05
Nodes (42): 10.1 Cliente (Vercel), 10.2 Banco, 10.3 Dados, 10.4 Progresso local pendente, 10.5 Detectar conflitos e falhas, 10.6 Risco dos grants de DML direto, 10. Rollback, 11. Registro dos testes executados nesta preparação (+34 more)

### Community 61 - "mock-supabase.mjs"
Cohesion: 0.18
Nodes (11): base64url(), createMockSupabaseServer(), createTestAccessToken(), createTestSession(), isProgress(), json(), readJson(), startMockSupabase() (+3 more)

### Community 62 - "mergeProgress.ts"
Cohesion: 0.27
Nodes (18): 4. Algoritmo de referência, attemptIdentity(), canonicalAttempt(), canonicalCard(), canonicalCardJson(), canonicalHistory(), canonicalProgressJson(), CARD_INTERVAL_MS (+10 more)

### Community 63 - "route.ts"
Cohesion: 0.17
Nodes (13): @supabase/ssr, AppLayout(), dynamic, kr, metadata, GET(), redirectAndClear(), AUTH_NEXT_COOKIE (+5 more)

### Community 64 - "dashboard.spec.ts"
Cohesion: 0.22
Nodes (7): ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, progress(), Seed, seedProgress(), sessions, storageKeyFor()

### Community 65 - "3. Tipos de domínio"
Cohesion: 0.22
Nodes (9): 3.1 Status de revisão, 3.2 Jamo, 3.3 Sílabas, 3.4 Palavras, 3.5 Regras, 3.6 Lições, 3.7 Checkpoints, 3.8 Currículo (+1 more)

### Community 66 - "CheckpointPlayer.tsx"
Cohesion: 0.17
Nodes (20): Status Fase 4C (real), CheckpointPlayer(), buildCourseCompletionReport(), buildFinalAssessment(), CompletedCheckpointSummary, CompletedLessonSummary, CompletionReportOptions, CompletionStats (+12 more)

### Community 67 - "@playwright/test"
Cohesion: 0.22
Nodes (4): AXE_TAGS, protectedRoutes, @playwright/test@^1.65.0, @playwright/test

### Community 68 - "5. Mudanças no cliente"
Cohesion: 0.19
Nodes (11): Revisão, Status Fase 4A (real), 5.1 `src/lib/storage/mergeProgress.ts`, 5.3 `src/lib/storage/supabaseProgressStore.ts`, 5.4 `src/lib/storage/syncedProgressStore.ts`, 5.5 `src/lib/storage/syncProgress.ts`, 5.6 `src/components/auth/AuthProvider.tsx`, 5.7 Componentes de lição/revisão/painel (+3 more)

### Community 69 - "KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷"
Cohesion: 0.20
Nodes (10): Development status, KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷, Learning approach, License, Planned learning features, Project documentation, Project philosophy, Running locally (+2 more)

### Community 70 - "review.spec.ts"
Cohesion: 0.36
Nodes (6): progress(), readProgress(), Seed, seedProgress(), sessions, storageKeyFor()

### Community 71 - "lesson.ts"
Cohesion: 0.31
Nodes (15): Painel, Status Fase 4B (real), CourseProgressSummary, summarizeCourseProgress(), buildCourseSteps(), CourseCheckpointLike, CourseLessonLike, CourseProgressLike (+7 more)

### Community 72 - "dashboard.test.ts"
Cohesion: 0.16
Nodes (10): DashboardOptions, ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, ALL_STEP_IDS, markDone(), MemoryStorage, NOW, options() (+2 more)

### Community 73 - "testAuthCookie"
Cohesion: 0.32
Nodes (4): accountKeyFor(), createDevice(), progress(), Seed

### Community 74 - "next"
Cohesion: 0.21
Nodes (8): next, metadata, pendingItems, CourseCompletionPanel(), formatPercent(), Stat(), DiagnosticsList(), ButtonLink()

### Community 75 - "hangul.ts"
Cohesion: 0.25
Nodes (8): checkpointById, completionForStep(), exerciseTypes, HANGUL_COURSE, lessonById, steps, unitByStepId, units

### Community 76 - "DashboardArea.tsx"
Cohesion: 0.18
Nodes (15): activityFormatter, ActivityList(), BOXES, DashboardArea(), dateFormatter, formatActivityDate(), formatDate(), formatPercent() (+7 more)

### Community 77 - "completion.ts"
Cohesion: 0.20
Nodes (9): CATEGORIES, CATEGORY_ORDER, DiagnosticAnswer, DiagnosticBreakdown, DiagnosticCategory, diagnosticCategoryFor(), DiagnosticCategoryId, DiagnosticSummary (+1 more)

### Community 78 - "LessonPlayer.tsx"
Cohesion: 0.16
Nodes (19): metadata, Page(), AnswerArea(), AnswerAreaProps, AudioControl(), BilingualText(), choiceState(), ExerciseView() (+11 more)

### Community 79 - "run-concurrency.sh"
Cohesion: 0.48
Nodes (5): applied_of(), assert_pair(), run_session(), seed_row(), run-concurrency.sh script

### Community 80 - "vitest"
Cohesion: 0.11
Nodes (11): vitest, PROGRESS_STORAGE_KEY, StorageLike, MemoryStorage, NOW, MemoryStorage, NOW, clone() (+3 more)

### Community 81 - "12. Estratégia de testes"
Cohesion: 0.33
Nodes (6): 12.2 Store com fake CAS, 12.3 Banco (PostgreSQL local + pgTAP), 12.4 E2E (Playwright + mock), 12.5 Manual (relatado; não reverificado nesta sessão), 12.6 Limitação de revisões concorrentes no mesmo cartão, 12. Estratégia de testes

### Community 82 - "exercises/index.ts"
Cohesion: 0.06
Nodes (44): Testes, 4.1 Estado atual, 4.2 Novos tipos, 4.3 `build-syllable` estendido, 4.4 União final, 4. Exercícios: extensão compatível, 22. Handoff para a Fase 3B, 11.1 Objetivo (+36 more)

### Community 84 - "HangulCourse.tsx"
Cohesion: 0.27
Nodes (11): generateMetadata(), Page(), PageProps, metadata, Page(), HangulCourse(), StatusBadge(), CHECKPOINTS (+3 more)

### Community 85 - "courses.spec.ts"
Cohesion: 0.24
Nodes (7): ALL_STEP_IDS, CHECKPOINT_IDS, LESSON_IDS, progress(), seedProgress(), sessions, storageKeyFor()

### Community 86 - "9. Ordem de deploy"
Cohesion: 0.25
Nodes (8): 9.1 Backup e pré-requisitos, 9.2 Staging e migração aditiva, 9.3 Verificação do RPC após a migração, 9.4 Deploy do cliente, 9.5 Teste seguro em dispositivos, 9.6 Monitoramento, 9.7 Hardening futuro (4D.4+), 9. Ordem de deploy

### Community 87 - "privacidade/page.tsx"
Cohesion: 0.38
Nodes (6): legalBasis, metadata, Pending(), PrivacyPage(), Section(), storageRows

### Community 88 - "testAuthCookie"
Cohesion: 0.27
Nodes (9): authenticate(), authenticate(), authenticate(), authenticate(), seedLessons(), sessions, createTestUser(), testAuthCookie() (+1 more)

### Community 89 - "CourseCatalog.tsx"
Cohesion: 0.46
Nodes (7): CourseCatalog(), StatusBadge(), courseStepHref(), getAvailableCourses(), getPlannedCourses(), courseLevelLabel(), isCefrLevel()

### Community 90 - "13. Feedback"
Cohesion: 0.50
Nodes (4): 13.1 Estrutura, 13.2 Exemplos, 13.3 O que evitar, 13. Feedback

### Community 92 - "Supabase e Google OAuth — configuração manual"
Cohesion: 0.29
Nodes (6): 1. Criar e preparar o projeto Supabase, 2. Configurar o Google Auth Platform, 3. Configurar URLs no Supabase, 4. Variáveis do app, 5. Deploy e verificação, Supabase e Google OAuth — configuração manual

### Community 93 - "6. Compatibilidade com `Progress`"
Cohesion: 0.33
Nodes (6): 6.1 Mapeamento de lições, 6.2 Cartões SRS, 6.3 Histórico, 6.4 `mergeProgress`, 6.5 Domínio derivado (não persistido), 6. Compatibilidade com `Progress`

### Community 94 - "2. Arquitetura atual, como está no código"
Cohesion: 0.50
Nodes (4): 2.1 Persistência, 2.2 Fluxo de login e hidratação, 2.3 Escrita durante a sessão, 2. Arquitetura atual, como está no código

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Progress` connect `Progress` to `4. Defeitos confirmados`, `dashboard.ts`, `storage/index.ts`, `fakeSupabaseCas.ts`, `courses.test.ts`, `Schema de conteúdo — módulo Hangul`, `validate.ts`, `review/index.ts`, `mergeProgress`, `lesson.ts`, `17. Integração com revisão espaçada`, `KBR — Plano de implementação da sincronização confiável (Fase 4D.2)`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`, `KBR — Invariantes de merge do Progress (Fase 4D.1)`, `content/courses/index.ts`, `KBR — Arquitetura`, `createSupabaseProgressStore`, `KBR — Runbook de deploy seguro do CAS (Fase 4D.3)`, `mergeProgress.ts`, `3. Tipos de domínio`, `CheckpointPlayer.tsx`, `5. Mudanças no cliente`, `lesson.ts`, `dashboard.test.ts`, `LessonPlayer.tsx`, `vitest`, `12. Estratégia de testes`, `exercises/index.ts`, `HangulCourse.tsx`, `CourseCatalog.tsx`, `6. Compatibilidade com `Progress``, `2. Arquitetura atual, como está no código`?**
  _High betweenness centrality (0.251) - this node is a cross-community bridge._
- **Are the 42 inferred relationships involving `Progress` (e.g. with `Cursos e catálogo (Fase 5)` and `Decisões/limites`) actually correct?**
  _`Progress` has 42 INFERRED edges - model-reasoned connections that need verification._
- **Should `4. Defeitos confirmados` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `package.json`, `CheckpointPlayer.tsx`, `supabase/proxy.ts`, `react`, `react`, `postLoginPath`, `lesson.ts`, `storage/index.ts`, `LessonPlayer.tsx`, `postLoginPath`, `HangulCourse.tsx`, `site.test.ts`, `auth.test.ts`, `privacidade/page.tsx`, `route.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Are the 11 inferred relationships involving `checkAnswer()` (e.g. with `Cursos e catálogo (Fase 5)` and `Revisão`) actually correct?**
  _`checkAnswer()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07308377896613191 - nodes in this community are weakly interconnected._
- **Why does `@playwright/test` connect `@playwright/test` to `dashboard.spec.ts`, `package.json`, `hangul.spec.ts`, `review.spec.ts`, `testAuthCookie`, `courses.spec.ts`, `testAuthCookie`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 161 files · ~157,712 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 1312 nodes · 2705 edges · 84 communities (80 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 213 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1754a59c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 4. Defeitos confirmados
- package.json
- supabase/proxy.ts
- Deep UI/UX, Motion Design & Creative Development Research — KBR
- DashboardArea.tsx
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
- fakeSupabaseCas.ts
- exercises/index.ts
- Hangul
- srs/index.ts
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
- vitest
- hangul.spec.ts
- next
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
- AuthProvider.tsx
- site.test.ts
- auth.test.ts
- Progress
- 3. Invariantes por campo
- isProgress
- Schema de conteúdo — módulo Hangul
- KBR — Arquitetura
- createSupabaseProgressStore
- privacidade/page.tsx
- mock-supabase.mjs
- mergeProgress.ts
- route.ts
- dashboard.spec.ts
- 3. Tipos de domínio
- validate.ts
- @playwright/test
- 5. Mudanças no cliente
- 11. Tipo 9 — `srs-session`
- review.spec.ts
- 6. Compatibilidade com `Progress`
- 18. Plano de testes
- testAuthCookie
- lib/hangul/index.ts
- types.ts
- mergeProgress
- supabaseProgressStore.ts
- scripts
- run-concurrency.sh
- supabase-cas.test.ts
- 12. Estratégia de testes
- 7. Validação do currículo
- run-local-sql-tests.sh

## God Nodes (most connected - your core abstractions)
1. `Progress` - 59 edges
2. `Lesson` - 33 edges
3. `next` - 33 edges
4. `createSupabaseProgressStore()` - 24 edges
5. `checkAnswer()` - 24 edges
6. `Currículo de Hangul — Fase 3A` - 24 edges
7. `mergeProgress()` - 23 edges
8. `Hangul` - 23 edges
9. `vitest` - 23 edges
10. `validateCurriculum()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `C11 — Histórico cresce sem limite e viaja inteiro em cada save (custo, não perda)` --references--> `recordAttempt()`  [INFERRED]
  docs/sync/concurrency-audit.md → src/lib/progress/lesson.ts
- `I2 — Checkpoints concluídos nunca regridem` --references--> `isCourseComplete()`  [INFERRED]
  docs/sync/merge-invariants.md → src/lib/progress/lesson.ts
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `6.2 Cartões SRS` --references--> `SrsState`  [INFERRED]
  docs/pedagogy/content-schema.md → src/lib/srs/index.ts
- `C3 — Merge de cartões usa o documento inteiro, não o cartão (crítico)` --references--> `Attempt`  [INFERRED]
  docs/sync/concurrency-audit.md → src/lib/storage/index.ts

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

## Communities (84 total, 4 thin omitted)

### Community 0 - "4. Defeitos confirmados"
Cohesion: 0.08
Nodes (25): 1. Método e limites, 3. Comportamento por operação, 4. Defeitos confirmados, 5. O que **não** é bug confirmado, 6.1 Duas lições em dispositivos diferentes (C1), 6.2 Revisão de cartão vencida por atividade posterior (C3), 6.3 Offline + outro dispositivo online (C1/C9), 6.4 Relógio adiantado (C4) (+17 more)

### Community 1 - "package.json"
Cohesion: 0.11
Nodes (23): dependencies, next@^16.4.6, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5 (+15 more)

### Community 2 - "supabase/proxy.ts"
Cohesion: 0.18
Nodes (10): isProtectedPath(), PROTECTED_PATHS, ROUTES, hadSessionCookie(), redirect(), redirectToLogin(), updateSupabaseSession(), config (+2 more)

### Community 3 - "Deep UI/UX, Motion Design & Creative Development Research — KBR"
Cohesion: 0.05
Nodes (36): 10. Hangul as an Interactive Visual System, 11. Advanced Animation Technologies, 12. Prototype Concepts — Research Only, 13. Art Direction Exploration, 14. Performance and Accessibility Requirements, 15. Additional Deliverables, 8. Cinematic Motion Design and Interactive Storytelling, 9. Architectural Illustration and Editorial Drawing Styles (+28 more)

### Community 4 - "DashboardArea.tsx"
Cohesion: 0.08
Nodes (32): Dashboard(), metadata, metadata, Page(), metadata, Page(), metadata, Page() (+24 more)

### Community 5 - "types.ts"
Cohesion: 0.09
Nodes (23): H01, H02, H03, H04, H05, H06, H07, H08 (+15 more)

### Community 6 - "dashboard.ts"
Cohesion: 0.08
Nodes (40): Painel, Status Fase 4B (real), accuracy(), ActivitySummary, ATTEMPT_CATEGORY_LABELS, AttemptCategory, AttemptStats, AttemptTarget (+32 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Pronúncia coreana para brasileiros"
Cohesion: 0.06
Nodes (32): 10. Romanização: por que ela engana, 11. Tabela de aproximações para a interface, 12. Limites do TTS, 13. Roteiro de gravação (para revisão humana), 14. Pontos que exigem revisão especializada, 15. Sequência de prática para brasileiros, 16. Referências, 1. Advertência inicial (+24 more)

### Community 9 - "postLoginPath"
Cohesion: 0.16
Nodes (22): Rotas e autenticação, features, first(), LandingPage(), metadata, SearchParams, steps, targetLabels (+14 more)

### Community 10 - "Hangul — referência pedagógica"
Cohesion: 0.06
Nodes (30): 10. Notas de ensino por letra, 11. Originalidade e limites, 12. Referências, 1. Como ler este documento, 2. Terminologia mínima, 3. História em poucas linhas, 4.1 Consoantes, 4.2 Vogais (+22 more)

### Community 11 - "Currículo de Hangul — Fase 3A"
Cohesion: 0.13
Nodes (14): 14. Grafo de pré-requisitos, 18. Fluxo do player de lição, 1.1 Fora de escopo, 1. Objetivo do módulo, 20. Revisão especializada pendente, 21. Riscos e mitigação, 23. Referências, 3. Princípios pedagógicos operacionais (+6 more)

### Community 12 - "storage/index.ts"
Cohesion: 0.12
Nodes (19): PROGRESS_STORAGE_KEY, progressStorageKeyForUser(), StorageLike, createLocalStorageStore(), ProgressSyncErrorKind, SupabaseProgressStore, SupabaseProgressStoreOptions, activeSyncs (+11 more)

### Community 13 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.05
Nodes (32): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha), 7. Riscos e limites conhecidos, 8. Checklist antes do lançamento público (+24 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.25
Nodes (7): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras, This is NOT the Next.js you know

### Community 15 - "fakeSupabaseCas.ts"
Cohesion: 0.14
Nodes (9): clone(), errorFor(), FakeCasFailure, FakeCasRpcParams, FakeCasServer, FakeRow, RpcCall, uuidFromCounter() (+1 more)

### Community 16 - "exercises/index.ts"
Cohesion: 0.10
Nodes (30): Modelo de dados (TS), Testes, 22. Handoff para a Fase 3B, 12.1 União de respostas, 12.2 Resultado, 12.3 `checkAnswer`, 12.4 Compatibilidade com `check`, 12.5 Invariantes (+22 more)

### Community 17 - "Hangul"
Cohesion: 0.16
Nodes (19): Hangul, 4.4 União final, Status Fase 3B.5 (real), JamoRecord, ExerciseBase, SyllableParts, applyAspiration(), applyLiaison() (+11 more)

### Community 18 - "srs/index.ts"
Cohesion: 0.17
Nodes (19): 2.4 Leitner e histórico, 5.2 `src/lib/srs/index.ts`, `leitner.ts`, `cards.ts`, `review/index.ts`, isInitial(), isMedial(), jamoCardKey(), parseSrsCardKey(), ruleCardKey(), scheduleMissedReview() (+11 more)

### Community 22 - "Design de exercícios — módulo Hangul"
Cohesion: 0.15
Nodes (12): 13.1 Estrutura, 13.2 Exemplos, 13.3 O que evitar, 13. Feedback, 14. Pontuação e progressão, 15. Fluxo do player, 16. Acessibilidade, 17. Mobile (+4 more)

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
Nodes (37): Revisão, Status Fase 4A (real), C4 — Relógio do cliente decide o vencedor (alto), C5 — Revisões concorrentes do mesmo cartão não são compostas (alto), I6 — Cartões: vence a revisão mais nova, por cartão, formatDate(), Phase, ReviewArea() (+29 more)

### Community 32 - "11. Unidade 5 — Todas as vogais"
Cohesion: 0.29
Nodes (7): 11. Unidade 5 — Todas as vogais, `c2` — Checkpoint 2: inventário completo de vogais, `h11` — ㅑ ㅕ ㅛ ㅠ, `h12` — ㅐ ㅔ ㅒ ㅖ, `h13` — ㅘ ㅝ ㅟ, `h14` — ㅙ ㅞ ㅚ, `h15` — ㅢ e o inventário completo de vogais

### Community 33 - "12. Unidade 6 — Sílabas e batchim"
Cohesion: 0.29
Nodes (7): 12. Unidade 6 — Sílabas e batchim, `c3` — Checkpoint 3: sílabas e batchim, `h16` — Montar e ler sílabas C+V, `h17` — Batchim ㅇ, ㄴ, ㅁ, `h18` — Batchim oclusivo e os sete sons representativos, `h19` — Batchim ㄹ, `h20` — Os 11 batchim duplos

### Community 34 - "13. Unidade 7 — Ler em contexto"
Cohesion: 0.29
Nodes (7): 13. Unidade 7 — Ler em contexto, `c4` — Checkpoint 4: leitura integrada, `h21` — Ligação (연음), `h22` — Nasalização, `h23` — Aspiração, `h24` — Oficina de leitura, `h25` — Consolidação e domínio

### Community 35 - "vitest"
Cohesion: 0.21
Nodes (6): vitest, manifest(), clone(), lastWriteWinsRemote(), memoryStore(), NOW

### Community 36 - "hangul.spec.ts"
Cohesion: 0.11
Nodes (18): accountKey(), C2_STEPS, C2Step, C3_STEPS, C3Step, C4_STEPS, C4Step, CHECKPOINT_STEPS (+10 more)

### Community 37 - "next"
Cohesion: 0.15
Nodes (15): react, SiteLayout(), AuthControl(), useAuth(), Nav(), GoogleMark(), LandingAuth(), signIn() (+7 more)

### Community 38 - "9. Unidade 3 — Consoantes básicas"
Cohesion: 0.33
Nodes (6): 9. Unidade 3 — Consoantes básicas, `h04` — ㄱ e ㄴ, `h05` — ㄷ ㄹ ㅁ, `h06` — ㅂ ㅅ ㅈ, `h07` — ㅋ ㅌ ㅍ ㅊ, `h08` — ㅎ e revisão das 14 consoantes básicas

### Community 39 - "checkpoints/index.ts"
Cohesion: 0.38
Nodes (5): C1, C2, C3, C4, Checkpoint

### Community 40 - "16. Avaliação"
Cohesion: 0.40
Nodes (5): 16.1 Tipos, 16.2 Regras de pontuação, 16.3 Diagnóstico de erro, 16.4 Banco de itens, 16. Avaliação

### Community 41 - "4. Estrutura geral"
Cohesion: 0.40
Nodes (5): 4.1 Carga semanal sugerida, 4.2 Contagem de jamo, 4.3 Convenções dos IDs, 4.4 Estados de conteúdo, 4. Estrutura geral

### Community 42 - "lesson.ts"
Cohesion: 0.05
Nodes (66): Status Fase 4C (real), next, generateMetadata(), Page(), PageProps, metadata, pendingItems, CheckpointPlayer() (+58 more)

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
Nodes (25): 10. Rollback, 11. Estados observáveis, 13. Escopo exato da Fase 4D.2, 14. Critérios de aceite da 4D.2, 15. Commits da 4D.2, 1. Objetivo, 2. Arquitetura recomendada, 3. Comparação das alternativas (+17 more)

### Community 48 - "2. Pesquisa, benchmark e decisão de design"
Cohesion: 0.67
Nodes (3): 2.1 Decisões de design (hipóteses, não fatos), 2.2 O que o currículo evita por falta de evidência, 2. Pesquisa, benchmark e decisão de design

### Community 49 - "8. Unidade 2 — Primeiras vogais"
Cohesion: 0.67
Nodes (3): 8. Unidade 2 — Primeiras vogais, `h02` — ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo, `h03` — ㅡ ㅣ e as seis vogais básicas

### Community 50 - "content/hangul.test.ts"
Cohesion: 0.09
Nodes (20): IMPLEMENTED_CHECKPOINT_IDS, CONTENT_IN_REVIEW, JAMO, IMPLEMENTED_LESSON_IDS, COURSE_OUTLINE, review, RULES, review (+12 more)

### Community 51 - "AuthProvider.tsx"
Cohesion: 0.18
Nodes (12): @supabase/supabase-js, kr, metadata, RootLayout(), viewport, AuthContext, AuthContextValue, AuthProvider() (+4 more)

### Community 52 - "site.test.ts"
Cohesion: 0.12
Nodes (11): migration, appLayout, callback, footer, impressum, landing, landingAuth, landingRedirect (+3 more)

### Community 53 - "auth.test.ts"
Cohesion: 0.31
Nodes (9): AppLayout(), dynamic, metadata, GateCard(), ProtectedArea(), AuthStatus, ProtectedView, protectedView() (+1 more)

### Community 54 - "Progress"
Cohesion: 0.14
Nodes (19): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status conta e sincronização (real), Status Fase 1 (real), Status Fase 2B (real), Status Fase 3A (real) (+11 more)

### Community 55 - "3. Invariantes por campo"
Cohesion: 0.17
Nodes (12): 3. Invariantes por campo, I10 — Retentativas idempotentes, I11 — Offline e reconexão, I12 — Migração de convidado, I13 — Conexão entre abas, I14 — Metadados não autoritativos, I1 — Lições concluídas nunca regridem, I2 — Checkpoints concluídos nunca regridem (+4 more)

### Community 56 - "isProgress"
Cohesion: 0.18
Nodes (13): 1. Definições, 2. Propriedades algébricas obrigatórias, 4. Algoritmo de referência, 5. Matriz de testes, 6. Limitações do `Progress` v1 que o merge não pode eliminar, 7. Compatibilidade, I3 — Maior score é preservado, mas só para lições/checkpoints, I4 — Histórico é união sem perda, com identidade estável (+5 more)

### Community 57 - "Schema de conteúdo — módulo Hangul"
Cohesion: 0.12
Nodes (15): 10. Critérios de aceite técnicos, 11. Referências, 2. Estrutura de arquivos recomendada, 4.1 Estado atual, 4.2 Novos tipos, 4.3 `build-syllable` estendido, 4. Exercícios: extensão compatível, 5.1 União (+7 more)

### Community 58 - "KBR — Arquitetura"
Cohesion: 0.22
Nodes (9): Decisões/limites, Estrutura, Interfaces de troca futura, KBR — Arquitetura, Privacidade, Sincronização multi-dispositivo (Fase 4D.2), Stack, UI/UX (+1 more)

### Community 59 - "createSupabaseProgressStore"
Cohesion: 0.24
Nodes (13): Status Fase 4D.2 (real), createEmptyProgress(), createSupabaseProgressStore(), clearError(), delayFor(), ensureLoaded(), loadInternal(), notifyMerged() (+5 more)

### Community 60 - "privacidade/page.tsx"
Cohesion: 0.38
Nodes (6): legalBasis, metadata, Pending(), PrivacyPage(), Section(), storageRows

### Community 61 - "mock-supabase.mjs"
Cohesion: 0.18
Nodes (11): base64url(), createMockSupabaseServer(), createTestAccessToken(), createTestSession(), isProgress(), json(), readJson(), startMockSupabase() (+3 more)

### Community 62 - "mergeProgress.ts"
Cohesion: 0.29
Nodes (17): attemptIdentity(), canonicalAttempt(), canonicalCard(), canonicalCardJson(), canonicalHistory(), canonicalProgressJson(), CARD_INTERVAL_MS, cardStamp() (+9 more)

### Community 63 - "route.ts"
Cohesion: 0.48
Nodes (5): @supabase/ssr, GET(), redirectAndClear(), callbackDestination(), createServerSupabaseClient()

### Community 64 - "dashboard.spec.ts"
Cohesion: 0.22
Nodes (7): ALL_CHECKPOINT_IDS, ALL_LESSON_IDS, progress(), Seed, seedProgress(), sessions, storageKeyFor()

### Community 65 - "3. Tipos de domínio"
Cohesion: 0.22
Nodes (9): 3.1 Status de revisão, 3.2 Jamo, 3.3 Sílabas, 3.4 Palavras, 3.5 Regras, 3.6 Lições, 3.7 Checkpoints, 3.8 Currículo (+1 more)

### Community 66 - "validate.ts"
Cohesion: 0.33
Nodes (16): 7.1 API, assertCurriculum(), checkExercise(), checkJamoRecord(), checkNfc(), checkReview(), checkSyllable(), checkTaughtText() (+8 more)

### Community 67 - "@playwright/test"
Cohesion: 0.40
Nodes (3): protectedRoutes, @playwright/test@^1.65.0, @playwright/test

### Community 68 - "5. Mudanças no cliente"
Cohesion: 0.24
Nodes (8): 5.1 `src/lib/storage/mergeProgress.ts`, 5.3 `src/lib/storage/supabaseProgressStore.ts`, 5.4 `src/lib/storage/syncedProgressStore.ts`, 5.5 `src/lib/storage/syncProgress.ts`, 5.6 `src/components/auth/AuthProvider.tsx`, 5.7 Componentes de lição/revisão/painel, 5. Mudanças no cliente, ProgressStore

### Community 69 - "11. Tipo 9 — `srs-session`"
Cohesion: 0.29
Nodes (7): 11.1 Objetivo, 11.2 Especificação, 11.3 Seleção, 11.4 Validação e nota, 11.5 Feedback, 11.6 Acessibilidade, 11. Tipo 9 — `srs-session`

### Community 70 - "review.spec.ts"
Cohesion: 0.36
Nodes (6): progress(), readProgress(), Seed, seedProgress(), sessions, storageKeyFor()

### Community 71 - "6. Compatibilidade com `Progress`"
Cohesion: 0.22
Nodes (9): 1. O que muda e o que não muda, 6.1 Mapeamento de lições, 6.2 Cartões SRS, 6.3 Histórico, 6.4 `mergeProgress`, 6.5 Domínio derivado (não persistido), 6. Compatibilidade com `Progress`, Não muda (+1 more)

### Community 72 - "18. Plano de testes"
Cohesion: 0.40
Nodes (5): 18.1 Unitários por tipo, 18.2 Conteúdo, 18.3 E2E, 18.4 Fixtures, 18. Plano de testes

### Community 73 - "testAuthCookie"
Cohesion: 0.23
Nodes (9): authenticate(), authenticate(), createTestUser(), testAuthCookie(), authenticate(), accountKeyFor(), createDevice(), progress() (+1 more)

### Community 74 - "lib/hangul/index.ts"
Cohesion: 0.23
Nodes (14): 9. Ordem de implementação da Fase 3B, Muda, Status Fase 3B.1 (real), decomposeSyllable(), Final, FINALS, Initial, INITIALS (+6 more)

### Community 75 - "types.ts"
Cohesion: 0.18
Nodes (7): H09, H15, H21, ContentStatus, ExampleRef, LessonOutline, LessonPanel

### Community 76 - "mergeProgress"
Cohesion: 0.36
Nodes (6): 12.1 Puros (Vitest), mergeProgress(), progressEquals(), createSyncedProgressStore(), loadInternal(), SyncStatusChange

### Community 77 - "supabaseProgressStore.ts"
Cohesion: 0.44
Nodes (8): classifyProgressSyncError(), DEFAULT_RETRY_DELAYS, errorCode(), errorMessage(), errorStatus(), isRecord(), parseRpcRow(), RpcRow

### Community 78 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, e2e, start, test, typecheck

### Community 79 - "run-concurrency.sh"
Cohesion: 0.48
Nodes (5): applied_of(), assert_pair(), run_session(), seed_row(), run-concurrency.sh script

### Community 80 - "supabase-cas.test.ts"
Cohesion: 0.33
Nodes (4): clone(), MemoryStorage, memoryStore(), NOW

### Community 81 - "12. Estratégia de testes"
Cohesion: 0.33
Nodes (6): 12.2 Store com fake CAS, 12.3 Banco (PostgreSQL local + pgTAP), 12.4 E2E (Playwright + mock), 12.5 Manual (pendente), 12.6 Limitação de revisões concorrentes no mesmo cartão, 12. Estratégia de testes

### Community 82 - "7. Validação do currículo"
Cohesion: 0.50
Nodes (4): 7.2 Invariantes obrigatórias, 7.3 Quando rodar, 7.4 Exemplo de issue, 7. Validação do currículo

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Progress` connect `Progress` to `dashboard.ts`, `storage/index.ts`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`, `fakeSupabaseCas.ts`, `exercises/index.ts`, `Hangul`, `srs/index.ts`, `review/index.ts`, `vitest`, `lesson.ts`, `17. Integração com revisão espaçada`, `KBR — Plano de implementação da sincronização confiável (Fase 4D.2)`, `3. Invariantes por campo`, `isProgress`, `Schema de conteúdo — módulo Hangul`, `KBR — Arquitetura`, `mergeProgress.ts`, `3. Tipos de domínio`, `6. Compatibilidade com `Progress``, `lib/hangul/index.ts`, `mergeProgress`, `supabaseProgressStore.ts`, `supabase-cas.test.ts`, `12. Estratégia de testes`?**
  _High betweenness centrality (0.228) - this node is a cross-community bridge._
- **Are the 34 inferred relationships involving `Progress` (e.g. with `Decisões/limites` and `Hangul`) actually correct?**
  _`Progress` has 34 INFERRED edges - model-reasoned connections that need verification._
- **Should `4. Defeitos confirmados` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `package.json`, `supabase/proxy.ts`, `dashboard.ts`, `lesson.ts`, `lib/hangul/index.ts`, `storage/index.ts`, `exercises/index.ts`, `Hangul`, `content/hangul.test.ts`, `srs/index.ts`, `site.test.ts`, `auth.test.ts`, `supabase-cas.test.ts`, `createSupabaseProgressStore`, `review/index.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `createSupabaseProgressStore()` (e.g. with `Não muda` and `Status Fase 4D.2 (real)`) actually correct?**
  _`createSupabaseProgressStore()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10869565217391304 - nodes in this community are weakly interconnected._
- **Why does `Design de exercícios — módulo Hangul` connect `Design de exercícios — módulo Hangul` to `11. Tipo 9 — `srs-session``, `18. Plano de testes`, `exercises/index.ts`, `10. Tipo 8 — `stroke-order``, `3. Tipo 1 — `recognition``, `4. Tipo 2 — `audio-to-char``, `5. Tipo 3 — `char-to-audio``, `6. Tipo 4 — `order-jamo``, `8. Tipo 6 — `minimal-pair``, `7. Tipo 5 — `build-syllable``, `9. Tipo 7 — `reading``?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
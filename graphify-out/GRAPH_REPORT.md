# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 78 files · ~23,690 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 429 nodes · 759 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0bf3b597`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Nav.tsx
- package.json
- vitest
- supabase/proxy.ts
- dashboard/page.tsx
- Deep UI/UX, Motion Design & Creative Development Research — KBR
- privacidade/page.tsx
- compilerOptions
- AuthProvider.tsx
- exercises/index.ts
- KBR — Auditoria de privacidade e avaliação legal (Fase 2B)
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- storage/index.ts
- vitest
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `next` - 26 edges
2. `postLoginPath()` - 17 edges
3. `compilerOptions` - 16 edges
4. `vitest` - 15 edges
5. `PageHeader()` - 13 edges
6. `KBR — Arquitetura` - 12 edges
7. `Deep UI/UX, Motion Design & Creative Development Research — KBR` - 12 edges
8. `useAuth()` - 11 edges
9. `ProgressStore` - 10 edges
10. `syncProgressForUser()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `2. Inventário de `localStorage`` --references--> `Progress`  [INFERRED]
  docs/privacy-audit.md → src/lib/storage/index.ts
- `Status conta e sincronização (real)` --references--> `safeNextPath()`  [INFERRED]
  docs/roadmap.md → src/lib/auth/redirect.ts
- `Status Fase 2B (real)` --references--> `ProgressStore`  [INFERRED]
  docs/roadmap.md → src/lib/storage/index.ts
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `Rotas e autenticação` --references--> `isProtectedPath()`  [INFERRED]
  docs/architecture.md → src/lib/routes.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (17 total, 3 thin omitted)

### Community 0 - "Nav.tsx"
Cohesion: 0.24
Nodes (8): SiteLayout(), AuthControl(), Nav(), learnLinks, legalLinks, SiteFooter(), SiteHeader(), ThemeToggle()

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (32): protectedRoutes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0 (+24 more)

### Community 2 - "vitest"
Cohesion: 0.10
Nodes (14): vitest@^4.1.12, vitest, manifest(), migration, appLayout, callback, footer, impressum (+6 more)

### Community 3 - "supabase/proxy.ts"
Cohesion: 0.11
Nodes (18): @supabase/ssr, GET(), redirectAndClear(), AUTH_NEXT_COOKIE, isProtectedPath(), PROTECTED_PATHS, ROUTES, getBrowserSupabaseClient() (+10 more)

### Community 4 - "dashboard/page.tsx"
Cohesion: 0.13
Nodes (21): next, Dashboard(), metadata, stats, metadata, Page(), metadata, Page() (+13 more)

### Community 5 - "Deep UI/UX, Motion Design & Creative Development Research — KBR"
Cohesion: 0.05
Nodes (36): 10. Hangul as an Interactive Visual System, 11. Advanced Animation Technologies, 12. Prototype Concepts — Research Only, 13. Art Direction Exploration, 14. Performance and Accessibility Requirements, 15. Additional Deliverables, 8. Cinematic Motion Design and Interactive Storytelling, 9. Architectural Illustration and Editorial Drawing Styles (+28 more)

### Community 6 - "privacidade/page.tsx"
Cohesion: 0.38
Nodes (6): legalBasis, metadata, Pending(), PrivacyPage(), Section(), storageRows

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "AuthProvider.tsx"
Cohesion: 0.07
Nodes (46): react, AppLayout(), dynamic, metadata, kr, metadata, RootLayout(), viewport (+38 more)

### Community 12 - "exercises/index.ts"
Cohesion: 0.11
Nodes (23): Modelo de dados (TS), BuildSyllableExercise, check(), CheckResult, ClozeExercise, ExerciseBase, ExerciseSpec, ListenExercise (+15 more)

### Community 13 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.04
Nodes (40): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha), 7. Riscos e limites conhecidos, 8. Checklist antes do lançamento público (+32 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.25
Nodes (7): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras, This is NOT the Next.js you know

### Community 15 - "storage/index.ts"
Cohesion: 0.07
Nodes (34): Rotas e autenticação, @supabase/supabase-js, Attempt, LessonProgress, Progress, PROGRESS_STORAGE_KEY, progressStorageKeyForUser(), ProgressStore (+26 more)

### Community 16 - "vitest"
Cohesion: 0.11
Nodes (17): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Privacidade, Stack, Testes (+9 more)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `package.json`, `supabase/proxy.ts`, `AuthProvider.tsx`, `exercises/index.ts`, `storage/index.ts`, `vitest`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07058823529411765 - nodes in this community are weakly interconnected._
- **Why does `next` connect `dashboard/page.tsx` to `Nav.tsx`, `package.json`, `vitest`, `supabase/proxy.ts`, `privacidade/page.tsx`, `AuthProvider.tsx`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.09956709956709957 - nodes in this community are weakly interconnected._
- **Why does `KBR — Arquitetura` connect `vitest` to `exercises/index.ts`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`, `storage/index.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `supabase/proxy.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._
- **Should `dashboard/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1319073083778966 - nodes in this community are weakly interconnected._
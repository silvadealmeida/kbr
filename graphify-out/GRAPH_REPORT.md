# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 74 files · ~19,428 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 367 nodes · 649 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30f6f875`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- safeNextPath
- package.json
- vitest
- privacidade/page.tsx
- dashboard/page.tsx
- compilerOptions
- AuthProvider.tsx
- exercises/index.ts
- KBR — Auditoria de privacidade e avaliação legal (Fase 2B)
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- storage/index.ts
- vitest
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `next` - 24 edges
2. `compilerOptions` - 16 edges
3. `safeNextPath()` - 15 edges
4. `vitest` - 14 edges
5. `PageHeader()` - 13 edges
6. `KBR — Arquitetura` - 12 edges
7. `ProgressStore` - 10 edges
8. `syncProgressForUser()` - 10 edges
9. `EmptyState()` - 10 edges
10. `useAuth()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `2. Inventário de `localStorage`` --references--> `Progress`  [INFERRED]
  docs/privacy-audit.md → src/lib/storage/index.ts
- `Rotas e autenticação` --references--> `safeNextPath()`  [INFERRED]
  docs/architecture.md → src/lib/auth/redirect.ts
- `Status conta e sincronização (real)` --references--> `safeNextPath()`  [INFERRED]
  docs/roadmap.md → src/lib/auth/redirect.ts
- `Rotas e autenticação` --references--> `isProtectedPath()`  [INFERRED]
  docs/architecture.md → src/lib/routes.ts
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (15 total, 3 thin omitted)

### Community 0 - "safeNextPath"
Cohesion: 0.08
Nodes (30): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status conta e sincronização (real), Status Fase 1 (real), Status Fase 2B (real), Status PWA mínima (real) (+22 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (33): protectedRoutes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, tailwindcss@^4.3.5 (+25 more)

### Community 2 - "vitest"
Cohesion: 0.08
Nodes (20): vitest@^4.1.12, vitest, manifest(), isProtectedPath(), PROTECTED_PATHS, ROUTES, hadSessionCookie(), redirectToLogin() (+12 more)

### Community 3 - "privacidade/page.tsx"
Cohesion: 0.38
Nodes (6): legalBasis, metadata, Pending(), PrivacyPage(), Section(), storageRows

### Community 4 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (19): Dashboard(), metadata, stats, metadata, Page(), metadata, Page(), metadata (+11 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "AuthProvider.tsx"
Cohesion: 0.09
Nodes (27): next, AppLayout(), dynamic, metadata, GET(), kr, metadata, RootLayout() (+19 more)

### Community 12 - "exercises/index.ts"
Cohesion: 0.11
Nodes (23): Modelo de dados (TS), BuildSyllableExercise, check(), CheckResult, ClozeExercise, ExerciseBase, ExerciseSpec, ListenExercise (+15 more)

### Community 13 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.05
Nodes (32): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha), 7. Riscos e limites conhecidos, 8. Checklist antes do lançamento público (+24 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.29
Nodes (6): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras

### Community 15 - "storage/index.ts"
Cohesion: 0.07
Nodes (35): Rotas e autenticação, @supabase/supabase-js@2.109.0, @supabase/supabase-js, Attempt, LessonProgress, Progress, PROGRESS_STORAGE_KEY, progressStorageKeyForUser() (+27 more)

### Community 16 - "vitest"
Cohesion: 0.11
Nodes (17): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Privacidade, Stack, Testes (+9 more)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `package.json`, `AuthProvider.tsx`, `exercises/index.ts`, `storage/index.ts`, `vitest`?**
  _High betweenness centrality (0.239) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `safeNextPath()` (e.g. with `Rotas e autenticação` and `Status conta e sincronização (real)`) actually correct?**
  _`safeNextPath()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `safeNextPath` be split into smaller, more focused modules?**
  _Cohesion score 0.08205128205128205 - nodes in this community are weakly interconnected._
- **Why does `next` connect `AuthProvider.tsx` to `safeNextPath`, `package.json`, `vitest`, `privacidade/page.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.228) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `KBR — Arquitetura` connect `vitest` to `exercises/index.ts`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`, `storage/index.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.0846774193548387 - nodes in this community are weakly interconnected._
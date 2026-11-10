# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 60 files · ~11,069 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 285 nodes · 478 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ddc37b69`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- package.json
- vitest
- KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷
- app/page.tsx
- scripts
- compilerOptions
- layout.tsx
- exercises/index.ts
- KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- storage/index.ts
- vitest
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `next` - 16 edges
2. `compilerOptions` - 16 edges
3. `PageHeader()` - 13 edges
4. `vitest` - 13 edges
5. `syncProgressForUser()` - 10 edges
6. `KBR — Arquitetura` - 10 edges
7. `EmptyState()` - 10 edges
8. `KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷` - 9 edges
9. `ProgressStore` - 8 edges
10. `getSupabasePublicConfig()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Status conta e sincronização (real)` --references--> `safeNextPath()`  [INFERRED]
  docs/roadmap.md → src/lib/auth/redirect.ts
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `Modelo de dados (TS)` --references--> `ExerciseSpec`  [INFERRED]
  docs/architecture.md → src/lib/exercises/index.ts
- `MemoryStorage` --implements--> `StorageLike`  [EXTRACTED]
  tests/progress-sync.test.ts → src/lib/storage/index.ts
- `MemoryStorage` --implements--> `StorageLike`  [EXTRACTED]
  tests/storage.test.ts → src/lib/storage/index.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (16 total, 3 thin omitted)

### Community 0 - "next"
Cohesion: 0.22
Nodes (10): config, proxy(), @supabase/ssr, GET(), safeNextPath(), getBrowserSupabaseClient(), getSupabasePublicConfig(), SupabasePublicConfig (+2 more)

### Community 1 - "package.json"
Cohesion: 0.09
Nodes (26): routes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0 (+18 more)

### Community 2 - "vitest"
Cohesion: 0.25
Nodes (4): vitest@^4.1.12, vitest, manifest(), migration

### Community 3 - "KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷"
Cohesion: 0.20
Nodes (10): Development status, KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷, Learning approach, License, Planned learning features, Project documentation, Project philosophy, Running locally (+2 more)

### Community 4 - "app/page.tsx"
Cohesion: 0.20
Nodes (16): next, AuthErrorPage(), metadata, Page(), metadata, Page(), Dashboard(), stats (+8 more)

### Community 5 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, e2e, start, test, typecheck

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "layout.tsx"
Cohesion: 0.12
Nodes (13): kr, metadata, RootLayout(), viewport, AuthControl(), AuthContext, AuthContextValue, AuthProvider() (+5 more)

### Community 12 - "exercises/index.ts"
Cohesion: 0.11
Nodes (23): Modelo de dados (TS), BuildSyllableExercise, check(), CheckResult, ClozeExercise, ExerciseBase, ExerciseSpec, ListenExercise (+15 more)

### Community 13 - "KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷"
Cohesion: 0.08
Nodes (20): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa, Estado atual (atualize a cada commit — é o ponto de retomada entre agentes) (+12 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.29
Nodes (6): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras

### Community 15 - "storage/index.ts"
Cohesion: 0.08
Nodes (33): @supabase/supabase-js, Attempt, LessonProgress, Progress, PROGRESS_STORAGE_KEY, progressStorageKeyForUser(), ProgressStore, StorageLike (+25 more)

### Community 16 - "vitest"
Cohesion: 0.12
Nodes (16): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Stack, Testes, UI/UX (+8 more)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `next`, `package.json`, `layout.tsx`, `exercises/index.ts`, `storage/index.ts`, `vitest`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09113300492610837 - nodes in this community are weakly interconnected._
- **Why does `next` connect `app/page.tsx` to `next`, `package.json`, `vitest`, `layout.tsx`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `KBR — Arquitetura` connect `vitest` to `exercises/index.ts`, `KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Should `exercises/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
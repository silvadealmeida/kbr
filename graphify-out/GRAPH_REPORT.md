# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 49 files · ~7,160 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 227 nodes · 359 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d7041a4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- package.json
- KBR — Arquitetura
- vitest
- app/page.tsx
- compilerOptions
- layout.tsx
- scripts
- exercises/index.ts
- KBR — Pesquisa
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- storage/index.ts
- vitest
- KBR — Roadmap
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `next` - 16 edges
2. `compilerOptions` - 16 edges
3. `PageHeader()` - 13 edges
4. `vitest` - 10 edges
5. `EmptyState()` - 10 edges
6. `KBR — Arquitetura` - 10 edges
7. `getSupabasePublicConfig()` - 8 edges
8. `scripts` - 7 edges
9. `Card()` - 7 edges
10. `KBR — Pesquisa` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `Estado atual (atualize a cada commit — é o ponto de retomada entre agentes)` --references--> `ProgressStore`  [INFERRED]
  docs/roadmap.md → src/lib/storage/index.ts
- `Modelo de dados (TS)` --references--> `ExerciseSpec`  [INFERRED]
  docs/architecture.md → src/lib/exercises/index.ts
- `proxy()` --calls--> `updateSupabaseSession()`  [EXTRACTED]
  proxy.ts → src/lib/supabase/proxy.ts
- `MemoryStorage` --implements--> `StorageLike`  [EXTRACTED]
  tests/storage.test.ts → src/lib/storage/index.ts

## Import Cycles
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`

## Communities (17 total, 3 thin omitted)

### Community 0 - "next"
Cohesion: 0.22
Nodes (11): config, proxy(), next, @supabase/ssr, GET(), safeNextPath(), getBrowserSupabaseClient(), getSupabasePublicConfig() (+3 more)

### Community 1 - "package.json"
Cohesion: 0.09
Nodes (27): routes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, @supabase/ssr@0.12.0, @supabase/supabase-js@2.109.0 (+19 more)

### Community 2 - "KBR — Arquitetura"
Cohesion: 0.20
Nodes (9): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Stack, Testes, UI/UX (+1 more)

### Community 3 - "vitest"
Cohesion: 0.40
Nodes (3): vitest@^4.1.12, vitest, manifest()

### Community 4 - "app/page.tsx"
Cohesion: 0.19
Nodes (15): AuthErrorPage(), metadata, Page(), metadata, Page(), Dashboard(), stats, metadata (+7 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "layout.tsx"
Cohesion: 0.15
Nodes (13): kr, metadata, RootLayout(), viewport, AuthControl(), AuthContext, AuthContextValue, AuthProvider() (+5 more)

### Community 10 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, e2e, start, test, typecheck

### Community 12 - "exercises/index.ts"
Cohesion: 0.11
Nodes (23): Modelo de dados (TS), BuildSyllableExercise, check(), CheckResult, ClozeExercise, ExerciseBase, ExerciseSpec, ListenExercise (+15 more)

### Community 13 - "KBR — Pesquisa"
Cohesion: 0.25
Nodes (7): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.29
Nodes (6): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras

### Community 15 - "storage/index.ts"
Cohesion: 0.14
Nodes (15): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), Attempt, LessonProgress, Progress, PROGRESS_STORAGE_KEY, ProgressStore, StorageLike, createEmptyProgress() (+7 more)

### Community 16 - "vitest"
Cohesion: 0.23
Nodes (7): LeitnerBox, ReviewGrade, Scheduler, SrsState, INTERVAL_DAYS, leitner, NOW

### Community 17 - "KBR — Roadmap"
Cohesion: 0.33
Nodes (5): KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status Fase 1 (real), Status PWA mínima (real)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `next`, `package.json`, `layout.tsx`, `exercises/index.ts`, `storage/index.ts`, `vitest`?**
  _High betweenness centrality (0.401) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0896551724137931 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `package.json`, `vitest`, `app/page.tsx`, `layout.tsx`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1471861471861472 - nodes in this community are weakly interconnected._
- **Should `exercises/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `storage/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14130434782608695 - nodes in this community are weakly interconnected._
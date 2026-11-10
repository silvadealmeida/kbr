# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 38 files · ~6,046 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 371 nodes · 458 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27930afd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Running Custom Playwright Code
- package.json
- Local Storage
- Browser Automation with playwright-cli
- app/page.tsx
- 3. Heal
- Browser Session Management
- compilerOptions
- Tracing
- layout.tsx
- KBR — Arquitetura
- Video Recording
- exercises/index.ts
- KBR — Pesquisa
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- storage/index.ts
- vitest
- KBR — Roadmap
- CLAUDE.md
- Advanced Mocking with run-code

## God Nodes (most connected - your core abstractions)
1. `Browser Automation with playwright-cli` - 16 edges
2. `compilerOptions` - 16 edges
3. `Running Custom Playwright Code` - 13 edges
4. `Commands` - 12 edges
5. `PageHeader()` - 11 edges
6. `next` - 11 edges
7. `EmptyState()` - 10 edges
8. `KBR — Arquitetura` - 10 edges
9. `Browser Session Management` - 10 edges
10. `vitest` - 9 edges

## Surprising Connections (you probably didn't know these)
- `MemoryStorage` --implements--> `StorageLike`  [EXTRACTED]
  tests/storage.test.ts → src/lib/storage/index.ts
- `check()` --calls--> `composeSyllable()`  [EXTRACTED]
  src/lib/exercises/index.ts → src/lib/hangul/index.ts
- `Page()` --calls--> `EmptyState()`  [EXTRACTED]
  src/app/hangul/page.tsx → src/components/ui/EmptyState.tsx
- `Page()` --calls--> `PageHeader()`  [EXTRACTED]
  src/app/hangul/page.tsx → src/components/ui/PageHeader.tsx
- `Page()` --calls--> `EmptyState()`  [EXTRACTED]
  src/app/licoes/page.tsx → src/components/ui/EmptyState.tsx

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (23 total, 4 thin omitted)

### Community 0 - "Running Custom Playwright Code"
Cohesion: 0.07
Nodes (22): Examples, Inspecting Element Attributes, Debugging Playwright Tests, Running Playwright Tests, Attaching Screenshots and Videos to Pull Requests, From a local session, From CI, Limits (+14 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (31): routes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5 (+23 more)

### Community 2 - "Local Storage"
Cohesion: 0.06
Nodes (35): Advanced: Multiple Cookies or Custom Options, Advanced: Multiple Operations, Authentication State Reuse, Clear All Cookies, Clear All localStorage, Clear sessionStorage, Common Patterns, Cookies (+27 more)

### Community 3 - "Browser Automation with playwright-cli"
Cohesion: 0.07
Nodes (27): Attaching screenshots and videos to pull requests, Browser Automation with playwright-cli, Browser Sessions, Commands, Core, DevTools, Emulation, Example: Debugging with DevTools (+19 more)

### Community 4 - "app/page.tsx"
Cohesion: 0.20
Nodes (15): next, metadata, Page(), metadata, Page(), Dashboard(), stats, metadata (+7 more)

### Community 5 - "3. Heal"
Cohesion: 0.09
Nodes (23): 0. How generation works, 1.1 Prerequisite: workspace, 1.2 Prerequisite: seed test, 1.3 Explore the app, 1.4 Write the spec file, 1. Planning, 2.1 Inputs, 2.2 Generate one scenario (+15 more)

### Community 6 - "Browser Session Management"
Cohesion: 0.10
Nodes (20): 1. Name Browser Sessions Semantically, 2. Always Clean Up, 3. Delete Stale Browser Data, A/B Testing Sessions, Attach by channel name, Attach via browser extension, Attach via CDP endpoint, Attaching to a Running Browser (+12 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Tracing"
Cohesion: 0.12
Nodes (16): 1. Start Tracing Before the Problem, 2. Clean Up Old Traces, Analyzing Performance, Basic Usage, Best Practices, Capturing Evidence, Debugging Failed Actions, Limitations (+8 more)

### Community 9 - "layout.tsx"
Cohesion: 0.23
Nodes (7): kr, metadata, RootLayout(), viewport, Nav(), ThemeToggle(), ROUTES

### Community 10 - "KBR — Arquitetura"
Cohesion: 0.18
Nodes (10): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Modelo de dados (TS), Stack, Testes (+2 more)

### Community 11 - "Video Recording"
Cohesion: 0.20
Nodes (10): 1. Use Descriptive Filenames, 2. Record entire hero scripts., 3. Attach the recording to the pull request, Basic Recording, Best Practices, Cursor, Target Highlight and Click Point, Limitations, Overlay API Summary (+2 more)

### Community 12 - "exercises/index.ts"
Cohesion: 0.09
Nodes (25): vitest@^4.1.12, vitest, manifest(), BuildSyllableExercise, check(), CheckResult, ClozeExercise, ExerciseBase (+17 more)

### Community 13 - "KBR — Pesquisa"
Cohesion: 0.25
Nodes (7): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.29
Nodes (6): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras

### Community 15 - "storage/index.ts"
Cohesion: 0.15
Nodes (14): Attempt, LessonProgress, Progress, PROGRESS_STORAGE_KEY, ProgressStore, StorageLike, createEmptyProgress(), createLocalStorageStore() (+6 more)

### Community 16 - "vitest"
Cohesion: 0.23
Nodes (7): LeitnerBox, ReviewGrade, Scheduler, SrsState, INTERVAL_DAYS, leitner, NOW

### Community 17 - "KBR — Roadmap"
Cohesion: 0.29
Nodes (6): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status Fase 1 (real), Status PWA mínima (real)

### Community 22 - "Advanced Mocking with run-code"
Cohesion: 0.25
Nodes (8): Advanced Mocking with run-code, CLI Route Commands, Conditional Response Based on Request, Delayed Response, Modify Real Response, Request Mocking, Simulate Network Failures, URL Patterns

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `exercises/index.ts` to `vitest`, `package.json`, `layout.tsx`, `storage/index.ts`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `Running Custom Playwright Code` be split into smaller, more focused modules?**
  _Cohesion score 0.07311827956989247 - nodes in this community are weakly interconnected._
- **Why does `Browser Automation with playwright-cli` connect `Browser Automation with playwright-cli` to `Running Custom Playwright Code`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0748663101604278 - nodes in this community are weakly interconnected._
- **Should `Local Storage` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `Browser Automation with playwright-cli` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `3. Heal` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
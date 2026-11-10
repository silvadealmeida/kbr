# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 35 files · ~5,327 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 348 nodes · 417 edges · 24 communities (20 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c6cc5185`
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
- scripts
- vitest
- KBR — Roadmap
- CLAUDE.md
- Running Custom Playwright Code
- Local Storage

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
10. `Cookies` - 9 edges

## Surprising Connections (you probably didn't know these)
- `check()` --calls--> `composeSyllable()`  [EXTRACTED]
  src/lib/exercises/index.ts → src/lib/hangul/index.ts
- `Page()` --calls--> `EmptyState()`  [EXTRACTED]
  src/app/hangul/page.tsx → src/components/ui/EmptyState.tsx
- `Page()` --calls--> `PageHeader()`  [EXTRACTED]
  src/app/hangul/page.tsx → src/components/ui/PageHeader.tsx
- `Page()` --calls--> `EmptyState()`  [EXTRACTED]
  src/app/licoes/page.tsx → src/components/ui/EmptyState.tsx
- `Page()` --calls--> `PageHeader()`  [EXTRACTED]
  src/app/licoes/page.tsx → src/components/ui/PageHeader.tsx

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`

## Communities (24 total, 4 thin omitted)

### Community 0 - "Running Custom Playwright Code"
Cohesion: 0.09
Nodes (17): Examples, Inspecting Element Attributes, Debugging Playwright Tests, Running Playwright Tests, Attaching Screenshots and Videos to Pull Requests, From a local session, From CI, Limits (+9 more)

### Community 1 - "package.json"
Cohesion: 0.10
Nodes (24): routes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5 (+16 more)

### Community 2 - "Local Storage"
Cohesion: 0.07
Nodes (27): Advanced: Multiple Cookies or Custom Options, Authentication State Reuse, Clear All Cookies, Clear sessionStorage, Common Patterns, Cookies, Delete a Cookie, Delete Database (+19 more)

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
Cohesion: 0.12
Nodes (22): BuildSyllableExercise, check(), CheckResult, ClozeExercise, ExerciseBase, ExerciseSpec, ListenExercise, MultipleChoiceExercise (+14 more)

### Community 13 - "KBR — Pesquisa"
Cohesion: 0.25
Nodes (7): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.29
Nodes (6): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras

### Community 15 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, e2e, start, test, typecheck

### Community 16 - "vitest"
Cohesion: 0.15
Nodes (10): vitest@^4.1.12, vitest, manifest(), LeitnerBox, ReviewGrade, Scheduler, SrsState, INTERVAL_DAYS (+2 more)

### Community 17 - "KBR — Roadmap"
Cohesion: 0.29
Nodes (6): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status Fase 1 (real), Status PWA mínima (real)

### Community 22 - "Running Custom Playwright Code"
Cohesion: 0.15
Nodes (13): Clipboard, Complex Workflows, Error Handling, File Downloads, Frames and Iframes, Geolocation, JavaScript Execution, Media Emulation (+5 more)

### Community 23 - "Local Storage"
Cohesion: 0.25
Nodes (8): Advanced: Multiple Operations, Clear All localStorage, Delete Single Item, Get Single Value, List All localStorage Items, Local Storage, Set JSON Value, Set Value

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Storage Management` connect `Local Storage` to `Local Storage`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `Running Custom Playwright Code` be split into smaller, more focused modules?**
  _Cohesion score 0.08923076923076922 - nodes in this community are weakly interconnected._
- **Why does `Browser Automation with playwright-cli` connect `Browser Automation with playwright-cli` to `Running Custom Playwright Code`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `package.json`, `exercises/index.ts`, `layout.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Should `Local Storage` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Browser Automation with playwright-cli` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
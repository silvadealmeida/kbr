# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 60 files · ~10,133 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 268 nodes · 465 edges · 17 communities (13 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0b6c8112`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- package.json
- Supabase e Google OAuth — configuração manual
- README.md
- app/page.tsx
- scripts
- compilerOptions
- layout.tsx
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
3. `vitest` - 13 edges
4. `PageHeader()` - 13 edges
5. `syncProgressForUser()` - 13 edges
6. `EmptyState()` - 10 edges
7. `KBR — Arquitetura` - 10 edges
8. `AuthProvider()` - 9 edges
9. `createSupabaseProgressStore()` - 9 edges
10. `@supabase/supabase-js` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `Modelo de dados (TS)` --references--> `ExerciseSpec`  [INFERRED]
  docs/architecture.md → src/lib/exercises/index.ts
- `proxy()` --calls--> `updateSupabaseSession()`  [EXTRACTED]
  proxy.ts → src/lib/supabase/proxy.ts
- `MemoryStorage` --implements--> `StorageLike`  [EXTRACTED]
  tests/progress-sync.test.ts → src/lib/storage/index.ts
- `MemoryStorage` --implements--> `StorageLike`  [EXTRACTED]
  tests/storage.test.ts → src/lib/storage/index.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncedProgressStore.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/mergeProgress.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (17 total, 4 thin omitted)

### Community 0 - "next"
Cohesion: 0.20
Nodes (11): @supabase/ssr@0.12.0, config, proxy(), @supabase/ssr, GET(), safeNextPath(), getBrowserSupabaseClient(), getSupabasePublicConfig() (+3 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (29): routes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react@^19.3.1, react-dom@^19.3.1, @supabase/supabase-js@2.109.0, tailwindcss@^4.3.5 (+21 more)

### Community 2 - "Supabase e Google OAuth — configuração manual"
Cohesion: 0.29
Nodes (6): 1. Criar e preparar o projeto Supabase, 2. Configurar o Google Auth Platform, 3. Configurar URLs no Supabase, 4. Variáveis do app, 5. Deploy e verificação, Supabase e Google OAuth — configuração manual

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
Cohesion: 0.18
Nodes (9): kr, metadata, RootLayout(), viewport, AuthControl(), useAuth(), Nav(), ThemeToggle() (+1 more)

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
Cohesion: 0.09
Nodes (36): @supabase/supabase-js, AuthContext, AuthContextValue, AuthProvider(), AuthStatus, Attempt, LessonProgress, Progress (+28 more)

### Community 16 - "vitest"
Cohesion: 0.11
Nodes (16): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Stack, Testes, UI/UX (+8 more)

### Community 17 - "KBR — Roadmap"
Cohesion: 0.25
Nodes (7): Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status conta e sincronização (real), Status Fase 1 (real), Status PWA mínima (real)

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `package.json` to `next`, `layout.tsx`, `exercises/index.ts`, `storage/index.ts`, `vitest`?**
  _High betweenness centrality (0.254) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07057057057057058 - nodes in this community are weakly interconnected._
- **Why does `next` connect `app/page.tsx` to `next`, `package.json`, `layout.tsx`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `@supabase/supabase-js` connect `storage/index.ts` to `next`, `package.json`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `exercises/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `storage/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08583959899749373 - nodes in this community are weakly interconnected._
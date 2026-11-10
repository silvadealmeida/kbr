# Graph Report - kbr  (2026-11-10)

## Corpus Check
- 83 files · ~50,200 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 714 nodes · 1069 edges · 50 communities (46 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3c5652e1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Schema de conteúdo — módulo Hangul
- package.json
- vitest
- supabase/proxy.ts
- dashboard/page.tsx
- Deep UI/UX, Motion Design & Creative Development Research — KBR
- privacidade/page.tsx
- compilerOptions
- Pronúncia coreana para brasileiros
- AuthProvider.tsx
- Hangul — referência pedagógica
- Currículo de Hangul — Fase 3A
- exercises/index.ts
- KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷
- KBR — instruções para agentes (Codex, OpenCode, Claude Code)
- storage/index.ts
- vitest
- KBR — Roadmap
- KBR — Arquitetura
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
- KBR — Auditoria de privacidade e avaliação legal (Fase 2B)
- 11. Unidade 5 — Todas as vogais
- 12. Unidade 6 — Sílabas e batchim
- 13. Unidade 7 — Ler em contexto
- 11. Tipo 9 — `srs-session`
- KBR — Pesquisa
- Supabase e Google OAuth — configuração manual
- 9. Unidade 3 — Consoantes básicas
- 16. Avaliação
- 4. Estrutura geral
- 18. Plano de testes
- 10. Unidade 4 — Consoantes tensas
- 15. Matriz de cobertura
- 17. Integração com revisão espaçada
- 19. QA de conteúdo
- 13. Feedback
- 2. Pesquisa, benchmark e decisão de design
- 8. Unidade 2 — Primeiras vogais

## God Nodes (most connected - your core abstractions)
1. `next` - 26 edges
2. `Currículo de Hangul — Fase 3A` - 24 edges
3. `Design de exercícios — módulo Hangul` - 21 edges
4. `Progress` - 19 edges
5. `Pronúncia coreana para brasileiros` - 17 edges
6. `postLoginPath()` - 17 edges
7. `compilerOptions` - 16 edges
8. `vitest` - 15 edges
9. `Schema de conteúdo — módulo Hangul` - 13 edges
10. `Hangul — referência pedagógica` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Interfaces de troca futura` --references--> `SrsState`  [INFERRED]
  docs/architecture.md → src/lib/srs/index.ts
- `Hangul` --references--> `Progress`  [INFERRED]
  docs/architecture.md → src/lib/storage/index.ts
- `3.8 Currículo` --references--> `Progress`  [INFERRED]
  docs/pedagogy/content-schema.md → src/lib/storage/index.ts
- `6.2 Cartões SRS` --references--> `SrsState`  [INFERRED]
  docs/pedagogy/content-schema.md → src/lib/srs/index.ts
- `7.2 Invariantes obrigatórias` --references--> `composeSyllable()`  [INFERRED]
  docs/pedagogy/content-schema.md → src/lib/hangul/index.ts

## Import Cycles
- 2-file cycle: `src/lib/srs/index.ts -> src/lib/srs/leitner.ts -> src/lib/srs/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 2-file cycle: `src/lib/storage/index.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/index.ts`
- 3-file cycle: `src/lib/storage/index.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`
- 4-file cycle: `src/lib/storage/index.ts -> src/lib/storage/syncProgress.ts -> src/lib/storage/supabaseProgressStore.ts -> src/lib/storage/localStorageStore.ts -> src/lib/storage/index.ts`

## Communities (50 total, 4 thin omitted)

### Community 0 - "Schema de conteúdo — módulo Hangul"
Cohesion: 0.06
Nodes (32): 11. Referências, 1. O que muda e o que não muda, 2. Estrutura de arquivos recomendada, 3.1 Status de revisão, 3.2 Jamo, 3.3 Sílabas, 3.4 Palavras, 3.5 Regras (+24 more)

### Community 1 - "package.json"
Cohesion: 0.08
Nodes (30): protectedRoutes, dependencies, next@^16.4.6, @playwright/test@^1.65.0, react-dom@^19.3.1, @supabase/supabase-js@2.109.0, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5 (+22 more)

### Community 2 - "vitest"
Cohesion: 0.10
Nodes (14): vitest@^4.1.12, vitest, manifest(), migration, appLayout, callback, footer, impressum (+6 more)

### Community 3 - "supabase/proxy.ts"
Cohesion: 0.11
Nodes (17): SiteLayout(), Nav(), learnLinks, legalLinks, SiteFooter(), SiteHeader(), ThemeToggle(), isProtectedPath() (+9 more)

### Community 4 - "dashboard/page.tsx"
Cohesion: 0.13
Nodes (22): next, Dashboard(), metadata, stats, metadata, Page(), metadata, Page() (+14 more)

### Community 5 - "Deep UI/UX, Motion Design & Creative Development Research — KBR"
Cohesion: 0.05
Nodes (36): 10. Hangul as an Interactive Visual System, 11. Advanced Animation Technologies, 12. Prototype Concepts — Research Only, 13. Art Direction Exploration, 14. Performance and Accessibility Requirements, 15. Additional Deliverables, 8. Cinematic Motion Design and Interactive Storytelling, 9. Architectural Illustration and Editorial Drawing Styles (+28 more)

### Community 6 - "privacidade/page.tsx"
Cohesion: 0.38
Nodes (6): legalBasis, metadata, Pending(), PrivacyPage(), Section(), storageRows

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Pronúncia coreana para brasileiros"
Cohesion: 0.06
Nodes (32): 10. Romanização: por que ela engana, 11. Tabela de aproximações para a interface, 12. Limites do TTS, 13. Roteiro de gravação (para revisão humana), 14. Pontos que exigem revisão especializada, 15. Sequência de prática para brasileiros, 16. Referências, 1. Advertência inicial (+24 more)

### Community 9 - "AuthProvider.tsx"
Cohesion: 0.06
Nodes (57): Rotas e autenticação, react@^19.3.1, @supabase/ssr@0.12.0, react, @supabase/ssr, AppLayout(), dynamic, metadata (+49 more)

### Community 10 - "Hangul — referência pedagógica"
Cohesion: 0.06
Nodes (30): 10. Notas de ensino por letra, 11. Originalidade e limites, 12. Referências, 1. Como ler este documento, 2. Terminologia mínima, 3. História em poucas linhas, 4.1 Consoantes, 4.2 Vogais (+22 more)

### Community 11 - "Currículo de Hangul — Fase 3A"
Cohesion: 0.12
Nodes (15): 14. Grafo de pré-requisitos, 18. Fluxo do player de lição, 1.1 Fora de escopo, 1. Objetivo do módulo, 20. Revisão especializada pendente, 21. Riscos e mitigação, 22. Handoff para a Fase 3B, 23. Referências (+7 more)

### Community 12 - "exercises/index.ts"
Cohesion: 0.09
Nodes (26): 12.1 União de respostas, 12.2 Resultado, 12.3 `checkAnswer`, 12.4 Compatibilidade com `check`, 12.5 Invariantes, 12. Modelo de resposta e correção, BuildSyllableExercise, check() (+18 more)

### Community 13 - "KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷"
Cohesion: 0.20
Nodes (10): Development status, KBR — Korean for Brazilian Portuguese Speakers 🇧🇷 🇰🇷, Learning approach, License, Planned learning features, Project documentation, Project philosophy, Running locally (+2 more)

### Community 14 - "KBR — instruções para agentes (Codex, OpenCode, Claude Code)"
Cohesion: 0.25
Nodes (7): Comandos, Fase atual, graphify, KBR — instruções para agentes (Codex, OpenCode, Claude Code), Preservar trabalho entre agentes, Regras, This is NOT the Next.js you know

### Community 15 - "storage/index.ts"
Cohesion: 0.06
Nodes (43): 10. Critérios de aceite técnicos, 6.1 Mapeamento de lições, 6.2 Cartões SRS, 6.3 Histórico, 6.4 `mergeProgress`, 6.5 Domínio derivado (não persistido), 6. Compatibilidade com `Progress`, 9. Ordem de implementação da Fase 3B (+35 more)

### Community 16 - "vitest"
Cohesion: 0.23
Nodes (7): LeitnerBox, ReviewGrade, Scheduler, SrsState, INTERVAL_DAYS, leitner, NOW

### Community 17 - "KBR — Roadmap"
Cohesion: 0.18
Nodes (11): Modelo de dados (TS), 2. Visão geral dos nove tipos, Estado atual (atualize a cada commit — é o ponto de retomada entre agentes), KBR — Roadmap, Pós-MVP (não implementar agora), Riscos, Status conta e sincronização (real), Status Fase 1 (real) (+3 more)

### Community 18 - "KBR — Arquitetura"
Cohesion: 0.20
Nodes (10): Decisões/limites, Estrutura, Hangul, Interfaces de troca futura, KBR — Arquitetura, Privacidade, Stack, Testes (+2 more)

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

### Community 31 - "KBR — Auditoria de privacidade e avaliação legal (Fase 2B)"
Cohesion: 0.22
Nodes (9): 1. Inventário de cookies, 2. Inventário de `localStorage`, 3. Analytics, scripts e serviços de terceiros, 4. Avaliação de consentimento, 5. Retenção e exclusão, 6. Avaliação de Impressum (Alemanha), 7. Riscos e limites conhecidos, 8. Checklist antes do lançamento público (+1 more)

### Community 32 - "11. Unidade 5 — Todas as vogais"
Cohesion: 0.29
Nodes (7): 11. Unidade 5 — Todas as vogais, `c2` — Checkpoint 2: inventário completo de vogais, `h11` — ㅑ ㅕ ㅛ ㅠ, `h12` — ㅐ ㅔ ㅒ ㅖ, `h13` — ㅘ ㅝ ㅟ, `h14` — ㅙ ㅞ ㅚ, `h15` — ㅢ e o inventário completo de vogais

### Community 33 - "12. Unidade 6 — Sílabas e batchim"
Cohesion: 0.29
Nodes (7): 12. Unidade 6 — Sílabas e batchim, `c3` — Checkpoint 3: sílabas e batchim, `h16` — Montar e ler sílabas C+V, `h17` — Batchim ㅇ, ㄴ, ㅁ, `h18` — Batchim oclusivo e os sete sons representativos, `h19` — Batchim ㄹ, `h20` — Os 11 batchim duplos

### Community 34 - "13. Unidade 7 — Ler em contexto"
Cohesion: 0.29
Nodes (7): 13. Unidade 7 — Ler em contexto, `c4` — Checkpoint 4: leitura integrada, `h21` — Ligação (연음), `h22` — Nasalização, `h23` — Aspiração, `h24` — Oficina de leitura, `h25` — Consolidação e domínio

### Community 35 - "11. Tipo 9 — `srs-session`"
Cohesion: 0.29
Nodes (7): 11.1 Objetivo, 11.2 Especificação, 11.3 Seleção, 11.4 Validação e nota, 11.5 Feedback, 11.6 Acessibilidade, 11. Tipo 9 — `srs-session`

### Community 36 - "KBR — Pesquisa"
Cohesion: 0.29
Nodes (7): 1. Método e limitações, 2. Produtos de referência (padrões gerais, não cópia), 3. Princípios pedagógicos adotados, 4. Referências de ensino de coreano (para consulta, não cópia), 5. Tecnologias — fatos relevantes, Fontes, KBR — Pesquisa

### Community 37 - "Supabase e Google OAuth — configuração manual"
Cohesion: 0.29
Nodes (6): 1. Criar e preparar o projeto Supabase, 2. Configurar o Google Auth Platform, 3. Configurar URLs no Supabase, 4. Variáveis do app, 5. Deploy e verificação, Supabase e Google OAuth — configuração manual

### Community 38 - "9. Unidade 3 — Consoantes básicas"
Cohesion: 0.33
Nodes (6): 9. Unidade 3 — Consoantes básicas, `h04` — ㄱ e ㄴ, `h05` — ㄷ ㄹ ㅁ, `h06` — ㅂ ㅅ ㅈ, `h07` — ㅋ ㅌ ㅍ ㅊ, `h08` — ㅎ e revisão das 14 consoantes básicas

### Community 40 - "16. Avaliação"
Cohesion: 0.40
Nodes (5): 16.1 Tipos, 16.2 Regras de pontuação, 16.3 Diagnóstico de erro, 16.4 Banco de itens, 16. Avaliação

### Community 41 - "4. Estrutura geral"
Cohesion: 0.40
Nodes (5): 4.1 Carga semanal sugerida, 4.2 Contagem de jamo, 4.3 Convenções dos IDs, 4.4 Estados de conteúdo, 4. Estrutura geral

### Community 42 - "18. Plano de testes"
Cohesion: 0.40
Nodes (5): 18.1 Unitários por tipo, 18.2 Conteúdo, 18.3 E2E, 18.4 Fixtures, 18. Plano de testes

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

### Community 47 - "13. Feedback"
Cohesion: 0.50
Nodes (4): 13.1 Estrutura, 13.2 Exemplos, 13.3 O que evitar, 13. Feedback

### Community 48 - "2. Pesquisa, benchmark e decisão de design"
Cohesion: 0.67
Nodes (3): 2.1 Decisões de design (hipóteses, não fatos), 2.2 O que o currículo evita por falta de evidência, 2. Pesquisa, benchmark e decisão de design

### Community 49 - "8. Unidade 2 — Primeiras vogais"
Cohesion: 0.67
Nodes (3): 8. Unidade 2 — Primeiras vogais, `h02` — ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo, `h03` — ㅡ ㅣ e as seis vogais básicas

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `package.json`, `supabase/proxy.ts`, `AuthProvider.tsx`, `exercises/index.ts`, `storage/index.ts`, `vitest`?**
  _High betweenness centrality (0.271) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `Progress` (e.g. with `Hangul` and `10. Critérios de aceite técnicos`) actually correct?**
  _`Progress` has 13 INFERRED edges - model-reasoned connections that need verification._
- **Should `Schema de conteúdo — módulo Hangul` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `Progress` connect `storage/index.ts` to `Schema de conteúdo — módulo Hangul`, `Currículo de Hangul — Fase 3A`, `17. Integração com revisão espaçada`, `KBR — Roadmap`, `KBR — Arquitetura`, `KBR — Auditoria de privacidade e avaliação legal (Fase 2B)`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07575757575757576 - nodes in this community are weakly interconnected._
- **Why does `Design de exercícios — módulo Hangul` connect `Design de exercícios — módulo Hangul` to `11. Tipo 9 — `srs-session``, `18. Plano de testes`, `exercises/index.ts`, `13. Feedback`, `KBR — Roadmap`, `10. Tipo 8 — `stroke-order``, `3. Tipo 1 — `recognition``, `4. Tipo 2 — `audio-to-char``, `5. Tipo 3 — `char-to-audio``, `6. Tipo 4 — `order-jamo``, `8. Tipo 6 — `minimal-pair``, `7. Tipo 5 — `build-syllable``, `9. Tipo 7 — `reading``?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.09956709956709957 - nodes in this community are weakly interconnected._
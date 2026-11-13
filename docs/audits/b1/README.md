# Auditoria 12B — B1 (coreano A0–A2 → B1), somente leitura

**Status: CONCLUÍDA (12B) e EXECUTADA (12C).** A auditoria linguística e pedagógica completa do B1 implementado não alterou conteúdo na 12B. Na 12C as correções verificadas foram aplicadas localmente: 3 dos 4 CRÍTICO corrigidos, C001 rejeitado (`것으로` é a forma correta), fairness sistêmica resolvida, progressão por micro-ensino e 65 `reusedIds` congeladas. O ledger de execução é [`correction-ledger.md`](correction-ledger.md); nenhum conteúdo foi marcado como revisado por nativo.

- Linha de base: `6e5d38bf8e9ec89c86d4d3236301a114ff2a0f45` · Branch local `audit/b1-phase-12b` (sem push — decisão do dono).
- Escopo medido: 40 lições, 8 checkpoints, **615 itens avaliados** (381 digitados; 132 listen), 80 blocos de gramática (160 exemplos), 80 painéis de intro, 238 linhas de diálogo, 40 tarefas de produção, 320 identidades + 320 frases de vocabulário, 164 `reusedIds`.
- Veredito agregado: **4 CRÍTICO · 25 MAJOR · 20 MINOR · 14 UNCERTAIN** + 9 classes de falso positivo rejeitadas. Comece por [`executive-summary.md`](executive-summary.md).

## Protocolo de severidade (mesmo da 12A)

| Classe | Critério |
|---|---|
| CRÍTICO | corrige errado hoje: gabarito que pune resposta correta, item na língua errada, agramaticalidade em modelo+gabarito |
| MAJOR | defeito pedagógico estrutural (cobrança sem ensino, fairness de item, dado inconsistente em escala, glosa/identidade enganosa) |
| MINOR | copy-editing, glosas, citações, consistência |
| UNCERTAIN | plausibilidade depende de falante nativo — **nunca** tratado como aprovado |

Cada achado canônico (`data/findings.json`) tem: `id`, `severity`, `category`, `files[]` (arquivo:linha), `contentIds[]`, `ko`/`pt` (texto original), `problem`, `proposedFix`, `evidence`, `confidence`, `crossCourseImpact`, `status`. Regras firmes: nenhuma alegação entra sem reverificação na fonte; nenhuma citação inventada; revisão por IA **não** é aprovação nativa; ids de cartões nunca são renomeados pela auditoria.

## Passes

- **A — Inventário estrutural** (scripts determinísticos sobre dump dos datasets): contagens, tipos, invariantes (`audioText==answer`, gabarito∈opções, lacuna não vazia, pontuação, fragmentos de listen, alomorfia de partícula, reused-refs, origem lexical, collisions).
- **B — Revisão linguística exaustiva**: o agente-lead leu TODOS os arquivos de conteúdo (8 módulos de lição, 8 checkpoints, 320 linhas de vocabulário, 40 produções); 11 revisores independentes por fatia (m1…m7-8, c01–04, c05–08, vocab m01–04, m05–08) em paralelo.
- **C — Progressão A2→B1 e intermódulos**: mapa `taught/graded/declared` por marcador com censo B1 (`markerB1`), dívida de 12A revisitada, escopo cumulativo de checkpoints.
- **D — Reverificação CRÍTICO/MAJOR** linha a linha; triagem das alegações dos revisores (9+ rejeitadas com evidência de grep; ver `exercise-findings.md §Rejeições`).

Nenhuma categoria foi amostrada — cobertura integral está afirmada com evidência em [`coverage-ledger.md`](coverage-ledger.md) (1 linha por passo + seção por dimensão).

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `executive-summary.md` | leitura de 1 página, números, prioridades, verificação |
| `inventory.md` | estrutura medida do B1 + estado de áudio + máquinas de medição |
| `coverage-ledger.md` | cobertura por passo e por dimensão (gerado por ferramenta) |
| `linguistic-findings.md` | vertente linguística (coreano + pt-BR) com severidades |
| `exercise-findings.md` | fairness/avaliação/higiene de dados + §Rejeições |
| `vocabulary-findings.md` | 320 cartões + relação vocab×itens |
| `production-task-findings.md` | 40 tarefas (sem grading automático; defeitos pedagógicos) |
| `progression-findings.md` | cluster de formas/léxico cobrados sem ensino + dívida 12A |
| `correction-proposals.md` | plano de correção priorizado em 5 níveis + fila nativa (execução 12C registrada no topo) |
| `correction-ledger.md` | **ledger de execução da 12C**: achado, correção real, evidência, teste, status e impacto de áudio |
| `data/findings.json` | ledger canônico legível por máquina (fonte da verdade dos IDs `B1-12B-*`) |
| `data/*.json` | evidências: `content-dump`, `structure-findings`, `particle-findings`, `listen-prompt-findings`, `typed-normalization`, `vocabulary-findings`, `progression-findings`, `lexicon-origin-findings`, `shared-validators`, `coverage-matrix` |
| `data/review-sheet.md` | despejo de leitura humana do corpus (linhas por lição) usado nos passes B/D |
| `tools/*.cjs`, `tools/content/*.test.ts`, `tools/vitest.config.mts` | reprodutibilidade — ver abaixo |

## Reproduzir as medições

```bash
# (as tools exigem o dump dos datasets, gerado pelo vitest de auditoria abaixo)
npx vitest run --config docs/audits/b1/tools/vitest.config.mts   # content-dump.json + validadores 12A sobre B1 (2 testes)
node docs/audits/b1/tools/analyze-structure.cjs
node docs/audits/b1/tools/analyze-particles.cjs
node docs/audits/b1/tools/analyze-listen-prompts.cjs
node docs/audits/b1/tools/analyze-typed-normalization.cjs
node docs/audits/b1/tools/analyze-vocabulary.cjs
node docs/audits/b1/tools/analyze-progression.cjs
node docs/audits/b1/tools/analyze-lexicon-origin.cjs
node docs/audits/b1/tools/make-coverage.cjs
node docs/audits/b1/tools/build-findings.cjs                     # ledger canônico
node docs/audits/b1/tools/make-ledger.cjs                        # coverage-ledger.md
```

Testes da base executados nesta fase: `typecheck` limpo · `npm test` **595/595** · `npm run build` verde (`[audio-guard] OK`) · Playwright não executado (diff não toca aplicação; justificativa no executive summary).

## Honestidade de ferramenta (limitações conhecidas)

1. **Bug próprio corrigido no passe D**: `analyze-progression.cjs` (portado da 12A) casava marcadores com jamo avulso (`(?:을|ㄹ)\s?때`), impossível sobre sílabas NFC — toda forma pós-vogal escapava. Correção: classes de sílabas geradas por batchim (`#L`/`#N`…); censo B1 adicionado (`markerB1`). Números pré-correção estavam por baixo (ex.: `-(으)ㄹ 때` "≥8" → **28** medidos). A primeira tentativa de correção (injeção de jamo, `decomp()`) foi revertida: quebrava a adjacência de sílabas de outros marcadores.
2. Analisadores de partícula/progressão são **triagem heurística** (falsos positivos documentados); todo número no ledger tem leitura de fonte.
3. O ledger não reproduz o total "76" de `reusedIds` órfãos da 12A (medida própria: 297 em A1/A2; para B1, 65/164 novos).
4. Revisores são IAs: vereditos de naturalidade ficam UNCERTAIN até falante nativo; a fila está em `correction-proposals.md`.

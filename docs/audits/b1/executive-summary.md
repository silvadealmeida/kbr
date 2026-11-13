# B1 — resumo executivo (Fase 12B, executado na 12C)

> **Resultado da 12C:** as correções verificadas foram aplicadas localmente. **3 CRÍTICO corrigidos e 1 rejeitado** (C001: `것으로` é a forma correta; a proposta `것로` era agramatical). Fairness sistêmica resolvida: **0/381** itens digitados exigem pontuação final exata e **0/132** `listen` pedem fragmento contra gabarito de frase inteira. Progressão: as 9 formas do cluster ganharam micro-ensino ou substituição por forma ensinada. Dados: 3 `acceptedAnswers` redundantes removidos, `checkRedundantAccepted` ligado no B1 e 65 `reusedIds` congeladas no baseline (297 A1/A2 + 65 B1). A UI da bancada de composição foi redesenhada e o áudio local passou a usar o corpus quando a flag opt-in está ligada. Detalhes e testes em [`correction-ledger.md`](correction-ledger.md). Nada foi marcado como revisado por nativo; B2/C1/C2 não foram tocados.

**O que foi**: auditoria linguística e pedagógica completa e somente-leitura do B1 implementado (40 lições, 8 checkpoints, 615 itens avaliados, 320+320 de vocabulário, 40 produções) na linha de base `6e5d38b`. Nada do conteúdo foi alterado na 12B. Metodologia e ferramentas na 12A portadas + engine de marcadores corrigido nesta fase.

## Números

| Severidade | Qtd | Retrato |
|---|---|---|
| CRÍTICO | **4** | 1 gabarito que pune a resposta correta (`것으로`, l32-e07); 1 reading em português (c03-e07); 2 frases agramaticais em posição de modelo+gabarito (l24 `통에`, c02 `대신에`) |
| MAJOR | **25** | cluster de progressão (9 formas cobradas em gabarito sem ensino — a maior categoria); 3 cartões de vocabulário defeituosos; 4 itens com fairness/unicidade quebrada; 2 dívidas de dados medidas pela 1ª vez em B1 (125/381 de pontuação exata; 65/164 de reusedIds sem superfície); 3 `acceptedAnswers` redundantes (a dívida explícita da 12A — exatamente 3, agora contados) |
| MINOR | **20** | copy-editing pt-BR, glosas, citações de explicação, registro |
| UNCERTAIN | **14** | exigem nativo — nada aqui foi tratado como aprovação |

Rejeições documentadas: 9+ alegações de revisores sem existência na fonte, 5 hits de partícula como ruído de segmentação, 1 modelo de escopo de checkpoint errado — ver `exercise-findings.md §Rejeições`.

## O que mais importa (leitura do dono do produto)

1. **O B1 cobra 9 formas que nunca ensinou** — duas delas (`-(으)ㄹ 때` 28×, `-라고 하다`) reincidentes de dívida que a 12A removeu do A2. Nenhuma exige reescrever a lição: 6 têm correção em ≤2 linhas; `-ㄹ 때`/`-라고` pedem decisão (bloco novo vs reescrita). Plano completo em `correction-proposals.md`.
2. **2 itens punem resposta certa hoje**: l32-e07 (alomorfe `로`) e c02-e04/c08-e17 (variante `예정이에요` premiada contra a l06). Corrigir antes de qualquer aluno usar.
3. **Fairness de digitação**: 32,8% dos itens digitados só aceitam pontuação final exata e 12 listen pedem "fragmento" cobrando frase inteira — um patch no builder B1 (`terminalPunctuationVariants`) resolve os 125 sem tocar gabarito.
4. **Áudio/identidades**: nenhum id renomeado; nenhum MP3 tocado (áudio é opt-in; itens afetados pelas correções usarão TTS até regeneração deliberada).
5. **B1 structuralmente está são**: 40/40 lições completas, 132/132 listen `audioText==answer`, 0 colisão de vocabulário, checklists/guidance presentes em todas as produções, validadores de produção próprios passam — os defeitos são de conteúdo/ordem, não de engenharia.

## Verificação executada

- `npm run typecheck` — limpo.
- `npm test` — **595 testes / 42 arquivos, todos passando** (inclui os validadores compartilhados da 12A).
- `npm run build` — verde, `[audio-guard] OK`.
- Auditoria: `npx vitest run --config docs/audits/b1/tools/vitest.config.mts` — 2/2 (dump de conteúdo + validadores sobre B1).
- Playwright **não** executado: zero arquivos de aplicação alterados nesta fase (diff toca apenas `docs/audits/b1/` + `docs/roadmap.md`) — e2e não exercita conteúdo novo.

## Verificação da execução 12C

- `npm run typecheck` limpo.
- `npm test` — **613 testes / 43 arquivos** (595 da base + 18 novos da 12C).
- `npm run build` com `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` — verde e `[audio-guard] OK` (0 MP3 em `.next/`).
- `npm run e2e` — **619 executados + 27 skips intencionais** (646), Chromium 375/390/768/1280 + WebKit 390.
- Medições: 0/381 digitados com pontuação exata obrigatória; 0/132 `listen` fora do padrão de frase completa; `shared-validators` 0 issues; `analyze-structure` 0 achados; 65 `reusedIds` congeladas.

## Pendências fora da 12B

- Revisão nativa dos 14 INCERTOS (fila em `correction-proposals.md`).
- Segundo-model-review sugerido para: U001 (`-더라면`), M002 (`-고 말다`), M011, M012, M021b.
- Conteúdo não coberto (fora do escopo declarado da fase): B2/C1/C2 (não existem), áudio estático B1 (opt-in, sem corpus), páginas de UI que consomem o B1 (cobertas pelos e2es da base).

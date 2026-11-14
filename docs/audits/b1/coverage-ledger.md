# Ledger de cobertura — Fase 12B (auditoria B1)

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


> **Atualização 12D:** a cobertura de itens avaliados continua integral (40 lições, 8 checkpoints, 615 itens, 320+320 de vocabulário, 40 produções). A 12D fechou os 14 INCERTOS editorialmente e adicionou um painel de registro na l23 (80 → 81 painéis de intro), sem remover ou reamostrar nenhuma categoria. As decisões e os testes estão em [`final-editorial-decisions.md`](final-editorial-decisions.md); os dados de máquina foram regenerados a partir do conteúdo pós-12D. O restante deste ledger preserva a medição original da 12B.

> **Atualização 12C:** a cobertura continua integral (40 lições, 8 checkpoints, 615 itens, 320+320 de vocabulário, 40 produções). As correções aplicadas e os testes de regressão estão em [`correction-ledger.md`](correction-ledger.md); nenhuma categoria foi reamostrada ou removida. O ledger abaixo preserva a medição original da 12B.

Baseline: `6e5d38b`. Método: cada passo (48) foi lido INTEGRALMENTE pelo agente-lead e por um revisor independente por fatia; as categorias abaixo foram cruzadas por scripts determinísticos (PASS A) e reverificadas linha a linha (PASS D). Nada foi amostrado.

Legenda de colunas de máquina: itens = exercícios conferidos um a um (gabarito×opções, audioText==answer, alomorfia pós-lacuna, redundância de `acceptedAnswers`, pontuação exata).

## Passos (40 lições + 8 checkpoints)

| Passo | Itens | Vocab novo | Frases | Diálogo | Gram. | Exemplos | Intro | Produção | Reuso declarado | Itens com suspeita de carga (máquina, triada) | Cobertura |
|---|---|---|---|---|---|---|---|---|---|---|---|
| b1-l01 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l02 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l03 | 10 | 8 | 8 | 5 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l04 | 10 | 8 | 8 | 5 | 2 | 4 | 2 | 1 | 4 | 0 | 100% lido + rev. independente |
| b1-l05 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l06 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 2 | 100% lido + rev. independente |
| b1-l07 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 0 | 100% lido + rev. independente |
| b1-l08 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 1 | 100% lido + rev. independente |
| b1-l09 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 0 | 100% lido + rev. independente |
| b1-l10 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 1 | 100% lido + rev. independente |
| b1-l11 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l12 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l13 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 0 | 100% lido + rev. independente |
| b1-l14 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l15 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 0 | 100% lido + rev. independente |
| b1-l16 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 2 | 100% lido + rev. independente |
| b1-l17 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l18 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l19 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l20 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l21 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l22 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 3 | 100% lido + rev. independente |
| b1-l23 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l24 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l25 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l26 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 4 | 100% lido + rev. independente |
| b1-l27 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 6 | 100% lido + rev. independente |
| b1-l28 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 6 | 100% lido + rev. independente |
| b1-l29 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l30 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 7 | 100% lido + rev. independente |
| b1-l31 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l32 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 3 | 0 | 100% lido + rev. independente |
| b1-l33 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 3 | 1 | 100% lido + rev. independente |
| b1-l34 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 3 | 0 | 100% lido + rev. independente |
| b1-l35 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 3 | 1 | 100% lido + rev. independente |
| b1-l36 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 3 | 100% lido + rev. independente |
| b1-l37 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 0 | 100% lido + rev. independente |
| b1-l38 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 2 | 100% lido + rev. independente |
| b1-l39 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 4 | 1 | 100% lido + rev. independente |
| b1-l40 | 10 | 8 | 8 | 6 | 2 | 4 | 2 | 1 | 5 | 3 | 100% lido + rev. independente |
| b1-c01 | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 100% lido + rev. independente |
| b1-c02 | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 18 | 100% lido + rev. independente |
| b1-c03 | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 8 | 100% lido + rev. independente |
| b1-c04 | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 9 | 100% lido + rev. independente |
| b1-c05 | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 7 | 100% lido + rev. independente |
| b1-c06 | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 100% lido + rev. independente |
| b1-c07 | 25 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 100% lido + rev. independente |
| b1-c08 | 40 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 9 | 100% lido + rev. independente |

## Vocabulário novo (320 identidades + 320 frases)

| Lição | IDs | Frases | Alvo-único-ok | Glosas revisadas | Tradução da frase revisada |
|---|---|---|---|---|---|
| b1-l01 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l02 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l03 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l04 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l05 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l06 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l07 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l08 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l09 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l10 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l11 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l12 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l13 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l14 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l15 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l16 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l17 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l18 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l19 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l20 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l21 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l22 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l23 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l24 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l25 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l26 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l27 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l28 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l29 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l30 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l31 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l32 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l33 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l34 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l35 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l36 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l37 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l38 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l39 | 8 | 8 | 8/8 | 100% | 100% |
| b1-l40 | 8 | 8 | 8/8 | 100% | 100% |

## Dimensões cobertas por todo o corpus

- Gramática coreana (correção/naturalidade): todos os itens de intro, diálogo, gramática, exercícios.
- Registro/honoríficos: todos os 238 turnos de diálogo + falas de exercícios.
- Tradução pt-BR: todos os campos pt (explicações, enunciados, gabaritos ko-pt, glossas lexicais).
- Partículas/alomorfes: validadores compartilhados 12A (`cloze-particle`, `mcq-answer-not-in-options`, `listen-audio-answer`, `accepted-*`) + analisador de junções partícula×substantivo.
- Vocabulário: 320 formas canônicas, 320 glosas, 320 frases contextuais, 164 referências reusadas (medidas por `findUnusedReusedRefs`).
- Progressão A2→B1 e intra-B1: mapa de marcadores por blueprint + firstSeen taught/graded/declared + origem lexical das cobranças.
- Produção: 40 tarefas × (promptPt, promptKo, guidance, checklist, minWords).
- Checkpoints: 8 × 25/40 itens estruturais (escopo cumulativo, contagens, distribuição de tipos por lição-fonte).
- Leitner/SRS de identidade: IDs preservados (nenhum renomeado; auditoria leu apenas).

## Exaustividade

Nenhuma categoria foi amostrada. Os únicos itens NÃO verificados por fonte externa humana estão marcados como INCERTO (ver `linguistic-findings.md`); revisores de modelo são agentes de IA — conforme a regra da auditoria, nenhum achado é tratado como aprovação de nativo.

# Registro de cobertura da auditoria A0–A2

> **Ledger histórico.** O corpus de áudio e as decisões de release mudaram depois desta baseline:
> o estado atual é áudio resolvido com créditos, 7.790 MP3 servidos por padrão. Nenhuma pendência
> de falante nativo deste registro é bloqueio atual; ver `docs/release/beta-readiness.md`.

Baseline `3103ce3`. Gerado por `tools/render-coverage.cjs`; as fichas de leitura são
regeneráveis (`tools/make-sheets.cjs`), por isso não estão versionadas — os totais
medidos nelas estão aqui.

## O que cada status significa

| Status | Definição real |
|---|---|
| INVENTORIADO | item enumerado programaticamente a partir do `content-dump.json` |
| STRUCTURALLY CHECKED | passou por checagens determinísticas (integridade de referência, gabarito × opção, alvo × frase, contagens) — **não** diz nada sobre o coreano |
| LINGUISTICAMENTE REVISADO POR IA | um revisor de lote leu a ficha e emitiu juízo por item, com autodeclaração de cobertura integral; sem amostragem declarada |
| RE-VERIFICADO PELO ORQUESTRADOR | o próprio fato do achado foi reproduzido no repositório (leitura da fonte, analisador determinístico ou motor real de `src/lib/exercises`) |
| REVISÃO HUMANA NECESSÁRIA | estado final de todo o coreano: nenhuma etapa acima substitui falante nativo |

## Cobertura por curso (itens medidos)

| Curso | Passos | Exercícios | Entradas de vocab. | Frases contextuais | Itens em ficha de leitura | Lotes revisados | Achados |
|---|---|---|---|---|---|---|---|
| A0 Hangul | 29 | 405 | 133 | 25 | 1044 | 2 | 28 |
| A1 | 48 | 615 | 443 | 443 | 2561 | 14 | 173 |
| A2 | 48 | 615 | 400 | 400 | 2206 | 9 | 97 |

Coluna "achados" soma CRÍTICO/MAJOR/MINOR/INCERTO de todos os revisores do curso
(inclui os segundos revisores dos lotes A1 m01–m05, que são sobreposição deliberada,
não itens novos).

## Cobertura por lote

| Lote | Curso | Escopo | Itens na ficha (programático) | Revisores | Cobertura declarada pelo revisor | Achados (C/M/m/i) |
|---|---|---|---|---|---|---|
| `a0-hangul` | A0 | h01–h25, c1–c4, jamo, sílabas, palavras, regras | 891 | 1 (único) | 100% (declarado) | 1/5/9/1 (16) |
| `vocab-hangul` | A0 | 133 entradas legadas + 25 frases | 153 | 1 (único) | 158/158 | 1/3/7/1 (12) |
| `a1-m01` | A1 | a1-l01–l05, a1-c01 | 224 | 1º de 2 revisores | 16/16 | 1/5/5/0 (11) |
| `a1-m02` | A1 | a1-l06–l10, a1-c02 | 205 | 1º de 2 revisores | 100% (declarado) | 0/5/6/0 (11) |
| `a1-m03` | A1 | a1-l11–l15, a1-c03 | 206 | 1º de 2 revisores | 206/206 | 1/3/10/0 (14) |
| `a1-m04` | A1 | a1-l16–l20, a1-c04 | 206 | 1º de 2 revisores | 206/206 | 0/2/9/0 (11) |
| `a1-m05` | A1 | a1-l21–l25, a1-c05 | 201 | 1º de 2 revisores | 20/20 | 0/2/8/1 (11) |
| `a1-m06` | A1 | a1-l26–l30, a1-c06 | 206 | 1 (único) | 206/206 | 0/1/5/0 (6) |
| `a1-m07` | A1 | a1-l31–l35, a1-c07 | 206 | 1 (único) | 206/206 | 0/1/5/0 (6) |
| `a1-m08` | A1 | a1-l36–l40, a1-c08 | 221 | 1 (único) | 221/221 | 0/1/8/0 (9) |
| `vocab-a1` | A1 | 443 entradas + 443 frases ko-a1 | 886 | 1 (único) | 443/443 | 0/5/11/3 (19) |
| `a2-m01` | A2 | a2-l01–l05, a2-c01 | 190 | 1 (único) | 201/201 | 1/3/5/1 (10) |
| `a2-m02` | A2 | a2-l06–l10, a2-c02 | 178 | 1 (único) | 178/178 | 0/4/8/1 (13) |
| `a2-m03` | A2 | a2-l11–l15, a2-c03 | 172 | 1 (único) | 172/172 | 0/4/6/0 (10) |
| `a2-m04` | A2 | a2-l16–l20, a2-c04 | 171 | 1 (único) | 171/171 | 0/2/4/0 (6) |
| `a2-m05` | A2 | a2-l21–l25, a2-c05 | 170 | 1 (único) | 170/170 | 0/2/11/0 (13) |
| `a2-m06` | A2 | a2-l26–l30, a2-c06 | 170 | 1 (único) | 100% (declarado) | 0/3/9/1 (13) |
| `a2-m07` | A2 | a2-l31–l35, a2-c07 | 170 | 1 (único) | 170/170 | 0/4/5/0 (9) |
| `a2-m08` | A2 | a2-l36–l40, a2-c08 | 185 | 1 (único) | 185/185 | 0/2/6/1 (9) |
| `vocab-a2` | A2 | 400 entradas + 400 frases ko-a2 | 800 | 1 (único) | 400/400 | 1/1/11/1 (14) |
| `a1-m01-v2` | A1 | revisão independente do lote a1-m01 (mesma ficha) | 224 | segundo revisor | 224/224 | 2/9/14/1 (26) |
| `a1-m02-v2` | A1 | revisão independente do lote a1-m02 (mesma ficha) | 205 | segundo revisor | 205/205 | 0/7/4/0 (11) |
| `a1-m03-v2` | A1 | revisão independente do lote a1-m03 (mesma ficha) | 206 | segundo revisor | 206/206 | 1/4/6/0 (11) |
| `a1-m04-v2` | A1 | revisão independente do lote a1-m04 (mesma ficha) | 206 | segundo revisor | 206/206 | 0/1/9/1 (11) |
| `a1-m05-v2` | A1 | revisão independente do lote a1-m05 (mesma ficha) | 201 | segundo revisor | 201/201 | 1/5/10/0 (16) |

## Limites reais desta cobertura

1. **Revisão por IA, não por falante nativo.** Nada aqui certifica naturalidade,
   registro ou pronúncia. O status `in-review` do conteúdo continua e não foi tocado.
2. **Dois revisores rejeitados pelo orquestrador.** `V0-001` (alegava que `으막` não
   existe) e `V0-002`/`A2M2-003` foram verificados como **falsos positivos**: a norma
   (온라인가나다 327196; 한글 맞춤법 제35항 붙임 2) confirma as grafias/transcrições do
   app. `A2M3-001` teve a premissa corrigida. Ou seja: a revisão de lote é triagem, e a
   verificação cruzada é obrigatória antes de qualquer correção.
3. **Conferência de contagem dos revisores não é auditável item a item.** O que se pode
   provar é o denominador (itens por ficha, medidos acima) e a autodeclaração de
   cobertura integral de cada lote; não há prova independente de que o revisor não
   pulou linhas. Para fechar isso, a correção por lote deve ser feita com o item ID na
   mão, lote por lote.
4. **Sobreposição baixa entre os dois revisores dos lotes A1 m01–m05** (mesmo lote,
   mesma ficha): interseção de itens citados ≈ 0,12–0,31. Isso significa cobertura
   complementar, não redundância confirmatória: dois passes do mesmo modelo acham
   conjuntos diferentes de problemas, o que reforça a necessidade de revisor humano.
 5. **Fora de escopo naquela baseline**: qualquer arquivo B1 (`src/content/curriculum/b1`,
    `src/content/vocabulary/b1-*`), o corpus MP3 (então cerca de 287 arquivos) e a camada de UI.
    Áudio não foi ouvido; nenhuma afirmação sobre pronúncia real foi feita. O estado atual do
    corpus está em `docs/audio/generation-guide.md`.
6. **Testes**: nesta baseline, `npm run typecheck` e a suíte Vitest (543 testes em 35
   arquivos) passam, e o build de produção passa. Isso é integridade de dados e de
   compilação — não é evidência linguística.

## Status final honesto por camada

| Camada | Status |
|---|---|
| A0 Hangul (h01–h25, c1–c4, jamo, sílabas, palavras, regras) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| A1 (40 lições + 8 checkpoints) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| A2 (40 lições + 8 checkpoints) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| Vocabulário canônico (976 entradas, 868 frases) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| Trilha de aprendizado (ordem de marcos, carga lexical) | ANALISADA PROGRAMATICAMENTE + REVISADA POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| B1 | **NÃO INICIADO / FORA DO ESCOPO** |

## Fase 12A — cobertura da correção (2026-11-13)

A cobertura linguística desta auditoria não mudou: continua sendo revisão por IA, não por falante nativo. A 12A adicionou cobertura **de regressão** sobre os defeitos confirmados:

| Camada | O que passou a ser verificado | Onde |
|---|---|---|
| Correção | 6 críticos + `A1M1-002` + variantes válidas + pontuação A2 + `listen` | `tests/content/curriculum-corrections.test.ts`, `tests/content/assessment-fairness.test.ts` |
| Estrutura | gabarito de MCQ nas opções, `correctOptionId`, respostas vazias/redundantes, `listen` divergente, partícula fixa | `src/content/curriculum/validate-exercises.ts`, `tests/content/curriculum-validators.test.ts` |
| Vocabulário | alvo de substantivo dentro de palavra maior | `src/content/vocabulary/validate.ts` (`targetBoundaryIssue`), `curriculum-validators.test.ts` |
| Reuso | dívida de `reusedIds` sem ocorrência congelada em 297 referências | `src/content/curriculum/validate-reuse.ts`, `tests/content/reuse-audit.test.ts` |
| Áudio | 12 lacunas e 10 sobras exatas; contenção de deploy e fallback | `tests/fixtures/stale-audio.json`, `tests/audio-manifest.test.ts`, `tests/audio-containment.test.ts` |
| B1 | nenhuma reescrita; suíte e E2E do B1 verdes | `tests/content/b1-curriculum.test.ts`, `e2e/b1.spec.ts` |

**O que continua fora:** todos os 84 MAJOR e 191 MINOR não corrigidos, a revisão nativa, a auditoria do B1 e a licença do áudio. Os números de 298/243/297 e a reconciliação estão em `correction-ledger.md` §1.

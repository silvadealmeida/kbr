# Auditoria 12B — inventário do B1 implementado (linha de base `6e5d38b`)

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Leitura direta dos datasets (`src/content/curriculum/b1/`, `src/content/vocabulary/b1-m0*.ts`) sem execução do app. Máquina: `docs/audits/b1/data/content-dump.json` + `structure-findings.json`.

## Arquivos auditados (somente leitura)

| Arquivo | Conteúdo |
|---|---|
| `blueprint.ts` | 40 lições + 8 checkpoints, 8 módulos, sequências, metas comunicativas |
| `lessons/module1.ts…module8.ts` | datasets das lições (b1-l02…b1-l40; b1-l01 em `b1-l01.ts`) |
| `lessons/b1-l01.ts`, `lessons/shared.ts` | primeira lição; builders (mcq/cloze/listen/reading/translate) |
| `checkpoints/b1-c01.ts…c08.ts` | 215 itens de checkpoint (7×25 + 40 no c08) |
| `validate.ts` / `validate-content.ts` | validação própria do B1 (`checkRedundantAccepted:false` — dívida da 12A) |
| `src/content/vocabulary/b1-m01.ts…b1-m08.ts` | 320 identidades novas + 320 frases contextuais |
| `src/lib/exercises/index.ts`, `punctuation.ts`, `src/content/curriculum/validate-exercises.ts`, `validate-reuse.ts` | engine/validadores compartilhados (para leitura de semântica de correção; nada alterado) |

## Contagens medidas (não declaradas)

| Dimensão | Valor |
|---|---|
| Lições / checkpoints | 40 / 8 (todas com `implemented`) |
| Itens avaliados | **615** = 400 (40×10 lição) + 215 checkpoints |
| Por tipo | mcq 102 · cloze 124 · listen 132 · reading 132 · translate 125 |
| Itens digitados (input do aluno) | **381** = listen 132 + cloze 124 + translate 125 (destes, 125 só aceitam pontuação final exata — ver §Máquinas) |
| Linhas de diálogo | 238 (5–6 por lição) |
| Blocos de gramática | 80 (2 por lição) + 160 exemplos bilíngues |
| Painéis de intro | 80 |
| Tarefas de produção | 40 (1 por lição; minWords 30–40; guidance 2–4; checklist 4 em todas) |
| Vocabulário novo | 320 identidades (`ko:`), 320 frases contextuais, 0 colisões com A1/A2 |
| `reusedIds` declarados | 164 refs / 96 identidades distintas (sem superfície: 65 — ver M022) |
| Checkpoint c08 | 40 itens, cumulativo m01–m08; c01–c07 = 25 itens, cumulativos |

## Proveniência de itens de checkpoint

Nenhum item de checkpoint carrega tag de lição-fonte (`withSourceLessonTag: 0`): o escopo cumulativo é implícito pela posição no blueprint. A auditoria tratou `cN` como cobertura de tudo anterior (modelo confirmado em `blueprint.ts` ao revisar as alegações de um revisor — ver README §Rejeições).

## Estado de áudio

Áudio estático é opt-in (`NEXT_PUBLIC_KBR_STATIC_AUDIO=1`); B1 usa `audioText` idêntico ao gabarito em 132/132 listen (verificado; `shared-validators.json`). Nenhum MP3 foi auditado (fora de escopo da 12B; corpus B1 ainda não tem manifest próprio).

## Máquinas de medição

- `typed-normalization.json`: 381 itens digitados; **125 (32,8%)** só aceitam pontuação final exata (65 pt-ko, 59 ko-pt, 1 listen = `b1-l37-e08` com/sem vírgula como únicas formas).
- `listen-prompt-findings.json`: **131/132** listen sem instrução de frase completa; **12** pedem explicitamente um fragmento enquanto o gabarito é a frase inteira.
- `shared-validators.json`: 615 itens no `validateExerciseSpec`; com `checkRedundantAccepted` ligado → exatamente **3** redundâncias (`b1-l32-e05`, `b1-l35-e05`, `b1-c01-e25`); `findUnusedReusedRefs` → **65/164** refs sem superfície.
- `vocabulary-findings.json`: 0 colisões de id, 0 homógrafos não resolvidos entre cursos, `targetInsideWord` 8 sinalizados → 3 reais (M005/M006) + 5 ruído de flexão (`-된/-적인/-일`).
- `lexicon-origin-findings.json`: 9 linhas de léxico futuro cobrado em item avaliado.

# Inventário — conteúdo educacional A0/A1/A2 no baseline `3103ce3`

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Números **medidos** em `data/inventory.json` (gerado por `tools/inventory.cjs` a partir
do dump real dos módulos de conteúdo), não transcritos de documentação.
B1 está fora: nenhum arquivo `src/content/curriculum/b1/**` ou
`src/content/vocabulary/b1-*.ts` foi lido ou contado.

## Arquivos de conteúdo no escopo

| Camada | Arquivos | Contagem |
|---|---|---|
| A0 Hangul — lições | `src/content/hangul/lessons/h01.ts … h25.ts` | 25 |
| A0 Hangul — checkpoints | `src/content/hangul/checkpoints/c1.ts … c4.ts` | 4 |
| A0 Hangul — inventário fonético | `src/content/hangul/jamo.ts`, `syllables.ts`, `rules.ts`, `outline.ts`, `types.ts`, `validate.ts` | 40 jamo · 151 sílabas · 148 palavras · 3 regras |
| A1 — lições | `src/content/curriculum/a1/lessons/a1-l01.ts … a1-l40.ts` (+ `shared.ts`) | 40 |
| A1 — checkpoints | `src/content/curriculum/a1/checkpoints/a1-c01.ts … a1-c08.ts` | 8 |
| A2 — lições | `src/content/curriculum/a2/lessons/a2-l01.ts … a2-l40.ts` (+ `shared.ts`) | 40 |
| A2 — checkpoints | `src/content/curriculum/a2/checkpoints/a2-c01.ts … a2-c08.ts` | 8 |
| Blueprint | `src/content/curriculum/{a1,a2}/blueprint.ts`, `ids.ts`, `types.ts`, `validate.ts`, `validate-content.ts` | 8 módulos · 40 lições · 8 checkpoints por curso |
| Vocabulário canônico | `src/content/vocabulary/index.ts`, `a1.ts`, `a1-course.ts`, `a2-m01.ts … a2-m08.ts`, `types.ts`, `validate.ts` | 976 entradas · 868 frases |
| Motor de correção (referência) | `src/lib/exercises/index.ts`, `src/lib/hangul/pronunciation.ts`, `src/lib/vocabulary/queue.ts` | usado para verificar, não auditado como conteúdo |

## Totais por curso

| Curso | Passos | Lições | Checkpoints | Exercícios | Falas | Blocos de gramática | Exemplos de gramática | Painéis de intro | Fechamentos | Entradas de vocab. | Frases contextuais |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A0 Hangul | 29 | 25 | 4 | 405 | — | 3 regras (23 pares escrito→falado) | 40 jamo | 89 | — | 133 | 25 |
| A1 | 48 | 40 | 8 | 615 | 240 | 164 | 328 | 125 | 163 | 443 | 443 |
| A2 | 48 | 40 | 8 | 615 | 240 | 86 | 172 | 93 | 160 | 400 | 400 |
| **Total** | **125** | **105** | **20** | **1.635** | **480** | **250 (+3 regras)** | **500 (+40 jamo)** | **218** | **323** | **976** | **868** |

Outras unidades auditáveis: `objective`/`titlePt` de cada lição (105),
`dialogueTitle` (80), `completion` (105 lições + 16 checkpoints), `summary` (323
pontos), campos `communicativeGoal`/`dialogueScenario`/`listeningObjective`/
`writingObjective` dos blueprints (40 por curso) e as 8 descrições de módulo.

## Exercícios por tipo

| Curso | mcq | cloze | listen | reading | translate | tipos de Hangul |
|---|---|---|---|---|---|---|
| A0 | 116 | 5 | — | 121 | — | `audio-to-char` 73 · `build-syllable` 57 · `minimal-pair` 24 · `char-to-audio` 9 |
| A1 | 79 | 183 | 132 | 124 | 97 | — |
| A2 | 101 | 125 | 132 | 132 | 125 | — |

Distribuição A1 e A2 **idêntica** ao declarado em `AGENTS.md`/`docs/roadmap.md`
(615 por curso; 132/132/125/125/101 no A2 e 79/183/132/97/124 no A1).

## Vocabulário

- 976 entradas: 133 `course: "hangul"` · 443 `ko-a1` · 400 `ko-a2`; **todas** `in-review`.
- 868 frases contextuais: 25 (Hangul) + 443 (A1) + 400 (A2).
- **108 entradas do Hangul não têm frase contextual** → em `/vocabulario/revisao`
  entram no modo `flashcard` e nunca no modo `context`
  (`src/lib/vocabulary/queue.ts:38-43`). Registrado como limite herdado.
- 0 colisões de `id × forma`, 0 reusos apontando para item apresentado depois,
  0 formas de dicionário `pos: verbo/adjetivo` sem `다`, 0 `audioText` sem Hangul,
  0 homógrafos sem `sense` dentro do inventário atual.
- 48 alvos de frase são flexão (não a forma de dicionário) — todos irregulares
  legítimos conferidos um a um (`듣다→들어요`, `맵다→매워요`, `춤추다→춤춰요`,
  `뵙다→뵈었어요`, ` 옮기다→ 옮겨` etc.).

## O que a documentação diz × o que o repositório tem

| Alegação | Medido | Resultado |
|---|---|---|
| A1 = 443 novas identidades, 443 frases, 615 exercícios | 443 · 443 · 615 | ✅ |
| A2 = 400 novas, 400 frases, 115 reusos distintos (515 ensinadas/retomadas), 615 exercícios | 400 · 400 · 115 (104 de A1 + 11 do Hangul) · 615 | ✅ |
| A1 = 52 reusos do Hangul (495 distintas) | 52 · 495 | ✅ |
| Hangul = 25 lições + 4 checkpoints | 25 · 4 | ✅ |
| "Typecheck + 549 Vitest + build + 612 Playwright verdes" | typecheck limpo; **543** testes em 35 arquivos nesta baseline; build OK | ⚠️ contagem de testes difere do registrado (não é defeito de conteúdo; ver `cross-level-findings.md` CL-08) |
| Todo coreano novo `in-review` | 976/976 entradas e todos os blocos de gramática/falas | ✅ |

## Volume revisado

Fichas de leitura geradas programaticamente: **5.811 itens** em 20 arquivos
(`data/sheets/`, regeneráveis). Cada achado cita o ID da linha, então a auditoria é
reproduzível sem depender das fichas versionadas.

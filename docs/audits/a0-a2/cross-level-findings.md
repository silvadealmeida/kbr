# Achados entre níveis (A0 → A1 → A2) e lacunas de validação

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Estes são os padrões que se repetem em vários lotes. São **mais baratos de corrigir
por regra** do que item a item, e são a razão pela qual os mesmos tipos de erro
aparecem em lições sem relação entre si.

## CL-01 — CRÍTICO · Gabarito de escolha-múltipla pode não existir entre as opções

- **Prova**: `data/structure-findings.json` (`mcq-answer-not-in-options: 1`) e a sonda
  do motor real em `data/engine-probe.json` → `C1_a2_l02_e01: algumaOpcaoPassa:
  [false,false,false]`.
- **Ocorrência**: `a2-l02-e01` (1 em 180 itens `mcq` de A1+A2).
- **Causa**: o par `(options, correctAnswer)` nunca é conferido. Os validadores
  (`src/content/curriculum/a2/validate-content.ts`, `.../a1/validate-content.ts`)
  checaram IDs, estágios, vocabulário, tags — não gabarito × opções. O motor corrige
  por texto: `src/lib/exercises/index.ts:256-263`.
- **Consequência**: lição com mínimo 8/10 fica matematicamente limitada a 9/10; se o
  aluno acertar as outras nove, reprova sem erro próprio.
- **Correção proposta**: (a) consertar a string; (b) adicionar ao validador a regra
  `mcq: options.includes(correctAnswer)` e um teste parametrizado sobre os 180 itens.
  Ver `correction-proposals.md` C-01 e C-02.

## CL-02 — CRÍTICO · Ninguém verifica a frase resultante de um `cloze`

- **Prova**: `tools/analyze-particles.cjs` preenche a lacuna com o gabarito e confere
  a alomorfia da partícula que cola na resposta. Resultado no corpus: **2 itens**
  errados — `a1-l11-e06` e `a1-c03-e13` (`제 언니은…`, deveria ser `제 언니는…`).
- Sonda do motor: `C2_a1_l11_e06` → `aceitaGabarito: true`, `aceitaFormaCorreta: false`.
- **Causa**: o validador compara só `answer` com o padrão da lacuna. Uma resposta que
  gera ungramaticalidade passa.
- **Correção proposta**: regra nova no validador (alomorfia 은/는, 이/가, 을/를, 과/와
  na junção lacuna × resposta) + teste sobre os 313 `cloze` de A1+A2.
  Ver C-03/C-04.

## CL-03 — MAJOR · Resposta digitada exige pontuação idêntica (regressão só no A2)

- **Prova**: `data/typed-normalization.json` — 794 itens de produção digitada;
  **126 aceitam apenas a forma pontuada exata**, todos em A2; **0 em A1**.
- `normalize()` (`src/lib/exercises/index.ts:141`) não remove pontuação. O A1 publica
  sistematicamente a variante sem ponto em `acceptedAnswers`; o A2, não.
- **Efeito no aluno**: coreano correto digitado sem ponto final vira erro. Em lição
  com mínimo 8/10, isso é reprovatório.
- **Correção**: normalizar pontuação no motor **ou** completar `acceptedAnswers`.
  Como mexer no motor mudaria todos os cursos, a fase de correção deve preferir a
  segunda opção (126 strings) e levar a primeira para discussão de arquitetura.
  Ver C-05.

## CL-04 — MAJOR · Ditado pede um constituinte e cobra a frase inteira (65 itens)

- **Prova**: `data/listen-prompt-findings.json` — 264 itens `listen`; **65** têm
  enunciado do tipo "escreva o número / a idade / a ação / o horário…" e nenhum
  `acceptedAnswers` que seja fragmento do gabarito. Distribuição: 20 em A1, 45 em A2,
  em 48 passos diferentes.
- Independente disso, **o gabarito de `listen` é sempre o `audioText` literal**
  (0 divergências em 264) — a transcrição está coerente; o problema é o enunciado.
- **Correção**: padronizar enunciado de `listen` para "escreva a frase que você
  ouviu" (ou aceitar o fragmento pedido). Ver C-06.

## CL-05 — MAJOR · Marcos gramaticais cobrados antes de existir no blueprint

Primeira ocorrência em material **avaliado** antes de qualquer material
**apresentacional** e sem declaração no `grammar` do blueprint:

| Marco | 1ª cobra em | 1ª ensina | Declarado em |
|---|---|---|---|
| `-지만` | `a2-l01-e06` (distrator) | `a2-l04` | `a2-l04` |
| `-(으)ㄹ 거예요` | `a2-l02-e06` (distrator) | `a2-l06` | `a2-l06` (como revisão) |
| `-라고 하다` (relato de fala de terceiro) | `a2-l16-e10`, `a2-c04-e10` | nunca | **não existe** — `a2-l31` declara só `-라고 생각해요` (opinião) |
| `-았/어야 했어요` ("deveria ter feito") | `a2-l04-d4/e07` | nunca em l01–l05 | só em `a2-l09`/`a2-l12` como `-아/어야 하다` (presente) |
| `-(으)ㄹ 때` | `a2-l19-e10`, `a2-c04-e12` | `a2-l32`/`a2-l34` (texto) | **não existe** |
| discurso indireto (`보라고 했어요`, `끝내겠다고 했어요`, `좋아한다고 대답했습니다`) | `a2-l22/l23/l25`, `a2-c05-e12` | nunca | **não existe** em A1 nem A2 |
| `-면서` | `a2-l40-e02` (cloze, produção) | apenas input incidental em `a2-l24`/`a2-l39` | **não existe** |
| `-(으)로` como meio | `a2-l06-e10` | `a1-l22` (ensinado antes, ok) | — |
| `에` em ponto de encontro com `만나요` | `a1-l25-e02/e06` (texto) | — | ensinado **errado** (CL-06) |

Reprodutível com `tools/analyze-progression.cjs` + os `grammar` de
`src/content/curriculum/{a1,a2}/blueprint.ts`. Ver C-08.

## CL-06 — CRÍTICO · Duas regras do A1 contradizem o próprio curso

1. **`극장 앞에 만나요`** (`g:a1-l25-appointment`) ensina `에` para ponto de encontro de
   ação, enquanto `g:a1-l23-place` ensina `사거리에서 만나요` com a explicação certa
   ("`에서` … onde a ação acontece"). `만나다` é ação → `에서`.
2. **`O nome próprio não recebe 이에요`** (`a1-l01-e03 X`) é falso como regra; a
   própria lição diz antes "o som final decide a forma". `제 국적은 브라질이에요`
   (`a1-l02`) usa nome próprio + `이에요`.
Ver C-09 e C-10.

## CL-07 — MAJOR · Léxico canônico pode estar ancorado na palavra errada

`src/content/vocabulary/validate.ts` só exige que `target` ocorra uma vez e no início
de palavra. **Início ≠ palavra inteira**: `감기` dentro de `감기약` passa. Dois casos
medidos em `data/target-inside-word.json` (16 frases com alvo dentro de palavra
maior, das quais 3 com mudança de sentido):

- `ko:따라서` — frase `규칙을 따라서 행동하세요` = `따르다` + `-아/서` ("seguindo a
  regra"), não o conectivo "portanto". A tradução pt afirma "Portanto, aja conforme
  as regras." → **CRÍTICO** (V2-001).
- `ko:감기` — frase `감기약 있어요?`: o alvo aparece só dentro de `감기약`; a glosa
  "resfriado" não é o que a frase diz.
- `ko:안` (Hangul, "dentro") × `안` da negação A1 (`a1-l09`) e `이해가 안 돼요`
  (`a1-l40`): a mesma forma existe com dois sentidos e o esquema de IDs só separa
  homógrafos com `#sentido` **criados antes da publicação**; hoje não há colisão de
  ID, mas há risco de reuso enganoso em `reusedIds`.
- `ko:일` (numeral "um", A1) reusado em `a2-l21` cujo texto usa `일` como
  "trabalho"; o cartão SRS mostrará "um".
Ver C-11, C-12, C-13.

## CL-08 — Documentação de teste × repositório

Nesta baseline `npx vitest run` fecha **35 arquivos / 543 testes**; `AGENTS.md` e
`docs/roadmap.md` registram **549** para a fase 10A–10H. Diferença de contagem de
testes, não de conteúdo — mas é o tipo de drift que faz um agente seguinte confiar
num número que não reproduz. Nenhuma ação de conteúdo; registrar na próxima
atualização de roadmap.

## CL-09 — MINOR · `pos` não tem "adjetivo" e numerais viram substantivo

`src/content/vocabulary/types.ts:3` define `substantivo | verbo | pronome |
advérbio | interjeição | numeral`.형용사 coreanos (`맵다`, `바쁘다`, `어렵다`…) entram
como `verbo`, e `일 년` como `substantivo`. Não é erro de coreano: é o metadado
perdendo uma distinção que as próprias frases do curso exibem (`이 음식은 매워요`).
Mudar o enum é mudança de schema compartilhada com o B1 → **fora desta fase**.
Ver C-14 (nota, não correção).

## CL-10 — MINOR · Elenco de personagens entra antes da lição que os apresenta

`수진`/`마르코` estreiam em `a2-l06`/`a2-l11` e já aparecem em `a2-c01-e12`
(checkpoint do módulo 1, que só cobre `a2-l01…l05`). Padrão a checar nos demais
checkpoints durante a fase de correção. Ver C-15.

## CL-11 — MINOR · Gênero inventado na tradução

`친구`/`동생` não marcam gênero, e o A1/A2 traduzem consistentemente como "amiga"/
"meu irmão" (ex.: `a2-l01-d2`, `a2-l03-e10`, `a2-c01-e21`). Quando o contexto coreano
não decide, a tradução decide por ele. Ver C-16.

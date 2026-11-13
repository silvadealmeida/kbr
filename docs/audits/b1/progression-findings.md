# B1 — achados de progressão (Fase 12B)

IDs canônicos em `data/findings.json`. Regra da 12A mantida: **cobrança prematura** (forma exigida em gabarito/produção antes de qualquer ensino) é defeito; **input prematuro** (forma apenas em texto de leitura/diálogo) é dívida documentada, não violação. Heurística de máquina: `progression-findings.json` (mapa `markerFirstSeen` com `taught`/`gradedAnswer`/`gradedAny` + censo `markerB1`), sempre confirmada na fonte.

## MAJOR — forma cobrada em gabarito sem nunca ter bloco de ensino

| ID | Forma | Cobrança | Censo B1 | Observação |
|---|---|---|---|---|
| M012 | `-(으)ㄹ 때` | **l23-e03** (ditado) | **28×** em 15 lições + c05(2)/c08(1) | Removido da cobrança do A2 pela 12A; reaparece como gabarito sem bloco — regressão direta de decisão documentada. Só input prévio: 1× diálogo a2-l35. |
| M013 | `-마다` | l22-e06 (gabarito mcq), **c05-e13** (ditado), **c05-e17** (cloze `마다`), **c05-e28** (pt-ko) | 9× | Nunca ensinado em A1/A2/B1; cloze obriga a produzir a partícula. |
| M014 | `-(으)ㄹ게요` | l07-e05 (pt-ko gabarito+aceite), **l17-e03** (ditado) | 16× (l03:1, l07:7, l16:1, l17:4, l20:1, l37:2) | Zero títulos de gramática em todos os blueprints; só `드릴게요` chunk no A2. l07-e05 ainda rejeita a variante ensinada (`정리할 거예요`). |
| M016 | `-뿐` restritivo | **l17-e08** (ditado `세 개뿐이에요`) | 3× (só o próprio item) | Frase fora do diálogo da lição; aluno transcreve forma desconhecida. |
| M015 | `-(을)를 통해` | **l19-e08** (ditado) | 5× | Contradiz o cartão `숙달` da própria lição (`반복 연습으로…` — b1-m04.ts:39); única exposição prévia = exemplo isolado a2-l36. |
| M015 | `-(으)시기를 바랍니다` | **l28-e03, l38-e03** (ditado) | 13× (l28:4, l38:9) | Existe só como fala do diálogo/e-mail-modelo; sem bloco. Menos grave que `통해` (input na mesma lição), mas cobra escrita de construção formal não ensinada. |
| M011 | `-라고` citação/`-(으)ㄹ 거라고` | **l11-e08** (ditado `갈 거라고 생각해요`) | 22× | l03 ensinou `-다고/-냐고`, l14 `-라고 해도` (concessão, outra função), l22 `-라고들`. A dívida `-라고 하다` removida do A2 na 12A nunca foi paga. Chunk incidental `뭐라고 했어요?` (l03-d02) não é ensino. |
| M010 | `-(으)ㄴ다면` hipótese presente | **c01-e05** (ditado) + **c01-e24** (pt-ko) | — | l04 ensinou `-았/었으면` e `-더라면`; a frase `시간을 되돌릴 수 있다면 좋겠어요` vira gabarito duplo do c01. |
| M025 | `-ㅁ`, `-므로`, `-(으)ㄹ수록`, `-(으)ㄹ지`, `-자` propositivo | l13 **promptKo de produção** (`확대하자는 제안`); inputs l17-e10, l26-e10, l15-e04, l37-e10 | — | Só o `-자` do promptKo é cobrança; os demais entram como dívida de input. |

## MAJOR — léxico de lição futura cobrado em item avaliado (transcrição exige escrever a palavra)

| ID | Palavra (origem) | Cobrada em |
|---|---|---|
| M008 | `최우선` (só l37) | c02-e06, c02-e24 |
| M008 | `분담` (só l37) | c04-e06, c04-e19 |
| M009 | `정책`, `기준`, `평가`*, `접근성`*, `문자`, `견적`, `업체`, `이용자` | c03-e05/e06, c06-e06, l37-e03/e02 |

\* `평가`/`접근성` têm cartão, mas posterior ao checkpoint (l16/l29 vs c03). Base: `lexicon-origin-findings.json` + grep de origem em `src/content/vocabulary/`. Mesma classe da dívida `answerNotTaught` do A2 (20/69 na 12A) — primeira medição para B1. O analisador registra 38 ocorrências brutas de `answerNotTaught` (heurística com falsos positivos de flexão); as acima são as reverificadas na fonte.

## Input antes do ensino — dívida a registrar (não violação)

- **N019** `-다는 점에서` em reading da l11 (bloco só l15; parcial cobertura via `-다고` l03).
- **N020** `-기에는` em reading da l15 (bloco l26; junto de `-므로`/`-다고 볼 수 있다`).
- **U014** `대피하다` cobrado em ditado sem apoio situacional (l27).
- O cluster `-(으)ㄹ 때` (M012) também carrega ~22 ocorrências de input além do gabarito.

## Dívida de dados de progressão

- **M022** — `reusedIds`: 65/164 refs (39,6%) sem superfície no texto da lição (`findUnusedReusedRefs`). A 12A congelou baseline de A1/A2 (297); B1 nunca foi incluído. Promessa pedagógica de retomada lexical inflada em ~40%.
- **N021** — c02 aceita `맡을 수밖에 없었어요` (forma de l18) como variante — inofensivo para correção, mas revela pressuposto de conhecimento fora do escopo do checkpoint.

## Relação com as dívidas da 12A

| Dívida 12A (A2) | Estado em B1 |
|---|---|
| `-(으)ㄹ 때` removido da cobrança | **Reincidente em gabarito** (M012) — exige decisão: bloco na l23 ou reescrita |
| `-라고 하다` removido da cobrança | **Reincidente em gabarito** (M011) |
| `-면서` sem ensino | Não reincidente: ganhou bloco em a2-l40; B1 usa como input coberto |
| `-았/어야 했어요` não cobrado antes | Não reincidente em B1 |

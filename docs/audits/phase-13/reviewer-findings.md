# Fase 13C — achados granulares da revisão assistida por IA

> **Ledger histórico.** Os achados e estados abaixo descrevem a auditoria 13C. A revisão editorial
> final assistida por IA foi aceita pelo responsável pelo projeto; não houve revisão nativa. O
> risco sistêmico remanescente é aceito e não bloqueia o release.

Este documento complementa `findings.json` com os IDs usados na revisão módulo a módulo. **Nenhum item foi validado por falante nativo.** Status:

- `fixed` — correção aplicada e testes verdes.
- `deferred` — correção editorial pendente; não bloqueia os testes.
- `native` — exige decisão de falante nativo/editor.

## C1 — módulos 1–4

| ID | Local | Achado | Severidade | Status |
|---|---|---|---|---|
| C1R-001 | c1-l19, grammar/cloze | `회의는 … 시작하십니다` usa honorífico com sujeito inanimado | Critical | fixed |
| C1R-002 | c1-l12 reading/grammar/listen | `-ㄹ 여지가 다분하다` invertia a ressalva | High | fixed |
| C1R-003 | c1-l10 reading | `보도와 인도` são sinônimos; faltava `차도` | High | fixed |
| C1R-004 | c1-l13 grammar | `-ㄴ/는 즉` tratado como terminação; `즉` é advérbio | High | fixed |
| C1R-005 | c1-l13 reading | `계약을 부결하다` — colocação incorreta | Medium | fixed |
| C1R-006 | c1-l08 grammar | Forma `-는 근거로` com verbo/adjetivo sem `-다는` | Medium | fixed |
| C1R-007 | c1-m02 `메우다` | `이유를 메우다` — colocação incorreta | Medium | fixed |
| C1R-008 | c1-m02 `맞먹다` | Comparava `우려` com `설문 결과` | Medium | fixed |
| C1R-009 | c1-l18 pt | “primeiro… e depois” onde o coreano diz “antes de” | Medium | fixed |
| C1R-010 | c1-l17 pt | `축복` traduzido como “voto” | Medium | fixed |
| C1R-011 | c1-l13 pt | “levá-lo à deliberação” ausente no original | Medium | fixed |
| C1R-012 | c1-m03 `시행일` | Glosa misturava expedição e vigência | Low | fixed |
| C1R-013 | c1-m03 `별첨` | “anexo apartado” não é pt-BR idiomático | Low | fixed |
| C1R-014 | c1-m02 `어조` | “o tom avalia” — deslizamento metonímico | Low | fixed |
| C1R-015 | c1-l02 grammar | `바` glosado como “papel”; exemplo com `준` | Low | fixed |
| C1R-016 | c1-l01 reading | Negação pesada de `-고자 하다` | Low | fixed |
| C1R-017 | c1-m02 `교차하다` | “conclusões se cruzam” ambíguo | Low | fixed |

## C1 — módulos 5–8

| ID | Local | Achado | Severidade | Status |
|---|---|---|---|---|
| C1R-101 | c1-l22 reading | “적정 수준을 넘었다고 보기 어렵다” invertia o custo | High | fixed |
| C1R-102 | c1-l30 mcq | Duas alternativas gramaticais; regra sobre ordem mal explicada | High | fixed |
| C1R-103 | c1-l27 mcq | `가운데서` é variante aceita, mas foi tratada como erro | High | fixed |
| C1R-104 | c1-l35/c1-c07 | Tradução invertia “o efeito não está isento” | High | fixed |
| C1R-105 | c1-l24 grammar/mcq | Regra dizia que `-ㄹ지라도` não aceita ordem/pedido | Medium | fixed |
| C1R-106 | c1-l21 production | `원인은 …에 기인한다` circular | Medium | fixed |
| C1R-107 | c1-l33 dialogue | `같은 만큼` não é colocação padrão | Medium | fixed |
| C1R-108 | c1-l31 intro | Sujeito truncado com `입장에서는` | Medium | fixed |
| C1R-109 | c1-l21 grammar | Restrição falsa sobre `기인하다` e origem física | Medium | fixed |
| C1R-110 | c1-l39/c1-c08 | `-도록 고치다` usado com ação do editor, não efeito | Medium | fixed |
| C1R-111 | c1-m07 `검수` | Exemplo contradizia a distinção `자문`/`검수` | Medium | fixed |
| C1R-112 | c1-l32 reading | `환언` negava a própria definição | Low | fixed |
| C1R-113 | c1-l21 grammar | `부족한 점` redundante | Low | fixed |
| C1R-114 | c1-m05 `반문하다` | `근거를 반문하다` — regência incorreta | Low | fixed |
| C1R-115 | c1-l40/c1-c08 | `-는 가운데` com sequência do mesmo sujeito | Low | fixed |
| C1R-116 | c1-l38 grammar | Negação de `-고자 하다` pouco natural | Low | fixed |
| C1R-117 | c1-m08 `관철` | PT perdia “opinião minoritária” | Low | fixed |

## C2 — módulos 1–4

| ID | Local | Achado | Severidade | Status |
|---|---|---|---|---|
| C2R-001 | c2-l16 grammar | `-ㄹ 맛이 나다` não é o padrão dos exemplos | High | fixed |
| C2R-002 | c2-l16 reading pt | Tradução só do primeiro parágrafo | High | fixed |
| C2R-003 | c2-l17 reading pt | Tradução só do primeiro parágrafo | High | fixed |
| C2R-004 | c2-l11 pt | Premissa falsa tratada como conclusão falsa | High | fixed |
| C2R-005 | c2-c04 sample | `이용자에게 통지 의무` invertia o obrigado | Medium | fixed |
| C2R-006 | c2-l09 reading | `예의가 아니라` vs. “não apenas” | Medium | fixed |
| C2R-007 | c2-l03 pt | Pergunta negativa invertia a expectativa | Medium | fixed |
| C2R-008 | c2-l15 translate | `deve` vs. `촉구합니다` | Medium | fixed |
| C2R-009 | c2-l04 pt | Faltavam as frases sobre quem pode recusar | Medium | fixed |
| C2R-010 | c2-l05 | Citação `검토` vs. `결정` divergente | Medium | fixed |
| C2R-011 | c2-l11 grammar | Forma `-ㄴ/는 전제하에` vs. `-다는` | Medium | fixed |
| C2R-012 | c2-l08 promptKo | `clarity` em inglês no enunciado coreano | Medium | fixed |
| C2R-013 | c2-c03 sample | `등교길` → `등굣길` | Low | fixed |
| C2R-014 | c2-l15 pt | “sustentar o que vem depois” invertia `그 뒤를 받치다` | Low | fixed |
| C2R-015 | c2-l14 translate | “acesso público” vs. `공공 통로` | Low | fixed |
| C2R-016 | c2-m02 `단상` | “anotar numa impressão” anticomático | Low | fixed |

## C2 — módulos 5–8

| ID | Local | Achado | Severidade | Status |
|---|---|---|---|---|
| C2R-101 | c2-l22 reading | `월 40시간` vs. `주 40시간` | High | fixed |
| C2R-102 | c2-l31/c2-c07 sample | Sujeito de `중재하다` atribuído à associação | High | fixed |
| C2R-103 | c2-l31/c2-c07 | `것으로 남기다` não é colocação natural | Medium | fixed |
| C2R-104 | c2-l31 reading | `두 개 동` mistura classificadores | Medium | fixed |
| C2R-105 | c2-l36 grammar | `참여자는 … 설정이다` — falta `를` | Medium | fixed |
| C2R-106 | c2-l25 sample | `사람은 … 책임이 따른다` — sujeito incorreto | Medium | fixed |
| C2R-107 | c2-l38 listen | Atribuía ao pesquisador fala da banca | Medium | fixed |
| C2R-108 | c2-l26 listen | Atribuía a Dohyeon fala de Harin | Medium | fixed |
| C2R-109 | c2-l37/l39 dialogue | Oração citada + `이다` | Medium | fixed |
| C2R-110 | c2-l38/c2-c08 cloze | Fragmento `…답변한.` | Medium | fixed |
| C2R-111 | c2-c07 reading | Tradução invertia a direção dos custos | Medium | fixed |
| C2R-112 | c2-l32 pt | “aumentar 1,4 vez” ambíguo | Medium | fixed |
| C2R-113 | c2-l29 reading | `폐항` com `노선` | Low | fixed (Fase 14) |
| C2R-114 | c2-l25 grammar | `재현을 보장` vs. `재현성` | Medium | fixed |
| C2R-115 | c2-l22 reading | Dupla marcação causal `이유가 … 때문` | Low | fixed |
| C2R-116 | c2-l39 reading | `메모는 … 표현이다` | Low | fixed |
| C2R-117 | c2-l21 pt | “tamanho da amostra” vs. taxa de resposta | Low | fixed |
| C2R-118 | c2-m06 `패러디` | “reescrever como paródia” | Low | fixed |
| C2R-119 | c2-l37 grammar | `-고자 하다` descrito como honorífico | Low | fixed |
| C2R-120 | c2-l37/c2-c08 | `요구를 부정하다` — colocação | Low | fixed |

## B2 — amostra

| ID | Local | Achado | Severidade | Status |
|---|---|---|---|---|
| B2R-001 | b2-l11 production | `참석곤 했어요` agramatical | Critical | fixed |
| B2R-002 | b2-l32 dialogue/reading | 50/50 com “fracasso improvável” | High | fixed |
| B2R-003 | b2-l35 reading | Sujeito do engano trocado | High | fixed |
| B2R-004 | b2-l24 dialogue | `단정할 여지` invertia a cautela | High | fixed |
| B2R-005 | b2-l35 grammar/cloze | `-는 체하다` em vez de `-는 척하다` | High | fixed |
| B2R-006 | b2-l33 | `장애` ambíguo para “obstáculo” | Medium | fixed |
| B2R-007 | b2-l12 | `접근하다` com `을/를` | Medium | fixed |
| B2R-008 | b2-l01 | `꿈으로 돌아서다` | Medium | fixed |
| B2R-009 | b2-l11 | `체면이 상하다` | Medium | fixed |
| B2R-010 | b2-l34 grammar | `명사 + -거나` | Medium | fixed |
| B2R-011 | b2-l04 grammar | `-았/었을 텐데` restrito a contrafactual | Medium | fixed |
| B2R-012 | b2-l04 reading | `배운 것을 만회하다` | Medium | fixed |
| B2R-013 | b2-l14 | `문제는 직면했다고` | Medium | fixed |
| B2R-014 | b2-l04 pt | Frase inventada e omissão do final | Medium | fixed |
| B2R-015 | b2-l35 dialogue | `당신` e falta de relato | Medium | fixed |

## A1/A2/B1 — spot-check

| ID | Local | Achado | Severidade | Status |
|---|---|---|---|---|
| A1-001 | a1-l11-e01 | `제 어머니이에요` | Critical | fixed |
| A1-002 | a1-l40/a1-c01 | Atribuição de fala invertida | High | fixed |
| A1-003 | a1-c08-e30 | `성함이 뭐예요?` como fórmula honorífica plena | Low | fixed |
| A2-001 | a2-c01/a2-c08 | Altura e personalidade ambas diferentes | Medium | fixed |
| A2-002 | a2-l12 | `화장실을 하다` | Medium | fixed |
| A2-003 | a2-l40/a2-c08 | `것이 자신 있어요` | Medium | fixed |
| A2-004 | a2-l01 | `좋았겠어요` traduzido sem inferência | Low | fixed |
| B1-001 | b1-l16 | `맡다` traduzido como “garantir” | Medium | fixed |
| B1-002 | b1-l20 | `실수를 해명하다` | Low | fixed |
| B1-003 | b1-c01 | “hipótese passada” vs. desejo | Low | native |

## Itens que permanecem para revisão humana

- Naturalidade de todo o coreano, honoríficos, registro, ironia e traduções.
- Validade pedagógica, carga cognitiva e calibração dos limiares.

## Resolvidos na Fase 14

- `폐항` com `노선` (C2R-113): `폐항` passou a nomear apenas o fechamento do porto; linhas passaram a usar `운항이 중단되다`/`폐지`.
- Coerência de quantos bilhetes existem em c2-l26/l27: o conto passou a ter dois bilhetes (um antigo e um novo), sem um terceiro na gaveta.
- Pistas de comprimento (F13-012): 237 itens acima de 1,7× foram corrigidos e há teste permanente em `tests/content/phase14-fairness.test.ts`. Ainda **não** há revisão nativa das escolhas editoriais.

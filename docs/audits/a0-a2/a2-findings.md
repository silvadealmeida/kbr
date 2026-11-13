# Achados A2 — consolidação

Lotes de origem: `a2-m01`…`a2-m08`, `vocab-a2`.

Baseline auditado: `3103ce3` (branch `audit/a0-a2-linguistic`). Este arquivo consolida; as fichas
completas de cada lote estão em `data/findings/*.md`, e o índice de todos os cursos em
`data/findings-index.md`.

Registros: **97** (CRÍTICO 2 · MAJOR 25 · MINOR 65 · INCERTO 5).
Grupos distintos (mesmo item/sveridade, quando dois revisores cobriram o lote): **89**
(CRÍTICO 2 · MAJOR 25 · MINOR 57 · INCERTO 5).

## Como ler a coluna **Verificação**

- `CONFIRMADO` — o orquestrador reproduziu o fato no repositório (leitura da fonte, analisador
  determinístico ou o motor real de correção em `src/lib/exercises`).
- `REJEITADO` — a alegação não se sustenta; o achado **não** entra nas propostas de correção.
- vazio — achado de revisor de lote, ainda não re-verificado individualmente (coberto pela
  revisão do lote; ver `coverage-ledger.md`).

## CRÍTICO (2)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A2M1-001 | a2-m01 | ``a2-l02-e01` [mcq/guided]` | Gabarito de MCQ fora das opções | alta | **CONFIRMADO** — probe do motor: nenhuma das três opções casa com `correctAnswer`. |
| V2-001 | vocab-a2 | `sent:a2-l32:따라서 (card ko:따라서)` | `따라서` (= "portanto") é ensinado com frase onde a string é `따르다`+`-아/서`, e a tradução afirma "Portanto" onde o coreano não diz isso | alta | **CONFIRMADO** — `src/content/vocabulary/a2-m07.ts:27`: alvo '따라서' numa frase de 따르다 + -아/서; tradução inventa 'Portanto'. |

## MAJOR (25)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A2M1-002 | a2-m01 | ``a2-l05-g2/ex`` | Exemplo de -는데 é agramatical no uso | alta | — |
| A2M1-003 | a2-m01 | ``a2-l04-d4`, `a2-l04-g2/ex`, `a2-l04-e07`` | Estrutura `-았/어야 했어요` cobrada sem ensino prévio | alta | — |
| A2M1-004 | a2-m01 | ``a2-l01-e06`, `a2-l02-e06`` | Marcos de lições futuras usados como distratores | média (a sugestão exata de distrator merece escolha editorial) | — |
| A2M2-001 | a2-m02 | `a2-l06-e05 (paradigma; ver Impacto)` | Itens translate exigem a pontuação final exata; a variante sem ponto é rejeitada | alta | **CONFIRMADO** — medição programática (tools/analyze-typed-normalization.cjs). |
| A2M2-002 | a2-m02 | `a2-l06-g1` | FORM "-려고 해요" omite a variante -으려고, mas a própria lição usa 쌓으려고 | alta | **CONFIRMADO** — `a2-l06.ts:53` FORM '-려고 해요' × diálogo `:46` '쌓으려고'. |
| A2M2-003 | a2-m02 | `a2-l08-e06` | Distrator "잔 후에" é forma ortograficamente inexistente (correcto: 잰 후에) | alta | **REJEITADO** — '잔 후에' é forma regular de 자다 (자 + ㄴ); a alternativa proposta pelo revisor ('잰 후에') é que não existe. Distrator válido. |
| A2M2-004 | a2-m02 | `a2-l07-e02 e a2-c02-e20` | Cloze sem acceptedAnswers rejeita variantes válidas (는 것이 / 주어야) | média | — |
| A2M3-001 | a2-m03 | `a2-l13-d5` | “삼 층이에요.” com espaço não padrão; ditado rejeita a grafia correta “삼층” | alta | **PREMISSA CORRIGIDA** — '삼 층' é a forma de princípio (한글 맞춤법 제43항; 온라인가나다 336486); o defeito real é o ditado aceitar só a variante espaçada e rejeitar '삼층이에요'. |
| A2M3-002 | a2-m03 | `a2-l14-g1` | FORM “radical + -는데(요)” omite o alomorfe adjetival -(으)ㄴ데, mas o exemplo exige ㅂ irregular | alta | **CONFIRMADO** — `a2-l14` FORM 'radical + -는데(요)' × exemplo '시끄러운데요' (requer -(으)ㄴ데 + irregular ㅂ). |
| A2M3-003 | a2-m03 | `a2-l14-d3` | tradução de a2-l14-d3 acrescenta “demais” que contradiz “um pouco” e não está no coreano | alta | **CONFIRMADO** — fonte a2-l14.ts:38: '조금 시끄러워서' → 'um pouco barulhento demais'. |
| A2M3-004 | a2-m03 | `a2-l15-e05` | ditado pt-ko rejeita a construção transitiva padrão “친구들을 그리워요” | média | — |
| A2M4-001 | a2-m04 | `a2-l16-e10; a2-l19-g2/ex (exemplo 2); a2-l19-e04; a2-c04-e10` | Discurso indireto de ordem (`-(으)라고 하다`) cobrado em itens avaliados antes de ser ensinado | alta | **CONFIRMADO** — grep em A1+A2: nenhum `라고 하다` declaradado; blueprint só declara `-라고 생각해요` em `a2-l31` (opinião, outro marco). |
| A2M4-002 | a2-m04 | `a2-l19-e10; a2-c04-e12` | `-(으)ㄹ 때` aparece pela primeira vez já em texto avaliado (l19-e10 / c04-e12) | média | **CONFIRMADO** — '-(으)ㄹ 때' nunca declarado no blueprint A1/A2; primeira ocorrência em texto avaliado. |
| A2M5-001 | a2-m05 | `a2-l22-e10, a2-l23-e10, a2-l25-e04, a2-c05-e12` | Discurso indireto avaliado nunca foi ensinado em A1/A2 | alta | **CONFIRMADO** — mesmo padrão de A2M4-001, agora no módulo 5. |
| A2M5-002 | a2-m05 | `a2-l23-e05` | Item "formal" aceita resposta informal no gabarito | alta | **CONFIRMADO** — a2-l23-e05: enunciado pede registro formal; acceptedAnswers inclui a variante 해요체. |
| A2M6-001 | a2-m06 | ``a2-l30-g1` (e `a2-l30-g1/ex` ×2, `a2-l30-e02`)` | FORM `-았/었고` contradiz os próprios exemplos e a lógica do relato em sequência | alta | **CONFIRMADO** — `a2-l30-g1` FORM '-았/었고' × exemplos e o cloze `e02` ('바다를 보고'). |
| A2M6-002 | a2-m06 | ``a2-l28-e04` [reading/guided], `a2-c06-e09` [reading/independent]` | Leitura cobra discurso indireto `-(으)ㄴ다고/겠다고 했어요` nunca ensinado | alta | **CONFIRMADO** — '-다고 하다' fora do blueprint; item de leitura depende dele. |
| A2M6-003 | a2-m06 | ``a2-l29-e07` [cloze/independent], `a2-c06-e19` [cloze/independent]` | Cloze rejeita variantes aceitas pelo próprio app (`면`, `는 것이`) | alta | **CONFIRMADO** — cloze com alvo único e sem variantes, enquanto o item-irmão aceita variantes. |
| A2M7-001 | a2-m07 | `a2-l33-e02` | Cloze só aceita `계세요` e rejeita a variante padrão `계셔요` | alta | **CONFIRMADO** — probe: '계셔요' rejeitado; '-(으)세요/-(으)셔요' são 복수 표준어 (온라인가나다 323080). |
| A2M7-002 | a2-m07 | `a2-l33-e07` | Cloze só aceita a forma cheia `뵈었어요` e rejeita a contração padrão `뵀어요` | alta | **CONFIRMADO** — probe: '뵀어요' rejeitado; contraction padrão (한글 맞춤법 제35항 붙임 2: 뵈었다→뵀다). |
| A2M7-003 | a2-m07 | `a2-l32-e03` | Ditado cobra `-(으)ㄹ 것 같으면`, combinação jamais apresentada como FORM | média (é ditado a partir de linha visível do diálogo, com tradução ao lado; cada morfema foi visto isolado: `-ㄹ` em l06 `-(으)ㄹ 거예요`, `-면` em l10, `-는 것 같다` em l31) | — |
| A2M7-004 | a2-m07 | `a2-l35-e06` | Distrator "항상 그렇지 않아요" também evita generalização absoluta (dois gabaritos defensáveis) | média | — |
| A2M8-001 | a2-m08 | `a2-l40-e02 (cloze); apoio: a2-l40-g1/ex1, a2-l40-d2, a2-l40-e04, a2-l40-e10, a2-c08-e20` | `-면서` (simultaneidade) é cobrado em produção sem nunca ter sido ensinado | alta | **CONFIRMADO** — '-면서' ausente do blueprint A1/A2; cobrado em produção. |
| A2M8-002 | a2-m08 | `a2-c08-e12 (reading)` | "지우는 해외에서 산 적이 없어요" é ambíguo e não é a forma natural do marco de experiência | média | **CONFIRMADO** — '해외에서 산 적이' lê-se 사다; o marco ensinado em `a2-l02` é '살아 본 적이'. |
| V2-002 | vocab-a2 | `ko:일 (declaração de retomada em a2-l21; conteúdo em a2-l04/l13/l14/l21/l22/l23/l36/l39 e a2-c01/c05/c08)` | identidade `ko:일` (numeral "um", A1) é retomada em lição que usa `일` no sentido "trabalho/coisa"; homógrafo sem `sense` deixa o cartão antigo ambíguo | alta (o par cartão/conteúdo é verificável no repo); média quanto à preferência entre criar cartão novo vs. remover a retomada | **CONFIRMADO** — `ko:일` existe só como numeral; A2 usa a forma como 'trabalho' (p. ex. `a2-l21` reusedIds). |

## MINOR (57)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A2M1-005 | a2-m01 | ``a2-l01-d2`, `a2-l01-e01 X`, `a2-l01-e05`, `a2-c01-e21`` | Tradução fixa gênero onde o coreano não fixa | alta | — |
| A2M1-006 | a2-m01 | ``a2-l01-d6`` | `-겠-` de suposição sem nota | média | — |
| A2M1-007 | a2-m01 | ``a2-l04-e09`, `a2-c01-e23`` | Redundão e ponto de vista na tradução de causa | alta | — |
| A2M1-008 | a2-m01 | ``a2-l03-e10`` | Comparação com sujeito indefinido | alta | — |
| A2M1-010 | a2-m01 | ``a2-c01-e12`` | Personagens de lições futuras no checkpoint | alta | — |
| A2M2-005 | a2-m02 | `a2-l07-e09 (apresentação em a2-l07-d4)` | -(으)ㄹ/는 것 같다 é cobrado em l07 sem nota gramatical; taught declarada só em a2-l31 | alta | — |
| A2M2-006 | a2-m02 | `a2-l08-g1` | "-기 전에 não recebe passado" é generalização excessiva | média | — |
| A2M2-007 | a2-m02 | `a2-l07-e09` | acceptedAnswer de l07-e09 inverte o grau de 조금 ("cedo demais") | alta | — |
| A2M2-008 | a2-m02 | `a2-l06-g2/ex1 (paradigma)` | 취업하다 traduzido como "procurar emprego"; 경력을 쌓다 como "acumular experiência" | média | — |
| A2M2-009 | a2-m02 | `a2-l09-g3` | "suavize com -아/어야 해요" confunde registro com força modal | alta | — |
| A2M2-010 | a2-m02 | `a2-l10-g1` | g1 de l10 descreve a ordem da condição ao contrário | alta | — |
| A2M2-011 | a2-m02 | `a2-l07-e10 (paradigma)` | substantivos cobrados em itens antes do registro vocabular (ou nunca registrados) | média | — |
| A2M2-012 | a2-m02 | `a2-l10-e09` | pt-BR de gabarito/fala truncado ou pouco idiomático | média | — |
| A2M3-005 | a2-m03 | `a2-l13-d4` | “어느 층에 사세요?” soa artificial; o padrão para andar é “몇 층” | média | — |
| A2M3-006 | a2-m03 | `a2-l14/intro` | painel “Pedido negativo com -지 말다” usa frase que não contém -지 말다 | alta | — |
| A2M3-007 | a2-m03 | `a2-l11-g1` | explicação de -는 게 diz “contraída de 이/가” quando é a contração de 것이 | alta | — |
| A2M3-008 | a2-m03 | `a2-l11-e09` | “보증금이 너무 비싸요”: colicação duvidosa (depósito é “alto”, não “caro”) | média | — |
| A2M3-009 | a2-m03 | `a2-l15-d1` | -(다)면서요 (ouvir dizer) aparece na conversa antes de qualquer lição de discurso reportado | média | — |
| A2M3-010 | a2-m03 | `a2-c03-e11` | enunciado de a2-c03-e11 pergunta “a mudança”, mas o texto só informa o tempo da embalagem | alta | — |
| A2M4-003 | a2-m04 | `a2-l18-d6` | l18-d6: matiz de `-아/어 보다` + `-면 되다` não bate com a pergunta de duração em português | média | — |
| A2M4-004 | a2-m04 | `a2-l16-g1; a2-l16-g1/ex (exemplo 2 "기침이 나고 콧물이 있어요.")` | l16-g1: exemplos misturam `있어요` com a collocation padrão `나다` (콧물이 있어요) | média | — |
| A2M4-005 | a2-m04 | `a2-l19-g1` | l19-g1: campo FORM omite o `-(으)면`, que é a forma ensinada | alta | — |
| A2M4-006 | a2-m04 | `a2-l17-g1/ex; a2-l17-d2; a2-l17-e01/e02 X; a2-l16-e01 O2 (ecoa em l19/l20 e c04)` | PT "lombar" sozinho soa clínico para `허리` nas traduções recorrentes | média | — |
| A2M5-003 | a2-m05 | `a2-l23-g1` | Regra de `-ㅂ니다/-습니다` sem a exceção dos radicais em `-ㄹ` | alta | — |
| A2M5-004 | a2-m05 | `a2-l21-d5` | Tradução de `재미있어요` altera sentido e acrescenta camada | alta | — |
| A2M5-005 | a2-m05 | `a2-l21/intro (2º painel)` | Painel de introdução explica `에서/에` de forma incoerente com o exemplo | alta | — |
| A2M5-006 | a2-m05 | `a2-l22-e04` | Explicação do gabarito cita frase diferente do texto avaliado | alta | — |
| A2M5-007 | a2-m05 | `a2-l23-e04` | X cita forma com `-는 편이다` não ensinada e ausente do texto avaliado | média (o uso é coreano natural e correto; o problema é exclusivamente pedagógico) | — |
| A2M5-008 | a2-m05 | `a2-l23-g1, a2-l23/intro (1º painel), a2-l23-d1` | Registro formal ensinado sem explicar a convivência `-(으)ㅂ니다` × `-(으)세요/-시겠어요` | média | — |
| A2M5-009 | a2-m05 | `a2-l24-e10` | `-면서` simultâneo nunca ensinado e `듣기를 공부해요` pouco idiomático | média | — |
| A2M5-010 | a2-m05 | `a2-l24-d6 (ecoada em a2-l24-e09)` | Frase de encorajamento soa como promessa de resultado | média (juízo de registro/promessa, não de gramática) | — |
| A2M5-011 | a2-m05 | `a2-l25-d3` | "언제까지 할 수 있어요?" pouco natural para pergunta de prazo | média (INCERTO-adjacente: aceitável no uso coloquial) | — |
| A2M5-012 | a2-m05 | `a2-l21-e08, a2-l22-e01, a2-l23-e06, a2-l25-e09, a2-c05-e01, a2-c05-e02` | Lexias nucleares do módulo sem cartão de vocabulário | alta (cheque mecânico) | — |
| A2M5-013 | a2-m05 | `a2-l21-g2` | `-부터 -까지` reensinado como novo; "기 nominalização" prometida só aparece em l25 | alta | — |
| A2M6-004 | a2-m06 | ``a2-l26-g1`, `a2-l26/intro` (painel "Pedido cortês ao serviço")` | FORM/título de `-는지` não descrevem as frases ensinadas | alta | — |
| A2M6-005 | a2-m06 | ``a2-l26-d3`, `a2-l26-d5`, `a2-l27-d2`, `a2-l27-d6`, `a2-l28-d2`, `a2-l28-d4`, `a2-l28-d6`` | Registro do funcionário alterna 합쇼체/해요체 dentro do mesmo turno | média | — |
| A2M6-006 | a2-m06 | ``a2-l27-g2`` | Afirmação sem base: "-는 동안에 é mais específico" | média | — |
| A2M6-007 | a2-m06 | ``a2-l28-d4`` | `아마 … 있을 수 있어요` não é a combinação natural de conjectura | média | — |
| A2M6-008 | a2-m06 | ``a2-l28/intro` (painel "Pedir solução com -겠-"), `a2-l28-g2`` | Rótulo "-겠- de solicitação" sem exemplo de solicitação | alta | — |
| A2M6-009 | a2-m06 | ``a2-l27-e03`, `a2-c06-e02` [listen]` | Ditado `십이 번` não aceita a grafia colada corrente | média | — |
| A2M6-010 | a2-m06 | ``a2-l26-d1`` | `무슨 도움이 필요하세요?` menos idiomático para balcão | média | — |
| A2M6-011 | a2-m06 | ``a2-l26-e10` [reading/independent], `a2-c06-e12`` | `-(으)ㄹ 때` aparece pela primeira vez cobrado em item sem ensino | média | — |
| A2M6-012 | a2-m06 | ``a2-l30` — linha de vocabulário (fonte, não está na ficha)` | `사건` em relato de viagem tem viés de ocorrência policial | média | — |
| A2M7-005 | a2-m07 | `a2-l31-d3` | Avaliação de filme assistido ontem no presente (`어려운 것 같아요`) e tempo da tradução | baixa-média (não é erro claro; variante defensável) | — |
| A2M7-006 | a2-m07 | `a2-l35-g1/ex (primeiro par de exemplos)` | Exemplo 1 de g1 em l35 não ilustra o FORM declarado (`A보다 B가 더 / B는 A처럼`) | alta (sobre a inconsistência), baixa (sobre a frase substituta — precisa revisão nativa) | — |
| A2M7-007 | a2-m07 | `a2-l31-e06` | "Qual frase expressa opinião?" tem distrator avaliativo (`영화가 길어요`) | média | — |
| A2M7-008 | a2-m07 | `a2-l35-e05` | Higiene de dados: `acceptedAnswers` idêntico à resposta (tradução l35-e05) | alta | — |
| A2M7-009 | a2-m07 | `a2-l33-g2, a2-l34-g2` | Campos FORM não-formula em 2 blocos ("formas humildes/honoríficas", "contexto + contraste") | média | — |
| A2M8-003 | a2-m08 | `a2-c08-e02 (listen)` | gabarito-canônico do ditado viola a regra de 띄어쓰기 de contagem "한 번" | alta | **CONFIRMADO COM AJUSTE** — a grafia de contagem '한 번' é a de princípio; em '다시 한번' o 국립국어원 unificou (2015) com 붙여쓰기 — ver references.md. |
| A2M8-004 | a2-m08 | `a2-c08-e22 (cloze)` | cloze de experiência cobra "-(으)ㄴ 적이" em vez do marco ensinado "-아/어 본 적이", inconsistente com e32 | média | — |
| A2M8-005 | a2-m08 | `a2-c08-e18 (reading)` | enunciado traduz "자료" como "dados" (falso-cognato pt) | alta | — |
| A2M8-006 | a2-m08 | `a2-l37-e04 (reading)` | forma de discurso relatado "-(으)ㄹ다고 했어요" em item avaliado sem marco ensinado | média | — |
| A2M8-008 | a2-m08 | `a2-l37 (g1/g2/intro/dialogue todos), cobrança em a2-c08-e25` | blueprint promete "-아/어야 하다 revisado" em l37, mas o lote inteiro não revisa a obrigação (e o c08 cobra) | alta | — |
| A2M8-009 | a2-m08 | `a2-l36-e10 (reading)` | "-기도 해요" em item avaliado de l36 sem ensino prévio (leitura de gist, inferível) | alta (quanto à ausência); baixa quanto à necessidade de mudança. | — |
| V2-003, V2-004 | vocab-a2 | `ko:출근/ko:퇴근/ko:귀가/ko:불가능/ko:해결/ko:정리/ko:답례/ko:항의/ko:진찰/ko:처방/ko:복용/ko:근무/ko:합격/ko:대답/ko:입사/ko:퇴사/ko:승진/ko:인사/ko:찬성/ko:동의/ko:화해/ko:기대/ko:격려/ko:성장/ko:회상/ko:만족/ko:습득/ko:추천/ko:비교/ko:성공/ko:실패/ko:` | sistemático: 39 cards substantivo usam alvo flexionado verbal (`출근해요`, `해결했어요`, …) enquanto pares N+하다 equivalentes (`외식`, `쇼핑`, `낚시`, `자취`) usam a forma de dicionário | alta (padrão verificável); é consistência, não correção de idioma | **CONFIRMADO COMO PADRÃO** — inconsistência de metadado (alvo flexionado × lema nominal); nenhuma id canônica muda. |
| V2-005, V2-006, V2-007, V2-008, V2-009, V2-010, V2-011, V2-012 | vocab-a2 | `ko:어쩔 수 없어요` | `어쩔 수 없어요` entra como forma canônica flexionada (polida) e `pos=interjeição` | alta (diagnóstico); a correção de id é que é cara | — |
| V2-013 | vocab-a2 | `ko:사례 (l13) vs 사례("exemplo/caso"); ko:인사 (l23) vs 인사("RH", contexto 부서/채용 de l21–l22); ko:자세 (l19) vs 자세히("em detalhes", frase de ko:설명하다 l32); ko:적 (l02) vs eventuais 적(敵)/sufixo -적 (menor)` | homógrafos expostos por frases do A2 sem cartão `#sense` (watch-list de prevenção, sem colisão atual) | alta (é política de prevenção, não achado de idioma) | — |

## INCERTO (5)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A2M1-009 | a2-m01 | ``a2-l01-d5`, `a2-l01-g1` (que exemplifica `피크닉했어요`), `a2-c01-e01`` | `피크닉을 했어요` × colgação com `하다` | baixa (decisão editorial) | — |
| A2M2-013 | a2-m02 | `a2-l07-g2/ex1 (também a2-l07-d5, a2-l07-e03, a2-c02-e12)` | "만나기로 해요" (presente) para registrar o acordo pode soar a calque de "만나는 걸로 해요" | baixa | — |
| A2M6-013 | a2-m06 | ``a2-l26-d2`, `a2-l26-g2/ex`, `a2-l26-e01`, `a2-l26-e04`, `a2-l26-e05`, `a2-l26-e07`, `a2-c06-e07`, `a2-c06-e16`, `a2-c06-e21`` | `이틀 연박` ↔ "duas noites": contador de noites é `박` | baixa | — |
| A2M8-007 | a2-m08 | `a2-l40-d1 (fal:line), a2-l40-e10 (reading)` | transliteração "에이 투" para "A2" (grafia/pronúncia de código alfanumérico) | baixa | — |
| V2-014 | vocab-a2 | `ko:회상 (l36), ko:여정 (l30), ko:습득 (l28), ko:연박 (l26), ko:투숙객 (l26), ko:조식 (l26), ko:근황 (l38), ko:장래 (l39), ko:시작점 (l40), ko:비전 (l39)` | carga lexical acima do piso típico de A2 em ~10 itens (jargão/literário); não marquei erro porque são palavras reais | baixa—média | **MANTIDO COMO INCERTO** — carga lexical sem corpus de frequência citado pelo revisor; nada alterado. |


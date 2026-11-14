# Achados A1 — consolidação

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Lotes de origem: `a1-m01`…`a1-m08` (m01–m05 com duas revisões independentes), `vocab-a1`.

Baseline auditado: `3103ce3` (branch `audit/a0-a2-linguistic`). Este arquivo consolida; as fichas
completas de cada lote estão em `data/findings/*.md`, e o índice de todos os cursos em
`data/findings-index.md`.

Registros: **173** (CRÍTICO 6 · MAJOR 51 · MINOR 110 · INCERTO 6).
Grupos distintos (mesmo item/sveridade, quando dois revisores cobriram o lote): **164**
(CRÍTICO 6 · MAJOR 49 · MINOR 103 · INCERTO 6).

## Como ler a coluna **Verificação**

- `CONFIRMADO` — o orquestrador reproduziu o fato no repositório (leitura da fonte, analisador
  determinístico ou o motor real de correção em `src/lib/exercises`).
- `REJEITADO` — a alegação não se sustenta; o achado **não** entra nas propostas de correção.
- vazio — achado de revisor de lote, ainda não re-verificado individualmente (coberto pela
  revisão do lote; ver `coverage-ledger.md`).

## CRÍTICO (6)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A1M1-001 | a1-m01-v2 | ``a1-l01-e03` [cloze/guided]` | Gabarito ensina que nome próprio não recebe `이에요` (regra falsa) | alta | **CONFIRMADO** — `src/content/curriculum/a1/lessons/a1-l01.ts:269` (prosa) × `:142` (regra correta da própria lição). |
| A1M1-002 | a1-m01-v2 | ``a1-l03-e09` [mcq/independent]` | MCQ de partícula com duas opções igualmente corretas | alta | **CONFIRMADO COM SEVERIDADE AJUSTADA** — duas opções defensáveis em `a1-l03-e09`; reclassificado de CRÍTICO para MAJOR (ambiguidade de avaliação, não coreano errado). |
| A1M1-001 | a1-m01 | `a1-l01-e03` | Regra falsa ensinada na explicação de um item: "nome próprio não recebe 이에요" | alta | **CONFIRMADO** — `src/content/curriculum/a1/lessons/a1-l01.ts:269` (prosa) × `:142` (regra correta da própria lição). |
| A1M3-001 | a1-m03-v2 | `a1-l11-e06; a1-c03-e13` | cloze com partícula fixa errada: gabarito "언니" produz o coreano ungramatical "제 언니은 선생님이에요" | alta | **CONFIRMADO** — analisador determinístico + motor: gabarito aceita e imprime '제 언니은'; '언니는' é rejeitado. |
| A1M3-001 | a1-m03 | `a1-l11-e06` | Cloze cujo preenchimento com o gabarito gera partícula errada: `언니은` | alta | **CONFIRMADO** — analisador determinístico + motor: gabarito aceita e imprime '제 언니은'; '언니는' é rejeitado. |
| A1M5-001 | a1-m05-v2 | `g:a1-l25-appointment e g:a1-l25-appointment/ex` | ponto de encontro com 만나요 exige 에서, não 에: "극장 앞에 만나요" ensina coreano errado | alta | **CONFIRMADO** — contradição interna com `a1-l23` ('사거리에서 만나요') + norma 에/에서. |

## MAJOR (49)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A1M1-003 | a1-m01-v2 | ``a1-l01-d5` vs `a1-l02-d5`, `a1-l02-e04`, `a1-c01-e07`` | Minsu é apresentado como estudante e como funcionário no mesmo módulo | alta | **CONFIRMADO** — contradição de elenco/perfil no mesmo módulo (l01 'funcionário' vs 'estudante'). |
| A1M1-004 | a1-m01-v2 | ``a1-l02-e03` [listen/guided]` | Enunciado pede um fragmento, gabarito exige a frase inteira | alta | — |
| A1M1-005 | a1-m01-v2 | ``a1-l03-d4`` | Deixis inconsistente no diálogo: resposta com `이것` sobre objeto de quem ouve | média (a deixis coreana admite flexibilidade discursiva — ver | — |
| A1M1-006 | a1-m01-v2 | ``a1-l04/intro` [intro] e `g:a1-l04-location` [gram]` | Ordem "lugar + 에 + coisa + 있어요" apresentada como regra única | alta | — |
| A1M1-007 | a1-m01-v2 | ``a1-l04-e07` [reading/independent]` | Comitativo `과` cobrado em item avaliado sem nunca ter sido ensinado | alta | — |
| A1M1-008 | a1-m01-v2 | ``a1-c01-e11` [reading/independent]` | Mini-diálogo avaliado troca os papéis do reparo | alta | — |
| A1M1-009 | a1-m01-v2 | ``a1-l05-e04` [reading/guided]` | `네, 천천히 말해요.` não é aceitação natural de um pedido | média (linha compreensível; o desvio é de força ilocucionária) | — |
| A1M1-010, A1M1-005 | a1-m01-v2, a1-m01 | ``a1-l01-e08`, `a1-l01-e09`, `a1-l02-e05`, `a1-l02-e08`, `a1-l02-e10`, `a1-l04-e05`, `a1-l04-e09`, `a1-l04-e10`, `a1-c01-e24`, `a1-c01-e25`` | Escrita produtiva aceita uma única cadeia exata (ordem e elisão válidas rejeitadas) | alta | — |
| A1M1-011 | a1-m01-v2 | ``a1-l05-e03`, `a1-l05-e08`, `a1-c01-e05` (e o cartão `ko:주세요`)` | Variante normativa de espaçamento em `-아/어 주세요` é rejeitada | alta | — |
| A1M1-002 | a1-m01 | `a1-l03-e09` | `mcq` aceita duas conclusões gramaticais: "저것___ 의자예요" (은 vs 이) | média | **CONFIRMADO COM SEVERIDADE AJUSTADA** — duas opções defensáveis em `a1-l03-e09`; reclassificado de CRÍTICO para MAJOR (ambiguidade de avaliação, não coreano errado). |
| A1M1-003 | a1-m01 | `a1-l02-e03, a1-c01-e02, a1-c01-e04` | Enunciados de `listen` pedem um fragmento, gabarito exige a frase inteira | alta | **CONFIRMADO** — contradição de elenco/perfil no mesmo módulo (l01 'funcionário' vs 'estudante'). |
| A1M1-004 | a1-m01 | `a1-l04-e07` | Item de leitura cobra partícula comitativa `-과` nunca ensinada (lição 4) | alta | — |
| A1M1-006 | a1-m01 | `a1-c01-e11` | Mini-diálogo avaliado com papéis de reparo invertidos | média | — |
| A1M2-001 | a1-m02-v2 | `g:a1-l07-time-particle` | Regra de `에` com 오늘/내일/어제 ensina uma opção que a norma rejeita e manda "praticar as duas formas" | alta | **CONFIRMADO** — a1-l07.ts:81 ensina 'ênfase' com 에 para 오늘/내일/어제; ênfase é com 는, e a própria lição usa 오늘은/내일은. |
| A1M2-002 | a1-m02-v2 | `a1-l09-e09` | Item de ditado cobra `봐요` (contração ㅜ) nunca ensinada, e rejeita `보아요`, forma plena válida | alta | — |
| A1M2-003 | a1-m02-v2 | `a1-l06-e08 (padrão; também a1-l07-e08, a1-l08-e03, a1-l09-e03, a1-l10-e03, a1-c02-e01, a1-c02-e03, a1-c02-e04, a1-c02-e06)` | Sistema: enunciados de `listen` pedem um fragmento ("o número", "a ação", "a idade") mas o gabarito exige a frase inteira | alta | — |
| A1M2-004, A1M2-005 | a1-m02-v2, a1-m02 | `a1-l09-e02` | Cloze sem restrição semântica: qualquer verbo já ensinado completa "저는 별로 안 ___" | alta | — |
| A1M2-005 | a1-m02-v2 | `a1-l08-e05 (padrão; também a1-l08-e10, a1-l09-e05, a1-l10-e05, a1-l10-e10, a1-c02-e24, a1-l07-e05)` | Traduções pt→ko rejeitam variantes que o próprio curso ensina como livres (omissão de 저는; ordem tempo/lugar) | média-alta | — |
| A1M2-006 | a1-m02-v2 | `a1-l08-e09 (padrão; também a1-l09-e10, a1-l10-e09, a1-c02-e25, a1-l07-e09)` | Traduções ko→pt exigem a string portuguesa canônica e rejeitam variantes normais do pt-BR (sujeito nulo, próclise, adjunto antecipado) | média | — |
| A1M2-007 | a1-m02-v2 | `a1-l10-d4` | Diálogo apresenta "밤에 쉬어요" como imperativo ("Descanse"), forma nunca ensinada e traduzida como declarativa na própria lição | média-alta | — |
| A1M2-001 | a1-m02 | `a1-l06-e08` | Enunciado de `listen` pede um fragmento, mas o gabarito exige a frase inteira | alta | **CONFIRMADO** — a1-l07.ts:81 ensina 'ênfase' com 에 para 오늘/내일/어제; ênfase é com 는, e a própria lição usa 오늘은/내일은. |
| A1M2-002 | a1-m02 | `a1-l07-e05` | Itens `translate pt-ko` rejeitam variantes ensinadas no próprio curso | alta (l07-e05 e variantes sem `저는`); média (demais combinações de ordem) | — |
| A1M2-003 | a1-m02 | `a1-l08-e09, a1-l09-e10, a1-l10-e09, a1-c02-e25, a1-l07-e09` | Itens `translate ko-pt` rejeitam português sem-pronome e deixam lacunas de pontuação nos alts | alta | — |
| A1M2-004 | a1-m02 | `a1-l08-e10, a1-l10-e10` | “à noite” glossa tanto `밤에` quanto `저녁에`, e os itens pt-ko só aceitam `밤에` | alta | — |
| A1M3-002 | a1-m03-v2 | `a1-l15-d6; a1-l15-e10` | "기다려요" ensinado e corrigido como imperativo "espere", contradizendo a regra (으)세요 da própria lição (que lista "기다리세요") | alta | **CONFIRMADO** — dialogo d6 '조금 기다려요' glosado 'Espere um pouco.' e gabarito do cloze e10 = 기다려요; a lição ensina (으)세요 e a nota cita 기다리세요. |
| A1M3-003 | a1-m03-v2 | `g:a1-l11-possessive; a1-l11/intro (bloco "Posse com 의"); a1-l11/sum1` | "제" (contração de 저+의) descrito como OMISSÃO de 의, em três pontos da lição | alta | — |
| A1M3-004 | a1-m03-v2 | `a1-l11-e08; a1-l12-e03; a1-l13-e08; a1-l14-e03; a1-l15-e03; a1-c03-e02; a1-c03-e04; a1-c03-e05` | enunciados de listen pedem um constituinte ("a profissão/a relação/a ação..."), mas o gabarito e a correção são a frase inteira | alta (mecânica verificada no código) | — |
| A1M3-005 | a1-m03-v2 | `a1-l11-e05; a1-l11-e10; a1-l14-e05; a1-l14-e09; a1-l14-e10; a1-c03-e24; a1-c03-e25` | translate com gabarito único rejeita variantes coreanas/portuguesas válidas por omissão de pronome (sistema pro-drop) | média (exigir a forma-modelo completa pode ser intencional como produção guiada, mas a lição se contradiz ao ensinar a omissão) | — |
| A1M3-002 | a1-m03 | `a1-l15-e10` | Pedido polido testado em forma não-`-(으)세요`, rejeitando a forma que a própria gramática da lição promete | alta (inconsistência interna comprovada no fonte) | **CONFIRMADO** — dialogo d6 '조금 기다려요' glosado 'Espere um pouco.' e gabarito do cloze e10 = 기다려요; a lição ensina (으)세요 e a nota cita 기다리세요. |
| A1M3-003 | a1-m03 | `a1-l11-e08` | Itens de escuta pedem um constituinte, mas o gabarito exige a frase inteira | alta | — |
| A1M3-004 | a1-m03 | `a1-l11-e01` | Cloze "Complete com ‘mãe’" rejeita `엄마`, palavra conhecida e gramatical no vão | média | — |
| A1M4-001 | a1-m04-v2 | ``a1-l16-e05`, `a1-l16-e10`, `a1-l18-e05`, `a1-l20-e05`, `a1-l20-e10`, `a1-c04-e24`` | Itens pt-ko rejeitam variantes sem tópico que o próprio curso ensina | média (a austeridade pode ser escolha deliberada de grading; o conflito com a elipse ensinada é que a torna defensível como erro) | **CONFIRMADO** — fonte lida: pt-ko aceita apenas a frase com 저는; a elipse de tópico é ensinada em a1-l10. |
| A1M4-001 | a1-m04 | `a1-l16-e09 (também a1-l20-e09, a1-c04-e25)` | Tradução ko→pt exige pronome "Eu" explícito e rejeita a resposta mais natural em pt-BR | alta | **CONFIRMADO** — fonte lida: pt-ko aceita apenas a frase com 저는; a elipse de tópico é ensinada em a1-l10. |
| A1M4-002 | a1-m04 | `a1-l16-e05 (também a1-l16-e10, a1-l20-e05, a1-l20-e10, a1-c04-e24; parcialmente a1-l18-e10)` | Tradução pt→ko rejeita coreano sem sujeito (omissão canônica de 저는/나는) | média | — |
| A1M5-002 | a1-m05-v2 | `g:a1-l22-transport e a1-l22/intro` | regra de (으)로 omitida a exceção do ㄹ e contradiz seu próprio exemplo "지하철로" | alta | — |
| A1M5-003 | a1-m05-v2 | `a1-l21-e08 (padrão), a1-l23-e08, a1-l25-e08, a1-c05-e01, a1-c05-e02, a1-c05-e03` | enunciados de listen pedem "escreva o destino/horário/localização", mas o gabarito é a frase inteira | alta | — |
| A1M5-004 | a1-m05-v2 | `a1-l21-e05, a1-c05-e24` | tradução pt→ko rejeita variantes que o próprio curso ensina (omissão do tópico e ordem flexível) | alta | — |
| A1M5-005 | a1-m05-v2 | `a1-l21-e09 (padrão), a1-l24-e09, a1-l25-e09, a1-c05-e25` | acceptedAnswers ko→pt incompletos: pontuação não é normalizada e variantes sem pronome são rejeitadas | alta | — |
| A1M5-006 | a1-m05-v2 | `a1-l24-e01 (padrão), a1-l24-e06, a1-l24-e02` | clozes "Complete a instrução" aceitam uma única lacuna verbal embora outra instrução ensinada seja igualmente válida | alta (e01, e06); média (e02) | — |
| A1M5-001 | a1-m05 | `a1-l21-e08` | Enunciado de escuta pede só um dado, mas o gabarito exige a frase inteira | alta | **CONFIRMADO** — contradição interna com `a1-l23` ('사거리에서 만나요') + norma 에/에서. |
| A1M5-002 | a1-m05 | `a1-l21-e09` | Traduções ko-pt rejeitam variante legítima com sujeito omitido | média-alta (a rigidez é escolha determinística conhecida do app; o que se | — |
| A1M6-001 | a1-m06 | ``a1-l26-e03`, `a1-l27-e03`, `a1-c06-e01`, `a1-c06-e02`, `a1-c06-e03`` | Enunciado de `listen` pede um constituinte, mas o gabarito só aceita a frase inteira | alta (o conflito literal existe); o risco prático real é atenuado pela exposição repetida ao padrão desde l01 | **CONFIRMADO** — medição em todo o corpus: 65 itens de escuta com enunciado de constituinte e gabarito de frase inteira. |
| A1M7-001 | a1-m07 | ``a1-l31-e05`, `a1-l31-e09`, `a1-l31-e10`, `a1-l33-e09`, `a1-l33-e10`, `a1-l35-e05`, `a1-l35-e09`, `a1-l35-e10`, `a1-c07-e24`, `a1-c07-e25`` | `acceptedAnswers` rejeita variantes plenamente válidas (omissão de `저는` e pontuação) | alta | **CONFIRMADO** — mesmo padrão medido: 126 itens digitados de A2 + variantes de A1. |
| A1M8-003 | a1-m08 | `a1-l37-e01` | Cloze de partícula rejeita variante igualmente válida (은) | alta (gramaticalidade de “승강장은 어디예요?”) | — |
| V1-001 | vocab-a1 | `ko:크다 (representante; mesma marca em ko:작다, ko:예쁘다, ko:귀엽다, ko:재미있다, ko:조용하다, ko:활발하다, ko:친절하다, ko:바쁘다, ko:달다, ko:맵다, ko:맛있다, ko:배고프다, ko:배부르다, ko:비싸다, ko:빠르다, ko:느리다, ko:가깝다, ko:멀다, ko:어렵다,` | Esquema `pos` não tem "adjetivo/descritivo"; ~29 adjetivos (형용사) são ensinados como `verbo` | alta | **CONFIRMADO** — src/content/vocabulary/types.ts:3 não tem categoria 'adjetivo/descritivo'. |
| V1-002 | vocab-a1 | `ko:입어 보다` | Lema `입어 보다` grafado com espaço; a forma canônica é `입어보다` | alta | **REJEITADO** — auxiliares escrevem-se separados por princípio (한글 맞춤법 제47항: '입어 보다' princípio, '입어보다' permitido); a forma do app é a de princípio. |
| V1-003 | vocab-a1 | `sent:a1-l33:감기` | Frase de `감기` contém a palavra apenas dentro do composto `감기약`; validador não verifica fim de palavra | alta (caso), média (extensão do validador) | **CONFIRMADO** — `targetPosition` valida início de palavra, não fim: '감기약' contém '감기'. |
| V1-004 | vocab-a1 | `sent:a1-l36:돼지고기` | `돼지고기 없어요?` traduzido como "Você tem carne de porco?" inverte a polaridade da pergunta | média-alta | **CONFIRMADO** — frase '돼지고기 없어요?' glosada como pergunta afirmativa em pt. |
| V1-005 | vocab-a1 | `sent:a1-l23:사거리` | `만나요` lido/vertido como declarativo "Eu encontro" em cena de convite ("Vamos nos encontrar") | média-alta | — |

## MINOR (103)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A1M1-012 | a1-m01-v2 | ``a1-l01/intro` [intro]` | Intro diz que o registro polido "termina em -요" e a lição ensina `-ㅂ니다` | alta | — |
| A1M1-013 | a1-m01-v2 | ``a1-l01-e02` [mcq/guided]` | "termina em consoante (ㅇ)" confunde letra com som | alta | — |
| A1M1-014 | a1-m01-v2 | ``a1-l01-e06` [cloze/guided]` | Terminologia "tema" em vez de "tópico" | alta | — |
| A1M1-015 | a1-m01-v2 | ``g:a1-l02-which/ex` [gram-ex]` | Exemplo de `어느` já usa o demonstrativo `이` (ensinado só na lição 3) | média (é só um exemplo apresentado, não cobrado em item) | — |
| A1M1-016 | a1-m01-v2 | ``a1-l02-e03` [listen/guided]` | Gênero da tradução na explicação diverge da fala da personagem | alta | — |
| A1M1-017 | a1-m01-v2 | ``a1-l03-d1`` | `저기요` usado entre colegas que já se tratam pelo nome | média (varia com a situação; não é agramatical) | — |
| A1M1-018 | a1-m01-v2 | ``a1-l03-d3`` | `그리고` aparece em fala do primeiro contato, declarado só em `a1-l10` | alta | — |
| A1M1-019 | a1-m01-v2 | ``g:a1-l03-subject`, `a1-l03/intro`, `a1-l03-e03`` | Nenhuma nota sobre a forma falada `이게/그게/저게` | média (recomendação de material, não correção de forma) | — |
| A1M1-020 | a1-m01-v2 | ``a1-l03/sum2` [sum]` | Notação da resposta invertida no fechamento (`은/는 + objeto`) | alta | — |
| A1M1-021 | a1-m01-v2 | ``g:a1-l04-position` [gram]` | Bloco de posição promete `안/밖` sem FORM, exemplo ou prática | alta | — |
| A1M1-022 | a1-m01-v2 | ``g:a1-l05-request` [gram]` | FORM de `주세요` esconde a terminação `-아/어` | alta | — |
| A1M1-023 | a1-m01-v2 | ``a1-l05-d6`` | `민수.` solto num diálogo todo em registro polido; cenário reabre troca de nomes | média | — |
| A1M1-024 | a1-m01-v2 | ``a1-c01` [instructions]` | Instrução do checkpoint anuncia uma tarefa funcional que não existe no passo | alta | — |
| A1M1-025 | a1-m01-v2 | ``a1-c01-e07` (= `a1-l02-e04`), `a1-c01-e09` (= `a1-l03-e04`, mesma` | Checkpoint repete itens verbatim das lições | média (decisão pedagógica da equipe) | — |
| A1M1-007 | a1-m01 | `a1-l03-d4 (padrão de referência: a1-l03-d1/d2)` | Perspectiva dos demonstrativos inconsistente dentro do diálogo de l03 | média | — |
| A1M1-008 | a1-m01 | `a1-l02-e03` | Glosa em português com gênero inconsistente com o modelo da lição | alta | — |
| A1M1-009 | a1-m01 | `a1-l01/intro` | Painel de abertura afirma que o registro polido "termina em -요", mas o lote ensina fórmulas em -ㅂ니다 | alta | — |
| A1M1-010 | a1-m01 | `sent:a1-l05:말하다 (cartão), a1-l05-e04 (leitura)` | "Fale um pouco devagar" traduz forma declarativa `말해요`; aceitação "네, 천천히 말해요" é pragmaticamente frouxa | média | — |
| A1M1-011 | a1-m01 | `a1-l02-d4` | Negação de hiperônimo: `학생이에요?` → `아니요, 저는 유학생이에요` é logicamente instável para iniciantes | média (registro/naturalidade — precisa confirmação de revisor nativo) | — |
| A1M2-008 | a1-m02-v2 | `g:a1-l06-personal` | "나이가 몇 살이에요?" é redundante; o natural é "몇 살이에요?" (ou "나이가 어떻게 돼요?") | média | — |
| A1M2-009 | a1-m02-v2 | `a1-l07-e01` | Cloze a1-l07-e01 usa "지금", palavra não registrada em nenhum vocabulário anterior (Hangul ou A1 ≤ l10) | alta (verificada por busca em vocabulary/ e hangul/) | — |
| A1M2-010 | a1-m02-v2 | `a1-l07-e06` | Cloze "무슨 ___이에요?" sem pista permite "무슨 일이에요?" como coreano igualmente válido | alta | — |
| A1M2-011 | a1-m02-v2 | `g:a1-l09-frequency/ex2` | Exemplo isolado "저는 가끔 영화는 봐요." usa -는 contrastivo sem contraste, e a glossa pt o suprime; o vocabulário da lição usa a forma neutra | média | — |
| A1M2-006 | a1-m02 | `g:a1-l09-frequency/ex (2), a1-l09-d4, a1-l09-d5, a1-l09-e09` | `영화는 봐요`: partícula contrastiva `는` em frases de sentido neutro | média | — |
| A1M2-007 | a1-m02 | `a1-l09-e09 (também d4, d5, g:a1-l09-frequency/ex)` | `봐요` (irregular de ㅅ) cobrado em transcrição sem nunca ter sido sinalizado | alta (irregularidade), média (se a estratégia do curso é lexicalizar em silêncio — decidir e registrar) | — |
| A1M2-008 | a1-m02 | `a1-l10-d4` | `밤에 쉬어요.` traduzido como imperativo ("Descanse à noite") sem marca de pedido | média | — |
| A1M2-009 | a1-m02 | `a1-l08-d3, a1-l08-e04` | `그리고` cobrado em a1-l08 antes da declaração em a1-l10 | alta (factual), baixa (se é violação — o list de marcos do roteiro não inclui 그리고) | — |
| A1M2-010 | a1-m02 | `a1-l10-e07` | `열한 시` (11 horas) nunca ensinado, mas é a chave de resposta de um item de leitura | média | — |
| A1M2-011 | a1-m02 | `a1-l07-e06, a1-c02-e15` | `무슨 ___이에요?` aceita complemento legítimo fora do gabarito | média | — |
| A1M3-006 | a1-m03-v2 | `g:a1-l11-uri` | frase pt truncada/incompleta na nota de 우리 | alta | — |
| A1M3-007, A1M3-005 | a1-m03-v2, a1-m03 | `g:a1-l11-terms` | "동생 não marca gênero nem posição" é ambíguo e pode ser lido errado | alta (quanto à ambiguidade); impacto pequeno. | — |
| A1M3-008 | a1-m03-v2 | `a1-l15-d1; g:a1-l15-register (+ exemplo g:a1-l15-register/ex #1)` | "초대 감사합니다" como fórmula de chegada: padrão estabelecido é "초대해 주셔서 감사합니다" | média | — |
| A1M3-009, A1M3-009 | a1-m03-v2, a1-m03 | `g:a1-l13-position` | ordem "referência → posição → lugar" rotula mal o terceiro slot (é a partícula 에, não "lugar") | alta (quanto ao deslize); impacto baixo. | — |
| A1M3-010 | a1-m03-v2 | `g:a1-l13-rooms/ex; a1-l13-d4; a1-l13-e03; a1-c03-e22; (cartão "화장실")` | variante 은 vs 가 na pergunta "onde fica o banheiro" não sinalizada como válida (consistência) | média | — |
| A1M3-011 | a1-m03-v2 | `cartões a1-l12 de 크다, 작다, 예쁘다, 귀엽다, 재미있다, 조용하다, 활발하다, 친절하다 (usados como alvo em a1-l12-e01/e02/e06/e07/e10 e nos gram-ex)` | adjetivos (형용사) com pos "verbo" nos cartões de vocabulário, contra o texto da própria gramática |  | — |
| A1M3-006 | a1-m03 | `g:a1-l11-possessive` | Redução `저의 → 제` descrita como "omissão" de 의 | alta | — |
| A1M3-007 | a1-m03 | `g:a1-l15-honorific` | `드세요` glosado como "forma honorífica de oferecer", convidando confusão com `드리다` | média | — |
| A1M3-008 | a1-m03 | `a1-l15-d4` | Registro do diálogo usa honorífico de oferta entre colegas, contra o aviso da própria gramática | média | — |
| A1M3-010 | a1-m03 | `a1-l11-d2` | Traduções pt fixam gênero onde o coreano é neutro (선생님, 동생) | média | — |
| A1M3-011 | a1-m03 | `vocabulário a1-l12 (forma de dicionário, fora da ficha)` | Adjetivos do módulo com `pos: "verbo"` nos cartões de vocabulário | alta (é inconsistência taxonômica; não afeta correção de exercícios) | — |
| A1M3-012 | a1-m03 | `a1-l15-d1` | "초대 감사합니다" é fórmula truncada; padrão é "초대해 주셔서 감사합니다" | média | — |
| A1M3-013 | a1-m03 | `a1-l14-e09` | Tradução ko-pt acrescenta possessivo não presente e rejeita variantes fiéis | média | — |
| A1M3-014 | a1-m03 | `g:a1-l12-identify` | FORM da nota "Identificar uma pessoa" descreve padrão confuso | média | — |
| A1M4-002 | a1-m04-v2 | ``a1-l18-e08`` | `오천` cobrado em listen antes de ser ensinado | alta | — |
| A1M4-003 | a1-m04-v2 | ``a1-l19-e07`, `a1-c04-e10`` | `가게` usado em leitura avaliada duas lições antes de ser ensinado | alta | — |
| A1M4-004 | a1-m04-v2 | ``g:a1-l19-more` (e exemplos `g:a1-l19-more/ex`)` | FORM de `더` omite o adnominal `-(으)ㄴ` que a própria forma exige | alta | — |
| A1M4-005, A1M4-004 | a1-m04-v2, a1-m04 | ``a1-l17-d3`` | Tradução de `주스 드세요?` perde a função de oferta | média | — |
| A1M4-006 | a1-m04-v2 | ``g:a1-l18-pay`, `g:a1-l18-pay/ex`, `a1-l18/intro` (painel "Pagar")` | `카드 있어요?/현금 있어요?` com glosa literal enganosa | baixa (quanto ao coreano) / alta (quanto à glosa enganosa) | — |
| A1M4-007 | a1-m04-v2 | ``a1-l18-d5`, `a1-l18-d6`` | `현금이에요.` dito sem pergunta prévia de pagamento | média | — |
| A1M4-008 | a1-m04-v2 | ``g:a1-l18-price` (exemplo 2), `g:a1-l18-price/ex`, `a1-l18/intro` (painel "Preço")` | `전부 얼마예요?` é compreensível, mas rígido; glosa `Quanto é tudo?` literal | média | — |
| A1M4-009 | a1-m04-v2 | ``a1-l20-d4`` | `같이 먹어요.` declarativo traduzido como proposta `Vamos comer juntos.` | média | — |
| A1M4-010 | a1-m04-v2 | ``a1-c04` — campo `instructions` (fora da ficha; não há linha de item na sheet)` | Instruções do c04 citam "transação roteirizada" que não existe no checkpoint | alta | — |
| A1M4-003 | a1-m04 | `g:a1-l20-refuse (também a1-l20/intro "Recusar com 안", a1-l20/sum2, a1-l20-e07)` | Negação de -고 싶다 ensinada só com 안, sem a forma canônica -고 싶지 않아요 | média | — |
| A1M4-005 | a1-m04 | `g:a1-l18-price/ex, a1-l18/intro, a1-l18/sum2, vocab l18 "전부"` | "전부 얼마예요?" é atestável mas marcado; glosa PT "Quanto é tudo?" é literal | média | — |
| A1M4-006 | a1-m04 | `g:a1-l19-modifier` | Regra "Não use 은/는 entre o demonstrativo e o substantivo" é confusa junto dos exemplos | alta | — |
| A1M4-007 | a1-m04 | `g:a1-l17-hago` | Frase ambígua: "Ele não liga orações como 그리고" | alta | — |
| A1M4-008 | a1-m04 | `a1-l18-e05 (explicação X)` | Explicação de "얼마예요?" descreve -예요 como marcador de pergunta | alta | — |
| A1M4-009 | a1-m04 | `g:a1-l16-taste, a1-l16/intro "Sabor"` | Sabor descritos como "adjetivos" na gramática, mas registrados como "verbo" no vocabulário | alta | — |
| A1M4-010 | a1-m04 | `a1-l19-e10 (também a1-c04-e23)` | Item cobra produção de "보세요" sem formalizar -아/어 보세요 (chunk-only; padrão só vira gramática em A2) | média | — |
| A1M4-011 | a1-m04 | `a1-c04 (instructions)` | Instrução do checkpoint descreve um item de autoavaliação que não existe em a1-c04 | alta | — |
| A1M5-007 | a1-m05-v2 | `g:a1-l25-accept/ex` | exemplo sob a nota "좋아요 — aceitar" não contém 좋아요 | alta | — |
| A1M5-008 | a1-m05-v2 | `a1-l23/intro` | intro chama "tópico" ao sujeito marcado por 가: "Use o lugar como tópico: 역이 어디에 있어요?" | alta | — |
| A1M5-009 | a1-m05-v2 | `a1-l23-e07 (e seu X)` | "약국은 사거리에서 왼쪽에 있어요": para posição com 있다 o padrão é referência direta, sem 에서 | média | — |
| A1M5-010 | a1-m05-v2 | `g:a1-l22-route` | FORM "destino + transporte + duração" contradiz o exemplo e o corpo da própria nota | alta | — |
| A1M5-011, A1M5-003 | a1-m05-v2, a1-m05 | `g:a1-l24-action-please` | FORM "verbo + 주세요" omite o conector -아/어 | alta | — |
| A1M5-012 | a1-m05-v2 | `g:a1-l23-eseo/ex` | "여기에서 기다려요." traduzido como imperativo "Espere aqui." é mais forte que o original | média | — |
| A1M5-013, A1M5-007 | a1-m05-v2, a1-m05 | `a1-l22-e09` | "O que 걸리다 significa neste contexto?" sem contexto apresentado no item | alta | — |
| A1M5-014 | a1-m05-v2 | `a1-l24-e08 (e X; frase do vocabulário ko:횡단보도)` | "횡단보도로 건너세요." — o padrão ensinado para 건너다 é objeto + 를; 로 aqui é sentido não declarado | média | — |
| A1M5-015 | a1-m05-v2 | `a1-l24-e09, a1-l25-e09` | "어디예요?" circula primeiro nos exercícios sem bloco que o apresente | média | — |
| A1M5-016 | a1-m05-v2 | `g:a1-l25-refuse` | blueprint declara "미안하지만" para l25; a lição implementa "미안해요 + razão" (e -지만 nunca é ensinado em A1) | alta | — |
| A1M5-004 | a1-m05 | `a1-l23/intro (painel “Perguntar a localização”)` | Intro rotula de “tópico” uma frase com marcador de sujeito 이 | alta | — |
| A1M5-005 | a1-m05 | `a1-c05-e17` | Checkpoint rotula 계단으로 de “meio”, quando a lição o apresentou como caminho | alta | — |
| A1M5-006 | a1-m05 | `g:a1-l23-eseo/ex2` | Exemplo declarativo traduzido como imperativo (“Espere aqui.”) | média | — |
| A1M5-008 | a1-m05 | `g:a1-l22-duration/ex2` | “육십 분 걸려요” é marcação rara para naturalidade coreana | média | — |
| A1M5-009 | a1-m05 | `vocabulário a1-l22 (ko:빠르다, ko:느리다, ko:가깝다, ko:멀다) e a1-l25 (ko:미안하다, ko:가능하다)` | Vocabulário classifica adjetivos (빠르다/가깝다…) como “verbo” | alta (constatação) — a escolha de correção é de design do produto | — |
| A1M5-010 | a1-m05 | `a1-l21 OBJ/blueprint l21 e blueprint l23 (“에서 como origem”)` | Blueprint declara “origem” no módulo, e o conteúdo nunca a apresenta | alta | — |
| A1M6-002 | a1-m06 | ``g:a1-l27-questions`` | FORM da nota `g:a1-l27-questions` contém "질문 +", resquício do bloco acima | alta | **CONFIRMADO** — campo FORM de g:a1-l27-questions contém o fragmento '질문 +'. |
| A1M6-003 | a1-m06 | ``g:a1-l29-time`` | Explicação de `g:a1-l29-time` afirma regra sem sentido ("repetir o verbo no passado") | alta (a frase não descreve nenhuma propriedade verificável do coreano) | — |
| A1M6-004 | a1-m06 | ``a1-l27-d6`` | `a1-l27-d6` "괜찮아요. 연습해요." — leitura natural é declarativa, não "pratique" | média | — |
| A1M6-005 | a1-m06 | ``a1-l28-d4`/`a1-l28-d5`` | `a1-l28-d5` não responde à pergunta de `a1-l28-d4` | alta | — |
| A1M6-006 | a1-m06 | `frase `a1-l28` / `초대하다` (cartão `v:초대하다`)` | Frase-modelo de `초대하다` acrescenta possessivo que não existe no coreano | alta | — |
| A1M7-002 | a1-m07 | ``a1-l34-d4`` | pedido de permissão traduzido por interrogativa neutra | média (leitura pragmática dependente de contexto) | — |
| A1M7-003 | a1-m07 | ``a1-l31-e07`` | `찍었어요` usado em item avaliado da l31, ensinado só na l35 | alta (para a ocorrência), baixa (quanto ao peso: item não é | — |
| A1M7-004 | a1-m07 | ``g:a1-l34-boundary/ex` (linha da ficha `건강이 좋아요.`), frase vocab` | `스트레스가 있어요` / `건강이 좋아요`: collocations apresentadas como modelo, pouco idiomáticas | média | — |
| A1M7-005 | a1-m07 | `frase vocab `구경하다` (`a1-course.ts:425`)` | tradução de `시장을 구경했어요` desloca o sentido | alta | — |
| A1M7-006 | a1-m07 | ``a1-c07` bloco `instructions` (4º item)` | instrução do checkpoint anuncia tarefas de autoavaliação que não existem | alta | — |
| A1M8-001 | a1-m08 | `a1-l36-e09` | Tradução ko-pt principal inverte a polaridade da pergunta | média | **CONFIRMADO** — polaridade invertida na glosa ko-pt. |
| A1M8-002 | a1-m08 | `g:a1-l36-repair/ex e a1-l36-d4` | “Carne de porco não pode” é literal e enganosa para 돼지고기는 안 돼요 | média | — |
| A1M8-004 | a1-m08 | `a1-l36-e02` | Cloze rejeita a forma colada do auxiliar, permitida pela ortografia | alta (para a regra de orthography); a decisão de aceitar variantes é do | — |
| A1M8-005 | a1-m08 | `a1-l38-d3 (e g:a1-l38-so/ex)` | 사정 traduzido como “circunstância” produz frase literal em pt-BR | média | — |
| A1M8-006 | a1-m08 | `g:a1-l38-courtesy/ex e a1-l38-d5` | “Compreenda, por favor.” não espelha o registro de 양해해 주세요 | média | — |
| A1M8-007 | a1-m08 | `a1-l39-e03 (e a1-l39/intro, a1-l39-e09)` | “제 성격은 조용해요” é margem de naturalidade em coreano | média | — |
| A1M8-008 | a1-m08 | `a1-l36/compl (vocabulary block da lição; sem ID de linha na ficha)` | reusedIds de M8 declaram palavras que não ocorrem na lição | alta (verificação mecânica reproduzível) | — |
| A1M8-009 | a1-m08 | `g:a1-l36-* (conjunto de notas da lição)` | Blueprint l36 (“negação e desejo”; obj. “preferência”) não chega ao conteúdo de l36 | alta (discrepância documental reproduzível) | — |
| V1-006 | vocab-a1 | `ko:주세요, ko:앉으세요, ko:드세요, ko:괜찮아요, ko:죄송합니다, ko:아니에요, ko:뭐라고요, ko:잠깐만요, ko:도와주세요, ko:잠시만요, ko:환영합니다, ko:어서 오세요, ko:무슨 뜻이에요, ko:어떻게 말해요, ko:이해가 안 돼요, ko:문제없어요, ko:안녕하세요, ko:반갑습니다 (e cognatos)` | 20 entradas "forma de dicionário" são chunks flexionados/não-lema com `pos: interjeição` | alta (descrição), média (reclassificação) | — |
| V1-007 | vocab-a1 | `ko:어떤 (idem ko:어느, ko:다른)` | Determinantes `어떤/어느/다른` classificados como `pronome` (falta categoria "determinante/adnominal") | média | — |
| V1-008, V1-009, V1-011 | vocab-a1 | `ko:대신` | `대신` com `pos: advérbio`, mas o sentido ensinado é o de dependente/nome relacional | média | — |
| V1-010 | vocab-a1 | `sent:a1-l38:사정 ("사정이 있어요." → "Tenho uma circunstância."); sent:a1-l38:양해 ("양해해 주세요." → "Compreenda, por favor."); sent:a1-l34:조언 ("조언을 주세요." — coloção idiomática é 조언을 해 주세요 / 조언 좀 해 주세요; PT` | Glossas de tradução pouco naturais / deslocadas em frases de contexto | média | — |
| V1-012 | vocab-a1 | `ko:지연되다 / ko:노선 (frases sent:a1-l37:지연되다, sent:a1-l37:노선)` | `기차가 지연돼요` e `이 노선은 역에 가요`: aspecto/colocação questionáveis | média | — |
| V1-013 | vocab-a1 | `ko:원하다 / sent:a1-l20:원하다` | `원하다` ensinado por frase que soa calque ("저는 커피를 원해요") | média | — |
| V1-014 | vocab-a1 | `ko:증상, ko:두통/ko:기침/ko:알레르기 (aceitáveis), ko:참석하다, ko:사정, ko:양해, ko:변경, ko:환승하다/ko:승강장/ko:개찰구/ko:지연되다/ko:노선, ko:아름답다` | Carga lexical A1 acima do nível (termos clínicos/administrativos/formais e morfologia avançada) | média | — |
| V1-015 | vocab-a1 | `ko:일/ko:삼/.../ko:십 (8 numerais); contexto a1-l06: "제 전화번호는 일, 이, 삼이에요"; ko:열 (febre) vs. 열 (dez); ko:시 (hora) vs. 시 (poema/di); ko:팔 (braço, Hangul) vs. 팔 (oito)` | Sistema numeral incompleto em A1: `이`(2) e `팔`(8) sem carta; numerais nativos só por reconhecimento; risco futuro de homógrafo | alta (risco), média (documentação) | — |
| V1-016 | vocab-a1 | `— (varredura completa)` | Identidades quase-duplicadas entre cursos verficadas e limpas (registro positivo com ressalva) | alta | — |

## INCERTO (6)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A1M1-026 | a1-m01-v2 | ``a1-l01-e09`, `a1-c01-e24` (e o cartão `ko:선생님`)` | `저는 선생님이에요.`: autocaracterização com o sufixo de respeito `님` | baixa | — |
| A1M4-011 | a1-m04-v2 | ``a1-l19` — campo `vocabulary.reusedIds` (fora da ficha)` | L19 reusa cartões de vocabulário que não aparecem na lição | baixa | — |
| A1M5-011 | a1-m05 | `sent:a1-l24:나가다` | “여기에서 나가세요.” → “Saia por aqui.”: origem ou rota? | baixa | — |
| V1-017 | vocab-a1 | `sent:a1-l23:층` | Espaçamento `삼 층` (vs. grafia usual `3층`/`삼층`) | baixa | — |
| V1-018 | vocab-a1 | `sent:a1-l32:햇빛` | `햇빛이 좋아요` — o idioma meteorológico é `햇볕이 좋다` | baixa | — |
| V1-019 | vocab-a1 | `ko:초대 / sent:a1-l15:초대` | `오늘은 초대가 있어요` naturalidade duvidosa como "tenho um convite" | baixa | — |


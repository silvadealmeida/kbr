# Vocabulário canônico Hangul (A0) — achados da revisão (ficha `vocab-hangul.md`)

Basline `3103ce3`, branch `audit/a0-a2-linguistic`, revisão **somente de leitura**. Ficha:
`docs/audits/a0-a2/data/sheets/vocab-hangul.md` — 133 entradas `course: "hangul"` (derivadas de
`WORDS` em `src/content/hangul/syllables.ts`, menos as 15 de `NOT_VOCABULARY` em
`src/content/vocabulary/hangul.ts`: 148 − 15 = 133 ✓) + 25 frases contextuais
(`src/content/vocabulary/sentences.ts`). Conferido por script: **`audioText == ko` em 100% das 133
entradas, sem espaços indevidos** — a única forma falada errada que chega ao áudio é o item de
lição `으막` (V0-001), que tem MP3 próprio em `src/content/audio/entries.ts:195`.

Reusos: `reusedIds` das lições A1/A2 apontam para **52 IDs distintos do Hangul em A1 e 11 em A2**
(contagens batem com `docs/architecture.md`); os sentidos usados nos diálogos/frases A1/A2 onde a
palavra realmente aparece são coerentes com as glosas, com as exceções/riscos registrados abaixo.
IDs são imutáveis — nada aqui propõe renomear ou fundir; propõe corrigir prosa/notas e registrar
riscos de esquema.

### V0-001 — CRÍTICO — gabarito de "ligação" de 음악 ensina "으막", forma que não existe; há MP3 gerado dela
- Item: ko:음악 (frase/nota da ficha) + exemplo de lição h21-e02 (não está na ficha, mas é a origem da nota)
- Arquivo: src/content/hangul/syllables.ts:2737 (nota `word:음악`); src/content/hangul/rules.ts:19 (`rule:liaison`); src/content/hangul/lessons/h21.ts:80–82; src/content/audio/entries.ts:195 (`"으막": /audio/v1/ko-0b83eec4.mp3`)
- Coreano original: "음악 → 으막" / opções `["으막", "음악", "으마"]`, `correctAnswer: "으막"`
- Português original: "NOTA: O ㅁ final de 음 passa para 악 na fala: 으막." / "O ㄱ final de 음 passa para 악: 으막. A escrita permanece 음악."
- Problema: música **não tem ligação**: a forma padrão do vocábulo é [음ː락] (표준국어대사전); 연음 (§13–14 da 표준 발음법) atinge partículas/terminações/afixos e fronteiras específicas (cf. 한국어→[한구거], 읽어요→[일거요], que o módulo traz certos), não o ㅁ de 음 ante a segunda raiz (악) do composto hanja. A transcrição "으막" é duplamente errada: (a) promete uma ligação inexistente; (b) perde a coda nasal [m] (mesmo a análise de ligação daria "을막", não "으막"). O item é avaliado (h21-e02) e virou áudio no corpus. O achado A0-001 do revisor de `a0-hangul.md` já apontou a prosa trocada ("O ㄱ de 음 passa...") e sugeriu corrigi-la para "O ㅁ de 음 passa para 악: 으막" — **essa correção preservaria a forma errada**; deve ser revista em conjunto.
- Correção proposta: trocar a transcrição falada para "음락" e a nota para "Sem ligação: o ㅁ de 음 fica na sílaba ([음ː락]);악 começa com ㅇ mudo, mas a regra de 연음 não se aplica aqui."; em h21-e02, substituir o item por exemplo de ligação real (p. ex. 밥을→[바블], 옷을→[오슬], já na tabela) ou convertê-lo em "qual é a forma escrita de 'música'". Regenerar/retirar o MP3 de "으막".
- Base: 표준국어대사전 (음악[음ː락]); 표준 발음법 §13–14 (âmbito do 연음) contra §12/§23–24; coerência interna: o próprio módulo ensina 한국어→[한구거] como ligação e 음악 não se comporta assim.
- Confiança: alta
- Impacto: h21-e02, `rule:liaison`/ex[음악], nota de `word:음악` (linha ko:음악 da ficha), entradas de áudio `으막` (entries.ts + manifest.json), e a correção proposta em A0-001 do lote a0-hangul.

### V0-002 — MAJOR — nota de ko:나의 ensina a leitura [에] para uma palavra em que 의 é substantivo dependente ([의])
- Item: ko:나의
- Arquivo: src/content/hangul/syllables.ts (nota `word:나의`); eco em src/content/hangul/lessons/h15.ts (intro ㅢ: "Na partícula possessiva 의, a fala costuma usar [e]: 나의 → [나에]")
- Coreano original: 나의
- Português original: "PT: meu; minha · NOTA: A partícula possessiva 의 costuma ser pronunciada [에] na fala; a escrita permanece 의."
- Problema: a redução 의→[에] é regra da **partícula de caso** genitiva (학교의 → [학까에]); em "나의" (= meu), 의 é substantivo dependente (표준국어대사전 내³ "que é de alguém"), pronunciado [의]: 나의 = [나의]. O `audioText` da entrada é "나의" e toca em [나의] — a nota contradiz o áudio da própria ficha e faria o aluno "corrigir" o áudio para *[나에]. Adicional: "나의" não é forma de dicionário canônica (o verbo de entrada é 내) e a entrada está com `pos` vazio (V0-011).
- Correção proposta: manter o ID (imutável) e a glosa; reescrever a nota: "Quando 의 é partícula de caso ('de'), a fala costuma ler [에]: 아이의 책 → [아이애]. No 'meu' (substantivo dependente) lê-se [의]: 나의 = [나의]."; alinhar o trecho do intro de h15.
- Base: 표준국어대사전 (조사 의 vs 의존명사 내³/의); 표준 발음법; áudio derivado de `audioText == ko`.
- Confiança: alta (para a distinção 조사/의존명사); média (para a formulação exata da nota)
- Impacto: word:나의 (ficha), h15/intro (mesma afirmação; cruzar com A0-004, que já atacou o ambiente de 주의, não o [나에]).

### V0-003 — MAJOR — ko:안 (glosa só "dentro; interior") convive com o advérbio de negação 안, mesmo `ko:<forma>`, sentido não coberto; risco de colisão de identidade nos reusos
- Item: ko:안
- Arquivo: src/content/hangul/syllables.ts (`word:안`); uso da negação: src/content/curriculum/a1/lessons/a1-l09.ts:27,39,67–69 ("안 가요", "안 + predicado", gramática própria), a1-l31 ("아직 안 했어요"), a1-l40 ("이해가 안 돼요"), A2 (p. ex. "안 좋아요")
- Coreano original: KO: 안
- Português original: "PT: dentro; interior"
- Problema: a forma `안` é dois lexemas padrão (안¹ subs. 'dentro' × 안² adv. de negação). O vocabulário só registra 안¹; a negação é ensinada por gramática (a1-l09) sem identidade lexical — o que hoje é *seguro*, porque nenhum `reusedIds` de negação aponta para ko:안 (reusos l04/l13 são locativos, coerentes). Mas o esquema de ID `ko:<forma>` (vocabulary/hangul.ts:27) não permite registrar 안² sem colidir com o cartão de 안¹, e o cartão SRS "안 = dentro" passa a concorrer com dezenas de frases "안 + verbo" do A1/A2 — exatamente a "mesma forma com sentido diferente" que este roteiro pede para auditar. Risco de erro em futuro reuso: se alguma lição apontar `ko:안` em contexto de negação, a glosa dirá uma palavra que não corresponde à frase.
- Correção proposta: (1) acrescentar nota a `word:안` e ao cartão: "Em a1-l09, '안 자요', 안 é outra palavra (advérbio de negação, 'não'); este cartão é só o de lugar."; (2) bloquear por convenção/validador que `reusedIds` de ko:안 seja usado para contextos de negação (validar que a frase contém a glosa do ID).
- Base: 표준국어대사전 안¹/안² como entradas separadas; `docs/architecture.md` (IDs por forma, imutáveis); varredura dos 141 reusos hangul→A1/A2 no dump (nenhum reuso atual de ko:안 aponta para negação).
- Confiança: alta
- Impacto: cartão ko:안 (SRS `v:`), reusos a1-l04/a1-l13, gramática a1-l09/l31/l40 e frases A2; mesmo padrão latente em ko:네 (V0-007) e ko:차/ko:씨/ko:위 (cobertos por glosas duplas).

### V0-004 — MAJOR — as 25 frases do módulo cobram vocabulário fora do inventário de 133 e contrações/irregulares nunca ensinados em h01–h24
- Item: sent:전화:16, sent:꽃:13, sent:강아지:9, sent:의자:19, sent:공부:25, sent:시계:22, sent:차:24, sent:커피:1, sent:우유:18, sent:물:3, sent:책:7, sent:문:20, sent:눈:15, sent:서울:21, sent:옷:23 (sistêmico)
- Arquivo: src/content/vocabulary/sentences.ts (tuplas ["palavra", ko, pt, sentido])
- Coreano original: p. ex. "친구에게 전화를 해요." / "꽃이 예뻐요." / "강아지가 귀여워요." / "시계가 있어요." / "이 의자는 커요."
- Português original: p. ex. "Eu ligo para um amigo." / "A flor é bonita." / "O cachorrinho é fofo." / "Há um relógio." / "Esta cadeira é grande."
- Problema: o módulo Hangul ensina sílaba/batchim/sandhi de forma isolada; as frases de contexto, porém, dependem de (a) **palavras fora do inventário**: 친구, 예쁘다, 귀엽다, 매일, os pronomes/demonstrativos 저·이 (nenhum deles entre as 133); (b) **flexão não ensinada**: 마셔요/좋아해요 (ㅂ-irregular + contração), 있어요/없어요 (ㅅ-irregular), 커요 (queda de ㅡ), 예뻐요/귀여워요, 들어요, 와요, 살아요. O próprio lote declara as notas de conjugação "não avaliadas aqui" (h20), mas a frase traduzida é exposta como conteúdo legível/compreensível — carga indevida para A0, segundo o critério de nível deste roteiro ("palavra/frase que exige gramática além de sílaba/batchim").
- Correção proposta: manter as frases (áudio/leitura global é aceitável), mas (1) marcá-las como **não avaliáveis por vocabulário** — nenhum item de lição/checkpoint deve pedir sentido de 저/친구/예쁘다 ou segmentar 마셔요/있어요; (2) onde possível, preferir frases sem irregularidade (p. ex. sent:의자:19 → "의자가 있어요" ainda tem irregular; "이것은 의자예요" seria limpa); (3) registrar na revisão nativa como escolha de design, não como erro de frase — o coreano e a tradução em si estão corretos.
- Base: inventário das 133 + 25 frases (dump `vocab`/`sentences`); escopo declarado do módulo (roadmap: fase Hangul = alfabetização); padrão A0 de materiais de referência.
- Confiança: alta (para a constatação); média (para a severidade — aceitável se nunca cobrado)
- Impacto: as 25 frases da ficha; checkpoints c3/c4 (leitura em voz alta de "저는 학생입니다", "한국어를 공부해요"); nenhum `reusedIds`.

### V0-005 — MINOR — nota de 핥다/훑다 promete "aspiração de 다" quando a forma de citação padrão é [할따]/[훌따] (tensificação)
- Item: ko:핥다, ko:훑다
- Arquivo: src/content/hangul/syllables.ts (notas `word:핥다`, `word:훑다`)
- Coreano original: 핥다 / 훑다
- Português original: "NOTA: A aspiração de 다 depois de ㄾ será estudada em h21–h23; aqui só se avalia o final ㄾ → [l]." (repetida com mesma promessa nas duas entradas)
- Problema: a aspiração §12.1 vale para ㅎ/ㄶ/ㅀ + ㄱㄷㅈ (싫다[실타], 많고[만코]); para raizes em **ㄼ/ㄾ**, o §25 e os exemplos oficiais dão tensificação: 핥다[할따], 훑소[훌쏘], 넓게[널께], 떫지[떨찌]. A promessa "a aspiração de 다" ensinará, na fase futura, o contrário do dicionário (*[할타] vs [할따]). O gabarito atual de h20-e07 ([l]) está certo; só a prosa de agendamento erra.
- Correção proposta: "A tensificação de 다 depois de ㄾ será estudada em h21–h23 (핥다 = [할따])."
- Base: 표준 발음법 §12 (âmbito ㅎ/ㄶ/ㅀ) vs §25 (raiz ㄼ/ㄾ → ㄲ/ㄸ/ㅆ/ㅉ; exemplos oficiais 핥다[할따], 훑소[훌쏘]).
- Confiança: alta
- Impacto: notas de word:핥다 e word:훑다; checar se o plano de h21–h23 lista 핥다/훑다 como aspiração (a tabela `rule:aspiration` não lista — bem).

### V0-006 — MINOR — nota de ko:시계 condicional o abrandamento de ㅖ a um ambiente inexistente ("depois de consoante")
- Item: ko:시계
- Arquivo: src/content/hangul/syllables.ts (nota `word:시계`)
- Coreano original: 시계
- Português original: "NOTA: Depois de consoante, ㅖ pode soar [e]; a escrita mantém 계."
- Problema: sílaba com medial ㅖ nunca vem "depois de consoante" no sentido de coda anterior: ou abre palavra ou segue vogal (시계 tem ㅖ após ㅣ). A regra real (해석 do §21 da padrão/permitido) é que ㅖ pode ser simplificado para [ㅔ] quando não gera ambiguidade (계속→[게속]), sem condição de consoante. Ambiente trocado, espelhando o problema de 주의 já registrado em A0-004 (que tratou do [i] de ㅢ, não deste).
- Correção proposta: "Na fala rápida, ㅖ pode soar como ㅔ ([e]): 시계 → [시게]; a escrita mantém 계. (não é depois de consoante — é o mesmo ambiente de 계속 [게속])."
- Base: §21/§20 padrão sobre ㅖ; estrutura silábica (ㅖ nunca após coda na palavra).
- Confiança: média-alta (o fenômeno é real; a formulação da condição é que está errada)
- Impacto: nota de word:시계; revisar cartões de ㅖ/ㅒ no intro de h12 se repetirem a condição.

### V0-007 — MINOR — ko:네 funde dois lexemas na mesma identidade ("sim" interjeição × "seu/sua" determinante), sem cobertura de pos/nota
- Item: ko:네
- Arquivo: src/content/hangul/syllables.ts (`word:네`, tags adverb/interjeição → pos "interjeição")
- Coreano original: 네
- Português original: "PT: sim; seu/sua"
- Problema: 네¹ (interjeição 'sim') e 네² (determinante possessivo 'seu/sua') são entradas de dicionário distintas; a glosa dupla com pos único cria um cartão ambíguo (o aluno pode ler "seu" onde a frase diz "sim"). Reusos atuais (a1-l01, a1-l05) usam só 'sim' ✓; é risco de reuso, não erro de uso. A0 já tem precedente de ambiguidade tratada por nota (ko:차 "chá; carro"; ko:씨).
- Correção proposta: manter ID e glosa; acrescentar nota: "Duas palavras: 'sim' (resposta) e 'seu/sua' (antes do substantivo: 네 방 = o seu quarto). A saudação formal é 예."
- Base: 표준국어대사전 네¹/네²; roteiro §6 ("reuse inconsistente (mesma forma com sentido diferente)").
- Confiança: alta
- Impacto: cartão ko:네; nenhum reuso atual comprometido.

### V0-008 — MINOR — glosa de ko:머리 não cobre "cabelo", sentido que o A2 passa a usar (곱슬머리) — risco de reuso inconsistente
- Item: ko:머리
- Arquivo: src/content/hangul/syllables.ts (`word:머리`); eco A2: src/content/curriculum/a2/... (sent:a2-l03:곱슬머리 "제 친구는 곱슬머리예요" → "cabelo cacheado")
- Coreano original: 머리
- Português original: "PT: cabeça"
- Problema: no coreano padrão, 머리 denota tanto 'cabeça' (parte) quanto 'cabelo' (머리 = cabelo é uso corrente: 머리가 길다, 머리 자르다). O reuso A1 (a1-l33 "머리가 아파요") é o sentido coberto ✓, mas a família de cabelo entra no A2 via composto novo — se futura retomada usar `ko:머리` para cabelo, a glosa dirá 'cabeça' e não baterá com a frase.
- Correção proposta: glosa "cabeça; cabelo" com nota curta de duplo sentido, ou nota "para 'cabelo' o coreano usa a mesma palavra".
- Base: 표준국어대사전 머리 (acepções 'cabeça' e 'cabelo'/머리카락); dump A2 l03.
- Confiança: alta
- Impacto: cartão ko:머리; composto novo ko:곱슬머리 (A2) unaffected.

### V0-009 — MINOR — lote de glosas pouco naturais/imprecisas em pt-BR
- Item: ko:몫, ko:까치, ko:낮, ko:삶, ko:세수
- Arquivo: src/content/hangul/syllables.ts (entradas correspondentes)
- Coreano original: 몫 / 까치 / 낮 / 삶 / 세수
- Português original: "parte; quinhão" / "pega (ave)" / "dia" / "vida" / "lavar o rosto; lavagem do rosto"
- Problema: (a) 몫: "quinhão" é arcaico para o público pt-BR; "parte (que cabe a cada um)" basta. (b) 까치: "pega (ave)" é obscuro no Brasil (a ave é a pega-rabida/urraca eurasiática); sugerir "ave parecida com a urraca (símbolo de notícias boas)". (c) 낮: glosa "dia" perde o par lowercase/night — "dia (oposto de noite)". (d) 삶: "vida" confunde com 생명/인생 — "vida (o viver, existência)". (e) 세수: glossa verbal ("lavar o rosto") um substantivo dependente cujo uso exige "세수하다" (não ensinado em A0) — "lavagem do rosto (ao acordar/lavar o rosto)".
- Correção proposta: reescrever as cinco glosas conforme acima.
- Base: uso pt-BR (dicionários bilíngues padrão); §6 do roteiro (glosa certa, sentido coerente).
- Confiança: alta (a/e), média (b/c/d)
- Impacto: cartões próprios e SRS `v:` correspondente; nenhum reuso A1/A2 (몫/까치/낮/삶/세수 não estão entre os 63 reusados).

### V0-010 — MINOR — palavras raras abstratas mantidas como "vocabulário" só por cobertura de inventário (carga A0 assumida em nota, a confirmar na revisão nativa)
- Item: ko:뇌, ko:암, ko:몫, ko:삶, ko:읊다, ko:훑다, ko:핥다, ko:아우 (nota), ko:하마, ko:타조
- Arquivo: src/content/hangul/syllables.ts (vários; p. ex. `word:몫` com nota "Usado para cobrir ㄳ no inventário")
- Coreano original: 뇌 · 암 · 몫 · 삶 · 읊다 · 훑다 · 핥다 · 아우 · 하마 · 타조
- Português original: (glosas da ficha)
- Problema: para uma fase de alfabetização, 'cérebro', 'câncer', 'quinhão', 'o viver', 'recitar', 'percorrer com os olhos' e 'irmão mais novo' são carga lexical sem função comunicativa A0; as notas já admitem que servem à cobertura de ㄳ/ㄻ/ㄿ/ㄾ/ㅀ e dos ditongos. Não é erro — é peso que a revisão nativa deve confirmar (e que felizmente não vaza para os reusos: nenhum desses aparece nos 52+11 `reusedIds` de A1/A2).
- Correção proposta: manter IDs; classificar esses cartões como "leitura/som" no futuro (não cobrar produção), e registrar a opção na revisão nativa.
- Base: critério de nível deste roteiro ("palavra que exige gramática além de sílaba/batchim é carga indevida" por analogia: palavra que não serve a nenhum ato de fala A0); notas do próprio conteúdo.
- Confiança: alta (para a constatação), baixa (para a ação)
- Impacto: cartões listados; SRS `v:`.

### V0-011 — MINOR — cinco entradas sem `pos` (e verbos descritivos rotulados como "verbo" sem distinção)
- Item: ko:나의, ko:감사합니다, ko:좋다, ko:젊다, ko:넓다 — `pos` vazio; ko:싸다/ko:짜다/ko:쓰다/ko:싫다/ko:많다/ko:없다 etc. rotuladas "verbo"
- Arquivo: src/content/vocabulary/hangul.ts:15–34 (POS_BY_TAG; entradas sem tag em WORDS); src/content/hangul/syllables.ts (tags ausentes)
- Coreano original: 젊다/넓다/좋다/나의/감사합니다
- Português original: "[vocab:-]" na ficha (5 linhas)
- Problema: a derivação de `pos` só pega quem tem tag `noun/verb/...`; faltam tag em 5 entradas da ficha. Além disso, 싸다/좋다/젊다 etc. são verbo descritivo (adjetivo), não verbal de ação — a taxonomia pt "verbo" única esconde a classe que o A1 vai explorar (아파요/좋아요).
- Correção proposta: acrescentar tags em `WORDS` (adj/expressão/possessivo) e, se a taxonomia permitir, "verbo descritivo".
- Base: sheet [vocab:-] × `grep` direto nas fontes; morfologia padrão ( descriptive verbs).
- Confiança: alta
- Impacto: derivação de pos na ficha/validador; SRS sem mudança de ID.

### V0-012 — INCERTO — reusos declarados em `reusedIds` que nunca aparecem na própria lição (bookkeeping vs "retomadas em contexto")
- Item: ko:마음 (a1-l38), ko:차 (a1-l16, a1-l17), ko:감사합니다 e ko:한국 (a1-l01) — verificados direto nos arquivos-fonte; varredura do dump indica padrão amplo (~60 ocorrências de reusedIds de Hangul sem a forma/raiz no corpo da lição, contando radicais de verbos)
- Arquivo: src/content/curriculum/a1/lessons/a1-l38.ts:61 (só a linha `"ko:마음",` no array), a1-l16.ts:58, a1-l17.ts:57, a1-l01.ts:114,118
- Coreano original: —
- Português original: docs/architecture.md:98 ("115 identidades distintas do A1/Hangul são retomadas **em contexto**")
- Problema: `reusedIds` é tratado pelos validadores como **referência existente** (tests/content/a2-curriculum.test.ts:112–114 só checa `getVocab(id)` definido) — não como uso. Se a semântica pretendida é pré-requisito, os casos acima são legítimos; se é "retomar em contexto" (como diz a doc de A2), há declarações sem contrapartida real. Não encontrei spec escrita de qual das duas é `reusedIds`. Não afeta glosa/áudio; afeta a leitura da contagem "52 reusos" desta auditoria (a **distinção** de IDs reusados confere: 52/11 ✓).
- Correção proposta: registrar decisão de semântica em `docs/architecture.md` (pré-requisito vs uso) e, se for "uso", validar presença da forma (raiz, para verbos) no conteúdo da lição.
- Base: course-types.ts:60–64 (sem comentário de semantics); validate/testes; docs vs código.
- Confiança: baixa/média (falta a spec do campo)
- Impacto: contagem de reusos nos docs; nenhum conteúdo coreano.

## Cobertura

Contagens com `grep -c` na ficha `docs/audits/a0-a2/data/sheets/vocab-hangul.md`:

- Linhas totais de item: 158 (`grep -c '^ko:\|^sent:'`)
- Entradas `[vocab:`: **133** — 100% lidas e julgadas (forma de dicionário, glosa pt, pos, `audioText`, NOTE)
- Entradas `[frase]`: **25** — 100% lidas e julgadas (contém o alvo ✓ em todas; tradução fiel ✓; sentido coerente com a glosa ✓; naturalidade ✓; carga de nível em V0-004)
- Conferências cruzadas (fora da ficha, para o julgamento):
  - `WORDS` em `src/content/hangul/syllables.ts`: 148 registros; `NOT_VOCABULARY` de `src/content/vocabulary/hangul.ts`: 15 → 133 = ficha ✓
  - `audioText`: script sobre os 148 → **todas iguais a `ko`, sem espaços errados** ✓ (nenhum achado de grafia de áudio; único áudio errado é a forma "으막" de V0-001)
  - Reusos no dump `content-dump.json`: `reusedIds` de Hangul em A1 = 52 distintos (141 ocorrências com A2), A2 = 11 distintos; sentido usado em diálogos/frases conferido para todos os reusados que aparecem em conteúdo (감사합니다, 네, 사람, 학생, 한국, 씨, 의사, 의자, 책, 시계, 물, 우유, 커피, 차, 사과, 눈, 문, 밥, 옷, 꽃, 강아지, 고양이, 엄마, 아버지, 어머니, 부모, 회사, 음악, 전화, 좋다, 많다, 없다, 앉다, 먹다, 싸다, 짜다, 앞, 안, 위, 밖, 입, 코, 머리, 다리, 마음, 주소, 가구, 백화점, 야구, 요리, 서울): **nenhum aponta para sentido incompatível com a glosa**; lacunas de cobertura de glosa registradas em V0-003 (안²), V0-007 (네²) e V0-008 (머리=cabelo)
  - Pronúncia das notas (133 + frases): conferidas contra 표준 발음법 §10/§11/§12/§13–14/§23–25: **corretas** 한국어[한구거], 학년[항년], 국물[궁물], 입니다→임니다, 감사합니다[감사함니다], 축하[추카], 입학[이팍], 백화점[배콰점], 국화[구콰], 좋다[조타], ㄳ→ㄱ·ㄵ/ㄶ→ㄴ·ㄺ→ㄱ·ㄻ→ㅁ·ㄼ(geral)→ㄹ·ㄽ/ㄾ→ㄹ·ㄿ→ㅂ·ㅀ→ㄹ·ㅄ→ㅂ (tabela h20 conforme §10/§11, inclusive 닭[닥] e 읊다[읍따]), 밟다[p̚] ✓, 싫다 ([l] sobrevive; aspiração → 실타 ✓ padrão) ; **erradas**: 음악→으막 (V0-001), 나의→[에] (V0-002), promessa de aspiração em 핥다/훑다 (V0-005), condição "depois de consoante" em 시계 (V0-006; em 주의 já em A0-004)

Itens julgados: 158/158 (100% da ficha). Lacunas: (1) nenhum julgamento por escuta — corpus sintético; a forma "으막" foi tratada como erro textual/design com base na norma escrita; (2) semântica oficial de `reusedIds` (V0-012) não existe em doc; (3) revisão nativa dos lotes (status `in-review` em tudo) continua pendente — este relatório não substitui.

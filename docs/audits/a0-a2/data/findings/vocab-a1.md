# Achados — vocabulário canônico A1 (`ko-a1`)

Revisão somente de leitura da ficha `docs/audits/a0-a2/data/sheets/vocab-a1.md`
(443 entradas `vocab` + 443 `frase`), confirmada contra `src/content/vocabulary/types.ts`,
`validate.ts`, `a1.ts`, `a1-course.ts` e `src/content/curriculum/a1/lessons/a1-lNN.ts`.
Sempre que "partícula colada" aparece em alvo (ex.: alvo `이름` em `제 이름은 아나예요.`),
isso é ortografia coreana correta (입에 붙여 쓰는 조사) e **não** foi marcado como erro.

### V1-001 — MAJOR — Esquema `pos` não tem "adjetivo/descritivo"; ~29 adjetivos (형용사) são ensinados como `verbo`
- Item: ko:크다 (representante; mesma marca em ko:작다, ko:예쁘다, ko:귀엽다, ko:재미있다, ko:조용하다, ko:활발하다, ko:친절하다, ko:바쁘다, ko:달다, ko:맵다, ko:맛있다, ko:배고프다, ko:배부르다, ko:비싸다, ko:빠르다, ko:느리다, ko:가깝다, ko:멀다, ko:어렵다, ko:쉽다, ko:덥다, ko:춥다, ko:따뜻하다, ko:시원하다, ko:아름답다, ko:즐겁다, ko:피곤하다, ko:미안하다)
- Arquivo: src/content/vocabulary/types.ts:3 (union `VocabPos` = substantivo|verbo|pronome|advérbio|interjeição|numeral) e src/content/vocabulary/a1-course.ts (linhas-tupla)
- Coreano original: 크다 || PT: ser grande · [vocab:verbo]
- Português original: ser grande
- Problema: os 29 itens acima são 형용사 (adjetivos) em 표준국어대사전; não aceitam padrões de 동사 (não formam *크고 있어요 contínuo, usam -ㄴ no modificativo: 큰 방) e a glosa "ser grande" já denuncia categoria adjetival. O esquema não oferece a categoria, forçando o rótulo errado. (있다/없다 ficam corretamente como `verbo` — 동사 existencial.)
- Correção proposta: adicionar `"adjetivo"` (ou `"descritivo"`) à union `VocabPos` e reclassificar os 29 itens; alternativamente, registrar no docs que a ausência de adjetivos no schema é decisão consciente (não encontrada em `docs/architecture.md`).
- Base: 표준국어대사전 marca 크다·맵다·맛있다·따뜻하다 etc. como 형용사; gramática: 형용사 não ocorrem em -고 있다 e usam 관형사형 -ㄴ.
- Confiança: alta
- Impacto: IDs `v:ko:<forma>` não mudam (pos não entra no id) — mudança é de metadados/apresentação; os ~31 itens marcados `verbo` de fato (action verbs) permanecem.

### V1-002 — MAJOR — Lema `입어 보다` grafado com espaço; a forma canônica é `입어보다`
- Item: ko:입어 보다
- Arquivo: src/content/vocabulary/a1-course.ts:273
- Coreano original: 입어 보다 || PT: experimentar roupa
- Português original: experimentar roupa
- Problema: predicados auxiliares `-아/어 보다` ligam-se ao verbo principal (한글맞춤법 §47: 조력 용언은 앞말에 붙여 쓴다; 표준국어대사전 registra lemas como 먹어보다·해보다). O lema com espaço é não padrão e contamina o próprio ID do cartão.
- Correção proposta: lemma/id `ko:입어보다` (sentença e alvo `입어 보세요.` permanecem; a separação antes de 보조 `보다` flexionado é tolerada por §47.2); como A1 ainda está `in-review` e não publicado, renomear agora custa barato — depois vira risco de compatibilidade dos cartões `v:ko:입어 보다`.
- Base: 한글맞춤법 §47 (조력 용언 붙여 쓰기); padrão lexicográfico do 표준국어대사전 (lemas `먹어보다`, `해보다`).
- Confiança: alta
- Impacto: id do cartão `v:ko:입어 보다`, frase `sent:a1-l19:입어 보다` (vocabId), eventuais MP3/TTS keyed por id.

### V1-003 — MAJOR — Frase de `감기` contém a palavra apenas dentro do composto `감기약`; validador não verifica fim de palavra
- Item: sent:a1-l33:감기
- Arquivo: src/content/vocabulary/a1-course.ts; src/content/vocabulary/validate.ts:9-14 (`targetPosition`)
- Coreano original: 감기약 있어요?
- Português original: Você tem remédio para resfriado? · alvo 감기
- Problema: `감기` não ocorre como palavra autônoma — está dentro do composto `감기약` (nunca ensinado como carta em A1/Hangul/A2). No ocultamento do cloze, o aluno vê `____약 있어요?`, fragmento de palavra que nem existe isolado. O `targetPosition` só exige ocorrência única no INÍCIO de palavra, sem fronteira de fim — ponto cego estrutural.
- Correção proposta: trocar a frase por `저는 감기예요.` || "Estou resfriado." (alvo `감기`) ou `감기에 걸렸어요.`; em paralelo, estender `targetPosition` para exigir que o caractere pós-alvo esteja no conjunto de particulas ou separação de palavras (para alvos nominais).
- Base: regra de fronteira de palavras em compostos Sino-coreanos (감기 + 약 = uma palavra); UI de cloze oculta exatamente `target` conforme `types.ts` (linha 33-45).
- Confiança: alta (caso), média (extensão do validador)
- Impacto: único caso real de alvo dentro de composto em 443 frases (varrido por script); mesmo padrão pode reaparecer em B1 — a correção do validador protege cursos futuros.

### V1-004 — MAJOR — `돼지고기 없어요?` traduzido como "Você tem carne de porco?" inverte a polaridade da pergunta
- Item: sent:a1-l36:돼지고기
- Arquivo: src/content/vocabulary/a1-course.ts; contexto em src/content/curriculum/a1/lessons/a1-l36.ts:46-48 (diálogo: "돼지고기는 괜찮아요?" / "돼지고기는 안 돼요")
- Coreano original: 돼지고기 없어요?
- Português original: Você tem carne de porco?
- Problema: `없어요?` pergunta NEGATIVA ("Não tem carne de porco?, Confirma que não tem?"), uso típico de restrição alimentar; a glosa PT afirma existência ("Você tem..."). Um aluno que reproduzir "Você tem...?" esperará sim ≠ resposta esperada pelo coreano. O diálogo da própria lição trata o assunto ao contrário (o funcionário oferece, o cliente recusa).
- Correção proposta: PT → "Não tem carne de porco?"; ou, se a intenção era "Vocês têm...?", KO → `돼지고기 있어요?`.
- Base: negação -지 않다/안 e verbos/interações negativos; padrão de conversa de alergia confirmada no diálogo l36.
- Confiança: média-alta
- Impacto: exercício `translate`/`listen` de l36 que reutilizar esta frase; par com ko:빼다 "고기를 빼 주세요" (esse está coerente).

### V1-005 — MAJOR — `만나요` lido/vertido como declarativo "Eu encontro" em cena de convite ("Vamos nos encontrar")
- Item: sent:a1-l23:사거리
- Arquivo: src/content/vocabulary/a1-course.ts; lição src/content/curriculum/a1/lessons/a1-l23.ts
- Coreano original: 사거리에서 만나요.
- Português original: Encontro no cruzamento.
- Problema: em cena de combinar ponto de encontro, `만나요` (해요체) é voluntativo/imperativo suave — "Vamos nos encontrar no cruzamento". A tradução "Encontro..." inventa um sujeito de 1ª pessoa singular que o coreano não tem. Inconsistência interna: as frases-irmãs sent:a1-l25:일찍/늦게/다음 vertem o mesmo `만나요` como "Encontramos/Vamos", e sent:a1-l24:모퉁이 (`기다려요` → "Espere") como imperativo.
- Correção proposta: PT → "Vamos nos encontrar no cruzamento."; padronizar por cena a leitura de `-아요` imperativo/voluntativo em todas as frases-alvo de l23/l25.
- Base: valores pragmáticos de -아요/어요 (imperativo suave e voluntativo); supressão que muda a agentividade é erro de tradução segundo o roteiro (§ "O que julgar", item 2).
- Confiança: média-alta
- Impacto: sent:a1-l24:모퉁이, sent:a1-l25:다음 (manutenção: manter coerência de registro), sent:a1-l15:기다리다/조심하다, sent:a1-l05:말하다 (idem, porém defensável — fica em V1-010).

### V1-006 — MINOR — 20 entradas "forma de dicionário" são chunks flexionados/não-lema com `pos: interjeição`
- Item: ko:주세요, ko:앉으세요, ko:드세요, ko:괜찮아요, ko:죄송합니다, ko:아니에요, ko:뭐라고요, ko:잠깐만요, ko:도와주세요, ko:잠시만요, ko:환영합니다, ko:어서 오세요, ko:무슨 뜻이에요, ko:어떻게 말해요, ko:이해가 안 돼요, ko:문제없어요, ko:안녕하세요, ko:반갑습니다 (e cognatos)
- Arquivo: src/content/vocabulary/a1.ts (primeiras), src/content/vocabulary/a1-course.ts (demais)
- Coreano original: 주세요 || PT: por favor; dê (pedido polido)
- Português original: por favor; dê (pedido polido)
- Problema: o campo `ko` deveria ser lema (형용사/verbo em `-다`); aqui há formas conjugadas (주세요=주다+세요, 괜찮아요=괜찮다, 죄송합니다=죄송하다+습니다, 이해가 안 돼요=문ão inteira) rotuladas como "interjeição" por falta de categoria. Como fórmulas de comunicação a escolha é pedagogicamente defensável, mas colide com a convenção anunciada e cria vizinhança redundante: ko:도와주세요 (l05) e ko:도와주다 (l14) ensinam "ajudar" duas vezes sem link `accepted`.
- Correção proposta: manter os chunks, mas (a) documentar a exceção em `docs/architecture.md`/types.ts e criar categoria `"expressão"`; (b) ligar ko:도와주다 ↔ ko:도와주세요 via `accepted`/nota; (c) confirmar que nenhum aluno formará `*괜찮아요다` — nota "não é forma de dicionário" nos itens.
- Base: convenção do próprio schema (`VocabEntry.ko` = forma de dicionário, types.ts:10-19); KSD: 괜찮다/죄송하다 são 형용사.
- Confiança: alta (descrição), média (reclassificação)
- Impacto: nenhum id muda se apenas pos/nota for alterada; nova categoria `expressão` afetaria filtro UI dos 20 itens.

### V1-007 — MINOR — Determinantes `어떤/어느/다른` classificados como `pronome` (falta categoria "determinante/adnominal")
- Item: ko:어떤 (idem ko:어느, ko:다른)
- Arquivo: src/content/vocabulary/types.ts:3; a1-course.ts
- Coreano original: 어떤 || PT: que tipo de; qual · [vocab:pronome]
- Português original: que tipo de; qual
- Problema: em uso (`어떤 음식을 좋아해요?`, `다른 색 있어요?`) são 관형사 (determinantes que precedem substantivo); pronome é aproximativo — a glosa "que tipo de" já revela função adnominal. Não há erro de coreano, é imprecisão taxonômica do schema.
- Correção proposta: adicionar `"determinante"` (ou aceitar a nota "pronome/adjetivo interrogativo") e reclassificar os três.
- Base: KSD: 어떤 (adjetivo interrogativo), 다른 (adjetivo), 어나 (determinante interrogativo); paralelo com V1-001.
- Confiança: média
- Impacto: 3 itens; sem mudança de id.

### V1-008 — MINOR — `대신` com `pos: advérbio`, mas o sentido ensinado é o de dependente/nome relacional
- Item: ko:대신
- Arquivo: src/content/vocabulary/a1-course.ts (a1-l36)
- Coreano original: 소고기 대신 닭고기 주세요. || PT: Carne de frango em vez de carne bovina, por favor.
- Problema: KSD registra 대신 (代替) como 의존 명사 (exige complemento: X 대신) e o advérbio 대신 é outro sentido ("em troca"). A frase ensina o uso nominal regido, o pos marca advérbio — não quebra nada, mas a explicação gramatical de l36 ("use 대신: 소고기 대신...") descreve construction de nome.
- Correção proposta: pos `substantivo` com nota "nome dependente (X 대신)" ou deixar como está e ajustar a nota.
- Base: KSD 대신(代替) 의존 명사 vs. 대신 (advérbio).
- Confiança: média
- Impacto: 1 item + nota de a1-l36.

### V1-009 — MINOR — `다시 한번` inconsistente com a própria espaçonormização da ficha (`일 번`, `삼 번` espaçados)
- Item: ko:다시 한번
- Arquivo: src/content/vocabulary/a1-course.ts:534
- Coreano original: 다시 한번 말해 주세요.
- Português original: Fale mais uma vez, por favor.
- Problema: numerais + unidade se separam em coreano (한글맞춤법: numeral + nome dependente com espaço — a própria ficha escreve `제 번호는 일 번이에요`, `삼십 분`). No sentido contável "uma vez mais", a grafia padrão é `다시 한 번`; `한번` soldado existe como advérbio ("tente uma vez"), leitura diferente da glosa "mais uma vez".
- Correção proposta: lemma/frase → `다시 한 번`; id `ko:다시 한 번`.
- Base: §44 de espaçonormização (nome dependente com espaço) + uso registrado em KSD (한 번 = contagem).
- Confiança: média-alta
- Impacto: id/`v:` do cartão, sent:a1-l40:다시 한번, TTS audioText.

### V1-010 — MINOR — Glossas de tradução pouco naturais / deslocadas em frases de contexto
- Item: sent:a1-l38:사정 ("사정이 있어요." → "Tenho uma circunstância."); sent:a1-l38:양해 ("양해해 주세요." → "Compreenda, por favor."); sent:a1-l34:조언 ("조언을 주세요." — coloção idiomática é 조언을 해 주세요 / 조언 좀 해 주세요; PT "Dê-me um conselho"); sent:a1-l32:따뜻하다 ("봄은 따뜻해요" → "A primavera é agradável" perde "morna"); sent:a1-l26:노래 ("노래를 좋아해요" → "Eu gosto de cantar" vs. glosa/sentido "canção"); sent:a1-l05:말하다 ("조금 천천히 말해요." → "Fale um pouco devagar." — forma ambígua declarativo/imperativo, cf. V1-005; "조금 천천히 말해 주세요." desambiguaria)
- Arquivo: src/content/vocabulary/a1-course.ts (linhas correspondentes)
- Problema: coreano correto, PT literal/duro ou sentido parcialmente trocado — didatismo prejudicado sem erro estrutural.
- Correção proposta: "Tenho um imprevisto (não dá)."; "Peço que entenda." / "Por favor, entenda a situação."; KO `조언을 해 주세요.`; "A primavera é amena."; PT "Eu gosto de música/canções" ou sentido "canto"; PT "Ele fala um pouco devagar." ou KO com 주세요.
- Base: naturalidade pt-BR (roteiro, item 2); colocação Advice em coreano (하다 com nouns de fala).
- Confiança: média
- Impacto: PT das frases — sem mudança de id; alvos permanecem.

### V1-011 — MINOR — Glosa de `개찰구` inclui "portão de embarque" (que é 탑승구)
- Item: ko:개찰구
- Arquivo: src/content/vocabulary/a1-course.ts (a1-l37)
- Coreano original: 개찰구 || PT: catraca; portão de embarque
- Problema: 개찰구 = cancela/torniquete de validação (estação/aeroporto para retirar ticket); "portão de embarque" corresponde a 탑승구. A segunda glosa ensina equivalência falsa para contexto futuro de aeroporto.
- Correção proposta: PT → "catraca; cancela de bilhetes".
- Base: KSD: 개찰구 (改札口) — cancela de passagem; no aeroporto, "portão de embarque" é 탑승구, não 개찰구.
- Confiança: média
- Impacto: 1 glosa; lição a1-l37 (estação de trem/metrô — não afeta frase).

### V1-012 — MINOR — `기차가 지연돼요` e `이 노선은 역에 가요`: aspecto/colocação questionáveis
- Item: ko:지연되다 / ko:노선 (frases sent:a1-l37:지연되다, sent:a1-l37:노선)
- Arquivo: src/content/vocabulary/a1-course.ts
- Coreano original: 기차가 지연돼요. | PT: O trem está atrasado. —— 이 노선은 역에 가요. | PT: Esta linha vai à estação.
- Problema: (a) anúncio de atraso usa `지연되고 있어요`/`지연됐어요`; o presente `지연돼요` vira verdade atemporal, e a PT presente ("está atrasado") não bate com KO habitual. (b) `노선` (linha) não "vai" a lugar — o natural é `이 노선은 시청역까지 가요` (a linha vai até...) ou trocar sujeito para `이 열차`.
- Correção proposta: (a) PT "O trem está com atraso" + KO `기차가 지연되고 있어요.` (se quiser manter A1 simples, ao menos PT "Há atraso no trem"); (b) KO `이 노선은 어느 역까지 가요?` ou frase `이 버스는 역에 가요.`
- Base: uso real de avisos ferroviários; subcategorização de 가다 (veículo/linha até destino com 까지).
- Confiança: média
- Impacto: 2 frases; nenhum id.

### V1-013 — MINOR — `원하다` ensinado por frase que soa calque ("저는 커피를 원해요")
- Item: ko:원하다 / sent:a1-l20:원하다
- Arquivo: src/content/vocabulary/a1-course.ts (a1-l20)
- Coreano original: 저는 커피를 원해요. || PT: Eu quero café.
- Problema: a palavra existe, mas em pedidos diários o coreano usa `-고 싶어요` / `~ 주세요`; `커피를 원해요` soa formal/psicologia ("desejo"). Como `-고 싶다` ainda não foi apresentado, o item ensina a forma menos usável.
- Correção proposta: frase em contexto de escolha/pedido formal (ex.: `더 원하시는 게 있어요?` adaptado) ou nota "preferir pedir com 주세요 em situações cotidianas"; registrar como carga até `-고 싶`/-ㅈ고 싶 em lição futura.
- Base: frequência comparativa em conversação de serviço; KSD 원하다 (願—) = desejar formalmente.
- Confiança: média
- Impacto: frase de l20; nada estrutural.

### V1-014 — MINOR — Carga lexical A1 acima do nível (termos clínicos/administrativos/formais e morfologia avançada)
- Item: ko:증상, ko:두통/ko:기침/ko:알레르기 (aceitáveis), ko:참석하다, ko:사정, ko:양해, ko:변경, ko:환승하다/ko:승강장/ko:개찰구/ko:지연되다/ko:노선, ko:아름답다
- Arquivo: src/content/vocabulary/a1-course.ts (l33, l36-l38); lições a1-l33/l37/l38
- Coreano original: 예: 증상이 뭐예요? / 참석하다 || PT: sintoma / participar; comparecer
- Problema: para A1 (sobrevivência), several dessas são vocabulário de nicho (jargão ferroviário, termos formais de desculpa, `증상` clínico) e `참석하다/환승하다` pedem morfologia Sino-coreana formal; não há erro linguístico, é sobrecarga de memorização. O roteiro pede citá-las como carga.
- Correção proposta: marcar `notes` com "uso específico (estação/formal)" e considerar mover증상/참석하다/변경 para A2 num próximo ciclo (apenas planejamento — não editar agora).
- Base: sílabos KSI FASE 1/A1 vs. A2; política do próprio projeto ("sem estatísticas falsas, carga honesta").
- Confiança: média
- Impacto: ~10 identidades; migração mudaria `lesson` e a exigência `requiresAllSteps` dos passos A1 — não executar sem pedido.

### V1-015 — MINOR — Sistema numeral incompleto em A1: `이`(2) e `팔`(8) sem carta; numerais nativos só por reconhecimento; risco futuro de homógrafo
- Item: ko:일/ko:삼/.../ko:십 (8 numerais); contexto a1-l06: "제 전화번호는 일, 이, 삼이에요"; ko:열 (febre) vs. 열 (dez); ko:시 (hora) vs. 시 (poema/di); ko:팔 (braço, Hangul) vs. 팔 (oito)
- Arquivo: src/content/vocabulary/a1-course.ts; src/content/curriculum/a1/lessons/a1-l06.ts:73-75 (numerais nativos apenas para reconhecimento); lição l06 exemplo de telefone usa `이`
- Problema: as cartas sino-coreanas pulam 2 e 8 deliberadamente (colidem com o pronome/determinante `이` e o substantivo `팔`, braço) — decisão correta, mas não documentada na ficha; e as frases de hora/telefone usam `열두`, `아홉`, `일곱` sem cartões (reconhecimento declarado em l06/l07, OK). Se B1+ ensinar 8/2 como numeral, será obrigatório `#sense` (validate.ts:43-51 exige sense em homógrafos) e `열`(dez) colidirá com `ko:열` já publicado (febre).
- Correção proposta: nota no `notes` dos numerais e da carta `ko:열`: "não usar 열 para 'dez' sem sense — já é febre neste curso; empregar '10' em frases com o numeral nativo reconhecido"; registrar restrição em `docs/architecture.md`.
- Base: validator de homógrafos (validate.ts) + plano de ids estáveis `ko:<forma>#<sense>` (types.ts:10-13).
- Confiança: alta (risco), média (documentação)
- Impacto: cursos futuros (B1 numerais), frases de l06-l10.

### V1-016 — MINOR — Identidades quase-duplicadas entre cursos verficadas e limpas (registro positivo com ressalva)
- Item: — (varredura completa)
- Arquivo: docs/audits/a0-a2/data/sheets/vocab-a1.md × vocab-a2.md × vocab-hangul.md
- Problema: nenhuma forma de A1 reaparece como carta em A2/Hangul (interseções vazias; `DUP FORMS: {}` em A1), então `v:<id>` é globalmente único — a ressalva é que reuso é invisível: frases de A1 dependem de 문·시계·부엌·책·의자·꽃·음악·한국어·없다·커피·강아지 ensinados no curso Hangul, o que só funciona se o bloqueio de pré-requisito Hangul→A1 for garantido pela UI de catálogo (está em roadmap Fases 10).
- Correção proposta: nenhum; apenas registrar que a economia de 443+52 identidades depende do gate de entrada.
- Base: teste cruzado por script nesta sessão; validate.ts não enforça curso de referência de frases.
- Confiança: alta
- Impacto: nenhum.

### V1-017 — INCERTO — Espaçamento `삼 층` (vs. grafia usual `3층`/`삼층`)
- Item: sent:a1-l23:층
- Arquivo: src/content/vocabulary/a1-course.ts
- Coreano original: 삼 층에 있어요.
- Problema: pavimentos escrevem-se normalmente com numeral soldado (`3층`); a versão em hangul de "número + unidade" pede espaço por regra de nome dependente (`세 층`), mas a leitura padrão é colada (`삼층`). Não há regra que proíba nenhuma das duas formas nesta exata configuração; falta evidência normativa específica.
- Correção proposta: manter e padronizar com as demais (`일 번`, `삼십 분` espaçados), ou consultar 국립국어원 sobre `삼층/3층`.
- Base: §44 (nome dependente espaçado) — aplicação a numerais escritos por extenso é controversa.
- Confiança: baixa
- Impacto: 1 frase.

### V1-018 — INCERTO — `햇빛이 좋아요` — o idioma meteorológico é `햇볕이 좋다`
- Item: sent:a1-l32:햇빛
- Arquivo: src/content/vocabulary/a1-course.ts
- Coreano original: 햇빛이 좋아요.
- Problema: 햇빛 é a luz/rayo (fenómeno físico); para "o sol está bom/está um sol agradável" a colocação corrente é `햇볕(이) 좋다`; possível calque estrutural. Não obtive evidência de corpus nesta sessão para afirmar que a frase seja avariada.
- Correção proposta: se confirmado pelo revisor nativo, `날씨가 맑아요` (para A1) ou `햇볕이 좋아요` com glosa ajustada.
- Base: KSD 햇볕 vs. 햇빛; ausência de verificação em corpus.
- Confiança: baixa
- Impacto: 1 frase; a carta 햇빛 pode seguir com outro exemplo.

### V1-019 — INCERTO — `오늘은 초대가 있어요` naturalidade duvidosa como "tenho um convite"
- Item: ko:초대 / sent:a1-l15:초대
- Arquivo: src/content/vocabulary/a1-course.ts
- Coreano original: 오늘은 초대가 있어요.
- Português original: Hoje tenho um convite.
- Problema: `초대가 있다` não é padrão-colocação típica (convites: 누군가에게 초대받다 / invitations: 제안/약속/파티가 있다); a frase é decodificável, mas pode ser invenção de manual. Falta evidência de uso real.
- Correção proposta: candidata `오늘은 파티가 있어요.` (PT "Hoje tenho uma festa.") mantendo a carta `초대` com `친구의 초대에 갔어요` (requer -ㄴ de modifier — melhor adiar para A2) ou frase com a saudação usada na lição `처음 뵙겠습니다`-style; deixar para decisão nativa.
- Base: colocações usuais de 초대 (동사 초대하다 é a via produtiva — presente na própria l28 `초대하다`).
- Confiança: baixa
- Impacto: 1 frase; ko:초대 + ko:초대하다 (l28) ficam consistentes se a frase for reescrita.

## Cobertura

- Entradas `vocab` revisadas: 443/443 (`grep -c "\[vocab:" docs/audits/a0-a2/data/sheets/vocab-a1.md` = 443).
- Frases `frase` revisadas: 443/443 (`grep -c "\[frase]"` = 443).
- Sem julgar: 0.
- Varredura automática complementar: duplicatas de forma em A1 = 0; interseção de formas A1∩A2 = 0, A1∩Hangul = 0; alvos fora de fronteira de palavra = 1 caso real (sent:a1-l33:감기) após exclusão manual de ~200 falsos positivos por partícula aglutinada (comportamento correto do coreano); 84 casos de alvo + partícula verificados como regulares.
- Severidades: CRÍTICO 0 · MAJOR 5 (V1-001–005) · MINOR 11 (V1-006–V1-016) · INCERTO 3 (V1-017–019).
- Nenhum arquivo fora de `docs/audits/a0-a2/data/findings/vocab-a1.md` foi alterado; nenhum teste/build executado.

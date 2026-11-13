# Índice consolidado dos achados (A0–A2)

Baseline auditado: `3103ce3` · branch `audit/a0-a2-linguistic` · gerado por `tools/render-index.cjs`.

Total de achados: **298** · CRÍTICO 10 · MAJOR 84 · MINOR 191 · INCERTO 13

Os arquivos completos por lote estão em `docs/audits/a0-a2/data/findings/*.md`. A coluna
**Verificação** é a conferência independente feita pelo orquestrador (motor de correção,
analisadores determinísticos e re-leitura da fonte); `—` = não re-verificado individualmente,
coberto pela revisão do lote.

| ID | Sev. | Curso | Lote | Item | Resumo | Conf. | Verificação |
|---|---|---|---|---|---|---|---|
| A0-001 | CRÍTICO | A0 | a0-hangul | `h21-e02; rule:liaison/ex (음악 → 으막)` | explicação afirma que o batchim de 음 é ㄱ e que ele "passa" para 악 | alta | CONFIRMADO (prosa erra a letra; transcrição certa) |
| A0-002 | MAJOR | A0 | a0-hangul | `h18/intro (bloco "Sete sons no total")` | h18 declara "os 28 finais escritos" quando o inventário é 27 | alta |  |
| A0-003 | MAJOR | A0 | a0-hangul | `h13-e02` | enunciado de h13-e02 pede "a sílaba com glide labial" mas o gabarito é 고 (sem glide) | alta |  |
| A0-004 | MAJOR | A0 | a0-hangul | `h15/intro (bloco ㅢ), h15-e04 (X), word:주의 (NOTA)` | exemplo de ㅢ "[i] depois de consoante" usa 주의, que vem depois de vogal | alta |  |
| A0-005 | MAJOR | A0 | a0-hangul | `h25-e04, c2-e05, c2-e10, c4-e05 (ㅙ/ㅞ/ㅚ → [we]); em grau menor: h15-e01, h15-e02, c2-e06, c2-e11 (의 vs 이)` | itens de escuta exigem distinguir por som realizções que o próprio módulo declara fundidas | alta (para a contradição); média (para quantos alunos reais erram) |  |
| A0-006 | MAJOR | A0 | a0-hangul | `h05-e10` | distrator de h05-e10 usa ㅂ, ainda não ensinado na lição | alta |  |
| A0-007 | MINOR | A0 | a0-hangul | `h04/intro (가구), jamo ㄱ/ㄷ/ㅂ/ㅈ (IPA [k],[ɡ] / [t],[d] / [p],[b] / [tɕ],[dʑ])` | sonorização entre vogais é afirmada como categorical ([kaɡu], "sonoriza para [ɡ]/[b]") | média |  |
| A0-008 | MINOR | A0 | a0-hangul | `h02/intro, h02-e02/e04/e08; jamo ㅗ, ㅓ` | aproximações de ㅗ/ㅓ com vogais NASAIS do português ("como em avô", "entre 'ó' e 'â'") | alta (para o risco), média (para a formulação exata da nota) |  |
| A0-009 | MINOR | A0 | a0-hangul | `h10/intro, h10-e01 (X/fallback), jamo ㅆ` | ㅆ descrito como "curto ... sem alongar como 'ss'" | média |  |
| A0-010 | MINOR | A0 | a0-hangul | `h21-e11` | explicação de h21-e11 nega que 강 tenha consoante final | alta |  |
| A0-011 | MINOR | A0 | a0-hangul | `h21/intro; rule:liaison (texto da regra)` | prosa "a segunda parte costuma se mudar" (pt-BR truncado/ambíguo) | alta |  |
| A0-012 | MINOR | A0 | a0-hangul | `h12-e02` | glosa de 내 como "eu (formal)" não corresponde ao uso padrão | média |  |
| A0-013 | MINOR | A0 | a0-hangul | `h22/intro (bloco "O que fica fora")` | referência futura "Nasalização de ㄹ → ㄴ" nomeia/direciona mal a regra adiada | alta |  |
| A0-014 | INCERTO | A0 | a0-hangul | `h14/intro (bloco "Ortografia importa")` | h14 apresenta [hoe] como realização aceita de ㅚ/회, mas proíbe "ho-e" | baixa |  |
| A0-015 | MINOR | A0 | a0-hangul | `c4-e04` | fallback de c4-e04 exibe a pseudo-sílaba 쮜 | média |  |
| A0-016 | MINOR | A0 | a0-hangul | `h01/intro, h01-e05` | "promulgado entre 1443 e 1446" funde criação e promulgação | alta |  |
| A1M1-001 | CRÍTICO | A1 | a1-m01-v2 | ``a1-l01-e03` [cloze/guided]` | Gabarito ensina que nome próprio não recebe `이에요` (regra falsa) | alta | CONFIRMADO |
| A1M1-002 | CRÍTICO | A1 | a1-m01-v2 | ``a1-l03-e09` [mcq/independent]` | MCQ de partícula com duas opções igualmente corretas | alta | CONFIRMADO |
| A1M1-003 | MAJOR | A1 | a1-m01-v2 | ``a1-l01-d5` vs `a1-l02-d5`, `a1-l02-e04`, `a1-c01-e07`` | Minsu é apresentado como estudante e como funcionário no mesmo módulo | alta |  |
| A1M1-004 | MAJOR | A1 | a1-m01-v2 | ``a1-l02-e03` [listen/guided]` | Enunciado pede um fragmento, gabarito exige a frase inteira | alta |  |
| A1M1-005 | MAJOR | A1 | a1-m01-v2 | ``a1-l03-d4`` | Deixis inconsistente no diálogo: resposta com `이것` sobre objeto de quem ouve | média (a deixis coreana admite flexibilidade discursiva — ver |  |
| A1M1-006 | MAJOR | A1 | a1-m01-v2 | ``a1-l04/intro` [intro] e `g:a1-l04-location` [gram]` | Ordem "lugar + 에 + coisa + 있어요" apresentada como regra única | alta |  |
| A1M1-007 | MAJOR | A1 | a1-m01-v2 | ``a1-l04-e07` [reading/independent]` | Comitativo `과` cobrado em item avaliado sem nunca ter sido ensinado | alta |  |
| A1M1-008 | MAJOR | A1 | a1-m01-v2 | ``a1-c01-e11` [reading/independent]` | Mini-diálogo avaliado troca os papéis do reparo | alta |  |
| A1M1-009 | MAJOR | A1 | a1-m01-v2 | ``a1-l05-e04` [reading/guided]` | `네, 천천히 말해요.` não é aceitação natural de um pedido | média (linha compreensível; o desvio é de força ilocucionária) |  |
| A1M1-010 | MAJOR | A1 | a1-m01-v2 | ``a1-l01-e08`, `a1-l01-e09`, `a1-l02-e05`, `a1-l02-e08`, `a1-l02-e10`, `a1-l04-e05`, `a1-l04-e09`, `a1-l04-e10`, `a1-c01-e24`, `a1-c01-e25`` | Escrita produtiva aceita uma única cadeia exata (ordem e elisão válidas rejeitadas) | alta |  |
| A1M1-011 | MAJOR | A1 | a1-m01-v2 | ``a1-l05-e03`, `a1-l05-e08`, `a1-c01-e05` (e o cartão `ko:주세요`)` | Variante normativa de espaçamento em `-아/어 주세요` é rejeitada | alta |  |
| A1M1-012 | MINOR | A1 | a1-m01-v2 | ``a1-l01/intro` [intro]` | Intro diz que o registro polido "termina em -요" e a lição ensina `-ㅂ니다` | alta |  |
| A1M1-013 | MINOR | A1 | a1-m01-v2 | ``a1-l01-e02` [mcq/guided]` | "termina em consoante (ㅇ)" confunde letra com som | alta |  |
| A1M1-014 | MINOR | A1 | a1-m01-v2 | ``a1-l01-e06` [cloze/guided]` | Terminologia "tema" em vez de "tópico" | alta |  |
| A1M1-015 | MINOR | A1 | a1-m01-v2 | ``g:a1-l02-which/ex` [gram-ex]` | Exemplo de `어느` já usa o demonstrativo `이` (ensinado só na lição 3) | média (é só um exemplo apresentado, não cobrado em item) |  |
| A1M1-016 | MINOR | A1 | a1-m01-v2 | ``a1-l02-e03` [listen/guided]` | Gênero da tradução na explicação diverge da fala da personagem | alta |  |
| A1M1-017 | MINOR | A1 | a1-m01-v2 | ``a1-l03-d1`` | `저기요` usado entre colegas que já se tratam pelo nome | média (varia com a situação; não é agramatical) |  |
| A1M1-018 | MINOR | A1 | a1-m01-v2 | ``a1-l03-d3`` | `그리고` aparece em fala do primeiro contato, declarado só em `a1-l10` | alta |  |
| A1M1-019 | MINOR | A1 | a1-m01-v2 | ``g:a1-l03-subject`, `a1-l03/intro`, `a1-l03-e03`` | Nenhuma nota sobre a forma falada `이게/그게/저게` | média (recomendação de material, não correção de forma) |  |
| A1M1-020 | MINOR | A1 | a1-m01-v2 | ``a1-l03/sum2` [sum]` | Notação da resposta invertida no fechamento (`은/는 + objeto`) | alta |  |
| A1M1-021 | MINOR | A1 | a1-m01-v2 | ``g:a1-l04-position` [gram]` | Bloco de posição promete `안/밖` sem FORM, exemplo ou prática | alta |  |
| A1M1-022 | MINOR | A1 | a1-m01-v2 | ``g:a1-l05-request` [gram]` | FORM de `주세요` esconde a terminação `-아/어` | alta |  |
| A1M1-023 | MINOR | A1 | a1-m01-v2 | ``a1-l05-d6`` | `민수.` solto num diálogo todo em registro polido; cenário reabre troca de nomes | média |  |
| A1M1-024 | MINOR | A1 | a1-m01-v2 | ``a1-c01` [instructions]` | Instrução do checkpoint anuncia uma tarefa funcional que não existe no passo | alta |  |
| A1M1-025 | MINOR | A1 | a1-m01-v2 | ``a1-c01-e07` (= `a1-l02-e04`), `a1-c01-e09` (= `a1-l03-e04`, mesma` | Checkpoint repete itens verbatim das lições | média (decisão pedagógica da equipe) |  |
| A1M1-026 | INCERTO | A1 | a1-m01-v2 | ``a1-l01-e09`, `a1-c01-e24` (e o cartão `ko:선생님`)` | `저는 선생님이에요.`: autocaracterização com o sufixo de respeito `님` | baixa |  |
| A1M1-001 | CRÍTICO | A1 | a1-m01 | `a1-l01-e03` | Regra falsa ensinada na explicação de um item: "nome próprio não recebe 이에요" | alta | CONFIRMADO |
| A1M1-002 | MAJOR | A1 | a1-m01 | `a1-l03-e09` | `mcq` aceita duas conclusões gramaticais: "저것___ 의자예요" (은 vs 이) | média | CONFIRMADO |
| A1M1-003 | MAJOR | A1 | a1-m01 | `a1-l02-e03, a1-c01-e02, a1-c01-e04` | Enunciados de `listen` pedem um fragmento, gabarito exige a frase inteira | alta |  |
| A1M1-004 | MAJOR | A1 | a1-m01 | `a1-l04-e07` | Item de leitura cobra partícula comitativa `-과` nunca ensinada (lição 4) | alta |  |
| A1M1-005 | MAJOR | A1 | a1-m01 | `a1-l01-e08, a1-l01-e09, a1-l02-e05, a1-l02-e08, a1-l02-e10, a1-l04-e05, a1-l04-e09, a1-l04-e10, a1-c01-e24, a1-c01-e25` | `acceptedAnswers` de `translate` rejeitam variantes válidas (pró-drop coreano e pt-BR, ordem, partícula alternativa) | alta (pró-drop ko/pt); média (`책은 어디에 있어요?` como variante de tradução controlada) |  |
| A1M1-006 | MAJOR | A1 | a1-m01 | `a1-c01-e11` | Mini-diálogo avaliado com papéis de reparo invertidos | média |  |
| A1M1-007 | MINOR | A1 | a1-m01 | `a1-l03-d4 (padrão de referência: a1-l03-d1/d2)` | Perspectiva dos demonstrativos inconsistente dentro do diálogo de l03 | média |  |
| A1M1-008 | MINOR | A1 | a1-m01 | `a1-l02-e03` | Glosa em português com gênero inconsistente com o modelo da lição | alta |  |
| A1M1-009 | MINOR | A1 | a1-m01 | `a1-l01/intro` | Painel de abertura afirma que o registro polido "termina em -요", mas o lote ensina fórmulas em -ㅂ니다 | alta |  |
| A1M1-010 | MINOR | A1 | a1-m01 | `sent:a1-l05:말하다 (cartão), a1-l05-e04 (leitura)` | "Fale um pouco devagar" traduz forma declarativa `말해요`; aceitação "네, 천천히 말해요" é pragmaticamente frouxa | média |  |
| A1M1-011 | MINOR | A1 | a1-m01 | `a1-l02-d4` | Negação de hiperônimo: `학생이에요?` → `아니요, 저는 유학생이에요` é logicamente instável para iniciantes | média (registro/naturalidade — precisa confirmação de revisor nativo) |  |
| A1M2-001 | MAJOR | A1 | a1-m02-v2 | `g:a1-l07-time-particle` | Regra de `에` com 오늘/내일/어제 ensina uma opção que a norma rejeita e manda "praticar as duas formas" | alta | CONFIRMADO |
| A1M2-002 | MAJOR | A1 | a1-m02-v2 | `a1-l09-e09` | Item de ditado cobra `봐요` (contração ㅜ) nunca ensinada, e rejeita `보아요`, forma plena válida | alta | CONFIRMADO |
| A1M2-003 | MAJOR | A1 | a1-m02-v2 | `a1-l06-e08 (padrão; também a1-l07-e08, a1-l08-e03, a1-l09-e03, a1-l10-e03, a1-c02-e01, a1-c02-e03, a1-c02-e04, a1-c02-e06)` | Sistema: enunciados de `listen` pedem um fragmento ("o número", "a ação", "a idade") mas o gabarito exige a frase inteira | alta |  |
| A1M2-004 | MAJOR | A1 | a1-m02-v2 | `a1-l09-e02` | Cloze sem restrição semântica: qualquer verbo já ensinado completa "저는 별로 안 ___" | alta |  |
| A1M2-005 | MAJOR | A1 | a1-m02-v2 | `a1-l08-e05 (padrão; também a1-l08-e10, a1-l09-e05, a1-l10-e05, a1-l10-e10, a1-c02-e24, a1-l07-e05)` | Traduções pt→ko rejeitam variantes que o próprio curso ensina como livres (omissão de 저는; ordem tempo/lugar) | média-alta |  |
| A1M2-006 | MAJOR | A1 | a1-m02-v2 | `a1-l08-e09 (padrão; também a1-l09-e10, a1-l10-e09, a1-c02-e25, a1-l07-e09)` | Traduções ko→pt exigem a string portuguesa canônica e rejeitam variantes normais do pt-BR (sujeito nulo, próclise, adjunto antecipado) | média |  |
| A1M2-007 | MAJOR | A1 | a1-m02-v2 | `a1-l10-d4` | Diálogo apresenta "밤에 쉬어요" como imperativo ("Descanse"), forma nunca ensinada e traduzida como declarativa na própria lição | média-alta |  |
| A1M2-008 | MINOR | A1 | a1-m02-v2 | `g:a1-l06-personal` | "나이가 몇 살이에요?" é redundante; o natural é "몇 살이에요?" (ou "나이가 어떻게 돼요?") | média |  |
| A1M2-009 | MINOR | A1 | a1-m02-v2 | `a1-l07-e01` | Cloze a1-l07-e01 usa "지금", palavra não registrada em nenhum vocabulário anterior (Hangul ou A1 ≤ l10) | alta (verificada por busca em vocabulary/ e hangul/) |  |
| A1M2-010 | MINOR | A1 | a1-m02-v2 | `a1-l07-e06` | Cloze "무슨 ___이에요?" sem pista permite "무슨 일이에요?" como coreano igualmente válido | alta |  |
| A1M2-011 | MINOR | A1 | a1-m02-v2 | `g:a1-l09-frequency/ex2` | Exemplo isolado "저는 가끔 영화는 봐요." usa -는 contrastivo sem contraste, e a glossa pt o suprime; o vocabulário da lição usa a forma neutra | média |  |
| A1M2-001 | MAJOR | A1 | a1-m02 | `a1-l06-e08` | Enunciado de `listen` pede um fragmento, mas o gabarito exige a frase inteira | alta | CONFIRMADO |
| A1M2-002 | MAJOR | A1 | a1-m02 | `a1-l07-e05` | Itens `translate pt-ko` rejeitam variantes ensinadas no próprio curso | alta (l07-e05 e variantes sem `저는`); média (demais combinações de ordem) | CONFIRMADO |
| A1M2-003 | MAJOR | A1 | a1-m02 | `a1-l08-e09, a1-l09-e10, a1-l10-e09, a1-c02-e25, a1-l07-e09` | Itens `translate ko-pt` rejeitam português sem-pronome e deixam lacunas de pontuação nos alts | alta |  |
| A1M2-004 | MAJOR | A1 | a1-m02 | `a1-l08-e10, a1-l10-e10` | “à noite” glossa tanto `밤에` quanto `저녁에`, e os itens pt-ko só aceitam `밤에` | alta |  |
| A1M2-005 | MAJOR | A1 | a1-m02 | `a1-l09-e02` | Cloze sem pista: qualquer verbo polido completa a frase, mas só `자요` é aceito | alta |  |
| A1M2-006 | MINOR | A1 | a1-m02 | `g:a1-l09-frequency/ex (2), a1-l09-d4, a1-l09-d5, a1-l09-e09` | `영화는 봐요`: partícula contrastiva `는` em frases de sentido neutro | média |  |
| A1M2-007 | MINOR | A1 | a1-m02 | `a1-l09-e09 (também d4, d5, g:a1-l09-frequency/ex)` | `봐요` (irregular de ㅅ) cobrado em transcrição sem nunca ter sido sinalizado | alta (irregularidade), média (se a estratégia do curso é lexicalizar em silêncio — decidir e registrar) |  |
| A1M2-008 | MINOR | A1 | a1-m02 | `a1-l10-d4` | `밤에 쉬어요.` traduzido como imperativo ("Descanse à noite") sem marca de pedido | média |  |
| A1M2-009 | MINOR | A1 | a1-m02 | `a1-l08-d3, a1-l08-e04` | `그리고` cobrado em a1-l08 antes da declaração em a1-l10 | alta (factual), baixa (se é violação — o list de marcos do roteiro não inclui 그리고) |  |
| A1M2-010 | MINOR | A1 | a1-m02 | `a1-l10-e07` | `열한 시` (11 horas) nunca ensinado, mas é a chave de resposta de um item de leitura | média |  |
| A1M2-011 | MINOR | A1 | a1-m02 | `a1-l07-e06, a1-c02-e15` | `무슨 ___이에요?` aceita complemento legítimo fora do gabarito | média |  |
| A1M3-001 | CRÍTICO | A1 | a1-m03-v2 | `a1-l11-e06; a1-c03-e13` | cloze com partícula fixa errada: gabarito "언니" produz o coreano ungramatical "제 언니은 선생님이에요" | alta | CONFIRMADO (analisador determinístico + motor: '언니는' rejeitado) |
| A1M3-002 | MAJOR | A1 | a1-m03-v2 | `a1-l15-d6; a1-l15-e10` | "기다려요" ensinado e corrigido como imperativo "espere", contradizendo a regra (으)세요 da própria lição (que lista "기다리세요") | alta |  |
| A1M3-003 | MAJOR | A1 | a1-m03-v2 | `g:a1-l11-possessive; a1-l11/intro (bloco "Posse com 의"); a1-l11/sum1` | "제" (contração de 저+의) descrito como OMISSÃO de 의, em três pontos da lição | alta |  |
| A1M3-004 | MAJOR | A1 | a1-m03-v2 | `a1-l11-e08; a1-l12-e03; a1-l13-e08; a1-l14-e03; a1-l15-e03; a1-c03-e02; a1-c03-e04; a1-c03-e05` | enunciados de listen pedem um constituinte ("a profissão/a relação/a ação..."), mas o gabarito e a correção são a frase inteira | alta (mecânica verificada no código) |  |
| A1M3-005 | MAJOR | A1 | a1-m03-v2 | `a1-l11-e05; a1-l11-e10; a1-l14-e05; a1-l14-e09; a1-l14-e10; a1-c03-e24; a1-c03-e25` | translate com gabarito único rejeita variantes coreanas/portuguesas válidas por omissão de pronome (sistema pro-drop) | média (exigir a forma-modelo completa pode ser intencional como produção guiada, mas a lição se contradiz ao ensinar a omissão) |  |
| A1M3-006 | MINOR | A1 | a1-m03-v2 | `g:a1-l11-uri` | frase pt truncada/incompleta na nota de 우리 | alta |  |
| A1M3-007 | MINOR | A1 | a1-m03-v2 | `g:a1-l11-terms` | "동생 não marca gênero nem posição" é ambíguo e pode ser lido errado | alta (quanto à ambiguidade); impacto pequeno. |  |
| A1M3-008 | MINOR | A1 | a1-m03-v2 | `a1-l15-d1; g:a1-l15-register (+ exemplo g:a1-l15-register/ex #1)` | "초대 감사합니다" como fórmula de chegada: padrão estabelecido é "초대해 주셔서 감사합니다" | média |  |
| A1M3-009 | MINOR | A1 | a1-m03-v2 | `g:a1-l13-position` | ordem "referência → posição → lugar" rotula mal o terceiro slot (é a partícula 에, não "lugar") | alta (quanto ao deslize); impacto baixo. |  |
| A1M3-010 | MINOR | A1 | a1-m03-v2 | `g:a1-l13-rooms/ex; a1-l13-d4; a1-l13-e03; a1-c03-e22; (cartão "화장실")` | variante 은 vs 가 na pergunta "onde fica o banheiro" não sinalizada como válida (consistência) | média |  |
| A1M3-011 | MINOR | A1 | a1-m03-v2 | `cartões a1-l12 de 크다, 작다, 예쁘다, 귀엽다, 재미있다, 조용하다, 활발하다, 친절하다 (usados como alvo em a1-l12-e01/e02/e06/e07/e10 e nos gram-ex)` | adjetivos (형용사) com pos "verbo" nos cartões de vocabulário, contra o texto da própria gramática |  |  |
| A1M3-001 | CRÍTICO | A1 | a1-m03 | `a1-l11-e06` | Cloze cujo preenchimento com o gabarito gera partícula errada: `언니은` | alta | CONFIRMADO (analisador determinístico + motor: '언니는' rejeitado) |
| A1M3-002 | MAJOR | A1 | a1-m03 | `a1-l15-e10` | Pedido polido testado em forma não-`-(으)세요`, rejeitando a forma que a própria gramática da lição promete | alta (inconsistência interna comprovada no fonte) |  |
| A1M3-003 | MAJOR | A1 | a1-m03 | `a1-l11-e08` | Itens de escuta pedem um constituinte, mas o gabarito exige a frase inteira | alta |  |
| A1M3-004 | MAJOR | A1 | a1-m03 | `a1-l11-e01` | Cloze "Complete com ‘mãe’" rejeita `엄마`, palavra conhecida e gramatical no vão | média |  |
| A1M3-005 | MINOR | A1 | a1-m03 | `g:a1-l11-terms` | Explicação sobre `동생` fica ambígua/enganosa ao negar "posição" | alta |  |
| A1M3-006 | MINOR | A1 | a1-m03 | `g:a1-l11-possessive` | Redução `저의 → 제` descrita como "omissão" de 의 | alta |  |
| A1M3-007 | MINOR | A1 | a1-m03 | `g:a1-l15-honorific` | `드세요` glosado como "forma honorífica de oferecer", convidando confusão com `드리다` | média |  |
| A1M3-008 | MINOR | A1 | a1-m03 | `a1-l15-d4` | Registro do diálogo usa honorífico de oferta entre colegas, contra o aviso da própria gramática | média |  |
| A1M3-009 | MINOR | A1 | a1-m03 | `g:a1-l13-position` | Fórmula "A ordem é referência → posição → lugar" rotula mal o terceiro elemento | alta |  |
| A1M3-010 | MINOR | A1 | a1-m03 | `a1-l11-d2` | Traduções pt fixam gênero onde o coreano é neutro (선생님, 동생) | média |  |
| A1M3-011 | MINOR | A1 | a1-m03 | `vocabulário a1-l12 (forma de dicionário, fora da ficha)` | Adjetivos do módulo com `pos: "verbo"` nos cartões de vocabulário | alta (é inconsistência taxonômica; não afeta correção de exercícios) |  |
| A1M3-012 | MINOR | A1 | a1-m03 | `a1-l15-d1` | "초대 감사합니다" é fórmula truncada; padrão é "초대해 주셔서 감사합니다" | média |  |
| A1M3-013 | MINOR | A1 | a1-m03 | `a1-l14-e09` | Tradução ko-pt acrescenta possessivo não presente e rejeita variantes fiéis | média |  |
| A1M3-014 | MINOR | A1 | a1-m03 | `g:a1-l12-identify` | FORM da nota "Identificar uma pessoa" descreve padrão confuso | média |  |
| A1M4-001 | MAJOR | A1 | a1-m04-v2 | ``a1-l16-e05`, `a1-l16-e10`, `a1-l18-e05`, `a1-l20-e05`, `a1-l20-e10`, `a1-c04-e24`` | Itens pt-ko rejeitam variantes sem tópico que o próprio curso ensina | média (a austeridade pode ser escolha deliberada de grading; o conflito com a elipse ensinada é que a torna defensível como erro) |  |
| A1M4-002 | MINOR | A1 | a1-m04-v2 | ``a1-l18-e08`` | `오천` cobrado em listen antes de ser ensinado | alta |  |
| A1M4-003 | MINOR | A1 | a1-m04-v2 | ``a1-l19-e07`, `a1-c04-e10`` | `가게` usado em leitura avaliada duas lições antes de ser ensinado | alta |  |
| A1M4-004 | MINOR | A1 | a1-m04-v2 | ``g:a1-l19-more` (e exemplos `g:a1-l19-more/ex`)` | FORM de `더` omite o adnominal `-(으)ㄴ` que a própria forma exige | alta |  |
| A1M4-005 | MINOR | A1 | a1-m04-v2 | ``a1-l17-d3`` | Tradução de `주스 드세요?` perde a função de oferta | média |  |
| A1M4-006 | MINOR | A1 | a1-m04-v2 | ``g:a1-l18-pay`, `g:a1-l18-pay/ex`, `a1-l18/intro` (painel "Pagar")` | `카드 있어요?/현금 있어요?` com glosa literal enganosa | baixa (quanto ao coreano) / alta (quanto à glosa enganosa) |  |
| A1M4-007 | MINOR | A1 | a1-m04-v2 | ``a1-l18-d5`, `a1-l18-d6`` | `현금이에요.` dito sem pergunta prévia de pagamento | média |  |
| A1M4-008 | MINOR | A1 | a1-m04-v2 | ``g:a1-l18-price` (exemplo 2), `g:a1-l18-price/ex`, `a1-l18/intro` (painel "Preço")` | `전부 얼마예요?` é compreensível, mas rígido; glosa `Quanto é tudo?` literal | média |  |
| A1M4-009 | MINOR | A1 | a1-m04-v2 | ``a1-l20-d4`` | `같이 먹어요.` declarativo traduzido como proposta `Vamos comer juntos.` | média |  |
| A1M4-010 | MINOR | A1 | a1-m04-v2 | ``a1-c04` — campo `instructions` (fora da ficha; não há linha de item na sheet)` | Instruções do c04 citam "transação roteirizada" que não existe no checkpoint | alta |  |
| A1M4-011 | INCERTO | A1 | a1-m04-v2 | ``a1-l19` — campo `vocabulary.reusedIds` (fora da ficha)` | L19 reusa cartões de vocabulário que não aparecem na lição | baixa |  |
| A1M4-001 | MAJOR | A1 | a1-m04 | `a1-l16-e09 (também a1-l20-e09, a1-c04-e25)` | Tradução ko→pt exige pronome "Eu" explícito e rejeita a resposta mais natural em pt-BR | alta |  |
| A1M4-002 | MAJOR | A1 | a1-m04 | `a1-l16-e05 (também a1-l16-e10, a1-l20-e05, a1-l20-e10, a1-c04-e24; parcialmente a1-l18-e10)` | Tradução pt→ko rejeita coreano sem sujeito (omissão canônica de 저는/나는) | média |  |
| A1M4-003 | MINOR | A1 | a1-m04 | `g:a1-l20-refuse (também a1-l20/intro "Recusar com 안", a1-l20/sum2, a1-l20-e07)` | Negação de -고 싶다 ensinada só com 안, sem a forma canônica -고 싶지 않아요 | média |  |
| A1M4-004 | MINOR | A1 | a1-m04 | `a1-l17-d3` | "주스 드세요?" como oferta de atendente soa a ordem, não a oferecimento; tradução PT acompanha a estranheza | média |  |
| A1M4-005 | MINOR | A1 | a1-m04 | `g:a1-l18-price/ex, a1-l18/intro, a1-l18/sum2, vocab l18 "전부"` | "전부 얼마예요?" é atestável mas marcado; glosa PT "Quanto é tudo?" é literal | média |  |
| A1M4-006 | MINOR | A1 | a1-m04 | `g:a1-l19-modifier` | Regra "Não use 은/는 entre o demonstrativo e o substantivo" é confusa junto dos exemplos | alta |  |
| A1M4-007 | MINOR | A1 | a1-m04 | `g:a1-l17-hago` | Frase ambígua: "Ele não liga orações como 그리고" | alta |  |
| A1M4-008 | MINOR | A1 | a1-m04 | `a1-l18-e05 (explicação X)` | Explicação de "얼마예요?" descreve -예요 como marcador de pergunta | alta |  |
| A1M4-009 | MINOR | A1 | a1-m04 | `g:a1-l16-taste, a1-l16/intro "Sabor"` | Sabor descritos como "adjetivos" na gramática, mas registrados como "verbo" no vocabulário | alta |  |
| A1M4-010 | MINOR | A1 | a1-m04 | `a1-l19-e10 (também a1-c04-e23)` | Item cobra produção de "보세요" sem formalizar -아/어 보세요 (chunk-only; padrão só vira gramática em A2) | média |  |
| A1M4-011 | MINOR | A1 | a1-m04 | `a1-c04 (instructions)` | Instrução do checkpoint descreve um item de autoavaliação que não existe em a1-c04 | alta |  |
| A1M5-001 | CRÍTICO | A1 | a1-m05-v2 | `g:a1-l25-appointment e g:a1-l25-appointment/ex` | ponto de encontro com 만나요 exige 에서, não 에: "극장 앞에 만나요" ensina coreano errado | alta | CONFIRMADO (contradição interna com a1-l23) |
| A1M5-002 | MAJOR | A1 | a1-m05-v2 | `g:a1-l22-transport e a1-l22/intro` | regra de (으)로 omitida a exceção do ㄹ e contradiz seu próprio exemplo "지하철로" | alta |  |
| A1M5-003 | MAJOR | A1 | a1-m05-v2 | `a1-l21-e08 (padrão), a1-l23-e08, a1-l25-e08, a1-c05-e01, a1-c05-e02, a1-c05-e03` | enunciados de listen pedem "escreva o destino/horário/localização", mas o gabarito é a frase inteira | alta |  |
| A1M5-004 | MAJOR | A1 | a1-m05-v2 | `a1-l21-e05, a1-c05-e24` | tradução pt→ko rejeita variantes que o próprio curso ensina (omissão do tópico e ordem flexível) | alta |  |
| A1M5-005 | MAJOR | A1 | a1-m05-v2 | `a1-l21-e09 (padrão), a1-l24-e09, a1-l25-e09, a1-c05-e25` | acceptedAnswers ko→pt incompletos: pontuação não é normalizada e variantes sem pronome são rejeitadas | alta |  |
| A1M5-006 | MAJOR | A1 | a1-m05-v2 | `a1-l24-e01 (padrão), a1-l24-e06, a1-l24-e02` | clozes "Complete a instrução" aceitam uma única lacuna verbal embora outra instrução ensinada seja igualmente válida | alta (e01, e06); média (e02) |  |
| A1M5-007 | MINOR | A1 | a1-m05-v2 | `g:a1-l25-accept/ex` | exemplo sob a nota "좋아요 — aceitar" não contém 좋아요 | alta |  |
| A1M5-008 | MINOR | A1 | a1-m05-v2 | `a1-l23/intro` | intro chama "tópico" ao sujeito marcado por 가: "Use o lugar como tópico: 역이 어디에 있어요?" | alta |  |
| A1M5-009 | MINOR | A1 | a1-m05-v2 | `a1-l23-e07 (e seu X)` | "약국은 사거리에서 왼쪽에 있어요": para posição com 있다 o padrão é referência direta, sem 에서 | média |  |
| A1M5-010 | MINOR | A1 | a1-m05-v2 | `g:a1-l22-route` | FORM "destino + transporte + duração" contradiz o exemplo e o corpo da própria nota | alta |  |
| A1M5-011 | MINOR | A1 | a1-m05-v2 | `g:a1-l24-action-please` | FORM "verbo + 주세요" omite o conector -아/어 | alta |  |
| A1M5-012 | MINOR | A1 | a1-m05-v2 | `g:a1-l23-eseo/ex` | "여기에서 기다려요." traduzido como imperativo "Espere aqui." é mais forte que o original | média |  |
| A1M5-013 | MINOR | A1 | a1-m05-v2 | `a1-l22-e09` | "O que 걸리다 significa neste contexto?" sem contexto apresentado no item | alta |  |
| A1M5-014 | MINOR | A1 | a1-m05-v2 | `a1-l24-e08 (e X; frase do vocabulário ko:횡단보도)` | "횡단보도로 건너세요." — o padrão ensinado para 건너다 é objeto + 를; 로 aqui é sentido não declarado | média |  |
| A1M5-015 | MINOR | A1 | a1-m05-v2 | `a1-l24-e09, a1-l25-e09` | "어디예요?" circula primeiro nos exercícios sem bloco que o apresente | média |  |
| A1M5-016 | MINOR | A1 | a1-m05-v2 | `g:a1-l25-refuse` | blueprint declara "미안하지만" para l25; a lição implementa "미안해요 + razão" (e -지만 nunca é ensinado em A1) | alta |  |
| A1M5-001 | MAJOR | A1 | a1-m05 | `a1-l21-e08` | Enunciado de escuta pede só um dado, mas o gabarito exige a frase inteira | alta | CONFIRMADO (contradição interna com a1-l23) |
| A1M5-002 | MAJOR | A1 | a1-m05 | `a1-l21-e09` | Traduções ko-pt rejeitam variante legítima com sujeito omitido | média-alta (a rigidez é escolha determinística conhecida do app; o que se |  |
| A1M5-003 | MINOR | A1 | a1-m05 | `g:a1-l24-action-please` | FORM “verbo + 주세요” descreve o padrão sem o conector -아/어 | alta |  |
| A1M5-004 | MINOR | A1 | a1-m05 | `a1-l23/intro (painel “Perguntar a localização”)` | Intro rotula de “tópico” uma frase com marcador de sujeito 이 | alta |  |
| A1M5-005 | MINOR | A1 | a1-m05 | `a1-c05-e17` | Checkpoint rotula 계단으로 de “meio”, quando a lição o apresentou como caminho | alta |  |
| A1M5-006 | MINOR | A1 | a1-m05 | `g:a1-l23-eseo/ex2` | Exemplo declarativo traduzido como imperativo (“Espere aqui.”) | média |  |
| A1M5-007 | MINOR | A1 | a1-m05 | `a1-l22-e09` | Item pergunta “neste contexto” sem apresentar contexto | alta |  |
| A1M5-008 | MINOR | A1 | a1-m05 | `g:a1-l22-duration/ex2` | “육십 분 걸려요” é marcação rara para naturalidade coreana | média |  |
| A1M5-009 | MINOR | A1 | a1-m05 | `vocabulário a1-l22 (ko:빠르다, ko:느리다, ko:가깝다, ko:멀다) e a1-l25 (ko:미안하다, ko:가능하다)` | Vocabulário classifica adjetivos (빠르다/가깝다…) como “verbo” | alta (constatação) — a escolha de correção é de design do produto |  |
| A1M5-010 | MINOR | A1 | a1-m05 | `a1-l21 OBJ/blueprint l21 e blueprint l23 (“에서 como origem”)` | Blueprint declara “origem” no módulo, e o conteúdo nunca a apresenta | alta |  |
| A1M5-011 | INCERTO | A1 | a1-m05 | `sent:a1-l24:나가다` | “여기에서 나가세요.” → “Saia por aqui.”: origem ou rota? | baixa |  |
| A1M6-001 | MAJOR | A1 | a1-m06 | ``a1-l26-e03`, `a1-l27-e03`, `a1-c06-e01`, `a1-c06-e02`, `a1-c06-e03`` | Enunciado de `listen` pede um constituinte, mas o gabarito só aceita a frase inteira | alta (o conflito literal existe); o risco prático real é atenuado pela exposição repetida ao padrão desde l01 | CONFIRMADO (padrão sistêmico medido: 65 itens de escuta) |
| A1M6-002 | MINOR | A1 | a1-m06 | ``g:a1-l27-questions`` | FORM da nota `g:a1-l27-questions` contém "질문 +", resquício do bloco acima | alta |  |
| A1M6-003 | MINOR | A1 | a1-m06 | ``g:a1-l29-time`` | Explicação de `g:a1-l29-time` afirma regra sem sentido ("repetir o verbo no passado") | alta (a frase não descreve nenhuma propriedade verificável do coreano) |  |
| A1M6-004 | MINOR | A1 | a1-m06 | ``a1-l27-d6`` | `a1-l27-d6` "괜찮아요. 연습해요." — leitura natural é declarativa, não "pratique" | média |  |
| A1M6-005 | MINOR | A1 | a1-m06 | ``a1-l28-d4`/`a1-l28-d5`` | `a1-l28-d5` não responde à pergunta de `a1-l28-d4` | alta |  |
| A1M6-006 | MINOR | A1 | a1-m06 | `frase `a1-l28` / `초대하다` (cartão `v:초대하다`)` | Frase-modelo de `초대하다` acrescenta possessivo que não existe no coreano | alta |  |
| A1M7-001 | MAJOR | A1 | a1-m07 | ``a1-l31-e05`, `a1-l31-e09`, `a1-l31-e10`, `a1-l33-e09`, `a1-l33-e10`, `a1-l35-e05`, `a1-l35-e09`, `a1-l35-e10`, `a1-c07-e24`, `a1-c07-e25`` | `acceptedAnswers` rejeita variantes plenamente válidas (omissão de `저는` e pontuação) | alta |  |
| A1M7-002 | MINOR | A1 | a1-m07 | ``a1-l34-d4`` | pedido de permissão traduzido por interrogativa neutra | média (leitura pragmática dependente de contexto) |  |
| A1M7-003 | MINOR | A1 | a1-m07 | ``a1-l31-e07`` | `찍었어요` usado em item avaliado da l31, ensinado só na l35 | alta (para a ocorrência), baixa (quanto ao peso: item não é |  |
| A1M7-004 | MINOR | A1 | a1-m07 | ``g:a1-l34-boundary/ex` (linha da ficha `건강이 좋아요.`), frase vocab` | `스트레스가 있어요` / `건강이 좋아요`: collocations apresentadas como modelo, pouco idiomáticas | média |  |
| A1M7-005 | MINOR | A1 | a1-m07 | `frase vocab `구경하다` (`a1-course.ts:425`)` | tradução de `시장을 구경했어요` desloca o sentido | alta |  |
| A1M7-006 | MINOR | A1 | a1-m07 | ``a1-c07` bloco `instructions` (4º item)` | instrução do checkpoint anuncia tarefas de autoavaliação que não existem | alta |  |
| A1M8-001 | MINOR | A1 | a1-m08 | `a1-l36-e09` | Tradução ko-pt principal inverte a polaridade da pergunta | média |  |
| A1M8-002 | MINOR | A1 | a1-m08 | `g:a1-l36-repair/ex e a1-l36-d4` | “Carne de porco não pode” é literal e enganosa para 돼지고기는 안 돼요 | média |  |
| A1M8-003 | MAJOR | A1 | a1-m08 | `a1-l37-e01` | Cloze de partícula rejeita variante igualmente válida (은) | alta (gramaticalidade de “승강장은 어디예요?”) |  |
| A1M8-004 | MINOR | A1 | a1-m08 | `a1-l36-e02` | Cloze rejeita a forma colada do auxiliar, permitida pela ortografia | alta (para a regra de orthography); a decisão de aceitar variantes é do |  |
| A1M8-005 | MINOR | A1 | a1-m08 | `a1-l38-d3 (e g:a1-l38-so/ex)` | 사정 traduzido como “circunstância” produz frase literal em pt-BR | média |  |
| A1M8-006 | MINOR | A1 | a1-m08 | `g:a1-l38-courtesy/ex e a1-l38-d5` | “Compreenda, por favor.” não espelha o registro de 양해해 주세요 | média |  |
| A1M8-007 | MINOR | A1 | a1-m08 | `a1-l39-e03 (e a1-l39/intro, a1-l39-e09)` | “제 성격은 조용해요” é margem de naturalidade em coreano | média |  |
| A1M8-008 | MINOR | A1 | a1-m08 | `a1-l36/compl (vocabulary block da lição; sem ID de linha na ficha)` | reusedIds de M8 declaram palavras que não ocorrem na lição | alta (verificação mecânica reproduzível) |  |
| A1M8-009 | MINOR | A1 | a1-m08 | `g:a1-l36-* (conjunto de notas da lição)` | Blueprint l36 (“negação e desejo”; obj. “preferência”) não chega ao conteúdo de l36 | alta (discrepância documental reproduzível) |  |
| A2M1-001 | CRÍTICO | A2 | a2-m01 | ``a2-l02-e01` [mcq/guided]` | Gabarito de MCQ fora das opções | alta | CONFIRMADO (motor: nenhuma opção casa com o gabarito) |
| A2M1-002 | MAJOR | A2 | a2-m01 | ``a2-l05-g2/ex`` | Exemplo de -는데 é agramatical no uso | alta |  |
| A2M1-003 | MAJOR | A2 | a2-m01 | ``a2-l04-d4`, `a2-l04-g2/ex`, `a2-l04-e07`` | Estrutura `-았/어야 했어요` cobrada sem ensino prévio | alta |  |
| A2M1-004 | MAJOR | A2 | a2-m01 | ``a2-l01-e06`, `a2-l02-e06`` | Marcos de lições futuras usados como distratores | média (a sugestão exata de distrator merece escolha editorial) |  |
| A2M1-005 | MINOR | A2 | a2-m01 | ``a2-l01-d2`, `a2-l01-e01 X`, `a2-l01-e05`, `a2-c01-e21`` | Tradução fixa gênero onde o coreano não fixa | alta |  |
| A2M1-006 | MINOR | A2 | a2-m01 | ``a2-l01-d6`` | `-겠-` de suposição sem nota | média |  |
| A2M1-007 | MINOR | A2 | a2-m01 | ``a2-l04-e09`, `a2-c01-e23`` | Redundão e ponto de vista na tradução de causa | alta |  |
| A2M1-008 | MINOR | A2 | a2-m01 | ``a2-l03-e10`` | Comparação com sujeito indefinido | alta |  |
| A2M1-009 | INCERTO | A2 | a2-m01 | ``a2-l01-d5`, `a2-l01-g1` (que exemplifica `피크닉했어요`), `a2-c01-e01`` | `피크닉을 했어요` × colgação com `하다` | baixa (decisão editorial) |  |
| A2M1-010 | MINOR | A2 | a2-m01 | ``a2-c01-e12`` | Personagens de lições futuras no checkpoint | alta |  |
| A2M2-001 | MAJOR | A2 | a2-m02 | `a2-l06-e05 (paradigma; ver Impacto)` | Itens translate exigem a pontuação final exata; a variante sem ponto é rejeitada | alta | CONFIRMADO (126 itens de produção só aceitam a forma pontuada em A2) |
| A2M2-002 | MAJOR | A2 | a2-m02 | `a2-l06-g1` | FORM "-려고 해요" omite a variante -으려고, mas a própria lição usa 쌓으려고 | alta | CONFIRMADO |
| A2M2-003 | MAJOR | A2 | a2-m02 | `a2-l08-e06` | Distrator "잔 후에" é forma ortograficamente inexistente (correcto: 잰 후에) | alta | REJEITADO (잔 후에 é forma válida de 자다; o revisor trocou por 잰) |
| A2M2-004 | MAJOR | A2 | a2-m02 | `a2-l07-e02 e a2-c02-e20` | Cloze sem acceptedAnswers rejeita variantes válidas (는 것이 / 주어야) | média |  |
| A2M2-005 | MINOR | A2 | a2-m02 | `a2-l07-e09 (apresentação em a2-l07-d4)` | -(으)ㄹ/는 것 같다 é cobrado em l07 sem nota gramatical; taught declarada só em a2-l31 | alta |  |
| A2M2-006 | MINOR | A2 | a2-m02 | `a2-l08-g1` | "-기 전에 não recebe passado" é generalização excessiva | média |  |
| A2M2-007 | MINOR | A2 | a2-m02 | `a2-l07-e09` | acceptedAnswer de l07-e09 inverte o grau de 조금 ("cedo demais") | alta |  |
| A2M2-008 | MINOR | A2 | a2-m02 | `a2-l06-g2/ex1 (paradigma)` | 취업하다 traduzido como "procurar emprego"; 경력을 쌓다 como "acumular experiência" | média |  |
| A2M2-009 | MINOR | A2 | a2-m02 | `a2-l09-g3` | "suavize com -아/어야 해요" confunde registro com força modal | alta |  |
| A2M2-010 | MINOR | A2 | a2-m02 | `a2-l10-g1` | g1 de l10 descreve a ordem da condição ao contrário | alta |  |
| A2M2-011 | MINOR | A2 | a2-m02 | `a2-l07-e10 (paradigma)` | substantivos cobrados em itens antes do registro vocabular (ou nunca registrados) | média |  |
| A2M2-012 | MINOR | A2 | a2-m02 | `a2-l10-e09` | pt-BR de gabarito/fala truncado ou pouco idiomático | média |  |
| A2M2-013 | INCERTO | A2 | a2-m02 | `a2-l07-g2/ex1 (também a2-l07-d5, a2-l07-e03, a2-c02-e12)` | "만나기로 해요" (presente) para registrar o acordo pode soar a calque de "만나는 걸로 해요" | baixa |  |
| A2M3-001 | MAJOR | A2 | a2-m03 | `a2-l13-d5` | “삼 층이에요.” com espaço não padrão; ditado rejeita a grafia correta “삼층” | alta | CONFIRMADO COM PREMISSA CORRIGIDA (삼 층 é princípio; falta a variante 삼층) |
| A2M3-002 | MAJOR | A2 | a2-m03 | `a2-l14-g1` | FORM “radical + -는데(요)” omite o alomorfe adjetival -(으)ㄴ데, mas o exemplo exige ㅂ irregular | alta | CONFIRMADO |
| A2M3-003 | MAJOR | A2 | a2-m03 | `a2-l14-d3` | tradução de a2-l14-d3 acrescenta “demais” que contradiz “um pouco” e não está no coreano | alta |  |
| A2M3-004 | MAJOR | A2 | a2-m03 | `a2-l15-e05` | ditado pt-ko rejeita a construção transitiva padrão “친구들을 그리워요” | média |  |
| A2M3-005 | MINOR | A2 | a2-m03 | `a2-l13-d4` | “어느 층에 사세요?” soa artificial; o padrão para andar é “몇 층” | média |  |
| A2M3-006 | MINOR | A2 | a2-m03 | `a2-l14/intro` | painel “Pedido negativo com -지 말다” usa frase que não contém -지 말다 | alta |  |
| A2M3-007 | MINOR | A2 | a2-m03 | `a2-l11-g1` | explicação de -는 게 diz “contraída de 이/가” quando é a contração de 것이 | alta |  |
| A2M3-008 | MINOR | A2 | a2-m03 | `a2-l11-e09` | “보증금이 너무 비싸요”: colicação duvidosa (depósito é “alto”, não “caro”) | média |  |
| A2M3-009 | MINOR | A2 | a2-m03 | `a2-l15-d1` | -(다)면서요 (ouvir dizer) aparece na conversa antes de qualquer lição de discurso reportado | média |  |
| A2M3-010 | MINOR | A2 | a2-m03 | `a2-c03-e11` | enunciado de a2-c03-e11 pergunta “a mudança”, mas o texto só informa o tempo da embalagem | alta |  |
| A2M4-001 | MAJOR | A2 | a2-m04 | `a2-l16-e10; a2-l19-g2/ex (exemplo 2); a2-l19-e04; a2-c04-e10` | Discurso indireto de ordem (`-(으)라고 하다`) cobrado em itens avaliados antes de ser ensinado | alta | CONFIRMADO |
| A2M4-002 | MAJOR | A2 | a2-m04 | `a2-l19-e10; a2-c04-e12` | `-(으)ㄹ 때` aparece pela primeira vez já em texto avaliado (l19-e10 / c04-e12) | média | CONFIRMADO |
| A2M4-003 | MINOR | A2 | a2-m04 | `a2-l18-d6` | l18-d6: matiz de `-아/어 보다` + `-면 되다` não bate com a pergunta de duração em português | média |  |
| A2M4-004 | MINOR | A2 | a2-m04 | `a2-l16-g1; a2-l16-g1/ex (exemplo 2 "기침이 나고 콧물이 있어요.")` | l16-g1: exemplos misturam `있어요` com a collocation padrão `나다` (콧물이 있어요) | média |  |
| A2M4-005 | MINOR | A2 | a2-m04 | `a2-l19-g1` | l19-g1: campo FORM omite o `-(으)면`, que é a forma ensinada | alta |  |
| A2M4-006 | MINOR | A2 | a2-m04 | `a2-l17-g1/ex; a2-l17-d2; a2-l17-e01/e02 X; a2-l16-e01 O2 (ecoa em l19/l20 e c04)` | PT "lombar" sozinho soa clínico para `허리` nas traduções recorrentes | média |  |
| A2M5-001 | MAJOR | A2 | a2-m05 | `a2-l22-e10, a2-l23-e10, a2-l25-e04, a2-c05-e12` | Discurso indireto avaliado nunca foi ensinado em A1/A2 | alta | CONFIRMADO |
| A2M5-002 | MAJOR | A2 | a2-m05 | `a2-l23-e05` | Item "formal" aceita resposta informal no gabarito | alta |  |
| A2M5-003 | MINOR | A2 | a2-m05 | `a2-l23-g1` | Regra de `-ㅂ니다/-습니다` sem a exceção dos radicais em `-ㄹ` | alta |  |
| A2M5-004 | MINOR | A2 | a2-m05 | `a2-l21-d5` | Tradução de `재미있어요` altera sentido e acrescenta camada | alta |  |
| A2M5-005 | MINOR | A2 | a2-m05 | `a2-l21/intro (2º painel)` | Painel de introdução explica `에서/에` de forma incoerente com o exemplo | alta |  |
| A2M5-006 | MINOR | A2 | a2-m05 | `a2-l22-e04` | Explicação do gabarito cita frase diferente do texto avaliado | alta |  |
| A2M5-007 | MINOR | A2 | a2-m05 | `a2-l23-e04` | X cita forma com `-는 편이다` não ensinada e ausente do texto avaliado | média (o uso é coreano natural e correto; o problema é exclusivamente pedagógico) |  |
| A2M5-008 | MINOR | A2 | a2-m05 | `a2-l23-g1, a2-l23/intro (1º painel), a2-l23-d1` | Registro formal ensinado sem explicar a convivência `-(으)ㅂ니다` × `-(으)세요/-시겠어요` | média |  |
| A2M5-009 | MINOR | A2 | a2-m05 | `a2-l24-e10` | `-면서` simultâneo nunca ensinado e `듣기를 공부해요` pouco idiomático | média |  |
| A2M5-010 | MINOR | A2 | a2-m05 | `a2-l24-d6 (ecoada em a2-l24-e09)` | Frase de encorajamento soa como promessa de resultado | média (juízo de registro/promessa, não de gramática) |  |
| A2M5-011 | MINOR | A2 | a2-m05 | `a2-l25-d3` | "언제까지 할 수 있어요?" pouco natural para pergunta de prazo | média (INCERTO-adjacente: aceitável no uso coloquial) |  |
| A2M5-012 | MINOR | A2 | a2-m05 | `a2-l21-e08, a2-l22-e01, a2-l23-e06, a2-l25-e09, a2-c05-e01, a2-c05-e02` | Lexias nucleares do módulo sem cartão de vocabulário | alta (cheque mecânico) |  |
| A2M5-013 | MINOR | A2 | a2-m05 | `a2-l21-g2` | `-부터 -까지` reensinado como novo; "기 nominalização" prometida só aparece em l25 | alta |  |
| A2M6-001 | MAJOR | A2 | a2-m06 | ``a2-l30-g1` (e `a2-l30-g1/ex` ×2, `a2-l30-e02`)` | FORM `-았/었고` contradiz os próprios exemplos e a lógica do relato em sequência | alta | CONFIRMADO |
| A2M6-002 | MAJOR | A2 | a2-m06 | ``a2-l28-e04` [reading/guided], `a2-c06-e09` [reading/independent]` | Leitura cobra discurso indireto `-(으)ㄴ다고/겠다고 했어요` nunca ensinado | alta |  |
| A2M6-003 | MAJOR | A2 | a2-m06 | ``a2-l29-e07` [cloze/independent], `a2-c06-e19` [cloze/independent]` | Cloze rejeita variantes aceitas pelo próprio app (`면`, `는 것이`) | alta |  |
| A2M6-004 | MINOR | A2 | a2-m06 | ``a2-l26-g1`, `a2-l26/intro` (painel "Pedido cortês ao serviço")` | FORM/título de `-는지` não descrevem as frases ensinadas | alta |  |
| A2M6-005 | MINOR | A2 | a2-m06 | ``a2-l26-d3`, `a2-l26-d5`, `a2-l27-d2`, `a2-l27-d6`, `a2-l28-d2`, `a2-l28-d4`, `a2-l28-d6`` | Registro do funcionário alterna 합쇼체/해요체 dentro do mesmo turno | média |  |
| A2M6-006 | MINOR | A2 | a2-m06 | ``a2-l27-g2`` | Afirmação sem base: "-는 동안에 é mais específico" | média |  |
| A2M6-007 | MINOR | A2 | a2-m06 | ``a2-l28-d4`` | `아마 … 있을 수 있어요` não é a combinação natural de conjectura | média |  |
| A2M6-008 | MINOR | A2 | a2-m06 | ``a2-l28/intro` (painel "Pedir solução com -겠-"), `a2-l28-g2`` | Rótulo "-겠- de solicitação" sem exemplo de solicitação | alta |  |
| A2M6-009 | MINOR | A2 | a2-m06 | ``a2-l27-e03`, `a2-c06-e02` [listen]` | Ditado `십이 번` não aceita a grafia colada corrente | média |  |
| A2M6-010 | MINOR | A2 | a2-m06 | ``a2-l26-d1`` | `무슨 도움이 필요하세요?` menos idiomático para balcão | média |  |
| A2M6-011 | MINOR | A2 | a2-m06 | ``a2-l26-e10` [reading/independent], `a2-c06-e12`` | `-(으)ㄹ 때` aparece pela primeira vez cobrado em item sem ensino | média |  |
| A2M6-012 | MINOR | A2 | a2-m06 | ``a2-l30` — linha de vocabulário (fonte, não está na ficha)` | `사건` em relato de viagem tem viés de ocorrência policial | média |  |
| A2M6-013 | INCERTO | A2 | a2-m06 | ``a2-l26-d2`, `a2-l26-g2/ex`, `a2-l26-e01`, `a2-l26-e04`, `a2-l26-e05`, `a2-l26-e07`, `a2-c06-e07`, `a2-c06-e16`, `a2-c06-e21`` | `이틀 연박` ↔ "duas noites": contador de noites é `박` | baixa |  |
| A2M7-001 | MAJOR | A2 | a2-m07 | `a2-l33-e02` | Cloze só aceita `계세요` e rejeita a variante padrão `계셔요` | alta | CONFIRMADO (motor rejeita '계셔요') |
| A2M7-002 | MAJOR | A2 | a2-m07 | `a2-l33-e07` | Cloze só aceita a forma cheia `뵈었어요` e rejeita a contração padrão `뵀어요` | alta | CONFIRMADO (motor rejeita '뵀어요') |
| A2M7-003 | MAJOR | A2 | a2-m07 | `a2-l32-e03` | Ditado cobra `-(으)ㄹ 것 같으면`, combinação jamais apresentada como FORM | média (é ditado a partir de linha visível do diálogo, com tradução ao lado; cada morfema foi visto isolado: `-ㄹ` em l06 `-(으)ㄹ 거예요`, `-면` em l10, `-는 것 같다` em l31) |  |
| A2M7-004 | MAJOR | A2 | a2-m07 | `a2-l35-e06` | Distrator "항상 그렇지 않아요" também evita generalização absoluta (dois gabaritos defensáveis) | média |  |
| A2M7-005 | MINOR | A2 | a2-m07 | `a2-l31-d3` | Avaliação de filme assistido ontem no presente (`어려운 것 같아요`) e tempo da tradução | baixa-média (não é erro claro; variante defensável) |  |
| A2M7-006 | MINOR | A2 | a2-m07 | `a2-l35-g1/ex (primeiro par de exemplos)` | Exemplo 1 de g1 em l35 não ilustra o FORM declarado (`A보다 B가 더 / B는 A처럼`) | alta (sobre a inconsistência), baixa (sobre a frase substituta — precisa revisão nativa) |  |
| A2M7-007 | MINOR | A2 | a2-m07 | `a2-l31-e06` | "Qual frase expressa opinião?" tem distrator avaliativo (`영화가 길어요`) | média |  |
| A2M7-008 | MINOR | A2 | a2-m07 | `a2-l35-e05` | Higiene de dados: `acceptedAnswers` idêntico à resposta (tradução l35-e05) | alta |  |
| A2M7-009 | MINOR | A2 | a2-m07 | `a2-l33-g2, a2-l34-g2` | Campos FORM não-formula em 2 blocos ("formas humildes/honoríficas", "contexto + contraste") | média |  |
| A2M8-001 | MAJOR | A2 | a2-m08 | `a2-l40-e02 (cloze); apoio: a2-l40-g1/ex1, a2-l40-d2, a2-l40-e04, a2-l40-e10, a2-c08-e20` | `-면서` (simultaneidade) é cobrado em produção sem nunca ter sido ensinado | alta | CONFIRMADO (marco fora do blueprint) |
| A2M8-002 | MAJOR | A2 | a2-m08 | `a2-c08-e12 (reading)` | "지우는 해외에서 산 적이 없어요" é ambíguo e não é a forma natural do marco de experiência | média | CONFIRMADO |
| A2M8-003 | MINOR | A2 | a2-m08 | `a2-c08-e02 (listen)` | gabarito-canônico do ditado viola a regra de 띄어쓰기 de contagem "한 번" | alta |  |
| A2M8-004 | MINOR | A2 | a2-m08 | `a2-c08-e22 (cloze)` | cloze de experiência cobra "-(으)ㄴ 적이" em vez do marco ensinado "-아/어 본 적이", inconsistente com e32 | média |  |
| A2M8-005 | MINOR | A2 | a2-m08 | `a2-c08-e18 (reading)` | enunciado traduz "자료" como "dados" (falso-cognato pt) | alta |  |
| A2M8-006 | MINOR | A2 | a2-m08 | `a2-l37-e04 (reading)` | forma de discurso relatado "-(으)ㄹ다고 했어요" em item avaliado sem marco ensinado | média |  |
| A2M8-007 | INCERTO | A2 | a2-m08 | `a2-l40-d1 (fal:line), a2-l40-e10 (reading)` | transliteração "에이 투" para "A2" (grafia/pronúncia de código alfanumérico) | baixa |  |
| A2M8-008 | MINOR | A2 | a2-m08 | `a2-l37 (g1/g2/intro/dialogue todos), cobrança em a2-c08-e25` | blueprint promete "-아/어야 하다 revisado" em l37, mas o lote inteiro não revisa a obrigação (e o c08 cobra) | alta |  |
| A2M8-009 | MINOR | A2 | a2-m08 | `a2-l36-e10 (reading)` | "-기도 해요" em item avaliado de l36 sem ensino prévio (leitura de gist, inferível) | alta (quanto à ausência); baixa quanto à necessidade de mudança. |  |
| V1-001 | MAJOR | A1 | vocab-a1 | `ko:크다 (representante; mesma marca em ko:작다, ko:예쁘다, ko:귀엽다, ko:재미있다, ko:조용하다, ko:활발하다, ko:친절하다, ko:바쁘다, ko:달다, ko:맵다, ko:맛있다, ko:배고프다, ko:배부르다, ko:비싸다, ko:빠르다, ko:느리다, ko` | Esquema `pos` não tem "adjetivo/descritivo"; ~29 adjetivos (형용사) são ensinados como `verbo` | alta |  |
| V1-002 | MAJOR | A1 | vocab-a1 | `ko:입어 보다` | Lema `입어 보다` grafado com espaço; a forma canônica é `입어보다` | alta |  |
| V1-003 | MAJOR | A1 | vocab-a1 | `sent:a1-l33:감기` | Frase de `감기` contém a palavra apenas dentro do composto `감기약`; validador não verifica fim de palavra | alta (caso), média (extensão do validador) | CONFIRMADO |
| V1-004 | MAJOR | A1 | vocab-a1 | `sent:a1-l36:돼지고기` | `돼지고기 없어요?` traduzido como "Você tem carne de porco?" inverte a polaridade da pergunta | média-alta | CONFIRMADO |
| V1-005 | MAJOR | A1 | vocab-a1 | `sent:a1-l23:사거리` | `만나요` lido/vertido como declarativo "Eu encontro" em cena de convite ("Vamos nos encontrar") | média-alta | CONFIRMADO |
| V1-006 | MINOR | A1 | vocab-a1 | `ko:주세요, ko:앉으세요, ko:드세요, ko:괜찮아요, ko:죄송합니다, ko:아니에요, ko:뭐라고요, ko:잠깐만요, ko:도와주세요, ko:잠시만요, ko:환영합니다, ko:어서 오세요, ko:무슨 뜻이에요, ko:어떻게 말해요, ko:이해가 안 돼요, ko:문제없어요, ko:안녕하세요, ko` | 20 entradas "forma de dicionário" são chunks flexionados/não-lema com `pos: interjeição` | alta (descrição), média (reclassificação) |  |
| V1-007 | MINOR | A1 | vocab-a1 | `ko:어떤 (idem ko:어느, ko:다른)` | Determinantes `어떤/어느/다른` classificados como `pronome` (falta categoria "determinante/adnominal") | média |  |
| V1-008 | MINOR | A1 | vocab-a1 | `ko:대신` | `대신` com `pos: advérbio`, mas o sentido ensinado é o de dependente/nome relacional | média |  |
| V1-009 | MINOR | A1 | vocab-a1 | `ko:다시 한번` | `다시 한번` inconsistente com a própria espaçonormização da ficha (`일 번`, `삼 번` espaçados) | média-alta |  |
| V1-010 | MINOR | A1 | vocab-a1 | `sent:a1-l38:사정 ("사정이 있어요." → "Tenho uma circunstância."); sent:a1-l38:양해 ("양해해 주세요." → "Compreenda, por favor."); sent:a1-l34:조언 ("조언을 주세요." — coloção idiomática é 조언을 해 ` | Glossas de tradução pouco naturais / deslocadas em frases de contexto | média |  |
| V1-011 | MINOR | A1 | vocab-a1 | `ko:개찰구` | Glosa de `개찰구` inclui "portão de embarque" (que é 탑승구) | média |  |
| V1-012 | MINOR | A1 | vocab-a1 | `ko:지연되다 / ko:노선 (frases sent:a1-l37:지연되다, sent:a1-l37:노선)` | `기차가 지연돼요` e `이 노선은 역에 가요`: aspecto/colocação questionáveis | média |  |
| V1-013 | MINOR | A1 | vocab-a1 | `ko:원하다 / sent:a1-l20:원하다` | `원하다` ensinado por frase que soa calque ("저는 커피를 원해요") | média |  |
| V1-014 | MINOR | A1 | vocab-a1 | `ko:증상, ko:두통/ko:기침/ko:알레르기 (aceitáveis), ko:참석하다, ko:사정, ko:양해, ko:변경, ko:환승하다/ko:승강장/ko:개찰구/ko:지연되다/ko:노선, ko:아름답다` | Carga lexical A1 acima do nível (termos clínicos/administrativos/formais e morfologia avançada) | média |  |
| V1-015 | MINOR | A1 | vocab-a1 | `ko:일/ko:삼/.../ko:십 (8 numerais); contexto a1-l06: "제 전화번호는 일, 이, 삼이에요"; ko:열 (febre) vs. 열 (dez); ko:시 (hora) vs. 시 (poema/di); ko:팔 (braço, Hangul) vs. 팔 (oito)` | Sistema numeral incompleto em A1: `이`(2) e `팔`(8) sem carta; numerais nativos só por reconhecimento; risco futuro de homógrafo | alta (risco), média (documentação) |  |
| V1-016 | MINOR | A1 | vocab-a1 | `— (varredura completa)` | Identidades quase-duplicadas entre cursos verficadas e limpas (registro positivo com ressalva) | alta |  |
| V1-017 | INCERTO | A1 | vocab-a1 | `sent:a1-l23:층` | Espaçamento `삼 층` (vs. grafia usual `3층`/`삼층`) | baixa |  |
| V1-018 | INCERTO | A1 | vocab-a1 | `sent:a1-l32:햇빛` | `햇빛이 좋아요` — o idioma meteorológico é `햇볕이 좋다` | baixa |  |
| V1-019 | INCERTO | A1 | vocab-a1 | `ko:초대 / sent:a1-l15:초대` | `오늘은 초대가 있어요` naturalidade duvidosa como "tenho um convite" | baixa |  |
| V2-001 | CRÍTICO | A2 | vocab-a2 | `sent:a2-l32:따라서 (card ko:따라서)` | `따라서` (= "portanto") é ensinado com frase onde a string é `따르다`+`-아/서`, e a tradução afirma "Portanto" onde o coreano não diz isso | alta | CONFIRMADO (fonte lida: alvo '따라서' em frase de 따르다+아/서) |
| V2-002 | MAJOR | A2 | vocab-a2 | `ko:일 (declaração de retomada em a2-l21; conteúdo em a2-l04/l13/l14/l21/l22/l23/l36/l39 e a2-c01/c05/c08)` | identidade `ko:일` (numeral "um", A1) é retomada em lição que usa `일` no sentido "trabalho/coisa"; homógrafo sem `sense` deixa o cartão antigo ambíguo | alta (o par cartão/conteúdo é verificável no repo); média quanto à preferência entre criar cartão novo vs. remover a retomada | CONFIRMADO |
| V2-003 | MINOR | A2 | vocab-a2 | `ko:출근/ko:퇴근/ko:귀가/ko:불가능/ko:해결/ko:정리/ko:답례/ko:항의/ko:진찰/ko:처방/ko:복용/ko:근무/ko:합격/ko:대답/ko:입사/ko:퇴사/ko:승진/ko:인사/ko:찬성/ko:동의/ko:화해/ko:기대/ko:격려/ko:성장/ko:회상/ko:만족/ko:습득/ko:추천/k` | sistemático: 39 cards substantivo usam alvo flexionado verbal (`출근해요`, `해결했어요`, …) enquanto pares N+하다 equivalentes (`외식`, `쇼핑`, `낚시`, `자취`) usam a forma de dicionário | alta (padrão verificável); é consistência, não correção de idioma |  |
| V2-004 | MINOR | A2 | vocab-a2 | `ko:유명하다, ko:비슷하다, ko:다르다, ko:똑같다, ko:날씬하다, ko:뚱뚱하다, ko:시끄럽다, ko:무겁다, ko:가볍다, ko:어지럽다, ko:힘들다, ko:기쁘다, ko:편하다, ko:익숙하다, ko:낯설다, ko:필요하다, ko:정중하다 (+ A1, fora deste lote)` | sistemático: adjetivos coreanos (형용사) classificados `pos=verbo` — o schema não tem "adjetivo" | alta |  |
| V2-005 | MINOR | A2 | vocab-a2 | `ko:어쩔 수 없어요` | `어쩔 수 없어요` entra como forma canônica flexionada (polida) e `pos=interjeição` | alta (diagnóstico); a correção de id é que é cara |  |
| V2-006 | MINOR | A2 | vocab-a2 | `ko:한번` | glosa "uma vez" de `한번` não distingue o advérbio 붙여쓰기 da contagem `한 번`, e o resto do curso usa a contagem com espaço | alta na regra; média de que mereça mudança (variante válida não é erro — roteiro §"Variante válida") |  |
| V2-007 | MINOR | A2 | vocab-a2 | `ko:탑승` | frase de `탑승`: "탑승 시간이 십 분 남았어요" soa a contagem da duração do embarque, não "faltam dez minutos para o embarque" | média |  |
| V2-008 | MINOR | A2 | vocab-a2 | `ko:교환` | frase de `교환`: "상품 교환을 원해요" é fala de placa ("se desejar troca"), não frase do cliente que a tradução mostra | média |  |
| V2-009 | MINOR | A2 | vocab-a2 | `ko:각오` | colocação duvidosa em `각오`: "새해 각오를 세웠어요" | média |  |
| V2-010 | MINOR | A2 | vocab-a2 | `ko:고장` | frase de `고장`: "새집 세탁기에 고장이 났어요" aglutina `새집`+`세탁기` e usa `에` onde o padrão pede `에서`/subjetivo | média |  |
| V2-011 | MINOR | A2 | vocab-a2 | `ko:일행` | tradução PT da frase de `일행`: "Somos três acompanhantes" | alta quanto ao pt-BR; média na re-glossa |  |
| V2-012 | MINOR | A2 | vocab-a2 | `ko:층간` | `층간` ensinada como substantivo livre; é palavra ligada (의존명사-like) e só aparece em composição (층간 소음) | alta |  |
| V2-013 | MINOR | A2 | vocab-a2 | `ko:사례 (l13) vs 사례("exemplo/caso"); ko:인사 (l23) vs 인사("RH", contexto 부서/채용 de l21–l22); ko:자세 (l19) vs 자세히("em detalhes", frase de ko:설명하다 l32); ko:적 (l02) vs eventuais 적(` | homógrafos expostos por frases do A2 sem cartão `#sense` (watch-list de prevenção, sem colisão atual) | alta (é política de prevenção, não achado de idioma) |  |
| V2-014 | INCERTO | A2 | vocab-a2 | `ko:회상 (l36), ko:여정 (l30), ko:습득 (l28), ko:연박 (l26), ko:투숙객 (l26), ko:조식 (l26), ko:근황 (l38), ko:장래 (l39), ko:시작점 (l40), ko:비전 (l39)` | carga lexical acima do piso típico de A2 em ~10 itens (jargão/literário); não marquei erro porque são palavras reais | baixa—média |  |
| V0-001 | CRÍTICO | A0 | vocab-hangul | `ko:음악 (frase/nota da ficha) + exemplo de lição h21-e02 (não está na ficha, mas é a origem da nota)` | gabarito de "ligação" de 음악 ensina "으막", forma que não existe; há MP3 gerado dela | alta | REJEITADO (으막 é a transcrição padrão; ver nota de normatização) |
| V0-002 | MAJOR | A0 | vocab-hangul | `ko:나의` | nota de ko:나의 ensina a leitura [에] para uma palavra em que 의 é substantivo dependente ([의]) | alta (para a distinção 조사/의존명사); média (para a formulação exata da nota) | REJEITADO (조사 의 → [에] é permitido; a nota está certa) |
| V0-003 | MAJOR | A0 | vocab-hangul | `ko:안` | ko:안 (glosa só "dentro; interior") convive com o advérbio de negação 안, mesmo `ko:<forma>`, sentido não coberto; risco de colisão de identidade nos reusos | alta | CONFIRMADO como risco latente |
| V0-004 | MAJOR | A0 | vocab-hangul | `sent:전화:16, sent:꽃:13, sent:강아지:9, sent:의자:19, sent:공부:25, sent:시계:22, sent:차:24, sent:커피:1, sent:우유:18, sent:물:3, sent:책:7, sent:문:20, sent:눈:15, sent:서울:21, sent:옷:23 (` | as 25 frases do módulo cobram vocabulário fora do inventário de 133 e contrações/irregulares nunca ensinados em h01–h24 | alta (para a constatação); média (para a severidade — aceitável se nunca cobrado) |  |
| V0-005 | MINOR | A0 | vocab-hangul | `ko:핥다, ko:훑다` | nota de 핥다/훑다 promete "aspiração de 다" quando a forma de citação padrão é [할따]/[훌따] (tensificação) | alta |  |
| V0-006 | MINOR | A0 | vocab-hangul | `ko:시계` | nota de ko:시계 condicional o abrandamento de ㅖ a um ambiente inexistente ("depois de consoante") | média-alta (o fenômeno é real; a formulação da condição é que está errada) |  |
| V0-007 | MINOR | A0 | vocab-hangul | `ko:네` | ko:네 funde dois lexemas na mesma identidade ("sim" interjeição × "seu/sua" determinante), sem cobertura de pos/nota | alta |  |
| V0-008 | MINOR | A0 | vocab-hangul | `ko:머리` | glosa de ko:머리 não cobre "cabelo", sentido que o A2 passa a usar (곱슬머리) — risco de reuso inconsistente | alta |  |
| V0-009 | MINOR | A0 | vocab-hangul | `ko:몫, ko:까치, ko:낮, ko:삶, ko:세수` | lote de glosas pouco naturais/imprecisas em pt-BR | alta (a/e), média (b/c/d) |  |
| V0-010 | MINOR | A0 | vocab-hangul | `ko:뇌, ko:암, ko:몫, ko:삶, ko:읊다, ko:훑다, ko:핥다, ko:아우 (nota), ko:하마, ko:타조` | palavras raras abstratas mantidas como "vocabulário" só por cobertura de inventário (carga A0 assumida em nota, a confirmar na revisão nativa) | alta (para a constatação), baixa (para a ação) |  |
| V0-011 | MINOR | A0 | vocab-hangul | `ko:나의, ko:감사합니다, ko:좋다, ko:젊다, ko:넓다 — `pos` vazio; ko:싸다/ko:짜다/ko:쓰다/ko:싫다/ko:많다/ko:없다 etc. rotuladas "verbo"` | cinco entradas sem `pos` (e verbos descritivos rotulados como "verbo" sem distinção) | alta |  |
| V0-012 | INCERTO | A0 | vocab-hangul | `ko:마음 (a1-l38), ko:차 (a1-l16, a1-l17), ko:감사합니다 e ko:한국 (a1-l01) — verificados direto nos arquivos-fonte; varredura do dump indica padrão amplo (~60 ocorrências de reused` | reusos declarados em `reusedIds` que nunca aparecem na própria lição (bookkeeping vs "retomadas em contexto") | baixa/média (falta a spec do campo) |  |

## Verificações independentes registradas

### A2M1-001 mcq a2-l02-e01: gabarito fora das opções

**CONFIRMADO**

```json
{
  "options": [
    "Foi a uma fonte termal.",
    "Morou no exterior.",
    "Trabalhou em uma ONG."
  ],
  "correctAnswer": "Foi uma fonte termal.",
  "regra": "src/lib/exercises/index.ts:256-263 (normalize não casa com nenhuma opção)"
}
```

### A1M3-001 a1-l11-e06/a1-c03-e13: '언니'+'은' gera coreano agramatical

**CONFIRMADO**

```json
{
  "preenchido": "Complete com “irmã mais velha” (uma mulher falando): 제 언니은 선생님이에요.",
  "parceiro": "Complete com “irmã mais velha” (mulher falando): 제 언니은 선생님이에요.",
  "nota": "a forma correta é 언니는; '언니는' também é rejeitado pelo gabarito (probe S4)"
}
```

### A0-001 (prosa diz 'o ㄱ final de âm') × V0-001 (diz que '으막' não existe)

**A0-001 CONFIRMADO (prosa errada) / V0-001 REJEITADO (transcrição correta)**

```json
{
  "prosa_do_item": "O ㄱ final de 음 passa para 악: 으막. A escrita permanece 음악.",
  "nota_da_regra": "ㄱ de 음 passa para 악.",
  "falado_na_regra": "으막",
  "nota_da_palavra": "O ㅁ final de 음 passa para 악 na fala: 으막.",
  "probe_motor": "applyLiaison('음악') === '으막' (docs/audits/a0-a2/data/engine-probe.json C1)",
  "norma": "Nacional (온라인가나다 327196, 2026-02-07) escreve '옛 음악' como [옏 으막] — ou seja, a sílaba fica '으' e o ㅁ vai para '막'; a transcrição do app está certa, o nome da letra na prosa está errado",
  "audio": "public/audio/v1 tem entrada para '으막' (src/content/audio/entries.ts:195) e para '음악' (:200)"
}
```

### A2M3-001: 'espaçamento não padrão' + ditado rejeita variante

**PREMissa CORREGIDA: '삼 층' é a forma de princípio (양적 수량); o defeito real é a variante aceita**

```json
{
  "item": {
    "answer": "삼 층이에요.",
    "accepted": [
      "삼 층이에요"
    ]
  },
  "norma": "한글 맞춤법 제43항: unidade/contador separado do numeral escrito em hangul ('삼 층' princípio; '삼층' permitido como ordem/numeração; com algarismo '3층' permitido). Confirmação: onlineQna 336486 (2026-10-01) e 321977.",
  "consequencia": "quem digitar '삼층이에요' (grafia permitida para pavimento) é marcado errado"
}
```

### A1M5-001 '극장 앞에 만나요' (만나요 pede 에서)

**CONFIRMADO**

```json
{
  "forma_ensinada": "atividade + 장소 + 시간",
  "explicacao": "Um encontro claro combina atividade, lugar e horário. Use 에 para o horário e 앞/옆/근처 para o ponto de encontro: 극장 앞에, 일곱 시에.",
  "exemplos": [
    "극장 앞에 만나요.",
    "일곱 시에 만나요."
  ],
  "contradicao_interna": [
    "사거리에서 만나요.",
    "여기에서 기다려요."
  ],
  "norma": "에 = localização de estado/existência; 에서 = local onde a ação ocorre (o próprio curso o afirma em a1-l23)"
}
```

### Cluster 'variante válida rejeitada' (A2M7-001, A2M7-002, A1M8-003, A1M2-002, A2M2-001)

**CONFIRMADO na forma medida**

```json
[
  {
    "item": "a2-l33-e02",
    "aceitas": [
      "계세요"
    ],
    "testes": [
      {
        "forma": "계세요",
        "aceita": true
      },
      {
        "forma": "계셔요",
        "aceita": false
      }
    ]
  },
  {
    "item": "a2-l33-e07",
    "aceitas": [
      "뵈었어요"
    ],
    "testes": [
      {
        "forma": "뵈었어요",
        "aceita": true
      },
      {
        "forma": "뵀어요",
        "aceita": false
      }
    ]
  },
  {
    "item": "a1-l37-e01",
    "aceitas": [
      "이"
    ],
    "testes": [
      {
        "forma": "이",
        "aceita": true
      },
      {
        "forma": "은",
        "aceita": false
      }
    ]
  },
  {
    "item": "a2-l09-e05",
    "aceitas": [
      "여기에서 음식을 먹으면 안 돼요.",
      "여기서 음식을 먹으면 안 돼요."
    ],
    "testes": [
      {
        "forma": "여기에서 음식을 먹으면 안 돼요.",
        "aceita": true
      },
      {
        "forma": "여기서 음식을 먹으면 안 돼요.",
        "aceita": true
      }
    ]
  },
  {
    "item": "a2-l08-e05",
    "aceitas": [
      "저녁을 먹고 나서 샤워해요.",
      "저녁을 먹은 후에 샤워해요."
    ],
    "testes": [
      {
        "forma": "저녁을 먹고 나서 샤워해요.",
        "aceita": true
      },
      {
        "forma": "저녁을 먹은 후에 샤워해요.",
        "aceita": true
      },
      {
        "forma": "저녁을 먹고 나서 샤워해요",
        "aceita": false
      }
    ]
  }
]
```

### Achados de vocabulário (V2-001, V1-003, V1-004, V1-002, V2-002, V0-003)

**CONFIRMADO por leitura direta do registro**

```json
[
  {
    "id": "ko:따라서",
    "ko": "따라서",
    "pt": "portanto; consequentemente",
    "pos": "advérbio",
    "frase": "규칙을 따라서 행동하세요.",
    "traducao": "Portanto, aja conforme as regras.",
    "alvo": "따라서"
  },
  {
    "id": "ko:감기",
    "ko": "감기",
    "pt": "resfriado",
    "pos": "substantivo",
    "frase": "감기약 있어요?",
    "traducao": "Você tem remédio para resfriado?",
    "alvo": "감기"
  },
  {
    "id": "ko:돼지고기",
    "ko": "돼지고기",
    "pt": "carne de porco",
    "pos": "substantivo",
    "frase": "돼지고기 없어요?",
    "traducao": "Você tem carne de porco?",
    "alvo": "돼지고기"
  },
  {
    "id": "ko:입어 보다",
    "ko": "입어 보다",
    "pt": "experimentar roupa",
    "pos": "verbo",
    "frase": "입어 보세요.",
    "traducao": "Experimente vestir.",
    "alvo": "입어 보세요"
  },
  {
    "id": "ko:일",
    "ko": "일",
    "pt": "um (numeral sino-coreano)",
    "pos": "numeral",
    "frase": "제 번호는 일 번이에요.",
    "traducao": "Meu número é o um.",
    "alvo": "일"
  },
  {
    "id": "ko:안",
    "ko": "안",
    "pt": "dentro; interior",
    "pos": "substantivo",
    "frase": null,
    "traducao": null,
    "alvo": null
  }
]
```

### Cluster 'listen pede fragmento e cobra a frase inteira' (A1M2/A1M3/A1M5/A1M6/A1M7)

**CONFIRMADO**

```json
{
  "escuta_total": 264,
  "pedeFragmento": 64,
  "semVarianteDeFragmento": 64,
  "exemplos": [
    {
      "item": "a1-l06-e08",
      "prompt": "Ouça e escreva o número que você ouviu.",
      "answer": "제 번호는 사 번이에요.",
      "aceitas": [
        "제 번호는 사 번이에요"
      ]
    },
    {
      "item": "a1-l07-e08",
      "prompt": "Ouça e escreva o dia que você ouviu.",
      "answer": "내일은 일요일이에요.",
      "aceitas": [
        "내일은 일요일이에요"
      ]
    },
    {
      "item": "a1-l08-e03",
      "prompt": "Ouça e escreva a ação que você ouviu.",
      "answer": "저는 아침에 일어나요.",
      "aceitas": [
        "저는 아침에 일어나요"
      ]
    },
    {
      "item": "a1-l09-e03",
      "prompt": "Ouça e escreva a frequência que você ouviu.",
      "answer": "저는 매일 공부해요.",
      "aceitas": [
        "저는 매일 공부해요"
      ]
    },
    {
      "item": "a1-l13-e08",
      "prompt": "Ouça e escreva a localização que você ouviu.",
      "answer": "냉장고가 부엌에 있어요.",
      "aceitas": [
        "냉장고가 부엌에 있어요"
      ]
    },
    {
      "item": "a1-l14-e03",
      "prompt": "Ouça e escreva a ação que você ouviu.",
      "answer": "저는 거실에서 청소해요.",
      "aceitas": [
        "저는 거실에서 청소해요"
      ]
    }
  ]
}
```

### Cluster 'cobra marco não ensinado' (A2M1-003, A2M4-001, A2M4-002, A2M5-001, A2M6-002, A2M8-001)

**CONFIRMADO por presença no texto + ausência no blueprint**

```json
[
  {
    "marcador": "-라고 하다 (relato de fala de terceiro)",
    "declaradoNoBlueprint": [],
    "ocorreEm": [
      {
        "item": "a2-l16-e10",
        "achou": "라고 했"
      },
      {
        "item": "a2-l19-e04",
        "achou": "라고 했"
      },
      {
        "item": "a2-c04-e10",
        "achou": "라고 했"
      }
    ]
  },
  {
    "marcador": "-았/어야 했어요",
    "declaradoNoBlueprint": [],
    "ocorreEm": [
      {
        "item": "a2-l04-d4",
        "achou": null
      },
      {
        "item": "a2-l04-e07",
        "achou": "어야 했"
      }
    ]
  },
  {
    "marcador": "-면서",
    "declaradoNoBlueprint": [],
    "ocorreEm": [
      {
        "item": "a2-l40-e02",
        "achou": "면서"
      },
      {
        "item": "a2-c08-e20",
        "achou": "면서"
      }
    ]
  },
  {
    "marcador": "-(으)ㄹ 때",
    "declaradoNoBlueprint": [],
    "ocorreEm": [
      {
        "item": "a2-l19-e10"
      },
      {
        "item": "a2-c04-e12"
      }
    ]
  }
]
```


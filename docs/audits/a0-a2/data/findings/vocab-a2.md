# Achados — vocabulário canônico A2 (ficha `vocab-a2.md`)

Escopo: curso `ko-a2` — 400 entradas `[vocab:]` + 400 frases `[frase]` (a2-l01…a2-l40), revisadas 100%.
Baseline 3103ce3, branch `audit/a0-a2-linguistic`. Revisão somente de leitura; nada foi editado em `src/**`.
Checklist aplicado por item (roteiro §4, §6, §8, §9): forma de dicionário; glosa pt-BR no sentido ensinado; `pos`; alvo contido exatamente na frase (e no início de palavra, como exige `targetPosition` em `src/content/vocabulary/validate.ts:9`); flexão legítima (ㅂ/ㄷ/ㅅ/르/으 irregulares, `-게 하다`, `-(으)로`); `sentido` coerente com a frase; tradução fiel; léxico real do coreano contemporâneo; duplicatas/colisões `ko:<forma>`; nível A2.

Verificações auxiliares (comparação código×ficha, sem rodar testes):
- Ficha ≡ código: 7 campos (forma, glosa, `pos`, alvo, frase, tradução, sentido) batem nos 400 pares (`a2-m01.ts`…`a2-m08.ts`).
- Alvo ocorre exatamente 1× e no início de palavra: 400/400 OK.
- Duplicatas de `ko:<forma>` dentro de A2: 0. Interseção A2∩(A1+Hangul), inclusive normalizando espaços: 0 formas.
- `reusedIds` do currículo A2: 126 distintos = 115 retomados de A1/Hangul + 11 auto-retomos de identidades A2 — coerente com o declarado em `docs/roadmap.md`/`AGENTS.md`.

### V2-001 — CRÍTICO — `따라서` (= "portanto") é ensinado com frase onde a string é `따르다`+`-아/서`, e a tradução afirma "Portanto" onde o coreano não diz isso
- Item: sent:a2-l32:따라서 (card ko:따라서)
- Arquivo: src/content/vocabulary/a2-m07.ts:27
- Coreano original: 규칙을 따라서 행동하세요.
- Português original: Portanto, aja conforme as regras.
- Problema: Em `규칙을 따라서`, `따라서` é o verbo `따르다` ("seguir/conformar") + `-아/서` — `규칙을` é objeto direto, então a frase NÃO contém o conectivo `따라서` ("portanto") em nenhum sentido; a tradução inventa um "Portanto," inexistente no coreano e ancora o card num exemplo falso. Estruturalmente o item passa no validador (string única, início de palavra), o que torna o erro invisível ao pipeline.
- Correção proposta: frase nova com o conectivo real, p. ex. `요금이 많이 올랐어요. 따라서 다른 방법을 찾아야 해요.` || "As tarifas subiram muito. Portanto, precisamos encontrar outra opção." (alvo `따라서` continua único e em início de palavra).
- Base: `따르다`+`-아/서` (conformidade) vs. 부사 `따라서` (因此, "portanto") — homógrafos distintos; padrão de uso atestado em 사전 (표준국어대사전: `따르다` 용례 "법률을 따라야 하다" / 어휘부 `따라서` 접속 부사). Prioridade 6 do roteiro: "sentido coerente com a glosa / tradução fiel".
- Confiança: alta
- Impacto: `ko:따라서` + `sent:a2-l32:따라서` (cartão `v:ko:따라서` e dica de sentido do SRS). Nenhum exercício em `src/content/curriculum/a2/**` cita essa frase (grep "따라서" sem hits fora do m07), então a troca é contida à ficha de vocabulário.

### V2-002 — MAJOR — identidade `ko:일` (numeral "um", A1) é retomada em lição que usa `일` no sentido "trabalho/coisa"; homógrafo sem `sense` deixa o cartão antigo ambíguo
- Item: ko:일 (declaração de retomada em a2-l21; conteúdo em a2-l04/l13/l14/l21/l22/l23/l36/l39 e a2-c01/c05/c08)
- Arquivo: src/content/curriculum/a2/lessons/a2-l21.ts:43; src/content/vocabulary/a1-course.ts:83; src/content/vocabulary/a2-m08.ts:42 (frase "장래에 어떤 일을 하고 싶어요?")
- Coreano original: reusedIds: ["ko:직업", "ko:회사원", "ko:직장", "ko:일", "ko:경험"] / 제가 하는 일은 고객 상담이에요. / 갑자기 회사 일이 생겨서 가지 못했어요. / 제 번호는 일 번이에요.
- Português original: (A1) 일 = "um (numeral sino-coreano)"; (A2) 일 = "trabalho, tarefa, imprevisto, coisa"
- Problema: nenhuma lição A2 ensina `일`("trabalho") como item novo, mas o conteúdo inteiro de A2 usa a forma `일` nesse sentido, e l21 lista `ko:일` como retomada — o único cartão canônico dessa identidade glosa o numeral (a1-l06, "제 번호는 일 번이에요"). O SRS vai reapresentar "일 = um" em lições em que a palavra significa trabalho, e `types.ts:11` exige `ko:<forma>#<sentido>` para homógrafos "separados antes da publicação". É achado de compatibilidade (mesma forma, sentido novo), não de idioma.
- Correção proposta: criar identidade nova `ko:일#trabalho` (ou `ko:일#trabalho-coisa`) no léxico do A2 (glosa "trabalho; tarefa; acontecimento", lição a2-l21), trocar o `reusedIds` de a2-l21 para a nova id quando o mecanismo aceitar ids compostos, e manter `ko:일` (numeral) intacto. Alternativa mínima: remover `ko:일` de `reusedIds` e registrar a cobertura em `docs/audits/a0-a2/tools/` para a fase de expansão.
- Base: convenção de homógrafo de `src/content/vocabulary/types.ts:11-19` e `validate.ts:43-52` (itens com mesma forma exigem `sense`); os dicionários registram 일("número 1; dia") e 일("trabalho, afazer, acontecimento") como entradas distintas.
- Confiança: alta (o par cartão/conteúdo é verificável no repo); média quanto à preferência entre criar cartão novo vs. remover a retomada
- Impacto: `a2-l21.ts` (reusedIds), cartões `v:ko:일` do Progress de quem concluiu A1; lições l04/l13/l14/l22/l23/l36/l39 e checkpoints c01/c05/c08 contêm a forma em sentido novo — qualquer normalização de reusedIds precisa rodar a matriz completa. Não renomear a id existente: `ko:일` já está em Progress publicado (regra de id estável de `types.ts`).

### V2-003 — MINOR — sistemático: 39 cards substantivo usam alvo flexionado verbal (`출근해요`, `해결했어요`, …) enquanto pares N+하다 equivalentes (`외식`, `쇼핑`, `낚시`, `자취`) usam a forma de dicionário
- Item: ko:출근/ko:퇴근/ko:귀가/ko:불가능/ko:해결/ko:정리/ko:답례/ko:항의/ko:진찰/ko:처방/ko:복용/ko:근무/ko:합격/ko:대답/ko:입사/ko:퇴사/ko:승진/ko:인사/ko:찬성/ko:동의/ko:화해/ko:기대/ko:격려/ko:성장/ko:회상/ko:만족/ko:습득/ko:추천/ko:비교/ko:성공/ko:실패/ko:발전 (lista completa: 39 linhas em `a2-m01.ts`…`a2-m08.ts`)
- Arquivo: src/content/vocabulary/a2-m02.ts:35 (exemplo); demais módulos idem
- Coreano original: 아침 여덟 시에 출근해요. (alvo=출근해요, card=출근)
- Português original: Vou ao trabalho às oito da manhã.
- Problema: o comentário de `types.ts:40-44` define que "em substantivos e expressões costuma ser a própria forma de dicionário"; aqui o chip ocultável do cartão diverge do lema ensinado em ~39 itens (contra 265 cards substantivo que seguem a regra), inconsistência de metadados/HUD que confunde a dica "Palavra esperada" (ex.: card `출근` pede `출근해요`; card `인사` pede `인사를`).
- Correção proposta: padronizar alvo = forma de dicionário nos cards substantivo (no mínimo nos N+하다 puros: 출근/퇴근/귀가/해결/항의/합격/입사/퇴사/승진/찬성/동의/화해/성장/회상/만족/근무/복용/진찰/처방/격려/추천/비교/대답/답례), mantendo flexão só onde a partícula separa (개인적으로, 규칙적인, 습득한, 생활하는).
- Base: `types.ts:40-44` + uniformidade interna da própria ficha.
- Confiança: alta (padrão verificável); é consistência, não correção de idioma
- Impacto: 39 linhas de target em `a2-m01`…`a2-m08` + frase de hint dos cartões; nenhum id muda.

### V2-004 — MINOR — sistemático: adjetivos coreanos (형용사) classificados `pos=verbo` — o schema não tem "adjetivo"
- Item: ko:유명하다, ko:비슷하다, ko:다르다, ko:똑같다, ko:날씬하다, ko:뚱뚱하다, ko:시끄럽다, ko:무겁다, ko:가볍다, ko:어지럽다, ko:힘들다, ko:기쁘다, ko:편하다, ko:익숙하다, ko:낯설다, ko:필요하다, ko:정중하다 (+ A1, fora deste lote)
- Arquivo: src/content/vocabulary/types.ts:3; src/content/vocabulary/a2-m01.ts…a2-m08.ts
- Coreano original: 부산은 바다로 유명해요.
- Português original: Busan é famosa pelo mar.
- Problema: `VocabPos` só tem substantivo/verbo/pronome/advérbio/interjeição/numeral, então ~17형용사 A2 viram "verbo". O conteúdo está certo, mas o metadado ensina indiretamente a categoria errada — e o padrão de flexão mostrado nas frases (어지러워요/달라요/기뻐요, sem 을/를 nem -(으)세요 de verbo) é justamente o que distingue 형용사; perder essa marca num material "A2 completo" é oportunidade pedagógica perdida.
- Correção proposta: adicionar `"adjetivo"` a `VocabPos` e reclassificar (mudança de metadados, sem tocar ids/`v:`). Se mantiverem o schema, no mínimo alinhar com a glosa ("ser …").
- Base: gramática padrão (형용사 vs 동사; conjugação 직접적 종결 -아/어요 sem 보조용언); tipos em `types.ts:3`.
- Confiança: alta
- Impacto: 17 linhas A2 + histórico A1/hangul; display do cartão se ele mostrar `pos`.

### V2-005 — MINOR — `어쩔 수 없어요` entra como forma canônica flexionada (polida) e `pos=interjeição`
- Item: ko:어쩔 수 없어요
- Arquivo: src/content/vocabulary/a2-m01.ts:51
- Coreano original: 어쩔 수 없어요 || 사정이 있어서 어쩔 수 없어요.
- Português original: não há o que fazer; não tem jeito
- Problema: a expressão idiomática deveria ter lema em forma de dicionário ("어쩔 수 없다"), como os verbos do resto da ficha fazem com NOTA explícita; aqui a terminação polida está congelada no lema, no `audioText` e na id — se o cartão rodar com outra frase em registro diferente (합쇼체 etc.), a id "mentirá". Coreano e tradução em si estão corretos.
- Correção proposta: para itens futuros, adotar lemas `… 없다`; para este, registrar como exceção documentada (renomear id está proibido por `types.ts:11-13` — ver Impacto).
- Base: convenção de lema do próprio repo ("Forma de dicionário; a frase usa …" em todos os verbos).
- Confiança: alta (diagnóstico); a correção de id é que é cara
- Impacto: id `ko:어쩔 수 없어요` já vira cartão `v:ko:어쩔 수 없어요` em Progress se publicado — não renomear; apenas padronizar novos.

### V2-006 — MINOR — glosa "uma vez" de `한번` não distingue o advérbio 붙여쓰기 da contagem `한 번`, e o resto do curso usa a contagem com espaço
- Item: ko:한번
- Arquivo: src/content/vocabulary/a2-m01.ts:20
- Coreano original: 한번 || 저는 한번 가 봤어요.
- Português original: uma vez · Eu já fui lá uma vez.
- Problema: a grafia da frase é legítima — `한번` é palavra do 표준국어대사전 (advérbio: tentativa com `-어 보다`, "oportunidade", ênfase, "일단 한 차례"; respostas online 가나다 do 국립국어원, 2025–2026), e o A1 `ko:다시 한번` está alinhado com a unificação recente ("'다시 한번'의 구성에서는 의미에 상관없이 이와 같이 쓴다") daquele órgão. Mas a glosa "uma vez" (contagem) sem nota incentiva o aluno a produzir `*두번/*세번`, já que o próprio curso escreve `두 번` (m04 l16) e `세 번` (m04 l18) com espaço. Falta a NOTA que o repo já usa para outros casos.
- Correção proposta: NOTA: "Advérbio (tentativa/experiência). Para contagem de vezes, use '한 번' (두 번, 세 번)." Alternativa de glossa: "uma vez (já, um dia)".
- Base: KIPSO 온라인가나다 (한 번/한번의 띄어쓰기는 의미에 따라 달라진다; "한 번" para 1회, "한번" para 시도/기회/강조/일단 한 차례; "다시 한번" unificado); contraste interno `두 번/세 번` no próprio A2.
- Confiança: alta na regra; média de que mereça mudança (variante válida não é erro — roteiro §"Variante válida")
- Impacto: sem mudança de id; tocaria só `notes` da linha m01:20.

### V2-007 — MINOR — frase de `탑승`: "탑승 시간이 십 분 남았어요" soa a contagem da duração do embarque, não "faltam dez minutos para o embarque"
- Item: ko:탑승
- Arquivo: src/content/vocabulary/a2-m06.ts:19
- Coreano original: 탑승 시간이 십 분 남았어요.
- Português original: Faltam dez minutos para o embarque.
- Problema: `시간이 남다` lê-se como "resta tempo (de uma tarefa em curso)"; para o sentido de antecedência da tradução, o padrão é `탑승까지 십 분 남았어요` (ou `탑승 시간이 10분밖에 안 남았어요`). Gramatical, mas o par KO↔PT fica pendurado numa leitura improvável.
- Correção proposta: alvo/`KO:` inalterados; frase → `탑승까지 십 분밖에 안 남았어요.` || "Falta pouco para o embarque: dez minutos." — ou simplificar PT para "Faltam dez minutos até o embarque" com `탑승까지 십 분 남았어요`.
- Base: uso corrente de `까지` para prazo e do padrão `N까지 X 남다`.
- Confiança: média
- Impacto: só `sent:a2-l27:탑승`.

### V2-008 — MINOR — frase de `교환`: "상품 교환을 원해요" é fala de placa ("se desejar troca"), não frase do cliente que a tradução mostra
- Item: ko:교환
- Arquivo: src/content/vocabulary/a2-m08.ts:19
- Coreano original: 상품 교환을 원해요.
- Português original: Quero trocar o produto.
- Problema: `원하다` com fato nominal soa a aviso de loja; um cliente diria `상품을 교환하고 싶어요` / `이거 교환 되나요?`. A frase em si é coreano real, só não casa com o enunciador sugerido pela tradução.
- Correção proposta: `상품을 교환하고 싶어요.` || "Quero trocar o produto." — ajustando também o `target` para `교환하고` (ocorre uma vez, no início de palavra; restrição de `validate.ts:9-14` continua satisfeita). Alternativa: manter registro de aviso com tradução coerente (`교환을 원하시면 카운터로.` || "Se desejar a troca, procure o balcão.").
- Base: padrão `V-고 싶다` para desejo do falante vs `N를 원하다` de serviço.
- Confiança: média
- Impacto: só `sent:a2-l37:교환`; trocar o alvo para `교환하고` ou manter nominal (`교환을 원하시면 안내해 드려요`) exige coerência com o chip.

### V2-009 — MINOR — colocação duvidosa em `각오`: "새해 각오를 세웠어요"
- Item: ko:각오
- Arquivo: src/content/vocabulary/a2-m08.ts:51
- Coreano original: 새해 각오를 세웠어요.
- Português original: Defini minha determinação para o ano novo.
- Problema: as colocações canônicas de `각오` são `각오를 하다/다지다/밝히다/새기다`, `각오가 되다` (워드로 그림사전/한국어기초사전 `각오하다`: "죽음을 각오하고"); `세우다` casa com `계획/목표/결심` — a frase atual contamina com `계획을 세우다` (e o curso ensina exatamente `목표를 세우고` em l39). Não é agramatical e circula, mas é a leitura marginal do par.
- Correção proposta: `새해 각오를 단단히 했어요.` (ou `새해 결심을 세웠어요.` se quiser manter 세우다 com outro substantivo — aí mudaria o target).
- Base: listas de 연어 de 각오 em dicionários de aprendizagem (표준국어대사전/한국어기초사전 não registram `각오를 세우다` como padrão).
- Confiança: média
- Impacto: só `sent:a2-l39:각오`; verificar l39 exercises que hoje usam `목표를 세우고` para não reforçar o par *각오-세우다.

### V2-010 — MINOR — frase de `고장`: "새집 세탁기에 고장이 났어요" aglutina `새집`+`세탁기` e usa `에` onde o padrão pede `에서`/subjetivo
- Item: ko:고장
- Arquivo: src/content/vocabulary/a2-m03.ts:63
- Coreano original: 새집 세탁기에 고장이 났어요.
- Português original: A máquina de lavar da casa nova deu defeito.
- Problema: `새집` funciona como substantivo próprio de "casa nova" e não como modificador possessivo natural de `세탁기` (o falante diz `새로 산 세탁기` / `이사한 집 세탁기`); além disso, `고장이 나다` tende a `에서`/sujeito direto — o m03 já ensina `세탁기가 고장 났어요` na lição 12, então o par intra-curso diverge.
- Correção proposta: `새로 산 세탁기가 고장 났어요.` || "A máquina de lavar nova quebrou." (o alvo `고장` continua ocorrendo em início de palavra dentro de `고장 났어요`; a única mudança é a frase).
- Base: contraste com `sent:a2-l12:세탁기` no mesmo curso; padrão locativo `에서` + `고장` e sintagma natural de posse.
- Confiança: média
- Impacto: só `sent:a2-l15:고장`; harmonizar com `세탁기` (l12).

### V2-011 — MINOR — tradução PT da frase de `일행`: "Somos três acompanhantes"
- Item: ko:일행
- Arquivo: src/content/vocabulary/a2-m06.ts:57
- Coreano original: 일행이 세 명이에요.
- Português original: Somos três acompanhantes.
- Problema: em pt-BR "acompanhantes" lê-se como profissionais/guia e a frase soa artificial; o original coreano é informal, "somos três (no grupo)". A glosa do card ("acompanhante; grupo de viagem") também desliza entre a pessoa e o grupo.
- Correção proposta: PT da frase → "Somos três no grupo." / "Estamos em três."; glossa do card → "companhia; grupo (de pessoas que acompanham)".
- Base: naturalidade pt-BR (roteiro §prioridade 2); `일행` = grupo/pessoa que acompanha.
- Confiança: alta quanto ao pt-BR; média na re-glossa
- Impacto: só `ko:일행`/`sent:a2-l30:일행`.

### V2-012 — MINOR — `층간` ensinada como substantivo livre; é palavra ligada (의존명사-like) e só aparece em composição (층간 소음)
- Item: ko:층간
- Arquivo: src/content/vocabulary/a2-m03.ts:48
- Coreano original: 층간 || 층간 소음 때문에 잠을 못 잤어요.
- Português original: entre andares
- Problema: nenhum falante usa `층간` isolado (*층간에 살아요); a unidade lexical real do A2 é o composto `층간 소음` (ou `층간소음`). `ko:적` (l02) recebeu NOTA de substantivo dependente — `층간` não recebeu (m01:21 vs m03:48). `동안/전/후` também são dependentes sem NOTA, mas esses o aluno aprende com os determinantes explícitos nas frases.
- Correção proposta: ou NOTA: "Aparece apenas em composição, sobretudo 층간 소음"; ou transformar o item em `층간 소음` (substantivo, glosa "ruído entre andares") — decisão de renomeação de id precisa registrar risco ao cartão `v:ko:층간`.
- Base: uso atestado apenas composicional (층간 소음/층간 누수); simetria com a NOTA já usada em `ko:적` (m01:28).
- Confiança: alta
- Impacto: linha m03:48; se mudar a forma, id e frase `sent:a2-l14:층간`.

### V2-013 — MINOR — homógrafos expostos por frases do A2 sem cartão `#sense` (watch-list de prevenção, sem colisão atual)
- Item: ko:사례 (l13) vs 사례("exemplo/caso"); ko:인사 (l23) vs 인사("RH", contexto 부서/채용 de l21–l22); ko:자세 (l19) vs 자세히("em detalhes", frase de ko:설명하다 l32); ko:적 (l02) vs eventuais 적(敵)/sufixo -적 (menor)
- Arquivo: src/content/vocabulary/a2-m03.ts:35 (사례), a2-m04.ts:45 (자세), a2-m05.ts:34 (인사), a2-m07.ts:26 (자세히, na frase de ko:설명하다)
- Coreano original: 도와주셔서 사례를 하고 싶어요. / 처음 만난 사람에게 인사를 해요. / 자세: 바른 자세로 앉으세요. vs 자세히 설명해 주세요.
- Português original: Quero retribuir por sua ajuda. / Cumprimento quem conheço pela primeira vez. / Explique em detalhes…
- Problema: nenhum desses pares é erro hoje (só um cartão por forma), mas a ficha já criou a colisão latente `ko:일` (V2-002) pelo mesmo mecanismo; 사례(事例)/인사(人事)/자세(詳細) são as próximas candidatas a colisão dentro do A2 (a forma `자세`("detalhado") já aparece na frase de l32 enquanto o cartão de l19 ensina `자세`("postura")). A convenção de `types.ts` ("homógrafos separados antes da publicação") pede que qualquer novo cartão nessas formas venha com `#sense`.
- Correção proposta: registrar a watch-list no blueprint B1; se `ko:사례`(exemplo) ou `ko:인사`(RH) entrarem algum dia, criar `ko:사례#exemplo`/`ko:인사#rh` e adicionar NOTA ao cartão antigo.
- Base: `types.ts:11-19`, `validate.ts:43-52` (mesma forma exige `sense` em todos).
- Confiança: alta (é política de prevenção, não achado de idioma)
- Impacto: conteúdo futuro B1/B2; hoje nada muda.

### V2-014 — INCERTO — carga lexical acima do piso típico de A2 em ~10 itens (jargão/literário); não marquei erro porque são palavras reais
- Item: ko:회상 (l36), ko:여정 (l30), ko:습득 (l28), ko:연박 (l26), ko:투숙객 (l26), ko:조식 (l26), ko:근황 (l38), ko:장래 (l39), ko:시작점 (l40), ko:비전 (l39)
- Arquivo: src/content/vocabulary/a2-m06.ts, a2-m08.ts (linhas por módulo)
- Coreano original: 오래된 사진을 보며 회상했어요. / 긴 여정이었지만 즐거웠어요. / 습득한 물건은 안내소에 맡기세요. / 이틀 연박하고 싶어요.
- Português original: Relembrei ao ver fotos antigas. / Foi uma jornada longa, mas agradável. / Entregue o objeto encontrado no balcão. / Quero ficar duas noites.
- Problema: todas são palavras reais do coreano contemporâneo e coerentes com as cenas (hotel/aeroporto/reconciliação), mas fogem do núcleo A2/TOPIK-2: `회상` é escrito/literário (o A2 diria `옛날 생각이 났어요`), `여정` é literário (vs `여행/일정`), `습득/연박/투숙객/조식` são jargão de serviço que talvez mereçam marcar o subdomínio (hotel) e não o registro geral. O roteiro pede sinalizar "carga lexical alta"; a calibragem fina (KSI A2 vs TOPIK-II) não é decidível sem corpus de frequência.
- Correção proposta: manter itens com a marca "em revisão" atual e validar a lista contra um frequency list (corpus de Sejong / 어휘 사용 빈도) na próxima revisão; trocar `회상했어요` por `옛날 생각이 났어요` manteria a cena com carga real de A2.
- Base: roteiro §"é A2 de fato"; syllabi de nível (sem afirmar conteúdo exato de lista oficial que não consultei aqui).
- Confiança: baixa—média
- Impacto: ~10 frases + 10 cards; ids não mudariam se só as frases mudarem.

## Cobertura

Contagem da ficha (grep):
- `grep -c "\[vocab:" vocab-a2.md` → **400**
- `grep -c "\[frase]" vocab-a2.md` → **400**
- 801 linhas lidas 100% (a2-l01 a a2-l40; nenhum item pulado; lacunas: nenhuma).

Itens julgados: 400 vocab + 400 frases. Verificações estruturais repetidas em script read-only (alvo presente exatamente 1× e em fronteira de palavra: 400/400 OK; todo card `verbo` termina em `다`: 0 violações; paridade ficha≡código dos 7 campos em `a2-m01..m08.ts`: 400/400, sem campo divergente — as 56 "diferenças" do primeiro diff eram artefato de ponto final do meu parser, não do repo). Cruzamento de identidades: A2∩A1∩Hangul = 0 formas (mesmo normalizando espaço); `reusedIds` A2: 126 ids (115 A1/Hangul + 11 auto-retomos), todos resolvendo a cartões canônicos. Confirmação no código para suspeitas: `따라서` (m07:27), `한번` (m01:20), `ko:일` (a1-course.ts:83 vs l21:43 e uso em l04/l13/l14/l21/l22/l23/l36/l39, c01/c05/c08), padrão de alvos verbais em cards substantivo (39 ocorrências). Flexões irregulares auditadas: ㅂ (막혀서/어지러워요/무거워요/가벼워요/시끄러워요/기뻐요), ㅎ (편한), 으탈락 (미뤘어요), ㄹ (달라요/똑같아요/낯설었어요/참기/늘 거예요/가볼 — todas legítimas), 르/ㄷ/ㅅ (não ocorrem no lote), `- (으)로` (바다로 유명해요/빗자루로/옆으로/한국으로 — causa/instrumento/direção corretas), `-게 하다` (não ocorre na ficha de vocabulário).

**Tally: 1 CRÍTICO · 1 MAJOR · 11 MINOR · 1 INCERTO**

Notas de risco registradas: nenhum id foi renomeado (proposto apenas); renomear `v:ko:층간` (V2-012), `v:ko:따라서` (não é preciso) e a criação de `ko:일#trabalho` (V2-002) têm custo nulo/baixo porque `v:` ids estáveis não mudam ao criar identidades novas; a regra de `types.ts:11-13` proíbe mudar ids publicados.

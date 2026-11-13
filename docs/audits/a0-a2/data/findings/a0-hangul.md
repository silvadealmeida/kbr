# A0 Hangul — achados da revisão linguística (lote h01–h25, c1–c4, jamo, regras)

Baseline `3103ce3`, ficha `docs/audits/a0-a2/data/sheets/a0-hangul.md`. Revisão somente de
leitura; nada foi validado por áudio (corpus MP3 sintético e bloqueado por licença — ver
`docs/audio/license-audit.md`). O que a suíte já garante (gabarito presente nas opções,
`build-syllable` bate com `composeSyllable`, `audioText` × resposta, exemplos de regras ×
`pronunciation.ts`, ordem de prerequisitos, jamo ensinado no `audioText`/`text`) não é
repetido aqui como achado.

### A0-001 — CRÍTICO — explicação afirma que o batchim de 음 é ㄱ e que ele "passa" para 악
- Item: h21-e02; rule:liaison/ex (음악 → 으막)
- Arquivo: src/content/hangul/lessons/h21.ts:82; src/content/hangul/rules.ts:19
- Coreano original: "음악 → 으막"
- Português original: "O ㄱ final de 음 passa para 악: 으막. A escrita permanece 음악." / nota "ㄱ de âm passa para 악." (exatamente: "ㄱ de 음 passa para 악.")
- Problema: 음 termina em ㅁ, não em ㄱ; quem se move para a sílaba seguinte é o ㅁ (으막). O texto ensina uma composição de sílaba inexistente e contradiz a própria nota da palavra na mesma lição ("O ㅁ final de 음 passa para 악 na fala: 으막", syllables.ts:2737) e o implementado em `applyLiaison` (que move ㅁ corretamente).
- Correção proposta: trocar para "O ㅁ final de 음 passa para 악: 으막." na explicação de h21-e02 e na nota do exemplo em rules.ts.
- Base: 연음 desloca o som do batchim real; `src/lib/hangul/pronunciation.ts` `applyLiaison` + decomposição de 음 (ㅇ+ㅡ+ㅁ) em syllables.ts; teste "os exemplos das regras batem com o módulo puro" cobre o falado (으막), não a prosa.
- Confiança: alta
- Impacto: h21-e02, rule:liaison/ex[음악]; revisitar qualquer material gerado a partir dessas strings.

### A0-002 — MAJOR — h18 declara "os 28 finais escritos" quando o inventário é 27
- Item: h18/intro (bloco "Sete sons no total")
- Arquivo: src/content/hangul/lessons/h18.ts:31
- Coreano original: —
- Português original: "Somando [n], [m] e [ŋ] de h17 e [l] de h19, os 28 finais escritos se resumem a sete sons: [k̚], [n], [t̚], [l], [m], [p̚] e [ŋ]."
- Problema: os possíveis letras em posição de batchim são 27 (14 simples + ㄲ, ㅆ + 11 duplos). O "28" provavelmente ecoa as 28 letras do Hunminjeongeum, mas aqui é apresentado como contagem de finais. O próprio currículo soma 27: newFinals de h17 (ㅇ,ㄴ,ㅁ = 3) + h18 (12) + h19 (ㄹ = 1) + h20 (11 duplos, a lista de h20-e13).
- Correção proposta: "os 27 finais escritos se resumem a sete sons".
- Base: inventário interno do módulo (lessons/h17–h20) e descrição padrão de 종성 27자 (não confundir com as 28 letras do Hunminjeongeum).
- Confiança: alta
- Impacto: h18/intro; conferir se o roadmap/aula escrita repete o número.

### A0-003 — MAJOR — enunciado de h13-e02 pede "a sílaba com glide labial" mas o gabarito é 고 (sem glide)
- Item: h13-e02
- Arquivo: src/content/hangul/lessons/h13.ts:66–77
- Coreano original: "ÁUDIO: 고 ... O: go=고 | gwa=과 | gu=구 · A: go"
- Português original: "Ouça e escolha a sílaba com glide labial."
- Problema: copiado do enunciado de h13-e01, o prompt fica contraditório: a única alternativa com glide labial (과) está visível na lista, mas é marcada como errada. O aluno que obedece ao enunciado é penalizado; o item vira pegadinha.
- Correção proposta: trocar o prompt de h13-e02 para "Ouça e escolha a sílaba que você ouviu." (ou "... sem glide labial").
- Base: coerência enunciado × `correctOptionId`; a própria explicação do item diz "O glide labial só aparece em 과".
- Confiança: alta
- Impacto: h13-e02 apenas.

### A0-004 — MAJOR — exemplo de ㅢ "[i] depois de consoante" usa 주의, que vem depois de vogal
- Item: h15/intro (bloco ㅢ), h15-e04 (X), word:주의 (NOTA)
- Arquivo: src/content/hangul/lessons/h15.ts:19,111; src/content/hangul/syllables.ts:2232
- Coreano original: "No início de palavra, ㅢ tende a [ɰi]: 의사, 의자. Depois de consoante, pode soar [i]: 주의. Na partícula possessiva 의, a fala costuma usar [e]: 나의 → [나에]."
- Português original: idem (o trecho relevante está em pt)
- Problema: 주 (ㅈ+ㅜ) não tem batchim: ㅢ em 주의 está após VOGAL, não após consoante. A descrição do ambiente da regra fica errada no exemplo-chave (o aluno procura um final que não existe). Exemplos corretos de "após consoante" seriam 희 ou 협의; após vogal, 주의/[추이] é outro ambiente. O conteúdo fonético em si (pode soar [i]) é defensável.
- Correção proposta: "Depois de consoante ou de outra vogal, pode soar [i]: 희, 주의." — ou mover 주의 para uma frase própria ("depois de vogal") e usar 희 (h15-e10 já monta 희) como exemplo pós-consoante.
- Base: padrão de realização de ㅢ descrito no próprio módulo (cartão de ㅢ: "[ɰi], [i], [e]" com ambientes); ortografia de 주 sem 종성.
- Confiança: alta
- Impacto: h15/intro, h15-e04, nota de word:주의.

### A0-005 — MAJOR — itens de escuta exigem distinguir por som realizções que o próprio módulo declara fundidas
- Item: h25-e04, c2-e05, c2-e10, c4-e05 (ㅙ/ㅞ/ㅚ → [we]); em grau menor: h15-e01, h15-e02, c2-e06, c2-e11 (의 vs 이)
- Arquivo: src/content/hangul/lessons/h25.ts, h15.ts; src/content/hangul/checkpoints/c2.ts, c4.ts
- Coreano original: "ÁUDIO: 왜 ... O: wae=ㅙ | oe=ㅚ | we=ㅞ · A: wae" / "O: ui=의 | i=이 · A: ui"
- Português original: "Ouça 왜 e escolha a vogal composta que você ouviu." / "Ouça e escolha a sílaba que você ouviu."
- Problema: a ficha ensina que ㅙ/ㅞ/ㅚ convergem para [we] ("a distinção ... não é exigível", h14) e que ㅢ varia [ɰi]~[i]. Um item audio-to-char cujas três alternativas são homófonas não tem evidência auditiva para o gabarito: quem distingue 100% pelo ouvido falha, e o acerto vira adivinhação (1/3). O módulo já mostra o caminho correto em h12-e03/c2-e09 ("escolha a grafia que corresponde a 'pássaro'" — ancora no sentido). Não se pode alegar verificação por áudio: o corpus é sintético e está bloqueado.
- Correção proposta: reancorar os enunciados na ortografia com apoio semântico ("Ouça e escolha como se escreve a sílaba de 'por que'": 왜) ou converter para char-to-audio/reading; para 의사 vs 이사, ancorar no significado. Manter a frase "avaliar a grafia" no X, mas corrigir o prompt que promete discriminação auditiva.
- Base: postura explícita do próprio curso sobre fusão ㅐ/ㅔ e ㅙ/ㅞ/ㅚ; princípio de item avaliable (enunciado não pode exigir contraste declarado inexistente).
- Confiança: alta (para a contradição); média (para quantos alunos reais erram)
- Impacto: h25-e04, c4-e05, c2-e05, c2-e10 e, por segurança, c2-e06, c2-e11, h15-e01, h15-e02.

### A0-006 — MAJOR — distrator de h05-e10 usa ㅂ, ainda não ensinado na lição
- Item: h05-e10
- Arquivo: src/content/hangul/lessons/h05.ts:186
- Coreano original: "O: meori=머리 | meoni=머니 | beori=버리 · A: meori"
- Português original: "Ouça e escolha a palavra que você ouviu."
- Problema: 버리 contém ㅂ, apresentado só em h06. Em audio-to-char, o `checkTaughtText` do validate cobre apenas o `audioText` (e o `text` de reading/char-to-audio), nunca as jamo exibidas nas alternativas — por isso passou. Na 5ª lição o aluno é obrigado a processar uma letra que nunca viu, e a "discriminação" ㅁ×ㅂ antecipa conteúdo de h06.
- Correção proposta: trocar o distractor por algo com jamo já ensinados (ex.: "deori=더리", pseudo-sílaba com ㄷ+ㅓ, ㄹ+ㅣ) — ou, melhor, estender o validate para checar as opções de audio-to-char/minimal-pair contra a ordem de ensino.
- Base: campo `introducedIn` (ㅂ = h06) vs escopo da lição h05; prompt da auditoria: cobrança de conteúdo não ensinado.
- Confiança: alta
- Impacto: h05-e10; lacuna de teste em validate.ts `case "audio-to-char"` (options.jamo não passa por checkTaughtText).

### A0-007 — MINOR — sonorização entre vogais é afirmada como categorical ([kaɡu], "sonoriza para [ɡ]/[b]")
- Item: h04/intro (가구), jamo ㄱ/ㄷ/ㅂ/ㅈ (IPA [k],[ɡ] / [t],[d] / [p],[b] / [tɕ],[dʑ])
- Arquivo: src/content/hangul/lessons/h04.ts; src/content/hangul/jamo.ts:96,151
- Coreano original: "Em 가구, o primeiro ㄱ é mais leve e o segundo é sonoro: [kaɡu]."
- Português original: "Mais leve no início da palavra; entre vogais, sonoriza para [ɡ]."
- Problema: a lenição sonora dos tensos-laxos ㄱ/ㄷ/ㅂ/ㅈ entre vogais é variável no coreano de Seul (muito falante mantém [k]/[p] surdos e lax); afirmar "sonoriza" e transcrever [kaɡu] como O som declara mais do que o curso pode provar (sem revisão nativa nem áudio validado). O risco didático é pequeno, mas o IPA fonético deveria marcar variação.
- Correção proposta: "entre vogais pode se aproximar de [ɡ]" (mesmo padrão para ㄷ/ㅂ/ㅈ) e "[kaɡu] ~ [kaku]" ou transcrição fonêmica /kaku/. Analogamente, h05 "디 é [ti] ou [di], nunca 'dji'": a palatalização opcional de ㄷ/ㅌ antes de ㅣ existe na fala casual; "nunca" deve ser "não é o 'dj' do português por padrão".
- Base: literatura de fonética do coreano descreve a sonorização como opcional/variável; regra do roteiro "não afirmar o que não provam".
- Confiança: média
- Impacto: jamo.ts (ㄱ,ㄷ,ㅂ,ㅈ), h04/intro, h05/intro, h06/intro (바다/사자 seguem ok porque ㅅ já é descrito como [s]).

### A0-008 — MINOR — aproximações de ㅗ/ㅓ com vogais NASAIS do português ("como em avô", "entre 'ó' e 'â'")
- Item: h02/intro, h02-e02/e04/e08; jamo ㅗ, ㅓ
- Arquivo: src/content/hangul/lessons/h02.ts:18,104; src/content/hangul/jamo.ts:41,52
- Coreano original: —
- Português original: "ㅓ fica entre 'ó' e 'â': a boca abre e a língua recua ... ㅗ tem lábios arredondados, como em avô." / ㅗ: "como o 'ô' de avô"
- Problema: no pt-BR, o "ô" de avô e o "â" são vogais NASALIZADAS ([ɔ̃]/[ɐ̃]); ㅗ e ㅓ são oral. A âncora sem ressalva pode ensinar [õ] nasal em 오 — erro específico de brasileiro. O cartão de ㅓ já avisa "não é o 'ó' de avó", mas não há aviso equivalente de "sem nasalizar" para ㅗ/"â".
- Correção proposta: acrescentar "sem nasalizar — o 'ô' de avô é nasal, 오 não é" ao intro de h02 e ao cartão de ㅗ; manter o resto.
- Base: fonologia do pt-BR (vogais nasais antes de coda nasal / em -õ, -ã) vs ㅗ/ㅓ orais; é o risco explícito desta auditoria (aproximações com o português).
- Confiança: alta (para o risco), média (para a formulação exata da nota)
- Impacto: h02/intro, h02-e02/e04/e08, cartões ㅗ/ㅓ em jamo.ts.

### A0-009 — MINOR — ㅆ descrito como "curto ... sem alongar como 'ss'"
- Item: h10/intro, h10-e01 (X/fallback), jamo ㅆ
- Arquivo: src/content/hangul/lessons/h10.ts:17,19,58,65,239; jamo.ts (ㅆ)
- Coreano original: —
- Português original: "ㅆ é uma fricativa alveolar tensa: o som é curto, sem zumbido de [z] e sem alongar como 'ss'."
- Problema: consoantes tensas do coreano têm fricação/oclusão tipicamente mais LONGA e intensa que as simples; "curto/sem alongar" pode produzir um ㅆ fraco e breve — exatamente o que brasileiros confundem com ㅅ. A intenção correta (sem voz [z], sem aspiração) não exige o adjetivo "curto".
- Correção proposta: "ㅆ: som tenso, firme e sem zumbido; dura um pouco mais que ㅅ — não é [z] nem um 'ss' relaxado".
- Base: descrição padrão das tensas ([s͈] com maior duração de fricção); coerência com h09 ("pressão", "tensão") que não usa "curto".
- Confiança: média
- Impacto: h10/intro, fallback/X de h10-e01, cartão ㅆ.

### A0-010 — MINOR — explicação de h21-e11 nega que 강 tenha consoante final
- Item: h21-e11
- Arquivo: src/content/hangul/lessons/h21.ts (explicação de h21-e11)
- Coreano original: "강아지"
- Português original: "A sílaba 아 já começa com ㅇ, mas não há consoante final para mover."
- Problema: a alternativa correta e a primeira frase da explicação dizem certo ("o ㅇ final de 강 fica [ŋ] e não se move"); a frase final contradiz: existe batchim (ㅇ), ele é que nunca se move. "Não há consoante final" ensina uma análise errada da sílaba.
- Correção proposta: "A sílaba 아 começa com ㅇ mudo, mas o batchim de 강 é ㅇ [ŋ], que nunca se move."
- Base: decomposição de 강 (ㄱ+ㅏ+ㅇ) no próprio módulo; `applyLiaison` (final ㅇ fora de LIAISON_SIMPLE_FINALS).
- Confiança: alta
- Impacto: h21-e11.

### A0-011 — MINOR — prosa "a segunda parte costuma se mudar" (pt-BR truncado/ambíguo)
- Item: h21/intro; rule:liaison (texto da regra)
- Arquivo: src/content/hangul/lessons/h21.ts:31; src/content/hangul/rules.ts:15
- Coreano original: —
- Português original: "Em finais duplos, a segunda parte costuma se mudar; em ㅎ final, o ㅎ cai."
- Problema: "se mudar" em pt-BR = mudar de casa; o sentido pretendido é "muda de lugar / passa para a sílaba seguinte". Texto-chave de regra fica ambíguo para o público-alvo.
- Correção proposta: "Em finais duplos, a segunda parte costuma passar para a sílaba seguinte".
- Base: redação; mesma formulação correta usada em h21-e07/e08.
- Confiança: alta
- Impacto: h21/intro, rule:liaison.

### A0-012 — MINOR — glosa de 내 como "eu (formal)" não corresponde ao uso padrão
- Item: h12-e02
- Arquivo: src/content/hangul/lessons/h12.ts:91
- Coreano original: "내 usa ㅐ"
- Português original: "내 usa ㅐ e significa 'meu/minha' ou 'eu (formal)'."
- Problema: o 내 padrão é contração de 나의 ("meu/minha") e o "eu" com 내 é arcaico/dialetal (narrativo, sageuk) — não "formal". A glosa "(formal)" pode fixar registro errado. O item em si (gabarito 네, X sobre grafia) está certo.
- Correção proposta: "significa 'meu/minha' (contração de 나의)".
- Base: 표준국어대사전 trata 내¹ como "나의" reduzida; primeira pessoa 내 é registrada como informal/limitada, não formal.
- Confiança: média
- Impacto: h12-e02.

### A0-013 — MINOR — referência futura "Nasalização de ㄹ → ㄴ" nomeia/direciona mal a regra adiada
- Item: h22/intro (bloco "O que fica fora")
- Arquivo: src/content/hangul/lessons/h22.ts:37
- Coreano original: —
- Português original: "Nasalização de ㄹ → ㄴ e outros encontros com ㄹ ficam para uma fase futura."
- Problema: os encontros ㄴ/ㄹ em fronteira viram o padrão de 유음화 (ㄴ → ㄹ antes de ㄹ, e ㄹ+ㄴ → ㄹㄹ), não "ㄹ → ㄴ" por nasalização. Como é só um aviso de escopo, o dano é pequeno, mas o nome/direção trocados vão confundir quando a fase chegar.
- Correção proposta: "Encontros de ㄹ com ㄴ (유음화, ex.: 신라 → 실라) ficam para uma fase futura."
- Base: descrição padrão de 유음화; módulo ainda não implementa nada de ㄹ+ㄴ em `pronunciation.ts` (escopo atual: liaison/nasalization/aspiration).
- Confiança: alta
- Impacto: h22/intro.

### A0-014 — INCERTO — h14 apresenta [hoe] como realização aceita de ㅚ/회, mas proíbe "ho-e"
- Item: h14/intro (bloco "Ortografia importa")
- Arquivo: src/content/hangul/lessons/h14.ts:25
- Coreano original: "회 é uma sílaba, [hwe] ~ [hoe], não 'ho-e'."
- Português original: idem
- Problema: as realizações documentadas de ㅚ são [we] (padrão moderno) e [ø] (histórica/mais velha); [hoe] com [o.e] seria justamente "ho-e" bissegramental, que a frase seguinte proíbe. Não consegui confirmar [hoe]/[회] como variante padrão sem consultar a pronúncia do 표준국어대사전 para 회 (o dicionário registra 훼). Falta evidência: grafia de pronúncia no stdict/NLLT para 회 e 외.
- Correção proposta: trocar "([hwe] ~ [hoe])" por "([hwe]; alguns falantes mais velhos [hø])" até confirmar com o dicionário padrão.
- Base: próprio cartão do curso para ㅚ ("[ø], [we]"); o par [hoe] ≠ [ø] não é distinguishável do "não 'ho-e'" que a frase nega.
- Confiança: baixa
- Impacto: h14/intro (e qualquer eco em material de revisão).

### A0-015 — MINOR — fallback de c4-e04 exibe a pseudo-sílaba 쮜
- Item: c4-e04
- Arquivo: src/content/hangul/checkpoints/c4.ts:98
- Coreano original: "compare com 취 e 쮜 (grafia didática)"
- Português original: idem
- Problema: 쮜 (ㅉ+ㅟ) não forma palavra comum e aparece em um checkpoint "de verdade" no mesmo plano visual que 취; apesar da etiqueta "(grafia didática)", aluno de A0 pode memorizá-la como sílaba legítima do curso. O áudio dela também não pode existir no corpus.
- Correção proposta: manter apenas sílabas reais no comparaste ("compare com 취 e 지") ou mover a nota para o X, deixando o fallback limpo.
- Base: o inventário de sílabas do módulo (syl:) não registra 쮜; a própria etiqueta admite o artificialismo.
- Confiança: média
- Impacto: c4-e04 (c2 não repete o truque).

### A0-016 — MINOR — "promulgado entre 1443 e 1446" funde criação e promulgação
- Item: h01/intro, h01-e05
- Arquivo: src/content/hangul/lessons/h01.ts:18,91
- Coreano original: —
- Português original: "O Hangul foi promulgado entre 1443 e 1446, no reinado de Sejong, com o nome Hunminjeongeum." / "criação do Hunminjeongeum em 1443–1446"
- Problema: a cronologia padrão é: criado/terminado em 1443 (세종 25) e promulgado em 1446 (세종 28; 해례본 também 1446). "Promulgado entre 1443 e 1446" não é falso no intervalo, mas usa o verbo da promulgação para o período da criação — imprecisão histórica num lote que o roteiro pede para auditar (1443–1446, Hunminjeongeum, Sejong). O resto do bloco (nomes, motivação de acessibilidade, formas a partir dos órgãos da fala e céu/terra/humano) está correto e não afirma o que não se pode sustentar; o módulo também não faz a afirmação "28 letras vs 24 atuais" (as contagens que ele usa — 19 consoantes + 21 vogais, 27 finais corrigível em A0-002 — são as do inventário do próprio curso).
- Correção proposta: "criado por Sejong em 1443 e promulgado em 1446 sob o nome Hunminjeongeum".
- Base: cronologia aceita do 훈민정음 (창제 1443 / 반포 1446); coerência interna com h01-e05 (que já fala em "criação ... 1443–1446" — uniformizar verbo e data).
- Confiança: alta
- Impacto: h01/intro; alinhar h01-e05 e X.

## Cobertura

Contagens com `grep -c` na ficha `docs/audits/a0-a2/data/sheets/a0-hangul.md`:

- Lições (`^### h`): 25 — todas lidas (h01–h25)
- Checkpoints (`^### c`): 4 — todos lidos (c1–c4)
- Registros de jamo (`[jamo:`): 40 — todos julgados (19 consoantes + 21 vogais; IPA e notas pt-BR)
- Sílabas: 151 (`[syl]` na seção SYLLABLES) + 15 (`[sílaba]` inline em h02/h03/h16) — composição conferida contra o campo ALVO/decomposição
- Palavras (`[palavra]`): 165 — glosa, sílabas e NOTEs lidas
- Intros (`[intro]`): 89 painéis lidos
- Regras de pronúncia (`[regra:`): 3 (liaison, nasalization, aspiration) + 23 exemplos escrito→falado (`[regra-ex]`) — todos conferidos contra `src/lib/hangul/pronunciation.ts` (liaison de finais simples/duplos, ㅎ que cai, nasalização ㄱ/ㄷ/ㅂ+家族 antes de ㄴ/ㅁ, aspiração com ㅎ em qualquer ordem) e contra a norma (국물→궁물, 학년→항년, 입니다→임니다, 좋다→조타, 읽어요→일거요, 앉아요→안자요, 좋아요→조아요, 꽃이→꼬치, 강아지 sem ligação, 입이→이비: todos corretos)
- Exercícios: 405 linhas de item — mcq 116, reading/* 121, audio-to-char 73, build-syllable 57, minimal-pair 24, char-to-audio 9, cloze 5; gabaritos validados por tipo (id de opção × lista, texto idêntico × opção de mcq, alvo de build × OPÇÕES i/m/f) e ordem de ensino cruzada com `NOVO:`/`introduzido em`

Itens julgados: 100% dos registros acima. Coerência de dificuldade: apenas 1 violação encontrada (A0-006, distrator 버리 em h05). Sandhi: nada sobre ㄴ 첨가/유음화/자음군단순화 é afirmado — apenas adiado (com A0-013 no aviso).

Lacunas: (1) nenhuma verificação auditiva — o corpus MP3 é sintético e está bloqueado por licença, então a correspondência áudio×gabarito foi julgada só no nível de design de item (A0-005, A0-015 são riscos de desenho, não de execução de áudio); (2) A0-014 ficou INCERTO por falta de consulta ao 표준국어대사전 para 회/외; (3) notas do próprio conteúdo já auto-declaradas "em revisão nativa" (h21 formas faladas, 곬) não foram contadas como erro.

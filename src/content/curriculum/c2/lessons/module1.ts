import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado, assume o gênero pedido e deixa explícito o que o leitor deve fazer com a interpretação." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a análise avança da pista textual para a interpretação, sem repetir a mesma ideia." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso da pragmática, inclusive parte do léxico da lição, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém adequado à relação entre os falantes." },
  { criterion: "argument" as const, labelPt: "Qualidade da interpretação", descriptorPt: "A leitura é sustentada por pistas do texto e admite explicitamente a possibilidade de erro." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a fala para outro leitor sem apagar a ambiguidade nem transferir indevidamente a responsabilidade." },
];

function production(
  titlePt: string,
  promptPt: string,
  promptKo: string,
  guidance: readonly string[],
  checklist: readonly string[],
  sampleKo: string,
  samplePt: string,
  notePt: string,
): CourseProductionTask {
  return {
    titlePt,
    promptPt,
    promptKo,
    guidance,
    checklist,
    minWords: 110,
    rubric: RUBRIC,
    sample: { ko: sampleKo, pt: samplePt, notePt },
  };
}

/** c2-l01 — ironia, sarcasmo e o risco de errar a leitura. */
export const C2_L01 = defineC2Lesson({
  id: "c2-l01", number: 1, moduleId: "c2-m01", title: "Ironia e sarcasmo",
  objective: "Distinguir ironia, sarcasmo e elogio sincero pelo contexto e pela relação.",
  prerequisites: [], estimatedMinutes: 85, dialogueTitle: "O elogio que ninguém acreditou",
  intro: [
    {
      title: "O que a ironia pede ao ouvinte",
      body: "A ironia diz uma coisa e pretende outra, mas não mente: ela convida o ouvinte a perceber a inversão. O convite depende de pistas — entonação, exagero, conhecimento compartilhado, contraste com o contexto. Quando essas pistas faltam, o enunciado literal volta a valer e o elogio irônico é recebido como elogio sincero. Por isso, interpretar ironia é uma aposta baseada em indícios, não uma leitura automática da frase.",
      ko: "그 칭찬이 진심인지 아닌지는 문장보다 상황이 더 많이 알려 준다.",
    },
    {
      title: "Sarcasmo, alvo e custo relacional",
      body: "O sarcasmo é uma ironia com alvo e com carga de desprezo. Ele pode produzir humor e coesão entre quem compartilha o alvo, mas cobra um preço de quem é atingido. Em relações assimétricas, o sarcasmo do mais forte parece brincadeira e o do mais fraco parece insolência. Na escrita, sem tom de voz, o custo aumenta: o leitor não sabe se foi convidado a rir ou a se defender.",
      ko: "빈정거림은 웃음을 만들 수 있지만, 관계의 신뢰를 조용히 깎기도 한다.",
    },
  ],
  dialogue: [
    ["도윤", "민재 씨, 발표 정말 대단하던데요.", "Minjae, sua apresentação foi realmente incrível."],
    ["세라", "대단하다니요? 자료가 세 장밖에 없었어요.", "Como assim, incrível? Só havia três slides."],
    ["도윤", "세 장으로 저 정도면 충분히 대단하지 않아요?", "Com três slides, chegar a esse resultado já não é bastante impressionante?"],
    ["민재", "칭찬이기는요. 준비할 시간이 없어서 급하게 만든 거예요.", "Elogio? Que nada. Fiz às pressas porque não tive tempo de preparar."],
    ["세라", "도윤 씨, 방금 그 말, 진심이에요?", "Doyun, você falou isso de verdade?"],
    ["도윤", "글쎄요. 그 말의 속뜻은 따로 있죠. 세 장이라는 사실을 굳이 꺼낼 필요는 없었잖아요.", "Sei lá. Essa fala tem um sentido por trás. Não havia necessidade de mencionar que eram só três slides."],
    ["민재", "저는 칭찬으로 들었어요. 세라 씨가 왜 그렇게 들었는지는 모르겠지만요.", "Eu ouvi como elogio. Embora não saiba por que você ouviu desse jeito, Sera."],
    ["세라", "같은 문장이 사람마다 다르게 들리는 게 반어의 위험이에요. 웃으려고 한 말이 관계를 상하게 할 수도 있죠.", "Que a mesma frase soe diferente para cada pessoa é o risco da ironia. Uma fala feita para rir também pode ferir a relação."],
  ],
  readingText: {
    titlePt: "O estúdio fotográfico do beco",
    paragraphs: [
      "전시회 '골목의 사진관'을 보고 왔다. 작가는 오래된 세탁소와 철물점의 간판을 정면에서 찍었다. 빛을 다루는 솜씨는 분명하다. 흐린 날의 회색조를 이렇게 섬세하게 살린 사진은 최근에 본 것 중 가장 인상적이었다. 작가의 이름은 전시장 어디에도 크게 적혀 있지 않았다. 다만 전시장 입구의 설명문은 이 솜씨를 설명하는 데 절반을 썼고, 사진에 담긴 사람들의 삶에 대해서는 한 문장도 쓰지 않았다. 관람객은 작품보다 작가의 손끝을 먼저 보게 된다.",
      "두 번째 방에서는 사진의 구도가 갑자기 달라진다. 인물은 화면 가장자리로 밀려나고, 간판과 셔터가 화면의 중심을 차지한다. 작가가 골목을 사랑한다고 말하기는 어렵다. 오히려 그는 골목을 오래된 풍경으로 소비하고 있는지도 모른다. 관람객은 그 침묵을 미학으로 받아들이기 쉽다. 첫 문단의 '솜씨가 분명하다'를 칭찬으로만 읽었다면 다시 읽어 보시길. 그 문장은 다음 문장의 비판을 준비하는 장치였을 뿐이다. 칭찬과 비판이 한 문단 안에서 같은 방향으로 움직이지 않는 것이다.",
      "물론 이것은 나의 해석이다. 작가는 인터뷰에서 '사라지는 것들을 기록하고 싶었다'고 말했다. 그 말을 믿는다면 전시는 애도의 형식일 수도 있다. 그러나 기록과 미화는 다르다. 관람객이 전시장을 나오며 '예뻤다'고만 말한다면, 작가의 의도와 무관하게 사진은 골목을 장식으로 바꾼 셈이다. 반어는 독자에게 해석의 몫을 넘기지만, 그 몫을 다하지 않으면 오해로 끝난다. 나는 이 전시를 추천하되, 설명문보다 사진의 가장자리를 먼저 보라고 권하고 싶다. 그래서 이 글은 비평이라기보다 조심스러운 질문으로 남긴다.",
    ],
    pt: "Fui ver a exposição 'O estúdio fotográfico do beco'. O artista fotografou de frente as placas de lavanderias e ferragens antigas. O domínio da luz é evidente. Uma foto que preserva com tanta delicadeza os tons de cinza de um dia nublado foi a mais impressionante que vi ultimamente. O nome do artista não estava escrito em destaque em nenhum lugar da sala. No entanto, o texto de apresentação na entrada dedica metade do espaço a explicar essa habilidade e não escreve uma única frase sobre a vida das pessoas retratadas. O visitante acaba vendo primeiro a mão do artista, e não as obras. Na segunda sala, a composição muda de repente. As pessoas são empurradas para a margem, e as placas e persianas ocupam o centro. É difícil dizer que o artista ama o beco. Talvez ele esteja consumindo o beco como uma paisagem antiga. O visitante tende a receber esse silêncio como estética. Se você leu apenas como elogio a frase 'o domínio é evidente' do primeiro parágrafo, leia de novo. Essa frase era apenas um dispositivo para preparar a crítica do período seguinte. Elogio e crítica não caminham na mesma direção dentro do mesmo parágrafo. É claro que esta é a minha interpretação. Em entrevista, o artista disse que queria 'registrar as coisas que desaparecem'. Se acreditarmos nisso, a exposição pode ser uma forma de luto. Mas registrar e embelezar são coisas diferentes. Se o visitante sai dizendo apenas que era 'bonito', então, independentemente da intenção do artista, as fotos transformaram o beco em decoração. A ironia transfere ao leitor a tarefa da interpretação, mas, se ele não assume essa tarefa, tudo termina em mal-entendido. Recomendo a exposição, mas sugiro olhar as margens das fotos antes do texto de apresentação. Por isso, deixo este texto menos como crítica e mais como uma pergunta cautelosa.",
    objective: "Localizar a pista que transforma o elogio em crítica e reconhecer o risco de uma leitura alternativa.",
  },
  reusedIds: ["ko:독자", "ko:기록", "ko:의도", "ko:미화"],
  grammar: [
    [
      "-다니요 — como assim? espanto ou discordância",
      "동사·형용사 + -다니요 / 명사 + (이)라니요",
      "Retoma a fala do outro para marcar espanto, descrença ou recusa do conteúdo, não para pedir uma simples repetição. É oral e pode soar confrontador, sobretudo com entonação ascendente. Compare com -다고요?, que pede confirmação ou repetição de algo que não foi bem ouvido; -다니요? já comunica que o falante considera o conteúdo implausível. Em contexto hierárquico, prefira -다니요? apenas quando a relação permitir discordância direta.",
      [
        ["그 발표가 완벽했다니요? 자료가 세 장뿐이었는데요.", "Como assim, a apresentação foi perfeita? Mas eram só três slides."],
        ["사과할 생각이 없다니요? 그건 방금 들은 말과 다르잖아요.", "Como assim, ele não pretende pedir desculpas? Isso contradiz o que acabei de ouvir."],
      ],
    ],
    [
      "-기는요 — imagina; que nada",
      "동사·형용사 + -기는요 / 명사 + 이기는요",
      "Refuta um elogio, um agradecimento ou uma avaliação, com modéstia, incômodo ou desdém. É oral e cortês quando acompanhado de um sorriso, mas pode soar irônico se o tom for seco. Compare com 별말씀을요, fórmula fixa de cortesia diante de agradecimento, e com -기는커녕, que significa 'muito pelo contrário' e não serve para recusar um elogio. Não use -기는요 para negar um fato objetivo; nesse caso, a negação simples é mais clara.",
      [
        ["칭찬이기는요. 그저 시간에 맞춰 끝낸 것뿐이에요.", "Elogio? Que nada. Só terminei dentro do prazo."],
        ["제가 화났기는요. 조금 피곤했을 뿐이에요.", "Eu irritado? Imagina. Só estava um pouco cansado."],
      ],
    ],
  ],
  guided: [
    mcq("Na resenha, qual pista faz o elogio à técnica soar também como crítica?", ["A frase '솜씨가 분명하다' prepara a crítica do parágrafo seguinte.", "O texto elogia o uso do cinza em dias nublados.", "O texto começa descrevendo a entrada da exposição."], "A frase '솜씨가 분명하다' prepara a crítica do parágrafo seguinte.", "O elogio não é isolado: ele introduz a acusação de que as pessoas ficam à margem do enquadramento."),
    cloze("Complete a reação de espanto diante do elogio exagerado: 그 발표가 완벽했___? 자료가 세 장뿐이었는데요.", "다니요", "-다니요 retoma a fala do outro para marcar incredulidade, não para pedir repetição."),
    listen("Ouça e escreva a resposta modesta de Minjae.", "칭찬이기는요. 준비할 시간이 없어서 급하게 만든 거예요.", "칭찬이기는요. 준비할 시간이 없어서 급하게 만든 거예요.", "Elogio? Que nada. Fiz às pressas porque não tive tempo de preparar."),
    translate("pt-ko", "Traduza: “Elogio? Que nada; apenas terminei dentro do prazo.”", "칭찬이기는요. 그저 시간에 맞춰 끝냈을 뿐이에요.", "-기는요 refuta o elogio com modéstia e mantém o registro oral cortês.", ["칭찬이기는요. 그저 시간 맞춰 끝냈을 뿐이에요."]),
    reading("두 번째 방에서는 사진의 구도가 갑자기 달라진다. 인물은 화면 가장자리로 밀려나고, 간판과 셔터가 화면의 중심을 차지한다. 작가가 골목을 사랑한다고 말하기는 어렵다. 오히려 그는 골목을 오래된 풍경으로 소비하고 있는지도 모른다.", "O que a autora sugere ao dizer que o artista talvez 'consuma' o beco como paisagem antiga?", ["Que ele transforma a vida do lugar em objeto estético, deixando as pessoas em segundo plano.", "Que ele se recusa a fotografar pessoas por questões éticas.", "Que ele mora no beco e conhece todos os moradores."], "Que ele transforma a vida do lugar em objeto estético, deixando as pessoas em segundo plano.", "A crítica liga a composição — pessoas na margem — ao olhar que trata o beco como paisagem."),
  ],
  independent: [
    mcq("Qual interpretação da resenha é a mais defensável?", ["A autora elogia a técnica, mas critica o modo como as pessoas são deslocadas para a margem.", "A autora considera a exposição inteiramente sem valor.", "A autora afirma que o artista não sabe fotografar."], "A autora elogia a técnica, mas critica o modo como as pessoas são deslocadas para a margem.", "A resenha sustenta as duas coisas ao mesmo tempo: reconhece a habilidade e questiona o olhar."),
    cloze("Complete a advertência sobre a figura: 같은 문장이 다르게 들리는 것이 ___의 위험이에요.", "반어", "A resposta retoma o conceito central da lição e aparece no fechamento do diálogo."),
    listen("Ouça e escreva o limite que a autora reconhece.", "물론 이것은 나의 해석이다.", "물론 이것은 나의 해석이다.", "É claro que esta é a minha interpretação."),
    translate("ko-pt", "Traduza: 반어는 독자에게 해석의 몫을 넘기지만, 그 몫을 다하지 않으면 오해로 끝난다.", "A ironia transfere ao leitor a tarefa da interpretação, mas, se ele não assume essa tarefa, tudo termina em mal-entendido.", "해석의 몫 = a parte da interpretação que cabe ao leitor.", ["A ironia entrega ao leitor a responsabilidade de interpretar, mas, se ele não a assume, o resultado é um mal-entendido."]),
    reading("물론 이것은 나의 해석이다. 작가는 인터뷰에서 '사라지는 것들을 기록하고 싶었다'고 말했다. 그 말을 믿는다면 전시는 애도의 형식일 수도 있다. 그러나 기록과 미화는 다르다.", "Por que a autora distingue 'registro' de 'embelezamento'?", ["Porque registrar pode preservar uma perda, enquanto embelezar pode transformá-la em decoração.", "Porque acredita que toda fotografia é necessariamente falsa.", "Porque o artista se recusou a dar entrevista."], "Porque registrar pode preservar uma perda, enquanto embelezar pode transformá-la em decoração.", "A distinção separa a intenção declarada do efeito que a exposição pode produzir no visitante."),
  ],
  summary: [
    "A ironia inverte o enunciado e depende de pistas de contexto, tom e conhecimento compartilhado.",
    "-다니요? marca espanto ou recusa do conteúdo; -다고요? apenas pede confirmação.",
    "-기는요 refuta um elogio com modéstia ou desdém, em registro oral.",
    "O sarcasmo tem alvo e cobra um custo relacional, maior ainda na escrita sem tom.",
    "Uma boa interpretação nomeia a pista e admite a leitura alternativa.",
  ],
  production: production(
    "Produção independente · duas versões de um comentário",
    "Pense em uma apresentação, reunião ou entrega recente. Escreva duas versões de um comentário: uma irônica e uma sincera. Depois, em um parágrafo, explique qual pista permite distinguir as duas e qual risco de erro existe.",
    "같은 상황에 대한 빈정거림과 진심 어린 칭찬을 각각 써 보고, 둘을 구분하는 단서를 설명해 보세요.",
    ["Mantenha o mesmo fato nas duas versões, para que a diferença esteja no olhar.", "Use -기는요 ou -다니요? em uma das versões.", "Na análise, nomeie uma pista concreta: exclamação, contraste, adjetivo deslocado.", "Reconheça que a versão irônica pode ser mal interpretada.", "Feche dizendo o que você faria para tornar a crítica explícita."],
    ["Duas versões com o mesmo referente.", "Pista linguística identificada.", "Risco relacional nomeado.", "Uma forma-alvo usada com naturalidade.", "Fechamento com reformulação explícita."],
    "지난주 팀 발표에 대해 두 가지 버전의 코멘트를 써 보겠다. 첫 번째는 빈정거림이다. '자료가 세 장뿐인데 설명은 이렇게 길 수 있군요.' 이 말은 겉으로는 감탄하는 말이지만, 실제로는 준비 부족을 비꼬고 있다. 두 번째는 진심이다. '짧은 자료 안에 핵심이 잘 정리되어 있어서 이해하기 쉬웠습니다.' 같은 상황을 두고도 문장의 방향이 완전히 다르다. 나는 첫 번째 문장을 들었을 때 잠시 웃었지만, 곧 불편해졌다. 발표자가 들인 시간을 무시하는 느낌이 들었기 때문이다. 반어는 관계를 재미있게 만들 수도 있지만, 상대가 농담으로 받아들이지 않으면 공격이 된다. 그래서 나는 칭찬과 비판을 분명히 나누어 말하는 편이 낫다고 본다. 이번 경우에는 '핵심은 좋았고, 근거 자료는 더 보강하면 좋겠다'고 말하는 것이 정확하다.",
    "Vou escrever duas versões de um comentário sobre a apresentação da equipe na semana passada. A primeira é sarcástica: 'Só três slides e a explicação pode ser tão longa assim?' A frase finge admiração, mas na verdade alfineta a falta de preparo. A segunda é sincera: 'Com pouco material, os pontos principais estavam bem organizados, por isso foi fácil entender.' Diante da mesma situação, a direção da frase é completamente diferente. Quando ouvi a primeira, ri por um instante, mas logo fiquei desconfortável. Senti que o tempo dedicado pelo apresentador era desprezado. A ironia pode tornar a relação mais divertida, mas, se o outro não a recebe como brincadeira, ela se torna um ataque. Por isso, considero melhor separar com clareza o elogio e a crítica. Neste caso, o mais preciso é dizer: 'O ponto central estava bom; seria bom reforçar as evidências'.",
    "Exemplo original. Observe que as duas versões descrevem o mesmo fato e que a análise nomeia uma pista e um risco. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l02 — pressupostos e subentendidos de uma nota oficial. */
export const C2_L02 = defineC2Lesson({
  id: "c2-l02", number: 2, moduleId: "c2-m01", title: "O que fica pressuposto",
  objective: "Identificar pressupostos e subentendidos que o texto não declara.",
  prerequisites: ["c2-l01"], estimatedMinutes: 85, dialogueTitle: "O que a nota não diz",
  intro: [
    {
      title: "Afirmar, pressupor, insinuar",
      body: "Uma nota pode afirmar uma informação, pressupor outra e insinuar uma terceira sem nunca escrevê-la. O pressuposto é aquilo que precisa ser verdadeiro para a frase fazer sentido; o subentendido é a conclusão que o leitor tira do modo de dizer. A diferença importa porque o pressuposto sobrevive à negação: negar 'o aluno faltou à formação' não apaga a existência da formação nem a expectativa de que ele deveria tê-la feito.",
      ko: "그 문장은 책임이 이미 정해졌다고 전제하지만, 그것을 직접 주장하지는 않는다.",
    },
    {
      title: "Por que o pressuposto é difícil de contestar",
      body: "Quem contesta apenas a frase afirmada pode reforçar o pressuposto que a sustenta. Em uma nota institucional, a escolha de mencionar a formação do estudante e o histórico do professor distribui a culpa antes de a investigação terminar. A contrapergunta eficaz não é 'isso é verdade?', mas 'por que isso já está sendo tratado como o eixo da explicação?'. Contestar o enquadramento é diferente de negar o fato.",
      ko: "부정해도 사라지지 않는 정보가 있으므로, 질문은 문장 전체가 아니라 전제를 겨냥해야 한다.",
    },
  ],
  dialogue: [
    ["지우", "이 공지문, 읽어 봤어요? 책임이 이미 학생에게 있는 것처럼 읽혀요.", "Você leu este comunicado? Parece que a responsabilidade já está com o estudante."],
    ["현석", "글쎄요. '안전 교육을 이수하지 않은 상태였다'고만 썼을 뿐인데요.", "Sei não. Só escreveu que 'ele estava sem ter concluído a formação em segurança'."],
    ["지우", "바로 그 표현이 문제예요. 사실을 말하는 것 같지만, 사고의 원인을 학생 쪽으로 옮겨 놓죠.", "É exatamente essa expressão que é o problema. Parece dizer um fato, mas desloca a causa do acidente para o lado do estudante."],
    ["현석", "그러면 학교는 아무 책임이 없다고 암시하는 건가요?", "Então está insinuando que a escola não tem responsabilidade alguma?"],
    ["지우", "직접 말하지는 않아요. 지도교수가 평소 안전을 강조해 왔다고 덧붙인 것도 같은 방향이고요.", "Não diz diretamente. O acréscimo de que o orientador sempre enfatizou a segurança também vai na mesma direção."],
    ["현석", "부정해도 사라지지 않는 게 있네요. '사전 승인을 거쳤다'는 말도 절차가 문제없었다는 인상을 주고요.", "Há coisas que não desaparecem nem com a negação. A frase 'passou pela aprovação prévia' também dá a impressão de que o procedimento não tinha problema."],
    ["지우", "맞아요. 그래서 우리는 문장을 반박하는 대신, 전제를 다시 쓰게 해야 해요.", "Exato. Por isso, em vez de refutar a frase, temos de fazer com que reescrevam o pressuposto."],
    ["현석", "책임을 특정하지 않은 채 절차만 강조한 점을 문제로 삼자는 거죠.", "Quer dizer que devemos problematizar o fato de enfatizar apenas o procedimento sem especificar a responsabilidade."],
  ],
  readingText: {
    titlePt: "A nota que já escolheu uma culpa",
    paragraphs: [
      "한빛대학교 연구안전본부는 지난 5월 14일 공과대학 실험실에서 발생한 화상 사고와 관련하여 다음과 같이 알려 드립니다. 사고는 실험 장비의 전원이 꺼지지 않은 상태에서 학생 두 명이 장비를 정리하던 중 발생했습니다. 두 학생은 곧바로 인근 병원으로 이송되었으며, 현재 생명에 지장은 없는 것으로 확인되었습니다. 사고가 난 실험실은 현재 출입이 제한되어 있습니다. 학교는 피해 학생과 가족에게 필요한 지원을 제공하고 있습니다.",
      "해당 실험은 사전 승인 절차를 거쳤으며, 안전 관리 담당자는 정기 점검을 수행했습니다. 다만 사고 당시 학생 A 씨가 안전 교육을 이수하지 않은 상태였다는 점이 확인되었습니다. 지도교수는 평소 실험실 안전 수칙을 강조해 왔으며, 이번 사고와 관련하여 별도의 지시를 내린 사실은 없습니다. 연구실 사용 기록도 규정에 따라 관리되어 왔습니다. 본부는 관련 학생과 면담을 진행하고 있으며, 면담 내용은 조사 기록에 포함될 예정입니다.",
      "본부는 피해 학생의 과실 여부가 확인되는 대로 후속 조치를 결정할 예정입니다. 아울러 모든 실험실을 대상으로 전원 차단 장치를 점검하고, 안전 교육 이수 여부를 출입 시스템과 연동하겠습니다. 재발 방지를 위해 교육 시간을 늘리되, 학생들의 수업 일정을 고려하여 시행하겠습니다. 조사 결과는 확정된 뒤 관계 기관과 협의하여 공개하겠습니다. 다만 조사가 끝나기 전까지는 어떤 결론도 확정된 사실로 받아들여서는 안 됩니다. 사고 수습에 협조해 주신 구성원 여러분께 감사드립니다.",
    ],
    pt: "O Centro de Segurança em Pesquisa da Universidade Hanbit informa o seguinte sobre o acidente com queimaduras ocorrido em 14 de maio no laboratório da Faculdade de Engenharia. O acidente aconteceu enquanto dois estudantes organizavam equipamentos cuja alimentação elétrica não havia sido desligada. Os dois estudantes foram imediatamente levados a um hospital próximo, e foi confirmado que não há risco à vida. O laboratório onde ocorreu o acidente está com acesso restrito no momento. A universidade está oferecendo o apoio necessário aos estudantes feridos e às famílias. O experimento em questão passou pelo procedimento de aprovação prévia, e o responsável pela segurança realizou inspeções periódicas. No entanto, foi confirmado que, no momento do acidente, o estudante A não havia concluído a formação em segurança. O orientador sempre enfatizou as normas de segurança do laboratório e não emitiu nenhuma instrução específica relacionada a este acidente. Os registros de uso do laboratório também foram administrados conforme as normas. O centro está realizando entrevistas com os estudantes envolvidos, e o conteúdo será incluído no registro da investigação. O centro decidirá as medidas seguintes assim que for confirmada ou não a falha do estudante ferido. Além disso, verificará os dispositivos de corte de energia de todos os laboratórios e vinculará a conclusão da formação em segurança ao sistema de acesso. Para prevenir recorrências, ampliará a carga horária da formação, considerando a agenda de aulas dos estudantes. Os resultados da investigação serão divulgados após a confirmação, em consulta com os órgãos competentes. No entanto, até o fim da investigação, nenhuma conclusão deve ser tomada como fato confirmado. Agradecemos aos membros da comunidade que colaboraram com a resposta ao acidente.",
    objective: "Separar o que a nota afirma do que ela pressupõe sobre a culpa e o procedimento.",
  },
  reusedIds: ["ko:기록", "ko:결과", "ko:협조", "ko:조사"],
  grammar: [
    [
      "-ㄴ/는 것으로 치부하다 — tratar como; menosprezar como",
      "동사 + -는 것으로 치부하다 / 형용사 + -(으)ㄴ 것으로 치부하다 / 명사 + (으)로 치부하다",
      "Classifica algo como uma categoria menor e, com isso, dispensa examiná-lo. É frequente em textos analíticos e jornalísticos, muitas vezes com tom crítico. Compare com 간주하다, que é mais neutro e comum em contexto jurídico, e com 여기다, que descreve a avaliação pessoal de alguém. A construção com 치부하다 sugere redução indevida: o problema existe, mas é rebaixado a uma etiqueta cômoda. Registro: formal, sobretudo escrito.",
      [
        ["회사는 그 사고를 작은 실수로 치부했다.", "A empresa tratou o acidente como um pequeno erro."],
        ["그는 제안을 감정적인 불만으로 치부해 버렸다.", "Ele simplesmente classificou a proposta como desabafo emocional."],
      ],
    ],
    [
      "-ㄹ 나위 없다 — não precisa nem dizer; é evidente",
      "동사 + -ㄹ 나위(가) 없다",
      "Afirma que não há necessidade nem espaço para discutir algo, porque o ponto já está suficientemente claro. É formal e avaliativo, comum em textos de opinião e relatórios. Compare com -ㄹ 필요가 없다, que fala de necessidade prática, e com -ㄹ 여지가 없다, que nega possibilidade ou margem. A forma é quase sempre negativa e costuma vir com 말할, 강조할 ou 설명할.",
      [
        ["그 사고가 심각하다는 점은 말할 나위 없다.", "Nem é preciso dizer que o acidente é grave."],
        ["책임을 물어야 한다는 점은 강조할 나위도 없다.", "Não há nem necessidade de enfatizar que se deve cobrar responsabilidade."],
      ],
    ],
  ],
  guided: [
    mcq("Qual informação a nota trata como já estabelecida, sem afirmá-la diretamente?", ["Que a falha do estudante é a explicação mais provável do acidente.", "Que o orientador desligou o equipamento.", "Que a universidade vai encerrar o laboratório."], "Que a falha do estudante é a explicação mais provável do acidente.", "Ao dizer '과실 여부가 확인되는 대로', a nota coloca a falha do estudante no centro, antes de a investigação concluir."),
    cloze("Complete o modo redutor de classificar o acidente: 회사는 그 사고를 작은 실수로 ___.", "치부했다", "-로 치부하다 rebaixa o fato a uma categoria que dispensa exame."),
    listen("Ouça e escreva o dado que a nota destaca sobre o estudante.", "다만 사고 당시 학생 A 씨가 안전 교육을 이수하지 않은 상태였다는 점이 확인되었습니다.", "다만 사고 당시 학생 A 씨가 안전 교육을 이수하지 않은 상태였다는 점이 확인되었습니다.", "No entanto, foi confirmado que, no momento do acidente, o estudante A não havia concluído a formação em segurança."),
    translate("pt-ko", "Traduza: “Nem é preciso dizer que a nota protege o professor.”", "그 공지문이 교수를 보호한다는 점은 말할 나위 없다.", "-ㄹ 나위 없다 apresenta o ponto como evidente e dispensa discussão.", ["그 공지문이 교수를 보호한다는 점은 말할 나위도 없다."]),
    reading("본부는 피해 학생의 과실 여부가 확인되는 대로 후속 조치를 결정할 예정입니다. 아울러 모든 실험실을 대상으로 전원 차단 장치를 점검하고, 안전 교육 이수 여부를 출입 시스템과 연동하겠습니다.", "O que a nota promete antes de concluir sobre a responsabilidade?", ["Vai verificar os dispositivos de corte de energia e vincular a formação ao acesso.", "Vai divulgar imediatamente o nome dos envolvidos.", "Vai encerrar todas as atividades de laboratório."], "Vai verificar os dispositivos de corte de energia e vincular a formação ao acesso.", "As medidas são técnicas e administrativas; a conclusão sobre a culpa fica para depois."),
  ],
  independent: [
    mcq("Qual pergunta ataca diretamente o pressuposto da nota, em vez de apenas negar o que ela diz?", ["Por que a nota trata a falha do estudante como hipótese principal antes de concluir a investigação?", "A nota foi publicada em maio, antes da conclusão do relatório interno?", "Quantos parágrafos e quantas notas de rodapé tem a nota oficial?"], "Por que a nota trata a falha do estudante como hipótese principal antes de concluir a investigação?", "A pergunta mira o enquadramento que distribui a culpa, não um detalhe verificável da frase."),
    cloze("Complete a evidência que a nota dá como óbvia: 그 사고가 심각하다는 점은 말할 ___ 없다.", "나위", "A forma fixa é -ㄹ 나위 없다, usada para apresentar algo como evidente."),
    listen("Ouça e escreva o que a nota afirma sobre o orientador.", "지도교수는 평소 실험실 안전 수칙을 강조해 왔으며, 이번 사고와 관련하여 별도의 지시를 내린 사실은 없습니다.", "지도교수는 평소 실험실 안전 수칙을 강조해 왔으며, 이번 사고와 관련하여 별도의 지시를 내린 사실은 없습니다.", "O orientador sempre enfatizou as normas de segurança e não emitiu nenhuma instrução específica relacionada a este acidente."),
    translate("ko-pt", "Traduza: 부정해도 사라지지 않는 정보가 있으므로, 질문은 문장 전체가 아니라 전제를 겨냥해야 한다.", "Como há informações que não desaparecem nem com a negação, a pergunta deve mirar o pressuposto, não a frase inteira.", "전제 = pressuposto; 겨냥하다 = mirar, apontar para.", ["Há informações que sobrevivem à negação; por isso, a pergunta precisa visar o pressuposto, e não a frase toda."]),
    reading("해당 실험은 사전 승인 절차를 거쳤으며, 안전 관리 담당자는 정기 점검을 수행했습니다. 다만 사고 당시 학생 A 씨가 안전 교육을 이수하지 않은 상태였다는 점이 확인되었습니다. 지도교수는 평소 실험실 안전 수칙을 강조해 왔으며, 이번 사고와 관련하여 별도의 지시를 내린 사실은 없습니다.", "O que a menção à formação em segurança faz a nota parecer?", ["Que o elo falho é o estudante, e não o procedimento ou a supervisão.", "Que a universidade não possui normas de segurança.", "Que o orientador estava ausente no momento do acidente."], "Que o elo falho é o estudante, e não o procedimento ou a supervisão.", "A nota reforça o procedimento e a conduta do professor enquanto destaca a formação incompleta do estudante."),
  ],
  summary: [
    "Pressuposto é o que a frase precisa assumir; subentendido é a conclusão que o modo de dizer sugere.",
    "O pressuposto sobrevive à negação da frase, por isso é preciso contestar o enquadramento.",
    "-ㄴ/는 것으로 치부하다 rebaixa um problema a uma categoria que dispensa exame.",
    "-ㄹ 나위 없다 apresenta um ponto como evidente e fora de discussão.",
    "Numa nota institucional, a ordem e a seleção dos fatos também distribuem responsabilidade.",
  ],
  production: production(
    "Produção independente · tornar explícito um pressuposto",
    "Escolha uma nota, comunicado ou mensagem institucional que você conheça. Reescreva-a tornando explícito um pressuposto problemático e explique, em seguida, por que esse pressuposto merece ser contestado.",
    "기관의 공지문에서 암묵적으로 전제된 내용을 드러내고, 그것이 왜 문제인지 설명해 보세요.",
    ["Identifique uma frase que só faz sentido se algo já for aceito.", "Use -ㄴ/는 것으로 치부하다 ou -ㄹ 나위 없다 uma vez.", "Reescreva a nota em registro institucional, não em tom de desabafo.", "Diga o que a versão original deixa de fora.", "Feche com a pergunta que a instituição deveria responder."],
    ["Pressuposto identificado com precisão.", "Reescrita que o torna visível.", "Explicação do custo de mantê-lo implícito.", "Uma forma-alvo empregada corretamente.", "Pergunta final dirigida à instituição."],
    "한 지역 보건소는 독감 예방접종 안내문에서 '접종을 원하는 주민은 신분증을 지참하십시오'라고만 적었다. 이 문장은 모든 주민이 접종을 원한다는 것도, 접종이 무료라는 것도 전제하지 않는다. 문제는 다음 문장이다. '지난해 미접종자에게는 별도 안내를 드립니다.' 이 문장은 미접종자가 안내를 받아야 할 대상이라는 점을 당연시한다. 그러나 접종을 거부한 사람과 접종할 수 없었던 사람은 전혀 다른 처지다. 안내문은 두 집단을 하나로 치부하고, 접근성 문제를 개인의 선택으로 바꾼다. 나는 이 문장을 '접종을 원하지 않았거나 접종이 어려웠던 주민께는 그 이유를 묻고 필요한 지원을 안내드립니다'로 고쳐야 한다고 본다. 이렇게 쓰면 기관이 책임질 부분이 드러나고, 주민을 평가하는 대신 조건을 묻게 된다. 안내문은 사실을 전달하는 문서이면서 동시에 책임을 배분하는 문서다.",
    "Um posto de saúde local escreveu, num aviso sobre a vacina contra a gripe, apenas: 'Moradores que desejam se vacinar devem trazer um documento de identidade.' Essa frase não pressupõe que todos os moradores queiram se vacinar nem que a vacinação seja gratuita. O problema é a frase seguinte: 'No ano passado, enviaremos orientações separadas aos não vacinados.' Essa frase dá como certo que os não vacinados são pessoas que precisam de orientação. No entanto, quem recusou a vacina e quem não conseguiu tomá-la estão em situações completamente diferentes. O aviso trata os dois grupos como um só e transforma um problema de acesso em escolha individual. Considero que a frase deveria ser reescrita como: 'Aos moradores que não quiseram se vacinar ou tiveram dificuldade, perguntaremos o motivo e informaremos o apoio necessário.' Assim, fica visível a parte de responsabilidade da instituição, e ela passa a perguntar sobre condições em vez de julgar os moradores. Um aviso é um documento que transmite fatos e, ao mesmo tempo, distribui responsabilidades.",
    "Exemplo original. Observe como a reescrita nomeia o pressuposto e desloca a responsabilidade sem acusar os moradores. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l03 — atenuação, evasão e grau de compromisso. */
export const C2_L03 = defineC2Lesson({
  id: "c2-l03", number: 3, moduleId: "c2-m01", title: "Atenuar, evadir, proteger",
  objective: "Reconhecer atenuação e evasão em contextos de responsabilidade institucional.",
  prerequisites: ["c2-l02"], estimatedMinutes: 85, dialogueTitle: "A resposta que não responde",
  intro: [
    {
      title: "Atenuar não é mentir",
      body: "Atenuar é reduzir o grau de compromisso de uma afirmação: 'houve falha' pode virar 'pode ter havido falha'. Isso é legítimo quando a informação ainda é incerta e irresponsável quando o falante já sabe o que aconteceu. O teste não está no grau de certeza da frase, mas na relação entre o que a instituição sabe e o que ela admite saber. Uma atenuação honesta nomeia o que falta saber e quem vai verificar; uma evasão usa a incerteza para não dizer o que já se sabe.",
      ko: "가능성을 낮게 말하는 것과 책임을 피하는 것은 다르다.",
    },
    {
      title: "Evasão responsável e irresponsável",
      body: "Em uma investigação em curso, preservar a cautela pode ser responsável: acusar cedo demais também causa danos. A diferença aparece no compromisso assumido. A resposta responsável diz o que está confirmado, o que está em apuração e qual será o próximo passo. A evasão irresponsável troca esses três elementos por fórmulas vagas e desloca a pergunta para outro assunto. Quando todas as respostas terminam em 'é preciso aguardar', o ouvinte deixa de saber quem responde por quê.",
      ko: "책임 있는 유보는 아는 것과 모르는 것을 구분하지만, 책임 회피는 그 경계를 흐린다.",
    },
  ],
  dialogue: [
    ["기자", "어제 화재의 원인은 무엇입니까?", "Qual foi a causa do incêndio de ontem?"],
    ["대변인", "조사 중입니다. 전기 설비 문제일 수도 있고, 외부 요인일 수도 있습니다.", "Está em investigação. Pode ser um problema na instalação elétrica ou um fator externo."],
    ["기자", "안전 점검은 제대로 이루어졌습니까?", "As inspeções de segurança foram feitas corretamente?"],
    ["대변인", "저희는 정기 점검을 하는 편입니다. 다만 기록 일부는 확인 중입니다.", "Nós costumamos fazer inspeções periódicas. No entanto, parte dos registros está em verificação."],
    ["기자", "점검 기록이 없다는 뜻입니까?", "Isso significa que não há registro da inspeção?"],
    ["대변인", "없다고 단정할 수는 없습니다. 담당자가 확인하고 있습니다.", "Não se pode afirmar que não há. O responsável está verificando."],
    ["기자", "책임 소재는 어떻게 보십니까?", "Como o senhor vê a questão da responsabilidade?"],
    ["대변인", "지금은 원인 규명이 우선입니다. 책임은 조사 결과에 따라 판단할 사안입니다.", "No momento, esclarecer a causa é prioritário. A responsabilidade é uma questão a ser julgada conforme o resultado da investigação."],
  ],
  readingText: {
    titlePt: "Três respostas, nenhum compromisso",
    paragraphs: [
      "기자: 어제 새벽 발생한 물류창고 화재의 원인이 무엇이라고 보십니까? 대변인: 현재 소방 당국과 함께 조사 중입니다. 전기 설비 문제일 수도 있고, 외부 요인일 수도 있다고 보고 있습니다. 어느 한 가지로 단정하기는 이릅니다. 기자: 현재 부상자는 있습니까? 대변인: 두 명이 연기를 마셨지만, 모두 귀가한 상태입니다. 기자: 화재 전에 안전 점검이 제대로 이루어졌습니까? 대변인: 저희는 점검을 정기적으로 실시하는 편입니다. 다만 이번 창고는 준공된 지 오래되어 일부 설비의 교체가 필요한 상황이었습니다. 점검 기록은 확인되는 대로 공개하겠습니다.",
      "기자: 기록이 없다는 뜻입니까? 대변인: 없다고 단정할 수는 없습니다. 담당 부서에서 확인 중이며, 저희도 자료를 취합하고 있습니다. 기자: 취합이 늦어지는 이유는 무엇입니까? 대변인: 여러 부서가 관련되어 있어 시간이 걸리는 편입니다. 기자: 화재 전에 교체가 필요하다는 사실을 알고 있었습니까? 대변인: 그 부분은 조사 결과를 지켜봐야 합니다. 현재로서는 확인된 바가 없습니다. 기자: 확인된 바가 없다는 말과 모른다는 말은 다르지 않습니까? 대변인: 표현이 부족했습니다. 확인된 범위와 확인 중인 범위를 구분해 말씀드리겠습니다.",
      "기자: 책임 소재를 어떻게 보십니까? 대변인: 지금은 원인을 밝히는 것이 우선입니다. 책임 문제는 조사 결과에 따라 판단할 사안입니다. 저희도 최선을 다해 협조하고 있습니다. 피해를 입은 분들께는 사과드리며, 보상 절차도 차질 없이 진행하겠습니다. 기자: 사과는 하시면서 책임은 말하지 않으시는군요. 대변인: 책임을 피하려는 의도는 아닙니다. 다만 아직 확인되지 않은 사실을 먼저 말하는 것은 적절하지 않다고 봅니다. 저희는 이번 주 금요일까지 점검 기록의 존재 여부를 확인해 공개하겠습니다.",
    ],
    pt: "Repórter: Qual o senhor considera que foi a causa do incêndio no armazém logístico na madrugada de ontem? Porta-voz: No momento, estamos investigando junto com as autoridades de bombeiros. Trabalhamos com a possibilidade de um problema na instalação elétrica ou de um fator externo. É precipitado afirmar uma única causa. Repórter: Há feridos no momento? Porta-voz: Duas pessoas inalaram fumaça, mas ambas já voltaram para casa. Repórter: As inspeções de segurança foram feitas corretamente antes do incêndio? Porta-voz: Costumamos realizar inspeções periodicamente. No entanto, este armazém foi concluído há muito tempo, e parte dos equipamentos precisava ser substituída. Assim que os registros forem confirmados, vamos divulgá-los. Repórter: Isso significa que não há registro? Porta-voz: Não se pode afirmar que não há. O departamento responsável está verificando, e nós também estamos reunindo os documentos. Repórter: Por que a reunião dos documentos está atrasada? Porta-voz: Como vários departamentos estão envolvidos, costuma levar tempo. Repórter: Vocês sabiam antes do incêndio que era necessário substituir equipamentos? Porta-voz: Essa parte depende do resultado da investigação. No momento, não há nada confirmado. Repórter: Dizer que não há nada confirmado e dizer que não sabe não são coisas diferentes? Porta-voz: Faltou precisão na expressão. Vou distinguir o que está confirmado do que está em verificação. Repórter: Como o senhor vê a responsabilidade? Porta-voz: Agora, esclarecer a causa é prioritário. A responsabilidade é uma questão a ser julgada conforme o resultado da investigação. Também estamos colaborando ao máximo. Pedimos desculpas aos atingidos, e o procedimento de indenização seguirá sem contratempos. Repórter: O senhor pede desculpas, mas não fala em responsabilidade. Porta-voz: Não é nossa intenção fugir da responsabilidade. Apenas considero inadequado afirmar primeiro fatos que ainda não foram confirmados. Vamos verificar até a próxima sexta-feira se existe registro da inspeção e o divulgaremos.",
    objective: "Comparar o compromisso assumido em cada resposta e localizar o que o porta-voz evita afirmar.",
  },
  reusedIds: ["ko:원인", "ko:기록", "ko:단정", "ko:발생"],
  grammar: [
    [
      "-ㄴ/는 편이다 — tende a; está mais para",
      "동사 + -는 편이다 / 형용사 + -(으)ㄴ 편이다",
      "Apresenta uma tendência relativa, não uma regra absoluta. É comum em respostas institucionais porque suaviza a generalização e evita prometer um comportamento excepcional. Compare com 보통 -ㄴ다, que descreve um hábito de modo mais direto, e com -기 마련이다, que apresenta o resultado como inevitável. Registro: neutro a formal, frequente em respostas institucionais. O falante pode usar -는 편이다 para descrever a própria organização sem se comprometer com o caso concreto que está sendo perguntado.",
      [
        ["저희는 점검을 정기적으로 실시하는 편입니다.", "Nós costumamos realizar inspeções periodicamente."],
        ["이 창고는 준공된 지 오래되어 설비가 낡은 편입니다.", "Este armazém foi concluído há muito tempo, e o equipamento tende a estar desgastado."],
      ],
    ],
    [
      "-ㄹ 수도 있다 — pode ser que",
      "동사·형용사 + -ㄹ 수도 있다",
      "Marca uma possibilidade entre outras, sem indicar qual é mais provável. Em contextos de crise, pode ser uma cautela honesta ou uma forma de diluir o compromisso. Compare com -ㄹ 수 있다, que também expressa possibilidade, mas não destaca a existência de alternativas; e com -ㄹ지도 모른다, mais subjetivo e conjectural. A forma -ㄹ 수도 있다 é neutra e frequente na fala formal e na escrita jornalística.",
      [
        ["전기 설비 문제일 수도 있습니다.", "Pode ser um problema na instalação elétrica."],
        ["점검 기록이 누락되었을 수도 있습니다.", "Pode ser que o registro de inspeção tenha sido omitido."],
      ],
    ],
  ],
  guided: [
    mcq("O que o porta-voz evita afirmar diretamente?", ["Se a inspeção foi feita no caso concreto e se existe registro dela.", "Se houve um incêndio no armazém.", "Se as autoridades de bombeiros participam da investigação."], "Se a inspeção foi feita no caso concreto e se existe registro dela.", "Ele fala de uma prática geral, mas não confirma o caso específico nem a existência do registro."),
    cloze("Complete a tendência institucional: 저희는 점검을 정기적으로 실시하는 ___.", "편입니다", "-는 편이다 descreve uma tendência, sem garantir o caso concreto."),
    listen("Ouça e escreva a resposta sobre a causa provável.", "전기 설비 문제일 수도 있고, 외부 요인일 수도 있습니다.", "전기 설비 문제일 수도 있고, 외부 요인일 수도 있습니다.", "Pode ser um problema na instalação elétrica ou um fator externo."),
    translate("pt-ko", "Traduza: “Pode ser que o registro de inspeção tenha sido omitido.”", "점검 기록이 누락되었을 수도 있습니다.", "-ㄹ 수도 있다 apresenta uma possibilidade entre outras, em registro formal.", ["점검 기록이 누락됐을 수도 있습니다."]),
    reading("저희는 점검을 정기적으로 실시하는 편입니다. 다만 이번 창고는 준공된 지 오래되어 일부 설비의 교체가 필요한 상황이었습니다. 점검 기록은 확인되는 대로 공개하겠습니다.", "Como a resposta sobre a inspeção desloca o compromisso?", ["Reconhece uma prática geral, mas não confirma o caso concreto.", "Nega que exista qualquer inspeção na empresa.", "Promete divulgar os registros imediatamente."], "Reconhece uma prática geral, mas não confirma o caso concreto.", "A tendência geral ('하는 편') não responde se a inspeção específica ocorreu."),
  ],
  independent: [
    mcq("Qual resposta assume responsabilidade em vez de apenas atenuar?", ["점검 기록을 오늘 안에 공개하고, 누락이 확인되면 제가 책임을 지겠습니다.", "점검은 일반적으로 잘 이루어지는 편입니다.", "기록이 없을 수도 있다고 봅니다.", "조사 결과를 기다려 주시기 바랍니다."], "점검 기록을 오늘 안에 공개하고, 누락이 확인되면 제가 책임을 지겠습니다.", "A frase fixa um prazo, um ato verificável e um responsável; não apenas reduz a certeza."),
    cloze("Complete a possibilidade entre outras: 점검 기록이 누락되었을 ___ 있습니다.", "수도", "A forma é -ㄹ 수도 있다, que abre uma possibilidade sem excluir as demais."),
    listen("Ouça e escreva a prioridade declarada pelo porta-voz.", "지금은 원인을 밝히는 것이 우선입니다.", "지금은 원인을 밝히는 것이 우선입니다.", "No momento, esclarecer a causa é prioritário."),
    translate("ko-pt", "Traduza: 책임 있는 유보는 아는 것과 모르는 것을 구분하지만, 책임 회피는 그 경계를 흐린다.", "Uma ressalva responsável distingue o que se sabe do que não se sabe; a fuga da responsabilidade, porém, turva essa fronteira.", "유보 = ressalva; 경계를 흐리다 = turvar a fronteira.", ["Uma cautela responsável separa o que se sabe do que se ignora, enquanto a evasão da responsabilidade confunde essa linha."]),
    reading("기자: 사과는 하시면서 책임은 말하지 않으시는군요. 대변인: 책임을 피하려는 의도는 아닙니다. 다만 아직 확인되지 않은 사실을 먼저 말하는 것은 적절하지 않다고 봅니다.", "Qual é o ponto cego da justificativa do porta-voz?", ["Ele opõe cautela e responsabilidade, como se assumir um compromisso exigisse afirmar fatos ainda não confirmados.", "Ele admite que a empresa causou o incêndio.", "Ele se recusa a pedir desculpas aos atingidos."], "Ele opõe cautela e responsabilidade, como se assumir um compromisso exigisse afirmar fatos ainda não confirmados.", "É possível dizer o que está confirmado, o que falta saber e quem vai responder sem antecipar uma conclusão sobre a causa."),
  ],
  summary: [
    "Atenuação reduz o grau de compromisso; evasão usa a incerteza para não dizer o que já se sabe.",
    "A diferença está no que a instituição admite saber e no compromisso que assume.",
    "-ㄴ/는 편이다 descreve uma tendência e pode deixar o caso concreto sem resposta.",
    "-ㄹ 수도 있다 abre uma possibilidade entre outras, sem hierarquizá-las.",
    "Uma resposta responsável nomeia o confirmado, o em apuração e o próximo passo.",
  ],
  production: production(
    "Produção independente · da evasão ao compromisso",
    "Reescreva uma resposta evasiva que você tenha visto ou imaginado em uma situação de crise. Mantenha o que ainda é incerto, mas diga o que está confirmado, quem responde e qual é o próximo passo verificável.",
    "책임을 피하는 답변을 책임 있는 답변으로 다시 써 보세요.",
    ["Separe explicitamente o confirmado, o que está em apuração e o que ainda não se sabe.", "Use -ㄴ/는 편이다 uma vez para uma tendência real, não para esconder o caso.", "Use -ㄹ 수도 있다 uma vez para uma hipótese que ainda não foi descartada.", "Nomeie um responsável e um prazo.", "Não prometa uma conclusão que a investigação ainda não permite."],
    ["Confirmação, dúvida e próximo passo separados.", "Um responsável identificado.", "Prazo ou ato verificável.", "Duas formas-alvo usadas com função clara.", "Nenhuma promessa excessiva."],
    "어제 창고 화재와 관련해 확인된 사실부터 말씀드리겠습니다. 화재는 새벽 2시 40분경 시작되었고, 근무자는 모두 대피했습니다. 현재까지 인명 피해는 확인되지 않았습니다. 원인은 아직 조사 중입니다. 전기 설비 문제일 수도 있고, 외부 요인일 수도 있습니다. 다만 화재 전 점검 기록이 일부 누락된 사실은 확인되었습니다. 저는 이 부분을 숨기지 않겠습니다. 누락된 기록은 오늘 오후 6시까지 공개하고, 책임자는 제가 맡겠습니다. 설비 교체가 필요하다는 내부 보고가 있었는지는 추가로 확인하겠습니다. 확인되는 대로 다음 주 수요일 브리핑에서 다시 말씀드리겠습니다. 피해를 입은 분들께는 다시 한번 사과드립니다.",
    "Começo pelo que está confirmado sobre o incêndio no armazém de ontem. O fogo começou por volta das 2h40, e todos os trabalhadores evacuaram. Até agora não há vítimas confirmadas. A causa ainda está em investigação. Pode ser um problema na instalação elétrica ou um fator externo. No entanto, está confirmado que parte dos registros de inspeção anteriores ao incêndio está faltando. Não vou esconder essa parte. Os registros faltantes serão divulgados hoje até as 18h, e eu assumo a responsabilidade. Vou verificar adicionalmente se houve um relatório interno sobre a necessidade de substituir equipamentos. Assim que houver confirmação, voltarei a falar na coletiva da próxima quarta-feira. Mais uma vez, peço desculpas aos atingidos.",
    "Exemplo original. A resposta mantém a incerteza sobre a causa, mas assume um compromisso verificável sobre o que já sabe. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l04 — cortesia, honoríficos e assimetria de poder. */
export const C2_L04 = defineC2Lesson({
  id: "c2-l04", number: 4, moduleId: "c2-m01", title: "Cortesia e poder",
  objective: "Ajustar cortesia e honoríficos a relações assimétricas de poder.",
  prerequisites: ["c2-l03"], estimatedMinutes: 85, dialogueTitle: "O mesmo pedido, dois destinatários",
  intro: [
    {
      title: "Honorífico de sujeito, não de ouvinte",
      body: "O coreano marca respeito em duas direções: o sujeito da frase pode ser elevado com -시-, e o ouvinte pode ser tratado com a terminação -습니다/-요. São eixos diferentes. Dizer 원장님께서 확인하셨습니다 eleva o diretor como sujeito e o interlocutor como ouvinte; dizer 제가 확인하겠습니다 não pode receber -시-, porque o falante não se eleva a si mesmo. Verbos como 계시다, 드시다 e 주무시다 são formas honoríficas lexicalizadas, não variantes livres de 있다, 먹다 e 자다.",
      ko: "존대는 상대를 높이는 말투와 문장의 주어를 높이는 표지가 함께 작동한다.",
    },
    {
      title: "Cortesia estratégica e margem de recusa",
      body: "Em relações assimétricas, a cortesia protege os dois lados: quem pede não invade, quem concede não se humilha. Mas a cortesia também pode esconder o pedido ou retirar do interlocutor a chance de recusar com clareza. Um pedido muito indireto parece mais educado e, ao mesmo tempo, torna mais difícil dizer não. O teste é simples: o destinatário consegue identificar o que está sendo pedido, por quem e até quando? Se a resposta exige decifrar três camadas de rodeio, a cortesia passou a proteger apenas quem pede.",
      ko: "위계가 높을수록 거절의 여지는 작아지고, 완곡한 표현은 그 부담을 숨기기도 한다.",
    },
  ],
  dialogue: [
    ["지민", "원장님, 다음 주 수요일 재택근무로 변경할 수 있을지 여쭙고 싶습니다.", "Diretor, eu gostaria de perguntar se seria possível mudar para trabalho remoto na próxima quarta-feira."],
    ["원장", "업무 일정은 괜찮은가요?", "A agenda de trabalho está tranquila?"],
    ["지민", "팀장님과 협의했고, 오후 회의는 온라인으로 참석하도록 하겠습니다.", "Conversei com o gerente da equipe, e vou participar da reunião da tarde on-line."],
    ["원장", "그렇게 하도록 하십시오. 다만 고객 대응은 김 대리에게 미리 넘겨두세요.", "Faça assim. Mas transfira antes o atendimento ao cliente para o assistente Kim."],
    ["지민", "알겠습니다. 그런데 혹시 이번 한 번만 예외로 인정해 주실 수 있을까요?", "Entendido. Mas será que o senhor poderia conceder uma exceção só desta vez?"],
    ["원장", "원칙은 어렵지만, 이번 건은 재량으로 검토하겠습니다.", "Em princípio é difícil, mas vou examinar este caso dentro da minha margem de decisão."],
    ["지민", "고맙습니다. 수요일에는 재택으로 바꿀 수 있을까? 무리면 다른 날로 조정할게.", "Obrigada. Será que dá para mudar para trabalho remoto na quarta? Se ficar difícil, ajusto para outro dia."],
    ["동료", "그 정도는 괜찮아. 대신 오전에 자료만 먼저 공유해 줘.", "Isso tudo bem. Em troca, só compartilha os materiais pela manhã."],
  ],
  readingText: {
    titlePt: "Duas mensagens, o mesmo pedido",
    paragraphs: [
      "원장님께, 다음 주 수요일 개인 사정으로 재택근무가 가능할지 여쭙고자 합니다. 현재 진행 중인 업무와 기록은 김 대리에게 인수인계하였고, 오후 회의는 온라인으로 참석하도록 하겠습니다. 갑작스러운 요청이라 부담이 되실 수 있으나, 꼭 필요한 상황이라 이렇게 글을 드립니다. 혹시 다른 일정이 겹치면 미리 알려 주십시오. 검토해 주시면 감사하겠습니다. 지민 드림.",
      "수진 씨, 나 다음 주 수요일 재택으로 바꿀 수 있을까? 집에 꼭 가야 할 일이 생겼어. 오전 회의 자료는 내가 미리 정리해 둘게. 이번 주 금요일까지는 자료를 다 정리할 수 있을 것 같아. 걱정하지 마. 네 일정이 너무 빡빡하면 다른 날로 조정해도 괜찮아. 편할 때 알려 줘.",
      "두 메시지의 요청 내용은 같다. 그러나 첫 번째 메시지는 '여쭙고자 합니다', '부담이 되실 수 있으나'와 같은 완곡한 표현으로 상대의 재량을 인정하고, 거절의 여지를 넓혀 준다. 두 번째 메시지는 짧고 직접적이지만, '괜찮아'와 '편할 때 알려 줘'라는 표현이 동료 관계의 친밀함을 전제한다. 흥미로운 점은 첫 번째 메시지가 더 공손하면서도 요청의 핵심은 더 분명하다는 것이다. 요청을 거절할 권리가 누구에게 있는지도 이 차이를 만든다. 그러므로 이는 단순한 예의의 차이가 아니다. 첫 번째 메시지에서 거절은 상사의 권한이고, 두 번째에서는 동료의 사정에 달려 있다. 존대는 책임을 흐리는 장치가 아니라, 상대의 결정 권한을 인정하는 장치로 쓰일 때 가장 자연스럽다. 반대로 서열을 과시하는 하대는 같은 내용을 명령처럼 바꾼다.",
    ],
    pt: "Ao diretor, gostaria de perguntar se seria possível trabalhar remotamente na próxima quarta-feira, por motivos pessoais. As tarefas em andamento e os registros foram transferidos ao assistente Kim, e vou participar da reunião da tarde on-line. Como é um pedido repentino, pode ser que o senhor se sinta sobrecarregado, mas escrevo porque a situação é realmente necessária. Se houver outro compromisso no mesmo horário, por favor me avise com antecedência. Ficaria grato se o senhor pudesse avaliar. Atenciosamente, Jimin. Sujin, será que dá para eu mudar para trabalho remoto na quarta que vem? Surgiu uma coisa que preciso resolver em casa. Eu organizo antes os materiais da reunião da manhã. Acho que até a próxima sexta-feira consigo deixar tudo pronto. Não se preocupe. Se a sua agenda estiver muito apertada, tudo bem ajustar para outro dia. Me avisa quando for conveniente. O conteúdo do pedido nas duas mensagens é o mesmo. No entanto, a primeira mensagem, com expressões atenuadas como 'gostaria de perguntar' e 'pode ser que o senhor se sinta sobrecarregado', reconhece a margem de decisão do outro e amplia o espaço para recusa. A segunda é curta e direta, mas expressões como 'tudo bem' e 'me avisa quando for conveniente' pressupõem a intimidade da relação entre colegas. O interessante é que a primeira mensagem, mais cortês, também deixa o núcleo do pedido mais claro. A diferença também está em quem tem o direito de recusar. Na primeira mensagem, a recusa é autoridade do superior; na segunda, depende da situação do colega. O tratamento honorífico não é um dispositivo para turvar a responsabilidade; é mais natural quando serve para reconhecer o poder de decisão do outro. Portanto, não se trata apenas de uma diferença de etiqueta. Por outro lado, o tratamento desrespeitoso que exibe a posição hierárquica transforma o mesmo conteúdo em ordem.",
    objective: "Comparar honoríficos, atenuação e margem de recusa nas duas mensagens.",
  },
  reusedIds: ["ko:자료", "ko:기록", "ko:직접적", "ko:완곡"],
  grammar: [
    [
      "-시- — honorífico de sujeito",
      "동사·형용사 어간 + -시- (받침 없음: -시-, 받침 있음: -으시-)",
      "Eleva o sujeito da frase, normalmente uma pessoa mais velha, de posição superior ou um cliente. Não se usa para as próprias ações do falante, o que produziria autoengrandecimento. O sujeito elevado costuma vir com 께서 em vez de 이/가. Registro: próprio de situações formais e de relações assimétricas, mas também usado por cortesia em contextos próximos. Compare com a terminação de cortesia ao ouvinte -습니다/-요, que não depende de quem é o sujeito. Verbos como 계시다, 드시다, 주무시다, 말씀하시다 são formas honoríficas lexicalizadas.",
      [
        ["원장님께서는 오늘 오후에 자리를 비우십니다.", "O diretor vai se ausentar hoje à tarde."],
        ["부장님이 직접 확인하셨습니다.", "O gerente confirmou pessoalmente."],
      ],
    ],
    [
      "-도록 하시다 — forma honorífica de instrução",
      "동사 + -도록 하시다 / -도록 하십시오",
      "Dá uma instrução de modo indireto e respeitoso, comum em avisos institucionais, atas e mensagens de chefia. O falante apresenta a ação como algo que o destinatário deve providenciar, sem usar um imperativo seco. Compare com -아/어 주세요, mais próximo e direto, e com -시기 바랍니다, mais formal e impessoal, típico de comunicados públicos. Não use -도록 하시다 para si mesmo nem para uma ordem urgente em situação de risco. Registro: formal e institucional.",
      [
        ["내일까지 자료를 정리하도록 하십시오.", "Por favor, organize os materiais até amanhã."],
        ["회의실에는 10분 전까지 입장하도록 하십시오.", "Por favor, entre na sala de reunião até dez minutos antes."],
      ],
    ],
  ],
  guided: [
    mcq("O que muda entre as duas mensagens?", ["O grau de deferência e a margem de recusa, não o conteúdo do pedido.", "O dia da semana solicitado.", "O trabalho que será transferido ao assistente Kim."], "O grau de deferência e a margem de recusa, não o conteúdo do pedido.", "As duas mensagens pedem o mesmo; mudam o registro, a relação e o espaço dado ao outro para recusar."),
    cloze("Complete o contraste: ___는 상대의 결정 권한을 인정하는 장치로 쓰일 때 가장 자연스럽다.", "존대", "O texto opõe o tratamento honorífico ao desprezo hierárquico."),
    listen("Ouça e escreva a concessão do diretor.", "원칙은 어렵지만, 이번 건은 재량으로 검토하겠습니다.", "원칙은 어렵지만, 이번 건은 재량으로 검토하겠습니다.", "Em princípio é difícil, mas vou examinar este caso dentro da minha margem de decisão."),
    translate("pt-ko", "Traduza: “Por favor, organize os materiais até amanhã.”", "내일까지 자료를 정리하도록 하십시오.", "-도록 하십시오 dá uma instrução honorífica indireta, típica de contexto institucional.", ["내일까지 자료를 정리하도록 하세요."]),
    reading("원장님께, 다음 주 수요일 개인 사정으로 재택근무가 가능할지 여쭙고자 합니다. 현재 진행 중인 업무와 기록은 김 대리에게 인수인계하였고, 오후 회의는 온라인으로 참석하도록 하겠습니다. 갑작스러운 요청이라 부담이 되실 수 있으나, 꼭 필요한 상황이라 이렇게 글을 드립니다.", "Qual traço mostra que o pedido à diretora preserva a margem de recusa?", ["A formulação '부담이 되실 수 있으나' e o pedido de avaliação.", "O uso do nome do assistente Kim.", "A menção à reunião on-line."], "A formulação '부담이 되실 수 있으나' e o pedido de avaliação.", "A mensagem reconhece o custo para o outro e deixa a decisão explicitamente em suas mãos."),
  ],
  independent: [
    mcq("Qual frase usa -시- corretamente para elevar o sujeito?", ["원장님께서 직접 확인하셨습니다.", "제가 내일 확인하시겠습니다.", "원장님, 제가 확인하십시오."], "원장님께서 직접 확인하셨습니다.", "-시- eleva o sujeito (o diretor), não o falante; 제가 확인하시겠습니다 elevaria a própria ação."),
    cloze("Complete a instrução institucional: 내일까지 자료를 정리하도록 ___.", "하십시오", "A forma -도록 하십시오 suaviza a ordem sem perder clareza."),
    listen("Ouça e escreva a diferença que a análise destaca.", "두 메시지의 요청 내용은 같지만, 거절의 여지는 다릅니다.", "두 메시지의 요청 내용은 같지만, 거절의 여지는 다릅니다.", "O conteúdo do pedido é o mesmo nas duas mensagens, mas a margem de recusa é diferente."),
    translate("ko-pt", "Traduza: 존대는 책임을 흐리는 장치가 아니라, 상대의 결정 권한을 인정하는 장치로 쓰일 때 가장 자연스럽다.", "O tratamento honorífico não é um dispositivo para turvar a responsabilidade; é mais natural quando serve para reconhecer o poder de decisão do outro.", "장치 = dispositivo, mecanismo; 결정 권한 = poder de decisão.", ["O tratamento respeitoso não serve para diluir a responsabilidade; ele soa mais natural quando reconhece o direito de decisão do outro."]),
    reading("두 메시지의 요청 내용은 같다. 그러나 첫 번째 메시지는 '여쭙고자 합니다', '부담이 되실 수 있으나'와 같은 완곡한 표현으로 상대의 재량을 인정하고, 거절의 여지를 넓혀 준다. 두 번째 메시지는 짧고 직접적이지만, '괜찮아'와 '편할 때 알려 줘'라는 표현이 동료 관계의 친밀함을 전제한다.", "Por que a autora não conclui que a primeira mensagem é simplesmente 'mais educada'?", ["Porque a cortesia não é só etiqueta: ela redistribui o poder de decidir e o custo da recusa.", "Porque a segunda mensagem é gramaticalmente incorreta.", "Porque a primeira mensagem não contém um pedido."], "Porque a cortesia não é só etiqueta: ela redistribui o poder de decidir e o custo da recusa.", "A análise compara posições: a primeira amplia a margem de recusa; a segunda conta com a intimidade para ser direta."),
  ],
  summary: [
    "-시- eleva o sujeito da frase; a cortesia ao ouvinte é outro eixo e não se confunde com ela.",
    "Formas como 계시다, 드시다 e 주무시다 são honoríficos lexicalizados.",
    "Cortesia assimétrica protege os dois lados, mas pode tornar a recusa mais difícil.",
    "-도록 하시다 suaviza uma instrução institucional sem eliminar a clareza.",
    "Um pedido cortês deve continuar identificável: o quê, de quem e até quando.",
  ],
  production: production(
    "Produção independente · o mesmo pedido em duas relações",
    "Faça o mesmo pedido a duas pessoas em posições diferentes: alguém com poder formal sobre você e um colega próximo. Depois, explique em um parágrafo o que mudou na cortesia, na margem de recusa e na clareza do pedido.",
    "같은 부탁을 서로 다른 관계의 두 사람에게 써 보고, 달라진 점을 설명해 보세요.",
    ["Mantenha o mesmo conteúdo e o mesmo prazo nas duas mensagens.", "Use -시- ou -도록 하시다 na mensagem ao superior.", "Na mensagem ao colega, use um registro coerente com a intimidade.", "Nomeie o que você faz para reduzir o custo do pedido.", "Explique o que permaneceu claro apesar da cortesia."],
    ["Duas mensagens com o mesmo pedido.", "Diferença de honoríficos adequada.", "Margem de recusa explícita.", "Uma forma-alvo usada corretamente.", "Justificativa que separa cortesia e clareza."],
    "원장님께, 다음 주 화요일 오전에 병원에 가야 해서 출근 시간을 한 시간 늦출 수 있을지 여쭙고자 합니다. 오전 9시 회의 자료는 전날까지 완성해 두겠습니다. 갑작스러운 부탁이라 부담이 되실 수 있으나, 꼭 필요한 진료라 이렇게 글을 드립니다. 조정이 어려우시면 다른 시간으로 다시 여쭙겠습니다. 검토해 주시면 감사하겠습니다. 지민 드림. 수진 씨, 나 다음 주 화요일 오전에 병원에 가야 해서 한 시간 늦게 들어가도 될까? 9시 회의 자료는 내가 전날까지 끝내 둘게. 네 일정이 복잡하면 다른 시간으로 바꿔도 괜찮아. 편할 때 알려 줘. 두 메시지의 요청 내용과 마감은 같다. 그러나 첫 번째 메시지는 '여쭙고자 합니다'와 '부담이 되실 수 있으나'로 상사의 재량을 인정하고, 거절해도 관계가 상하지 않는다는 여지를 남긴다. 두 번째 메시지는 '괜찮아'와 '편할 때 알려 줘'로 친밀함을 전제하지만, 거절의 부담은 동료에게 고르게 분배된다. 두 경우 모두 언제까지 자료를 준비해야 하는지는 분명하다. 나는 이 차이를 예의의 문제가 아니라 권한의 문제로 본다.",
    "Ao diretor: gostaria de perguntar se seria possível chegar uma hora mais tarde na próxima terça-feira, porque preciso ir ao hospital pela manhã. Os materiais da reunião das 9h ficarão prontos até o dia anterior. Como é um pedido repentino, pode ser que o senhor se sinta sobrecarregado, mas é uma consulta realmente necessária, por isso escrevo. Se o ajuste for difícil, perguntarei novamente em outro horário. Ficaria grato se o senhor pudesse avaliar. Atenciosamente, Jimin. Sujin, será que dá para eu entrar uma hora mais tarde na próxima terça porque preciso ir ao hospital pela manhã? Os materiais da reunião das 9h eu deixo prontos até o dia anterior. Se a sua agenda estiver complicada, tudo bem mudar para outro horário. Me avisa quando for conveniente. O conteúdo e o prazo do pedido são os mesmos nas duas mensagens. No entanto, a primeira, com 'gostaria de perguntar' e 'pode ser que o senhor se sinta sobrecarregado', reconhece a margem de decisão da chefe e deixa espaço para que a recusa não danifique a relação. A segunda pressupõe intimidade com 'tudo bem' e 'me avisa quando for conveniente', mas o custo da recusa é dividido de modo mais equilibrado com a colega. Nos dois casos, fica claro até quando os materiais precisam estar prontos. Vejo essa diferença não como uma questão de etiqueta, mas de poder.",
    "Exemplo original. As duas mensagens mantêm o mesmo pedido e o mesmo prazo; a diferença está no eixo de respeito, na margem de recusa e na clareza. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l05 — ambiguidade estratégica e o custo da não decisão. */
export const C2_L05 = defineC2Lesson({
  id: "c2-l05", number: 5, moduleId: "c2-m01", title: "A ambiguidade calculada",
  objective: "Reconhecer quando a ambiguidade é estratégica e avaliar seu custo.",
  prerequisites: ["c2-l04"], estimatedMinutes: 85, dialogueTitle: "O comunicado que não decide",
  intro: [
    {
      title: "Ambiguidade como decisão de não decidir",
      body: "Um texto ambíguo não é necessariamente um texto mal escrito. Às vezes ele é o resultado de uma escolha: manter duas interpretações vivas permite conservar apoios, evitar um conflito imediato ou adiar uma decisão impopular. O custo aparece depois, quando cada lado age segundo a leitura que lhe convém e a instituição afirma que nunca prometeu nada. A ambiguidade estratégica compra tempo, mas paga com confiança.",
      ko: "의도된 모호함은 결정을 미루는 대신 해석의 부담을 독자에게 넘긴다.",
    },
    {
      title: "O custo da não decisão",
      body: "Em documentos públicos, definir o que fica em aberto também é uma decisão. Uma versão clara pode dizer: 'a medida continua', 'a medida é suspensa' ou 'a decisão sai em 30 de setembro'. Cada uma tem um custo político diferente, e é justamente esse custo que a formulação ambígua tenta evitar. O leitor atento não pergunta apenas o que o texto diz, mas quem paga pela possibilidade de que ele signifique duas coisas ao mesmo tempo.",
      ko: "무엇을 열어 둘지 정하는 것도 결정이며, 그 결정에는 책임이 따른다.",
    },
  ],
  dialogue: [
    ["나영", "이번 발표문, 확대인지 축소인지 도무지 알 수가 없네요.", "Este comunicado é impossível de entender: é ampliação ou corte?"],
    ["준호", "원문은 '다음 달부터 적용 여부를 검토할 예정'이라고만 했어요.", "O original só diz que 'a aplicação será examinada a partir do mês que vem'."],
    ["나영", "검토한다는 말은 이미 결정을 보류했다는 뜻 아닌가요?", "Dizer que vão examinar não significa que já suspenderam a decisão?"],
    ["준호", "그렇게 읽을 여지도 있고, 예산을 확보한 뒤 시행한다는 뜻으로도 읽혀요.", "Há margem para ler assim, mas também pode ser lido como executar depois de garantir o orçamento."],
    ["나영", "양쪽 모두 자기에게 유리하게 해석할 수 있게 만든 거네요.", "Então fizeram de um jeito que os dois lados possam interpretar a seu favor."],
    ["준호", "아마도 반대를 최소화하려는 선택이었을 거예요.", "Provavelmente foi uma escolha para minimizar a oposição."],
    ["나영", "그 선택의 비용은 누가 부담하죠? 신청자는 계속 기다려야 하는데요.", "E quem arca com o custo dessa escolha? O solicitante tem de continuar esperando."],
    ["준호", "그래서 우리가 요구해야 할 것은 해석이 아니라 일정과 책임자입니다.", "Por isso, o que devemos exigir não é uma interpretação, mas um cronograma e um responsável."],
  ],
  readingText: {
    titlePt: "Uma frase, duas expectativas",
    paragraphs: [
      "청년주거지원과는 2026년 하반기 주거 지원 사업의 운영 방향을 다음과 같이 안내드립니다. 현재 사업 규모와 예산을 검토하고 있으며, 다음 달부터 적용 여부를 결정할 예정입니다. 신청 접수는 예정대로 진행하되, 대상자 선정 기준은 확정되는 대로 별도로 공지하겠습니다. 기존 신청자의 권리는 변동 없이 유지됩니다. 이번 발표는 사업의 세부 내용을 확정하기 위한 것이 아닙니다. 추가 문의는 홈페이지를 통해 받겠습니다.",
      "발표 직후 두 단체가 서로 다른 해석을 내놓았다. 확대를 요구해 온 한 단체는 '검토'라는 표현에 주목했다. 이들은 예산 검토가 끝나면 규모가 늘어날 것이라고 읽었다. 반면 사업 축소를 우려하는 다른 단체는 '적용 여부'라는 말에 주목했다. 이들은 다음 달부터 지원이 중단될 수도 있다고 보았다. 두 단체는 같은 날 기자회견을 열고 서로 다른 요구를 발표했다. 같은 문장이 정반대의 기대를 만들었고, 두 단체 모두 발표문을 근거로 자신의 주장을 이어 갔다.",
      "문제는 모호성이 의도되었는지 여부가 아니다. 발표문은 무엇을 보장하고 무엇을 보장하지 않는지 분명히 말하지 않았다. 신청자에게 필요한 것은 해석의 자유가 아니라 일정과 책임자다. 모호한 문장은 결정을 미루는 동안 책임을 분산시키지만, 그 비용은 기다리는 사람에게 돌아간다. 기관이 선택을 미룰수록 신뢰의 비용은 커진다. 명확한 결정은 반대를 부를 수 있지만, 끝없는 해석은 신청자의 계획을 세울 권리를 빼앗는다. 명확한 문서는 반대를 없애지 못하지만, 반대가 향할 대상을 만든다.",
    ],
    pt: "O Departamento de Apoio à Moradia Jovem informa a seguinte orientação sobre a direção operacional do programa de apoio habitacional no segundo semestre de 2026. No momento, o porte e o orçamento do programa estão em análise, e a aplicação será decidida a partir do mês que vem. O recebimento de inscrições seguirá conforme o previsto, mas os critérios de seleção serão divulgados separadamente assim que forem definidos. Os direitos dos inscritos atuais permanecem inalterados. Este anúncio não tem o objetivo de definir os detalhes do programa. Dúvidas adicionais serão recebidas pelo site. Logo após o anúncio, duas organizações apresentaram interpretações diferentes. Uma organização que vinha pedindo ampliação observou a palavra 'análise'. Leu que o porte aumentaria quando a revisão orçamentária terminasse. Já a outra, preocupada com um corte, observou a expressão 'aplicação'. Considerou que o apoio poderia ser interrompido a partir do mês seguinte. As duas organizações realizaram coletivas no mesmo dia e apresentaram reivindicações diferentes. A mesma frase criou expectativas opostas, e as duas organizações continuaram defendendo suas posições com base no comunicado. O problema não é se a ambiguidade foi intencional. O comunicado não disse com clareza o que garante e o que não garante. O que o solicitante precisa não é liberdade de interpretação, mas cronograma e responsável. Uma frase ambígua dispersa a responsabilidade enquanto adia a decisão, mas o custo recai sobre quem espera. Quanto mais a instituição adia a escolha, maior se torna o custo da confiança. Uma decisão clara pode atrair oposição, mas a interpretação sem fim retira do solicitante o direito de planejar. Um documento claro não elimina a oposição, mas cria um alvo para ela.",
    objective: "Reconhecer o que a ambiguidade permite e o que ela adia, distinguindo interpretação de garantia.",
  },
  reusedIds: ["ko:주장", "ko:근거", "ko:주거", "ko:변동"],
  grammar: [
    [
      "-ㄹ 여지 — margem para",
      "동사 + -ㄹ 여지(가) 있다/없다",
      "Indica espaço para que algo aconteça ou seja interpretado de outra maneira. Em textos críticos, costuma sugerir que a abertura poderia ter sido evitada. Compare com -ㄹ 가능성, que é mais neutro e estatístico, e com -ㄹ 수 있다, que apenas afirma uma possibilidade. A forma -ㄹ 여지 é frequente com 해석되다, 남다, 미루다 e 남기다, e quase sempre aparece com 있다 ou 없다. Registro: formal e avaliativo.",
      [
        ["이 문장은 다르게 해석될 여지가 있다.", "Esta frase tem margem para ser interpretada de outra forma."],
        ["결정을 다음 달로 미룰 여지가 남아 있다.", "Ainda há margem para adiar a decisão para o mês que vem."],
      ],
    ],
    [
      "-ㄴ/는지 — se; se ou não",
      "동사·형용사 + -ㄴ/는지 / 명사 + 인지",
      "Introduz uma pergunta indireta, usada como complemento de verbos como 알다, 모르다, 밝히다, 확인하다 e 묻다. Não afirma nem nega o conteúdo: apenas o apresenta como algo a ser determinado. Compare com -다고 알다, que significa 'saber que', e com -ㄴ/는지 알다, que significa 'saber se'. Em documentos públicos, a escolha entre dizer o que se sabe e dizer que ainda não se sabe é parte do compromisso assumido. Registro: neutro a formal.",
      [
        ["회사는 사업을 계속할지 아직 밝히지 않았다.", "A empresa ainda não esclareceu se continuará o projeto."],
        ["그가 어떤 의도로 말했는지 확인해야 한다.", "É preciso verificar com que intenção ele falou."],
      ],
    ],
  ],
  guided: [
    mcq("O que a ambiguidade do comunicado permite?", ["Que grupos opostos projetem nele expectativas contrárias sem que o órgão se comprometa.", "Que o órgão explique exatamente quando o apoio termina.", "Que os solicitantes recebam o benefício imediatamente."], "Que grupos opostos projetem nele expectativas contrárias sem que o órgão se comprometa.", "A formulação mantém 'análise' e 'aplicação' em aberto, e cada grupo lê o que lhe convém."),
    cloze("Complete a margem de interpretação: 이 문장은 다르게 해석될 ___가 있다.", "여지", "-ㄹ 여지 indica espaço para interpretação ou ação, muitas vezes com tom crítico."),
    listen("Ouça e escreva o que o comunicado garante sobre as inscrições.", "신청 접수는 예정대로 진행하되, 대상자 선정 기준은 확정되는 대로 별도로 공지하겠습니다.", "신청 접수는 예정대로 진행하되, 대상자 선정 기준은 확정되는 대로 별도로 공지하겠습니다.", "O recebimento de inscrições seguirá conforme o previsto, mas os critérios de seleção serão divulgados separadamente assim que forem definidos."),
    translate("pt-ko", "Traduza: “Ainda há margem para adiar a decisão.”", "결정을 미룰 여지가 남아 있다.", "-ㄹ 여지가 남아 있다 indica que a possibilidade de adiar continua aberta.", ["결정을 미룰 여지가 아직 남아 있다."]),
    reading("문제는 모호성이 의도되었는지 여부가 아니다. 발표문은 무엇을 보장하고 무엇을 보장하지 않는지 분명히 말하지 않았다. 신청자에게 필요한 것은 해석의 자유가 아니라 일정과 책임자다.", "Por que o texto recusa a pergunta sobre a intenção?", ["Porque o efeito da ambiguidade existe independentemente de ter sido calculada.", "Porque ninguém pode saber a intenção de um órgão público.", "Porque a intenção é mais importante que o cronograma."], "Porque o efeito da ambiguidade existe independentemente de ter sido calculada.", "A análise desloca o foco da intenção para o que o texto garante e para quem responde."),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는지 corretamente?", ["회사는 사업을 계속할지 아직 밝히지 않았다.", "회사는 사업을 계속할지고 밝혔다.", "회사는 사업을 계속한지 아직 밝혔다."], "회사는 사업을 계속할지 아직 밝히지 않았다.", "-ㄴ/는지 introduz a pergunta indireta; a forma correta é 계속할지, não 계속한지 nem 계속할지고."),
    cloze("Complete o conceito central: ___은 때로 책임을 피하는 수단이 된다.", "모호성", "A resposta retoma o termo que o texto usa para nomear a abertura interpretativa."),
    listen("Ouça e escreva o que o diálogo diz que deve ser exigido.", "그래서 우리가 요구해야 할 것은 해석이 아니라 일정과 책임자입니다.", "그래서 우리가 요구해야 할 것은 해석이 아니라 일정과 책임자입니다.", "Por isso, o que devemos exigir não é uma interpretação, mas um cronograma e um responsável."),
    translate("ko-pt", "Traduza: 모호한 문장은 결정을 미루는 동안 책임을 분산시키지만, 그 비용은 기다리는 사람에게 돌아간다.", "Uma frase ambígua dispersa a responsabilidade enquanto adia a decisão, mas o custo recai sobre quem espera.", "분산시키다 = dispersar; 돌아가다 = recair, voltar-se para.", ["Enquanto adia a decisão, a frase ambígua dilui a responsabilidade, mas quem espera acaba arcando com o custo."]),
    reading("발표 직후 두 단체가 서로 다른 해석을 내놓았다. 확대를 요구해 온 한 단체는 '검토'라는 표현에 주목했다. 이들은 예산 검토가 끝나면 규모가 늘어날 것이라고 읽었다. 반면 사업 축소를 우려하는 다른 단체는 '적용 여부'라는 말에 주목했다. 이들은 다음 달부터 지원이 중단될 수도 있다고 보았다.", "O que a comparação das duas leituras demonstra?", ["Que a mesma formulação pode funcionar como promessa para um lado e ameaça para o outro.", "Que uma das organizações leu o texto incorretamente.", "Que o órgão confirmou a ampliação do programa."], "Que a mesma formulação pode funcionar como promessa para um lado e ameaça para o outro.", "A ambiguidade não produz uma leitura errada: produz duas leituras defensáveis, o que adia o custo da decisão."),
  ],
  summary: [
    "Ambiguidade estratégica mantém interpretações vivas e adia o custo político da escolha.",
    "O efeito da ambiguidade existe mesmo quando não se pode provar a intenção.",
    "-ㄹ 여지 indica margem para interpretação ou ação e costuma ter tom crítico.",
    "-ㄴ/는지 introduz pergunta indireta e não compromete o falante com o conteúdo.",
    "Em documento público, dizer o que fica em aberto também é uma decisão responsável.",
  ],
  production: production(
    "Produção independente · duas versões de um comunicado",
    "Reescreva um comunicado ambíguo em duas versões com decisões claras: uma que mantém a medida e outra que a suspende. Depois, explique qual custo político cada versão assume e por que a versão ambígua parecia cômoda.",
    "모호한 공지문을 두 가지 명확한 버전으로 다시 쓰고, 각 버전이 감수하는 정치적 비용을 설명해 보세요.",
    ["Mantenha o mesmo fato de partida nas duas versões.", "Use -ㄹ 여지 uma vez para localizar a abertura do texto original.", "Use -ㄴ/는지 uma vez para mostrar o que o original não esclarece.", "Diga, em cada versão, o que muda para o solicitante.", "Feche avaliando o custo de adiar a decisão."],
    ["Duas versões com decisões distintas.", "Ambiguidade original localizada.", "Custo de cada versão nomeado.", "Duas formas-alvo usadas com função clara.", "Fechamento que não finge consenso."],
    "원문은 '다음 달부터 적용 여부를 검토할 예정'이라고만 밝혀, 신청자가 무엇을 준비해야 하는지 알 수 없게 했다. 이 문장에는 해석될 여지가 너무 많이 남아 있다. 첫 번째 버전은 유지를 선택한다. '지원 사업은 9월부터 현재 규모로 계속되며, 신청 접수는 8월 20일까지입니다. 선정 기준은 8월 10일까지 공개합니다.' 두 번째 버전은 중단을 선택한다. '지원 사업은 9월부터 잠정 중단되며, 기존 신청자의 권리는 유지됩니다. 대체 일정은 9월 5일까지 안내합니다.' 첫 번째 버전은 예산 부담과 확대 요구를 감수해야 한다. 두 번째 버전은 즉각적인 반발과 신뢰 손실을 감수해야 한다. 원문은 이 두 비용을 모두 피하려 했지만, 신청자에게는 계획을 세울 수 없다는 비용을 넘겼다. 기관은 무엇을 보장하는지 밝혀야 한다.",
    "O texto original apenas informou que 'a aplicação será examinada a partir do mês que vem', deixando o solicitante sem saber o que deve preparar. Essa frase deixa margem demais para interpretação. A primeira versão é a de manutenção: 'O programa de apoio continua a partir de setembro, no porte atual, e as inscrições vão até 20 de agosto. Os critérios de seleção serão divulgados até 10 de agosto.' A segunda é a de suspensão: 'O programa será suspenso temporariamente a partir de setembro, e os direitos dos inscritos atuais permanecerão. O cronograma substituto será informado até 5 de setembro.' A primeira versão precisa assumir o custo orçamentário e as demandas por ampliação. A segunda precisa assumir a reação imediata e a perda de confiança. O texto original tentou evitar os dois custos, mas transferiu ao solicitante o custo de não poder planejar. A instituição precisa dizer o que garante.",
    "Exemplo original. As duas versões decidem; a análise nomeia o custo que a formulação ambígua tentava evitar. Exemplo ilustrativo; não é gabarito.",
  ),
});

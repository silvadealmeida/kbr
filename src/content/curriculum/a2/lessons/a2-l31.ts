import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l31 — opinião, dúvida e discordância cortês. */
export const A2_L31 = defineA2Lesson({
  id: "a2-l31",
  number: 31,
  moduleId: "a2-m07",
  title: "O que você acha?",
  objective:
    "Expressar opinião e opinião incerta com cortesia, concordando ou discordando sem romper a conversa.",
  prerequisites: ["a2-c06"],
  estimatedMinutes: 55,
  dialogueTitle: "Depois do filme",
  intro: [
    {
      title: "Opinião com -라고 생각해요",
      body:
        "-라고 생각해요 introduz uma opinião: “penso que…”. Com substantivos e formas nominais, a partícula -라고 se ajusta à citação. É uma forma clara de assumir o ponto de vista.",
      ko: "저는 좋은 영화라고 생각해요.",
    },
    {
      title: "Dúvida com -는 것 같아요",
      body:
        "-는 것 같아요 significa “parece que…”. É mais cauteloso que uma afirmação direta e adequado quando você não tem certeza.",
      ko: "조금 어려운 것 같아요.",
    },
  ],
  dialogue: [
    ["지민", "어제 영화 어땠어요?", "Como foi o filme ontem?"],
    ["마르코", "저는 정말 재미있었다고 생각해요. 음악이 좋았어요.", "Eu achei realmente divertido. A música era boa."],
    ["지민", "저는 조금 어려운 것 같아요. 이야기가 빨라서 따라가기 힘들었어요.", "Eu achei um pouco difícil. A história era rápida e difícil de acompanhar."],
    ["마르코", "그럴 수 있어요. 그런데 마지막 장면은 좋지 않았어요?", "Pode ser. Mas a última cena não foi boa?"],
    ["지민", "마지막 장면은 인상적이었어요. 하지만 전체적으로는 조금 길었어요.", "A última cena foi marcante. Mas no geral foi um pouco longa."],
    ["마르코", "다음에는 다른 감독의 영화를 보는 게 어때요?", "Que tal assistirmos a um filme de outro diretor na próxima?"],
  ],
  reusedIds: ["ko:생각하다", "ko:영화", "ko:재미있다", "ko:좋다", "ko:사람"],
  grammar: [
    [
      "-라고 생각해요 — opinião",
      "명사/인용 + -라고 생각해요",
      "A forma apresenta uma opinião como avaliação pessoal. Não é um fato objetivo. Com adjetivos, a forma citada pode ser -다고 생각해요; neste nível, pratique os blocos mais frequentes.",
      [
        ["저는 좋은 영화라고 생각해요.", "Penso que é um bom filme."],
        ["저는 그렇게 생각하지 않아요.", "Eu não penso assim."],
      ],
    ],
    [
      "-는 것 같아요 — parece que",
      "동사/형용사 + -는 것 같아요",
      "A forma suaviza a afirmação e indica incerteza. Use quando não quer soar categórico ou quando está inferindo.",
      [
        ["조금 어려운 것 같아요.", "Parece um pouco difícil."],
        ["사람이 많은 것 같아요.", "Parece que há muita gente."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Marco achou do filme?",
      ["Divertido.", "Longo demais.", "Sem música."],
      "Divertido.",
      "정말 재미있었다고 생각해요.",
    ),
    cloze(
      "Complete a opinião: 좋은 영화___ 생각해요.",
      "라고",
      "영화라고 생각해요 significa “penso que é um filme”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a crítica de Jimin.",
      "조금 어려운 것 같아요.",
      "조금 어려운 것 같아요.",
      "Jimin acha que é um pouco difícil.",
      ["조금 어려운 것 같아요"],
    ),
    reading(
      "마르코는 영화가 재미있었다고 생각해요. 지민은 조금 어렵다고 생각해요. 두 사람 모두 마지막 장면은 인상적이라고 말해요.",
      "No que eles concordam?",
      ["A última cena é marcante.", "O filme é curto.", "A música é ruim."],
      "A última cena é marcante.",
      "마지막 장면은 인상적이었어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Penso que é um bom filme.”",
      "좋은 영화라고 생각해요.",
      "라고 생각해요 introduz a opinião.",
      ["좋은 영화인 것 같아요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase expressa opinião?",
      ["저는 재미있다고 생각해요.", "영화를 봤어요. 정말 재미있었어요.", "영화가 길어요. 두 시간이나 됐어요."],
      "저는 재미있다고 생각해요.",
      "생각해요 marca a opinião pessoal.",
    ),
    cloze(
      "Complete a dúvida: 조금 어려운 것 ___.",
      "같아요",
      "것 같아요 significa “parece que”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a sugestão final.",
      "다른 감독의 영화를 보는 게 어때요?",
      "다른 감독의 영화를 보는 게 어때요?",
      "A sugestão é assistir a um filme de outro diretor.",
      ["다른 감독의 영화를 보는 게 어때요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 마지막 장면은 인상적이었어요.",
      "A última cena foi marcante.",
      "인상적이었어요 é “foi marcante/impressionante”.",
      ["A cena final foi marcante."],
    ),
    reading(
      "두 사람은 같은 영화를 봤지만 생각이 달라요. 마르코는 재미있었다고 하고, 지민은 조금 어렵다고 해요. 그래도 서로의 의견을 존중해요.",
      "Como eles tratam a diferença de opinião?",
      ["Com respeito.", "Com briga.", "Ignorando o outro."],
      "Com respeito.",
      "서로의 의견을 존중해요.",
    ),
  ],
  summary: [
    "-라고 생각해요 apresenta uma opinião pessoal.",
    "-는 것 같아요 suaviza e indica incerteza.",
    "Discordar não exige abandonar a cortesia.",
    "Uma opinião sobre arte não é um fato objetivo.",
  ],
});

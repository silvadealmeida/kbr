import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l34 — convite, recusa educada e contraproposta. */
export const A2_L34 = defineA2Lesson({
  id: "a2-l34",
  number: 34,
  moduleId: "a2-m07",
  title: "Convidar e recusar",
  objective:
    "Convidar, recusar com cortesia, explicar o motivo e propor outra oportunidade.",
  prerequisites: ["a2-l33"],
  estimatedMinutes: 55,
  dialogueTitle: "O convite para a festa",
  intro: [
    {
      title: "Convite com -(으)ㄹ까요?",
      body:
        "-(으)ㄹ까요? convida ou propõe uma ação conjunta. A resposta pode aceitar, recusar ou pedir mais informação. O tom sobe no final.",
      ko: "토요일에 같이 갈까요?",
    },
    {
      title: "Recusa com motivo e alternativa",
      body:
        "Uma recusa cortês reconhece o convite, explica o motivo e, quando possível, oferece outra data. Evite apenas dizer “não” sem contexto.",
      ko: "미안하지만 그날은 어려워요. 다음 주는 어때요?",
    },
  ],
  dialogue: [
    ["지민", "수진 씨, 토요일에 제 생일 파티에 올 수 있어요?", "Sujin, você pode vir à minha festa de aniversário no sábado?"],
    ["수진", "초대해 주셔서 기뻐요. 그런데 토요일에는 가족 행사가 있어요.", "Fico feliz pelo convite. Mas no sábado tenho um evento de família."],
    ["지민", "아, 그렇군요. 괜찮아요.", "Ah, entendi. Tudo bem."],
    ["수진", "정말 미안해요. 다음 주에는 시간이 있어요. 같이 차라도 마실까요?", "Sinto muito. Na próxima semana tenho tempo. Que tal tomarmos um chá?"],
    ["지민", "좋아요. 그럼 다음 주 금요일은 어때요?", "Certo. Então que tal sexta que vem?"],
    ["수진", "좋아요. 그날은 꼭 갈게요.", "Combinado. Naquele dia eu vou sem falta."],
  ],
  reusedIds: ["ko:초대", "ko:참석하다", "ko:파티", "ko:선물", "ko:감사합니다"],
  grammar: [
    [
      "-(으)ㄹ까요? — convite",
      "동사 + -(으)ㄹ까요?",
      "A forma propõe uma ação conjunta ou pede a opinião do outro. Não é uma ordem. No convite, costuma vir com 같이 ou 시간 표현.",
      [
        ["토요일에 같이 갈까요?", "Vamos juntos no sábado?"],
        ["차라도 마실까요?", "Que tal tomarmos um chá?"],
      ],
    ],
    [
      "-는데 / -지만 na recusa",
      "contexto + contraste",
      "Uma recusa natural apresenta o contexto com -는데 ou -지만 e depois a alternativa. O motivo deve ser breve e não precisa expor detalhes pessoais.",
      [
        ["가족 행사가 있는데 못 가요.", "Tenho um evento de família, então não posso ir."],
        ["미안하지만 그날은 어려워요.", "Desculpe, mas naquele dia é difícil."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Por que Sujin recusa o convite?",
      ["Tem um evento de família.", "Não gosta de festas.", "Vai viajar."],
      "Tem um evento de família.",
      "가족 행사가 있어요.",
    ),
    cloze(
      "Complete o convite: 같이 갈___?",
      "까요",
      "갈까요? é um convite.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a contraproposta de Sujin.",
      "다음 주에는 시간이 있어요.",
      "다음 주에는 시간이 있어요.",
      "Na próxima semana ela tem tempo.",
      ["다음 주에는 시간이 있어요"],
    ),
    reading(
      "지민은 토요일에 생일 파티를 해요. 수진은 가족 행사 때문에 못 가요. 대신 다음 주에 만나기로 했어요.",
      "O que elas combinam?",
      ["Encontrar-se na próxima semana.", "Cancelar a festa.", "Ir juntas no sábado."],
      "Encontrar-se na próxima semana.",
      "다음 주에 만나기로 했어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Desculpe, mas naquele dia é difícil.”",
      "미안하지만 그날은 어려워요.",
      "미안하지만 suaviza a recusa; 어려워요 é “é difícil”.",
      ["죄송하지만 그날은 어려워요."],
    ),
  ],
  independent: [
    mcq(
      "Qual recusa é mais cortês?",
      [
        "미안하지만 그날은 어려워요.",
        "싫어요.",
        "안 가요.",
      ],
      "미안하지만 그날은 어려워요.",
      "A forma reconhece o convite e explica a dificuldade.",
    ),
    cloze(
      "Complete a recusa: 가족 행사가 있___ 못 가요.",
      "는데",
      "있는데 introduz o contexto da recusa.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o novo convite.",
      "다음 주 금요일은 어때요?",
      "다음 주 금요일은 어때요?",
      "A nova proposta é sexta que vem.",
      ["다음 주 금요일은 어때요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 초대해 주셔서 기뻐요.",
      "Fico feliz pelo convite.",
      "초대해 주셔서 expressa gratidão pelo convite.",
      ["Fico feliz por ter me convidado."],
    ),
    reading(
      "초대를 받으면 먼저 고마움을 표현해요. 갈 수 없으면 짧게 이유를 말하고, 가능하면 다른 시간을 제안해요.",
      "O que fazer ao recusar um convite?",
      ["Agradecer, explicar e propor outra data.", "Ignorar a mensagem.", "Aceitar e não ir."],
      "Agradecer, explicar e propor outra data.",
      "고마움을 표현하고 이유를 말하고 다른 시간을 제안해요.",
    ),
  ],
  summary: [
    "-(으)ㄹ까요? convida ou propõe.",
    "Uma recusa cortês reconhece o convite e oferece alternativa.",
    "-는데 e -지만 suavizam o contexto da recusa.",
    "Não é necessário inventar desculpas elaboradas.",
  ],
});

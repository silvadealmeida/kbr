import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l39 — planos de longo prazo, expectativas e decisões. */
export const A2_L39 = defineA2Lesson({
  id: "a2-l39",
  number: 39,
  moduleId: "a2-m08",
  title: "Meu plano para o futuro",
  objective:
    "Apresentar planos, expectativas e intenções de longo prazo com grau adequado de certeza.",
  prerequisites: ["a2-l38"],
  estimatedMinutes: 65,
  dialogueTitle: "Daqui a cinco anos",
  intro: [
    {
      title: "Intenção, decisão e expectativa",
      body:
        "-려고 해요 mostra intenção; -기로 했어요, decisão; -(으)ㄹ 거예요, previsão ou plano. Escolha conforme o grau de compromisso que você quer assumir.",
      ko: "오 년 후에는 고향에서 일하려고 해요.",
    },
    {
      title: "Falar de sonhos sem prometer",
      body:
        "Sonhos podem mudar. Use -고 싶어요 e -면 좋겠어요 para desejos, e evite afirmar que algo “com certeza” vai acontecer.",
      ko: "언젠가 작은 가게를 열면 좋겠어요.",
    },
  ],
  dialogue: [
    ["지민", "수진 씨는 오 년 후에 뭐 하고 있을 것 같아요?", "Sujin, o que você acha que estará fazendo daqui a cinco anos?"],
    ["수진", "고향에서 일하려고 해요. 그리고 한국어를 계속 공부할 거예요.", "Pretendo trabalhar na minha cidade. E vou continuar estudando coreano."],
    ["지민", "유학은요?", "E o intercâmbio?"],
    ["수진", "유학은 내년에 가기로 했어요. 그 후에 취업할 계획이에요.", "Decidi fazer intercâmbio no ano que vem. Depois, pretendo trabalhar."],
    ["지민", "저는 아직 잘 모르겠어요. 여러 가지 일을 해 보고 싶어요.", "Eu ainda não sei bem. Quero experimentar vários tipos de trabalho."],
    ["수진", "좋아요. 지금 정하지 않아도 괜찮아요. 경험하면서 찾게 될 거예요.", "Legal. Não precisa decidir agora. Você vai descobrir com a experiência."],
  ],
  reusedIds: ["ko:미래", "ko:계획", "ko:목표", "ko:유학", "ko:취업"],
  grammar: [
    [
      "-기로 했어요 — decisão de longo prazo",
      "동사 + -기로 했어요",
      "A forma registra uma decisão assumida. Para o futuro distante, não é uma garantia; é o plano atual do falante.",
      [
        ["유학은 내년에 가기로 했어요.", "Decidi fazer intercâmbio no ano que vem."],
        ["고향에서 일하기로 했어요.", "Decidi trabalhar na minha cidade."],
      ],
    ],
    [
      "-면 좋겠어요 — desejo",
      "동사 + -(으)면 좋겠어요",
      "A forma expressa um desejo, não uma previsão. É mais suave que -고 싶어요 em alguns contextos e adequada para sonhos.",
      [
        ["언젠가 작은 가게를 열면 좋겠어요.", "Seria bom abrir uma pequena loja algum dia."],
        ["더 많이 여행하면 좋겠어요.", "Seria bom viajar mais."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Sujin decidiu para o ano que vem?",
      ["Fazer intercâmbio.", "Abrir uma loja.", "Mudar de profissão."],
      "Fazer intercâmbio.",
      "유학은 내년에 가기로 했어요.",
    ),
    cloze(
      "Complete a decisão: 유학은 내년에 가___ 했어요.",
      "기로",
      "가기로 했어요 registra a decisão.",
    ),
    listen(
      "Ouça e escreva o plano de Sujin depois do intercâmbio.",
      "그 후에 취업할 계획이에요.",
      "그 후에 취업할 계획이에요.",
      "Depois disso, ela planeja trabalhar.",
      ["그 후에 취업할 계획이에요"],
    ),
    reading(
      "수진은 내년에 유학을 가기로 했어요. 그 후에 취업할 계획이에요. 지민은 아직 결정하지 못했어요.",
      "Quem ainda não decidiu?",
      ["Jimin.", "Sujin.", "As duas."],
      "Jimin.",
      "지민은 아직 잘 모르겠어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Pretendo trabalhar na minha cidade.”",
      "고향에서 일하려고 해요.",
      "일하려고 해요 expressa intenção.",
      ["고향에서 일할 거예요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase expressa um desejo, não uma previsão?",
      [
        "더 여행하면 좋겠어요.",
        "더 여행할 거예요.",
        "더 여행했어요.",
      ],
      "더 여행하면 좋겠어요.",
      "-면 좋겠어요 expressa desejo.",
    ),
    cloze(
      "Complete o desejo: 작은 가게를 열___ 좋겠어요.",
      "면",
      "열면 좋겠어요 significa “seria bom abrir”.",
    ),
    listen(
      "Ouça e escreva a atitude de Jimin.",
      "여러 가지 일을 해 보고 싶어요.",
      "여러 가지 일을 해 보고 싶어요.",
      "Jimin quer experimentar vários tipos de trabalho.",
      ["여러 가지 일을 해 보고 싶어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 지금 정하지 않아도 괜찮아요.",
      "Não precisa decidir agora.",
      "정하지 않아도 괜찮아요 significa “não precisa decidir”.",
      ["Está tudo bem não decidir agora."],
    ),
    reading(
      "미래의 계획은 바뀔 수 있어요. 중요한 것은 지금의 목표를 세우고, 경험하면서 조정하는 거예요.",
      "Qual é a mensagem?",
      ["Planos podem ser ajustados com a experiência.", "Nunca se deve planejar.", "Só vale o primeiro plano."],
      "Planos podem ser ajustados com a experiência.",
      "경험하면서 조정하는 거예요.",
    ),
  ],
  summary: [
    "-려고 해요, -기로 했어요 e -(으)ㄹ 거예요 têm graus diferentes de compromisso.",
    "-면 좋겠어요 expressa desejo.",
    "Planos de longo prazo podem ser revistos.",
    "Não decidir imediatamente também é uma posição válida.",
  ],
});

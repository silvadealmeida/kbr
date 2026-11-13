import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l32 — causa, consequência e explicação. */
export const A2_L32 = defineA2Lesson({
  id: "a2-l32",
  number: 32,
  moduleId: "a2-m07",
  title: "Por que?",
  objective:
    "Explicar causas e consequências, pedir justificativa e responder com clareza.",
  prerequisites: ["a2-l31"],
  estimatedMinutes: 55,
  dialogueTitle: "O atraso de novo",
  intro: [
    {
      title: "Causa com -기 때문에",
      body:
        "-기 때문에 é uma forma explícita de causa. Pode soar mais formal que -아/어서. A causa vem antes; a consequência, depois.",
      ko: "길이 막혔기 때문에 늦었어요.",
    },
    {
      title: "Explicação com -(으)니까",
      body:
        "-(으)니까 apresenta uma razão que leva a uma conclusão ou pedido. É comum quando o falante justifica uma sugestão.",
      ko: "비가 오니까 우산을 가져가세요.",
    },
  ],
  dialogue: [
    ["팀장", "수진 씨, 오늘 왜 늦었어요?", "Sujin, por que você chegou tarde hoje?"],
    ["수진", "지하철이 멈췄기 때문에 늦었어요. 정말 죄송합니다.", "Cheguei tarde porque o metrô parou. Desculpe de verdade."],
    ["팀장", "연락은 왜 안 했어요?", "Por que não avisou?"],
    ["수진", "죄송해요. 사람이 많아서 연락할 시간이 없었어요.", "Desculpe. Havia muita gente, então não tive tempo de avisar."],
    ["팀장", "다음부터는 늦을 것 같으면 미리 알려 주세요.", "Da próxima vez, se achar que vai se atrasar, avise antes."],
    ["수진", "네, 알겠습니다. 앞으로는 꼭 미리 연락하겠습니다.", "Entendido. Daqui para frente, vou avisar com antecedência sem falta."],
  ],
  reusedIds: ["ko:사람", "ko:문제", "ko:이해하다", "ko:시간", "ko:연락하다"],
  grammar: [
    [
      "-기 때문에 — porque",
      "동사/형용사 + -기 때문에",
      "A forma expressa causa de modo explícito. É mais formal que -아/어서 e pode aparecer em relatos e justificativas. A consequência não é uma ordem.",
      [
        ["지하철이 멈췄기 때문에 늦었어요.", "Cheguei tarde porque o metrô parou."],
        ["사람이 많기 때문에 시간이 걸려요.", "Demora porque há muita gente."],
      ],
    ],
    [
      "-(으)니까 — razão para uma conclusão",
      "radical + -(으)니까",
      "A forma justifica uma conclusão, sugestão ou pedido. É diferente de -아/어서, que não pode anteceder uma ordem. Use -(으)니까 quando a segunda parte for um conselho ou pedido.",
      [
        ["비가 오니까 우산을 가져가세요.", "Como está chovendo, leve um guarda-chuva."],
        ["시간이 없으니까 택시를 탑시다.", "Como não temos tempo, vamos de táxi."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Por que Sujin chegou tarde?",
      ["O metrô parou.", "Ela perdeu o despertador.", "Ela estava doente."],
      "O metrô parou.",
      "지하철이 멈췄기 때문에 늦었어요.",
    ),
    cloze(
      "Complete a causa: 지하철이 멈췄___ 때문에 늦었어요.",
      "기",
      "멈췄기 때문에 significa “porque parou”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o pedido do chefe.",
      "늦을 것 같으면 미리 알려 주세요.",
      "늦을 것 같으면 미리 알려 주세요.",
      "Se achar que vai se atrasar, avise antes.",
      ["늦을 것 같으면 미리 알려 주세요"],
    ),
    reading(
      "수진은 지하철이 멈춰서 늦었어요. 사람이 많아서 연락할 시간이 없었어요. 팀장은 “다음부터 미리 알려 주세요.”라고 말했어요.",
      "O que o chefe pede?",
      ["Avisar com antecedência.", "Não usar o metrô.", "Chegar mais cedo todos os dias."],
      "Avisar com antecedência.",
      "미리 알려 주세요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Cheguei tarde porque o metrô parou.”",
      "지하철이 멈췄기 때문에 늦었어요.",
      "기 때문에 introduz a causa.",
      ["지하철이 멈춰서 늦었어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual forma justifica um pedido?",
      ["비가 오니까 우산을 가져가세요.", "비가 왔어요.", "비가 오지만 우산이 없어요."],
      "비가 오니까 우산을 가져가세요.",
      "-(으)니까 justifica o pedido seguinte.",
    ),
    cloze(
      "Complete a causa: 사람이 많___ 때문에 시간이 걸려요.",
      "기",
      "많기 때문에 significa “porque há muita gente”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a promessa de Sujin.",
      "앞으로는 꼭 미리 연락하겠습니다.",
      "앞으로는 꼭 미리 연락하겠습니다.",
      "Daqui para frente, ela vai avisar antes sem falta.",
      ["앞으로는 꼭 미리 연락하겠습니다"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 시간이 없으니까 택시를 탑시다.",
      "Como não temos tempo, vamos de táxi.",
      "없으니까 justifica a sugestão 탑시다.",
      ["Como não há tempo, vamos de táxi."],
    ),
    reading(
      "늦으면 이유를 설명하는 것도 중요하지만, 미리 연락하는 것이 더 중요해요. 상대방이 계획을 바꿀 수 있기 때문이에요.",
      "O que é mais importante?",
      ["Avisar antes.", "Dar uma desculpa longa.", "Evitar o chefe."],
      "Avisar antes.",
      "미리 연락하는 것이 더 중요해요.",
    ),
  ],
  summary: [
    "-기 때문에 explicita a causa.",
    "-(으)니까 justifica conclusões, pedidos e sugestões.",
    "Explicar a causa não substitui avisar com antecedência.",
    "Assumir o erro faz parte da comunicação profissional.",
  ],
});

import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l13 — pedidos de ajuda, oferta e cortesia. */
export const A2_L13 = defineA2Lesson({
  id: "a2-l13",
  number: 13,
  moduleId: "a2-m03",
  title: "Você pode me ajudar?",
  objective:
    "Pedir ajuda, oferecer ajuda e responder a um favor com o grau de cortesia adequado.",
  prerequisites: ["a2-l12"],
  estimatedMinutes: 55,
  dialogueTitle: "A compra pesada",
  intro: [
    {
      title: "Pedido com -아/어 주다",
      body:
        "-아/어 주다 significa “fazer algo por alguém”. Na conversa, 주세요 pede o favor; 주시겠어요? é mais cortês e deixa a resposta aberta.",
      ko: "이 가방을 들어 주시겠어요?",
    },
    {
      title: "Oferecer ajuda",
      body:
        "Para oferecer, use 제가 + verbo + -아/어 드릴게요 ou -아/어 줄게요. 드릴게요 é mais humilde e adequado com pessoas mais velhas ou desconhecidas.",
      ko: "제가 들어 드릴게요.",
    },
  ],
  dialogue: [
    ["이웃", "죄송한데, 조금 도와주시겠어요?", "Desculpe, poderia me ajudar um pouco?"],
    ["마르코", "네, 무슨 일이에요?", "Sim, o que aconteceu?"],
    ["이웃", "이 가방이 너무 무거워서 엘리베이터까지 옮기기 어려워요.", "Esta bolsa é pesada demais e é difícil levá-la até o elevador."],
    ["마르코", "제가 들어 드릴게요. 어느 층에 사세요?", "Eu carrego para a senhora. Em que andar mora?"],
    ["이웃", "삼 층이에요. 정말 고맙습니다.", "É no terceiro andar. Muito obrigada."],
    ["마르코", "괜찮아요. 힘드시면 언제든지 부탁하세요.", "Tudo bem. Se precisar, peça ajuda quando quiser."],
  ],
  reusedIds: ["ko:도와주다", "ko:짐", "ko:이사", "ko:친구", "ko:감사합니다"],
  grammar: [
    [
      "-아/어 주시겠어요? — pedido cortês",
      "동사 + -아/어 주시겠어요?",
      "A forma pede um favor com cortesia e não presume que o outro vai aceitar. É adequada com vizinhos, atendentes e pessoas desconhecidas.",
      [
        ["이 가방을 들어 주시겠어요?", "Poderia carregar esta bolsa?"],
        ["문을 열어 주시겠어요?", "Poderia abrir a porta?"],
      ],
    ],
    [
      "-아/어 드릴게요 — oferecer ajuda",
      "동사 + -아/어 드릴게요",
      "A forma oferece ajuda de modo humilde. Use 드릴게요 com pessoas mais velhas ou em contextos formais; 줄게요 é mais informal.",
      [
        ["제가 들어 드릴게요.", "Eu carrego para o senhor/a senhora."],
        ["제가 도와 드릴게요.", "Eu ajudo o senhor/a senhora."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Por que a vizinha pede ajuda?",
      ["Porque a bolsa é pesada.", "Porque perdeu a chave.", "Porque o elevador quebrou."],
      "Porque a bolsa é pesada.",
      "가방이 너무 무거워서: a bolsa é pesada demais.",
    ),
    cloze(
      "Complete o pedido cortês: 문을 열어 ___?",
      "주시겠어요",
      "열어 주시겠어요? é “poderia abrir?”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a oferta de ajuda.",
      "제가 들어 드릴게요.",
      "제가 들어 드릴게요.",
      "Marco oferece carregar a bolsa.",
      ["제가 들어 드릴게요"],
    ),
    reading(
      "이웃의 가방은 무거워요. 마르코가 엘리베이터까지 들어 줘요. 이웃은 삼 층에 살아요.",
      "Onde a vizinha mora?",
      ["No terceiro andar.", "No primeiro andar.", "No subsolo."],
      "No terceiro andar.",
      "삼 층에 살아요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Poderia me ajudar?”",
      "도와주시겠어요?",
      "주시겠어요? deixa o pedido cortês e aberto.",
      ["조금 도와주시겠어요?"],
    ),
  ],
  independent: [
    mcq(
      "Qual frase oferece ajuda de forma humilde?",
      ["제가 도와 드릴게요.", "저를 도와주세요.", "도와주시겠어요?"],
      "제가 도와 드릴게요.",
      "드릴게요 é a oferta humilde de ajuda.",
    ),
    cloze(
      "Complete a oferta: 제가 가방을 들어 ___.",
      "드릴게요",
      "들어 드릴게요 significa “eu carrego para você”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o andar da vizinha.",
      "삼 층이에요.",
      "삼 층이에요.",
      "Ela mora no terceiro andar. 삼층이에요 também é grafia permitida para numeração de pavimento.",
      ["삼 층이에요", "삼층이에요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 이 가방은 너무 무거워요.",
      "Esta bolsa é pesada demais.",
      "너무 무거워요 indica peso excessivo.",
      ["Esta bolsa é muito pesada.", "Essa bolsa é pesada demais."],
    ),
    reading(
      "수진은 이웃에게 부탁을 했어요. 이웃은 기꺼이 도와줬어요. 수진은 작은 선물로 답례했어요.",
      "Como Sujin agradeceu?",
      ["Com um pequeno presente.", "Com dinheiro, para agradecer o favor.", "Não agradeceu e não respondeu."],
      "Com um pequeno presente.",
      "작은 선물로 답례했어요.",
    ),
  ],
  summary: [
    "-아/어 주시겠어요? é um pedido cortês e não impositivo.",
    "-아/어 드릴게요 oferece ajuda com humildade.",
    "A resposta a um favor deve reconhecer o esforço do outro.",
    "Nem todo favor exige retribuição material; respeito e reciprocidade bastam.",
  ],
});

import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l38 — mensagens com contexto, pedido e fechamento. */
export const A2_L38 = defineA2Lesson({
  id: "a2-l38",
  number: 38,
  moduleId: "a2-m08",
  title: "Mensagens que conectam",
  objective:
    "Escrever mensagens curtas com contexto, pedido, desculpa ou agradecimento e encerramento.",
  prerequisites: ["a2-l37"],
  estimatedMinutes: 55,
  dialogueTitle: "Depois do mal-entendido",
  intro: [
    {
      title: "Contexto antes do pedido",
      body:
        "Uma mensagem clara começa pelo motivo: -는데 introduz o contexto; -아/어서 explica a consequência. O pedido vem depois, em uma frase curta.",
      ko: "어제 약속에 늦어서 미안해요.",
    },
    {
      title: "Fechamento cordial",
      body:
        "Termine com uma frase de disponibilidade ou agradecimento: 괜찮으시면 알려 주세요. Não é necessário escrever um texto longo para ser educado.",
      ko: "시간 괜찮으시면 알려 주세요.",
    },
  ],
  dialogue: [
    ["수진", "마르코 씨, 어제 제 말이 조금 심했죠? 미안해요.", "Marco, ontem minhas palavras foram um pouco duras, não foram? Desculpe."],
    ["마르코", "괜찮아요. 저도 제가 먼저 약속을 바꿔서 미안했어요.", "Tudo bem. Eu também sinto muito por ter mudado o compromisso primeiro."],
    ["수진", "서로 오해가 있었던 것 같아요. 이제 이해했어요.", "Parece que houve um mal-entendido dos dois lados. Agora entendi."],
    ["마르코", "그럼 다음 주에 다시 만날까요? 이번에는 제가 시간을 맞출게요.", "Então vamos nos encontrar de novo na próxima semana? Desta vez eu ajusto o horário."],
    ["수진", "좋아요. 시간 괜찮으시면 알려 주세요.", "Certo. Se o horário estiver bom, avise-me."],
    ["마르코", "네, 오늘 저녁에 메시지 보낼게요.", "Sim, envio uma mensagem hoje à noite."],
  ],
  reusedIds: ["ko:메시지", "ko:답장", "ko:연락하다", "ko:사과하다", "ko:감사합니다"],
  grammar: [
    [
      "-는데 / -아/어서 em mensagens",
      "contexto + causa",
      "Use -는데 para preparar o assunto e -아/어서 para explicar a causa. Em mensagens, frases curtas e um pedido claro funcionam melhor que muitas desculpas empilhadas.",
      [
        ["어제 약속에 늦어서 미안해요.", "Desculpe por me atrasar no encontro de ontem."],
        ["제가 먼저 약속을 바꿨는데 연락이 늦었어요.", "Eu mudei o compromisso primeiro, mas avisei tarde."],
      ],
    ],
    [
      "-으면 알려 주세요 — fechamento",
      "조건 + 알려 주세요",
      "A estrutura encerra a mensagem com uma ação clara para o interlocutor. É cortês e não pressiona por resposta imediata.",
      [
        ["시간 괜찮으시면 알려 주세요.", "Se o horário estiver bom, avise-me."],
        ["문제가 있으면 알려 주세요.", "Se houver problema, avise-me."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Por que Sujin se desculpa?",
      ["Porque falou de forma dura.", "Porque cancelou a viagem.", "Porque esqueceu o presente."],
      "Porque falou de forma dura.",
      "어제 제 말이 조금 심했죠?",
    ),
    cloze(
      "Complete a mensagem: 어제 약속에 늦___ 미안해요.",
      "어서",
      "늦어서 미안해요 significa “desculpe por me atrasar”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o fechamento da mensagem.",
      "시간 괜찮으시면 알려 주세요.",
      "시간 괜찮으시면 알려 주세요.",
      "Se o horário estiver bom, avise.",
      ["시간 괜찮으시면 알려 주세요"],
    ),
    reading(
      "수진과 마르코는 서로 오해했어요. 수진이 먼저 사과했고, 마르코도 사과했어요. 두 사람은 다음 주에 다시 만나기로 했어요.",
      "O que eles decidiram?",
      ["Encontrar-se na próxima semana.", "Não falar mais.", "Cancelar a amizade."],
      "Encontrar-se na próxima semana.",
      "다음 주에 다시 만나기로 했어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Desculpe por me atrasar.”",
      "늦어서 미안해요.",
      "늦어서 indica a causa da desculpa.",
      ["늦어서 죄송해요."],
    ),
  ],
  independent: [
    mcq(
      "Qual fechamento é cortês?",
      ["시간 괜찮으시면 알려 주세요.", "당장 답장해. 기다리고 있을게.", "연락하지 마. 지금은 바빠."],
      "시간 괜찮으시면 알려 주세요.",
      "알려 주세요 encerra com um pedido claro e cortês.",
    ),
    cloze(
      "Complete o contexto: 제가 먼저 약속을 바꿨___ 연락이 늦었어요.",
      "는데",
      "바꿨는데 introduz o contexto.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém quando Marco vai enviar a mensagem.",
      "오늘 저녁에 메시지 보낼게요.",
      "오늘 저녁에 메시지 보낼게요.",
      "Ele vai enviar a mensagem hoje à noite.",
      ["오늘 저녁에 메시지 보낼게요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 서로 오해가 있었던 것 같아요.",
      "Parece que houve um mal-entendido dos dois lados.",
      "오해가 있었던 것 같아요 expressa uma conclusão incerta.",
      ["Parece que nós dois nos entendemos mal."],
    ),
    reading(
      "좋은 메시지는 1) 상황, 2) 사과나 감사, 3) 다음 행동으로 구성해요. 너무 길게 쓰지 않고, 상대방이 답할 수 있는 질문으로 끝내는 게 좋아요.",
      "Qual é a estrutura recomendada?",
      ["Situação, desculpa/agradecimento e próximo passo.", "Apenas uma desculpa.", "Muitas perguntas ao mesmo tempo."],
      "Situação, desculpa/agradecimento e próximo passo.",
      "상황 → 사과/감사 → 다음 행동.",
    ),
  ],
  summary: [
    "-는데 e -아/어서 organizam contexto e causa em mensagens.",
    "Um fechamento com -으면 알려 주세요 deixa a resposta aberta.",
    "Uma mensagem curta pode ser completa.",
    "Reconhecer o próprio erro ajuda a reconstruir a relação.",
  ],
});

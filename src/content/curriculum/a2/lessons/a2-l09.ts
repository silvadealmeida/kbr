import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l09 — permissão, proibição e obrigação. */
export const A2_L09 = defineA2Lesson({
  id: "a2-l09",
  number: 9,
  moduleId: "a2-m02",
  title: "Posso ou não posso?",
  objective:
    "Pedir permissão, informar proibições e explicar obrigações em lugares públicos.",
  prerequisites: ["a2-l08"],
  estimatedMinutes: 55,
  dialogueTitle: "Na sala de estudo",
  intro: [
    {
      title: "Permissão com -아/어도 되다",
      body:
        "-아/어도 되다 significa “pode fazer”. É uma autorização. A pergunta sobe com entonação ou com -아/어도 돼요?.",
      ko: "여기에서 공부해도 돼요?",
    },
    {
      title: "Proibição com -(으)면 안 되다",
      body:
        "-(으)면 안 되다 significa “não pode”. Não é a mesma coisa que “não precisa”; é uma proibição. Para obrigação, use -아/어야 하다.",
      ko: "여기에서는 음식을 먹으면 안 돼요.",
    },
    {
      title: "Obrigação com -아/어야 하다",
      body:
        "-아/어야 하다 significa “tem que”. Use para regras e necessidades. A forma passada -아/어야 했어요 indica que era necessário no passado.",
      ko: "신분증을 보여 줘야 해요.",
    },
  ],
  dialogue: [
    ["마르코", "저기요, 여기에서 공부해도 돼요?", "Com licença, posso estudar aqui?"],
    ["직원", "네, 조용히 하면 돼요. 그런데 음식은 먹으면 안 돼요.", "Sim, desde que faça silêncio. Mas não pode comer."],
    ["마르코", "물도 안 돼요?", "Nem água?"],
    ["직원", "물은 괜찮아요. 대신 밖에 나가서 먹어야 해요.", "Água pode. Mas você precisa sair para comer."],
    ["마르코", "알겠습니다. 노트북을 사용해도 돼요?", "Entendi. Posso usar notebook?"],
    ["직원", "네, 이어폰을 사용해야 해요.", "Sim, mas você precisa usar fones de ouvido."],
  ],
  reusedIds: ["ko:도서관", "ko:사용하다", "ko:괜찮아요", "ko:질문", "ko:조용하다"],
  grammar: [
    [
      "-아/어도 되다 — permissão",
      "동사 + -아/어도 되다",
      "A forma autoriza uma ação. Na pergunta, pede permissão. Não use para convidar; para convite, use -(으)ㄹ까요?.",
      [
        ["여기에서 공부해도 돼요?", "Posso estudar aqui?"],
        ["물은 마셔도 돼요.", "Pode beber água."],
      ],
    ],
    [
      "-(으)면 안 되다 — proibição",
      "동사 + -(으)면 안 되다",
      "A forma proíbe uma ação. É mais forte que “não é necessário”. Para dizer que algo é opcional, use -지 않아도 되다.",
      [
        ["음식을 먹으면 안 돼요.", "Não pode comer."],
        ["여기에서 사진을 찍으면 안 돼요.", "Não pode tirar fotos aqui."],
      ],
    ],
    [
      "-아/어야 하다 — obrigação",
      "동사 + -아/어야 하다",
      "A forma expressa necessidade ou regra. Em uma conversa, pode soar direta; suavize com -아/어야 해요 ou explique o motivo.",
      [
        ["신분증을 보여 줘야 해요.", "É preciso mostrar um documento."],
        ["이어폰을 사용해야 해요.", "É preciso usar fones de ouvido."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que é proibido na sala de estudo?",
      ["Comer.", "Beber água.", "Usar notebook."],
      "Comer.",
      "음식은 먹으면 안 돼요: não pode comer.",
    ),
    cloze(
      "Complete a permissão: 여기에서 공부해___ 돼요?",
      "도",
      "공부해도 돼요? significa “posso estudar?”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o que é obrigatório.",
      "이어폰을 사용해야 해요.",
      "이어폰을 사용해야 해요.",
      "É obrigatório usar fones de ouvido.",
      ["이어폰을 사용해야 해요"],
    ),
    reading(
      "도서관에서는 조용히 해야 해요. 음식은 먹으면 안 되지만 물은 마셔도 돼요.",
      "O que é permitido?",
      ["Beber água.", "Comer.", "Falar alto."],
      "Beber água.",
      "물은 마셔도 돼요: água é permitida.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Não pode comer aqui.”",
      "여기에서 음식을 먹으면 안 돼요.",
      "먹으면 안 돼요 expressa proibição.",
      ["여기서 음식을 먹으면 안 돼요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase expressa obrigação?",
      ["신분증을 보여 줘야 해요.", "신분증을 보여 줘도 돼요.", "신분증을 안 보여 줘도 돼요."],
      "신분증을 보여 줘야 해요.",
      "-아/어야 해요 marca obrigação.",
    ),
    cloze(
      "Complete a proibição: 여기에서 사진을 찍___ 안 돼요.",
      "으면",
      "찍으면 안 돼요 significa “não pode tirar foto”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a permissão para a água.",
      "물은 마셔도 돼요.",
      "물은 마셔도 돼요.",
      "Água pode ser bebida.",
      ["물은 마셔도 돼요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 조용히 하면 돼요.",
      "Basta fazer silêncio.",
      "하면 돼요 significa “basta fazer” ou “está tudo bem se fizer”.",
      ["Só precisa fazer silêncio.", "Você só precisa ficar em silêncio."],
    ),
    reading(
      "이 건물에서는 담배를 피우면 안 돼요. 하지만 밖에서는 피워도 돼요. 쓰레기는 꼭 분리수거해야 해요.",
      "Onde é permitido fumar?",
      ["Do lado de fora.", "Em todo o prédio.", "Em nenhum lugar."],
      "Do lado de fora.",
      "밖에서는 피워도 돼요: do lado de fora é permitido.",
    ),
  ],
  summary: [
    "-아/어도 되다 pede ou concede permissão.",
    "-(으)면 안 되다 proíbe uma ação.",
    "-아/어야 하다 expressa obrigação.",
    "Regras devem ser explicadas com contexto, não apenas com “pode/não pode”.",
  ],
});

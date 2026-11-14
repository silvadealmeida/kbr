import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l14 — ruído, vizinhança e reclamação respeitosa. */
export const A2_L14 = defineA2Lesson({
  id: "a2-l14",
  number: 14,
  moduleId: "a2-m03",
  title: "Barulho e vizinhos",
  objective:
    "Reclamar de um problema doméstico sem romper a relação, apresentando fato, incômodo e pedido.",
  prerequisites: ["a2-l13"],
  estimatedMinutes: 55,
  dialogueTitle: "O barulho de cima",
  intro: [
    {
      title: "Contexto com -는데",
      body:
        "-는데 prepara o contexto antes do pedido. Em uma reclamação, ele suaviza a entrada: primeiro o fato, depois o incômodo.",
      ko: "요즘 밤에 소리가 들리는데요.",
    },
    {
      title: "Pedido negativo com -지 말다",
      body:
        "-지 말다 significa “não faça”. Pode soar direto; em uma reclamação, combine com contexto e tom de voz calmo.",
      ko: "밤에는 조금 조용히 해 주시면 좋겠어요.",
    },
  ],
  dialogue: [
    ["수진", "안녕하세요, 윗집에 사는 수진이에요.", "Olá, sou Sujin, moro no andar de cima."],
    ["이웃", "아, 네. 무슨 일이세요?", "Ah, sim. O que aconteceu?"],
    ["수진", "요즘 밤에 소리가 들리는데요, 조금 시끄러워서 잠을 못 자요.", "Ultimamente ouço barulho à noite; está um pouco barulhento e não consigo dormir."],
    ["이웃", "아이고, 죄송해요. 아이가 늦게까지 뛰어서요.", "Ah, desculpe. Meu filho fica correndo até tarde."],
    ["수진", "이해해요. 그런데 밤 열한 시 이후에는 조금 조용히 해 주시면 좋겠어요.", "Eu entendo. Mas seria bom fazer um pouco de silêncio depois das onze da noite."],
    ["이웃", "알겠습니다. 오늘부터 조심할게요.", "Entendido. A partir de hoje, vou tomar cuidado."],
  ],
  reusedIds: ["ko:조용하다", "ko:밤", "ko:벽", "ko:이해하다", "ko:양해"],
  grammar: [
    [
      "-는데 — contexto e suavização",
      "radical + -는데(요)",
      "Em uma reclamação, -는데 introduz o fato antes do pedido. O 요 final mantém o tom polido. Não é necessário traduzir sempre como “mas”.",
      [
        ["요즘 밤에 소리가 들리는데요.", "Ultimamente ouço barulho à noite..."],
        ["조금 시끄러운데요.", "Está um pouco barulhento..."],
      ],
    ],
    [
      "-지 말다 — não faça",
      "동사 + -지 말다",
      "A forma negativa de ordem pede que algo não seja feito. Em contextos de convivência, prefira explicar o motivo antes e usar um pedido mais suave.",
      [
        ["밤에는 뛰지 말아 주세요.", "Não corra à noite, por favor."],
        ["여기에서는 담배를 피우지 마세요.", "Não fume aqui."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Qual é o problema de Sujin?",
      ["O barulho à noite.", "A falta de água.", "O elevador quebrado."],
      "O barulho à noite.",
      "밤에 소리가 들리는데요, 조금 시끄러워서 잠을 못 자요.",
    ),
    cloze(
      "Complete o contexto: 요즘 밤에 소리가 들리___.",
      "는데요",
      "들리는데요 introduz o fato de forma suave.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o pedido de Sujin.",
      "밤 열한 시 이후에는 조금 조용히 해 주시면 좋겠어요.",
      "밤 열한 시 이후에는 조금 조용히 해 주시면 좋겠어요.",
      "Ela pede silêncio depois das onze da noite.",
      ["밤 열한 시 이후에는 조금 조용히 해 주시면 좋겠어요"],
    ),
    reading(
      "수진은 윗집 소음 때문에 잠을 못 자요. 이웃은 아이가 늦게까지 뛰어서 미안해해요.",
      "Por que o vizinho se desculpa?",
      ["Porque o filho corre até tarde.", "Porque a música está alta.", "Porque recebeu visitas."],
      "Porque o filho corre até tarde.",
      "아이가 늦게까지 뛰어서요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Está um pouco barulhento.”",
      "조금 시끄러워요.",
      "시끄러워요 descreve barulho; 조금 suaviza.",
      ["조금 시끄러운데요."],
    ),
  ],
  independent: [
    mcq(
      "Qual pedido é mais suave?",
      [
        "조용히 해 주시면 좋겠어요.",
        "조용히 해!",
        "소리를 내지 마!",
      ],
      "조용히 해 주시면 좋겠어요.",
      "A forma com 좋겠어요 apresenta o pedido como sugestão.",
    ),
    cloze(
      "Complete a ordem negativa: 밤에는 뛰지 ___ 주세요.",
      "말아",
      "뛰지 말아 주세요 significa “não corra, por favor”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a causa do barulho.",
      "아이가 늦게까지 뛰어서요.",
      "아이가 늦게까지 뛰어서요.",
      "O filho fica correndo até tarde.",
      ["아이가 늦게까지 뛰어서요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 조금 시끄러워서 잠을 못 자요.",
      "Está um pouco barulhento, então não consigo dormir.",
      "시끄러워서 indica a causa; 잠을 못 자요 é “não consigo dormir”.",
      ["É um pouco barulhento, então não consigo dormir."],
    ),
    reading(
      "이웃은 수진의 말을 듣고 사과했어요. 그리고 오늘부터 조심하기로 했어요.",
      "O que o vizinho decidiu?",
      ["Tomar cuidado a partir de hoje.", "Mudar de casa no fim do mês.", "Chamar a polícia para registrar o caso."],
      "Tomar cuidado a partir de hoje.",
      "오늘부터 조심하기로 했어요.",
    ),
  ],
  summary: [
    "-는데 introduz contexto e suaviza uma reclamação.",
    "-지 말다 pede que uma ação não seja feita.",
    "Uma reclamação eficaz apresenta fato, incômodo e pedido concreto.",
    "Preservar a relação é parte do objetivo comunicativo.",
  ],
});

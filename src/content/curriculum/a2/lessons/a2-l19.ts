import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l19 — conselhos condicionais e recuperação. */
export const A2_L19 = defineA2Lesson({
  id: "a2-l19",
  number: 19,
  moduleId: "a2-m04",
  title: "Se doer, descanse",
  objective:
    "Dar conselhos condicionais, dizer o que é obrigatório e o que deve ser evitado para melhorar.",
  prerequisites: ["a2-l18"],
  estimatedMinutes: 55,
  dialogueTitle: "Dor nas costas",
  intro: [
    {
      title: "Condição e conselho",
      body:
        "Combine -(으)면 com uma recomendação: 아프면 쉬세요 (“se doer, descanse”). A condição não afirma que a dor existe; apenas orienta o que fazer se acontecer.",
      ko: "허리가 아프면 누워서 쉬세요.",
    },
    {
      title: "Proibição com -지 말고",
      body:
        "-지 말고 significa “em vez de fazer…, faça…”. É útil para substituir um hábito por outro sem usar duas ordens separadas.",
      ko: "오래 앉지 말고 자주 일어나세요.",
    },
  ],
  dialogue: [
    ["수진", "요즘 허리가 너무 아파요.", "Ultimamente minha lombar dói muito."],
    ["마르코", "많이 안 좋아 보여요. 오래 앉아 있었어요?", "Parece que não está nada bem. Ficou muito tempo sentada?"],
    ["수진", "네, 하루 종일 컴퓨터 앞에 있었어요.", "Sim, fiquei o dia inteiro na frente do computador."],
    ["마르코", "그럼 오래 앉지 말고 한 시간마다 일어나세요.", "Então, em vez de ficar muito tempo sentada, levante-se a cada hora."],
    ["수진", "운동은 해도 돼요?", "Posso me exercitar?"],
    ["마르코", "가벼운 스트레칭은 괜찮아요. 그런데 무거운 것은 들지 마세요.", "Alongamento leve tudo bem. Mas não levante coisas pesadas."],
  ],
  reusedIds: ["ko:건강", "ko:운동", "ko:잠", "ko:스트레스", "ko:피하다"],
  grammar: [
    [
      "-(으)면 + conselho",
      "condição + -(으)세요 / -는 게 좋아요",
      "A condição vem primeiro; o conselho, depois. Use -세요 para uma orientação direta e -는 게 좋아요 para uma recomendação mais suave.",
      [
        ["허리가 아프면 누워서 쉬세요.", "Se a lombar doer, deite e descanse."],
        ["피곤하면 일찍 자는 게 좋아요.", "Se estiver cansado, é melhor dormir cedo."],
      ],
    ],
    [
      "-지 말고 — em vez de",
      "동사 + -지 말고",
      "A forma rejeita a primeira ação e propõe a segunda. A segunda parte precisa ser uma ação compatível. Não use -지 말고 para apenas proibir sem alternativa.",
      [
        ["오래 앉지 말고 자주 일어나세요.", "Em vez de ficar muito tempo sentado, levante-se com frequência."],
        ["무거운 것은 들지 말고 저를 도와주세요.", "Não levante coisas pesadas; peça ajuda a mim."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Marco recomenda em vez de ficar sentada?",
      ["Levantar-se a cada hora.", "Dormir o dia inteiro.", "Tomar mais café."],
      "Levantar-se a cada hora.",
      "오래 앉지 말고 한 시간마다 일어나세요.",
    ),
    cloze(
      "Complete a condição: 허리가 아프___ 쉬세요.",
      "면",
      "아프면 significa “se doer”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o que Sujin não deve levantar.",
      "무거운 것은 들지 마세요.",
      "무거운 것은 들지 마세요.",
      "Ela não deve levantar coisas pesadas.",
      ["무거운 것은 들지 마세요"],
    ),
    reading(
      "수진은 하루 종일 컴퓨터 앞에 앉아 있어요. 그래서 허리가 아파요. 마르코는 “자주 일어나세요.”라고 말했어요.",
      "Por que a lombar dói?",
      ["Porque ela fica muito tempo sentada.", "Porque ela corre todos os dias.", "Porque dorme pouco."],
      "Porque ela fica muito tempo sentada.",
      "하루 종일 컴퓨터 앞에 앉아 있어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Se doer, descanse.”",
      "아프면 쉬세요.",
      "아프면 é a condição; 쉬세요 é o conselho.",
      ["아프면 푹 쉬세요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase substitui um hábito por outro?",
      [
        "오래 앉지 말고 일어나세요.",
        "오래 앉으면 안 돼요.",
        "오래 앉아야 해요.",
      ],
      "오래 앉지 말고 일어나세요.",
      "-지 말고 propõe a alternativa.",
    ),
    cloze(
      "Complete a recomendação: 피곤하___ 일찍 자는 게 좋아요.",
      "면",
      "피곤하면 significa “se estiver cansado”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o conselho para a dor nas costas.",
      "허리가 아프면 누워서 쉬세요.",
      "허리가 아프면 누워서 쉬세요.",
      "Se a lombar doer, deite e descanse.",
      ["허리가 아프면 누워서 쉬세요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 무거운 것은 들지 마세요.",
      "Não levante coisas pesadas.",
      "들지 마세요 é uma ordem negativa.",
      ["Não carregue objetos pesados."],
    ),
    reading(
      "건강을 위해서는 규칙적으로 운동하는 게 좋아요. 하지만 아프면 무리하지 말고 쉬어야 해요.",
      "O que fazer quando estiver doente?",
      ["Descansar sem exagerar.", "Treinar mais forte.", "Ignorar a dor."],
      "Descansar sem exagerar.",
      "아프면 무리하지 말고 쉬어야 해요.",
    ),
  ],
  summary: [
    "-(으)면 + conselho organiza condições de cuidado.",
    "-지 말고 substitui uma ação por outra.",
    "Conselhos de saúde devem evitar promessas de cura.",
    "Descanso e movimento precisam ser adequados ao contexto.",
  ],
});

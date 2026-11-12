import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l18 — instruções de uso de remédio. */
export const A2_L18 = defineA2Lesson({
  id: "a2-l18",
  number: 18,
  moduleId: "a2-m04",
  title: "Conselhos da farmácia",
  objective:
    "Compreender e dar orientações simples de uso de remédio, dose, horário e restrições.",
  prerequisites: ["a2-l17"],
  estimatedMinutes: 55,
  dialogueTitle: "Como tomar o remédio",
  intro: [
    {
      title: "Instrução com -아/어 보세요",
      body:
        "-아/어 보세요 sugere experimentar uma ação. Em orientação de saúde, apresenta um cuidado como tentativa, não como garantia de cura.",
      ko: "이 약을 먼저 먹어 보세요.",
    },
    {
      title: "Recomendação com -는 게 좋아요",
      body:
        "-는 게 좋아요 significa “é melhor…” ou “é bom…”. Serve para conselhos e não promete resultado.",
      ko: "물을 많이 마시는 게 좋아요.",
    },
  ],
  dialogue: [
    ["직원", "이 약은 하루 세 번, 식후에 복용하세요.", "Tome este remédio três vezes ao dia, depois das refeições."],
    ["환자", "한 번에 몇 알이에요?", "Quantos comprimidos por vez?"],
    ["직원", "한 번에 한 알이에요. 물과 함께 드세요.", "Um comprimido por vez. Tome com água."],
    ["환자", "술을 마셔도 돼요?", "Posso beber álcool?"],
    ["직원", "오늘은 술을 마시지 마세요. 부작용이 있으면 알려 주세요.", "Hoje não beba álcool. Se tiver efeito colateral, avise-me."],
    ["환자", "네, 며칠 동안 먹어 보면 돼요?", "Entendi. Por quantos dias devo tomar?"],
  ],
  reusedIds: ["ko:약", "ko:약국", "ko:물", "ko:아침", "ko:저녁"],
  grammar: [
    [
      "-아/어 보세요 — experimente",
      "동사 + -아/어 보세요",
      "A forma sugere uma tentativa. É adequada para conselhos práticos. Não use para ordens emergenciais; nesses casos, use -세요 de forma direta.",
      [
        ["이 약을 먼저 먹어 보세요.", "Experimente tomar este remédio primeiro."],
        ["오늘은 푹 쉬어 보세요.", "Tente descansar bem hoje."],
      ],
    ],
    [
      "-는 게 좋아요 — é melhor",
      "동사 + -는 게 좋아요",
      "A forma recomenda uma ação. É mais suave que -아/어야 해요 e mais aberta que uma ordem. Pode ser usada com um motivo.",
      [
        ["물을 많이 마시는 게 좋아요.", "É bom beber muita água."],
        ["오늘은 운동하지 않는 게 좋아요.", "É melhor não se exercitar hoje."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Com que frequência tomar o remédio?",
      ["Três vezes ao dia.", "Uma vez ao dia.", "A cada hora."],
      "Três vezes ao dia.",
      "하루 세 번, 식후에 복용하세요.",
    ),
    cloze(
      "Complete a dose: 한 번에 한 ___ 드세요.",
      "알",
      "한 알 é um comprimido.",
    ),
    listen(
      "Ouça e escreva quando tomar o remédio.",
      "식후에 복용하세요.",
      "식후에 복용하세요.",
      "Tome depois da refeição.",
      ["식후에 복용하세요"],
    ),
    reading(
      "이 약은 하루 세 번 식후에 먹어요. 한 번에 한 알이에요. 오늘은 술을 마시면 안 돼요.",
      "O que deve ser evitado hoje?",
      ["Álcool.", "Água.", "Comida."],
      "Álcool.",
      "오늘은 술을 마시지 마세요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “É bom beber muita água.”",
      "물을 많이 마시는 게 좋아요.",
      "마시는 게 좋아요 expressa recomendação.",
      ["물을 많이 마시면 좋아요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase recomenda uma ação?",
      ["물을 마시는 게 좋아요.", "물을 마셔야 해요.", "물을 마시면 안 돼요."],
      "물을 마시는 게 좋아요.",
      "-는 게 좋아요 é uma recomendação.",
    ),
    cloze(
      "Complete a instrução: 이 약을 먹어 ___.",
      "보세요",
      "먹어 보세요 significa “experimente tomar”.",
    ),
    listen(
      "Ouça e escreva o que fazer se houver efeito colateral.",
      "부작용이 있으면 알려 주세요.",
      "부작용이 있으면 알려 주세요.",
      "Se tiver efeito colateral, avise.",
      ["부작용이 있으면 알려 주세요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 하루 세 번 식후에 복용하세요.",
      "Tome três vezes ao dia, depois das refeições.",
      "식후 indica depois da refeição; 복용하세요 é “tome”.",
      ["Tome três vezes por dia após as refeições."],
    ),
    reading(
      "환자는 약을 하루 세 번 먹어야 해요. 술은 오늘 마시지 않는 게 좋아요. 부작용이 있으면 약국에 연락해요.",
      "O que fazer se aparecer um efeito colateral?",
      ["Ligar para a farmácia.", "Dobrar a dose.", "Parar de beber água."],
      "Ligar para a farmácia.",
      "부작용이 있으면 약국에 연락해요.",
    ),
  ],
  summary: [
    "-아/어 보세요 sugere uma tentativa.",
    "-는 게 좋아요 recomenda uma ação.",
    "Dose, frequência e horário devem ser repetidos com clareza.",
    "Orientações de farmácia não substituem consulta médica.",
  ],
});

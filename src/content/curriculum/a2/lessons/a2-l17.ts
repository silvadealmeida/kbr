import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l17 — duração, frequência e tempo decorrido. */
export const A2_L17 = defineA2Lesson({
  id: "a2-l17",
  number: 17,
  moduleId: "a2-m04",
  title: "Desde quando?",
  objective:
    "Falar de duração, frequência e há quanto tempo um sintoma ou hábito continua.",
  prerequisites: ["a2-l16"],
  estimatedMinutes: 55,
  dialogueTitle: "Há quanto tempo?",
  intro: [
    {
      title: "Intervalo com -부터 -까지",
      body:
        "-부터 marca o início e -까지 marca o fim. Com tempo, ajudam a responder “desde quando” e “até quando”.",
      ko: "아침부터 저녁까지 일해요.",
    },
    {
      title: "Duração com -는 동안",
      body:
        "-는 동안 significa “durante o tempo em que”. O verbo antes indica a atividade que ocupa o período.",
      ko: "제가 기다리는 동안 책을 읽으세요.",
    },
    {
      title: "Frequência com -씩",
      body:
        "-씩 indica quantidade por unidade: 하루에 두 번 (“duas vezes por dia”), 한 시간씩 (“uma hora por vez”). É essencial para orientações de saúde.",
      ko: "하루에 세 번씩 드세요.",
    },
  ],
  dialogue: [
    ["의사", "어디가 아프세요?", "Onde está doendo?"],
    ["환자", "일주일 전부터 허리가 아파요.", "Minha lombar dói desde uma semana atrás."],
    ["의사", "하루에 몇 시간 앉아 있어요?", "Quantas horas por dia você fica sentado?"],
    ["환자", "여덟 시간쯤 앉아 있고, 운동은 거의 안 해요.", "Fico sentado cerca de oito horas e quase não me exercito."],
    ["의사", "그럼 한 시간마다 한 번씩 일어나서 스트레칭하세요.", "Então, a cada hora, levante-se e faça alongamento uma vez."],
    ["환자", "일주일 동안 해 보면 될까요?", "Se eu fizer por uma semana, vai resolver?"],
  ],
  reusedIds: ["ko:시간", "ko:아침", "ko:자주", "ko:가끔", "ko:매일"],
  grammar: [
    [
      "-부터 -까지 — de… até…",
      "substantivo + 부터 / 까지",
      "부터 marca o ponto inicial; 까지, o final. Com “desde ontem”, use 어제부터. Com “até sexta”, 금요일까지. Não confunda com 에, que marca um ponto no tempo.",
      [
        ["어제부터 허리가 아파요.", "Minha lombar dói desde ontem."],
        ["아침부터 저녁까지 일해요.", "Trabalho da manhã até a noite."],
      ],
    ],
    [
      "-는 동안 e -씩",
      "동사 + -는 동안 / quantidade + 씩",
      "-는 동안 descreve o período de uma ação. -씩 distribui uma quantidade por unidade. Juntos, organizam rotinas e orientações.",
      [
        ["제가 기다리는 동안 책을 읽으세요.", "Leia um livro enquanto eu espero."],
        ["하루에 세 번씩 드세요.", "Tome três vezes por dia."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Há quanto tempo o paciente sente dor?",
      ["Há uma semana.", "Há um mês.", "Desde ontem."],
      "Há uma semana.",
      "일주일 전부터 허리가 아파요.",
    ),
    cloze(
      "Complete o início: 일주일 ___ 허리가 아파요.",
      "전부터",
      "일주일 전부터 significa “desde uma semana atrás”.",
    ),
    listen(
      "Ouça e escreva a frequência recomendada.",
      "한 시간마다 한 번씩 일어나세요.",
      "한 시간마다 한 번씩 일어나세요.",
      "Levante-se uma vez a cada hora.",
      ["한 시간마다 한 번씩 일어나세요"],
    ),
    reading(
      "환자는 일주일 전부터 허리가 아파요. 하루에 여덟 시간 앉아 있고 운동은 거의 안 해요.",
      "O que pode estar relacionado à dor?",
      ["Ficar muito tempo sentado e não se exercitar.", "Dormir demais.", "Beber pouca água."],
      "Ficar muito tempo sentado e não se exercitar.",
      "여덟 시간 앉아 있고 운동은 거의 안 해요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Tomo o remédio três vezes por dia.”",
      "하루에 세 번씩 약을 먹어요.",
      "세 번씩 indica frequência distribuída por dia.",
      ["하루에 세 번 약을 먹어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual expressão indica “durante uma hora”?",
      ["한 시간 동안", "한 시간부터", "한 시간까지"],
      "한 시간 동안",
      "동안 marca a duração.",
    ),
    cloze(
      "Complete a frequência: 하루에 두 ___ 드세요.",
      "번",
      "두 번 significa “duas vezes”.",
    ),
    listen(
      "Ouça e escreva desde quando a pessoa tem o sintoma.",
      "어제부터 목이 아파요.",
      "어제부터 목이 아파요.",
      "A garganta dói desde ontem.",
      ["어제부터 목이 아파요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 아침부터 저녁까지 일해요.",
      "Trabalho da manhã até a noite.",
      "부터 marca o início; 까지 marca o fim.",
      ["Trabalho desde a manhã até a noite."],
    ),
    reading(
      "저는 매일 아침에 삼십 분씩 운동해요. 운동하는 동안 음악을 들어요. 일주일 전부터 시작했어요.",
      "Quanto tempo de exercício por dia?",
      ["Trinta minutos.", "Uma hora.", "Duas horas."],
      "Trinta minutos.",
      "삼십 분씩 운동해요.",
    ),
  ],
  summary: [
    "-부터 e -까지 delimitam início e fim.",
    "-는 동안 descreve duração simultânea.",
    "-씩 distribui quantidade por unidade.",
    "Duração e frequência precisam ser explícitas em orientações de saúde.",
  ],
});

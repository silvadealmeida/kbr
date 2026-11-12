import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l12 — divisão de tarefas e obrigações domésticas. */
export const A2_L12 = defineA2Lesson({
  id: "a2-l12",
  number: 12,
  moduleId: "a2-m03",
  title: "Tarefas da casa",
  objective:
    "Dividir tarefas domésticas, dizer o que é obrigatório e o que é opcional na convivência.",
  prerequisites: ["a2-l11"],
  estimatedMinutes: 55,
  dialogueTitle: "O acordo da república",
  intro: [
    {
      title: "Obrigação com -아/어야 하다",
      body:
        "Use -아/어야 하다 para o que precisa ser feito. Em uma casa compartilhada, a obrigação costuma vir acompanhada de frequência: 매일, 일주일에 한 번.",
      ko: "쓰레기는 매일 버려야 해요.",
    },
    {
      title: "Opcional com -지 않아도 되다",
      body:
        "-지 않아도 되다 significa “não precisa”. É diferente de proibição: a ação é permitida, mas não obrigatória.",
      ko: "설거지는 제가 하지 않아도 돼요.",
    },
    {
      title: "Sugestão com -는 게 좋겠다",
      body:
        "-는 게 좋겠다 significa “seria bom…”. É uma sugestão mais suave que uma ordem e ajuda a negociar tarefas sem impor.",
      ko: "분리수거는 화요일에 하는 게 좋겠어요.",
    },
  ],
  dialogue: [
    ["수진", "우리 집 청소는 어떻게 할까요?", "Como vamos dividir a limpeza da casa?"],
    ["마르코", "저는 거실 청소를 할게요. 수진 씨는 화장실을 해 주세요.", "Eu limpo a sala. Sujin, você limpa o banheiro, por favor."],
    ["수진", "좋아요. 쓰레기는 매일 버려야 해요.", "Certo. O lixo precisa ser jogado fora todos os dias."],
    ["마르코", "설거지는 제가 하지 않아도 돼요?", "Eu não preciso lavar a louça?"],
    ["수진", "아니요, 설거지는 같이 하는 게 좋겠어요.", "Não, seria bom lavarmos a louça juntos."],
    ["마르코", "알겠어요. 그럼 분리수거는 제가 하기로 해요.", "Entendi. Então eu fico responsável pela coleta seletiva."],
  ],
  reusedIds: ["ko:청소하다", "ko:빨래하다", "ko:설거지하다", "ko:요리하다", "ko:집"],
  grammar: [
    [
      "-지 않아도 되다 — não precisa",
      "동사 + -지 않아도 되다",
      "A forma remove a obrigação. Não é uma proibição. Compare: 하지 않아도 돼요 (“não precisa fazer”) e 하면 안 돼요 (“não pode fazer”).",
      [
        ["설거지는 제가 하지 않아도 돼요.", "Não preciso lavar a louça."],
        ["오늘은 청소하지 않아도 돼요.", "Hoje não precisa limpar."],
      ],
    ],
    [
      "-는 게 좋겠다 — seria bom",
      "동사 + -는 게 좋겠다",
      "A forma sugere uma solução e pressupõe avaliação do falante. É menos direta que -아/어야 하다. Use em negociações de convivência.",
      [
        ["분리수거는 화요일에 하는 게 좋겠어요.", "Seria bom fazer a coleta seletiva na terça."],
        ["조용히 하는 게 좋겠어요.", "Seria bom fazer silêncio."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Quem vai limpar a sala?",
      ["Marco.", "Sujin.", "Os dois juntos."],
      "Marco.",
      "저는 거실 청소를 할게요: Marco se encarrega da sala.",
    ),
    cloze(
      "Complete a obrigação: 쓰레기는 매일 버려___ 해요.",
      "야",
      "버려야 해요 significa “precisa jogar fora”.",
    ),
    listen(
      "Ouça e escreva a tarefa que eles fazem juntos.",
      "설거지는 같이 하는 게 좋겠어요.",
      "설거지는 같이 하는 게 좋겠어요.",
      "Seria bom lavar a louça juntos.",
      ["설거지는 같이 하는 게 좋겠어요"],
    ),
    reading(
      "마르코는 거실을 청소해요. 수진은 화장실을 청소해요. 쓰레기는 매일 버려야 해요.",
      "Com que frequência o lixo deve ser jogado fora?",
      ["Todos os dias.", "Uma vez por semana.", "Só na terça."],
      "Todos os dias.",
      "매일 버려야 해요: todos os dias.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Hoje não precisa limpar.”",
      "오늘은 청소하지 않아도 돼요.",
      "청소하지 않아도 돼요 remove a obrigação.",
      ["오늘은 청소 안 해도 돼요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase diz que algo é opcional?",
      ["오늘은 하지 않아도 돼요.", "오늘은 하면 안 돼요.", "오늘은 해야 해요."],
      "오늘은 하지 않아도 돼요.",
      "-지 않아도 돼요 significa “não precisa”.",
    ),
    cloze(
      "Complete a sugestão: 조용히 하___ 게 좋겠어요.",
      "는",
      "하는 게 좋겠어요 significa “seria bom fazer”.",
    ),
    listen(
      "Ouça e escreva a frequência da coleta seletiva.",
      "분리수거는 화요일이에요.",
      "분리수거는 화요일이에요.",
      "A coleta seletiva é na terça-feira.",
      ["분리수거는 화요일이에요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 설거지는 같이 하는 게 좋겠어요.",
      "Seria bom lavarmos a louça juntos.",
      "같이 하는 게 좋겠어요 é uma sugestão de ação conjunta.",
      ["Seria bom lavar a louça juntos.", "É melhor lavarmos a louça juntos."],
    ),
    reading(
      "우리 집에서는 월요일에 청소해요. 빨래는 각자 해야 해요. 요리는 같이 해도 돼요.",
      "O que cada pessoa precisa fazer sozinha?",
      ["A roupa.", "A comida.", "A limpeza."],
      "A roupa.",
      "빨래는 각자 해야 해요: cada um lava a própria roupa.",
    ),
  ],
  summary: [
    "-아/어야 하다 expressa obrigação.",
    "-지 않아도 되다 expressa que algo não é necessário.",
    "-는 게 좋겠다 sugere uma solução de forma mais suave.",
    "Acordos domésticos funcionam melhor com tarefa, frequência e responsável.",
  ],
});

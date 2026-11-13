import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l20 — hábitos saudáveis, mudança e metas. */
export const A2_L20 = defineA2Lesson({
  id: "a2-l20",
  number: 20,
  moduleId: "a2-m04",
  title: "Hábitos saudáveis",
  objective:
    "Falar de mudanças de hábito, do que vem sendo feito e de metas realistas de bem-estar.",
  prerequisites: ["a2-l19"],
  estimatedMinutes: 60,
  dialogueTitle: "Pequenas mudanças",
  intro: [
    {
      title: "Hábito em andamento",
      body:
        "-고 있어요 descreve o que a pessoa vem fazendo agora. Com 습관, ajuda a mostrar um processo, não uma mudança concluída.",
      ko: "요즘 매일 걷고 있어요.",
    },
    {
      title: "Meta com -려고 해요",
      body:
        "-려고 해요 apresenta a intenção. Uma meta saudável costuma ser específica e possível; evite prometer resultados que dependem de fatores externos.",
      ko: "하루에 삼십 분씩 걷려고 해요.",
    },
  ],
  dialogue: [
    ["지민", "요즘 건강을 위해 뭐 하고 있어요?", "O que você tem feito pela saúde ultimamente?"],
    ["마르코", "매일 삼십 분씩 걷고 있어요. 그리고 물을 자주 마셔요.", "Tenho caminhado trinta minutos todos os dias. E bebo água com frequência."],
    ["지민", "좋네요. 저는 운동을 시작하려고 해요.", "Que bom. Eu pretendo começar a me exercitar."],
    ["마르코", "처음에는 가볍게 시작하는 게 좋아요.", "No começo, é bom começar leve."],
    ["지민", "네, 일주일에 세 번만 해 보려고요.", "Sim, pretendo tentar só três vezes por semana."],
    ["마르코", "그 정도면 꾸준히 할 수 있을 거예요.", "Nesse ritmo, você conseguirá manter."],
  ],
  reusedIds: ["ko:건강", "ko:운동", "ko:물", "ko:과일", "ko:채소"],
  grammar: [
    [
      "-고 있어요 — processo atual",
      "동사 + -고 있어요",
      "A forma descreve uma ação em andamento ou um processo que continua. Compare 걷고 있어요 (“tenho caminhado”) com 걸어요 (“caminho”, hábito geral).",
      [
        ["요즘 매일 걷고 있어요.", "Ultimamente tenho caminhado todos os dias."],
        ["물을 자주 마시고 있어요.", "Tenho bebido água com frequência."],
      ],
    ],
    [
      "-려고 해요 — meta e intenção",
      "동사 + -려고 해요",
      "A forma apresenta uma intenção. Não é uma promessa de resultado. Para uma meta, combine com frequência e quantidade realistas.",
      [
        ["일주일에 세 번 운동하려고 해요.", "Pretendo me exercitar três vezes por semana."],
        ["하루에 삼십 분씩 걷려고 해요.", "Pretendo caminhar trinta minutos por dia."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Marco tem feito todos os dias?",
      ["Caminhado trinta minutos.", "Corrido uma hora.", "Ido à academia."],
      "Caminhado trinta minutos.",
      "매일 삼십 분씩 걷고 있어요.",
    ),
    cloze(
      "Complete o processo: 요즘 매일 걷___ 있어요.",
      "고",
      "걷고 있어요 significa “tenho caminhado”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a meta de Jimin.",
      "일주일에 세 번 운동하려고 해요.",
      "일주일에 세 번 운동하려고 해요.",
      "Jimin pretende se exercitar três vezes por semana.",
      ["일주일에 세 번 운동하려고 해요"],
    ),
    reading(
      "마르코는 매일 삼십 분씩 걷고 있어요. 물도 자주 마셔요. 지민은 일주일에 세 번 운동하려고 해요.",
      "Qual é a meta de Jimin?",
      ["Exercitar-se três vezes por semana.", "Caminhar todos os dias.", "Parar de beber água."],
      "Exercitar-se três vezes por semana.",
      "일주일에 세 번 운동하려고 해요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Tenho caminhado todos os dias.”",
      "매일 걷고 있어요.",
      "걷고 있어요 descreve o processo atual.",
      ["요즘 매일 걷고 있어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase descreve um processo em andamento?",
      ["요즘 걷고 있어요.", "어제 걸었어요.", "내일 걸을 거예요."],
      "요즘 걷고 있어요.",
      "-고 있어요 indica processo atual.",
    ),
    cloze(
      "Complete a meta: 일주일에 세 번 운동하___ 해요.",
      "려고",
      "운동하려고 해요 expressa intenção.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o conselho para começar.",
      "처음에는 가볍게 시작하는 게 좋아요.",
      "처음에는 가볍게 시작하는 게 좋아요.",
      "No começo, é bom começar leve.",
      ["처음에는 가볍게 시작하는 게 좋아요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 물을 자주 마시고 있어요.",
      "Tenho bebido água com frequência.",
      "마시고 있어요 descreve o processo atual.",
      ["Ultimamente tenho bebido água com frequência."],
    ),
    reading(
      "건강한 습관은 작게 시작하는 게 좋아요. 매일 조금씩 하면 오래 계속할 수 있어요.",
      "Qual é a recomendação?",
      ["Começar com metas pequenas.", "Treinar até se machucar.", "Mudar tudo de uma vez."],
      "Começar com metas pequenas.",
      "작게 시작하는 게 좋아요.",
    ),
  ],
  summary: [
    "-고 있어요 descreve um processo atual.",
    "-려고 해요 apresenta intenções e metas.",
    "Metas realistas incluem frequência e quantidade.",
    "Bem-estar não se reduz a peso ou aparência.",
  ],
});

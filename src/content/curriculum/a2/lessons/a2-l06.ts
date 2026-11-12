import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l06 — intenções, decisões e futuro próximo. */
export const A2_L06 = defineA2Lesson({
  id: "a2-l06",
  number: 6,
  moduleId: "a2-m02",
  title: "O que você vai fazer?",
  objective:
    "Falar de intenções pessoais, decisões já tomadas e planos para o futuro próximo.",
  prerequisites: ["a2-c01"],
  estimatedMinutes: 55,
  dialogueTitle: "Depois da formatura",
  intro: [
    {
      title: "Intenção com -려고 해요",
      body:
        "-려고 해요 expressa a intenção do falante: “pretendo”, “estou pensando em”. Não é uma promessa nem um plano confirmado. A forma combina com verbos de ação.",
      ko: "한국으로 유학을 가려고 해요.",
    },
    {
      title: "Decisão com -기로 했어요",
      body:
        "-기로 했어요 indica uma decisão já tomada, muitas vezes após conversa ou reflexão. É mais firme que -려고 해요. Use quando quiser dizer “decidi que vou…”.",
      ko: "저는 취업을 하기로 했어요.",
    },
    {
      title: "Distinguir intenção e decisão",
      body:
        "Em uma conversa, ouça se a pessoa diz “estou pensando” ou “decidi”. A diferença muda o grau de compromisso. Não trate uma intenção como promessa.",
      ko: "아직 정하지 않았어요.",
    },
  ],
  dialogue: [
    ["지민", "마르코 씨, 졸업 후에 뭐 할 거예요?", "Marco, o que você vai fazer depois de se formar?"],
    ["마르코", "한국으로 유학을 가려고 해요.", "Pretendo estudar na Coreia."],
    ["지민", "좋은 계획이네요. 저는 취업을 하기로 했어요.", "Que bom plano. Eu decidi procurar emprego."],
    ["마르코", "어느 회사에서 일하고 싶어요?", "Em que empresa você quer trabalhar?"],
    ["지민", "아직 정하지 않았어요. 먼저 경력을 쌓으려고 해요.", "Ainda não decidi. Primeiro pretendo acumular experiência."],
    ["마르코", "좋아요. 우리 모두 천천히 준비해요.", "Legal. Vamos todos nos preparar com calma."],
  ],
  reusedIds: ["ko:한국", "ko:회사", "ko:계획", "ko:경험", "ko:좋다"],
  grammar: [
    [
      "-려고 해요 — intenção",
      "동사 + -려고 해요",
      "Use -려고 해요 para dizer o que você pretende fazer. Não use com adjetivos. A forma negativa comum é -려고 하지 않아요.",
      [
        ["한국으로 유학을 가려고 해요.", "Pretendo estudar na Coreia."],
        ["내일 일찍 일어나려고 해요.", "Pretendo acordar cedo amanhã."],
      ],
    ],
    [
      "-기로 했어요 — decisão tomada",
      "동사 + -기로 했어요",
      "-기로 했어요 marca uma decisão já assumida. Pode ser uma decisão pessoal ou um acordo. Não significa que a ação já aconteceu.",
      [
        ["저는 취업을 하기로 했어요.", "Decidi procurar emprego."],
        ["우리는 토요일에 만나기로 했어요.", "Decidimos nos encontrar no sábado."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Marco pretende fazer?",
      ["Estudar na Coreia.", "Trabalhar em uma empresa coreana.", "Voltar ao Brasil."],
      "Estudar na Coreia.",
      "한국으로 유학을 가려고 해요: ele pretende estudar na Coreia.",
    ),
    cloze(
      "Complete a intenção: 한국으로 유학을 가___ 해요.",
      "려고",
      "가려고 해요 expressa a intenção de ir.",
    ),
    listen(
      "Ouça e escreva a decisão de Jimin.",
      "저는 취업을 하기로 했어요.",
      "저는 취업을 하기로 했어요.",
      "Jimin decidiu procurar emprego.",
      ["저는 취업을 하기로 했어요"],
    ),
    reading(
      "마르코는 한국으로 유학을 가려고 해요. 지민은 취업을 하기로 했어요.",
      "Quem já tomou uma decisão firme?",
      ["Jimin.", "Marco.", "Os dois ainda não decidiram."],
      "Jimin.",
      "하기로 했어요 indica decisão tomada; 가려고 해요 indica intenção.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Pretendo estudar na Coreia.”",
      "한국으로 유학을 가려고 해요.",
      "유학을 가려고 해요 é a intenção de ir estudar no exterior.",
      ["한국에 유학을 가려고 해요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase expressa uma decisão já tomada?",
      [
        "주말에 운동하기로 했어요.",
        "주말에 운동하려고 해요.",
        "주말에 운동할 수 있어요.",
      ],
      "주말에 운동하기로 했어요.",
      "-기로 했어요 marca decisão; -려고 해요 marca intenção.",
    ),
    cloze(
      "Complete a decisão: 우리는 토요일에 만나기___ 했어요.",
      "로",
      "만나기로 했어요 significa “decidimos nos encontrar”.",
    ),
    listen(
      "Ouça e escreva o que Jimin ainda não decidiu.",
      "아직 회사를 정하지 않았어요.",
      "아직 회사를 정하지 않았어요.",
      "Jimin ainda não decidiu a empresa.",
      ["아직 회사를 정하지 않았어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 먼저 경력을 쌓으려고 해요.",
      "Primeiro, pretendo acumular experiência.",
      "경력을 쌓다 é “acumular experiência”; -려고 해요 marca a intenção.",
      ["Primeiro pretendo acumular experiência.", "Primeiro, pretendo ganhar experiência."],
    ),
    reading(
      "수진은 내년에 유학을 가려고 해요. 하지만 아직 학교를 정하지 않았어요. 그녀는 천천히 준비하기로 했어요.",
      "O que Sujin já decidiu?",
      ["Preparar-se com calma.", "Qual universidade escolher.", "Desistir do intercâmbio."],
      "Preparar-se com calma.",
      "천천히 준비하기로 했어요: ela decidiu se preparar com calma.",
    ),
  ],
  summary: [
    "-려고 해요 expressa intenção, não uma promessa.",
    "-기로 했어요 indica uma decisão já tomada.",
    "-ㄹ 거예요 descreve o futuro, mas não marca por si só intenção ou decisão.",
    "Planos futuros devem ser apresentados sem prometer resultados.",
  ],
});

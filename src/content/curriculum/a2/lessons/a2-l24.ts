import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l24 — métodos de estudo, dificuldades e metas. */
export const A2_L24 = defineA2Lesson({
  id: "a2-l24",
  number: 24,
  moduleId: "a2-m05",
  title: "Estudar coreano",
  objective:
    "Falar de métodos de estudo, dificuldades e metas de aprendizagem com avaliação realista.",
  prerequisites: ["a2-l23"],
  estimatedMinutes: 55,
  dialogueTitle: "Como você estuda?",
  intro: [
    {
      title: "Avaliar dificuldade",
      body:
        "-는 것이 어렵다/쉽다 avalia uma atividade: “é difícil/fácil fazer…”. Não significa que a pessoa é incapaz; descreve a tarefa.",
      ko: "발음을 정확하게 하는 것이 어려워요.",
    },
    {
      title: "Rotina de estudo",
      body:
        "Combine -기로 했어요 para decisões e -고 있어요 para o que vem sendo feito. Uma meta de estudo precisa de frequência e ação concreta.",
      ko: "매일 단어를 스무 개씩 외우기로 했어요.",
    },
  ],
  dialogue: [
    ["마르코", "한국어 공부는 어떻게 해요?", "Como você estuda coreano?"],
    ["수진", "매일 단어를 스무 개씩 외우고 있어요. 그리고 주말에는 드라마를 봐요.", "Tenho memorizado vinte palavras por dia. E nos fins de semana assisto a dramas."],
    ["마르코", "듣기는 어때요?", "E a escuta?"],
    ["수진", "드라마는 재미있지만 빠른 말을 알아듣는 것이 어려워요.", "Dramas são divertidos, mas é difícil entender a fala rápida."],
    ["마르코", "저는 일주일에 두 번 학원에 가기로 했어요.", "Eu decidi ir ao cursinho duas vezes por semana."],
    ["수진", "좋아요. 꾸준히 하면 발음도 좋아질 거예요.", "Legal. Se praticar com constância, a pronúncia também vai melhorar."],
  ],
  reusedIds: ["ko:공부하다", "ko:학교", "ko:시험", "ko:배우다", "ko:가르치다"],
  grammar: [
    [
      "-는 것이 어렵다/쉽다",
      "동사 + -는 것이 어렵다/쉽다",
      "A nominalização avalia o grau de dificuldade da ação. A partícula 이/가 marca o sujeito da avaliação. Não use para julgar a capacidade de uma pessoa.",
      [
        ["발음을 정확하게 하는 것이 어려워요.", "É difícil pronunciar com precisão."],
        ["매일 복습하는 것이 중요해요.", "É importante revisar todos os dias."],
      ],
    ],
    [
      "-기로 했어요 + -고 있어요",
      "decisão + processo",
      "-기로 했어요 registra uma decisão; -고 있어요 mostra o que está em andamento. Juntos, descrevem um plano de estudo em execução.",
      [
        ["일주일에 두 번 학원에 가기로 했어요.", "Decidi ir ao cursinho duas vezes por semana."],
        ["매일 단어를 외우고 있어요.", "Tenho memorizado palavras todos os dias."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Sujin faz todos os dias?",
      ["Memoriza vinte palavras.", "Assiste a um drama completo.", "Vai ao cursinho."],
      "Memoriza vinte palavras.",
      "매일 단어를 스무 개씩 외우고 있어요.",
    ),
    cloze(
      "Complete a avaliação: 빠른 말을 알아듣___ 것이 어려워요.",
      "는",
      "알아듣는 것이 어려워요 significa “é difícil entender”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a decisão de Marco.",
      "일주일에 두 번 학원에 가기로 했어요.",
      "일주일에 두 번 학원에 가기로 했어요.",
      "Marco decidiu ir ao cursinho duas vezes por semana.",
      ["일주일에 두 번 학원에 가기로 했어요"],
    ),
    reading(
      "수진은 매일 단어를 외워요. 주말에는 드라마를 봐요. 그런데 빠른 말을 알아듣는 것이 어려워요.",
      "Qual é a dificuldade de Sujin?",
      ["Entender fala rápida.", "Escrever palavras.", "Ler livros."],
      "Entender fala rápida.",
      "빠른 말을 알아듣는 것이 어려워요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “É difícil pronunciar bem.”",
      "발음을 잘하는 것이 어려워요.",
      "잘하는 것이 어려워요 avalia a dificuldade da ação.",
      ["발음이 어려워요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase avalia a dificuldade de uma atividade?",
      [
        "단어를 외우는 것이 어려워요.",
        "단어를 외워야 해요.",
        "단어를 외우고 있어요.",
      ],
      "단어를 외우는 것이 어려워요.",
      "-는 것이 어려워요 avalia a tarefa.",
    ),
    cloze(
      "Complete a decisão: 주말에 복습하___ 했어요.",
      "기로",
      "복습하기로 했어요 significa “decidi revisar”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a frequência de estudo de Marco.",
      "일주일에 두 번 학원에 가요.",
      "일주일에 두 번 학원에 가요.",
      "Ele vai ao cursinho duas vezes por semana.",
      ["일주일에 두 번 학원에 가요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 꾸준히 하면 발음도 좋아질 거예요.",
      "Se praticar com constância, a pronúncia também vai melhorar.",
      "꾸준히 하면 é a condição; 좋아질 거예요 é o futuro.",
      ["Se você praticar sempre, a pronúncia também vai melhorar."],
    ),
    reading(
      "저는 매일 아침에 삼십 분씩 단어를 외워요. 저녁에는 드라마를 보고 듣기를 공부해요. 주말에는 학원에 가요.",
      "O que a pessoa faz pela manhã?",
      ["Memoriza palavras.", "Assiste a dramas.", "Vai ao cursinho."],
      "Memoriza palavras.",
      "아침에 단어를 외워요.",
    ),
  ],
  summary: [
    "-는 것이 어렵다/쉽다 avalia a tarefa, não a pessoa.",
    "-기로 했어요 registra decisões de estudo.",
    "-고 있어요 mostra o que vem sendo feito.",
    "Metas de estudo funcionam melhor com ação, frequência e revisão.",
  ],
});

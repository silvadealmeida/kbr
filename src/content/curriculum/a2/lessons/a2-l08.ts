import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l08 — sequência temporal antes, depois e durante a rotina. */
export const A2_L08 = defineA2Lesson({
  id: "a2-l08",
  number: 8,
  moduleId: "a2-m02",
  title: "Antes e depois",
  objective:
    "Ordenar ações no tempo e explicar o que acontece antes, durante e depois de uma atividade.",
  prerequisites: ["a2-l07"],
  estimatedMinutes: 55,
  dialogueTitle: "A rotina de Marcela",
  intro: [
    {
      title: "Antes com -기 전에",
      body:
        "A estrutura -기 전에 significa “antes de fazer”. O verbo que vem antes não recebe tempo passado; o tempo aparece na oração principal.",
      ko: "출근하기 전에 아침을 먹어요.",
    },
    {
      title: "Depois com -(으)ㄴ 후에",
      body:
        "-(으)ㄴ 후에 significa “depois de fazer”. O verbo anterior aparece na forma de particípio passado. Para verbos de ação, é uma forma frequente na rotina.",
      ko: "운동한 후에 샤워를 해요.",
    },
    {
      title: "Sequência com -고 나서",
      body:
        "-고 나서 enfatiza que a segunda ação só começa depois que a primeira termina. É mais explícito que -고 sozinho.",
      ko: "저녁을 먹고 나서 산책해요.",
    },
  ],
  dialogue: [
    ["지민", "마르셀라 씨는 아침에 뭐 해요?", "Marcela, o que você faz de manhã?"],
    ["마르셀라", "일어나고 나서 먼저 세수해요. 그리고 아침을 먹어요.", "Depois de acordar, primeiro lavo o rosto. Depois tomo café da manhã."],
    ["지민", "출근하기 전에 운동도 해요?", "Você também se exercita antes de ir ao trabalho?"],
    ["마르셀라", "네, 삼십 분 정도 운동한 후에 출근해요.", "Sim, me exercito cerca de trinta minutos e depois vou ao trabalho."],
    ["지민", "퇴근 후에는 뭐 해요?", "O que você faz depois de sair do trabalho?"],
    ["마르셀라", "저녁을 먹고 나서 샤워하고 책을 읽어요.", "Depois de jantar, tomo banho e leio um livro."],
  ],
  reusedIds: ["ko:아침", "ko:준비하다", "ko:집", "ko:운동", "ko:저녁"],
  grammar: [
    [
      "-기 전에 — antes de",
      "동사 + -기 전에",
      "O verbo antes de -기 전에 fica na forma nominal -기 e não recebe passado. A oração principal carrega o tempo: 출근하기 전에 아침을 먹었어요.",
      [
        ["출근하기 전에 아침을 먹어요.", "Tomo café da manhã antes de ir ao trabalho."],
        ["자기 전에 핸드폰을 꺼요.", "Desligo o celular antes de dormir."],
      ],
    ],
    [
      "-(으)ㄴ 후에 e -고 나서 — depois de",
      "동사 + -(으)ㄴ 후에 / -고 나서",
      "As duas formas indicam posterioridade. -고 나서 destaca a conclusão da primeira ação; -(으)ㄴ 후에 é mais neutro e frequente na rotina.",
      [
        ["운동한 후에 샤워를 해요.", "Tomo banho depois de me exercitar."],
        ["저녁을 먹고 나서 산책해요.", "Passeio depois de jantar."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Marcela faz primeiro ao acordar?",
      ["Lava o rosto.", "Toma café da manhã.", "Se exercita."],
      "Lava o rosto.",
      "일어나고 나서 먼저 세수해요: primeiro ela lava o rosto.",
    ),
    cloze(
      "Complete “antes de ir ao trabalho”: 출근하___ 전에 운동해요.",
      "기",
      "출근하기 전에 significa “antes de ir ao trabalho”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o que ela faz depois de se exercitar.",
      "운동한 후에 출근해요.",
      "운동한 후에 출근해요.",
      "Depois de se exercitar, ela vai ao trabalho.",
      ["운동한 후에 출근해요"],
    ),
    reading(
      "마르셀라는 일어나고 나서 세수해요. 그리고 아침을 먹고 출근해요.",
      "Qual é a ordem correta?",
      ["Acordar, lavar o rosto, tomar café, ir ao trabalho.", "Tomar café, acordar, ir ao trabalho.", "Ir ao trabalho, acordar, tomar café."],
      "Acordar, lavar o rosto, tomar café, ir ao trabalho.",
      "일어나고 나서 세수해요; 아침을 먹고 출근해요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Depois de jantar, tomo banho.”",
      "저녁을 먹고 나서 샤워해요.",
      "먹고 나서 indica que o banho vem depois do jantar.",
      ["저녁을 먹은 후에 샤워해요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase significa “antes de dormir”?",
      ["자기 전에", "잔 후에", "자고 나서"],
      "자기 전에",
      "자기 전에 é “antes de dormir”.",
    ),
    cloze(
      "Complete “depois de estudar”: 공부한 ___에 운동해요.",
      "후",
      "공부한 후에 significa “depois de estudar”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a atividade depois do jantar.",
      "저녁을 먹고 나서 책을 읽어요.",
      "저녁을 먹고 나서 책을 읽어요.",
      "Depois do jantar, a pessoa lê um livro.",
      ["저녁을 먹고 나서 책을 읽어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 출근하기 전에 운동해요.",
      "Eu me exercito antes de ir ao trabalho.",
      "출근하기 전에 marca a ação anterior; 운동해요 é “me exercito”.",
      ["Me exercito antes de ir ao trabalho.", "Eu me exercito antes de sair para o trabalho."],
    ),
    reading(
      "저는 아침을 먹기 전에 물을 마셔요. 그리고 운동한 후에 샤워해요. 저녁을 먹고 나서는 책을 읽어요.",
      "O que a pessoa faz antes do café da manhã?",
      ["Bebe água.", "Toma banho.", "Lê um livro."],
      "Bebe água.",
      "아침을 먹기 전에 물을 마셔요: bebe água antes do café da manhã.",
    ),
  ],
  summary: [
    "-기 전에 significa “antes de” e não leva passado no verbo anterior.",
    "-(으)ㄴ 후에 e -고 나서 indicam “depois de”.",
    "-고 나서 destaca que a primeira ação terminou.",
    "Uma rotina clara usa poucos marcadores e mantém a ordem.",
  ],
});

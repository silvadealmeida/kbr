import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l25 — prazos, reuniões e trabalho em equipe. */
export const A2_L25 = defineA2Lesson({
  id: "a2-l25",
  number: 25,
  moduleId: "a2-m05",
  title: "Prazos e reuniões",
  objective:
    "Organizar tarefas, prazos e participação em uma reunião de equipe.",
  prerequisites: ["a2-l24"],
  estimatedMinutes: 60,
  dialogueTitle: "Antes da apresentação",
  intro: [
    {
      title: "Prazo e sequência",
      body:
        "Use -기 전에 para o que precisa acontecer antes de um prazo e -아/어야 하다 para obrigações. O prazo pode ser marcado com 까지.",
      ko: "금요일까지 보고서를 제출해야 해요.",
    },
    {
      title: "Compromisso com -겠-",
      body:
        "겠- pode expressar compromisso do falante: 제가 하겠습니다 (“eu farei”). Em reuniões, é uma forma de assumir uma tarefa com responsabilidade.",
      ko: "제가 자료를 준비하겠습니다.",
    },
  ],
  dialogue: [
    ["팀장", "금요일 발표 준비는 어떻게 되었어요?", "Como está a preparação para a apresentação de sexta?"],
    ["수진", "보고서는 거의 다 했어요. 그런데 자료 정리가 조금 남았어요.", "O relatório está quase pronto. Mas falta um pouco de organização dos dados."],
    ["팀장", "자료는 언제까지 할 수 있어요?", "Até quando você consegue terminar os dados?"],
    ["수진", "목요일 오후까지 하겠습니다.", "Vou terminar até quinta à tarde."],
    ["팀장", "좋아요. 발표 전에 같이 한 번 확인해야 해요.", "Certo. Precisamos revisar juntos uma vez antes da apresentação."],
    ["수진", "네, 목요일 네 시에 회의실에서 만날까요?", "Sim, nos encontramos na sala de reuniões às quatro de quinta?"],
  ],
  reusedIds: ["ko:시간", "ko:준비하다", "ko:일정", "ko:회사", "ko:연락하다"],
  grammar: [
    [
      "-기 전에 + prazo",
      "동사 + -기 전에 / 시간 + 까지",
      "-기 전에 indica a etapa anterior; 까지 marca o limite. Em uma reunião, os dois ajudam a distribuir tarefas sem ambiguidade.",
      [
        ["발표하기 전에 같이 확인해야 해요.", "Precisamos revisar juntos antes da apresentação."],
        ["목요일까지 자료를 정리하세요.", "Organize os dados até quinta-feira."],
      ],
    ],
    [
      "-겠- — compromisso",
      "동사 + -겠습니다",
      "겠- em primeira pessoa expressa intenção firme ou compromisso. Não é uma garantia de resultado; é a assunção de uma responsabilidade.",
      [
        ["제가 자료를 준비하겠습니다.", "Eu prepararei os dados."],
        ["목요일까지 하겠습니다.", "Vou terminar até quinta."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Quando Sujin vai terminar os dados?",
      ["Até quinta à tarde.", "Até sexta de manhã.", "Até quarta à noite."],
      "Até quinta à tarde.",
      "목요일 오후까지 하겠습니다.",
    ),
    cloze(
      "Complete o prazo: 목요일 ___ 자료를 정리하세요.",
      "까지",
      "목요일까지 significa “até quinta-feira”.",
    ),
    listen(
      "Ouça e escreva o compromisso de Sujin.",
      "제가 자료를 준비하겠습니다.",
      "제가 자료를 준비하겠습니다.",
      "Sujin assume a preparação dos dados.",
      ["제가 자료를 준비하겠습니다"],
    ),
    reading(
      "수진은 보고서를 거의 다 썼어요. 자료 정리가 조금 남았어요. 그녀는 목요일 오후까지 끝내겠다고 했어요.",
      "O que falta para Sujin?",
      ["Organizar os dados.", "Escrever o relatório.", "Reservar a sala."],
      "Organizar os dados.",
      "자료 정리가 조금 남았어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Precisamos revisar antes da apresentação.”",
      "발표 전에 같이 확인해야 해요.",
      "전에 marca a etapa anterior; 확인해야 해요 é obrigação.",
      ["발표하기 전에 같이 확인해야 해요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase assume um compromisso?",
      ["제가 준비하겠습니다.", "제가 준비했어요.", "제가 준비하고 싶어요."],
      "제가 준비하겠습니다.",
      "-겠습니다 expressa compromisso do falante.",
    ),
    cloze(
      "Complete a etapa anterior: 발표하___ 전에 확인해요.",
      "기",
      "발표하기 전에 significa “antes de apresentar”.",
    ),
    listen(
      "Ouça e escreva o dia da revisão.",
      "목요일 네 시에 회의실에서 만나요.",
      "목요일 네 시에 회의실에서 만나요.",
      "A revisão será quinta às quatro, na sala de reuniões.",
      ["목요일 네 시에 회의실에서 만나요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 금요일까지 보고서를 제출해야 해요.",
      "É preciso entregar o relatório até sexta-feira.",
      "까지 marca o prazo; 제출해야 해요 é obrigação.",
      ["Preciso entregar o relatório até sexta."],
    ),
    reading(
      "팀장은 금요일 발표를 준비해요. 수진은 목요일까지 자료를 정리해요. 두 사람은 목요일 네 시에 만나서 같이 확인해요.",
      "Quando eles vão revisar juntos?",
      ["Quinta às quatro.", "Sexta de manhã.", "Quarta à noite."],
      "Quinta às quatro.",
      "목요일 네 시에 만나서 같이 확인해요.",
    ),
  ],
  summary: [
    "-기 전에 organiza etapas anteriores.",
    "까지 marca prazos e limites.",
    "-겠습니다 assume compromisso em primeira pessoa.",
    "Uma reunião produtiva termina com tarefa, responsável e prazo.",
  ],
});

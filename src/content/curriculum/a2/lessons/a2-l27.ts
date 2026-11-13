import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l27 — aeroporto e sequência de embarque. */
export const A2_L27 = defineA2Lesson({
  id: "a2-l27",
  number: 27,
  moduleId: "a2-m06",
  title: "No aeroporto",
  objective:
    "Orientar-se no aeroporto, entender etapas de embarque e pedir ajuda com bagagem.",
  prerequisites: ["a2-l26"],
  estimatedMinutes: 55,
  dialogueTitle: "Onde despachar a bagagem?",
  intro: [
    {
      title: "Sequência de etapas",
      body:
        "Use -기 전에, -고 나서 e -는 동안 para ordenar o processo: check-in, segurança, embarque. A ordem correta evita perder o voo.",
      ko: "보안검색을 한 후에 탑승구로 가세요.",
    },
    {
      title: "Pedir ajuda no aeroporto",
      body:
        "Funcionários usam formas polidas e instruções curtas. Repita a informação e pergunte o que não entendeu: 어디에서 수하물을 부쳐요?",
      ko: "수하물은 어디에서 부쳐요?",
    },
  ],
  dialogue: [
    ["수진", "안녕하세요, 수하물은 어디에서 부쳐요?", "Olá, onde despacho a bagagem?"],
    ["직원", "이쪽 카운터에서 부치시면 됩니다. 탑승권을 보여 주세요.", "É neste balcão. Mostre o cartão de embarque, por favor."],
    ["수진", "보안검색은 언제 해요?", "Quando é o controle de segurança?"],
    ["직원", "수하물을 부친 후에 보안검색을 하세요. 그다음 탑승구로 가세요.", "Faça o controle de segurança depois de despachar a bagagem. Em seguida, vá ao portão de embarque."],
    ["수진", "탑승구가 어디인지 알려 주세요.", "Informe qual é o portão de embarque."],
    ["직원", "십이 번 탑승구입니다. 탑승은 이십 분 후에 시작합니다.", "É o portão doze. O embarque começa em vinte minutos."],
  ],
  reusedIds: ["ko:비행기", "ko:표", "ko:짐", "ko:출발", "ko:도착"],
  grammar: [
    [
      "-고 나서 / -(으)ㄴ 후에 — depois de",
      "동사 + -고 나서 / -(으)ㄴ 후에",
      "As duas formas indicam posterioridade. No aeroporto, use para ordens de procedimento. -고 나서 destaca a conclusão da etapa anterior.",
      [
        ["수하물을 부치고 나서 보안검색을 하세요.", "Depois de despachar a bagagem, faça o controle de segurança."],
        ["보안검색을 한 후에 탑승구로 가세요.", "Depois do controle, vá ao portão."],
      ],
    ],
    [
      "-는 동안 — durante",
      "동사 + -는 동안",
      "A forma indica o período de uma ação. Pode ser usada para esperar, viajar ou estudar. Não confunda com -는 동안에, que é mais específico.",
      [
        ["비행기를 기다리는 동안 커피를 마셨어요.", "Tomei café enquanto esperava o avião."],
        ["비행기 안에 있는 동안 책을 읽었어요.", "Li um livro enquanto estava no avião."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Onde Sujin despacha a bagagem?",
      ["No balcão indicado.", "No portão de embarque.", "Na loja duty-free."],
      "No balcão indicado.",
      "이쪽 카운터에서 부치시면 됩니다.",
    ),
    cloze(
      "Complete a sequência: 수하물을 부치___ 나서 보안검색을 하세요.",
      "고",
      "부치고 나서 significa “depois de despachar”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o número do portão.",
      "십이 번 탑승구입니다.",
      "십이 번 탑승구입니다.",
      "O portão é o doze.",
      ["십이 번 탑승구입니다"],
    ),
    reading(
      "수진은 먼저 수하물을 부쳐요. 그다음 보안검색을 해요. 마지막으로 십이 번 탑승구로 가요.",
      "Qual é a ordem correta?",
      ["Bagagem, segurança, portão.", "Portão, bagagem, segurança.", "Segurança, bagagem, portão."],
      "Bagagem, segurança, portão.",
      "수하물 → 보안검색 → 탑승구.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Depois do controle de segurança, vá ao portão.”",
      "보안검색을 한 후에 탑승구로 가세요.",
      "한 후에 indica a etapa posterior.",
      ["보안검색 후에 탑승구로 가세요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase indica “durante a viagem”?",
      ["여행하는 동안", "여행한 후에", "여행하기 전에"],
      "여행하는 동안",
      "-는 동안 indica o período da ação.",
    ),
    cloze(
      "Complete a etapa: 보안검색을 하___ 전에 탑승권을 준비하세요.",
      "기",
      "하기 전에 significa “antes de fazer”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém quando o embarque começa.",
      "탑승은 이십 분 후에 시작합니다.",
      "탑승은 이십 분 후에 시작합니다.",
      "O embarque começa em vinte minutos.",
      ["탑승은 이십 분 후에 시작합니다"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 수하물은 어디에서 부쳐요?",
      "Onde despacho a bagagem?",
      "수하물 é bagagem; 부치다 é despachar.",
      ["Onde se despacha a bagagem?"],
    ),
    reading(
      "공항에서는 먼저 탑승권을 확인해요. 수하물을 부친 후에 보안검색을 해요. 그리고 탑승구에서 기다려요.",
      "O que acontece depois do controle de segurança?",
      ["Esperar no portão de embarque.", "Despachar a bagagem.", "Comprar a passagem."],
      "Esperar no portão de embarque.",
      "탑승구에서 기다려요.",
    ),
  ],
  summary: [
    "-고 나서 e -(으)ㄴ 후에 ordenam etapas.",
    "-는 동안 indica o período de uma ação.",
    "No aeroporto, a sequência é bagagem, segurança e portão.",
    "Repita informações críticas para confirmar.",
  ],
});

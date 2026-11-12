import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l28 — imprevisto de viagem e pedido de solução. */
export const A2_L28 = defineA2Lesson({
  id: "a2-l28",
  number: 28,
  moduleId: "a2-m06",
  title: "Um problema na viagem",
  objective:
    "Relatar um imprevisto, explicar a causa e pedir uma solução em um serviço.",
  prerequisites: ["a2-l27"],
  estimatedMinutes: 60,
  dialogueTitle: "A mala perdida",
  intro: [
    {
      title: "Relatar com -아/어서",
      body:
        "-아/어서 liga o problema à consequência: 비행기가 늦어서 짐을 못 찾았어요. Em uma reclamação, a causa deve ser clara e verificável.",
      ko: "비행기가 늦어서 짐을 못 찾았어요.",
    },
    {
      title: "Pedir solução com -겠-",
      body:
        "Em atendimento, -겠- pode indicar disposição ou solicitação: 확인해 드리겠습니다 (“vou verificar”). Não prometa o que não pode cumprir.",
      ko: "바로 확인해 드리겠습니다.",
    },
  ],
  dialogue: [
    ["수진", "안녕하세요, 짐을 찾지 못했어요.", "Olá, não consegui encontrar minha bagagem."],
    ["직원", "죄송합니다. 탑승권과 수하물표를 보여 주시겠어요?", "Desculpe. Poderia mostrar o cartão de embarque e a etiqueta da bagagem?"],
    ["수진", "여기 있어요. 비행기가 늦어서 다른 비행기로 왔어요.", "Aqui está. O voo atrasou, então vim em outro avião."],
    ["직원", "확인해 보겠습니다. 짐은 아마 다른 탑승구에 있을 수 있어요.", "Vou verificar. A bagagem talvez esteja em outro portão."],
    ["수진", "오늘 호텔에 도착해야 해서 걱정이에요.", "Preciso chegar ao hotel hoje, então estou preocupada."],
    ["직원", "짐을 찾으면 호텔로 보내 드리겠습니다. 연락처를 남겨 주세요.", "Quando encontrarmos, enviaremos ao hotel. Deixe seu contato, por favor."],
  ],
  reusedIds: ["ko:문제", "ko:예약하다", "ko:취소하다", "ko:변경", "ko:도움"],
  grammar: [
    [
      "-아/어서 — causa no relato",
      "radical + -아서/어서",
      "A causa vem antes de -아/어서; a consequência, depois. No relato de viagem, a forma explica por que algo não ocorreu como planejado.",
      [
        ["비행기가 늦어서 짐을 못 찾았어요.", "O voo atrasou, então não encontrei a bagagem."],
        ["호텔에 도착해야 해서 걱정이에요.", "Preciso chegar ao hotel, então estou preocupada."],
      ],
    ],
    [
      "-겠- — disposição no atendimento",
      "동사 + -겠습니다",
      "A forma sinaliza que o atendente assume uma ação. É comum em serviços: 확인해 드리겠습니다, 보내 드리겠습니다. Não é uma garantia de resultado imediato.",
      [
        ["바로 확인해 드리겠습니다.", "Vou verificar imediatamente."],
        ["호텔로 보내 드리겠습니다.", "Enviaremos ao hotel."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Qual é o problema de Sujin?",
      ["A bagagem não chegou.", "O hotel cancelou a reserva.", "Ela perdeu o passaporte."],
      "A bagagem não chegou.",
      "짐을 찾지 못했어요.",
    ),
    cloze(
      "Complete a causa: 비행기가 늦___ 짐을 못 찾았어요.",
      "어서",
      "늦어서 indica a causa do problema.",
    ),
    listen(
      "Ouça e escreva o que o atendente vai fazer.",
      "확인해 보겠습니다.",
      "확인해 보겠습니다.",
      "O atendente vai verificar.",
      ["확인해 보겠습니다"],
    ),
    reading(
      "수진은 다른 비행기로 왔어요. 그래서 짐을 찾지 못했어요. 직원은 짐을 호텔로 보내 주겠다고 했어요.",
      "Para onde a bagagem será enviada?",
      ["Para o hotel.", "Para o aeroporto de origem.", "Para a casa de Sujin."],
      "Para o hotel.",
      "호텔로 보내 드리겠습니다.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Não consegui encontrar minha bagagem.”",
      "짐을 찾지 못했어요.",
      "찾지 못했어요 expressa impossibilidade no passado.",
      ["제 짐을 찾지 못했어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase pede uma solução com cortesia?",
      [
        "확인해 주시겠어요?",
        "확인해!",
        "확인하면 안 돼요.",
      ],
      "확인해 주시겠어요?",
      "주시겠어요? deixa o pedido cortês.",
    ),
    cloze(
      "Complete a causa: 호텔에 도착해야 ___ 걱정이에요.",
      "해서",
      "해야 해서 indica a razão da preocupação.",
    ),
    listen(
      "Ouça e escreva o documento pedido.",
      "탑승권과 수하물표를 보여 주세요.",
      "탑승권과 수하물표를 보여 주세요.",
      "O atendente pede o cartão de embarque e a etiqueta da bagagem.",
      ["탑승권과 수하물표를 보여 주세요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 짐을 찾으면 호텔로 보내 드리겠습니다.",
      "Quando encontrarmos a bagagem, enviaremos ao hotel.",
      "찾으면 é a condição; 보내 드리겠습니다 é a disposição do atendente.",
      ["Se encontrarmos a bagagem, enviaremos ao hotel."],
    ),
    reading(
      "여행 중에 짐을 잃어버리면 바로 직원에게 말해야 해요. 탑승권과 수하물표를 준비하고 연락처를 남기세요.",
      "O que fazer se perder a bagagem?",
      ["Falar com um funcionário e deixar contato.", "Comprar outra passagem.", "Sair do aeroporto sem avisar."],
      "Falar com um funcionário e deixar contato.",
      "직원에게 말해야 해요; 연락처를 남기세요.",
    ),
  ],
  summary: [
    "-아/어서 liga causa e consequência no relato.",
    "-겠습니다 expressa disposição no atendimento.",
    "Relate o problema com documento, causa e pedido.",
    "Não prometa prazos que o serviço não confirmou.",
  ],
});

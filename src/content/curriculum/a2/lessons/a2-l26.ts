import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l26 — reserva de hotel e pedidos de informação. */
export const A2_L26 = defineA2Lesson({
  id: "a2-l26",
  number: 26,
  moduleId: "a2-m06",
  title: "Reservar um hotel",
  objective:
    "Fazer e confirmar uma reserva, pedir informações e entender condições de hospedagem.",
  prerequisites: ["a2-c05"],
  estimatedMinutes: 55,
  dialogueTitle: "A reserva de dois dias",
  intro: [
    {
      title: "Pedido cortês ao serviço",
      body:
        "Em hotel, use -아/어 주시겠어요? para pedidos e -는지 알려 주세요 para informações: “informe-me se…”. O tom é polido e não presume disponibilidade.",
      ko: "조식이 몇 시인지 알려 주세요.",
    },
    {
      title: "Confirmar detalhes",
      body:
        "Uma reserva completa inclui data, número de noites, tipo de quarto e condições de cancelamento. Repita os dados para evitar mal-entendidos.",
      ko: "이틀 연박으로 예약하고 싶어요.",
    },
  ],
  dialogue: [
    ["직원", "안녕하세요, 무슨 도움이 필요하세요?", "Olá, em que posso ajudar?"],
    ["수진", "이번 주 토요일부터 이틀 연박으로 예약하고 싶어요.", "Quero reservar duas noites a partir deste sábado."],
    ["직원", "네, 더블룸이 가능합니다. 조식은 포함되어 있어요.", "Sim, temos um quarto de casal disponível. O café da manhã está incluído."],
    ["수진", "조식이 몇 시인지 알려 주세요. 그리고 주차도 가능한가요?", "Informe o horário do café da manhã. E é possível estacionar?"],
    ["직원", "조식은 일곱 시부터 열 시까지이고, 주차는 무료입니다.", "O café da manhã é das sete às dez, e o estacionamento é gratuito."],
    ["수진", "좋아요. 예약금은 카드로 내겠습니다.", "Certo. Vou pagar o depósito com cartão."],
  ],
  reusedIds: ["ko:호텔", "ko:예약하다", "ko:방", "ko:가격", "ko:카드"],
  grammar: [
    [
      "-는지 알려 주세요 — informe se/como",
      "동사 + -는지 알려 주세요",
      "A estrutura pede uma informação sem simular uma pergunta direta. Use para horário, preço, localização e condições. O verbo antes de -는지 não recebe tempo quando a informação é atual.",
      [
        ["조식이 몇 시인지 알려 주세요.", "Informe a que horas é o café da manhã."],
        ["와이파이 비밀번호가 뭔지 알려 주세요.", "Informe qual é a senha do wi-fi."],
      ],
    ],
    [
      "-고 싶어요 + 조건",
      "동사 + -고 싶어요",
      "A forma expressa desejo. Em uma reserva, combine com data e duração para que o pedido seja completo. O serviço pode confirmar ou oferecer alternativa.",
      [
        ["이틀 연박으로 예약하고 싶어요.", "Quero reservar duas noites."],
        ["조용한 방으로 바꾸고 싶어요.", "Quero trocar para um quarto silencioso."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Quantas noites Sujin quer ficar?",
      ["Duas noites.", "Uma noite.", "Três noites."],
      "Duas noites.",
      "이틀 연박으로 예약하고 싶어요.",
    ),
    cloze(
      "Complete o pedido de informação: 조식이 몇 시___ 알려 주세요.",
      "인지",
      "몇 시인지 알려 주세요 significa “informe a que horas”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o horário do café da manhã.",
      "조식은 일곱 시부터 열 시까지예요.",
      "조식은 일곱 시부터 열 시까지예요.",
      "O café da manhã é das sete às dez.",
      ["조식은 일곱 시부터 열 시까지예요"],
    ),
    reading(
      "수진은 토요일부터 이틀 연박으로 예약해요. 더블룸이고 조식이 포함되어 있어요. 주차는 무료예요.",
      "O que está incluído na reserva?",
      ["Café da manhã e estacionamento.", "Jantar e passeio.", "Só o quarto."],
      "Café da manhã e estacionamento.",
      "조식은 포함되어 있어요; 주차는 무료입니다.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Quero reservar duas noites.”",
      "이틀 연박으로 예약하고 싶어요.",
      "연박 indica várias noites; 예약하고 싶어요 é “quero reservar”.",
      ["이틀 예약하고 싶어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual pergunta pede uma informação de forma indireta?",
      [
        "조식이 몇 시인지 알려 주세요.",
        "조식이 몇 시예요?",
        "조식을 주세요.",
      ],
      "조식이 몇 시인지 알려 주세요.",
      "-는지 알려 주세요 pede a informação sem pergunta direta.",
    ),
    cloze(
      "Complete a reserva: 이틀 ___으로 예약하고 싶어요.",
      "연박",
      "연박 significa “estadia de várias noites”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a condição de pagamento.",
      "예약금은 카드로 내겠습니다.",
      "예약금은 카드로 내겠습니다.",
      "O depósito será pago com cartão.",
      ["예약금은 카드로 내겠습니다"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 주차는 무료입니다.",
      "O estacionamento é gratuito.",
      "무료 significa “gratuito”.",
      ["O estacionamento é grátis."],
    ),
    reading(
      "호텔 예약을 하면 날짜, 숙박 일수, 방 종류를 확인해야 해요. 환불 규정도 확인하는 게 좋아요.",
      "O que deve ser confirmado antes de reservar?",
      ["Data, noites e tipo de quarto.", "Apenas o preço.", "O nome do gerente."],
      "Data, noites e tipo de quarto.",
      "날짜, 숙박 일수, 방 종류를 확인해야 해요.",
    ),
  ],
  summary: [
    "-는지 알려 주세요 pede informações de forma indireta.",
    "Uma reserva completa inclui data, noites, quarto e condições.",
    "조식, 주차 e 와이파이 são informações frequentes.",
    "Confirme sempre a política de cancelamento.",
  ],
});

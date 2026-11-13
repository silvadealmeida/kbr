import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l37 — reclamação, troca e solução de problema. */
export const A2_L37 = defineA2Lesson({
  id: "a2-l37",
  number: 37,
  moduleId: "a2-m08",
  title: "Resolvendo um problema",
  objective:
    "Explicar um defeito, negociar troca ou reembolso e confirmar o próximo passo.",
  prerequisites: ["a2-l36"],
  estimatedMinutes: 60,
  dialogueTitle: "O produto com defeito",
  intro: [
    {
      title: "Descrever o defeito",
      body:
        "Explique o que comprou, quando comprou e qual é o problema. Use -는데 para dar contexto e -아/어서 para a consequência. Evite acusações pessoais.",
      ko: "지난주에 산 전자제품이 작동하지 않는데요.",
    },
    {
      title: "Negociar uma solução",
      body:
        "Use -는 게 좋겠다 e -아/어 주시겠어요? para propor troca ou reembolso. Confirme prazo e documento antes de encerrar.",
      ko: "교환해 주시는 게 좋겠어요.",
    },
  ],
  dialogue: [
    ["수진", "안녕하세요, 지난주에 산 전자제품이 작동하지 않는데요.", "Olá, o produto eletrônico que comprei na semana passada não funciona."],
    ["직원", "영수증을 보여 주시겠어요? 확인해 드리겠습니다.", "Poderia mostrar o recibo? Vou verificar."],
    ["수진", "여기 있어요. 충전해도 켜지지 않아요.", "Aqui está. Mesmo carregando, não liga."],
    ["직원", "불편을 드려 죄송합니다. 교환해 드릴 수 있어요.", "Desculpe pelo incômodo. Podemos trocar."],
    ["수진", "같은 제품으로 교환해 주시는 게 좋겠어요. 그런데 시간이 얼마나 걸려요?", "Seria bom trocar pelo mesmo produto. Mas quanto tempo leva?"],
    ["직원", "삼십 분 정도 걸려요. 확인서를 발급해 드리겠습니다.", "Leva cerca de trinta minutos. Vou emitir um comprovante."],
  ],
  reusedIds: ["ko:문제", "ko:해결", "ko:환불", "ko:수리", "ko:도움"],
  grammar: [
    [
      "-는데 — contexto do problema",
      "radical + -는데요",
      "A forma introduz o contexto antes do pedido. Em atendimento, soa mais suave que uma acusação direta e deixa espaço para a resposta.",
      [
        ["제품이 작동하지 않는데요.", "O produto não está funcionando..."],
        ["영수증이 있는데 교환할 수 있어요?", "Tenho o recibo; posso trocar?"],
      ],
    ],
    [
      "-아/어 주시는 게 좋겠어요",
      "동사 + -아/어 주시는 게 좋겠어요",
      "A forma combina pedido e sugestão: “seria bom que o senhor/a senhora fizesse…”. É cortês e adequada para negociar uma solução.",
      [
        ["같은 제품으로 교환해 주시는 게 좋겠어요.", "Seria bom trocar pelo mesmo produto."],
        ["환불해 주시는 게 좋겠어요.", "Seria bom fazer o reembolso."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Qual é o problema do produto?",
      ["Não liga mesmo carregando.", "Veio com a cor errada.", "É grande demais."],
      "Não liga mesmo carregando.",
      "충전해도 켜지지 않아요.",
    ),
    cloze(
      "Complete o contexto: 제품이 작동하지 않___.",
      "는데요",
      "않는데요 introduz o problema de forma suave.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a solução oferecida.",
      "교환해 드릴 수 있어요.",
      "교환해 드릴 수 있어요.",
      "A loja pode trocar o produto.",
      ["교환해 드릴 수 있어요"],
    ),
    reading(
      "수진은 지난주에 전자제품을 샀어요. 제품이 작동하지 않아서 매장에 갔어요. 직원은 교환해 주겠다고 했어요.",
      "O que a loja oferece?",
      ["Troca.", "Apenas conserto.", "Nada."],
      "Troca.",
      "교환해 드릴 수 있어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Seria bom trocar pelo mesmo produto.”",
      "같은 제품으로 교환해 주시는 게 좋겠어요.",
      "교환해 주시는 게 좋겠어요 é um pedido-sugestão cortês.",
      ["같은 제품으로 교환해 주세요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase pede uma solução com cortesia?",
      [
        "환불해 주시는 게 좋겠어요.",
        "환불해!",
        "환불하면 안 돼요.",
      ],
      "환불해 주시는 게 좋겠어요.",
      "주시는 게 좋겠어요 suaviza o pedido.",
    ),
    cloze(
      "Complete o problema: 충전해도 켜지지 ___.",
      "않아요",
      "켜지지 않아요 significa “não liga”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o documento emitido.",
      "확인서를 발급해 드리겠습니다.",
      "확인서를 발급해 드리겠습니다.",
      "A loja vai emitir um comprovante.",
      ["확인서를 발급해 드리겠습니다"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 불편을 드려 죄송합니다.",
      "Desculpe pelo incômodo.",
      "불편을 드려 é “causar incômodo”; 죄송합니다 é “desculpe”.",
      ["Sinto muito pelo incômodo."],
    ),
    reading(
      "제품을 교환하면 영수증과 확인서를 준비하세요. 새 제품의 보증 기간도 확인하는 게 좋아요.",
      "O que deve ser verificado?",
      ["A garantia do novo produto.", "O nome do gerente.", "A cor da loja."],
      "A garantia do novo produto.",
      "새 제품의 보증 기간도 확인하는 게 좋아요.",
    ),
  ],
  summary: [
    "-는데 suaviza a apresentação do problema.",
    "-아/어 주시는 게 좋겠어요 negocia uma solução com cortesia.",
    "Recibo, prazo e garantia são informações essenciais.",
    "Reclamações eficazes descrevem fatos, não atacam pessoas.",
  ],
});

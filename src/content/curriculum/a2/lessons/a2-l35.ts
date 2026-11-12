import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l35 — comparação cultural e respeito às diferenças. */
export const A2_L35 = defineA2Lesson({
  id: "a2-l35",
  number: 35,
  moduleId: "a2-m07",
  title: "Diferenças culturais",
  objective:
    "Comparar costumes, identificar semelhanças e diferenças e expressar respeito sem generalizações absolutas.",
  prerequisites: ["a2-l34"],
  estimatedMinutes: 60,
  dialogueTitle: "Costumes à mesa",
  intro: [
    {
      title: "Comparar sem generalizar",
      body:
        "Use 보다, 처럼 e 비슷하다 para comparar. Evite dizer que “todo mundo” faz algo; prefira “em muitos casos”, “na minha experiência” ou “em geral”.",
      ko: "브라질에서는 보통 이렇게 해요.",
    },
    {
      title: "Ressalva com -지만",
      body:
        "Uma comparação cultural responsável reconhece variações internas. -지만 permite dizer o que parece diferente sem transformar a diferença em regra absoluta.",
      ko: "비슷하지만 조금 달라요.",
    },
  ],
  dialogue: [
    ["마르코", "한국에서는 식사할 때 나이가 중요해요?", "Na Coreia, a idade é importante durante as refeições?"],
    ["수진", "네, 보통 어른이 먼저 수저를 드세요. 그런데 가족마다 조금씩 달라요.", "Sim, geralmente os mais velhos começam a comer primeiro. Mas cada família é um pouco diferente."],
    ["마르코", "브라질에서는 다 같이 먹기 시작해요. 저는 그게 편해요.", "No Brasil, todos começam a comer juntos. Eu acho isso confortável."],
    ["수진", "두 문화가 비슷한 점도 있어요. 손님에게 음식을 많이 권하는 것도 그렇고요.", "As duas culturas têm pontos parecidos. Oferecer bastante comida aos convidados também é assim."],
    ["마르코", "그렇네요. 차이점을 존중하면 문제가 없을 것 같아요.", "É verdade. Se respeitarmos as diferenças, acho que não haverá problema."],
    ["수진", "맞아요. 문화는 사람마다 다르게 경험할 수 있어요.", "Exato. Cada pessoa pode vivenciar a cultura de forma diferente."],
  ],
  reusedIds: ["ko:음식", "ko:한국", "ko:친구", "ko:생각하다", "ko:이해하다"],
  grammar: [
    [
      "보다 e 처럼 na comparação cultural",
      "A보다 B가 더 / B는 A처럼",
      "보다 compara dois elementos; 처럼 indica semelhança. Em cultura, use com cuidado: uma prática observada não representa todas as pessoas.",
      [
        ["브라질에서는 보통 다 같이 먹어요.", "No Brasil, geralmente todos comem juntos."],
        ["한국도 브라질처럼 손님에게 음식을 권해요.", "A Coreia também oferece comida aos convidados como o Brasil."],
      ],
    ],
    [
      "-지만 — ressalva cultural",
      "radical + -지만",
      "Use -지만 para reconhecer que uma diferença não é absoluta. A ressalva evita estereótipos e mostra abertura.",
      [
        ["비슷하지만 조금 달라요.", "É parecido, mas um pouco diferente."],
        ["어른이 먼저 드시지만 가족마다 달라요.", "Os mais velhos começam primeiro, mas cada família é diferente."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que os mais velhos costumam fazer primeiro na Coreia?",
      ["Começar a comer.", "Sair da mesa.", "Servir apenas as crianças."],
      "Começar a comer.",
      "어른이 먼저 수저를 드세요.",
    ),
    cloze(
      "Complete a semelhança: 한국도 브라질___ 손님에게 음식을 권해요.",
      "처럼",
      "처럼 indica semelhança.",
    ),
    listen(
      "Ouça e escreva a ressalva de Sujin.",
      "가족마다 조금씩 달라요.",
      "가족마다 조금씩 달라요.",
      "Cada família é um pouco diferente.",
      ["가족마다 조금씩 달라요"],
    ),
    reading(
      "한국에서는 보통 어른이 먼저 식사를 시작해요. 브라질에서는 다 같이 시작하는 경우가 많아요. 하지만 가족마다 다를 수 있어요.",
      "O que o texto evita?",
      ["Generalizar todos os coreanos e brasileiros.", "Falar de comida.", "Mencionar famílias."],
      "Generalizar todos os coreanos e brasileiros.",
      "가족마다 다를 수 있어요 relativiza a regra.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “É parecido, mas é um pouco diferente.”",
      "비슷하지만 조금 달라요.",
      "비슷하지만 introduz a ressalva.",
      ["비슷하지만 조금 달라요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase evita uma generalização absoluta?",
      [
        "가족마다 달라요.",
        "모든 한국 사람은 이렇게 해요.",
        "항상 그렇지 않아요.",
      ],
      "가족마다 달라요.",
      "가족마다 relativiza a afirmação.",
    ),
    cloze(
      "Complete a comparação: 한국도 브라질___ 손님에게 음식을 권해요.",
      "처럼",
      "처럼 significa “como”.",
    ),
    listen(
      "Ouça e escreva o ponto em comum.",
      "손님에게 음식을 많이 권해요.",
      "손님에게 음식을 많이 권해요.",
      "Oferecer bastante comida aos convidados é um ponto em comum.",
      ["손님에게 음식을 많이 권해요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 차이점을 존중하면 문제가 없을 것 같아요.",
      "Se respeitarmos as diferenças, acho que não haverá problema.",
      "존중하면 é condição; 것 같아요 expressa opinião incerta.",
      ["Se respeitarmos as diferenças, acho que não teremos problemas."],
    ),
    reading(
      "문화는 한 나라 안에서도 다양해요. 같은 규칙도 세대, 지역, 가족에 따라 다를 수 있어요. 그래서 “모두 그렇다”보다 “보통 그렇다”가 더 안전해요.",
      "Qual afirmação é mais cuidadosa?",
      ["Em geral, é assim.", "Todos fazem assim.", "Ninguém faz assim."],
      "Em geral, é assim.",
      "“보통 그렇다” evita generalização.",
    ),
  ],
  summary: [
    "보다 e 처럼 comparam, mas não provam regra cultural.",
    "-지만 permite reconhecer variações.",
    "Generalizações absolutas devem ser evitadas.",
    "Respeito inclui perguntar em vez de presumir.",
  ],
});

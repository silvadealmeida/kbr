import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l29 — recomendações com motivo e ressalva. */
export const A2_L29 = defineA2Lesson({
  id: "a2-l29",
  number: 29,
  moduleId: "a2-m06",
  title: "O que você recomenda?",
  objective:
    "Pedir e dar recomendações com motivo, preço e ressalva, sem prometer uma experiência ideal.",
  prerequisites: ["a2-l28"],
  estimatedMinutes: 55,
  dialogueTitle: "Dicas para uma visitante",
  intro: [
    {
      title: "Recomendar com -는 게 좋겠다",
      body:
        "-는 게 좋겠다 sugere o que seria bom fazer. É mais suave que uma ordem e permite que a outra pessoa decida.",
      ko: "아침에는 일찍 가는 게 좋겠어요.",
    },
    {
      title: "Ressalva com -지만",
      body:
        "Uma boa recomendação inclui uma ressalva: é popular, mas fica cheio; é bonito, mas é longe. -지만 equilibra a sugestão.",
      ko: "경치가 좋지만 사람이 많아요.",
    },
  ],
  dialogue: [
    ["수진", "부산에서 어디를 가면 좋을까요?", "Onde seria bom ir em Busan?"],
    ["마르코", "해운대를 추천해요. 바다 경치가 정말 좋아요.", "Recomendo Haeundae. A vista do mar é realmente bonita."],
    ["수진", "입장료가 있어요?", "Tem taxa de entrada?"],
    ["마르코", "아니요, 무료예요. 그런데 주말에는 사람이 아주 많아요.", "Não, é gratuito. Mas nos fins de semana há muita gente."],
    ["수진", "조용한 곳도 추천해 주시겠어요?", "Poderia recomendar um lugar tranquilo também?"],
    ["마르코", "그럼 아침 일찍 가는 게 좋겠어요. 아니면 근처의 작은 카페도 괜찮아요.", "Então seria bom ir cedo de manhã. Ou um café pequeno perto também é bom."],
  ],
  reusedIds: ["ko:관광지", "ko:근처", "ko:거리", "ko:맛있다", "ko:시간"],
  grammar: [
    [
      "-는 게 좋겠다 — seria bom",
      "동사 + -는 게 좋겠다",
      "A forma sugere uma ação adequada ao contexto. Pode vir com uma alternativa e não obriga o interlocutor. É comum em dicas de viagem.",
      [
        ["아침에는 일찍 가는 게 좋겠어요.", "Seria bom ir cedo de manhã."],
        ["여기에서 쉬는 게 좋겠어요.", "Seria bom descansar aqui."],
      ],
    ],
    [
      "-지만 — ressalva",
      "radical + -지만",
      "-지만 equilibra uma qualidade positiva com uma limitação. Em recomendações, evita prometer uma experiência perfeita.",
      [
        ["경치가 좋지만 사람이 많아요.", "A vista é boa, mas há muita gente."],
        ["가격은 비싸지만 음식이 맛있어요.", "É caro, mas a comida é saborosa."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Qual lugar Marco recomenda primeiro?",
      ["Haeundae.", "Um café no centro.", "Um museu fechado."],
      "Haeundae.",
      "해운대를 추천해요.",
    ),
    cloze(
      "Complete a ressalva: 경치가 좋___ 사람이 많아요.",
      "지만",
      "좋지만 introduz a ressalva.",
    ),
    listen(
      "Ouça e escreva a dica para evitar multidão.",
      "아침 일찍 가는 게 좋겠어요.",
      "아침 일찍 가는 게 좋겠어요.",
      "Seria bom ir cedo de manhã.",
      ["아침 일찍 가는 게 좋겠어요"],
    ),
    reading(
      "해운대는 무료이고 경치가 좋아요. 그런데 주말에는 사람이 아주 많아요. 아침 일찍 가는 게 좋아요.",
      "Qual é a desvantagem de Haeundae no fim de semana?",
      ["Muita gente.", "Entrada cara.", "Fechado."],
      "Muita gente.",
      "주말에는 사람이 아주 많아요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Seria bom ir cedo.”",
      "일찍 가는 게 좋겠어요.",
      "가는 게 좋겠어요 é uma recomendação suave.",
      ["일찍 가면 좋겠어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase inclui uma ressalva?",
      [
        "경치가 좋지만 사람이 많아요.",
        "경치가 좋아요.",
        "사람이 많아요.",
      ],
      "경치가 좋지만 사람이 많아요.",
      "-지만 equilibra qualidade e limitação.",
    ),
    cloze(
      "Complete a recomendação: 조용한 곳을 가___ 좋겠어요.",
      "는 게",
      "가는 게 좋겠어요 significa “seria bom ir”.",
    ),
    listen(
      "Ouça e escreva o preço da atração.",
      "입장료는 무료예요.",
      "입장료는 무료예요.",
      "A entrada é gratuita.",
      ["입장료는 무료예요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 가격은 비싸지만 음식이 맛있어요.",
      "É caro, mas a comida é saborosa.",
      "비싸지만 introduz a ressalva; 맛있어요 é “é saboroso”.",
      ["O preço é alto, mas a comida é gostosa."],
    ),
    reading(
      "이 식당은 인기가 많아요. 가격은 조금 비싸지만 음식이 아주 맛있어요. 예약하는 게 좋아요.",
      "O que é recomendado?",
      ["Reservar.", "Chegar sem reserva.", "Evitar a comida."],
      "Reservar.",
      "예약하는 게 좋아요.",
    ),
  ],
  summary: [
    "-는 게 좋겠다 sugere sem impor.",
    "-지만 apresenta uma ressalva honesta.",
    "Uma boa recomendação inclui motivo e limitação.",
    "Preço, distância e multidão são informações úteis.",
  ],
});

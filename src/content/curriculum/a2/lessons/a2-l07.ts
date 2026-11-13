import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l07 — combinar horário, lugar e alternativas. */
export const A2_L07 = defineA2Lesson({
  id: "a2-l07",
  number: 7,
  moduleId: "a2-m02",
  title: "Vamos combinar",
  objective:
    "Combinar horário e lugar, sugerir alternativas e confirmar um encontro por mensagem.",
  prerequisites: ["a2-l06"],
  estimatedMinutes: 55,
  dialogueTitle: "A agenda de sábado",
  intro: [
    {
      title: "Sugerir com -는 게 어때요?",
      body:
        "-는 게 어때요? significa “que tal…?”. É uma sugestão aberta, adequada quando você não quer impor uma decisão. O verbo fica na forma nominalizada com -는 것.",
      ko: "두 시에 만나는 게 어때요?",
    },
    {
      title: "Confirmar com -기로 하다",
      body:
        "Depois de escolher, use -기로 하다 para registrar o acordo: “ficou combinado”. É diferente de apenas sugerir. A confirmação deve repetir horário e lugar.",
      ko: "그럼 토요일 두 시에 만나기로 해요.",
    },
    {
      title: "Ajustar sem conflito",
      body:
        "Quando o horário não funciona, ofereça uma alternativa com -ㄹ까요? ou -는 게 어때요?. Evite apenas dizer “não”; proponha outro horário.",
      ko: "세 시는 어때요?",
    },
  ],
  dialogue: [
    ["수진", "토요일에 시간 있어요?", "Você tem tempo no sábado?"],
    ["마르코", "오전에는 수업이 있어요. 오후는 괜찮아요.", "De manhã tenho aula. À tarde estou livre."],
    ["수진", "그럼 두 시에 만나는 게 어때요?", "Então, que tal nos encontrarmos às duas?"],
    ["마르코", "두 시는 조금 빠를 것 같아요. 세 시는 어때요?", "Acho que duas horas é um pouco cedo. Que tal três?"],
    ["수진", "좋아요. 그럼 세 시에 도서관 앞에서 만나기로 해요.", "Certo. Então fica combinado às três, em frente à biblioteca."],
    ["마르코", "네, 늦으면 미리 연락할게요.", "Sim, se eu me atrasar, aviso antes."],
  ],
  reusedIds: ["ko:시간", "ko:오후", "ko:약속", "ko:장소", "ko:연락하다"],
  grammar: [
    [
      "-는 게 어때요? — que tal?",
      "동사 + -는 게 어때요?",
      "A forma -는 게 é a nominalização de -는 것 + 이. A pergunta convida o outro a avaliar a sugestão. É mais suave que uma ordem e não exige resposta imediata.",
      [
        ["두 시에 만나는 게 어때요?", "Que tal nos encontrarmos às duas?"],
        ["여기에서 기다리는 게 어때요?", "Que tal esperarmos aqui?"],
      ],
    ],
    [
      "-기로 하다 — registrar um acordo",
      "동사 + -기로 하다",
      "Use -기로 하다 para transformar uma sugestão aceita em acordo. No passado, -기로 했어요 significa “ficou combinado” ou “decidimos”.",
      [
        ["세 시에 만나기로 해요.", "Vamos combinar de nos encontrar às três."],
        ["도서관 앞에서 만나기로 했어요.", "Ficou combinado de nos encontrar em frente à biblioteca."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Onde eles combinam de se encontrar?",
      ["Em frente à biblioteca.", "Na sala de aula.", "Na estação."],
      "Em frente à biblioteca.",
      "도서관 앞에서 만나기로 해요: em frente à biblioteca.",
    ),
    cloze(
      "Complete a sugestão: 두 시에 만나___ 어때요?",
      "는 게",
      "만나는 게 어때요? é “que tal nos encontrarmos?”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o horário combinado.",
      "그럼 세 시에 만나기로 해요.",
      "그럼 세 시에 만나기로 해요.",
      "O horário combinado é três horas.",
      ["그럼 세 시에 만나기로 해요"],
    ),
    reading(
      "수진: 두 시에 만날까요? 마르코: 두 시는 조금 빨라요. 세 시는 어때요? 수진: 좋아요.",
      "Que horas eles vão se encontrar?",
      ["Três horas.", "Duas horas.", "Meio-dia."],
      "Três horas.",
      "마르코 sugere três e 수진 aceita com 좋아요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Que tal nos encontrarmos às três?”",
      "세 시에 만나는 게 어때요?",
      "만나는 게 어때요? é uma sugestão aberta; 세 시에 marca o horário.",
      ["세 시에 만나면 어때요?", "세 시에 만날까요?"],
    ),
  ],
  independent: [
    mcq(
      "Qual frase registra um acordo?",
      [
        "세 시에 만나기로 했어요.",
        "세 시에 만날 수 있어요.",
        "세 시에 만나고 싶어요.",
      ],
      "세 시에 만나기로 했어요.",
      "-기로 했어요 registra a decisão combinada.",
    ),
    cloze(
      "Complete a confirmação: 도서관 앞에서 만나기___ 했어요.",
      "로",
      "만나기로 했어요 significa “ficou combinado nos encontrarmos”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o que Marco fará se se atrasar.",
      "늦으면 미리 연락할게요.",
      "늦으면 미리 연락할게요.",
      "Se se atrasar, ele avisará com antecedência.",
      ["늦으면 미리 연락할게요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 두 시는 조금 빠를 것 같아요.",
      "Acho que duas horas é um pouco cedo.",
      "빠를 것 같아요 expressa uma impressão: “parece cedo”.",
      ["Acho que duas horas é cedo demais.", "Parece que duas horas é um pouco cedo."],
    ),
    reading(
      "마르코는 오전에 수업이 있어요. 수진은 오후에 시간이 있어요. 그래서 두 사람은 세 시에 만나기로 했어요.",
      "Por que eles escolheram a tarde?",
      ["Porque Marco tem aula de manhã.", "Porque Sujin trabalha à tarde.", "Porque a biblioteca fecha cedo."],
      "Porque Marco tem aula de manhã.",
      "마르코는 오전에 수업이 있어요: ele tem aula de manhã.",
    ),
  ],
  summary: [
    "-는 게 어때요? é uma sugestão aberta e cortês.",
    "-기로 하다 registra o acordo depois da sugestão aceita.",
    "Uma confirmação completa repete horário e lugar.",
    "Atrasos devem ser avisados com antecedência.",
  ],
});

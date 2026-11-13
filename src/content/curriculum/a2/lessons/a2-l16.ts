import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l16 — sintomas e descrição de mal-estar. */
export const A2_L16 = defineA2Lesson({
  id: "a2-l16",
  number: 16,
  moduleId: "a2-m04",
  title: "Não estou me sentindo bem",
  objective:
    "Descrever sintomas e pedir atendimento em uma farmácia ou clínica com informações claras.",
  prerequisites: ["a2-c03"],
  estimatedMinutes: 55,
  dialogueTitle: "Na farmácia",
  intro: [
    {
      title: "Sintoma como sujeito",
      body:
        "Muitos sintomas usam 이/가 있어요: 열이 있어요, 기침이 있어요. Para dor, use 부위 + 이/가 아파요: 머리가 아파요.",
      ko: "목이 아프고 열이 있어요.",
    },
    {
      title: "Constatação com -네요",
      body:
        "-네요 expressa uma constatação do falante no momento: “nossa, está…”. É comum em atendimento e ajuda a demonstrar empatia sem exagerar.",
      ko: "많이 아파 보이네요.",
    },
  ],
  dialogue: [
    ["직원", "어디가 불편하세요?", "Onde está se sentindo mal?"],
    ["환자", "어제부터 목이 아프고 열이 있어요.", "Desde ontem minha garganta dói e tenho febre."],
    ["직원", "기침이나 콧물도 있어요?", "Também tem tosse ou coriza?"],
    ["환자", "네, 기침이 나고 조금 어지러워요.", "Sim, estou tossindo e um pouco tonto."],
    ["직원", "많이 피곤해 보이네요. 약을 드릴게요. 식후에 드세요.", "Você parece muito cansado. Vou lhe dar um remédio. Tome depois da refeição."],
    ["환자", "감사합니다. 내일도 안 좋으면 병원에 가야 해요?", "Obrigado. Se amanhã ainda estiver mal, preciso ir ao hospital?"],
  ],
  reusedIds: ["ko:몸", "ko:병원", "ko:증상", "ko:약", "ko:피곤하다"],
  grammar: [
    [
      "증상 + 이/가 있어요",
      "열이 있어요 / 기침이 있어요",
      "Sintomas como febre, tosse e coriza são apresentados como coisas que a pessoa tem. Use 이/가 porque o sintoma é o sujeito da existência.",
      [
        ["열이 있어요.", "Estou com febre."],
        ["기침이 나고 콧물이 있어요.", "Estou tossindo e com coriza."],
      ],
    ],
    [
      "-아/어 보이다 — parecer",
      "adjetivo + -아/어 보이다",
      "A forma descreve a impressão que a pessoa transmite: 피곤해 보여요 (“parece cansado”). Não é um diagnóstico; é uma observação.",
      [
        ["많이 피곤해 보이네요.", "Você parece muito cansado."],
        ["얼굴이 안 좋아 보여요.", "Seu rosto não parece bem."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Quais sintomas o paciente tem?",
      ["Dor de garganta, febre, tosse e tontura.", "Dor nas costas, febre alta e cansaço.", "Apenas coriza e espirros."],
      "Dor de garganta, febre, tosse e tontura.",
      "목이 아프고 열이 있어요; 기침이 나고 어지러워요.",
    ),
    cloze(
      "Complete o sintoma: 열___ 있어요.",
      "이",
      "열이 있어요 significa “estou com febre”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o sintoma principal.",
      "어제부터 목이 아프고 열이 있어요.",
      "어제부터 목이 아프고 열이 있어요.",
      "Desde ontem a garganta dói e há febre.",
      ["어제부터 목이 아프고 열이 있어요"],
    ),
    reading(
      "환자는 어제부터 목이 아프고 열이 있어요. 기침도 나고 조금 어지러워요.",
      "Desde quando o paciente está mal?",
      ["Desde ontem.", "Desde a semana passada.", "Desde hoje de manhã."],
      "Desde ontem.",
      "어제부터 significa “desde ontem”.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Estou com febre.”",
      "열이 있어요.",
      "열이 있어요 usa 이/가 para o sintoma.",
      ["열이 나요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase descreve dor de garganta?",
      ["목이 아파요.", "목이 있어요.", "목을 아파요."],
      "목이 아파요.",
      "부위 + 이/가 아파요 expressa dor.",
    ),
    cloze(
      "Complete a constatação: 많이 피곤해 ___.",
      "보이네요",
      "피곤해 보이네요 significa “parece muito cansado”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a orientação sobre o remédio.",
      "식후에 약을 드세요.",
      "식후에 약을 드세요.",
      "Tome o remédio depois da refeição.",
      ["식후에 약을 드세요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 기침이 나고 조금 어지러워요.",
      "Estou tossindo e um pouco tonto.",
      "기침이 나요 é “estou tossindo”; 어지러워요 é “estou tonto”.",
      ["Estou com tosse e um pouco de tontura."],
    ),
    reading(
      "환자는 열이 있고 기침이 나요. 직원은 약을 주고 “식후에 드세요.”라고 말했어요. 내일도 안 좋으면 병원에 가야 해요.",
      "Quando o paciente deve tomar o remédio?",
      ["Depois da refeição.", "Antes de dormir.", "Em jejum."],
      "Depois da refeição.",
      "식후에 드세요.",
    ),
  ],
  summary: [
    "Sintomas usam 이/가 com 있어요 ou 아파요.",
    "-아/어 보이다 expressa impressão, não diagnóstico.",
    "-네요 demonstra constatação e empatia no atendimento.",
    "Não substitua avaliação médica por orientação de farmácia.",
  ],
});

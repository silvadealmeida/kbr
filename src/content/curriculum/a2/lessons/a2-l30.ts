import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l30 — relato de viagem com avaliação. */
export const A2_L30 = defineA2Lesson({
  id: "a2-l30",
  number: 30,
  moduleId: "a2-m06",
  title: "Minha viagem",
  objective:
    "Relatar uma viagem com destino, atividades, dificuldades e impressão final.",
  prerequisites: ["a2-l29"],
  estimatedMinutes: 60,
  dialogueTitle: "Como foi Busan?",
  intro: [
    {
      title: "Relato em cadeia",
      body:
        "Combine passado + -고 + -아/어서 + -지만. Cada conector tem uma função: acrescentar, explicar e contrastar. Não empilhe conectores sem necessidade.",
      ko: "바다를 보고 맛있는 음식도 먹었어요.",
    },
    {
      title: "Avaliar a experiência",
      body:
        "Use 좋았어요, 즐거웠어요, 힘들었어요 e 만족했어요 para avaliar. Uma avaliação honesta pode incluir uma dificuldade sem transformar a viagem inteira em fracasso.",
      ko: "조금 힘들었지만 정말 즐거웠어요.",
    },
  ],
  dialogue: [
    ["지민", "수진 씨, 부산 여행은 어땠어요?", "Sujin, como foi a viagem a Busan?"],
    ["수진", "정말 즐거웠어요. 바다를 보고 맛있는 음식도 먹었어요.", "Foi realmente divertida. Vi o mar e também comi comida deliciosa."],
    ["지민", "날씨는 좋았어요?", "O tempo estava bom?"],
    ["수진", "첫날은 비가 와서 조금 힘들었어요. 그런데 둘째 날은 아주 좋았어요.", "No primeiro dia choveu, então foi um pouco cansativo. Mas no segundo dia foi muito bom."],
    ["지민", "사진도 많이 찍었어요?", "Tirou muitas fotos?"],
    ["수진", "네, 바다 사진을 많이 찍었어요. 다음에 같이 가요.", "Sim, tirei muitas fotos do mar. Vamos juntos da próxima vez."],
  ],
  reusedIds: ["ko:여행", "ko:경험", "ko:사진", "ko:즐겁다", "ko:아름답다"],
  grammar: [
    [
      "Passado + -고 — acrescentar ações",
      "동사 + -았/었고",
      "No relato, -고 acrescenta ações concluídas sem marcar causa. A forma passada aparece antes de -고 quando as duas ações já aconteceram.",
      [
        ["바다를 보고 맛있는 음식도 먹었어요.", "Vi o mar e também comi comida deliciosa."],
        ["사진을 찍고 호텔로 돌아갔어요.", "Tirei fotos e voltei ao hotel."],
      ],
    ],
    [
      "-지만 — equilibrar a avaliação",
      "radical + -지만",
      "Use -지만 para reconhecer uma dificuldade sem apagar a impressão positiva. Em relatos de viagem, isso soa mais natural do que uma avaliação absoluta.",
      [
        ["조금 힘들었지만 정말 즐거웠어요.", "Foi um pouco cansativo, mas realmente divertido."],
        ["비가 왔지만 사진은 잘 나왔어요.", "Choveu, mas as fotos ficaram boas."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Como foi o primeiro dia da viagem?",
      ["Choveu e foi um pouco cansativo.", "Fez sol o dia todo.", "Ela não saiu do hotel."],
      "Choveu e foi um pouco cansativo.",
      "첫날은 비가 와서 조금 힘들었어요.",
    ),
    cloze(
      "Complete o relato: 바다를 보___ 맛있는 음식도 먹었어요.",
      "고",
      "보고 acrescenta a segunda ação.",
    ),
    listen(
      "Ouça e escreva a avaliação final da viagem.",
      "조금 힘들었지만 정말 즐거웠어요.",
      "조금 힘들었지만 정말 즐거웠어요.",
      "Foi um pouco cansativo, mas realmente divertido.",
      ["조금 힘들었지만 정말 즐거웠어요"],
    ),
    reading(
      "수진은 부산에서 바다를 보고 음식을 먹었어요. 첫날은 비가 왔지만 둘째 날은 날씨가 좋았어요.",
      "O que aconteceu no primeiro dia?",
      ["Choveu.", "Ela voltou para casa.", "O hotel cancelou a reserva."],
      "Choveu.",
      "첫날은 비가 왔어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Foi um pouco cansativo, mas foi divertido.”",
      "조금 힘들었지만 즐거웠어요.",
      "힘들었지만 introduz o contraste com 즐거웠어요.",
      ["조금 힘들었지만 정말 즐거웠어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase avalia positivamente a viagem?",
      ["정말 즐거웠어요.", "비가 왔어요.", "짐을 잃어버렸어요."],
      "정말 즐거웠어요.",
      "즐거웠어요 é uma avaliação positiva.",
    ),
    cloze(
      "Complete a avaliação: 여행에 만족___.",
      "했어요",
      "만족했어요 significa “fiquei satisfeito”.",
    ),
    listen(
      "Ouça e escreva o que ela fez na viagem.",
      "바다를 보고 사진을 찍었어요.",
      "바다를 보고 사진을 찍었어요.",
      "Ela viu o mar e tirou fotos.",
      ["바다를 보고 사진을 찍었어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 다음에 같이 가요.",
      "Vamos juntos da próxima vez.",
      "다음에 significa “na próxima vez”; 같이 é “juntos”.",
      ["Na próxima vez, vamos juntos."],
    ),
    reading(
      "저는 제주도에 갔어요. 경치가 아름다웠고 음식도 맛있었어요. 다만 비행기가 늦어서 조금 힘들었어요.",
      "Qual foi a dificuldade?",
      ["O atraso do voo.", "A comida ruim.", "A falta de hotel."],
      "O atraso do voo.",
      "비행기가 늦어서 조금 힘들었어요.",
    ),
  ],
  summary: [
    "Relatos de viagem combinam ações no passado com avaliação.",
    "-고 acrescenta ações; -지만 equilibra a impressão.",
    "Uma dificuldade não invalida a experiência inteira.",
    "Fotos e impressões ajudam a sustentar o relato.",
  ],
});

import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l36 — relato pessoal com contexto, complicação e aprendizado. */
export const A2_L36 = defineA2Lesson({
  id: "a2-l36",
  number: 36,
  moduleId: "a2-m08",
  title: "Uma história para contar",
  objective:
    "Encadear um relato pessoal com contexto, complicação, desfecho e aprendizado.",
  prerequisites: ["a2-c07"],
  estimatedMinutes: 65,
  dialogueTitle: "O dia inesquecível",
  intro: [
    {
      title: "Contexto antes da ação",
      body:
        "Comece com uma referência temporal e um cenário. Depois acrescente a complicação. O ouvinte precisa saber onde, quando e com quem antes de entender o problema.",
      ko: "작년 여름에 친구와 여행을 갔어요.",
    },
    {
      title: "Aprendizado com -게 되다",
      body:
        "-게 되다 também pode indicar o que a experiência fez a pessoa passar a fazer ou sentir: 여행을 통해 새로운 것을 알게 되었어요.",
      ko: "그 여행을 통해 많이 배우게 되었어요.",
    },
  ],
  dialogue: [
    ["마르코", "수진 씨, 여행에서 가장 기억에 남는 일이 뭐예요?", "Sujin, qual foi a lembrança mais marcante da sua viagem?"],
    ["수진", "작년 여름에 친구와 제주도에 갔어요. 그때 비행기가 갑자기 취소되었어요.", "No verão passado, fui a Jeju com uma amiga. Naquele momento, o voo foi cancelado de repente."],
    ["마르코", "그래서 어떻게 했어요?", "E o que vocês fizeram?"],
    ["수진", "처음에는 당황했지만, 마침 근처에 기차역이 있어서 기차로 갔어요.", "No começo ficamos sem saber o que fazer, mas por acaso havia uma estação perto, então fomos de trem."],
    ["마르코", "여행은 어땠어요?", "Como foi a viagem?"],
    ["수진", "조금 힘들었지만 예상하지 못한 풍경을 보게 되었어요. 그 일 이후로 계획이 틀어져도 덜 걱정하게 되었어요.", "Foi um pouco difícil, mas acabei vendo paisagens inesperadas. Depois disso, passei a me preocupar menos quando os planos dão errado."],
  ],
  reusedIds: ["ko:경험", "ko:처음", "ko:이야기하다", "ko:사진", "ko:시간"],
  grammar: [
    [
      "Relato em cadeia",
      "passado + -고 / -지만 / -아/어서",
      "Cada conector tem uma função: -고 acrescenta, -지만 contrasta e -아/어서 explica causa ou sequência. Use no máximo dois por frase para manter a clareza.",
      [
        ["비행기가 취소되었지만 기차로 갔어요.", "O voo foi cancelado, mas fomos de trem."],
        ["근처에 기차역이 있어서 기차로 갔어요.", "Havia uma estação perto, então fomos de trem."],
      ],
    ],
    [
      "-게 되다 — passar a",
      "동사 + -게 되다",
      "No relato, a forma mostra uma mudança provocada pela experiência. Não é uma decisão consciente; é uma consequência do que aconteceu.",
      [
        ["그 일 이후로 덜 걱정하게 되었어요.", "Depois disso, passei a me preocupar menos."],
        ["새로운 것을 알게 되었어요.", "Passei a conhecer coisas novas."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que aconteceu com o voo de Sujin?",
      ["Foi cancelado.", "Atrasou duas horas.", "Ela perdeu o embarque."],
      "Foi cancelado.",
      "비행기가 갑자기 취소되었어요.",
    ),
    cloze(
      "Complete a sequência: 근처에 기차역이 있___ 기차로 갔어요.",
      "어서",
      "있어서 indica a causa da mudança de plano.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o aprendizado de Sujin.",
      "그 일 이후로 덜 걱정하게 되었어요.",
      "그 일 이후로 덜 걱정하게 되었어요.",
      "Depois disso, ela passou a se preocupar menos.",
      ["그 일 이후로 덜 걱정하게 되었어요"],
    ),
    reading(
      "수진은 작년 여름에 제주도에 갔어요. 비행기가 취소되었지만 기차로 가서 예상하지 못한 풍경을 봤어요.",
      "Como ela chegou a Jeju?",
      ["De trem.", "De avião.", "De barco."],
      "De trem.",
      "기차로 갔어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “No verão passado, fui a Jeju com uma amiga.”",
      "작년 여름에 친구와 제주도에 갔어요.",
      "작년 여름에 marca o tempo; 친구와 indica companhia.",
      ["작년 여름에 친구하고 제주도에 갔어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual conector indica contraste?",
      ["-지만", "-고", "-아서"],
      "-지만",
      "-지만 introduz contraste.",
    ),
    cloze(
      "Complete a mudança: 그 일 이후로 덜 걱정하___ 되었어요.",
      "게",
      "걱정하게 되었어요 significa “passei a me preocupar”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o problema inicial.",
      "비행기가 갑자기 취소되었어요.",
      "비행기가 갑자기 취소되었어요.",
      "O voo foi cancelado de repente.",
      ["비행기가 갑자기 취소되었어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 예상하지 못한 풍경을 보게 되었어요.",
      "Acabei vendo paisagens inesperadas.",
      "보게 되었어요 indica uma mudança provocada pela experiência.",
      ["Passei a ver paisagens inesperadas."],
    ),
    reading(
      "여행 계획이 틀어지면 당황할 수 있어요. 하지만 그때 새로운 선택을 하게 되고, 예상하지 못한 좋은 경험을 하기도 해요.",
      "Qual é a mensagem?",
      ["Planos que mudam podem trazer experiências novas.", "Nunca se deve planejar uma viagem.", "Viagens sempre dão errado no fim."],
      "Planos que mudam podem trazer experiências novas.",
      "새로운 선택을 하게 되고 좋은 경험을 하기도 해요.",
    ),
  ],
  summary: [
    "Um relato pessoal precisa de contexto, complicação e desfecho.",
    "-고, -지만 e -아/어서 têm funções diferentes.",
    "-게 되다 mostra mudanças provocadas pela experiência.",
    "Nem todo imprevisto produz um desfecho negativo.",
  ],
});

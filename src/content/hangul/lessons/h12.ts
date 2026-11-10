import type { Lesson } from "../types";

export const H12: Lesson = {
  id: "h12",
  unit: 5,
  title: "ㅐ ㅔ ㅒ ㅖ",
  objective:
    "Ler as vogais escritas com ㅐ/ㅔ e ㅒ/ㅖ, separando a ortografia da variação de pronúncia moderna.",
  objectives: [
    "Reconhecer ㅐ, ㅔ, ㅒ e ㅖ.",
    "Entender que ㅐ/ㅔ e ㅒ/ㅖ estão em fusão na fala moderna.",
    "Diferenciar as grafias sem exigir um contraste oral obrigatório.",
    "Ler 개, 새, 네, 세수, 시계, 얘기, 예 e 베개.",
  ],
  intro: [
    {
      title: "A escrita continua diferente",
      body:
        "Em Seul, ㅐ e ㅔ são hoje muito próximas: [ɛ] ~ [e]. A distinção existe na escrita e em alguns falantes, mas não é confiável para avaliar pronúncia. Aqui você aprende a diferença gráfica, não um contraste oral obrigatório.",
      ko: "ㅐ ㅔ",
    },
    {
      title: "ㅒ e ㅖ",
      body:
        "São ㅐ e ㅔ com glide palatal: [jɛ] ~ [je]. Depois de consoante, ㅖ pode soar [e], como em 시계. Não use a regra 'ㅐ aberto, ㅔ fechado' como critério absoluto.",
      ko: "ㅒ ㅖ · 얘 예 계",
    },
    {
      title: "Palavras da lição",
      body:
        "개 (cachorro), 새 (pássaro), 네 (sim; seu), 세수 (lavar o rosto), 시계 (relógio), 얘기 (conversa), 예 (sim formal) e 베개 (travesseiro). A avaliação prioriza a grafia e a leitura, não o contraste oral.",
      ko: "개 새 네 세수 시계 얘기 예 베개",
    },
  ],
  prerequisites: ["h11"],
  newJamo: ["ㅐ", "ㅔ", "ㅒ", "ㅖ"],
  newFinals: [],
  examples: [
    { kind: "word", id: "word:개" },
    { kind: "word", id: "word:새" },
    { kind: "word", id: "word:네" },
    { kind: "word", id: "word:세수" },
    { kind: "word", id: "word:시계" },
    { kind: "word", id: "word:얘기" },
    { kind: "word", id: "word:예" },
    { kind: "word", id: "word:베개" },
  ],
  exercises: [
    {
      id: "h12-e01",
      type: "char-to-audio",
      prompt: "Qual descrição corresponde ao som de 개?",
      text: "개",
      options: [
        {
          id: "ae",
          audioText: "개",
          label: "Vogal escrita com ㅐ, como em cachorro",
        },
        {
          id: "e",
          audioText: "게",
          label: "Vogal escrita com ㅔ; a palavra seria 게",
        },
      ],
      correctOptionId: "ae",
      explanation:
        "개 é ㄱ + ㅐ. A fala moderna pode soar igual a 게, mas a escrita de 'cachorro' é 개.",
      tags: ["diag:vowel-compound", "ㅐ", "pronunciation:merged-ae-e", "reading"],
      srsCards: ["h:jamo:v:ㅐ", "h:syl:개", "h:word:개"],
    },
    {
      id: "h12-e02",
      type: "char-to-audio",
      prompt: "Qual descrição corresponde ao som de 네?",
      text: "네",
      options: [
        {
          id: "e",
          audioText: "네",
          label: "Vogal escrita com ㅔ, como em 'sim'",
        },
        {
          id: "ae",
          audioText: "내",
          label: "Vogal escrita com ㅐ; a palavra seria 내",
        },
      ],
      correctOptionId: "e",
      explanation:
        "네 é ㄴ + ㅔ. 내 usa ㅐ e significa 'meu/minha' ou 'eu (formal)'. A grafia distingue as palavras.",
      tags: ["diag:vowel-compound", "ㅔ", "pronunciation:merged-ae-e", "reading"],
      srsCards: ["h:jamo:v:ㅔ", "h:syl:네", "h:word:네"],
    },
    {
      id: "h12-e03",
      type: "audio-to-char",
      prompt: "Ouça e escolha a grafia que corresponde a 'pássaro'.",
      audioText: "새",
      fallback:
        "A vogal pode soar muito próxima de ㅔ; aqui o alvo é a grafia 새, com ㅐ.",
      options: [
        { id: "sae", jamo: "새" },
        { id: "se", jamo: "세" },
      ],
      correctOptionId: "sae",
      explanation:
        "새 significa 'pássaro' e usa ㅐ. 세 usa ㅔ e aparece em 세수. O som pode ser praticamente o mesmo.",
      tags: ["diag:vowel-compound", "ㅐ", "pronunciation:merged-ae-e", "listening"],
      srsCards: ["h:jamo:v:ㅐ", "h:syl:새", "h:word:새"],
    },
    {
      id: "h12-e04",
      type: "reading",
      mode: "mcq",
      prompt: "Leia a palavra 세수.",
      text: "세수",
      question: "Quantos blocos silábicos há em 세수?",
      options: [
        { id: "two", label: "2 blocos" },
        { id: "three", label: "3 blocos" },
        { id: "one", label: "1 bloco" },
      ],
      correctOptionId: "two",
      explanation: "세 e 수 são dois blocos. 세 usa ㅔ e 수 usa ㅜ.",
      audioText: "세수",
      tags: ["diag:reading", "ㅔ", "reading", "word"],
      srsCards: ["h:word:세수", "h:syl:세", "h:syl:수"],
    },
    {
      id: "h12-e05",
      type: "cloze",
      prompt: "Complete 베__ para formar 'travesseiro'.",
      answer: "개",
      explanation: "베 + 개 formam 베개 (travesseiro). O segundo bloco usa ㅐ.",
      tags: ["diag:vowel-compound", "ㅐ", "pronunciation:merged-ae-e", "word"],
      srsCards: ["h:word:베개", "h:syl:개", "h:jamo:v:ㅐ"],
    },
    {
      id: "h12-e06",
      type: "reading",
      mode: "mcq",
      prompt: "Leia a palavra 시계.",
      text: "시계",
      question: "Qual é o significado de 시계?",
      options: [
        { id: "clock", label: "relógio" },
        { id: "talk", label: "conversa" },
        { id: "pillow", label: "travesseiro" },
      ],
      correctOptionId: "clock",
      explanation:
        "시계 significa 'relógio'. O segundo bloco é 계, com ㅖ; na fala pode soar [게].",
      audioText: "시계",
      tags: ["diag:reading", "ㅖ", "pronunciation:merged-yae-ye", "reading", "word"],
      srsCards: ["h:word:시계", "h:syl:시", "h:syl:계"],
    },
    {
      id: "h12-e07",
      type: "reading",
      mode: "mcq",
      prompt: "Leia a palavra 얘기.",
      text: "얘기",
      question: "Qual é o significado de 얘기?",
      options: [
        { id: "talk", label: "conversa; história" },
        { id: "clock", label: "relógio" },
        { id: "dog", label: "cachorro" },
      ],
      correctOptionId: "talk",
      explanation: "얘기 significa 'conversa; história'. O primeiro bloco é 얘, com ㅒ.",
      audioText: "얘기",
      tags: ["diag:reading", "ㅒ", "pronunciation:merged-yae-ye", "reading", "word"],
      srsCards: ["h:word:얘기", "h:syl:얘", "h:syl:기"],
    },
    {
      id: "h12-e08",
      type: "mcq",
      prompt: "Qual é a grafia correta para 'cachorro'?",
      options: ["개", "게", "계"],
      correctAnswer: "개",
      explanation:
        "Cachorro é 개, com ㅐ. 게 e 계 existem, mas têm outras funções. A grafia é avaliada independentemente do som.",
      tags: ["diag:vowel-compound", "ㅐ", "pronunciation:merged-ae-e", "orthography"],
      srsCards: ["h:jamo:v:ㅐ", "h:syl:개", "h:word:개"],
    },
    {
      id: "h12-e09",
      type: "mcq",
      prompt: "Qual vogal aparece na palavra 얘기?",
      options: ["ㅒ", "ㅖ", "ㅔ"],
      correctAnswer: "ㅒ",
      explanation:
        "얘기 começa com 얘, formada por ㅇ + ㅒ. 예 usa ㅖ e 에 usa ㅔ.",
      tags: ["diag:vowel-compound", "ㅒ", "pronunciation:merged-yae-ye", "orthography"],
      srsCards: ["h:jamo:v:ㅒ", "h:syl:얘", "h:word:얘기"],
    },
    {
      id: "h12-e10",
      type: "build-syllable",
      prompt: "Monte a sílaba 개.",
      initial: "ㄱ",
      medial: "ㅐ",
      target: "개",
      initialOptions: ["ㄱ", "ㄴ", "ㅅ"],
      medialOptions: ["ㅐ", "ㅔ", "ㅒ"],
      explanation: "ㄱ + ㅐ formam 개, a grafia de 'cachorro'.",
      tags: ["diag:vowel-compound", "ㅐ", "pronunciation:merged-ae-e", "build"],
      srsCards: ["h:jamo:v:ㅐ", "h:syl:개"],
    },
    {
      id: "h12-e11",
      type: "build-syllable",
      prompt: "Monte a sílaba 예.",
      initial: "ㅇ",
      medial: "ㅖ",
      target: "예",
      initialOptions: ["ㅇ"],
      medialOptions: ["ㅖ", "ㅒ", "ㅔ"],
      explanation: "ㅇ + ㅖ formam 예, a forma formal de 'sim'.",
      tags: ["diag:vowel-compound", "ㅖ", "pronunciation:merged-yae-ye", "build"],
      srsCards: ["h:jamo:v:ㅖ", "h:syl:예"],
    },
    {
      id: "h12-e12",
      type: "mcq",
      prompt: "Qual vogal aparece na segunda sílaba de 여우 (raposa)?",
      options: ["ㅜ", "ㅠ", "ㅗ"],
      correctAnswer: "ㅜ",
      explanation:
        "여우 termina com 우, formada por ㅇ + ㅜ. O glide palatal está apenas em 여.",
      tags: ["diag:vowel-compound", "ㅜ", "review", "vowel"],
      srsCards: ["h:jamo:v:ㅜ", "h:word:여우"],
    },
  ],
  estimatedMinutes: 8,
  completion: {
    minScore: 83,
    rules: [
      {
        id: "h12-orthography",
        label: "Acerte os dois itens de ortografia ㅐ/ㅔ e ㅒ/ㅖ",
        exerciseIds: ["h12-e08", "h12-e09"],
        minCorrect: 2,
      },
    ],
  },
  review: {
    status: "in-review",
    notes:
      "A fusão de ㅐ/ㅔ e ㅒ/ㅖ varia por falante e região. Os itens avaliam grafia e leitura; a revisão nativa deve confirmar os exemplos e a tolerância oral.",
  },
};

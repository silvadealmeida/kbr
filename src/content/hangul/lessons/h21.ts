import type { Lesson } from "../types";

export const H21: Lesson = {
  id: "h21",
  unit: 7,
  title: "Ligação (연음)",
  objective:
    "Entender que um batchim seguido de sílaba com ㅇ inicial passa a ser pronunciado no início dessa sílaba, sem mudar a escrita.",
  objectives: [
    "Reconhecer a ligação em palavras como 한국어, 음악 e 밥을.",
    "Explicar por que a escrita não muda.",
    "Aplicar a ligação a finais duplos como ㄺ e ㄵ.",
    "Evitar ligação quando o ㅇ é final ou quando a sílaba seguinte já tem consoante inicial.",
  ],
  intro: [
    {
      title: "O batchim muda de lugar",
      body:
        "Quando uma sílaba termina em batchim e a próxima começa com ㅇ, o som final ocupa o lugar do ㅇ. Em 한국어, o ㄱ de 국 passa para 어: a fala fica 한구거. A escrita continua 한국어.",
      ko: "한국어 → 한구거",
    },
    {
      title: "A ortografia não muda",
      body:
        "Ligação é um fenômeno de pronúncia. Nenhuma letra é acrescentada ou apagada. O app mostra a forma escrita e a forma falada lado a lado para você comparar.",
      ko: "밥을 → 바블",
    },
    {
      title: "Finais duplos e o ㅎ",
      body:
        "Em um final duplo, a segunda parte costuma se mudar: 읽어요 → 일거요 (ㄹ fica, ㄱ passa) e 앉아요 → 안자요 (ㄴ fica, ㅈ passa). Em 좋아요, o ㅎ final cai: 조아요. Essas formas precisam de revisão nativa.",
      ko: "읽어요 → 일거요 · 앉아요 → 안자요",
    },
    {
      title: "Quando não há ligação",
      body:
        "O ㅇ final não se move: 강아지 continua 강아지. E, se a sílaba seguinte já começa com consoante, não há ligação: em 한국말 o ㄱ encontra ㅁ; a nasalização será o assunto de h22.",
      ko: "강아지 · 한국말",
    },
  ],
  prerequisites: ["c3"],
  newJamo: [],
  newFinals: [],
  examples: [
    { kind: "word", id: "word:한국어" },
    { kind: "word", id: "word:음악" },
    { kind: "word", id: "word:밥을" },
    { kind: "word", id: "word:옷을" },
    { kind: "word", id: "word:꽃이" },
    { kind: "word", id: "word:좋아요" },
    { kind: "word", id: "word:읽어요" },
    { kind: "word", id: "word:앉아요" },
    { kind: "word", id: "word:한국말" },
    { kind: "word", id: "word:한국어를" },
  ],
  exercises: [
    {
      id: "h21-e01",
      type: "reading",
      mode: "mcq",
      prompt: "Leia 한국어 e observe o encontro de 국 com 어.",
      text: "한국어",
      question: "Qual pronúncia mostra a ligação?",
      options: [
        { id: "liaison", label: "한구거 — o ㄱ passa para a sílaba 어" },
        { id: "no-liaison", label: "한국어 — o ㄱ permanece no fim de 국" },
        { id: "drop", label: "한구어 — o ㄱ desaparece" },
      ],
      correctOptionId: "liaison",
      explanation:
        "O ㄱ final de 국 passa para o lugar do ㅇ de 어. A escrita não muda; a fala fica 한구거.",
      audioText: "한국어",
      tags: ["diag:liaison", "rule:liaison", "h21", "reading", "word"],
      srsCards: ["h:rule:liaison", "h:word:한국어", "h:syl:국"],
    },
    {
      id: "h21-e02",
      type: "mcq",
      prompt: "Como 음악 soa com a ligação?",
      options: ["으막", "음악", "으마"],
      correctAnswer: "으막",
      explanation: "O ㄱ final de 음 passa para 악: 으막. A escrita permanece 음악.",
      tags: ["diag:liaison", "rule:liaison", "h21", "word"],
      srsCards: ["h:rule:liaison", "h:word:음악", "h:syl:악"],
    },
    {
      id: "h21-e03",
      type: "mcq",
      prompt: "Como 밥을 soa com a ligação?",
      options: ["바블", "밥을", "바브"],
      correctAnswer: "바블",
      explanation: "O ㅂ final de 밥 passa para 을: 바블.",
      tags: ["diag:liaison", "rule:liaison", "h21", "word"],
      srsCards: ["h:rule:liaison", "h:word:밥을", "h:syl:밥"],
    },
    {
      id: "h21-e04",
      type: "mcq",
      prompt: "Como 옷을 soa com a ligação?",
      options: ["오슬", "옷을", "오스"],
      correctAnswer: "오슬",
      explanation: "O ㅅ final de 옷 passa para 을: 오슬.",
      tags: ["diag:liaison", "rule:liaison", "h21", "word"],
      srsCards: ["h:rule:liaison", "h:word:옷을", "h:syl:옷"],
    },
    {
      id: "h21-e05",
      type: "mcq",
      prompt: "Como 꽃이 soa com a ligação?",
      options: ["꼬치", "꽃이", "꼬시"],
      correctAnswer: "꼬치",
      explanation: "O ㅊ final de 꽃 passa para 이 e soa como a inicial de 치: 꼬치.",
      tags: ["diag:liaison", "rule:liaison", "h21", "word"],
      srsCards: ["h:rule:liaison", "h:word:꽃이", "h:syl:꽃"],
    },
    {
      id: "h21-e06",
      type: "mcq",
      prompt: "Como 좋아요 soa?",
      options: ["조아요", "좋아요", "초아요"],
      correctAnswer: "조아요",
      explanation:
        "O ㅎ final de 좋 cai antes da vogal. Não vira ㅊ nem ㅌ: a fala fica 조아요.",
      tags: ["diag:liaison", "rule:liaison", "h21", "word", "ㅎ"],
      srsCards: ["h:rule:liaison", "h:word:좋아요", "h:syl:좋"],
    },
    {
      id: "h21-e07",
      type: "mcq",
      prompt: "Como 읽어요 soa?",
      options: ["일거요", "읽어요", "이거요"],
      correctAnswer: "일거요",
      explanation:
        "Em ㄺ, o ㄹ fica no fim de 읽 e o ㄱ passa para 어: 일거요. A forma 읽어요 é a escrita, não a pronúncia.",
      tags: ["diag:liaison", "rule:liaison", "h21", "word", "batchim-double"],
      srsCards: ["h:rule:liaison", "h:word:읽어요", "h:syl:읽"],
    },
    {
      id: "h21-e08",
      type: "mcq",
      prompt: "Como 앉아요 soa?",
      options: ["안자요", "앉아요", "안아요"],
      correctAnswer: "안자요",
      explanation:
        "Em ㄵ, o ㄴ fica no fim de 앉 e o ㅈ passa para 아: 안자요.",
      tags: ["diag:liaison", "rule:liaison", "h21", "word", "batchim-double"],
      srsCards: ["h:rule:liaison", "h:word:앉아요", "h:syl:앉"],
    },
    {
      id: "h21-e09",
      type: "mcq",
      prompt: "Qual par mostra a ligação correta?",
      options: ["한국어 → 한구거", "한국어 → 한구어", "한국어 → 한국어"],
      correctAnswer: "한국어 → 한구거",
      explanation:
        "O ㄱ não desaparece: ele passa para a sílaba seguinte. Por isso 한구거, não 한구어.",
      tags: ["diag:liaison", "rule:liaison", "h21", "review"],
      srsCards: ["h:rule:liaison", "h:word:한국어"],
    },
    {
      id: "h21-e10",
      type: "mcq",
      prompt: "Quando há ligação, o que acontece com a escrita?",
      options: [
        "Nada; muda apenas a pronúncia",
        "Acrescenta-se uma letra à sílaba seguinte",
        "O batchim é apagado da palavra",
      ],
      correctAnswer: "Nada; muda apenas a pronúncia",
      explanation:
        "Ligação é pronúncia, não ortografia. A palavra continua escrita igual.",
      tags: ["diag:orthography-pronunciation", "rule:liaison", "h21", "concept"],
      srsCards: ["h:rule:liaison"],
    },
    {
      id: "h21-e11",
      type: "mcq",
      prompt: "Por que 강아지 não tem ligação?",
      options: [
        "Porque o ㅇ final de 강 fica [ŋ] e não se move",
        "Porque o ㄱ de 강 passa para 아",
        "Porque toda palavra com ㅇ tem ligação",
      ],
      correctAnswer: "Porque o ㅇ final de 강 fica [ŋ] e não se move",
      explanation:
        "O final ㅇ é nasal [ŋ] e permanece no fim de 강. A sílaba 아 já começa com ㅇ, mas não há consoante final para mover.",
      tags: ["diag:liaison", "rule:liaison", "h21", "negative", "batchim:ㅇ"],
      srsCards: ["h:rule:liaison", "h:word:강아지", "h:syl:강"],
    },
    {
      id: "h21-e12",
      type: "mcq",
      prompt: "O que acontece com o ㄱ de 국 em 한국말?",
      options: [
        "Não há ligação; o ㄱ encontra ㅁ e a nasalização entra em h22",
        "O ㄱ passa para 말 e a fala fica 한구말",
        "O ㄱ vira ㅇ imediatamente",
      ],
      correctAnswer: "Não há ligação; o ㄱ encontra ㅁ e a nasalização entra em h22",
      explanation:
        "Ligação exige ㅇ inicial na sílaba seguinte. Em 말 a inicial é ㅁ; por isso o encontro será tratado pela nasalização.",
      tags: ["diag:liaison", "rule:liaison", "h21", "negative"],
      srsCards: ["h:rule:liaison", "h:word:한국말", "h:syl:말"],
    },
    {
      id: "h21-e13",
      type: "mcq",
      prompt: "Qual é o som final de 밥 antes de uma pausa?",
      options: [
        "[p̚] — lábios fechados, sem soltar ar",
        "[b] — como o b do português",
        "[m] — lábios fechados com som nasal",
      ],
      correctAnswer: "[p̚] — lábios fechados, sem soltar ar",
      explanation:
        "Fora da ligação, o batchim ㅂ fecha os lábios sem soltar ar. Em 밥을, esse ㅂ passa para 을.",
      tags: ["diag:batchim-simple", "rule:liaison", "h21", "review", "batchim:ㅂ"],
      srsCards: ["h:word:밥", "h:syl:밥"],
    },
    {
      id: "h21-e14",
      type: "reading",
      mode: "mcq",
      prompt: "Leia a frase curta 한국어를.",
      text: "한국어를",
      question: "Qual pronúncia mostra a ligação?",
      options: [
        { id: "liaison", label: "한구거를" },
        { id: "no-liaison", label: "한국어를" },
        { id: "drop", label: "한구어를" },
      ],
      correctOptionId: "liaison",
      explanation:
        "한국어 tem a ligação 한구거. O 를 seguinte não muda porque a sílaba 어 não termina em batchim.",
      audioText: "한국어를",
      tags: ["diag:liaison", "rule:liaison", "h21", "reading", "phrase"],
      srsCards: ["h:rule:liaison", "h:word:한국어를"],
    },
  ],
  estimatedMinutes: 8,
  completion: {
    minScore: 79,
    minCorrect: 11,
    rules: [
      {
        id: "h21-liaison-examples",
        label: "Acerte pelo menos 5 dos 8 exemplos de ligação",
        exerciseIds: [
          "h21-e01",
          "h21-e02",
          "h21-e03",
          "h21-e04",
          "h21-e05",
          "h21-e06",
          "h21-e07",
          "h21-e08",
        ],
        minCorrect: 5,
      },
    ],
  },
  review: {
    status: "in-review",
    notes:
      "Toda a regra de ligação e os exemplos precisam de revisão nativa. Correção registrada: 읽어요 soa 일거요 (o ㄹ fica e o ㄱ passa) e 앉아요 soa 안자요 (o ㅈ passa); o texto anterior do currículo descrevia esses dois casos de forma inconsistente. A transcrição didática não substitui IPA nem avaliação de fala.",
  },
};

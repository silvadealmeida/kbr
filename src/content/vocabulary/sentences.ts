import type { VocabSentence } from "./types";

const review = {
  status: "in-review",
  notes: "Frase original do KBR; naturalidade e tradução aguardam revisão de falante nativo.",
} as const;

type Row = readonly [target: string, ko: string, pt: string, contextMeaning: string];

/**
 * Corpus pequeno e deliberado de frases originais. Cada alvo é uma palavra já
 * apresentada no módulo Hangul; o restante da frase é contexto, não vocabulário
 * ensinado. Não é um corpus de cobertura: palavras sem frase usam cartão simples.
 */
const ROWS: readonly Row[] = [
  ["커피", "저는 커피를 좋아해요.", "Eu gosto de café.", "café"],
  ["사과", "저는 사과를 먹어요.", "Eu como maçã.", "maçã"],
  ["물", "물을 마셔요.", "Eu bebo água.", "água"],
  ["엄마", "우리 엄마는 의사예요.", "Minha mãe é médica.", "mãe (informal: mamãe)"],
  ["학생", "저는 학생이에요.", "Eu sou estudante.", "estudante"],
  ["아버지", "아버지는 회사에 가요.", "O pai vai à empresa.", "pai"],
  ["책", "저는 책을 읽어요.", "Eu leio um livro.", "livro"],
  ["고양이", "고양이가 의자 위에 있어요.", "O gato está em cima da cadeira.", "gato"],
  ["강아지", "강아지가 귀여워요.", "O cachorrinho é fofo.", "cachorrinho"],
  ["한국어", "저는 한국어를 공부해요.", "Eu estudo coreano.", "coreano (a língua)"],
  ["바다", "바다에 가요.", "Eu vou ao mar.", "mar"],
  ["음악", "음악을 들어요.", "Eu escuto música.", "música"],
  ["꽃", "꽃이 예뻐요.", "A flor é bonita.", "flor"],
  ["밥", "밥을 먹어요.", "Eu como arroz.", "arroz (refeição)"],
  ["눈", "눈이 와요.", "Está nevando.", "neve"],
  ["전화", "친구에게 전화를 해요.", "Eu ligo para um amigo.", "ligação telefônica"],
  ["사람", "저 사람은 학생이에요.", "Aquela pessoa é estudante.", "pessoa"],
  ["우유", "우유를 마셔요.", "Eu bebo leite.", "leite"],
  ["의자", "이 의자는 커요.", "Esta cadeira é grande.", "cadeira"],
  ["문", "문을 열어요.", "Eu abro a porta.", "porta"],
  ["서울", "저는 서울에 살아요.", "Eu moro em Seul.", "Seul"],
  ["시계", "시계가 있어요.", "Há um relógio.", "relógio"],
  ["옷", "이 옷은 싸요.", "Esta roupa é barata.", "roupa"],
  ["차", "저는 차를 마셔요.", "Eu bebo chá.", "chá"],
  ["공부", "매일 공부를 해요.", "Eu estudo todos os dias.", "estudo"],
];

export const VOCAB_SENTENCES: readonly VocabSentence[] = ROWS.map(
  ([target, ko, pt, contextMeaning], index) => ({
    id: `sent:${target}:${index + 1}`,
    vocabId: `ko:${target}`,
    ko,
    pt,
    target,
    contextMeaning,
    review,
  }),
);

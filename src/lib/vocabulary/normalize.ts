import type { VocabEntry, VocabSentence } from "@/content/vocabulary";

/**
 * Normalização conservadora: Unicode NFC (teclados que enviam jamo decomposto),
 * sem caracteres invisíveis e sem espaços nas pontas. Não remove partículas,
 * não converte jamo de compatibilidade e não faz comparação aproximada.
 */
export function normalizeKorean(value: string): string {
  return value
    .normalize("NFC")
    .replace(/[​-‍⁠﻿]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

export type AnswerCheck = { empty: boolean; correct: boolean };

/** Confere a resposta digitada com o alvo e as variantes registradas (igualdade exata). */
export function checkVocabAnswer(sentence: VocabSentence, input: string): AnswerCheck {
  const typed = normalizeKorean(input);
  if (typed === "") return { empty: true, correct: false };
  const accepted = [sentence.target, ...(sentence.accepted ?? [])].map(normalizeKorean);
  return { empty: false, correct: accepted.includes(typed) };
}

export function fillSentence(sentence: Pick<VocabSentence, "ko" | "target">, replacement: string): string {
  return sentence.ko.replace(sentence.target, replacement);
}

const INITIALS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";

/** Pista: nº de sílabas e a consoante inicial. Nunca revela a palavra inteira. */
export function hintFor(entry: Pick<VocabEntry, "ko">): string {
  const syllables = [...entry.ko];
  const code = entry.ko.codePointAt(0)! - 0xac00;
  const initial = INITIALS[Math.floor(code / 588)];
  const count = `${syllables.length} ${syllables.length === 1 ? "sílaba" : "sílabas"}`;
  return initial === "ㅇ"
    ? `${count}; a primeira começa com vogal (ㅇ mudo).`
    : `${count}; a primeira começa com ${initial}.`;
}

/**
 * Composição de sílabas para o teclado virtual coreano (2-beolsik simplificado).
 *
 * As funções são puras: recebem o valor atual do campo e uma tecla e devolvem o
 * novo valor. O texto latino, os espaços e a pontuação são preservados.
 */
import {
  INITIALS,
  MEDIALS,
  composeSyllable,
  decomposeSyllable,
  isFinal,
  isInitial,
  isMedial,
  type Final,
  type Initial,
  type Medial,
  type SyllableParts,
} from "./index";

/** Vogais compostas formadas por duas teclas de vogal em sequência. */
const COMPOUND_MEDIALS: Readonly<Record<string, Medial>> = {
  "ㅗㅏ": "ㅘ",
  "ㅗㅐ": "ㅙ",
  "ㅗㅣ": "ㅚ",
  "ㅜㅓ": "ㅝ",
  "ㅜㅔ": "ㅞ",
  "ㅜㅣ": "ㅟ",
  "ㅡㅣ": "ㅢ",
};

/** Consoantes finais compostas formadas por duas teclas de consoante. */
const COMPOUND_FINALS: Readonly<Record<string, Final>> = {
  "ㄱㅅ": "ㄳ",
  "ㄴㅈ": "ㄵ",
  "ㄴㅎ": "ㄶ",
  "ㄹㄱ": "ㄺ",
  "ㄹㅁ": "ㄻ",
  "ㄹㅂ": "ㄼ",
  "ㄹㅅ": "ㄽ",
  "ㄹㅌ": "ㄾ",
  "ㄹㅍ": "ㄿ",
  "ㄹㅎ": "ㅀ",
  "ㅂㅅ": "ㅄ",
};

/** Como uma vogal divide uma final composta em duas sílabas (닭 + 아 → 달가). */
const SPLIT_FINALS: Readonly<Record<string, readonly [Final, Initial]>> = {
  ㄳ: ["ㄱ", "ㅅ"],
  ㄵ: ["ㄴ", "ㅈ"],
  ㄶ: ["ㄴ", "ㅎ"],
  ㄺ: ["ㄹ", "ㄱ"],
  ㄻ: ["ㄹ", "ㅁ"],
  ㄼ: ["ㄹ", "ㅂ"],
  ㄽ: ["ㄹ", "ㅅ"],
  ㄾ: ["ㄹ", "ㅌ"],
  ㄿ: ["ㄹ", "ㅍ"],
  ㅀ: ["ㄹ", "ㅎ"],
  ㅄ: ["ㅂ", "ㅅ"],
};

/** Como o backspace desfaz uma vogal composta. */
const SPLIT_MEDIALS: Readonly<Record<string, Medial>> = {
  "ㅘ": "ㅗ",
  "ㅙ": "ㅗ",
  "ㅚ": "ㅗ",
  "ㅝ": "ㅜ",
  "ㅞ": "ㅜ",
  "ㅟ": "ㅜ",
  "ㅢ": "ㅡ",
};

function lastParts(value: string): { char: string; parts: SyllableParts } | null {
  const char = [...value].at(-1);
  if (!char) return null;
  const parts = decomposeSyllable(char);
  return parts ? { char, parts } : null;
}

function replaceLast(value: string, next: string): string {
  const chars = [...value];
  chars.pop();
  return `${chars.join("")}${next}`;
}

function appendSyllable(initial: Initial, medial: Medial, final: Final = ""): string {
  return composeSyllable(initial, medial, final);
}

function insertConsonant(value: string, jamo: string): string {
  const last = lastParts(value);

  if (last) {
    const { parts } = last;
    if (parts.final === "") {
      if (isFinal(jamo)) {
        return replaceLast(value, appendSyllable(parts.initial, parts.medial, jamo));
      }
      return `${value}${jamo}`;
    }

    const compound = COMPOUND_FINALS[`${parts.final}${jamo}`];
    if (compound) {
      return replaceLast(value, appendSyllable(parts.initial, parts.medial, compound));
    }
    return `${value}${jamo}`;
  }

  // Vogal sozinha + consoante final: ㅏ + ㄱ → 악.
  const char = [...value].at(-1);
  if (char && isMedial(char) && isFinal(jamo)) {
    return replaceLast(value, appendSyllable("ㅇ", char, jamo));
  }

  return `${value}${jamo}`;
}

function insertVowel(value: string, jamo: Medial): string {
  const last = lastParts(value);

  if (last) {
    const { parts } = last;
    if (parts.final === "") {
      const compound = COMPOUND_MEDIALS[`${parts.medial}${jamo}`];
      if (compound) {
        return replaceLast(value, appendSyllable(parts.initial, compound));
      }
      return `${value}${appendSyllable("ㅇ", jamo)}`;
    }

    const split = SPLIT_FINALS[parts.final];
    if (split) {
      return `${replaceLast(
        value,
        appendSyllable(parts.initial, parts.medial, split[0]),
      )}${appendSyllable(split[1], jamo)}`;
    }
    if (isInitial(parts.final)) {
      return `${replaceLast(
        value,
        appendSyllable(parts.initial, parts.medial),
      )}${appendSyllable(parts.final, jamo)}`;
    }
    return `${value}${appendSyllable("ㅇ", jamo)}`;
  }

  const char = [...value].at(-1);
  if (char && isInitial(char)) {
    return replaceLast(value, appendSyllable(char, jamo));
  }
  if (char && isMedial(char)) {
    const compound = COMPOUND_MEDIALS[`${char}${jamo}`];
    return replaceLast(value, compound ?? jamo);
  }

  return `${value}${jamo}`;
}

/** Insere uma tecla de jamo no fim do texto, compondo a sílaba quando possível. */
export function insertJamo(value: string, jamo: string): string {
  if (isInitial(jamo)) return insertConsonant(value, jamo);
  if (isMedial(jamo)) return insertVowel(value, jamo);
  return `${value}${jamo}`;
}

/**
 * Remove a última unidade digitada: sílaba vira a sílaba sem batchim, batchim
 * composto volta ao primeiro componente e assim por diante.
 */
export function backspaceJamo(value: string): string {
  const last = lastParts(value);

  if (last) {
    const { parts } = last;
    if (parts.final !== "") {
      const split = SPLIT_FINALS[parts.final];
      return replaceLast(
        value,
        appendSyllable(parts.initial, parts.medial, split ? split[0] : ""),
      );
    }

    const split = SPLIT_MEDIALS[parts.medial];
    if (split) {
      return replaceLast(value, appendSyllable(parts.initial, split));
    }

    return replaceLast(value, parts.initial);
  }

  const chars = [...value];
  chars.pop();
  return chars.join("");
}

/** Espaço comum, sem tentar compor a sílaba pendente. */
export function insertSpace(value: string): string {
  return `${value} `;
}

/** Consoantes e vogais na ordem de exibição do teclado. */
export const KEYBOARD_CONSONANTS = INITIALS;
export const KEYBOARD_VOWELS = MEDIALS;

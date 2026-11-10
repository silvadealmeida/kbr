const HANGUL_BASE = 0xac00;
const MEDIAL_COUNT = 21;
const FINAL_COUNT = 28;

export const INITIALS = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
] as const;

export const MEDIALS = [
  "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ",
] as const;

export const FINALS = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
] as const;

export type Initial = (typeof INITIALS)[number];
export type Medial = (typeof MEDIALS)[number];
export type Final = (typeof FINALS)[number];

export function isInitial(value: string): value is Initial {
  return (INITIALS as readonly string[]).includes(value);
}

export function isMedial(value: string): value is Medial {
  return (MEDIALS as readonly string[]).includes(value);
}

export function isFinal(value: string): value is Final {
  return (FINALS as readonly string[]).includes(value);
}

export function composeSyllable(initial: string, medial: string, final = ""): string {
  const initialIndex = (INITIALS as readonly string[]).indexOf(initial);
  const medialIndex = (MEDIALS as readonly string[]).indexOf(medial);
  const finalIndex = (FINALS as readonly string[]).indexOf(final);

  if (initialIndex < 0 || medialIndex < 0 || finalIndex < 0) {
    throw new RangeError("Jamo inválido para composição de uma sílaba Hangul");
  }

  return String.fromCodePoint(
    HANGUL_BASE + (initialIndex * MEDIAL_COUNT + medialIndex) * FINAL_COUNT + finalIndex,
  );
}

export function isHangulSyllable(value: string): boolean {
  if ([...value].length !== 1) return false;

  const codePoint = value.codePointAt(0);
  return codePoint !== undefined && codePoint >= HANGUL_BASE && codePoint <= 0xd7a3;
}

export type SyllableParts = {
  initial: Initial;
  medial: Medial;
  final: Final;
};

/** Decompõe uma sílaba Hangul pré-composta; retorna `null` para qualquer outro texto. */
export function decomposeSyllable(value: string): SyllableParts | null {
  if (!isHangulSyllable(value)) return null;

  const offset = value.codePointAt(0)! - HANGUL_BASE;
  const initialIndex = Math.floor(offset / (MEDIAL_COUNT * FINAL_COUNT));
  const medialIndex = Math.floor((offset % (MEDIAL_COUNT * FINAL_COUNT)) / FINAL_COUNT);
  const finalIndex = offset % FINAL_COUNT;

  return {
    initial: INITIALS[initialIndex]!,
    medial: MEDIALS[medialIndex]!,
    final: FINALS[finalIndex]!,
  };
}

/** Normaliza texto coreano para NFC sem alterar espaços ou caixa. */
export function normalizeHangul(value: string): string {
  return value.normalize("NFC");
}

/**
 * Verdadeiro quando o texto contém apenas sílabas Hangul pré-compostas e espaços.
 * Jamo solto, conjoining jamo, hanja e latim são rejeitados.
 */
export function isHangulText(value: string): boolean {
  if (value.length === 0) return false;
  return [...value].every((char) => char === " " || isHangulSyllable(char));
}

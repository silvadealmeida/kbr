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

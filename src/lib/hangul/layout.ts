import type { Medial } from "./index";

/**
 * Geometria de composição da vogal dentro do bloco silábico.
 *
 * - vertical: ocupa a direita da consoante inicial (ㅏ, ㅓ, ㅣ…);
 * - horizontal: ocupa a base, abaixo da inicial (ㅗ, ㅜ, ㅡ…);
 * - compound: combina uma base horizontal com um traço vertical à direita
 *   (ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ).
 */
export type MedialShape =
  | { kind: "vertical" }
  | { kind: "horizontal" }
  | { kind: "compound"; base: Medial; side: Medial };

const HORIZONTAL = new Set<Medial>(["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"]);

const COMPOUND: Partial<Record<Medial, { base: Medial; side: Medial }>> = {
  "ㅘ": { base: "ㅗ", side: "ㅏ" },
  "ㅙ": { base: "ㅗ", side: "ㅐ" },
  "ㅚ": { base: "ㅗ", side: "ㅣ" },
  "ㅝ": { base: "ㅜ", side: "ㅓ" },
  "ㅞ": { base: "ㅜ", side: "ㅔ" },
  "ㅟ": { base: "ㅜ", side: "ㅣ" },
  "ㅢ": { base: "ㅡ", side: "ㅣ" },
};

export function medialShape(medial: Medial): MedialShape {
  const compound = COMPOUND[medial];
  if (compound) return { kind: "compound", ...compound };
  if (HORIZONTAL.has(medial)) return { kind: "horizontal" };
  return { kind: "vertical" };
}

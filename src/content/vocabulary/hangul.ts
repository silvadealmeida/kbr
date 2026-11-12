import { WORDS } from "@/content/hangul/syllables";
import type { WordRecord } from "@/content/hangul/types";
import type { VocabEntry, VocabPos } from "./types";

/**
 * Registros de `WORDS` que NÃO são vocabulário: formas flexionadas ou com
 * partícula (o aluno aprende o dicionário) e uma palavra cuja tradução ainda
 * precisa de confirmação (`곬`, ver roadmap).
 */
const NOT_VOCABULARY = new Set([
  "밥을", "옷을", "꽃이", "입이", "한국어를", "좋아요", "읽어요", "앉아요",
  "먹는다", "잡는", "받는다", "축하해요", "입니다", "십만", "곬",
].map((ko) => `word:${ko}`));

const POS_BY_TAG: Record<string, VocabPos> = {
  noun: "substantivo",
  verb: "verbo",
  pronoun: "pronome",
  adverb: "advérbio",
  interjection: "interjeição",
  numeral: "numeral",
};

function toEntry(word: WordRecord): VocabEntry {
  const tag = word.tags.find((t) => t in POS_BY_TAG);
  return {
    id: `ko:${word.ko}`,
    ko: word.ko,
    pt: word.pt,
    ...(tag ? { pos: POS_BY_TAG[tag] } : {}),
    course: "hangul",
    lesson: word.introducedIn,
    audioText: word.audioText ?? word.ko,
    ...(word.notes ? { notes: word.notes } : {}),
    review: word.review,
  };
}

/** Vocabulário do módulo Hangul: derivado de `WORDS`, sem duplicar dados. */
export const HANGUL_VOCABULARY: readonly VocabEntry[] = WORDS.filter(
  (word) => !NOT_VOCABULARY.has(word.id),
).map(toEntry);

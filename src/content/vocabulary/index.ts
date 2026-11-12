import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import { A1_LESSON_IDS } from "@/content/curriculum/a1/ids";
import { HANGUL_VOCABULARY } from "./hangul";
import { VOCAB_SENTENCES } from "./sentences";
import { validateVocabulary } from "./validate";
import type { VocabEntry, VocabSentence } from "./types";

export type * from "./types";
export { targetPosition, validateVocabulary, type VocabIssue } from "./validate";

/**
 * Registro canônico. Um curso novo (A1…) entrega seu array de `VocabEntry` e
 * suas frases aqui; ver docs/vocabulary/content-schema.md.
 */
export const VOCAB_ENTRIES: readonly VocabEntry[] = [...HANGUL_VOCABULARY];
export { VOCAB_SENTENCES };

/** Lições/checkpoints existentes por curso, para validar referências. */
export const COURSE_LESSON_IDS: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ["hangul", new Set<string>([...LESSONS.map((l) => l.id), ...CHECKPOINTS.map((c) => c.id)])],
  ["ko-a1", A1_LESSON_IDS],
]);

const BY_ID = new Map(VOCAB_ENTRIES.map((e) => [e.id, e]));
export const getVocab = (id: string): VocabEntry | undefined => BY_ID.get(id);

export function sentencesFor(vocabId: string): readonly VocabSentence[] {
  return VOCAB_SENTENCES.filter((s) => s.vocabId === vocabId);
}

export function vocabForLesson(course: string, lesson: string): readonly VocabEntry[] {
  return VOCAB_ENTRIES.filter((e) => e.course === course && e.lesson === lesson);
}

export function assertVocabulary(): void {
  const issues = validateVocabulary(VOCAB_ENTRIES, VOCAB_SENTENCES, COURSE_LESSON_IDS);
  if (issues.length) throw new Error(issues.map((i) => `${i.id}: ${i.message}`).join("\n"));
}

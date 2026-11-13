import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import { A1_LESSON_IDS } from "@/content/curriculum/a1/ids";
import { A2_STEP_IDS } from "@/content/curriculum/a2/ids";
import { B1_STEP_IDS } from "@/content/curriculum/b1/ids";
import { B2_STEP_IDS } from "@/content/curriculum/b2/ids";
import { C1_STEP_IDS } from "@/content/curriculum/c1/ids";
import { C2_STEP_IDS } from "@/content/curriculum/c2/ids";
import { A1_VOCABULARY, A1_VOCAB_SENTENCES } from "./a1";
import {
  A1_COURSE_SENTENCES,
  A1_COURSE_VOCABULARY,
} from "./a1-course";
import {
  A2_COURSE_SENTENCES,
  A2_COURSE_VOCABULARY,
} from "./a2-course";
import {
  B1_COURSE_SENTENCES,
  B1_COURSE_VOCABULARY,
} from "./b1-course";
import {
  B2_COURSE_SENTENCES,
  B2_COURSE_VOCABULARY,
} from "./b2-course";
import {
  C1_COURSE_SENTENCES,
  C1_COURSE_VOCABULARY,
} from "./c1-course";
import {
  C2_COURSE_SENTENCES,
  C2_COURSE_VOCABULARY,
} from "./c2-course";
import { HANGUL_VOCABULARY } from "./hangul";
import { VOCAB_SENTENCES as HANGUL_VOCAB_SENTENCES } from "./sentences";
import { validateVocabulary } from "./validate";
import type { VocabEntry, VocabSentence } from "./types";

export type * from "./types";
export {
  A1_COURSE_SENTENCES,
  A1_COURSE_VOCABULARY,
  newVocabFormsFor,
  newVocabIdsFor,
  sentenceIdsFor,
} from "./a1-course";
export { targetPosition, validateVocabulary, type VocabIssue } from "./validate";

/**
 * Registro canônico. Um curso novo (A1…) entrega seu array de `VocabEntry` e
 * suas frases aqui; ver docs/vocabulary/content-schema.md.
 */
export const VOCAB_ENTRIES: readonly VocabEntry[] = [
  ...HANGUL_VOCABULARY,
  ...A1_VOCABULARY,
  ...A1_COURSE_VOCABULARY,
  ...A2_COURSE_VOCABULARY,
  ...B1_COURSE_VOCABULARY,
  ...B2_COURSE_VOCABULARY,
  ...C1_COURSE_VOCABULARY,
  ...C2_COURSE_VOCABULARY,
];
export const VOCAB_SENTENCES: readonly VocabSentence[] = [
  ...HANGUL_VOCAB_SENTENCES,
  ...A1_VOCAB_SENTENCES,
  ...A1_COURSE_SENTENCES,
  ...A2_COURSE_SENTENCES,
  ...B1_COURSE_SENTENCES,
  ...B2_COURSE_SENTENCES,
  ...C1_COURSE_SENTENCES,
  ...C2_COURSE_SENTENCES,
];

/** Lições/checkpoints existentes por curso, para validar referências. */
export const COURSE_LESSON_IDS: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ["hangul", new Set<string>([...LESSONS.map((l) => l.id), ...CHECKPOINTS.map((c) => c.id)])],
  ["ko-a1", A1_LESSON_IDS],
  ["ko-a2", A2_STEP_IDS],
  ["ko-b1", B1_STEP_IDS],
  ["ko-b2", B2_STEP_IDS],
  ["ko-c1", C1_STEP_IDS],
  ["ko-c2", C2_STEP_IDS],
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

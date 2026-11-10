import { CHECKPOINTS } from "./checkpoints";
import { JAMO } from "./jamo";
import { LESSONS } from "./lessons";
import { SYLLABLES, WORDS } from "./syllables";
import type { Curriculum } from "./types";

export type * from "./types";
export { COURSE_OUTLINE } from "./outline";
export { JAMO } from "./jamo";
export { CHECKPOINTS, IMPLEMENTED_CHECKPOINT_IDS, getCheckpoint } from "./checkpoints";
export { IMPLEMENTED_LESSON_IDS, LESSONS, getLesson } from "./lessons";
export { SYLLABLES, WORDS } from "./syllables";
export { assertCurriculum, validateCurriculum, type ContentIssue } from "./validate";

/**
 * Fatia do currículo implementada na Fase 3B.2. As regras de fronteira
 * entram em h21–h23; o formato já é o da especificação.
 */
export const HANGUL_CURRICULUM: Curriculum = {
  version: 1,
  lessons: LESSONS,
  checkpoints: CHECKPOINTS,
  jamo: JAMO,
  syllables: SYLLABLES,
  words: WORDS,
  rules: [],
};

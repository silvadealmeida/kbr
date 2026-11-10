import { CHECKPOINTS } from "./checkpoints";
import { JAMO } from "./jamo";
import { LESSONS } from "./lessons";
import { RULES } from "./rules";
import { SYLLABLES, WORDS } from "./syllables";
import type { Curriculum } from "./types";

export type * from "./types";
export { COURSE_OUTLINE } from "./outline";
export { JAMO } from "./jamo";
export { CHECKPOINTS, IMPLEMENTED_CHECKPOINT_IDS, getCheckpoint } from "./checkpoints";
export { IMPLEMENTED_LESSON_IDS, LESSONS, getLesson } from "./lessons";
export { RULES } from "./rules";
export { SYLLABLES, WORDS } from "./syllables";
export { assertCurriculum, validateCurriculum, type ContentIssue } from "./validate";

/**
 * Currículo completo do módulo Hangul: 25 lições e 4 checkpoints.
 * As regras de fronteira são declaradas em `rules` e entram em h21–h23.
 */
export const HANGUL_CURRICULUM: Curriculum = {
  version: 1,
  lessons: LESSONS,
  checkpoints: CHECKPOINTS,
  jamo: JAMO,
  syllables: SYLLABLES,
  words: WORDS,
  rules: RULES,
};

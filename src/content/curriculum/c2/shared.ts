import type { ReviewMeta } from "@/content/hangul/types";
import {
  cloze,
  defineAdvancedCheckpoint,
  defineAdvancedLesson,
  listen,
  mcq,
  reading,
  translate,
  type AdvancedExerciseDraft,
} from "../advanced/shared";
import {
  c2SentenceIdsFor,
  newC2VocabIdsFor,
} from "@/content/vocabulary/c2-course";
import type { CourseCheckpointContent, CourseLessonContent } from "../course-types";

const REVIEW_NOTES =
  "Conteúdo original do KBR para o curso C2; naturalidade, tradução, registro e adequação pedagógica aguardam revisão de falante nativo.";

export const review: ReviewMeta = { status: "in-review", notes: REVIEW_NOTES };

const options = {
  review,
  newVocabIdsFor: newC2VocabIdsFor,
  sentenceIdsFor: c2SentenceIdsFor,
};

export type C2ExerciseDraft = AdvancedExerciseDraft;

export function defineC2Lesson(
  input: Parameters<typeof defineAdvancedLesson>[0],
): CourseLessonContent {
  return defineAdvancedLesson(input, options);
}

export function defineC2Checkpoint(
  input: Parameters<typeof defineAdvancedCheckpoint>[0],
): CourseCheckpointContent {
  return defineAdvancedCheckpoint(input, options);
}

export { cloze, listen, mcq, reading, translate };

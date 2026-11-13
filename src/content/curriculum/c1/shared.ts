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
  c1SentenceIdsFor,
  newC1VocabIdsFor,
} from "@/content/vocabulary/c1-course";
import type { CourseCheckpointContent, CourseLessonContent } from "../course-types";

const REVIEW_NOTES =
  "Conteúdo original do KBR para o curso C1; naturalidade, tradução, registro e adequação pedagógica aguardam revisão de falante nativo.";

export const review: ReviewMeta = { status: "in-review", notes: REVIEW_NOTES };

const options = {
  review,
  newVocabIdsFor: newC1VocabIdsFor,
  sentenceIdsFor: c1SentenceIdsFor,
};

export type C1ExerciseDraft = AdvancedExerciseDraft;

export function defineC1Lesson(
  input: Parameters<typeof defineAdvancedLesson>[0],
): CourseLessonContent {
  return defineAdvancedLesson(input, options);
}

export function defineC1Checkpoint(
  input: Parameters<typeof defineAdvancedCheckpoint>[0],
): CourseCheckpointContent {
  return defineAdvancedCheckpoint(input, options);
}

export { cloze, listen, mcq, reading, translate };

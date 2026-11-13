import {
  validateAdvancedCheckpointContent,
  validateAdvancedLessonContent,
} from "../advanced/validate-content";
import type { AdvancedContentStandards } from "../advanced/types";
import type { VocabEntry, VocabSentence } from "@/content/vocabulary/types";
import type { C1CurriculumBlueprint, C1CheckpointContent, C1LessonContent } from "./types";

export const C1_CONTENT_STANDARDS: AdvancedContentStandards = {
  courseId: "ko-c1",
  readingMinCharacters: 420,
  readingMinParagraphs: 3,
  rubricCriteria: ["task", "organization", "vocabulary", "grammar", "argument", "synthesis"],
  checkpointFinalId: "c1-c08",
};

export function validateC1LessonContent(
  content: readonly C1LessonContent[],
  blueprint: C1CurriculumBlueprint,
  entries: readonly VocabEntry[],
  sentences: readonly VocabSentence[],
) {
  return validateAdvancedLessonContent(
    content,
    blueprint,
    entries,
    sentences,
    C1_CONTENT_STANDARDS,
  );
}

export function validateC1CheckpointContent(
  checkpoints: readonly C1CheckpointContent[],
  blueprint: C1CurriculumBlueprint,
  lessons: readonly C1LessonContent[],
) {
  return validateAdvancedCheckpointContent(
    checkpoints,
    blueprint,
    lessons,
    C1_CONTENT_STANDARDS,
  );
}

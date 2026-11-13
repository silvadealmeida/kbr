import {
  validateAdvancedCheckpointContent,
  validateAdvancedLessonContent,
} from "../advanced/validate-content";
import type { AdvancedContentStandards } from "../advanced/types";
import type { VocabEntry, VocabSentence } from "@/content/vocabulary/types";
import type { C2CurriculumBlueprint, C2CheckpointContent, C2LessonContent } from "./types";

export const C2_CONTENT_STANDARDS: AdvancedContentStandards = {
  courseId: "ko-c2",
  readingMinCharacters: 500,
  readingMinParagraphs: 3,
  rubricCriteria: ["task", "organization", "vocabulary", "grammar", "argument", "mediation"],
  checkpointFinalId: "c2-c08",
};

export function validateC2LessonContent(
  content: readonly C2LessonContent[],
  blueprint: C2CurriculumBlueprint,
  entries: readonly VocabEntry[],
  sentences: readonly VocabSentence[],
) {
  return validateAdvancedLessonContent(
    content,
    blueprint,
    entries,
    sentences,
    C2_CONTENT_STANDARDS,
  );
}

export function validateC2CheckpointContent(
  checkpoints: readonly C2CheckpointContent[],
  blueprint: C2CurriculumBlueprint,
  lessons: readonly C2LessonContent[],
) {
  return validateAdvancedCheckpointContent(
    checkpoints,
    blueprint,
    lessons,
    C2_CONTENT_STANDARDS,
  );
}

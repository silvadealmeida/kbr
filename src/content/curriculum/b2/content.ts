import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { B2_CURRICULUM } from "./blueprint";
import { B2_C01 } from "./checkpoints/b2-c01";
import { B2_L01, B2_L02, B2_L03, B2_L04, B2_L05 } from "./lessons/module1";
import type { B2CheckpointContent, B2ContentIssue, B2LessonContent } from "./types";
import { validateB2CheckpointContent, validateB2LessonContent } from "./validate-content";

export const B2_IMPLEMENTED_LESSONS: readonly B2LessonContent[] = [
  B2_L01, B2_L02, B2_L03, B2_L04, B2_L05,
];

export const B2_IMPLEMENTED_CHECKPOINTS: readonly B2CheckpointContent[] = [
  B2_C01,
];

const LESSON_BY_ID = new Map(B2_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(B2_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

export function getB2Lesson(id: string): B2LessonContent | undefined { return LESSON_BY_ID.get(id); }
export function getB2Checkpoint(id: string): B2CheckpointContent | undefined { return CHECKPOINT_BY_ID.get(id); }
export function isB2LessonImplemented(id: string): boolean { return LESSON_BY_ID.has(id); }
export function isB2CheckpointImplemented(id: string): boolean { return CHECKPOINT_BY_ID.has(id); }

export function validateB2Content(): B2ContentIssue[] {
  return [
    ...validateB2LessonContent(B2_IMPLEMENTED_LESSONS, B2_CURRICULUM, VOCAB_ENTRIES, VOCAB_SENTENCES),
    ...validateB2CheckpointContent(B2_IMPLEMENTED_CHECKPOINTS, B2_CURRICULUM, B2_IMPLEMENTED_LESSONS),
  ];
}

export function assertB2Content(): void {
  const issues = validateB2Content();
  if (issues.length > 0) {
    throw new Error(`Conteúdo B2 inválido:\n${issues.map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`).join("\n")}`);
  }
}

assertB2Content();

import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { A2_CURRICULUM } from "./blueprint";
import { A2_C01 } from "./checkpoints/a2-c01";
import { A2_C02 } from "./checkpoints/a2-c02";
import { A2_C03 } from "./checkpoints/a2-c03";
import { A2_C04 } from "./checkpoints/a2-c04";
import { A2_L01 } from "./lessons/a2-l01";
import { A2_L02 } from "./lessons/a2-l02";
import { A2_L03 } from "./lessons/a2-l03";
import { A2_L04 } from "./lessons/a2-l04";
import { A2_L05 } from "./lessons/a2-l05";
import { A2_L06 } from "./lessons/a2-l06";
import { A2_L07 } from "./lessons/a2-l07";
import { A2_L08 } from "./lessons/a2-l08";
import { A2_L09 } from "./lessons/a2-l09";
import { A2_L10 } from "./lessons/a2-l10";
import { A2_L11 } from "./lessons/a2-l11";
import { A2_L12 } from "./lessons/a2-l12";
import { A2_L13 } from "./lessons/a2-l13";
import { A2_L14 } from "./lessons/a2-l14";
import { A2_L15 } from "./lessons/a2-l15";
import { A2_L16 } from "./lessons/a2-l16";
import { A2_L17 } from "./lessons/a2-l17";
import { A2_L18 } from "./lessons/a2-l18";
import { A2_L19 } from "./lessons/a2-l19";
import { A2_L20 } from "./lessons/a2-l20";
import type { A2CheckpointContent, A2ContentIssue, A2LessonContent } from "./types";
import {
  validateA2CheckpointContent,
  validateA2LessonContent,
} from "./validate-content";

/** Lições A2 implementadas. O registro cresce por módulo validado. */
export const A2_IMPLEMENTED_LESSONS: readonly A2LessonContent[] = [
  A2_L01,
  A2_L02,
  A2_L03,
  A2_L04,
  A2_L05,
  A2_L06,
  A2_L07,
  A2_L08,
  A2_L09,
  A2_L10,
  A2_L11,
  A2_L12,
  A2_L13,
  A2_L14,
  A2_L15,
  A2_L16,
  A2_L17,
  A2_L18,
  A2_L19,
  A2_L20,
];

export const A2_IMPLEMENTED_CHECKPOINTS: readonly A2CheckpointContent[] = [
  A2_C01,
  A2_C02,
  A2_C03,
  A2_C04,
];

const LESSON_BY_ID = new Map(A2_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(
  A2_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]),
);

export function getA2Lesson(lessonId: string): A2LessonContent | undefined {
  return LESSON_BY_ID.get(lessonId);
}

export function getA2Checkpoint(
  checkpointId: string,
): A2CheckpointContent | undefined {
  return CHECKPOINT_BY_ID.get(checkpointId);
}

export function isA2LessonImplemented(lessonId: string): boolean {
  return LESSON_BY_ID.has(lessonId);
}

export function isA2CheckpointImplemented(checkpointId: string): boolean {
  return CHECKPOINT_BY_ID.has(checkpointId);
}

export function validateA2Content(): A2ContentIssue[] {
  return [
    ...validateA2LessonContent(
      A2_IMPLEMENTED_LESSONS,
      A2_CURRICULUM,
      VOCAB_ENTRIES,
      VOCAB_SENTENCES,
    ),
    ...validateA2CheckpointContent(
      A2_IMPLEMENTED_CHECKPOINTS,
      A2_CURRICULUM,
      A2_IMPLEMENTED_LESSONS,
    ),
  ];
}

export function assertA2Content(): void {
  const issues = validateA2Content();
  if (issues.length > 0) {
    throw new Error(
      `Conteúdo A2 inválido:\n${issues
        .map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`)
        .join("\n")}`,
    );
  }
}

assertA2Content();

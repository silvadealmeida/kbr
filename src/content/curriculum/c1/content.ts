import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { C1_CURRICULUM } from "./blueprint";
import { C1_C01 } from "./checkpoints/c1-c01";
import { C1_C02 } from "./checkpoints/c1-c02";
import { C1_C03 } from "./checkpoints/c1-c03";
import { C1_C04 } from "./checkpoints/c1-c04";
import { C1_C05 } from "./checkpoints/c1-c05";
import { C1_C06 } from "./checkpoints/c1-c06";
import { C1_C07 } from "./checkpoints/c1-c07";
import { C1_C08 } from "./checkpoints/c1-c08";
import { C1_L01, C1_L02, C1_L03, C1_L04, C1_L05 } from "./lessons/module1";
import { C1_L06, C1_L07, C1_L08, C1_L09, C1_L10 } from "./lessons/module2";
import { C1_L11, C1_L12, C1_L13, C1_L14, C1_L15 } from "./lessons/module3";
import { C1_L16, C1_L17, C1_L18, C1_L19, C1_L20 } from "./lessons/module4";
import { C1_L21, C1_L22, C1_L23, C1_L24, C1_L25 } from "./lessons/module5";
import { C1_L26, C1_L27, C1_L28, C1_L29, C1_L30 } from "./lessons/module6";
import { C1_L31, C1_L32, C1_L33, C1_L34, C1_L35 } from "./lessons/module7";
import { C1_L36, C1_L37, C1_L38, C1_L39, C1_L40 } from "./lessons/module8";
import type { C1CheckpointContent, C1ContentIssue, C1LessonContent } from "./types";
import { validateC1CheckpointContent, validateC1LessonContent } from "./validate-content";

export const C1_IMPLEMENTED_LESSONS: readonly C1LessonContent[] = [
  C1_L01, C1_L02, C1_L03, C1_L04, C1_L05,
  C1_L06, C1_L07, C1_L08, C1_L09, C1_L10,
  C1_L11, C1_L12, C1_L13, C1_L14, C1_L15,
  C1_L16, C1_L17, C1_L18, C1_L19, C1_L20,
  C1_L21, C1_L22, C1_L23, C1_L24, C1_L25,
  C1_L26, C1_L27, C1_L28, C1_L29, C1_L30,
  C1_L31, C1_L32, C1_L33, C1_L34, C1_L35,
  C1_L36, C1_L37, C1_L38, C1_L39, C1_L40,
];

export const C1_IMPLEMENTED_CHECKPOINTS: readonly C1CheckpointContent[] = [
  C1_C01, C1_C02, C1_C03, C1_C04, C1_C05, C1_C06, C1_C07, C1_C08,
];

const LESSON_BY_ID = new Map(C1_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(C1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

export function getC1Lesson(id: string): C1LessonContent | undefined { return LESSON_BY_ID.get(id); }
export function getC1Checkpoint(id: string): C1CheckpointContent | undefined { return CHECKPOINT_BY_ID.get(id); }
export function isC1LessonImplemented(id: string): boolean { return LESSON_BY_ID.has(id); }
export function isC1CheckpointImplemented(id: string): boolean { return CHECKPOINT_BY_ID.has(id); }

export function validateC1Content(): C1ContentIssue[] {
  return [
    ...validateC1LessonContent(C1_IMPLEMENTED_LESSONS, C1_CURRICULUM, VOCAB_ENTRIES, VOCAB_SENTENCES),
    ...validateC1CheckpointContent(C1_IMPLEMENTED_CHECKPOINTS, C1_CURRICULUM, C1_IMPLEMENTED_LESSONS),
  ];
}

export function assertC1Content(): void {
  const issues = validateC1Content();
  if (issues.length > 0) {
    throw new Error(`Conteúdo C1 inválido:\n${issues.map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`).join("\n")}`);
  }
}

assertC1Content();

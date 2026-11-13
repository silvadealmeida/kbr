import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { C2_CURRICULUM } from "./blueprint";
import { C2_C01 } from "./checkpoints/c2-c01";
import { C2_C02 } from "./checkpoints/c2-c02";
import { C2_C03 } from "./checkpoints/c2-c03";
import { C2_C04 } from "./checkpoints/c2-c04";
import { C2_C05 } from "./checkpoints/c2-c05";
import { C2_C06 } from "./checkpoints/c2-c06";
import { C2_C07 } from "./checkpoints/c2-c07";
import { C2_C08 } from "./checkpoints/c2-c08";
import { C2_L01, C2_L02, C2_L03, C2_L04, C2_L05 } from "./lessons/module1";
import { C2_L06, C2_L07, C2_L08, C2_L09, C2_L10 } from "./lessons/module2";
import { C2_L11, C2_L12, C2_L13, C2_L14, C2_L15 } from "./lessons/module3";
import { C2_L16, C2_L17, C2_L18, C2_L19, C2_L20 } from "./lessons/module4";
import { C2_L21, C2_L22, C2_L23, C2_L24, C2_L25 } from "./lessons/module5";
import { C2_L26, C2_L27, C2_L28, C2_L29, C2_L30 } from "./lessons/module6";
import { C2_L31, C2_L32, C2_L33, C2_L34, C2_L35 } from "./lessons/module7";
import { C2_L36, C2_L37, C2_L38, C2_L39, C2_L40 } from "./lessons/module8";
import type { C2CheckpointContent, C2ContentIssue, C2LessonContent } from "./types";
import { validateC2CheckpointContent, validateC2LessonContent } from "./validate-content";

export const C2_IMPLEMENTED_LESSONS: readonly C2LessonContent[] = [
  C2_L01, C2_L02, C2_L03, C2_L04, C2_L05,
  C2_L06, C2_L07, C2_L08, C2_L09, C2_L10,
  C2_L11, C2_L12, C2_L13, C2_L14, C2_L15,
  C2_L16, C2_L17, C2_L18, C2_L19, C2_L20,
  C2_L21, C2_L22, C2_L23, C2_L24, C2_L25,
  C2_L26, C2_L27, C2_L28, C2_L29, C2_L30,
  C2_L31, C2_L32, C2_L33, C2_L34, C2_L35,
  C2_L36, C2_L37, C2_L38, C2_L39, C2_L40,
];

export const C2_IMPLEMENTED_CHECKPOINTS: readonly C2CheckpointContent[] = [
  C2_C01, C2_C02, C2_C03, C2_C04, C2_C05, C2_C06, C2_C07, C2_C08,
];

const LESSON_BY_ID = new Map(C2_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(C2_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

export function getC2Lesson(id: string): C2LessonContent | undefined { return LESSON_BY_ID.get(id); }
export function getC2Checkpoint(id: string): C2CheckpointContent | undefined { return CHECKPOINT_BY_ID.get(id); }
export function isC2LessonImplemented(id: string): boolean { return LESSON_BY_ID.has(id); }
export function isC2CheckpointImplemented(id: string): boolean { return CHECKPOINT_BY_ID.has(id); }

export function validateC2Content(): C2ContentIssue[] {
  return [
    ...validateC2LessonContent(C2_IMPLEMENTED_LESSONS, C2_CURRICULUM, VOCAB_ENTRIES, VOCAB_SENTENCES),
    ...validateC2CheckpointContent(C2_IMPLEMENTED_CHECKPOINTS, C2_CURRICULUM, C2_IMPLEMENTED_LESSONS),
  ];
}

export function assertC2Content(): void {
  const issues = validateC2Content();
  if (issues.length > 0) {
    throw new Error(`Conteúdo C2 inválido:\n${issues.map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`).join("\n")}`);
  }
}

assertC2Content();

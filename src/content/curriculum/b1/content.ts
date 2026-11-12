import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { B1_CURRICULUM } from "./blueprint";
import { B1_C01 } from "./checkpoints/b1-c01";
import { B1_C02 } from "./checkpoints/b1-c02";
import { B1_C03 } from "./checkpoints/b1-c03";
import { B1_C04 } from "./checkpoints/b1-c04";
import { B1_C05 } from "./checkpoints/b1-c05";
import { B1_C06 } from "./checkpoints/b1-c06";
import { B1_C07 } from "./checkpoints/b1-c07";
import { B1_C08 } from "./checkpoints/b1-c08";
import { B1_L01 } from "./lessons/b1-l01";
import { B1_L02, B1_L03, B1_L04, B1_L05 } from "./lessons/module1";
import { B1_L06, B1_L07, B1_L08, B1_L09, B1_L10 } from "./lessons/module2";
import { B1_L11, B1_L12, B1_L13, B1_L14, B1_L15 } from "./lessons/module3";
import { B1_L16, B1_L17, B1_L18, B1_L19, B1_L20 } from "./lessons/module4";
import { B1_L21, B1_L22, B1_L23, B1_L24, B1_L25 } from "./lessons/module5";
import { B1_L26, B1_L27, B1_L28, B1_L29, B1_L30 } from "./lessons/module6";
import { B1_L31, B1_L32, B1_L33, B1_L34, B1_L35 } from "./lessons/module7";
import { B1_L36, B1_L37, B1_L38, B1_L39, B1_L40 } from "./lessons/module8";
import type { B1CheckpointContent, B1ContentIssue, B1LessonContent } from "./types";
import { validateB1CheckpointContent, validateB1LessonContent } from "./validate-content";

export const B1_IMPLEMENTED_LESSONS: readonly B1LessonContent[] = [
  B1_L01, B1_L02, B1_L03, B1_L04, B1_L05,
  B1_L06, B1_L07, B1_L08, B1_L09, B1_L10,
  B1_L11, B1_L12, B1_L13, B1_L14, B1_L15,
  B1_L16, B1_L17, B1_L18, B1_L19, B1_L20,
  B1_L21, B1_L22, B1_L23, B1_L24, B1_L25,
  B1_L26, B1_L27, B1_L28, B1_L29, B1_L30,
  B1_L31, B1_L32, B1_L33, B1_L34, B1_L35,
  B1_L36, B1_L37, B1_L38, B1_L39, B1_L40,
];

export const B1_IMPLEMENTED_CHECKPOINTS: readonly B1CheckpointContent[] = [
  B1_C01, B1_C02, B1_C03, B1_C04, B1_C05, B1_C06, B1_C07, B1_C08,
];

const LESSON_BY_ID = new Map(B1_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(B1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

export function getB1Lesson(id: string): B1LessonContent | undefined { return LESSON_BY_ID.get(id); }
export function getB1Checkpoint(id: string): B1CheckpointContent | undefined { return CHECKPOINT_BY_ID.get(id); }
export function isB1LessonImplemented(id: string): boolean { return LESSON_BY_ID.has(id); }
export function isB1CheckpointImplemented(id: string): boolean { return CHECKPOINT_BY_ID.has(id); }

export function validateB1Content(): B1ContentIssue[] {
  return [
    ...validateB1LessonContent(B1_IMPLEMENTED_LESSONS, B1_CURRICULUM, VOCAB_ENTRIES, VOCAB_SENTENCES),
    ...validateB1CheckpointContent(B1_IMPLEMENTED_CHECKPOINTS, B1_CURRICULUM, B1_IMPLEMENTED_LESSONS),
  ];
}

export function assertB1Content(): void {
  const issues = validateB1Content();
  if (issues.length > 0) {
    throw new Error(`Conteúdo B1 inválido:\n${issues.map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`).join("\n")}`);
  }
}

assertB1Content();

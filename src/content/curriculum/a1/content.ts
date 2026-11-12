import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { A1_CURRICULUM } from "./blueprint";
import { A1_C01 } from "./checkpoints/a1-c01";
import { A1_C02 } from "./checkpoints/a1-c02";
import { A1_C03 } from "./checkpoints/a1-c03";
import { A1_C04 } from "./checkpoints/a1-c04";
import { A1_C05 } from "./checkpoints/a1-c05";
import { A1_C06 } from "./checkpoints/a1-c06";
import { A1_C07 } from "./checkpoints/a1-c07";
import { A1_C08 } from "./checkpoints/a1-c08";
import { A1_L01 } from "./lessons/a1-l01";
import { A1_L02 } from "./lessons/a1-l02";
import { A1_L03 } from "./lessons/a1-l03";
import { A1_L04 } from "./lessons/a1-l04";
import { A1_L05 } from "./lessons/a1-l05";
import { A1_L06 } from "./lessons/a1-l06";
import { A1_L07 } from "./lessons/a1-l07";
import { A1_L08 } from "./lessons/a1-l08";
import { A1_L09 } from "./lessons/a1-l09";
import { A1_L10 } from "./lessons/a1-l10";
import { A1_L11 } from "./lessons/a1-l11";
import { A1_L12 } from "./lessons/a1-l12";
import { A1_L13 } from "./lessons/a1-l13";
import { A1_L14 } from "./lessons/a1-l14";
import { A1_L15 } from "./lessons/a1-l15";
import { A1_L16 } from "./lessons/a1-l16";
import { A1_L17 } from "./lessons/a1-l17";
import { A1_L18 } from "./lessons/a1-l18";
import { A1_L19 } from "./lessons/a1-l19";
import { A1_L20 } from "./lessons/a1-l20";
import { A1_L21 } from "./lessons/a1-l21";
import { A1_L22 } from "./lessons/a1-l22";
import { A1_L23 } from "./lessons/a1-l23";
import { A1_L24 } from "./lessons/a1-l24";
import { A1_L25 } from "./lessons/a1-l25";
import { A1_L26 } from "./lessons/a1-l26";
import { A1_L27 } from "./lessons/a1-l27";
import { A1_L28 } from "./lessons/a1-l28";
import { A1_L29 } from "./lessons/a1-l29";
import { A1_L30 } from "./lessons/a1-l30";
import { A1_L31 } from "./lessons/a1-l31";
import { A1_L32 } from "./lessons/a1-l32";
import { A1_L33 } from "./lessons/a1-l33";
import { A1_L34 } from "./lessons/a1-l34";
import { A1_L35 } from "./lessons/a1-l35";
import { A1_L36 } from "./lessons/a1-l36";
import { A1_L37 } from "./lessons/a1-l37";
import { A1_L38 } from "./lessons/a1-l38";
import { A1_L39 } from "./lessons/a1-l39";
import { A1_L40 } from "./lessons/a1-l40";
import type {
  A1CheckpointContent,
  A1ContentIssue,
  A1LessonContent,
} from "./types";
import {
  validateA1CheckpointContent,
  validateA1LessonContent,
} from "./validate-content";

/**
 * Lições A1 jogáveis. O curso completo tem 40 datasets; o registro existe para
 * que a rota e a validação nunca publiquem um passo sem conteúdo. Importar este
 * módulo roda a validação estrutural; ele é destinado ao servidor e aos testes,
 * não ao bundle do cliente.
 */
export const A1_IMPLEMENTED_LESSONS: readonly A1LessonContent[] = [
  A1_L01,
  A1_L02,
  A1_L03,
  A1_L04,
  A1_L05,
  A1_L06,
  A1_L07,
  A1_L08,
  A1_L09,
  A1_L10,
  A1_L11,
  A1_L12,
  A1_L13,
  A1_L14,
  A1_L15,
  A1_L16,
  A1_L17,
  A1_L18,
  A1_L19,
  A1_L20,
  A1_L21,
  A1_L22,
  A1_L23,
  A1_L24,
  A1_L25,
  A1_L26,
  A1_L27,
  A1_L28,
  A1_L29,
  A1_L30,
  A1_L31,
  A1_L32,
  A1_L33,
  A1_L34,
  A1_L35,
  A1_L36,
  A1_L37,
  A1_L38,
  A1_L39,
  A1_L40,
];

/**
 * Checkpoints A1 jogáveis. São avaliações cumulativas: não introduzem
 * vocabulário obrigatório nem alteram o formato de `Progress`.
 */
export const A1_IMPLEMENTED_CHECKPOINTS: readonly A1CheckpointContent[] = [
  A1_C01,
  A1_C02,
  A1_C03,
  A1_C04,
  A1_C05,
  A1_C06,
  A1_C07,
  A1_C08,
];

const LESSON_BY_ID = new Map(
  A1_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]),
);
const CHECKPOINT_BY_ID = new Map(
  A1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]),
);

export function getA1Lesson(lessonId: string): A1LessonContent | undefined {
  return LESSON_BY_ID.get(lessonId);
}

export function getA1Checkpoint(
  checkpointId: string,
): A1CheckpointContent | undefined {
  return CHECKPOINT_BY_ID.get(checkpointId);
}

export function isA1LessonImplemented(lessonId: string): boolean {
  return LESSON_BY_ID.has(lessonId);
}

export function isA1CheckpointImplemented(checkpointId: string): boolean {
  return CHECKPOINT_BY_ID.has(checkpointId);
}

export function validateA1Content(): A1ContentIssue[] {
  return [
    ...validateA1LessonContent(
      A1_IMPLEMENTED_LESSONS,
      A1_CURRICULUM,
      VOCAB_ENTRIES,
      VOCAB_SENTENCES,
    ),
    ...validateA1CheckpointContent(
      A1_IMPLEMENTED_CHECKPOINTS,
      A1_CURRICULUM,
      A1_IMPLEMENTED_LESSONS,
    ),
  ];
}

export function assertA1Content(): void {
  const issues = validateA1Content();
  if (issues.length > 0) {
    throw new Error(
      `Conteúdo A1 inválido:\n${issues
        .map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`)
        .join("\n")}`,
    );
  }
}

assertA1Content();

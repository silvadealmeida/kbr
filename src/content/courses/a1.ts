import { isImplementedExerciseType } from "@/lib/exercises/registry";
import {
  A1_CHECKPOINTS,
  A1_LESSONS,
  A1_MODULES,
} from "@/content/curriculum/a1/blueprint";
import type {
  CourseDefinition,
  CourseStepDefinition,
} from "./types";

const LESSON_BY_ID = new Map(A1_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(
  A1_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]),
);

function toStep(stepId: string): CourseStepDefinition {
  const lesson = LESSON_BY_ID.get(stepId);
  if (lesson) {
    return {
      id: lesson.id,
      kind: "lesson",
      unitId: lesson.moduleId,
      title: lesson.title,
      prerequisites: lesson.prerequisites,
      estimatedMinutes: lesson.estimatedMinutes,
      completion: {
        minScore: 80,
        minCorrect: lesson.assessment.minCorrect,
        exerciseCount: lesson.assessment.automaticItems,
      },
    };
  }
  const checkpoint = CHECKPOINT_BY_ID.get(stepId);
  if (!checkpoint) throw new Error(`Passo A1 desconhecido: ${stepId}.`);
  return {
    id: checkpoint.id,
    kind: "checkpoint",
    unitId: checkpoint.moduleId,
    title: checkpoint.title,
    prerequisites: checkpoint.prerequisites,
    estimatedMinutes: checkpoint.estimatedMinutes,
    completion: {
      minScore: 80,
      minCorrect: checkpoint.assessment.minCorrect,
      exerciseCount: checkpoint.assessment.automaticItems,
      additionalRules: [checkpoint.assessment.performance],
    },
  };
}

const exerciseTypes = [
  ...new Set(
    A1_LESSONS.flatMap((lesson) =>
      lesson.exerciseTypes.filter(isImplementedExerciseType),
    ),
  ),
] as CourseDefinition["exerciseTypes"];

/**
 * Curso A1 completo: 40 lições e 8 checkpoints implementados. O conteúdo
 * continua `in-review`; a conclusão é interna do KBR e não certifica CEFR ou
 * TOPIK. Os passos derivam do blueprint validado para não criar uma segunda
 * sequência editorial.
 */
export const A1_COURSE: CourseDefinition = {
  id: "ko-a1",
  slug: "a1",
  level: "a1",
  status: "available",
  title: "Coreano A1",
  titleKo: "한국어 A1",
  subtitle: "Primeiros contatos, rotina e interações cotidianas",
  description:
    "Curso A1 completo do KBR: 40 lições, 8 checkpoints e vocabulário contextual. Conclusão interna, sem certificação CEFR ou TOPIK.",
  basePath: "/a1",
  units: A1_MODULES.map((module) => ({
    id: module.id,
    number: module.number,
    title: module.title,
    stepIds: module.stepIds,
  })),
  steps: A1_MODULES.flatMap((module) => module.stepIds.map(toStep)),
  exerciseTypes,
  completion: {
    requiresAllSteps: true,
    finalStepId: "a1-c08",
    certification: "none",
  },
  localization: {
    interfaceLocale: "pt-BR",
    contentLocale: "ko-KR",
    contentLanguage: "ko",
  },
  srsKeyPrefix: "a1:",
  stepIdPattern: /^(?:a1-l\d{2}|a1-c\d{2})$/,
};

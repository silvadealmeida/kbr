import { isImplementedExerciseType } from "@/lib/exercises/registry";
import {
  A2_CHECKPOINTS,
  A2_LESSONS,
  A2_MODULES,
} from "@/content/curriculum/a2/blueprint";
import type { CourseDefinition, CourseStepDefinition } from "./types";

const LESSON_BY_ID = new Map(A2_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(
  A2_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]),
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
  if (!checkpoint) throw new Error(`Passo A2 desconhecido: ${stepId}.`);
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
    A2_LESSONS.flatMap((lesson) =>
      lesson.exerciseTypes.filter(isImplementedExerciseType),
    ),
  ),
] as CourseDefinition["exerciseTypes"];

/**
 * Curso A2 completo: 40 lições e 8 checkpoints. A entrada exige o `a1-c08`
 * concluído; a conclusão é interna do KBR e não certifica CEFR ou TOPIK.
 */
export const A2_COURSE: CourseDefinition = {
  id: "ko-a2",
  slug: "a2",
  level: "a2",
  status: "available",
  title: "Coreano A2",
  titleKo: "한국어 A2",
  subtitle: "Relatos, planos, serviços e conversas do cotidiano",
  description:
    "Curso A2 completo do KBR: 40 lições, 8 checkpoints e vocabulário contextual. Entrada após o A1; conclusão interna, sem certificação CEFR ou TOPIK.",
  basePath: "/a2",
  entryPrerequisites: ["a1-c08"],
  units: A2_MODULES.map((module) => ({
    id: module.id,
    number: module.number,
    title: module.title,
    stepIds: module.stepIds,
  })),
  steps: A2_MODULES.flatMap((module) => module.stepIds.map(toStep)),
  exerciseTypes,
  completion: {
    requiresAllSteps: true,
    finalStepId: "a2-c08",
    certification: "none",
  },
  localization: {
    interfaceLocale: "pt-BR",
    contentLocale: "ko-KR",
    contentLanguage: "ko",
  },
  srsKeyPrefix: "a2:",
  stepIdPattern: /^(?:a2-l\d{2}|a2-c\d{2})$/,
};

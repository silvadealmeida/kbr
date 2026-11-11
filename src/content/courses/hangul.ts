import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import { COURSE_OUTLINE } from "@/content/hangul/outline";
import { buildCourseSteps } from "@/lib/courses/steps";
import type {
  CourseDefinition,
  CourseStepCompletion,
  CourseUnitDefinition,
} from "./types";

const lessonById = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));
const checkpointById = new Map(CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

function completionForStep(stepId: string): CourseStepCompletion {
  const lesson = lessonById.get(stepId);
  if (lesson) {
    return {
      minScore: lesson.completion.minScore,
      ...(lesson.completion.minCorrect !== undefined
        ? { minCorrect: lesson.completion.minCorrect }
        : {}),
      exerciseCount: lesson.exercises.length,
      ...(lesson.completion.rules?.length
        ? { additionalRules: lesson.completion.rules.map((rule) => rule.label) }
        : {}),
    };
  }

  const checkpoint = checkpointById.get(stepId);
  if (checkpoint) {
    return {
      minScore: checkpoint.passingScore,
      ...(checkpoint.minCorrect !== undefined
        ? { minCorrect: checkpoint.minCorrect }
        : {}),
      exerciseCount: checkpoint.exercises.length,
    };
  }

  throw new Error(`Passo Hangul sem lição ou checkpoint correspondente: ${stepId}`);
}

const units: readonly CourseUnitDefinition[] = COURSE_OUTLINE.map((unit) => ({
  id: `hangul-u${unit.unit}`,
  number: unit.unit,
  title: unit.title,
  stepIds: [
    ...unit.lessons.map((lesson) => lesson.id),
    ...(unit.checkpoint ? [unit.checkpoint] : []),
  ],
}));

const unitByStepId = new Map(
  units.flatMap((unit) => unit.stepIds.map((stepId) => [stepId, unit.id] as const)),
);

const steps: CourseDefinition["steps"] = buildCourseSteps(LESSONS, CHECKPOINTS).map(
  (step) => {
    const unitId = unitByStepId.get(step.id);
    if (!unitId) {
      throw new Error(`Passo Hangul fora de qualquer unidade: ${step.id}`);
    }
    return {
      ...step,
      unitId,
      completion: completionForStep(step.id),
    };
  },
);

const exerciseTypes = [
  ...new Set(
    [...LESSONS, ...CHECKPOINTS].flatMap((item) =>
      item.exercises.map((exercise) => exercise.type),
    ),
  ),
] as CourseDefinition["exerciseTypes"];

/**
 * Curso Hangul registrado como o primeiro curso disponível. Os IDs `h01`–`h25`
 * e `c1`–`c4` são preservados exatamente como no `Progress` v1.
 */
export const HANGUL_COURSE: CourseDefinition = {
  id: "hangul",
  slug: "hangul",
  level: "pre-a1",
  status: "available",
  title: "Hangul",
  titleKo: "한글",
  subtitle: "Alfabeto, sílabas e leitura em contexto",
  description:
    "Curso introdutório de leitura em coreano: 25 lições e 4 checkpoints, do alfabeto aos fenômenos de fronteira. É Pré-A1 e não corresponde a um nível oficial do CEFR.",
  basePath: "/hangul",
  units,
  steps,
  exerciseTypes,
  completion: {
    requiresAllSteps: true,
    finalStepId: steps.at(-1)?.id ?? null,
    certification: "none",
  },
  localization: {
    interfaceLocale: "pt-BR",
    contentLocale: "ko-KR",
    contentLanguage: "ko",
  },
  srsKeyPrefix: "h:",
  stepIdPattern: /^(?:h\d{2}|c\d+)$/,
};

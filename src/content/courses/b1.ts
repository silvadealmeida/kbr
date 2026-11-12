import { isImplementedExerciseType } from "@/lib/exercises/registry";
import { B1_CHECKPOINTS, B1_LESSONS, B1_MODULES } from "@/content/curriculum/b1/blueprint";
import type { CourseDefinition, CourseStepDefinition } from "./types";

const LESSON_BY_ID = new Map(B1_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(B1_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

function toStep(stepId: string): CourseStepDefinition {
  const lesson = LESSON_BY_ID.get(stepId);
  if (lesson) {
    return { id: lesson.id, kind: "lesson", unitId: lesson.moduleId, title: lesson.title, prerequisites: lesson.prerequisites, estimatedMinutes: lesson.estimatedMinutes, completion: { minScore: 80, minCorrect: lesson.assessment.minCorrect, exerciseCount: lesson.assessment.automaticItems } };
  }
  const checkpoint = CHECKPOINT_BY_ID.get(stepId);
  if (!checkpoint) throw new Error(`Passo B1 desconhecido: ${stepId}.`);
  return { id: checkpoint.id, kind: "checkpoint", unitId: checkpoint.moduleId, title: checkpoint.title, prerequisites: checkpoint.prerequisites, estimatedMinutes: checkpoint.estimatedMinutes, completion: { minScore: 80, minCorrect: checkpoint.assessment.minCorrect, exerciseCount: checkpoint.assessment.automaticItems, additionalRules: [checkpoint.assessment.performance] } };
}

const exerciseTypes = [...new Set(B1_LESSONS.flatMap((lesson) => lesson.exerciseTypes.filter(isImplementedExerciseType)))] as CourseDefinition["exerciseTypes"];

/** Curso B1 completo; entrada após `a2-c08`, conclusão interna. */
export const B1_COURSE: CourseDefinition = {
  id: "ko-b1", slug: "b1", level: "b1", status: "available",
  title: "Coreano B1", titleKo: "한국어 B1",
  subtitle: "Narrativas, argumentos, trabalho e comunicação independente",
  description: "Curso B1 completo do KBR: 40 lições, 8 checkpoints e produção independente opcional. Entrada após o A2; conclusão interna, sem certificação CEFR ou TOPIK.",
  basePath: "/b1", entryPrerequisites: ["a2-c08"],
  units: B1_MODULES.map((module) => ({ id: module.id, number: module.number, title: module.title, stepIds: module.stepIds })),
  steps: B1_MODULES.flatMap((module) => module.stepIds.map(toStep)),
  exerciseTypes,
  completion: { requiresAllSteps: true, finalStepId: "b1-c08", certification: "none" },
  localization: { interfaceLocale: "pt-BR", contentLocale: "ko-KR", contentLanguage: "ko" },
  srsKeyPrefix: "b1:", stepIdPattern: /^(?:b1-l\d{2}|b1-c\d{2})$/,
};

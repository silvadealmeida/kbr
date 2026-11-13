import { isImplementedExerciseType } from "@/lib/exercises/registry";
import { B2_CHECKPOINTS, B2_LESSONS, B2_MODULES } from "@/content/curriculum/b2/blueprint";
import {
  B2_IMPLEMENTED_CHECKPOINTS,
  B2_IMPLEMENTED_LESSONS,
} from "@/content/curriculum/b2/content";
import type { CourseDefinition, CourseStepDefinition } from "./types";

const LESSON_BY_ID = new Map(B2_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(B2_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

const IMPLEMENTED = new Set<string>([
  ...B2_IMPLEMENTED_LESSONS.map((lesson) => lesson.id),
  ...B2_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => checkpoint.id),
]);

function toStep(stepId: string): CourseStepDefinition {
  const lesson = LESSON_BY_ID.get(stepId);
  if (lesson) {
    return { id: lesson.id, kind: "lesson", unitId: lesson.moduleId, title: lesson.title, prerequisites: lesson.prerequisites, estimatedMinutes: lesson.estimatedMinutes, completion: { minScore: 80, minCorrect: lesson.assessment.minCorrect, exerciseCount: lesson.assessment.automaticItems } };
  }
  const checkpoint = CHECKPOINT_BY_ID.get(stepId);
  if (!checkpoint) throw new Error(`Passo B2 desconhecido: ${stepId}.`);
  return { id: checkpoint.id, kind: "checkpoint", unitId: checkpoint.moduleId, title: checkpoint.title, prerequisites: checkpoint.prerequisites, estimatedMinutes: checkpoint.estimatedMinutes, completion: { minScore: 80, minCorrect: checkpoint.assessment.minCorrect, exerciseCount: checkpoint.assessment.automaticItems, additionalRules: [checkpoint.assessment.performance] } };
}

const units = B2_MODULES
  .map((module) => ({ ...module, stepIds: module.stepIds.filter((id) => IMPLEMENTED.has(id)) }))
  .filter((module) => module.stepIds.length > 0);

const steps = units.flatMap((module) => module.stepIds.map(toStep));
const complete = B2_IMPLEMENTED_LESSONS.length === 40 && B2_IMPLEMENTED_CHECKPOINTS.length === 8;

const exerciseTypes = [...new Set(B2_LESSONS.flatMap((lesson) => lesson.exerciseTypes.filter(isImplementedExerciseType)))] as CourseDefinition["exerciseTypes"];

/** Curso B2; entrada após `b1-c08` e conclusão interna derivada dos 48 passos. */
export const B2_COURSE: CourseDefinition = {
  id: "ko-b2", slug: "b2", level: "b2",
  status: complete ? "available" : "in-development",
  title: "Coreano B2", titleKo: "한국어 B2",
  subtitle: "Textos longos, argumentação, mídia, negociação e autonomia",
  description: "Curso B2 completo do KBR: 40 lições, 8 checkpoints e produção independente opcional. Entrada após o B1; conclusão interna, sem certificação CEFR ou TOPIK.",
  basePath: "/b2", entryPrerequisites: ["b1-c08"],
  units: units.map((module) => ({ id: module.id, number: module.number, title: module.title, stepIds: module.stepIds })),
  steps,
  ...(complete ? {} : { plannedTotals: { lessons: 40, checkpoints: 8 } }),
  exerciseTypes,
  completion: complete
    ? { requiresAllSteps: true, finalStepId: "b2-c08", certification: "none" }
    : { requiresAllSteps: false, finalStepId: null, certification: "none" },
  localization: { interfaceLocale: "pt-BR", contentLocale: "ko-KR", contentLanguage: "ko" },
  srsKeyPrefix: "b2:", stepIdPattern: /^(?:b2-l\d{2}|b2-c\d{2})$/,
};

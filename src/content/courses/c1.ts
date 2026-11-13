import { isImplementedExerciseType } from "@/lib/exercises/registry";
import { C1_CHECKPOINTS, C1_LESSONS, C1_MODULES } from "@/content/curriculum/c1/blueprint";
import {
  C1_IMPLEMENTED_CHECKPOINTS,
  C1_IMPLEMENTED_LESSONS,
} from "@/content/curriculum/c1/content";
import type { CourseDefinition, CourseStepDefinition } from "./types";

const LESSON_BY_ID = new Map(C1_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(C1_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

const IMPLEMENTED = new Set<string>([
  ...C1_IMPLEMENTED_LESSONS.map((lesson) => lesson.id),
  ...C1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => checkpoint.id),
]);

function toStep(stepId: string): CourseStepDefinition {
  const lesson = LESSON_BY_ID.get(stepId);
  if (lesson) {
    return { id: lesson.id, kind: "lesson", unitId: lesson.moduleId, title: lesson.title, prerequisites: lesson.prerequisites, estimatedMinutes: lesson.estimatedMinutes, completion: { minScore: 80, minCorrect: lesson.assessment.minCorrect, exerciseCount: lesson.assessment.automaticItems } };
  }
  const checkpoint = CHECKPOINT_BY_ID.get(stepId);
  if (!checkpoint) throw new Error(`Passo C1 desconhecido: ${stepId}.`);
  return { id: checkpoint.id, kind: "checkpoint", unitId: checkpoint.moduleId, title: checkpoint.title, prerequisites: checkpoint.prerequisites, estimatedMinutes: checkpoint.estimatedMinutes, completion: { minScore: 80, minCorrect: checkpoint.assessment.minCorrect, exerciseCount: checkpoint.assessment.automaticItems, additionalRules: [checkpoint.assessment.performance] } };
}

const units = C1_MODULES
  .map((module) => ({ ...module, stepIds: module.stepIds.filter((id) => IMPLEMENTED.has(id)) }))
  .filter((module) => module.stepIds.length > 0);

const steps = units.flatMap((module) => module.stepIds.map(toStep));
const complete = C1_IMPLEMENTED_LESSONS.length === 40 && C1_IMPLEMENTED_CHECKPOINTS.length === 8;

const exerciseTypes = [...new Set(C1_LESSONS.flatMap((lesson) => lesson.exerciseTypes.filter(isImplementedExerciseType)))] as CourseDefinition["exerciseTypes"];

/** Curso C1; entrada após `b2-c08` e conclusão interna derivada dos 48 passos. */
export const C1_COURSE: CourseDefinition = {
  id: "ko-c1", slug: "c1", level: "c1",
  status: complete ? "available" : "in-development",
  title: "Coreano C1", titleKo: "한국어 C1",
  subtitle: "Argumentação, leitura crítica, discurso acadêmico e mediação",
  description: "Curso C1 completo do KBR: 40 lições, 8 checkpoints e produção independente com rubrica. Entrada após o B2; conclusão interna, sem certificação CEFR ou TOPIK.",
  basePath: "/c1", entryPrerequisites: ["b2-c08"],
  units: units.map((module) => ({ id: module.id, number: module.number, title: module.title, stepIds: module.stepIds })),
  steps,
  ...(complete ? {} : { plannedTotals: { lessons: 40, checkpoints: 8 } }),
  exerciseTypes,
  completion: complete
    ? { requiresAllSteps: true, finalStepId: "c1-c08", certification: "none" }
    : { requiresAllSteps: false, finalStepId: null, certification: "none" },
  localization: { interfaceLocale: "pt-BR", contentLocale: "ko-KR", contentLanguage: "ko" },
  srsKeyPrefix: "c1:", stepIdPattern: /^(?:c1-l\d{2}|c1-c\d{2})$/,
};

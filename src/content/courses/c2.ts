import { isImplementedExerciseType } from "@/lib/exercises/registry";
import { C2_CHECKPOINTS, C2_LESSONS, C2_MODULES } from "@/content/curriculum/c2/blueprint";
import type { CourseDefinition, CourseStepDefinition } from "./types";

const LESSON_BY_ID = new Map(C2_LESSONS.map((lesson) => [lesson.id, lesson]));
const CHECKPOINT_BY_ID = new Map(C2_CHECKPOINTS.map((checkpoint) => [checkpoint.id, checkpoint]));

/**
 * O registro usa apenas o blueprint leve. Importar `content` aqui puxaria
 * todas as lições e o vocabulário para o bundle do catálogo.
 */
const IMPLEMENTED = new Set<string>(C2_LESSONS.map((lesson) => lesson.id).concat(C2_CHECKPOINTS.map((checkpoint) => checkpoint.id)));

function toStep(stepId: string): CourseStepDefinition {
  const lesson = LESSON_BY_ID.get(stepId);
  if (lesson) {
    return { id: lesson.id, kind: "lesson", unitId: lesson.moduleId, title: lesson.title, prerequisites: lesson.prerequisites, estimatedMinutes: lesson.estimatedMinutes, completion: { minScore: 80, minCorrect: lesson.assessment.minCorrect, exerciseCount: lesson.assessment.automaticItems } };
  }
  const checkpoint = CHECKPOINT_BY_ID.get(stepId);
  if (!checkpoint) throw new Error(`Passo C2 desconhecido: ${stepId}.`);
  return { id: checkpoint.id, kind: "checkpoint", unitId: checkpoint.moduleId, title: checkpoint.title, prerequisites: checkpoint.prerequisites, estimatedMinutes: checkpoint.estimatedMinutes, completion: { minScore: 80, minCorrect: checkpoint.assessment.minCorrect, exerciseCount: checkpoint.assessment.automaticItems, additionalRules: [checkpoint.assessment.performance] } };
}

const units = C2_MODULES
  .map((module) => ({ ...module, stepIds: module.stepIds.filter((id) => IMPLEMENTED.has(id)) }))
  .filter((module) => module.stepIds.length > 0);

const steps = units.flatMap((module) => module.stepIds.map(toStep));
const complete = C2_LESSONS.length === 40 && C2_CHECKPOINTS.length === 8;

const exerciseTypes = [...new Set(C2_LESSONS.flatMap((lesson) => lesson.exerciseTypes.filter(isImplementedExerciseType)))] as CourseDefinition["exerciseTypes"];

/** Curso C2; entrada após `c1-c08` e conclusão interna derivada dos 48 passos. */
export const C2_COURSE: CourseDefinition = {
  id: "ko-c2", slug: "c2", level: "c2",
  status: complete ? "available" : "in-development",
  title: "Coreano C2", titleKo: "한국어 C2",
  subtitle: "Pragmática, estilo, retórica, literatura e mediação",
  description: "Curso C2 completo do KBR: 40 lições, 8 checkpoints e produção independente com rubrica. Entrada após o C1; conclusão interna, sem certificação CEFR ou TOPIK.",
  basePath: "/c2", entryPrerequisites: ["c1-c08"],
  units: units.map((module) => ({ id: module.id, number: module.number, title: module.title, stepIds: module.stepIds })),
  steps,
  ...(complete ? {} : { plannedTotals: { lessons: 40, checkpoints: 8 } }),
  exerciseTypes,
  completion: complete
    ? { requiresAllSteps: true, finalStepId: "c2-c08", certification: "none" }
    : { requiresAllSteps: false, finalStepId: null, certification: "none" },
  localization: { interfaceLocale: "pt-BR", contentLocale: "ko-KR", contentLanguage: "ko" },
  srsKeyPrefix: "c2:", stepIdPattern: /^(?:c2-l\d{2}|c2-c\d{2})$/,
};

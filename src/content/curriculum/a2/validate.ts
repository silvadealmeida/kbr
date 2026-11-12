import { EXERCISE_TYPE_REGISTRY } from "@/lib/exercises/registry";
import type { A2BlueprintIssue, A2CurriculumBlueprint } from "./types";

const LESSON_ID = /^a2-l\d{2}$/;
const CHECKPOINT_ID = /^a2-c\d{2}$/;
const MODULE_ID = /^a2-m\d{2}$/;

/** Validação estrutural; não certifica coreano, pedagogia ou adequação cultural. */
export function validateA2Blueprint(
  blueprint: A2CurriculumBlueprint,
): A2BlueprintIssue[] {
  const issues: A2BlueprintIssue[] = [];
  const add = (code: string, path: string, message: string) => {
    issues.push({ code, path, message });
  };

  if (blueprint.courseId !== "ko-a2") {
    add("course-id", "courseId", "O blueprint A2 precisa pertencer a ko-a2.");
  }
  if (blueprint.status !== "blueprint") {
    add("status", "status", "O blueprint A2 precisa estar marcado como blueprint.");
  }
  if (blueprint.prerequisite !== "ko-a1") {
    add("prerequisite", "prerequisite", "A entrada do A2 exige o curso A1.");
  }
  if (blueprint.modules.length !== 8) add("module-count", "modules", "São esperados 8 módulos.");
  if (blueprint.lessons.length !== 40) add("lesson-count", "lessons", "São esperadas 40 lições.");
  if (blueprint.checkpoints.length !== 8) add("checkpoint-count", "checkpoints", "São esperados 8 checkpoints.");

  const moduleIds = new Set<string>();
  const lessonIds = new Set<string>();
  const checkpointIds = new Set<string>();
  const allStepIds = new Set<string>();
  const stepPositions = new Map<string, number>();
  const exerciseTypes = new Set(EXERCISE_TYPE_REGISTRY.map((item) => item.id));

  blueprint.modules.forEach((module, index) => {
    const path = `modules[${index}]`;
    if (!MODULE_ID.test(module.id)) add("module-id", path, `ID de módulo inválido: ${module.id}.`);
    if (moduleIds.has(module.id)) add("module-duplicate", path, `Módulo duplicado: ${module.id}.`);
    moduleIds.add(module.id);
    if (module.number !== index + 1) add("module-order", path, "Número de módulo fora de ordem.");
    if (!module.title.trim() || !module.communicativeArc.trim()) add("module-empty", path, "Módulo precisa de título e arco.");
    if (module.stepIds.length !== 6) add("module-step-count", path, "Cada módulo precisa de 5 lições e 1 checkpoint.");
    module.stepIds.forEach((id, localIndex) => {
      if (allStepIds.has(id)) add("step-duplicate", path, `Passo repetido entre módulos: ${id}.`);
      allStepIds.add(id);
      stepPositions.set(id, index * 6 + localIndex);
    });
  });

  blueprint.lessons.forEach((lesson, index) => {
    const path = `lessons[${index}]`;
    if (!LESSON_ID.test(lesson.id)) add("lesson-id", path, `ID de lição inválido: ${lesson.id}.`);
    if (lessonIds.has(lesson.id)) add("lesson-duplicate", path, `Lição duplicada: ${lesson.id}.`);
    lessonIds.add(lesson.id);
    if (lesson.number !== index + 1) add("lesson-order", path, "Número de lição fora de ordem.");
    if (!moduleIds.has(lesson.moduleId)) add("lesson-module", path, `Módulo inexistente: ${lesson.moduleId}.`);
    const expectedModule = `a2-m${String(Math.floor(index / 5) + 1).padStart(2, "0")}`;
    if (lesson.moduleId !== expectedModule) add("lesson-module-order", path, `Lição deveria pertencer a ${expectedModule}.`);
    if (!allStepIds.has(lesson.id)) add("lesson-without-module", path, "Lição não aparece em stepIds de módulo.");

    for (const [field, value] of [
      ["title", lesson.title], ["communicativeGoal", lesson.communicativeGoal],
      ["dialogueScenario", lesson.dialogueScenario], ["listeningObjective", lesson.listeningObjective],
      ["writingObjective", lesson.writingObjective], ["performance", lesson.assessment.performance],
    ] as const) {
      if (!value.trim()) add("lesson-field-empty", `${path}.${field}`, `Campo ${field} vazio.`);
    }
    if (lesson.vocabulary.themes.length === 0) add("vocabulary-themes", path, "Lição sem tema lexical.");
    if (lesson.vocabulary.newItems.min < 0 || lesson.vocabulary.newItems.max > 12 || lesson.vocabulary.newItems.min > lesson.vocabulary.newItems.max) {
      add("vocabulary-load", path, "Carga lexical precisa ficar entre 0 e 12 e ter faixa válida.");
    }
    if (lesson.grammar.length === 0) add("grammar-empty", path, "Lição sem foco gramatical.");
    if (lesson.exerciseTypes.length === 0 || lesson.exerciseTypes.some((id) => !exerciseTypes.has(id))) {
      add("exercise-type", path, "Lição usa tipo de exercício ausente do registro.");
    }
    if (lesson.assessment.automaticItems !== 10 || lesson.assessment.minCorrect !== 8) {
      add("assessment", path, "O A2 usa 10 itens por lição e mínimo 8.");
    }
    if (lesson.estimatedMinutes < 50 || lesson.estimatedMinutes > 65 || lesson.distributedReviewMinutes < 20) {
      add("lesson-effort", path, "Esforço fora da faixa editorial do A2.");
    }
    if (lesson.review.status !== "in-review") add("review-status", path, "Blueprint A2 precisa ficar in-review.");

    const expectedPrerequisite = index === 0
      ? []
      : index % 5 === 0
        ? [`a2-c${String(index / 5).padStart(2, "0")}`]
        : [blueprint.lessons[index - 1]!.id];
    if (JSON.stringify(lesson.prerequisites) !== JSON.stringify(expectedPrerequisite)) {
      add("lesson-prerequisite", path, `Pré-requisito esperado: ${expectedPrerequisite.join(", ") || "nenhum"}.`);
    }
    for (const dependency of lesson.reviewDependencies) {
      const dependencyIndex = blueprint.lessons.findIndex((item) => item.id === dependency);
      if (dependencyIndex < 0 || dependencyIndex >= index) add("review-dependency", path, `Revisão não aponta para lição anterior: ${dependency}.`);
    }
    if (index > 0 && lesson.reviewDependencies.length === 0) add("review-empty", path, "Lição posterior à primeira precisa revisar conteúdo anterior.");
  });

  blueprint.checkpoints.forEach((checkpoint, index) => {
    const path = `checkpoints[${index}]`;
    if (!CHECKPOINT_ID.test(checkpoint.id)) add("checkpoint-id", path, `ID inválido: ${checkpoint.id}.`);
    if (checkpointIds.has(checkpoint.id)) add("checkpoint-duplicate", path, `Checkpoint duplicado: ${checkpoint.id}.`);
    checkpointIds.add(checkpoint.id);
    if (checkpoint.number !== index + 1) add("checkpoint-order", path, "Número de checkpoint fora de ordem.");
    const module = blueprint.modules[index];
    if (!module || checkpoint.moduleId !== module.id) add("checkpoint-module", path, "Checkpoint fora do módulo correspondente.");
    const expectedLessons = blueprint.lessons.slice(index * 5, index * 5 + 5).map((lesson) => lesson.id);
    if (JSON.stringify(checkpoint.lessonIds) !== JSON.stringify(expectedLessons)) add("checkpoint-lessons", path, "Escopo de lições incorreto.");
    const previousCheckpoints = blueprint.checkpoints.slice(0, index).map((item) => item.id);
    const expectedPrerequisites = [...expectedLessons, ...previousCheckpoints];
    if (JSON.stringify(checkpoint.prerequisites) !== JSON.stringify(expectedPrerequisites)) add("checkpoint-prerequisite", path, "Checkpoint permite atalho ou tem dependência indevida.");
    if (module?.stepIds.at(-1) !== checkpoint.id) add("checkpoint-position", path, "Checkpoint precisa encerrar o módulo.");
    if (checkpoint.cumulativeReviewFrom.length !== (index + 1) * 5) add("checkpoint-review", path, "Revisão cumulativa incompleta.");
    if (checkpoint.assessment.minCorrect > checkpoint.assessment.automaticItems) add("checkpoint-assessment", path, "Critério de acertos inválido.");
    if (checkpoint.review.status !== "in-review") add("review-status", path, "Checkpoint A2 precisa ficar in-review.");
  });

  for (const lesson of blueprint.lessons) if (!allStepIds.has(lesson.id)) add("lesson-unlisted", lesson.id, "Lição fora dos módulos.");
  for (const checkpoint of blueprint.checkpoints) if (!allStepIds.has(checkpoint.id)) add("checkpoint-unlisted", checkpoint.id, "Checkpoint fora dos módulos.");
  for (const id of allStepIds) {
    if (!lessonIds.has(id) && !checkpointIds.has(id)) add("module-step-unknown", id, "Módulo referencia passo inexistente.");
  }

  const steps = [...blueprint.lessons, ...blueprint.checkpoints];
  for (const step of steps) {
    for (const prerequisite of step.prerequisites) {
      if (!allStepIds.has(prerequisite)) add("prerequisite-unknown", step.id, `Pré-requisito inexistente: ${prerequisite}.`);
      else if ((stepPositions.get(prerequisite) ?? Infinity) >= (stepPositions.get(step.id) ?? -1)) add("prerequisite-order", step.id, `Pré-requisito fora de ordem: ${prerequisite}.`);
    }
  }

  return issues;
}

export function assertA2Blueprint(blueprint: A2CurriculumBlueprint): void {
  const issues = validateA2Blueprint(blueprint);
  if (issues.length > 0) {
    throw new Error(`Blueprint A2 inválido:\n${issues.map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`).join("\n")}`);
  }
}

import type {
  AdvancedBlueprintIssue,
  AdvancedCurriculumBlueprint,
} from "./types";

/**
 * Validação estrutural do blueprint C1/C2. Não avalia qualidade linguística.
 */
export function validateAdvancedBlueprint(
  blueprint: AdvancedCurriculumBlueprint,
): AdvancedBlueprintIssue[] {
  const issues: AdvancedBlueprintIssue[] = [];
  const add = (code: string, path: string, message: string) =>
    issues.push({ code, path, message });

  if (blueprint.courseId !== "ko-c1" && blueprint.courseId !== "ko-c2") {
    add("course-id", "courseId", `Curso avançado desconhecido: ${blueprint.courseId}.`);
  }
  if (blueprint.modules.length !== 8) add("modules", "modules", "O curso avançado precisa de 8 módulos.");
  if (blueprint.lessons.length !== 40) add("lessons", "lessons", "O curso avançado precisa de 40 lições.");
  if (blueprint.checkpoints.length !== 8) add("checkpoints", "checkpoints", "O curso avançado precisa de 8 checkpoints.");

  const moduleIds = new Set<string>();
  const stepIds = new Set<string>();
  const lessonIds = new Set<string>();
  const checkpointIds = new Set<string>();
  const expectedPrefix = blueprint.courseId === "ko-c1" ? "c1" : "c2";

  blueprint.modules.forEach((module, index) => {
    if (moduleIds.has(module.id)) add("module-duplicate", `modules[${index}]`, `Módulo duplicado: ${module.id}.`);
    moduleIds.add(module.id);
    if (module.number !== index + 1) add("module-number", `modules[${index}]`, "Número do módulo fora de sequência.");
    if (!module.id.startsWith(`${expectedPrefix}-m`)) add("module-prefix", `modules[${index}]`, `Módulo fora do prefixo ${expectedPrefix}.`);
    if (module.stepIds.length !== 6) add("module-steps", `modules[${index}]`, "Cada módulo precisa de 5 lições e 1 checkpoint.");
    for (const id of module.stepIds) {
      if (stepIds.has(id)) add("step-duplicate", `modules[${index}]`, `Passo repetido: ${id}.`);
      stepIds.add(id);
    }
  });

  blueprint.lessons.forEach((lesson, index) => {
    const path = `lessons[${index}]`;
    if (lessonIds.has(lesson.id)) add("lesson-duplicate", path, `Lição duplicada: ${lesson.id}.`);
    lessonIds.add(lesson.id);
    if (lesson.number !== index + 1) add("lesson-number", path, "Número da lição fora de sequência.");
    if (!lesson.id.startsWith(`${expectedPrefix}-l`)) add("lesson-prefix", path, `Lição fora do prefixo ${expectedPrefix}.`);
    if (!moduleIds.has(lesson.moduleId)) add("lesson-module", path, "Módulo inexistente.");
    if (!stepIds.has(lesson.id)) add("lesson-unlisted", path, "Lição não aparece em nenhum módulo.");
    if (lesson.grammar.length !== 2) add("lesson-grammar", path, "A lição avançada precisa de dois focos gramaticais.");
    if (lesson.discourse.length < 2) add("lesson-discourse", path, "A lição avançada precisa de dois focos de discurso.");
    if (lesson.vocabulary.newItems.min !== 8 || lesson.vocabulary.newItems.max !== 8) {
      add("lesson-vocabulary", path, "O plano lexical é de oito identidades novas por lição.");
    }
    if (lesson.assessment.automaticItems !== 10) add("lesson-assessment", path, "A lição precisa de 10 itens automáticos.");
    if (lesson.assessment.minCorrect !== 8) add("lesson-assessment-min", path, "A lição usa mínimo de 8/10.");
    if (lesson.estimatedMinutes < 75) add("lesson-duration", path, "A lição avançada pede ao menos 75 minutos.");
    const expectedPrerequisite = index === 0
      ? []
      : index % 5 === 0
        ? [`${expectedPrefix}-c${String(index / 5).padStart(2, "0")}`]
        : [blueprint.lessons[index - 1]!.id];
    if (lesson.prerequisites.join(",") !== expectedPrerequisite.join(",")) {
      add(
        "lesson-prerequisite",
        path,
        `Pré-requisito esperado: ${expectedPrerequisite.join(", ") || "nenhum"}.`,
      );
    }
  });

  blueprint.checkpoints.forEach((checkpoint, index) => {
    const path = `checkpoints[${index}]`;
    if (checkpointIds.has(checkpoint.id)) add("checkpoint-duplicate", path, `Checkpoint duplicado: ${checkpoint.id}.`);
    checkpointIds.add(checkpoint.id);
    if (checkpoint.number !== index + 1) add("checkpoint-number", path, "Número do checkpoint fora de sequência.");
    if (!checkpoint.id.startsWith(`${expectedPrefix}-c`)) add("checkpoint-prefix", path, `Checkpoint fora do prefixo ${expectedPrefix}.`);
    if (!moduleIds.has(checkpoint.moduleId)) add("checkpoint-module", path, "Módulo inexistente.");
    if (!stepIds.has(checkpoint.id)) add("checkpoint-unlisted", path, "Checkpoint não aparece em nenhum módulo.");
    if (checkpoint.lessonIds.length !== 5) add("checkpoint-lessons", path, "O checkpoint cobre cinco lições.");
    for (const id of checkpoint.lessonIds) {
      if (!lessonIds.has(id)) add("checkpoint-lesson-unknown", path, `Lição inexistente: ${id}.`);
    }
    if (checkpoint.prerequisites.length === 0) add("checkpoint-prerequisite", path, "Checkpoint sem pré-requisito.");
    const final = checkpoint.id === `${expectedPrefix}-c08`;
    if (checkpoint.assessment.automaticItems !== (final ? 40 : 25)) {
      add("checkpoint-assessment", path, `Checkpoint precisa de ${final ? 40 : 25} itens.`);
    }
    if (checkpoint.assessment.minCorrect !== (final ? 32 : 20)) {
      add("checkpoint-assessment-min", path, `Checkpoint usa mínimo de ${final ? 32 : 20}.`);
    }
  });

  const expectedSteps = [
    ...Array.from({ length: 40 }, (_, index) => `${expectedPrefix}-l${String(index + 1).padStart(2, "0")}`),
    ...Array.from({ length: 8 }, (_, index) => `${expectedPrefix}-c${String(index + 1).padStart(2, "0")}`),
  ];
  for (const id of expectedSteps) {
    if (!stepIds.has(id)) add("step-missing", "modules", `Passo ausente: ${id}.`);
  }
  if (stepIds.size !== 48) add("step-count", "modules", `O curso precisa de 48 passos (tem ${stepIds.size}).`);

  return issues;
}

export function assertAdvancedBlueprint(
  blueprint: AdvancedCurriculumBlueprint,
): void {
  const issues = validateAdvancedBlueprint(blueprint);
  if (issues.length > 0) {
    throw new Error(
      `Blueprint ${blueprint.courseId} inválido:\n${issues
        .map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`)
        .join("\n")}`,
    );
  }
}

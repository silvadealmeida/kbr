import { A1_COURSE } from "./a1";
import { A2_COURSE } from "./a2";
import { B1_COURSE } from "./b1";
import { B2_COURSE } from "./b2";
import { HANGUL_COURSE } from "./hangul";
import { PLANNED_COURSES } from "./planned";
import {
  COURSE_LEVELS,
  type CourseDefinition,
  type CourseRegistryIssue,
} from "./types";

const COURSE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SRS_PREFIX = /^[a-z0-9]+:$/i;

/**
 * Registro estático de cursos. Hangul, A1, A2 e B1 estão disponíveis; o B2 é
 * registrado pelo seu próprio módulo (em desenvolvimento ou disponível), e
 * C1–C2 seguem como entradas de planejamento sem passos, rotas ou conteúdo.
 */
export const COURSE_REGISTRY: readonly CourseDefinition[] = [
  HANGUL_COURSE,
  A1_COURSE,
  A2_COURSE,
  B1_COURSE,
  B2_COURSE,
  ...PLANNED_COURSES,
];

export const AVAILABLE_COURSES: readonly CourseDefinition[] = COURSE_REGISTRY.filter(
  (course) => course.status === "available",
);

export const IN_DEVELOPMENT_COURSES: readonly CourseDefinition[] = COURSE_REGISTRY.filter(
  (course) => course.status === "in-development",
);

export const PLANNED_COURSE_LIST: readonly CourseDefinition[] = COURSE_REGISTRY.filter(
  (course) => course.status === "planned",
);

export function getCourse(id: string): CourseDefinition | undefined {
  return COURSE_REGISTRY.find((course) => course.id === id);
}

export function getCourseBySlug(slug: string): CourseDefinition | undefined {
  return COURSE_REGISTRY.find((course) => course.slug === slug);
}

export function getAvailableCourses(): readonly CourseDefinition[] {
  return AVAILABLE_COURSES;
}

export function getInDevelopmentCourses(): readonly CourseDefinition[] {
  return IN_DEVELOPMENT_COURSES;
}

export function getPlannedCourses(): readonly CourseDefinition[] {
  return PLANNED_COURSE_LIST;
}

/**
 * Rota de um passo existente. Retorna `null` para curso planejado, passo
 * inexistente ou curso sem rota, então a UI nunca cria link quebrado. Cursos
 * em desenvolvimento só geram links para os passos já implementados.
 */
export function courseStepHref(
  course: Pick<CourseDefinition, "status" | "basePath" | "steps">,
  stepId: string,
): string | null {
  if (course.status === "planned" || !course.basePath) return null;
  if (!course.steps.some((step) => step.id === stepId)) return null;
  return `${course.basePath}/${stepId}`;
}

function patternMatches(pattern: RegExp | null, value: string): boolean {
  if (!pattern) return false;
  pattern.lastIndex = 0;
  return pattern.test(value);
}

/**
 * Valida o registro inteiro, não só o curso isolado. IDs de passos são globais
 * (são chaves de `Progress.lessons`), então duplicatas entre cursos são erro;
 * o padrão de IDs do Hangul reserva `hNN` e `cN` para qualquer curso futuro.
 */
export function validateCourseRegistry(
  courses: readonly CourseDefinition[] = COURSE_REGISTRY,
): CourseRegistryIssue[] {
  const issues: CourseRegistryIssue[] = [];
  const error = (code: string, path: string, message: string) => {
    issues.push({ severity: "error", code, path, message });
  };

  const courseIds = new Map<string, CourseDefinition>();
  const slugs = new Map<string, CourseDefinition>();
  const stepOwners = new Map<string, string>();
  const srsPrefixes = new Map<string, string>();

  for (const course of courses) {
    const path = `courses.${course.id || "(sem id)"}`;

    if (!course.id) {
      error("course-id-missing", path, "O curso precisa de um `id` estável.");
    } else if (!COURSE_ID.test(course.id)) {
      error("course-id-invalid", path, `ID de curso inválido: ${course.id}.`);
    } else if (courseIds.has(course.id)) {
      error("course-id-duplicate", path, `ID de curso duplicado: ${course.id}.`);
    } else {
      courseIds.set(course.id, course);
    }

    if (!course.slug) {
      error("course-slug-missing", path, "O curso precisa de um `slug`.");
    } else if (!COURSE_ID.test(course.slug)) {
      error("course-slug-invalid", path, `Slug de curso inválido: ${course.slug}.`);
    } else if (slugs.has(course.slug)) {
      error("course-slug-duplicate", path, `Slug de curso duplicado: ${course.slug}.`);
    } else {
      slugs.set(course.slug, course);
    }

    if (!COURSE_LEVELS.includes(course.level)) {
      error("course-level-invalid", path, `Nível inválido: ${String(course.level)}.`);
    }
    if (!course.title.trim()) {
      error("course-title-missing", path, "O curso precisa de um título.");
    }
    if (!course.description.trim()) {
      error("course-description-missing", path, "O curso precisa de uma descrição.");
    }
    if (course.localization.interfaceLocale !== "pt-BR") {
      error("course-interface-locale", path, "A interface deste app é pt-BR.");
    }
    if (course.localization.contentLocale !== "ko-KR") {
      error("course-content-locale", path, "O conteúdo-alvo deste app é ko-KR.");
    }

    if (course.status === "planned") {
      if (course.steps.length > 0) {
        error("planned-course-steps", path, "Curso planejado não pode ter passos.");
      }
      if (course.units.length > 0) {
        error("planned-course-units", path, "Curso planejado não pode ter unidades.");
      }
      if (course.basePath !== null) {
        error("planned-course-route", path, "Curso planejado não pode ter rota.");
      }
      if (course.completion.finalStepId !== null) {
        error("planned-course-final-step", path, "Curso planejado não tem checkpoint final.");
      }
      if (course.exerciseTypes.length > 0) {
        error("planned-course-exercises", path, "Curso planejado não declara exercícios.");
      }
      if (course.srsKeyPrefix !== null) {
        error("planned-course-srs", path, "Curso planejado não reserva prefixo SRS.");
      }
      if (course.stepIdPattern !== null) {
        error("planned-course-id-pattern", path, "Curso planejado não reserva IDs de passos.");
      }
    } else if (course.status === "in-development") {
      if (course.steps.length === 0) {
        error("development-course-steps", path, "Curso em desenvolvimento precisa de ao menos um passo jogável.");
      }
      if (course.units.length === 0) {
        error("development-course-units", path, "Curso em desenvolvimento precisa de uma unidade implementada.");
      }
      if (!course.basePath || !course.basePath.startsWith("/")) {
        error("development-course-route", path, "Curso em desenvolvimento precisa de `basePath` interno.");
      }
      if (!course.stepIdPattern) {
        error("development-course-id-pattern", path, "Curso em desenvolvimento precisa reservar IDs de passos.");
      }
      if (!course.srsKeyPrefix) {
        error("development-course-srs", path, "Curso em desenvolvimento precisa reservar um prefixo SRS.");
      }
      if (course.exerciseTypes.length === 0) {
        error("development-course-exercises", path, "Curso em desenvolvimento precisa declarar exercícios.");
      }
      if (course.completion.requiresAllSteps) {
        error("development-course-completion-all", path, "Curso incompleto não pode exigir todos os passos.");
      }
      if (course.completion.finalStepId !== null) {
        error("development-course-final-step", path, "Curso em desenvolvimento não tem passo final.");
      }
      if (!course.plannedTotals) {
        error("development-course-totals", path, "Curso em desenvolvimento precisa informar os totais planejados.");
      } else {
        const implementedLessons = course.steps.filter((step) => step.kind === "lesson").length;
        const implementedCheckpoints = course.steps.filter((step) => step.kind === "checkpoint").length;
        const { lessons, checkpoints } = course.plannedTotals;
        if (!Number.isInteger(lessons) || lessons < implementedLessons || lessons <= 0) {
          error("development-course-lesson-total", path, "O total planejado de lições precisa cobrir as implementadas.");
        }
        if (!Number.isInteger(checkpoints) || checkpoints < implementedCheckpoints || checkpoints < 0) {
          error("development-course-checkpoint-total", path, "O total planejado de checkpoints não pode ser menor que os implementados.");
        }
        if (lessons + checkpoints <= course.steps.length) {
          error("development-course-totals", path, "Os totais planejados precisam incluir passos ainda não implementados.");
        }
      }
    } else {
      if (course.steps.length === 0) {
        error("available-course-steps", path, "Curso disponível precisa de passos.");
      }
      if (course.units.length === 0) {
        error("available-course-units", path, "Curso disponível precisa de unidades.");
      }
      if (!course.basePath || !course.basePath.startsWith("/")) {
        error("available-course-route", path, "Curso disponível precisa de `basePath` interno.");
      }
      if (!course.stepIdPattern) {
        error("available-course-id-pattern", path, "Curso disponível precisa reservar IDs de passos.");
      }
      if (!course.srsKeyPrefix) {
        error("available-course-srs", path, "Curso disponível precisa reservar um prefixo SRS.");
      }
      if (course.exerciseTypes.length === 0) {
        error("available-course-exercises", path, "Curso disponível precisa declarar exercícios.");
      }
      if (!course.completion.requiresAllSteps) {
        error("course-completion-all", path, "A conclusão do curso exige todos os passos.");
      }
      if (!course.completion.finalStepId) {
        error("course-final-step-missing", path, "Curso disponível precisa de um passo final.");
      } else if (
        course.steps.length > 0 &&
        course.completion.finalStepId !== course.steps.at(-1)?.id
      ) {
        error("course-final-step-order", path, "O passo final deve ser o último do curso.");
      }
    }

    if (course.status !== "in-development" && course.plannedTotals) {
      error("course-planned-totals", path, "Só um curso em desenvolvimento declara totais planejados.");
    }

    if (course.completion.certification !== "none") {
      error("course-certification", path, "O KBR não emite certificação oficial.");
    }

    if (course.srsKeyPrefix) {
      if (!SRS_PREFIX.test(course.srsKeyPrefix)) {
        error("srs-prefix-invalid", path, `Prefixo SRS inválido: ${course.srsKeyPrefix}.`);
      } else if (srsPrefixes.has(course.srsKeyPrefix)) {
        error(
          "srs-prefix-duplicate",
          path,
          `Prefixo SRS já reservado por ${srsPrefixes.get(course.srsKeyPrefix)}.`,
        );
      } else {
        srsPrefixes.set(course.srsKeyPrefix, course.id);
      }
    }

    const stepIds = new Set<string>();
    const stepPositions = new Map<string, number>();
    course.steps.forEach((step, index) => {
      const stepPath = `${path}.steps[${index}]`;
      if (!step.id) {
        error("step-id-missing", stepPath, "O passo precisa de um ID.");
      } else {
        if (stepIds.has(step.id)) {
          error("step-id-duplicate", stepPath, `Passo duplicado no curso: ${step.id}.`);
        }
        stepIds.add(step.id);
        stepPositions.set(step.id, index);

        const owner = stepOwners.get(step.id);
        if (owner && owner !== course.id) {
          error(
            "step-id-cross-course",
            stepPath,
            `Passo ${step.id} já pertence ao curso ${owner}.`,
          );
        } else {
          stepOwners.set(step.id, course.id);
        }

        if (!patternMatches(course.stepIdPattern, step.id)) {
          error(
            "step-id-outside-course",
            stepPath,
            `Passo ${step.id} não pertence ao espaço de IDs do curso.`,
          );
        }
        for (const other of courses) {
          if (other.id !== course.id && patternMatches(other.stepIdPattern, step.id)) {
            error(
              "step-id-reserved",
              stepPath,
              `Passo ${step.id} reutiliza um identificador reservado por ${other.id}.`,
            );
          }
        }
      }

      if (step.kind !== "lesson" && step.kind !== "checkpoint") {
        error("step-kind-invalid", stepPath, `Tipo de passo inválido: ${String(step.kind)}.`);
      }
      if (!step.unitId) {
        error("step-unit-missing", stepPath, "O passo precisa de uma unidade.");
      }
      if (!step.title.trim()) {
        error("step-title-missing", stepPath, "O passo precisa de um título.");
      }
      if (!Number.isFinite(step.estimatedMinutes) || step.estimatedMinutes <= 0) {
        error("step-duration", stepPath, "A duração precisa ser positiva.");
      }
      if (
        !Number.isFinite(step.completion.minScore) ||
        step.completion.minScore < 0 ||
        step.completion.minScore > 100
      ) {
        error("step-min-score", stepPath, "A nota mínima precisa estar entre 0 e 100.");
      }
      if (
        !Number.isInteger(step.completion.exerciseCount) ||
        step.completion.exerciseCount <= 0
      ) {
        error("step-exercise-count", stepPath, "O passo precisa de itens avaliados.");
      }
      if (
        step.completion.minCorrect !== undefined &&
        (!Number.isInteger(step.completion.minCorrect) ||
          step.completion.minCorrect < 0 ||
          step.completion.minCorrect > step.completion.exerciseCount)
      ) {
        error("step-min-correct", stepPath, "O mínimo de acertos não cabe no total avaliado.");
      }
    });

    course.steps.forEach((step, index) => {
      const stepPath = `${path}.steps[${index}]`;
      for (const prerequisite of step.prerequisites) {
        if (!stepIds.has(prerequisite)) {
          error(
            "step-prerequisite-unknown",
            stepPath,
            `Pré-requisito inexistente no curso: ${prerequisite}.`,
          );
        } else if ((stepPositions.get(prerequisite) ?? -1) >= index) {
          error(
            "step-prerequisite-order",
            stepPath,
            `Pré-requisito ${prerequisite} precisa vir antes do passo ${step.id}.`,
          );
        }
      }
    });

    const unitIds = new Set<string>();
    const unitNumbers = new Set<number>();
    const stepsInUnits = new Set<string>();
    course.units.forEach((unit, index) => {
      const unitPath = `${path}.units[${index}]`;
      if (!unit.id) {
        error("unit-id-missing", unitPath, "A unidade precisa de um ID.");
      } else if (unitIds.has(unit.id)) {
        error("unit-id-duplicate", unitPath, `Unidade duplicada: ${unit.id}.`);
      } else {
        unitIds.add(unit.id);
      }
      if (unitNumbers.has(unit.number)) {
        error("unit-number-duplicate", unitPath, `Número de unidade duplicado: ${unit.number}.`);
      }
      unitNumbers.add(unit.number);
      if (!Number.isInteger(unit.number) || unit.number <= 0) {
        error("unit-number", unitPath, "O número da unidade precisa ser positivo.");
      }
      if (!unit.title.trim()) {
        error("unit-title-missing", unitPath, "A unidade precisa de um título.");
      }
      if (unit.stepIds.length === 0) {
        error("unit-empty", unitPath, "A unidade precisa de ao menos um passo.");
      }
      for (const stepId of unit.stepIds) {
        if (!stepIds.has(stepId)) {
          error("unit-step-unknown", unitPath, `Passo inexistente na unidade: ${stepId}.`);
        }
        if (stepsInUnits.has(stepId)) {
          error("unit-step-duplicate", unitPath, `Passo em mais de uma unidade: ${stepId}.`);
        }
        stepsInUnits.add(stepId);
      }
    });

    for (const step of course.steps) {
      if (!stepsInUnits.has(step.id)) {
        error(
          "step-without-unit",
          path,
          `Passo ${step.id} não pertence a nenhuma unidade.`,
        );
      }
      if (step.unitId && !unitIds.has(step.unitId)) {
        error(
          "step-unit-unknown",
          path,
          `Passo ${step.id} aponta para unidade inexistente: ${step.unitId}.`,
        );
      }
    }
  }

  for (const course of courses) {
    for (const prerequisite of course.entryPrerequisites ?? []) {
      if (!stepOwners.has(prerequisite)) {
        error(
          "course-entry-prerequisite-unknown",
          `courses.${course.id}.entryPrerequisites`,
          `Pré-requisito de entrada inexistente: ${prerequisite}.`,
        );
      } else if (stepOwners.get(prerequisite) === course.id) {
        error(
          "course-entry-prerequisite-own",
          `courses.${course.id}.entryPrerequisites`,
          `Pré-requisito de entrada não pode pertencer ao próprio curso: ${prerequisite}.`,
        );
      }
    }
  }

  return issues;
}

/** Lança no carregamento do registro para impedir colisões silenciosas. */
export function assertCourseRegistry(
  courses: readonly CourseDefinition[] = COURSE_REGISTRY,
): void {
  const errors = validateCourseRegistry(courses).filter(
    (issue) => issue.severity === "error",
  );
  if (errors.length > 0) {
    throw new Error(
      `Registro de cursos inválido:\n${errors
        .map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`)
        .join("\n")}`,
    );
  }
}

assertCourseRegistry();

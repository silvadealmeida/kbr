/**
 * Navegação genérica de um curso: ordem intercalada de lições e checkpoints,
 * desbloqueio por pré-requisitos e próximo passo recomendado. A camada não
 * conhece Hangul nem `Progress`; recebe apenas os campos estruturais de que
 * precisa, então pode ser reutilizada por cursos futuros sem duplicar regras.
 */

export type CourseStepKind = "lesson" | "checkpoint";

export type CourseStep = {
  id: string;
  kind: CourseStepKind;
  title: string;
  estimatedMinutes: number;
  prerequisites: readonly string[];
};

export type CourseLessonLike = {
  id: string;
  title: string;
  estimatedMinutes: number;
  prerequisites: readonly string[];
};

export type CourseCheckpointLike = {
  id: string;
  title: string;
  estimatedMinutes: number;
  lessonIds: readonly string[];
};

export type CourseProgressLike = {
  lessons: Readonly<Record<string, { done: boolean } | undefined>>;
};

/**
 * Ordem intercalada de lições e checkpoints, com os pré-requisitos usados para
 * desbloqueio. O checkpoint ocupa a posição imediatamente depois do último
 * conteúdo do seu escopo, então `h10` é seguido por `c1`, `c1` por `h11` e
 * `c3` por `h21` no currículo Hangul. Cursos futuros recebem a mesma regra.
 */
export function buildCourseSteps(
  lessons: readonly CourseLessonLike[],
  checkpoints: readonly CourseCheckpointLike[],
): CourseStep[] {
  const lessonPosition = new Map(lessons.map((lesson, index) => [lesson.id, index * 2]));
  const entries: { step: CourseStep; position: number; order: number }[] = lessons.map(
    (lesson, index) => ({
      step: {
        id: lesson.id,
        kind: "lesson",
        title: lesson.title,
        estimatedMinutes: lesson.estimatedMinutes,
        prerequisites: lesson.prerequisites,
      },
      position: index * 2,
      order: index,
    }),
  );

  checkpoints.forEach((checkpoint, index) => {
    const scope = checkpoint.lessonIds
      .map((id) => lessonPosition.get(id))
      .filter((position): position is number => position !== undefined);
    const base = scope.length > 0 ? Math.max(...scope) : lessons.length * 2 + index * 2;
    const previousCheckpoints = checkpoints.slice(0, index).map((item) => item.id);
    entries.push({
      step: {
        id: checkpoint.id,
        kind: "checkpoint",
        title: checkpoint.title,
        estimatedMinutes: checkpoint.estimatedMinutes,
        prerequisites: [...checkpoint.lessonIds, ...previousCheckpoints],
      },
      position: base + 1,
      order: lessons.length + index,
    });
  });

  return entries
    .sort((a, b) => a.position - b.position || a.order - b.order)
    .map((entry) => entry.step);
}

export function isCourseStepDone(
  progress: CourseProgressLike,
  step: Pick<CourseStep, "id">,
): boolean {
  return progress.lessons[step.id]?.done === true;
}

/** Requisitos de entrada do curso (de outros cursos) ainda pendentes. */
export function missingCourseEntryPrerequisites(
  progress: CourseProgressLike,
  course: { entryPrerequisites?: readonly string[] },
): string[] {
  return (course.entryPrerequisites ?? []).filter(
    (id) => progress.lessons[id]?.done !== true,
  );
}

/** Um curso só abre quando os requisitos de entrada estão concluídos. */
export function isCourseEntryOpen(
  progress: CourseProgressLike,
  course: { entryPrerequisites?: readonly string[] },
): boolean {
  return missingCourseEntryPrerequisites(progress, course).length === 0;
}

/** Um passo só abre quando todos os pré-requisitos curriculares estão concluídos. */
export function isCourseStepUnlocked(
  progress: CourseProgressLike,
  step: Pick<CourseStep, "prerequisites">,
): boolean {
  return step.prerequisites.every((id) => progress.lessons[id]?.done === true);
}

/**
 * Primeiro passo ainda não concluído cujos pré-requisitos estão satisfeitos.
 * Retorna `undefined` quando o curso terminou ou quando só restam passos
 * bloqueados (dados inconsistentes/legados); nunca recomenda conteúdo fechado.
 */
export function nextRecommendedCourseStep(
  progress: CourseProgressLike,
  steps: readonly CourseStep[],
): CourseStep | undefined {
  return steps.find(
    (step) => !isCourseStepDone(progress, step) && isCourseStepUnlocked(progress, step),
  );
}

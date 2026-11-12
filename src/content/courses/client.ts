import type { CourseDefinition } from "./types";

/**
 * Visão serializável de um curso para Client Components. `stepIdPattern` é um
 * `RegExp` usado apenas na validação do servidor e não pode cruzar a fronteira
 * Server → Client do Next.
 */
export type CourseClientView = Omit<CourseDefinition, "stepIdPattern">;

export function courseClientView(course: CourseDefinition): CourseClientView {
  const { stepIdPattern: _stepIdPattern, ...view } = course;
  return view;
}

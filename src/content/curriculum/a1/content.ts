import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { A1_CURRICULUM } from "./blueprint";
import { A1_L01 } from "./lessons/a1-l01";
import type { A1ContentIssue, A1LessonContent } from "./types";
import { validateA1LessonContent } from "./validate-content";

/**
 * Lições A1 efetivamente jogáveis. O blueprint lista 40, mas só entra aqui o
 * que tem dataset, rota e exercícios implementados. Importar este módulo roda
 * a validação estrutural; ele é destinado ao servidor e aos testes, não ao
 * bundle do cliente.
 */
export const A1_IMPLEMENTED_LESSONS: readonly A1LessonContent[] = [A1_L01];

const BY_ID = new Map(A1_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));

export function getA1Lesson(lessonId: string): A1LessonContent | undefined {
  return BY_ID.get(lessonId);
}

export function isA1LessonImplemented(lessonId: string): boolean {
  return BY_ID.has(lessonId);
}

export function validateA1Content(): A1ContentIssue[] {
  return validateA1LessonContent(
    A1_IMPLEMENTED_LESSONS,
    A1_CURRICULUM,
    VOCAB_ENTRIES,
    VOCAB_SENTENCES,
  );
}

export function assertA1Content(): void {
  const issues = validateA1Content();
  if (issues.length > 0) {
    throw new Error(
      `Conteúdo A1 inválido:\n${issues
        .map((issue) => `- [${issue.code}] ${issue.path}: ${issue.message}`)
        .join("\n")}`,
    );
  }
}

assertA1Content();

import { H01 } from "./h01";
import { H02 } from "./h02";
import { H03 } from "./h03";
import type { Lesson } from "../types";

/** Lições com conteúdo implementado, em ordem curricular. */
export const LESSONS: readonly Lesson[] = [H01, H02, H03];

export const IMPLEMENTED_LESSON_IDS = new Set(LESSONS.map((lesson) => lesson.id));

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id);
}

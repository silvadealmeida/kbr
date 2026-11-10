import { H01 } from "./h01";
import { H02 } from "./h02";
import { H03 } from "./h03";
import { H04 } from "./h04";
import { H05 } from "./h05";
import { H06 } from "./h06";
import { H07 } from "./h07";
import { H08 } from "./h08";
import { H09 } from "./h09";
import { H10 } from "./h10";
import type { Lesson } from "../types";

/** Lições com conteúdo implementado, em ordem curricular. */
export const LESSONS: readonly Lesson[] = [
  H01,
  H02,
  H03,
  H04,
  H05,
  H06,
  H07,
  H08,
  H09,
  H10,
];

export const IMPLEMENTED_LESSON_IDS = new Set(LESSONS.map((lesson) => lesson.id));

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id);
}

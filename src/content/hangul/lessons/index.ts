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
import { H11 } from "./h11";
import { H12 } from "./h12";
import { H13 } from "./h13";
import { H14 } from "./h14";
import { H15 } from "./h15";
import { H16 } from "./h16";
import { H17 } from "./h17";
import { H18 } from "./h18";
import { H19 } from "./h19";
import { H20 } from "./h20";
import { H21 } from "./h21";
import { H22 } from "./h22";
import { H23 } from "./h23";
import { H24 } from "./h24";
import { H25 } from "./h25";
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
  H11,
  H12,
  H13,
  H14,
  H15,
  H16,
  H17,
  H18,
  H19,
  H20,
  H21,
  H22,
  H23,
  H24,
  H25,
];

export const IMPLEMENTED_LESSON_IDS = new Set(LESSONS.map((lesson) => lesson.id));

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id);
}

import { A1_CURRICULUM } from "./blueprint";
import { assertA1Blueprint } from "./validate";

export { A1_CHECKPOINTS, A1_CURRICULUM, A1_LESSONS, A1_MODULES } from "./blueprint";
export { A1_LESSON_IDS } from "./ids";
export type * from "./types";
export { assertA1Blueprint, validateA1Blueprint } from "./validate";
export { validateA1LessonContent } from "./validate-content";

assertA1Blueprint(A1_CURRICULUM);

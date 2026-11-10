export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export type SrsState = {
  box: LeitnerBox;
  due: string;
};

export type ReviewGrade = "again" | "correct";

export interface Scheduler {
  review(state: SrsState | undefined, grade: ReviewGrade, now: Date): SrsState;
  due(states: Readonly<Record<string, SrsState>>, now: Date): string[];
}

export { leitner } from "./leitner";
export {
  jamoCardKey,
  parseSrsCardKey,
  scheduleMissedReview,
  syllableCardKey,
  wordCardKey,
  type SrsCardRef,
} from "./cards";

export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export type SrsState = {
  box: LeitnerBox;
  due: string;
  /** Instante da última revisão; ausente em estados legados (inferido da agenda). */
  reviewedAt?: string;
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
  ruleCardKey,
  scheduleMissedReview,
  syllableCardKey,
  wordCardKey,
  SRS_RULE_IDS,
  VOCAB_CARD_PREFIX,
  isVocabCardKey,
  type SrsCardRef,
  type SrsRuleId,
} from "./cards";

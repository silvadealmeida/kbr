import type { LeitnerBox, Scheduler, SrsState } from "@/lib/srs";

const DAY_MS = 24 * 60 * 60 * 1_000;
const INTERVAL_DAYS = [1, 2, 4, 8, 16] as const;

function timestamp(now: Date): number {
  const value = now.getTime();
  if (Number.isNaN(value)) throw new RangeError("Relógio inválido");
  return value;
}

export const leitner: Scheduler = {
  review(state, grade, now) {
    const currentBox = state?.box ?? 0;
    const box = (grade === "again" ? 1 : Math.min(currentBox + 1, 5)) as LeitnerBox;

    return {
      box,
      due: new Date(timestamp(now) + INTERVAL_DAYS[box - 1] * DAY_MS).toISOString(),
    };
  },

  due(states, now) {
    const nowValue = timestamp(now);
    return Object.entries(states)
      .filter(([, state]) => Date.parse(state.due) <= nowValue)
      .map(([cardId]) => cardId);
  },
};

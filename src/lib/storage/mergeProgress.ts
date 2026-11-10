import type { Progress } from "./index";

function recentSide(left: Progress, right: Progress): "left" | "right" | "tie" {
  const leftHasData = Object.keys(left.lessons).length > 0 || Object.keys(left.cards).length > 0 || left.history.length > 0 || left.streak > 0;
  const rightHasData = Object.keys(right.lessons).length > 0 || Object.keys(right.cards).length > 0 || right.history.length > 0 || right.streak > 0;
  if (leftHasData !== rightHasData) return leftHasData ? "left" : "right";

  const difference = Date.parse(left.lastActive) - Date.parse(right.lastActive);
  return difference > 0 ? "left" : difference < 0 ? "right" : "tie";
}

export function mergeProgress(left: Progress, right: Progress): Progress {
  const recent = recentSide(left, right);
  const lessons = { ...left.lessons };
  for (const [id, lesson] of Object.entries(right.lessons)) {
    const current = lessons[id];
    lessons[id] = current
      ? { done: current.done || lesson.done, score: Math.max(current.score, lesson.score) }
      : lesson;
  }

  const cards = { ...left.cards };
  for (const [id, card] of Object.entries(right.cards)) {
    const current = cards[id];
    if (!current || recent === "right") cards[id] = card;
    if (current && recent === "tie") {
      cards[id] = Date.parse(card.due) > Date.parse(current.due)
        ? card
        : Date.parse(card.due) < Date.parse(current.due)
          ? current
          : card.box > current.box ? card : current;
    }
  }

  const attempts = new Map(
    [...left.history, ...right.history].map((attempt) => [
      `${attempt.exerciseId}\0${attempt.at}\0${attempt.correct}`,
      attempt,
    ]),
  );
  const history = [...attempts.values()].sort((a, b) => a.at.localeCompare(b.at));
  const preferRight = recent === "right";

  return {
    v: 1,
    lessons,
    cards,
    history,
    streak: recent === "tie" ? Math.max(left.streak, right.streak) : preferRight ? right.streak : left.streak,
    dailyGoal: recent === "tie" ? Math.max(left.dailyGoal, right.dailyGoal) : preferRight ? right.dailyGoal : left.dailyGoal,
    lastActive: preferRight ? right.lastActive : left.lastActive,
  };
}

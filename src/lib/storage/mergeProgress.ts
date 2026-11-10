import type { SrsState } from "@/lib/srs";
import type { Attempt, Progress } from "./index";

const DAY_MS = 24 * 60 * 60 * 1_000;
/** Mesmos intervalos do scheduler Leitner; usados só para inferir o instante legado. */
const CARD_INTERVAL_MS = [1, 2, 4, 8, 16].map((days) => days * DAY_MS);

function parseTime(value: string | undefined): number | null {
  if (typeof value !== "string") return null;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function normalizeDate(value: string): string {
  const parsed = parseTime(value);
  return parsed === null ? value : new Date(parsed).toISOString();
}

function compareText(left: string, right: string): number {
  return left === right ? 0 : left < right ? -1 : 1;
}

/**
 * Instante lógico da última revisão de um cartão. Estados novos carregam
 * `reviewedAt`; estados legados são inferidos da agenda Leitner
 * (`due = reviewedAt + intervalo[box - 1]`).
 */
export function inferCardReviewedAt(state: Pick<SrsState, "box" | "due">): string | null {
  const due = parseTime(state.due);
  const interval = CARD_INTERVAL_MS[state.box - 1];
  if (due === null || interval === undefined) return null;
  return new Date(due - interval).toISOString();
}

function cardStamp(state: SrsState): number | null {
  return parseTime(state.reviewedAt) ?? parseTime(inferCardReviewedAt(state) ?? undefined);
}

function canonicalCard(state: SrsState): SrsState {
  return {
    box: state.box,
    due: normalizeDate(state.due),
    ...(state.reviewedAt ? { reviewedAt: normalizeDate(state.reviewedAt) } : {}),
  };
}

function canonicalCardJson(state: SrsState): string {
  return JSON.stringify(canonicalCard(state));
}

/**
 * Ordem total dos estados de cartão para o merge. Positivo significa que `left`
 * vence: maior instante de revisão; no empate, menor caixa (política
 * conservadora), menor `due` e, por fim, menor JSON canônico (I7).
 */
export function compareCardStates(left: SrsState, right: SrsState): number {
  const leftStamp = cardStamp(left);
  const rightStamp = cardStamp(right);
  if (leftStamp !== rightStamp) {
    if (leftStamp === null) return -1;
    if (rightStamp === null) return 1;
    return leftStamp > rightStamp ? 1 : -1;
  }

  if (left.box !== right.box) return left.box < right.box ? 1 : -1;

  const leftDue = parseTime(left.due);
  const rightDue = parseTime(right.due);
  if (leftDue !== rightDue) {
    if (leftDue === null) return -1;
    if (rightDue === null) return 1;
    return leftDue < rightDue ? 1 : -1;
  }

  const leftJson = canonicalCardJson(left);
  const rightJson = canonicalCardJson(right);
  if (leftJson === rightJson) return 0;
  return leftJson < rightJson ? 1 : -1;
}

function newerCard(left: SrsState, right: SrsState): SrsState {
  return canonicalCard(compareCardStates(left, right) >= 0 ? left : right);
}

function canonicalAttempt(attempt: Attempt): Attempt {
  return {
    ...(attempt.id ? { id: attempt.id } : {}),
    exerciseId: attempt.exerciseId,
    correct: attempt.correct,
    at: normalizeDate(attempt.at),
  };
}

function attemptIdentity(attempt: Attempt): string {
  return attempt.id
    ? `id:${attempt.id}`
    : `tuple:${attempt.exerciseId}\0${normalizeDate(attempt.at)}\0${attempt.correct}`;
}

function compareAttempts(left: Attempt, right: Attempt): number {
  const leftAt = parseTime(left.at) ?? 0;
  const rightAt = parseTime(right.at) ?? 0;
  if (leftAt !== rightAt) return leftAt - rightAt;

  const leftKey = left.id ?? `${left.exerciseId}\0${left.correct}`;
  const rightKey = right.id ?? `${right.exerciseId}\0${right.correct}`;
  const byKey = compareText(leftKey, rightKey);
  if (byKey !== 0) return byKey;

  return compareText(JSON.stringify(canonicalAttempt(left)), JSON.stringify(canonicalAttempt(right)));
}

/**
 * União determinística do histórico. Tentativas com `id` são deduplicadas por
 * esse id; registros antigos usam a tupla `(exerciseId, at, correct)`. A ordem
 * canônica é por `at`, depois id/tupla e, por fim, JSON canônico (I4/I5).
 */
export function canonicalHistory(attempts: readonly Attempt[]): Attempt[] {
  const byIdentity = new Map<string, Attempt>();
  for (const attempt of attempts) {
    const key = attemptIdentity(attempt);
    const existing = byIdentity.get(key);
    if (!existing) {
      byIdentity.set(key, canonicalAttempt(attempt));
      continue;
    }

    const current = canonicalAttempt(existing);
    const candidate = canonicalAttempt(attempt);
    const currentJson = JSON.stringify(current);
    const candidateJson = JSON.stringify(candidate);
    if (candidateJson < currentJson) byIdentity.set(key, candidate);
  }

  return [...byIdentity.values()].sort(compareAttempts);
}

function mergeLessons(
  left: Progress["lessons"],
  right: Progress["lessons"],
): Progress["lessons"] {
  const merged: Progress["lessons"] = {};
  const ids = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort(compareText);

  for (const id of ids) {
    const a = left[id];
    const b = right[id];
    if (!a) {
      merged[id] = b;
    } else if (!b) {
      merged[id] = a;
    } else {
      merged[id] = {
        done: a.done || b.done,
        score: Math.max(a.score, b.score),
      };
    }
  }

  return merged;
}

function mergeCards(
  left: Progress["cards"],
  right: Progress["cards"],
): Progress["cards"] {
  const merged: Progress["cards"] = {};
  const ids = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort(compareText);

  for (const id of ids) {
    const a = left[id];
    const b = right[id];
    if (!a) {
      merged[id] = canonicalCard(b);
    } else if (!b) {
      merged[id] = canonicalCard(a);
    } else {
      merged[id] = newerCard(a, b);
    }
  }

  return merged;
}

/**
 * Merge determinístico do `Progress` v1. Lições/checkpoints nunca regridem,
 * scores só sobem, cartões são escolhidos por revisão e o histórico é unido
 * sem perder tentativas válidas. Não usa `Math.max` em campos que representam
 * eventos ou agendamento.
 */
export function mergeProgress(left: Progress, right: Progress): Progress {
  const leftActive = parseTime(left.lastActive);
  const rightActive = parseTime(right.lastActive);
  const latestActive = Math.max(
    leftActive ?? Number.NEGATIVE_INFINITY,
    rightActive ?? Number.NEGATIVE_INFINITY,
  );
  const dailyGoal = leftActive === rightActive
    ? Math.max(left.dailyGoal, right.dailyGoal)
    : (rightActive ?? Number.NEGATIVE_INFINITY) > (leftActive ?? Number.NEGATIVE_INFINITY)
      ? right.dailyGoal
      : left.dailyGoal;

  return {
    v: 1,
    lessons: mergeLessons(left.lessons, right.lessons),
    cards: mergeCards(left.cards, right.cards),
    history: canonicalHistory([...left.history, ...right.history]),
    streak: Math.max(left.streak, right.streak),
    dailyGoal,
    lastActive: Number.isFinite(latestActive)
      ? new Date(latestActive).toISOString()
      : left.lastActive,
  };
}

function canonicalProgressJson(progress: Progress): string {
  const lessons = Object.fromEntries(
    Object.keys(progress.lessons)
      .sort(compareText)
      .map((id) => [id, {
        done: progress.lessons[id].done,
        score: progress.lessons[id].score,
      }]),
  );
  const cards = Object.fromEntries(
    Object.keys(progress.cards)
      .sort(compareText)
      .map((id) => [id, canonicalCard(progress.cards[id])]),
  );

  return JSON.stringify({
    v: 1,
    lessons,
    cards,
    history: canonicalHistory(progress.history),
    streak: progress.streak,
    dailyGoal: progress.dailyGoal,
    lastActive: normalizeDate(progress.lastActive),
  });
}

/** Igualdade semântica: ignora ordem de chaves e ordem de tentativas. */
export function progressEquals(left: Progress, right: Progress): boolean {
  return canonicalProgressJson(left) === canonicalProgressJson(right);
}

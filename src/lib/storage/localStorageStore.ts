import {
  PROGRESS_STORAGE_KEY,
  type Progress,
  type ProgressStore,
  type StorageLike,
} from "@/lib/storage";

const DEFAULT_DAILY_GOAL = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDateString(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export function isProgress(value: unknown): value is Progress {
  if (!isRecord(value) || value.v !== 1) return false;
  if (!isRecord(value.lessons) || !isRecord(value.cards) || !Array.isArray(value.history)) {
    return false;
  }

  const lessonsValid = Object.values(value.lessons).every(
    (lesson) =>
      isRecord(lesson) &&
      typeof lesson.done === "boolean" &&
      typeof lesson.score === "number" &&
      Number.isFinite(lesson.score) &&
      lesson.score >= 0 &&
      lesson.score <= 100,
  );
  const cardsValid = Object.values(value.cards).every(
    (card) =>
      isRecord(card) &&
      Number.isInteger(card.box) &&
      typeof card.box === "number" &&
      card.box >= 1 &&
      card.box <= 5 &&
      isDateString(card.due),
  );
  const historyValid = value.history.every(
    (attempt) =>
      isRecord(attempt) &&
      typeof attempt.exerciseId === "string" &&
      typeof attempt.correct === "boolean" &&
      isDateString(attempt.at),
  );

  return (
    lessonsValid &&
    cardsValid &&
    historyValid &&
    Number.isInteger(value.streak) &&
    typeof value.streak === "number" &&
    value.streak >= 0 &&
    Number.isInteger(value.dailyGoal) &&
    typeof value.dailyGoal === "number" &&
    value.dailyGoal > 0 &&
    isDateString(value.lastActive)
  );
}

function migrate(value: unknown): Progress | null {
  if (isProgress(value)) return value;
  if (!isRecord(value) || value.v !== 0) return null;

  const candidate = {
    ...value,
    v: 1,
    dailyGoal: value.dailyGoal ?? DEFAULT_DAILY_GOAL,
  };
  return isProgress(candidate) ? candidate : null;
}

export function createEmptyProgress(now: Date): Progress {
  if (Number.isNaN(now.getTime())) throw new RangeError("Relógio inválido");

  return {
    v: 1,
    lessons: {},
    cards: {},
    history: [],
    streak: 0,
    dailyGoal: DEFAULT_DAILY_GOAL,
    lastActive: now.toISOString(),
  };
}

export function createLocalStorageStore(
  storage: StorageLike,
  now: () => Date = () => new Date(),
): ProgressStore {
  return {
    async load() {
      const empty = () => createEmptyProgress(now());

      try {
        const raw = storage.getItem(PROGRESS_STORAGE_KEY);
        if (raw === null) return empty();

        const parsed: unknown = JSON.parse(raw);
        const progress = migrate(parsed);
        if (progress === null) return empty();

        if (isRecord(parsed) && parsed.v === 0) {
          try {
            storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
          } catch {
            // A migração continua válida em memória mesmo se o navegador bloquear a escrita.
          }
        }
        return progress;
      } catch {
        return empty();
      }
    },

    async save(progress) {
      if (!isProgress(progress)) return false;

      try {
        storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
        return true;
      } catch {
        return false;
      }
    },
  };
}

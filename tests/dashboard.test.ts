import { describe, expect, test } from "vitest";
import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import { SYLLABLES } from "@/content/hangul/syllables";
import {
  buildCourseSteps,
  isCourseStepDone,
  isCourseStepUnlocked,
  nextRecommendedCourseStep,
  nextCourseStepAfter,
} from "@/lib/progress/lesson";
import {
  buildDashboardSummary,
  localDayKey,
  type DashboardOptions,
} from "@/lib/progress/dashboard";
import type { Attempt, Progress, StorageLike } from "@/lib/storage";
import { createEmptyProgress, createLocalStorageStore } from "@/lib/storage";

const NOW = new Date(2026, 10, 10, 12, 0, 0);
const H01_E01 = LESSONS[0]!.exercises[0]!.id;
const H01_E02 = LESSONS[0]!.exercises[1]!.id;
const H02_E01 = LESSONS[1]!.exercises[0]!.id;
const C1_E01 = CHECKPOINTS[0]!.exercises[0]!.id;
const ALL_LESSON_IDS = LESSONS.map((lesson) => lesson.id);
const ALL_CHECKPOINT_IDS = CHECKPOINTS.map((checkpoint) => checkpoint.id);
const ALL_STEP_IDS = [...ALL_LESSON_IDS, ...ALL_CHECKPOINT_IDS];

const options = (now: Date = NOW): DashboardOptions => ({
  now,
  lessons: LESSONS,
  checkpoints: CHECKPOINTS,
});

function attempt(exerciseId: string, correct: boolean, at: Date): Attempt {
  return { exerciseId, correct, at: at.toISOString() };
}

function markDone(progress: Progress, ids: readonly string[], score = 100): Progress {
  for (const id of ids) progress.lessons[id] = { done: true, score };
  return progress;
}

function progressWith(entries: {
  lessons?: readonly string[];
  cards?: Record<string, { box: number; due: string }>;
  history?: Attempt[];
  dailyGoal?: number;
}): Progress {
  const progress = createEmptyProgress(NOW);
  markDone(progress, entries.lessons ?? []);
  if (entries.cards) {
    progress.cards = entries.cards as Progress["cards"];
  }
  progress.history = entries.history ?? [];
  if (entries.dailyGoal) progress.dailyGoal = entries.dailyGoal;
  return progress;
}

function summary(progress: Progress, now: Date = NOW) {
  return buildDashboardSummary(progress, options(now));
}

class MemoryStorage implements StorageLike {
  values = new Map<string, string>();
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("ordem e recomendação do curso", () => {
  test("intercala lições e checkpoints na ordem curricular", () => {
    const steps = buildCourseSteps(LESSONS, CHECKPOINTS);

    expect(steps.map((step) => step.id)).toEqual([
      "h01",
      "h02",
      "h03",
      "h04",
      "h05",
      "h06",
      "h07",
      "h08",
      "h09",
      "h10",
      "c1",
      "h11",
      "h12",
      "h13",
      "h14",
      "h15",
      "c2",
      "h16",
      "h17",
      "h18",
      "h19",
      "h20",
      "c3",
      "h21",
      "h22",
      "h23",
      "h24",
      "h25",
      "c4",
    ]);
    expect(steps.find((step) => step.id === "c1")?.kind).toBe("checkpoint");
    expect(steps.find((step) => step.id === "c1")?.prerequisites).toEqual(
      LESSONS.slice(0, 10).map((lesson) => lesson.id),
    );
    expect(steps.find((step) => step.id === "c4")?.prerequisites).toEqual([
      ...ALL_LESSON_IDS,
      "c1",
      "c2",
      "c3",
    ]);
  });

  test("recomenda o primeiro passo incompleto e desbloqueado", () => {
    const empty = createEmptyProgress(NOW);
    expect(summary(empty).course.nextStep?.id).toBe("h01");

    const throughH09 = markDone(createEmptyProgress(NOW), ALL_LESSON_IDS.slice(0, 9));
    expect(summary(throughH09).course.nextStep?.id).toBe("h10");

    const throughH10 = markDone(createEmptyProgress(NOW), ALL_LESSON_IDS.slice(0, 10));
    expect(summary(throughH10).course.nextStep?.id).toBe("c1");

    markDone(throughH10, ["c1"]);
    expect(summary(throughH10).course.nextStep?.id).toBe("h11");

    const throughH15 = markDone(
      throughH10,
      ALL_LESSON_IDS.slice(10, 15),
    );
    expect(summary(throughH15).course.nextStep?.id).toBe("c2");

    markDone(throughH15, ["c2"]);
    markDone(throughH15, ALL_LESSON_IDS.slice(15, 20));
    expect(summary(throughH15).course.nextStep?.id).toBe("c3");

    markDone(throughH15, ["c3"]);
    markDone(throughH15, ALL_LESSON_IDS.slice(20, 25));
    expect(summary(throughH15).course.nextStep?.id).toBe("c4");
  });

  test("preserva estados concluídos mesmo fora de ordem e prioriza o checkpoint pendente", () => {
    const progress = markDone(createEmptyProgress(NOW), [
      ...ALL_LESSON_IDS.slice(0, 10),
      "h11",
    ]);

    expect(progress.lessons.h11?.done).toBe(true);
    expect(summary(progress).course.nextStep?.id).toBe("c1");
  });

  test("não recomenda passo bloqueado por pré-requisito pendente", () => {
    const progress = markDone(createEmptyProgress(NOW), ["h01", "h02", "h04"]);
    expect(summary(progress).course.nextStep?.id).toBe("h03");
    expect(summary(progress).course.lockedIncompleteSteps).toBeGreaterThan(0);
  });

  test("não recomenda conteúdo inexistente e encerra o curso em c4", () => {
    const complete = markDone(createEmptyProgress(NOW), ALL_STEP_IDS);
    const result = summary(complete);

    expect(result.course.complete).toBe(true);
    expect(result.course.nextStep).toBeNull();
    expect(result.course.percent).toBe(100);
    expect(result.course.completedLessons).toBe(25);
    expect(result.course.completedCheckpoints).toBe(4);
  });

  test("usa o mesmo próximo passo de nextCourseStepAfter", () => {
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h10")?.id).toBe("c1");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c1")?.id).toBe("h11");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c4")).toBeUndefined();

    const steps = buildCourseSteps(LESSONS, CHECKPOINTS);
    const empty = createEmptyProgress(NOW);
    expect(isCourseStepDone(empty, steps[0]!)).toBe(false);
    expect(isCourseStepUnlocked(empty, steps[0]!)).toBe(true);
    expect(nextRecommendedCourseStep(empty, steps)?.id).toBe("h01");
  });
});

describe("resumo do curso", () => {
  test("conta zero progresso sem inventar estatísticas", () => {
    const result = summary(createEmptyProgress(NOW));

    expect(result.course).toMatchObject({
      title: "Hangul",
      level: "Pré-A1",
      totalLessons: 25,
      completedLessons: 0,
      totalCheckpoints: 4,
      completedCheckpoints: 0,
      totalSteps: 29,
      completedSteps: 0,
      percent: 0,
      complete: false,
    });
    expect(result.attempts).toMatchObject({
      total: 0,
      correct: 0,
      accuracy: null,
      exerciseAttempts: 0,
      exerciseAccuracy: null,
      reviewAccuracy: null,
      uniqueExercises: 0,
      uniqueReviewCards: 0,
      attemptedLessons: 0,
      attemptedCheckpoints: 0,
    });
    expect(result.activity).toEqual({
      activeDays: 0,
      todayAttempts: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityAt: null,
    });
    expect(result.review).toMatchObject({
      totalCards: 0,
      unknownCards: 0,
      due: 0,
      overdue: 0,
      dueToday: 0,
      sessionSize: 0,
      nextDue: null,
    });
    expect(result.review.cardsByBox).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    expect(result.recent).toEqual([]);
  });

  test("calcula progresso parcial e próxima lição", () => {
    const progress = progressWith({ lessons: ALL_LESSON_IDS.slice(0, 3) });
    const result = summary(progress);

    expect(result.course.completedLessons).toBe(3);
    expect(result.course.completedCheckpoints).toBe(0);
    expect(result.course.percent).toBe(10);
    expect(result.course.complete).toBe(false);
    expect(result.course.nextStep?.id).toBe("h04");
    expect(result.course.nextStep?.kind).toBe("lesson");
  });

  test("conclui o curso apenas com 25 lições e 4 checkpoints", () => {
    const onlyLessons = summary(markDone(createEmptyProgress(NOW), ALL_LESSON_IDS));
    expect(onlyLessons.course.complete).toBe(false);
    expect(onlyLessons.course.nextStep?.id).toBe("c1");

    const complete = summary(
      markDone(createEmptyProgress(NOW), ALL_LESSON_IDS),
    );
    expect(complete.course.complete).toBe(false);

    const full = summary(markDone(createEmptyProgress(NOW), ALL_STEP_IDS));
    expect(full.course.complete).toBe(true);
    expect(full.course.completedSteps).toBe(29);
    expect(full.course.nextStep).toBeNull();
  });
});

describe("estatísticas de tentativas", () => {
  test("distingue exercícios únicos, tentativas, checkpoints e revisões", () => {
    const history = [
      attempt(H01_E01, true, new Date(2026, 10, 8, 10, 0)),
      attempt(H01_E01, true, new Date(2026, 10, 9, 10, 0)),
      attempt(H01_E02, false, new Date(2026, 10, 9, 11, 0)),
      attempt(H02_E01, true, new Date(2026, 10, 10, 9, 0)),
      attempt(C1_E01, true, new Date(2026, 10, 10, 10, 0)),
      attempt("review:h:word:고기", true, new Date(2026, 10, 10, 10, 30)),
      attempt("exercicio-antigo", false, new Date(2026, 10, 10, 11, 0)),
    ];

    const result = summary(progressWith({ lessons: ALL_LESSON_IDS.slice(0, 3), history }));

    expect(result.attempts).toMatchObject({
      total: 7,
      correct: 5,
      lesson: 4,
      checkpoint: 1,
      review: 1,
      other: 1,
      exerciseAttempts: 5,
      exerciseCorrect: 4,
      reviewCorrect: 1,
      uniqueExercises: 4,
      uniqueReviewCards: 1,
      attemptedLessons: 2,
      attemptedCheckpoints: 1,
    });
    expect(result.attempts.accuracy).toBeCloseTo(5 / 7);
    expect(result.attempts.exerciseAccuracy).toBeCloseTo(4 / 5);
    expect(result.attempts.reviewAccuracy).toBe(1);
  });

  test("calcula precisão apenas quando existe denominador", () => {
    const result = summary(createEmptyProgress(NOW));
    expect(result.attempts.exerciseAccuracy).toBeNull();
    expect(result.attempts.reviewAccuracy).toBeNull();
    expect(result.attempts.accuracy).toBeNull();

    const onlyReview = summary(
      progressWith({
        history: [attempt("review:h:word:고기", false, new Date(2026, 10, 9, 10, 0))],
      }),
    );
    expect(onlyReview.attempts.exerciseAccuracy).toBeNull();
    expect(onlyReview.attempts.reviewAccuracy).toBe(0);
    expect(onlyReview.attempts.accuracy).toBe(0);
  });

  test("ordena atividade recente e ignora datas inválidas", () => {
    const history = [
      attempt(H01_E01, true, new Date(2026, 10, 8, 10, 0)),
      attempt(H01_E02, false, new Date(2026, 10, 10, 10, 0)),
      attempt(H02_E01, true, new Date(2026, 10, 9, 10, 0)),
      { exerciseId: H01_E01, correct: true, at: "data-invalida" } as Attempt,
      { exerciseId: "", correct: true, at: NOW.toISOString() } as Attempt,
    ];

    const result = summary(progressWith({ history }));
    expect(result.attempts.total).toBe(3);
    expect(result.recent.map((item) => item.exerciseId)).toEqual([
      H01_E02,
      H02_E01,
      H01_E01,
    ]);
    expect(result.recent.map((item) => item.category)).toEqual([
      "lesson",
      "lesson",
      "lesson",
    ]);
    expect(result.activity.lastActivityAt).toBe(new Date(2026, 10, 10, 10, 0).toISOString());
  });

  test("identifica revisões e atividades antigas sem quebrar o resumo", () => {
    const result = summary(
      progressWith({
        history: [
          attempt("review:h:rule:liaison", true, new Date(2026, 10, 10, 9, 0)),
          attempt("review:h:word:고기", false, new Date(2026, 10, 10, 8, 0)),
          attempt("antigo-001", true, new Date(2026, 10, 10, 7, 0)),
        ],
      }),
    );

    expect(result.recent[0]).toMatchObject({
      category: "review",
      cardId: "h:rule:liaison",
      detail: "Revisão espaçada",
    });
    expect(result.recent[2]).toMatchObject({
      category: "other",
      label: "antigo-001",
      detail: "Atividade anterior",
    });
    expect(result.recent[0]!.label).toContain("liaison");
  });
});

describe("datas, sequência e virada de dia", () => {
  test("agrupa tentativas pelo dia local", () => {
    const now = new Date(2026, 10, 10, 12, 0, 0);
    const history = [
      attempt(H01_E01, true, new Date(2026, 10, 9, 23, 59)),
      attempt(H01_E02, true, new Date(2026, 10, 10, 0, 1)),
      attempt(H02_E01, true, new Date(2026, 10, 10, 23, 59)),
    ];

    const result = summary(progressWith({ history }), now);
    expect(result.activity.activeDays).toBe(2);
    expect(result.activity.currentStreak).toBe(2);
    expect(result.activity.longestStreak).toBe(2);
    expect(result.activity.todayAttempts).toBe(2);
    expect(localDayKey(new Date(2026, 10, 10, 0, 1))).toBe("2026-11-10");
    expect(localDayKey(new Date(2026, 10, 10, 23, 59))).toBe("2026-11-10");
  });

  test("mantém a sequência quando a última atividade foi ontem", () => {
    const now = new Date(2026, 10, 10, 12, 0, 0);
    const history = [
      attempt(H01_E01, true, new Date(2026, 10, 8, 10, 0)),
      attempt(H01_E02, true, new Date(2026, 10, 9, 10, 0)),
    ];

    const result = summary(progressWith({ history }), now);
    expect(result.activity.currentStreak).toBe(2);
    expect(result.activity.longestStreak).toBe(2);
    expect(result.activity.todayAttempts).toBe(0);
  });

  test("zera a sequência atual após um dia inteiro sem atividade", () => {
    const now = new Date(2026, 10, 10, 12, 0, 0);
    const history = [
      attempt(H01_E01, true, new Date(2026, 10, 7, 10, 0)),
      attempt(H01_E02, true, new Date(2026, 10, 8, 10, 0)),
    ];

    const result = summary(progressWith({ history }), now);
    expect(result.activity.currentStreak).toBe(0);
    expect(result.activity.longestStreak).toBe(2);
  });

  test("rejeita relógio inválido e não altera o progresso", () => {
    const progress = progressWith({
      lessons: ALL_LESSON_IDS.slice(0, 2),
      history: [attempt(H01_E01, true, NOW)],
    });
    const before = JSON.stringify(progress);

    expect(() => summary(progress, new Date("inválida"))).toThrow(RangeError);
    expect(() => summary(progress)).not.toThrow();
    expect(JSON.stringify(progress)).toBe(before);
  });
});

describe("cartões Leitner e fila de revisão", () => {
  test("conta cartões por caixa e distingue vencidos, atrasados e futuros", () => {
    const now = new Date(2026, 10, 10, 12, 0, 0);
    const progress = progressWith({
      cards: {
        "h:jamo:v:ㅏ": { box: 1, due: new Date(2026, 10, 9, 12, 0).toISOString() },
        "h:jamo:c:ㄱ": { box: 2, due: new Date(2026, 10, 10, 11, 0).toISOString() },
        "h:syl:가": { box: 3, due: new Date(2026, 10, 11, 12, 0).toISOString() },
        "h:word:고기": { box: 4, due: new Date(2026, 10, 10, 10, 0).toISOString() },
        "h:rule:liaison": { box: 5, due: new Date(2026, 10, 9, 9, 0).toISOString() },
        "card:desconhecido": { box: 1, due: new Date(2026, 10, 9, 9, 0).toISOString() },
      },
    });

    const result = summary(progress, now);

    expect(result.review.totalCards).toBe(5);
    expect(result.review.unknownCards).toBe(1);
    expect(result.review.cardsByBox).toEqual({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
    expect(result.review.due).toBe(4);
    expect(result.review.overdue).toBe(2);
    expect(result.review.dueToday).toBe(2);
    expect(result.review.sessionSize).toBe(4);
    expect(result.review.nextDue).toBe(new Date(2026, 10, 11, 12, 0).toISOString());
  });

  test("respeita o teto de 20 cartões da sessão", () => {
    const cards = Object.fromEntries(
      SYLLABLES.slice(0, 25).map((syllable) => [
        `h:syl:${syllable.text}`,
        { box: 1, due: new Date(2026, 10, 1, 12, 0).toISOString() },
      ]),
    );
    const result = summary(progressWith({ cards }));

    expect(result.review.totalCards).toBe(25);
    expect(result.review.due).toBe(25);
    expect(result.review.sessionSize).toBe(20);
  });

  test("não inventa cartões quando a fila está vazia", () => {
    const result = summary(createEmptyProgress(NOW));
    expect(result.review).toMatchObject({
      totalCards: 0,
      due: 0,
      sessionSize: 0,
      nextDue: null,
    });
  });
});

describe("persistência e dados legados", () => {
  test("o resumo é o mesmo depois de salvar e recarregar do store", async () => {
    const storage = new MemoryStorage();
    const store = createLocalStorageStore(storage, () => NOW);
    const progress = progressWith({
      lessons: ALL_LESSON_IDS.slice(0, 3),
      cards: {
        "h:word:고기": { box: 2, due: new Date(2026, 10, 9, 12, 0).toISOString() },
      },
      history: [attempt(H01_E01, true, new Date(2026, 10, 9, 12, 0))],
    });

    await expect(store.save(progress)).resolves.toBe(true);
    const loaded = await store.load();

    expect(summary(loaded)).toEqual(summary(progress));
  });

  test("tolera histórico e cartões legados sem quebrar", () => {
    const progress = createEmptyProgress(NOW);
    progress.history = [
      { exerciseId: H01_E01, correct: true, at: "2026-11-10T10:00:00.000Z" },
      { exerciseId: "h99-e01", correct: false, at: "2026-11-10T11:00:00.000Z" },
      { exerciseId: "sem-data", correct: true, at: "não-é-data" },
    ] as Attempt[];
    progress.cards = {
      "h:word:고기": { box: 1, due: "2026-11-09T12:00:00.000Z" },
      "formato-antigo": { box: 2, due: "2026-11-09T12:00:00.000Z" },
      "h:syl:가": { box: 9, due: "ontem" },
    } as unknown as Progress["cards"];

    const result = summary(progress);
    expect(result.attempts.total).toBe(2);
    expect(result.attempts.other).toBe(1);
    expect(result.review.totalCards).toBe(1);
    expect(result.review.unknownCards).toBe(1);
    expect(result.review.due).toBe(1);
  });
});

import { describe, expect, test } from "vitest";
import { LESSONS } from "@/content/hangul";
import {
  completeLesson,
  evaluateLesson,
  isLessonUnlocked,
  nextLessonAfter,
  recordAttempt,
} from "@/lib/progress/lesson";
import { createEmptyProgress, createLocalStorageStore, type Progress } from "@/lib/storage";

const NOW = new Date("2026-11-10T12:00:00.000Z");

function answers(lessonId: string, correctIds: readonly string[]) {
  const lesson = LESSONS.find((item) => item.id === lessonId)!;
  return Object.fromEntries(
    lesson.exercises.map((exercise) => [
      exercise.id,
      { correct: correctIds.includes(exercise.id) },
    ]),
  );
}

describe("progresso de lição", () => {
  test("calcula score arredondado e exige os itens obrigatórios", () => {
    const allH01 = LESSONS[0]!.exercises.map((exercise) => exercise.id);
    const full = evaluateLesson(LESSONS[0]!, answers("h01", allH01));
    expect(full).toMatchObject({ correct: 6, total: 6, score: 100, passed: true });

    const five = evaluateLesson(LESSONS[0]!, answers("h01", allH01.slice(1)));
    expect(five).toMatchObject({ correct: 5, total: 6, score: 83 });
    expect(five.passed).toBe(false);
    expect(five.requiredMet).toBe(false);
  });

  test("h02 passa com 8 de 10", () => {
    const ids = LESSONS[1]!.exercises.map((exercise) => exercise.id);
    const result = evaluateLesson(LESSONS[1]!, answers("h02", ids.slice(0, 8)));
    expect(result).toMatchObject({ correct: 8, total: 10, score: 80, passed: true });
  });

  test("itens de autoavaliação não entram no denominador", () => {
    const lesson = LESSONS[0]!;
    const selfCheck = Object.fromEntries(
      lesson.exercises.map((exercise, index) => [
        exercise.id,
        { correct: true, ...(index === 0 ? { scored: false } : {}) },
      ]),
    );
    const result = evaluateLesson(lesson, selfCheck);
    expect(result.total).toBe(5);
    expect(result.correct).toBe(5);
    expect(result.score).toBe(100);
  });

  test("registra tentativas e atualiza lastActive", () => {
    const progress = createEmptyProgress(NOW);
    const next = recordAttempt(progress, "h01-e01", true, NOW);

    expect(next.history).toEqual([
      { exerciseId: "h01-e01", correct: true, at: NOW.toISOString() },
    ]);
    expect(next.lastActive).toBe(NOW.toISOString());
    expect(progress.history).toHaveLength(0);
  });

  test("concluir guarda o maior score e não desfaz uma conclusão", () => {
    const h02 = LESSONS[1]!;
    const ids = h02.exercises.map((exercise) => exercise.id);

    const first = completeLesson(createEmptyProgress(NOW), h02, answers("h02", ids), NOW);
    expect(first.result.passed).toBe(true);
    expect(first.progress.lessons.h02).toEqual({ done: true, score: 100 });

    const lower = completeLesson(first.progress, h02, answers("h02", ids.slice(0, 2)), NOW);
    expect(lower.progress.lessons.h02).toEqual({ done: true, score: 100 });
    expect(lower.result.passed).toBe(false);
  });

  test("lição fica bloqueada até o pré-requisito ser concluído", () => {
    const progress = createEmptyProgress(NOW);
    expect(isLessonUnlocked(progress, LESSONS[0]!)).toBe(true);
    expect(isLessonUnlocked(progress, LESSONS[1]!)).toBe(false);

    const unlocked: Progress = {
      ...progress,
      lessons: { h01: { done: true, score: 100 } },
    };
    expect(isLessonUnlocked(unlocked, LESSONS[1]!)).toBe(true);
    expect(isLessonUnlocked(unlocked, LESSONS[2]!)).toBe(false);
  });

  test("aponta a próxima lição apenas quando existe", () => {
    expect(nextLessonAfter(LESSONS, "h01")?.id).toBe("h02");
    expect(nextLessonAfter(LESSONS, "h03")).toBeUndefined();
  });

  test("persiste e recarrega o progresso do armazenamento local", async () => {
    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    };

    const store = createLocalStorageStore(storage, () => NOW, "kbr:test:progress");
    const progress = recordAttempt(createEmptyProgress(NOW), "h01-e01", true, NOW);
    const completed = completeLesson(
      progress,
      LESSONS[0]!,
      answers("h01", LESSONS[0]!.exercises.map((exercise) => exercise.id)),
      NOW,
    );

    expect(await store.save(completed.progress)).toBe(true);

    const reloaded = await createLocalStorageStore(
      storage,
      () => NOW,
      "kbr:test:progress",
    ).load();

    expect(reloaded.lessons.h01).toEqual({ done: true, score: 100 });
    expect(reloaded.history).toEqual(completed.progress.history);
    expect(reloaded.lastActive).toBe(NOW.toISOString());
  });
});

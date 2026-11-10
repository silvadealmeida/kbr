import { describe, expect, test } from "vitest";
import { CHECKPOINTS, HANGUL_CURRICULUM, LESSONS } from "@/content/hangul";
import {
  completeCheckpoint,
  completeLesson,
  evaluateCheckpoint,
  evaluateLesson,
  isCheckpointUnlocked,
  isLessonUnlocked,
  nextCourseStepAfter,
  nextLessonAfter,
  recordAttempt,
  requiredCorrect,
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
    expect(nextLessonAfter(LESSONS, "h03")?.id).toBe("h04");
    expect(nextLessonAfter(LESSONS, "h10")?.id).toBe("h11");
    expect(nextLessonAfter(LESSONS, "h15")).toBeUndefined();
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h10")?.id).toBe("c1");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c1")?.id).toBe("h11");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h15")?.id).toBe("c2");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c2")).toBeUndefined();
  });

  test("calcula o mínimo de acertos sem reprovar 19 de 24 por arredondamento", () => {
    expect(requiredCorrect(24, 80)).toBe(19);
    expect(requiredCorrect(20, 80)).toBe(16);
    expect(requiredCorrect(12, 83)).toBe(10);
    expect(requiredCorrect(14, 79)).toBe(11);
    expect(requiredCorrect(0, 80)).toBe(0);
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

function checkpointAnswers(correctIds: readonly string[]) {
  const checkpoint = CHECKPOINTS[0]!;
  return Object.fromEntries(
    checkpoint.exercises.map((exercise) => [
      exercise.id,
      { correct: correctIds.includes(exercise.id) },
    ]),
  );
}

function progressWithAllLessons(): Progress {
  return {
    ...createEmptyProgress(NOW),
    lessons: Object.fromEntries(
      LESSONS.map((lesson) => [lesson.id, { done: true, score: 100 }]),
    ),
  };
}

describe("progresso de lição — critérios adicionais", () => {
  test("h07 reprova quem atinge a nota mas acerta só 2 dos 4 contrastes", () => {
    const h07 = LESSONS.find((lesson) => lesson.id === "h07")!;
    const correctIds = [
      "h07-e01",
      "h07-e02",
      "h07-e05",
      "h07-e06",
      "h07-e07",
      "h07-e08",
      "h07-e09",
      "h07-e10",
      "h07-e11",
      "h07-e12",
    ];
    const result = evaluateLesson(h07, answers("h07", correctIds));
    expect(result.score).toBeGreaterThanOrEqual(h07.completion.minScore);
    expect(result.rules.find((rule) => rule.id === "h07-aspiration")?.met).toBe(false);
    expect(result.passed).toBe(false);
  });

  test("h10 exige pelo menos um acerto em cada contraste de três vias", () => {
    const h10 = LESSONS.find((lesson) => lesson.id === "h10")!;
    const all = h10.exercises.map((exercise) => exercise.id);
    const missedOneContrast = all.filter((id) => id !== "h10-e04");
    const result = evaluateLesson(h10, answers("h10", missedOneContrast));
    expect(result.score).toBeGreaterThanOrEqual(h10.completion.minScore);
    expect(result.rules.find((rule) => rule.id === "h10-contrast-g")?.met).toBe(false);
    expect(result.passed).toBe(false);
  });

  test("diagnóstico agrupa erros por categoria determinística", () => {
    const h06 = LESSONS.find((lesson) => lesson.id === "h06")!;
    const all = h06.exercises.map((exercise) => exercise.id);
    const result = evaluateLesson(
      h06,
      answers("h06", all.filter((id) => id !== "h06-e02" && id !== "h06-e05")),
    );
    const basic = result.diagnostics.find((category) => category.id === "consonant-basic");
    const reading = result.diagnostics.find((category) => category.id === "reading");
    expect(basic).toMatchObject({ missed: 1, total: 5 });
    expect(reading).toMatchObject({ missed: 1, total: 5 });
  });
});

describe("progresso de checkpoint", () => {
  test("só abre com todas as lições do escopo concluídas", () => {
    const c1 = CHECKPOINTS[0]!;
    const empty = createEmptyProgress(NOW);
    expect(isCheckpointUnlocked(empty, c1)).toBe(false);

    const partial: Progress = {
      ...empty,
      lessons: Object.fromEntries(
        LESSONS.slice(0, 9).map((lesson) => [lesson.id, { done: true, score: 100 }]),
      ),
    };
    expect(isCheckpointUnlocked(partial, c1)).toBe(false);
    expect(isCheckpointUnlocked(progressWithAllLessons(), c1)).toBe(true);
  });

  test("aprova com 16 de 20 e reprova com 15", () => {
    const c1 = CHECKPOINTS[0]!;
    const ids = c1.exercises.map((exercise) => exercise.id);

    const pass = evaluateCheckpoint(c1, checkpointAnswers(ids.slice(0, 16)));
    expect(pass).toMatchObject({ correct: 16, total: 20, score: 80, passed: true });

    const fail = evaluateCheckpoint(c1, checkpointAnswers(ids.slice(0, 15)));
    expect(fail).toMatchObject({ correct: 15, total: 20, score: 75, passed: false });
  });

  test("registra o checkpoint no mesmo formato e mantém o maior score", () => {
    const c1 = CHECKPOINTS[0]!;
    const ids = c1.exercises.map((exercise) => exercise.id);

    const first = completeCheckpoint(
      progressWithAllLessons(),
      c1,
      checkpointAnswers(ids),
      NOW,
    );
    expect(first.progress.lessons.c1).toEqual({ done: true, score: 100 });

    const retry = completeCheckpoint(
      first.progress,
      c1,
      checkpointAnswers(ids.slice(0, 10)),
      NOW,
    );
    expect(retry.progress.lessons.c1).toEqual({ done: true, score: 100 });
    expect(retry.result.passed).toBe(false);
  });

  test("refazer sem concluir não cria conclusão falsa", () => {
    const c1 = CHECKPOINTS[0]!;
    const ids = c1.exercises.map((exercise) => exercise.id);
    const result = completeCheckpoint(
      progressWithAllLessons(),
      c1,
      checkpointAnswers(ids.slice(0, 15)),
      NOW,
    );
    expect(result.progress.lessons.c1).toEqual({ done: false, score: 75 });
  });

  test("diagnóstico do checkpoint aponta os itens errados", () => {
    const c1 = CHECKPOINTS[0]!;
    const ids = c1.exercises.map((exercise) => exercise.id);
    const result = evaluateCheckpoint(
      c1,
      checkpointAnswers(ids.filter((id) => id !== "c1-e03" && id !== "c1-e10")),
    );
    expect(result.missedExerciseIds).toEqual(["c1-e03", "c1-e10"]);
    expect(result.diagnostics.find((category) => category.id === "consonant-tense")?.missed).toBe(1);
    expect(result.diagnostics.find((category) => category.id === "reading")?.missed).toBe(1);
  });
});

function c2Answers(correctIds: readonly string[]) {
  const checkpoint = CHECKPOINTS.find((item) => item.id === "c2")!;
  return Object.fromEntries(
    checkpoint.exercises.map((exercise) => [
      exercise.id,
      { correct: correctIds.includes(exercise.id) },
    ]),
  );
}

describe("checkpoint c2 — inventário completo de vogais", () => {
  test("só abre com h01–h15 concluídas", () => {
    const c2 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c2")!;
    const empty = createEmptyProgress(NOW);
    expect(isCheckpointUnlocked(empty, c2)).toBe(false);

    const upToH14: Progress = {
      ...empty,
      lessons: Object.fromEntries(
        LESSONS.filter((lesson) => lesson.id !== "h15").map((lesson) => [
          lesson.id,
          { done: true, score: 100 },
        ]),
      ),
    };
    expect(isCheckpointUnlocked(upToH14, c2)).toBe(false);
    expect(isCheckpointUnlocked(progressWithAllLessons(), c2)).toBe(true);
  });

  test("aprova com 19 de 24 e reprova com 18", () => {
    const c2 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c2")!;
    const ids = c2.exercises.map((exercise) => exercise.id);

    const pass = evaluateCheckpoint(c2, c2Answers(ids.slice(0, 19)));
    expect(pass).toMatchObject({ correct: 19, total: 24, score: 79, passed: true });

    const fail = evaluateCheckpoint(c2, c2Answers(ids.slice(0, 18)));
    expect(fail).toMatchObject({ correct: 18, total: 24, score: 75, passed: false });
  });

  test("mantém conclusão e maior score em retentativas", () => {
    const c2 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c2")!;
    const ids = c2.exercises.map((exercise) => exercise.id);

    const first = completeCheckpoint(
      progressWithAllLessons(),
      c2,
      c2Answers(ids),
      NOW,
    );
    expect(first.progress.lessons.c2).toEqual({ done: true, score: 100 });

    const retry = completeCheckpoint(
      first.progress,
      c2,
      c2Answers(ids.slice(0, 10)),
      NOW,
    );
    expect(retry.progress.lessons.c2).toEqual({ done: true, score: 100 });
    expect(retry.result.passed).toBe(false);
  });

  test("refazer abaixo da nota não cria conclusão falsa", () => {
    const c2 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c2")!;
    const ids = c2.exercises.map((exercise) => exercise.id);
    const result = completeCheckpoint(
      progressWithAllLessons(),
      c2,
      c2Answers(ids.slice(0, 18)),
      NOW,
    );
    expect(result.progress.lessons.c2).toEqual({ done: false, score: 75 });
  });

  test("diagnóstico agrupa erros de vogal composta e leitura", () => {
    const c2 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c2")!;
    const ids = c2.exercises.map((exercise) => exercise.id);
    const result = evaluateCheckpoint(
      c2,
      c2Answers(ids.filter((id) => id !== "c2-e05" && id !== "c2-e16")),
    );
    expect(result.missedExerciseIds).toEqual(["c2-e05", "c2-e16"]);
    expect(
      result.diagnostics.find((category) => category.id === "vowel-compound")?.missed,
    ).toBe(1);
    expect(result.diagnostics.find((category) => category.id === "reading")?.missed).toBe(1);
  });

  test("as 21 vogais aparecem nos cartões SRS do curso", () => {
    const cards = new Set(
      [...LESSONS, ...CHECKPOINTS].flatMap((item) =>
        item.exercises.flatMap((exercise) => exercise.srsCards ?? []),
      ),
    );
    for (const vowel of HANGUL_CURRICULUM.jamo.filter((jamo) => jamo.kind === "vowel")) {
      expect(cards.has(`h:jamo:v:${vowel.symbol}`)).toBe(true);
    }
  });
});

import { describe, expect, test } from "vitest";
import { CHECKPOINTS, HANGUL_CURRICULUM, LESSONS } from "@/content/hangul";
import {
  completeCheckpoint,
  completeLesson,
  evaluateCheckpoint,
  evaluateLesson,
  isCheckpointUnlocked,
  isCourseComplete,
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
    expect(nextLessonAfter(LESSONS, "h15")?.id).toBe("h16");
    expect(nextLessonAfter(LESSONS, "h20")?.id).toBe("h21");
    expect(nextLessonAfter(LESSONS, "h25")).toBeUndefined();
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h10")?.id).toBe("c1");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c1")?.id).toBe("h11");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h15")?.id).toBe("c2");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c2")?.id).toBe("h16");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h20")?.id).toBe("c3");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c3")?.id).toBe("h21");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h24")?.id).toBe("h25");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "h25")?.id).toBe("c4");
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c4")).toBeUndefined();
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

function withCompletedCheckpoints(progress: Progress, ids: readonly string[]): Progress {
  return {
    ...progress,
    lessons: {
      ...progress.lessons,
      ...Object.fromEntries(ids.map((id) => [id, { done: true, score: 100 }])),
    },
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
    expect(isCheckpointUnlocked(empty, c1, CHECKPOINTS)).toBe(false);

    const partial: Progress = {
      ...empty,
      lessons: Object.fromEntries(
        LESSONS.slice(0, 9).map((lesson) => [lesson.id, { done: true, score: 100 }]),
      ),
    };
    expect(isCheckpointUnlocked(partial, c1, CHECKPOINTS)).toBe(false);
    expect(isCheckpointUnlocked(progressWithAllLessons(), c1, CHECKPOINTS)).toBe(true);
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
  test("só abre com h01–h15 e o checkpoint c1 concluídos", () => {
    const c2 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c2")!;
    const empty = createEmptyProgress(NOW);
    expect(isCheckpointUnlocked(empty, c2, CHECKPOINTS)).toBe(false);

    const upToH14: Progress = {
      ...empty,
      lessons: Object.fromEntries(
        LESSONS.filter((lesson) => lesson.id !== "h15").map((lesson) => [
          lesson.id,
          { done: true, score: 100 },
        ]),
      ),
    };
    expect(isCheckpointUnlocked(upToH14, c2, CHECKPOINTS)).toBe(false);
    expect(
      isCheckpointUnlocked(withCompletedCheckpoints(progressWithAllLessons(), ["c1"]), c2, CHECKPOINTS),
    ).toBe(true);
    expect(
      isCheckpointUnlocked(progressWithAllLessons(), c2, CHECKPOINTS),
      "lições posteriores não podem pular c1",
    ).toBe(false);
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

function c3Answers(correctIds: readonly string[]) {
  const checkpoint = CHECKPOINTS.find((item) => item.id === "c3")!;
  return Object.fromEntries(
    checkpoint.exercises.map((exercise) => [
      exercise.id,
      { correct: correctIds.includes(exercise.id) },
    ]),
  );
}

describe("checkpoint c3 — batchim simples e duplos", () => {
  test("só abre com h16–h20 e os checkpoints c1–c2 concluídos", () => {
    const c3 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c3")!;
    const empty = createEmptyProgress(NOW);
    expect(isCheckpointUnlocked(empty, c3, CHECKPOINTS)).toBe(false);

    const upToH19: Progress = {
      ...empty,
      lessons: Object.fromEntries(
        LESSONS.filter((lesson) => lesson.id !== "h20").map((lesson) => [
          lesson.id,
          { done: true, score: 100 },
        ]),
      ),
    };
    expect(isCheckpointUnlocked(upToH19, c3, CHECKPOINTS)).toBe(false);
    expect(
      isCheckpointUnlocked(
        withCompletedCheckpoints(progressWithAllLessons(), ["c1", "c2"]),
        c3,
        CHECKPOINTS,
      ),
    ).toBe(true);
    expect(
      isCheckpointUnlocked(
        withCompletedCheckpoints(progressWithAllLessons(), ["c1"]),
        c3,
        CHECKPOINTS,
      ),
      "c2 é pré-requisito de c3",
    ).toBe(false);
  });

  test("aprova com 19 de 24 e reprova com 18", () => {
    const c3 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c3")!;
    const ids = c3.exercises.map((exercise) => exercise.id);

    const pass = evaluateCheckpoint(c3, c3Answers(ids.slice(0, 19)));
    expect(pass).toMatchObject({ correct: 19, total: 24, score: 79, passed: true });

    const fail = evaluateCheckpoint(c3, c3Answers(ids.slice(0, 18)));
    expect(fail).toMatchObject({ correct: 18, total: 24, score: 75, passed: false });
  });

  test("mantém conclusão e maior score em retentativas", () => {
    const c3 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c3")!;
    const ids = c3.exercises.map((exercise) => exercise.id);

    const first = completeCheckpoint(
      progressWithAllLessons(),
      c3,
      c3Answers(ids),
      NOW,
    );
    expect(first.progress.lessons.c3).toEqual({ done: true, score: 100 });

    const retry = completeCheckpoint(
      first.progress,
      c3,
      c3Answers(ids.slice(0, 10)),
      NOW,
    );
    expect(retry.progress.lessons.c3).toEqual({ done: true, score: 100 });
    expect(retry.result.passed).toBe(false);
  });

  test("refazer abaixo da nota não cria conclusão falsa", () => {
    const c3 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c3")!;
    const ids = c3.exercises.map((exercise) => exercise.id);
    const result = completeCheckpoint(
      progressWithAllLessons(),
      c3,
      c3Answers(ids.slice(0, 18)),
      NOW,
    );
    expect(result.progress.lessons.c3).toEqual({ done: false, score: 75 });
  });

  test("diagnóstico separa batchim simples e duplo", () => {
    const c3 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c3")!;
    const ids = c3.exercises.map((exercise) => exercise.id);
    const result = evaluateCheckpoint(
      c3,
      c3Answers(ids.filter((id) => id !== "c3-e01" && id !== "c3-e09")),
    );
    expect(result.missedExerciseIds).toEqual(["c3-e01", "c3-e09"]);
    expect(
      result.diagnostics.find((category) => category.id === "batchim-simple")?.missed,
    ).toBe(1);
    expect(
      result.diagnostics.find((category) => category.id === "batchim-double")?.missed,
    ).toBe(1);
  });

  test("os finais duplos usam cartões de sílaba/palavra, nunca jamo isolado", () => {
    const doubles = ["ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅄ"];
    const cards = new Set(
      [...LESSONS, ...CHECKPOINTS].flatMap((item) =>
        item.exercises.flatMap((exercise) => exercise.srsCards ?? []),
      ),
    );
    for (const symbol of doubles) {
      expect(cards.has(`h:jamo:c:${symbol}`)).toBe(false);
      expect(cards.has(`h:jamo:v:${symbol}`)).toBe(false);
    }
    expect(cards.has("h:syl:닭")).toBe(true);
    expect(cards.has("h:word:삶")).toBe(true);
  });
});

function c4Answers(correctIds: readonly string[]) {
  const checkpoint = CHECKPOINTS.find((item) => item.id === "c4")!;
  return Object.fromEntries(
    checkpoint.exercises.map((exercise) => [
      exercise.id,
      { correct: correctIds.includes(exercise.id) },
    ]),
  );
}

describe("checkpoint c4 — leitura integrada", () => {
  test("só abre com todas as 25 lições e c1–c3 concluídos", () => {
    const c4 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c4")!;
    const empty = createEmptyProgress(NOW);
    expect(isCheckpointUnlocked(empty, c4, CHECKPOINTS)).toBe(false);

    const withoutH25: Progress = {
      ...empty,
      lessons: Object.fromEntries(
        LESSONS.filter((lesson) => lesson.id !== "h25").map((lesson) => [
          lesson.id,
          { done: true, score: 100 },
        ]),
      ),
    };
    expect(isCheckpointUnlocked(withoutH25, c4, CHECKPOINTS)).toBe(false);
    expect(
      isCheckpointUnlocked(
        withCompletedCheckpoints(progressWithAllLessons(), ["c1", "c2", "c3"]),
        c4,
        CHECKPOINTS,
      ),
    ).toBe(true);
    expect(
      isCheckpointUnlocked(
        withCompletedCheckpoints(progressWithAllLessons(), ["c1", "c2"]),
        c4,
        CHECKPOINTS,
      ),
      "c3 é pré-requisito de c4",
    ).toBe(false);
  });

  test("aprova com 24 de 30 e reprova com 23", () => {
    const c4 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c4")!;
    const ids = c4.exercises.map((exercise) => exercise.id);

    const pass = evaluateCheckpoint(c4, c4Answers(ids.slice(0, 24)));
    expect(pass).toMatchObject({ correct: 24, total: 30, score: 80, passed: true });

    const fail = evaluateCheckpoint(c4, c4Answers(ids.slice(0, 23)));
    expect(fail).toMatchObject({ correct: 23, total: 30, score: 77, passed: false });
  });

  test("mantém conclusão e maior score em retentativas", () => {
    const c4 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c4")!;
    const ids = c4.exercises.map((exercise) => exercise.id);

    const first = completeCheckpoint(
      progressWithAllLessons(),
      c4,
      c4Answers(ids),
      NOW,
    );
    expect(first.progress.lessons.c4).toEqual({ done: true, score: 100 });

    const retry = completeCheckpoint(
      first.progress,
      c4,
      c4Answers(ids.slice(0, 10)),
      NOW,
    );
    expect(retry.progress.lessons.c4).toEqual({ done: true, score: 100 });
    expect(retry.result.passed).toBe(false);
  });

  test("refazer abaixo da nota não cria conclusão falsa", () => {
    const c4 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c4")!;
    const ids = c4.exercises.map((exercise) => exercise.id);
    const result = completeCheckpoint(
      progressWithAllLessons(),
      c4,
      c4Answers(ids.slice(0, 23)),
      NOW,
    );
    expect(result.progress.lessons.c4).toEqual({ done: false, score: 77 });
  });

  test("diagnóstico do c4 separa regras e leitura em contexto", () => {
    const c4 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c4")!;
    const ids = c4.exercises.map((exercise) => exercise.id);
    const result = evaluateCheckpoint(
      c4,
      c4Answers(ids.filter((id) => id !== "c4-e22" && id !== "c4-e30")),
    );
    expect(result.missedExerciseIds).toEqual(["c4-e22", "c4-e30"]);
    expect(result.diagnostics.find((category) => category.id === "aspiration")?.missed).toBe(1);
    expect(
      result.diagnostics.find((category) => category.id === "reading-fluency")?.missed,
    ).toBe(1);
  });

  test("c4 persiste no mesmo Progress v1 após recarga", async () => {
    const c4 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c4")!;
    const ids = c4.exercises.map((exercise) => exercise.id);
    const completed = completeCheckpoint(
      progressWithAllLessons(),
      c4,
      c4Answers(ids.slice(0, 24)),
      NOW,
    );

    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    };

    expect(
      await createLocalStorageStore(storage, () => NOW, "kbr:test:c4").save(
        completed.progress,
      ),
    ).toBe(true);

    const reloaded = await createLocalStorageStore(
      storage,
      () => NOW,
      "kbr:test:c4",
    ).load();
    expect(reloaded.lessons.c4).toEqual({ done: true, score: 80 });
    expect(reloaded.lastActive).toBe(NOW.toISOString());
  });

  test("o curso só é considerado completo com todas as lições e checkpoints", () => {
    const home = createEmptyProgress(NOW);
    expect(isCourseComplete(home, LESSONS, CHECKPOINTS)).toBe(false);

    const onlyLessons = progressWithAllLessons();
    expect(isCourseComplete(onlyLessons, LESSONS, CHECKPOINTS)).toBe(false);

    const complete: Progress = {
      ...onlyLessons,
      lessons: {
        ...onlyLessons.lessons,
        c1: { done: true, score: 100 },
        c2: { done: true, score: 100 },
        c3: { done: true, score: 100 },
        c4: { done: true, score: 80 },
      },
    };
    expect(isCourseComplete(complete, LESSONS, CHECKPOINTS)).toBe(true);
  });
});

describe("lições h21–h25 — critérios e autoavaliação", () => {
  test("h21–h23 aprovam com 11 de 14 e reprovam com 10", () => {
    for (const id of ["h21", "h22", "h23"]) {
      const lesson = LESSONS.find((item) => item.id === id)!;
      const ids = lesson.exercises.map((exercise) => exercise.id);
      expect(evaluateLesson(lesson, answers(id, ids.slice(0, 11))).passed).toBe(true);
      expect(evaluateLesson(lesson, answers(id, ids.slice(0, 10))).passed).toBe(false);
    }
  });

  test("h22 exige os itens e09 e e10 mesmo com nota suficiente", () => {
    const h22 = LESSONS.find((lesson) => lesson.id === "h22")!;
    const ids = h22.exercises.map((exercise) => exercise.id);
    const result = evaluateLesson(h22, answers("h22", ids.filter((id) => id !== "h22-e09")));
    expect(result.score).toBeGreaterThanOrEqual(h22.completion.minScore);
    expect(result.requiredMet).toBe(false);
    expect(result.passed).toBe(false);
  });

  test("h21 exige ao menos 5 dos 8 exemplos de ligação", () => {
    const h21 = LESSONS.find((lesson) => lesson.id === "h21")!;
    const ids = h21.exercises.map((exercise) => exercise.id);
    const result = evaluateLesson(
      h21,
      answers(
        "h21",
        ids.filter((id) => !["h21-e01", "h21-e02", "h21-e03", "h21-e04", "h21-e05"].includes(id)),
      ),
    );
    expect(result.rules.find((rule) => rule.id === "h21-liaison-examples")?.met).toBe(false);
    expect(result.passed).toBe(false);
  });

  test("h24 conta 12 de 14 itens avaliados e ignora a autoavaliação", () => {
    const h24 = LESSONS.find((lesson) => lesson.id === "h24")!;
    const scored = h24.exercises.filter((exercise) => exercise.id !== "h24-e14");
    const response = Object.fromEntries(
      h24.exercises.map((exercise) => [
        exercise.id,
        {
          correct: scored.slice(0, 12).some((item) => item.id === exercise.id),
          scored: exercise.id !== "h24-e14",
        },
      ]),
    );
    const result = evaluateLesson(h24, response);
    expect(result).toMatchObject({ correct: 12, total: 14, score: 86, passed: true });

    const eleven = Object.fromEntries(
      h24.exercises.map((exercise) => [
        exercise.id,
        {
          correct: scored.slice(0, 11).some((item) => item.id === exercise.id),
          scored: exercise.id !== "h24-e14",
        },
      ]),
    );
    expect(evaluateLesson(h24, eleven).passed).toBe(false);
  });

  test("h25 conta 13 de 15 itens avaliados e ignora a autoavaliação", () => {
    const h25 = LESSONS.find((lesson) => lesson.id === "h25")!;
    const scored = h25.exercises.filter((exercise) => exercise.id !== "h25-e16");
    const response = Object.fromEntries(
      h25.exercises.map((exercise) => [
        exercise.id,
        {
          correct: scored.slice(0, 13).some((item) => item.id === exercise.id),
          scored: exercise.id !== "h25-e16",
        },
      ]),
    );
    const result = evaluateLesson(h25, response);
    expect(result).toMatchObject({ correct: 13, total: 15, score: 87, passed: true });

    const twelve = Object.fromEntries(
      h25.exercises.map((exercise) => [
        exercise.id,
        {
          correct: scored.slice(0, 12).some((item) => item.id === exercise.id),
          scored: exercise.id !== "h25-e16",
        },
      ]),
    );
    expect(evaluateLesson(h25, twelve).passed).toBe(false);
  });
});

describe("lições h16–h20 — critérios e limites", () => {
  test("h16 passa com 10 de 12 e reprova com 9", () => {
    const h16 = LESSONS.find((lesson) => lesson.id === "h16")!;
    const ids = h16.exercises.map((exercise) => exercise.id);
    expect(evaluateLesson(h16, answers("h16", ids.slice(0, 10))).passed).toBe(true);
    expect(evaluateLesson(h16, answers("h16", ids.slice(0, 9))).passed).toBe(false);
  });

  test("h18 registra a regra dos cinco itens de som final já vistos", () => {
    const h18 = LESSONS.find((lesson) => lesson.id === "h18")!;
    const ids = h18.exercises.map((exercise) => exercise.id);
    const withoutTable = ids.filter((id) => id !== "h18-e14");
    const result = evaluateLesson(h18, answers("h18", withoutTable));
    expect(result.rules.find((rule) => rule.id === "h18-seen-sounds")?.met).toBe(true);

    const withoutSounds = ids.filter(
      (id) => !["h18-e01", "h18-e02", "h18-e03", "h18-e04", "h18-e05"].includes(id),
    );
    const failed = evaluateLesson(h18, answers("h18", withoutSounds));
    expect(failed.rules.find((rule) => rule.id === "h18-seen-sounds")?.met).toBe(false);
  });

  test("h20 reprova sem a exceção de 밟다 mesmo com nota suficiente", () => {
    const h20 = LESSONS.find((lesson) => lesson.id === "h20")!;
    const ids = h20.exercises.map((exercise) => exercise.id);
    const withoutException = ids.filter((id) => id !== "h20-e09");
    const result = evaluateLesson(h20, answers("h20", withoutException));
    expect(result.score).toBeGreaterThanOrEqual(h20.completion.minScore);
    expect(result.rules.find((rule) => rule.id === "h20-exception")?.met).toBe(false);
    expect(result.passed).toBe(false);
  });
});

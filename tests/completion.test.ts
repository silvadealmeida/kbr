import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { CHECKPOINTS, LESSONS } from "@/content/hangul";
import { CourseCompletionPanel } from "@/components/hangul/CourseCompletionPanel";
import {
  buildCourseCompletionReport,
  type CompletionReportOptions,
} from "@/lib/progress/completion";
import { buildDashboardSummary } from "@/lib/progress/dashboard";
import {
  buildCourseSteps,
  completeCheckpoint,
  evaluateCheckpoint,
  nextCourseStepAfter,
  nextRecommendedCourseStep,
} from "@/lib/progress/lesson";
import { createEmptyProgress, createLocalStorageStore, type Progress } from "@/lib/storage";

const NOW = new Date("2026-11-10T12:00:00.000Z");
const C4 = CHECKPOINTS.find((checkpoint) => checkpoint.id === "c4")!;

function checkpointAnswers(checkpointId: string, correctIds: readonly string[]) {
  const checkpoint = CHECKPOINTS.find((item) => item.id === checkpointId)!;
  return Object.fromEntries(
    checkpoint.exercises.map((exercise) => [
      exercise.id,
      { correct: correctIds.includes(exercise.id) },
    ]),
  );
}

function fullProgress(): Progress {
  const lessons = Object.fromEntries([
    ...LESSONS.map((lesson) => [lesson.id, { done: true, score: 100 }]),
    ...CHECKPOINTS.map((checkpoint) => [
      checkpoint.id,
      { done: true, score: checkpoint.id === "c4" ? 80 : 100 },
    ]),
  ]);

  return {
    ...createEmptyProgress(NOW),
    lessons,
    history: [
      { exerciseId: "h01-e01", correct: true, at: "2026-11-08T10:00:00.000Z" },
      { exerciseId: "h01-e01", correct: false, at: "2026-11-09T10:00:00.000Z" },
      { exerciseId: "c4-e01", correct: true, at: "2026-11-10T10:00:00.000Z" },
      {
        exerciseId: "review:h:word:고기",
        correct: false,
        at: "2026-11-10T11:00:00.000Z",
      },
    ],
  };
}

function reportOptions(overrides: Partial<CompletionReportOptions> = {}): CompletionReportOptions {
  return {
    now: NOW,
    lessons: LESSONS,
    checkpoints: CHECKPOINTS,
    ...overrides,
  };
}

describe("relatório de conclusão do curso", () => {
  test("curso completo mostra lições, checkpoints e estatísticas reais", () => {
    const progress = fullProgress();
    const report = buildCourseCompletionReport(progress, reportOptions());

    expect(report.complete).toBe(true);
    expect(report.completedLessons).toBe(25);
    expect(report.completedCheckpoints).toBe(4);
    expect(report.completedLessonList).toHaveLength(25);
    expect(report.completedLessonList[0]).toMatchObject({ id: "h01", score: 100 });
    expect(report.completedCheckpointList.map((item) => item.id)).toEqual([
      "c1",
      "c2",
      "c3",
      "c4",
    ]);
    expect(report.missingLessonIds).toEqual([]);
    expect(report.missingCheckpointIds).toEqual([]);
    expect(report.stats).toMatchObject({
      attempts: 4,
      correct: 2,
      exerciseAttempts: 3,
      exerciseCorrect: 2,
      reviewAttempts: 1,
      reviewCorrect: 0,
    });
    expect(report.stats.exerciseAccuracy).toBeCloseTo(2 / 3);
    expect(report.stats.accuracy).toBeCloseTo(0.5);
  });

  test("faltando uma lição não conclui o curso", () => {
    const progress = fullProgress();
    progress.lessons = { ...progress.lessons };
    delete progress.lessons.h25;

    const report = buildCourseCompletionReport(progress, reportOptions());
    expect(report.complete).toBe(false);
    expect(report.missingLessonIds).toEqual(["h25"]);
    expect(report.completedLessons).toBe(24);
  });

  test("jornada usa a ordem intercalada real de lições e checkpoints", () => {
    const complete = buildCourseCompletionReport(fullProgress(), reportOptions());

    expect(complete.totalSteps).toBe(29);
    expect(complete.completedSteps).toBe(29);
    expect(complete.currentStepId).toBeNull();
    expect(complete.nextStep).toBeNull();
    expect(complete.journey.map((step) => step.id)).toEqual(
      expect.arrayContaining(["h01", "c1", "h11", "c2", "h21", "c4"]),
    );
    expect(complete.journey.every((step) => step.done && step.score !== null)).toBe(true);
    expect(complete.journey.find((step) => step.kind === "checkpoint")?.id).toBe("c1");
    expect(complete.journey.at(-1)?.id).toBe("c4");
  });

  test("jornada incompleta marca passo atual, concluídos e bloqueados sem inventar score", () => {
    const progress = fullProgress();
    progress.lessons = { h01: { done: true, score: 100 } };
    progress.history = [];

    const report = buildCourseCompletionReport(progress, reportOptions());

    expect(report.complete).toBe(false);
    expect(report.completedSteps).toBe(1);
    expect(report.totalSteps).toBe(29);
    expect(report.currentStepId).toBe("h02");
    expect(report.nextStep).toMatchObject({ id: "h02", kind: "lesson" });
    expect(report.journey.find((step) => step.id === "h01")).toMatchObject({
      done: true,
      score: 100,
      current: false,
      unlocked: true,
    });
    expect(report.journey.find((step) => step.id === "h02")).toMatchObject({
      done: false,
      score: null,
      current: true,
      unlocked: true,
    });
    expect(report.journey.find((step) => step.id === "h03")).toMatchObject({
      done: false,
      current: false,
      unlocked: false,
    });
    expect(report.journey.find((step) => step.id === "c1")).toMatchObject({
      kind: "checkpoint",
      done: false,
      current: false,
      unlocked: false,
    });
  });

  test("faltando um checkpoint não conclui o curso", () => {
    const progress = fullProgress();
    progress.lessons = { ...progress.lessons };
    delete progress.lessons.c3;

    const report = buildCourseCompletionReport(progress, reportOptions());
    expect(report.complete).toBe(false);
    expect(report.missingCheckpointIds).toEqual(["c3"]);
    expect(report.completedCheckpoints).toBe(3);
  });

  test("dados inválidos não produzem conclusão falsa nem estatísticas inventadas", () => {
    const invalid = {
      ...createEmptyProgress(NOW),
      lessons: {
        h01: { done: true, score: 100 },
        h02: { done: "true", score: 100 },
        h25: { done: false, score: 100 },
      },
      history: [
        { exerciseId: "h01-e01", correct: true, at: "data-inválida" },
        { exerciseId: 42, correct: true, at: "2026-11-10T10:00:00.000Z" },
        { exerciseId: "h01-e02", correct: "sim", at: "2026-11-10T10:00:00.000Z" },
        null,
      ],
    } as unknown as Progress;

    const report = buildCourseCompletionReport(invalid, reportOptions());
    expect(report.complete).toBe(false);
    expect(report.completedLessons).toBe(1);
    expect(report.stats.attempts).toBe(0);
    expect(report.stats.accuracy).toBeNull();
  });

  test("resultado final traz acertos, erros e lições relacionadas", () => {
    const ids = C4.exercises.map((exercise) => exercise.id);
    const result = evaluateCheckpoint(
      C4,
      checkpointAnswers(
        "c4",
        ids.filter((id) => !["c4-e22", "c4-e30"].includes(id)),
      ),
    );
    const report = buildCourseCompletionReport(
      fullProgress(),
      reportOptions({ finalCheckpoint: C4, finalResult: result }),
    );

    expect(report.finalAssessment).toMatchObject({
      checkpointId: "c4",
      score: 93,
      correct: 28,
      total: 30,
      incorrect: 2,
      requiredCorrect: 24,
      passed: true,
    });
    expect(report.finalAssessment?.relatedLessonIds).toEqual([
      "h23",
      "h24",
      "h25",
    ]);
    expect(report.finalAssessment?.diagnostics.map((item) => item.id)).toEqual([
      "aspiration",
      "reading-fluency",
    ]);
    expect(report.finalCheckpointScore).toBe(80);
  });

  test("tentativa atual abaixo da nota não apaga a conclusão anterior", () => {
    const ids = C4.exercises.map((exercise) => exercise.id);
    const failed = evaluateCheckpoint(C4, checkpointAnswers("c4", ids.slice(0, 23)));
    const report = buildCourseCompletionReport(
      fullProgress(),
      reportOptions({ finalCheckpoint: C4, finalResult: failed }),
    );

    expect(report.complete).toBe(true);
    expect(report.finalAssessment).toMatchObject({
      correct: 23,
      incorrect: 7,
      passed: false,
    });
  });
});

describe("painel de conclusão", () => {
  test("completo mostra selo, jornada e resumo real sem prometer CEFR", () => {
    const report = buildCourseCompletionReport(fullProgress(), reportOptions());
    const html = renderToStaticMarkup(
      createElement(CourseCompletionPanel, { report }),
    );

    expect(html).toContain("Curso concluído · Hangul · Pré-A1");
    expect(html).toContain("Módulo Hangul concluído");
    expect(html).toContain("Selo de conclusão do módulo Hangul");
    expect(html).toContain("Jornada do módulo");
    expect(html).toContain("29 passos");
    expect(html).toContain("não uma certificação oficial");
    expect(html).toContain("O curso A1 está em desenvolvimento");
    expect(html).toContain("Revisar cartões");
    expect(html).toContain("Progresso nas 25 lições de Hangul");
  });

  test("incompleto só aparece com allowIncomplete e não emite selo", () => {
    const progress = fullProgress();
    progress.lessons = { h01: { done: true, score: 100 } };
    progress.history = [];
    const report = buildCourseCompletionReport(progress, reportOptions());

    expect(
      renderToStaticMarkup(createElement(CourseCompletionPanel, { report })),
    ).toBe("");

    const html = renderToStaticMarkup(
      createElement(CourseCompletionPanel, { report, allowIncomplete: true }),
    );

    expect(html).toContain("Curso em andamento · Hangul · Pré-A1");
    expect(html).toContain("Sua jornada no Hangul");
    expect(html).toContain("1 de 29 passos");
    expect(html).toContain("Retomar jornada em h02");
    expect(html).toContain("Nenhum selo é");
    expect(html).not.toContain("Selo de conclusão do módulo Hangul");
    expect(html).not.toContain("Curso concluído · Hangul · Pré-A1");
  });

  test("compacto não duplica listas nem estatísticas no painel", () => {
    const report = buildCourseCompletionReport(fullProgress(), reportOptions());
    const html = renderToStaticMarkup(
      createElement(CourseCompletionPanel, { report, compact: true }),
    );

    expect(html).toContain("Módulo Hangul concluído");
    expect(html).toContain("Jornada do módulo");
    expect(html).not.toContain("Estatísticas reais");
    expect(html).not.toContain("Resultado do checkpoint final");
    expect(html).not.toContain("Jornada completa:");
  });
});

describe("integridade de conclusão e retentativas", () => {
  test("checkpoint reprovado pode ser refeito e preserva o maior score", () => {
    const ids = C4.exercises.map((exercise) => exercise.id);
    const base: Progress = {
      ...fullProgress(),
      lessons: Object.fromEntries(
        [...LESSONS.map((lesson) => [lesson.id, { done: true, score: 100 }])].concat([
          ["c1", { done: true, score: 100 }],
          ["c2", { done: true, score: 100 }],
          ["c3", { done: true, score: 100 }],
        ]),
      ),
      history: [{ exerciseId: "h01-e01", correct: true, at: "2026-11-08T10:00:00.000Z" }],
    };

    const failed = completeCheckpoint(
      base,
      C4,
      checkpointAnswers("c4", ids.slice(0, 23)),
      NOW,
    );
    expect(failed.result.passed).toBe(false);
    expect(failed.progress.lessons.c4).toEqual({ done: false, score: 77 });
    expect(failed.progress.history).toEqual(base.history);

    const passed = completeCheckpoint(
      failed.progress,
      C4,
      checkpointAnswers("c4", ids.slice(0, 24)),
      NOW,
    );
    expect(passed.progress.lessons.c4).toEqual({ done: true, score: 80 });

    const best = completeCheckpoint(
      passed.progress,
      C4,
      checkpointAnswers("c4", ids),
      NOW,
    );
    expect(best.progress.lessons.c4).toEqual({ done: true, score: 100 });

    const retryLower = completeCheckpoint(
      best.progress,
      C4,
      checkpointAnswers("c4", ids.slice(0, 24)),
      NOW,
    );
    expect(retryLower.result.passed).toBe(true);
    expect(retryLower.progress.lessons.c4).toEqual({ done: true, score: 100 });
    expect(retryLower.progress.history).toEqual(base.history);
    expect(Object.keys(retryLower.progress.lessons)).toHaveLength(29);
  });

  test("refazer uma lição não duplica a chave concluída nem apaga tentativas", () => {
    const progress = fullProgress();
    const before = Object.keys(progress.lessons).length;
    const historyLength = progress.history.length;

    const report = buildCourseCompletionReport(progress, reportOptions());
    expect(report.complete).toBe(true);
    expect(Object.keys(progress.lessons)).toHaveLength(before);
    expect(progress.history).toHaveLength(historyLength);
  });

  test("checkpoints posteriores não podem pular os anteriores em dados inconsistentes", () => {
    const allLessonsOnly: Progress = {
      ...createEmptyProgress(NOW),
      lessons: Object.fromEntries(
        LESSONS.map((lesson) => [lesson.id, { done: true, score: 100 }]),
      ),
    };

    const steps = buildCourseSteps(LESSONS, CHECKPOINTS);
    const c4Step = steps.find((step) => step.id === "c4")!;
    expect(c4Step.prerequisites).toEqual(
      expect.arrayContaining(["h01", "h25", "c1", "c2", "c3"]),
    );
    expect(nextRecommendedCourseStep(allLessonsOnly, steps)?.id).toBe("c1");
  });

  test("navegação encerra em c4 e o painel concorda com a conclusão", () => {
    const progress = fullProgress();
    expect(nextCourseStepAfter(LESSONS, CHECKPOINTS, "c4")).toBeUndefined();
    expect(
      nextRecommendedCourseStep(
        createEmptyProgress(NOW),
        buildCourseSteps(LESSONS, CHECKPOINTS),
      )?.id,
    ).toBe("h01");

    const dashboard = buildDashboardSummary(progress, {
      now: NOW,
      lessons: LESSONS,
      checkpoints: CHECKPOINTS,
    });
    expect(dashboard.course.complete).toBe(true);
    expect(dashboard.course.nextStep).toBeNull();
    expect(
      buildCourseCompletionReport(progress, reportOptions()).complete,
    ).toBe(dashboard.course.complete);
  });

  test("conclusão sobrevive à recarga pelo armazenamento local", async () => {
    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    };
    const progress = fullProgress();

    expect(await createLocalStorageStore(storage, () => NOW, "kbr:test:complete").save(progress)).toBe(
      true,
    );
    const reloaded = await createLocalStorageStore(storage, () => NOW, "kbr:test:complete").load();
    const report = buildCourseCompletionReport(reloaded, reportOptions());

    expect(report.complete).toBe(true);
    expect(report.completedLessons).toBe(25);
    expect(report.completedCheckpoints).toBe(4);
    expect(reloaded.history).toEqual(progress.history);
  });
});

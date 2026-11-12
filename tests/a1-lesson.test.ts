import { describe, expect, it } from "vitest";
import {
  A1_IMPLEMENTED_CHECKPOINTS,
  A1_IMPLEMENTED_LESSONS,
  A1_CURRICULUM,
} from "@/content/curriculum/a1";
import { A1_COURSE } from "@/content/courses";
import { VOCAB_ENTRIES, getVocab, sentencesFor, vocabForLesson } from "@/content/vocabulary";
import {
  a1CheckpointRequiredCorrect,
  a1RequiredCorrect,
  completeA1Checkpoint,
  completeA1Lesson,
  evaluateA1Checkpoint,
  evaluateA1Lesson,
} from "@/lib/a1/lesson";
import {
  a1VocabularyFacts,
  buildA1CompletionReport,
} from "@/lib/a1/completion";
import { summarizeCourseProgress } from "@/lib/courses";
import { isCourseStepUnlocked } from "@/lib/courses/steps";
import { checkAnswer } from "@/lib/exercises";
import { recordAttempt, type AnswerRecord } from "@/lib/progress/lesson";
import { createEmptyProgress } from "@/lib/storage";
import {
  buildVocabQueue,
  isSaved,
  saveMany,
  saveVocab,
  vocabCardKey,
} from "@/lib/vocabulary";

const NOW = new Date("2026-11-12T12:00:00.000Z");
const l01 = A1_IMPLEMENTED_LESSONS[0]!;
const l02 = A1_IMPLEMENTED_LESSONS[1]!;
const c01 = A1_IMPLEMENTED_CHECKPOINTS[0]!;
const c08 = A1_IMPLEMENTED_CHECKPOINTS.at(-1)!;
const steps = new Map(A1_COURSE.steps.map((step) => [step.id, step]));

function answers(
  exercises: readonly { id: string }[],
  correctCount: number,
): Record<string, AnswerRecord> {
  return Object.fromEntries(
    exercises.map((exercise, index) => [
      exercise.id,
      { correct: index < correctCount },
    ]),
  );
}

function markAllDone(ids: readonly string[], score = 100) {
  const progress = createEmptyProgress(NOW);
  for (const id of ids) progress.lessons[id] = { done: true, score };
  return progress;
}

describe("a1-l01 — contagem, distribuição e gabarito", () => {
  it("tem 10 itens, 5 guiados + 5 independentes e a distribuição real 4/2/2/2", () => {
    expect(l01.exercises).toHaveLength(10);
    expect(l01.exercises.filter((exercise) => exercise.stage === "guided")).toHaveLength(5);
    expect(l01.exercises.filter((exercise) => exercise.stage === "independent")).toHaveLength(5);
    const counts = l01.exercises.reduce<Record<string, number>>((acc, exercise) => {
      acc[exercise.type] = (acc[exercise.type] ?? 0) + 1;
      return acc;
    }, {});
    expect(counts).toEqual({ mcq: 4, cloze: 2, listen: 2, translate: 2 });
    expect(new Set(l01.exercises.map((exercise) => exercise.id)).size).toBe(10);
  });

  it("exige 8 de 10 e rejeita 7", () => {
    expect(a1RequiredCorrect(l01)).toBe(8);
    expect(evaluateA1Lesson(l01, answers(l01.exercises, 7))).toMatchObject({
      correct: 7,
      total: 10,
      score: 70,
      passed: false,
      minCorrect: 8,
    });
    expect(evaluateA1Lesson(l01, answers(l01.exercises, 8)).passed).toBe(true);
    expect(evaluateA1Lesson(l01, answers(l01.exercises, 10)).score).toBe(100);
  });

  it("aceita o gabarito declarado e rejeita uma alternativa errada", () => {
    for (const exercise of l01.exercises) {
      if (exercise.type === "mcq") {
        expect(
          checkAnswer(exercise, { kind: "text", value: exercise.correctAnswer }).correct,
          exercise.id,
        ).toBe(true);
        const wrong = exercise.options.find((option) => option !== exercise.correctAnswer)!;
        expect(
          checkAnswer(exercise, { kind: "text", value: wrong }).correct,
          exercise.id,
        ).toBe(false);
      } else if (
        exercise.type === "cloze" ||
        exercise.type === "listen" ||
        exercise.type === "translate"
      ) {
        expect(
          checkAnswer(exercise, { kind: "text", value: exercise.answer }).correct,
          exercise.id,
        ).toBe(true);
        for (const accepted of exercise.acceptedAnswers ?? []) {
          expect(
            checkAnswer(exercise, { kind: "text", value: accepted }).correct,
            `${exercise.id}: ${accepted}`,
          ).toBe(true);
        }
      }
    }
  });
});

describe("curso A1 completo — conteúdo e vocabulário", () => {
  it("tem 40 lições e 8 checkpoints com IDs estáveis", () => {
    expect(A1_IMPLEMENTED_LESSONS).toHaveLength(40);
    expect(A1_IMPLEMENTED_CHECKPOINTS).toHaveLength(8);
    expect(A1_IMPLEMENTED_LESSONS.map((lesson) => lesson.id)).toEqual(
      A1_CURRICULUM.lessons.map((lesson) => lesson.id),
    );
    expect(A1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => checkpoint.id)).toEqual(
      A1_CURRICULUM.checkpoints.map((checkpoint) => checkpoint.id),
    );
  });

  it("cada lição cumpre o plano lexical e cada item novo tem frase contextual", () => {
    for (const lesson of A1_IMPLEMENTED_LESSONS) {
      const plan = A1_CURRICULUM.lessons.find((item) => item.id === lesson.id)!;
      expect(lesson.vocabulary.newIds.length).toBeGreaterThanOrEqual(
        plan.vocabulary.newItems.min,
      );
      expect(lesson.vocabulary.newIds.length).toBeLessThanOrEqual(
        plan.vocabulary.newItems.max,
      );
      expect(lesson.vocabulary.reusedIds.length).toBeGreaterThan(0);
      for (const id of lesson.vocabulary.newIds) {
        expect(sentencesFor(id).length, id).toBeGreaterThanOrEqual(1);
        expect(getVocab(id)?.lesson, id).toBe(lesson.id);
      }
      for (const id of lesson.vocabulary.reusedIds) {
        expect(getVocab(id), id).toBeDefined();
        expect(lesson.vocabulary.newIds).not.toContain(id);
      }
      expect(vocabForLesson("ko-a1", lesson.id).map((entry) => entry.id).sort()).toEqual(
        [...lesson.vocabulary.newIds].sort(),
      );
    }
  });

  it("soma 480–560 identidades distintas e mantém todo o conteúdo em revisão", () => {
    const facts = a1VocabularyFacts(A1_IMPLEMENTED_LESSONS);
    expect(facts.ids.length).toBeGreaterThanOrEqual(480);
    expect(facts.ids.length).toBeLessThanOrEqual(560);
    const a1 = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-a1");
    expect(a1.length).toBeGreaterThanOrEqual(430);
    expect(a1.every((entry) => entry.review.status === "in-review")).toBe(true);
    expect(a1.every((entry) => entry.audioText.trim().length > 0)).toBe(true);
  });
});

describe("progresso, desbloqueio e conclusão", () => {
  it("registra somente a lição e preserva o maior resultado", () => {
    const first = completeA1Lesson(createEmptyProgress(NOW), l01, answers(l01.exercises, 8), NOW);
    expect(first.progress.lessons["a1-l01"]).toEqual({ done: true, score: 80 });
    expect(first.result.passed).toBe(true);

    const retry = completeA1Lesson(
      first.progress,
      l01,
      answers(l01.exercises, 6),
      new Date(NOW.getTime() + 1000),
    );
    expect(retry.progress.lessons["a1-l01"]).toEqual({ done: true, score: 80 });

    const failed = completeA1Lesson(
      createEmptyProgress(NOW),
      l01,
      answers(l01.exercises, 7),
      NOW,
    );
    expect(failed.progress.lessons["a1-l01"]).toEqual({ done: false, score: 70 });
    expect(failed.result.passed).toBe(false);
  });

  it("lição aprovada libera a próxima, mas não o checkpoint do módulo", () => {
    const done = completeA1Lesson(
      createEmptyProgress(NOW),
      l01,
      answers(l01.exercises, 10),
      NOW,
    ).progress;
    expect(isCourseStepUnlocked(done, steps.get("a1-l02")!)).toBe(true);
    expect(isCourseStepUnlocked(done, steps.get("a1-c01")!)).toBe(false);
  });

  it("lição reprovada não libera a próxima", () => {
    const failed = completeA1Lesson(
      createEmptyProgress(NOW),
      l01,
      answers(l01.exercises, 7),
      NOW,
    ).progress;
    expect(isCourseStepUnlocked(failed, steps.get("a1-l02")!)).toBe(false);
  });

  it("checkpoint 1 exige 20 de 25 e não libera a l06 se reprovar", () => {
    expect(a1CheckpointRequiredCorrect(c01)).toBe(20);
    const base = markAllDone(c01.lessonIds);
    const failed = completeA1Checkpoint(base, c01, answers(c01.exercises, 19), NOW);
    expect(failed.result).toMatchObject({ correct: 19, total: 25, passed: false });
    expect(failed.progress.lessons["a1-c01"]).toEqual({ done: false, score: 76 });
    expect(isCourseStepUnlocked(failed.progress, steps.get("a1-l06")!)).toBe(false);

    const passed = completeA1Checkpoint(base, c01, answers(c01.exercises, 20), NOW);
    expect(passed.result.passed).toBe(true);
    expect(passed.progress.lessons["a1-c01"]).toEqual({ done: true, score: 80 });
    expect(isCourseStepUnlocked(passed.progress, steps.get("a1-l06")!)).toBe(true);
  });

  it("checkpoint final exige 32 de 40", () => {
    expect(a1CheckpointRequiredCorrect(c08)).toBe(32);
    expect(evaluateA1Checkpoint(c08, answers(c08.exercises, 31)).passed).toBe(false);
    expect(evaluateA1Checkpoint(c08, answers(c08.exercises, 32)).passed).toBe(true);
  });

  it("o A1 só é concluído com os 48 passos", () => {
    const partial = markAllDone(A1_COURSE.steps.slice(0, 47).map((step) => step.id));
    const facts = a1VocabularyFacts(A1_IMPLEMENTED_LESSONS);
    expect(buildA1CompletionReport(partial, NOW, A1_COURSE, facts)).toMatchObject({
      complete: false,
      completedSteps: 47,
      totalSteps: 48,
      completedLessons: 40,
      completedCheckpoints: 7,
    });
    expect(summarizeCourseProgress(partial, A1_COURSE).complete).toBe(false);

    const complete = markAllDone(A1_COURSE.steps.map((step) => step.id));
    const report = buildA1CompletionReport(complete, NOW, A1_COURSE, facts);
    expect(report).toMatchObject({
      complete: true,
      completedSteps: 48,
      totalSteps: 48,
      completedLessons: 40,
      totalLessons: 40,
      completedCheckpoints: 8,
      totalCheckpoints: 8,
      percent: 100,
    });
    expect(report.vocabIntroduced).toBeGreaterThanOrEqual(430);
    expect(report.vocabSaved).toBe(0);
  });

  it("concluir só a l01 não conclui o curso", () => {
    const done = completeA1Lesson(createEmptyProgress(NOW), l01, answers(l01.exercises, 10), NOW);
    expect(summarizeCourseProgress(done.progress, A1_COURSE)).toMatchObject({
      totalSteps: 48,
      completedSteps: 1,
      complete: false,
      nextStep: { id: "a1-l02" },
    });
  });

  it("preserva lições do Hangul e não cria cartões SRS do Hangul", () => {
    const progress = createEmptyProgress(NOW);
    progress.lessons.h01 = { done: true, score: 100 };
    const done = completeA1Lesson(progress, l01, answers(l01.exercises, 10), NOW);
    expect(done.progress.lessons.h01).toEqual({ done: true, score: 100 });

    const attempted = recordAttempt(
      createEmptyProgress(NOW),
      l01.exercises[0]!.id,
      false,
      NOW,
      "attempt-a1",
    );
    expect(attempted.history).toHaveLength(1);
    expect(attempted.cards).toEqual({});
  });
});

describe("vocabulário opt-in", () => {
  it("salvar é explícito, cria cartões v: e não duplica itens", () => {
    const empty = createEmptyProgress(NOW);
    expect(isSaved(empty, "ko:안녕하세요")).toBe(false);

    const ids = [...l01.vocabulary.newIds, ...l01.vocabulary.reusedIds];
    const saved = saveMany(empty, ids, NOW);
    expect(Object.keys(saved.cards)).toHaveLength(new Set(ids).size);
    expect(Object.keys(saved.cards).every((key) => key.startsWith("v:ko:"))).toBe(true);
    expect(saved.cards[vocabCardKey("ko:안녕하세요")]).toMatchObject({ box: 1 });
    expect(isSaved(saved, "ko:학생")).toBe(true);

    const repeated = saveVocab(saved, "ko:안녕하세요", NOW);
    expect(repeated.cards).toEqual(saved.cards);
    expect(buildVocabQueue(saved, NOW).totalDue).toBe(new Set(ids).size);
  });

  it("concluir uma lição não salva vocabulário automaticamente", () => {
    const done = completeA1Lesson(
      createEmptyProgress(NOW),
      l02,
      answers(l02.exercises, 10),
      NOW,
    ).progress;
    expect(done.cards).toEqual({});
    expect(done.lessons["a1-l02"]).toEqual({ done: true, score: 100 });
  });
});

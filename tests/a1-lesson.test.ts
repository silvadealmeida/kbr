import { describe, expect, it } from "vitest";
import { A1_IMPLEMENTED_LESSONS, A1_CURRICULUM } from "@/content/curriculum/a1";
import { A1_COURSE } from "@/content/courses";
import {
  VOCAB_ENTRIES,
  getVocab,
  sentencesFor,
  vocabForLesson,
} from "@/content/vocabulary";
import {
  a1RequiredCorrect,
  completeA1Lesson,
  evaluateA1Lesson,
} from "@/lib/a1/lesson";
import { summarizeCourseProgress } from "@/lib/courses";
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
const lesson = A1_IMPLEMENTED_LESSONS[0]!;

function answers(correctCount: number): Record<string, AnswerRecord> {
  return Object.fromEntries(
    lesson.exercises.map((exercise, index) => [
      exercise.id,
      { correct: index < correctCount },
    ]),
  );
}

describe("a1-l01 — conteúdo e vocabulário", () => {
  it("é a única lição implementada e cumpre o plano editorial", () => {
    expect(A1_IMPLEMENTED_LESSONS.map((item) => item.id)).toEqual(["a1-l01"]);
    const plan = A1_CURRICULUM.lessons.find((item) => item.id === lesson.id)!;
    expect(lesson.vocabulary.newIds.length).toBeGreaterThanOrEqual(
      plan.vocabulary.newItems.min,
    );
    expect(lesson.vocabulary.newIds.length).toBeLessThanOrEqual(
      plan.vocabulary.newItems.max,
    );
    expect(lesson.vocabulary.reusedIds.length).toBeGreaterThan(0);
    expect(
      lesson.vocabulary.newIds.every((id) => {
        const entry = getVocab(id);
        return entry?.course === "ko-a1" && entry.lesson === lesson.id;
      }),
    ).toBe(true);
  });

  it("cada item novo tem frase contextual; o reuso não cria identidade nova", () => {
    for (const id of lesson.vocabulary.newIds) {
      expect(sentencesFor(id).length, id).toBeGreaterThan(0);
      expect(lesson.vocabulary.sentenceIds).toContain(
        `sent:a1-l01:${getVocab(id)!.ko}`,
      );
    }
    for (const id of lesson.vocabulary.reusedIds) {
      const entry = getVocab(id);
      expect(entry, id).toBeDefined();
      expect(entry!.course).not.toBe("ko-a1");
    }

    const registered = VOCAB_ENTRIES.filter(
      (entry) => entry.course === "ko-a1" && entry.lesson === lesson.id,
    );
    expect(registered.map((entry) => entry.id).sort()).toEqual(
      [...lesson.vocabulary.newIds].sort(),
    );
    expect(
      new Set([...lesson.vocabulary.newIds, ...lesson.vocabulary.reusedIds]).size,
    ).toBe(lesson.vocabulary.newIds.length + lesson.vocabulary.reusedIds.length);
    expect(vocabForLesson("ko-a1", "a1-l01")).toHaveLength(11);
  });

  it("todos os itens novos continuam em revisão", () => {
    for (const id of lesson.vocabulary.newIds) {
      expect(getVocab(id)!.review.status).toBe("in-review");
    }
  });

  it("o diálogo tem tradução completa e o resumo ensina antes de concluir", () => {
    for (const line of lesson.dialogue) {
      expect(line.ko.trim()).not.toBe("");
      expect(line.pt.trim()).not.toBe("");
      expect(line.audioText.trim()).not.toBe("");
    }
    expect(lesson.intro.length).toBeGreaterThanOrEqual(3);
    expect(lesson.summary.length).toBeGreaterThanOrEqual(3);
    expect(lesson.grammar.every((note) => note.examples.length > 0)).toBe(true);
    expect(
      lesson.grammar.flatMap((note) => note.examples).every(
        (example) => example.ko.trim() && example.pt.trim() && example.audioText.trim(),
      ),
    ).toBe(true);
  });

  it("usa só tipos implementados e não avalia antes da prática guiada", () => {
    expect(new Set(lesson.exercises.map((item) => item.type))).toEqual(
      new Set(["mcq", "cloze", "listen", "translate"]),
    );
    const stages = lesson.exercises.map((item) => item.stage);
    expect(stages.slice(0, 5)).toEqual(Array(5).fill("guided"));
    expect(stages.slice(5)).toEqual(Array(5).fill("independent"));
  });

  it("aceita o gabarito declarado e rejeita uma alternativa errada", () => {
    for (const exercise of lesson.exercises) {
      if (exercise.type === "mcq") {
        expect(
          checkAnswer(exercise, { kind: "text", value: exercise.correctAnswer })
            .correct,
          exercise.id,
        ).toBe(true);
        const wrong = exercise.options.find(
          (option) => option !== exercise.correctAnswer,
        )!;
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
      expect(exercise.prompt.trim(), exercise.id).not.toBe("");
      expect(exercise.explanation?.trim(), exercise.id).not.toBe("");
    }
  });
});

describe("a1-l01 — avaliação e progresso", () => {
  it("exige 8 de 10 e não pontua além do total", () => {
    expect(a1RequiredCorrect(lesson)).toBe(8);
    expect(evaluateA1Lesson(lesson, answers(7))).toMatchObject({
      correct: 7,
      total: 10,
      score: 70,
      passed: false,
      minCorrect: 8,
    });
    expect(evaluateA1Lesson(lesson, answers(8)).passed).toBe(true);
    expect(evaluateA1Lesson(lesson, answers(10)).score).toBe(100);
  });

  it("registra somente a lição, preservando o maior resultado", () => {
    const first = completeA1Lesson(createEmptyProgress(NOW), lesson, answers(8), NOW);
    expect(first.progress.lessons["a1-l01"]).toEqual({ done: true, score: 80 });
    expect(Object.keys(first.progress.lessons)).toEqual(["a1-l01"]);
    expect(first.result.passed).toBe(true);

    const retry = completeA1Lesson(first.progress, lesson, answers(6), new Date(NOW.getTime() + 1000));
    expect(retry.progress.lessons["a1-l01"]).toEqual({ done: true, score: 80 });

    const failed = completeA1Lesson(createEmptyProgress(NOW), lesson, answers(7), NOW);
    expect(failed.progress.lessons["a1-l01"]).toEqual({ done: false, score: 70 });
    expect(failed.result.passed).toBe(false);
  });

  it("preserva lições do Hangul ao registrar a lição A1", () => {
    const progress = createEmptyProgress(NOW);
    progress.lessons.h01 = { done: true, score: 100 };
    const done = completeA1Lesson(progress, lesson, answers(10), NOW);

    expect(done.progress.lessons.h01).toEqual({ done: true, score: 100 });
    expect(Object.keys(done.progress.lessons).sort()).toEqual([
      "a1-l01",
      "h01",
    ]);
  });

  it("concluir a lição não conclui o curso A1", () => {
    const done = completeA1Lesson(
      createEmptyProgress(NOW),
      lesson,
      answers(10),
      NOW,
    );
    expect(summarizeCourseProgress(done.progress, A1_COURSE)).toMatchObject({
      totalSteps: 1,
      completedSteps: 1,
      percent: 100,
      complete: false,
      nextStep: null,
    });
  });

  it("uma tentativa errada entra no histórico sem criar cartão SRS do Hangul", () => {
    const progress = recordAttempt(
      createEmptyProgress(NOW),
      lesson.exercises[0]!.id,
      false,
      NOW,
      "attempt-a1",
    );
    expect(progress.history).toHaveLength(1);
    expect(progress.cards).toEqual({});
  });
});

describe("a1-l01 — vocabulário opt-in", () => {
  it("salvar é explícito, cria cartões v: e não duplica itens", () => {
    const empty = createEmptyProgress(NOW);
    expect(isSaved(empty, "ko:안녕하세요")).toBe(false);

    const saved = saveMany(
      empty,
      [...lesson.vocabulary.newIds, ...lesson.vocabulary.reusedIds],
      NOW,
    );
    expect(Object.keys(saved.cards)).toHaveLength(17);
    expect(Object.keys(saved.cards).every((key) => key.startsWith("v:ko:"))).toBe(
      true,
    );
    expect(saved.cards[vocabCardKey("ko:안녕하세요")]).toMatchObject({ box: 1 });
    expect(isSaved(saved, "ko:학생")).toBe(true);

    const repeated = saveVocab(saved, "ko:안녕하세요", NOW);
    expect(repeated.cards).toEqual(saved.cards);
    expect(buildVocabQueue(saved, NOW).totalDue).toBe(17);
  });
});

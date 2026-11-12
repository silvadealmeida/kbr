import { describe, expect, it } from "vitest";
import {
  A2_COURSE,
  A1_COURSE,
} from "@/content/courses";
import { A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1";
import {
  A2_IMPLEMENTED_CHECKPOINTS,
  A2_IMPLEMENTED_LESSONS,
} from "@/content/curriculum/a2";
import {
  VOCAB_ENTRIES,
  VOCAB_SENTENCES,
  getVocab,
  sentencesFor,
} from "@/content/vocabulary";
import {
  a1CheckpointRequiredCorrect,
  a1RequiredCorrect,
  completeA1Checkpoint,
  completeA1Lesson,
  evaluateA1Checkpoint,
  evaluateA1Lesson,
} from "@/lib/a1/lesson";
import {
  buildA1CompletionReport,
  a1VocabularyFacts,
} from "@/lib/a1/completion";
import {
  buildCourseCompletionReport,
  courseVocabularyFacts,
} from "@/lib/courses/completion";
import {
  isCourseEntryOpen,
  isCourseStepUnlocked,
  missingCourseEntryPrerequisites,
  summarizeCourseProgress,
} from "@/lib/courses";
import { checkAnswer, type ExerciseAnswer } from "@/lib/exercises";
import { recordAttempt, type AnswerRecord } from "@/lib/progress/lesson";
import { createEmptyProgress, type Progress } from "@/lib/storage";

const NOW = new Date("2026-11-12T12:00:00.000Z");
const steps = new Map(A2_COURSE.steps.map((step) => [step.id, step]));

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

function markAllDone(ids: readonly string[], score = 100): Progress {
  const progress = createEmptyProgress(NOW);
  for (const id of ids) progress.lessons[id] = { done: true, score };
  return progress;
}

function answerFor(
  exercise: (typeof A2_IMPLEMENTED_LESSONS)[number]["exercises"][number],
): ExerciseAnswer {
  if (exercise.type === "reading") {
    return { kind: "choice", optionId: exercise.correctOptionId ?? "" };
  }
  if (exercise.type === "mcq") {
    return { kind: "text", value: exercise.correctAnswer };
  }
  if (
    exercise.type === "cloze" ||
    exercise.type === "listen" ||
    exercise.type === "translate"
  ) {
    return { kind: "text", value: exercise.answer };
  }
  return { kind: "text", value: "" };
}

describe("curso A2 — estrutura e conteúdo", () => {
  it("tem 48 passos, 40 lições e 8 checkpoints", () => {
    expect(A2_COURSE.steps).toHaveLength(48);
    expect(A2_IMPLEMENTED_LESSONS).toHaveLength(40);
    expect(A2_IMPLEMENTED_CHECKPOINTS).toHaveLength(8);
  });

  it("cada lição tem 10 itens e mínimo 8; checkpoints 25/20 e final 40/32", () => {
    for (const lesson of A2_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(a1RequiredCorrect(lesson)).toBe(8);
    }
    for (const checkpoint of A2_IMPLEMENTED_CHECKPOINTS) {
      const final = checkpoint.id === "a2-c08";
      expect(checkpoint.exercises).toHaveLength(final ? 40 : 25);
      expect(a1CheckpointRequiredCorrect(checkpoint)).toBe(final ? 32 : 20);
    }
  });

  it("todos os gabaritos são aceitos pela correção determinística", () => {
    for (const lesson of A2_IMPLEMENTED_LESSONS) {
      for (const exercise of lesson.exercises) {
        expect(checkAnswer(exercise, answerFor(exercise)).correct, exercise.id).toBe(true);
      }
    }
    for (const checkpoint of A2_IMPLEMENTED_CHECKPOINTS) {
      for (const exercise of checkpoint.exercises) {
        expect(checkAnswer(exercise, answerFor(exercise)).correct, exercise.id).toBe(true);
      }
    }
  });

  it("tem 400 identidades novas, 400 frases e reusos do A1/Hangul", () => {
    const facts = courseVocabularyFacts(A2_IMPLEMENTED_LESSONS);
    expect(facts.introduced).toBe(400);
    expect(facts.reused).toBeGreaterThanOrEqual(100);
    expect(facts.ids.length).toBe(400 + facts.reused);
    const a2Entries = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-a2");
    expect(a2Entries).toHaveLength(400);
    expect(VOCAB_SENTENCES.filter((sentence) => sentence.id.startsWith("sent:a2-"))).toHaveLength(400);
    for (const entry of a2Entries) {
      expect(sentencesFor(entry.id).length, entry.id).toBeGreaterThanOrEqual(1);
      expect(entry.review.status).toBe("in-review");
      expect(getVocab(entry.id)?.id).toBe(entry.id);
    }
  });

  it("não reutiliza formas do A1/Hangul como identidades novas", () => {
    const a1Forms = new Set(
      VOCAB_ENTRIES.filter((entry) => entry.course !== "ko-a2").map((entry) => entry.ko),
    );
    for (const entry of VOCAB_ENTRIES.filter((item) => item.course === "ko-a2")) {
      expect(a1Forms.has(entry.ko), entry.ko).toBe(false);
    }
  });
});

describe("progressão e conclusão A2", () => {
  it("o primeiro passo abre sem pré-requisito interno; o segundo exige o primeiro", () => {
    const empty = createEmptyProgress(NOW);
    expect(isCourseStepUnlocked(empty, steps.get("a2-l01")!)).toBe(true);
    expect(isCourseStepUnlocked(empty, steps.get("a2-l02")!)).toBe(false);
    const afterFirst = markAllDone(["a2-l01"]);
    expect(isCourseStepUnlocked(afterFirst, steps.get("a2-l02")!)).toBe(true);
  });

  it("cada checkpoint exige as cinco lições e os checkpoints anteriores", () => {
    const c02 = steps.get("a2-c02")!;
    const onlyModule = markAllDone(["a2-l06", "a2-l07", "a2-l08", "a2-l09", "a2-l10"]);
    expect(isCourseStepUnlocked(onlyModule, c02)).toBe(false);
    const withPrevious = markAllDone([
      "a2-l06", "a2-l07", "a2-l08", "a2-l09", "a2-l10", "a2-c01",
    ]);
    expect(isCourseStepUnlocked(withPrevious, c02)).toBe(true);
  });

  it("a entrada do A2 exige o a1-c08 e não é automática", () => {
    const empty = createEmptyProgress(NOW);
    expect(isCourseEntryOpen(empty, A2_COURSE)).toBe(false);
    expect(missingCourseEntryPrerequisites(empty, A2_COURSE)).toEqual(["a1-c08"]);
    expect(isCourseEntryOpen(markAllDone(["a1-c08"]), A2_COURSE)).toBe(true);
    expect(isCourseEntryOpen(empty, A1_COURSE)).toBe(true);
  });

  it("avalia lição e checkpoint sem rebaixar o melhor resultado", () => {
    const lesson = A2_IMPLEMENTED_LESSONS[0]!;
    expect(evaluateA1Lesson(lesson, answers(lesson.exercises, 7)).passed).toBe(false);
    expect(evaluateA1Lesson(lesson, answers(lesson.exercises, 8)).passed).toBe(true);
    const progress = createEmptyProgress(NOW);
    const first = completeA1Lesson(progress, lesson, answers(lesson.exercises, 10), NOW);
    expect(first.result.score).toBe(100);
    const retry = completeA1Lesson(first.progress, lesson, answers(lesson.exercises, 8), NOW);
    expect(retry.progress.lessons[lesson.id]).toEqual({ done: true, score: 100 });

    const checkpoint = A2_IMPLEMENTED_CHECKPOINTS[0]!;
    expect(evaluateA1Checkpoint(checkpoint, answers(checkpoint.exercises, 19)).passed).toBe(false);
    expect(evaluateA1Checkpoint(checkpoint, answers(checkpoint.exercises, 20)).passed).toBe(true);
    const cp = completeA1Checkpoint(first.progress, checkpoint, answers(checkpoint.exercises, 25), NOW);
    expect(cp.progress.lessons[checkpoint.id]).toEqual({ done: true, score: 100 });
  });

  it("só conclui o A2 com os 48 passos; o A1 permanece isolado", () => {
    const facts = courseVocabularyFacts(A2_IMPLEMENTED_LESSONS);
    const almost = markAllDone(A2_COURSE.steps.slice(0, 47).map((step) => step.id));
    expect(buildCourseCompletionReport(almost, NOW, A2_COURSE, facts).complete).toBe(false);

    const all = markAllDone(A2_COURSE.steps.map((step) => step.id));
    const report = buildCourseCompletionReport(all, NOW, A2_COURSE, facts);
    expect(report.complete).toBe(true);
    expect(report.completedSteps).toBe(48);
    expect(report.completedLessons).toBe(40);
    expect(report.completedCheckpoints).toBe(8);

    const a1Facts = a1VocabularyFacts(A1_IMPLEMENTED_LESSONS);
    expect(buildA1CompletionReport(all, NOW, A1_COURSE, a1Facts).complete).toBe(false);
    expect(summarizeCourseProgress(all, A1_COURSE).completedSteps).toBe(0);
  });
});

describe("registro de tentativas A2", () => {
  it("grava tentativas sem alterar cartões de vocabulário", () => {
    const empty = createEmptyProgress(NOW);
    const lesson = A2_IMPLEMENTED_LESSONS[0]!;
    const next = recordAttempt(
      empty,
      lesson.exercises[0]!.id,
      true,
      NOW,
      "a2-test-attempt",
    );
    expect(next.history).toHaveLength(1);
    expect(next.cards).toEqual(empty.cards);
    expect(next.lessons).toEqual(empty.lessons);
  });
});

import { describe, expect, it } from "vitest";
import { A2_COURSE, B1_COURSE } from "@/content/courses";
import { A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2";
import {
  B1_IMPLEMENTED_CHECKPOINTS,
  B1_IMPLEMENTED_LESSONS,
} from "@/content/curriculum/b1";
import { VOCAB_ENTRIES, VOCAB_SENTENCES, getVocab, sentencesFor } from "@/content/vocabulary";
import {
  a1CheckpointRequiredCorrect,
  a1RequiredCorrect,
  completeA1Checkpoint,
  completeA1Lesson,
  evaluateA1Checkpoint,
  evaluateA1Lesson,
} from "@/lib/a1/lesson";
import { buildCourseCompletionReport, courseVocabularyFacts } from "@/lib/courses/completion";
import {
  isCourseEntryOpen,
  isCourseStepUnlocked,
  missingCourseEntryPrerequisites,
  summarizeCourseProgress,
} from "@/lib/courses";
import { checkAnswer, type ExerciseAnswer } from "@/lib/exercises";
import { createEmptyProgress, type Progress } from "@/lib/storage";

const NOW = new Date("2026-11-12T12:00:00.000Z");
const steps = new Map(B1_COURSE.steps.map((step) => [step.id, step]));

function markAllDone(ids: readonly string[], score = 100): Progress {
  const progress = createEmptyProgress(NOW);
  for (const id of ids) progress.lessons[id] = { done: true, score };
  return progress;
}

function answerFor(exercise: (typeof B1_IMPLEMENTED_LESSONS)[number]["exercises"][number]): ExerciseAnswer {
  if (exercise.type === "reading") return { kind: "choice", optionId: exercise.correctOptionId ?? "" };
  if (exercise.type === "mcq") return { kind: "text", value: exercise.correctAnswer };
  if (exercise.type === "cloze" || exercise.type === "listen" || exercise.type === "translate") {
    return { kind: "text", value: exercise.answer };
  }
  return { kind: "text", value: "" };
}

describe("curso B1 — estrutura e conteúdo", () => {
  it("tem 48 passos, 40 lições e 8 checkpoints", () => {
    expect(B1_COURSE.steps).toHaveLength(48);
    expect(B1_IMPLEMENTED_LESSONS).toHaveLength(40);
    expect(B1_IMPLEMENTED_CHECKPOINTS).toHaveLength(8);
  });

  it("cada lição tem 10 itens, 5+5 e uma produção independente", () => {
    for (const lesson of B1_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(lesson.exercises.filter((item) => item.stage === "guided")).toHaveLength(5);
      expect(lesson.exercises.filter((item) => item.stage === "independent")).toHaveLength(5);
      expect(a1RequiredCorrect(lesson)).toBe(8);
      expect(lesson.production?.checklist.length).toBeGreaterThanOrEqual(3);
      expect(lesson.production?.guidance.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("checkpoints têm 25/20 e o final 40/32", () => {
    for (const checkpoint of B1_IMPLEMENTED_CHECKPOINTS) {
      const final = checkpoint.id === "b1-c08";
      expect(checkpoint.exercises).toHaveLength(final ? 40 : 25);
      expect(a1CheckpointRequiredCorrect(checkpoint)).toBe(final ? 32 : 20);
      expect(checkpoint.review.status).toBe("in-review");
    }
  });

  it("todos os gabaritos são aceitos pela correção determinística", () => {
    for (const item of [...B1_IMPLEMENTED_LESSONS, ...B1_IMPLEMENTED_CHECKPOINTS]) {
      for (const exercise of item.exercises) {
        expect(checkAnswer(exercise, answerFor(exercise)).correct, exercise.id).toBe(true);
      }
    }
  });

  it("tem 320 identidades novas, 320 frases e reusos anteriores", () => {
    const facts = courseVocabularyFacts(B1_IMPLEMENTED_LESSONS);
    expect(facts.introduced).toBe(320);
    expect(facts.reused).toBeGreaterThan(50);
    expect(VOCAB_ENTRIES.filter((entry) => entry.course === "ko-b1")).toHaveLength(320);
    expect(VOCAB_SENTENCES.filter((sentence) => sentence.id.startsWith("sent:b1-"))).toHaveLength(320);
    for (const entry of VOCAB_ENTRIES.filter((item) => item.course === "ko-b1")) {
      expect(sentencesFor(entry.id).length, entry.id).toBeGreaterThanOrEqual(1);
      expect(getVocab(entry.id)?.id).toBe(entry.id);
    }
  });
});

describe("progressão e conclusão B1", () => {
  it("exige a2-c08 para entrar e não abre automaticamente", () => {
    const empty = createEmptyProgress(NOW);
    expect(isCourseEntryOpen(empty, B1_COURSE)).toBe(false);
    expect(missingCourseEntryPrerequisites(empty, B1_COURSE)).toEqual(["a2-c08"]);
    expect(isCourseEntryOpen(markAllDone(["a2-c08"]), B1_COURSE)).toBe(true);
    expect(isCourseEntryOpen(markAllDone(["a1-c08"]), B1_COURSE)).toBe(false);
  });

  it("checkpoint exige o módulo e os checkpoints anteriores", () => {
    const c03 = steps.get("b1-c03")!;
    expect(isCourseStepUnlocked(markAllDone(["b1-l11", "b1-l12", "b1-l13", "b1-l14", "b1-l15"]), c03)).toBe(false);
    expect(isCourseStepUnlocked(markAllDone(["b1-l11", "b1-l12", "b1-l13", "b1-l14", "b1-l15", "b1-c01", "b1-c02"]), c03)).toBe(true);
  });

  it("avalia lição/checkpoint e preserva o maior score", () => {
    const lesson = B1_IMPLEMENTED_LESSONS[0]!;
    expect(evaluateA1Lesson(lesson, Object.fromEntries(lesson.exercises.map((e, i) => [e.id, { correct: i < 7 }]))).passed).toBe(false);
    const first = completeA1Lesson(createEmptyProgress(NOW), lesson, Object.fromEntries(lesson.exercises.map((e) => [e.id, { correct: true }])), NOW);
    expect(first.progress.lessons[lesson.id]).toEqual({ done: true, score: 100 });
    const checkpoint = B1_IMPLEMENTED_CHECKPOINTS[0]!;
    const cp = completeA1Checkpoint(first.progress, checkpoint, Object.fromEntries(checkpoint.exercises.map((e) => [e.id, { correct: true }])), NOW);
    expect(cp.progress.lessons[checkpoint.id]).toEqual({ done: true, score: 100 });
    expect(evaluateA1Checkpoint(checkpoint, Object.fromEntries(checkpoint.exercises.map((e) => [e.id, { correct: false }]))).passed).toBe(false);
  });

  it("só conclui com 48/48 e isola A2", () => {
    const facts = courseVocabularyFacts(B1_IMPLEMENTED_LESSONS);
    expect(buildCourseCompletionReport(markAllDone(B1_COURSE.steps.slice(0, 47).map((step) => step.id)), NOW, B1_COURSE, facts).complete).toBe(false);
    const all = markAllDone(B1_COURSE.steps.map((step) => step.id));
    expect(buildCourseCompletionReport(all, NOW, B1_COURSE, facts)).toMatchObject({ complete: true, completedSteps: 48, completedLessons: 40, completedCheckpoints: 8 });
    expect(summarizeCourseProgress(all, A2_COURSE).completedSteps).toBe(0);
    const a2Facts = courseVocabularyFacts(A2_IMPLEMENTED_LESSONS);
    expect(buildCourseCompletionReport(all, NOW, A2_COURSE, a2Facts).complete).toBe(false);
  });
});

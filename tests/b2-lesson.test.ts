import { describe, expect, it } from "vitest";
import { B1_COURSE, B2_COURSE, getCourse } from "@/content/courses";
import {
  B2_IMPLEMENTED_CHECKPOINTS,
  B2_IMPLEMENTED_LESSONS,
} from "@/content/curriculum/b2";
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

const NOW = new Date("2026-11-13T12:00:00.000Z");
const steps = new Map(B2_COURSE.steps.map((step) => [step.id, step]));

function markAllDone(ids: readonly string[], score = 100): Progress {
  const progress = createEmptyProgress(NOW);
  for (const id of ids) progress.lessons[id] = { done: true, score };
  return progress;
}

function answerFor(
  exercise: (typeof B2_IMPLEMENTED_LESSONS)[number]["exercises"][number],
): ExerciseAnswer {
  if (exercise.type === "reading") {
    return { kind: "choice", optionId: exercise.correctOptionId ?? "" };
  }
  if (exercise.type === "mcq") return { kind: "text", value: exercise.correctAnswer };
  if (exercise.type === "cloze" || exercise.type === "listen" || exercise.type === "translate") {
    return { kind: "text", value: exercise.answer };
  }
  return { kind: "text", value: "" };
}

describe("curso B2 — estrutura e conteúdo", () => {
  it("está disponível com 48 passos, 40 lições e 8 checkpoints", () => {
    expect(B2_COURSE.status).toBe("available");
    expect(getCourse("ko-b2")).toBe(B2_COURSE);
    expect(B2_COURSE.steps).toHaveLength(48);
    expect(B2_IMPLEMENTED_LESSONS).toHaveLength(40);
    expect(B2_IMPLEMENTED_CHECKPOINTS).toHaveLength(8);
    expect(B2_COURSE.completion).toMatchObject({
      requiresAllSteps: true,
      finalStepId: "b2-c08",
      certification: "none",
    });
    expect(B2_COURSE.entryPrerequisites).toEqual(["b1-c08"]);
  });

  it("cada lição tem 10 itens, 5+5, dois de cada tipo, leitura longa e produção", () => {
    for (const lesson of B2_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(lesson.exercises.filter((item) => item.stage === "guided")).toHaveLength(5);
      expect(lesson.exercises.filter((item) => item.stage === "independent")).toHaveLength(5);
      for (const type of ["mcq", "cloze", "listen", "translate", "reading"]) {
        expect(
          lesson.exercises.filter((item) => item.type === type),
          `${lesson.id}:${type}`,
        ).toHaveLength(2);
      }
      expect(a1RequiredCorrect(lesson)).toBe(8);
      expect(lesson.readingText?.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(lesson.production?.rubric).toHaveLength(5);
      expect(lesson.production?.sample?.ko).toBeTruthy();
      expect(lesson.review.status).toBe("in-review");
    }
  });

  it("checkpoints têm 25/20 e o final 40/32", () => {
    for (const checkpoint of B2_IMPLEMENTED_CHECKPOINTS) {
      const final = checkpoint.id === "b2-c08";
      expect(checkpoint.exercises).toHaveLength(final ? 40 : 25);
      expect(a1CheckpointRequiredCorrect(checkpoint)).toBe(final ? 32 : 20);
      expect(checkpoint.exercises.every((item) => item.stage === "independent")).toBe(true);
      expect(checkpoint.production?.rubric).toHaveLength(5);
      expect(checkpoint.review.status).toBe("in-review");
    }
  });

  it("distribui os itens de checkpoint conforme o plano", () => {
    for (const checkpoint of B2_IMPLEMENTED_CHECKPOINTS) {
      const counts = Object.fromEntries(
        ["listen", "reading", "cloze", "translate", "mcq"].map((type) => [
          type,
          checkpoint.exercises.filter((item) => item.type === type).length,
        ]),
      );
      const expected = checkpoint.id === "b2-c08"
        ? { listen: 10, reading: 10, cloze: 8, translate: 8, mcq: 4 }
        : { listen: 6, reading: 6, cloze: 5, translate: 5, mcq: 3 };
      expect(counts, checkpoint.id).toEqual(expected);
    }
  });

  it("todos os gabaritos são aceitos pela correção determinística", () => {
    for (const item of [...B2_IMPLEMENTED_LESSONS, ...B2_IMPLEMENTED_CHECKPOINTS]) {
      for (const exercise of item.exercises) {
        expect(checkAnswer(exercise, answerFor(exercise)).correct, exercise.id).toBe(true);
      }
    }
  });

  it("todo listen pede a frase completa e todo reading tem texto coreano", () => {
    for (const item of [...B2_IMPLEMENTED_LESSONS, ...B2_IMPLEMENTED_CHECKPOINTS]) {
      for (const exercise of item.exercises) {
        if (exercise.type === "listen") {
          expect(exercise.prompt, exercise.id).toMatch(/frase completa/i);
        }
        if (exercise.type === "reading") {
          expect(exercise.text, exercise.id).toMatch(/[가-힣]/);
        }
      }
    }
  });

  it("b2-l35 usa -는 척하다 corretamente no diálogo e na leitura", () => {
    const lesson = B2_IMPLEMENTED_LESSONS.find((item) => item.id === "b2-l35");

    expect(lesson).toBeDefined();
    expect(lesson?.dialogue[1]?.ko).toContain("아무 일도 없는 척했지만");
    expect(lesson?.readingText?.paragraphs[0]).toContain("아무 일도 없는 척했지만");
    const reading = lesson?.exercises.find((item) => item.id === "b2-l35-e04");
    expect(reading?.type).toBe("reading");
    if (reading?.type !== "reading") throw new Error("b2-l35-e04 deve ser reading");
    expect(reading.text).toContain("아무 일도 없는 척했지만");
  });

  it("tem 320 identidades novas, 320 frases e reusos anteriores", () => {
    const facts = courseVocabularyFacts(B2_IMPLEMENTED_LESSONS);
    expect(facts.introduced).toBe(320);
    expect(facts.reused).toBeGreaterThan(50);
    expect(VOCAB_ENTRIES.filter((entry) => entry.course === "ko-b2")).toHaveLength(320);
    expect(VOCAB_SENTENCES.filter((sentence) => sentence.id.startsWith("sent:b2-"))).toHaveLength(320);
    for (const entry of VOCAB_ENTRIES.filter((item) => item.course === "ko-b2")) {
      expect(sentencesFor(entry.id).length, entry.id).toBeGreaterThanOrEqual(1);
      expect(getVocab(entry.id)?.id).toBe(entry.id);
    }
  });
});

describe("progressão e conclusão B2", () => {
  it("exige b1-c08 e não abre com a1-c08 ou b2 inicial", () => {
    const empty = createEmptyProgress(NOW);
    expect(isCourseEntryOpen(empty, B2_COURSE)).toBe(false);
    expect(missingCourseEntryPrerequisites(empty, B2_COURSE)).toEqual(["b1-c08"]);
    expect(isCourseEntryOpen(markAllDone(["b1-c08"]), B2_COURSE)).toBe(true);
    expect(isCourseEntryOpen(markAllDone(["a1-c08"]), B2_COURSE)).toBe(false);
  });

  it("lição 1 abre sem pré-requisito interno; lição 2 exige a lição 1", () => {
    const empty = createEmptyProgress(NOW);
    expect(isCourseStepUnlocked(empty, steps.get("b2-l01")!)).toBe(true);
    expect(isCourseStepUnlocked(empty, steps.get("b2-l02")!)).toBe(false);
    expect(isCourseStepUnlocked(markAllDone(["b2-l01"]), steps.get("b2-l02")!)).toBe(true);
  });

  it("checkpoint exige o módulo e os checkpoints anteriores", () => {
    const c02 = steps.get("b2-c02")!;
    expect(
      isCourseStepUnlocked(
        markAllDone(["b2-l06", "b2-l07", "b2-l08", "b2-l09", "b2-l10"]),
        c02,
      ),
    ).toBe(false);
    expect(
      isCourseStepUnlocked(
        markAllDone(["b2-l06", "b2-l07", "b2-l08", "b2-l09", "b2-l10", "b2-c01"]),
        c02,
      ),
    ).toBe(true);
    const final = steps.get("b2-c08")!;
    expect(isCourseStepUnlocked(markAllDone(B2_COURSE.steps.slice(0, 46).map((step) => step.id)), final)).toBe(false);
    expect(isCourseStepUnlocked(markAllDone(B2_COURSE.steps.map((step) => step.id)), final)).toBe(true);
  });

  it("avalia lição/checkpoint e preserva o maior score", () => {
    const lesson = B2_IMPLEMENTED_LESSONS[0]!;
    const seven = Object.fromEntries(
      lesson.exercises.map((exercise, index) => [exercise.id, { correct: index < 7 }]),
    );
    expect(evaluateA1Lesson(lesson, seven).passed).toBe(false);

    const first = completeA1Lesson(
      createEmptyProgress(NOW),
      lesson,
      Object.fromEntries(lesson.exercises.map((exercise) => [exercise.id, { correct: true }])),
      NOW,
    );
    expect(first.progress.lessons[lesson.id]).toEqual({ done: true, score: 100 });

    const checkpoint = B2_IMPLEMENTED_CHECKPOINTS[0]!;
    const cp = completeA1Checkpoint(
      first.progress,
      checkpoint,
      Object.fromEntries(checkpoint.exercises.map((exercise) => [exercise.id, { correct: true }])),
      NOW,
    );
    expect(cp.progress.lessons[checkpoint.id]).toEqual({ done: true, score: 100 });
    expect(
      evaluateA1Checkpoint(
        checkpoint,
        Object.fromEntries(checkpoint.exercises.map((exercise) => [exercise.id, { correct: false }])),
      ).passed,
    ).toBe(false);
  });

  it("só conclui com 48/48 e não altera B1", () => {
    const facts = courseVocabularyFacts(B2_IMPLEMENTED_LESSONS);
    const partial = markAllDone(B2_COURSE.steps.slice(0, 46).map((step) => step.id));
    expect(buildCourseCompletionReport(partial, NOW, B2_COURSE, facts).complete).toBe(false);
    const all = markAllDone(B2_COURSE.steps.map((step) => step.id));
    expect(buildCourseCompletionReport(all, NOW, B2_COURSE, facts)).toMatchObject({
      complete: true,
      completedSteps: 48,
      completedLessons: 40,
      completedCheckpoints: 8,
    });
    expect(summarizeCourseProgress(all, B1_COURSE).completedSteps).toBe(0);
  });
});

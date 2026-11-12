import { describe, expect, it } from "vitest";
import {
  A2_CURRICULUM,
  A2_IMPLEMENTED_CHECKPOINTS,
  A2_IMPLEMENTED_LESSONS,
  A2_LESSONS,
  A2_MODULES,
  assertA2Content,
  getA2Checkpoint,
  getA2Lesson,
  validateA2Blueprint,
  validateA2Content,
} from "@/content/curriculum/a2";
import { VOCAB_ENTRIES, VOCAB_SENTENCES, getVocab, sentencesFor } from "@/content/vocabulary";
import { checkAnswer, type ExerciseAnswer } from "@/lib/exercises";

function answerFor(exercise: (typeof A2_IMPLEMENTED_LESSONS)[number]["exercises"][number]): ExerciseAnswer {
  switch (exercise.type) {
    case "reading":
      return { kind: "choice", optionId: exercise.correctOptionId ?? "" };
    case "mcq":
      return { kind: "text", value: exercise.correctAnswer };
    default:
      return { kind: "text", value: exercise.answer };
  }
}

describe("blueprint A2 — estrutura editorial", () => {
  it("tem 8 módulos, 40 lições e 8 checkpoints válidos", () => {
    expect(validateA2Blueprint(A2_CURRICULUM)).toEqual([]);
    expect(A2_MODULES).toHaveLength(8);
    expect(A2_LESSONS).toHaveLength(40);
    expect(A2_CURRICULUM.checkpoints).toHaveLength(8);
  });

  it("mantém IDs e pré-requisitos sem colisão com A1/Hangul", () => {
    const ids = A2_LESSONS.map((lesson) => lesson.id).concat(
      A2_CURRICULUM.checkpoints.map((checkpoint) => checkpoint.id),
    );
    expect(new Set(ids).size).toBe(48);
    for (const id of ids) expect(id).toMatch(/^a2-[lc]\d{2}$/);
  });
});

describe("conteúdo A2 implementado — contrato, gabaritos e vocabulário", () => {
  it("passa na validação estrutural", () => {
    assertA2Content();
    expect(validateA2Content()).toEqual([]);
  });

  it("expõe lookups somente para datasets implementados", () => {
    for (const lesson of A2_IMPLEMENTED_LESSONS) {
      expect(getA2Lesson(lesson.id)?.id).toBe(lesson.id);
    }
    for (const checkpoint of A2_IMPLEMENTED_CHECKPOINTS) {
      expect(getA2Checkpoint(checkpoint.id)?.id).toBe(checkpoint.id);
    }
  });

  it("cada lição tem 10 itens, 5 guiados + 5 independentes e ID único", () => {
    const globalIds = new Set<string>();
    for (const lesson of A2_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(lesson.exercises.filter((item) => item.stage === "guided")).toHaveLength(5);
      expect(lesson.exercises.filter((item) => item.stage === "independent")).toHaveLength(5);
      for (const exercise of lesson.exercises) {
        expect(globalIds.has(exercise.id), exercise.id).toBe(false);
        globalIds.add(exercise.id);
      }
    }
  });

  it("todo gabarito declarado é aceito pela correção determinística", () => {
    const all = [
      ...A2_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
      ...A2_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
    ];
    for (const exercise of all) {
      expect(checkAnswer(exercise, answerFor(exercise)).correct, exercise.id).toBe(true);
      if (exercise.type !== "reading" && exercise.type !== "mcq") {
        for (const accepted of exercise.acceptedAnswers ?? []) {
          expect(
            checkAnswer(exercise, { kind: "text", value: accepted }).correct,
            `${exercise.id}: ${accepted}`,
          ).toBe(true);
        }
      }
    }
  });

  it("todo item novo tem origem A2, frase contextual e identidade única", () => {
    const forms = new Set<string>();
    for (const lesson of A2_IMPLEMENTED_LESSONS) {
      expect(lesson.vocabulary.newIds).toHaveLength(10);
      for (const id of lesson.vocabulary.newIds) {
        const entry = getVocab(id);
        expect(entry?.course, id).toBe("ko-a2");
        expect(entry?.lesson, id).toBe(lesson.id);
        expect(entry?.review.status, id).toBe("in-review");
        expect(sentencesFor(id).length, id).toBeGreaterThanOrEqual(1);
        expect(forms.has(entry!.ko), entry!.ko).toBe(false);
        forms.add(entry!.ko);
      }
      for (const id of lesson.vocabulary.reusedIds) {
        expect(getVocab(id), id).toBeDefined();
      }
    }
    expect(forms.size).toBe(A2_IMPLEMENTED_LESSONS.length * 10);
  });

  it("o registro canônico contém todas as frases e identidades A2", () => {
    const a2Entries = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-a2");
    const a2Sentences = VOCAB_SENTENCES.filter((sentence) =>
      sentence.id.startsWith("sent:a2-"),
    );
    expect(a2Entries.length).toBeGreaterThanOrEqual(A2_IMPLEMENTED_LESSONS.length * 10);
    expect(a2Sentences.length).toBeGreaterThanOrEqual(A2_IMPLEMENTED_LESSONS.length * 10);
    expect(new Set(a2Entries.map((entry) => entry.ko)).size).toBe(a2Entries.length);
    for (const lesson of A2_IMPLEMENTED_LESSONS) {
      for (const id of lesson.vocabulary.newIds) {
        expect(getVocab(id), id).toBeDefined();
      }
    }
  });

  it("checkpoints têm 25 itens (40 no final), escuta e leitura", () => {
    for (const checkpoint of A2_IMPLEMENTED_CHECKPOINTS) {
      expect(checkpoint.exercises.length).toBe(checkpoint.id === "a2-c08" ? 40 : 25);
      expect(checkpoint.exercises.some((exercise) => exercise.type === "listen")).toBe(true);
      expect(
        checkpoint.exercises.some(
          (exercise) => exercise.type === "reading" || exercise.type === "mcq",
        ),
      ).toBe(true);
      expect(checkpoint.minCorrect).toBe(checkpoint.id === "a2-c08" ? 32 : 20);
      expect(checkpoint.passingScore).toBe(80);
      expect(checkpoint.review.status).toBe("in-review");
    }
  });
});

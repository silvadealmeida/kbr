import { describe, expect, test } from "vitest";
import {
  B2_IMPLEMENTED_CHECKPOINTS,
  B2_IMPLEMENTED_LESSONS,
  validateB2Content,
} from "@/content/curriculum/b2";
import { checkAnswer } from "@/lib/exercises";
import {
  sameAnswerText,
  terminalPunctuationVariants,
} from "@/lib/exercises/punctuation";

const ALL = [
  ...B2_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...B2_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];

const TEXT_TYPES = new Set(["cloze", "listen", "translate"]);

function koreanLength(value: string): number {
  return value.replace(/\s/g, "").length;
}

describe("fairness do B2 — validação estrutural", () => {
  test("o conteúdo passa nos validadores compartilhados e específicos", () => {
    expect(validateB2Content()).toEqual([]);
  });

  test("todo item digitado aceita a forma sem pontuação final", () => {
    const strict = ALL.flatMap((exercise) => {
      if (!TEXT_TYPES.has(exercise.type)) return [];
      if (!("answer" in exercise)) return [];
      const variants = terminalPunctuationVariants(exercise.answer);
      if (variants.length === 0) return [];
      return variants.every((variant) =>
        checkAnswer(exercise, { kind: "text", value: variant }).correct,
      )
        ? []
        : [exercise.id];
    });
    expect(strict).toEqual([]);
  });

  test("nenhuma variante aceita repete a resposta", () => {
    const redundant = ALL.flatMap((exercise) => {
      if (!("acceptedAnswers" in exercise) || !exercise.acceptedAnswers) return [];
      return exercise.acceptedAnswers.some((value) =>
        sameAnswerText(value, exercise.answer),
      )
        ? [exercise.id]
        : [];
    });
    expect(redundant).toEqual([]);
  });

  test("todo listen tem áudio igual à resposta ou a uma variante", () => {
    const bad = ALL.flatMap((exercise) => {
      if (exercise.type !== "listen") return [];
      const accepted = [exercise.answer, ...(exercise.acceptedAnswers ?? [])];
      return accepted.some((value) => sameAnswerText(value, exercise.audioText))
        ? []
        : [exercise.id];
    });
    expect(bad).toEqual([]);
  });

  test("todo MCQ tem gabarito entre as opções", () => {
    const bad = ALL.flatMap((exercise) =>
      exercise.type === "mcq" && !exercise.options.includes(exercise.correctAnswer)
        ? [exercise.id]
        : [],
    );
    expect(bad).toEqual([]);
  });

  test("todo reading MCQ tem correctOptionId existente", () => {
    const bad = ALL.flatMap((exercise) =>
      exercise.type === "reading" &&
      !exercise.options?.some((option) => option.id === exercise.correctOptionId)
        ? [exercise.id]
        : [],
    );
    expect(bad).toEqual([]);
  });

  test("não há IDs de exercício duplicados no B2", () => {
    const ids = ALL.map((exercise) => exercise.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("lições e checkpoints têm produção com rubrica e exemplo", () => {
    for (const item of [...B2_IMPLEMENTED_LESSONS, ...B2_IMPLEMENTED_CHECKPOINTS]) {
      expect(item.production?.rubric, item.id).toHaveLength(5);
      expect(item.production?.sample?.ko, item.id).toMatch(/[가-힣]/);
      expect(item.production?.sample?.notePt, item.id).toMatch(/não é gabarito|não copie/i);
    }
  });

  test("todo texto-âncora tem três parágrafos e extensão suficiente", () => {
    for (const lesson of B2_IMPLEMENTED_LESSONS) {
      const paragraphs = lesson.readingText?.paragraphs ?? [];
      expect(paragraphs, lesson.id).toHaveLength(3);
      const total = paragraphs.reduce((sum, paragraph) => sum + koreanLength(paragraph), 0);
      expect(total, lesson.id).toBeGreaterThanOrEqual(250);
      for (const paragraph of paragraphs) {
        expect(paragraph, lesson.id).toMatch(/[가-힣]/);
      }
    }
  });

  test("toda lição ensina duas notas com exemplos e reusa uma forma anterior", () => {
    for (const lesson of B2_IMPLEMENTED_LESSONS) {
      expect(lesson.grammar, lesson.id).toHaveLength(2);
      for (const note of lesson.grammar) {
        expect(note.examples.length, note.id).toBeGreaterThanOrEqual(2);
        expect(note.explanationPt.length, note.id).toBeGreaterThan(80);
      }
      if (lesson.id !== "b2-l01") {
        expect(lesson.vocabulary.reusedIds.length, lesson.id).toBeGreaterThan(0);
      }
    }
  });
});

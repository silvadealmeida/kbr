import { describe, expect, test } from "vitest";

import { HANGUL_CURRICULUM } from "@/content/hangul";
import { A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1";
import { A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2";
import { B1_IMPLEMENTED_CHECKPOINTS, B1_IMPLEMENTED_LESSONS } from "@/content/curriculum/b1";
import { B2_IMPLEMENTED_CHECKPOINTS, B2_IMPLEMENTED_LESSONS } from "@/content/curriculum/b2";
import { C1_IMPLEMENTED_CHECKPOINTS, C1_IMPLEMENTED_LESSONS } from "@/content/curriculum/c1";
import { C2_IMPLEMENTED_CHECKPOINTS, C2_IMPLEMENTED_LESSONS } from "@/content/curriculum/c2";
import { COURSE_REGISTRY, validateCourseRegistry } from "@/content/courses";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { checkAnswer, type ExerciseSpec } from "@/lib/exercises";
import { terminalPunctuationVariants } from "@/lib/exercises/punctuation";

type Step = {
  id: string;
  level: string;
  exercises: readonly ExerciseSpec[];
};

const COURSE_STEPS: Step[] = [
  ...A1_IMPLEMENTED_LESSONS.map((lesson) => ({ id: lesson.id, level: "A1", exercises: lesson.exercises })),
  ...A1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => ({ id: checkpoint.id, level: "A1", exercises: checkpoint.exercises })),
  ...A2_IMPLEMENTED_LESSONS.map((lesson) => ({ id: lesson.id, level: "A2", exercises: lesson.exercises })),
  ...A2_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => ({ id: checkpoint.id, level: "A2", exercises: checkpoint.exercises })),
  ...B1_IMPLEMENTED_LESSONS.map((lesson) => ({ id: lesson.id, level: "B1", exercises: lesson.exercises })),
  ...B1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => ({ id: checkpoint.id, level: "B1", exercises: checkpoint.exercises })),
  ...B2_IMPLEMENTED_LESSONS.map((lesson) => ({ id: lesson.id, level: "B2", exercises: lesson.exercises })),
  ...B2_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => ({ id: checkpoint.id, level: "B2", exercises: checkpoint.exercises })),
  ...C1_IMPLEMENTED_LESSONS.map((lesson) => ({ id: lesson.id, level: "C1", exercises: lesson.exercises })),
  ...C1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => ({ id: checkpoint.id, level: "C1", exercises: checkpoint.exercises })),
  ...C2_IMPLEMENTED_LESSONS.map((lesson) => ({ id: lesson.id, level: "C2", exercises: lesson.exercises })),
  ...C2_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => ({ id: checkpoint.id, level: "C2", exercises: checkpoint.exercises })),
  ...HANGUL_CURRICULUM.lessons.map((lesson) => ({ id: lesson.id, level: "Hangul", exercises: lesson.exercises })),
  ...HANGUL_CURRICULUM.checkpoints.map((checkpoint) => ({ id: checkpoint.id, level: "Hangul", exercises: checkpoint.exercises })),
];

const ALL_EXERCISES = COURSE_STEPS.flatMap((step) => step.exercises.map((exercise) => ({ step, exercise })));
const LANGUAGE_EXERCISES = ALL_EXERCISES.filter(({ step }) => step.id.match(/^(?:a[12]|b[12]|c[12])-/));

function koreanRatio(text: string): number {
  const chars = [...text.replace(/\s/g, "")];
  if (chars.length === 0) return 0;
  return chars.filter((char) => /[가-힣]/.test(char)).length / chars.length;
}

describe("auditoria 13C — invariantes técnicos A1–C2", () => {
  test("registro de cursos e conteúdo C1/C2 passam nos validadores", () => {
    expect(validateCourseRegistry()).toEqual([]);
    for (const course of COURSE_REGISTRY) {
      if (course.status === "available") {
        expect(course.steps.length, course.id).toBeGreaterThan(0);
        expect(course.completion.finalStepId, course.id).toBe(course.steps.at(-1)?.id);
      }
    }
  });

  test("IDs de exercício são globais e únicos", () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const { step, exercise } of ALL_EXERCISES) {
      if (seen.has(exercise.id)) duplicates.push(`${exercise.id} em ${seen.get(exercise.id)} e ${step.id}`);
      seen.set(exercise.id, step.id);
    }
    expect(duplicates).toEqual([]);
  });

  test("todo gabarito é aceito e toda variante de pontuação é aceita", () => {
    const problems: string[] = [];
    for (const { step, exercise } of LANGUAGE_EXERCISES) {
      if (exercise.type === "reading") {
        const ok = checkAnswer(exercise, { kind: "choice", optionId: exercise.correctOptionId ?? "" });
        if (!ok.correct) problems.push(`${step.id}/${exercise.id}: opção correta não aceita`);
        continue;
      }
      if (exercise.type === "mcq") {
        const ok = checkAnswer(exercise, { kind: "text", value: exercise.correctAnswer });
        if (!ok.correct) problems.push(`${step.id}/${exercise.id}: alternativa correta não aceita`);
        continue;
      }
      if (exercise.type === "cloze" || exercise.type === "listen" || exercise.type === "translate") {
        const ok = checkAnswer(exercise, { kind: "text", value: exercise.answer });
        if (!ok.correct) problems.push(`${step.id}/${exercise.id}: resposta não aceita`);
        for (const variant of terminalPunctuationVariants(exercise.answer)) {
          if (!checkAnswer(exercise, { kind: "text", value: variant }).correct) {
            problems.push(`${step.id}/${exercise.id}: variante de pontuação rejeitada (${variant})`);
          }
        }
      }
    }
    expect(problems).toEqual([]);
  });

  test("opções não se repetem e o gabarito está entre elas", () => {
    const problems: string[] = [];
    for (const { step, exercise } of LANGUAGE_EXERCISES) {
      if (exercise.type === "mcq") {
        if (!exercise.options.includes(exercise.correctAnswer)) problems.push(`${step.id}/${exercise.id}: gabarito fora das opções`);
        if (new Set(exercise.options).size !== exercise.options.length) problems.push(`${step.id}/${exercise.id}: opções duplicadas`);
      }
      if (exercise.type === "reading") {
        const options = exercise.options ?? [];
        if (!options.some((option) => option.id === exercise.correctOptionId)) problems.push(`${step.id}/${exercise.id}: opção correta ausente`);
        if (new Set(options.map((option) => option.label)).size !== options.length) problems.push(`${step.id}/${exercise.id}: rótulos duplicados`);
        if (new Set(options.map((option) => option.id)).size !== options.length) problems.push(`${step.id}/${exercise.id}: ids de opção duplicados`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("listen não declara áudio diferente da resposta", () => {
    const problems: string[] = [];
    for (const { step, exercise } of LANGUAGE_EXERCISES) {
      if (exercise.type !== "listen") continue;
      if (exercise.audioText.normalize("NFC") !== exercise.answer.normalize("NFC")) {
        const accepted = exercise.acceptedAnswers ?? [];
        if (!accepted.some((value) => value.normalize("NFC") === exercise.audioText.normalize("NFC"))) {
          problems.push(`${step.id}/${exercise.id}: áudio ≠ resposta`);
        }
      }
      if (!/[가-힣]/.test(exercise.audioText)) problems.push(`${step.id}/${exercise.id}: áudio sem Hangul`);
      const words = exercise.answer.trim().split(/\s+/).filter(Boolean);
      if (words.length >= 2 && !/frase completa/i.test(exercise.prompt)) {
        problems.push(`${step.id}/${exercise.id}: listen não pede frase completa`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("textos avaliados contêm coreano e traduções contêm português", () => {
    const problems: string[] = [];
    for (const { step, exercise } of ALL_EXERCISES) {
      if (exercise.type === "reading") {
        if (koreanRatio(exercise.text) < 0.4) problems.push(`${step.id}/${exercise.id}: leitura com pouco coreano`);
      }
      if (exercise.type === "listen" && koreanRatio(exercise.audioText) < 0.4) {
        problems.push(`${step.id}/${exercise.id}: áudio com pouco coreano`);
      }
    }
    for (const sentence of VOCAB_SENTENCES) {
      if (!/[가-힣]/.test(sentence.ko)) problems.push(`${sentence.id}: frase sem coreano`);
      if (!sentence.pt.trim()) problems.push(`${sentence.id}: tradução vazia`);
    }
    expect(problems).toEqual([]);
  });

  test("vocabulário não repete formas entre cursos e cada item tem frase", () => {
    const byForm = new Map<string, string[]>();
    for (const entry of VOCAB_ENTRIES) {
      byForm.set(entry.ko, [...(byForm.get(entry.ko) ?? []), entry.id]);
    }
    const duplicates = [...byForm.entries()].filter(([, ids]) => ids.length > 1);
    const withoutSentence = VOCAB_ENTRIES.filter(
      (entry) =>
        entry.course !== "hangul" &&
        !VOCAB_SENTENCES.some((sentence) => sentence.vocabId === entry.id),
    );
    expect(duplicates).toEqual([]);
    expect(withoutSentence.map((entry) => entry.id)).toEqual([]);
  });

  test("revisão não é declarada sem revisor e data", () => {
    const problems: string[] = [];
    const check = (review: { status: string; reviewedBy?: string; reviewedAt?: string }, path: string) => {
      if (review.status === "reviewed" && (!review.reviewedBy || !review.reviewedAt)) problems.push(path);
    };
    for (const lesson of [
      ...A1_IMPLEMENTED_LESSONS, ...A2_IMPLEMENTED_LESSONS, ...B1_IMPLEMENTED_LESSONS,
      ...B2_IMPLEMENTED_LESSONS, ...C1_IMPLEMENTED_LESSONS, ...C2_IMPLEMENTED_LESSONS,
    ]) {
      check(lesson.review, lesson.id);
      for (const line of lesson.dialogue) check(line.review, `${lesson.id}/${line.id}`);
      if (lesson.readingText) check(lesson.readingText.review, `${lesson.id}/reading`);
    }
    expect(problems).toEqual([]);
  });

  test("a produção aberta nunca entra no denominador automático", () => {
    const problems: string[] = [];
    for (const item of [
      ...C1_IMPLEMENTED_LESSONS, ...C1_IMPLEMENTED_CHECKPOINTS,
      ...C2_IMPLEMENTED_LESSONS, ...C2_IMPLEMENTED_CHECKPOINTS,
      ...B2_IMPLEMENTED_LESSONS, ...B2_IMPLEMENTED_CHECKPOINTS,
    ]) {
      if (!item.production) problems.push(`${item.id}: produção ausente`);
      if (item.exercises.length !== 10 && !item.id.match(/-c\d\d$/)) {
        problems.push(`${item.id}: itens automáticos inesperados`);
      }
      if (item.exercises.length !== 25 && item.exercises.length !== 40 && item.id.match(/-c\d\d$/)) {
        problems.push(`${item.id}: checkpoint fora de 25/40`);
      }
    }
    expect(problems).toEqual([]);
  });
});

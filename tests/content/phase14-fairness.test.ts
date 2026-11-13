import { describe, expect, test } from "vitest";

import { A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1";
import { A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2";
import { B1_IMPLEMENTED_CHECKPOINTS, B1_IMPLEMENTED_LESSONS } from "@/content/curriculum/b1";
import { B2_IMPLEMENTED_CHECKPOINTS, B2_IMPLEMENTED_LESSONS } from "@/content/curriculum/b2";
import { C1_IMPLEMENTED_CHECKPOINTS, C1_IMPLEMENTED_LESSONS } from "@/content/curriculum/c1";
import { C2_IMPLEMENTED_CHECKPOINTS, C2_IMPLEMENTED_LESSONS } from "@/content/curriculum/c2";
import type { ExerciseSpec } from "@/lib/exercises";

type Step = { id: string; level: string; exercises: readonly ExerciseSpec[] };

const STEPS: Step[] = [
  ...[...A1_IMPLEMENTED_LESSONS, ...A1_IMPLEMENTED_CHECKPOINTS].map((step) => ({
    id: step.id,
    level: "A1",
    exercises: step.exercises,
  })),
  ...[...A2_IMPLEMENTED_LESSONS, ...A2_IMPLEMENTED_CHECKPOINTS].map((step) => ({
    id: step.id,
    level: "A2",
    exercises: step.exercises,
  })),
  ...[...B1_IMPLEMENTED_LESSONS, ...B1_IMPLEMENTED_CHECKPOINTS].map((step) => ({
    id: step.id,
    level: "B1",
    exercises: step.exercises,
  })),
  ...[...B2_IMPLEMENTED_LESSONS, ...B2_IMPLEMENTED_CHECKPOINTS].map((step) => ({
    id: step.id,
    level: "B2",
    exercises: step.exercises,
  })),
  ...[...C1_IMPLEMENTED_LESSONS, ...C1_IMPLEMENTED_CHECKPOINTS].map((step) => ({
    id: step.id,
    level: "C1",
    exercises: step.exercises,
  })),
  ...[...C2_IMPLEMENTED_LESSONS, ...C2_IMPLEMENTED_CHECKPOINTS].map((step) => ({
    id: step.id,
    level: "C2",
    exercises: step.exercises,
  })),
];

/**
 * O comprimento bruto é a medida usada na auditoria 13C (F13-012). O limite de
 * 1,7× impede que o gabarito seja identificável apenas por ser mais longo.
 * A correção da Fase 14 reescreveu os distratores, não adicionou enchimento
 * genérico: cada alternativa continua plausível e errada pelo conteúdo.
 */
const MAX_ANSWER_LENGTH_RATIO = 1.7;

type ChoiceItem = {
  stepId: string;
  level: string;
  exerciseId: string;
  answer: string;
  options: readonly string[];
};

function choiceItems(): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  for (const step of STEPS) {
    for (const exercise of step.exercises) {
      if (exercise.type === "mcq") {
        items.push({
          stepId: step.id,
          level: step.level,
          exerciseId: exercise.id,
          answer: exercise.correctAnswer,
          options: exercise.options,
        });
      }
      if (exercise.type === "reading" && exercise.mode === "mcq") {
        const answer = exercise.options?.find(
          (option) => option.id === exercise.correctOptionId,
        )?.label;
        if (answer) {
          items.push({
            stepId: step.id,
            level: step.level,
            exerciseId: exercise.id,
            answer,
            options: exercise.options?.map((option) => option.label) ?? [],
          });
        }
      }
    }
  }
  return items;
}

describe("Fase 14 — fairness de comprimento das alternativas", () => {
  const items = choiceItems();

  test("a amostra cobre todos os itens de escolha de A1 a C2", () => {
    expect(items.length).toBeGreaterThan(1300);
    expect(new Set(items.map((item) => item.exerciseId)).size).toBe(items.length);
  });

  test("o gabarito não é a alternativa mais longa por uma margem artificial", () => {
    const problems: string[] = [];
    for (const item of items) {
      const wrong = item.options.filter((option) => option !== item.answer);
      if (wrong.length === 0) {
        problems.push(`${item.exerciseId}: sem distratores`);
        continue;
      }
      const longestWrong = Math.max(...wrong.map((option) => option.length));
      if (longestWrong === 0) {
        problems.push(`${item.exerciseId}: distrator vazio`);
        continue;
      }
      const ratio = item.answer.length / longestWrong;
      if (ratio > MAX_ANSWER_LENGTH_RATIO) {
        problems.push(
          `${item.exerciseId}: gabarito ${item.answer.length} / maior distrator ${longestWrong} = ${ratio.toFixed(2)}`,
        );
      }
    }
    expect(problems).toEqual([]);
  });

  test("alternativas são não vazias e não se repetem", () => {
    const problems: string[] = [];
    for (const item of items) {
      if (item.options.some((option) => option.trim().length === 0)) {
        problems.push(`${item.exerciseId}: alternativa vazia`);
      }
      if (new Set(item.options).size !== item.options.length) {
        problems.push(`${item.exerciseId}: alternativa duplicada`);
      }
      if (!item.options.includes(item.answer)) {
        problems.push(`${item.exerciseId}: gabarito ausente das alternativas`);
      }
    }
    expect(problems).toEqual([]);
  });
});

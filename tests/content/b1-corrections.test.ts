import { describe, expect, test } from "vitest";

import {
  B1_IMPLEMENTED_CHECKPOINTS,
  B1_IMPLEMENTED_LESSONS,
} from "@/content/curriculum/b1";
import {
  sameAnswerText,
  terminalPunctuationVariants,
} from "@/lib/exercises/punctuation";
import { checkAnswer, type ExerciseSpec } from "@/lib/exercises";
import { getVocab, sentencesFor } from "@/content/vocabulary";

/**
 * Regressões da Fase 12C: correções verificadas da auditoria B1 e as três
 * classes de fairness (pontuação final, unidade da escuta e variante aceita).
 * Não certifica naturalidade; o conteúdo continua `in-review`.
 */

const ALL_EXERCISES = [
  ...B1_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...B1_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];

const EXERCISE_BY_ID = new Map(ALL_EXERCISES.map((exercise) => [exercise.id, exercise]));
const LESSON_BY_ID = new Map(B1_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));

function exercise(id: string): ExerciseSpec {
  const found = EXERCISE_BY_ID.get(id);
  if (!found) throw new Error(`Exercício não encontrado: ${id}`);
  return found;
}

function lesson(id: string) {
  const found = LESSON_BY_ID.get(id);
  if (!found) throw new Error(`Lição não encontrada: ${id}`);
  return found;
}

function grammarText(lessonId: string): string {
  return lesson(lessonId)
    .grammar.map((note) => [note.form, note.explanationPt, ...note.examples.map((example) => example.ko)].join(" "))
    .join(" ");
}

function withoutFinalPunctuation(value: string): string {
  return value.trim().replace(/[.?!]$/, "");
}

function isPunctuationVariant(candidate: string, answer: string): boolean {
  return sameAnswerText(withoutFinalPunctuation(candidate), withoutFinalPunctuation(answer));
}

const TYPED_TYPES = new Set(["cloze", "listen", "translate"]);

describe("correções críticas do B1 (Fase 12C)", () => {
  test("b1-c03-e07 volta a avaliar leitura em coreano", () => {
    const item = exercise("b1-c03-e07");
    expect(item.type).toBe("reading");
    if (item.type !== "reading") return;
    expect(item.text).toBe(
      "이번 변화로 비용은 줄었지만 대기 시간은 늘었어요. 따라서 장단점을 함께 봐야 해요.",
    );
    expect(item.text).not.toMatch(/[A-Za-zÀ-ÿ]{4,}/);
  });

  test("b1-c02-e08 usa 줄이는 대신에, não 줄이고 대신에", () => {
    // O achado 12B cita o ID b1-c02-e19, mas o reading é b1-c02-e08; o ID
    // incorreto foi registrado no ledger de correção.
    const item = exercise("b1-c02-e08");
    expect(item.type).toBe("reading");
    if (item.type !== "reading") return;
    expect(item.text).toContain("줄이는 대신에");
    expect(item.text).not.toContain("줄이고 대신에");
    expect(item.explanation).toContain("줄이는 대신에");
    expect(item.explanation).not.toContain("줄이고 대신에");
  });

  test("b1-l24 corrige 공사를 하는 통에 no modelo e no gabarito", () => {
    const note = lesson("b1-l24").grammar.find((item) => item.id === "b1-l24-g1")!;
    const examples = note.examples.map((example) => example.ko);
    expect(examples).toContain("공사를 하는 통에 길이 막혔어요.");
    expect(examples).not.toContain("공사가 하는 통에 길이 막혔어요.");

    const item = exercise("b1-l24-e06");
    expect(item.type).toBe("mcq");
    if (item.type !== "mcq") return;
    expect(item.correctAnswer).toBe("공사를 하는 통에 길이 막혔어요.");
    expect(item.options).toContain("공사를 하는 통에 길이 막혔어요.");
  });

  test("b1-c01 reescreve -고 말다 como desfecho indesejado", () => {
    const reading = B1_IMPLEMENTED_CHECKPOINTS.find((item) => item.id === "b1-c01")!
      .exercises.find((item) => item.type === "reading" && item.text.includes("이사하고"));
    expect(reading?.type).toBe("reading");
    if (!reading || reading.type !== "reading") return;
    expect(reading.text).toContain("결국 한 달 만에 이사하고 말았어요.");
    expect(reading.text).not.toContain("적응하고 말았어요.");
    expect(reading.explanation).toBe("이사하고 말았어요.");

    const cloze = B1_IMPLEMENTED_CHECKPOINTS.find((item) => item.id === "b1-c01")!
      .exercises.find((item) => item.type === "cloze" && item.prompt.includes("이사하고"));
    expect(cloze?.type).toBe("cloze");
    if (!cloze || cloze.type !== "cloze") return;
    expect(cloze.answer).toBe("말았어요");
  });

  test("b1-l32-e07 mantém 으로: 것 termina em batchim ㅅ", () => {
    // A 12B propôs trocar a resposta para 로, mas 것으로 é a forma correta:
    // 것으로 = 것 + 으로 (batchim ㅅ), não 것 + 로. O achado foi rejeitado.
    const item = exercise("b1-l32-e07");
    expect(item.type).toBe("cloze");
    if (item.type !== "cloze") return;
    expect(item.answer).toBe("으로");
    expect(item.prompt).toContain("것___");
    expect(checkAnswer(item, { kind: "text", value: "으로" }).correct).toBe(true);
    expect(checkAnswer(item, { kind: "text", value: "로" }).correct).toBe(false);
  });
});

describe("integridade linguística dos itens", () => {
  test("todo texto de leitura do B1 está em coreano, não em português", () => {
    const bad = ALL_EXERCISES.flatMap((item) => {
      if (item.type !== "reading") return [];
      if (!/[\uAC00-\uD7A3]/.test(item.text)) return [`${item.id}: sem Hangul`];
      if (/[A-Za-zÀ-ÿ]{4,}/.test(item.text)) return [`${item.id}: texto latino`];
      return [];
    });
    expect(bad).toEqual([]);
  });
});

describe("fairness dos itens digitados do B1", () => {
  test("todo item digitado aceita a resposta sem o sinal final", () => {
    const strict = ALL_EXERCISES.flatMap((item) => {
      if (!TYPED_TYPES.has(item.type)) return [];
      if (!("answer" in item)) return [];
      const variants = terminalPunctuationVariants(item.answer);
      if (variants.length === 0) return [];
      return variants.every(
        (variant) => checkAnswer(item, { kind: "text", value: variant }).correct,
      )
        ? []
        : [item.id];
    });
    expect(strict).toEqual([]);
  });

  test("variantes aceitas não repetem a resposta após normalização", () => {
    const duplicated = ALL_EXERCISES.flatMap((item) => {
      if (!("acceptedAnswers" in item) || !item.acceptedAnswers) return [];
      const seen = new Set([item.answer.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR")]);
      return item.acceptedAnswers.flatMap((value) => {
        const key = value.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
        const duplicate = seen.has(key);
        seen.add(key);
        return duplicate ? [`${item.id}: ${value}`] : [];
      });
    });
    expect(duplicated).toEqual([]);
  });

  test("todo listen pede a frase completa e não aceita fragmento", () => {
    const problems = ALL_EXERCISES.flatMap((item) => {
      if (item.type !== "listen") return [];
      const answerTokens = item.answer.trim().split(/\s+/);
      const accepted = item.acceptedAnswers ?? [];
      const fragments = accepted.filter(
        (value) =>
          !isPunctuationVariant(value, item.answer) &&
          value.trim().split(/\s+/).length < answerTokens.length,
      );
      return item.prompt.toLocaleLowerCase("pt-BR").includes("frase completa") &&
        fragments.length === 0
        ? []
        : [`${item.id}: ${item.prompt} :: ${fragments.join(" | ")}`];
    });
    expect(problems).toEqual([]);
  });
});

describe("progressão gramatical corrigida", () => {
  test("as formas cobradas ganharam ensino explícito antes da cobrança", () => {
    expect(grammarText("b1-l07")).toContain("-(으)ㄹ게요");
    expect(grammarText("b1-l11")).toContain("갈 거라고 생각해요");
    expect(grammarText("b1-l22")).toContain("-마다");
    expect(grammarText("b1-l23")).toContain("-(으)ㄹ 때");
    expect(grammarText("b1-l28")).toContain("-기 바랍니다");
    expect(grammarText("b1-l38")).toContain("달라고 하다");
  });

  test("variantes que diluíam o alvo foram removidas", () => {
    for (const item of ALL_EXERCISES) {
      if (!("acceptedAnswers" in item) || !item.acceptedAnswers) continue;
      expect(item.acceptedAnswers).not.toContain("다음 달에 이사할 예정이에요.");
      expect(item.acceptedAnswers).not.toContain("우리는 규칙을 지킬 의무가 있어요.");
    }

    const comparison = exercise("b1-c03-e13");
    expect(comparison.type).toBe("mcq");
    if (comparison.type !== "mcq") return;
    expect(comparison.prompt).toContain("-다고 생각해요");
    expect(comparison.options).toHaveLength(3);
    expect(new Set(comparison.options).size).toBe(3);
  });

  test("as cobranças substituídas usam formas já ensinadas", () => {
    const noBareun = exercise("b1-l17-e08");
    expect(noBareun.type).toBe("listen");
    if (noBareun.type !== "listen") return;
    expect(noBareun.answer).toBe("오늘은 안건이 세 가지예요.");
    expect(noBareun.answer).not.toContain("뿐");

    const through = exercise("b1-l19-e08");
    expect(through.type).toBe("listen");
    if (through.type !== "listen") return;
    expect(through.answer).toBe("반복 연습으로 숙달할 수 있어요.");
    expect(through.answer).not.toContain("통해");

    for (const id of ["b1-c01-e05", "b1-c01-e24"]) {
      const item = exercise(id);
      if (!("answer" in item)) continue;
      expect(item.answer).not.toContain("다면");
    }

    const production = lesson("b1-l13").production!;
    expect(production.promptKo).not.toContain("하자는");
    expect(production.promptKo).toContain("확대 방안");
  });
});

describe("correções de vocabulário B1", () => {
  test.each([
    ["ko:발언", "2분으로"],
    ["ko:수신", "수신 확인 메일"],
    ["ko:타협", "타협했어요"],
    ["ko:구조", "구조가 빨리"],
    ["ko:뿐만 아니라", "절약될 뿐만 아니라"],
    ["ko:더욱이", "더욱이 바람까지"],
  ])("%s usa a frase corrigida", (id, expected) => {
    const entry = getVocab(id)!;
    const [sentence] = sentencesFor(entry.id);
    expect(sentence.ko).toContain(expected);
    expect(sentence.target.length).toBeGreaterThan(0);
  });

  test("뿐만 아니라 deixa de ser interjeição", () => {
    expect(getVocab("ko:뿐만 아니라")!.pos).toBe("advérbio");
  });
});

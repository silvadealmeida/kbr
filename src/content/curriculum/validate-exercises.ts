import type { ExerciseSpec } from "@/lib/exercises";
import { decomposeSyllable } from "@/lib/hangul";

/**
 * Checagens determinísticas de correção. Não provam coreano natural, registro
 * ou adequação pedagógica; cobrem apenas classes de defeito que o motor e o
 * conteúdo conseguem decidir sem julgamento linguístico.
 */
export type SharedExerciseIssue = {
  code: string;
  path: string;
  message: string;
};

type TextExercise = Extract<
  ExerciseSpec,
  { type: "cloze" | "listen" | "translate" }
>;

function normalized(value: string): string {
  return value.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

function isTextExercise(exercise: ExerciseSpec): exercise is TextExercise {
  return (
    exercise.type === "cloze" ||
    exercise.type === "listen" ||
    exercise.type === "translate"
  );
}

function hasBatchim(syllable: string): boolean | null {
  const parts = decomposeSyllable(syllable);
  return parts ? parts.final !== "" : null;
}

const PARTICLE_AFTER_GAP =
  /_{2,}(은|는|이|가|을|를|과|와|으로|로)(?=[\s.,?!]|$)/g;

/**
 * Confere a alomorfia da partícula que fica imediatamente depois da lacuna.
 * Só decide quando a resposta é uma única palavra em Hangul puro; qualquer
 * ambiguidade (frase, pontuação, forma variável) é ignorada de propósito.
 */
export function clozeParticleIssue(
  exercise: Extract<ExerciseSpec, { type: "cloze" }>,
  path: string,
): SharedExerciseIssue | null {
  const answer = exercise.answer.normalize("NFC").trim();
  if (!/^[가-힣]+$/.test(answer)) return null;
  const last = answer.at(-1);
  if (!last) return null;
  const batchim = hasBatchim(last);
  if (batchim === null) return null;

  for (const match of exercise.prompt.matchAll(PARTICLE_AFTER_GAP)) {
    const particle = match[1]!;
    let expected: boolean;
    if (particle === "으로" || particle === "로") {
      const final = decomposeSyllable(last)?.final;
      expected = final !== undefined && final !== "" && final !== "ㄹ";
    } else {
      expected = particle === "은" || particle === "이" || particle === "을" || particle === "과";
    }
    if (batchim !== expected) {
      return {
        code: "cloze-particle",
        path,
        message: `A lacuna com “${exercise.answer}” produz “${answer}${particle}”; a alomorfia correta não fecha (${last} ${batchim ? "tem" : "não tem"} batchim).`,
      };
    }
  }

  return null;
}

/**
 * Valida um exercício isolado. `checkRedundantAccepted` é ligado em A1, A2 e
 * B1; a dívida de variantes redundantes foi zerada na 12C.
 */
export function validateExerciseSpec(
  exercise: ExerciseSpec,
  path: string,
  options: { checkRedundantAccepted?: boolean } = {},
): SharedExerciseIssue[] {
  const issues: SharedExerciseIssue[] = [];
  const add = (code: string, message: string) => issues.push({ code, path, message });

  if (!exercise.prompt.trim()) add("exercise-prompt", "Enunciado vazio.");

  if (exercise.type === "mcq") {
    if (exercise.options.length < 2) add("mcq-options", "MCQ precisa de ao menos duas opções.");
    if (new Set(exercise.options.map(normalized)).size !== exercise.options.length) {
      add("mcq-options", "Opções duplicadas após normalização.");
    }
    if (!exercise.options.includes(exercise.correctAnswer)) {
      add("mcq-answer-not-in-options", `Gabarito “${exercise.correctAnswer}” não está entre as opções.`);
    }
    if (!exercise.correctAnswer.trim()) add("mcq-answer-empty", "Gabarito vazio.");
  }

  if (exercise.type === "reading" && exercise.mode === "mcq") {
    const options = exercise.options ?? [];
    if (options.length < 2) add("reading-options", "Leitura MCQ precisa de ao menos duas opções.");
    if (new Set(options.map((option) => option.id)).size !== options.length) {
      add("reading-options", "IDs de opção duplicados.");
    }
    if (new Set(options.map((option) => normalized(option.label))).size !== options.length) {
      add("reading-options", "Rótulos de opção duplicados após normalização.");
    }
    if (!options.some((option) => option.id === exercise.correctOptionId)) {
      add("reading-answer-dangling", `correctOptionId “${exercise.correctOptionId ?? ""}” não existe nas opções.`);
    }
  }

  if (
    exercise.type === "audio-to-char" ||
    exercise.type === "char-to-audio" ||
    exercise.type === "minimal-pair"
  ) {
    if (!exercise.options.some((option) => option.id === exercise.correctOptionId)) {
      add("choice-answer-dangling", `correctOptionId “${exercise.correctOptionId}” não existe nas opções.`);
    }
  }

  if (isTextExercise(exercise)) {
    if (!exercise.answer.trim()) add("answer-empty", "Resposta vazia.");
    const accepted = [exercise.answer, ...(exercise.acceptedAnswers ?? [])];
    if (accepted.some((value) => !value.trim())) add("accepted-empty", "acceptedAnswers contém valor vazio.");
    if (options.checkRedundantAccepted) {
      const seen = new Set<string>();
      for (const value of accepted) {
        const key = normalized(value);
        if (seen.has(key)) {
          add("accepted-redundant", `acceptedAnswers repete “${value}” após normalização.`);
        }
        seen.add(key);
      }
    }
  }

  if (exercise.type === "listen") {
    const accepted = [exercise.answer, ...(exercise.acceptedAnswers ?? [])];
    if (
      normalized(exercise.audioText) !== normalized(exercise.answer) &&
      !accepted.some((value) => normalized(value) === normalized(exercise.audioText))
    ) {
      add("listen-audio-answer", `audioText “${exercise.audioText}” não coincide com a resposta nem com uma variante aceita.`);
    }
  }

  if (exercise.type === "cloze") {
    const issue = clozeParticleIssue(exercise, path);
    if (issue) issues.push(issue);
  }

  return issues;
}

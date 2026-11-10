import { composeSyllable, type Final, type Initial, type Medial } from "@/lib/hangul";

type ExerciseBase = {
  id: string;
  prompt: string;
  explanation?: string;
  /**
   * Tags pedagógicas estáveis (`diag:`, `vowel:`, `consonant:`, `reading:`).
   * O diagnóstico usa apenas `diag:*` para não contar o mesmo item duas vezes.
   */
  tags?: readonly string[];
  /** Chaves SRS determinísticas criadas/atualizadas quando o item é errado. */
  srsCards?: readonly string[];
};

export type MultipleChoiceExercise = ExerciseBase & {
  type: "mcq";
  options: readonly string[];
  correctAnswer: string;
};

type TextAnswerExercise = ExerciseBase & {
  answer: string;
  acceptedAnswers?: readonly string[];
};

export type ClozeExercise = TextAnswerExercise & { type: "cloze" };

export type BuildSyllableExercise = ExerciseBase & {
  type: "build-syllable";
  initial: Initial;
  medial: Medial;
  final?: Final;

  /** Alvo exibido/validado pelo player; deve compor exatamente a sílaba. */
  target?: string;
  initialOptions?: readonly Initial[];
  medialOptions?: readonly Medial[];
  finalOptions?: readonly Final[];
  tags?: readonly string[];
};

export type ListenExercise = TextAnswerExercise & {
  type: "listen";
  audioText: string;
};

export type TranslateExercise = TextAnswerExercise & {
  type: "translate";
  direction: "ko-pt" | "pt-ko";
};

export type ChoiceOption = {
  id: string;
  label: string;
};

/**
 * Escuta uma sílaba e escolhe a forma escrita.
 * `fallback` descreve o som sem revelar a resposta para quem não tem TTS coreano.
 */
export type AudioToCharExercise = ExerciseBase & {
  type: "audio-to-char";
  audioText: string;
  audioSrc?: string;
  fallback: string;
  options: readonly { id: string; jamo: string }[];
  correctOptionId: string;
  tags: readonly string[];
};

/** Vê uma sílaba/palavra e escolhe a descrição do áudio correto. */
export type CharToAudioExercise = ExerciseBase & {
  type: "char-to-audio";
  text: string;
  options: readonly { id: string; audioText: string; audioSrc?: string; label: string }[];
  correctOptionId: string;
  tags: readonly string[];
};

/** Contraste entre dois sons próximos, com áudio ou texto como apresentação. */
export type MinimalPairExercise = ExerciseBase & {
  type: "minimal-pair";
  presentation: "audio" | "text";
  audioText?: string;
  text?: string;
  fallback?: string;
  options: readonly { id: string; label: string }[];
  correctOptionId: string;
  contrast: { feature: string; a: string; b: string };
  tags: readonly string[];
};

export type ReadingExercise = ExerciseBase & {
  type: "reading";
  text: string;
  mode: "mcq" | "self-check";
  question?: string;
  options?: readonly ChoiceOption[];
  correctOptionId?: string;
  audioText?: string;
  tags: readonly string[];
};

export type ExerciseSpec =
  | MultipleChoiceExercise
  | ClozeExercise
  | BuildSyllableExercise
  | ListenExercise
  | TranslateExercise
  | AudioToCharExercise
  | CharToAudioExercise
  | MinimalPairExercise
  | ReadingExercise;

export type CheckResult = {
  correct: boolean;
  expected: string;
  explanation?: string;
};

export type DetailedCheckResult = CheckResult & {
  errorTags?: readonly string[];
  /** `false` para itens de autoavaliação, que não entram no denominador. */
  scored?: boolean;
};

export type ExerciseAnswer =
  | { kind: "choice"; optionId: string }
  | { kind: "text"; value: string }
  | { kind: "syllable"; initial: Initial; medial: Medial; final?: Final }
  | { kind: "self-check"; confidence: "low" | "medium" | "high" };

const WRONG_ANSWER_KIND = "Resposta incompatível com o exercício.";

function normalize(answer: string): string {
  return answer.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

function isChoiceExercise(spec: ExerciseSpec): spec is
  | AudioToCharExercise
  | CharToAudioExercise
  | MinimalPairExercise {
  return (
    spec.type === "audio-to-char" ||
    spec.type === "char-to-audio" ||
    spec.type === "minimal-pair"
  );
}

function optionLabel(spec: ExerciseSpec, optionId: string): string {
  switch (spec.type) {
    case "audio-to-char":
      return spec.options.find((option) => option.id === optionId)?.jamo ?? optionId;
    case "char-to-audio":
      return spec.options.find((option) => option.id === optionId)?.label ?? optionId;
    case "minimal-pair":
      return spec.options.find((option) => option.id === optionId)?.label ?? optionId;
    case "reading":
      return spec.options?.find((option) => option.id === optionId)?.label ?? optionId;
    case "mcq":
      return spec.correctAnswer;
    case "build-syllable":
      return composeSyllable(spec.initial, spec.medial, spec.final);
    default:
      return spec.answer;
  }
}

/**
 * Corrige uma resposta tipada. Nunca lança para respostas de tipo incompatível:
 * o player recebe um resultado controlado e segue exibindo feedback.
 */
export function checkAnswer(spec: ExerciseSpec, answer: ExerciseAnswer): DetailedCheckResult {
  if (spec.type === "reading" && spec.mode === "self-check") {
    if (answer.kind !== "self-check") {
      return {
        correct: false,
        expected: spec.text,
        explanation: WRONG_ANSWER_KIND,
        errorTags: ["answer-kind"],
        scored: false,
      };
    }
    return {
      correct: true,
      expected: spec.text,
      explanation: spec.explanation,
      scored: false,
    };
  }

  if (isChoiceExercise(spec) || spec.type === "reading") {
    if (answer.kind !== "choice") {
      return {
        correct: false,
        expected: optionLabel(spec, spec.correctOptionId ?? ""),
        explanation: WRONG_ANSWER_KIND,
        errorTags: ["answer-kind"],
      };
    }

    const correct = answer.optionId === spec.correctOptionId;
    return {
      correct,
      expected: optionLabel(spec, spec.correctOptionId ?? ""),
      explanation: spec.explanation,
      errorTags: correct ? undefined : [spec.type],
    };
  }

  if (spec.type === "build-syllable") {
    const expected = composeSyllable(spec.initial, spec.medial, spec.final);

    if (answer.kind === "syllable") {
      const built = composeSyllable(answer.initial, answer.medial, answer.final);
      return {
        correct: built.normalize("NFC") === expected.normalize("NFC"),
        expected,
        explanation: spec.explanation,
      };
    }

    if (answer.kind !== "text") {
      return {
        correct: false,
        expected,
        explanation: WRONG_ANSWER_KIND,
        errorTags: ["answer-kind"],
      };
    }

    return {
      correct: normalize(answer.value) === normalize(expected),
      expected,
      explanation: spec.explanation,
    };
  }

  if (answer.kind !== "text") {
    const expected =
      spec.type === "mcq" ? spec.correctAnswer : spec.answer;
    return {
      correct: false,
      expected,
      explanation: WRONG_ANSWER_KIND,
      errorTags: ["answer-kind"],
    };
  }

  if (spec.type === "mcq") {
    const correct = normalize(spec.correctAnswer) === normalize(answer.value);
    return {
      correct,
      expected: spec.correctAnswer,
      explanation: spec.explanation,
    };
  }

  const accepted = [spec.answer, ...(spec.acceptedAnswers ?? [])];
  return {
    correct: accepted.some((value) => normalize(value) === normalize(answer.value)),
    expected: spec.answer,
    explanation: spec.explanation,
  };
}

/**
 * Compatibilidade com os testes e chamadas existentes: retorna exatamente
 * `{ correct, expected, explanation? }`, sem os campos extras de `checkAnswer`.
 */
export function check(spec: ExerciseSpec, answer: string): CheckResult {
  const expected =
    spec.type === "build-syllable"
      ? composeSyllable(spec.initial, spec.medial, spec.final)
      : spec.type === "mcq"
        ? spec.correctAnswer
        : spec.type === "audio-to-char" ||
            spec.type === "char-to-audio" ||
            spec.type === "minimal-pair" ||
            spec.type === "reading"
          ? optionLabel(spec, spec.correctOptionId ?? "")
          : spec.answer;
  const accepted =
    "acceptedAnswers" in spec ? [expected, ...(spec.acceptedAnswers ?? [])] : [expected];

  return {
    correct: accepted.some((value) => normalize(value) === normalize(answer)),
    expected,
    explanation: spec.explanation,
  };
}

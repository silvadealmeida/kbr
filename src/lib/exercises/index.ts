import { composeSyllable, type Final, type Initial, type Medial } from "@/lib/hangul";

type ExerciseBase = {
  id: string;
  prompt: string;
  explanation?: string;
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
};

export type ListenExercise = TextAnswerExercise & {
  type: "listen";
  audioText: string;
};

export type TranslateExercise = TextAnswerExercise & {
  type: "translate";
  direction: "ko-pt" | "pt-ko";
};

export type ExerciseSpec =
  | MultipleChoiceExercise
  | ClozeExercise
  | BuildSyllableExercise
  | ListenExercise
  | TranslateExercise;

export type CheckResult = {
  correct: boolean;
  expected: string;
  explanation?: string;
};

function normalize(answer: string): string {
  return answer.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

export function check(spec: ExerciseSpec, answer: string): CheckResult {
  const expected =
    spec.type === "build-syllable"
      ? composeSyllable(spec.initial, spec.medial, spec.final)
      : spec.type === "mcq"
        ? spec.correctAnswer
        : spec.answer;
  const accepted =
    "acceptedAnswers" in spec ? [expected, ...(spec.acceptedAnswers ?? [])] : [expected];

  return {
    correct: accepted.some((value) => normalize(value) === normalize(answer)),
    expected,
    explanation: spec.explanation,
  };
}

import type { ReviewMeta } from "@/content/hangul/types";
import { newVocabIdsFor, sentenceIdsFor } from "@/content/vocabulary/a1-course";
import type {
  A1DialogueLine,
  A1ExerciseStage,
  A1GrammarExample,
  A1GrammarNote,
  A1LessonContent,
  A1LessonExercise,
} from "../types";

const REVIEW_NOTES =
  "Conteúdo original do KBR para o curso A1; naturalidade, tradução e registro aguardam revisão de falante nativo.";

export const review: ReviewMeta = { status: "in-review", notes: REVIEW_NOTES };

export function line(
  id: string,
  speaker: string,
  ko: string,
  pt: string,
): A1DialogueLine {
  return { id, speaker, ko, pt, audioText: ko, review };
}

export function examples(
  ...pairs: readonly (readonly [ko: string, pt: string])[]
): A1GrammarExample[] {
  return pairs.map(([ko, pt]) => ({ ko, pt, audioText: ko }));
}

export function grammarNote(
  id: string,
  titlePt: string,
  form: string,
  explanationPt: string,
  noteExamples: readonly A1GrammarExample[],
): A1GrammarNote {
  return {
    id,
    titlePt,
    form,
    explanationPt,
    examples: noteExamples,
    review,
  };
}

function tagsFor(id: string, type: A1LessonExercise["type"]): readonly string[] {
  const lesson = id.includes("-e") ? id.slice(0, id.indexOf("-e")) : id;
  const diagnostic =
    type === "listen"
      ? "diag:listening"
      : type === "reading"
        ? "diag:reading"
        : type === "translate"
          ? "diag:writing"
          : "diag:grammar";
  return [diagnostic, lesson, type];
}

export function mcq(
  id: string,
  stage: A1ExerciseStage,
  prompt: string,
  options: readonly string[],
  correctAnswer: string,
  explanation: string,
): A1LessonExercise {
  return {
    id,
    type: "mcq",
    stage,
    prompt,
    options,
    correctAnswer,
    explanation,
    tags: tagsFor(id, "mcq"),
  };
}

export function cloze(
  id: string,
  stage: A1ExerciseStage,
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers?: readonly string[],
): A1LessonExercise {
  return {
    id,
    type: "cloze",
    stage,
    prompt,
    answer,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    explanation,
    tags: tagsFor(id, "cloze"),
  };
}

export function listen(
  id: string,
  stage: A1ExerciseStage,
  prompt: string,
  audioText: string,
  answer: string,
  explanation: string,
  acceptedAnswers?: readonly string[],
): A1LessonExercise {
  return {
    id,
    type: "listen",
    stage,
    prompt,
    audioText,
    answer,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    explanation,
    tags: tagsFor(id, "listen"),
  };
}

export function translate(
  id: string,
  stage: A1ExerciseStage,
  direction: "ko-pt" | "pt-ko",
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers?: readonly string[],
): A1LessonExercise {
  return {
    id,
    type: "translate",
    stage,
    prompt,
    direction,
    answer,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    explanation,
    tags: tagsFor(id, "translate"),
  };
}

export function choices(...labels: string[]) {
  return labels.map((label) => ({ id: label, label }));
}

export function reading(
  id: string,
  stage: A1ExerciseStage,
  text: string,
  question: string,
  options: readonly { id: string; label: string }[],
  correctOptionId: string,
  explanation: string,
  audioText?: string,
): A1LessonExercise {
  return {
    id,
    type: "reading",
    stage,
    prompt: question,
    text,
    mode: "mcq",
    question,
    options,
    correctOptionId,
    ...(audioText ? { audioText } : {}),
    explanation,
    tags: tagsFor(id, "reading"),
  };
}

type LessonInput = Omit<
  A1LessonContent,
  "vocabulary" | "completion" | "review"
> & {
  vocabulary: { reusedIds: readonly string[] };
};

/**
 * Preenche as referências lexicais a partir do registro canônico e aplica o
 * critério padrão do A1 (10 itens, mínimo 8). O conteúdo em si continua
 * explícito em cada arquivo de lição.
 */
export function defineA1Lesson(input: LessonInput): A1LessonContent {
  return {
    ...input,
    vocabulary: {
      newIds: newVocabIdsFor(input.id),
      reusedIds: input.vocabulary.reusedIds,
      sentenceIds: sentenceIdsFor(input.id),
    },
    completion: { minScore: 80, minCorrect: 8 },
    review,
  };
}

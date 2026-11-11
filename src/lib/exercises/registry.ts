import type { ExerciseSpec } from "./index";

/**
 * Catálogo de capacidades de exercício. Não altera `ExerciseSpec` nem
 * `checkAnswer`; serve para registrar o que já é determinístico, o que está
 * planejado e quais habilidades cada formato atende. Nenhum item prevê
 * correção por IA, reconhecimento de fala ou API paga.
 */

export type ExerciseSkill =
  | "vocabulary"
  | "grammar"
  | "listening"
  | "reading"
  | "sentence-construction"
  | "writing"
  | "dialogue";

export type ImplementedExerciseType = ExerciseSpec["type"];

/** Tipos futuros: extensões de união, sem implementação nesta fase. */
export type PlannedExerciseType = "order-words" | "short-answer" | "dialogue-choice";

export type ExerciseTypeId = ImplementedExerciseType | PlannedExerciseType;

export type ExerciseGrading = "deterministic" | "self-check";

export type ExerciseTypeDefinition = {
  id: ExerciseTypeId;
  status: "implemented" | "planned";
  skills: readonly ExerciseSkill[];
  grading: ExerciseGrading;
  summary: string;
};

export const EXERCISE_TYPE_REGISTRY: readonly ExerciseTypeDefinition[] = [
  {
    id: "mcq",
    status: "implemented",
    skills: ["vocabulary", "grammar", "reading"],
    grading: "deterministic",
    summary: "Escolha única com resposta e alternativas explícitas.",
  },
  {
    id: "cloze",
    status: "implemented",
    skills: ["vocabulary", "grammar"],
    grading: "deterministic",
    summary: "Lacuna preenchida por texto, com respostas aceitas.",
  },
  {
    id: "build-syllable",
    status: "implemented",
    skills: ["reading"],
    grading: "deterministic",
    summary: "Montagem de sílaba Hangul a partir de jamo.",
  },
  {
    id: "listen",
    status: "implemented",
    skills: ["listening"],
    grading: "deterministic",
    summary: "Escuta com resposta digitada e fallback textual.",
  },
  {
    id: "translate",
    status: "implemented",
    skills: ["vocabulary", "grammar", "writing"],
    grading: "deterministic",
    summary: "Tradução curta ko↔pt com respostas aceitas.",
  },
  {
    id: "audio-to-char",
    status: "implemented",
    skills: ["listening", "reading"],
    grading: "deterministic",
    summary: "Áudio (ou dica textual) para escolher a forma escrita.",
  },
  {
    id: "char-to-audio",
    status: "implemented",
    skills: ["listening", "reading"],
    grading: "deterministic",
    summary: "Forma escrita para escolher a descrição do áudio.",
  },
  {
    id: "minimal-pair",
    status: "implemented",
    skills: ["listening"],
    grading: "deterministic",
    summary: "Contraste entre dois sons próximos, com apresentação explícita.",
  },
  {
    id: "reading",
    status: "implemented",
    skills: ["reading", "vocabulary"],
    grading: "deterministic",
    summary: "Leitura com pergunta de escolha única ou autoavaliação sem nota.",
  },
  {
    id: "order-words",
    status: "planned",
    skills: ["sentence-construction", "grammar"],
    grading: "deterministic",
    summary:
      "Ordenar tokens para formar uma frase; a resposta é a sequência exata, não uma nota de IA.",
  },
  {
    id: "short-answer",
    status: "planned",
    skills: ["writing", "grammar", "vocabulary"],
    grading: "deterministic",
    summary:
      "Resposta curta com respostas aceitas. Escrita livre, se existir, será autoavaliação — nunca correção por IA.",
  },
  {
    id: "dialogue-choice",
    status: "planned",
    skills: ["dialogue", "reading", "listening"],
    grading: "deterministic",
    summary:
      "Escolha de fala em um diálogo roteirizado; não exige modelo generativo nem áudio gravado.",
  },
];

export const IMPLEMENTED_EXERCISE_TYPES: readonly ImplementedExerciseType[] =
  EXERCISE_TYPE_REGISTRY.filter(
    (definition) => definition.status === "implemented",
  ).map((definition) => definition.id as ImplementedExerciseType);

export function isImplementedExerciseType(
  id: ExerciseTypeId,
): id is ImplementedExerciseType {
  return IMPLEMENTED_EXERCISE_TYPES.includes(id as ImplementedExerciseType);
}

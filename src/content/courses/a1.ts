import { A1_L01 } from "@/content/curriculum/a1/lessons/a1-l01";
import type { CourseDefinition } from "./types";

/**
 * Curso A1 em desenvolvimento. `steps` lista somente a lição implementada;
 * `plannedTotals` mantém o horizonte editorial (40 lições e 8 checkpoints) sem
 * criar rota, link ou progresso para conteúdo que ainda não existe. Concluir
 * `a1-l01` não conclui o curso nem certifica CEFR/TOPIK.
 */
export const A1_COURSE: CourseDefinition = {
  id: "ko-a1",
  slug: "a1",
  level: "a1",
  status: "in-development",
  title: "Coreano A1",
  titleKo: "한국어 A1",
  subtitle: "Primeiros contatos e apresentações",
  description:
    "Curso A1 em desenvolvimento: a primeira lição já está disponível e as demais entram aos poucos. Não é certificação CEFR ou TOPIK.",
  basePath: "/a1",
  units: [
    {
      id: "a1-m01",
      number: 1,
      title: "Primeiro contato",
      stepIds: [A1_L01.id],
    },
  ],
  steps: [
    {
      id: A1_L01.id,
      kind: "lesson",
      unitId: "a1-m01",
      title: A1_L01.title,
      prerequisites: [],
      estimatedMinutes: 50,
      completion: {
        minScore: A1_L01.completion.minScore,
        minCorrect: A1_L01.completion.minCorrect,
        exerciseCount: A1_L01.exercises.length,
      },
    },
  ],
  plannedTotals: { lessons: 40, checkpoints: 8 },
  exerciseTypes: [
    ...new Set(A1_L01.exercises.map((exercise) => exercise.type)),
  ] as CourseDefinition["exerciseTypes"],
  completion: {
    requiresAllSteps: false,
    finalStepId: null,
    certification: "none",
  },
  localization: {
    interfaceLocale: "pt-BR",
    contentLocale: "ko-KR",
    contentLanguage: "ko",
  },
  srsKeyPrefix: "a1:",
  stepIdPattern: /^(?:a1-l\d{2}|a1-c\d{2})$/,
};

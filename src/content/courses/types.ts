import type { ExerciseSpec } from "@/lib/exercises";

/**
 * Modelo mínimo de curso. Descreve metadados, navegação e critérios; não
 * carrega o conteúdo pedagógico específico de cada curso. Hangul continua
 * usando `src/content/hangul` como fonte de lições, checkpoints e exercícios.
 */

export const COURSE_LEVELS = ["pre-a1", "a1", "a2", "b1", "b2", "c1", "c2"] as const;

/** `pre-a1` é introdutório e não corresponde a um nível oficial do CEFR. */
export type CourseLevel = (typeof COURSE_LEVELS)[number];

export const CEFR_LEVELS = ["a1", "a2", "b1", "b2", "c1", "c2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export const COURSE_LEVEL_LABELS: Readonly<Record<CourseLevel, string>> = {
  "pre-a1": "Pré-A1",
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
  c2: "C2",
};

export function courseLevelLabel(level: CourseLevel): string {
  return COURSE_LEVEL_LABELS[level];
}

export function isCefrLevel(level: CourseLevel): level is CefrLevel {
  return level !== "pre-a1";
}

export type CourseStatus = "available" | "in-development" | "planned";

export type CourseStepKind = "lesson" | "checkpoint";

/**
 * Critério de conclusão de um passo. Guarda somente metadados: a avaliação
 * real continua na camada pedagógica de cada curso.
 */
export type CourseStepCompletion = {
  /** Percentual documentado (0–100). */
  minScore: number;
  /** Número autoritativo de acertos, quando o currículo define uma fração. */
  minCorrect?: number;
  /** Itens avaliados; pode ser menor que o total por causa de autoavaliação. */
  exerciseCount: number;
  /** Rótulos de critérios adicionais, sem duplicar a lógica de avaliação. */
  additionalRules?: readonly string[];
};

export type CourseStepDefinition = {
  /** Identificador globalmente estável; é a chave em `Progress.lessons`. */
  id: string;
  kind: CourseStepKind;
  unitId: string;
  title: string;
  prerequisites: readonly string[];
  estimatedMinutes: number;
  completion: CourseStepCompletion;
};

export type CourseUnitDefinition = {
  id: string;
  number: number;
  title: string;
  stepIds: readonly string[];
};

export type CourseCompletionDefinition = {
  requiresAllSteps: boolean;
  finalStepId: string | null;
  /** O KBR não emite certificação oficial; conclusão é interna. */
  certification: "none";
};

export type CourseLocalization = {
  interfaceLocale: "pt-BR";
  contentLocale: "ko-KR";
  contentLanguage: "ko";
};

/**
 * Totais editoriais de um curso em desenvolvimento. Os `steps` continuam
 * listando apenas o que já é jogável; estes números não criam rotas, links ou
 * progresso.
 */
export type CoursePlannedTotals = {
  lessons: number;
  checkpoints: number;
};

export type CourseDefinition = {
  /** Identificador estável do curso (ex.: `hangul`). */
  id: string;
  /** Segmento de rota estável (ex.: `hangul`). */
  slug: string;
  level: CourseLevel;
  status: CourseStatus;
  title: string;
  titleKo?: string;
  subtitle: string;
  description: string;
  /**
   * Rota base dos passos quando o curso está disponível. `null` em cursos
   * planejados, que não têm lições nem links.
   */
  basePath: string | null;
  /**
   * Passos de outros cursos que precisam estar concluídos para abrir o curso.
   * É uma política de entrada, não um pré-requisito de lição; o player e o
   * catálogo a aplicam sem alterar `Progress` v1.
   */
  entryPrerequisites?: readonly string[];
  units: readonly CourseUnitDefinition[];
  steps: readonly CourseStepDefinition[];
  /**
   * Só existe em cursos `in-development`: total editorial planejado, maior que
   * os passos implementados. Não é usado para calcular conclusão.
   */
  plannedTotals?: CoursePlannedTotals;
  /** Tipos de exercício que o conteúdo do curso usa hoje. */
  exerciseTypes: readonly ExerciseSpec["type"][];
  completion: CourseCompletionDefinition;
  localization: CourseLocalization;
  /**
   * Prefixo reservado das chaves SRS (`h:` no Hangul). Cursos futuros precisam
   * de um prefixo próprio para não reutilizar cartões existentes.
   */
  srsKeyPrefix: string | null;
  /**
   * Espaço de IDs dos passos. O Hangul reserva `hNN` e `cN`; um curso futuro
   * não pode registrar um passo nesse formato.
   */
  stepIdPattern: RegExp | null;
};

export type CourseRegistryIssue = {
  severity: "error" | "warning";
  code: string;
  path: string;
  message: string;
};

import { CEFR_LEVELS, type CefrLevel, type CourseDefinition } from "./types";

function plannedCourse(level: CefrLevel): CourseDefinition {
  const label = level.toUpperCase();
  return {
    id: `ko-${level}`,
    slug: `ko-${level}`,
    level,
    status: "planned",
    title: `Coreano ${label}`,
    subtitle: "Planejado",
    description: `Nível ${label} do CEFR em planejamento editorial. Nenhuma lição, atividade ou avaliação está disponível.`,
    basePath: null,
    units: [],
    steps: [],
    exerciseTypes: [],
    completion: {
      requiresAllSteps: true,
      finalStepId: null,
      certification: "none",
    },
    localization: {
      interfaceLocale: "pt-BR",
      contentLocale: "ko-KR",
      contentLanguage: "ko",
    },
    srsKeyPrefix: null,
    stepIdPattern: null,
  };
}

/**
 * Nenhum nível CEFR permanece em planejamento depois de A1–C2. O helper fica
 * disponível para cursos futuros, mas a lista atual é vazia.
 */
export const PLANNED_COURSES: readonly CourseDefinition[] = CEFR_LEVELS.filter(
  (level) =>
    level !== "a1" && level !== "a2" && level !== "b1" && level !== "b2" &&
    level !== "c1" && level !== "c2",
).map(plannedCourse);

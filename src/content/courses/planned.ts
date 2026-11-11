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
 * A1–C2 são apenas entradas de planejamento. Não há conteúdo, rota, lição ou
 * desbloqueio automático associado a elas nesta fase.
 */
export const PLANNED_COURSES: readonly CourseDefinition[] = CEFR_LEVELS.map(plannedCourse);

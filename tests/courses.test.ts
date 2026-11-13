import { describe, expect, test } from "vitest";
import {
  A1_COURSE,
  A2_COURSE,
  B1_COURSE,
  B2_COURSE,
  C1_COURSE,
  C2_COURSE,
  COURSE_REGISTRY,
  HANGUL_COURSE,
  PLANNED_COURSES,
  courseStepHref,
  getAvailableCourses,
  getCourse,
  getCourseBySlug,
  getInDevelopmentCourses,
  getPlannedCourses,
  validateCourseRegistry,
  type CourseDefinition,
} from "@/content/courses";
import {
  CEFR_LEVELS,
  COURSE_LEVEL_LABELS,
  isCefrLevel,
} from "@/content/courses/types";
import { CHECKPOINTS, LESSONS } from "@/content/hangul";
import {
  summarizeCourseProgress,
} from "@/lib/courses";
import {
  isCourseStepUnlocked,
  nextRecommendedCourseStep,
} from "@/lib/courses/steps";
import {
  EXERCISE_TYPE_REGISTRY,
  IMPLEMENTED_EXERCISE_TYPES,
  isImplementedExerciseType,
} from "@/lib/exercises/registry";
import { parseSrsCardKey } from "@/lib/srs";
import {
  createEmptyProgress,
  mergeProgress,
  type Progress,
} from "@/lib/storage";

const NOW = new Date("2026-11-11T12:00:00.000Z");
const HANGUL_LESSON_IDS = LESSONS.map((lesson) => lesson.id);
const HANGUL_CHECKPOINT_IDS = CHECKPOINTS.map((checkpoint) => checkpoint.id);
const EXPECTED_HANGUL_STEP_IDS = [
  ...HANGUL_LESSON_IDS.slice(0, 10),
  "c1",
  ...HANGUL_LESSON_IDS.slice(10, 15),
  "c2",
  ...HANGUL_LESSON_IDS.slice(15, 20),
  "c3",
  ...HANGUL_LESSON_IDS.slice(20),
  "c4",
];

function markDone(progress: Progress, ids: readonly string[], score = 100): Progress {
  for (const id of ids) progress.lessons[id] = { done: true, score };
  return progress;
}

function futureCourse(overrides: Partial<CourseDefinition> = {}): CourseDefinition {
  const base: CourseDefinition = {
    id: "ko-a1",
    slug: "ko-a1",
    level: "a1",
    status: "available",
    title: "Coreano A1",
    subtitle: "Teste",
    description: "Curso sintético usado apenas nos testes do registro.",
    basePath: "/ko-a1",
    units: [
      {
        id: "ko-a1-u1",
        number: 1,
        title: "Unidade 1",
        stepIds: ["a1-01"],
      },
    ],
    steps: [
      {
        id: "a1-01",
        kind: "lesson",
        unitId: "ko-a1-u1",
        title: "Lição sintética",
        prerequisites: [],
        estimatedMinutes: 5,
        completion: { minScore: 80, exerciseCount: 1 },
      },
    ],
    exerciseTypes: ["mcq"],
    completion: {
      requiresAllSteps: true,
      finalStepId: "a1-01",
      certification: "none",
    },
    localization: {
      interfaceLocale: "pt-BR",
      contentLocale: "ko-KR",
      contentLanguage: "ko",
    },
    srsKeyPrefix: "a1:",
    stepIdPattern: /^a1-\d{2}$/,
  };

  return { ...base, ...overrides };
}

function issueCodes(courses: readonly CourseDefinition[]): string[] {
  return validateCourseRegistry(courses).map((issue) => issue.code);
}

describe("registro genérico de cursos", () => {
  test("Hangul, A1, A2, B1 e B2 estão registrados; C1–C2 planejados", () => {
    expect(validateCourseRegistry()).toEqual([]);
    expect(COURSE_REGISTRY).toHaveLength(7);
    expect(getAvailableCourses().map((course) => course.id)).toEqual([
      "hangul",
      "ko-a1",
      "ko-a2",
      "ko-b1",
      ...(B2_COURSE.status === "available" ? ["ko-b2"] : []),
      ...(C1_COURSE.status === "available" ? ["ko-c1"] : []),
      ...(C2_COURSE.status === "available" ? ["ko-c2"] : []),
    ]);
    expect(getInDevelopmentCourses().every((course) => ["ko-b2", "ko-c1", "ko-c2"].includes(course.id))).toBe(true);
    expect(getPlannedCourses()).toEqual([]);
    expect(getCourse("hangul")).toBe(HANGUL_COURSE);
    expect(getCourse("ko-a1")).toBe(A1_COURSE);
    expect(getCourse("ko-a2")).toBe(A2_COURSE);
    expect(getCourse("ko-b1")).toBe(B1_COURSE);
    expect(getCourseBySlug("hangul")).toBe(HANGUL_COURSE);
    expect(getCourseBySlug("a1")).toBe(A1_COURSE);
    expect(getCourseBySlug("a2")).toBe(A2_COURSE);
    expect(getCourseBySlug("b1")).toBe(B1_COURSE);
    expect(getCourse("ko-c1")).toBe(C1_COURSE);
    expect(getCourse("ko-c2")).toBe(C2_COURSE);
    expect(getCourseBySlug("c1")).toBe(C1_COURSE);
    expect(getCourseBySlug("c2")).toBe(C2_COURSE);

    expect(HANGUL_COURSE.level).toBe("pre-a1");
    expect(isCefrLevel(HANGUL_COURSE.level)).toBe(false);
    expect(COURSE_LEVEL_LABELS["pre-a1"]).toBe("Pré-A1");

    expect(A1_COURSE.status).toBe("available");
    expect(A1_COURSE.level).toBe("a1");
    expect(A1_COURSE.steps).toHaveLength(48);
    expect(A1_COURSE.steps.filter((step) => step.kind === "lesson")).toHaveLength(40);
    expect(A1_COURSE.steps.filter((step) => step.kind === "checkpoint")).toHaveLength(8);
    expect(A1_COURSE.steps.at(0)?.id).toBe("a1-l01");
    expect(A1_COURSE.steps.at(-1)?.id).toBe("a1-c08");
    expect(A1_COURSE.plannedTotals).toBeUndefined();
    expect(A1_COURSE.basePath).toBe("/a1");
    expect(A1_COURSE.completion).toMatchObject({
      requiresAllSteps: true,
      finalStepId: "a1-c08",
      certification: "none",
    });

    expect(A2_COURSE.status).toBe("available");
    expect(A2_COURSE.level).toBe("a2");
    expect(A2_COURSE.steps).toHaveLength(48);
    expect(A2_COURSE.steps.filter((step) => step.kind === "lesson")).toHaveLength(40);
    expect(A2_COURSE.steps.filter((step) => step.kind === "checkpoint")).toHaveLength(8);
    expect(A2_COURSE.steps.at(0)?.id).toBe("a2-l01");
    expect(A2_COURSE.steps.at(-1)?.id).toBe("a2-c08");
    expect(A2_COURSE.basePath).toBe("/a2");
    expect(A2_COURSE.entryPrerequisites).toEqual(["a1-c08"]);
    expect(A2_COURSE.completion).toMatchObject({
      requiresAllSteps: true,
      finalStepId: "a2-c08",
      certification: "none",
    });

    expect(B1_COURSE.status).toBe("available");
    expect(B1_COURSE.level).toBe("b1");
    expect(B1_COURSE.steps).toHaveLength(48);
    expect(B1_COURSE.steps.filter((step) => step.kind === "lesson")).toHaveLength(40);
    expect(B1_COURSE.steps.filter((step) => step.kind === "checkpoint")).toHaveLength(8);
    expect(B1_COURSE.steps.at(0)?.id).toBe("b1-l01");
    expect(B1_COURSE.steps.at(-1)?.id).toBe("b1-c08");
    expect(B1_COURSE.basePath).toBe("/b1");
    expect(B1_COURSE.entryPrerequisites).toEqual(["a2-c08"]);
    expect(B1_COURSE.completion).toMatchObject({
      requiresAllSteps: true,
      finalStepId: "b1-c08",
      certification: "none",
    });

    for (const course of PLANNED_COURSES) {
      expect(course.status).toBe("planned");
      expect(course.steps).toEqual([]);
      expect(course.units).toEqual([]);
      expect(course.basePath).toBeNull();
      expect(course.completion.finalStepId).toBeNull();
      expect(isCefrLevel(course.level)).toBe(true);
    }
  });

  test("entryPrerequisites exige um passo existente de outro curso", () => {
    const withoutA2 = COURSE_REGISTRY.filter((course) => course.id !== "ko-a2");
    expect(
      issueCodes([
        ...withoutA2,
        { ...A2_COURSE, entryPrerequisites: ["passo-inexistente"] },
      ]),
    ).toContain("course-entry-prerequisite-unknown");
    expect(
      issueCodes([
        ...withoutA2,
        { ...A2_COURSE, entryPrerequisites: ["a2-l01"] },
      ]),
    ).toContain("course-entry-prerequisite-own");
    expect(
      issueCodes([
        ...withoutA2,
        { ...A2_COURSE, entryPrerequisites: ["a1-c08"] },
      ]),
    ).toEqual([]);
    expect(
      issueCodes([
        ...COURSE_REGISTRY.filter((course) => course.id !== "ko-b1"),
        { ...B1_COURSE, entryPrerequisites: ["a2-c08"] },
      ]),
    ).toEqual([]);
    expect(
      issueCodes([
        ...COURSE_REGISTRY.filter((course) => course.id !== "ko-b1"),
        { ...B1_COURSE, entryPrerequisites: ["b1-l01"] },
      ]),
    ).toContain("course-entry-prerequisite-own");
  });

  test("preserva os IDs h01–h25/c1–c4 e o namespace SRS do Hangul", () => {
    expect(HANGUL_COURSE.steps.map((step) => step.id)).toEqual(
      EXPECTED_HANGUL_STEP_IDS,
    );
    expect(HANGUL_COURSE.steps).toHaveLength(29);
    expect(HANGUL_COURSE.steps.filter((step) => step.kind === "lesson")).toHaveLength(25);
    expect(HANGUL_COURSE.steps.filter((step) => step.kind === "checkpoint")).toHaveLength(4);

    for (const step of HANGUL_COURSE.steps) {
      expect(
        LESSONS.some((lesson) => lesson.id === step.id) ||
          CHECKPOINTS.some((checkpoint) => checkpoint.id === step.id),
      ).toBe(true);
    }

    expect(HANGUL_COURSE.srsKeyPrefix).toBe("h:");
    expect(parseSrsCardKey("h:word:고기")).toMatchObject({
      kind: "word",
      value: "고기",
    });
    expect(HANGUL_COURSE.stepIdPattern?.test("h01")).toBe(true);
    expect(HANGUL_COURSE.stepIdPattern?.test("c4")).toBe(true);
    expect(HANGUL_COURSE.stepIdPattern?.test("a1-01")).toBe(false);
  });

  test("unidades cobrem cada passo exatamente uma vez", () => {
    expect(HANGUL_COURSE.units).toHaveLength(7);
    expect(HANGUL_COURSE.units.map((unit) => unit.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);

    const unitStepIds = HANGUL_COURSE.units.flatMap((unit) => unit.stepIds);
    expect(unitStepIds).toHaveLength(HANGUL_COURSE.steps.length);
    expect(new Set(unitStepIds).size).toBe(unitStepIds.length);
    expect(new Set(unitStepIds)).toEqual(
      new Set(HANGUL_COURSE.steps.map((step) => step.id)),
    );

    for (const step of HANGUL_COURSE.steps) {
      expect(
        HANGUL_COURSE.units.some((unit) => unit.id === step.unitId),
      ).toBe(true);
      expect(
        HANGUL_COURSE.units.find((unit) => unit.id === step.unitId)?.stepIds,
      ).toContain(step.id);
    }
  });

  test("critérios de conclusão e tipos de exercício vêm do conteúdo real", () => {
    expect(HANGUL_COURSE.completion).toMatchObject({
      requiresAllSteps: true,
      finalStepId: "c4",
      certification: "none",
    });

    const actualExerciseTypes = new Set(
      [...LESSONS, ...CHECKPOINTS].flatMap((item) =>
        item.exercises.map((exercise) => exercise.type),
      ),
    );
    expect(new Set(HANGUL_COURSE.exerciseTypes)).toEqual(actualExerciseTypes);

    for (const step of HANGUL_COURSE.steps) {
      const lesson = LESSONS.find((item) => item.id === step.id);
      const checkpoint = CHECKPOINTS.find((item) => item.id === step.id);
      const exerciseCount = lesson?.exercises.length ?? checkpoint?.exercises.length;
      expect(step.completion.exerciseCount).toBe(exerciseCount);
    }
  });

  test("pré-requisitos intercalam lições e checkpoints sem atalhos", () => {
    const step = (id: string) => HANGUL_COURSE.steps.find((item) => item.id === id)!;

    expect(step("h01").prerequisites).toEqual([]);
    expect(step("h02").prerequisites).toEqual(["h01"]);
    expect(step("h11").prerequisites).toEqual(["c1"]);
    expect(step("h16").prerequisites).toEqual(["c2"]);
    expect(step("h21").prerequisites).toEqual(["c3"]);
    expect(step("c1").prerequisites).toEqual(HANGUL_LESSON_IDS.slice(0, 10));
    expect(step("c2").prerequisites).toContain("c1");
    expect(step("c2").prerequisites).toEqual([
      ...HANGUL_LESSON_IDS.slice(0, 15),
      "c1",
    ]);
    expect(step("c3").prerequisites).toEqual([
      ...HANGUL_LESSON_IDS.slice(15, 20),
      "c1",
      "c2",
    ]);
    expect(step("c4").prerequisites).toEqual([
      ...HANGUL_LESSON_IDS,
      "c1",
      "c2",
      "c3",
    ]);

    const empty = createEmptyProgress(NOW);
    expect(isCourseStepUnlocked(empty, step("h01"))).toBe(true);
    expect(isCourseStepUnlocked(empty, step("h02"))).toBe(false);
    expect(isCourseStepUnlocked(empty, step("h11"))).toBe(false);
    expect(nextRecommendedCourseStep(empty, HANGUL_COURSE.steps)?.id).toBe("h01");

    const lessonsDone = markDone(createEmptyProgress(NOW), HANGUL_LESSON_IDS);
    expect(nextRecommendedCourseStep(lessonsDone, HANGUL_COURSE.steps)?.id).toBe("c1");
  });

  test("pré-requisitos do A1 intercalam lições e checkpoints sem atalhos", () => {
    const step = (id: string) => A1_COURSE.steps.find((item) => item.id === id)!;
    expect(step("a1-l01").prerequisites).toEqual([]);
    expect(step("a1-l02").prerequisites).toEqual(["a1-l01"]);
    expect(step("a1-l06").prerequisites).toEqual(["a1-c01"]);
    expect(step("a1-c01").prerequisites).toEqual([
      "a1-l01",
      "a1-l02",
      "a1-l03",
      "a1-l04",
      "a1-l05",
    ]);
    expect(step("a1-c08").prerequisites).toEqual([
      "a1-l36",
      "a1-l37",
      "a1-l38",
      "a1-l39",
      "a1-l40",
      "a1-c01",
      "a1-c02",
      "a1-c03",
      "a1-c04",
      "a1-c05",
      "a1-c06",
      "a1-c07",
    ]);

    const empty = createEmptyProgress(NOW);
    expect(isCourseStepUnlocked(empty, step("a1-l01"))).toBe(true);
    expect(isCourseStepUnlocked(empty, step("a1-l02"))).toBe(false);
    expect(isCourseStepUnlocked(empty, step("a1-c01"))).toBe(false);
    expect(nextRecommendedCourseStep(empty, A1_COURSE.steps)?.id).toBe("a1-l01");

    const firstFive = markDone(createEmptyProgress(NOW), [
      "a1-l01",
      "a1-l02",
      "a1-l03",
      "a1-l04",
      "a1-l05",
    ]);
    expect(isCourseStepUnlocked(firstFive, step("a1-c01"))).toBe(true);
    expect(nextRecommendedCourseStep(firstFive, A1_COURSE.steps)?.id).toBe("a1-c01");
  });

  test("progresso específico do curso é derivado, não persistido", () => {
    const progress = createEmptyProgress(NOW);
    markDone(progress, [...HANGUL_LESSON_IDS.slice(0, 10), "c1"], 88);
    progress.history.push({
      exerciseId: "h01-e01",
      correct: true,
      at: NOW.toISOString(),
    });
    progress.cards["h:word:고기"] = {
      box: 2,
      due: "2026-11-12T12:00:00.000Z",
    };
    const snapshot = structuredClone(progress);

    const summary = summarizeCourseProgress(progress, HANGUL_COURSE);

    expect(summary).toMatchObject({
      courseId: "hangul",
      totalSteps: 29,
      completedSteps: 11,
      totalLessons: 25,
      completedLessons: 10,
      totalCheckpoints: 4,
      completedCheckpoints: 1,
      percent: 38,
      complete: false,
      nextStep: { id: "h11", kind: "lesson" },
    });
    expect(progress).toEqual(snapshot);

    const incomplete = createEmptyProgress(NOW);
    expect(summarizeCourseProgress(incomplete, HANGUL_COURSE)).toMatchObject({
      completedSteps: 0,
      percent: 0,
      complete: false,
      nextStep: { id: "h01" },
    });

    const complete = markDone(createEmptyProgress(NOW), EXPECTED_HANGUL_STEP_IDS);
    expect(summarizeCourseProgress(complete, HANGUL_COURSE)).toMatchObject({
      completedSteps: 29,
      percent: 100,
      complete: true,
      nextStep: null,
      lockedIncompleteSteps: 0,
    });
  });

  test("A1 completa só com os 48 passos e não conclui por causa de outra lição", () => {
    const completeHangul = markDone(createEmptyProgress(NOW), EXPECTED_HANGUL_STEP_IDS);
    const a1 = getCourse("ko-a1")!;

    expect(summarizeCourseProgress(completeHangul, a1)).toMatchObject({
      totalSteps: 48,
      completedSteps: 0,
      percent: 0,
      complete: false,
      nextStep: { id: "a1-l01" },
    });
    expect(courseStepHref(a1, "a1-l01")).toBe("/a1/a1-l01");
    expect(courseStepHref(a1, "a1-l02")).toBe("/a1/a1-l02");
    expect(courseStepHref(a1, "a1-c01")).toBe("/a1/a1-c01");
    expect(courseStepHref(a1, "a1-c08")).toBe("/a1/a1-c08");

    const a1Done = markDone(createEmptyProgress(NOW), ["a1-l01"]);
    expect(summarizeCourseProgress(a1Done, a1)).toMatchObject({
      completedSteps: 1,
      percent: 2,
      complete: false,
      nextStep: { id: "a1-l02" },
    });

    const allA1 = markDone(createEmptyProgress(NOW), a1.steps.map((step) => step.id));
    expect(summarizeCourseProgress(allA1, a1)).toMatchObject({
      completedSteps: 48,
      percent: 100,
      complete: true,
      nextStep: null,
      lockedIncompleteSteps: 0,
    });
  });

  test("navegação só cria links para passos existentes do curso disponível", () => {
    expect(courseStepHref(HANGUL_COURSE, "h01")).toBe("/hangul/h01");
    expect(courseStepHref(HANGUL_COURSE, "c4")).toBe("/hangul/c4");
    expect(courseStepHref(HANGUL_COURSE, "h99")).toBeNull();
    expect(courseStepHref(HANGUL_COURSE, "a1-01")).toBeNull();

    for (const course of getPlannedCourses()) {
      expect(courseStepHref(course, "a1-01")).toBeNull();
    }
  });

  test("localização e ausência de certificação são explícitas", () => {
    for (const course of COURSE_REGISTRY) {
      expect(course.localization).toEqual({
        interfaceLocale: "pt-BR",
        contentLocale: "ko-KR",
        contentLanguage: "ko",
      });
      expect(course.completion.certification).toBe("none");
    }
  });
});

describe("validação do registro contra colisões", () => {
  test("aceita um curso futuro com namespace próprio", () => {
    expect(issueCodes([HANGUL_COURSE, futureCourse()])).toEqual([]);
  });

  test("rejeita IDs de curso e slug duplicados", () => {
    expect(issueCodes([HANGUL_COURSE, futureCourse({ id: "hangul", slug: "a1" })]))
      .toContain("course-id-duplicate");
    expect(issueCodes([HANGUL_COURSE, futureCourse({ id: "a1", slug: "hangul" })]))
      .toContain("course-slug-duplicate");
  });

  test("rejeita passos do namespace Hangul em curso futuro", () => {
    const base = futureCourse();
    const reused = futureCourse({
      steps: [{ ...base.steps[0]!, id: "h01" }],
      units: [{ ...base.units[0]!, stepIds: ["h01"] }],
      completion: { ...base.completion, finalStepId: "h01" },
    });

    const codes = issueCodes([HANGUL_COURSE, reused]);
    expect(codes).toContain("step-id-reserved");
    expect(codes).toContain("step-id-outside-course");
  });

  test("rejeita passo fora do próprio padrão e prefixo SRS repetido", () => {
    const base = futureCourse();
    const outside = futureCourse({
      steps: [{ ...base.steps[0]!, id: "a1-1" }],
      units: [{ ...base.units[0]!, stepIds: ["a1-1"] }],
      completion: { ...base.completion, finalStepId: "a1-1" },
    });
    expect(issueCodes([HANGUL_COURSE, outside])).toContain(
      "step-id-outside-course",
    );

    const reusedSrs = futureCourse({ srsKeyPrefix: "h:" });
    expect(issueCodes([HANGUL_COURSE, reusedSrs])).toContain(
      "srs-prefix-duplicate",
    );
  });

  test("rejeita curso planejado com conteúdo ou rota", () => {
    const planned = futureCourse({
      id: "ko-a1",
      status: "planned",
    });
    const codes = issueCodes([HANGUL_COURSE, planned]);
    expect(codes).toContain("planned-course-steps");
    expect(codes).toContain("planned-course-units");
    expect(codes).toContain("planned-course-route");
  });

  test("rejeita pré-requisito inexistente ou fora de ordem", () => {
    const base = futureCourse();
    const missing = futureCourse({
      steps: [{ ...base.steps[0]!, prerequisites: ["a1-99"] }],
    });
    expect(issueCodes([HANGUL_COURSE, missing])).toContain(
      "step-prerequisite-unknown",
    );

    const base2 = futureCourse();
    const ordered = futureCourse({
      steps: [
        {
          ...base2.steps[0]!,
          id: "a1-01",
          prerequisites: ["a1-02"],
        },
        {
          ...base2.steps[0]!,
          id: "a1-02",
          prerequisites: [],
        },
      ],
      units: [{ ...base2.units[0]!, stepIds: ["a1-01", "a1-02"] }],
      completion: { ...base2.completion, finalStepId: "a1-02" },
    });
    expect(issueCodes([HANGUL_COURSE, ordered])).toContain(
      "step-prerequisite-order",
    );
  });

  test("rejeita unidade com passo desconhecido e passo sem unidade", () => {
    const base = futureCourse();
    const unknown = futureCourse({
      units: [{ ...base.units[0]!, stepIds: ["a1-01", "a1-99"] }],
    });
    expect(issueCodes([HANGUL_COURSE, unknown])).toContain("unit-step-unknown");

    const withoutUnit = futureCourse({
      units: [{ ...base.units[0]!, stepIds: [] }],
    });
    const codes = issueCodes([HANGUL_COURSE, withoutUnit]);
    expect(codes).toContain("step-without-unit");
  });

  test("rejeita passo final fora da última posição", () => {
    const base = futureCourse();
    const wrongFinal = futureCourse({
      steps: [
        base.steps[0]!,
        {
          ...base.steps[0]!,
          id: "a1-02",
          prerequisites: [],
        },
      ],
      units: [{ ...base.units[0]!, stepIds: ["a1-01", "a1-02"] }],
      completion: { ...base.completion, finalStepId: "a1-01" },
    });
    expect(issueCodes([HANGUL_COURSE, wrongFinal])).toContain(
      "course-final-step-order",
    );
  });
});

describe("compatibilidade de progresso, SRS e exercícios", () => {
  test("merge preserva lições, cartões e chaves de cursos futuros", () => {
    const left = createEmptyProgress(NOW);
    markDone(left, ["h01"], 90);
    left.cards["h:word:고기"] = {
      box: 2,
      due: "2026-11-12T12:00:00.000Z",
      reviewedAt: "2026-11-10T12:00:00.000Z",
    };
    left.cards["a1:word:안녕"] = {
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
      reviewedAt: "2026-11-11T11:00:00.000Z",
    };

    const right = createEmptyProgress(NOW);
    markDone(right, ["h02"], 70);
    right.cards["h:word:고기"] = {
      box: 3,
      due: "2026-11-14T12:00:00.000Z",
      reviewedAt: "2026-11-11T10:00:00.000Z",
    };
    right.history.push({
      exerciseId: "h02-e01",
      correct: true,
      at: NOW.toISOString(),
      id: "attempt-1",
    });

    const merged = mergeProgress(left, right);

    expect(merged.lessons.h01).toEqual({ done: true, score: 90 });
    expect(merged.lessons.h02).toEqual({ done: true, score: 70 });
    expect(merged.cards["h:word:고기"]).toMatchObject({ box: 3 });
    expect(merged.cards["a1:word:안녕"]).toEqual(left.cards["a1:word:안녕"]);
    expect(merged.history.some((attempt) => attempt.id === "attempt-1")).toBe(true);
  });

  test("todo cartão SRS do Hangul continua no prefixo h:", () => {
    const keys = [...LESSONS, ...CHECKPOINTS].flatMap((item) =>
      item.exercises.flatMap((exercise) => exercise.srsCards ?? []),
    );

    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expect(key.startsWith(HANGUL_COURSE.srsKeyPrefix!)).toBe(true);
      expect(parseSrsCardKey(key)).not.toBeNull();
    }
  });

  test("o catálogo de exercícios cobre todos os tipos implementados sem IA", () => {
    const contentTypes = new Set(
      [...LESSONS, ...CHECKPOINTS].flatMap((item) =>
        item.exercises.map((exercise) => exercise.type),
      ),
    );
    // O Hangul não usa todos os nove formatos, mas nenhum tipo usado pode faltar.
    for (const type of contentTypes) {
      expect(IMPLEMENTED_EXERCISE_TYPES).toContain(type);
    }
    expect(new Set(IMPLEMENTED_EXERCISE_TYPES)).toEqual(
      new Set([
        "mcq",
        "cloze",
        "build-syllable",
        "listen",
        "translate",
        "audio-to-char",
        "char-to-audio",
        "minimal-pair",
        "reading",
      ]),
    );

    const ids = EXERCISE_TYPE_REGISTRY.map((definition) => definition.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const definition of EXERCISE_TYPE_REGISTRY) {
      expect(definition.grading).toMatch(/^(deterministic|self-check)$/);
      if (definition.status === "implemented") {
        expect(isImplementedExerciseType(definition.id)).toBe(true);
      } else {
        expect(isImplementedExerciseType(definition.id)).toBe(false);
      }
    }

    for (const type of HANGUL_COURSE.exerciseTypes) {
      expect(isImplementedExerciseType(type)).toBe(true);
    }
  });
});

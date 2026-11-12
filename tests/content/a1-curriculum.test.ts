import { describe, expect, test } from "vitest";
import {
  A1_CHECKPOINTS,
  A1_CURRICULUM,
  A1_LESSON_IDS,
  A1_LESSONS,
  A1_MODULES,
  validateA1Blueprint,
  type A1CurriculumBlueprint,
} from "@/content/curriculum/a1";
import { courseStepHref, getCourse } from "@/content/courses";
import { VOCAB_ENTRIES } from "@/content/vocabulary";
import { COURSE_LESSON_IDS } from "@/content/vocabulary";
import { summarizeCourseProgress } from "@/lib/courses";
import { EXERCISE_TYPE_REGISTRY } from "@/lib/exercises/registry";
import { createEmptyProgress } from "@/lib/storage";

const NOW = new Date("2026-11-12T12:00:00.000Z");

function issueCodes(blueprint: A1CurriculumBlueprint): string[] {
  return validateA1Blueprint(blueprint).map((issue) => issue.code);
}

describe("blueprint curricular A1", () => {
  test("registra 8 módulos, 40 lições e 8 checkpoints válidos", () => {
    expect(validateA1Blueprint(A1_CURRICULUM)).toEqual([]);
    expect(A1_MODULES).toHaveLength(8);
    expect(A1_LESSONS).toHaveLength(40);
    expect(A1_CHECKPOINTS).toHaveLength(8);
    expect(A1_LESSON_IDS.size).toBe(40);
    expect(A1_LESSONS.map((lesson) => lesson.id)).toEqual(
      Array.from({ length: 40 }, (_, index) => `a1-l${String(index + 1).padStart(2, "0")}`),
    );
    expect(A1_CHECKPOINTS.map((checkpoint) => checkpoint.id)).toEqual(
      Array.from({ length: 8 }, (_, index) => `a1-c${String(index + 1).padStart(2, "0")}`),
    );
  });

  test("cada lição contém o contrato pedagógico completo, sem dataset jogável", () => {
    const knownTypes = new Set(EXERCISE_TYPE_REGISTRY.map((definition) => definition.id));
    for (const lesson of A1_LESSONS) {
      expect(lesson.title).not.toBe("");
      expect(lesson.communicativeGoal).not.toBe("");
      expect(lesson.vocabulary.themes.length).toBeGreaterThan(0);
      expect(lesson.grammar.length).toBeGreaterThan(0);
      expect(lesson.dialogueScenario).not.toBe("");
      expect(lesson.listeningObjective).not.toBe("");
      expect(lesson.writingObjective).not.toBe("");
      expect(lesson.exerciseTypes.every((type) => knownTypes.has(type))).toBe(true);
      expect(lesson.assessment).toMatchObject({ automaticItems: 10, minCorrect: 8 });
      expect(lesson.estimatedMinutes).toBeGreaterThanOrEqual(45);
      expect(lesson.review.status).toBe("in-review");
      expect(lesson).not.toHaveProperty("dialogue");
      expect(lesson).not.toHaveProperty("exercises");
      expect(lesson).not.toHaveProperty("vocabularyEntries");
    }
    expect(VOCAB_ENTRIES.filter((entry) => entry.course === "ko-a1")).toEqual([]);
    expect(COURSE_LESSON_IDS.get("ko-a1")).toEqual(A1_LESSON_IDS);
  });

  test("módulos cobrem cada passo uma vez e checkpoints não permitem atalhos", () => {
    const stepIds = A1_MODULES.flatMap((module) => module.stepIds);
    expect(stepIds).toHaveLength(48);
    expect(new Set(stepIds).size).toBe(48);

    for (const [index, checkpoint] of A1_CHECKPOINTS.entries()) {
      const moduleLessons = A1_LESSONS.slice(index * 5, index * 5 + 5).map((lesson) => lesson.id);
      const previousCheckpoints = A1_CHECKPOINTS.slice(0, index).map((item) => item.id);
      expect(checkpoint.lessonIds).toEqual(moduleLessons);
      expect(checkpoint.prerequisites).toEqual([...moduleLessons, ...previousCheckpoints]);
      expect(A1_MODULES[index]?.stepIds.at(-1)).toBe(checkpoint.id);
    }
  });

  test("A1 continua planejado, sem rota, link ou conclusão prematura", () => {
    const course = getCourse("ko-a1")!;
    const progress = createEmptyProgress(NOW);
    for (const id of [...A1_LESSONS.map((lesson) => lesson.id), ...A1_CHECKPOINTS.map((checkpoint) => checkpoint.id)]) {
      progress.lessons[id] = { done: true, score: 100 };
    }

    expect(course.status).toBe("planned");
    expect(course.steps).toEqual([]);
    expect(course.basePath).toBeNull();
    expect(courseStepHref(course, "a1-l01")).toBeNull();
    expect(summarizeCourseProgress(progress, course)).toMatchObject({
      totalSteps: 0,
      completedSteps: 0,
      percent: 0,
      complete: false,
      nextStep: null,
    });
  });

  test.each([
    ["pré-requisito pendente", {
      ...A1_CURRICULUM,
      lessons: A1_LESSONS.map((lesson, index) => index === 1 ? { ...lesson, prerequisites: ["a1-l99"] } : lesson),
    }, ["lesson-prerequisite", "prerequisite-unknown"]],
    ["colisão de ID", {
      ...A1_CURRICULUM,
      lessons: A1_LESSONS.map((lesson, index) => index === 1 ? { ...lesson, id: "a1-l01" } : lesson),
    }, ["lesson-duplicate"]],
    ["checkpoint com escopo incorreto", {
      ...A1_CURRICULUM,
      checkpoints: A1_CHECKPOINTS.map((checkpoint, index) => index === 0 ? { ...checkpoint, lessonIds: ["a1-l01"] } : checkpoint),
    }, ["checkpoint-lessons"]],
    ["passo de módulo inexistente", {
      ...A1_CURRICULUM,
      modules: A1_MODULES.map((module, index) => index === 0 ? { ...module, stepIds: [...module.stepIds.slice(0, -1), "a1-c99"] } : module),
    }, ["checkpoint-position", "module-step-unknown"]],
    ["revisão aponta para o futuro", {
      ...A1_CURRICULUM,
      lessons: A1_LESSONS.map((lesson, index) => index === 1 ? { ...lesson, reviewDependencies: ["a1-l03"] } : lesson),
    }, ["review-dependency"]],
  ] satisfies readonly [string, A1CurriculumBlueprint, readonly string[]][]) (
    "rejeita %s",
    (_label, blueprint, expectedCodes) => {
      const codes = issueCodes(blueprint);
      for (const code of expectedCodes) expect(codes).toContain(code);
    },
  );
});

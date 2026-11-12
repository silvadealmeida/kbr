import { describe, expect, test } from "vitest";
import {
  A1_CHECKPOINTS,
  A1_CURRICULUM,
  A1_IMPLEMENTED_LESSONS,
  A1_LESSON_IDS,
  A1_LESSONS,
  A1_MODULES,
  getA1Lesson,
  validateA1Content,
  validateA1LessonContent,
  validateA1Blueprint,
  type A1CurriculumBlueprint,
  type A1LessonContent,
} from "@/content/curriculum/a1";
import {
  A1_COURSE,
  courseStepHref,
  getCourse,
  getInDevelopmentCourses,
  validateCourseRegistry,
} from "@/content/courses";
import { VOCAB_ENTRIES, type VocabEntry, type VocabSentence } from "@/content/vocabulary";
import { COURSE_LESSON_IDS } from "@/content/vocabulary";
import { summarizeCourseProgress } from "@/lib/courses";
import { EXERCISE_TYPE_REGISTRY } from "@/lib/exercises/registry";
import { createEmptyProgress } from "@/lib/storage";

const NOW = new Date("2026-11-12T12:00:00.000Z");
const IN_REVIEW = { status: "in-review" as const };

const FIXTURE_ENTRIES: readonly VocabEntry[] = Array.from({ length: 10 }, (_, index) => ({
  id: `ko:테스트${index + 1}`,
  ko: `테스트${index + 1}`,
  pt: `item ${index + 1}`,
  course: "ko-a1",
  lesson: "a1-l01",
  audioText: `테스트${index + 1}`,
  review: IN_REVIEW,
}));

const FIXTURE_SENTENCES: readonly VocabSentence[] = FIXTURE_ENTRIES.map((entry, index) => ({
  id: `vs:a1-l01-${index + 1}`,
  vocabId: entry.id,
  ko: `${entry.ko}예요.`,
  pt: `É o item ${index + 1}.`,
  target: entry.ko,
  contextMeaning: entry.pt,
  review: IN_REVIEW,
}));

const VALID_CONTENT: A1LessonContent = {
  id: "a1-l01",
  title: "Fixture estrutural",
  objective: "Validar o contrato sem publicar uma lição.",
  intro: [{ title: "Contexto", body: "Texto de introdução estrutural." }],
  dialogue: [
    { id: "d1", speaker: "A", ko: "안녕하세요?", pt: "Olá!", audioText: "안녕하세요?", review: IN_REVIEW },
    { id: "d2", speaker: "B", ko: "안녕하세요!", pt: "Olá!", audioText: "안녕하세요!", review: IN_REVIEW },
  ],
  vocabulary: {
    newIds: FIXTURE_ENTRIES.map((entry) => entry.id),
    reusedIds: [],
    sentenceIds: FIXTURE_SENTENCES.map((sentence) => sentence.id),
  },
  grammar: [{
    id: "g:a1-l01-fixture",
    titlePt: "Forma de teste",
    form: "이에요/예요",
    explanationPt: "Explicação estrutural de teste.",
    examples: [{ ko: "학생이에요.", pt: "Sou estudante.", audioText: "학생이에요." }],
    review: IN_REVIEW,
  }],
  exercises: [
    { id: "a1-l01-e1", type: "mcq", stage: "guided", prompt: "Fixture", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e2", type: "mcq", stage: "independent", prompt: "Fixture 2", options: ["A", "B"], correctAnswer: "A" },
  ],
  summary: ["Fechamento estrutural."],
  completion: { minScore: 80, minCorrect: 1 },
  review: IN_REVIEW,
};

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
    expect(A1_LESSONS.map((lesson) => lesson.id)).toEqual([...A1_LESSON_IDS]);
    expect(A1_LESSONS.map((lesson) => lesson.id)).toEqual(
      Array.from({ length: 40 }, (_, index) => `a1-l${String(index + 1).padStart(2, "0")}`),
    );
    expect(A1_CHECKPOINTS.map((checkpoint) => checkpoint.id)).toEqual(
      Array.from({ length: 8 }, (_, index) => `a1-c${String(index + 1).padStart(2, "0")}`),
    );
  });

  test("cada lição mantém o contrato editorial; só a implementada tem dataset", () => {
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
    const a1Entries = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-a1");
    expect(a1Entries.length).toBeGreaterThanOrEqual(10);
    expect(
      a1Entries.every(
        (entry) =>
          entry.lesson === "a1-l01" && entry.review.status === "in-review",
      ),
    ).toBe(true);
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

  test("A1 está em desenvolvimento: uma lição jogável e nenhuma conclusão de curso", () => {
    const course = getCourse("ko-a1")!;
    expect(course.status).toBe("in-development");
    expect(course.plannedTotals).toEqual({ lessons: 40, checkpoints: 8 });
    expect(course.steps.map((step) => step.id)).toEqual(["a1-l01"]);
    expect(course.units.flatMap((unit) => unit.stepIds)).toEqual(["a1-l01"]);
    expect(courseStepHref(course, "a1-l01")).toBe("/a1/a1-l01");
    expect(courseStepHref(course, "a1-l02")).toBeNull();
    expect(getInDevelopmentCourses().map((item) => item.id)).toEqual(["ko-a1"]);

    const progress = createEmptyProgress(NOW);
    progress.lessons["a1-l01"] = { done: true, score: 100 };
    expect(summarizeCourseProgress(progress, course)).toMatchObject({
      totalSteps: 1,
      completedSteps: 1,
      totalLessons: 1,
      completedLessons: 1,
      totalCheckpoints: 0,
      completedCheckpoints: 0,
      percent: 100,
      complete: false,
      nextStep: null,
    });
  });

  test("o dataset implementado é só a a1-l01 e passa na validação estrutural", () => {
    expect(validateA1Content()).toEqual([]);
    expect(validateCourseRegistry()).toEqual([]);
    expect(A1_IMPLEMENTED_LESSONS.map((lesson) => lesson.id)).toEqual([
      "a1-l01",
    ]);
    expect(getA1Lesson("a1-l01")).toBe(A1_IMPLEMENTED_LESSONS[0]);
    expect(getA1Lesson("a1-l02")).toBeUndefined();
    expect(A1_COURSE.steps.every((step) => getA1Lesson(step.id))).toBe(true);

    const lesson = A1_IMPLEMENTED_LESSONS[0]!;
    expect(lesson.exercises).toHaveLength(10);
    expect(
      lesson.exercises.filter((exercise) => exercise.stage === "guided"),
    ).toHaveLength(5);
    expect(
      lesson.exercises.filter((exercise) => exercise.stage === "independent"),
    ).toHaveLength(5);
    expect(new Set(lesson.exercises.map((exercise) => exercise.type))).toEqual(
      new Set(["mcq", "cloze", "listen", "translate"]),
    );
    expect(lesson.vocabulary.newIds).toHaveLength(11);
    expect(lesson.dialogue.length).toBeGreaterThanOrEqual(2);
    expect(lesson.intro.length).toBeGreaterThan(0);
    expect(lesson.summary.length).toBeGreaterThan(0);
  });

  test("o scaffold A1 não altera o curso Hangul nem o registro multi-curso", () => {
    const hangul = getCourse("hangul")!;
    expect(validateCourseRegistry()).toEqual([]);
    expect(hangul.status).toBe("available");
    expect(hangul.steps).toHaveLength(29);
    expect(hangul.steps.at(0)?.id).toBe("h01");
    expect(hangul.steps.at(-1)?.id).toBe("c4");
    expect(getCourse("ko-a1")?.status).toBe("in-development");
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

describe("contrato do conteúdo A1 futuro", () => {
  test("aceita uma fixture estrutural completa sem publicar conteúdo A1", () => {
    expect(validateA1LessonContent([VALID_CONTENT], A1_CURRICULUM, FIXTURE_ENTRIES, FIXTURE_SENTENCES)).toEqual([]);
  });

  test("rejeita referências, cobertura e metadados editoriais inválidos", () => {
    const invalid: A1LessonContent = {
      ...VALID_CONTENT,
      vocabulary: {
        newIds: [...VALID_CONTENT.vocabulary.newIds.slice(0, -1), "ko:inexistente"],
        reusedIds: [VALID_CONTENT.vocabulary.newIds[0]!],
        sentenceIds: VALID_CONTENT.vocabulary.sentenceIds.slice(0, -1),
      },
      exercises: [VALID_CONTENT.exercises[0]!, VALID_CONTENT.exercises[0]!],
      completion: { minScore: 101, minCorrect: 3 },
      review: { status: "reviewed" },
    };

    const codes = validateA1LessonContent([invalid], A1_CURRICULUM, FIXTURE_ENTRIES, FIXTURE_SENTENCES).map((issue) => issue.code);
    expect(codes).toEqual(expect.arrayContaining([
      "vocab-unknown",
      "vocab-overlap",
      "sentence-coverage",
      "exercise-id",
      "completion",
      "review-evidence",
    ]));
  });

  test("rejeita lição sem introdução, fechamento ou etapa independente", () => {
    const incomplete: A1LessonContent = {
      ...VALID_CONTENT,
      intro: [],
      summary: [],
      exercises: [{ ...VALID_CONTENT.exercises[0]!, stage: "guided" }],
    };
    const codes = validateA1LessonContent(
      [incomplete],
      A1_CURRICULUM,
      FIXTURE_ENTRIES,
      FIXTURE_SENTENCES,
    ).map((issue) => issue.code);

    expect(codes).toEqual(
      expect.arrayContaining([
        "intro-empty",
        "summary-empty",
        "exercise-independent",
      ]),
    );
  });

  test("rejeita frases sem tradução, dica, alvo, lacuna ou revisão válidos", () => {
    const badSentences: readonly VocabSentence[] = FIXTURE_SENTENCES.map((sentence, index) => {
      if (index === 0) return { ...sentence, pt: " " };
      if (index === 1) return { ...sentence, contextMeaning: "" };
      if (index === 2) return { ...sentence, target: "다른말" };
      if (index === 3) return { ...sentence, ko: "no hangul", target: "no" };
      if (index === 4) return { ...sentence, ko: `${sentence.target} ${sentence.target}` };
      if (index === 5) return { ...sentence, review: { status: "reviewed" as const } };
      return sentence;
    });
    const content: A1LessonContent = {
      ...VALID_CONTENT,
      dialogue: [
        { ...VALID_CONTENT.dialogue[0]!, review: { status: "reviewed" as const } },
        VALID_CONTENT.dialogue[1]!,
      ],
      grammar: [{
        ...VALID_CONTENT.grammar[0]!,
        examples: [{ ko: "no hangul", pt: "Exemplo inválido.", audioText: "no hangul" }],
        review: { status: "reviewed" as const },
      }],
    };

    const codes = validateA1LessonContent([content], A1_CURRICULUM, FIXTURE_ENTRIES, badSentences).map((issue) => issue.code);
    expect(codes).toEqual(expect.arrayContaining([
      "sentence-translation",
      "sentence-cue",
      "sentence-target",
      "sentence-korean",
      "sentence-gap",
      "review-evidence",
      "grammar-example-korean",
    ]));
  });
});

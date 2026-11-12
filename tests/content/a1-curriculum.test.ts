import { describe, expect, test } from "vitest";
import {
  A1_CHECKPOINTS,
  A1_CURRICULUM,
  A1_IMPLEMENTED_CHECKPOINTS,
  A1_IMPLEMENTED_LESSONS,
  A1_LESSON_IDS,
  A1_LESSONS,
  A1_MODULES,
  getA1Checkpoint,
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
import { VOCAB_ENTRIES, VOCAB_SENTENCES, type VocabEntry, type VocabSentence } from "@/content/vocabulary";
import { COURSE_LESSON_IDS } from "@/content/vocabulary";
import { summarizeCourseProgress } from "@/lib/courses";
import { checkAnswer } from "@/lib/exercises";
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
  number: 1,
  moduleId: "a1-m01",
  title: "Fixture estrutural",
  objective: "Validar o contrato sem publicar uma lição.",
  prerequisites: [],
  estimatedMinutes: 50,
  dialogueTitle: "Fixture",
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
    { id: "a1-l01-e2", type: "mcq", stage: "guided", prompt: "Fixture 2", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e3", type: "mcq", stage: "guided", prompt: "Fixture 3", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e4", type: "mcq", stage: "guided", prompt: "Fixture 4", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e5", type: "mcq", stage: "guided", prompt: "Fixture 5", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e6", type: "mcq", stage: "independent", prompt: "Fixture 6", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e7", type: "mcq", stage: "independent", prompt: "Fixture 7", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e8", type: "mcq", stage: "independent", prompt: "Fixture 8", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e9", type: "mcq", stage: "independent", prompt: "Fixture 9", options: ["A", "B"], correctAnswer: "A" },
    { id: "a1-l01-e10", type: "mcq", stage: "independent", prompt: "Fixture 10", options: ["A", "B"], correctAnswer: "A" },
  ],
  summary: ["Fechamento estrutural."],
  completion: { minScore: 80, minCorrect: 8 },
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

  test("todas as lições do blueprint têm dataset e o vocabulário cobre o curso", () => {
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
    expect(a1Entries.length).toBeGreaterThanOrEqual(430);
    expect(a1Entries.length).toBeLessThanOrEqual(560);
    expect(a1Entries.every((entry) => entry.review.status === "in-review")).toBe(true);
    expect(new Set(a1Entries.map((entry) => entry.lesson)).size).toBe(40);
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

  test("A1 está disponível com 40 lições e 8 checkpoints, sem conclusão prematura", () => {
    const course = getCourse("ko-a1")!;
    expect(course.status).toBe("available");
    expect(course.plannedTotals).toBeUndefined();
    expect(course.steps).toHaveLength(48);
    expect(course.steps.slice(0, 6).map((step) => step.id)).toEqual([
      "a1-l01",
      "a1-l02",
      "a1-l03",
      "a1-l04",
      "a1-l05",
      "a1-c01",
    ]);
    expect(course.steps.at(-1)?.id).toBe("a1-c08");
    expect(course.units).toHaveLength(8);
    expect(course.units.flatMap((unit) => unit.stepIds)).toHaveLength(48);
    expect(courseStepHref(course, "a1-l01")).toBe("/a1/a1-l01");
    expect(courseStepHref(course, "a1-l02")).toBe("/a1/a1-l02");
    expect(courseStepHref(course, "a1-c01")).toBe("/a1/a1-c01");
    expect(course.completion).toEqual({
      requiresAllSteps: true,
      finalStepId: "a1-c08",
      certification: "none",
    });
    expect(getInDevelopmentCourses()).toEqual([]);

    const progress = createEmptyProgress(NOW);
    progress.lessons["a1-l01"] = { done: true, score: 100 };
    expect(summarizeCourseProgress(progress, course)).toMatchObject({
      totalSteps: 48,
      completedSteps: 1,
      totalLessons: 40,
      completedLessons: 1,
      totalCheckpoints: 8,
      completedCheckpoints: 0,
      percent: 2,
      complete: false,
      nextStep: { id: "a1-l02" },
    });
  });

  test("o dataset completo é válido, cobre os 48 passos e tem gabaritos únicos", () => {
    expect(validateA1Content()).toEqual([]);
    expect(validateCourseRegistry()).toEqual([]);
    expect(A1_IMPLEMENTED_LESSONS.map((lesson) => lesson.id)).toEqual([
      ...A1_LESSON_IDS,
    ]);
    expect(A1_IMPLEMENTED_CHECKPOINTS.map((checkpoint) => checkpoint.id)).toEqual(
      A1_CHECKPOINTS.map((checkpoint) => checkpoint.id),
    );
    expect(A1_COURSE.steps.every((step) =>
      step.kind === "lesson"
        ? getA1Lesson(step.id) !== undefined
        : getA1Checkpoint(step.id) !== undefined,
    )).toBe(true);
    expect(getA1Lesson("a1-l01")).toBe(A1_IMPLEMENTED_LESSONS[0]);
    expect(getA1Lesson("a1-l41")).toBeUndefined();
    expect(getA1Checkpoint("a1-c08")).toBe(
      A1_IMPLEMENTED_CHECKPOINTS.at(-1),
    );

    const exerciseIds = new Set<string>();
    const allExercises = [
      ...A1_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
      ...A1_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
    ];
    expect(allExercises).toHaveLength(40 * 10 + 7 * 25 + 40);
    for (const exercise of allExercises) {
      expect(exerciseIds.has(exercise.id), exercise.id).toBe(false);
      exerciseIds.add(exercise.id);
      expect(exercise.prompt.trim(), exercise.id).not.toBe("");

      if (exercise.type === "mcq") {
        expect(new Set(exercise.options).size, exercise.id).toBe(
          exercise.options.length,
        );
        expect(exercise.options, exercise.id).toContain(exercise.correctAnswer);
        expect(
          checkAnswer(exercise, {
            kind: "text",
            value: exercise.correctAnswer,
          }).correct,
          exercise.id,
        ).toBe(true);
        const wrong = exercise.options.find(
          (option) => option !== exercise.correctAnswer,
        )!;
        expect(
          checkAnswer(exercise, { kind: "text", value: wrong }).correct,
          exercise.id,
        ).toBe(false);
      }

      if (exercise.type === "reading") {
        const options = exercise.options ?? [];
        expect(new Set(options.map((option) => option.id)).size).toBe(
          options.length,
        );
        expect(options.some((option) => option.id === exercise.correctOptionId)).toBe(
          true,
        );
        expect(
          checkAnswer(exercise, {
            kind: "choice",
            optionId: exercise.correctOptionId!,
          }).correct,
          exercise.id,
        ).toBe(true);
      }

      if (
        exercise.type === "cloze" ||
        exercise.type === "listen" ||
        exercise.type === "translate"
      ) {
        expect(exercise.answer.trim(), exercise.id).not.toBe("");
        expect(
          checkAnswer(exercise, { kind: "text", value: exercise.answer }).correct,
          exercise.id,
        ).toBe(true);
        for (const accepted of exercise.acceptedAnswers ?? []) {
          expect(
            checkAnswer(exercise, { kind: "text", value: accepted }).correct,
            `${exercise.id}: ${accepted}`,
          ).toBe(true);
        }
      }
    }

    for (const lesson of A1_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(lesson.exercises.filter((exercise) => exercise.stage === "guided")).toHaveLength(5);
      expect(lesson.exercises.filter((exercise) => exercise.stage === "independent")).toHaveLength(5);
      expect(lesson.intro.length).toBeGreaterThanOrEqual(3);
      expect(lesson.summary.length).toBeGreaterThanOrEqual(3);
      expect(lesson.dialogue.length).toBeGreaterThanOrEqual(2);
      const plan = A1_CURRICULUM.lessons.find((item) => item.id === lesson.id)!;
      expect(lesson.vocabulary.newIds.length).toBeGreaterThanOrEqual(
        plan.vocabulary.newItems.min,
      );
      expect(lesson.vocabulary.newIds.length).toBeLessThanOrEqual(
        plan.vocabulary.newItems.max,
      );
      for (const id of lesson.vocabulary.newIds) {
        expect(
          VOCAB_ENTRIES.some(
            (entry) => entry.id === id && entry.lesson === lesson.id,
          ),
          id,
        ).toBe(true);
      }
      for (const id of lesson.vocabulary.sentenceIds) {
        expect(VOCAB_SENTENCES.some((sentence) => sentence.id === id), id).toBe(true);
      }
    }

    for (const checkpoint of A1_IMPLEMENTED_CHECKPOINTS) {
      expect(checkpoint.exercises).toHaveLength(
        checkpoint.id === "a1-c08" ? 40 : 25,
      );
      expect(checkpoint.passingScore).toBe(80);
      expect(checkpoint.minCorrect).toBe(
        checkpoint.id === "a1-c08" ? 32 : 20,
      );
      expect(checkpoint.exercises.some((exercise) => exercise.type === "listen")).toBe(true);
      expect(
        checkpoint.exercises.some(
          (exercise) => exercise.type === "reading" || exercise.type === "mcq",
        ),
      ).toBe(true);
      expect(checkpoint.review.status).toBe("in-review");
    }
  });

  test("o curso A1 completo não altera o curso Hangul nem o registro multi-curso", () => {
    const hangul = getCourse("hangul")!;
    expect(validateCourseRegistry()).toEqual([]);
    expect(hangul.status).toBe("available");
    expect(hangul.steps).toHaveLength(29);
    expect(hangul.steps.at(0)?.id).toBe("h01");
    expect(hangul.steps.at(-1)?.id).toBe("c4");
    expect(getCourse("ko-a1")?.status).toBe("available");
    expect(getCourse("ko-a1")?.steps).toHaveLength(48);
    expect(getInDevelopmentCourses()).toEqual([]);
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
      if (index === 2) return { ...sentence, target: " " };
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

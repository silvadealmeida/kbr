import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { A1CheckpointPlayer } from "@/components/a1/A1CheckpointPlayer";
import { A1LessonPlayer } from "@/components/a1/A1LessonPlayer";
import {
  C2_IMPLEMENTED_LESSONS,
  getC2Checkpoint,
  getC2Lesson,
} from "@/content/curriculum/c2";
import { C2_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getC2Lesson(lessonId);
  if (lesson) return { title: `${lesson.id} · ${lesson.title}` };
  const checkpoint = getC2Checkpoint(lessonId);
  return {
    title: checkpoint
      ? `${checkpoint.id} · ${checkpoint.title}`
      : "Lição de Coreano C2",
  };
}

function nextStepAfter(stepId: string) {
  const index = C2_COURSE.steps.findIndex((step) => step.id === stepId);
  return index >= 0 ? (C2_COURSE.steps[index + 1] ?? null) : null;
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;

  const step = C2_COURSE.steps.find((item) => item.id === lessonId);
  if (!step) notFound();

  const lesson = getC2Lesson(lessonId);
  if (lesson) {
    return (
      <A1LessonPlayer
        lesson={lesson}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        course={courseClientView(C2_COURSE)}
        levelLabel="C2"
        entryCourseLabel="C1"
        entryCourseHref="/c1"
        totalLessons={40}
      />
    );
  }

  const checkpoint = getC2Checkpoint(lessonId);
  if (checkpoint) {
    return (
      <A1CheckpointPlayer
        checkpoint={checkpoint}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        vocabularyFacts={courseVocabularyFacts(C2_IMPLEMENTED_LESSONS)}
        course={courseClientView(C2_COURSE)}
        levelLabel="C2"
        entryCourseLabel="C1"
        entryCourseHref="/c1"
      />
    );
  }

  notFound();
}

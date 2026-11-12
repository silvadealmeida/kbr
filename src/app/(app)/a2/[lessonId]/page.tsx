import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { A1CheckpointPlayer } from "@/components/a1/A1CheckpointPlayer";
import { A1LessonPlayer } from "@/components/a1/A1LessonPlayer";
import {
  A2_IMPLEMENTED_LESSONS,
  getA2Checkpoint,
  getA2Lesson,
} from "@/content/curriculum/a2";
import { A2_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getA2Lesson(lessonId);
  if (lesson) return { title: `${lesson.id} · ${lesson.title}` };
  const checkpoint = getA2Checkpoint(lessonId);
  return {
    title: checkpoint
      ? `${checkpoint.id} · ${checkpoint.title}`
      : "Lição de Coreano A2",
  };
}

function nextStepAfter(stepId: string) {
  const index = A2_COURSE.steps.findIndex((step) => step.id === stepId);
  return index >= 0 ? (A2_COURSE.steps[index + 1] ?? null) : null;
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;

  const step = A2_COURSE.steps.find((item) => item.id === lessonId);
  if (!step) notFound();

  const lesson = getA2Lesson(lessonId);
  if (lesson) {
    return (
      <A1LessonPlayer
        lesson={lesson}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        course={courseClientView(A2_COURSE)}
        levelLabel="A2"
        totalLessons={40}
      />
    );
  }

  const checkpoint = getA2Checkpoint(lessonId);
  if (checkpoint) {
    return (
      <A1CheckpointPlayer
        checkpoint={checkpoint}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        vocabularyFacts={courseVocabularyFacts(A2_IMPLEMENTED_LESSONS)}
        course={courseClientView(A2_COURSE)}
        levelLabel="A2"
      />
    );
  }

  notFound();
}

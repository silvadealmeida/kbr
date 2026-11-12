import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { A1CheckpointPlayer } from "@/components/a1/A1CheckpointPlayer";
import { A1LessonPlayer } from "@/components/a1/A1LessonPlayer";
import {
  A1_IMPLEMENTED_LESSONS,
  getA1Checkpoint,
  getA1Lesson,
} from "@/content/curriculum/a1";
import { A1_COURSE } from "@/content/courses";
import { a1VocabularyFacts } from "@/lib/a1/completion";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getA1Lesson(lessonId);
  if (lesson) return { title: `${lesson.id} · ${lesson.title}` };
  const checkpoint = getA1Checkpoint(lessonId);
  return {
    title: checkpoint
      ? `${checkpoint.id} · ${checkpoint.title}`
      : "Lição de Coreano A1",
  };
}

function nextStepAfter(stepId: string) {
  const index = A1_COURSE.steps.findIndex((step) => step.id === stepId);
  return index >= 0 ? (A1_COURSE.steps[index + 1] ?? null) : null;
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;

  const step = A1_COURSE.steps.find((item) => item.id === lessonId);
  if (!step) notFound();

  const lesson = getA1Lesson(lessonId);
  if (lesson) {
    return (
      <A1LessonPlayer
        lesson={lesson}
        step={step}
        nextStep={nextStepAfter(lessonId)}
      />
    );
  }

  const checkpoint = getA1Checkpoint(lessonId);
  if (checkpoint) {
    return (
      <A1CheckpointPlayer
        checkpoint={checkpoint}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        vocabularyFacts={a1VocabularyFacts(A1_IMPLEMENTED_LESSONS)}
      />
    );
  }

  notFound();
}

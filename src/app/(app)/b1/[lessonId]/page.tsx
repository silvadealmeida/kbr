import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { A1CheckpointPlayer } from "@/components/a1/A1CheckpointPlayer";
import { A1LessonPlayer } from "@/components/a1/A1LessonPlayer";
import {
  B1_IMPLEMENTED_LESSONS,
  getB1Checkpoint,
  getB1Lesson,
} from "@/content/curriculum/b1";
import { B1_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getB1Lesson(lessonId);
  if (lesson) return { title: `${lesson.id} · ${lesson.title}` };
  const checkpoint = getB1Checkpoint(lessonId);
  return {
    title: checkpoint
      ? `${checkpoint.id} · ${checkpoint.title}`
      : "Lição de Coreano B1",
  };
}

function nextStepAfter(stepId: string) {
  const index = B1_COURSE.steps.findIndex((step) => step.id === stepId);
  return index >= 0 ? (B1_COURSE.steps[index + 1] ?? null) : null;
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;

  const step = B1_COURSE.steps.find((item) => item.id === lessonId);
  if (!step) notFound();

  const lesson = getB1Lesson(lessonId);
  if (lesson) {
    return (
      <A1LessonPlayer
        lesson={lesson}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        course={courseClientView(B1_COURSE)}
        levelLabel="B1"
        entryCourseLabel="A2"
        entryCourseHref="/a2"
        totalLessons={40}
      />
    );
  }

  const checkpoint = getB1Checkpoint(lessonId);
  if (checkpoint) {
    return (
      <A1CheckpointPlayer
        checkpoint={checkpoint}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        vocabularyFacts={courseVocabularyFacts(B1_IMPLEMENTED_LESSONS)}
        course={courseClientView(B1_COURSE)}
        levelLabel="B1"
        entryCourseLabel="A2"
        entryCourseHref="/a2"
      />
    );
  }

  notFound();
}

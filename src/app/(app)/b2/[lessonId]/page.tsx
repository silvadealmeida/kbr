import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { A1CheckpointPlayer } from "@/components/a1/A1CheckpointPlayer";
import { A1LessonPlayer } from "@/components/a1/A1LessonPlayer";
import {
  B2_IMPLEMENTED_LESSONS,
  getB2Checkpoint,
  getB2Lesson,
} from "@/content/curriculum/b2";
import { B2_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getB2Lesson(lessonId);
  if (lesson) return { title: `${lesson.id} · ${lesson.title}` };
  const checkpoint = getB2Checkpoint(lessonId);
  return {
    title: checkpoint
      ? `${checkpoint.id} · ${checkpoint.title}`
      : "Lição de Coreano B2",
  };
}

function nextStepAfter(stepId: string) {
  const index = B2_COURSE.steps.findIndex((step) => step.id === stepId);
  return index >= 0 ? (B2_COURSE.steps[index + 1] ?? null) : null;
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;

  const step = B2_COURSE.steps.find((item) => item.id === lessonId);
  if (!step) notFound();

  const lesson = getB2Lesson(lessonId);
  if (lesson) {
    return (
      <A1LessonPlayer
        lesson={lesson}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        course={courseClientView(B2_COURSE)}
        levelLabel="B2"
        entryCourseLabel="B1"
        entryCourseHref="/b1"
        totalLessons={40}
      />
    );
  }

  const checkpoint = getB2Checkpoint(lessonId);
  if (checkpoint) {
    return (
      <A1CheckpointPlayer
        checkpoint={checkpoint}
        step={step}
        nextStep={nextStepAfter(lessonId)}
        vocabularyFacts={courseVocabularyFacts(B2_IMPLEMENTED_LESSONS)}
        course={courseClientView(B2_COURSE)}
        levelLabel="B2"
        entryCourseLabel="B1"
        entryCourseHref="/b1"
      />
    );
  }

  notFound();
}

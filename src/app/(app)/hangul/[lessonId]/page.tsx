import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckpointPlayer } from "@/components/hangul/CheckpointPlayer";
import { LessonPlayer } from "@/components/hangul/LessonPlayer";
import { CHECKPOINTS, getCheckpoint } from "@/content/hangul/checkpoints";
import { LESSONS, getLesson } from "@/content/hangul/lessons";
import { nextCourseStepAfter } from "@/lib/progress/lesson";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (lesson) return { title: `${lesson.id} · ${lesson.title}` };
  const checkpoint = getCheckpoint(lessonId);
  return { title: checkpoint ? `${checkpoint.id} · ${checkpoint.title}` : "Lição de Hangul" };
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;

  const lesson = getLesson(lessonId);
  if (lesson) {
    const next = nextCourseStepAfter(LESSONS, CHECKPOINTS, lesson.id);
    return <LessonPlayer lesson={lesson} nextStep={next ?? null} />;
  }

  const checkpoint = getCheckpoint(lessonId);
  if (checkpoint) {
    const next = nextCourseStepAfter(LESSONS, CHECKPOINTS, checkpoint.id);
    return <CheckpointPlayer checkpoint={checkpoint} nextStep={next ?? null} />;
  }

  notFound();
}

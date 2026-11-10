import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/hangul/LessonPlayer";
import { IMPLEMENTED_LESSON_IDS, LESSONS, getLesson } from "@/content/hangul/lessons";
import { nextLessonAfter } from "@/lib/progress/lesson";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  return { title: lesson ? `${lesson.id} · ${lesson.title}` : "Lição de Hangul" };
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;
  if (!IMPLEMENTED_LESSON_IDS.has(lessonId)) notFound();

  const lesson = getLesson(lessonId);
  if (!lesson) notFound();

  const next = nextLessonAfter(LESSONS, lesson.id);

  return (
    <LessonPlayer
      lesson={lesson}
      nextLesson={next ? { id: next.id, title: next.title } : null}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { A1LessonPlayer } from "@/components/a1/A1LessonPlayer";
import { getA1Lesson } from "@/content/curriculum/a1";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getA1Lesson(lessonId);
  return { title: lesson ? `${lesson.id} · ${lesson.title}` : "Lição de Coreano A1" };
}

export default async function Page({ params }: PageProps) {
  const { lessonId } = await params;
  const lesson = getA1Lesson(lessonId);
  if (!lesson) notFound();

  return <A1LessonPlayer lesson={lesson} />;
}

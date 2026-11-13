import type { Metadata } from "next";
import { A1CourseArea } from "@/components/a1/A1CourseArea";
import { PageHeader } from "@/components/ui/PageHeader";
import { C1_IMPLEMENTED_LESSONS } from "@/content/curriculum/c1";
import { C1_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

export const metadata: Metadata = { title: "Coreano C1" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="한국어 C1"
        title="Coreano C1"
        subtitle="Argumentação, leitura crítica, discurso acadêmico, edição e mediação."
      />
      <A1CourseArea
        course={courseClientView(C1_COURSE)}
        levelLabel="C1"
        entryCourseLabel="B2"
        entryCourseHref="/b2"
        vocabularyFacts={courseVocabularyFacts(C1_IMPLEMENTED_LESSONS)}
      />
    </>
  );
}

import type { Metadata } from "next";
import { A1CourseArea } from "@/components/a1/A1CourseArea";
import { PageHeader } from "@/components/ui/PageHeader";
import { B1_IMPLEMENTED_LESSONS } from "@/content/curriculum/b1";
import { B1_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

export const metadata: Metadata = { title: "Coreano B1" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="한국어 B1"
        title="Coreano B1"
        subtitle="Narrativas, argumentos, trabalho, sociedade, mídia e produção independente."
      />
      <A1CourseArea
        course={courseClientView(B1_COURSE)}
        levelLabel="B1"
        entryCourseLabel="A2"
        entryCourseHref="/a2"
        vocabularyFacts={courseVocabularyFacts(B1_IMPLEMENTED_LESSONS)}
      />
    </>
  );
}

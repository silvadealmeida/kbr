import type { Metadata } from "next";
import { A1CourseArea } from "@/components/a1/A1CourseArea";
import { PageHeader } from "@/components/ui/PageHeader";
import { B2_IMPLEMENTED_LESSONS } from "@/content/curriculum/b2";
import { B2_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

export const metadata: Metadata = { title: "Coreano B2" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="한국어 B2"
        title="Coreano B2"
        subtitle="Textos longos, argumentação, mídia, negociação e produção independente."
      />
      <A1CourseArea
        course={courseClientView(B2_COURSE)}
        levelLabel="B2"
        entryCourseLabel="B1"
        entryCourseHref="/b1"
        vocabularyFacts={courseVocabularyFacts(B2_IMPLEMENTED_LESSONS)}
      />
    </>
  );
}

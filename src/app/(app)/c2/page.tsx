import type { Metadata } from "next";
import { A1CourseArea } from "@/components/a1/A1CourseArea";
import { PageHeader } from "@/components/ui/PageHeader";
import { C2_IMPLEMENTED_LESSONS } from "@/content/curriculum/c2";
import { C2_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

export const metadata: Metadata = { title: "Coreano C2" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="한국어 C2"
        title="Coreano C2"
        subtitle="Pragmática, estilo, retórica, literatura, síntese e mediação sofisticada."
      />
      <A1CourseArea
        course={courseClientView(C2_COURSE)}
        levelLabel="C2"
        entryCourseLabel="C1"
        entryCourseHref="/c1"
        vocabularyFacts={courseVocabularyFacts(C2_IMPLEMENTED_LESSONS)}
      />
    </>
  );
}

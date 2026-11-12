import type { Metadata } from "next";
import { A1CourseArea } from "@/components/a1/A1CourseArea";
import { PageHeader } from "@/components/ui/PageHeader";
import { A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2";
import { A2_COURSE } from "@/content/courses";
import { courseClientView } from "@/content/courses/client";
import { courseVocabularyFacts } from "@/lib/courses/completion";

export const metadata: Metadata = { title: "Coreano A2" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="한국어 A2"
        title="Coreano A2"
        subtitle="Relatos, planos, casa, saúde, trabalho, viagem, cultura e integração."
      />
      <A1CourseArea
        course={courseClientView(A2_COURSE)}
        levelLabel="A2"
        vocabularyFacts={courseVocabularyFacts(A2_IMPLEMENTED_LESSONS)}
      />
    </>
  );
}

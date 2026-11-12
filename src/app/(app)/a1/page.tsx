import type { Metadata } from "next";
import { A1CourseArea } from "@/components/a1/A1CourseArea";
import { PageHeader } from "@/components/ui/PageHeader";
import { A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1";
import { a1VocabularyFacts } from "@/lib/a1/completion";

export const metadata: Metadata = { title: "Coreano A1" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="한국어 A1"
        title="Coreano A1"
        subtitle="Primeiro contato, rotina, casa, comida, deslocamento, lazer, saúde e integração."
      />
      <A1CourseArea
        vocabularyFacts={a1VocabularyFacts(A1_IMPLEMENTED_LESSONS)}
      />
    </>
  );
}

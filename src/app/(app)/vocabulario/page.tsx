import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { VocabularyArea } from "@/components/vocabulary/VocabularyArea";

export const metadata: Metadata = { title: "Vocabulário" };

export default function Page() {
  return (
    <>
      <PageHeader ko="단어" title="Vocabulário" subtitle="Palavras das suas lições, para revisar em frases." />
      <VocabularyArea />
    </>
  );
}

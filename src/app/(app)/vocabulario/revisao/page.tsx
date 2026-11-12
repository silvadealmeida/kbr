import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { VocabReviewArea } from "@/components/vocabulary/VocabReviewArea";

export const metadata: Metadata = { title: "Revisão de vocabulário" };

export default function Page() {
  return (
    <>
      <PageHeader ko="복습" title="Revisão diária" subtitle="Sessões curtas de frases e cartões." />
      <VocabReviewArea />
    </>
  );
}

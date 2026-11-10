import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Vocabulário" };

export default function Page() {
  return (
    <>
      <PageHeader ko="단어" title="Vocabulário" subtitle="Palavras e frases úteis para o dia a dia." />
      <EmptyState glyph="말" title="Seu vocabulário ainda está vazio">As palavras que você aprender nas lições ficarão reunidas aqui.</EmptyState>
    </>
  );
}

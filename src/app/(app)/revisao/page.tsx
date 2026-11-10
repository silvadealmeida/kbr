import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Revisão" };

export default function Page() {
  return (
    <>
      <PageHeader ko="복습" title="Revisão" subtitle="Reforce o que você já estudou." />
      <EmptyState glyph="↻" title="Nada para revisar ainda">Quando você estudar palavras e letras, os cartões para revisar aparecerão aqui.</EmptyState>
    </>
  );
}

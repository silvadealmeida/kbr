import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Lições" };

export default function Page() {
  return (
    <>
      <PageHeader ko="수업" title="Lições" subtitle="Diálogos, gramática e exercícios em ordem." />
      <EmptyState glyph="과" title="As lições estão em preparação">As primeiras lições vão cobrir cumprimentos, apresentações e vocabulário básico.</EmptyState>
    </>
  );
}

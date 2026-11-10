import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Aprender Hangul" };

export default function Page() {
  return (
    <>
      <PageHeader ko="한글" title="Aprender Hangul" subtitle="O alfabeto coreano, letra por letra." />
      <EmptyState glyph="ㄱ" title="Letras e sílabas chegam em breve">Aqui você vai conhecer vogais e consoantes, ouvir a pronúncia e montar sílabas.</EmptyState>
    </>
  );
}

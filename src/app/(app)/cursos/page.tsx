import type { Metadata } from "next";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Cursos" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="과정"
        title="Cursos"
        subtitle="Hangul e Coreano A1 disponíveis; A2–C2 em planejamento."
      />
      <CourseCatalog />
    </>
  );
}

import type { Metadata } from "next";
import { ReviewArea } from "@/components/review/ReviewArea";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Revisão" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="복습"
        title="Revisão"
        subtitle="Revise o que já estudou no tempo certo, sem consultar a resposta."
      />
      <ReviewArea />
    </>
  );
}

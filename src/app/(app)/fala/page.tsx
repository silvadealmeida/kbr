import type { Metadata } from "next";
import { SpeakingPracticeArea } from "@/components/speaking/SpeakingPracticeArea";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Prática de fala (experimental)" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="말하기"
        title="Prática de fala"
        subtitle="Experimental: fale uma palavra e veja o que o navegador reconhece."
      />
      <SpeakingPracticeArea />
    </>
  );
}

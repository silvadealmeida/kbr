import type { Metadata } from "next";
import { HangulCourse } from "@/components/hangul/HangulCourse";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Aprender Hangul" };

export default function Page() {
  return (
    <>
      <PageHeader
        ko="한글"
        title="Aprender Hangul"
        subtitle="Comece pelos blocos silábicos e pelas primeiras vogais."
      />
      <HangulCourse />
    </>
  );
}

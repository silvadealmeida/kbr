import type { Metadata } from "next";
import Link from "next/link";
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
      <aside className="mt-8 border-l-2 border-line-strong bg-surface-2 p-4 text-sm">
        <p className="mono-label text-muted">Experimental</p>
        <p className="mt-1 text-muted">
          Quer treinar falando? A prática de fala usa o reconhecimento do seu
          navegador e não afeta o seu progresso.
        </p>
        <Link
          href="/fala"
          className="mt-2 inline-flex min-h-12 items-center font-semibold text-accent underline underline-offset-4"
        >
          Abrir a prática de fala
        </Link>
      </aside>
    </>
  );
}

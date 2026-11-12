"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import { vocabForLesson } from "@/content/vocabulary";
import { isSaved, saveMany } from "@/lib/vocabulary";
import { useVocabProgress } from "./useVocabProgress";

/**
 * Resumo do vocabulário que uma lição apresenta, com “salvar todas”. Reutilizável
 * por qualquer curso: basta a lição ter itens em `VOCAB_ENTRIES`. Nada é salvo
 * sem ação do aluno; sem itens, não renderiza.
 */
export function LessonVocabulary({ course, lesson }: { course: string; lesson: string }) {
  const entries = vocabForLesson(course, lesson);
  const { progress, update } = useVocabProgress();
  if (entries.length === 0 || !progress) return null;

  const unsaved = entries.filter((e) => !isSaved(progress, e.id));
  return (
    <Plate className="mt-5" label="Palavras desta lição" number={String(entries.length).padStart(2, "0")}>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {entries.map((e) => (
          <li key={e.id}>
            <span lang="ko" className="font-ko font-semibold">{e.ko}</span>{" "}
            <span className="text-sm text-muted">{e.pt}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {unsaved.length > 0 ? (
          <Button variant="secondary" onClick={() => update((p, n) => saveMany(p, unsaved.map((e) => e.id), n))}>
            {unsaved.length === 1 ? "Salvar 1 palavra para revisar" : `Salvar as ${unsaved.length} palavras para revisar`}
          </Button>
        ) : (
          <p role="status" className="text-sm text-muted">Todas as palavras desta lição estão salvas.</p>
        )}
        <Link href="/vocabulario" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
          Ver meu vocabulário
        </Link>
      </div>
    </Plate>
  );
}

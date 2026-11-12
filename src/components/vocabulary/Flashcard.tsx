"use client";

import { useEffect, useRef, useState } from "react";
import { AudioControl } from "@/components/hangul/exercise-media";
import { Button } from "@/components/ui/Button";
import type { VocabEntry, VocabSentence } from "@/content/vocabulary";
import type { VocabOutcome } from "@/lib/vocabulary";

/** Cartão simples: lembrar o significado, revelar, autoavaliar. */
export function Flashcard({
  entry,
  sentence,
  onGrade,
}: {
  entry: VocabEntry;
  sentence?: VocabSentence;
  onGrade: (outcome: Extract<VocabOutcome, "correct" | "again">) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const backRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (revealed) backRef.current?.focus();
  }, [revealed]);

  return (
    <section aria-label="Cartão de vocabulário" className="mt-4 rounded-[var(--radius-plate)] border border-line bg-surface p-5">
      <p className="mono-label text-muted">Qual é o significado?</p>
      <p lang="ko" className="font-ko mt-3 text-5xl font-bold">{entry.ko}</p>
      <AudioControl text={entry.audioText} label="Ouvir a palavra" compact />
      {!revealed ? (
        <Button className="mt-5 w-full sm:w-auto" onClick={() => setRevealed(true)}>
          Mostrar resposta
        </Button>
      ) : (
        <div className="mt-5 border-t border-line pt-4">
          <h2 ref={backRef} tabIndex={-1} className="text-2xl font-semibold outline-offset-4">
            {entry.pt}
          </h2>
          {sentence ? (
            <p className="mt-3">
              <span lang="ko" className="font-ko text-lg">{sentence.ko}</span>
              <br />
              <span className="text-muted">“{sentence.pt}”</span>
            </p>
          ) : null}
          <p className="mt-4 text-sm text-muted">Você lembrou sem ajuda? Você mesmo avalia — seja honesto, é isso que agenda a revisão.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button onClick={() => onGrade("correct")}>Lembrei</Button>
            <Button variant="secondary" onClick={() => onGrade("again")}>
              Não lembrei
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

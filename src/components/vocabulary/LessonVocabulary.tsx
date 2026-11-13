"use client";

import Link from "next/link";
import { AudioControl } from "@/components/hangul/exercise-media";
import { Button } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import { getVocab, vocabForLesson } from "@/content/vocabulary";
import { isSaved, removeVocab, saveMany, saveVocab } from "@/lib/vocabulary";
import { useVocabProgress } from "./useVocabProgress";

/**
 * Resumo do vocabulário que uma lição apresenta, com “salvar todas” e ação
 * individual por palavra. Reutilizável por qualquer curso: use `ids` para uma
 * lista explícita (inclusive itens reaproveitados de outro curso) ou deixe o
 * componente derivar os itens da lição. Nada é salvo sem ação do aluno; sem
 * itens, não renderiza.
 */
export function LessonVocabulary({
  course,
  lesson,
  ids,
  label = "Palavras desta lição",
  audio = false,
}: {
  course: string;
  lesson: string;
  /** IDs canônicos na ordem de apresentação; ausente = derivar da lição. */
  ids?: readonly string[];
  label?: string;
  /** Mostra o controle de voz do navegador por palavra (opt-in do curso). */
  audio?: boolean;
}) {
  const entries = ids
    ? ids
        .map((id) => getVocab(id))
        .filter((entry): entry is NonNullable<typeof entry> => entry !== undefined)
    : vocabForLesson(course, lesson);
  const { progress, update } = useVocabProgress();
  if (entries.length === 0 || !progress) return null;

  const unsaved = entries.filter((entry) => !isSaved(progress, entry.id));
  return (
    <Plate
      className="mt-5"
      label={label}
      number={String(entries.length).padStart(2, "0")}
    >
      <ul className="flex flex-col divide-y divide-line">
        {entries.map((entry) => {
          const saved = isSaved(progress, entry.id);
          return (
            <li
              key={entry.id}
              className="py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span lang="ko" className="font-ko text-lg font-semibold">
                    {entry.ko}
                  </span>{" "}
                  <span className="text-sm text-muted">{entry.pt}</span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {saved ? (
                    <span className="mono-label text-success">Salva</span>
                  ) : null}
                  <Button
                    variant="secondary"
                    size="sm"
                    aria-label={
                      saved
                        ? `Remover ${entry.ko} do meu vocabulário`
                        : `Salvar ${entry.ko} no meu vocabulário`
                    }
                    onClick={() =>
                      update((current, now) =>
                        saved
                          ? removeVocab(current, entry.id, now)
                          : saveVocab(current, entry.id, now),
                      )
                    }
                  >
                    {saved ? "Remover" : "Salvar"}
                  </Button>
                </div>
              </div>
              {audio ? (
                <AudioControl
                  text={entry.audioText}
                  compact
                  label="Ouvir a palavra"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {unsaved.length > 0 ? (
          <Button
            variant="secondary"
            onClick={() =>
              update((current, now) =>
                saveMany(
                  current,
                  unsaved.map((entry) => entry.id),
                  now,
                ),
              )
            }
          >
            {unsaved.length === 1
              ? "Salvar 1 palavra para revisar"
              : `Salvar as ${unsaved.length} palavras para revisar`}
          </Button>
        ) : (
          <p role="status" className="text-sm text-muted">
            Todas as palavras desta lição estão salvas.
          </p>
        )}
        <Link
          href="/vocabulario"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          Ver meu vocabulário
        </Link>
      </div>
      <p className="mt-3 text-xs text-muted">
        Salvar é opcional. As palavras salvas entram na revisão espaçada e não
        mudam o resultado da lição.
      </p>
    </Plate>
  );
}

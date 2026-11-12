import Link from "next/link";
import type { ReactNode } from "react";

export type PlayerTone = "lesson" | "checkpoint";

const TONE: Record<
  PlayerTone,
  { eyebrow: string; chip: string; rule: string }
> = {
  lesson: {
    eyebrow: "text-accent",
    chip: "border-line text-muted",
    rule: "bg-accent",
  },
  checkpoint: {
    eyebrow: "text-seal",
    chip: "border-seal text-seal",
    rule: "bg-seal",
  },
};

/**
 * Moldura editorial compartilhada por lição e checkpoint. O `tone` mantém a
 * avaliação visivelmente distinta (selo) sem duplicar o player. `compact`
 * reduz o título durante a prática para deixar a questão em primeiro plano.
 */
export function PlayerHeader({
  code,
  eyebrow,
  title,
  titleId,
  meta,
  tone = "lesson",
  compact = false,
  backHref = "/hangul",
  backLabel = "← Hangul",
}: {
  code: string;
  eyebrow: string;
  title: string;
  titleId: string;
  meta?: ReactNode;
  tone?: PlayerTone;
  compact?: boolean;
  backHref?: string;
  backLabel?: string;
}) {
  const palette = TONE[tone];

  return (
    <header>
      <div aria-hidden className={`h-0.5 w-10 rounded-full ${palette.rule}`} />
      <div className="mt-3 flex items-center justify-between gap-3 border-b border-line pb-3">
        <Link
          href={backHref}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          {backLabel}
        </Link>
        <span
          className={`mono-label rounded-[var(--radius-seal)] border px-2 py-1 ${palette.chip}`}
        >
          {code}
        </span>
      </div>
      <p className={`mono-label mt-5 ${palette.eyebrow}`}>{eyebrow}</p>
      <h1
        id={titleId}
        className={`mt-2 break-words font-bold tracking-tight ${
          compact ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </h1>
      {meta ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {meta}
        </div>
      ) : null}
    </header>
  );
}

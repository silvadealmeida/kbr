import type { DiagnosticBreakdown } from "@/lib/progress/diagnostics";

/** Lista determinística de pontos a revisar; não aparece quando não há erros. */
export function DiagnosticsList({
  categories,
  title = "O que revisar",
}: {
  categories: readonly DiagnosticBreakdown[];
  title?: string;
}) {
  const missed = categories.filter((category) => category.missed > 0);
  if (missed.length === 0) return null;

  return (
    <section aria-labelledby="diagnostics-title" className="mt-4 rounded-2xl border border-border bg-surface p-5">
      <h2 id="diagnostics-title" className="text-lg font-semibold">
        {title}
      </h2>
      <ul className="mt-3 flex flex-col gap-3">
        {missed.map((category) => (
          <li key={category.id} className="rounded-xl bg-soft/60 p-3">
            <p className="font-semibold">
              {category.label}: {category.missed} de {category.total} para revisar
            </p>
            <p className="mt-1 text-sm text-muted">{category.advice}</p>
            <p className="mt-1 text-xs text-muted">
              Lições relacionadas: {category.lessonIds.join(", ")}.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Plate } from "@/components/ui/Card";
import type { DiagnosticBreakdown } from "@/lib/progress/diagnostics";

/**
 * Lista determinística de pontos a revisar; não aparece quando não há erros.
 * Usa apenas os erros já resumidos pela sessão e não persiste diagnóstico por
 * item — o `Progress` v1 continua guardando somente lições, cartões e histórico.
 */
export function DiagnosticsList({
  categories,
  title = "O que revisar",
  linkLessons = false,
  id = "diagnostics",
}: {
  categories: readonly DiagnosticBreakdown[];
  title?: string;
  /** Quando verdadeiro, as lições relacionadas viram links para o curso. */
  linkLessons?: boolean;
  id?: string;
}) {
  const missed = categories.filter((category) => category.missed > 0);
  if (missed.length === 0) return null;

  return (
    <section aria-labelledby={`${id}-title`} className="mt-4">
      <Plate
        label="Diagnóstico desta tentativa"
        number={String(missed.length).padStart(2, "0")}
      >
        <h2 id={`${id}-title`} className="text-lg font-semibold">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Agrupado pelas categorias de erro registradas nesta sessão. O detalhe por
          item não é guardado pelo Progress v1.
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {missed.map((category) => (
            <li
              key={category.id}
              className="border-l-2 border-warning bg-warning-soft/40 py-1 pl-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{category.label}</p>
                <Badge tone="warning">
                  {category.missed} de {category.total} para revisar
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted">{category.advice}</p>
              <p className="mt-1 text-xs text-muted">
                Lições relacionadas:{" "}
                {linkLessons
                  ? category.lessonIds.map((lessonId, index) => (
                      <span key={lessonId}>
                        {index > 0 ? ", " : null}
                        <Link
                          href={`/hangul/${lessonId}`}
                          className="inline-flex min-h-11 items-center font-semibold text-accent underline-offset-4 hover:underline"
                        >
                          {lessonId}
                        </Link>
                      </span>
                    ))
                  : category.lessonIds.join(", ")}
                .
              </p>
            </li>
          ))}
        </ul>
      </Plate>
    </section>
  );
}

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Ruler } from "@/components/ui/Ruler";
import type { CourseJourneyStep } from "@/lib/progress/completion";
import { BilingualText } from "./exercise-media";

function statusLabel(step: CourseJourneyStep): string {
  if (step.done) return "Concluído";
  if (step.current) return "Agora";
  return step.unlocked ? "Disponível" : "Bloqueado";
}

function statusTone(step: CourseJourneyStep): "success" | "accent" | "neutral" {
  if (step.done) return "success";
  if (step.current || step.unlocked) return "accent";
  return "neutral";
}

/**
 * Jornada derivada do `Progress` v1 na ordem intercalada de lições e
 * checkpoints. O texto de cada estado (“Concluído”, “Agora”, “Disponível”,
 * “Bloqueado”) evita depender só de cor. Passos concluídos ou disponíveis são
 * links; passos bloqueados não fingem ser acionáveis.
 */
export function CourseJourney({
  journey,
  compact = false,
}: {
  journey: readonly CourseJourneyStep[];
  compact?: boolean;
}) {
  const done = journey.filter((step) => step.done).length;
  const lessons = journey.filter((step) => step.kind === "lesson").length;
  const checkpoints = journey.length - lessons;

  return (
    <section aria-labelledby="course-journey-title" className="mt-5 border-t border-line pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id="course-journey-title" className="text-lg font-semibold">
          Jornada do módulo
        </h3>
        <p className="mono-data text-muted">
          {done} de {journey.length} passos
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">
        {lessons} lições e {checkpoints} checkpoints na ordem em que aparecem no
        percurso. O status vem do seu progresso registrado.
      </p>
      <Ruler
        value={done}
        max={journey.length}
        label="Progresso na jornada do módulo Hangul"
        valueText={`${done} de ${journey.length} passos concluídos`}
        className="mt-4"
      />

      {compact ? null : (
        <ol
          aria-label={`Jornada completa: ${lessons} lições e ${checkpoints} checkpoints`}
          className="mt-4 grid gap-2 sm:grid-cols-2"
        >
          {journey.map((step) => {
            const status = statusLabel(step);
            const body = (
              <>
                <span className="flex min-w-0 flex-col">
                  <span className="mono-data text-muted">
                    {step.id} · {step.kind === "checkpoint" ? "checkpoint" : "lição"}
                  </span>
                  <span className="line-clamp-2 font-medium">
                    <BilingualText text={step.title} />
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <Badge tone={statusTone(step)}>{status}</Badge>
                  {step.score !== null ? (
                    <span className="mono-data text-muted">{step.score}%</span>
                  ) : null}
                </span>
              </>
            );
            const shell =
              "flex min-h-12 items-center justify-between gap-3 border px-3 py-2";

            return (
              <li key={step.id}>
                {step.done || step.unlocked ? (
                  <Link
                    href={`/hangul/${step.id}`}
                    aria-current={step.current ? "step" : undefined}
                    className={`${shell} ${
                      step.current
                        ? "border-l-4 border-accent bg-surface hover:bg-surface-2"
                        : "border-line bg-surface hover:bg-surface-2"
                    }`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div
                    aria-disabled="true"
                    className={`${shell} border-dashed border-line bg-bg text-muted`}
                  >
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

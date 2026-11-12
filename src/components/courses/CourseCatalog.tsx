"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ButtonLink } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  courseStepHref,
  getAvailableCourses,
  getPlannedCourses,
} from "@/content/courses";
import { courseLevelLabel, isCefrLevel } from "@/content/courses/types";
import { summarizeCourseProgress } from "@/lib/courses";
import type { Progress } from "@/lib/storage";

function StatusBadge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "brand";
}) {
  return (
    <span
      className={`shrink-0 rounded-[var(--radius-seal)] px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${
        tone === "brand" ? "bg-surface-2 text-accent" : "border border-line text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export function CourseCatalog() {
  const { progressStore, status } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!progressStore) return;
    let active = true;
    setLoadError(false);
    void progressStore
      .load()
      .then((loaded) => {
        if (active) setProgress(loaded);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, [progressStore]);

  const available = getAvailableCourses();
  const planned = getPlannedCourses();
  const loading =
    status === "loading" ||
    (progress === null && progressStore !== null && !loadError);

  return (
    <div className="flex flex-col gap-8">
      <section
        aria-labelledby="courses-levels-title"
        className="border-l-2 border-accent bg-surface-2 p-4 text-sm text-muted"
      >
        <h2 id="courses-levels-title" className="font-semibold text-fg">
          Cursos e níveis
        </h2>
        <p className="mt-2">
          O KBR organiza o estudo em cursos. O Hangul é um curso introdutório de{" "}
          <strong>Pré-A1</strong> e não corresponde a um nível oficial do CEFR. Os
          níveis A1–C2 aparecem apenas como planejamento editorial e ainda não têm
          lições, atividades ou avaliações.
        </p>
        <p className="mt-2">
          Concluir um curso no KBR não emite certificado CEFR, não comprova
          proficiência oficial e não libera o próximo nível automaticamente.
        </p>
      </section>

      <section aria-labelledby="courses-available-title">
        <div className="mb-3">
          <h2 id="courses-available-title" className="text-lg font-semibold">
            Disponíveis agora
          </h2>
          <p className="mt-1 text-sm text-muted">
            Só aparecem links para cursos e passos com conteúdo implementado.
          </p>
        </div>

        {loading ? (
          <p role="status" className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
            Carregando seu progresso…
          </p>
        ) : null}

        {loadError ? (
          <p role="alert" className="mb-4 rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
            Não foi possível carregar seu progresso agora. O catálogo continua
            disponível, mas os números abaixo podem estar incompletos.
          </p>
        ) : null}

        <ul className="flex flex-col gap-4">
          {available.map((course) => {
            const summary =
              progress && !loading ? summarizeCourseProgress(progress, course) : null;
            const nextHref =
              summary?.nextStep && !summary.complete
                ? courseStepHref(course, summary.nextStep.id)
                : null;
            const level = courseLevelLabel(course.level);

            return (
              <li key={course.id}>
                <Plate label="Índice de curso" number="01" className="border-accent">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                      {level} · Curso disponível
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">
                      {course.title}
                      {course.titleKo ? (
                        <span lang="ko" className="ml-2 font-ko text-lg text-muted">
                          {course.titleKo}
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-1 text-muted">{course.description}</p>
                  </div>
                  {summary?.complete ? (
                    <StatusBadge tone="brand">Curso concluído</StatusBadge>
                  ) : summary ? (
                    <StatusBadge tone="brand">{summary.percent}% concluído</StatusBadge>
                  ) : (
                    <StatusBadge tone="brand">Disponível</StatusBadge>
                  )}
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div className="border-l border-line pl-3">
                    <dt className="text-muted">Unidades</dt>
                    <dd className="mt-1 text-lg font-bold">{course.units.length}</dd>
                  </div>
                  <div className="border-l border-line pl-3">
                    <dt className="text-muted">Lições</dt>
                    <dd className="mt-1 text-lg font-bold">
                      {summary ? `${summary.completedLessons} de ${summary.totalLessons}` : course.steps.filter((step) => step.kind === "lesson").length}
                    </dd>
                  </div>
                  <div className="border-l border-line pl-3">
                    <dt className="text-muted">Checkpoints</dt>
                    <dd className="mt-1 text-lg font-bold">
                      {summary
                        ? `${summary.completedCheckpoints} de ${summary.totalCheckpoints}`
                        : course.steps.filter((step) => step.kind === "checkpoint").length}
                    </dd>
                  </div>
                  <div className="border-l border-line pl-3">
                    <dt className="text-muted">Passos</dt>
                    <dd className="mt-1 text-lg font-bold">
                      {summary ? `${summary.completedSteps} de ${summary.totalSteps}` : course.steps.length}
                    </dd>
                  </div>
                </dl>

                {summary ? (
                  <div className="mt-4">
                    <ProgressBar
                      value={summary.percent}
                      label={`Progresso no curso ${course.title}`}
                    />
                    <p className="mt-2 text-sm text-muted">
                      {summary.completedSteps} de {summary.totalSteps} passos concluídos.
                      {summary.lockedIncompleteSteps > 0
                        ? ` ${summary.lockedIncompleteSteps} passo(s) ainda bloqueado(s) por pré-requisito.`
                        : ""}
                    </p>
                  </div>
                ) : null}

                {summary?.complete ? (
                  <p className="mt-4 rounded-xl bg-soft p-3 text-sm">
                    Você concluiu o curso Hangul. Isso não é certificação CEFR e{" "}
                    <strong>não desbloqueia o A1</strong>; A1–C2 continuam planejados.
                  </p>
                ) : summary?.nextStep && nextHref ? (
                  <p className="mt-4 text-sm text-muted">
                    Próximo passo:{" "}
                    <strong className="text-fg">
                      {summary.nextStep.id} · {summary.nextStep.title}
                    </strong>
                  </p>
                ) : summary ? (
                  <p className="mt-4 text-sm text-muted">
                    Não há próximo passo desbloqueado agora. Abra o curso para ver os
                    pré-requisitos pendentes.
                  </p>
                ) : null}

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {course.basePath ? (
                    <ButtonLink href={course.basePath}>Abrir curso</ButtonLink>
                  ) : null}
                  {nextHref ? (
                    <ButtonLink href={nextHref} variant="ghost">
                      Continuar {summary?.nextStep?.id}
                    </ButtonLink>
                  ) : null}
                </div>

                <details className="mt-5 border-t border-line pt-4">
                  <summary className="min-h-11 cursor-pointer text-sm font-semibold text-brand">
                    Unidades e passos
                  </summary>
                  <ol className="mt-3 flex flex-col gap-2">
                    {course.units.map((unit) => {
                      const lessonCount = unit.stepIds.filter((stepId) =>
                        course.steps.some(
                          (step) => step.id === stepId && step.kind === "lesson",
                        ),
                      ).length;
                      const checkpointIds = unit.stepIds.filter((stepId) =>
                        course.steps.some(
                          (step) => step.id === stepId && step.kind === "checkpoint",
                        ),
                      );
                      return (
                        <li
                          key={unit.id}
                          className="rounded-xl border border-border px-3 py-2 text-sm"
                        >
                          <p className="font-medium">
                            Unidade {unit.number} · {unit.title}
                          </p>
                          <p className="mt-0.5 text-muted">
                            {lessonCount} lição(ões)
                            {checkpointIds.length > 0
                              ? ` · checkpoint ${checkpointIds.join(", ")}`
                              : ""}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </details>
                </Plate>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="courses-planned-title">
        <div className="mb-3">
          <h2 id="courses-planned-title" className="text-lg font-semibold">
            Em planejamento
          </h2>
          <p className="mt-1 text-sm text-muted">
            A1–C2 são referências de organização futura, não uma promessa de
            lançamento. Nenhum destes níveis tem lição ou link disponível.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {planned.map((course) => (
            <li
              key={course.id}
              className="flex flex-col border-t border-line py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="mono-label text-accent">
                  {isCefrLevel(course.level) ? `CEFR ${courseLevelLabel(course.level)}` : courseLevelLabel(course.level)}
                </span>
                <StatusBadge>Planejado · indisponível</StatusBadge>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{course.title}</h3>
              <p className="mt-1 text-sm text-muted">{course.description}</p>
              <p className="mt-3 text-xs text-muted">
                Sem lições, atividades, avaliações ou data prevista.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

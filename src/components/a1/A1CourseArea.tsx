"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, Plate } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { A1_COURSE, courseStepHref } from "@/content/courses";
import type { CourseClientView } from "@/content/courses/client";
import {
  isCourseStepDone,
  isCourseStepUnlocked,
  missingCourseEntryPrerequisites,
  summarizeCourseProgress,
} from "@/lib/courses";
import { buildA1CompletionReport, type A1VocabularyFacts } from "@/lib/a1/completion";
import type { Progress } from "@/lib/storage";
import { A1CompletionPanel } from "./A1CompletionPanel";

/**
 * Percurso completo do A1. O estado vem do `Progress` v1; nenhum passo futuro
 * ganha link antes de seus pré-requisitos. A conclusão só aparece com as 40
 * lições e os 8 checkpoints concluídos.
 */
export function A1CourseArea({
  vocabularyFacts,
  course = A1_COURSE,
  levelLabel = "A1",
}: {
  vocabularyFacts: A1VocabularyFacts;
  course?: CourseClientView;
  levelLabel?: string;
}) {
  const { progressStore, status, syncStatus } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!progressStore) return;
    let active = true;
    setLoading(true);
    setLoadError(false);
    void progressStore
      .load()
      .then((loaded) => {
        if (active) setProgress(loaded);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [progressStore, reloadKey]);

  if (status === "loading" || loading || (!progressStore && syncStatus === "syncing")) {
    return (
      <Card>
        <p role="status" className="text-muted">
          Preparando seu progresso…
        </p>
      </Card>
    );
  }

  if (loadError || !progress) {
    return (
      <Card>
        <p className="font-semibold">Não foi possível carregar seu progresso.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => setReloadKey((key) => key + 1)}
        >
          Tentar novamente
        </Button>
      </Card>
    );
  }

  const entryMissing = missingCourseEntryPrerequisites(progress, course);

  if (entryMissing.length > 0) {
    return (
      <Card className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">Curso bloqueado</h2>
          <p className="mt-1 text-muted">
            {course.title} abre depois de concluir o A1. Abrir o endereço direto
            não libera as lições; o app usa o mesmo `Progress` v1.
          </p>
        </div>
        <p className="text-sm text-muted">Requisitos pendentes: {entryMissing.join(", ")}.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/a1"
            className="inline-flex min-h-12 items-center font-semibold text-accent underline-offset-4 hover:underline"
          >
            Ver o percurso do A1
          </Link>
          <Link
            href="/cursos"
            className="inline-flex min-h-12 items-center font-semibold text-muted underline-offset-4 hover:underline"
          >
            Voltar aos cursos
          </Link>
        </div>
      </Card>
    );
  }

  const summary = summarizeCourseProgress(progress, course);
  const report = buildA1CompletionReport(progress, new Date(), course, vocabularyFacts);
  const currentStepId = summary.nextStep?.id ?? null;

  return (
    <div className="flex flex-col gap-6">
      {report.complete ? (
        <A1CompletionPanel
          report={report}
          levelLabel={levelLabel}
          coursePath={course.basePath ?? "/a1"}
        />
      ) : null}

      <Plate label="Situação do curso" number={`${summary.percent}%`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{course.title} · {summary.totalLessons} lições e {summary.totalCheckpoints} checkpoints</h2>
            <p className="mt-1 text-sm text-muted">
              Curso completo, com conteúdo original em revisão. A ordem abaixo é a
              ordem de desbloqueio; abrir um endereço direto não pula pré-requisitos.
            </p>
          </div>
          <Badge tone={report.complete ? "success" : "accent"}>
            {report.complete ? "Curso concluído" : "Em andamento"}
          </Badge>
        </div>
        <ProgressBar
          value={summary.percent}
          label={`Progresso no curso ${course.title}`}
          className="mt-4"
        />
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div className="border-l border-line pl-3">
            <dt className="text-muted">Lições</dt>
            <dd className="mt-1 font-semibold">
              {summary.completedLessons} de {summary.totalLessons}
            </dd>
          </div>
          <div className="border-l border-line pl-3">
            <dt className="text-muted">Checkpoints</dt>
            <dd className="mt-1 font-semibold">
              {summary.completedCheckpoints} de {summary.totalCheckpoints}
            </dd>
          </div>
          <div className="border-l border-line pl-3">
            <dt className="text-muted">Passos</dt>
            <dd className="mt-1 font-semibold">
              {summary.completedSteps} de {summary.totalSteps}
            </dd>
          </div>
          <div className="border-l border-line pl-3">
            <dt className="text-muted">Vocabulário</dt>
            <dd className="mt-1 font-semibold">
              {vocabularyFacts.introduced} novas · {vocabularyFacts.reused} retomadas
            </dd>
          </div>
        </dl>
        {currentStepId ? (
          <p className="mt-4 text-sm text-muted">
            Próximo passo:{" "}
            <strong className="text-fg">
              {currentStepId} ·{" "}
              {course.steps.find((step) => step.id === currentStepId)?.title}
            </strong>
          </p>
        ) : null}
      </Plate>

      <p className="border-l-2 border-accent bg-surface-2 p-4 text-sm text-muted">
        Conteúdo coreano original em revisão por falante nativo. A voz é a coreana do
        navegador, sob clique; não há MP3 novo nem microfone obrigatório. A conclusão
        do {levelLabel} é interna do KBR, não certifica CEFR ou TOPIK e não libera
        o próximo nível automaticamente.
      </p>

      {course.units.map((unit) => {
        const steps = course.steps.filter((step) => step.unitId === unit.id);
        return (
          <section
            key={unit.id}
            className="border-t border-line pt-5"
            aria-labelledby={`a1-unit-${unit.id}`}
          >
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
              <h2 id={`${course.slug}-unit-${unit.id}`} className="text-lg font-semibold">
                Módulo {unit.number} · {unit.title}
              </h2>
              <span className="mono-label text-muted">
                {steps.filter((step) => isCourseStepDone(progress, step)).length} de{" "}
                {steps.length} passos
              </span>
            </div>

            <ul className="flex flex-col gap-2">
              {steps.map((step) => {
                const record = progress.lessons[step.id];
                const unlocked = isCourseStepUnlocked(progress, step) || record?.done === true;
                const href = courseStepHref(course, step.id);
                const isCurrent = currentStepId === step.id;
                const body = (
                  <>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs font-semibold text-muted">
                        {step.id} · {step.estimatedMinutes} min ·{" "}
                        {step.kind === "checkpoint" ? "checkpoint" : "lição"}
                      </span>
                      <span
                        className={`line-clamp-2 font-medium ${
                          unlocked ? "text-fg" : "text-muted"
                        }`}
                      >
                        {step.title}
                      </span>
                    </span>
                    {record?.done ? (
                      <Badge tone="accent">Concluído · {record.score}%</Badge>
                    ) : isCurrent ? (
                      <Badge tone="accent">Agora</Badge>
                    ) : unlocked ? (
                      <Badge tone="accent">Disponível</Badge>
                    ) : (
                      <Badge>Bloqueado</Badge>
                    )}
                  </>
                );
                return (
                  <li key={step.id}>
                    {unlocked && href ? (
                      <Link
                        href={href}
                        aria-current={isCurrent ? "step" : undefined}
                        className={
                          isCurrent
                            ? "flex min-h-14 items-center justify-between gap-3 border border-l-4 border-accent bg-surface px-4 py-3 hover:bg-surface-2"
                            : "flex min-h-14 items-center justify-between gap-3 border border-line bg-surface px-4 py-3 hover:bg-surface-2"
                        }
                      >
                        {body}
                      </Link>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="flex min-h-14 items-center justify-between gap-3 border border-line px-4 py-3 opacity-80"
                      >
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <p className="text-sm text-muted">
        <Link
          href="/cursos"
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Voltar aos cursos
        </Link>
        . Para revisar palavras salvas, abra{" "}
        <Link
          href="/vocabulario/revisao"
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Vocabulário em revisão
        </Link>
        .
      </p>
    </div>
  );
}

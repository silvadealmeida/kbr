"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HANGUL_COURSE } from "@/content/courses";
import { COURSE_OUTLINE } from "@/content/hangul/outline";
import { CHECKPOINTS, getCheckpoint } from "@/content/hangul/checkpoints";
import { getLesson, LESSONS } from "@/content/hangul/lessons";
import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, Plate } from "@/components/ui/Card";
import { Ruler } from "@/components/ui/Ruler";
import { summarizeCourseProgress } from "@/lib/courses";
import { buildCourseCompletionReport } from "@/lib/progress/completion";
import {
  isCheckpointUnlocked,
  isCourseComplete,
  isLessonUnlocked,
} from "@/lib/progress/lesson";
import type { Progress } from "@/lib/storage";
import { CourseCompletionPanel } from "./CourseCompletionPanel";


export function HangulCourse() {
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

  const courseComplete = progress
    ? isCourseComplete(progress, LESSONS, CHECKPOINTS)
    : false;
  const completion =
    progress && courseComplete
      ? buildCourseCompletionReport(progress, {
          now: new Date(),
          lessons: LESSONS,
          checkpoints: CHECKPOINTS,
        })
      : null;

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

  const summary = summarizeCourseProgress(progress, HANGUL_COURSE);
  const currentStepId = summary.nextStep?.id ?? null;

  return (
    <div className="flex flex-col gap-6">
      <Plate label="Atlas de estudo" number={summary.completedSteps + " / " + summary.totalSteps}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono-label text-accent">Hangul · Pré-A1</p>
            <h2 className="mt-2 text-2xl font-semibold">25 lições, quatro checkpoints</h2>
          </div>
          <Badge tone="accent">
            {summary.complete ? "Percurso concluído" : currentStepId ? "Agora · " + currentStepId : "Sem passo disponível"}
          </Badge>
        </div>
        <Ruler
          value={summary.completedLessons}
          max={summary.totalLessons}
          label="Progresso nas 25 lições de Hangul"
          valueText={summary.completedLessons + " de " + summary.totalLessons + " lições concluídas"}
          className="mt-5"
        />
        <p className="mt-3 border-t border-line pt-3 text-sm text-muted">
          Checkpoints: <strong className="font-mono text-fg">{summary.completedCheckpoints} de {summary.totalCheckpoints}</strong> concluídos.
        </p>
      </Plate>

      <p className="border-l-2 border-accent bg-surface-2 p-4 text-sm text-muted">
        Conteúdo coreano em revisão por falante nativo. As lições h01–h25 e os
        checkpoints c1–c4 estão disponíveis.
      </p>

      {completion ? (
        <CourseCompletionPanel report={completion} />
      ) : null}

      {COURSE_OUTLINE.map((unit) => {
        const checkpoint = unit.checkpoint ? getCheckpoint(unit.checkpoint) : undefined;
        return (
          <section key={unit.unit} className="border-t border-line pt-5" aria-labelledby={`unit-${unit.unit}`}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h2 id={`unit-${unit.unit}`} className="text-lg font-semibold">
                Unidade {unit.unit} · {unit.title}
              </h2>
              {unit.checkpoint && !checkpoint ? (
                <Badge>Checkpoint {unit.checkpoint} em breve</Badge>
              ) : null}
            </div>

            <ul className="flex flex-col gap-2">
              {unit.lessons.map((outline) => {
                const lesson = getLesson(outline.id);
                if (!lesson) {
                  return (
                    <li
                      key={outline.id}
                      className="flex min-h-14 items-center justify-between gap-3 border border-dashed border-line px-4 py-3"
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs font-semibold text-muted">{outline.id}</span>
                        <span className="truncate text-muted">{outline.title}</span>
                      </span>
                      <Badge>Em breve</Badge>
                    </li>
                  );
                }

                const record = progress?.lessons[outline.id];
                const unlocked = progress
                  ? isLessonUnlocked(progress, lesson)
                  : lesson.prerequisites.length === 0;

                const body = (
                  <>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs font-semibold text-muted">
                        {outline.id} · {lesson.estimatedMinutes} min
                      </span>
                      <span className={`line-clamp-2 font-medium ${unlocked ? "text-fg" : "text-muted"}`}>
                        {outline.title}
                      </span>
                    </span>
                    {record?.done ? (
                      <Badge tone="accent">Concluída · {record.score}%</Badge>
                    ) : currentStepId === outline.id ? (
                      <Badge tone="accent">Agora</Badge>
                    ) : unlocked ? (
                      <Badge tone="accent">Disponível</Badge>
                    ) : (
                      <Badge>Após {lesson.prerequisites.join(", ")}</Badge>
                    )}
                  </>
                );

                return (
                  <li key={outline.id}>
                    {unlocked ? (
                      <Link
                        href={`/hangul/${outline.id}`}
                        aria-current={currentStepId === outline.id ? "step" : undefined}
                        className={currentStepId === outline.id
                          ? "flex min-h-14 items-center justify-between gap-3 border border-l-4 border-accent bg-surface px-4 py-3 hover:bg-surface-2"
                          : "flex min-h-14 items-center justify-between gap-3 border border-line bg-surface px-4 py-3 hover:bg-surface-2"}
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

              {checkpoint ? (
                <li>
                  {(() => {
                    const record = progress?.lessons[checkpoint.id];
                    const unlocked = progress
                      ? isCheckpointUnlocked(progress, checkpoint, CHECKPOINTS)
                      : false;
                    const body = (
                      <>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-xs font-semibold text-muted">
                            {checkpoint.id} · {checkpoint.estimatedMinutes} min · checkpoint
                          </span>
                          <span className={`line-clamp-2 font-medium ${unlocked ? "text-fg" : "text-muted"}`}>
                            {checkpoint.title}
                          </span>
                        </span>
                        {record?.done ? (
                          <Badge tone="accent">Concluído · {record.score}%</Badge>
                        ) : currentStepId === checkpoint.id ? (
                          <Badge tone="accent">Agora</Badge>
                        ) : unlocked ? (
                          <Badge tone="accent">Disponível</Badge>
                        ) : (
                          <Badge>
                            Após {checkpoint.lessonIds[0]}–{checkpoint.lessonIds[checkpoint.lessonIds.length - 1]}
                          </Badge>
                        )}
                      </>
                    );

                    return unlocked ? (
                      <Link
                        href={`/hangul/${checkpoint.id}`}
                        aria-current={currentStepId === checkpoint.id ? "step" : undefined}
                        className={currentStepId === checkpoint.id
                          ? "flex min-h-14 items-center justify-between gap-3 border-2 border-l-4 border-seal bg-surface px-4 py-3 hover:bg-surface-2"
                          : "flex min-h-14 items-center justify-between gap-3 border-2 border-line bg-surface px-4 py-3 hover:bg-surface-2"}
                      >
                        {body}
                      </Link>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="flex min-h-14 items-center justify-between gap-3 border border-dashed border-line px-4 py-3 opacity-80"
                      >
                        {body}
                      </div>
                    );
                  })()}
                </li>
              ) : null}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

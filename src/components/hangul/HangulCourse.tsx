"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COURSE_OUTLINE } from "@/content/hangul/outline";
import { CHECKPOINTS, getCheckpoint } from "@/content/hangul/checkpoints";
import { getLesson, LESSONS } from "@/content/hangul/lessons";
import { useAuth } from "@/components/auth/AuthProvider";
import { buildCourseCompletionReport } from "@/lib/progress/completion";
import {
  isCheckpointUnlocked,
  isCourseComplete,
  isLessonUnlocked,
} from "@/lib/progress/lesson";
import type { Progress } from "@/lib/storage";
import { CourseCompletionPanel } from "./CourseCompletionPanel";

function StatusBadge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "brand" }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
        tone === "brand" ? "bg-soft text-brand" : "border border-border text-muted"
      }`}
    >
      {children}
    </span>
  );
}

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
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p role="status" className="text-muted">
          Preparando seu progresso…
        </p>
      </div>
    );
  }

  if (loadError || !progress) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="font-semibold">Não foi possível carregar seu progresso.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <button
          type="button"
          onClick={() => setReloadKey((key) => key + 1)}
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
        Conteúdo coreano em revisão por falante nativo. As lições h01–h25 e os
        checkpoints c1–c4 estão disponíveis.
      </p>

      {completion ? (
        <CourseCompletionPanel report={completion} />
      ) : null}

      {COURSE_OUTLINE.map((unit) => {
        const checkpoint = unit.checkpoint ? getCheckpoint(unit.checkpoint) : undefined;
        return (
          <section key={unit.unit} aria-labelledby={`unit-${unit.unit}`}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h2 id={`unit-${unit.unit}`} className="text-lg font-semibold">
                Unidade {unit.unit} · {unit.title}
              </h2>
              {unit.checkpoint && !checkpoint ? (
                <StatusBadge>Checkpoint {unit.checkpoint} em breve</StatusBadge>
              ) : null}
            </div>

            <ul className="flex flex-col gap-2">
              {unit.lessons.map((outline) => {
                const lesson = getLesson(outline.id);
                if (!lesson) {
                  return (
                    <li
                      key={outline.id}
                      className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-dashed border-border px-4 py-3"
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs font-semibold text-muted">{outline.id}</span>
                        <span className="truncate text-muted">{outline.title}</span>
                      </span>
                      <StatusBadge>Em breve</StatusBadge>
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
                      <span className={`truncate font-medium ${unlocked ? "text-fg" : "text-muted"}`}>
                        {outline.title}
                      </span>
                    </span>
                    {record?.done ? (
                      <StatusBadge tone="brand">Concluída · {record.score}%</StatusBadge>
                    ) : unlocked ? (
                      <StatusBadge tone="brand">Disponível</StatusBadge>
                    ) : (
                      <StatusBadge>Após {lesson.prerequisites.join(", ")}</StatusBadge>
                    )}
                  </>
                );

                return (
                  <li key={outline.id}>
                    {unlocked ? (
                      <Link
                        href={`/hangul/${outline.id}`}
                        className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 hover:bg-soft"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 opacity-80"
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
                          <span className={`truncate font-medium ${unlocked ? "text-fg" : "text-muted"}`}>
                            {checkpoint.title}
                          </span>
                        </span>
                        {record?.done ? (
                          <StatusBadge tone="brand">Concluído · {record.score}%</StatusBadge>
                        ) : unlocked ? (
                          <StatusBadge tone="brand">Disponível</StatusBadge>
                        ) : (
                          <StatusBadge>
                            Após {checkpoint.lessonIds[0]}–{checkpoint.lessonIds[checkpoint.lessonIds.length - 1]}
                          </StatusBadge>
                        )}
                      </>
                    );

                    return unlocked ? (
                      <Link
                        href={`/hangul/${checkpoint.id}`}
                        className="flex min-h-14 items-center justify-between gap-3 rounded-xl border-2 border-brand/40 bg-surface px-4 py-3 hover:bg-soft"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-dashed border-border px-4 py-3 opacity-80"
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

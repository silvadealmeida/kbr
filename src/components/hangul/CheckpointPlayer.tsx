"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Checkpoint } from "@/content/hangul/types";
import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import { useAuth } from "@/components/auth/AuthProvider";
import { checkAnswer, type DetailedCheckResult, type ExerciseAnswer } from "@/lib/exercises";
import { buildCourseCompletionReport } from "@/lib/progress/completion";
import {
  checkpointPrerequisiteIds,
  checkpointRequiredCorrect,
  completeCheckpoint,
  evaluateCheckpoint,
  isCheckpointUnlocked,
  isCourseComplete,
  recordAttempt,
  type CheckpointResult,
} from "@/lib/progress/lesson";
import { scheduleMissedReview } from "@/lib/srs";
import type { Progress } from "@/lib/storage";
import { CourseCompletionPanel } from "./CourseCompletionPanel";
import { DiagnosticsList } from "./DiagnosticsList";
import { BilingualText, ExerciseView } from "./exercise-ui";
import { PlayerHeader } from "./player-header";
import { Plate } from "@/components/ui/Card";

export function CheckpointPlayer({
  checkpoint,
  nextStep,
}: {
  checkpoint: Checkpoint;
  nextStep: { id: string; title: string } | null;
}) {
  const { progressStore, status } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [phase, setPhase] = useState<"intro" | "run" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<ExerciseAnswer | null>(null);
  const [result, setResult] = useState<DetailedCheckResult | null>(null);
  const [answers, setAnswers] = useState<Record<string, { correct: boolean; scored?: boolean }>>({});
  const [checkpointResult, setCheckpointResult] = useState<CheckpointResult | null>(null);
  const [saveWarning, setSaveWarning] = useState(false);

  const progressRef = useRef<Progress | null>(null);
  const answersRef = useRef<Record<string, { correct: boolean; scored?: boolean }>>({});
  const resultRef = useRef<DetailedCheckResult | null>(null);
  const submittedRef = useRef<Set<string>>(new Set());
  const advancedForRef = useRef(-1);

  useEffect(() => {
    if (!progressStore) return;
    let active = true;
    setLoadingProgress(true);
    void progressStore.load().then((loaded) => {
      if (!active) return;
      progressRef.current = loaded;
      setProgress(loaded);
      setLoadingProgress(false);
    });
    return () => {
      active = false;
    };
  }, [progressStore]);

  const persist = useCallback(
    (next: Progress) => {
      progressRef.current = next;
      setProgress(next);
      if (!progressStore) {
        setSaveWarning(true);
        return;
      }
      void progressStore.save(next).then((ok) => {
        setSaveWarning(!ok);
      });
    },
    [progressStore],
  );

  const exercise = checkpoint.exercises[index];
  const total = checkpoint.exercises.length;
  const requiredCorrect = checkpointRequiredCorrect(checkpoint);

  const submit = () => {
    if (!exercise || !draft || resultRef.current || submittedRef.current.has(exercise.id)) {
      return;
    }
    submittedRef.current.add(exercise.id);
    const checked = checkAnswer(exercise, draft);
    resultRef.current = checked;
    setResult(checked);
    const nextAnswers = {
      ...answersRef.current,
      [exercise.id]: { correct: checked.correct, scored: checked.scored },
    };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);

    if (progressRef.current) {
      const now = new Date();
      let next = recordAttempt(progressRef.current, exercise.id, checked.correct, now, crypto.randomUUID());
      if (!checked.correct) next = scheduleMissedReview(next, exercise, now);
      persist(next);
    }
  };

  const advance = () => {
    if (!resultRef.current || advancedForRef.current === index) return;
    advancedForRef.current = index;
    if (index + 1 < total) {
      setIndex(index + 1);
      setDraft(null);
      setResult(null);
      resultRef.current = null;
      return;
    }

    if (progressRef.current) {
      const completed = completeCheckpoint(progressRef.current, checkpoint, answersRef.current, new Date());
      persist(completed.progress);
      setCheckpointResult(completed.result);
    } else {
      setCheckpointResult(evaluateCheckpoint(checkpoint, answersRef.current));
    }
    setPhase("done");
  };

  const restart = () => {
    answersRef.current = {};
    setAnswers({});
    setIndex(0);
    setDraft(null);
    setResult(null);
    resultRef.current = null;
    submittedRef.current = new Set();
    advancedForRef.current = -1;
    setCheckpointResult(null);
    setPhase("run");
  };

  if (status === "loading" || (loadingProgress && !progress)) {
    return (
      <Plate label="Checkpoint">
        <p role="status" className="text-muted">
          Preparando seu progresso…
        </p>
      </Plate>
    );
  }

  if (!progress) {
    return (
      <Plate label="Checkpoint">
        <p className="text-lg font-semibold">Não foi possível carregar seu progresso.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <Link
          href="/hangul"
          className="mt-4 inline-flex min-h-12 items-center font-semibold text-accent underline-offset-4 hover:underline"
        >
          Voltar para Hangul
        </Link>
      </Plate>
    );
  }

  const record = progress.lessons[checkpoint.id];
  const alreadyDone = record?.done === true;
  const isFinalCheckpoint = checkpoint.id === "c4";
  const courseComplete = isCourseComplete(progress, LESSONS, CHECKPOINTS);
  const completion =
    isFinalCheckpoint && courseComplete
      ? buildCourseCompletionReport(progress, {
          now: new Date(),
          lessons: LESSONS,
          checkpoints: CHECKPOINTS,
          finalCheckpoint: checkpoint,
          finalResult: checkpointResult ?? undefined,
        })
      : null;

  if (!alreadyDone && !isCheckpointUnlocked(progress, checkpoint, CHECKPOINTS)) {
    const missingLessons = checkpoint.lessonIds.filter(
      (id) => progress.lessons[id]?.done !== true,
    );
    const missingCheckpoints = checkpointPrerequisiteIds(CHECKPOINTS, checkpoint.id).filter(
      (id) => progress.lessons[id]?.done !== true,
    );
    return (
      <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint bloqueado"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={<span>Unidade {checkpoint.unit}</span>}
        />
        <Plate className="mt-5">
          <p className="text-muted">
            Conclua as lições do escopo e os checkpoints anteriores antes de fazer esta
            avaliação.
          </p>
          <p className="mt-2 text-sm text-muted">
            Pendentes: {[...missingCheckpoints, ...missingLessons].join(", ")}.
          </p>
          {missingCheckpoints.length > 0 ? (
            <p className="mt-1 text-sm text-muted">
              Checkpoints anteriores: {missingCheckpoints.join(", ")}.
            </p>
          ) : null}
          {missingLessons.length > 0 ? (
            <p className="mt-1 text-sm text-muted">
              Lições do escopo: {missingLessons.join(", ")}.
            </p>
          ) : null}
          <Link
            href="/hangul"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] bg-fg px-5 font-semibold text-bg"
          >
            Ver lições disponíveis
          </Link>
        </Plate>
      </article>
    );
  }

  const courseCompletionPage = completion ? (
    <article aria-labelledby="checkpoint-completion-title" className="pb-4">
      <Link href="/hangul" className="text-sm font-semibold text-brand">
        ← Hangul
      </Link>
      <p className="mt-4 text-sm font-semibold text-brand">Fim do checkpoint</p>
      <h1 id="checkpoint-completion-title" className="mt-1 text-3xl font-bold tracking-tight">
        Módulo Hangul concluído
      </h1>
      {saveWarning ? (
        <p role="status" className="mt-3 rounded-xl bg-soft p-3 text-sm">
          O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
          estar pendente. Isso não apaga o que você fez.
        </p>
      ) : null}
      <div className="mt-4">
        <CourseCompletionPanel report={completion} />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={restart}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
        >
          Refazer checkpoint
        </button>
        <Link
          href="/hangul"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
        >
          Voltar para Hangul
        </Link>
      </div>
    </article>
  ) : null;

  if (phase === "intro" && alreadyDone && courseCompletionPage) {
    return courseCompletionPage;
  }

  if (phase === "intro" && alreadyDone) {
    return (
      <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint concluído"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={<span>Unidade {checkpoint.unit}</span>}
        />
        <Plate className="mt-5" label="Resultado registrado">
          <p className="text-lg">
            Seu melhor resultado registrado é{" "}
            <strong className="font-mono tabular-nums">{record?.score ?? 0}%</strong>.
          </p>
          <p className="mt-2 text-muted">
            Você já concluiu este checkpoint. Pode seguir para a próxima etapa ou refazer
            a avaliação; o app mantém o maior score e não apaga o histórico.
          </p>
        </Plate>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {nextStep ? (
            <Link
              href={`/hangul/${nextStep.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Próximo: {nextStep.id} · {nextStep.title}
            </Link>
          ) : null}
          {courseComplete ? (
            <Link
              href="/hangul/c4"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Ver conclusão do curso
            </Link>
          ) : null}
          <button
            type="button"
            onClick={restart}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
          >
            Refazer checkpoint
          </button>
          <Link
            href="/hangul"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
          >
            Voltar para Hangul
          </Link>
        </div>
      </article>
    );
  }

  if (phase === "intro") {
    return (
      <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint / avaliação"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={
            <>
              <span>Unidade {checkpoint.unit}</span>
              <span aria-hidden>·</span>
              <span>{checkpoint.estimatedMinutes} min</span>
              <span aria-hidden>·</span>
              <span className="rounded-[var(--radius-seal)] bg-surface-2 px-2 py-0.5 text-accent">
                Conteúdo em revisão
              </span>
            </>
          }
        />
        <p className="mt-4 text-lg leading-relaxed text-muted">{checkpoint.objective}</p>

        <Plate className="mt-6">
          <h2 className="text-lg font-semibold">Como funciona</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted">
            {checkpoint.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
        </Plate>

        <Plate className="mt-4">
          <h2 className="text-lg font-semibold">Escopo</h2>
          <p className="mt-2 text-muted">
            Lições incluídas: {checkpoint.lessonIds.join(", ")}. A avaliação não introduz
            conteúdo novo.
          </p>
        </Plate>

        <Plate className="mt-6" label="Início da avaliação">
          <button
            type="button"
            onClick={() => setPhase("run")}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-field)] bg-fg px-6 font-semibold text-bg transition-colors duration-[var(--motion-fast)] hover:opacity-90 sm:w-auto"
          >
            Começar checkpoint
          </button>
          <p className="mt-3 text-sm text-muted">
            {total} itens. Aprovação com pelo menos {requiredCorrect} de {total}{" "}
            ({checkpoint.passingScore}% documentado).
          </p>
        </Plate>
      </article>
    );
  }

  if (phase === "done" && checkpointResult) {
    if (courseCompletionPage) return courseCompletionPage;

    const done = progress.lessons[checkpoint.id]?.done === true;
    const pendingCheckpoints = CHECKPOINTS.filter(
      (item) => progress.lessons[item.id]?.done !== true,
    ).map((item) => item.id);
    const incorrect = checkpointResult.total - checkpointResult.correct;
    const heading =
      done && isFinalCheckpoint
        ? "Checkpoint final concluído"
        : done
          ? "Checkpoint concluído"
          : "Quase lá";
    return (
      <article
        aria-labelledby="checkpoint-completion-title"
        className="mx-auto w-full max-w-[680px] pb-4"
      >
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Fim do checkpoint"
          title={heading}
          titleId="checkpoint-completion-title"
          meta={<span>{checkpoint.title}</span>}
        />
        <Plate className="mt-5" label="Resultado">
          <p className="text-lg">
            Você acertou{" "}
            <strong className="font-mono tabular-nums">
              {checkpointResult.correct} de {checkpointResult.total}
            </strong>{" "}
            ({checkpointResult.score}%).
          </p>
          <p className="mt-1 text-sm text-muted">
            {checkpointResult.correct} corretos · {incorrect} incorretos. Aprovação com pelo
            menos {requiredCorrect} de {total} ({checkpoint.passingScore}% documentado).
          </p>
          <p className="mt-2 text-muted">
            {done
              ? isFinalCheckpoint
                ? `Você concluiu o checkpoint final. Ainda faltam: ${pendingCheckpoints.join(", ")}. O módulo será marcado como concluído quando todas as lições e todos os checkpoints estiverem feitos.`
                : "Seu resultado foi registrado. O app guarda o maior score entre as tentativas."
              : `Refaça quando quiser: seu melhor resultado não é perdido.`}
          </p>
          {saveWarning ? (
            <p role="status" className="mt-3 rounded-[var(--radius-field)] bg-surface-2 p-3 text-sm">
              O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
              estar pendente. Isso não apaga o que você fez.
            </p>
          ) : null}
        </Plate>

        <DiagnosticsList
          categories={checkpointResult.diagnostics}
          title="O que revisar antes de seguir"
          linkLessons
        />

        <Plate className="mt-4" label="Revisão dos itens">
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {checkpoint.exercises.map((item) => {
              const answer = answers[item.id];
              return (
                <li key={item.id} className="flex items-start gap-2">
                  <span aria-hidden className={answer?.correct ? "text-success" : "text-danger"}>
                    {answer?.correct ? "✓" : "✗"}
                  </span>
                  <span>
                    <span className="sr-only">
                      {answer?.correct ? "Correto: " : "Incorreto: "}
                    </span>
                    <BilingualText text={item.prompt} />
                  </span>
                </li>
              );
            })}
          </ul>
        </Plate>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {done && nextStep ? (
            <Link
              href={`/hangul/${nextStep.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] bg-fg px-5 font-semibold text-bg"
            >
              Próximo: {nextStep.id} · {nextStep.title}
            </Link>
          ) : null}
          {incorrect > 0 ? (
            <Link
              href="/revisao"
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-5 font-semibold hover:bg-surface-2"
            >
              Revisar cartões
            </Link>
          ) : null}
          <button
            type="button"
            onClick={restart}
            className={`inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] px-5 font-semibold ${
              done
                ? "border border-line-strong hover:bg-surface-2"
                : "bg-fg text-bg"
            }`}
          >
            {done ? "Refazer mesmo assim" : "Refazer checkpoint"}
          </button>
          <Link
            href="/hangul"
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-5 font-semibold hover:bg-surface-2"
          >
            Voltar para Hangul
          </Link>
        </div>
      </article>
    );
  }

  if (!exercise) return null;

  return (
    <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
      <PlayerHeader
        tone="checkpoint"
        compact
        code={`checkpoint ${checkpoint.id}`}
        eyebrow="Checkpoint / avaliação"
        title={checkpoint.title}
        titleId="checkpoint-title"
        meta={
          <>
            <span className="rounded-[var(--radius-seal)] bg-surface-2 px-2 py-0.5 text-seal">
              Avaliação
            </span>
            <span aria-hidden>·</span>
            <span>Aprovação {requiredCorrect}/{total}</span>
          </>
        }
      />
      <ExerciseView
        key={exercise.id}
        exercise={exercise}
        index={index}
        total={total}
        draft={draft}
        result={result}
        onDraft={setDraft}
        onSubmit={submit}
        onContinue={advance}
        isLast={index + 1 === total}
        lastLabel="Concluir checkpoint"
      />
      {saveWarning ? (
        <p role="status" className="mt-4 rounded-xl bg-soft p-3 text-sm text-muted">
          Progresso local salvo; a sincronização com a conta pode estar pendente.
        </p>
      ) : null}
    </article>
  );
}

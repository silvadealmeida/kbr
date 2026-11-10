"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Checkpoint } from "@/content/hangul/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { checkAnswer, type DetailedCheckResult, type ExerciseAnswer } from "@/lib/exercises";
import {
  checkpointRequiredCorrect,
  completeCheckpoint,
  evaluateCheckpoint,
  isCheckpointUnlocked,
  recordAttempt,
  type CheckpointResult,
} from "@/lib/progress/lesson";
import { scheduleMissedReview } from "@/lib/srs";
import type { Progress } from "@/lib/storage";
import { DiagnosticsList } from "./DiagnosticsList";
import { BilingualText, ExerciseView } from "./exercise-ui";

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
        if (!ok) setSaveWarning(true);
      });
    },
    [progressStore],
  );

  const exercise = checkpoint.exercises[index];
  const total = checkpoint.exercises.length;
  const requiredCorrect = checkpointRequiredCorrect(checkpoint);

  const submit = () => {
    if (!exercise || !draft || result) return;
    const checked = checkAnswer(exercise, draft);
    setResult(checked);
    const nextAnswers = {
      ...answersRef.current,
      [exercise.id]: { correct: checked.correct, scored: checked.scored },
    };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);

    if (progressRef.current) {
      const now = new Date();
      let next = recordAttempt(progressRef.current, exercise.id, checked.correct, now);
      if (!checked.correct) next = scheduleMissedReview(next, exercise, now);
      persist(next);
    }
  };

  const advance = () => {
    if (!result) return;
    if (index + 1 < total) {
      setIndex(index + 1);
      setDraft(null);
      setResult(null);
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
    setCheckpointResult(null);
    setPhase("run");
  };

  if (status === "loading" || (loadingProgress && !progress)) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p role="status" className="text-muted">
          Preparando seu progresso…
        </p>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="font-semibold">Não foi possível carregar seu progresso.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <Link href="/hangul" className="mt-4 inline-flex min-h-12 items-center font-semibold text-brand">
          Voltar para Hangul
        </Link>
      </div>
    );
  }

  if (!isCheckpointUnlocked(progress, checkpoint)) {
    const pending = checkpoint.lessonIds.filter((id) => progress.lessons[id]?.done !== true);
    return (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="text-sm font-semibold text-brand">Checkpoint bloqueado</p>
        <h1 className="mt-1 text-2xl font-bold">{checkpoint.title}</h1>
        <p className="mt-2 text-muted">
          Conclua todas as lições do escopo antes de fazer esta avaliação.
        </p>
        <p className="mt-2 text-sm text-muted">Pendentes: {pending.join(", ")}.</p>
        <Link
          href="/hangul"
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
        >
          Ver lições disponíveis
        </Link>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <article aria-labelledby="checkpoint-title" className="pb-4">
        <Link href="/hangul" className="text-sm font-semibold text-brand">
          ← Hangul
        </Link>
        <p className="mt-4 text-sm font-semibold text-muted">
          Unidade {checkpoint.unit} · {checkpoint.estimatedMinutes} min ·{" "}
          <span className="rounded-full bg-soft px-2 py-0.5 text-brand">Conteúdo em revisão</span>
        </p>
        <h1 id="checkpoint-title" className="mt-1 text-3xl font-bold tracking-tight">
          {checkpoint.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{checkpoint.objective}</p>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold">Como funciona</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            {checkpoint.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold">Escopo</h2>
          <p className="mt-2 text-muted">
            Lições incluídas: {checkpoint.lessonIds.join(", ")}. A avaliação não introduz
            conteúdo novo.
          </p>
        </section>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setPhase("run")}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-6 font-semibold text-brand-fg sm:w-auto"
          >
            Começar checkpoint
          </button>
          <p className="mt-2 text-sm text-muted">
            {total} itens. Aprovação com pelo menos {requiredCorrect} de {total}{" "}
            ({checkpoint.passingScore}% documentado).
          </p>
        </div>
      </article>
    );
  }

  if (phase === "done" && checkpointResult) {
    const done = progress.lessons[checkpoint.id]?.done === true;
    return (
      <article aria-labelledby="checkpoint-completion-title" className="pb-4">
        <p className="text-sm font-semibold text-brand">Fim do checkpoint</p>
        <h1 id="checkpoint-completion-title" className="mt-1 text-3xl font-bold tracking-tight">
          {done ? "Checkpoint concluído" : "Quase lá"}
        </h1>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <p className="text-lg">
            Você acertou{" "}
            <strong>
              {checkpointResult.correct} de {checkpointResult.total}
            </strong>{" "}
            ({checkpointResult.score}%).
          </p>
          <p className="mt-2 text-muted">
            {done
              ? "Seu resultado foi registrado. O app guarda o maior score entre as tentativas."
              : `Este checkpoint pede ${requiredCorrect} de ${total} acertos (${checkpoint.passingScore}% documentado). Refaça quando quiser: seu melhor resultado não é perdido.`}
          </p>
          {saveWarning ? (
            <p role="status" className="mt-3 rounded-xl bg-soft p-3 text-sm">
              O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
              estar pendente. Isso não apaga o que você fez.
            </p>
          ) : null}
        </div>

        <DiagnosticsList categories={checkpointResult.diagnostics} title="O que revisar antes de seguir" />

        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
          {checkpoint.exercises.map((item) => {
            const answer = answers[item.id];
            return (
              <li key={item.id} className="flex items-start gap-2">
                <span aria-hidden>{answer?.correct ? "✓" : "✗"}</span>
                <span>
                  <span className="sr-only">{answer?.correct ? "Correto: " : "Incorreto: "}</span>
                  <BilingualText text={item.prompt} />
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {done && nextStep ? (
            <Link
              href={`/hangul/${nextStep.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Próximo: {nextStep.title}
            </Link>
          ) : null}
          <button
            type="button"
            onClick={restart}
            className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 font-semibold ${
              done
                ? "border border-border hover:bg-soft"
                : "bg-brand text-brand-fg"
            }`}
          >
            {done ? "Refazer mesmo assim" : "Refazer checkpoint"}
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

  if (!exercise) return null;

  return (
    <article aria-labelledby="exercise-prompt" className="pb-4">
      <div className="flex items-center justify-between gap-3">
        <Link href="/hangul" className="text-sm font-semibold text-brand">
          ← Hangul
        </Link>
        <span className="text-sm text-muted">Checkpoint {checkpoint.id}</span>
      </div>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">{checkpoint.title}</h1>
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

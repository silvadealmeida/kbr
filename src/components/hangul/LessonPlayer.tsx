"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lesson } from "@/content/hangul/types";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  checkAnswer,
  type DetailedCheckResult,
  type ExerciseAnswer,
} from "@/lib/exercises";
import {
  isLessonUnlocked,
  completeLesson,
  evaluateLesson,
  lessonRequiredCorrect,
  recordAttempt,
  type LessonResult,
} from "@/lib/progress/lesson";
import { scheduleMissedReview } from "@/lib/srs";
import { type Progress } from "@/lib/storage";
import { DiagnosticsList } from "./DiagnosticsList";
import { BilingualText, ExerciseView } from "./exercise-ui";

export function LessonPlayer({
  lesson,
  nextStep,
}: {
  lesson: Lesson;
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
  const [lessonResult, setLessonResult] = useState<LessonResult | null>(null);
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

  const exercise = lesson.exercises[index];
  const total = lesson.exercises.length;
  const requiredCorrect = lessonRequiredCorrect(lesson);

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
      let next = recordAttempt(progressRef.current, exercise.id, checked.correct, now, crypto.randomUUID());
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
      const completed = completeLesson(progressRef.current, lesson, answersRef.current, new Date());
      persist(completed.progress);
      setLessonResult(completed.result);
    } else {
      setLessonResult(evaluateLesson(lesson, answersRef.current));
    }
    setPhase("done");
  };

  const restart = () => {
    answersRef.current = {};
    setAnswers({});
    setIndex(0);
    setDraft(null);
    setResult(null);
    setLessonResult(null);
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

  const record = progress.lessons[lesson.id];
  const alreadyDone = record?.done === true;

  if (!alreadyDone && !isLessonUnlocked(progress, lesson)) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="text-sm font-semibold text-brand">Lição bloqueada</p>
        <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-2 text-muted">
          Conclua antes:{" "}
          <strong>{lesson.prerequisites.join(", ")}</strong>. As lições seguem a ordem do
          currículo para que você encontre apenas conteúdo já ensinado.
        </p>
        <Link
          href="/hangul"
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
        >
          Ver lições disponíveis
        </Link>
      </div>
    );
  }

  if (phase === "intro" && alreadyDone) {
    return (
      <article aria-labelledby="lesson-title" className="pb-4">
        <Link href="/hangul" className="text-sm font-semibold text-brand">
          ← Hangul
        </Link>
        <p className="mt-4 text-sm font-semibold text-brand">Lição concluída</p>
        <h1 id="lesson-title" className="mt-1 text-3xl font-bold tracking-tight">
          {lesson.title}
        </h1>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <p className="text-lg">
            Seu melhor resultado registrado é <strong>{record?.score ?? 0}%</strong>.
          </p>
          <p className="mt-2 text-muted">
            Você já concluiu esta lição. Pode seguir para a próxima etapa ou refazer a
            prática; o app mantém o maior score e não apaga o histórico.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {nextStep ? (
            <Link
              href={`/hangul/${nextStep.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Próximo: {nextStep.id} · {nextStep.title}
            </Link>
          ) : null}
          <button
            type="button"
            onClick={restart}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
          >
            Refazer lição
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
      <article aria-labelledby="lesson-title" className="pb-4">
        <Link href="/hangul" className="text-sm font-semibold text-brand">
          ← Hangul
        </Link>
        <p className="mt-4 text-sm font-semibold text-muted">
          Unidade {lesson.unit} · {lesson.estimatedMinutes} min ·{" "}
          <span className="rounded-full bg-soft px-2 py-0.5 text-brand">Conteúdo em revisão</span>
        </p>
        <h1 id="lesson-title" className="mt-1 text-3xl font-bold tracking-tight">
          {lesson.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{lesson.objective}</p>

        <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold">Objetivos</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            {lesson.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {lesson.intro.map((panel) => (
            <section key={panel.title} className="rounded-2xl border border-border bg-surface p-5">
              <h2 className="text-lg font-semibold">{panel.title}</h2>
              <p className="mt-2 text-muted">{panel.body}</p>
              {panel.ko ? (
                <p lang="ko" className="mt-3 font-ko text-3xl font-semibold tracking-wide text-brand">
                  {panel.ko}
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setPhase("run")}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-6 font-semibold text-brand-fg sm:w-auto"
          >
            Começar a prática
          </button>
          <p className="mt-2 text-sm text-muted">
            {total} itens. Para concluir, acerte pelo menos {requiredCorrect} de {total}{" "}
            ({lesson.completion.minScore}% documentado).
          </p>
          {lesson.completion.rules?.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {lesson.completion.rules.map((rule) => (
                <li key={rule.id}>{rule.label}.</li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    );
  }

  if (phase === "done" && lessonResult) {
    return (
      <article aria-labelledby="completion-title" className="pb-4">
        <p className="text-sm font-semibold text-brand">Fim da prática</p>
        <h1 id="completion-title" className="mt-1 text-3xl font-bold tracking-tight">
          {lessonResult.passed ? "Lição concluída" : "Quase lá"}
        </h1>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <p className="text-lg">
            Você acertou{" "}
            <strong>
              {lessonResult.correct} de {lessonResult.total}
            </strong>{" "}
            ({lessonResult.score}%).
          </p>
          <p className="mt-2 text-muted">
            {lessonResult.passed
              ? "Seu progresso foi registrado e a próxima etapa foi liberada."
              : "Esta lição pede " +
                `${requiredCorrect} de ${total} acertos (${lesson.completion.minScore}% documentado) e os critérios adicionais. ` +
                "Você pode refazer quando quiser; o app guarda o seu melhor resultado."}
          </p>
          {!lessonResult.requiredMet ? (
            <div className="mt-2 text-sm text-muted">
              {lessonResult.requiredExerciseIds.length > 0 ? (
                <p>Revise os itens obrigatórios: {lessonResult.requiredExerciseIds.join(", ")}.</p>
              ) : null}
              {lessonResult.rules.filter((rule) => !rule.met).length > 0 ? (
                <ul className="mt-1 list-disc pl-5">
                  {lessonResult.rules
                    .filter((rule) => !rule.met)
                    .map((rule) => (
                      <li key={rule.id}>
                        {rule.label} ({rule.correct}/{rule.minCorrect}).
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          ) : null}
          {saveWarning ? (
            <p role="status" className="mt-3 rounded-xl bg-soft p-3 text-sm">
              O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
              estar pendente. Isso não apaga o que você fez.
            </p>
          ) : null}
        </div>

        <DiagnosticsList categories={lessonResult.diagnostics} />

        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
          {lesson.exercises.map((item) => {
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
          {lessonResult.passed && nextStep ? (
            <Link
              href={`/hangul/${nextStep.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Próximo: {nextStep.id} · {nextStep.title}
            </Link>
          ) : null}
          {!lessonResult.passed ? (
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Refazer lição
            </button>
          ) : (
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
            >
              Refazer mesmo assim
            </button>
          )}
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
        <span className="text-sm text-muted">Lição {lesson.id}</span>
      </div>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">{lesson.title}</h1>
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
      />
      {saveWarning ? (
        <p role="status" className="mt-4 rounded-xl bg-soft p-3 text-sm text-muted">
          Progresso local salvo; a sincronização com a conta pode estar pendente.
        </p>
      ) : null}
    </article>
  );
}

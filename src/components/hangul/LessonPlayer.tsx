"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lesson } from "@/content/hangul/types";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  checkAnswer,
  type DetailedCheckResult,
  type ExerciseAnswer,
  type ExerciseSpec,
} from "@/lib/exercises";
import { composeSyllable, type Final, type Initial, type Medial } from "@/lib/hangul";
import {
  completeLesson,
  evaluateLesson,
  isLessonUnlocked,
  recordAttempt,
  type LessonResult,
} from "@/lib/progress/lesson";
import { createEmptyProgress, type Progress } from "@/lib/storage";

const HANGUL = /[\u3131-\u318E\uAC00-\uD7A3]/;

function BilingualText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, index) =>
        HANGUL.test(part) ? (
          <span key={index} lang="ko" className="font-ko">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function speakKorean(text: string): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}

function AudioControl({ text, fallback }: { text: string; fallback?: string }) {
  const [spoken, setSpoken] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const play = () => {
    const ok = speakKorean(text);
    setSpoken(ok);
    setUnavailable(!ok);
  };

  return (
    <div className="rounded-xl border border-border bg-soft/60 p-3">
      <button
        type="button"
        onClick={play}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 font-semibold text-fg hover:bg-soft"
      >
        <span aria-hidden>▶</span>
        Ouvir o áudio
      </button>
      {unavailable && (
        <p role="status" className="mt-2 text-sm text-muted">
          Este navegador não conseguiu reproduzir a voz coreana.
        </p>
      )}
      {spoken && (
        <p role="status" className="mt-2 text-sm text-muted">
          Áudio solicitado. Se não ouvir, confira o volume ou use a dica abaixo.
        </p>
      )}
      {fallback ? (
        <p className="mt-2 text-sm text-muted">
          <span className="font-semibold text-fg">Dica de som:</span> <BilingualText text={fallback} />
        </p>
      ) : null}
    </div>
  );
}

type AnswerAreaProps = {
  exercise: ExerciseSpec;
  result: DetailedCheckResult | null;
  disabled: boolean;
  onChange(answer: ExerciseAnswer | null): void;
};

function optionClass(active: boolean, state: "idle" | "correct" | "wrong") {
  if (state === "correct") return "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100";
  if (state === "wrong") return "border-red-600 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100";
  return active
    ? "border-brand bg-soft text-fg"
    : "border-border bg-surface text-fg hover:bg-soft";
}

function choiceState(
  result: DetailedCheckResult | null,
  isCorrectOption: boolean,
  isChosen: boolean,
): "idle" | "correct" | "wrong" {
  if (!result) return "idle";
  if (isCorrectOption) return "correct";
  if (isChosen) return "wrong";
  return "idle";
}

function AnswerArea({ exercise, result, disabled, onChange }: AnswerAreaProps) {
  const [optionId, setOptionId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [parts, setParts] = useState<{
    initial?: Initial;
    medial?: Medial;
    final?: string;
  }>({});

  if (exercise.type === "mcq") {
    return (
      <div role="group" aria-label="Alternativas" className="flex flex-col gap-3">
        {exercise.options.map((option) => {
          const chosen = optionId === option;
          const state = choiceState(result, option === exercise.correctAnswer, chosen);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={chosen}
              disabled={disabled}
              onClick={() => {
                setOptionId(option);
                onChange({ kind: "text", value: option });
              }}
              className={`min-h-14 rounded-xl border-2 px-4 py-3 text-left text-base font-medium ${optionClass(chosen, state)}`}
            >
              <span aria-hidden className="mr-2 font-mono text-sm text-muted">
                {state === "correct" ? "✓" : state === "wrong" ? "✗" : "○"}
              </span>
              <BilingualText text={option} />
            </button>
          );
        })}
      </div>
    );
  }

  if (
    exercise.type === "audio-to-char" ||
    exercise.type === "char-to-audio" ||
    exercise.type === "minimal-pair" ||
    (exercise.type === "reading" && exercise.mode === "mcq")
  ) {
    const options =
      exercise.type === "audio-to-char"
        ? exercise.options.map((option) => ({ id: option.id, label: option.jamo }))
        : exercise.type === "char-to-audio"
          ? exercise.options.map((option) => ({ id: option.id, label: option.label }))
          : exercise.type === "minimal-pair"
            ? exercise.options.map((option) => ({ id: option.id, label: option.label }))
            : (exercise.options ?? []);

    return (
      <div role="group" aria-label="Alternativas" className="flex flex-col gap-3">
        {options.map((option) => {
          const chosen = optionId === option.id;
          const state = choiceState(result, option.id === exercise.correctOptionId, chosen);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={chosen}
              disabled={disabled}
              onClick={() => {
                setOptionId(option.id);
                onChange({ kind: "choice", optionId: option.id });
              }}
              className={`min-h-14 rounded-xl border-2 px-4 py-3 text-left text-base font-medium ${optionClass(chosen, state)}`}
            >
              <span aria-hidden className="mr-2 font-mono text-sm text-muted">
                {state === "correct" ? "✓" : state === "wrong" ? "✗" : "○"}
              </span>
              <BilingualText text={option.label} />
            </button>
          );
        })}
      </div>
    );
  }

  if (exercise.type === "reading" && exercise.mode === "self-check") {
    return (
      <button
        type="button"
        aria-pressed={optionId === "done"}
        disabled={disabled}
        onClick={() => {
          setOptionId("done");
          onChange({ kind: "self-check", confidence: "medium" });
        }}
        className={`min-h-14 rounded-xl border-2 px-4 py-3 text-left font-medium ${optionClass(optionId === "done", "idle")}`}
      >
        Já li em voz alta (prática, não conta nota)
      </button>
    );
  }

  if (exercise.type === "build-syllable") {
    const initials = exercise.initialOptions ?? [exercise.initial];
    const medials = exercise.medialOptions ?? [exercise.medial];
    const finals = exercise.finalOptions ?? [];
    const complete = Boolean(parts.initial && parts.medial && (finals.length === 0 || parts.final === exercise.final));
    const preview =
      parts.initial && parts.medial && complete
        ? composeSyllable(parts.initial, parts.medial, (parts.final ?? "") as Final)
        : null;

    return (
      <div className="flex flex-col gap-4">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-muted">Consoante inicial</legend>
          <div className="flex flex-wrap gap-2">
            {initials.map((initial) => (
              <button
                key={initial}
                type="button"
                aria-pressed={parts.initial === initial}
                disabled={disabled}
                onClick={() => {
                  const next = { ...parts, initial };
                  setParts(next);
                  onChange(
                    next.initial && next.medial && (finals.length === 0 || next.final === exercise.final)
                      ? {
                          kind: "syllable",
                          initial: next.initial,
                          medial: next.medial,
                          final: (next.final ?? "") as Final,
                        }
                      : null,
                  );
                }}
                className={`min-h-14 min-w-14 rounded-xl border-2 px-4 font-ko text-xl ${optionClass(parts.initial === initial, "idle")}`}
                lang="ko"
              >
                {initial}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-muted">Vogal</legend>
          <div className="flex flex-wrap gap-2">
            {medials.map((medial) => (
              <button
                key={medial}
                type="button"
                aria-pressed={parts.medial === medial}
                disabled={disabled}
                onClick={() => {
                  const next = { ...parts, medial };
                  setParts(next);
                  onChange(
                    next.initial && next.medial && (finals.length === 0 || next.final === exercise.final)
                      ? {
                          kind: "syllable",
                          initial: next.initial,
                          medial: next.medial,
                          final: (next.final ?? "") as Final,
                        }
                      : null,
                  );
                }}
                className={`min-h-14 min-w-14 rounded-xl border-2 px-4 font-ko text-xl ${optionClass(parts.medial === medial, "idle")}`}
                lang="ko"
              >
                {medial}
              </button>
            ))}
          </div>
        </fieldset>

        {finals.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-muted">Consoante final</legend>
            <div className="flex flex-wrap gap-2">
              {finals.map((final) => (
                <button
                  key={final || "none"}
                  type="button"
                  aria-pressed={parts.final === final}
                  disabled={disabled}
                  onClick={() => {
                    const next = { ...parts, final };
                    setParts(next);
                    onChange(
                      next.initial && next.medial
                        ? {
                            kind: "syllable",
                            initial: next.initial,
                            medial: next.medial,
                            final: (next.final ?? "") as Final,
                          }
                        : null,
                    );
                  }}
                  className={`min-h-14 min-w-14 rounded-xl border-2 px-4 font-ko text-xl ${optionClass(parts.final === final, "idle")}`}
                  lang="ko"
                >
                  {final || "—"}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <p aria-live="polite" className="text-muted">
          Sua sílaba:{" "}
          <span lang="ko" className="font-ko text-2xl font-semibold text-fg">
            {preview ?? "—"}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="resposta" className="mb-2 block text-sm font-semibold text-muted">
        Sua resposta
      </label>
      <input
        id="resposta"
        type="text"
        value={text}
        disabled={disabled}
        onChange={(event) => {
          setText(event.target.value);
          onChange(event.target.value.trim() ? { kind: "text", value: event.target.value } : null);
        }}
        className="min-h-14 w-full rounded-xl border-2 border-border bg-surface px-4 text-base"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
}

function ExerciseView({
  exercise,
  index,
  total,
  draft,
  result,
  onDraft,
  onSubmit,
  onContinue,
  isLast,
}: {
  exercise: ExerciseSpec;
  index: number;
  total: number;
  draft: ExerciseAnswer | null;
  result: DetailedCheckResult | null;
  onDraft(answer: ExerciseAnswer | null): void;
  onSubmit(): void;
  onContinue(): void;
  isLast: boolean;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (result) continueRef.current?.focus();
  }, [result]);

  return (
    <section aria-labelledby="exercise-prompt" className="mt-6">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Item {index + 1} de {total}
        </span>
        <span>{Math.round((index / total) * 100)}% da prática</span>
      </div>
      <div
        role="progressbar"
        aria-label="Progresso da prática"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index}
        className="mt-2 h-2 overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      <h2 id="exercise-prompt" ref={headingRef} className="mt-6 text-xl font-semibold leading-snug">
        <BilingualText text={exercise.prompt} />
      </h2>

      {exercise.type === "audio-to-char" ? (
        <div className="mt-4">
          <AudioControl text={exercise.audioText} fallback={exercise.fallback} />
        </div>
      ) : null}
      {exercise.type === "minimal-pair" && exercise.presentation === "audio" ? (
        <div className="mt-4">
          <AudioControl text={exercise.audioText ?? ""} fallback={exercise.fallback} />
        </div>
      ) : null}
      {exercise.type === "char-to-audio" ? (
        <p lang="ko" className="mt-4 font-ko text-4xl font-semibold tracking-wide">
          {exercise.text}
        </p>
      ) : null}
      {exercise.type === "reading" ? (
        <div className="mt-4 rounded-xl border border-border bg-soft/60 p-4">
          <p lang="ko" className="font-ko text-4xl font-semibold tracking-wide">
            {exercise.text}
          </p>
          {exercise.audioText ? (
            <div className="mt-3">
              <AudioControl text={exercise.audioText} />
            </div>
          ) : null}
          {exercise.question ? (
            <p className="mt-3 font-medium">
              <BilingualText text={exercise.question} />
            </p>
          ) : null}
        </div>
      ) : null}
      {exercise.type === "minimal-pair" && exercise.presentation === "text" ? (
        <p className="mt-4 font-medium">
          <BilingualText text={exercise.text ?? ""} />
        </p>
      ) : null}

      <div className="mt-5">
        <AnswerArea exercise={exercise} result={result} disabled={result !== null} onChange={onDraft} />
      </div>

      {result ? (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-xl border-2 p-4 ${
            result.correct
              ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
              : "border-red-600 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100"
          }`}
        >
          <p className="font-semibold">{result.correct ? "Correto." : "Ainda não."}</p>
          {!result.correct && (
            <p className="mt-1">
              Resposta correta:{" "}
              <strong>
                <BilingualText text={result.expected} />
              </strong>
            </p>
          )}
          {result.explanation ? (
            <p className="mt-1 text-sm">
              <BilingualText text={result.explanation} />
            </p>
          ) : null}
          {result.errorTags?.includes("answer-kind") ? (
            <p className="mt-1 text-sm">Tente responder com o tipo de alternativa pedido.</p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">
          Responda para ver o resultado. A primeira tentativa é a que conta.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {result ? (
          <button
            ref={continueRef}
            type="button"
            onClick={onContinue}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 font-semibold text-brand-fg"
          >
            {isLast ? "Concluir lição" : "Continuar"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!draft}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 font-semibold text-brand-fg disabled:cursor-not-allowed disabled:opacity-50"
          >
            Conferir
          </button>
        )}
      </div>
    </section>
  );
}

export function LessonPlayer({
  lesson,
  nextLesson,
}: {
  lesson: Lesson;
  nextLesson: { id: string; title: string } | null;
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
      persist(recordAttempt(progressRef.current, exercise.id, checked.correct, new Date()));
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

  if (!isLessonUnlocked(progress, lesson)) {
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
            {total} itens. Para concluir, acerte pelo menos {lesson.completion.minScore}%.
          </p>
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
              ? "Seu progresso foi registrado e a próxima lição foi liberada."
              : `Esta lição pede ${lesson.completion.minScore}% e os itens obrigatórios corretos. Você pode refazer quando quiser; o app guarda o seu melhor resultado.`}
          </p>
          {!lessonResult.requiredMet ? (
            <p className="mt-2 text-sm text-muted">
              Revise os itens obrigatórios: {lessonResult.requiredExerciseIds.join(", ")}.
            </p>
          ) : null}
          {saveWarning ? (
            <p role="status" className="mt-3 rounded-xl bg-soft p-3 text-sm">
              O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
              estar pendente. Isso não apaga o que você fez.
            </p>
          ) : null}
        </div>

        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
          {lesson.exercises.map((item) => {
            const answer = answers[item.id];
            return (
              <li key={item.id} className="flex items-start gap-2">
                <span aria-hidden>{answer?.correct ? "✓" : "✗"}</span>
                <span>
                  <span className="sr-only">{answer?.correct ? "Correto: " : "Incorreto: "}</span>
                  {item.prompt}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {lessonResult.passed && nextLesson ? (
            <Link
              href={`/hangul/${nextLesson.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Próxima: {nextLesson.title}
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

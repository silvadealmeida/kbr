"use client";

import { useEffect, useRef, useState } from "react";
import type { DetailedCheckResult, ExerciseAnswer, ExerciseSpec } from "@/lib/exercises";
import { composeSyllable, type Final, type Initial, type Medial } from "@/lib/hangul";

const HANGUL = /[\u3131-\u318E\uAC00-\uD7A3]/;

export function BilingualText({ text }: { text: string }) {
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

export function speakKorean(text: string): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}

export function AudioControl({ text, fallback }: { text: string; fallback?: string }) {
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
        {exercise.selfCheckLabel ?? "Já li em voz alta (prática, não conta nota)"}
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

export function ExerciseView({
  exercise,
  index,
  total,
  draft,
  result,
  onDraft,
  onSubmit,
  onContinue,
  isLast,
  lastLabel = "Concluir lição",
  footer,
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
  lastLabel?: string;
  footer?: React.ReactNode;
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

      {footer ? <div className="mt-4">{footer}</div> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {result ? (
          <button
            ref={continueRef}
            type="button"
            onClick={onContinue}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 font-semibold text-brand-fg"
          >
            {isLast ? lastLabel : "Continuar"}
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

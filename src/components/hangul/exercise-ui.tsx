"use client";

import { useEffect, useRef, useState } from "react";
import type { DetailedCheckResult, ExerciseAnswer, ExerciseSpec } from "@/lib/exercises";
import { composeSyllable } from "@/lib/hangul";
import { RULES } from "@/content/hangul/rules";
import { SyllableBuilder } from "./SyllableBuilder";
import { PronunciationLayers } from "./PronunciationLayers";
import { AudioControl, BilingualText } from "./exercise-media";
import { useShuffledOrder } from "./use-shuffled-order";

export { AudioControl, BilingualText } from "./exercise-media";

type AnswerAreaProps = {
  exercise: ExerciseSpec;
  result: DetailedCheckResult | null;
  disabled: boolean;
  onChange(answer: ExerciseAnswer | null): void;
  onSubmit(): void;
};

const KIND_LABEL: Record<ExerciseSpec["type"], string> = {
  mcq: "Escolha",
  cloze: "Complete",
  "build-syllable": "Composição",
  listen: "Escuta",
  translate: "Tradução",
  "audio-to-char": "Escuta",
  "char-to-audio": "Escolha",
  "minimal-pair": "Contraste",
  reading: "Leitura",
};

function optionClass(active: boolean, state: "idle" | "correct" | "wrong") {
  if (state === "correct") return "border-success bg-success-soft text-fg";
  if (state === "wrong") return "border-danger bg-danger-soft text-fg";
  return active
    ? "border-accent bg-surface-2 text-fg"
    : "border-line-strong bg-surface text-fg hover:bg-surface-2";
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

function ChoiceList({
  options,
  selected,
  correctId,
  result,
  disabled,
  onSelect,
}: {
  options: readonly { id: string; label: string }[];
  selected: string | null;
  correctId: string;
  result: DetailedCheckResult | null;
  disabled: boolean;
  onSelect(id: string): void;
}) {
  // Alternativas curtas (jamo, sílabas, palavras) cabem em duas colunas; frases
  // longas ficam em uma coluna para preservar a leitura.
  const compact = options.every((option) => option.label.length <= 14);
  // A ordem é sorteada uma vez por tentativa; IDs e rótulos não mudam.
  const orderedOptions = useShuffledOrder(
    options,
    options.map((option) => option.id).join("\u001f"),
  );

  return (
    <div
      role="group"
      aria-label="Alternativas"
      className={`grid gap-2 ${compact ? "sm:grid-cols-2" : ""}`}
    >
      {orderedOptions.map((option) => {
        const chosen = selected === option.id;
        const state = choiceState(result, option.id === correctId, chosen);
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={chosen}
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`flex min-h-14 items-start gap-3 rounded-[var(--radius-field)] border-2 px-4 py-3 text-left text-base font-medium transition-[background-color,border-color,color] duration-[var(--motion-fast)] disabled:cursor-default ${optionClass(chosen, state)}`}
          >
            <span
              aria-hidden
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border font-mono text-[11px] ${
                state === "correct"
                  ? "border-success text-success"
                  : state === "wrong"
                    ? "border-danger text-danger"
                    : "border-line-strong text-muted"
              }`}
            >
              {state === "correct" ? "✓" : state === "wrong" ? "✗" : "○"}
            </span>
            <span className="min-w-0 break-words">
              <BilingualText text={option.label} />
            </span>
            {result && option.id === correctId ? (
              <span className="sr-only"> Resposta correta.</span>
            ) : null}
            {result && chosen && option.id !== correctId ? (
              <span className="sr-only"> Sua resposta, incorreta.</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function TextAnswer({
  disabled,
  onChange,
  onSubmit,
}: Pick<AnswerAreaProps, "disabled" | "onChange" | "onSubmit">) {
  const [text, setText] = useState("");

  return (
    <div>
      <label htmlFor="resposta" className="mb-2 block text-sm font-semibold text-fg">
        Sua resposta
      </label>
      <input
        id="resposta"
        type="text"
        value={text}
        disabled={disabled}
        aria-describedby="resposta-ajuda"
        onChange={(event) => {
          setText(event.target.value);
          onChange(
            event.target.value.trim()
              ? { kind: "text", value: event.target.value }
              : null,
          );
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !disabled && text.trim()) {
            event.preventDefault();
            onSubmit();
          }
        }}
        className="min-h-14 w-full rounded-[var(--radius-field)] border-2 border-line-strong bg-surface px-4 text-base text-fg placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-60"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        enterKeyHint="done"
        spellCheck={false}
      />
      <p id="resposta-ajuda" className="mt-2 text-xs text-muted">
        Digite e toque em Conferir, ou pressione Enter.
      </p>
    </div>
  );
}

function AnswerArea({ exercise, result, disabled, onChange, onSubmit }: AnswerAreaProps) {
  const [optionId, setOptionId] = useState<string | null>(null);

  if (exercise.type === "mcq") {
    return (
      <ChoiceList
        options={exercise.options.map((value) => ({ id: value, label: value }))}
        selected={optionId}
        correctId={exercise.correctAnswer}
        result={result}
        disabled={disabled}
        onSelect={(value) => {
          setOptionId(value);
          onChange({ kind: "text", value });
        }}
      />
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
        : exercise.options ?? [];
    return (
      <ChoiceList
        options={options}
        selected={optionId}
        correctId={exercise.correctOptionId ?? ""}
        result={result}
        disabled={disabled}
        onSelect={(value) => {
          setOptionId(value);
          onChange({ kind: "choice", optionId: value });
        }}
      />
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
        className={`min-h-14 rounded-[var(--radius-field)] border-2 px-4 py-3 text-left font-medium transition-colors duration-[var(--motion-fast)] disabled:cursor-default ${optionClass(optionId === "done", "idle")}`}
      >
        {exercise.selfCheckLabel ?? "Já li em voz alta (prática, não conta nota)"}
      </button>
    );
  }

  if (exercise.type === "build-syllable") {
    return (
      <SyllableBuilder
        exercise={exercise}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }

  return <TextAnswer disabled={disabled} onChange={onChange} onSubmit={onSubmit} />;
}

function answerLabel(
  exercise: ExerciseSpec,
  answer: ExerciseAnswer | null,
): string | null {
  if (!answer) return null;
  if (answer.kind === "text") return answer.value;
  if (answer.kind === "syllable") {
    return composeSyllable(answer.initial, answer.medial, answer.final);
  }
  if (answer.kind === "self-check") return null;
  if (exercise.type === "audio-to-char") {
    return exercise.options.find((option) => option.id === answer.optionId)?.jamo ?? null;
  }
  if (exercise.type === "char-to-audio" || exercise.type === "minimal-pair") {
    return exercise.options.find((option) => option.id === answer.optionId)?.label ?? null;
  }
  if (exercise.type === "reading") {
    return exercise.options?.find((option) => option.id === answer.optionId)?.label ?? null;
  }
  return null;
}

function FeedbackPanel({
  exercise,
  draft,
  result,
  resultRef,
}: {
  exercise: ExerciseSpec;
  draft: ExerciseAnswer | null;
  result: DetailedCheckResult;
  resultRef: React.RefObject<HTMLDivElement | null>;
}) {
  const given = answerLabel(exercise, draft);
  const showGiven = !result.correct && given !== null && given !== result.expected;

  return (
    <div
      ref={resultRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`feedback-enter mt-6 scroll-mb-[calc(8rem+env(safe-area-inset-bottom))] rounded-[var(--radius-panel)] border-l-4 p-5 outline-none ${
        result.correct
          ? "border-success bg-success-soft text-fg"
          : "border-danger bg-danger-soft text-fg"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={`mt-0.5 grid size-10 shrink-0 -rotate-3 place-items-center rounded-[var(--radius-seal)] border-2 bg-surface font-mono text-lg font-bold ${
            result.correct ? "border-success text-success" : "border-danger text-danger"
          }`}
        >
          {result.correct ? "✓" : "×"}
        </span>
        <div className="min-w-0">
          <p className="mono-label text-muted">Resultado</p>
          <p className="text-lg font-semibold leading-tight">
            {result.correct ? "Correto." : "Ainda não."}
          </p>
          {showGiven ? (
            <p className="mt-2 text-sm">
              Sua resposta:{" "}
              <strong className="font-semibold">
                <BilingualText text={given} />
              </strong>
            </p>
          ) : null}
          {!result.correct ? (
            <p className="mt-1 text-sm">
              Resposta correta:{" "}
              <strong className="font-semibold">
                <BilingualText text={result.expected} />
              </strong>
            </p>
          ) : null}
          {result.explanation ? (
            <p className="mt-2 text-sm leading-relaxed">
              <BilingualText text={result.explanation} />
            </p>
          ) : null}
          {result.scored === false ? (
            <p className="mt-2 text-xs text-muted">
              Item de prática: não entra na nota.
            </p>
          ) : null}
          {result.errorTags?.includes("answer-kind") ? (
            <p className="mt-1 text-sm">
              Tente responder com o tipo de alternativa pedido.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AudioPrompt({
  text,
  src,
  fallback,
}: {
  text: string;
  src?: string;
  fallback?: string;
}) {
  return (
    <div className="mt-4">
      <AudioControl text={text} src={src} fallback={fallback} />
    </div>
  );
}

function ReadingPrompt({
  exercise,
}: {
  exercise: Extract<ExerciseSpec, { type: "reading" }>;
}) {
  return (
    <div className="mt-4 rounded-[var(--radius-panel)] border border-line bg-surface-2 p-4 sm:p-6">
      <p className="mono-label text-muted">Texto para ler</p>
      <p lang="ko" className="mt-2 break-words font-ko text-4xl font-semibold tracking-wide sm:text-5xl">
        {exercise.text}
      </p>
      {exercise.audioText ? (
        <div className="mt-3">
          <AudioControl text={exercise.audioText} src={exercise.audioSrc} />
        </div>
      ) : null}
      {exercise.question ? (
        <p className="mt-4 border-t border-line pt-3 font-medium">
          <BilingualText text={exercise.question} />
        </p>
      ) : null}
    </div>
  );
}

function ruleLayers(exercise: ExerciseSpec) {
  if (!exercise.tags?.some((tag) => tag.startsWith("rule:"))) return [];

  // O exemplo pode estar no enunciado, no texto de leitura, na dica de áudio,
  // no alvo de composição ou nas alternativas. Reunimos tudo sem alterar o
  // exercício; a regra só aparece quando há um exemplo real do conteúdo.
  const source: string[] = [exercise.prompt, exercise.explanation ?? ""];
  if ("text" in exercise && typeof exercise.text === "string") source.push(exercise.text);
  if ("audioText" in exercise && typeof exercise.audioText === "string") {
    source.push(exercise.audioText);
  }
  if ("target" in exercise && typeof exercise.target === "string") {
    source.push(exercise.target);
  }
  if ("options" in exercise && Array.isArray(exercise.options)) {
    for (const option of exercise.options) {
      if ("jamo" in option && typeof option.jamo === "string") source.push(option.jamo);
      if ("label" in option && typeof option.label === "string") source.push(option.label);
      if ("audioText" in option && typeof option.audioText === "string") {
        source.push(option.audioText);
      }
    }
  }

  const haystack = source.join(" ");
  return RULES.filter((rule) => exercise.tags?.includes(rule.id)).flatMap((rule) => {
    const example = rule.examples.find((item) => haystack.includes(item.written));
    return example ? [{ rule, example }] : [];
  });
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
  submitLabel = "Conferir",
  progressLabel = "prática",
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
  /** Rótulo da ação que revela o feedback; revisão usa “Mostrar resposta”. */
  submitLabel?: string;
  /** Nome da atividade no progresso (lições/checkpoints usam "prática"). */
  progressLabel?: string;
  footer?: React.ReactNode;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const completed = Math.round((index / total) * 100);
  const layers = result && !result.correct ? ruleLayers(exercise) : [];

  // Cada item é uma nova tarefa: leve o foco (e a rolagem) ao enunciado para
  // leitores de tela e para quem responde no celular.
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ block: "start" });
  }, []);

  // O resultado precisa ser lido antes de a pessoa avançar. Focar o próprio
  // resultado (em vez do botão “Continuar”) evita que o leitor de tela anuncie
  // apenas o botão e pule o feedback.
  useEffect(() => {
    if (!result) return;
    const element = resultRef.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    element.scrollIntoView({ block: "nearest" });
  }, [result]);

  return (
    <section aria-labelledby="exercise-prompt" className="mt-6">
      <div className="flex items-end justify-between gap-3">
        <p className="mono-label text-muted">
          Item <span className="text-fg">{index + 1}</span> de {total}
        </p>
        <p className="mono-data text-muted">{completed}% concluído</p>
      </div>
      <div
        role="progressbar"
        aria-label={`Progresso da ${progressLabel}`}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index}
        aria-valuetext={`${index} de ${total} concluídos`}
        className="mt-2 h-1.5 overflow-hidden bg-line"
      >
        <div
          className="h-full bg-accent transition-[width] duration-[var(--motion-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      <div className="mt-6 border-l-2 border-accent pl-4 sm:pl-5">
        <p className="mono-label text-muted">
          {KIND_LABEL[exercise.type]} · responda uma vez
        </p>
        <h2
          id="exercise-prompt"
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 scroll-mt-4 break-words text-2xl font-semibold leading-snug outline-none sm:text-3xl"
        >
          <BilingualText text={exercise.prompt} />
        </h2>
      </div>

      {exercise.type === "audio-to-char" ? (
        <AudioPrompt
          text={exercise.audioText}
          src={exercise.audioSrc}
          fallback={exercise.fallback}
        />
      ) : null}
      {exercise.type === "listen" ? (
        <AudioPrompt text={exercise.audioText} src={exercise.audioSrc} />
      ) : null}
      {exercise.type === "minimal-pair" && exercise.presentation === "audio" ? (
        <AudioPrompt
          text={exercise.audioText ?? ""}
          src={exercise.audioSrc}
          fallback={exercise.fallback}
        />
      ) : null}
      {exercise.type === "char-to-audio" ? (
        <div className="mt-4 rounded-[var(--radius-panel)] border border-line bg-surface-2 p-4 text-center sm:p-6">
          <p className="mono-label text-muted">Leia a sílaba</p>
          <p lang="ko" className="mt-2 font-ko text-5xl font-semibold tracking-wide">
            {exercise.text}
          </p>
        </div>
      ) : null}
      {exercise.type === "reading" ? <ReadingPrompt exercise={exercise} /> : null}
      {exercise.type === "minimal-pair" && exercise.presentation === "text" ? (
        <p className="mt-4 rounded-[var(--radius-panel)] border border-line bg-surface-2 p-4 font-medium">
          <BilingualText text={exercise.text ?? ""} />
        </p>
      ) : null}

      <div className="mt-6">
        <AnswerArea
          exercise={exercise}
          result={result}
          disabled={result !== null}
          onChange={onDraft}
          onSubmit={onSubmit}
        />
      </div>

      {result ? (
        <FeedbackPanel
          exercise={exercise}
          draft={draft}
          result={result}
          resultRef={resultRef}
        />
      ) : (
        <p className="mt-4 text-sm text-muted">
          Responda para ver o resultado. A primeira tentativa é a que conta.
        </p>
      )}

      {layers.length > 0 ? (
        <div className="mt-4 space-y-3">
          {layers.map(({ rule, example }) => (
            <PronunciationLayers
              key={rule.id}
              rule={rule}
              example={example}
            />
          ))}
        </div>
      ) : null}

      {footer ? <div className="mt-4">{footer}</div> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {result ? (
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-field)] bg-fg px-6 font-semibold text-bg transition-colors duration-[var(--motion-fast)] hover:opacity-90"
          >
            {isLast ? lastLabel : "Continuar"}
            <span aria-hidden>→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!draft}
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] bg-fg px-6 font-semibold text-bg transition-colors duration-[var(--motion-fast)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {submitLabel}
          </button>
        )}
      </div>
    </section>
  );
}

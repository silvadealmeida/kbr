"use client";

import { useId, useState } from "react";
import type { BuildSyllableExercise, ExerciseAnswer } from "@/lib/exercises";
import { composeSyllable, type Final, type Initial, type Medial } from "@/lib/hangul";
import { medialShape } from "@/lib/hangul/layout";
import { AudioControl } from "./exercise-media";
import { useShuffledOrder } from "./use-shuffled-order";

type Parts = { initial?: Initial; medial?: Medial; final?: Final };

function positionNote(medial: Medial) {
  const shape = medialShape(medial);
  if (shape.kind === "horizontal") {
    return (
      <>
        <span lang="ko" className="font-ko">{medial}</span> é uma vogal horizontal:
        fica abaixo da consoante inicial.
      </>
    );
  }
  if (shape.kind === "compound") {
    return (
      <>
        <span lang="ko" className="font-ko">{medial}</span> é composta:{" "}
        <span lang="ko" className="font-ko">{shape.base}</span> ocupa a base e{" "}
        <span lang="ko" className="font-ko">{shape.side}</span> fica à direita.
      </>
    );
  }
  return (
    <>
      <span lang="ko" className="font-ko">{medial}</span> é uma vogal vertical:
      fica à direita da consoante inicial.
    </>
  );
}

function Zone({
  label,
  value,
  emptyLabel = "—",
  className = "",
  large = true,
}: {
  label: string;
  value?: string;
  emptyLabel?: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`flex min-h-0 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-seal)] border border-dashed border-line-strong bg-bg p-1 ${className}`}
    >
      <span aria-hidden className="mono-label text-[9px] leading-none text-muted">
        {label}
      </span>
      {value ? (
        <span
          lang="ko"
          className={`font-ko font-semibold text-fg ${large ? "text-3xl min-[380px]:text-4xl" : "text-2xl"}`}
        >
          {value}
        </span>
      ) : (
        <span aria-hidden className="text-xs leading-tight text-muted">
          {emptyLabel}
        </span>
      )}
    </div>
  );
}

export function SyllableBuilder({
  exercise,
  disabled,
  onChange,
}: {
  exercise: BuildSyllableExercise;
  disabled: boolean;
  onChange(answer: ExerciseAnswer | null): void;
}) {
  const [parts, setParts] = useState<Parts>({});
  const titleId = useId();
  const helpId = useId();
  const initials =
    exercise.initialOptions?.length ? exercise.initialOptions : [exercise.initial];
  const medials =
    exercise.medialOptions?.length ? exercise.medialOptions : [exercise.medial];
  const finals = exercise.finalOptions?.length
    ? exercise.finalOptions
    : exercise.final
      ? [exercise.final]
      : [];
  // Cada grupo recebe uma ordem nova por tentativa. A correção compara os
  // valores escolhidos, não a posição do botão.
  const orderedInitials = useShuffledOrder(
    initials,
    `initial\u001f${initials.join("\u001f")}`,
  );
  const orderedMedials = useShuffledOrder(
    medials,
    `medial\u001f${medials.join("\u001f")}`,
  );
  const orderedFinals = useShuffledOrder(
    finals,
    `final\u001f${finals.join("\u001f")}`,
  );
  const hasFinal = finals.length > 0;
  const ready = Boolean(
    parts.initial && parts.medial && (!hasFinal || parts.final !== undefined),
  );
  const syllable = ready
    ? composeSyllable(parts.initial!, parts.medial!, parts.final ?? "")
    : null;
  // A prévia C+V aparece antes da escolha do final: o bloco não fica “vazio”
  // enquanto o aluno ainda está decidindo o batchim.
  const cvSyllable =
    parts.initial && parts.medial
      ? composeSyllable(parts.initial, parts.medial, "")
      : null;
  const shape = parts.medial ? medialShape(parts.medial) : null;

  function select(next: Parts) {
    setParts(next);
    const complete = Boolean(
      next.initial && next.medial && (!hasFinal || next.final !== undefined),
    );
    onChange(
      complete
        ? {
            kind: "syllable",
            initial: next.initial!,
            medial: next.medial!,
            final: next.final ?? "",
          }
        : null,
    );
  }

  function clear() {
    setParts({});
    onChange(null);
  }

  const touched =
    parts.initial !== undefined || parts.medial !== undefined || parts.final !== undefined;

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={helpId}
      className="rounded-[var(--radius-panel)] border border-line bg-surface p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 id={titleId} className="mono-label text-accent">
          Bancada de composição
        </h3>
        <p className="mono-data text-muted">inicial + medial + final</p>
      </div>
      <p id={helpId} className="mt-2 text-sm text-muted">
        Escolha inicial e medial; quando o item pedir, escolha também o final. Use Tab e
        Enter no teclado ou toque nos botões; a prévia não envia a resposta.
      </p>

      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-7">
        <div className="w-40 shrink-0 min-[380px]:w-44 sm:w-48">
          <div
            aria-hidden
            className={`relative grid aspect-square grid-rows-[minmax(0,3fr)_minmax(0,1.35fr)] gap-1 rounded-[var(--radius-panel)] border-2 bg-bg p-2 ${
              ready ? "border-accent" : "border-line-strong"
            }`}
          >
            <div
              className={`grid min-h-0 gap-1 ${
                shape?.kind === "horizontal"
                  ? "grid-rows-2"
                  : shape?.kind === "compound"
                    ? "grid-cols-2 grid-rows-2"
                    : "grid-cols-2"
              }`}
            >
              <Zone label="inicial" value={parts.initial} />
              {shape?.kind === "compound" ? (
                <>
                  <Zone label="medial" value={shape.base} large={false} />
                  <Zone
                    label="lado"
                    value={shape.side}
                    large={false}
                    className="col-start-2 row-span-2 row-start-1"
                  />
                </>
              ) : (
                <Zone label="vogal" value={parts.medial} />
              )}
            </div>
            <Zone
              label={hasFinal ? "final" : "final opcional"}
              value={parts.final === "" ? undefined : parts.final}
              emptyLabel={hasFinal ? "—" : "sem final"}
              className={hasFinal ? "" : "opacity-80"}
            />
          </div>

          <div aria-live="polite" className="mt-3 text-center text-sm text-muted">
            {ready ? (
              <>
                Sua sílaba:{" "}
                <strong lang="ko" className="font-ko text-3xl text-fg">
                  {syllable}
                </strong>
              </>
            ) : cvSyllable ? (
              <>
                Prévia C+V:{" "}
                <strong lang="ko" className="font-ko text-3xl text-fg">
                  {cvSyllable}
                </strong>
                <span className="block text-xs">Escolha o final para completar.</span>
              </>
            ) : (
              <>
                Sua sílaba:{" "}
                <strong lang="ko" className="font-ko text-2xl text-fg">
                  —
                </strong>
              </>
            )}
          </div>
          <p className="mt-1 text-center text-xs text-muted">
            {parts.initial || parts.medial || parts.final !== undefined ? (
              <>
                Inicial <span lang="ko" className="font-ko">{parts.initial ?? "—"}</span>
                {" · "}Vogal <span lang="ko" className="font-ko">{parts.medial ?? "—"}</span>
                {" · "}Final{" "}
                <span lang="ko" className="font-ko">
                  {!hasFinal
                    ? "sem final"
                    : parts.final === undefined
                      ? "—"
                      : parts.final || "sem final"}
                </span>
              </>
            ) : (
              "A decomposição aparece aqui."
            )}
          </p>
          {syllable ? (
            <AudioControl
              text={syllable}
              compact
              label="Ouvir a sílaba montada"
            />
          ) : null}
        </div>

        <div className="w-full min-w-0 max-w-md space-y-4">
          <PieceGroup
            title="Consoante inicial"
            values={orderedInitials}
            selected={parts.initial}
            disabled={disabled}
            onSelect={(value) => select({ ...parts, initial: value as Initial })}
          />
          <PieceGroup
            title="Vogal"
            values={orderedMedials}
            selected={parts.medial}
            disabled={disabled}
            onSelect={(value) => select({ ...parts, medial: value as Medial })}
          />
          {hasFinal ? (
            <PieceGroup
              title="Consoante final"
              values={orderedFinals}
              selected={parts.final}
              disabled={disabled}
              onSelect={(value) => select({ ...parts, final: value as Final })}
            />
          ) : null}

          <p aria-live="polite" className="text-sm text-muted">
            {parts.medial
              ? positionNote(parts.medial)
              : "Vogal vertical fica à direita; horizontal fica abaixo; composta ocupa a base e a direita."}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-muted">
              A composição é uma prévia; a correção acontece ao conferir.
            </p>
            <button
              type="button"
              onClick={clear}
              disabled={disabled || !touched}
              className="min-h-11 rounded-[var(--radius-field)] px-3 text-sm font-semibold text-accent underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-45"
            >
              Limpar escolhas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PieceGroup({
  title,
  values,
  selected,
  disabled,
  onSelect,
}: {
  title: string;
  values: readonly string[];
  selected?: string;
  disabled: boolean;
  onSelect(value: string): void;
}) {
  return (
    <fieldset>
      <legend className="mono-label mb-2 text-muted">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const active = selected === value;
          return (
            <button
              key={value || "none"}
              type="button"
              lang={value ? "ko" : undefined}
              aria-label={value ? undefined : "sem consoante final"}
              aria-pressed={active}
              disabled={disabled}
              onClick={() => onSelect(value)}
              className={`min-h-12 min-w-12 rounded-[var(--radius-field)] border-2 px-3 font-ko text-xl transition-[background-color,border-color,color] duration-[var(--motion-fast)] disabled:cursor-not-allowed disabled:opacity-55 ${
                active
                  ? "border-accent bg-surface-2 text-fg"
                  : "border-line-strong bg-surface text-fg hover:bg-surface-2"
              }`}
            >
              {value || "—"}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

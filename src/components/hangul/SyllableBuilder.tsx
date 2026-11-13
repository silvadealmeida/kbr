"use client";

import { useId, useRef, useState } from "react";
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
  const [draggingOver, setDraggingOver] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
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

  function dropPiece(kind: string, value: string) {
    if (disabled) return;
    if (kind === "initial" && initials.includes(value as Initial)) {
      select({ ...parts, initial: value as Initial });
    } else if (kind === "medial" && medials.includes(value as Medial)) {
      select({ ...parts, medial: value as Medial });
    } else if (kind === "final" && finals.includes(value as Final)) {
      select({ ...parts, final: value as Final });
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDraggingOver(false);
    const [kind, value] = event.dataTransfer.getData("text/plain").split("\u001f");
    if (kind && value !== undefined) dropPiece(kind, value);
  }

  const touched =
    parts.initial !== undefined || parts.medial !== undefined || parts.final !== undefined;

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={helpId}
      className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface"
    >
      <div className="border-b border-line bg-surface-2/70 px-3.5 py-2.5 sm:px-6 sm:py-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 id={titleId} className="mono-label text-accent">
            Bancada de composição
          </h3>
          <p className="mono-data text-muted">inicial + medial + final</p>
        </div>
        <p id={helpId} className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
          Escolha inicial e medial; quando o item pedir, escolha também o final.
          Arraste uma peça até a caixa ou use Tab/Enter e toque nos botões. A prévia
          não envia a resposta.
        </p>
      </div>

      <div className="grid gap-3.5 p-3.5 sm:gap-6 sm:p-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-start">
        <div className="mx-auto flex w-full max-w-[13rem] flex-col items-center sm:max-w-[16rem] lg:mx-0 lg:max-w-[15rem]">
          <div
            ref={dropRef}
            data-testid="syllable-drop-zone"
            onDragEnter={(event) => {
              event.preventDefault();
              setDraggingOver(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "copy";
              setDraggingOver(true);
            }}
            onDragLeave={(event) => {
              if (!dropRef.current?.contains(event.relatedTarget as Node | null)) {
                setDraggingOver(false);
              }
            }}
            onDrop={handleDrop}
            className={`w-full rounded-[var(--radius-panel)] transition-[box-shadow,border-color] duration-[var(--motion-fast)] ${
              draggingOver ? "ring-4 ring-accent/25" : ""
            }`}
          >
            <div
              aria-hidden
              className={`relative grid aspect-[3/2] grid-rows-[minmax(0,2.6fr)_minmax(0,1.25fr)] gap-1 rounded-[var(--radius-panel)] border-2 bg-bg p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] sm:aspect-square sm:grid-rows-[minmax(0,3fr)_minmax(0,1.35fr)] sm:p-2.5 ${
                ready
                  ? "border-accent"
                  : draggingOver
                    ? "border-accent border-dashed"
                    : "border-line-strong"
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
          </div>

          <div
            aria-live="polite"
            className="mt-2 w-full rounded-[var(--radius-field)] border border-line bg-bg px-3 py-1.5 text-center text-sm text-muted sm:mt-3 sm:py-2"
          >
            {ready ? (
              <>
                Sua sílaba:{" "}
                <strong lang="ko" className="font-ko text-2xl text-fg sm:text-3xl">
                  {syllable}
                </strong>
              </>
            ) : cvSyllable ? (
              <>
                Prévia C+V:{" "}
                <strong lang="ko" className="font-ko text-2xl text-fg sm:text-3xl">
                  {cvSyllable}
                </strong>
                <span className="block text-xs">Escolha o final para completar.</span>
              </>
            ) : (
              <>
                Sua sílaba:{" "}
                <strong lang="ko" className="font-ko text-xl text-fg sm:text-2xl">
                  —
                </strong>
              </>
            )}
          </div>
          <p className="mt-1.5 text-center text-xs leading-relaxed text-muted sm:mt-2">
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
            <div className="w-full">
              <AudioControl text={syllable} compact label="Ouvir" />
            </div>
          ) : null}
        </div>

        <div className="min-w-0 space-y-4">
          <div className="space-y-5 rounded-[var(--radius-panel)] border border-line bg-bg p-3 sm:p-4">
            <PieceGroup
              kind="initial"
              title="Consoante inicial"
              values={orderedInitials}
              selected={parts.initial}
              disabled={disabled}
              onSelect={(value) => select({ ...parts, initial: value as Initial })}
              onDropPiece={dropPiece}
            />
            <PieceGroup
              kind="medial"
              title="Vogal"
              values={orderedMedials}
              selected={parts.medial}
              disabled={disabled}
              onSelect={(value) => select({ ...parts, medial: value as Medial })}
              onDropPiece={dropPiece}
            />
            {hasFinal ? (
              <PieceGroup
                kind="final"
                title="Consoante final"
                values={orderedFinals}
                selected={parts.final}
                disabled={disabled}
                onSelect={(value) => select({ ...parts, final: value as Final })}
                onDropPiece={dropPiece}
              />
            ) : null}
          </div>

          <p
            aria-live="polite"
            className="rounded-[var(--radius-field)] border-l-2 border-accent bg-surface-2/60 px-3 py-2 text-sm leading-relaxed text-muted"
          >
            {parts.medial
              ? positionNote(parts.medial)
              : "Vogal vertical fica à direita; horizontal fica abaixo; composta ocupa a base e a direita."}
          </p>

          <div className="flex flex-col gap-3 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-muted">
              A composição é uma prévia; a correção acontece ao conferir.
            </p>
            <button
              type="button"
              onClick={clear}
              disabled={disabled || !touched}
              className="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-[var(--radius-field)] border border-line-strong px-3 text-sm font-semibold text-accent transition-colors duration-[var(--motion-fast)] hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-45 sm:self-auto"
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
  kind,
  title,
  values,
  selected,
  disabled,
  onSelect,
  onDropPiece,
}: {
  kind: "initial" | "medial" | "final";
  title: string;
  values: readonly string[];
  selected?: string;
  disabled: boolean;
  onSelect(value: string): void;
  onDropPiece(kind: string, value: string): void;
}) {
  return (
    <fieldset className="min-w-0">
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
              draggable={!disabled}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "copy";
                event.dataTransfer.setData("text/plain", `${kind}\u001f${value}`);
              }}
              onClick={() => onSelect(value)}
              onDoubleClick={() => onDropPiece(kind, value)}
              className={`min-h-12 min-w-12 flex-1 cursor-grab rounded-[var(--radius-field)] border-2 px-2 font-ko text-xl transition-[background-color,border-color,color,box-shadow] duration-[var(--motion-fast)] active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-55 ${
                active
                  ? "border-accent bg-surface-2 text-fg ring-1 ring-accent"
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

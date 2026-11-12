"use client";

import { useId, useState } from "react";
import type { RuleRecord } from "@/content/hangul/types";
import { Badge } from "@/components/ui/Badge";
import { BilingualText } from "./exercise-media";
import { AudioControl } from "./exercise-media";

type RuleExample = RuleRecord["examples"][number];

const KIND_LABEL: Record<RuleRecord["kind"], string> = {
  liaison: "ligação",
  nasalization: "nasalização",
  aspiration: "aspiração",
  batchim: "batchim",
};

function SyllableRail({
  text,
  compare,
  tone,
}: {
  text: string;
  compare?: readonly string[];
  tone: "written" | "spoken";
}) {
  return (
    <p className="mt-2 flex flex-wrap gap-1">
      {Array.from(text).map((syllable, index) => {
        const changed = compare ? compare[index] !== undefined && compare[index] !== syllable : false;
        return (
          <span
            key={`${syllable}-${index}`}
            className={`flex min-h-12 min-w-12 items-center justify-center rounded-[var(--radius-seal)] border px-1 font-ko text-2xl font-semibold ${
              changed
                ? "border-accent bg-success-soft text-fg"
                : tone === "written"
                  ? "border-line bg-bg text-fg"
                  : "border-line bg-bg text-muted"
            }`}
          >
            <span lang="ko">{syllable}</span>
            {changed ? <span className="sr-only"> (muda na fala)</span> : null}
          </span>
        );
      })}
    </p>
  );
}

/**
 * Camadas de pronúncia a partir das regras já tipadas no conteúdo.
 *
 * A forma escrita, a forma falada, a nota e a explicação ficam sempre
 * visíveis. O seletor troca o exemplo e a comparação por bloco é um detalhe
 * opcional — nenhuma informação depende de revelação ou de animação.
 */
export function PronunciationLayers({
  rule,
  example,
  examples,
}: {
  rule: RuleRecord;
  example?: RuleExample;
  examples?: readonly RuleExample[];
}) {
  const [selected, setSelected] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);
  const selectId = useId();
  const compareId = useId();
  const available = examples && examples.length > 0
    ? examples
    : example
      ? [example]
      : rule.examples;
  const current = available[Math.min(selected, available.length - 1)] ?? available[0];

  if (!current) return null;

  const written = Array.from(current.written);
  const spoken = Array.from(current.spoken);
  const changed = written.flatMap((syllable, index) =>
    spoken[index] !== undefined && spoken[index] !== syllable
      ? [{ index, written: syllable, spoken: spoken[index]! }]
      : [],
  );
  const reviewLabel = rule.review.status === "in-review" ? "em revisão" : "revisado";

  return (
    <section
      aria-label={`Camadas de pronúncia: ${current.written}`}
      className="rounded-[var(--radius-panel)] border border-line bg-surface p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="mono-label text-accent">
            Regra de fronteira / {KIND_LABEL[rule.kind]}
          </p>
          <h3 className="mt-1 text-lg font-semibold leading-snug">
            <BilingualText text={rule.title} />
          </h3>
        </div>
        <Badge tone={rule.review.status === "in-review" ? "warning" : "neutral"}>
          {reviewLabel}
        </Badge>
      </div>

      {available.length > 1 ? (
        <div className="mt-4">
          <label htmlFor={selectId} className="mono-label text-muted">
            Exemplo
          </label>
          <select
            id={selectId}
            value={selected}
            onChange={(event) => {
              setSelected(Number(event.target.value));
              setCompareOpen(false);
            }}
            className="mt-2 min-h-12 w-full rounded-[var(--radius-field)] border border-line-strong bg-surface px-3 text-base text-fg"
          >
            {available.map((item, index) => (
              <option key={`${item.written}-${index}`} value={index} lang="ko">
                {item.written}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Exemplo selecionado: <span lang="ko">{current.written}</span>.
      </p>

      <ol className="mt-4 grid gap-4 sm:grid-cols-2">
        <li>
          <p className="mono-label text-muted">01 / Forma escrita</p>
          <SyllableRail text={current.written} tone="written" />
        </li>
        <li>
          <p className="mono-label text-muted">02 / Forma falada aproximada</p>
          <SyllableRail text={current.spoken} compare={written} tone="spoken" />
        </li>
      </ol>

      {changed.length > 0 ? (
        <p className="mt-2 text-xs text-muted">
          Bloco com contorno e fundo = muda na fala.
        </p>
      ) : null}

      {current.note ? (
        <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-fg">
          <BilingualText text={current.note} />
        </p>
      ) : null}

      <p className="mt-3 text-sm text-muted">
        <BilingualText text={rule.explanation} />
      </p>

      {rule.review.status === "in-review" ? (
        <p className="mt-2 text-xs text-muted">
          Transcrição didática em revisão; não substitui a revisão de falante nativo.
        </p>
      ) : null}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
        <AudioControl
          text={current.spoken}
          compact
          label="Ouvir a forma falada"
        />
        {changed.length > 0 ? (
          <button
            type="button"
            aria-expanded={compareOpen}
            aria-controls={compareId}
            onClick={() => setCompareOpen((open) => !open)}
            className="min-h-12 rounded-[var(--radius-field)] border border-line-strong px-4 text-left text-sm font-semibold text-fg hover:bg-surface-2"
          >
            {compareOpen ? "Ocultar comparação por bloco" : "Ver comparação por bloco"}
          </button>
        ) : null}
      </div>

      {compareOpen && changed.length > 0 ? (
        <ol
          id={compareId}
          className="mt-3 space-y-1 border-t border-line pt-3 text-sm text-muted"
        >
          {changed.map((item) => (
            <li key={item.index}>
              Bloco {item.index + 1}:{" "}
              <span lang="ko" className="font-ko text-fg">{item.written}</span>
              {" → "}
              <span lang="ko" className="font-ko text-fg">{item.spoken}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

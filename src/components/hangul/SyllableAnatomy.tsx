"use client";

import { useId, useState, type ReactNode } from "react";
import { JAMO } from "@/content/hangul/jamo";
import { SYLLABLES } from "@/content/hangul/syllables";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AudioControl } from "./exercise-media";

type PartKey = "initial" | "medial" | "final";

const POSITIONS: Record<PartKey, string> = {
  initial: "Ocupa o canto superior esquerdo do bloco.",
  medial: "Ocupa o lado direito, em pé, ao lado da inicial.",
  final: "Fecha o bloco por baixo, depois da vogal.",
};

const PART_LABELS: Record<PartKey, string> = {
  initial: "Inicial",
  medial: "Medial",
  final: "Final",
};

/**
 * Anatomia estática de uma sílaba já presente no currículo (한, introduzida em
 * h18). A geometria é um esquema de posição — não caligrafia — e os textos vêm
 * de `JAMO`/`SYLLABLES`. O botão alterna bloco montado e peças separadas sem
 * esconder informação: a lista ordenada e a explicação estão sempre visíveis.
 */
export function SyllableAnatomy() {
  const [exploded, setExploded] = useState(false);
  const [selected, setSelected] = useState<PartKey>("initial");
  const headingId = useId();

  const syllable = SYLLABLES.find((item) => item.id === "syl:한");
  if (!syllable) return null;

  const parts = (
    [
      ["initial", syllable.initial],
      ["medial", syllable.medial],
      ["final", syllable.final],
    ] as const
  )
    .filter(([, symbol]) => symbol.length > 0)
    .map(([key, symbol], index) => ({
      key,
      symbol,
      ordinal: String(index + 1).padStart(2, "0"),
      jamo: JAMO.find((item) => item.symbol === symbol),
    }));

  const transforms: Record<PartKey, string> = {
    initial: "translate(-120 -40)",
    medial: "translate(120 -35)",
    final: "translate(30 40)",
  };

  const geometry: Record<PartKey, ReactNode> = {
    initial: (
      <>
        <path d="M250 100h60M280 100v20M235 142h90" />
        <circle cx="280" cy="190" r="32" />
      </>
    ),
    medial: <path d="M360 92v170M360 165h44" />,
    final: <path d="M250 275v50h170" />,
  };

  const labelMarks: Record<
    PartKey,
    { marker: [number, number]; target: [number, number] }
  > = exploded
    ? {
        initial: { marker: [80, 62], target: [145, 96] },
        medial: { marker: [550, 70], target: [505, 100] },
        final: { marker: [238, 382], target: [292, 330] },
      }
    : {
        initial: { marker: [196, 78], target: [246, 104] },
        medial: { marker: [446, 66], target: [389, 99] },
        final: { marker: [468, 354], target: [410, 322] },
      };

  return (
    <section
      aria-labelledby={headingId}
      className="border border-line bg-surface p-4 sm:p-5"
    >
      <p className="mono-label text-accent">Anatomia · 한</p>
      <h2 id={headingId} className="mt-1 text-xl font-semibold tracking-tight">
        Uma sílaba, três posições
      </h2>
      <p className="mt-2 max-w-[65ch] text-sm text-muted">
        A sílaba <span lang="ko" className="font-ko text-fg">한</span> reúne uma
        consoante inicial, uma vogal medial e uma consoante final. O desenho é um
        esquema de posição, não um modelo de caligrafia.
      </p>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="min-w-0">
          <div className="border border-line bg-surface-2 p-2">
            <svg
              viewBox="0 0 600 420"
              role="img"
              aria-label="Esquema da sílaba 한: ㅎ na posição inicial, ㅏ na medial e ㄴ fechando o bloco. As linhas numeradas apontam para cada parte."
              className="h-auto w-full"
            >
              <rect width="600" height="420" fill="transparent" />
              <g
                aria-hidden
                fill="none"
                stroke="var(--line)"
                strokeDasharray="3 6"
              >
                <path d="M40 210h520M300 32v356" />
                <rect x="42" y="34" width="516" height="352" />
              </g>

              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="14"
                className="text-fg"
              >
                {(Object.keys(geometry) as PartKey[]).map((key) => (
                  <g
                    key={key}
                    transform={exploded ? transforms[key] : undefined}
                    className={selected === key ? "text-seal" : "text-fg"}
                    aria-hidden
                  >
                    {geometry[key]}
                  </g>
                ))}
              </g>

              <g aria-hidden className="text-seal">
                {(Object.keys(labelMarks) as PartKey[]).map((key, index) => {
                  const { marker, target } = labelMarks[key];
                  return (
                    <g key={key}>
                      <path
                        d={`M${marker[0]} ${marker[1]} L${target[0]} ${target[1]}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 4"
                      />
                      <circle
                        cx={marker[0]}
                        cy={marker[1]}
                        r="13"
                        fill="var(--surface)"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <text
                        x={marker[0]}
                        y={marker[1] + 4}
                        textAnchor="middle"
                        fill="currentColor"
                        fontFamily="ui-monospace, monospace"
                        fontSize="11"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              type="button"
              variant="secondary"
              aria-pressed={exploded}
              onClick={() => setExploded((value) => !value)}
            >
              {exploded ? "Ver bloco montado" : "Ver peças separadas"}
            </Button>
            <p className="text-sm text-muted">
              {exploded
                ? "Peças separadas: ㅎ, ㅏ e ㄴ em suas posições no bloco."
                : "Bloco montado: ㅎ e ㅏ formam 하; ㄴ fecha a sílaba 한."}
            </p>
          </div>

          <AudioControl
            text={syllable.audioText ?? syllable.text}
            label="Ouvir a sílaba 한"
            fallback="O áudio sintetizado do KBR tem prioridade. Se ele não tocar, a voz do sistema pode variar; o esquema acima é a referência visual."
            compact
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold">Ordem de composição</h3>
          <ol className="mt-2 flex flex-col gap-3">
            {parts.map((part) => (
              <li key={part.key}>
                <button
                  type="button"
                  aria-pressed={selected === part.key}
                  onClick={() => setSelected(part.key)}
                  className={`flex min-h-12 w-full items-center justify-between gap-3 border px-3 py-2 text-left transition-colors duration-[var(--motion-fast)] ${
                    selected === part.key
                      ? "border-seal bg-surface-2"
                      : "border-line bg-surface hover:bg-surface-2"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="mono-data text-muted">{part.ordinal}</span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm font-semibold">
                        {PART_LABELS[part.key]}{" "}
                        <span lang="ko" className="font-ko">
                          {part.symbol}
                        </span>
                      </span>
                      <span className="text-xs text-muted">{POSITIONS[part.key]}</span>
                    </span>
                  </span>
                  {part.jamo ? (
                    <Badge tone={selected === part.key ? "accent" : "neutral"}>
                      {part.jamo.namePt}
                    </Badge>
                  ) : null}
                </button>

                {part.jamo ? (
                  <div className="mt-1 border-l border-line px-3 py-1 text-sm">
                    <p className="text-muted">
                      <span lang="ko" className="font-ko text-fg">
                        {part.jamo.nameKo}
                      </span>{" "}
                      · {part.jamo.ipa.join(" / ")} · introduzido em{" "}
                      {part.jamo.introducedIn}
                    </p>
                    <p className="mt-1">{part.jamo.notes}</p>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mono-data mt-3 text-muted">
            Conteúdo em revisão · {syllable.introducedIn}
          </p>
          <p className="sr-only" role="status">
            {exploded ? "Peças separadas." : "Bloco montado."}{" "}
            {PART_LABELS[selected]} destacada: {parts.find((part) => part.key === selected)?.symbol}.
          </p>
        </div>
      </div>
    </section>
  );
}

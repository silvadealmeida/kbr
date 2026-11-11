/**
 * Régua de leitura para a conclusão do curso: uma marca por passo, preenchida
 * até o valor atual. O texto visível e `aria-valuetext` evitam depender da cor.
 */
export function Ruler({
  value,
  max = 25,
  label,
  valueText,
  className = "",
}: {
  value: number;
  max?: number;
  label: string;
  valueText?: string;
  className?: string;
}) {
  const total = Math.max(1, Math.round(max));
  const clamped = Math.min(total, Math.max(0, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={clamped}
      aria-valuetext={valueText ?? `${clamped} de ${total}`}
      aria-label={label}
      className={className}
    >
      <div aria-hidden className="flex items-end justify-between gap-px">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`w-0.5 rounded-full ${
              index < clamped ? "h-4 bg-accent" : "h-2.5 bg-line"
            }`}
          />
        ))}
      </div>
      <p className="mono-data mt-2 text-muted">{valueText ?? `${clamped} de ${total}`}</p>
    </div>
  );
}

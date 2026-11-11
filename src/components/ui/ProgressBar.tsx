export function ProgressBar({
  value,
  label,
  valueText,
  className = "",
}: {
  value: number;
  label: string;
  valueText?: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-valuetext={valueText ?? `${clamped}%`}
      aria-label={label}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-line ${className}`}
    >
      <div
        className="h-full rounded-full bg-accent"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

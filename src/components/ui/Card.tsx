import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-plate)] border border-line bg-surface p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Prancha editorial: card com marcas de registro nos cantos e número de lâmina.
 * As marcas são decorativas (`aria-hidden`); o número é texto real.
 */
export function Plate({
  children,
  className = "",
  number,
  label,
}: {
  children: ReactNode;
  className?: string;
  number?: ReactNode;
  label?: string;
}) {
  return (
    <div
      className={`relative rounded-[var(--radius-plate)] border border-line bg-surface p-5 ${className}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-2.5">
        <span className="absolute left-0 top-0 size-2 border-l border-t border-line-strong" />
        <span className="absolute right-0 top-0 size-2 border-r border-t border-line-strong" />
        <span className="absolute bottom-0 left-0 size-2 border-b border-l border-line-strong" />
        <span className="absolute bottom-0 right-0 size-2 border-b border-r border-line-strong" />
      </span>
      {number ? (
        <span className="mono-label absolute right-4 top-3 text-muted">{number}</span>
      ) : null}
      {label ? (
        // O número fica na mesma linha do rótulo: reserva espaço só ali, sem
        // estreitar o corpo do cartão (padding assimétrico à direita).
        <p className={`mono-label mb-2 text-muted ${number ? "pr-12" : ""}`}>
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

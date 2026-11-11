import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "accent" | "success" | "danger" | "warning";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-surface-2 text-muted",
  accent: "bg-surface-2 text-accent",
  success: "bg-success-soft text-success",
  danger: "bg-danger-soft text-danger",
  warning: "bg-warning-soft text-warning",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mono-label inline-flex min-h-6 items-center rounded-[var(--radius-seal)] px-2 py-1 ${badgeTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Carimbo decorativo de conclusão. Sem `label`, é inteiramente `aria-hidden`;
 * com `label`, o texto equivalente é anunciado e o conteúdo visual fica oculto.
 */
export function Seal({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      className={`inline-flex size-20 -rotate-6 items-center justify-center rounded-full border-2 border-seal bg-surface p-2 text-center font-mono text-[11px] font-medium uppercase leading-tight tracking-[0.14em] text-seal ${className}`}
    >
      {label ? <span className="sr-only">{label}</span> : null}
      <span aria-hidden>{children}</span>
    </span>
  );
}

import type { ComponentPropsWithRef, ReactNode } from "react";

export function fieldDescribedBy(
  id: string,
  { hint, error }: { hint?: string; error?: string } = {},
) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ") || undefined;
}

/**
 * Rótulo, ajuda e erro acima/abaixo do controle. O input deve receber
 * `aria-describedby={fieldDescribedBy(id, { hint, error })}` e `aria-invalid`.
 */
export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  children,
  className = "",
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {required ? (
          <span className="font-normal text-muted"> (obrigatório)</span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-[13px] leading-snug text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-sm text-danger"
        >
          <span aria-hidden className="font-semibold">
            !
          </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type InputProps = ComponentPropsWithRef<"input"> & {
  invalid?: boolean;
};

export function Input({
  invalid = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={invalid || props["aria-invalid"] || undefined}
      className={`min-h-12 w-full rounded-[var(--radius-field)] border-[1.5px] bg-surface px-3 py-2 text-base text-fg placeholder:text-faint disabled:cursor-not-allowed disabled:opacity-60 ${
        invalid ? "border-danger" : "border-muted"
      } ${className}`}
    />
  );
}

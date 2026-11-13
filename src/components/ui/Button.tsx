import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 font-semibold transition-[background-color,border-color,color,opacity] duration-[var(--motion-fast)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 aria-busy:cursor-wait";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:opacity-90",
  secondary: "border-[1.5px] border-muted bg-surface text-fg hover:bg-surface-2",
  ghost: "border border-transparent text-fg hover:bg-surface-2",
  danger: "bg-danger text-bg hover:opacity-90",
  link: "text-accent underline-offset-4 hover:underline",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "min-h-11 rounded-[var(--radius-field)] px-3.5 text-sm",
  md: "min-h-12 rounded-[var(--radius-field)] px-5 text-base",
  lg: "min-h-13 rounded-[var(--radius-field)] px-6 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`.trim();
}

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
    >
      {loading ? (
        <span
          aria-hidden
          className="spinner size-4 shrink-0 rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}

export type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props} className={buttonStyles({ variant, size, className })}>
      {children}
    </Link>
  );
}

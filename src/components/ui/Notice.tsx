import type { ReactNode } from "react";

export type NoticeTone = "info" | "success" | "warning" | "danger";

const noticeTones: Record<NoticeTone, { border: string; icon: string }> = {
  info: { border: "border-l-accent", icon: "text-accent" },
  success: { border: "border-l-success", icon: "text-success" },
  warning: { border: "border-l-warning", icon: "text-warning" },
  danger: { border: "border-l-danger", icon: "text-danger" },
};

function NoticeIcon({ tone }: { tone: NoticeTone }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={`mt-0.5 size-5 shrink-0 ${noticeTones[tone].icon}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {tone === "success" ? (
        <>
          <circle cx="10" cy="10" r="7.5" />
          <path d="m6.5 10 2.4 2.4 4.6-5" />
        </>
      ) : tone === "warning" ? (
        <>
          <path d="M10 3 17.5 16h-15L10 3Z" />
          <path d="M10 8v3.5" />
          <path d="M10 14.2h.01" />
        </>
      ) : tone === "danger" ? (
        <>
          <circle cx="10" cy="10" r="7.5" />
          <path d="m7.5 7.5 5 5m0-5-5 5" />
        </>
      ) : (
        <>
          <circle cx="10" cy="10" r="7.5" />
          <path d="M10 8.5V14" />
          <path d="M10 6h.01" />
        </>
      )}
    </svg>
  );
}

export function Notice({
  tone = "info",
  title,
  children,
  className = "",
}: {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const role = tone === "danger" ? "alert" : "status";

  return (
    <div
      role={role}
      className={`flex items-start gap-3 rounded-[var(--radius-field)] border border-line border-l-[3px] bg-surface p-4 ${noticeTones[tone].border} ${className}`}
    >
      <NoticeIcon tone={tone} />
      <div className="min-w-0 text-sm text-fg">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={title ? "mt-0.5" : undefined}>{children}</div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = document.documentElement.classList.toggle("dark");
    setDark(next);
    try { localStorage.setItem("kbr:theme", next ? "dark" : "light"); } catch {}
  };

  const label = dark ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      title={label}
      className="flex size-12 items-center justify-center rounded-xl text-xl hover:bg-surface-2"
    >
      <span aria-hidden className="dark:hidden">☾</span>
      <span aria-hidden className="hidden dark:inline">☀</span>
    </button>
  );
}

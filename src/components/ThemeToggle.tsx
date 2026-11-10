"use client";
export function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("kbr:theme", dark ? "dark" : "light"); } catch {}
  };
  return (
    <button onClick={toggle} aria-label="Alternar tema claro/escuro"
      className="flex size-12 items-center justify-center rounded-xl text-xl hover:bg-soft">
      <span aria-hidden className="dark:hidden">☾</span><span aria-hidden className="hidden dark:inline">☀</span>
    </button>
  );
}

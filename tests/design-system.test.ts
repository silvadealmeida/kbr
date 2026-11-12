import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

const read = (path: string) =>
  readFileSync(new URL(`../src/${path}`, import.meta.url), "utf8");

const srcRoot = fileURLToPath(new URL("../src", import.meta.url));

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(?:ts|tsx|css)$/.test(entry.name) ? [path] : [];
  });
}

const globals = read("app/globals.css");
const layout = read("app/layout.tsx");

function luminance(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean;
  const channels = full.match(/../g) ?? [];
  const [r, g, b] = channels.map((channel) => {
    const value = Number.parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string) {
  const [lighter, darker] = [
    luminance(foreground),
    luminance(background),
  ].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

const lightPairs: Array<[string, string, string, number]> = [
  ["texto principal sobre bg", "#201e19", "#f4efe3", 4.5],
  ["texto principal sobre surface", "#201e19", "#fbf7ec", 4.5],
  ["texto principal sobre surface-2", "#201e19", "#eae3d3", 4.5],
  ["texto secundário sobre bg", "#5c574c", "#f4efe3", 4.5],
  ["texto terciário sobre bg", "#6b6255", "#f4efe3", 4.5],
  ["selo sobre bg", "#c33a22", "#f4efe3", 4.5],
  ["accent sobre bg", "#2e6a5b", "#f4efe3", 4.5],
  ["accent sobre surface-2", "#2e6a5b", "#eae3d3", 4.5],
  ["accent sobre surface", "#2e6a5b", "#fbf7ec", 4.5],
  ["sucesso sobre success-soft", "#1f4e42", "#dceae3", 4.5],
  ["erro sobre danger-soft", "#a02e17", "#f3ddd6", 4.5],
  ["aviso sobre warning-soft", "#7a4e00", "#f0e4c8", 4.5],
  ["branco sobre accent", "#ffffff", "#2e6a5b", 4.5],
  ["branco sobre selo", "#ffffff", "#c33a22", 4.5],
];

const darkPairs: Array<[string, string, string, number]> = [
  ["texto principal sobre bg", "#f2ede2", "#101512", 4.5],
  ["texto principal sobre surface", "#f2ede2", "#171e1a", 4.5],
  ["texto principal sobre surface-2", "#f2ede2", "#1f2a24", 4.5],
  ["texto secundário sobre bg", "#b4afa3", "#101512", 4.5],
  ["texto terciário sobre bg", "#a8a296", "#101512", 4.5],
  ["selo sobre bg", "#ff8a70", "#101512", 4.5],
  ["accent sobre bg", "#8fd3be", "#101512", 4.5],
  ["accent sobre surface-2", "#8fd3be", "#1f2a24", 4.5],
  ["sucesso sobre success-soft", "#8fd3be", "#1c3a31", 4.5],
  ["erro sobre danger-soft", "#ff8a70", "#3a211c", 4.5],
  ["aviso sobre warning-soft", "#f0c36a", "#332917", 4.5],
  ["bg sobre accent", "#101512", "#8fd3be", 4.5],
  ["bg sobre selo", "#101512", "#ff8a70", 4.5],
];

describe("tokens de cor e contraste (7B)", () => {
  test.each(lightPairs)("claro: %s ≥ AA", (_name, foreground, background, min) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(min);
  });

  test.each(darkPairs)("escuro: %s ≥ AA", (_name, foreground, background, min) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(min);
  });

  test("mantém os primitivos e semânticos aprovados no CSS", () => {
    for (const token of [
      "--paper-50: #fbf7ec",
      "--paper-100: #f4efe3",
      "--paper-200: #eae3d3",
      "--ink-900: #201e19",
      "--seal-600: #c33a22",
      "--celadon-700: #2e6a5b",
      "--night-950: #101512",
      "--bone-100: #f2ede2",
      "--coral-400: #ff8a70",
      "--mint-300: #8fd3be",
      "--bg: var(--paper-100)",
      "--surface: var(--paper-50)",
      "--surface-2: var(--paper-200)",
      "--fg: var(--ink-900)",
      "--muted: var(--ink-700)",
      "--line: var(--paper-300)",
      "--seal: var(--seal-600)",
      "--accent: var(--celadon-700)",
      "--success: var(--celadon-800)",
      "--danger: var(--seal-700)",
      "--focus: var(--celadon-700)",
    ]) {
      expect(globals).toContain(token);
    }
  });

  test("não mantém aliases legados depois da 7G", () => {
    for (const token of [
      "--brand:",
      "--brand-fg:",
      "--border:",
      "--accent-soft:",
      "--color-brand:",
      "--color-brand-fg:",
      "--color-border:",
      "--color-soft:",
    ]) {
      expect(globals).not.toContain(token);
    }
  });

  test("nenhum arquivo em src reintroduz classes ou aliases legados", () => {
    const legacyClass =
      /\b(?:bg-soft|border-border|text-brand|bg-brand|text-brand-fg)\b/;
    const legacyToken =
      /\B--(?:brand|brand-fg|border|accent-soft|color-brand|color-brand-fg|color-border|color-soft)\b/;
    const offenders = sourceFiles(srcRoot).filter((file) => {
      const text = readFileSync(file, "utf8");
      return legacyClass.test(text) || legacyToken.test(text);
    });

    expect(offenders).toEqual([]);
  });
});

describe("fundação de forma, movimento e tipografia (7B)", () => {
  test("define forma e movimento aprovados", () => {
    for (const token of [
      "--radius-seal: 4px",
      "--radius-field: 8px",
      "--radius-plate: 12px",
      "--radius-panel: 16px",
      "--radius-hero: 24px",
      "--radius-pill: 999px",
      "--motion-instant: 80ms",
      "--motion-fast: 140ms",
      "--motion-base: 220ms",
      "--motion-slow: 360ms",
      "--motion-cinematic: 640ms",
      "--ease-standard: cubic-bezier(0.2, 0, 0, 1)",
      "--ease-enter: cubic-bezier(0.16, 1, 0.3, 1)",
      "--ease-exit: cubic-bezier(0.4, 0, 1, 1)",
    ]) {
      expect(globals).toContain(token);
    }
  });

  test("define a escala tipográfica sem sobrescrever text-sm/base", () => {
    for (const token of [
      "--text-display-xl: clamp(2.75rem, 9vw, 5.5rem)",
      "--text-display-lg: clamp(2.25rem, 6vw, 3.75rem)",
      "--text-h1: clamp(1.75rem, 4vw, 2.5rem)",
      "--text-h2: clamp(1.375rem, 3vw, 1.75rem)",
      "--text-h3: 1.125rem",
      "--text-body-lg: 1.125rem",
      "--text-body: 1rem",
      "--text-small: 0.875rem",
      "--text-caption: 0.75rem",
      "--text-mono-label: 0.6875rem",
      "--text-mono-data: 0.8125rem",
    ]) {
      expect(globals).toContain(token);
    }
    expect(globals).not.toContain("--text-sm:");
    expect(globals).not.toContain("--text-base:");
  });

  test("liga Archivo/Plex Mono via next/font sem auto-referência", () => {
    expect(layout).toContain("Archivo");
    expect(layout).toContain("IBM_Plex_Mono");
    expect(layout).toContain('variable: "--font-archivo"');
    expect(layout).toContain('variable: "--font-plex-mono"');
    expect(layout).toContain('preload: false');
    expect(layout).toContain('display: "optional"');
    expect(globals).toContain("--font-sans: var(--font-archivo)");
    expect(globals).toContain("--font-mono: var(--font-plex-mono)");
    expect(globals).not.toContain("--font-mono: var(--font-mono)");
  });

  test("declara reduced motion e evita transition: all", () => {
    expect(globals).toContain("@media (prefers-reduced-motion: reduce)");
    expect(globals).toContain("animation-duration: 0.01ms !important");
    expect(globals).toContain("transition-duration: 0.01ms !important");
    expect(globals).not.toMatch(/transition:\s*all/);
  });

  test("preserva color-scheme e foco visível por tema", () => {
    expect(globals).toContain("color-scheme: light");
    expect(globals).toContain("color-scheme: dark");
    expect(globals).toContain("outline: 3px solid var(--focus)");
    expect(globals).toContain("outline-offset: 2px");
  });
});

describe("movimento pedagógico (7F)", () => {
  test("desenha o herói em quatro grupos com traço normalizado", () => {
    const composition = read("components/site/HangulComposition.tsx");

    expect(composition.match(/pathLength=\{1\}/g)).toHaveLength(4);
    expect(composition.match(/className="composition-strokes"/g)).toHaveLength(1);
    expect(composition).toContain("composition-strokes");
    expect(composition).toContain('role="img"');
    expect(composition).toContain("Composição da sílaba 한");
  });

  test("define entrada e selo de conclusão sem atrasar ações", () => {
    expect(globals).toContain(".composition-strokes > g > *");
    expect(globals).toContain("animation-delay: 120ms");
    expect(globals).toContain("animation-delay: 240ms");
    expect(globals).toContain("animation-delay: 360ms");
    expect(globals).toContain(".completion-enter");
    expect(globals).toContain(".completion-seal");
    expect(globals).toContain("@keyframes completion-seal");
    expect(globals).not.toMatch(/transition:\s*all/);
  });
});

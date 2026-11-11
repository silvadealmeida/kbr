import { existsSync, readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import manifest from "@/app/manifest";

function pngSize(path: string): { width: number; height: number } {
  const bytes = readFileSync(new URL(`../public${path}`, import.meta.url));
  expect(bytes.subarray(1, 4).toString("ascii")).toBe("PNG");
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

describe("manifesto da PWA", () => {
  const value = manifest();

  test("declara instalação standalone e identidade estável", () => {
    expect(value.display).toBe("standalone");
    expect(value.id).toBe("/");
    expect(value.start_url).toBe("/");
    expect(value.scope).toBe("/");
    expect(value.name).toBe("KBR — Coreano para brasileiros");
    expect(value.short_name).toBe("KBR");
    expect(value.lang).toBe("pt-BR");
    expect(value.dir).toBe("ltr");
    expect(value.categories).toEqual(["education"]);
    expect(value.background_color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(value.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  test("declara ícones any e maskable com arquivos e dimensões válidos", () => {
    const icons = value.icons ?? [];

    expect(icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: "/icons/icon-192.png", sizes: "192x192", purpose: "any" }),
        expect.objectContaining({ src: "/icons/icon-512.png", sizes: "512x512", purpose: "any" }),
        expect.objectContaining({ src: "/icons/icon-512.png", sizes: "512x512", purpose: "maskable" }),
      ]),
    );

    for (const icon of icons) {
      expect(icon.type).toBe("image/png");
      expect(existsSync(new URL(`../public${icon.src}`, import.meta.url))).toBe(true);
      if (!icon.src || !icon.sizes) throw new Error("ícone sem src/sizes");
      const [width, height] = icon.sizes.split("x").map(Number);
      expect(pngSize(icon.src)).toEqual({ width, height });
    }
  });

  test("oferece atalhos apenas para rotas existentes", () => {
    expect(value.shortcuts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: "/hangul" }),
        expect.objectContaining({ url: "/revisao" }),
      ]),
    );
    for (const shortcut of value.shortcuts ?? []) {
      expect(shortcut.name?.length).toBeGreaterThan(0);
      expect(shortcut.short_name?.length).toBeGreaterThan(0);
    }
  });

  test("não registra service worker nem cache offline nesta fase", () => {
    expect(Object.keys(value)).not.toContain("serviceworker");
    for (const file of ["sw.js", "service-worker.js"]) {
      expect(existsSync(new URL(`../public/${file}`, import.meta.url))).toBe(false);
    }
  });
});

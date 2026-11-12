import { expect, test } from "vitest";
import {
  CURRICULUM_PROTECTED_PATHS,
  EXPERIMENTAL_PROTECTED_PATHS,
  isProtectedPath,
  LEGACY_PROTECTED_PATHS,
  PROTECTED_PATHS,
  ROUTES,
} from "@/lib/routes";

test("cinco rotas de navegação, todas privadas e começando com /", () => {
  expect(ROUTES).toHaveLength(5);
  expect(new Set(ROUTES.map((route) => route.href)).size).toBe(5);
  expect(ROUTES.every((route) => route.href.startsWith("/"))).toBe(true);
  expect(ROUTES[0].href).toBe("/dashboard");
  expect(ROUTES.map((route) => route.href)).toContain("/cursos");
  expect(PROTECTED_PATHS).toEqual([
    ...ROUTES.map((route) => route.href),
    ...LEGACY_PROTECTED_PATHS,
    ...EXPERIMENTAL_PROTECTED_PATHS,
    ...CURRICULUM_PROTECTED_PATHS,
  ]);
  expect(ROUTES.map((route) => route.href)).not.toContain("/fala");
});

test.each([
  ["/dashboard", true],
  ["/dashboard/", true],
  ["/hangul", true],
  ["/hangul/vogais", true],
  ["/hangul/c3", true],
  ["/cursos", true],
  ["/cursos/hangul", true],
  ["/a1", true],
  ["/a1/a1-l01", true],
  ["/a1/a1-c01", true],
  ["/a2", true],
  ["/a2/a2-l01", true],
  ["/a2/a2-c08", true],
  ["/licoes", true],
  ["/fala", true],
  ["/vocabulario?tag=casa", true],
  ["/revisao", true],
  ["/", false],
  ["/privacidade", false],
  ["/impressum", false],
  ["/auth/error", false],
  ["/auth/callback", false],
  ["/hangulzinho", false],
])("classifica %s como rota privada: %s", (pathname, expected) => {
  expect(isProtectedPath(pathname)).toBe(expected);
});

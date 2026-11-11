import { expect, test } from "vitest";
import {
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
  ]);
});

test.each([
  ["/dashboard", true],
  ["/dashboard/", true],
  ["/hangul", true],
  ["/hangul/vogais", true],
  ["/hangul/c3", true],
  ["/cursos", true],
  ["/cursos/hangul", true],
  ["/licoes", true],
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

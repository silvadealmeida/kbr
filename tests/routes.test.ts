import { expect, test } from "vitest";
import { ROUTES } from "@/lib/routes";

test("cinco rotas únicas, todas começando com /", () => {
  expect(ROUTES).toHaveLength(5);
  expect(new Set(ROUTES.map((r) => r.href)).size).toBe(5);
  expect(ROUTES.every((r) => r.href.startsWith("/"))).toBe(true);
});

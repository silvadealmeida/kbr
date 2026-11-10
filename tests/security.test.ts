import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

const migration = readFileSync(
  new URL("../supabase/migrations/20261110120000_create_user_progress.sql", import.meta.url),
  "utf8",
);

describe("segurança do banco", () => {
  test("ativa RLS, remove anon e limita cada operação ao auth.uid", () => {
    expect(migration).toContain("enable row level security");
    expect(migration).toContain("revoke all on table public.user_progress from anon, authenticated");
    expect(migration.match(/\nto authenticated\n/g)).toHaveLength(4);
    expect(migration.match(/\(select auth\.uid\(\)\) = user_id/g)).toHaveLength(5);
  });

  test("não referencia credenciais privilegiadas", () => {
    expect(migration).not.toMatch(/service_role|secret key/i);
  });
});

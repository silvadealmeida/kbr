import { describe, expect, test, vi } from "vitest";
import { safeNextPath } from "@/lib/auth/redirect";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

describe("autenticação", () => {
  test.each([
    ["/", "/"],
    ["/revisao?origem=login", "/revisao?origem=login"],
    ["/revisao?origem=login#topo", "/revisao?origem=login#topo"],
    ["https://evil.example", "/"],
    ["//evil.example", "/"],
    ["/\\evil.example", "/"],
    ["/%5Cevil.example", "/"],
    ["/%5cevil.example", "/"],
    ["/%2F%2Fevil.example", "/"],
    ["/\t/evil.example", "/"],
    [null, "/"],
  ])("limita o redirecionamento OAuth ao próprio site", (input, expected) => {
    expect(safeNextPath(input)).toBe(expected);
  });

  test("só habilita Supabase com URL e chave públicas válidas", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
    expect(getSupabasePublicConfig()).toEqual({
      url: "https://project.supabase.co",
      publishableKey: "sb_publishable_test",
    });

    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "javascript:alert(1)");
    expect(getSupabasePublicConfig()).toBeNull();
    vi.unstubAllEnvs();
  });
});

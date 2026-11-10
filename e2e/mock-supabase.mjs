import { createServer } from "node:http";

export const TEST_USER = {
  id: "11111111-2222-4333-8444-555555555555",
  aud: "authenticated",
  role: "authenticated",
  email: "teste@kbr.local",
  email_confirmed_at: "2026-01-01T00:00:00.000Z",
  phone: "",
  confirmed_at: "2026-01-01T00:00:00.000Z",
  last_sign_in_at: "2026-01-01T00:00:00.000Z",
  app_metadata: { provider: "google", providers: ["google"] },
  user_metadata: { full_name: "Teste KBR" },
  identities: [],
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
  is_anonymous: false,
};

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

/** JWT HS256 sem `kid`: o Supabase cai em `getUser()` em vez de buscar JWKS. */
export function createTestAccessToken(now = Date.now()) {
  const issued = Math.floor(now / 1000);
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      sub: TEST_USER.id,
      aud: "authenticated",
      role: "authenticated",
      email: TEST_USER.email,
      iat: issued,
      exp: issued + 3600,
      aal: "aal1",
      session_id: "e2e-session",
    }),
  );
  return `${header}.${payload}.assinatura-de-teste`;
}

/** Sessão no formato que `@supabase/ssr` grava no cookie `base64-`. */
export function createTestSession(now = Date.now()) {
  const seconds = Math.floor(now / 1000);
  return {
    access_token: createTestAccessToken(now),
    token_type: "bearer",
    expires_in: 3600,
    expires_at: seconds + 3600,
    refresh_token: "e2e-refresh-token",
    user: TEST_USER,
  };
}

export function testAuthCookie(now = Date.now()) {
  const session = createTestSession(now);
  return {
    // O hostname 127.0.0.1 vira o project ref "127" no storageKey do Supabase.
    name: "sb-127-auth-token",
    value: `base64-${base64url(JSON.stringify(session))}`,
  };
}

function json(response, status, body) {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "content-length": Buffer.byteLength(payload),
  });
  response.end(payload);
}

export function createMockSupabaseServer() {
  return createServer((request, response) => {
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "*",
        "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
      });
      response.end();
      return;
    }

    const url = new URL(request.url ?? "/", "http://127.0.0.1");

    if (url.pathname === "/auth/v1/user" && request.method === "GET") {
      json(response, 200, { user: TEST_USER });
      return;
    }

    if (url.pathname === "/auth/v1/.well-known/jwks.json") {
      json(response, 200, { keys: [] });
      return;
    }

    if (url.pathname.startsWith("/rest/v1/user_progress")) {
      json(response, 200, []);
      return;
    }

    json(response, 404, { message: `Rota mock não implementada: ${url.pathname}` });
  });
}

export function startMockSupabase(port = 54321) {
  return new Promise((resolve, reject) => {
    const server = createMockSupabaseServer();
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

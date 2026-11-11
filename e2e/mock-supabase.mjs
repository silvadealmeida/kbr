import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

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

/** Usuário isolado por teste; evita que o estado remoto vaze entre specs. */
export function createTestUser(overrides = {}) {
  return { ...TEST_USER, ...overrides, id: overrides.id ?? randomUUID() };
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

/** JWT HS256 sem `kid`: o Supabase cai em `getUser()` em vez de buscar JWKS. */
export function createTestAccessToken(now = Date.now(), user = TEST_USER, sessionId = "e2e-session") {
  const issued = Math.floor(now / 1000);
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      sub: user.id,
      aud: "authenticated",
      role: "authenticated",
      email: user.email,
      iat: issued,
      exp: issued + 3600,
      aal: "aal1",
      session_id: sessionId,
    }),
  );
  return `${header}.${payload}.assinatura-de-teste`;
}

/** Sessão no formato que `@supabase/ssr` grava no cookie `base64-`. */
export function createTestSession(now = Date.now(), user = TEST_USER, sessionId = "e2e-session") {
  const seconds = Math.floor(now / 1000);
  return {
    access_token: createTestAccessToken(now, user, sessionId),
    token_type: "bearer",
    expires_in: 3600,
    expires_at: seconds + 3600,
    refresh_token: "e2e-refresh-token",
    user,
  };
}

export function testAuthCookie(now = Date.now(), user = TEST_USER, sessionId = "e2e-session") {
  const session = createTestSession(now, user, sessionId);
  return {
    // O hostname 127.0.0.1 vira o project ref "127" no storageKey do Supabase.
    name: "sb-127-auth-token",
    value: `base64-${base64url(JSON.stringify(session))}`,
  };
}

function userFromRequest(request) {
  const header = request.headers.authorization;
  if (typeof header !== "string" || !header.startsWith("Bearer ")) return null;

  const token = header.slice("Bearer ".length);
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    if (typeof payload.sub !== "string") return null;
    return {
      ...TEST_USER,
      id: payload.sub,
      email: typeof payload.email === "string" ? payload.email : TEST_USER.email,
    };
  } catch {
    return null;
  }
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

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (chunks.length === 0) return null;
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

function isProgress(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  if (value.v !== 1) return false;
  if (typeof value.lessons !== "object" || value.lessons === null || Array.isArray(value.lessons)) return false;
  if (typeof value.cards !== "object" || value.cards === null || Array.isArray(value.cards)) return false;
  if (!Array.isArray(value.history)) return false;
  if (typeof value.streak !== "number") return false;
  if (typeof value.dailyGoal !== "number") return false;
  return typeof value.lastActive === "string";
}

export function createMockSupabaseServer() {
  /** Uma linha em memória por usuário, como `public.user_progress`. */
  const rows = new Map();

  return createServer(async (request, response) => {
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
    const user = userFromRequest(request);

    if (url.pathname === "/auth/v1/user" && request.method === "GET") {
      if (!user) {
        json(response, 401, { message: "invalid token" });
        return;
      }
      json(response, 200, { user });
      return;
    }

    if (url.pathname === "/auth/v1/.well-known/jwks.json") {
      json(response, 200, { keys: [] });
      return;
    }

    // O cliente monta a URL de autorização localmente e navega para ela; o
    // teste WebKit intercepta antes de chegar aqui, mas manter a rota evita um
    // 404 confuso quando alguém abre o fluxo manualmente.
    if (url.pathname === "/auth/v1/authorize" && request.method === "GET") {
      response.writeHead(302, {
        location: `https://accounts.google.com/o/oauth2/v2/auth?provider=${url.searchParams.get("provider") ?? "google"}`,
      });
      response.end();
      return;
    }

    if (url.pathname === "/auth/v1/logout" && request.method === "POST") {
      if (!user) {
        json(response, 401, { message: "invalid token" });
        return;
      }
      response.writeHead(204, { "access-control-allow-origin": "*" });
      response.end();
      return;
    }

    if (url.pathname.startsWith("/rest/v1/user_progress")) {
      if (!user) {
        json(response, 401, { code: "42501", message: "not authenticated" });
        return;
      }

      if (request.method === "GET") {
        const filter = url.searchParams.get("user_id") ?? "";
        const requested = filter.startsWith("eq.") ? filter.slice(3) : null;
        if (requested !== user.id) {
          json(response, 200, []);
          return;
        }
        const row = rows.get(user.id);
        json(response, 200, row ? [{ progress: row.progress, sync_id: row.syncId }] : []);
        return;
      }

      json(response, 405, { message: "método não implementado no mock" });
      return;
    }

    if (url.pathname === "/rest/v1/rpc/save_user_progress" && request.method === "POST") {
      if (!user) {
        json(response, 401, { code: "42501", message: "not authenticated" });
        return;
      }

      const body = await readJson(request);
      if (!body || body.p_expected_user_id !== user.id) {
        json(response, 403, { code: "42501", message: "session user mismatch" });
        return;
      }
      if (!isProgress(body.p_progress)) {
        json(response, 400, { code: "22023", message: "invalid progress payload" });
        return;
      }

      const current = rows.get(user.id);
      const expected = body.p_expected_sync_id ?? null;

      if (expected === null) {
        if (!current) {
          const syncId = randomUUID();
          rows.set(user.id, { progress: body.p_progress, syncId });
          json(response, 200, [{ applied: true, progress: body.p_progress, current_sync_id: syncId }]);
          return;
        }
        json(response, 200, [{ applied: false, progress: current.progress, current_sync_id: current.syncId }]);
        return;
      }

      if (!current) {
        json(response, 200, [{ applied: false, progress: null, current_sync_id: null }]);
        return;
      }

      if (current.syncId !== expected) {
        json(response, 200, [{ applied: false, progress: current.progress, current_sync_id: current.syncId }]);
        return;
      }

      const syncId = randomUUID();
      rows.set(user.id, { progress: body.p_progress, syncId });
      json(response, 200, [{ applied: true, progress: body.p_progress, current_sync_id: syncId }]);
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

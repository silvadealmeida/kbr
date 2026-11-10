import { spawn } from "node:child_process";
import { startMockSupabase } from "./mock-supabase.mjs";

const PORT = 54321;
const mock = await startMockSupabase(PORT);
console.log(`[e2e] Supabase de teste em http://127.0.0.1:${PORT}`);

const next = spawn("npm", ["run", "start", "--", "-p", "3100"], {
  stdio: "inherit",
  env: process.env,
});

let stopping = false;
function stop(signal) {
  if (stopping) return;
  stopping = true;
  mock.close();
  next.kill(signal);
}

process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));
next.on("exit", (code) => {
  mock.close();
  process.exit(code ?? 0);
});

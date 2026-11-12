// Detecta MP3 do corpus restrito em diretórios que seriam publicados.
// Ver docs/audio/license-audit.md. Sem dependências além do Node.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const SKIP_DIRS = new Set(["node_modules", ".git"]);
const MAX_HASHED_BYTES = 2 * 1024 * 1024;

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return; // diretório inexistente
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

/**
 * Retorna caminhos suspeitos: qualquer .mp3, qualquer arquivo em `audio/hangul`
 * e qualquer arquivo (mesmo renomeado) cujo SHA-256 esteja no manifesto.
 * `roots` são os diretórios publicáveis (public/, .next/, .vercel/output).
 */
export function findRestrictedAudio(roots, manifest) {
  const hashes = new Set(manifest.items.map((item) => item.sha256));
  const sizes = new Set(manifest.items.map((item) => item.bytes));
  const hits = new Set();
  for (const root of roots) {
    for (const file of walk(root)) {
      const lower = file.toLowerCase();
      if (lower.endsWith(".mp3") || lower.includes(`${path.sep}audio${path.sep}hangul${path.sep}`)) {
        hits.add(file);
        continue;
      }
      const { size } = statSync(file);
      if (!sizes.has(size) || size > MAX_HASHED_BYTES) continue;
      const sha = createHash("sha256").update(readFileSync(file)).digest("hex");
      if (hashes.has(sha)) hits.add(file);
    }
  }
  return [...hits].sort();
}

export function loadManifest(root) {
  return JSON.parse(readFileSync(path.join(root, "src/content/audio/manifest.json"), "utf8"));
}

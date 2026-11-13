#!/usr/bin/env node
// Guarda de contenção: o corpus MP3 não entra em artefatos publicáveis por
// padrão. Roda antes e depois do build. Só é dispensado com opt-in explícito.
// Não apaga nem move os arquivos; a fonte continua versionada.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const optIn = process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO === "1";

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".git") yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function findMp3(roots) {
  const hits = [];
  for (const rootDir of roots) {
    for (const file of walk(rootDir)) {
      if (file.toLowerCase().endsWith(".mp3")) hits.push(file);
    }
  }
  return hits;
}

if (optIn) {
  console.warn(
    "[audio-guard] NEXT_PUBLIC_KBR_STATIC_AUDIO=1: áudio estático habilitado; a verificação de artefato é ignorada. Licença: docs/audio/license-audit.md",
  );
  process.exit(0);
}

const vercelignore = readFileSync(path.join(root, ".vercelignore"), "utf8");
if (!vercelignore.split(/\r?\n/).some((line) => line.trim() === "public/audio/")) {
  console.error("[audio-guard] .vercelignore precisa excluir public/audio/.");
  process.exit(1);
}

const hits = findMp3(
  [".next", ".vercel/output"].map((dir) => path.join(root, dir)),
);
if (hits.length > 0) {
  console.error(
    `[audio-guard] ${hits.length} MP3 em artefato publicável sem opt-in explícito:`,
  );
  for (const file of hits.slice(0, 10)) console.error(`  ${path.relative(root, file)}`);
  console.error(
    "Use NEXT_PUBLIC_KBR_STATIC_AUDIO=1 apenas com licença resolvida; os fontes em public/audio/ não são apagados.",
  );
  process.exit(1);
}

console.log(
  "[audio-guard] OK: public/audio/ fora do deploy; nenhum MP3 em .next/ ou .vercel/output/.",
);

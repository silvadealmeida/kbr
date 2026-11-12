#!/usr/bin/env node
// Falha o build se MP3 do corpus restrito estiver em diretório publicável.
// Roda em prebuild e postbuild. Só é dispensado com NEXT_PUBLIC_KBR_STATIC_AUDIO=1
// (decisão explícita de distribuir; exige licença resolvida).
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findRestrictedAudio, loadManifest } from "./guard-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

if (process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO === "1") {
  console.warn("[audio-guard] NEXT_PUBLIC_KBR_STATIC_AUDIO=1: áudio estático habilitado, verificação ignorada. Licença: docs/audio/license-audit.md");
  process.exit(0);
}

const hits = findRestrictedAudio(
  ["public", ".next", ".vercel/output"].map((dir) => path.join(root, dir)),
  loadManifest(root),
);

if (hits.length > 0) {
  console.error(`[audio-guard] ${hits.length} arquivo(s) de áudio restrito em diretório publicável:`);
  for (const file of hits.slice(0, 10)) console.error(`  ${path.relative(root, file)}`);
  console.error("Remova com `npm run audio:unstage` (a fonte em restricted-assets/ não é tocada) e refaça o build.");
  process.exit(1);
}
console.log("[audio-guard] OK: nenhum MP3 restrito em public/, .next/ ou .vercel/output.");

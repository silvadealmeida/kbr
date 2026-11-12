#!/usr/bin/env node
// Copia restricted-assets/audio -> public/audio (cópia local, gitignored) para
// testar o áudio estático. NÃO use em deploy sem licença resolvida.
//   NEXT_PUBLIC_KBR_STATIC_AUDIO=1 node scripts/audio/stage-static-audio.mjs        # copia
//   node scripts/audio/stage-static-audio.mjs --clean                               # remove só a cópia
import { createHash } from "node:crypto";
import { cpSync, existsSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadManifest } from "./guard-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const source = path.join(root, "restricted-assets/audio");
const target = path.join(root, "public/audio");

if (process.argv.includes("--clean")) {
  rmSync(target, { recursive: true, force: true }); // só a cópia gitignored
  console.log("public/audio removido (cópia). restricted-assets/ intacto.");
  process.exit(0);
}

if (process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO !== "1") {
  console.error("Recusado: defina NEXT_PUBLIC_KBR_STATIC_AUDIO=1 para confirmar que o áudio estático é intencional.");
  process.exit(1);
}

for (const item of loadManifest(root).items) {
  const file = path.join(source, item.src.replace(/^\/audio\//, ""));
  if (!existsSync(file) || createHash("sha256").update(readFileSync(file)).digest("hex") !== item.sha256) {
    console.error(`Fonte ausente ou corrompida: ${item.src}`);
    process.exit(1);
  }
}
cpSync(source, target, { recursive: true });
console.log("MP3 copiados para public/audio (gitignored). Faça o build com a mesma flag.");

/**
 * Gera o inventário de textos falados a partir do currículo real.
 *
 * Uso: node scripts/audio/build-inventory.mjs
 * Saída: .audio/inventory.json (fora do Git; ver .gitignore)
 *
 * O inventário é a única fonte para a geração dos MP3s. Ele inclui o texto
 * exato (NFC), as referências de origem e as tags usadas na auditoria.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const outputDir = path.join(root, ".audio");
const outputFile = path.join(outputDir, "inventory.json");

const server = await createServer({
  configFile: false,
  root,
  resolve: { alias: { "@": path.join(root, "src") } },
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { HANGUL_CURRICULUM } = await server.ssrLoadModule(
    "/src/content/hangul/index.ts",
  );
  const { A1_IMPLEMENTED_LESSONS, A1_IMPLEMENTED_CHECKPOINTS } =
    await server.ssrLoadModule("/src/content/curriculum/a1/content.ts");
  const { A2_IMPLEMENTED_LESSONS, A2_IMPLEMENTED_CHECKPOINTS } =
    await server.ssrLoadModule("/src/content/curriculum/a2/content.ts");
  const { VOCAB_ENTRIES, VOCAB_SENTENCES } = await server.ssrLoadModule(
    "/src/content/vocabulary/index.ts",
  );
  const { collectAudioInventory } = await server.ssrLoadModule(
    "/src/lib/audio/inventory.ts",
  );
  const { audioKey } = await server.ssrLoadModule("/src/lib/audio/text.ts");

  const courseSteps = [
    ...A1_IMPLEMENTED_LESSONS.map((step) => ({ courseId: "ko-a1", step })),
    ...A1_IMPLEMENTED_CHECKPOINTS.map((step) => ({ courseId: "ko-a1", step })),
    ...A2_IMPLEMENTED_LESSONS.map((step) => ({ courseId: "ko-a2", step })),
    ...A2_IMPLEMENTED_CHECKPOINTS.map((step) => ({ courseId: "ko-a2", step })),
  ];

  // Hangul + A1 + A2. B1 e cursos posteriores usam a voz do sistema até que
  // uma fase própria gere os MP3 deles.
  const AUDIO_COURSES = new Set(["hangul", "ko-a1", "ko-a2"]);
  const vocabulary = VOCAB_ENTRIES.filter((entry) =>
    AUDIO_COURSES.has(entry.course),
  );
  const vocabIds = new Set(vocabulary.map((entry) => entry.id));
  const sentences = VOCAB_SENTENCES.filter((sentence) =>
    vocabIds.has(sentence.vocabId),
  );

  const items = collectAudioInventory(HANGUL_CURRICULUM, {
    courseSteps,
    vocabulary,
    sentences,
  });
  const byKey = new Map();
  const collisions = [];

  for (const item of items) {
    const key = audioKey(item.text);
    const existing = byKey.get(key);
    if (existing && existing !== item.text) {
      collisions.push({ key, a: existing, b: item.text });
    }
    byKey.set(key, item.text);
  }

  if (collisions.length > 0) {
    throw new Error(
      `Colisão de chave de áudio: ${JSON.stringify(collisions, null, 2)}`,
    );
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    curriculumVersion: HANGUL_CURRICULUM.version,
    count: items.length,
    items: items.map((item) => ({
      ...item,
      key: audioKey(item.text),
    })),
  };

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(payload, null, 2)}\n`);

  const byPriority = payload.items.reduce(
    (acc, item) => {
      acc[item.priority] = (acc[item.priority] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const sourceKinds = payload.items.reduce((acc, item) => {
    for (const source of item.sources) {
      const kind = source.split(":", 1)[0];
      acc[kind] = (acc[kind] ?? 0) + 1;
    }
    return acc;
  }, {});

  console.log(
    JSON.stringify(
      {
        output: path.relative(root, outputFile),
        count: payload.count,
        byPriority,
        sourceKinds,
      },
      null,
      2,
    ),
  );
} finally {
  await server.close();
}

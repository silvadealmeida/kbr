/**
 * Normalização mínima para busca de áudio. O texto falado exibido e o texto
 * enviado ao gerador continuam sendo o original do conteúdo; aqui só lidamos
 * com a forma Unicode canônica (NFC) e espaços nas pontas.
 */
export function normalizeAudioText(text: string): string {
  return text.normalize("NFC").trim();
}

/**
 * Chave estável e legível para o arquivo de áudio. FNV-1a de 32 bits é
 * suficiente para um corpus pequeno; colisões são detectadas na geração e no
 * teste do manifesto. O hash criptográfico do conteúdo fica no manifesto.
 */
export function audioKey(text: string): string {
  const bytes = new TextEncoder().encode(normalizeAudioText(text));
  let hash = 0x811c9dc5;
  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193);
  }
  return `ko-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

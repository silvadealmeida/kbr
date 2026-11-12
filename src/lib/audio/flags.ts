/**
 * Os MP3 sintéticos têm licença não resolvida (docs/audio/license-audit.md) e
 * ficam em `restricted-assets/`, fora de `public/`. Só tocam se o build for
 * feito com NEXT_PUBLIC_KBR_STATIC_AUDIO=1 *e* os arquivos forem copiados
 * para `public/audio` (npm run audio:stage). Sem a flag, vale a voz do sistema.
 */
export const STATIC_AUDIO_ENABLED =
  process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO === "1";

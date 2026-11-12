/**
 * O áudio estático é servido por padrão a partir de `public/audio/v1/`.
 * Decisão do dono do projeto (2026-11-12): usar os MP3 sintéticos mesmo com a
 * licença do encoder BERT ainda não esclarecida; ver
 * docs/audio/license-audit.md §7. `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` desliga o
 * asset e força o fallback para a voz do sistema (kill switch de deploy).
 */
export const STATIC_AUDIO_ENABLED =
  process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO !== "0";

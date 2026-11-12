/**
 * A sílaba 한 construída com traços vetoriais, sem fonte coreana na landing.
 * Cada parte (ㅎ, ㅏ, ㄴ) é desenhada em um grupo próprio, na ordem da
 * composição; em reduced motion o bloco aparece completo e estático.
 */
export function HangulComposition() {
  return (
    <svg
      viewBox="0 0 520 540"
      role="img"
      aria-label="Composição da sílaba 한: ㅎ e ㅏ formam 하; ㄴ fecha o bloco."
      className="h-auto w-full text-fg"
    >
      <defs>
        <pattern id="composition-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="var(--line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="36" y="30" width="448" height="448" fill="var(--surface)" stroke="var(--line-strong)" />
      <rect x="36" y="30" width="448" height="448" fill="url(#composition-grid)" />

      {/* Marcas de registro: cantos, eixos e interseções da grade. */}
      <path
        d="M36 16v28M22 30h28M484 16v28M470 30h28M36 464v28M22 478h28M484 464v28M470 478h28"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <path
        d="M68 344v20M58 354h20M330 52v20M320 62h20"
        fill="none"
        stroke="var(--seal)"
        strokeWidth="1.5"
      />
      <circle cx="68" cy="354" r="2.5" fill="var(--seal)" />
      <circle cx="330" cy="62" r="2.5" fill="var(--seal)" />
      <path
        d="M68 354h384M330 62v384"
        fill="none"
        stroke="var(--line-strong)"
        strokeDasharray="4 7"
      />

      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="17"
        className="composition-strokes"
      >
        <g>
          <path pathLength={1} d="M128 112h128M192 112v31M139 160h106" />
        </g>
        <g>
          <circle pathLength={1} cx="192" cy="239" r="55" />
        </g>
        <g>
          <path pathLength={1} d="M348 125v179M348 205h76" />
        </g>
        <g>
          <path pathLength={1} d="M145 365v67h262" />
        </g>
      </g>

      <path d="M36 504h448" stroke="var(--line-strong)" />
      <g fill="var(--muted)" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="1.5">
        <text x="36" y="529">01 / COMPOSIÇÃO</text>
        <text x="484" y="529" textAnchor="end">CONSOANTE + VOGAL + FINAL</text>
      </g>
    </svg>
  );
}

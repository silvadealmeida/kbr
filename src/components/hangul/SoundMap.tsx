import { JAMO } from "@/content/hangul/jamo";

function JamoGroup({
  title,
  items,
}: {
  title: string;
  items: typeof JAMO;
}) {
  return (
    <section aria-labelledby={`sound-map-${title}`} className="mt-4">
      <h3 id={`sound-map-${title}`} className="text-sm font-semibold">
        {title} · {items.length}
      </h3>
      <ul className="mt-2 grid gap-x-4 gap-y-2 sm:grid-cols-2">
        {items.map((jamo) => (
          <li key={jamo.symbol} className="border-t border-line py-2">
            <div className="flex items-baseline justify-between gap-2">
              <span lang="ko" className="font-ko text-xl font-semibold">
                {jamo.symbol}
              </span>
              <span className="mono-data text-muted">{jamo.namePt}</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              <span lang="ko" className="font-ko">
                {jamo.nameKo}
              </span>{" "}
              · {jamo.ipa.join(" / ")} · {jamo.introducedIn}
            </p>
            {jamo.notes ? <p className="mt-1 text-xs">{jamo.notes}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Referência compacta derivada só de `JAMO`: símbolo, nome, IPA, lição de
 * introdução e nota já revisável. Não reproduz áudio por item — a voz do
 * sistema continua disponível no player das lições. O `<details>` nativo
 * mantém a página curta e funciona por teclado/toque sem JavaScript.
 */
export function SoundMap() {
  const consonants = JAMO.filter((jamo) => jamo.kind === "consonant");
  const vowels = JAMO.filter((jamo) => jamo.kind === "vowel");

  return (
    <details className="group border border-line bg-surface p-4 sm:p-5">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold">
        <span>
          Mapa de sons · {JAMO.length} jamo
          <span className="mt-1 block text-sm font-normal text-muted">
            Referência visual do conteúdo: {consonants.length} consoantes e{" "}
            {vowels.length} vogais.
          </span>
        </span>
        <span
          aria-hidden
          className="mono-label shrink-0 border border-line px-2 py-1 text-muted group-open:hidden"
        >
          Abrir
        </span>
        <span
          aria-hidden
          className="mono-label hidden shrink-0 border border-line px-2 py-1 text-muted group-open:inline"
        >
          Fechar
        </span>
      </summary>

      <p className="mt-3 max-w-[65ch] text-sm text-muted">
        Símbolo, nome, IPA e nota vêm dos registros do curso. A ordem segue a
        introdução nas lições; não é uma tabela fonética completa. Transcrições e
        pronúncia continuam em revisão por falante nativo.
      </p>

      <JamoGroup title="Consoantes" items={consonants} />
      <JamoGroup title="Vogais" items={vowels} />
    </details>
  );
}

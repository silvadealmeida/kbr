import { Card } from "./Card";
export function EmptyState({ title, children, glyph }: { title: string; children: React.ReactNode; glyph?: string }) {
  return (
    <Card className="border-dashed py-10 sm:py-12">
      {glyph ? <span lang="ko" aria-hidden className="font-ko text-5xl text-accent">{glyph}</span> : null}
      <p className="mono-label mt-5 text-muted">Em desenvolvimento</p>
      <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-[50ch] leading-relaxed text-muted">{children}</p>
    </Card>
  );
}

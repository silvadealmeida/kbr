import { Card } from "./Card";
export function EmptyState({ title, children, glyph }: { title: string; children: React.ReactNode; glyph?: string }) {
  return (
    <Card className="flex flex-col items-center gap-2 py-10 text-center">
      {glyph && <span lang="ko" aria-hidden className="font-ko text-5xl font-bold text-brand">{glyph}</span>}
      <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-brand">Em desenvolvimento</span>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="max-w-sm text-muted">{children}</p>
    </Card>
  );
}

export function PageHeader({ title, subtitle, ko }: { title: string; subtitle: string; ko?: string }) {
  return (
    <header className="mb-8 border-b border-line pb-6">
      {ko ? <p lang="ko" className="font-ko mb-3 text-base font-medium text-accent">{ko}</p> : null}
      <h1 className="font-display text-h1 font-semibold">{title}</h1>
      <p className="mt-3 max-w-[65ch] leading-relaxed text-muted">{subtitle}</p>
    </header>
  );
}

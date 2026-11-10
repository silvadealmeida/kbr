export function PageHeader({ title, subtitle, ko }: { title: string; subtitle: string; ko?: string }) {
  return (
    <header className="mb-6">
      {ko && <p lang="ko" className="font-ko text-sm font-medium text-brand">{ko}</p>}
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-1 text-muted">{subtitle}</p>
    </header>
  );
}

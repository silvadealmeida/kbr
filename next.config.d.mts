export type SecurityHeader = { key: string; value: string };
export type HeaderGroup = { source: string; headers: SecurityHeader[] };

/** CSP estática aplicada globalmente; depende de `NEXT_PUBLIC_SUPABASE_URL`. */
export function buildContentSecurityPolicy(): string;

declare const nextConfig: {
  poweredByHeader?: boolean;
  headers(): Promise<HeaderGroup[]>;
};

export default nextConfig;

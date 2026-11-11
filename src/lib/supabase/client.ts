import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "./config";

let browserClient: SupabaseClient | null | undefined;
let browserClientPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Carrega o SDK do Supabase sob demanda. As páginas públicas não precisam dele
 * no bundle inicial; a primeira chamada (já no navegador) resolve o cliente.
 */
export function getBrowserSupabaseClient(): Promise<SupabaseClient | null> {
  if (browserClient !== undefined) return Promise.resolve(browserClient);

  if (!browserClientPromise) {
    browserClientPromise = (async () => {
      const config = getSupabasePublicConfig();
      if (!config) {
        browserClient = null;
        return browserClient;
      }

      const { createBrowserClient } = await import("@supabase/ssr");
      browserClient = createBrowserClient(config.url, config.publishableKey);
      return browserClient;
    })();
  }

  return browserClientPromise;
}

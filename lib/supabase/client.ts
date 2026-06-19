import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./env";

/**
 * Browser Supabase client. Returns null when env vars are missing so pages
 * can fall back to placeholder/demo data without crashing.
 */
export function createClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  return createBrowserClient(config.url, config.anonKey);
}

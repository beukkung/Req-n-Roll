import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./env";

/**
 * Build-time/static Supabase client for static-safe rendering.
 * It uses the public anon key and does not touch cookies or server sessions.
 */
export function createStaticClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  return createSupabaseClient(config.url, config.anonKey);
}

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./env";

/**
 * Server Supabase client (respects RLS user context via cookies).
 * Returns null when env vars are missing so server components can render
 * with placeholder data during the no-backend phase.
 */
export async function createClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();
  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — safe to ignore when middleware
          // refreshes the session.
        }
      },
    },
  });
}

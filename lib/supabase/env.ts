export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

/**
 * Read Supabase configuration from environment.
 * Returns null when not configured so the UI can render a graceful fallback
 * (the project is in internal beta and may run without a live backend).
 */
export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

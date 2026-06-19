import type { SupabaseClient } from "@supabase/supabase-js";
import { cleanNickname } from "../nickname";

export function normalizeRemoteNickname(nickname?: string): string | null {
  if (!nickname) return null;
  const clean = cleanNickname(nickname);
  return clean.length > 0 ? clean : null;
}

/**
 * Metrics tables reference nick_profiles. Ensure a lightweight profile row
 * exists before recording telemetry, without overwriting real XP/profile data.
 */
export async function ensureNickProfile(
  supabase: SupabaseClient,
  nickname: string,
): Promise<string | null> {
  const clean = normalizeRemoteNickname(nickname);
  if (!clean) return null;

  await supabase.from("nick_profiles").upsert(
    {
      nickname: clean,
      display_name: clean,
    },
    { onConflict: "nickname", ignoreDuplicates: true },
  );

  return clean;
}

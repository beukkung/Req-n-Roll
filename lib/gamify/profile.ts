import { readJSON, writeJSON } from "../storage";
import { bangkokDayKey } from "../daily-req";
import { levelFromTotalXp } from "./levels";
import { evaluateBadges } from "./badges";
import type { AwardResult, Profile, XpKind } from "./types";
import type { PersonaSlug } from "../types";

export const PROFILE_KEY = "reqn-roll:profile";

const XP_REWARDS: Record<XpKind, number> = {
  skill_amp: 100,
  daily_req: 30,
  req_gym: 40,
  template: 10,
  feedback: 15,
};

export function defaultProfile(): Profile {
  return {
    totalXp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    lastActiveDay: null,
    badges: [],
    personaSlug: null,
    displayName: "คุณ",
    stats: {
      ampCount: 0,
      dailyCount: 0,
      gymSets: 0,
      gymAreas: [],
      templateCount: 0,
      feedbackCount: 0,
    },
    updatedMs: Date.now(),
  };
}

export function loadProfile(): Profile {
  const stored = readJSON<Profile>(PROFILE_KEY);
  if (!stored) return defaultProfile();
  return {
    ...defaultProfile(),
    ...stored,
    stats: { ...defaultProfile().stats, ...stored.stats },
    badges: stored.badges ?? [],
  };
}

export function saveProfile(profile: Profile): void {
  writeJSON(PROFILE_KEY, { ...profile, updatedMs: Date.now() });
}

function yesterdayKey(): string {
  return bangkokDayKey(new Date(Date.now() - 86400000));
}

export type AwardOptions = {
  area?: string;
  personaSlug?: PersonaSlug;
  ref?: string;
};

/** Pure: compute the next profile + what changed. No I/O. */
export function computeAward(
  prev: Profile,
  kind: XpKind,
  opts: AwardOptions = {},
): AwardResult {
  const profile: Profile = {
    ...prev,
    stats: {
      ...prev.stats,
      gymAreas: [...prev.stats.gymAreas],
    },
    badges: [...prev.badges],
  };

  // 1. base XP (retaking Skill Amp awards less)
  const amount =
    kind === "skill_amp" && prev.stats.ampCount > 0 ? 25 : XP_REWARDS[kind];

  // 2. stats
  switch (kind) {
    case "skill_amp":
      profile.stats.ampCount += 1;
      if (opts.personaSlug) profile.personaSlug = opts.personaSlug;
      break;
    case "daily_req":
      profile.stats.dailyCount += 1;
      break;
    case "req_gym":
      profile.stats.gymSets += 1;
      if (opts.area && !profile.stats.gymAreas.includes(opts.area)) {
        profile.stats.gymAreas.push(opts.area);
      }
      break;
    case "template":
      profile.stats.templateCount += 1;
      break;
    case "feedback":
      profile.stats.feedbackCount += 1;
      break;
  }

  // 3. streak — first activity of a Bangkok day keeps/extends it
  const today = bangkokDayKey();
  let bonusXp = 0;
  if (prev.lastActiveDay !== today) {
    profile.streak =
      prev.lastActiveDay === yesterdayKey() ? prev.streak + 1 : 1;
    bonusXp = 5;
  }
  profile.longestStreak = Math.max(prev.longestStreak, profile.streak);
  profile.lastActiveDay = today;

  // 4. total XP + level
  const prevLevel = profile.level;
  profile.totalXp = prev.totalXp + amount + bonusXp;
  profile.level = levelFromTotalXp(profile.totalXp).level;

  // 5. badges
  const earned = evaluateBadges(profile);
  const newBadges = earned.filter((b) => !profile.badges.includes(b));
  profile.badges = earned;

  return {
    profile,
    xpGained: amount + bonusXp,
    leveledUp: profile.level > prevLevel,
    newBadges,
  };
}

export type LeaderboardRow = {
  nickname: string;
  displayName: string;
  totalXp: number;
  level: number;
  streak: number;
  personaSlug: PersonaSlug | null;
  isYou?: boolean;
};

/**
 * Best-effort remote sync, keyed by NICKNAME (no account/auth required).
 * Silent in demo (no Supabase configured) — localStorage is the source of
 * truth for the UI. Only syncs when a nickname exists.
 */
export async function persistRemote(
  profile: Profile,
  kind: XpKind | undefined,
  amount: number,
  nickname?: string,
): Promise<void> {
  if (!nickname) return;
  const { createClient } = await import("../supabase/client");
  const supabase = createClient();
  if (!supabase) return;
  await supabase.from("nick_profiles").upsert(
    {
      nickname,
      display_name: profile.displayName,
      total_xp: profile.totalXp,
      level: profile.level,
      streak: profile.streak,
      longest_streak: profile.longestStreak,
      last_active_day: profile.lastActiveDay,
      persona_slug: profile.personaSlug,
      badges: profile.badges,
    },
    { onConflict: "nickname" },
  );
  if (kind) {
    await supabase.from("xp_events").insert({
      nickname,
      kind,
      amount,
    });
  }
}

export async function getLeaderboard(
  meNickname?: string,
): Promise<{
  rows: LeaderboardRow[];
  remote: boolean;
}> {
  const { createClient } = await import("../supabase/client");
  const supabase = createClient();
  if (!supabase) return { rows: [], remote: false };
  const { data, error } = await supabase
    .from("nick_profiles")
    .select(
      "nickname, display_name, total_xp, level, streak, persona_slug",
    )
    .order("total_xp", { ascending: false })
    .limit(50);
  if (error || !data) return { rows: [], remote: true };
  return {
    rows: (data ?? []).map((r: Record<string, unknown>) => ({
      nickname: String(r.nickname ?? ""),
      displayName: String(r.display_name ?? r.nickname ?? "ผู้เล่น"),
      totalXp: Number(r.total_xp ?? 0),
      level: Number(r.level ?? 1),
      streak: Number(r.streak ?? 0),
      personaSlug: (r.persona_slug as PersonaSlug | null) ?? null,
      isYou:
        !!meNickname &&
        String(r.nickname).toLowerCase() === meNickname.toLowerCase(),
    })),
    remote: true,
  };
}

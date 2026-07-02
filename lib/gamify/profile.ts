import { readJSON, writeJSON } from "../storage";
import { bangkokDayKey } from "../daily-req";
import { levelFromTotalXp } from "./levels";
import { evaluateBadges } from "./badges";
import type { AreaBest, AwardResult, Profile, XpKind } from "./types";
import type { PersonaSlug } from "../types";

export const PROFILE_KEY = "reqn-roll:profile";
export const DAILY_PRACTICE_XP_GOAL = 120;

const XP_REWARDS: Record<XpKind, number> = {
  skill_amp: 100,
  daily_req: 30,
  req_gym: 40,
  role_play: 50,
  req_doctor: 35,
  coach_bot: 20,
  template: 10,
  feedback: 15,
  ba_assessment: 30,
};

const MEANINGFUL_DRILLS = new Set<XpKind>([
  "skill_amp",
  "daily_req",
  "req_gym",
  "role_play",
  "req_doctor",
  "coach_bot",
  "ba_assessment",
]);

export function defaultProfile(): Profile {
  return {
    totalXp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    lastActiveDay: null,
    dailyXp: 0,
    lastPracticeDate: null,
    dailyGoalMetDay: null,
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
      rolePlayCount: 0,
      reqDoctorCount: 0,
      coachBotCount: 0,
      baAssessmentCount: 0,
      completedTrackSteps: [],
      gymBestByArea: {},
      gymAttemptsByArea: {},
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
  /** latest attempt score (req_gym / daily_req) — drives per-area best + log */
  score?: number;
  total?: number;
};

/** Pure: compute the next profile + what changed. No I/O. */
export function computeAward(
  prev: Profile,
  kind: XpKind,
  opts: AwardOptions = {},
): AwardResult {
  // Drop null/undefined stat values from the stored profile so a migrated
  // or corrupted field (e.g. an old NaN->null counter) does not override the
  // default. Only defined values win over defaults.
  const cleanStats = Object.fromEntries(
    Object.entries(prev.stats).filter(([, value]) => value != null),
  );
  const profile: Profile = {
    ...prev,
    stats: {
      ...defaultProfile().stats,
      ...cleanStats,
      gymAreas: [...(prev.stats.gymAreas ?? [])],
      completedTrackSteps: [...(prev.stats.completedTrackSteps ?? [])],
      gymBestByArea: { ...(prev.stats.gymBestByArea ?? {}) },
      gymAttemptsByArea: { ...(prev.stats.gymAttemptsByArea ?? {}) },
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
      if (
        opts.area &&
        opts.score != null &&
        opts.total != null &&
        opts.total > 0
      ) {
        const bestByArea = profile.stats.gymBestByArea ?? {};
        const attemptsByArea = profile.stats.gymAttemptsByArea ?? {};
        const prevBest = bestByArea[opts.area];
        const prevPct =
          prevBest && prevBest.total > 0
            ? prevBest.score / prevBest.total
            : -1;
        const newPct = opts.score / opts.total;
        const best: AreaBest =
          newPct >= prevPct
            ? { score: opts.score, total: opts.total }
            : (prevBest as AreaBest);
        bestByArea[opts.area] = best;
        attemptsByArea[opts.area] = (attemptsByArea[opts.area] ?? 0) + 1;
        profile.stats.gymBestByArea = bestByArea;
        profile.stats.gymAttemptsByArea = attemptsByArea;
      }
      break;
    case "role_play":
      profile.stats.rolePlayCount += 1;
      break;
    case "req_doctor":
      profile.stats.reqDoctorCount += 1;
      break;
    case "coach_bot":
      profile.stats.coachBotCount += 1;
      break;
    case "ba_assessment":
      profile.stats.baAssessmentCount += 1;
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
  const dailyXpBefore = prev.lastPracticeDate === today ? (prev.dailyXp ?? 0) : 0;
  profile.dailyXp = dailyXpBefore + amount;
  profile.lastPracticeDate = today;
  profile.lastActiveDay = today;

  let bonusXp = 0;
  const goalMet = MEANINGFUL_DRILLS.has(kind) || profile.dailyXp >= DAILY_PRACTICE_XP_GOAL;
  if (goalMet && prev.dailyGoalMetDay !== today) {
    profile.streak =
      prev.dailyGoalMetDay === yesterdayKey() ? prev.streak + 1 : 1;
    bonusXp = 5;
    profile.dailyGoalMetDay = today;
  }
  profile.longestStreak = Math.max(prev.longestStreak, profile.streak);

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

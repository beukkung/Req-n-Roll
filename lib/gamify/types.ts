import type { PersonaSlug } from "@/lib/types";

export type XpKind =
  | "skill_amp"
  | "daily_req"
  | "req_gym"
  | "role_play"
  | "req_doctor"
  | "coach_bot"
  | "template"
  | "feedback"
  | "ba_assessment";

export type BadgeId =
  | "first_amp"
  | "first_daily"
  | "first_gym"
  | "gym_all"
  | "streak_3"
  | "streak_7"
  | "streak_30"
  | "template_use"
  | "feedback"
  | "level_5"
  | "level_10"
  | "breed_persian"
  | "breed_bengal"
  | "breed_mainecoon"
  | "breed_siamese"
  | "breed_abyssinian";

export type Badge = {
  id: BadgeId;
  nameTh: string;
  descTh: string;
  /** lucide icon name (resolved in the badge component) */
  icon: string;
};

export type AreaBest = { score: number; total: number };

export type ProfileStats = {
  ampCount: number;
  dailyCount: number;
  gymSets: number;
  gymAreas: string[];
  templateCount: number;
  feedbackCount: number;
  rolePlayCount: number;
  reqDoctorCount: number;
  coachBotCount: number;
  baAssessmentCount: number;
  completedTrackSteps: string[];
  /**
   * Best score/total per Req Gym area (set id). Optional so older local
   * profiles migrate cleanly; consumers read with `?? {}`.
   */
  gymBestByArea?: Record<string, AreaBest>;
  /** Attempt count per Req Gym area (set id). */
  gymAttemptsByArea?: Record<string, number>;
};

export type Profile = {
  totalXp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastActiveDay: string | null;
  dailyXp: number;
  lastPracticeDate: string | null;
  dailyGoalMetDay: string | null;
  badges: BadgeId[];
  personaSlug: PersonaSlug | null;
  displayName: string;
  stats: ProfileStats;
  updatedMs: number;
};

export type AwardResult = {
  profile: Profile;
  xpGained: number;
  leveledUp: boolean;
  newBadges: BadgeId[];
};

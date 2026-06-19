import { readJSON, writeJSON } from "./storage";
import { ensureNickProfile } from "./supabase/nickname-profile";

export const FEEDBACK_KEY = "reqn-roll:feedback-last";

export type FeedbackCategory =
  | "skill_amp"
  | "daily_req"
  | "req_gym"
  | "templates"
  | "bug"
  | "idea"
  | "other";

export type FeedbackEntry = {
  rating: number;
  usedForRealWork: boolean;
  category: FeedbackCategory;
  comment: string;
  createdAt: string;
};

export const FEEDBACK_CATEGORIES: { value: FeedbackCategory; label: string }[] =
  [
    { value: "skill_amp", label: "Skill Amp" },
    { value: "daily_req", label: "Daily Req" },
    { value: "req_gym", label: "Req Gym" },
    { value: "templates", label: "Setlist Templates" },
    { value: "idea", label: "ไอเดียฟีเจอร์ใหม่" },
    { value: "bug", label: "พบปัญหา / Bug" },
    { value: "other", label: "อื่น ๆ" },
  ];

export function saveFeedback(entry: FeedbackEntry): void {
  writeJSON(FEEDBACK_KEY, entry);
}

export function getLastFeedback(): FeedbackEntry | null {
  return readJSON<FeedbackEntry>(FEEDBACK_KEY);
}

export async function persistFeedback(
  entry: FeedbackEntry,
  nickname?: string,
): Promise<void> {
  const { createClient } = await import("./supabase/client");
  const supabase = createClient();
  if (!supabase) return;
  const clean = nickname
    ? await ensureNickProfile(supabase, nickname)
    : null;
  await supabase.from("feedback").insert({
    nickname: clean,
    rating: entry.rating,
    used_for_real_work: entry.usedForRealWork,
    category: entry.category,
    comment: entry.comment,
  });
}

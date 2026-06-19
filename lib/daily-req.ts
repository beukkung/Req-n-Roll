import { DAILY_REQ_QUESTIONS } from "./content";
import type { DailyReqQuestion } from "./types";
import { seededShuffle } from "./storage";
import { ensureNickProfile } from "./supabase/nickname-profile";

export const DAILY_REQ_COMPLETION_KEY = "reqn-roll:daily-req-last";

/** Stable "today" in ICT (UTC+7) so the daily set flips at midnight Bangkok time. */
export function bangkokDayKey(date = new Date()): string {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const ict = new Date(utc + 7 * 3600000);
  return ict.toISOString().slice(0, 10);
}

function daySeed(dayKey: string): number {
  let h = 2166136261;
  for (let i = 0; i < dayKey.length; i++) {
    h ^= dayKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 3–5 questions per day, deterministic per Bangkok day, cycling the bank. */
export function getDailyReqQuestions(
  count = 4,
  questions: readonly DailyReqQuestion[] = DAILY_REQ_QUESTIONS,
): DailyReqQuestion[] {
  const key = bangkokDayKey();
  const pool = seededShuffle(questions, daySeed(key));
  return pool.slice(0, Math.min(count, pool.length));
}

export type DailyReqCompletion = { day: string; score: number; total: number };

export function getDailyReqCompletion(): DailyReqCompletion | null {
  return readCompletion();
}

function readCompletion(): DailyReqCompletion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DAILY_REQ_COMPLETION_KEY);
    return raw ? (JSON.parse(raw) as DailyReqCompletion) : null;
  } catch {
    return null;
  }
}

export function saveDailyReqCompletion(c: DailyReqCompletion): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DAILY_REQ_COMPLETION_KEY, JSON.stringify(c));
  } catch {
    /* no-op */
  }
}

export async function persistDailyReqCompletion(
  c: DailyReqCompletion,
  nickname?: string,
): Promise<void> {
  const { createClient } = await import("./supabase/client");
  const supabase = createClient();
  if (!supabase) return;
  const clean = await ensureNickProfile(supabase, nickname ?? "");
  if (!clean) return;
  await supabase.from("daily_req_completions").upsert(
    {
      nickname: clean,
      date: c.day,
      score: c.score,
      total: c.total,
    },
    { onConflict: "nickname,date" },
  );
}

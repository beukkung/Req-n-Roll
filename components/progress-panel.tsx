"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame, ArrowRight, Sparkles, Trophy } from "lucide-react";
import { useGamify } from "./gamify-context";
import { LevelRing } from "./level-ring";
import { Mascot } from "./mascot/mascot";
import { BadgeTile } from "./badge-tile";
import { BADGE_MAP } from "@/lib/gamify/badges";
import { PERSONAS } from "@/lib/content";
import { tierForLevel } from "@/lib/gamify/levels";
import { nextAction } from "@/lib/gamify/next-action";
import { DAILY_PRACTICE_XP_GOAL, getLeaderboard } from "@/lib/gamify/profile";
import { useJSON } from "@/lib/use-store";
import {
  bangkokDayKey,
  DAILY_REQ_COMPLETION_KEY,
  type DailyReqCompletion,
} from "@/lib/daily-req";
import { SKILL_AMP_RESULT_KEY, type SkillAmpResult } from "@/lib/skill-amp";

export function ProgressPanel() {
  const { profile, level, nickname } = useGamify();
  const persona = profile.personaSlug
    ? PERSONAS.find((p) => p.slug === profile.personaSlug)
    : null;
  const tier = tierForLevel(level.level);
  const recentBadges = profile.badges.slice(-3).reverse();
  const started = profile.totalXp > 0;

  // Personalization inputs for the "Continue" CTA.
  const skillAmpResult = useJSON<SkillAmpResult | null>(
    SKILL_AMP_RESULT_KEY,
    null,
  );
  const dailyCompletion = useJSON<DailyReqCompletion | null>(
    DAILY_REQ_COMPLETION_KEY,
    null,
  );
  const todayKey = bangkokDayKey();
  const dailyDoneToday = dailyCompletion?.day === todayKey;
  const todayPracticeXp =
    profile.lastPracticeDate === todayKey ? (profile.dailyXp ?? 0) : 0;
  const dailyGoalMet = profile.dailyGoalMetDay === todayKey;
  const todayPracticeProgress = Math.min(
    100,
    Math.round((todayPracticeXp / DAILY_PRACTICE_XP_GOAL) * 100),
  );

  const action = nextAction({
    ampCount: profile.stats.ampCount,
    dailyDoneToday,
    skillScores: skillAmpResult?.scores,
    practicedAreas: profile.stats.gymAreas,
  });

  // Leaderboard rank nudge (remote only; null in demo/offline).
  const [rank, setRank] = useState<number | null>(null);
  useEffect(() => {
    if (!nickname) return;
    let active = true;
    void getLeaderboard(nickname).then((d) => {
      if (!active || !d.remote) return;
      const idx = d.rows.findIndex((r) => r.isYou);
      if (idx >= 0) setRank(idx + 1);
    });
    return () => {
      active = false;
    };
  }, [nickname]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: mascot + progress */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex justify-center">
            <Mascot
              state={level.level >= 8 ? "rock" : "idle"}
              size="lg"
              className="animate-pop"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-600 text-primary">
              เวทีของคุณ · {tier.nameTh}
            </p>
            <h2 className="mt-1 font-display text-2xl font-700 tracking-tight">
              {started ? `Lv ${level.level} · ${level.title}` : "พร้อมขึ้นเวทีไหม?"}
            </h2>
            <p className="mt-1 text-sm text-foreground/70">
              {started
                ? persona
                  ? `บุคลิกของคุณคือ${persona.nameTh}`
                  : "ทำต่อเพื่อเก็บ XP และตราใหม่"
                : "เริ่มจาก Daily Req วันนี้ แล้วสะสม XP ไปเรื่อย ๆ"}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <LevelRing
                level={level.level}
                progress={level.progress}
                size={52}
                stroke={5}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-600 text-foreground">
                    {level.intoLevel} / {level.neededForNext} XP
                  </span>
                  <span>ถัดไป Lv {level.level + 1}</span>
                </div>
                <div
                  className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-label="ความคืบหน้า XP"
                  aria-valuenow={Math.round(level.progress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${Math.max(4, level.progress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {profile.streak > 0 ? (
                <p className="inline-flex items-center gap-1.5 text-sm font-600 text-primary">
                  <Flame className="h-4 w-4" /> ติดต่อกัน {profile.streak} วัน
                </p>
              ) : null}
              {rank != null ? (
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-1.5 text-sm font-600 text-foreground/70 transition-colors hover:text-primary"
                >
                  <Trophy className="h-4 w-4" /> อยู่อันดับที่ {rank}
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right: recent badges / CTA */}
        <div className="flex flex-col justify-center rounded-xl border border-border bg-secondary/40 p-4 sm:p-5">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              Today&apos;s Practice
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-secondary px-2 py-3">
                <p className="text-lg font-700 text-foreground">{todayPracticeXp}</p>
                <p className="text-[11px] font-600 text-muted-foreground">XP today</p>
              </div>
              <div className="rounded-lg bg-secondary px-2 py-3">
                <p className="text-lg font-700 text-foreground">
                  {DAILY_PRACTICE_XP_GOAL}
                </p>
                <p className="text-[11px] font-600 text-muted-foreground">
                  daily goal
                </p>
              </div>
              <div className="rounded-lg bg-secondary px-2 py-3">
                <p className="text-lg font-700 text-foreground">{profile.streak}</p>
                <p className="text-[11px] font-600 text-muted-foreground">streak</p>
              </div>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-label="Today's practice XP"
              aria-valuenow={todayPracticeProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-500"
                style={{ width: `${Math.max(4, todayPracticeProgress)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {dailyGoalMet
                ? "Daily threshold met. Keep the loop warm with one more drill."
                : "Streak counts after one meaningful drill or enough XP today."}
            </p>
          </div>

          {recentBadges.length > 0 ? (
            <>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-600">
                <Sparkles className="h-4 w-4 text-primary" /> ตราล่าสุด
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {recentBadges.map((id) => {
                  const b = BADGE_MAP[id];
                  return (
                    <BadgeTile
                      key={id}
                      icon={b.icon}
                      nameTh={b.nameTh}
                      descTh={b.descTh}
                      unlocked
                      size="sm"
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p className="font-600">ยังไม่มีตรา</p>
              <p className="mt-1 text-sm text-foreground/70">
                ทำกิจกรรมต่าง ๆ เพื่อปลดล็อกตราและเลื่อนเลเวลของแมวร็อคสตาร์
              </p>
            </>
          )}

          <Link
            href={action.href}
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {action.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tracklist"
            className="mt-2 inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
          >
            Open Tracklist
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {action.sub}
          </p>
        </div>
      </div>
    </section>
  );
}

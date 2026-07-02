"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ListMusic, Sparkles } from "lucide-react";
import { useGamify } from "@/components/gamify-context";
import { PathProgressBadge, type PathProgressStatus } from "@/components/path-progress-badge";
import { XpRewardHint } from "@/components/xp-reward-hint";
import { useJSON } from "@/lib/use-store";
import {
  bangkokDayKey,
  DAILY_REQ_COMPLETION_KEY,
  type DailyReqCompletion,
} from "@/lib/daily-req";
import { rankSkills } from "@/lib/persona";
import { SKILL_AMP_RESULT_KEY, type SkillAmpResult } from "@/lib/skill-amp";
import {
  getRecommendedLearningTrack,
  type LearningTrack,
  type TrackStep,
} from "@/lib/tracklist";
import type { Profile } from "@/lib/gamify/types";

function isStepDone(
  step: TrackStep,
  profile: Profile,
  dailyDoneToday: boolean,
): boolean {
  if (profile.stats.completedTrackSteps?.includes(step.id)) return true;
  if (step.href === "/skill-amp") return profile.stats.ampCount > 0;
  if (step.href === "/daily-req") return dailyDoneToday || profile.stats.dailyCount > 0;
  if (step.href === "/req-gym") return profile.stats.gymSets > 0;
  if (step.href === "/role-play") return profile.stats.rolePlayCount > 0;
  if (step.href === "/req-doctor") return profile.stats.reqDoctorCount > 0;
  if (step.href === "/coach-bot") return profile.stats.coachBotCount > 0;
  if (step.href === "/templates") return profile.stats.templateCount > 0;
  return false;
}

function progressStatus(doneCount: number, total: number): PathProgressStatus {
  if (doneCount <= 0) return "not-started";
  if (doneCount >= total) return "done";
  return "in-progress";
}

function estimateTrackDuration(track: LearningTrack): string {
  const minutes = track.steps.reduce((sum, step) => {
    const match = step.duration.match(/(\d+)\s*min/i);
    return sum + (match ? Number(match[1]) : 0);
  }, 0);
  return minutes > 0 ? `${minutes} min` : `${track.steps.length} drills`;
}

export function TracklistBoard({ tracks }: { tracks: LearningTrack[] }) {
  const { profile } = useGamify();
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
  const weakestSkill = skillAmpResult?.scores
    ? rankSkills(skillAmpResult.scores).at(-1)?.skill.slug
    : null;
  const recommended = getRecommendedLearningTrack({
    weakestSkill,
    practicedAreas: profile.stats.gymAreas,
    dailyDoneToday,
  });

  return (
    <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
      <div className="rounded-xl border border-primary/30 bg-primary/8 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-1.5 text-xs font-700 uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Recommended next
            </p>
            <h2 className="mt-2 font-display text-2xl font-700">
              {recommended.title}
            </h2>
            <p className="mt-2 text-sm text-foreground/75">
              {recommended.recommendedBecause}
            </p>
            <p className="mt-2 text-sm font-600 text-foreground">
              Checkpoint: {recommended.checkpoint}
            </p>
          </div>
          <Link
            href={recommended.steps[0]?.href ?? "/skill-amp"}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start path <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {tracks.map((track) => {
          const isRecommended = track.id === recommended.id;
          const completedCount = track.steps.filter((step) =>
            isStepDone(step, profile, dailyDoneToday),
          ).length;
          const status = progressStatus(completedCount, track.steps.length);
          return (
            <article
              key={track.id}
              className={`flex flex-col rounded-xl border bg-card p-5 ${
                isRecommended ? "border-primary/50" : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                  {isRecommended ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <ListMusic className="h-5 w-5" />
                  )}
                </span>
                <div>
                  <h2 className="text-lg font-700">{track.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {track.audience}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PathProgressBadge status={status} />
                    <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-700 text-muted-foreground">
                      {completedCount}/{track.steps.length} drills
                    </span>
                    <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-700 text-muted-foreground">
                      {estimateTrackDuration(track)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm font-600 text-primary">
                {track.bankingFocus}
              </p>
              <p className="mt-2 text-sm text-foreground/75">{track.goal}</p>

              <div className="mt-4 rounded-lg border border-border bg-background p-3 text-xs leading-5 text-foreground/70">
                <p>
                  <span className="font-700 text-foreground">Why: </span>
                  {track.recommendedBecause}
                </p>
                <p className="mt-1">
                  <span className="font-700 text-foreground">Unlock: </span>
                  {track.unlockCondition}
                </p>
                <p className="mt-1">
                  <span className="font-700 text-foreground">Review: </span>
                  {track.reviewCadence}
                </p>
                <p className="mt-1">
                  <span className="font-700 text-foreground">Checkpoint: </span>
                  {track.checkpoint}
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {track.steps.map((step, index) => (
                  <Link
                    key={step.id}
                    href={step.href}
                    className="group rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/50 hover:bg-primary/6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-700 text-muted-foreground">
                        {String(index + 1).padStart(2, "0")} · {step.duration}
                      </p>
                      <div className="flex shrink-0 items-center gap-2">
                        {isStepDone(step, profile, dailyDoneToday) ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XpRewardHint xp={step.xpReward} label="XP" />
                        )}
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                    </div>
                    <h3 className="mt-1 text-sm font-700">{step.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-foreground/70">
                      {step.outcome}
                    </p>
                    <p className="mt-2 text-xs font-600 text-primary">
                      {step.reason}
                    </p>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

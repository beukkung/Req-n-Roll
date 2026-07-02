"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useGamify } from "@/components/gamify-context";
import { XpRewardHint } from "@/components/xp-reward-hint";

export type ReqGymSetInfo = {
  id: string;
  nameTh: string;
  shortTh: string;
  /** questions available for this set */
  count: number;
  /** questions per random round */
  setSize: number;
  /** the "mock" (all-area shuffle) set is not an area */
  mock?: boolean;
};

/**
 * Req Gym set cards with per-area progress. The page (server) prepares the
 * serializable set info; this client component overlays progress from the
 * local gamify profile (areas practised + best score).
 */
export function ReqGymSetList({ sets }: { sets: ReqGymSetInfo[] }) {
  const { profile } = useGamify();
  const practiced = new Set(profile.stats.gymAreas ?? []);
  const bestByArea = profile.stats.gymBestByArea ?? {};
  const attemptsByArea = profile.stats.gymAttemptsByArea ?? {};

  const practisedAreas = sets.filter((s) => !s.mock && practiced.has(s.id))
    .length;
  const areaCount = sets.filter((s) => !s.mock).length;

  return (
    <div>
      {areaCount > 0 ? (
        <p className="mb-4 text-sm font-600 text-muted-foreground">
          ฝึกแล้ว {practisedAreas}/{areaCount} areas
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {sets.map((set) => {
          const isArea = !set.mock;
          const done = isArea && practiced.has(set.id);
          const best = bestByArea[set.id];
          const attempts = attemptsByArea[set.id] ?? 0;
          return (
            <Link
              key={set.id}
              href={`/req-gym/practice/${set.id}`}
              className="group flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display text-lg font-700">{set.nameTh}</h2>
                  {done ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-600 text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" /> ฝึกแล้ว
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-foreground/70">{set.shortTh}</p>
              </div>
              <div className="flex items-end justify-between gap-2">
                <div className="text-xs text-muted-foreground">
                  <p className="font-600 text-foreground">
                    สุ่ม {set.setSize} ข้อ/รอบ · จากคลัง {set.count} ข้อ
                  </p>
                  <div className="mt-2">
                    <XpRewardHint xp={40} label="XP per round" />
                  </div>
                  {done && best ? (
                    <p className="mt-1 inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span>ดีที่สุด {best.score}/{best.total}</span>
                      {attempts > 1 ? (
                        <span className="text-muted-foreground">
                          · ฝึก {attempts} ครั้ง
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/12 text-primary transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

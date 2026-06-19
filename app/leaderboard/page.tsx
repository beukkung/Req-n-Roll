"use client";

import { useEffect, useState } from "react";
import { Trophy, Flame, Crown } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BreedCat } from "@/components/mascot/breed-cat";
import { useGamify } from "@/components/gamify-context";
import { getLeaderboard, type LeaderboardRow } from "@/lib/gamify/profile";
import { PERSONAS } from "@/lib/content";
import { TIERS, tierForLevel } from "@/lib/gamify/levels";
import { cn } from "@/lib/utils";

const TIER_STYLE: Record<string, string> = {
  bronze: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  silver: "bg-slate-400/15 text-slate-600 border-slate-400/30",
  gold: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  platinum: "bg-violet-500/15 text-violet-700 border-violet-500/30",
};

export default function LeaderboardPage() {
  const { profile, nickname } = useGamify();
  const [data, setData] = useState<{
    rows: LeaderboardRow[];
    remote: boolean;
  } | null>(null);

  useEffect(() => {
    let active = true;
    getLeaderboard(nickname || undefined).then((d) => {
      if (active) setData(d);
    });
    return () => {
      active = false;
    };
  }, [nickname]);

  const remote = data?.remote && (data?.rows.length ?? 0) > 0;
  const rows: LeaderboardRow[] = remote
    ? data!.rows
    : [
        {
          nickname: nickname || "me",
          displayName: profile.displayName,
          totalXp: profile.totalXp,
          level: profile.level,
          streak: profile.streak,
          personaSlug: profile.personaSlug,
          isYou: true,
        },
      ];

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="จัดอันดับ"
        title="เวทีร็อคแห่งปี"
        description="สะสม XP แล้วขยับขึ้นลีก — บรอนซ์ · ซิลเวอร์ · โกลด์ · แพลทินัม แข่งกันเป็นแมวร็อคสตาร์ที่เท่ที่สุดในทีม"
      >
        <ul className="mt-4 flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <li
              key={t.key}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-600",
                TIER_STYLE[t.key],
              )}
            >
              {t.nameTh} · Lv {t.min}
              {t.max < 999 ? `-${t.max}` : "+"}
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="mx-auto mt-8 w-full max-w-3xl px-4 sm:px-6">
        {!remote ? (
          <p className="mb-4 rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
            โหมดทดลอง: ยังไม่ได้เชื่อมฐานข้อมูล — อันดับจะแสดงเฉพาะคุณ
            เมื่อเปิดใช้งาน Supabase แล้วจะเห็นอันดับของทุกคนที่ตั้งชื่อเล่นในทีม
          </p>
        ) : null}

        <ol className="space-y-2">
          {rows.map((r, i) => {
            const persona = r.personaSlug
              ? PERSONAS.find((p) => p.slug === r.personaSlug)
              : null;
            const tier = tierForLevel(r.level);
            return (
              <li
                key={r.nickname || i}
                className={cn(
                  "flex items-center gap-3 rounded-xl border bg-card p-3 sm:p-4",
                  r.isYou ? "border-primary/50 ring-1 ring-primary/30" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-700",
                    i === 0
                      ? "bg-yellow-500/20 text-yellow-700"
                      : "bg-secondary text-foreground/70",
                  )}
                >
                  {i === 0 ? <Crown className="h-4 w-4" /> : i + 1}
                </span>

                {persona ? (
                  <BreedCat
                    breed={persona.breedSlug}
                    className="h-10 w-10 shrink-0"
                    title={persona.nameTh}
                  />
                ) : (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-600">
                    {r.displayName}
                    {r.isYou ? (
                      <span className="ml-2 text-xs font-600 text-primary">
                        (คุณ)
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lv {r.level} · {tier.nameTh}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  {r.streak > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-primary">
                      <Flame className="h-4 w-4" />
                      {r.streak}
                    </span>
                  ) : null}
                  <span className="font-display font-700">{r.totalXp}</span>
                  <span className="text-xs text-muted-foreground">XP</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

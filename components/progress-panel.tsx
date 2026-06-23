"use client";

import Link from "next/link";
import { Flame, ArrowRight, Sparkles } from "lucide-react";
import { useGamify } from "./gamify-context";
import { LevelRing } from "./level-ring";
import { Mascot } from "./mascot/mascot";
import { BadgeTile } from "./badge-tile";
import { BADGE_MAP } from "@/lib/gamify/badges";
import { PERSONAS } from "@/lib/content";
import { tierForLevel } from "@/lib/gamify/levels";

export function ProgressPanel() {
  const { profile, level } = useGamify();
  const persona = profile.personaSlug
    ? PERSONAS.find((p) => p.slug === profile.personaSlug)
    : null;
  const tier = tierForLevel(level.level);
  const recentBadges = profile.badges.slice(-3).reverse();
  const started = profile.totalXp > 0;

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

            {profile.streak > 0 ? (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-600 text-primary">
                <Flame className="h-4 w-4" /> ติดต่อกัน {profile.streak} วัน
              </p>
            ) : null}
          </div>
        </div>

        {/* Right: recent badges / CTA */}
        <div className="flex flex-col justify-center rounded-xl border border-border bg-secondary/40 p-4 sm:p-5">
          {recentBadges.length > 0 ? (
            <>
              <p className="flex items-center gap-1.5 text-sm font-600">
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
            href={started ? "/profile" : "/daily-req"}
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {started ? "ดูโปรไฟล์ของฉัน" : "เริ่มเล่น Daily Req"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

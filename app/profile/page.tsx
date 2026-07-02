"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Pencil, Music2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useGamify } from "@/components/gamify-context";
import { LevelRing } from "@/components/level-ring";
import { BadgeTile } from "@/components/badge-tile";
import { Mascot } from "@/components/mascot/mascot";
import { BreedCat } from "@/components/mascot/breed-cat";
import { NicknameModal } from "@/components/nickname-modal";
import { Button } from "@/components/ui/button";
import { BADGES } from "@/lib/gamify/badges";
import { PERSONAS } from "@/lib/content";
import { tierForLevel } from "@/lib/gamify/levels";
import { ActivityTimeline } from "@/components/activity-timeline";
import { StreakHeatmap } from "@/components/streak-heatmap";

export default function ProfilePage() {
  const { profile, level, nickname, hasNickname } = useGamify();
  const [editing, setEditing] = useState(false);
  const persona = profile.personaSlug
    ? PERSONAS.find((p) => p.slug === profile.personaSlug)
    : null;
  const tier = tierForLevel(level.level);
  const earned = new Set(profile.badges);

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="โปรไฟล์ของฉัน"
        title="เวทีของฉัน"
        description="ติดตามเลเวล สตรีค ตรา และสายพันธุ์แมว BA ของคุณ"
      />

      <div className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">
        {/* Nickname / login identity */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/12 text-primary">
              <Music2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">ชื่อบนเวที</p>
              <p className="font-display text-lg font-700 leading-tight">
                {hasNickname ? nickname : "แขกรับเชิญ"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing(true)}
          >
            <Pencil className="h-3.5 w-3.5" />
            {hasNickname ? "แก้ชื่อเล่น" : "ตั้งชื่อเล่น"}
          </Button>
        </div>

        <NicknameModal open={editing} onOpenChange={setEditing} mode="edit" />
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Level + mascot */}
        <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="hidden sm:block">
            <Mascot state={level.level >= 8 ? "rock" : "idle"} size="lg" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <LevelRing
                level={level.level}
                progress={level.progress}
                size={72}
                stroke={6}
              />
              <div>
                <p className="font-display text-2xl font-700">
                  Lv {level.level} · {level.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  ลีก {tier.nameTh} · {profile.totalXp} XP รวม
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-600 text-foreground">
                  {level.intoLevel} / {level.neededForNext} XP
                </span>
                <span>ถัดไป Lv {level.level + 1}</span>
              </div>
              <div
                className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
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
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
                <p className="text-xs text-muted-foreground">สตรีคปัจจุบัน</p>
                <p className="font-600">{profile.streak} วัน</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
                <p className="text-xs text-muted-foreground">สูงสุดตลอดกาล</p>
                <p className="font-600">{profile.longestStreak} วัน</p>
              </div>
            </div>
          </div>
        </div>

        {/* Persona / breed */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {persona ? (
            <>
              <div className="flex items-center justify-center bg-primary/5 px-6 pt-6 pb-2">
                <BreedCat breed={persona.breedSlug} className="h-40 w-40" title={persona.nameTh} />
              </div>
              <div className="p-6">
                <p className="text-xs font-600 text-primary">
                  {persona.personaTitleEn}
                </p>
                <p className="font-display text-xl font-700">{persona.nameTh}</p>
                <p className="mt-1 text-sm text-foreground/70">
                  {persona.breedPersonalityTh}
                </p>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <Mascot state="wave" size="md" />
              <p className="font-600">ยังไม่ได้วัดสกิล</p>
              <p className="text-sm text-foreground/70">
                ทำ Skill Amp เพื่อรู้สายพันธุ์แมว BA ของคุณ
              </p>
              <Link
                href="/skill-amp"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-600 text-primary-foreground hover:bg-primary/90"
              >
                เริ่มวัดสกิล <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Activity + heatmap */}
      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <StreakHeatmap />
        <div>
          <h2 className="mb-3 font-display text-xl font-700">กิจกรรมล่าสุด</h2>
          <ActivityTimeline limit={5} />
        </div>
      </section>
      {/* Badges gallery */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-700">
            ตรา ({earned.size}/{BADGES.length})
          </h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES.map((b) => (
            <BadgeTile
              key={b.id}
              icon={b.icon}
              nameTh={b.nameTh}
              descTh={b.descTh}
              unlocked={earned.has(b.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

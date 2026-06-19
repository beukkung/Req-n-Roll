"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { useGamify } from "./gamify-context";
import { LevelRing } from "./level-ring";
import { cn } from "@/lib/utils";

export function XpChip({ className }: { className?: string }) {
  const { profile, level, nickname, hasNickname } = useGamify();
  const streak = profile.streak;
  const name = hasNickname ? nickname : "แขกรับเชิญ";

  return (
    <Link
      href="/profile"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border bg-background pl-1 pr-2.5 py-1 transition-colors hover:border-primary/50 hover:bg-secondary",
        className,
      )}
      aria-label={`${name}, เลเวล ${level.level} ${level.title}, สตรีค ${streak} วัน`}
    >
      <LevelRing
        level={level.level}
        progress={level.progress}
        size={32}
        stroke={3}
      />
      <span className="flex min-w-0 max-w-[8.5rem] flex-col leading-tight">
        <span className="truncate text-xs font-600 text-foreground">
          {name}
        </span>
        <span className="text-[10px] text-muted-foreground">
          Lv {level.level} · {level.intoLevel}/{level.neededForNext} XP
        </span>
      </span>
      {streak > 0 ? (
        <span className="ml-0.5 inline-flex items-center gap-0.5 rounded-full bg-primary/12 px-1.5 py-0.5 text-xs font-700 text-primary">
          <Flame className="h-3.5 w-3.5" />
          {streak}
        </span>
      ) : null}
    </Link>
  );
}

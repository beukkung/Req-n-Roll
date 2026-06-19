import {
  Award,
  CalendarDays,
  Cat,
  Dumbbell,
  FileText,
  Flame,
  Gauge,
  Medal,
  MessageSquareHeart,
  Star,
  Trophy,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeId } from "@/lib/gamify/types";

const ICONS: Record<string, LucideIcon> = {
  Gauge,
  CalendarDays,
  Dumbbell,
  Medal,
  Flame,
  FileText,
  MessageSquareHeart,
  Star,
  Trophy,
  Cat,
  Award,
};

export type BadgeTileProps = {
  icon: string;
  nameTh: string;
  descTh: string;
  unlocked: boolean;
  id?: BadgeId;
  size?: "sm" | "md";
};

export function BadgeTile({
  icon,
  nameTh,
  descTh,
  unlocked,
  size = "md",
}: BadgeTileProps) {
  const Icon = ICONS[icon] ?? Award;
  const dim = size === "sm" ? "h-9 w-9" : "h-12 w-12";
  const ic = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border p-3 text-center",
        size === "sm" ? "p-2.5" : "p-4",
        unlocked
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-secondary/40",
      )}
    >
      <span
        className={cn(
          "grid place-items-center rounded-full",
          dim,
          unlocked
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground/60",
        )}
      >
        {unlocked ? <Icon className={ic} /> : <Lock className={ic} />}
      </span>
      <div>
        <p
          className={cn(
            "font-600",
            size === "sm" ? "text-xs" : "text-sm",
            !unlocked && "text-muted-foreground",
          )}
        >
          {nameTh}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
          {descTh}
        </p>
      </div>
    </div>
  );
}

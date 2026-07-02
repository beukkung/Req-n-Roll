import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function XpRewardHint({
  xp,
  label = "XP available",
  className,
}: {
  xp: number;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/8 px-2 py-0.5 text-[11px] font-700 text-primary",
        className,
      )}
    >
      <Zap className="h-3 w-3" />
      +{xp} {label}
    </span>
  );
}

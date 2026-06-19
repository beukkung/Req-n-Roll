"use client";

import { Sparkles, TrendingUp, Award, X } from "lucide-react";
import { useGamify, type ToastKind } from "./gamify-context";
import { cn } from "@/lib/utils";

const KIND_META: Record<
  ToastKind,
  { icon: typeof Sparkles; ring: string; bg: string; chip: string; fg: string }
> = {
  xp: {
    icon: Sparkles,
    ring: "border-primary/40",
    bg: "bg-background",
    chip: "bg-primary/12",
    fg: "text-primary",
  },
  level: {
    icon: TrendingUp,
    ring: "border-accent/40",
    bg: "bg-accent/10",
    chip: "bg-accent/15",
    fg: "text-accent",
  },
  badge: {
    icon: Award,
    ring: "border-chart-4/50",
    bg: "bg-background",
    chip: "bg-chart-4/15",
    fg: "text-chart-4",
  },
};

export function XpToastLayer() {
  const { toasts, dismissToast } = useGamify();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-2"
    >
      {toasts.map((t) => {
        const meta = KIND_META[t.kind];
        const Icon = meta.icon;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => dismissToast(t.id)}
            className={cn(
              "animate-toast-in pointer-events-auto flex items-center gap-3 rounded-xl border p-3 text-left shadow-lg",
              meta.ring,
              meta.bg,
            )}
          >
            <span
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                meta.chip,
                meta.fg,
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-600 text-foreground">
                {t.title}
              </span>
              {t.sub ? (
                <span className="block truncate text-xs text-muted-foreground">
                  {t.sub}
                </span>
              ) : null}
            </span>
            <X className="h-4 w-4 shrink-0 text-muted-foreground/70" />
          </button>
        );
      })}
    </div>
  );
}

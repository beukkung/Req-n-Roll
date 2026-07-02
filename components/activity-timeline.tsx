"use client";

import {
  Bot,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  FileText,
  Gauge,
  MessageSquareHeart,
  Mic2,
  type LucideIcon,
} from "lucide-react";
import { useJSON } from "@/lib/use-store";
import {
  ACTIVITY_KEY,
  type ActivityEntry,
} from "@/lib/gamify/activity";
import type { XpKind } from "@/lib/gamify/types";

const KIND_ICON: Record<XpKind, LucideIcon> = {
  skill_amp: Gauge,
  daily_req: CalendarDays,
  req_gym: Dumbbell,
  role_play: Mic2,
  req_doctor: ClipboardCheck,
  coach_bot: Bot,
  template: FileText,
  feedback: MessageSquareHeart,
  ba_assessment: ClipboardList,
};

function relativeTimeTh(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "เมื่อสักครู่";
  if (min < 60) return `${min} นาทีที่แล้ว`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} ชม.ที่แล้ว`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} วันที่แล้ว`;
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

export function ActivityTimeline({ limit = 6 }: { limit?: number }) {
  const log = useJSON<ActivityEntry[]>(ACTIVITY_KEY, []);
  const items = log.slice(0, limit);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center">
        <p className="font-600">ยังไม่มีกิจกรรม</p>
        <p className="mt-1 text-sm text-foreground/70">
          เริ่มเล่น Daily Req หรือ Req Gym แล้วจะเห็นประวัติที่นี่
        </p>
      </div>
    );
  }

  return (
    <ol className="space-y-2">
      {items.map((e) => {
        const Icon = KIND_ICON[e.kind] ?? Gauge;
        return (
          <li
            key={e.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-600">{e.title}</p>
              {e.detail ? (
                <p className="truncate text-xs text-foreground/70">{e.detail}</p>
              ) : null}
            </div>
            <time className="shrink-0 text-xs text-muted-foreground">
              {relativeTimeTh(e.at)}
            </time>
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import { useJSON } from "@/lib/use-store";
import {
  ACTIVITY_KEY,
  activeDaysFromLog,
  type ActivityEntry,
} from "@/lib/gamify/activity";

const WEEKS = 14;

/**
 * Same ICT conversion as `bangkokDayKey`, but also returns the ICT day-of-week.
 * The activity log stamps entries with `bangkokDayKey(new Date())` (a "now"
 * instant, not midnight), so cell day keys MUST be derived the same way to
 * match — deriving them from local-midnight dates shifts them by a day.
 */
function bangkokDate(date: Date): { dayKey: string; dow: number } {
  const ms =
    date.getTime() + date.getTimezoneOffset() * 60000 + 7 * 3600000;
  const d = new Date(ms);
  return { dayKey: d.toISOString().slice(0, 10), dow: d.getUTCDay() };
}

export function StreakHeatmap() {
  const log = useJSON<ActivityEntry[]>(ACTIVITY_KEY, []);
  const activeDays = activeDaysFromLog(log);

  const now = new Date();
  const { dayKey: todayKey, dow: todayDow } = bangkokDate(now);
  // Align the grid so each column is a Sunday-starting ICT week.
  const oldestMs =
    now.getTime() - (todayDow + (WEEKS - 1) * 7) * 86400000;

  const cells: { dayKey: string; future: boolean }[] = [];
  let activeCount = 0;
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(oldestMs + i * 86400000);
    const dayKey = bangkokDate(d).dayKey;
    const future = dayKey > todayKey;
    cells.push({ dayKey, future });
    if (!future && activeDays.has(dayKey)) activeCount += 1;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-700">แผนที่ความสม่ำเสมอ</h2>
        <p className="text-xs text-muted-foreground">
          {activeCount} วันที่มีกิจกรรม · {WEEKS} สัปดาห์ที่แล้ว
        </p>
      </div>
      <p className="sr-only">
        คุณมีกิจกรรมใน {activeCount} จาก {WEEKS * 7} วันที่ผ่านมา
      </p>
      <div className="mt-4 overflow-x-auto">
        <div
          className="grid w-max gap-1"
          style={{
            gridTemplateRows: "repeat(7, 1fr)",
            gridAutoFlow: "column",
          }}
          role="img"
          aria-label="ปฏิทินกิจกรรมรายสัปดาห์"
        >
          {cells.map((cell, i) => {
            const active = !cell.future && activeDays.has(cell.dayKey);
            return (
              <span
                key={i}
                className={
                  "h-3.5 w-3.5 rounded-sm " +
                  (cell.future
                    ? "bg-secondary/30"
                    : active
                      ? "bg-primary"
                      : "bg-secondary")
                }
                title={cell.dayKey}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
        <span>น้อย</span>
        <span className="h-3.5 w-3.5 rounded-sm bg-secondary" />
        <span className="h-3.5 w-3.5 rounded-sm bg-primary/50" />
        <span className="h-3.5 w-3.5 rounded-sm bg-primary" />
        <span>มาก</span>
      </div>
    </div>
  );
}
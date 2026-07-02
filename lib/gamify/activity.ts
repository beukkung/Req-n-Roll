import { readJSON, writeJSON } from "../storage";
import { bangkokDayKey } from "../daily-req";
import type { XpKind } from "./types";
import { REQ_GYM_AREAS } from "../req-gym";
import { PERSONAS } from "../content";
import type { PersonaSlug } from "../types";

/**
 * Local-first activity log. Append-only, capped. Source of truth for the
 * Profile timeline + streak heatmap. (Every award also lands in Supabase
 * `xp_events` for a future cross-device restore, but the UI reads locally so
 * it stays instant + works in demo/offline mode.)
 */
export const ACTIVITY_KEY = "reqn-roll:activity";
const MAX_ENTRIES = 120;

export type ActivityEntry = {
  id: string;
  kind: XpKind;
  /** Bangkok day key — drives the streak heatmap */
  dayKey: string;
  /** ISO timestamp — timeline ordering / relative time */
  at: string;
  title: string;
  detail?: string;
};

export type ActivityMeta = {
  personaSlug?: PersonaSlug;
  area?: string;
  score?: number;
  total?: number;
};

function areaNameTh(area?: string): string | undefined {
  if (!area) return undefined;
  return REQ_GYM_AREAS.find((a) => a.slug === area)?.shortTh ?? area;
}

function personaNameTh(slug?: PersonaSlug): string | undefined {
  if (!slug) return undefined;
  return PERSONAS.find((p) => p.slug === slug)?.nameTh;
}

function describe(
  kind: XpKind,
  meta: ActivityMeta,
): { title: string; detail?: string } {
  switch (kind) {
    case "skill_amp":
      return {
        title: "วัดสกิล Skill Amp",
        detail: personaNameTh(meta.personaSlug)
          ? `ได้บุคลิก ${personaNameTh(meta.personaSlug)}`
          : undefined,
      };
    case "daily_req":
      return {
        title: "ทำ Daily Req",
        detail:
          meta.score != null && meta.total != null
            ? `${meta.score}/${meta.total} ถูก`
            : undefined,
      };
    case "req_gym":
      return {
        title: "ฝึก Req Gym",
        detail:
          meta.score != null && meta.total != null
            ? `${areaNameTh(meta.area) ?? "ชุดฝึก"} · ${meta.score}/${meta.total}`
            : areaNameTh(meta.area),
      };
    case "role_play":
      return {
        title: "Role Play drill",
        detail:
          meta.score != null && meta.total != null
            ? `${meta.score}/${meta.total}`
            : "Stakeholder practice",
      };
    case "req_doctor":
      return { title: "Req Doctor review", detail: "Artifact quality check" };
    case "coach_bot":
      return { title: "Coach Bot office hour", detail: "Practice follow-up" };
    case "ba_assessment":
      return {
        title: "ฝึก BA Assessment",
        detail:
          meta.score != null && meta.total != null
            ? `${meta.score}/${meta.total}`
            : "Mock exam",
      };
    case "template":
      return { title: "ดาวน์โหลดเทมเพลต" };
    case "feedback":
      return { title: "ส่ง Feedback" };
  }
}

export function appendActivity(kind: XpKind, meta: ActivityMeta = {}): void {
  const { title, detail } = describe(kind, meta);
  const entry: ActivityEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    dayKey: bangkokDayKey(),
    at: new Date().toISOString(),
    title,
    detail,
  };
  const log = readJSON<ActivityEntry[]>(ACTIVITY_KEY) ?? [];
  log.unshift(entry); // newest first
  writeJSON(ACTIVITY_KEY, log.slice(0, MAX_ENTRIES));
}

/** Pure: derive the set of active Bangkok dayKeys from a log (heatmap). */
export function activeDaysFromLog(log: readonly ActivityEntry[]): Set<string> {
  return new Set(log.map((e) => e.dayKey));
}

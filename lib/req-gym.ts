import { REQ_GYM_QUESTIONS } from "./content";
import type { KnowledgeArea, ReqGymQuestion } from "./types";
import { seededShuffle } from "./storage";
import { ensureNickProfile } from "./supabase/nickname-profile";

export type ReqGymSet = {
  id: string;
  nameTh: string;
  shortTh: string;
  area?: KnowledgeArea;
  mock?: boolean;
};

/** Knowledge-area picker labels (IIBA BABOK-aligned, not official). */
export const REQ_GYM_AREAS: {
  slug: KnowledgeArea;
  nameTh: string;
  shortTh: string;
}[] = [
  {
    slug: "business_analysis_planning",
    nameTh: "Business Analysis Planning",
    shortTh: "วางแผนงานวิเคราะห์",
  },
  {
    slug: "elicitation_collaboration",
    nameTh: "Elicitation & Collaboration",
    shortTh: "ดึงและระดมข้อมูล",
  },
  {
    slug: "requirements_lifecycle",
    nameTh: "Requirements Life Cycle Management",
    shortTh: "จัดการวงจร requirement",
  },
  {
    slug: "strategy_analysis",
    nameTh: "Strategy Analysis",
    shortTh: "วิเคราะห์กลยุทธ์",
  },
  {
    slug: "solution_evaluation",
    nameTh: "Solution Evaluation",
    shortTh: "ประเมินผลลัพธ์",
  },
  {
    slug: "underlying_competencies",
    nameTh: "Underlying Competencies",
    shortTh: "ทักษะพื้นฐาน",
  },
];

export function getReqGymSets(): ReqGymSet[] {
  return [
    ...REQ_GYM_AREAS.map((a) => ({
      id: a.slug,
      nameTh: a.nameTh,
      shortTh: a.shortTh,
      area: a.slug,
    })),
    {
      id: "mock",
      nameTh: "Mock — รวมทุกพื้นที่",
      shortTh: "สุ่มโจทย์ทุก area เหมือนสอบจริง",
      mock: true,
    },
  ];
}

export function getReqGymSet(id: string): ReqGymSet | undefined {
  return getReqGymSets().find((s) => s.id === id);
}

/** Questions for a set. Area sets are filtered; the mock set shuffles all. */
export function getReqGymQuestions(setId: string): ReqGymQuestion[] {
  if (setId === "mock") {
    return seededShuffle(REQ_GYM_QUESTIONS, 42);
  }
  return REQ_GYM_QUESTIONS.filter((q) => q.area === setId);
}

export async function persistAttempt(
  setId: string,
  score: number,
  total: number,
  nickname?: string,
): Promise<void> {
  const { createClient } = await import("./supabase/client");
  const supabase = createClient();
  if (!supabase) return;
  const clean = await ensureNickProfile(supabase, nickname ?? "");
  if (!clean) return;
  await supabase.from("req_gym_attempts").insert({
    nickname: clean,
    set_id: setId,
    score,
    total,
  });
}

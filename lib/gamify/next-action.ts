import { rankSkills } from "../persona";
import type { SkillScores, SkillSlug, KnowledgeArea } from "../types";

/**
 * Best-fit mapping of a Skill Amp dimension to a Req Gym BABOK knowledge area.
 * Skills and knowledge areas are different taxonomies (not 1:1), so this is a
 * curated best-fit chosen to close the assessment -> practice loop. Two skills
 * (stakeholder_communication, soft_skill_facilitation) share the same area; the
 * weakest-unpracticed resolver below handles collisions by skipping areas you
 * have already practised.
 *
 * Confirmed by the product owner.
 */
export const SKILL_TO_AREA: Record<SkillSlug, KnowledgeArea> = {
  requirement_thinking: "requirements_analysis_design",
  stakeholder_communication: "elicitation_collaboration",
  process_system_thinking: "solution_evaluation",
  product_value_thinking: "strategy_analysis",
  agile_delivery: "requirements_lifecycle",
  soft_skill_facilitation: "elicitation_collaboration",
};

/** The practice area that best addresses the single weakest skill. */
export function weakestSkillArea(scores: SkillScores): KnowledgeArea {
  const ranked = rankSkills(scores); // strongest first
  const weakest = ranked[ranked.length - 1];
  return SKILL_TO_AREA[weakest.skill.slug];
}

export type NextAction = {
  href: string;
  label: string;
  sub: string;
};

export type NextActionInput = {
  ampCount: number;
  dailyDoneToday: boolean;
  skillScores?: SkillScores | null;
  practicedAreas: readonly string[];
};

/**
 * Decide the single most useful next action for the home "Continue" CTA.
 * Priority: assess -> today's drill -> weakest unaddressed skill -> gym.
 * Pure function so it is trivial to test and reuse.
 */
export function nextAction(input: NextActionInput): NextAction {
  // 1. Never assessed -> start with Skill Amp.
  if (input.ampCount === 0) {
    return {
      href: "/skill-amp",
      label: "เริ่มวัดสกิล",
      sub: "ดูสายพันธุ์แมว BA และจุดที่ต้องฝึก",
    };
  }

  // 2. Daily not done today -> keep the streak alive.
  if (!input.dailyDoneToday) {
    return {
      href: "/daily-req",
      label: "ทำ Daily Req วันนี้",
      sub: "รักษาสตรีคและสะสม XP",
    };
  }

  // 3. Have skill scores -> practise the weakest area you haven't touched yet.
  if (input.skillScores) {
    const ranked = rankSkills(input.skillScores); // strongest first
    const weakestFirst = [...ranked].reverse();
    for (const { skill } of weakestFirst) {
      const area = SKILL_TO_AREA[skill.slug];
      if (area && !input.practicedAreas.includes(area)) {
        return {
          href: `/req-gym/practice/${area}`,
          label: `ฝึก "${skill.nameTh}"`,
          sub: "ทักษะที่อ่อนที่สุดของคุณ",
        };
      }
    }
  }

  // 4. Fallback -> hit the gym.
  return {
    href: "/req-gym",
    label: "เข้ายิม Req Gym",
    sub: "สุ่มโจทย์ทุก area เหมือนสอบจริง",
  };
}
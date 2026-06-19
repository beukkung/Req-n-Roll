import type {
  Persona,
  PersonaSlug,
  Skill,
  SkillScores,
  SkillSlug,
} from "./types";
import { PERSONAS, SKILLS } from "./content";

/**
 * Default persona-assignment rule (pending user sign-off — see plan open question #1).
 *
 * Top skill -> persona. `stakeholder_communication` has no dedicated persona,
 * so we fall back to the next-highest *mapped* skill. Ties are broken by
 * 2nd-highest skill value.
 */
const SKILL_TO_PERSONA: Partial<Record<SkillSlug, PersonaSlug>> = {
  requirement_thinking: "clarifier",
  agile_delivery: "shipper",
  soft_skill_facilitation: "facilitator",
  product_value_thinking: "value_hunter",
  process_system_thinking: "scope_slayer",
};

export type PersonaAssignment = {
  persona: Persona;
  topSkill: Skill;
  sorted: { skill: Skill; score: number }[];
};

export function assignPersona(scores: SkillScores): PersonaAssignment {
  const ranked = rankSkills(scores);
  const topMapped = ranked.find((r) => SKILL_TO_PERSONA[r.skill.slug]);
  const personaSlug =
    SKILL_TO_PERSONA[topMapped?.skill.slug ?? "requirement_thinking"] ??
    "clarifier";

  const persona =
    PERSONAS.find((p) => p.slug === personaSlug) ?? PERSONAS[0];

  return {
    persona,
    topSkill: topMapped?.skill ?? SKILLS[0],
    sorted: ranked,
  };
}

export function rankSkills(
  scores: SkillScores,
): { skill: Skill; score: number }[] {
  return SKILLS.map((skill) => ({ skill, score: scores[skill.slug] ?? 0 })).sort(
    (a, b) => b.score - a.score,
  );
}

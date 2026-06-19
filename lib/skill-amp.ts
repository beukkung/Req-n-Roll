import { SKILL_AMP_QUESTIONS } from "./content";
import type { PersonaSlug, SkillAmpQuestion, SkillScores, SkillSlug } from "./types";
import { assignPersona } from "./persona";
import { readJSON, writeJSON } from "./storage";
import { ensureNickProfile } from "./supabase/nickname-profile";

export const SKILL_AMP_RESULT_KEY = "reqn-roll:skill-amp-result";

export type SkillAmpResult = {
  scores: SkillScores;
  personaSlug: PersonaSlug;
  completedAt: string;
};

/**
 * Average the Likert answers (1–5) per skill dimension. A skill with no
 * answered question falls back to the neutral midpoint (3) so the radar
 * still renders a closed shape.
 */
export function computeSkillScores(
  answers: Record<string, number>,
  questions: readonly SkillAmpQuestion[] = SKILL_AMP_QUESTIONS,
): SkillScores {
  const buckets = new Map<SkillSlug, { sum: number; weight: number }>();

  for (const q of questions) {
    const v = answers[q.id];
    if (v == null) continue;
    const cur = buckets.get(q.skill) ?? { sum: 0, weight: 0 };
    cur.sum += v * q.weight;
    cur.weight += q.weight;
    buckets.set(q.skill, cur);
  }

  const scores = {} as SkillScores;
  for (const q of questions) {
    if (q.skill in scores) continue;
    const b = buckets.get(q.skill);
    scores[q.skill] = b && b.weight > 0 ? b.sum / b.weight : 3;
  }
  return scores;
}

export function finalizeSkillAmp(
  answers: Record<string, number>,
  questions: readonly SkillAmpQuestion[] = SKILL_AMP_QUESTIONS,
): SkillAmpResult {
  const scores = computeSkillScores(answers, questions);
  const { persona } = assignPersona(scores);
  return {
    scores,
    personaSlug: persona.slug,
    completedAt: new Date().toISOString(),
  };
}

export function saveSkillAmpResult(result: SkillAmpResult): void {
  writeJSON(SKILL_AMP_RESULT_KEY, result);
}

export function getSkillAmpResult(): SkillAmpResult | null {
  return readJSON<SkillAmpResult>(SKILL_AMP_RESULT_KEY);
}

/**
 * Persist to Supabase when a backend is configured + a nickname exists.
 * Failures are swallowed — local result is the source of truth for the UI.
 */
export async function persistSkillAmpResult(
  result: SkillAmpResult,
  nickname?: string,
): Promise<void> {
  const { createClient } = await import("./supabase/client");
  const supabase = createClient();
  if (!supabase) return;
  const clean = await ensureNickProfile(supabase, nickname ?? "");
  if (!clean) return;
  await supabase.from("skill_amp_results").insert({
    nickname: clean,
    scores: result.scores,
    persona_slug: result.personaSlug,
  });
}

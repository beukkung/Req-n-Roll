export type SkillSlug =
  | "requirement_thinking"
  | "stakeholder_communication"
  | "process_system_thinking"
  | "product_value_thinking"
  | "agile_delivery"
  | "soft_skill_facilitation";

export type PersonaSlug =
  | "clarifier"
  | "shipper"
  | "facilitator"
  | "value_hunter"
  | "scope_slayer";

export type Skill = {
  slug: SkillSlug;
  nameTh: string;
  nameEn: string;
  shortTh: string;
  /** index 1..6 mapping to --chart-N color token */
  chartIndex: number;
};

export type Persona = {
  slug: PersonaSlug;
  /** Breed name shown as the primary identity (Thai / English). */
  nameTh: string;
  nameEn: string;
  /** BA persona title, kept as a small flavour subtitle. */
  personaTitleTh: string;
  personaTitleEn: string;
  taglineTh: string;
  descriptionTh: string;
  /** Skill whose dominance maps to this persona */
  primarySkill: SkillSlug;
  /** Asset slug for the breed cat illustration (see components/mascot). */
  breedSlug: string;
  /** Short breed-personality copy tying the breed to the BA trait. */
  breedPersonalityTh: string;
  /** 1..6 — maps to the --chart-N accent color token. */
  accentChartIndex: number;
};

export type SkillAmpQuestion = {
  id: string;
  skill: SkillSlug;
  textTh: string;
  /** relative weight when averaging within a skill */
  weight: number;
};

export type DailyReqType =
  | "requirement_quality"
  | "user_story_gap"
  | "stakeholder_followup"
  | "ac_testable"
  | "scope_risk"
  | "priority";

export type DailyReqQuestion = {
  id: string;
  type: DailyReqType;
  promptTh: string;
  options: string[];
  /** index in `options` of the best answer */
  answer: number;
  explanationTh: string;
};

export type KnowledgeArea =
  | "business_analysis_planning"
  | "elicitation_collaboration"
  | "requirements_lifecycle"
  | "strategy_analysis"
  | "requirements_analysis_design"
  | "solution_evaluation"
  /** Legacy local/remote sample area from the initial beta bank. */
  | "underlying_competencies";

export type ReqGymQuestion = {
  id: string;
  area: KnowledgeArea;
  difficulty: "easy" | "medium" | "hard";
  promptTh: string;
  options: string[];
  answer: number;
  explanationTh: string;
};

export type Template = {
  slug: string;
  name: string;
  category: string;
  descriptionTh: string;
  /** number of pages / size hint for display */
  meta: string;
};

export type SkillScores = Record<SkillSlug, number>;

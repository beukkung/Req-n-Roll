import type { SupabaseClient } from "@supabase/supabase-js";
import {
  DAILY_REQ_QUESTIONS,
  REQ_GYM_QUESTIONS,
  SKILL_AMP_QUESTIONS,
  TEMPLATES,
} from "./content";
import type {
  DailyReqQuestion,
  KnowledgeArea,
  ReqGymQuestion,
  SkillAmpQuestion,
  SkillSlug,
  Template,
} from "./types";
import { seededShuffle } from "./storage";

type SkillAmpQuestionRow = {
  id: string;
  skill: string;
  text_th: string;
  weight: number | string;
};

type DailyReqQuestionRow = {
  id: string;
  type: string;
  prompt_th: string;
  options: unknown;
  answer: number | string;
  explanation_th: string;
};

type ReqGymQuestionRow = {
  id: string;
  knowledge_area: string;
  difficulty: string;
  prompt_th: string;
  options: unknown;
  answer: number | string;
  explanation_th: string;
};

type TemplateRow = {
  slug: string;
  name: string;
  category: string;
  description_th: string;
  meta: string | null;
};

function optionsFromJson(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

export async function getSkillAmpQuestionsRemote(
  supabase: SupabaseClient | null,
): Promise<SkillAmpQuestion[]> {
  if (!supabase) return SKILL_AMP_QUESTIONS;

  const { data, error } = await supabase
    .from("skill_amp_questions")
    .select("id, skill, text_th, weight")
    .order("order", { ascending: true });

  if (error || !data || data.length === 0) return SKILL_AMP_QUESTIONS;

  return (data as SkillAmpQuestionRow[]).map((row) => ({
    id: row.id,
    skill: row.skill as SkillSlug,
    textTh: row.text_th,
    weight: Number(row.weight),
  }));
}

export async function getDailyReqQuestionsRemote(
  supabase: SupabaseClient | null,
): Promise<DailyReqQuestion[]> {
  if (!supabase) return DAILY_REQ_QUESTIONS;

  const { data, error } = await supabase
    .from("daily_req_questions")
    .select("id, type, prompt_th, options, answer, explanation_th")
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return DAILY_REQ_QUESTIONS;

  return (data as DailyReqQuestionRow[]).map((row) => ({
    id: row.id,
    type: row.type as DailyReqQuestion["type"],
    promptTh: row.prompt_th,
    options: optionsFromJson(row.options),
    answer: Number(row.answer),
    explanationTh: row.explanation_th,
  }));
}

export async function getReqGymQuestionsRemote(
  supabase: SupabaseClient | null,
): Promise<ReqGymQuestion[]> {
  if (!supabase) return REQ_GYM_QUESTIONS;

  const { data, error } = await supabase
    .from("req_gym_questions")
    .select("id, knowledge_area, difficulty, prompt_th, options, answer, explanation_th")
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return REQ_GYM_QUESTIONS;

  return (data as ReqGymQuestionRow[]).map((row) => ({
    id: row.id,
    area: row.knowledge_area as KnowledgeArea,
    difficulty: row.difficulty as ReqGymQuestion["difficulty"],
    promptTh: row.prompt_th,
    options: optionsFromJson(row.options),
    answer: Number(row.answer),
    explanationTh: row.explanation_th,
  }));
}

export function selectReqGymQuestions(
  questions: readonly ReqGymQuestion[],
  setId: string,
): ReqGymQuestion[] {
  if (setId === "mock") {
    return seededShuffle(questions, 42);
  }
  return questions.filter((q) => q.area === setId);
}

export async function getTemplatesRemote(
  supabase: SupabaseClient | null,
): Promise<Template[]> {
  if (!supabase) return TEMPLATES;

  const { data, error } = await supabase
    .from("templates")
    .select("slug, name, category, description_th, meta")
    .order("slug", { ascending: true });

  if (error || !data || data.length === 0) return TEMPLATES;

  return (data as TemplateRow[]).map((row) => ({
    slug: row.slug,
    name: row.name,
    category: row.category,
    descriptionTh: row.description_th,
    meta: row.meta ?? "",
  }));
}

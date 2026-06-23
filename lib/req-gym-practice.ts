import type { KnowledgeArea, ReqGymQuestion } from "./types";

export const REQ_GYM_AREA_SET_SIZE = 20;
export const REQ_GYM_MOCK_SET_SIZE = 50;

const MOCK_AREAS: KnowledgeArea[] = [
  "business_analysis_planning",
  "elicitation_collaboration",
  "requirements_lifecycle",
  "strategy_analysis",
  "requirements_analysis_design",
  "solution_evaluation",
];

export function getReqGymPracticeSetSize(setId: string): number {
  return setId === "mock" ? REQ_GYM_MOCK_SET_SIZE : REQ_GYM_AREA_SET_SIZE;
}

export function selectReqGymPracticeQuestions(
  questions: readonly ReqGymQuestion[],
  setId: string,
  seed: number,
): ReqGymQuestion[] {
  const targetSize = getReqGymPracticeSetSize(setId);

  if (setId !== "mock") {
    return seededShuffle(questions, seed).slice(0, targetSize);
  }

  const basePerArea = Math.floor(targetSize / MOCK_AREAS.length);
  const remainder = targetSize % MOCK_AREAS.length;
  const remainderStart = Math.abs(seed) % MOCK_AREAS.length;
  const picked: ReqGymQuestion[] = [];

  MOCK_AREAS.forEach((area, index) => {
    const rotatedIndex = (index - remainderStart + MOCK_AREAS.length) % MOCK_AREAS.length;
    const areaTarget = basePerArea + (rotatedIndex < remainder ? 1 : 0);
    const areaQuestions = questions.filter((question) => question.area === area);
    picked.push(...seededShuffle(areaQuestions, seed + index * 997).slice(0, areaTarget));
  });

  if (picked.length < targetSize) {
    return seededShuffle(questions, seed).slice(0, targetSize);
  }

  return seededShuffle(picked, seed ^ 0x9e3779b9).slice(0, targetSize);
}

function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const out = [...items];
  let s = seed >>> 0;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out;
}

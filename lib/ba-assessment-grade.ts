import {
  BA_ASSESSMENT_PRACTICE_SETS,
  type BaAssessmentPracticeSet,
  type BaAssessmentWrittenPrompt,
} from "./ba-assessment-practice";

export const MAX_ANSWER_CHARS = 4000;

export type WrittenCriterionStatus = "met" | "partial" | "missed";

export type WrittenGradeCriteria = {
  point: string;
  status: WrittenCriterionStatus;
  note: string;
};

export type WrittenGrade = {
  provider: "gemini" | "local-fallback";
  score: number;
  verdict: string;
  criteria: WrittenGradeCriteria[];
  improvements: string[];
};

export type GradeValidation =
  | { ok: true; setId: string; promptId: string; answer: string }
  | { ok: false; error: { code: string; message: string } };

const STATUS_VALUES: ReadonlySet<string> = new Set([
  "met",
  "partial",
  "missed",
]);

export function validateGradeRequest(body: unknown): GradeValidation {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      error: { code: "invalid_json", message: "Request body must be an object" },
    };
  }

  const input = body as { setId?: unknown; promptId?: unknown; answer?: unknown };

  if (typeof input.setId !== "string" || input.setId.trim().length === 0) {
    return {
      ok: false,
      error: { code: "set_id_required", message: "setId is required" },
    };
  }

  if (typeof input.promptId !== "string" || input.promptId.trim().length === 0) {
    return {
      ok: false,
      error: { code: "prompt_id_required", message: "promptId is required" },
    };
  }

  if (typeof input.answer !== "string" || input.answer.trim().length === 0) {
    return {
      ok: false,
      error: { code: "answer_required", message: "answer is required" },
    };
  }

  const answer = input.answer.trim();
  if (answer.length > MAX_ANSWER_CHARS) {
    return {
      ok: false,
      error: {
        code: "answer_too_long",
        message: `answer must be at most ${MAX_ANSWER_CHARS} characters`,
      },
    };
  }

  return { ok: true, setId: input.setId.trim(), promptId: input.promptId.trim(), answer };
}

/**
 * Resolve a written prompt server-side. The client only sends ids — the
 * rubric never travels from the browser, so a tampered request cannot
 * rewrite its own grading criteria.
 */
export function findWrittenPrompt(
  setId: string,
  promptId: string,
): { set: BaAssessmentPracticeSet; prompt: BaAssessmentWrittenPrompt } | null {
  const set = BA_ASSESSMENT_PRACTICE_SETS.find((item) => item.id === setId);
  if (!set) return null;
  const prompt = set.writtenCase.prompts.find((item) => item.id === promptId);
  if (!prompt) return null;
  return { set, prompt };
}

export function buildGradePrompt(
  set: BaAssessmentPracticeSet,
  prompt: BaAssessmentWrittenPrompt,
  answer: string,
): string {
  const rubric = prompt.expectedPoints
    .map((point, index) => `${index + 1}. ${point}`)
    .join("\n");

  const system = [
    "คุณเป็นผู้ตรวจข้อสอบ Business Analyst สายงานแบงค์ (HR-style BA assessment grader) ภาษาไทยเป็นหลัก",
    "หน้าที่: ประเมินคำตอบของผู้สอบเทียบกับ rubric อย่างยุติธรรม ระบุจุดที่ได้/ไม่ได้ ให้คะแนนรวม 0–100 และแนะนำการปรับปรุงที่จับต้องได้",
    "อย่าให้คะแนนเต็มถ้าคำตอบไม่ครบ rubric และอย่าให้ศูนย์ถ้ามีเนื้อหาที่เกี่ยวข้อง",
    "ตอบกลับเป็น JSON เท่านั้นตาม schema ที่กำหนด ห้ามมีข้อความอธิบายนอก JSON",
  ].join("\n");

  const user = [
    "สถานการณ์ของชุดข้อสอบ:",
    set.scenario,
    "",
    `หัวข้อที่ถาม: ${prompt.title}`,
    "โจทย์:",
    prompt.prompt,
    "",
    "Rubric (เกณฑ์ให้คะแนน แต่ละข้อให้ประเมิน status เป็น met / partial / missed พร้อมหมายเหตุสั้น):",
    rubric,
    "",
    "คำตอบของผู้สอบ:",
    answer,
    "",
    'ส่งกลับ JSON รูปแบบนี้เท่านั้น: {"score": <0-100>, "verdict": "<สรุปผลบรรทัดเดียว>", "criteria": [{"point": "<ข้อ rubric>", "status": "met|partial|missed", "note": "<หมายเหตุสั้น>"}], "improvements": ["<ข้อแนะนำ 1-3 ข้อ>"]}',
    "criteria ต้องครบทุกข้อใน rubric ตามลำดับ",
  ].join("\n");

  return `${system}\n\n${user}`;
}

function clampScore(value: unknown): number {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function normalizeStatus(value: unknown): WrittenCriterionStatus {
  return typeof value === "string" && STATUS_VALUES.has(value)
    ? (value as WrittenCriterionStatus)
    : "missed";
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(normalizeString)
    .filter((item) => item.length > 0)
    .slice(0, 5);
}

export function parseGradeResponse(text: string): WrittenGrade {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Grade response was not valid JSON");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Grade response was not a JSON object");
  }

  const obj = parsed as {
    score?: unknown;
    verdict?: unknown;
    criteria?: unknown;
    improvements?: unknown;
  };

  const rawCriteria = Array.isArray(obj.criteria) ? obj.criteria : [];
  const criteria: WrittenGradeCriteria[] = rawCriteria
    .map((item): WrittenGradeCriteria | null => {
      if (!item || typeof item !== "object") return null;
      const entry = item as {
        point?: unknown;
        status?: unknown;
        note?: unknown;
      };
      const point = normalizeString(entry.point);
      if (!point) return null;
      return {
        point,
        status: normalizeStatus(entry.status),
        note: normalizeString(entry.note),
      };
    })
    .filter((entry): entry is WrittenGradeCriteria => entry !== null);

  return {
    provider: "gemini",
    score: clampScore(obj.score),
    verdict: normalizeString(obj.verdict) || "ไม่สามารถสรุปผลได้",
    criteria,
    improvements: normalizeStringArray(obj.improvements),
  };
}

export function buildGradeFallback(
  prompt: BaAssessmentWrittenPrompt,
  answer: string,
): WrittenGrade {
  void answer;
  return {
    provider: "local-fallback",
    score: 0,
    verdict: "ยังไม่ได้ตรวจด้วย AI — เทียบกับ rubric เองก่อน",
    criteria: prompt.expectedPoints.map((point) => ({
      point,
      status: "missed",
      note: "ตรวจสอบเองว่าคำตอบครอบคลุมข้อนี้หรือไม่",
    })),
    improvements: [],
  };
}

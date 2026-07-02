import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { REQ_GYM_QUESTIONS } from "../lib/req-gym-bank.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const outDir = join(rootDir, "docs");

const areaLabels = {
  business_analysis_planning: "Business Analysis Planning & Monitoring",
  elicitation_collaboration: "Elicitation & Collaboration",
  requirements_lifecycle: "Requirements Life Cycle Management",
  strategy_analysis: "Strategy Analysis",
  requirements_analysis_design: "Requirements Analysis & Design Definition",
  solution_evaluation: "Solution Evaluation",
};

const areaBankingContext = {
  business_analysis_planning:
    "บริบทธนาคาร: วาง BA approach ให้มี governance, stakeholder map, decision rights, sign-off cadence, change control และหลักฐาน audit trail ตั้งแต่ต้น",
  elicitation_collaboration:
    "บริบทธนาคาร: เก็บข้อมูลจาก Product, Operation, Branch, Compliance, Risk และ IT โดยยืนยันผล elicitation ก่อน baseline requirement",
  requirements_lifecycle:
    "บริบทธนาคาร: คุมวงจร UR/BRD/API/test case ด้วย owner, status, version, source, rationale, traceability และ impact analysis ทุกครั้งที่เปลี่ยน",
  strategy_analysis:
    "บริบทธนาคาร: ผูก initiative กับ business outcome, risk appetite, compliance constraint, operating model และ measurable KPI ก่อนเลือก solution",
  requirements_analysis_design:
    "บริบทธนาคาร: แปลง requirement เป็น process model, business rule, data dictionary, interface contract, state model, NFR และ acceptance criteria ที่ test ได้",
  solution_evaluation:
    "บริบทธนาคาร: ประเมินหลัง go-live ด้วย baseline vs actual KPI, adoption, defect/workaround, operational risk, customer impact และ benefit realization",
};

const juniorFocus = {
  business_analysis_planning:
    "Junior ควรจับ keyword เรื่อง approach, plan, stakeholder, governance แล้วเลือกคำตอบที่ทำให้ scope/deliverable/approval ชัด ไม่รีบ freeze หรือข้าม stakeholder",
  elicitation_collaboration:
    "Junior ควรดูว่าโจทย์ถามเทคนิคเก็บข้อมูลแบบใด และเลือกวิธีที่ตรงกับสถานการณ์ เช่น workshop, interview, observation, survey หรือ document analysis",
  requirements_lifecycle:
    "Junior ควรมองหา owner, status, traceability, baseline, impact analysis และ change communication แทนการปล่อยให้ทีมเดาหลัง build",
  strategy_analysis:
    "Junior ควรถามก่อนว่า problem, objective, metric, current state และ future state คืออะไร ไม่กระโดดไปเลือก solution ทันที",
  requirements_analysis_design:
    "Junior ควรเลือก artifact ที่ทำให้ requirement ชัดและ test ได้ เช่น process model, data dictionary, decision table, interface analysis หรือ acceptance criteria",
  solution_evaluation:
    "Junior ควรจำว่า build ผ่าน requirement ยังไม่เท่ากับ value สำเร็จ ต้องดู metric, adoption, workaround และ root cause หลังใช้งานจริง",
};

const seniorFocus = {
  business_analysis_planning:
    "Senior review: ในงานแบงค์ต้องแยก requirement ที่ต้อง baseline/approval ตาม policy ออกจาก backlog ที่ปรับได้ และระบุ owner/decision path สำหรับ issue สำคัญ",
  elicitation_collaboration:
    "Senior review: ต้อง validate กับแหล่งหลักฐาน เช่น policy, SOP, BOT/AML/KYC/PDPA constraint, operation procedure และบันทึก assumption/open issue ที่ยังต้อง confirm",
  requirements_lifecycle:
    "Senior review: ต้องเห็นผลกระทบต่อ downstream requirement, API, data, test case, release, training และ operation readiness ก่อนอนุมัติ change",
  strategy_analysis:
    "Senior review: ต้องเชื่อมโจทย์กับ business case, risk appetite, compliance cost, operational impact และ KPI ไม่ใช่แค่ความต้องการของ stakeholder เดียว",
  requirements_analysis_design:
    "Senior review: ต้องทำ rule/data/interface ให้ dev และ QA ใช้ต่อได้จริง โดยเฉพาะ field definition, source of truth, error handling, SLA และ audit requirement",
  solution_evaluation:
    "Senior review: ต้องใช้ evidence หลัง go-live แยกปัญหา requirement gap, process gap, usability, data quality, policy และ change readiness ก่อนเสนอ enhancement",
};

const leadFocus = {
  business_analysis_planning:
    "Team Lead gate: พร้อมส่งต่อเมื่อมี BA plan, stakeholder coverage, decision log, risk/assumption log, approval criteria และ governance ที่ทีม delivery ยอมรับร่วมกัน",
  elicitation_collaboration:
    "Team Lead gate: พร้อมเมื่อผล elicitation ถูกยืนยันกับเจ้าของข้อมูล มี traceable source และ open issue มี owner/date ชัด",
  requirements_lifecycle:
    "Team Lead gate: พร้อมเมื่อ requirement มี status/version/source/rationale ครบ และ impact analysis ครอบคลุม design, test, release, operation และ compliance",
  strategy_analysis:
    "Team Lead gate: พร้อมเมื่อ initiative มี objective/KPI/baseline, option trade-off, risk response และ decision rationale ที่ sponsor รับทราบ",
  requirements_analysis_design:
    "Team Lead gate: พร้อมเมื่อ requirement clear, correct, complete, consistent, feasible, prioritized, traceable และ testable พร้อม artifact ที่เกี่ยวข้อง",
  solution_evaluation:
    "Team Lead gate: พร้อมเมื่อมี baseline vs actual result, root cause, corrective action owner และ decision ว่าจะ keep, improve, retire หรือ re-prioritize",
};

function escapeCsv(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function optionLabel(index) {
  return ["A", "B", "C", "D"][index] ?? String(index + 1);
}

function detectBankLens(question) {
  const text = `${question.promptTh} ${question.explanationTh} ${question.options.join(" ")}`;
  const tags = [];
  if (/ธนาคาร|สินเชื่อ|credit|loan|e-KYC|KYC|PDPA|audit|Compliance|Risk|สาขา/.test(text)) {
    tags.push("bank-native context");
  }
  if (/compliance|policy|BOT|KYC|PDPA|audit|กฎ|กำกับ|อนุมัติ|approval/i.test(text)) {
    tags.push("compliance/policy");
  }
  if (/data|ข้อมูล|interface|API|ระบบ|system|source|contract/i.test(text)) {
    tags.push("data/system integration");
  }
  if (/stakeholder|workshop|interview|session|facilitat|สื่อสาร|communication/i.test(text)) {
    tags.push("stakeholder alignment");
  }
  if (/change|baseline|traceability|impact|version|owner|status/i.test(text)) {
    tags.push("change/traceability");
  }
  if (/metric|KPI|value|benefit|outcome|adoption|go-live|actual|baseline/i.test(text)) {
    tags.push("value realization");
  }
  return tags.length ? tags.join("; ") : "general BA control";
}

function clarificationCue(question) {
  const text = `${question.promptTh} ${question.explanationTh}`;
  if (/ไม่ชัด|กำกวม|open issue|assumption|policy|BOT|KYC|PDPA|compliance|กฎ|ข้อกำกับ|เจ้าของ|owner/i.test(text)) {
    return "ควรตั้งเป็น BA confirm item ถ้าหลักฐาน policy/process owner ยังไม่ชัด";
  }
  if (question.difficulty === "hard") {
    return "ควรให้ senior/lead review ก่อน baseline เพราะโจทย์มี trade-off หรือ impact หลายมิติ";
  }
  return "ไม่ต้อง escalate หากมีหลักฐาน requirement และ owner ชัด";
}

function personaRow(question) {
  const correctAnswer = question.options[question.answer];
  const label = optionLabel(question.answer);
  const bankLens = detectBankLens(question);
  return {
    id: question.id,
    area: question.area,
    area_th: areaLabels[question.area] ?? question.area,
    difficulty: question.difficulty,
    prompt_th: question.promptTh,
    option_a: question.options[0],
    option_b: question.options[1],
    option_c: question.options[2],
    option_d: question.options[3],
    correct_option: label,
    correct_answer: correctAnswer,
    source_explanation: question.explanationTh,
    junior_answer: `${label}. ${correctAnswer}`,
    junior_review: `${juniorFocus[question.area] ?? "Junior ควรเลือกจากหลักการ BA ที่ตรงกับโจทย์"} จุดระวัง: อย่าจำแค่คำตอบ ให้โยงกับ evidence ในโจทย์และระบุ assumption ที่ยังไม่รู้`,
    senior_answer: `${label}. ${correctAnswer}`,
    senior_review: `${seniorFocus[question.area] ?? "Senior ควรตรวจผลกระทบ business/process/system/test ก่อนสรุป"} Bank lens: ${bankLens}`,
    team_lead_answer: `${label}. ${correctAnswer}`,
    team_lead_review: `${leadFocus[question.area] ?? "Team Lead ควรดู readiness ก่อนให้ทีมเดินต่อ"} Decision: ตอบข้อนี้ได้ แต่ก่อนส่ง dev/test ต้องมี evidence, owner และ acceptance/checkpoint ที่ตรวจสอบได้`,
    banking_reference: areaBankingContext[question.area] ?? "บริบทธนาคาร: ใช้ evidence, control และ sign-off ให้ตรวจสอบย้อนกลับได้",
    review_tags: bankLens,
    ba_confirm: clarificationCue(question),
  };
}

const rows = REQ_GYM_QUESTIONS.map(personaRow);

const headers = [
  "id",
  "area",
  "area_th",
  "difficulty",
  "prompt_th",
  "option_a",
  "option_b",
  "option_c",
  "option_d",
  "correct_option",
  "correct_answer",
  "source_explanation",
  "junior_answer",
  "junior_review",
  "senior_answer",
  "senior_review",
  "team_lead_answer",
  "team_lead_review",
  "banking_reference",
  "review_tags",
  "ba_confirm",
];

const csv = [
  headers.map(escapeCsv).join(","),
  ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(",")),
].join("\n");

const countsByArea = rows.reduce((acc, row) => {
  acc[row.area] = (acc[row.area] ?? 0) + 1;
  return acc;
}, {});

const countsByDifficulty = rows.reduce((acc, row) => {
  acc[row.difficulty] = (acc[row.difficulty] ?? 0) + 1;
  return acc;
}, {});

const sampleIds = [
  "rg-bapm-001",
  "rg-elic-001",
  "rg-rlcm-001",
  "rg-strat-001",
  "rg-radd-001",
  "rg-solev-001",
];

const sampleSections = sampleIds
  .map((id) => rows.find((row) => row.id === id))
  .filter(Boolean)
  .map((row) => {
    return `### ${row.id} (${row.area_th}, ${row.difficulty})

**โจทย์:** ${row.prompt_th}

**เฉลย:** ${row.correct_option}. ${row.correct_answer}

**BA Junior:** ${row.junior_review}

**BA Senior:** ${row.senior_review}

**BA Team Lead:** ${row.team_lead_review}

**บริบทแบงค์:** ${row.banking_reference}`;
  })
  .join("\n\n");

const markdown = `# Req Gym BA Persona Review

Generated from \`lib/req-gym-bank.ts\`.

## Scope

- Total questions: ${rows.length}
- Areas: ${Object.entries(countsByArea)
    .map(([area, count]) => `${areaLabels[area] ?? area} = ${count}`)
    .join(", ")}
- Difficulty: ${Object.entries(countsByDifficulty)
    .map(([difficulty, count]) => `${difficulty} = ${count}`)
    .join(", ")}
- Full per-question output: \`docs/req-gym-ba-persona-review.csv\`

## Interpretation

This pass treats each persona as choosing the best answer from the existing answer key, then reviewing the reasoning from a different BA maturity level:

- BA Junior: direct clue, basic concept, and common pitfall.
- BA Senior: business/process/system/control impact in a bank environment.
- BA Team Lead: readiness gate before sending requirement to build, test, operation, or approval.

## Sample

${sampleSections}
`;

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "req-gym-ba-persona-review.csv"), `\uFEFF${csv}`, "utf8");
await writeFile(join(outDir, "req-gym-ba-persona-review.md"), markdown, "utf8");

console.log(
  JSON.stringify(
    {
      generated: rows.length,
      csv: "docs/req-gym-ba-persona-review.csv",
      markdown: "docs/req-gym-ba-persona-review.md",
      countsByArea,
      countsByDifficulty,
    },
    null,
    2,
  ),
);

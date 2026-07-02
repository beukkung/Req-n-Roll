import {
  REQ_GYM_BACCM_CONCEPTS,
  REQ_GYM_BANKING_TAGS,
  REQ_GYM_ECBA_DOMAINS,
  REQ_GYM_OFFICIAL_AREAS,
  REQ_GYM_QUESTION_TARGET,
  REQ_GYM_QUESTIONS,
} from "../lib/req-gym-bank.ts";
import {
  REQ_GYM_AREA_SET_SIZE,
  REQ_GYM_MOCK_SET_SIZE,
  selectReqGymPracticeQuestions,
} from "../lib/req-gym-practice.ts";

function fail(message) {
  throw new Error(message);
}

if (REQ_GYM_QUESTIONS.length !== REQ_GYM_QUESTION_TARGET) {
  fail(`expected ${REQ_GYM_QUESTION_TARGET} Req Gym questions, got ${REQ_GYM_QUESTIONS.length}`);
}

const ids = new Set();
const prompts = new Set();
const areaCounts = new Map(REQ_GYM_OFFICIAL_AREAS.map((area) => [area, 0]));
const difficultyCounts = new Map([
  ["easy", 0],
  ["medium", 0],
  ["hard", 0],
]);
const ecbaDomainCounts = new Map(REQ_GYM_ECBA_DOMAINS.map((domain) => [domain, 0]));
const bankingTagCounts = new Map(REQ_GYM_BANKING_TAGS.map((tag) => [tag, 0]));
const baccmConcepts = new Set(REQ_GYM_BACCM_CONCEPTS);
const bankingTags = new Set(REQ_GYM_BANKING_TAGS);
const bankingContextPattern =
  /ธนาคาร|แบงค์|บัญชี|สินเชื่อ|เครดิต|KYC|e-KYC|AML|BOT|FCD|e-FCD|โอนเงิน|พร้อมเพย์|บัตรเครดิต|บัตรเดบิต|สาขา|เงินฝาก|เงินกู้|วงเงิน|หลักประกัน|นิติบุคคล|bank|teller|chargeback|dispute|settlement|merchant|mortgage|refinance|LTV|suitability|bulk payment|maker-checker|sanction|approval matrix|loan|credit|deposit|mobile banking|wallet|Compliance|Risk/i;

for (const question of REQ_GYM_QUESTIONS) {
  if (ids.has(question.id)) fail(`duplicate question id: ${question.id}`);
  ids.add(question.id);

  if (prompts.has(question.promptTh)) fail(`duplicate prompt: ${question.promptTh}`);
  prompts.add(question.promptTh);

  if (!areaCounts.has(question.area)) fail(`unknown knowledge area on ${question.id}: ${question.area}`);
  areaCounts.set(question.area, areaCounts.get(question.area) + 1);

  if (!difficultyCounts.has(question.difficulty)) {
    fail(`unknown difficulty on ${question.id}: ${question.difficulty}`);
  }
  difficultyCounts.set(question.difficulty, difficultyCounts.get(question.difficulty) + 1);

  if (!Array.isArray(question.options) || question.options.length !== 4) {
    fail(`${question.id} must have exactly 4 answer options`);
  }

  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
    fail(`${question.id} answer index is out of range`);
  }

  if (question.promptTh.trim().length < 80) fail(`${question.id} prompt is too short`);
  if (question.explanationTh.trim().length < 80) fail(`${question.id} explanation is too short`);
  if (!bankingContextPattern.test(question.promptTh)) {
    fail(`${question.id} is missing banking work context: ${question.promptTh}`);
  }

  if (!ecbaDomainCounts.has(question.ecbaDomain)) {
    fail(`${question.id} has invalid or missing ECBA domain: ${question.ecbaDomain}`);
  }
  ecbaDomainCounts.set(question.ecbaDomain, ecbaDomainCounts.get(question.ecbaDomain) + 1);

  if (!Array.isArray(question.baccmConcepts) || question.baccmConcepts.length < 2) {
    fail(`${question.id} must have at least 2 BACCM concepts`);
  }
  for (const concept of question.baccmConcepts) {
    if (!baccmConcepts.has(concept)) fail(`${question.id} has unknown BACCM concept: ${concept}`);
  }

  if (!Array.isArray(question.bankingTags) || question.bankingTags.length < 2) {
    fail(`${question.id} must have at least 2 banking risk tags`);
  }
  for (const tag of question.bankingTags) {
    if (!bankingTags.has(tag)) fail(`${question.id} has unknown banking tag: ${tag}`);
    bankingTagCounts.set(tag, bankingTagCounts.get(tag) + 1);
  }

  if (typeof question.testingPoint !== "string" || question.testingPoint.trim().length < 30) {
    fail(`${question.id} must have a focused testing point`);
  }

  if (!Array.isArray(question.distractorRationales) || question.distractorRationales.length !== 3) {
    fail(`${question.id} must explain the 3 distractors`);
  }
  for (const rationale of question.distractorRationales) {
    if (typeof rationale !== "string" || rationale.trim().length < 30) {
      fail(`${question.id} has a weak distractor rationale: ${rationale}`);
    }
  }

  const optionSet = new Set(question.options);
  if (optionSet.size !== question.options.length) fail(`${question.id} has duplicate options`);
}

for (const [area, count] of areaCounts) {
  if (count < 150) fail(`${area} has too few questions: ${count}`);
}

for (const [difficulty, count] of difficultyCounts) {
  if (count < 200) fail(`${difficulty} difficulty has too few questions: ${count}`);
}

for (const [domain, count] of ecbaDomainCounts) {
  if (count < 40) fail(`${domain} ECBA domain has too few questions: ${count}`);
}

for (const tag of [
  "KYC / e-KYC",
  "AML / CFT / CPF",
  "Payment Systems",
  "IT Risk / Cyber Resilience",
  "Data Governance",
  "PDPA / Consent / Privacy",
  "Responsible Lending",
  "Operational Risk",
  "Regulatory Reporting",
  "Credit Underwriting",
  "Collections / Debt Assistance",
]) {
  if ((bankingTagCounts.get(tag) ?? 0) === 0) fail(`required banking tag is missing: ${tag}`);
}

const areaPool = REQ_GYM_QUESTIONS.filter((question) => question.area === "strategy_analysis");
const stableAreaSet = selectReqGymPracticeQuestions(areaPool, "strategy_analysis", 12345);
const repeatedAreaSet = selectReqGymPracticeQuestions(areaPool, "strategy_analysis", 12345);
const nextAreaSet = selectReqGymPracticeQuestions(areaPool, "strategy_analysis", 12346);

if (stableAreaSet.length !== REQ_GYM_AREA_SET_SIZE) {
  fail(`area practice set should have ${REQ_GYM_AREA_SET_SIZE} questions, got ${stableAreaSet.length}`);
}

if (stableAreaSet.map((question) => question.id).join("|") !== repeatedAreaSet.map((question) => question.id).join("|")) {
  fail("same area seed should produce the same practice set");
}

if (stableAreaSet.map((question) => question.id).join("|") === nextAreaSet.map((question) => question.id).join("|")) {
  fail("different area seeds should produce a different practice set");
}

const mockSet = selectReqGymPracticeQuestions(REQ_GYM_QUESTIONS, "mock", 54321);
const mockAreas = new Set(mockSet.map((question) => question.area));

if (mockSet.length !== REQ_GYM_MOCK_SET_SIZE) {
  fail(`mock practice set should have ${REQ_GYM_MOCK_SET_SIZE} questions, got ${mockSet.length}`);
}

for (const area of REQ_GYM_OFFICIAL_AREAS) {
  if (!mockAreas.has(area)) fail(`mock practice set is missing area: ${area}`);
}

console.log(
  JSON.stringify(
    {
      total: REQ_GYM_QUESTIONS.length,
      areas: Object.fromEntries(areaCounts),
      difficulties: Object.fromEntries(difficultyCounts),
      ecbaDomains: Object.fromEntries(ecbaDomainCounts),
      bankingTags: Object.fromEntries(bankingTagCounts),
      practiceSetSize: REQ_GYM_AREA_SET_SIZE,
      mockSetSize: REQ_GYM_MOCK_SET_SIZE,
    },
    null,
    2,
  ),
);

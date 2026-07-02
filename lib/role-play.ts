export type RolePlayScenario = {
  id: string;
  title: string;
  stakeholderRole: string;
  context: string;
  openingLine: string;
  exampleResponse: string;
  goal: string;
  hiddenConcerns: string[];
  expectedSignals: string[];
};

export type RolePlayDimensionId = "clarity" | "control" | "stakeholder" | "nextStep";

export type RolePlayDimensionScore = {
  id: RolePlayDimensionId;
  label: string;
  score: number;
  maxScore: number;
  evidence: string;
};

export type RolePlayTurnReview = {
  scenario: RolePlayScenario;
  totalScore: number;
  dimensionScores: RolePlayDimensionScore[];
  stakeholderReply: string;
  coachingNotes: string[];
};

export const ROLE_PLAY_SCENARIOS: RolePlayScenario[] = [
  {
    id: "promptpay-timeout-scope",
    title: "PromptPay timeout ตอนปิดยอด",
    stakeholderRole: "Operations Manager",
    context:
      "ทีม Ops เจอรายการ PromptPay timeout ช่วงสิ้นวัน ลูกค้าโทรเข้ามาถามสถานะ แต่ระบบแสดงผลไม่ตรงกันระหว่าง mobile banking กับ back office",
    openingLine:
      "ขอให้แก้ให้ลูกค้าเห็นสถานะถูกต้องเร็ว ๆ ได้ไหม ไม่อยากให้ call center ต้องตามเคสเองทุกวัน",
    exampleResponse:
      "ขอแยกก่อนครับว่า scope ที่ต้องแก้คือสถานะบน mobile, back office, หรือ reconciliation ทั้ง flow และ success metric ที่อยากลดคือ complaint SLA หรือ manual case ต่อวัน? ขอ confirm exception state เช่น pending, timeout, partial success, owner ของการตามเคส และ audit evidence ที่ Ops/Compliance ต้องใช้ก่อนสรุป requirement ครับ",
    goal: "แยก problem, scope, exception state, owner, SLA และ evidence ที่ต้องใช้ audit",
    hiddenConcerns: [
      "partial success ระหว่าง payment gateway กับ core banking",
      "การแจ้งลูกค้าอาจกระทบ complaint SLA",
      "Ops ต้องการลด manual reconciliation",
    ],
    expectedSignals: ["scope boundary", "exception", "audit", "owner", "SLA"],
  },
  {
    id: "kyc-product-sponsor-pressure",
    title: "Sponsor ขอข้าม e-KYC step",
    stakeholderRole: "Product Sponsor",
    context:
      "Sponsor ต้องการลด drop-off ใน onboarding เงินฝากดิจิทัล และเสนอให้เลื่อนบาง e-KYC check ไปหลังเปิดบัญชี",
    openingLine:
      "ถ้าต้องถามข้อมูลเยอะ ลูกค้าหลุดหมด เราข้ามไปก่อนแล้วค่อยตรวจทีหลังได้ไหม",
    exampleResponse:
      "ขอเข้าใจ goal เรื่อง drop-off ก่อนครับ แล้วช่วยแยกหน่อยว่า e-KYC step ไหนเป็น regulatory minimum, step ไหนเป็น UX friction ที่ปรับได้? ถ้าจะ defer check ต้องให้ Compliance/Risk ยืนยัน risk appetite, fraud control, account limitation และ decision owner ก่อน ผมขอทำ option A/B พร้อม impact ต่อ conversion และ compliance ครับ",
    goal: "คุยให้เห็น risk appetite, regulatory constraint, customer impact และ decision owner",
    hiddenConcerns: [
      "มี regulatory minimum ที่ BA ไม่ควรตัดเอง",
      "ทีม Fraud กังวลบัญชี mule",
      "มีทางเลือก progressive disclosure ที่ยังคุม risk ได้",
    ],
    expectedSignals: ["Compliance", "Risk", "decision", "option", "impact"],
  },
  {
    id: "credit-policy-change",
    title: "Policy สินเชื่อเปลี่ยนกลาง UAT",
    stakeholderRole: "Credit Policy Lead",
    context:
      "ทีม Credit เปลี่ยน debt burden rule ระหว่าง UAT ทำให้ test cases และ decision table เดิมไม่ตรง policy ล่าสุด",
    openingLine:
      "Policy ใหม่เพิ่งอนุมัติ ต้องเข้า release นี้เลย ไม่งั้นทีมขายใช้เกณฑ์เก่า",
    exampleResponse:
      "ขอ policy version, effective date และ approval owner ก่อนครับ จากนั้นเราควรทำ impact list ต่อ decision table, test cases, regression scope, cutover และเคสที่ยื่นค้าง ถ้าต้องเข้า release นี้จริง ขอ confirm ว่าอะไรเป็น must-have policy change และอะไรเลื่อนได้ พร้อม decision log จาก Credit Policy ครับ",
    goal: "จับ change impact, traceability, cutover, regression scope และ approval path",
    hiddenConcerns: [
      "decision table versioning ไม่ชัด",
      "ต้องสื่อสารกับ Sales และ Collections",
      "อาจต้องทำ migration สำหรับเคสที่ยื่นค้าง",
    ],
    expectedSignals: ["impact", "traceability", "approval", "regression", "cutover"],
  },
  {
    id: "pdpa-consent-ambiguity",
    title: "Consent wording ไม่ชัด",
    stakeholderRole: "Legal / DPO",
    context:
      "ทีมการตลาดขอใช้ข้อมูลธุรกรรมเพื่อ personalized offer แต่ consent wording เดิมกว้างและไม่แยก purpose",
    openingLine:
      "คำว่าเพื่อปรับปรุงบริการน่าจะพอแล้วไหม จะได้ไม่ต้องแก้หน้าจอหลายจุด",
    exampleResponse:
      "ขอแยก purpose ก่อนครับว่า personalized offer ใช้ data category อะไรและใช้บน lawful basis ไหน ถ้าเป็น consent ต้อง granular, ถอนยินยอมได้ และมี evidence ว่าลูกค้าเห็น wording version ไหน ผมขอให้ DPO/Legal confirm wording และเราทำ impact ต่อ UX screen, audit log และ preference management ครับ",
    goal: "แยก purpose, data category, lawful basis, withdrawal, audit evidence และ UX impact",
    hiddenConcerns: [
      "consent ต้อง granular และถอนยินยอมได้",
      "ต้องมี evidence ว่าลูกค้าเห็น wording เวอร์ชันไหน",
      "Marketing อยากลด friction แต่ DPO ต้องคุม compliance",
    ],
    expectedSignals: ["PDPA", "purpose", "withdrawal", "audit", "UX"],
  },
];

const DIMENSIONS: Array<{
  id: RolePlayDimensionId;
  label: string;
  maxScore: number;
  patterns: RegExp[];
  positive: string;
  missing: string;
}> = [
  {
    id: "clarity",
    label: "Clarify requirement",
    maxScore: 25,
    patterns: [
      /clarify|ชัด|scope|boundary|metric|success|SLA|acceptance|criteria|definition|วัดผล|เป้าหมาย/i,
    ],
    positive: "ถามเพื่อทำให้ scope, metric หรือ acceptance ชัดขึ้น",
    missing: "เพิ่มคำถามเรื่อง scope, success metric หรือ acceptance criteria",
  },
  {
    id: "control",
    label: "Banking control",
    maxScore: 25,
    patterns: [
      /PDPA|consent|AML|KYC|sanction|BOT|audit|maker|checker|approval|compliance|risk|control/i,
    ],
    positive: "ดึง risk, compliance, audit หรือ approval เข้ามาในบทสนทนา",
    missing: "เติมคำถามเรื่อง compliance, audit trail, approval และ operational risk",
  },
  {
    id: "stakeholder",
    label: "Stakeholder alignment",
    maxScore: 25,
    patterns: [
      /stakeholder|owner|sponsor|operations?|call center|legal|DPO|fraud|credit|ทีม|ผู้อนุมัติ|เจ้าของ/i,
    ],
    positive: "ระบุ owner หรือทีมที่ต้องร่วมตัดสินใจได้",
    missing: "ถามให้ชัดว่าใครเป็น owner, approver และทีมที่ได้รับผลกระทบ",
  },
  {
    id: "nextStep",
    label: "Next step",
    maxScore: 25,
    patterns: [
      /next|timeline|confirm|workshop|decision|follow|action|log|minute|สรุป|นัด|ยืนยัน|ก่อน/i,
    ],
    positive: "ปิดบทสนทนาด้วย action หรือ decision path ที่ต่อได้",
    missing: "ปิดท้ายด้วย next step, owner และเวลาที่ต้องได้คำตอบ",
  },
];

export function getRolePlayScenario(scenarioId: string) {
  return ROLE_PLAY_SCENARIOS.find((scenario) => scenario.id === scenarioId);
}

export function createRolePlayTurnReview(
  scenarioId: string,
  message: string,
): RolePlayTurnReview {
  const scenario = getRolePlayScenario(scenarioId) ?? ROLE_PLAY_SCENARIOS[0];
  const response = message.trim();

  const dimensionScores = DIMENSIONS.map((dimension) => {
    const matched = dimension.patterns.some((pattern) => pattern.test(response));
    const scenarioBonus = scenario.expectedSignals.some((signal) =>
      response.toLowerCase().includes(signal.toLowerCase()),
    );
    const score = response.length < 24 ? 6 : matched ? dimension.maxScore : scenarioBonus ? 18 : 12;

    return {
      id: dimension.id,
      label: dimension.label,
      score,
      maxScore: dimension.maxScore,
      evidence: matched || scenarioBonus ? dimension.positive : dimension.missing,
    };
  });

  const totalScore = dimensionScores.reduce((sum, item) => sum + item.score, 0);
  const missing = dimensionScores.filter((score) => score.score < 18);
  const coachingNotes =
    missing.length === 0
      ? [
          "ดีมาก: คำตอบมีทั้งคำถามชี้ scope, control, stakeholder และ next step",
          "รอบถัดไปลองสรุป trade-off ให้ stakeholder เลือกเป็น option A/B/C",
        ]
      : missing.map((score) => score.evidence);

  return {
    scenario,
    totalScore,
    dimensionScores,
    stakeholderReply: buildStakeholderReply(scenario, totalScore, missing.map((item) => item.id)),
    coachingNotes,
  };
}

function buildStakeholderReply(
  scenario: RolePlayScenario,
  totalScore: number,
  missing: RolePlayDimensionId[],
) {
  if (totalScore >= 78) {
    return `โอเค เห็นภาพขึ้นเยอะ งั้นช่วยทำ summary เป็น decision log ให้หน่อยว่า ${scenario.expectedSignals
      .slice(0, 3)
      .join(", ")} ต้อง confirm กับใครบ้าง`;
  }

  if (missing.includes("control")) {
    return "เข้าใจเรื่อง flow แล้ว แต่ถ้าต้องผ่าน Compliance/Risk เราต้องมี evidence หรือ control อะไรบ้าง?";
  }

  if (missing.includes("nextStep")) {
    return "แล้วจากตรงนี้เราต้องตัดสินใจอะไร วันนี้ใครต้องตอบ และจะไม่ให้ scope ไหลยังไง?";
  }

  return "พอเข้าใจ แต่ยังอยากให้ช่วยแยกให้ชัดว่าอะไรอยู่ใน release นี้ อะไรเป็น later phase";
}

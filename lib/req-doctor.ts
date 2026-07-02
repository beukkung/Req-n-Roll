export type ReqDoctorSeverity = "high" | "medium" | "low";

export type ReqDoctorIssue = {
  id: string;
  title: string;
  severity: ReqDoctorSeverity;
  detail: string;
  fix: string;
};

export type ReqDoctorReport = {
  original: string;
  overallScore: number;
  level: "draft" | "workable" | "bank-ready";
  issues: ReqDoctorIssue[];
  strengths: string[];
  checklist: string[];
  suggestedRewrite: string;
};

const VAGUE_TERMS = [
  "เร็ว",
  "ง่าย",
  "สะดวก",
  "ดี",
  "ครบ",
  "ทุกแบบ",
  "เหมาะสม",
  "user-friendly",
  "asap",
  "etc",
  "และอื่นๆ",
];

const ACCEPTANCE_PATTERNS = [
  /acceptance criteria/i,
  /\bgiven\b.+\bwhen\b.+\bthen\b/i,
  /เมื่อ.+แล้ว|ถ้า.+ต้อง|กรณี.+ต้อง/,
  /ภายใน\s*\d+|ไม่เกิน\s*\d+|\d+\s*(วินาที|นาที|ชั่วโมง|วัน|%)/,
];

const BANKING_CONTROL_PATTERNS = [
  /KYC|e-KYC|AML|CFT|sanction|BOT|PDPA|consent|audit|maker-?checker|approval|Compliance|Risk|DPO/i,
  /ยินยอม|ตรวจสอบตัวตน|ตรวจสอบ|อนุมัติ|หลักฐาน|บันทึก|ส่งเคส|รีวิว|รีวิว์|ความเสี่ยง|ควบคุม/,
];

const BANKING_CONTEXT_PATTERNS = [
  /วงเงิน|บัญชี|พร้อมเพย์|โอนเงิน|บัตร|สินเชื่อ|ธุรกรรม|นิติบุคคล/,
  /bank|banking|account|transfer|payment|card|loan|credit|transaction|PromptPay/i,
];

const STAKEHOLDER_PATTERNS = [
  /ลูกค้า|ผู้ใช้|เจ้าหน้าที่|สาขา|operations?|compliance|risk|legal|sponsor|product owner|call center/i,
];

function hasAny(text: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(text));
}

function countMatches(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  return terms.filter((term) => lower.includes(term.toLowerCase())).length;
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function createIssue(
  id: string,
  title: string,
  severity: ReqDoctorSeverity,
  detail: string,
  fix: string,
): ReqDoctorIssue {
  return { id, title, severity, detail, fix };
}

export function analyzeRequirementArtifact(input: string): ReqDoctorReport {
  const original = input.trim();
  const issues: ReqDoctorIssue[] = [];
  const strengths: string[] = [];

  if (!original) {
    return {
      original,
      overallScore: 0,
      level: "draft",
      issues: [
        createIssue(
          "empty",
          "ยังไม่มี requirement ให้ตรวจ",
          "high",
          "Req Doctor ต้องมี statement, user story, หรือ acceptance criteria อย่างน้อยหนึ่งชุด",
          "วางข้อความ requirement ที่ต้องการ review ก่อน แล้วค่อยรันตรวจอีกครั้ง",
        ),
      ],
      strengths: [],
      checklist: buildChecklist(),
      suggestedRewrite: "",
    };
  }

  let score = 100;
  const vagueCount = countMatches(original, VAGUE_TERMS);

  if (original.length < 120) {
    score -= 18;
    issues.push(
      createIssue(
        "thin-context",
        "บริบทยังบางเกินไป",
        "medium",
        "ข้อความสั้นจนยังไม่เห็น actor, trigger, business outcome, และข้อยกเว้น",
        "เพิ่มว่าใครทำอะไร เมื่อไร ทำไปเพื่อ business outcome ใด และมีกรณียกเว้นอะไรบ้าง",
      ),
    );
  } else {
    strengths.push("มีบริบทมากพอให้ reviewer จับประเด็นธุรกิจและระบบได้");
  }

  if (vagueCount > 0) {
    score -= Math.min(20, vagueCount * 6);
    issues.push(
      createIssue(
        "vague-language",
        "มีคำกำกวมที่เสี่ยงตีความไม่ตรงกัน",
        vagueCount >= 3 ? "high" : "medium",
        `พบคำที่ยังวัดผลยาก เช่น ${VAGUE_TERMS.filter((term) =>
          original.toLowerCase().includes(term.toLowerCase()),
        )
          .slice(0, 4)
          .join(", ")}`,
        "เปลี่ยนคำกว้าง ๆ เป็นตัวเลข เงื่อนไข SLA ขอบเขต หรือ definition of done",
      ),
    );
  } else {
    strengths.push("ใช้ถ้อยคำค่อนข้างเฉพาะเจาะจง ไม่พึ่งคำกว้าง ๆ อย่างเร็วหรือใช้ง่าย");
  }

  if (!hasAny(original, STAKEHOLDER_PATTERNS)) {
    score -= 14;
    issues.push(
      createIssue(
        "actor-missing",
        "ยังไม่เห็น actor หรือ stakeholder หลัก",
        "medium",
        "ถ้าไม่ระบุผู้ใช้หรือทีมที่เกี่ยวข้อง จะออกแบบ flow, permission, และ ownership ยาก",
        "ระบุ actor หลักและ stakeholder ที่ต้อง sign-off เช่น ลูกค้า, Operations, Compliance, Risk",
      ),
    );
  } else {
    strengths.push("ระบุ stakeholder หรือ actor ได้พอเห็นภาพการใช้งาน");
  }

  if (!hasAny(original, ACCEPTANCE_PATTERNS)) {
    score -= 22;
    issues.push(
      createIssue(
        "acceptance-criteria",
        "ขาด acceptance criteria ที่ทดสอบได้",
        "high",
        "ยังไม่มีเงื่อนไขแบบ Given/When/Then, SLA, threshold, หรือ expected result ที่ QA/Dev ใช้ยืนยันได้",
        "เพิ่ม acceptance criteria แยก happy path, exception path, และ control path อย่างน้อย 3 ข้อ",
      ),
    );
  } else {
    strengths.push("มี acceptance criteria หรือเงื่อนไขที่นำไปทดสอบได้");
  }

  if (!/\bwhy\b|เพื่อ|เป้าหมาย|ลด|เพิ่ม|KPI|success metric|business outcome/i.test(original)) {
    score -= 12;
    issues.push(
      createIssue(
        "business-outcome",
        "ยังไม่ผูกกับ outcome หรือ metric",
        "medium",
        "Requirement ที่ไม่บอกเหตุผลทางธุรกิจจะจัด priority และตัด scope ยาก",
        "เพิ่มเป้าหมาย เช่น ลด manual review, ลด dispute, เพิ่ม straight-through processing หรือ KPI ที่วัดได้",
      ),
    );
  } else {
    strengths.push("เชื่อม requirement กับ outcome หรือ metric ได้");
  }

  const hasBankingControl = hasAny(original, BANKING_CONTROL_PATTERNS);
  const hasBankingContext = hasAny(original, BANKING_CONTEXT_PATTERNS);

  if (!hasBankingControl) {
    score -= 18;
    issues.push(
      createIssue(
        "banking-controls",
        "ยังไม่เห็น control สำคัญของงานแบงค์",
        "high",
        hasBankingContext
          ? "ข้อความเป็นบริบทธนาคาร แต่ยังไม่เห็น privacy, AML/KYC, audit trail, approval, operational risk หรือ regulatory handoff ที่ต้องคุม"
          : "งานธนาคารต้องคิดเรื่อง privacy, AML/KYC, audit trail, approval, operational risk และ regulatory handoff ตั้งแต่ต้น",
        "เพิ่ม control ที่เกี่ยวข้อง เช่น PDPA consent, AML screening, maker-checker, audit log, exception queue",
      ),
    );
  } else {
    strengths.push("ครอบคลุม banking control สำคัญ เช่น compliance, audit, approval หรือ privacy");
  }

  if (!/exception|error|timeout|pending|fallback|กรณี|ล้มเหลว|ยกเว้น|ไม่สำเร็จ/i.test(original)) {
    score -= 10;
    issues.push(
      createIssue(
        "exception-path",
        "ยังไม่เห็น exception path",
        "medium",
        "ระบบจริงในแบงค์มักพังที่ timeout, partial success, fraud hit, duplicate request หรือ downstream unavailable",
        "เพิ่มกรณีผิดปกติและ expected state เช่น pending, reject, retry, manual review หรือ reversal",
      ),
    );
  } else {
    strengths.push("มีการคิด exception หรือสถานะผิดปกติไว้แล้ว");
  }

  const overallScore = clampScore(score);
  const level =
    overallScore >= 78 ? "bank-ready" : overallScore >= 52 ? "workable" : "draft";

  return {
    original,
    overallScore,
    level,
    issues,
    strengths,
    checklist: buildChecklist(),
    suggestedRewrite: buildSuggestedRewrite(original, issues),
  };
}

function buildChecklist() {
  return [
    "Actor และ stakeholder ชัด",
    "Trigger / pre-condition / post-condition ชัด",
    "Acceptance criteria มี happy path, exception path, control path",
    "มี metric หรือ SLA ที่วัดผลได้",
    "ครอบคลุม banking control: PDPA, AML/KYC, audit, approval, operational risk",
    "มี owner สำหรับ decision ที่ยังค้าง",
  ];
}

function buildSuggestedRewrite(original: string, issues: ReqDoctorIssue[]) {
  const issueIds = new Set(issues.map((issue) => issue.id));
  const actor = issueIds.has("actor-missing")
    ? "สำหรับ [actor เช่น ลูกค้าบุคคลธรรมดา / เจ้าหน้าที่สาขา]"
    : "สำหรับ actor ที่ระบุไว้";
  const metric = issueIds.has("business-outcome")
    ? "เพื่อ [business outcome หรือ KPI ที่วัดได้]"
    : "เพื่อรักษา outcome ที่กำหนด";
  const controls = issueIds.has("banking-controls")
    ? "พร้อมตรวจ PDPA consent, AML/KYC, approval matrix และ audit log"
    : "พร้อม control ตามที่ระบุ";

  return `${actor} เมื่อ [trigger] ระบบต้อง [capability] ${controls} ${metric}

Acceptance Criteria:
1. Given [pre-condition] When [action] Then [expected result พร้อม SLA/metric]
2. Given [exception เช่น timeout/sanction hit/วงเงินไม่พอ] When [action] Then [status และ owner ของการแก้ไข]
3. Given [control scenario] When [review] Then [evidence/audit/report ที่ต้องมี]

ข้อความต้นฉบับที่ควร refine: ${original.slice(0, 220)}`;
}

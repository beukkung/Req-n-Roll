export type CoachBotMode = "mentor" | "team-lead" | "compliance" | "career";

export type CoachMessage = {
  role: "user" | "assistant";
  content: string;
};

export type CoachValidationResult =
  | { ok: true; messages: CoachMessage[]; mode: CoachBotMode }
  | { ok: false; error: { code: string; message: string } };

export type CoachFallbackReply = {
  provider: "local-fallback";
  reply: string;
  sensitiveFindings: string[];
};

export type SensitiveDataBlock = {
  block: boolean;
  message: string;
};

export const COACH_BOT_MODES: Array<{
  id: CoachBotMode;
  label: string;
  description: string;
}> = [
  {
    id: "mentor",
    label: "Mentor",
    description: "ช่วยคิดคำถามและ refine requirement แบบเป็นกันเอง",
  },
  {
    id: "team-lead",
    label: "Team Lead",
    description: "review แบบเข้มขึ้น เน้น scope, ownership และ readiness",
  },
  {
    id: "compliance",
    label: "Compliance Lens",
    description: "ช่วยชี้จุดเสี่ยงด้าน control, PDPA, AML/KYC และ audit",
  },
  {
    id: "career",
    label: "Career Coach",
    description: "ช่วยวางแผนเติบโตเป็น BA ที่แข็งขึ้นในสายงานแบงค์",
  },
];

const SENSITIVE_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: "เลขบัญชีหรือเลขอ้างอิงยาว", pattern: /\b\d{10,16}\b/ },
  {
    label: "เลขบัตรประชาชนไทยที่ดูเป็นไปได้",
    pattern: /\b[1-9]\d{12}\b/,
  },
  {
    label: "เลขบัตรชำระเงิน",
    pattern: /\b(?:\d[ -]*?){13,19}\b/,
  },
  {
    label: "อีเมลส่วนบุคคล",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  },
  {
    label: "เบอร์โทรศัพท์",
    pattern: /\b0\d{1,2}[- ]?\d{3}[- ]?\d{4}\b/,
  },
];

export function detectSensitiveBankingData(text: string) {
  const findings = new Set<string>();
  for (const item of SENSITIVE_PATTERNS) {
    if (item.pattern.test(text)) findings.add(item.label);
  }
  return [...findings];
}

export function hasSensitiveDataBlock(findings: readonly string[]): SensitiveDataBlock {
  if (findings.length === 0) {
    return { block: false, message: "" };
  }

  return {
    block: true,
    message: `Please mask sensitive customer data before sending. Detected: ${findings.join(", ")}.`,
  };
}

export function validateCoachMessages(body: unknown): CoachValidationResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      error: { code: "invalid_json", message: "Request body must be an object" },
    };
  }

  const input = body as { messages?: unknown; mode?: unknown };
  const rawMessages = input.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return {
      ok: false,
      error: { code: "messages_required", message: "At least one message is required" },
    };
  }

  if (rawMessages.length > 12) {
    return {
      ok: false,
      error: { code: "too_many_messages", message: "Send at most 12 recent messages" },
    };
  }

  const messages: CoachMessage[] = [];
  for (const raw of rawMessages) {
    if (!raw || typeof raw !== "object") {
      return {
        ok: false,
        error: { code: "invalid_message", message: "Each message must be an object" },
      };
    }

    const item = raw as { role?: unknown; content?: unknown };
    if (item.role !== "user" && item.role !== "assistant") {
      return {
        ok: false,
        error: { code: "unsupported_role", message: "Only user and assistant roles are supported" },
      };
    }

    if (typeof item.content !== "string" || item.content.trim().length === 0) {
      return {
        ok: false,
        error: { code: "empty_content", message: "Message content is required" },
      };
    }

    const content = item.content.trim();
    if (content.length > 2000) {
      return {
        ok: false,
        error: { code: "content_too_long", message: "Each message must be under 2,000 characters" },
      };
    }

    messages.push({ role: item.role, content });
  }

  const mode =
    input.mode === "team-lead" ||
    input.mode === "compliance" ||
    input.mode === "career" ||
    input.mode === "mentor"
      ? input.mode
      : "mentor";

  return { ok: true, messages, mode };
}

export function buildCoachSystemPrompt(mode: CoachBotMode) {
  const modeInstruction: Record<CoachBotMode, string> = {
    mentor: "ตอบแบบ mentor ที่ช่วย junior BA คิดต่ออย่างอบอุ่น แต่ยัง precise",
    "team-lead": "ตอบแบบ BA team lead ที่ท้าทาย scope, owner, readiness และ delivery risk",
    compliance:
      "ตอบผ่าน lens ของ compliance/risk โดยชี้ PDPA, AML/KYC, audit, approval และ regulatory handoff ที่ควรถาม",
    career:
      "ตอบแบบ career coach สำหรับ BA งานแบงค์ ช่วยวางแผน skill gap, portfolio, promotion, interview story และ next role อย่างเป็นรูปธรรม",
  };
  const structureInstruction =
    mode === "career"
      ? "Structure answers with: 1) เป้าหมายอาชีพ, 2) skill gap สำคัญ, 3) แผน 30/60/90 วัน, 4) portfolio/interview story ที่ควรสร้าง, 5) next step."
      : "Structure answers with: 1) อ่านสถานการณ์, 2) คำถามที่ควรถาม, 3) artifact/AC ที่ควรได้, 4) next step.";

  return [
    "You are Req'n Roll Coach Bot for Thai banking business analysts.",
    modeInstruction[mode],
    "Use Thai by default. Be concise, practical, and scenario-based.",
    "Do not provide legal approval. Ask the user to confirm with Compliance, Legal, Risk, DPO, or policy owner when needed.",
    "For career coaching, do not promise hiring, promotion, compensation, or certification outcomes. Give practical preparation steps and ask for role context when missing.",
    "Never ask for real customer PII, account numbers, card numbers, secrets, OTP, or production credentials. Tell users to mask sensitive data.",
    structureInstruction,
  ].join("\n");
}

export function buildCoachPrompt(messages: CoachMessage[], mode: CoachBotMode) {
  const recent = messages
    .slice(-8)
    .map((message) => `${message.role === "user" ? "User" : "Coach"}: ${message.content}`)
    .join("\n\n");

  return `${buildCoachSystemPrompt(mode)}

Conversation:
${recent}`;
}

export function buildCoachBotFallbackReply(
  messages: CoachMessage[],
  mode: CoachBotMode,
): CoachFallbackReply {
  const latest = messages[messages.length - 1]?.content ?? "";
  const sensitiveFindings = detectSensitiveBankingData(messages.map((message) => message.content).join("\n"));
  const modeLabel = COACH_BOT_MODES.find((item) => item.id === mode)?.label ?? "Mentor";
  if (mode === "career") {
    return {
      provider: "local-fallback",
      sensitiveFindings,
      reply: `[${modeLabel}] ลองวาง career plan แบบ BA งานแบงค์ให้จับต้องได้ก่อนนะ

เป้าหมายอาชีพ:
- เลือกเป้าหมายหลัก 1 อย่าง เช่น junior -> mid BA, BA -> senior BA, BA -> product owner, หรือเตรียมสัมภาษณ์งานแบงค์
- ระบุ domain ที่อยากแข็งขึ้น เช่น payments, lending, onboarding/e-KYC, operations, compliance หรือ data/reporting

skill gap สำคัญ:
1. Requirement discovery: ถาม actor, trigger, outcome, exception และ decision owner ให้ครบ
2. Banking control: อธิบาย PDPA, AML/KYC, audit trail, maker-checker, approval และ operational risk เป็นภาษางานได้
3. Artifact quality: เขียน user story, AC, process flow, decision log และ traceability ให้คน Dev/QA/Ops ใช้ต่อได้
4. Stakeholder handling: สรุป trade-off, scope boundary และ option ให้ sponsor ตัดสินใจได้

แผน 30/60/90 วัน:
- 30 วัน: เก็บตัวอย่าง requirement จริง 3 เคส แล้ว rewrite AC ให้มี happy path, exception path, control path
- 60 วัน: ทำ mini portfolio 2 ชิ้น เช่น payment timeout case และ KYC exception case พร้อม decision log
- 90 วัน: ซ้อมเล่า STAR story 4 เรื่อง: conflict, ambiguity, compliance challenge, delivery pressure

portfolio/interview story ที่ควรสร้าง:
- ก่อนแก้: requirement กำกวมตรงไหน
- วิธีถาม: ถามใคร ถามอะไร และจับ decision อย่างไร
- ผลลัพธ์: ลด rework, ลด risk, หรือทำให้ทีม sign-off ได้เร็วขึ้นอย่างไร

Next step:
- ส่ง role เป้าหมาย, seniority ปัจจุบัน, domain ที่ทำอยู่ และ JD/skill ที่อยากไปต่อมา แล้วผมจะช่วยแตกเป็นแผนฝึกเฉพาะตัว`,
    };
  }

  const scopeCue = /scope|เปลี่ยน|เพิ่ม|ลด|UAT|release/i.test(latest)
    ? "ให้แยกว่าขอเปลี่ยนนี้เป็น defect, change request, policy must-have หรือ nice-to-have"
    : "ให้เริ่มจาก actor, trigger, expected outcome และข้อยกเว้น";
  const controlCue = /โอน|บัญชี|สินเชื่อ|consent|PDPA|AML|KYC|พร้อมเพย์|บัตร|credit|loan/i.test(latest)
    ? "ตรวจ control อย่างน้อย PDPA/consent, AML/KYC หรือ audit trail ตามบริบท"
    : "ถามหา risk/control เฉพาะของ process ก่อนสรุป requirement";

  return {
    provider: "local-fallback",
    sensitiveFindings,
    reply: `[${modeLabel}] ลองมองสถานการณ์นี้แบบ BA งานแบงค์ก่อนนะ

อ่านสถานการณ์:
- ${scopeCue}
- ${controlCue}

คำถามที่ควรถาม:
1. Business outcome หรือ KPI ที่ request นี้ต้องแก้คืออะไร?
2. ใครเป็น decision owner และใครต้อง sign-off ถ้ามีผลต่อ policy/control?
3. Happy path, exception path และ cutover/reversal ต้องเป็นอย่างไร?
4. มี evidence อะไรที่ Audit, Compliance, Risk หรือ Ops ต้องเห็น?

Artifact ที่ควรได้:
- decision log พร้อม owner/date
- acceptance criteria แบบ Given/When/Then อย่างน้อย 3 ข้อ
- impact list ต่อ customer, operation, control, report และ downstream system

Next step:
- สรุป option 2-3 ทางเลือกพร้อม trade-off แล้วให้ sponsor/owner confirm ก่อน commit scope`,
  };
}

import type {
  Persona,
  Skill,
  SkillAmpQuestion,
  DailyReqQuestion,
  ReqGymQuestion,
  Template,
} from "./types";

/**
 * Starter content for Req'n Roll v0.1 internal beta.
 *
 * NOTE: This is placeholder/demo content authored to unblock the frontend build.
 * The plan calls for 30-40 Skill Amp questions, 10 Daily Req, and 30 Req Gym
 * questions authored with a BABOK-knowledgeable reviewer (long pole — Step 11).
 * Treat the counts here as representative samples, not final.
 */

export const SKILLS: Skill[] = [
  {
    slug: "requirement_thinking",
    nameTh: "ความคิดเชิง Requirement",
    nameEn: "Requirement Thinking",
    shortTh: "ถามให้ชัด แยกปัญหาออกจากสิ่งที่ต้องการ",
    chartIndex: 1,
  },
  {
    slug: "stakeholder_communication",
    nameTh: "การสื่อสารกับ Stakeholder",
    nameEn: "Stakeholder Communication",
    shortTh: "ดึงความเห็น จัดการความคาดหวัง สื่อสารให้ตรงกลุ่ม",
    chartIndex: 2,
  },
  {
    slug: "process_system_thinking",
    nameTh: "ความคิดเชิงกระบวนการและระบบ",
    nameEn: "Process & System Thinking",
    shortTh: "มองเห็นระบบรอบด้าน เชื่อมจุดต่าง ๆ เข้าด้วยกัน",
    chartIndex: 3,
  },
  {
    slug: "product_value_thinking",
    nameTh: "ความคิดเชิงผลิตภัณฑ์และคุณค่า",
    nameEn: "Product & Value Thinking",
    shortTh: "โฟกัสที่ outcome และคุณค่า ไม่ใช่แค่ feature",
    chartIndex: 4,
  },
  {
    slug: "agile_delivery",
    nameTh: "Agile & Delivery",
    nameEn: "Agile & Delivery",
    shortTh: "แบ่งงานเล็ก ส่งมอบซ้ำ ปรับได้ระหว่างทาง",
    chartIndex: 5,
  },
  {
    slug: "soft_skill_facilitation",
    nameTh: "Soft Skill & Facilitation",
    nameEn: "Soft Skill & Facilitation",
    shortTh: "ประสานคน นำสรุป ดึงความเห็นออกมาได้",
    chartIndex: 6,
  },
];

export const PERSONAS: Persona[] = [
  {
    slug: "clarifier",
    nameTh: "เปอร์เซีย",
    nameEn: "Persian",
    personaTitleTh: "The Clarifier",
    personaTitleEn: "The Clarifier",
    taglineTh: "นักชี้แจง — ถามให้กระจ่าง ตัดความกำกวม",
    descriptionTh:
      "คุณเก่งเรื่องการถามคำถามที่ทำให้ requirement กระจ่าง แยกแยะปัญหาจากสิ่งที่ผู้ใช้อยากได้ และไม่ปล่อยให้คำว่า ‘เอาให้เร็ว ๆ’ ผ่านเข้ามาโดยไม่มีรายละเอียด",
    primarySkill: "requirement_thinking",
    breedSlug: "persian",
    breedPersonalityTh:
      "สงบและช่างสังเกต เหมือนแมวเปอร์เซียที่มองทุกอย่างละเอียดก่อนตัดสินใจ",
    accentChartIndex: 2,
  },
  {
    slug: "shipper",
    nameTh: "เบงกอล",
    nameEn: "Bengal",
    personaTitleTh: "The Shipper",
    personaTitleEn: "The Shipper",
    taglineTh: "นักส่งมอบ — ทำซะให้เสร็จ ส่งของให้ได้",
    descriptionTh:
      "คุณโฟกัสที่การส่งมอบที่ทำได้จริง แบ่งงานใหญ่ให้เล็กลง และผลักทีมให้เห็นคุณค่าเร็ว ๆ ก่อนจะค่อยปรับเพิ่ม",
    primarySkill: "agile_delivery",
    breedSlug: "bengal",
    breedPersonalityTh:
      "พลังงานสูงและว่องไว ชอบลงมือทำเหมือนเบงกอลที่ไม่อยู่นิ่ง",
    accentChartIndex: 1,
  },
  {
    slug: "facilitator",
    nameTh: "เมนคูน",
    nameEn: "Maine Coon",
    personaTitleTh: "The Facilitator",
    personaTitleEn: "The Facilitator",
    taglineTh: "นักนำทาง — ประสานคน ดึงความเห็นออกมา",
    descriptionTh:
      "คุณเก่งการทำให้คนพูดคุยกันได้ สรุปความเห็นที่กระจัดกระจาย และทำให้การประชุมไม่จบลงด้วยคำว่า ‘แล้วแต่’",
    primarySkill: "soft_skill_facilitation",
    breedSlug: "mainecoon",
    breedPersonalityTh:
      "อัธยาศัยดีและประสานคนเก่ง เหมือนเมนคูนที่เป็นมิตรกับทุกคน",
    accentChartIndex: 4,
  },
  {
    slug: "value_hunter",
    nameTh: "สยาม",
    nameEn: "Siamese",
    personaTitleTh: "The Value Hunter",
    personaTitleEn: "The Value Hunter",
    taglineTh: "นักล่าคุณค่า — มองหา outcome ไม่ใช่แค่ feature",
    descriptionTh:
      "คุณถามเสมอว่าสิ่งที่ทำอยู่ลงทุนแล้วคุ้มไหม ใครได้ประโยชน์ อย่างไร และจะวัดผลสำเร็จได้อย่างไร",
    primarySkill: "product_value_thinking",
    breedSlug: "siamese",
    breedPersonalityTh:
      "เฉียบขาดและสื่อสารตรงประเด็น เหมือนแมวสยามที่ชอบโวยวาแต่จิ้มลงตรงจุด",
    accentChartIndex: 3,
  },
  {
    slug: "scope_slayer",
    nameTh: "อะบิสซิเนียน",
    nameEn: "Abyssinian",
    personaTitleTh: "The Scope Slayer",
    personaTitleEn: "The Scope Slayer",
    taglineTh: "นักกำจัดขอบเขต — จัดการ complexity ตัดสิ่งที่ไม่จำเป็น",
    descriptionTh:
      "คุณเห็นภาพรวมของระบบและกระบวนการ จับ dependency ได้ และกล้าตัด scope ที่ไม่สอดคล้องกับเป้าหมาย",
    primarySkill: "process_system_thinking",
    breedSlug: "abyssinian",
    breedPersonalityTh:
      "ฉลาดและมองภาพรวม คล่องแคล่วอยากรู้อยากเห็น เหมือนอะบิสซิเนียนที่สำรวจทุกมุม",
    accentChartIndex: 5,
  },
];

/* ------------------------------------------------------------------ */
/* Skill Amp — Likert statements (1 = ไม่เห็นด้วย, 5 = เห็นด้วยอย่างยิ่ง) */
/* ------------------------------------------------------------------ */

export const SKILL_AMP_QUESTIONS: SkillAmpQuestion[] = [
  // requirement_thinking
  {
    id: "sa-rt-1",
    skill: "requirement_thinking",
    textTh: "ฉันมักถาม ‘ทำไมต้องเป็นสิ่งนี้’ ก่อนยอมรับ requirement ใหม่",
    weight: 1,
  },
  {
    id: "sa-rt-2",
    skill: "requirement_thinking",
    textTh: "ฉันแยก ‘ปัญหา’ ออกจาก ‘วิธีแก้’ ได้ในการสนทนากับผู้ใช้",
    weight: 1,
  },
  // stakeholder_communication
  {
    id: "sa-sc-1",
    skill: "stakeholder_communication",
    textTh: "ฉันปรับภาษาและระดับรายละเอียดให้เหมาะกับกลุ่มผู้ฟัง",
    weight: 1,
  },
  {
    id: "sa-sc-2",
    skill: "stakeholder_communication",
    textTh: "ฉันจัดการความคาดหวังที่ขัดแย้งกันระหว่าง stakeholder ได้",
    weight: 1,
  },
  // process_system_thinking
  {
    id: "sa-ps-1",
    skill: "process_system_thinking",
    textTh: "ฉันมองเห็นผลกระทบของการเปลี่ยนแปลงหนึ่งจุดที่มีต่อระบบรอบด้าน",
    weight: 1,
  },
  {
    id: "sa-ps-2",
    skill: "process_system_thinking",
    textTh: "ฉันเชื่อม requirement เข้ากับกระบวนการทำงานที่มีอยู่เดิมได้",
    weight: 1,
  },
  // product_value_thinking
  {
    id: "sa-pv-1",
    skill: "product_value_thinking",
    textTh: "ฉันถามเสมอว่า feature นี้สร้างคุณค่าอะไร ใครได้ประโยชน์",
    weight: 1,
  },
  {
    id: "sa-pv-2",
    skill: "product_value_thinking",
    textTh: "ฉันเสนอวิธีวัดผลสำเร็จของสิ่งที่จะสร้าง",
    weight: 1,
  },
  // agile_delivery
  {
    id: "sa-ag-1",
    skill: "agile_delivery",
    textTh: "ฉันแบ่งงานใหญ่ให้เล็กลงจนส่งมอบได้ภายในรอบสั้น ๆ",
    weight: 1,
  },
  {
    id: "sa-ag-2",
    skill: "agile_delivery",
    textTh: "ฉันยอมปล่อยของก่อนแล้วค่อยปรับ ดีกว่ารอให้สมบูรณ์",
    weight: 1,
  },
  // soft_skill_facilitation
  {
    id: "sa-ss-1",
    skill: "soft_skill_facilitation",
    textTh: "ฉันทำให้คนที่เงียบในที่ประชุมพูดออกมาได้",
    weight: 1,
  },
  {
    id: "sa-ss-2",
    skill: "soft_skill_facilitation",
    textTh: "ฉันสรุปความเห็นที่กระจัดกระจายให้กลายเป็นข้อตกลงได้",
    weight: 1,
  },
];

/* ------------------------------------------------------------------ */
/* Daily Req — short-form practice with instant feedback               */
/* ------------------------------------------------------------------ */

export const DAILY_REQ_QUESTIONS: DailyReqQuestion[] = [
  {
    id: "dr-q1",
    type: "requirement_quality",
    promptTh: "Requirement ข้อไหนเขียนได้ ‘ดีที่สุด’?",
    options: [
      "ระบบต้องเร็ว",
      "ผู้ใช้ค้นหาสินค้าได้ภายใน 2 วินาที",
      "ระบบต้องดีขึ้น",
      "หน้าจอควรสวยงาม",
    ],
    answer: 1,
    explanationTh:
      "Requirement ที่ดีต้องวัดได้และทดสอบได้ ‘ภายใน 2 วินาที’ สื่อพฤติกรรมที่ชัดเจนและมีเกณฑ์ยอมรับ (acceptance) ได้",
  },
  {
    id: "dr-q2",
    type: "user_story_gap",
    promptTh:
      "User story: “ในฐานะลูกค้า ฉันอยากกรอกฟอร์มเพื่อสมัคร” — ข้อใดขาดหายไป?",
    options: ["Persona", "Reason / Value", "UI สี", "Database"],
    answer: 1,
    explanationTh:
      "รูปแบบครบคือ “…เพื่อ <เหตุผล/คุณค่า>” การขาด ‘เพื่ออะไร’ ทำให้ทีมไม่รู้ว่าสร้างเพื่อ outcome ใด",
  },
  {
    id: "dr-q3",
    type: "stakeholder_followup",
    promptTh:
      "Stakeholder บอก “ทำให้ปุ่มใหญ่ขึ้น” — คำถามติดตามที่ ‘ค้นหา root need’ ที่สุดคือ?",
    options: [
      "จะทำให้ใหญ่แค่ไหน?",
      "ปุ่มสีอะไรดี?",
      "เจอปัญหาอะไรตอนกดปุ่มอยู่?",
      "เอาไว้ที่ไหนดี?",
    ],
    answer: 2,
    explanationTh:
      "ก่อนรับ solution ควรถามปัญหาที่แท้จริง ‘ตอนกดปุ่มเจออะไร’ เปิดทางให้เห็น root need ไม่ใช่แค่ขนาด",
  },
  {
    id: "dr-q4",
    type: "ac_testable",
    promptTh: "Acceptance criteria ข้อใด ‘ทดสอบได้’ ชัดที่สุด?",
    options: [
      "ระบบใช้งานง่าย",
      "ผู้ใช้สามารถรีเซ็ตรหัสผ่านได้ภายใน 3 ขั้นตอน",
      "หน้าจอสวย",
      "ทำงานได้ดี",
    ],
    answer: 1,
    explanationTh:
      "‘ภายใน 3 ขั้นตอน’ สามารถนับและทดสอบได้ เป็นเกณฑ์ที่ชัดเจน ส่วนข้ออื่นเป็นคำกว้าง ๆ วัดยาก",
  },
  {
    id: "dr-q5",
    type: "scope_risk",
    promptTh:
      "Stakeholder ขอเพิ่ม 10 features กลางสprint — การกระทำที่ ‘เหมาะสม’ ที่สุดคือ?",
    options: [
      "รับหมดเพื่อให้พอใจ",
      "ปฏิเสธทั้งหมด",
      "ประเมินผลกระทบแล้วเสนอ swap ลำดับความสำคัญ",
      "เงียบไว้ก่อน",
    ],
    answer: 2,
    explanationTh:
      "การจัดการ scope คือประเมิน trade-off แล้วเสนอทางเลือก ไม่ใช่รับหรือปฏิเสธสุดโต่ง — swap ตามคุณค่า/ลำดับความสำคัญคือหัวใจ",
  },
];

/* ------------------------------------------------------------------ */
/* Req Gym — IIBA-aligned practice across BABOK knowledge areas        */
/* ------------------------------------------------------------------ */

export const REQ_GYM_QUESTIONS: ReqGymQuestion[] = [
  {
    id: "rg-1",
    area: "elicitation_collaboration",
    difficulty: "easy",
    promptTh: "เทคนิค ‘brainstorming’ เหมาะที่สุดกับสถานการณ์ใด?",
    options: [
      "สรุปผลทดสอบระบบ",
      "ระดมไอเดียจากหลายฝ่ายในช่วงต้นของโจทย์",
      "ตรวจสอบรายได้-รายจ่าย",
      "เขียน SQL",
    ],
    answer: 1,
    explanationTh:
      "Brainstorming คือการระดมความคิดอย่างเปิดกว้าง เหมาะกับช่วงที่ต้องการมุมมองหลากหลายก่อนไปกลั่นกรอง (อยู่ใน Elicitation & Collaboration)",
  },
  {
    id: "rg-2",
    area: "requirements_lifecycle",
    difficulty: "medium",
    promptTh:
      "Requirement ‘ต้องทำงานร่วมกับระบบเดิมที่ใช้อยู่’ — เป็นข้อจำกัดประเภทใด?",
    options: [
      "Functional requirement",
      "Non-functional / constraint",
      "User preference",
      "Nice-to-have",
    ],
    answer: 1,
    explanationTh:
      "การต้องทำงานร่วมกับระบบเดิมเป็น ‘constraint’ และมักจัดเป็น non-functional requirement ที่ส่งผลต่อการออกแบบ solution",
  },
  {
    id: "rg-3",
    area: "strategy_analysis",
    difficulty: "hard",
    promptTh:
      "เมื่อมี ‘needs’ ใหม่ ๆ เข้ามา สิ่งแรกที่ BA ควรทำตามแนวคิด Strategy Analysis คือ?",
    options: [
      "เริ่มเขียน code ทันที",
      "ตรวจสอบว่าสอดคล้องกับเป้าหมายและบริบทขององค์กรหรือไม่",
      "สั่งซื้อ license",
      "เลือก vendor",
    ],
    answer: 1,
    explanationTh:
      "Strategy Analysis ให้ BA พิจารณา needs เทียบกับเป้าหมายและบริบทองค์กร (current state / future state) ก่อนลงรายละเอียด solution",
  },
  {
    id: "rg-4",
    area: "solution_evaluation",
    difficulty: "medium",
    promptTh: "วัด ‘คุณค่า’ ของ solution หลังส่งมอบ — วิธีใดเหมาะที่สุด?",
    options: [
      "นับจำนวน meeting",
      "ดู KPI/outcome ที่ตกลงกันไว้เทียบก่อน-หลัง",
      "นับจำนวนบรรทัด code",
      "ถามเฉพาะทีมพัฒนา",
    ],
    answer: 1,
    explanationTh:
      "Solution Evaluation ใช้ตัวชี้วัดและ outcome ที่กำหนดไว้ล่วงหน้า เปรียบเทียบก่อน/หลังเพื่อเห็นว่า solution สร้างคุณค่าจริงหรือไม่",
  },
  {
    id: "rg-5",
    area: "business_analysis_planning",
    difficulty: "easy",
    promptTh: "สิ่งที่ควรอยู่ใน ‘Business Analysis Plan’ คือ?",
    options: [
      "รายชื่อพนักงานทั้งบริษัท",
      "ขอบเขต เทคนิค และกำหนดการของงานวิเคราะห์",
      "โครงสร้างฐานข้อมูล",
      "แบบฟอร์มลางาน",
    ],
    answer: 1,
    explanationTh:
      "BA Plan ระบุขอบเขต เทคนิค ส่งมอบ และกำหนดการของงานวิเคราะห์ เพื่อให้ทีมรู้ว่าจะทำอะไร อย่างไร เมื่อไหร่",
  },
  {
    id: "rg-6",
    area: "underlying_competencies",
    difficulty: "easy",
    promptTh: " ‘Active listening’ ช่วยอะไรในการทำ BA มากที่สุด?",
    options: [
      "พิมพ์เร็วขึ้น",
      "เข้าใจความต้องการแท้จริงที่ผู้พูดอาจไม่ได้บอกตรง ๆ",
      "ทำให้ได้คำตอบใน 1 นาที",
      "หลีกเลี่ยงการถาม",
    ],
    answer: 1,
    explanationTh:
      "Active listening ช่วยจับสัญญาณ ความลังเล และประเด็นซ่อนเร้น ซึ่งนำไปสู่คำถามติดตามที่แตะความต้องการแท้จริง",
  },
];

/* ------------------------------------------------------------------ */
/* Setlist Templates — 5 downloadable templates (download stubbed)     */
/* ------------------------------------------------------------------ */

export const TEMPLATES: Template[] = [
  {
    slug: "one-page-brd",
    name: "One-Page BRD",
    category: "Planning",
    descriptionTh:
      "แม่แบบ BRD หน้าเดียว กระชับ ใส่ context, goal, scope, stakeholder และ success metrics",
    meta: "1 หน้า",
  },
  {
    slug: "user-story-card",
    name: "User Story Card",
    category: "Writing",
    descriptionTh:
      "การ์ด user story พร้อมช่อง ‘As a / I want / so that’ + acceptance criteria และ definition of done",
    meta: "การ์ด A6",
  },
  {
    slug: "stakeholder-map",
    name: "Stakeholder Map",
    category: "Discovery",
    descriptionTh:
      "ผังจัดกลุ่ม stakeholder ตามอำนาจ/ความสนใจ พร้อมแผนการสื่อสารรายกลุ่ม",
    meta: "1 หน้า",
  },
  {
    slug: "retro-action",
    name: "Retro → Action",
    category: "Delivery",
    descriptionTh:
      "ฟอร์ม retrospective ที่เน้น action ที่ชัดเจน มีเจ้าของและกำหนดการ ไม่ใช่แค่ระบายความรู้สึก",
    meta: "1 หน้า",
  },
  {
    slug: "priority-matrix",
    name: "Priority Matrix",
    category: "Decision",
    descriptionTh:
      "ตารางจัดลำดับความสำคัญ value vs. effort พร้อมคอลัมน์ rationale เพื่อช่วยตัดสินใจแบบมีเหตุผล",
    meta: "1 หน้า",
  },
];

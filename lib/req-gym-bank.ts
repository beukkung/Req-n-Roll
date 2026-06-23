import type { KnowledgeArea, ReqGymQuestion } from "./types";

export const REQ_GYM_QUESTION_TARGET = 1000;

export const REQ_GYM_OFFICIAL_AREAS = [
  "business_analysis_planning",
  "elicitation_collaboration",
  "requirements_lifecycle",
  "strategy_analysis",
  "requirements_analysis_design",
  "solution_evaluation",
] as const satisfies readonly KnowledgeArea[];

export type OfficialReqGymArea = (typeof REQ_GYM_OFFICIAL_AREAS)[number];

type Difficulty = ReqGymQuestion["difficulty"];

type CaseContext = {
  org: string;
  initiative: string;
  stakeholder: string;
  userGroup: string;
  metric: string;
  pain: string;
  constraint: string;
  system: string;
  process: string;
  risk: string;
  data: string;
};

type Stem = {
  promptTh: string;
  correct: string;
  distractors: [string, string, string];
  explanationTh: string;
};

type Blueprint = {
  difficulty: Difficulty;
  make: (context: CaseContext) => Stem;
};

const AREA_TARGETS: Record<OfficialReqGymArea, number> = {
  business_analysis_planning: 167,
  elicitation_collaboration: 167,
  requirements_lifecycle: 167,
  strategy_analysis: 167,
  requirements_analysis_design: 166,
  solution_evaluation: 166,
};

const AREA_PREFIX: Record<OfficialReqGymArea, string> = {
  business_analysis_planning: "bapm",
  elicitation_collaboration: "elic",
  requirements_lifecycle: "rlcm",
  strategy_analysis: "strat",
  requirements_analysis_design: "radd",
  solution_evaluation: "solev",
};

const CONTEXTS: CaseContext[] = [
  {
    org: "ธนาคารดิจิทัล",
    initiative: "ปรับปรุง onboarding e-KYC สำหรับลูกค้าใหม่",
    stakeholder: "Compliance, Product, สาขา และทีมปฏิบัติการ",
    userGroup: "ลูกค้าใหม่",
    metric: "ลด drop-off ในขั้นยืนยันตัวตน",
    pain: "ลูกค้าต้องกรอกข้อมูลซ้ำและไม่รู้ว่าถูกปฏิเสธเพราะอะไร",
    constraint: "PDPA, KYC และ audit trail",
    system: "mobile banking, CRM และระบบตรวจสอบตัวตน",
    process: "เปิดบัญชีออนไลน์",
    risk: "การตีความข้อมูลบังคับไม่ตรงกันระหว่างสาขาและสำนักงานใหญ่",
    data: "ข้อมูลตัวตน รูปถ่ายบัตร และผลตรวจ watchlist",
  },
  {
    org: "บริษัทประกันภัย",
    initiative: "ทำ workflow เคลมรถยนต์แบบ self-service",
    stakeholder: "Claims, Call Center, Partner Garage และ Legal",
    userGroup: "ผู้เอาประกัน",
    metric: "ลดเวลาปิดเคลมจาก 7 วันเหลือ 3 วัน",
    pain: "ลูกค้าต้องโทรถามสถานะซ้ำเพราะไม่เห็นขั้นตอนถัดไป",
    constraint: "เงื่อนไขกรมธรรม์ SLA คู่สัญญา และหลักฐานภาพถ่าย",
    system: "claims platform, garage portal และ payment gateway",
    process: "ยื่นเคลมและอนุมัติซ่อม",
    risk: "สถานะเคลมในแต่ละระบบไม่ตรงกันหลังอนุมัติ",
    data: "เลขกรมธรรม์ ภาพความเสียหาย และวงเงินคุ้มครอง",
  },
  {
    org: "โรงพยาบาลเอกชน",
    initiative: "ยกระดับระบบนัดหมายและ triage ออนไลน์",
    stakeholder: "แพทย์ พยาบาล เวชระเบียน การเงิน และผู้ป่วย",
    userGroup: "ผู้ป่วยนัดหมายล่วงหน้า",
    metric: "ลดเวลารอหน้าเคาน์เตอร์และเพิ่ม show-up rate",
    pain: "ผู้ป่วยกรอกข้อมูลซ้ำเมื่อมาถึงและไม่รู้ว่าต้องเตรียมเอกสารใด",
    constraint: "ข้อมูลสุขภาพส่วนบุคคล consent และตารางแพทย์",
    system: "HIS, appointment portal และ queue management",
    process: "จองคิว ตรวจสอบสิทธิ์ และเข้าพบแพทย์",
    risk: "การจัดคิวผิดประเภททำให้คนไข้เร่งด่วนรอนาน",
    data: "ข้อมูลสิทธิ์รักษา อาการเบื้องต้น และประวัติแพ้ยา",
  },
  {
    org: "มหาวิทยาลัย",
    initiative: "รวมระบบสมัครเรียนและตรวจเอกสารรับเข้า",
    stakeholder: "Admissions, คณะ, การเงิน และนักศึกษาใหม่",
    userGroup: "ผู้สมัครเรียน",
    metric: "ลดใบสมัครที่ถูกส่งกลับเพราะเอกสารไม่ครบ",
    pain: "ผู้สมัครไม่รู้ว่าสถานะเอกสารติดที่จุดใด",
    constraint: "รอบรับสมัคร เกณฑ์แต่ละคณะ และหลักฐานการชำระเงิน",
    system: "admission portal, document verification และ payment system",
    process: "สมัครเรียน ตรวจเอกสาร และประกาศผล",
    risk: "เกณฑ์รับเข้าของแต่ละคณะเปลี่ยนหลังเปิดรอบสมัคร",
    data: "ผลการเรียน เอกสารประจำตัว และคะแนนสอบ",
  },
  {
    org: "ผู้ให้บริการโลจิสติกส์",
    initiative: "ทำ dashboard ติดตามพัสดุและ exception handling",
    stakeholder: "Operations, Rider, Customer Service และ Merchant",
    userGroup: "ร้านค้าออนไลน์",
    metric: "ลดพัสดุตกค้างและลดการโทรถามสถานะ",
    pain: "ร้านค้าเห็นสถานะกว้างเกินไปและตอบลูกค้าไม่ได้",
    constraint: "cut-off time, SLA ขนส่ง และข้อมูลตำแหน่งแบบ near-real-time",
    system: "TMS, rider app และ tracking page",
    process: "รับพัสดุ คัดแยก จัดส่ง และแจ้ง exception",
    risk: "สถานะ exception ถูกบันทึกไม่สม่ำเสมอในแต่ละ hub",
    data: "เลขพัสดุ เหตุผล exception และ timestamp แต่ละจุด",
  },
  {
    org: "แพลตฟอร์ม e-commerce",
    initiative: "ปรับปรุงการคืนสินค้าและคืนเงิน",
    stakeholder: "Buyer, Seller, Finance, Fraud และ Customer Service",
    userGroup: "ผู้ซื้อที่ขอคืนสินค้า",
    metric: "ลด dispute และลดเวลาคืนเงิน",
    pain: "ลูกค้าไม่รู้ว่าต้องส่งหลักฐานอะไรและร้านค้าโต้แย้งช้า",
    constraint: "นโยบายคืนสินค้า หมวดสินค้ายกเว้น และ fraud rule",
    system: "marketplace app, seller center และ refund service",
    process: "ขอคืนสินค้า ตรวจหลักฐาน และคืนเงิน",
    risk: "กฎคืนเงินไม่ครอบคลุมสินค้าหลายประเภท",
    data: "คำสั่งซื้อ รูปสินค้า เหตุผลคืน และประวัติ dispute",
  },
  {
    org: "ฝ่าย HR ขององค์กรขนาดใหญ่",
    initiative: "ทำ employee onboarding journey แบบ digital",
    stakeholder: "HR, IT, Payroll, Manager และพนักงานใหม่",
    userGroup: "พนักงานใหม่",
    metric: "ลดเวลาพร้อมทำงานในวันแรก",
    pain: "พนักงานใหม่ยังไม่มีอุปกรณ์และสิทธิ์ระบบเมื่อเริ่มงาน",
    constraint: "ข้อมูลส่วนบุคคล policy อุปกรณ์ และรอบ payroll",
    system: "HRIS, identity provider และ ticketing system",
    process: "รับเข้าพนักงาน จัดอุปกรณ์ และเปิดสิทธิ์ระบบ",
    risk: "งาน handoff ระหว่าง HR และ IT ไม่มีเจ้าของชัดเจน",
    data: "ข้อมูลพนักงาน ตำแหน่ง วันเริ่มงาน และสิทธิ์ที่ต้องใช้",
  },
  {
    org: "สถาบันสินเชื่อ SME",
    initiative: "ลดเวลาพิจารณาสินเชื่อด้วย workflow scoring",
    stakeholder: "Credit, Risk, Sales, Legal และลูกค้า SME",
    userGroup: "เจ้าของกิจการ SME",
    metric: "ลด turnaround time โดยไม่เพิ่ม NPL",
    pain: "ลูกค้าส่งเอกสารหลายรอบและไม่เห็นเหตุผลที่ขอเพิ่ม",
    constraint: "credit policy, risk appetite และเอกสารกำกับดูแล",
    system: "loan origination, credit bureau connector และ document vault",
    process: "ยื่นกู้ ตรวจเอกสาร วิเคราะห์เครดิต และอนุมัติ",
    risk: "ทีมขายและทีม risk ใช้คำจำกัดความรายได้ไม่เหมือนกัน",
    data: "งบการเงิน statement ภาษี และคะแนนเครดิต",
  },
  {
    org: "หน่วยงานภาครัฐ",
    initiative: "ทำ portal ขอใบอนุญาตร้านอาหาร",
    stakeholder: "เจ้าหน้าที่อนุญาต ผู้ประกอบการ กองคลัง และฝ่ายกฎหมาย",
    userGroup: "ผู้ประกอบการร้านอาหาร",
    metric: "ลดคำขอที่ถูกตีกลับและลดเวลารออนุมัติ",
    pain: "ผู้ประกอบการไม่รู้ว่าเอกสารใดขาดและต้องมาที่สำนักงานหลายครั้ง",
    constraint: "กฎหมายท้องถิ่น ค่าธรรมเนียม และการตรวจสถานที่",
    system: "permit portal, payment service และ document archive",
    process: "ยื่นคำขอ ชำระเงิน ตรวจสถานที่ และออกใบอนุญาต",
    risk: "ข้อกำหนดทางกฎหมายถูกตีความต่างกันในแต่ละเขต",
    data: "ใบคำขอ แผนผังร้าน หลักฐานเจ้าของ และผลตรวจสถานที่",
  },
  {
    org: "ผู้ให้บริการสาธารณูปโภค",
    initiative: "ทำระบบแจ้งไฟดับและติดตามการแก้ไข",
    stakeholder: "Field Service, Call Center, Dispatch และประชาชน",
    userGroup: "ผู้ใช้ไฟฟ้าในพื้นที่บริการ",
    metric: "ลดเวลาแจ้งซ้ำและเพิ่มความแม่นยำของ ETA",
    pain: "ประชาชนแจ้งปัญหาซ้ำเพราะไม่รู้ว่างานถูกเปิดแล้ว",
    constraint: "ความปลอดภัยภาคสนาม ข้อมูลแผนที่ และ SLA ตามพื้นที่",
    system: "outage management, GIS และ mobile workforce app",
    process: "รับแจ้ง วิเคราะห์พื้นที่ ส่งทีม และปิดงานซ่อม",
    risk: "ข้อมูลตำแหน่งไม่แม่นทำให้ dispatch ทีมผิดพื้นที่",
    data: "หมายเลขมิเตอร์ พิกัด เหตุแจ้ง และสถานะทีมภาคสนาม",
  },
  {
    org: "ผู้ให้บริการโทรคมนาคม",
    initiative: "ปรับ journey เปลี่ยนแพ็กเกจมือถือ",
    stakeholder: "Marketing, Billing, Network, Retail และลูกค้า",
    userGroup: "ลูกค้ารายเดือน",
    metric: "เพิ่ม conversion และลด billing complaint",
    pain: "ลูกค้าไม่เข้าใจผลกระทบรอบบิลเมื่อเปลี่ยนแพ็กเกจกลางเดือน",
    constraint: "billing cycle, promotion rule และเงื่อนไขสัญญา",
    system: "CRM, billing engine และ mobile self-service",
    process: "เลือกแพ็กเกจ ยืนยันเงื่อนไข และเริ่มใช้บริการ",
    risk: "โปรโมชันซ้อนกันทำให้คิดค่าบริการผิด",
    data: "แพ็กเกจปัจจุบัน รอบบิล สิทธิ์คงเหลือ และเงื่อนไขส่วนลด",
  },
  {
    org: "เครือร้านอาหาร",
    initiative: "รวมระบบ POS กับ inventory และ loyalty",
    stakeholder: "Store Manager, Finance, Marketing และพนักงานหน้าร้าน",
    userGroup: "พนักงานแคชเชียร์",
    metric: "ลด stock discrepancy และเพิ่มการใช้คะแนนสมาชิก",
    pain: "สาขาตัดสต็อกไม่ตรงกับยอดขายจริงช่วงโปรโมชัน",
    constraint: "offline mode, promotion calendar และสูตรวัตถุดิบ",
    system: "POS, inventory, loyalty และ accounting",
    process: "ขายสินค้า ใช้โปรโมชัน ตัดสต็อก และปิดยอดสาขา",
    risk: "ระบบ offline sync ทำให้ยอดขายและสต็อกซ้ำ",
    data: "รายการขาย คะแนนสมาชิก สูตรสินค้า และยอดสต็อก",
  },
  {
    org: "โรงงานผลิตอุปกรณ์อิเล็กทรอนิกส์",
    initiative: "ทำ quality incident tracking ตั้งแต่ไลน์ผลิตถึงลูกค้า",
    stakeholder: "QA, Production, Engineering, Supplier และลูกค้าองค์กร",
    userGroup: "วิศวกร QA",
    metric: "ลดเวลาวิเคราะห์สาเหตุ defect และลด repeat issue",
    pain: "ข้อมูล defect กระจายอยู่ใน spreadsheet หลายไฟล์",
    constraint: "มาตรฐานคุณภาพ lot traceability และ supplier SLA",
    system: "MES, supplier portal และ quality dashboard",
    process: "บันทึก defect วิเคราะห์สาเหตุ และปิด corrective action",
    risk: "ไม่สามารถ trace lot ที่เกี่ยวข้องได้ครบเมื่อเกิดปัญหา",
    data: "serial number, lot, defect code และ corrective action",
  },
  {
    org: "แพลตฟอร์มท่องเที่ยว",
    initiative: "แก้ปัญหาการจองโรงแรมที่ราคาและห้องว่างเปลี่ยนเร็ว",
    stakeholder: "Hotel Partner, Customer Support, Pricing และผู้เดินทาง",
    userGroup: "ผู้จองโรงแรม",
    metric: "ลด booking failure และ complaint หลังชำระเงิน",
    pain: "ลูกค้าเห็นราคาหนึ่งแต่จ่ายแล้วห้องไม่ว่าง",
    constraint: "rate parity, cancellation policy และ inventory latency",
    system: "booking engine, partner API และ payment service",
    process: "ค้นหา เลือกห้อง ยืนยันราคา และชำระเงิน",
    risk: "ข้อมูลห้องว่างไม่ sync กับ partner แบบ real-time",
    data: "ราคา ห้องว่าง เงื่อนไขยกเลิก และ transaction id",
  },
  {
    org: "บริษัท SaaS แบบ subscription",
    initiative: "ออกแบบ billing portal สำหรับ upgrade, downgrade และ invoice",
    stakeholder: "Customer Success, Finance, Product และผู้ดูแลระบบลูกค้า",
    userGroup: "admin ของลูกค้าองค์กร",
    metric: "ลด ticket เรื่อง invoice และเพิ่ม self-service plan change",
    pain: "ลูกค้าไม่เห็นผลกระทบต่อค่าใช้จ่ายเมื่อเปลี่ยน plan",
    constraint: "tax rule, proration, contract term และ approval ภายในลูกค้า",
    system: "subscription billing, CRM และ customer portal",
    process: "เปลี่ยน plan อนุมัติภายใน และออก invoice",
    risk: "การคิด proration ผิดทำให้ revenue recognition ผิด",
    data: "plan ปัจจุบัน จำนวน seat รอบบิล และภาษี",
  },
  {
    org: "บริษัทจัดการความมั่งคั่ง",
    initiative: "ทำ suitability assessment ก่อนเสนอผลิตภัณฑ์ลงทุน",
    stakeholder: "Advisor, Compliance, Investment Product และลูกค้า",
    userGroup: "นักลงทุนรายย่อย",
    metric: "ลด mis-selling risk และเพิ่มความครบถ้วนของเอกสาร",
    pain: "ที่ปรึกษาต้องกรอก suitability หลายระบบและลูกค้าไม่เข้าใจผลประเมิน",
    constraint: "กฎกำกับดูแล investor profile และ product risk rating",
    system: "advisor workstation, CRM และ document signing",
    process: "ประเมินความเสี่ยง เสนอผลิตภัณฑ์ และเก็บหลักฐานยินยอม",
    risk: "คำแนะนำผลิตภัณฑ์ไม่สอดคล้องกับ risk profile ล่าสุด",
    data: "risk score วัตถุประสงค์ลงทุน และเอกสารยินยอม",
  },
  {
    org: "ฝ่ายจัดซื้อขององค์กร",
    initiative: "ทำ procurement approval workflow สำหรับ vendor ใหม่",
    stakeholder: "Requester, Procurement, Finance, Legal และ Vendor",
    userGroup: "พนักงานผู้ขอซื้อ",
    metric: "ลดรอบอนุมัติและลด vendor onboarding defect",
    pain: "คำขอซื้อค้างเพราะไม่รู้ว่ารออนุมัติจากใคร",
    constraint: "วงเงินอนุมัติ นโยบาย vendor และเอกสารภาษี",
    system: "procurement portal, ERP และ e-signature",
    process: "ขอซื้อ ตรวจ vendor อนุมัติ และออก PO",
    risk: "approval matrix ไม่รองรับกรณี vendor ต่างประเทศ",
    data: "วงเงิน vendor profile ใบเสนอราคา และภาษี",
  },
  {
    org: "ศูนย์บริการลูกค้า",
    initiative: "สร้าง knowledge base เพื่อช่วย agent ตอบคำถามซับซ้อน",
    stakeholder: "Call Center, Product, QA, Training และลูกค้า",
    userGroup: "call center agent",
    metric: "ลด average handling time และเพิ่ม first contact resolution",
    pain: "agent ค้นหาคำตอบไม่เจอและให้คำตอบไม่สม่ำเสมอ",
    constraint: "version ของ policy, approval content และ audit QA",
    system: "contact center, knowledge base และ case management",
    process: "รับเคส ค้นหาคำตอบ ให้คำแนะนำ และปิดเคส",
    risk: "บทความเก่าถูกใช้หลัง policy เปลี่ยน",
    data: "หมวดคำถาม policy version และผลประเมิน QA",
  },
  {
    org: "แพลตฟอร์มการศึกษาออนไลน์",
    initiative: "ทำระบบติดตาม learning progress และ certificate",
    stakeholder: "Learner, Instructor, Academic Ops และ Employer Partner",
    userGroup: "ผู้เรียนวัยทำงาน",
    metric: "เพิ่ม course completion และลดคำถามเรื่อง certificate",
    pain: "ผู้เรียนไม่รู้ว่าขาดกิจกรรมใดก่อนรับ certificate",
    constraint: "เกณฑ์ผ่าน course, plagiarism rule และเวลาเรียนขั้นต่ำ",
    system: "LMS, assessment engine และ certificate service",
    process: "เรียน ทำแบบทดสอบ ส่งงาน และออก certificate",
    risk: "เกณฑ์ผ่านไม่ถูกสื่อสารตรงกันระหว่าง course",
    data: "progress, quiz score, assignment status และ certificate id",
  },
  {
    org: "ฟินเทคกระเป๋าเงินดิจิทัล",
    initiative: "เพิ่มระบบ dispute สำหรับธุรกรรมโอนเงินผิด",
    stakeholder: "Customer Support, Risk, Operations, Legal และผู้ใช้",
    userGroup: "ผู้ใช้ wallet",
    metric: "ลดเวลาตรวจสอบ dispute และลดเคส fraud ที่หลุด",
    pain: "ผู้ใช้ไม่รู้ว่าต้องส่งหลักฐานใดและสถานะคดีอยู่ตรงไหน",
    constraint: "AML rule, audit trail และข้อตกลงกับธนาคารคู่ค้า",
    system: "wallet ledger, case management และ bank connector",
    process: "แจ้ง dispute ตรวจสอบหลักฐาน อายัด และปิดเคส",
    risk: "ข้อมูล ledger และสถานะจากธนาคารไม่ตรงกัน",
    data: "transaction id, ledger entry, หลักฐานแชต และผลตรวจ fraud",
  },
];

const BLUEPRINTS: Record<OfficialReqGymArea, Blueprint[]> = {
  business_analysis_planning: [
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org}เริ่มโครงการ ${c.initiative} โดย requirement ยังเปลี่ยนเร็วและมีผู้เกี่ยวข้องคือ ${c.stakeholder} BA ควรวาง business analysis approach อย่างไรให้เหมาะกับสถานการณ์นี้มากที่สุด?`,
        correct: "ใช้ adaptive approach วางรอบ elicitation สั้น ๆ ทบทวน backlog/requirement เป็นระยะ และตกลงจุดตัดสินใจร่วมกับ stakeholder",
        distractors: [
          "บังคับ freeze requirement ทั้งหมดตั้งแต่วันแรกเพื่อให้ทีมพัฒนาเริ่มทำงานได้ทันที",
          "เริ่มออกแบบหน้าจอทั้งหมดก่อน แล้วค่อยถาม stakeholder เมื่อระบบใกล้เสร็จ",
          "ให้ sponsor คนเดียวตัดสิน requirement แทนทุกกลุ่มเพื่อลดจำนวน meeting",
        ],
        explanationTh:
          "Business Analysis Planning and Monitoring ต้อง tailor approach ให้เหมาะกับระดับความไม่แน่นอนและวิธีส่งมอบงาน ถ้า requirement เปลี่ยนเร็ว การวางรอบ feedback สั้นและ governance ที่ชัดจะควบคุมความเสี่ยงได้ดีกว่า freeze เอกสารเร็วเกินไป",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `ในงาน ${c.initiative} ของ ${c.org} BA พบว่า ${c.stakeholder} มีอิทธิพลและความคาดหวังต่างกันมาก เอกสารใดควรถูกทำก่อนเพื่อช่วยวางแผนการมีส่วนร่วมของ stakeholder?`,
        correct: "Stakeholder engagement/communication plan ที่ระบุอิทธิพล ความสนใจ ช่องทาง และความถี่การสื่อสารของแต่ละกลุ่ม",
        distractors: [
          "คู่มือผู้ใช้ฉบับเต็ม เพราะช่วยให้ทุกคนเห็นหน้าจอเหมือนกัน",
          "รายการ test case ของระบบ เพราะเป็นเอกสารที่ทีม QA ต้องใช้ภายหลัง",
          "แผน deploy production เพราะเป็นเอกสารที่ผู้บริหารสนใจมากที่สุด",
        ],
        explanationTh:
          "การวางแผน stakeholder engagement ช่วยให้ BA รู้ว่าจะดึงข้อมูลจากใคร สื่อสารอย่างไร และจัดการความคาดหวังอย่างไร เอกสารปลายทางอย่างคู่มือผู้ใช้หรือ test case ยังไม่ตอบโจทย์การวางแผนความร่วมมือช่วงต้น",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org}ต้องการเริ่มวิเคราะห์ ${c.process} แต่ทีมยังไม่รู้ว่าขอบเขต BA จะรวม process, data และระบบใดบ้าง สิ่งใดควรถูกระบุใน BA plan มากที่สุด?`,
        correct: "ขอบเขตงานวิเคราะห์ deliverables เทคนิคที่จะใช้ timeline สมมติฐาน และผู้อนุมัติ deliverables",
        distractors: [
          "สีของ dashboard และ icon ที่ต้องใช้ใน prototype ทุกหน้าจอ",
          "โครงสร้าง code repository และ naming convention ของทีมพัฒนา",
          "รายชื่อพนักงานทั้งองค์กรและวันลาทั้งหมดของทีม project",
        ],
        explanationTh:
          "BA plan เป็นเครื่องมือกำหนดว่าจะทำงานวิเคราะห์อะไร อย่างไร เมื่อไหร่ และใครต้องมีส่วนร่วม จึงควรรวม scope, deliverables, techniques, schedule, assumptions และ approval ไม่ใช่รายละเอียดเชิง implement ที่ยังไม่ถึงเวลา",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `ระหว่างวางแผน ${c.initiative} มีข้อจำกัดสำคัญคือ ${c.constraint} และมีความเสี่ยงว่า ${c.risk} BA ควรทำอะไรเพื่อให้ governance ของ requirement ชัดที่สุด?`,
        correct: "กำหนด decision rights, change control, approval criteria และ escalation path สำหรับ requirement ที่กระทบ constraint",
        distractors: [
          "ปล่อยให้ทุก change request เข้า sprint ได้ทันทีเพื่อรักษาความเร็ว",
          "ให้ทีมพัฒนาเลือก requirement เองจากความง่ายในการ implement",
          "รอให้ UAT ล้มเหลวก่อนจึงค่อยตั้งคณะกรรมการพิจารณา change",
        ],
        explanationTh:
          "Requirement governance ทำให้การตัดสินใจและการเปลี่ยนแปลงมีเจ้าของชัด โดยเฉพาะเมื่อมี constraint หรือ risk สูง BA ควรตกลงสิทธิ์อนุมัติ เกณฑ์ผลกระทบ และ escalation ก่อนเกิด conflict จริง",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.org}มีข้อมูลสำคัญคือ ${c.data} กระจายอยู่หลายระบบในโครงการ ${c.initiative} BA ควรวางแผนจัดการ business analysis information อย่างไรจึงเหมาะสมที่สุด?`,
        correct: "กำหนด repository, naming/versioning, access control, traceability และวิธีสื่อสารการเปลี่ยนแปลงของ requirement artifacts",
        distractors: [
          "เก็บไฟล์ทั้งหมดไว้ในเครื่อง BA คนเดียวเพื่อหลีกเลี่ยงความสับสน",
          "ส่ง requirement ล่าสุดผ่านแชตเท่านั้นเพราะทุกคนอ่านเร็วกว่าเอกสาร",
          "ให้แต่ละทีมตั้งชื่อไฟล์เองโดยไม่ต้องมีมาตรฐานกลาง",
        ],
        explanationTh:
          "BA information management ต้องดูแล artifact ให้เข้าถึงได้ ตรวจสอบย้อนกลับได้ และรู้ว่า version ใดเป็นปัจจุบัน การควบคุม repository/versioning/traceability สำคัญกว่าการเก็บข้อมูลแบบกระจัดกระจาย",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `BA ต้องวาง elicitation plan สำหรับ ${c.initiative} ซึ่งเกี่ยวข้องกับ ${c.stakeholder} และ process คือ ${c.process} ข้อใดควรอยู่ใน elicitation plan มากที่สุด?`,
        correct: "วัตถุประสงค์ของ session, stakeholder ที่ต้องเข้าร่วม, เทคนิค, agenda, input ที่ต้องเตรียม และ expected output",
        distractors: [
          "จำนวนบรรทัด code ที่ทีมพัฒนาต้องเขียนในแต่ละ sprint",
          "สรุปคะแนนความพึงพอใจหลัง go-live โดยไม่ต้องระบุวิธีเก็บ requirement",
          "รายชื่อ bug ทั้งหมดที่คาดว่าจะเจอใน production หลังปล่อยระบบ",
        ],
        explanationTh:
          "Elicitation plan ทำให้การดึงข้อมูลมีเป้าหมายและได้ผลลัพธ์ที่นำไปใช้ต่อได้ BA จึงต้องระบุ objective, participant, technique, agenda, required input และ expected output อย่างชัดเจน",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `ในโครงการ ${c.initiative} ของ ${c.org} ผู้บริหารต้องการรู้ว่างาน BA คืบหน้าจริงหรือไม่ ตัวชี้วัดใดเหมาะกับ monitoring งาน BA มากที่สุด?`,
        correct: "สัดส่วน requirement ที่ผ่าน review, จำนวน open issue สำคัญ, traceability coverage และเวลาปิด decision ที่ค้าง",
        distractors: [
          "จำนวน slide ที่ BA ทำได้ต่อสัปดาห์โดยไม่ดูคุณภาพของ requirement",
          "จำนวนชั่วโมงประชุมรวมทั้งหมด ยิ่งเยอะยิ่งแปลว่าวิเคราะห์ลึก",
          "จำนวนหน้าจอ UI ที่ออกแบบแล้ว แม้ยังไม่มี requirement ยืนยัน",
        ],
        explanationTh:
          "Monitoring งาน BA ควรดูความพร้อมและคุณภาพของ requirement รวมถึง issue/decision ที่กระทบความคืบหน้า ตัวชี้วัดที่นับปริมาณเอกสารหรือชั่วโมงประชุมอย่างเดียวไม่บอก readiness ของ requirement",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org}ทำ ${c.initiative} ภายใต้ข้อกำกับ ${c.constraint} แต่ทีม agile ต้องการปรับ requirement ทุก sprint BA ควร tailor plan อย่างไรให้สมดุล compliance และ agility?`,
        correct: "แยก requirement ที่ต้องมี baseline/approval ตาม compliance ออกจาก backlog ที่ปรับได้ และกำหนด lightweight change log กับ review cadence",
        distractors: [
          "ยกเลิก approval ทั้งหมดเพราะ agile ไม่ควรมีเอกสารหรือการกำกับดูแล",
          "ห้ามเปลี่ยน requirement ทุกประเภทจนจบโครงการเพื่อให้ audit ง่ายที่สุด",
          "ให้ compliance ตรวจเฉพาะตอน production incident เกิดขึ้นแล้วเท่านั้น",
        ],
        explanationTh:
          "การ tailor approach ไม่ใช่เลือก agile หรือ compliance อย่างใดอย่างหนึ่ง BA ต้องแยกส่วนที่ต้องควบคุมเข้มจากส่วนที่ iterate ได้ และทำให้ change log/review cadence เบาพอสำหรับทีมแต่ยังตรวจสอบย้อนหลังได้",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `โครงการ ${c.initiative} มีหลายทีมและมี risk ว่า ${c.risk} BA ควรใช้ RACI หรือ responsibility model เพื่อแก้ปัญหาใดมากที่สุด?`,
        correct: "ทำให้เจ้าของ input, ผู้ตัดสินใจ, ผู้ review และผู้รับผลกระทบของ requirement แต่ละประเภทชัดเจน",
        distractors: [
          "ใช้แทน business case เพื่อพิสูจน์ว่าโครงการมี ROI สูง",
          "ใช้แทน acceptance criteria เพื่อบอกว่าระบบทำงานถูกต้องหรือไม่",
          "ใช้เป็นเครื่องมือจัดลำดับ technical debt ของทีมพัฒนาเท่านั้น",
        ],
        explanationTh:
          "RACI ช่วยลดความกำกวมของบทบาทและ decision ownership ในงาน BA โดยเฉพาะเมื่อ requirement ข้ามหลายทีม ไม่ได้ใช้แทน business case, acceptance criteria หรือ backlog technical debt",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org}ต้องส่งมอบ ${c.initiative} ให้ทันรอบธุรกิจ แต่ข้อมูลใน ${c.system} ยังไม่พร้อม BA ควรจัดการ assumption และ constraint ใน plan อย่างไร?`,
        correct: "บันทึก assumption/constraint พร้อม owner, validation date, impact และ trigger ที่ต้อง replan หากข้อสมมติไม่จริง",
        distractors: [
          "ลบ assumption ออกจากเอกสารเพื่อไม่ให้ stakeholder กังวล",
          "ถือว่า constraint ทุกข้อเป็น technical issue ของทีมพัฒนา ไม่เกี่ยวกับ BA",
          "ใส่ assumption ไว้ท้ายเอกสารแต่ไม่ต้องติดตามเพราะเป็นเพียงหมายเหตุ",
        ],
        explanationTh:
          "Assumption และ constraint เป็นส่วนสำคัญของ planning เพราะมีผลต่อ scope, schedule และ decision BA ต้องระบุ owner, วันที่ต้องตรวจสอบ, impact และ trigger สำหรับ replan ไม่ใช่บันทึกแบบไม่มีการติดตาม",
      }),
    },
  ],
  elicitation_collaboration: [
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `BA เตรียม session เพื่อเข้าใจ pain point ใน ${c.process} ของ ${c.org} ก่อนเริ่มถาม ${c.stakeholder} ควรกำหนดอะไรให้ชัดเป็นอันดับแรก?`,
        correct: "วัตถุประสงค์ของ elicitation และ decision หรือ requirement ที่ต้องได้จาก session",
        distractors: [
          "เลือกสีของ slide ให้ตรงกับ brand guideline ก่อนคุยเนื้อหา",
          "เตรียม solution proposal ให้ครบเพื่อให้ stakeholder แค่กดอนุมัติ",
          "ขอให้ทุกคนส่ง requirement แบบเสรีโดยไม่กำหนดขอบเขตคำถาม",
        ],
        explanationTh:
          "การเตรียม elicitation ต้องเริ่มจาก objective และ expected outcome ที่ชัด เพื่อเลือกคำถาม เทคนิค และผู้เข้าร่วมได้เหมาะสม ถ้าเริ่มด้วย solution หรือเปิดกว้างเกินไป จะเสี่ยงได้ข้อมูลกระจัดกระจาย",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org}ต้องการค้นหาไอเดียหลายทางเลือกเพื่อแก้ ${c.pain} โดยยังไม่ต้องตัดสินทันที เทคนิคใดเหมาะสมที่สุดในช่วงต้นของ elicitation?`,
        correct: "Brainstorming workshop ที่แยกช่วงระดมไอเดียออกจากช่วงประเมินไอเดีย",
        distractors: [
          "Code review เพราะช่วยระบุว่า function ใดต้องแก้ก่อน",
          "Contract negotiation เพราะใช้ตัดสินราคากับ vendor เป็นหลัก",
          "Performance testing เพราะใช้วัดความเร็วของระบบหลังสร้างแล้ว",
        ],
        explanationTh:
          "Brainstorming เหมาะกับการเปิดพื้นที่ให้หลายฝ่ายเสนอทางเลือกก่อนคัดกรอง ไม่ควรสับสนกับเทคนิคที่ใช้ในช่วง implement หรือ procurement ซึ่งไม่ใช่เป้าหมายหลักของ elicitation ตอนต้น",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `หลังสัมภาษณ์ stakeholder เรื่อง ${c.initiative} BA ได้ข้อมูลหลายประเด็นและมีบางข้อกำกวม ขั้นตอนใดสำคัญที่สุดก่อนนำไปเขียน requirement baseline?`,
        correct: "ยืนยัน elicitation results กับผู้ให้ข้อมูลและบันทึก open issue/assumption ที่ยังต้องตามต่อ",
        distractors: [
          "ส่งข้อมูลให้ทีมพัฒนาทันทีโดยไม่ต้องกลับไปยืนยันเพื่อประหยัดเวลา",
          "ตัดประเด็นกำกวมออกทั้งหมดแม้อาจเป็น requirement สำคัญ",
          "แปลงคำพูดทุกประโยคเป็น requirement โดยไม่ต้องจัดกลุ่มหรือทวนความเข้าใจ",
        ],
        explanationTh:
          "Elicitation ไม่จบที่การถาม ต้อง confirm results เพื่อให้ stakeholder เห็นตรงกันและลดการตีความผิด Open issue และ assumption ต้องถูกติดตามก่อน baseline หรือส่งต่อให้ทีมอื่น",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `BA ไม่เข้าใจขั้นตอนจริงของผู้ใช้ใน ${c.process} เพราะสิ่งที่เล่าใน meeting ต่างจากสิ่งที่เกิดหน้างาน เทคนิคใดเหมาะที่สุดสำหรับ ${c.org}?`,
        correct: "Observation หรือ job shadowing เพื่อดูพฤติกรรมจริง สภาพแวดล้อม และ workaround ที่ผู้ใช้อาจไม่ได้เล่า",
        distractors: [
          "ส่ง survey สั้น ๆ เท่านั้น เพราะ survey เห็นรายละเอียดเชิงบริบทได้ดีที่สุด",
          "อ่าน source code ของระบบเดิมเพียงอย่างเดียวเพื่อเข้าใจการทำงานทั้งหมด",
          "รอ defect หลัง go-live เพราะเป็นหลักฐานที่เชื่อถือได้กว่าการสังเกต",
        ],
        explanationTh:
          "เมื่อคำบอกเล่าไม่ตรงกับงานจริง observation/job shadowing ช่วยให้ BA เห็น tacit knowledge, workaround และบริบทการทำงานจริง เทคนิคนี้เหมาะกว่า survey หรือ code reading เพียงอย่างเดียว",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.initiative} มีความไม่ชัดเจนด้านหน้าจอและขั้นตอนผู้ใช้ ${c.userGroup} BA ควรใช้เทคนิคใดเพื่อทำให้ stakeholder ให้ feedback ได้เป็นรูปธรรมที่สุด?`,
        correct: "Prototype หรือ wireframe แบบเร็ว เพื่อให้ stakeholder เห็น flow ทดลองคิด scenario และชี้ gap ได้",
        distractors: [
          "เขียน policy document ยาว ๆ ก่อน เพราะภาพหน้าจอจะทำให้ทุกคนคิดเรื่อง design มากเกินไป",
          "รอจนระบบ production เสร็จ แล้วค่อยให้ผู้ใช้เห็นของจริงครั้งแรก",
          "ใช้เฉพาะ ER diagram เพราะเหมาะที่สุดสำหรับพิสูจน์ usability ของหน้าจอ",
        ],
        explanationTh:
          "Prototype ช่วยลดความกำกวมของ interaction และ flow โดยยังปรับได้ก่อนลงทุนสร้างจริง เหมาะกับ feedback เชิงประสบการณ์ผู้ใช้มากกว่าเอกสารยาวหรือรอระบบเสร็จ",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `ใน ${c.org} ข้อมูลเกี่ยวกับ ${c.constraint} กระจายอยู่ใน policy และคู่มือเดิมหลายฉบับ ก่อน workshop BA ควรใช้เทคนิคใดเพื่อตั้งต้นให้ถูกต้อง?`,
        correct: "Document analysis เพื่อดึง rule, term, constraint และ gap ก่อนนำไปตรวจสอบกับ stakeholder",
        distractors: [
          "เริ่ม workshop โดยไม่อ่านเอกสารเดิมเพื่อไม่ให้เกิดอคติ",
          "ให้ทีมพัฒนาสร้าง data model ก่อน แล้วค่อยอ่าน policy หลังจากนั้น",
          "ใช้ voting เพื่อเลือก policy ที่ชอบที่สุดโดยไม่ตรวจข้อบังคับ",
        ],
        explanationTh:
          "Document analysis ช่วยให้ BA เข้าใจ rule และ constraint ที่มีอยู่ก่อนถาม stakeholder ทำให้คำถามคมขึ้นและลดการพลาดข้อกำกับสำคัญ แต่ยังต้อง validate กับผู้รู้ ไม่ใช่ถือว่าเอกสารเดิมถูกเสมอ",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.stakeholder} ในโครงการ ${c.initiative} มีความเห็นขัดแย้งเรื่อง priority และผลกระทบต่อ ${c.metric} BA ควร facilitate อย่างไร?`,
        correct: "ตั้งกติกา workshop ใช้ objective criteria เช่น value, risk, urgency และบันทึก decision/rationale ที่ตกลงกัน",
        distractors: [
          "ให้คนที่ตำแหน่งสูงที่สุดพูดก่อนและถือว่าความเห็นนั้นเป็นข้อสรุปเสมอ",
          "หลีกเลี่ยงความขัดแย้งโดยตัดประเด็น priority ออกจาก scope ทั้งหมด",
          "โหวตเร็ว ๆ โดยไม่ต้องนิยามเกณฑ์ เพราะเสียงส่วนใหญ่ถูกต้องเสมอ",
        ],
        explanationTh:
          "Collaboration ที่ดีต้องทำให้ความเห็นต่างถูกจัดการด้วยเกณฑ์ที่ตรวจสอบได้ BA ควร facilitate ด้วย value/risk/urgency และบันทึก rationale เพื่อป้องกัน conflict กลับมาใหม่",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `BA ต้องเก็บข้อมูลจาก ${c.userGroup} จำนวนมากเกี่ยวกับ ${c.pain} แต่ไม่สามารถสัมภาษณ์ทุกคนได้ เทคนิคใดเหมาะเมื่อ BA ต้องการ pattern เชิงปริมาณก่อนเจาะลึกต่อ?`,
        correct: "Survey ที่ออกแบบคำถามชัดเจน แล้วใช้ผลเพื่อเลือกประเด็นหรือกลุ่มตัวอย่างสำหรับ interview/workshop ต่อ",
        distractors: [
          "ใช้ focus group เดียวแล้วถือว่าแทนประชากรทั้งหมดได้โดยไม่ต้องระวัง bias",
          "ทำ observation กับผู้ใช้หนึ่งคนแล้วสรุปว่าเป็นพฤติกรรมของทุกคน",
          "ยกเลิกการเก็บข้อมูลจากผู้ใช้จริงและถามเฉพาะ sponsor",
        ],
        explanationTh:
          "Survey เหมาะกับการหา pattern จากคนจำนวนมาก แต่ควรออกแบบคำถามดีและใช้ผลเพื่อเจาะลึกต่อ ไม่ควรใช้ focus group หรือ observation ขนาดเล็กแทนประชากรทั้งหมดโดยไม่ระวัง bias",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org} พบว่า stakeholder เสนอ solution ว่า “เพิ่มปุ่ม/เพิ่มขั้นตอน” เพื่อแก้ ${c.pain} BA ควรถามต่ออย่างไรเพื่อหา underlying need ที่แท้จริง?`,
        correct: "ถามถึงสถานการณ์ ปัญหา ผลกระทบ และผลลัพธ์ที่ต้องการ ก่อนยอมรับ solution ที่เสนอ",
        distractors: [
          "ถามเฉพาะสี ตำแหน่ง และขนาดของปุ่มเพื่อให้ทีมออกแบบเร็วขึ้น",
          "รับ solution ทันทีเพราะ stakeholder เป็นเจ้าของงบประมาณ",
          "ปฏิเสธทุก solution จาก stakeholder เพราะ BA ต้องคิด solution เองเท่านั้น",
        ],
        explanationTh:
          "Elicitation ที่ดีต้องแยก need ออกจาก proposed solution BA ควรถามบริบท ปัญหา impact และ desired outcome เพื่อให้ requirement สะท้อนคุณค่าจริง ไม่ใช่รับคำขอหน้าจอโดยไม่เข้าใจเหตุผล",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `ใน workshop ของ ${c.initiative} มีผู้เข้าร่วมเงียบหลายคน ขณะที่บางฝ่ายครอบงำการสนทนา BA ควรทำอย่างไรเพื่อให้ collaboration มีคุณภาพที่สุด?`,
        correct: "ใช้ facilitation technique เช่น silent writing, round-robin และ parking lot เพื่อดึงเสียงทุกกลุ่มและคุมประเด็น",
        distractors: [
          "ปล่อยให้คนพูดเก่งที่สุดสรุป เพราะช่วยประหยัดเวลา meeting",
          "ตัดผู้เข้าร่วมที่เงียบออกจาก stakeholder list เพราะไม่มี input",
          "ปิด workshop ทันทีและเขียน requirement เองจากความเข้าใจของ BA",
        ],
        explanationTh:
          "BA ต้องออกแบบการมีส่วนร่วมให้ข้อมูลจาก stakeholder หลายกลุ่มออกมาอย่างสมดุล เทคนิคอย่าง silent writing/round-robin ลด dominance bias และ parking lot ช่วยคุมประเด็นโดยไม่ละเลย input สำคัญ",
      }),
    },
  ],
  requirements_lifecycle: [
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org} ต้องการให้ requirement ของ ${c.initiative} ตรวจสอบย้อนกลับถึง ${c.metric} และ test case ได้ BA ควรใช้ artifact หรือแนวทางใดมากที่สุด?`,
        correct: "Requirements traceability ที่เชื่อม business objective, requirement, design decision, test case และ release scope",
        distractors: [
          "เก็บ requirement เป็นข้อความในแชตเพื่อให้ค้นหาด้วยชื่อคนพูด",
          "ใช้เฉพาะ presentation สรุปผู้บริหารโดยไม่เชื่อมกับ test case",
          "ตั้งชื่อ requirement ตามวันที่ประชุมเท่านั้นโดยไม่ระบุความสัมพันธ์",
        ],
        explanationTh:
          "Requirements Life Cycle Management เน้นการติดตาม requirement ตลอดชีวิตของมัน Traceability ช่วยพิสูจน์ว่า requirement มาจาก objective ใด กระทบ design/test ใด และอยู่ใน release ใด",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `Backlog ของ ${c.initiative} มี requirement มากกว่าความสามารถของทีมใน release แรก BA ควรช่วยจัดลำดับด้วยแนวคิดใดเหมาะที่สุด?`,
        correct: "ใช้เกณฑ์ value, risk, urgency, dependency และ effort ร่วมกับ stakeholder เพื่อจัดลำดับอย่างโปร่งใส",
        distractors: [
          "เลือก requirement ที่เขียนง่ายที่สุดทั้งหมดก่อนโดยไม่ดูคุณค่าทางธุรกิจ",
          "เลือก requirement ตามลำดับเวลาที่คนส่งเข้ามาเท่านั้น",
          "รับทุก requirement เข้า release แรกเพื่อหลีกเลี่ยงการปฏิเสธ stakeholder",
        ],
        explanationTh:
          "Prioritization ต้องพิจารณาคุณค่า ความเสี่ยง ความเร่งด่วน dependency และ effort ไม่ใช่เลือกตามความง่ายหรือความดังของ stakeholder การตกลงเกณฑ์ช่วยให้ decision มีเหตุผล",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `หลัง review requirement ของ ${c.process} BA พบว่าบาง requirement ยังไม่มีเจ้าของและสถานะไม่ชัด ข้อมูล attribute ใดช่วย lifecycle management ได้มากที่สุด?`,
        correct: "owner, status, priority, source, rationale, version และ related requirement",
        distractors: [
          "สีพื้นหลังของเอกสารและ font ที่ใช้ในหัวข้อ requirement",
          "จำนวนครั้งที่ requirement ถูกพูดถึงในแชตโดยไม่รู้ที่มา",
          "ชื่อเล่นของผู้เข้าประชุมทุกคนโดยไม่เชื่อมกับ requirement",
        ],
        explanationTh:
          "Requirement attributes ช่วยให้ติดตามและจัดการ requirement ได้ตลอด lifecycle เช่น owner, status, priority, source, rationale, version และ relationship ข้อมูลตกแต่งเอกสารไม่ช่วยควบคุม requirement",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `กลางโครงการ ${c.initiative} มี change request ที่อาจกระทบ ${c.system}, ${c.constraint} และ ${c.metric} BA ควรทำอะไรก่อนแนะนำให้ approve หรือ reject?`,
        correct: "ทำ impact analysis ครอบคลุม business value, requirement ที่เกี่ยวข้อง, process, data, system, test และ release plan",
        distractors: [
          "approve ทันทีหากผู้ขอเป็นผู้บริหารระดับสูง",
          "reject ทันทีเพราะ change request หลังเริ่มโครงการไม่ควรถูกพิจารณา",
          "ส่งให้ developer ประเมินเฉพาะเวลาทำ code โดยไม่ดู business impact",
        ],
        explanationTh:
          "Change assessment ต้องมองผลกระทบครบตั้งแต่ business value ถึง release/test ไม่ใช่ตัดสินจากตำแหน่งผู้ขอหรือ effort ด้าน code อย่างเดียว BA มีบทบาททำให้ decision โปร่งใส",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.stakeholder} เห็นต่างกันว่า requirement ใดควรเป็น mandatory สำหรับ ${c.userGroup} BA ควรจัดการ conflict นี้ใน lifecycle อย่างไร?`,
        correct: "เชื่อม requirement กับ source/rationale และใช้ agreed decision criteria เพื่อ resolve หรือ escalate อย่างมีหลักฐาน",
        distractors: [
          "ลบ requirement ที่มี conflict ทั้งหมดออกเพื่อให้เอกสารดูสะอาด",
          "เลือกความเห็นของ stakeholder ที่ตอบอีเมลเร็วที่สุด",
          "ปล่อย conflict ไว้จนถึง UAT เพราะผู้ใช้จะบอกเองว่าต้องการอะไร",
        ],
        explanationTh:
          "Requirement conflict ต้องถูกจัดการด้วย source, rationale และ decision criteria ที่ตกลงไว้ หากตัดสินไม่ได้จึง escalate การปล่อย conflict ถึง UAT ทำให้ rework สูงและเสี่ยงต่อ release",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.org} ต้องการ baseline requirement สำหรับ ${c.initiative} ก่อนเริ่ม build แต่ยังมี open issue หลายข้อ BA ควรแนะนำอย่างไร?`,
        correct: "baseline เฉพาะ requirement ที่ validated/approved แล้ว และแยก open issue พร้อม owner/date สำหรับการตัดสินใจ",
        distractors: [
          "baseline ทุกอย่างรวมถึง requirement ที่ยังไม่ผ่าน review เพื่อให้ดูครบ",
          "ไม่ต้อง baseline อะไรเลยเพราะ baseline ทำให้ทีมเคลื่อนช้าเสมอ",
          "ให้ developer เลือกเองว่า requirement ใดพร้อมโดยไม่ต้องมี stakeholder approval",
        ],
        explanationTh:
          "Baseline คือจุดอ้างอิงที่ควรมีความพร้อมและอนุมัติแล้ว หากยังมี open issue ต้องแยกติดตาม ไม่ควรรวม requirement ที่ยังไม่ validated เข้า baseline จนทำให้ทีมเข้าใจผิด",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `Requirement หนึ่งของ ${c.initiative} ถูกนำกลับมาใช้จากระบบเดิม แต่บริบทใหม่มี ${c.constraint} BA ควรทำอะไรก่อน reuse requirement?`,
        correct: "ตรวจสอบความเหมาะสมกับบริบทใหม่ source ปัจจุบัน constraint และปรับ rationale/acceptance criteria ให้ทันสมัย",
        distractors: [
          "คัดลอก requirement เดิมทั้งหมดเพราะเคยใช้งานมาแล้วจึงถูกต้องเสมอ",
          "ลบ rationale เดิมออกเพื่อไม่ให้คนถามว่ามาจากที่ใด",
          "ใช้เฉพาะชื่อ requirement เดิมและให้ทีมพัฒนาเดารายละเอียดเอง",
        ],
        explanationTh:
          "Requirement reuse ช่วยประหยัดเวลาได้ แต่ต้อง validate กับบริบทใหม่ เพราะ constraint, process และ stakeholder อาจเปลี่ยน BA ต้องตรวจ source/rationale/acceptance criteria ก่อนนำกลับมาใช้",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org} พบ dependency ระหว่าง requirement ของ ${c.system} และ process ${c.process} หาก requirement ต้นทางเปลี่ยน BA ควรทำอย่างไรเพื่อควบคุมผลกระทบ?`,
        correct: "บันทึก relationship/dependency และใช้ traceability เพื่อแจ้ง owner ของ requirement downstream, test และ release ที่เกี่ยวข้อง",
        distractors: [
          "เปลี่ยนเฉพาะ requirement ต้นทางโดยไม่แจ้งทีมอื่นเพราะ dependency จะถูกพบเองตอน build",
          "ลบ requirement downstream ทั้งหมดทันทีเพื่อไม่ให้เกิดความเสี่ยง",
          "ให้ QA รับผิดชอบค้นหา dependency เองหลัง test case ล้มเหลว",
        ],
        explanationTh:
          "Lifecycle management ต้องควบคุม relationship ระหว่าง requirement เมื่อ requirement หนึ่งเปลี่ยน BA ควรใช้ traceability แจ้งผลกระทบต่อ downstream requirement, test และ release ก่อนเกิด defect",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `หลัง release แรกของ ${c.initiative} stakeholder ขอเพิ่ม feature ที่ไม่ชัดว่าสนับสนุน ${c.metric} BA ควรทำอย่างไรเพื่อรักษาความสอดคล้องกับ value?`,
        correct: "ทบทวน alignment กับ business objective และวัดผลกระทบต่อ value/risk ก่อนปรับ priority หรือ scope",
        distractors: [
          "เพิ่มเข้า backlog อันดับหนึ่งทันทีเพราะเป็นคำขอหลัง go-live",
          "ปฏิเสธทุก feature หลัง release แรกเพราะ requirement lifecycle จบแล้ว",
          "ให้ทีมออกแบบหน้าจอก่อนแล้วค่อยหาว่าเชื่อมกับ objective ใดภายหลัง",
        ],
        explanationTh:
          "Requirement ไม่ได้จบเมื่อ release แล้ว BA ต้อง monitor ว่ายังสอดคล้องกับ objective/value หรือไม่ คำขอใหม่ควรถูกประเมิน alignment, value และ risk ก่อนตัดสิน priority",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.initiative} มี change สำคัญที่กระทบผู้ใช้ ${c.userGroup} และทีมปฏิบัติการ BA ควรสื่อสาร requirement change อย่างไรให้ลดความเสี่ยงมากที่สุด?`,
        correct: "สื่อสารสิ่งที่เปลี่ยน เหตุผล ผลกระทบ effective date และ action ที่แต่ละกลุ่มต้องทำ ผ่านช่องทางที่เหมาะกับ stakeholder",
        distractors: [
          "อัปเดตเอกสารกลางเงียบ ๆ โดยไม่แจ้งใครเพราะทุกคนควรเข้ามาอ่านเอง",
          "ส่งข้อความเดียวแบบเทคนิคมากให้ทุกคนโดยไม่แยกผลกระทบตามกลุ่ม",
          "บอกเฉพาะทีมพัฒนาเพราะ requirement เป็นเรื่องของระบบเท่านั้น",
        ],
        explanationTh:
          "การสื่อสาร change เป็นส่วนสำคัญของ lifecycle management BA ต้องบอก what/why/impact/when/action ให้ stakeholder ที่เกี่ยวข้อง ไม่ใช่แค่อัปเดตเอกสารหรือแจ้งเฉพาะทีมเทคนิค",
      }),
    },
  ],
  strategy_analysis: [
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org} อยากลงทุนใน ${c.initiative} เพื่อแก้ ${c.pain} ก่อนเสนอ solution BA ควรทำอะไรใน current state analysis มากที่สุด?`,
        correct: "ทำความเข้าใจ process ปัจจุบัน stakeholder pain point capability ที่มี และข้อจำกัดที่ทำให้เกิดปัญหา",
        distractors: [
          "เลือก vendor ทันทีเพื่อให้มี solution มาเปรียบเทียบก่อนรู้ปัญหา",
          "เขียน requirement หน้าจอทั้งหมดโดยไม่ต้องดูวิธีทำงานปัจจุบัน",
          "เริ่ม training ผู้ใช้ก่อนเพื่อให้ทุกคนคุ้นเคยกับระบบใหม่",
        ],
        explanationTh:
          "Strategy Analysis เริ่มจากเข้าใจ current state และ need ที่แท้จริงก่อนเลือก solution BA ต้องเห็น process, capability, pain point และ constraint ปัจจุบันเพื่อไม่แก้ผิดปัญหา",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `ผู้บริหารของ ${c.org} ระบุเป้าหมายว่า ${c.metric} ในโครงการ ${c.initiative} BA ควรนิยาม future state อย่างไรให้ใช้ตัดสินใจได้?`,
        correct: "อธิบาย capability, outcome, stakeholder impact และ measurable success criteria ของสภาพอนาคต",
        distractors: [
          "ระบุชื่อเทคโนโลยีที่อยากซื้อโดยไม่บอก outcome ที่ต้องได้",
          "เขียนรายการหน้าจอทั้งหมดแทนการบอกความสามารถทางธุรกิจ",
          "ตั้ง future state ว่า 'ระบบต้องดีขึ้น' โดยไม่กำหนดตัวชี้วัด",
        ],
        explanationTh:
          "Future state ควรบอก capability และ outcome ที่ต้องเกิด พร้อมผลกระทบต่อ stakeholder และเกณฑ์วัดผล ไม่ใช่ชื่อเทคโนโลยีหรือคำกว้าง ๆ ที่ใช้ตัดสินใจไม่ได้",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.initiative} ถูกเสนอขึ้นมาเพราะ ${c.pain} แต่ยังไม่ชัดว่าเป็นปัญหาหรือแค่ symptom BA ควรใช้แนวทางใดก่อนกำหนด need?`,
        correct: "ทำ root cause analysis เช่น 5 Whys หรือ fishbone เพื่อแยก symptom, cause และ business need",
        distractors: [
          "รับ symptom เป็น requirement ทันทีเพราะผู้ใช้เจอปัญหาจริง",
          "ถามทีมพัฒนาให้เลือก architecture ก่อนเพื่อให้รู้ root cause",
          "ข้ามการวิเคราะห์สาเหตุและเริ่มทำ prototype ที่สวยที่สุด",
        ],
        explanationTh:
          "Strategy Analysis ต้องเข้าใจ need และสาเหตุ ไม่ใช่แก้แค่ symptom Root cause analysis ช่วยให้ BA เห็นปัญหาจริงและลดความเสี่ยงเลือก solution ที่ไม่สร้าง value",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.org} พบ gap ระหว่าง current state ของ ${c.process} กับ future state ที่ต้องการสำหรับ ${c.initiative} BA ควรจัดทำอะไรเพื่อชี้ทางการเปลี่ยนแปลง?`,
        correct: "Capability gap analysis ที่ระบุ gap, cause, impact, priority และ capability ที่ต้องสร้างหรือปรับ",
        distractors: [
          "เฉพาะ screen inventory โดยไม่เชื่อมกับ capability ทางธุรกิจ",
          "รายชื่อ bug ของระบบเดิมทั้งหมดโดยไม่จัดกลุ่มตาม gap",
          "แผนอบรมทั่วไปที่ไม่อ้างอิง gap หรือ stakeholder impact",
        ],
        explanationTh:
          "Gap analysis เชื่อม current กับ future state และช่วยระบุ capability ที่ต้องเปลี่ยน พร้อม impact/priority จึงเป็นฐานสำหรับ change strategy และ solution options",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `ใน ${c.initiative} มีข้อจำกัด ${c.constraint} และ risk ว่า ${c.risk} BA ควรประเมิน risk ใน Strategy Analysis อย่างไร?`,
        correct: "ประเมิน probability, impact, response option และ owner ของ risk ที่กระทบ business objective และ change",
        distractors: [
          "บันทึก risk เฉพาะ technical bug เพราะ business risk ไม่เกี่ยวกับ BA",
          "ลบ risk ออกจาก business case เพื่อให้โครงการดูน่าลงทุน",
          "รอให้ risk เกิดขึ้นจริงก่อนจึงค่อยหา owner",
        ],
        explanationTh:
          "Risk analysis ในระดับ strategy ต้องดูความเสี่ยงที่กระทบ objective, value และ change ไม่ใช่เฉพาะ bug BA ควรระบุ probability/impact/response/owner เพื่อให้ decision รอบคอบ",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.org} กำลังตัดสินใจว่าจะลงทุนใน ${c.initiative} หรือไม่ เอกสารใดช่วยให้ decision maker เห็น rationale ทางธุรกิจชัดที่สุด?`,
        correct: "Business case ที่รวม problem/opportunity, options, expected benefit, cost, risk, assumption และ recommendation",
        distractors: [
          "คู่มือการใช้งานระบบฉบับละเอียดก่อนตัดสินใจลงทุน",
          "รายการ field ในฐานข้อมูลโดยไม่อธิบายคุณค่าหรือความเสี่ยง",
          "บันทึกการประชุมทุกครั้งเรียงตามวันที่โดยไม่มีข้อเสนอแนะ",
        ],
        explanationTh:
          "Business case ช่วยตัดสินใจลงทุนเพราะรวมเหตุผลทางธุรกิจ ทางเลือก benefit/cost/risk/assumption และ recommendation ไม่ใช่เอกสารใช้งานหรือ data dictionary",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `เมื่อ ${c.org} กำหนด future state ของ ${c.initiative} แล้ว BA ควรช่วยกำหนด change strategy โดยคำนึงถึงสิ่งใดมากที่สุด?`,
        correct: "ลำดับ transition, stakeholder readiness, capability ที่ต้องสร้าง, dependency, risk และวิธีวัดผลการเปลี่ยนแปลง",
        distractors: [
          "เฉพาะวัน go-live วันเดียว เพราะ change strategy คือ deployment date",
          "เฉพาะรายละเอียด technical configuration ของ server",
          "เฉพาะรายการสีและ component ของ UI design system",
        ],
        explanationTh:
          "Change strategy คือวิธีเคลื่อนจาก current ไป future state จึงต้องมอง transition, readiness, capability, dependency, risk และ measurement ไม่ใช่เพียงวัน deploy หรือ configuration",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.initiative} มีหลายทางเลือก solution เช่น ปรับ process, ซื้อ package หรือสร้างใหม่ BA ควรเปรียบเทียบ option อย่างไรให้สอดคล้องกับ Strategy Analysis?`,
        correct: "เทียบแต่ละ option กับ business objective, capability gap, cost, benefit, risk, constraint และ feasibility",
        distractors: [
          "เลือก option ที่มีเทคโนโลยีใหม่ที่สุดโดยไม่ดูว่าแก้ gap ใด",
          "เลือก option ที่ stakeholder คนแรกเสนอเพราะลดเวลาวิเคราะห์",
          "เลือก option ที่ถูกที่สุดเสมอโดยไม่ดู risk และ benefit",
        ],
        explanationTh:
          "Solution option ต้องถูกประเมินกับ objective และ gap ทางธุรกิจ รวม cost/benefit/risk/constraint/feasibility การเลือกจากความใหม่ ความเร็ว หรือราคาต่ำอย่างเดียวเสี่ยงไม่สร้าง value",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org} ต้องเปลี่ยน ${c.process} โดยมีผู้ใช้ ${c.userGroup} จำนวนมากและระบบ ${c.system} ยังต้องทำงานต่อเนื่อง BA ควรวาง transition state อย่างไร?`,
        correct: "กำหนดช่วงเปลี่ยนผ่านที่ระบุ process ชั่วคราว data migration, parallel run, training และ cutover criteria",
        distractors: [
          "ข้าม transition state เพราะ future state ที่ดีจะทำให้ผู้ใช้ปรับตัวเองได้",
          "ปิดระบบเดิมทันทีในวันแรกโดยไม่ต้องมี parallel run หรือ rollback",
          "ให้ทีม support แก้ปัญหาเฉพาะหน้าโดยไม่ต้องวาง process ชั่วคราว",
        ],
        explanationTh:
          "Transition state ลดความเสี่ยงในการเปลี่ยนจาก current ไป future state โดยกำหนด process ชั่วคราว data migration, training, parallel run และ cutover/rollback criteria โดยเฉพาะระบบที่ต้องต่อเนื่อง",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `หาก sponsor ของ ${c.org} เสนอ ${c.initiative} แต่ไม่สามารถเชื่อมกับ ${c.metric} หรือ objective ใดได้ BA ควรทำอย่างไรอย่างมืออาชีพที่สุด?`,
        correct: "ตั้งคำถามเพื่อหา business need, expected outcome และ measure ก่อนสรุปว่า initiative ควรถูกทำหรือจัดลำดับอย่างไร",
        distractors: [
          "เดินหน้า requirement ทันทีเพราะ sponsor อนุมัติงบแล้ว",
          "ปฏิเสธ initiative ต่อหน้าทุกคนโดยไม่ถาม rationale เพิ่ม",
          "เปลี่ยน metric เองให้ดูเหมือน initiative มี value โดยไม่ยืนยันกับ sponsor",
        ],
        explanationTh:
          "BA มีหน้าที่ทำให้ need และ value ชัด แม้ sponsor จะมีอำนาจตัดสินใจ การถามหา outcome/measure ก่อนลงรายละเอียดช่วยป้องกันการลงทุนที่ไม่สอดคล้องกับกลยุทธ์",
      }),
    },
  ],
  requirements_analysis_design: [
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org} ต้องวิเคราะห์ขั้นตอน ${c.process} ที่มี handoff หลายทีมใน ${c.system} Model ใดเหมาะที่สุดเพื่อเห็น flow และจุดตัดสินใจ?`,
        correct: "Process model เช่น BPMN หรือ workflow diagram ที่แสดงกิจกรรม actor handoff และ decision point",
        distractors: [
          "Data dictionary เพียงอย่างเดียว เพราะใช้แสดงลำดับงานได้ละเอียดที่สุด",
          "Risk register เพราะใช้แทน process flow และ actor ทั้งหมดได้",
          "Release calendar เพราะบอก workflow ผู้ใช้ได้ชัดกว่า diagram",
        ],
        explanationTh:
          "Requirements Analysis and Design Definition เลือก model ให้เหมาะกับคำถาม หากต้องเข้าใจขั้นตอนและ handoff ควรใช้ process model/BPMN ไม่ใช่ data dictionary หรือ release calendar",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `Requirement ของ ${c.initiative} เกี่ยวข้องกับ ${c.data} และคำศัพท์แต่ละทีมใช้ไม่ตรงกัน BA ควรทำ artifact ใดเพื่อลดความกำกวม?`,
        correct: "Data dictionary/glossary ที่นิยาม field, term, format, source, owner และ business rule สำคัญ",
        distractors: [
          "Mood board ของสีหน้าจอ เพราะช่วยให้ทุกทีมตีความข้อมูลตรงกัน",
          "Deployment checklist เพราะอธิบายความหมายของข้อมูลได้ดีที่สุด",
          "Timesheet ของทีม project เพราะใช้ยืนยันนิยามข้อมูลกับ stakeholder",
        ],
        explanationTh:
          "เมื่อข้อมูลและคำศัพท์กำกวม data dictionary/glossary ช่วยนิยาม field/term/source/owner/rule ให้ตรงกัน เป็น artifact สำคัญในการวิเคราะห์ requirement เชิงข้อมูล",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org} ต้องการ requirement ที่ทดสอบได้สำหรับ ${c.metric} ข้อใดเป็น acceptance criteria ที่ดีที่สุดสำหรับ ${c.initiative}?`,
        correct: `เมื่อ ${c.userGroup} ทำ ${c.process} สำเร็จ ระบบต้องแสดงสถานะถัดไปและบันทึกหลักฐานที่เกี่ยวข้องภายในเวลาที่ตกลงไว้`,
        distractors: [
          "ระบบต้องใช้งานง่ายและดูทันสมัยสำหรับทุกคน",
          "ระบบควรดีขึ้นกว่าเดิมและทำให้ลูกค้าพอใจมากขึ้น",
          "หน้าจอควรสวย มีปุ่มชัด และทีมพัฒนาควรทำให้ดีที่สุด",
        ],
        explanationTh:
          "Acceptance criteria ที่ดีต้องสังเกตและทดสอบได้ ระบุ trigger, behavior, output และเงื่อนไขสำคัญ คำว่าใช้งานง่าย ดีขึ้น หรือสวยเป็นคำกว้างที่ต้องแตกต่อให้วัดได้",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.initiative} มี business rule ซับซ้อนเกี่ยวกับ ${c.constraint} และผลลัพธ์ขึ้นกับหลายเงื่อนไข Model ใดเหมาะที่สุดเพื่อวิเคราะห์ rule?`,
        correct: "Decision table หรือ decision model ที่แสดง condition, combination และ expected outcome อย่างเป็นระบบ",
        distractors: [
          "Org chart เพราะแสดงเงื่อนไข business rule ได้ละเอียดกว่า table",
          "Empathy map เพราะใช้ตรวจ logic ของ rule หลายเงื่อนไขได้ดีที่สุด",
          "Release burndown เพราะบอกผลลัพธ์ของ rule ตาม condition ได้ครบ",
        ],
        explanationTh:
          "Decision table เหมาะกับ rule ที่มีหลาย condition และ outcome เพราะช่วยตรวจ coverage, conflict และ gap ของเงื่อนไขได้ดีกว่า artifact ที่เน้นคนหรือ timeline",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `ระบบของ ${c.org} ต้องรับส่งข้อมูลกับ ${c.system} หลายตัวในโครงการ ${c.initiative} เทคนิคใดช่วยวิเคราะห์ boundary และ contract ระหว่างระบบได้ดีที่สุด?`,
        correct: "Interface analysis ที่ระบุ input/output, trigger, protocol, error handling, owner และ data mapping",
        distractors: [
          "Brainstorming อย่างเดียวโดยไม่ต้องนิยาม field หรือ error case",
          "Stakeholder map เพราะใช้แทน interface contract ระหว่างระบบได้",
          "Training plan เพราะแสดง data mapping ระหว่างระบบครบถ้วนที่สุด",
        ],
        explanationTh:
          "Interface analysis ทำให้ requirement ระหว่างระบบชัดเจน ทั้ง trigger, data, protocol, error handling และ owner ลดความเสี่ยง integration mismatch ใน solution design",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.process} มีสถานะหลายแบบ เช่น เปิดเรื่อง รอตรวจ อนุมัติ ปฏิเสธ และปิดงาน BA ควรใช้ model ใดเพื่อวิเคราะห์ transition และ rule ของสถานะ?`,
        correct: "State model/state diagram ที่แสดงสถานะ เหตุการณ์ที่ทำให้เปลี่ยนสถานะ และเงื่อนไขของแต่ละ transition",
        distractors: [
          "Persona profile เพราะใช้แสดง transition ของสถานะระบบได้ดีที่สุด",
          "Budget forecast เพราะบอก lifecycle ของ case ได้ละเอียดกว่า diagram",
          "Mood board เพราะช่วยให้สถานะระบบถูกต้องตาม business rule",
        ],
        explanationTh:
          "State model เหมาะกับ entity ที่มี lifecycle และ transition ชัดเจน เช่น เคส คำขอ หรือคำสั่งซื้อ ช่วยตรวจว่าเหตุการณ์และเงื่อนไขเปลี่ยนสถานะครบหรือไม่",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `BA เขียน user story สำหรับ ${c.userGroup} ใน ${c.initiative} แล้วทีมบอกว่ายังใหญ่และกำกวม เกณฑ์ใดช่วยตรวจคุณภาพ user story ได้ดี?`,
        correct: "INVEST: independent, negotiable, valuable, estimable, small และ testable",
        distractors: [
          "RACI: responsible, accountable, consulted และ informed",
          "SWOT: strengths, weaknesses, opportunities และ threats",
          "RICE: reach, impact, confidence และ effort เท่านั้น",
        ],
        explanationTh:
          "INVEST เป็น heuristic สำหรับตรวจคุณภาพ user story โดยเฉพาะความเป็นอิสระ คุณค่า ขนาด และ testability ส่วน RACI/SWOT/RICE ใช้คนละวัตถุประสงค์",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org} ต้องระบุ non-functional requirement สำหรับ ${c.initiative} ที่เกี่ยวกับ ${c.constraint} ข้อใดเขียนได้ดีที่สุด?`,
        correct: `ระบบต้องเก็บ audit trail ของ ${c.data} พร้อมผู้กระทำ เวลา และผลลัพธ์ โดยค้นคืนได้ตามระยะเวลาที่ policy กำหนด`,
        distractors: [
          "ระบบต้องปลอดภัยมาก ๆ และควรเร็วพอสำหรับทุกสถานการณ์",
          "ระบบต้องดูน่าเชื่อถือและห้ามมีปัญหาใด ๆ หลัง go-live",
          "ระบบต้องดีเท่ากับคู่แข่งและมีประสิทธิภาพสูงที่สุด",
        ],
        explanationTh:
          "Non-functional requirement ต้องวัด ตรวจสอบ และออกแบบต่อได้ ควรระบุคุณลักษณะ เงื่อนไข และเกณฑ์ ไม่ใช่คำกว้างอย่างเร็ว ปลอดภัย หรือดีมากโดยไม่มีตัวชี้วัด",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `เมื่อวิเคราะห์ solution option สำหรับ ${c.initiative} BA พบว่าทางเลือกหนึ่งตอบโจทย์ ${c.metric} แต่เพิ่ม operational risk ว่า ${c.risk} BA ควรทำอย่างไร?`,
        correct: "บันทึก trade-off ระหว่าง value, risk, constraint และ stakeholder impact แล้วเสนอ recommendation พร้อม rationale",
        distractors: [
          "ซ่อน risk ไว้เพราะ option ที่ตอบ KPI ควรถูกเลือกเสมอ",
          "เลือก option ที่ risk ต่ำสุดเสมอโดยไม่ดู value หรือ feasibility",
          "ให้ vendor เลือกทางเลือกแทนเพราะ vendor รู้เทคนิคดีที่สุด",
        ],
        explanationTh:
          "Requirements Analysis and Design Definition รวมการวิเคราะห์ option และ recommendation BA ต้องทำ trade-off โปร่งใสระหว่าง value, risk, constraint และ impact ไม่ใช่เลือกจากมิติเดียว",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.initiative} มี requirement จำนวนมากและ stakeholder ถามว่า requirement พร้อมส่ง build หรือยัง BA ควรตรวจคุณภาพด้วยเกณฑ์ใดครบที่สุด?`,
        correct: "ตรวจว่า requirement ชัดเจน ถูกต้อง ครบถ้วน สอดคล้องกัน feasible prioritized traceable และ testable",
        distractors: [
          "ตรวจเฉพาะว่า requirement ถูกเขียนใน template เดียวกันทุกหน้า",
          "ตรวจเฉพาะว่า sponsor ส่งอีเมลว่าเห็นด้วยโดยไม่ดูความ testable",
          "ตรวจเฉพาะว่า requirement มีคำว่า shall ครบทุกประโยค",
        ],
        explanationTh:
          "Requirement quality ไม่ได้วัดแค่ format แต่ต้องดูความชัด ถูกต้อง ครบ สอดคล้อง feasible prioritized traceable และ testable เพื่อให้ทีม build/test ได้อย่างมั่นใจ",
      }),
    },
  ],
  solution_evaluation: [
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `หลังปล่อย ${c.initiative} ของ ${c.org} ผู้บริหารอยากรู้ว่าสร้างคุณค่าจริงหรือไม่ BA ควรเริ่มจากข้อมูลใดมากที่สุด?`,
        correct: `KPI/outcome ที่ตกลงไว้ เช่น ${c.metric} เทียบ baseline ก่อนและหลังใช้งาน`,
        distractors: [
          "จำนวนหน้าจอที่ทีมพัฒนาสร้างได้ เพราะยิ่งเยอะยิ่งแปลว่าสำเร็จ",
          "จำนวนชั่วโมงประชุมหลัง go-live โดยไม่ดูผลลัพธ์ของผู้ใช้",
          "ความคิดเห็นของทีม project เท่านั้น โดยไม่ดูข้อมูลผู้ใช้หรือ business metric",
        ],
        explanationTh:
          "Solution Evaluation วัด performance และ value ของ solution ด้วย outcome/KPI เทียบ baseline ไม่ใช่นับ output อย่างจำนวนหน้าจอหรือชั่วโมงประชุมที่ไม่บอกผลลัพธ์ทางธุรกิจ",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `${c.org} พบว่าหลัง go-live ผู้ใช้ ${c.userGroup} ยังเจอ ${c.pain} BA ควรทำอะไรก่อนเสนอ enhancement ใหม่?`,
        correct: "วิเคราะห์ root cause ของ performance gap โดยดูข้อมูลใช้งาน feedback process และ constraint ที่เกี่ยวข้อง",
        distractors: [
          "ขอเพิ่ม feature ใหม่ทันทีโดยไม่ตรวจว่าปัญหาเกิดจากอะไร",
          "สรุปว่า user ไม่ยอมเปลี่ยนเองทั้งหมดโดยไม่ดู evidence",
          "ปิด feedback channel เพื่อไม่ให้เห็น complaint เพิ่ม",
        ],
        explanationTh:
          "เมื่อ solution ไม่ให้ผลตามคาด BA ต้องวิเคราะห์ performance gap และ root cause ก่อนเสนอ action การเพิ่ม feature โดยไม่รู้สาเหตุอาจเพิ่ม complexity โดยไม่แก้ปัญหา",
      }),
    },
    {
      difficulty: "easy",
      make: (c) => ({
        promptTh: `ข้อใดเป็นตัวอย่าง feedback ที่ BA ควรใช้ในการประเมิน solution ของ ${c.initiative} ได้ดีที่สุด?`,
        correct: `ข้อมูลการใช้งานจริงของ ${c.userGroup}, complaint pattern, survey เฉพาะประเด็น และผลกระทบต่อ ${c.metric}`,
        distractors: [
          "ความรู้สึกของทีม project ว่า project ผ่านไปได้ด้วยดี",
          "จำนวนไฟล์เอกสารที่สร้างระหว่าง project โดยไม่ดูการใช้งานจริง",
          "สีของ dashboard ที่ผู้บริหารชอบมากที่สุดในวัน demo",
        ],
        explanationTh:
          "Feedback สำหรับ Solution Evaluation ควรรวมข้อมูลเชิงพฤติกรรมและผลลัพธ์จริง เช่น usage, complaint, survey และ metric ที่ตกลงไว้ ไม่ใช่ความรู้สึกหรือ artifact count",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.initiative} ทำงานได้ตาม requirement แต่ ${c.metric} ไม่ดีขึ้น BA ควรตีความสถานการณ์นี้อย่างไร?`,
        correct: "Solution อาจถูก build ตาม requirement แต่ requirement หรือ change strategy อาจไม่เพียงพอต่อ outcome ต้องประเมิน value gap",
        distractors: [
          "ถือว่าสำเร็จเต็มที่เพราะทีม build ตาม requirement แล้ว",
          "ถือว่าเป็นปัญหา QA เท่านั้น เพราะ metric ธุรกิจไม่เกี่ยวกับ BA",
          "แก้ด้วยการเพิ่มหน้าจอทันทีโดยไม่วิเคราะห์ adoption หรือ process",
        ],
        explanationTh:
          "การผ่าน requirement ไม่เท่ากับสร้าง business value เสมอ BA ต้องประเมิน value gap ว่าเกิดจาก requirement, adoption, process, data หรือ strategy ไม่ใช่หยุดที่ output",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `หลังใช้งาน ${c.initiative} พบ limitation ว่า ${c.constraint} ทำให้ผู้ใช้ทำงานช้าลง BA ควรประเมิน limitation นี้อย่างไร?`,
        correct: "ระบุ impact ต่อ stakeholder, business process, KPI, workaround, root cause และ option เพื่อลดข้อจำกัด",
        distractors: [
          "บันทึกว่าเป็นข้อจำกัดของผู้ใช้และไม่ต้องทำอะไรต่อ",
          "ลบ constraint ออกจากเอกสารเพื่อให้ solution ดูดีขึ้น",
          "ส่งให้ทีมพัฒนาหาทางแก้เองโดยไม่อธิบาย business impact",
        ],
        explanationTh:
          "Solution limitation ต้องถูกประเมินจากผลกระทบจริงต่อ process, stakeholder และ KPI พร้อม root cause/workaround/option ไม่ใช่บันทึกแบบไม่มี action หรือโยนเป็นเรื่องเทคนิคอย่างเดียว",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `${c.org} ต้องเลือกระหว่างแก้ defect เล็กหลายรายการกับแก้ limitation ใหญ่ที่กระทบ ${c.metric} BA ควรช่วยตัดสินอย่างไร?`,
        correct: "ประเมิน severity, frequency, stakeholder impact, value impact, risk และ cost of delay ของแต่ละทางเลือก",
        distractors: [
          "แก้ defect ที่รายงานล่าสุดก่อนเสมอเพราะสดใหม่ที่สุด",
          "เลือกงานที่ทีมพัฒนาชอบที่สุดเพื่อเพิ่ม morale",
          "นับจำนวน defect เท่านั้น โดยไม่ดูว่า defect ใดกระทบ value มากกว่า",
        ],
        explanationTh:
          "การ recommend action หลังประเมิน solution ต้องใช้เกณฑ์ value/risk/impact/cost of delay ไม่ใช่จำนวน defect หรือความล่าสุดของ ticket เพียงอย่างเดียว",
      }),
    },
    {
      difficulty: "medium",
      make: (c) => ({
        promptTh: `หลัง go-live ของ ${c.initiative} ผู้ใช้สร้าง workaround นอกระบบเพื่อหลีกเลี่ยง ${c.pain} BA ควรทำอย่างไรในการประเมิน solution?`,
        correct: "ศึกษาว่า workaround เกิดจาก requirement gap, usability, policy, data quality หรือ change readiness แล้วเสนอ corrective action",
        distractors: [
          "สั่งห้าม workaround ทันทีโดยไม่เข้าใจเหตุผลที่ผู้ใช้ทำ",
          "สรุปว่า solution สำเร็จเพราะผู้ใช้ยังทำงานต่อได้",
          "เพิ่ม control ให้ระบบปิดทุกทางเลือกของผู้ใช้ก่อนวิเคราะห์ impact",
        ],
        explanationTh:
          "Workaround เป็นสัญญาณสำคัญในการประเมิน solution BA ควรค้นหาสาเหตุว่าเกิดจาก gap ด้าน requirement, usability, policy, data หรือ readiness ก่อนเสนอ action",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org} ต้องการพิสูจน์ benefit realization ของ ${c.initiative} หลังใช้งาน 3 เดือน BA ควรวางหลักฐานอย่างไรให้หนักแน่นที่สุด?`,
        correct: "เทียบ baseline กับผลหลังใช้งานตาม KPI, แยกผลจากปัจจัยอื่นเท่าที่ทำได้ และแสดง evidence จาก usage/financial/operation data",
        distractors: [
          "ใช้คำยืนยันจาก sponsor เพียงคนเดียวว่าโครงการรู้สึกดีขึ้น",
          "นับจำนวน requirement ที่ปิดแล้วและถือว่าเท่ากับ benefit",
          "ใช้ demo video เป็นหลักฐานเดียวว่าผู้ใช้ได้คุณค่าแล้ว",
        ],
        explanationTh:
          "Benefit realization ต้องใช้ evidence ที่เทียบ baseline กับ actual outcome และพยายามแยกปัจจัยอื่น ไม่ใช่ใช้ความเห็นหรือจำนวน requirement ปิดแทนผลลัพธ์ทางธุรกิจ",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.initiative} มี adoption ต่ำในกลุ่ม ${c.userGroup} แม้ training เสร็จแล้ว BA ควรใช้คำถามใดเพื่อหา action ที่เหมาะสมที่สุด?`,
        correct: "ผู้ใช้ติดที่ capability, process, incentive, usability, data trust หรือ policy ใด และสิ่งใดทำให้ behavior ใหม่ไม่เกิด",
        distractors: [
          "ใครไม่ยอมใช้ระบบบ้าง เพื่อส่งรายชื่อให้หัวหน้าลงโทษก่อน",
          "จะเพิ่ม pop-up กี่อันดี โดยไม่ต้องถามว่าทำไมผู้ใช้ไม่ใช้",
          "ทีมพัฒนาควร rewrite ระบบทั้งหมดไหม เพราะ adoption ต่ำแปลว่า code แย่",
        ],
        explanationTh:
          "Low adoption อาจเกิดจากหลายปัจจัย ไม่ใช่แค่ training หรือ code BA ต้องวิเคราะห์ behavior barrier เช่น capability, process, incentive, usability, data trust และ policy ก่อนแนะนำ action",
      }),
    },
    {
      difficulty: "hard",
      make: (c) => ({
        promptTh: `${c.org} พิจารณาจะเลิกใช้ส่วนหนึ่งของ solution ใน ${c.initiative} เพราะ maintenance สูง BA ควรประเมินอะไรก่อนแนะนำ retire หรือ keep?`,
        correct: "usage, business value, regulatory need, operational dependency, cost, risk และ impact หากถอดออก",
        distractors: [
          "ถอดออกทันทีถ้ามีผู้ใช้น้อย โดยไม่ดู regulatory หรือ dependency",
          "เก็บไว้ทั้งหมดเสมอเพราะ feature ที่สร้างแล้วไม่ควรถูกเลิกใช้",
          "ถามเฉพาะทีมพัฒนาว่าชอบดูแล feature นี้หรือไม่",
        ],
        explanationTh:
          "การ retire solution capability ต้องดู value และ dependency รอบด้าน ทั้ง usage, regulatory, operation, cost/risk และ impact ไม่ใช่ตัดสินจากจำนวนผู้ใช้หรือความชอบของทีมเดียว",
      }),
    },
  ],
};

function buildAreaQuestions(
  area: OfficialReqGymArea,
  target: number,
  areaIndex: number,
): ReqGymQuestion[] {
  const questions: ReqGymQuestion[] = [];
  const blueprints = BLUEPRINTS[area];
  const prefix = AREA_PREFIX[area];

  outer: for (let contextIndex = 0; contextIndex < CONTEXTS.length; contextIndex += 1) {
    const context = CONTEXTS[(contextIndex + areaIndex * 3) % CONTEXTS.length];
    for (let blueprintIndex = 0; blueprintIndex < blueprints.length; blueprintIndex += 1) {
      if (questions.length >= target) break outer;
      const serial = questions.length + 1;
      const blueprint = blueprints[blueprintIndex];
      const stem = blueprint.make(context);
      const answer = (serial + areaIndex + contextIndex + blueprintIndex) % 4;

      questions.push({
        id: `rg-${prefix}-${String(serial).padStart(3, "0")}`,
        area,
        difficulty: blueprint.difficulty,
        promptTh: stem.promptTh,
        options: placeCorrectAnswer(stem.correct, stem.distractors, answer),
        answer,
        explanationTh: stem.explanationTh,
      });
    }
  }

  return questions;
}

function placeCorrectAnswer(
  correct: string,
  distractors: [string, string, string],
  answer: number,
): string[] {
  const options = [...distractors];
  options.splice(answer, 0, correct);
  return options;
}

export function isOfficialReqGymArea(area: string): area is OfficialReqGymArea {
  return REQ_GYM_OFFICIAL_AREAS.includes(area as OfficialReqGymArea);
}

function isCompleteOfficialQuestion(question: ReqGymQuestion): boolean {
  return (
    isOfficialReqGymArea(question.area) &&
    (question.difficulty === "easy" ||
      question.difficulty === "medium" ||
      question.difficulty === "hard") &&
    question.options.length === 4 &&
    Number.isInteger(question.answer) &&
    question.answer >= 0 &&
    question.answer < question.options.length &&
    question.promptTh.trim().length > 0 &&
    question.explanationTh.trim().length > 0
  );
}

export function buildReqGymQuestionBank(): ReqGymQuestion[] {
  const bank = REQ_GYM_OFFICIAL_AREAS.flatMap((area, areaIndex) =>
    buildAreaQuestions(area, AREA_TARGETS[area], areaIndex),
  );

  if (bank.length !== REQ_GYM_QUESTION_TARGET) {
    throw new Error(`Req Gym bank generated ${bank.length} questions, expected ${REQ_GYM_QUESTION_TARGET}`);
  }

  return bank;
}

export const REQ_GYM_QUESTIONS: ReqGymQuestion[] = buildReqGymQuestionBank();

export function resolveReqGymQuestionBank(
  remoteQuestions: readonly ReqGymQuestion[] | null | undefined,
): ReqGymQuestion[] {
  const completeRemote = (remoteQuestions ?? []).filter(isCompleteOfficialQuestion);
  if (completeRemote.length < REQ_GYM_QUESTION_TARGET) {
    return REQ_GYM_QUESTIONS;
  }

  return completeRemote.slice(0, REQ_GYM_QUESTION_TARGET);
}

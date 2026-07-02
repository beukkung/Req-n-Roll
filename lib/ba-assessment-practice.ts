export const BA_ASSESSMENT_EXPECTED_SET_COUNT = 10;
export const BA_ASSESSMENT_EXPECTED_MCQ_PER_SET = 20;
export const BA_ASSESSMENT_EXPECTED_WRITTEN_CASE_COUNT = 10;
export const BA_ASSESSMENT_EXPECTED_WRITTEN_PROMPTS_PER_SET = 10;

export type BaAssessmentMcq = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill: string;
};

export type BaAssessmentWrittenPromptType =
  | "feature"
  | "overview"
  | "endToEnd"
  | "bonus";

export type BaAssessmentWrittenPrompt = {
  id: string;
  type: BaAssessmentWrittenPromptType;
  title: string;
  prompt: string;
  expectedPoints: string[];
};

export type BaAssessmentWrittenCase = {
  title: string;
  scenario: string;
  instructions: string[];
  prompts: BaAssessmentWrittenPrompt[];
};

export type BaAssessmentPracticeSet = {
  id: string;
  title: string;
  focus: string;
  scenario: string;
  mcq: BaAssessmentMcq[];
  writtenCase: BaAssessmentWrittenCase;
};

type McqSeed = {
  area: string;
  situation: string;
  pressure: string;
  stakeholders: string;
  bestAction: string;
  wrongBypass: string;
  wrongFreeze: string;
  wrongEscalate: string;
};

type WrittenSeed = {
  title: string;
  systemName: string;
  scenario: string;
  features: string[];
  dataFocus: string;
  controlFocus: string;
  stakeholders: string;
};

type ExamSeed = {
  id: string;
  title: string;
  focus: string;
  scenario: string;
  mcqSeeds: McqSeed[];
  written: WrittenSeed;
};

const EXAM_SEEDS: ExamSeed[] = [
  exam(
    "real-pattern-foundation",
    "ชุดที่ 1: e-KYC, AML Workshop และ Fraud Sandbox",
    "Legal sign-off, workshop facilitation, fraud simulation, risk-control trade-off",
    "ชุดนี้เลียนแบบภาพตัวอย่างจริงโดยตรง: MCQ เริ่มจาก e-KYC ที่ Legal ไม่ sign-off และ AML workshop ที่เสียงผู้บริหารกลบ stakeholder อื่น ส่วนข้อเขียนเป็น Fraud Simulation Sandbox ที่ต้องออกแบบ feature, ภาพรวมระบบ และ end-to-end flow",
    [
      mcq("e-KYC go-live", "ระบบ e-KYC ใหม่ผ่าน SIT/UAT แล้ว Business และ IT ต้องการเปิดใช้ตามแผน แต่ Legal ยังไม่ sign-off เพราะกังวลว่าการจัดเก็บภาพบัตรประชาชน face image และ consent record อาจไม่ตรง policy regulator", "ผู้บริหารกดดันให้เปิด production เพราะ campaign เปิดบัญชีดิจิทัลประกาศไปแล้ว", "Legal, Compliance, Digital Product, IT, Operations, DPO และ Project Sponsor", "จัด session กับ Legal/Compliance/DPO/Business/IT เพื่อแยก concern เป็น requirement gap, control option, residual risk, owner และเงื่อนไข sign-off ก่อนตัดสินใจ go-live", "ให้ Business และ IT เปิดระบบก่อน เพราะ test ผ่านแล้วและค่อยให้ Legal ตรวจย้อนหลัง", "ยกเลิก go-live ทั้งหมดและตั้งโครงการใหม่โดยไม่วิเคราะห์ option ที่ลดความเสี่ยง", "ให้ Project Sponsor override Legal ทันทีเพื่อรักษา timeline"),
      mcq("AML workshop", "ในการ workshop เก็บ requirement ระบบ AML case management ผู้บริหาร Operations สองคนพูดเกือบตลอดเวลา ขณะที่ Compliance, Fraud และ branch operations แทบไม่ได้ให้ input ทั้งที่เป็นผู้ใช้หรือ control owner สำคัญ", "เวลาประชุมเหลือน้อยและทุกฝ่ายอยากปิด requirement ให้ทัน sprint planning", "Operations, AML Compliance, Fraud, Branch Ops, IT และ Product Owner", "ใช้ facilitation เช่น round-robin, parking lot, silent note และ decision log เพื่อให้ทุก stakeholder ให้ input ครบ แล้วสรุป conflict/open issue ให้ owner ตัดสิน", "ฟังผู้บริหาร Operations เป็นหลักเพราะมีอำนาจสูงและเข้าใจงานจริง", "ยุติ workshop แล้วให้ทุกฝ่ายส่ง requirement ทาง email โดยไม่ align กัน", "ให้ Compliance เขียน requirement เองทั้งหมดเพราะเป็นเจ้าของ policy"),
      mcq("Fraud rule promotion", "Fraud team ต้องการ promote rule ใหม่ที่จับธุรกรรมหลอกลวงได้ดีขึ้น แต่ Operations คาดว่า alert จะเพิ่มจาก 500 เป็น 4,000 รายการต่อวัน และ Customer Experience กังวลลูกค้าปกติถูก hold จำนวนมาก", "Risk Head อยากให้เปิดเร็วเพราะมีข่าว fraud case ใหม่ในตลาด", "Fraud, Risk, Operations, Customer Experience, Contact Center และ Data Analytics", "ทำ impact analysis เทียบ fraud loss reduction, false positive, workload, SLA, customer message และ tuning plan ก่อนเสนอ go/no-go พร้อม control", "เปิด rule ทันทีเพราะ fraud risk สำคัญกว่าทุกมิติ", "ปิด rule ทั้งหมดจนกว่าจะไม่มี false positive เลย", "ให้ทีม IT ตัดสินจาก effort ที่ใช้แก้ rule"),
      mcq("Sandbox data privacy", "ทีม Data ขอใช้ production transaction และ customer profile จริงใน Fraud Simulation Sandbox เพื่อให้ผลทดสอบใกล้เคียงความจริง แต่ DPO กังวลเรื่องข้อมูลส่วนบุคคลและ purpose limitation", "ทีม Fraud บอกว่าถ้า mask มากเกินไป model จะทดสอบไม่แม่น", "Fraud, Data Science, DPO, Compliance, Security และ Platform team", "นิยาม data minimization, masking/tokenization, role access, retention, audit trail และ exception approval ที่ยังรักษาความสมจริงของ simulation ได้", "ให้ Data ใช้ข้อมูลจริงเต็มรูปแบบเพราะเป็นงานภายในธนาคาร", "ห้ามใช้ข้อมูลทุกชนิดใน sandbox ทำให้ทดสอบ model ไม่ได้", "ขอให้ vendor ตัดสินเรื่อง privacy แทนธนาคาร"),
      mcq("Requirement sign-off", "หลัง workshop e-KYC มี requirement หลายข้อที่ Business เข้าใจว่าเป็น nice-to-have แต่ Compliance ถือว่าเป็น regulatory must-have เช่น consent version, audit trail และ retention evidence", "ทีม delivery ต้องการ baseline scope เพื่อเริ่ม build", "Business, Compliance, Legal, IT Delivery, QA และ Release Manager", "ทำ requirement classification แยก regulatory must-have, risk mitigation, business value และ phase option พร้อม traceability ไป policy/control owner", "ตัด requirement compliance ออกก่อนเพื่อให้ MVP เบา", "ใส่ทุก requirement เข้า scope เดียวกันโดยไม่จัด priority", "ให้ QA ตัดสินตอน test ว่าข้อไหนต้องทำ"),
      mcq("UAT defect dispute", "UAT พบว่า e-KYC rejection reason ไม่แสดงให้ Call Center เห็น แต่ Digital บอกว่าไม่อยู่ใน scope ส่วน Operations บอกว่าถ้าไม่มีจะตอบลูกค้าไม่ได้และเกิด complaint", "Release date เหลือหนึ่งสัปดาห์", "Digital Product, Operations, Call Center, Legal, IT และ QA", "ตรวจ BRD/FRD/traceability เพื่อดู business need เดิม ประเมิน customer impact และเสนอ option เช่น minimum reason category, masking และ post-release enhancement", "บอก Operations ว่า scope ปิดแล้วและให้ใช้ manual workaround ไปก่อนเสมอ", "ให้ developer เพิ่ม field ทันทีโดยไม่ตรวจ privacy หรือ test impact", "เลื่อน release ทั้งหมดโดยไม่แยก severity/option"),
      mcq("Multi-voting misuse", "ใน session จัดลำดับ requirement ทีมใช้ multi-voting แล้ว requirement ด้าน audit trail ได้คะแนนต่ำ เพราะ user ส่วนใหญ่ไม่ได้ใช้โดยตรง แต่ Compliance เตือนว่าเป็น regulatory evidence", "PO อยากใช้ผลโหวตเป็น final priority", "End users, Compliance, Product Owner, Risk, QA และ Sponsor", "ชี้ว่าการโหวตใช้กับ preference ได้ แต่ regulatory/control requirement ต้องผ่าน decision criteria แยก และบันทึก rationale/owner", "ตัด audit trail ออกจาก release เพราะคะแนนโหวตต่ำ", "ให้ Compliance ชนะทุกเรื่องโดยไม่อธิบาย impact ต่อ business", "โหวตซ้ำจนกว่าผลจะตรงกับความเห็น sponsor"),
      mcq("Consent wording change", "Legal เปลี่ยน wording consent หลัง UAT รอบสุดท้าย เพราะ policy version ใหม่มีผลก่อน go-live ขณะที่ Digital กลัว conversion drop จากข้อความยาวขึ้น", "Marketing campaign เริ่มพรุ่งนี้", "Legal, DPO, Digital, UX Writing, Analytics, Release และ Call Center", "ทำ change impact ต่อ wording, versioning, customer journey, analytics, training script และ release decision พร้อม option ที่ Legal approve", "ใช้ wording เดิมก่อนเพราะ test ผ่านแล้ว", "ยกเลิก campaign ทั้งหมดโดยไม่ประเมินทางเลือก", "ให้ UX Writer rewrite เองแล้ว deploy โดยไม่ขอ Legal sign-off"),
      mcq("Alert ownership", "ใน AML case management ไม่มีใครชัดเจนว่าใครเป็น owner เมื่อ alert ต้องขอข้อมูลจาก RM แต่ RM ไม่ตอบภายใน SLA ทำให้เคสค้างและ audit ถามหา evidence", "Compliance ต้องส่งรายงานสถานะผู้บริหารทุกวัน", "AML Analyst, RM, RM Head, Compliance Manager, Operations และ Audit", "นิยาม RACI, SLA, escalation path, status reason และ evidence requirement ใน workflow ก่อนสรุป design", "ให้ AML analyst โทรตามเองตามประสบการณ์โดยไม่ต้องลงระบบ", "ให้ RM เป็น owner ทุกเคสเพราะรู้จักลูกค้า", "ให้ Audit ตัดสิน owner ตอนตรวจพบปัญหา"),
      mcq("Production readiness", "ก่อน go-live Fraud Sandbox integration กับ case management ยังไม่มี reconciliation report แต่ทีมเทคนิคยืนยันว่า API ทำงานได้และ fraud analyst เห็นผล simulation แล้ว", "Sponsor ถามว่า BA เห็นว่าพร้อมเปิดใช้หรือไม่", "Fraud Analyst, Case Management Owner, IT, Operations, Risk และ Sponsor", "สรุป readiness ตาม business process end-to-end: simulation result, promotion approval, audit, reconciliation, support runbook, open risks และ go/no-go criteria", "ตอบว่าพร้อมเพราะ API test pass", "ตอบว่าไม่พร้อมทุกกรณีจนกว่าจะไม่มี open issue เลย", "ให้ vendor เป็นคนประกาศ production readiness"),
      mcq("STR evidence", "AML analyst ตัดสินใจจะยื่น STR แต่พบว่าข้อมูลธุรกรรมกระจายและไม่มี linkage ที่เชื่อม alert เดิมกับธุรกรรมใหม่ชัดเจน ทำให้หลักฐานไม่พอยืนยันเหตุผลการรายงาน", "Compliance ต้องส่ง STR ภายใน deadline ตามกฎหมาย", "AML Analyst, Compliance Manager, Legal, IT, Data Platform และ Audit", "นิยาม evidence pack ขั้นต่ำสำหรับ STR พร้อม transaction linkage, alert history, customer risk และ decision rationale ที่ audit ได้ แล้วทำให้ข้อมูลเข้าถึงได้จาก source เดียว", "ส่ง STR ตามความรู้สึกแล้วค่อยเติมหลักฐานทีหลัง", "รวบรวมหลักฐานทุกชนิดจนเกิน deadline ของกฎหมาย", "ให้ Legal ตัดสินว่าหลักฐานพอแล้วหรือไม่"),
      mcq("Model explainability", "Fraud model ใหม่จับธุรกรรมหลอกลวงได้ดีขึ้น แต่เมื่อ regulator ถามว่าทำไม model ตัดสินใจแบบนั้น ทีมไม่สามารถอธิบาย reason ของแต่ละ alert ได้", "ผู้บริหารอยากเปิดใช้ทั้งระบบเร็วเพราะผลดี", "Fraud, Data Science, Compliance, Risk, Legal และ Audit", "กำหนดให้ model ต้องมี explainability เช่น top reason code, feature contribution, human review threshold และ documentation ก่อน promote ไป production", "เปิดใช้ทันทีเพราะผลลัพธ์ดีกว่าเดิม", "ห้ามใช้ model จนกว่าจะอธิบายได้ร้อยเปอร์เซ็นต์", "ให้ Data Science ตอบ regulator เองโดยไม่มีกรอบ"),
      mcq("Sandbox retention", "Fraud Simulation Sandbox เก็บข้อมูลจำลองไว้นานเกินไปและไม่มี retention rule ชัดเจน ทำให้ DPO กังวลเรื่อง purpose limitation และการเก็บข้อมูลเกินความจำเป็น", "ทีม Data อยากเก็บไว้เพื่อ retrain model", "DPO, Fraud, Data Science, Compliance, Security และ Platform", "นิยาม retention period, purpose, access log, disposal evidence และ exception approval สำหรับข้อมูลใน sandbox ตั้งแต่ขั้นตอนออกแบบ", "เก็บข้อมูลไว้ไม่จำกัดเพราะเป็น sandbox ภายใน", "ลบข้อมูลทุกอย่างหลังจบ simulation ทำให้ retrain ไม่ได้", "ให้ทีม Data กำหนด retention เองตามความสะดวก"),
      mcq("e-KYC fallback", "ลูกค้าบางส่วนทำ e-KYC ทางดิจิทัลไม่สำเร็จจึงต้องเข้าสาขาเป็น fallback แต่กระบวนการที่สาขาใช้ข้อมูลและ control ไม่เท่ากับช่องทางดิจิทัล ทำให้เกิดช่องว่างด้าน risk", "ลูกค้ารอนานและร้องเรียน", "Branch, Digital, KYC Ops, Compliance, Fraud และ Customer Experience", "ออกแบบ fallback flow ให้สอดคล้องกับ digital channel ทั้ง data capture, verification level, evidence และ risk scoring พร้อม audit trail", "ให้สาขาทำตามใจเพื่อรักษาลูกค้า", "บังคับลูกค้าทำดิจิทัลให้ได้ก่อนเท่านั้น", "ให้แต่ละสาขาตีความ process เอง"),
      mcq("Rule tuning governance", "Fraud rule มีการปรับ tuning บ่อยเพื่อลด false positive แต่ไม่มี change log และไม่ชัดว่าใครเป็นผู้อนุมัติ ทำให้ audit ถามหาความรับผิดชอบไม่ได้", "Fraud team ต้องการปรับได้เร็วเพื่อตอบสถานการณ์", "Fraud, Risk, Operations, Compliance, Audit และ IT", "นิยาม rule change governance พร้อม requester, impact test, approver, version, rollback และ audit log ก่อนอนุญาตให้ promote", "ให้ Fraud ปรับได้เองเพราะรู้งานดีที่สุด", "ห้ามปรับ rule จนกว่าจะผ่านคณะกรรมการทุกครั้ง", "ให้ IT เป็นคนอนุมัติทุกการเปลี่ยน rule"),
      mcq("Consent withdrawal", "ลูกค้าถอน consent หลังเริ่มใช้บริการ แต่ข้อมูลที่ได้จาก consent นั้นถูกส่งต่อไป downstream แล้ว ทำให้ไม่ชัดว่าต้องหยุดใช้หรือลบข้อมูลอะไรบ้าง", "ทีม Marketing ยังใช้ข้อมูลส่ง campaign", "DPO, Legal, Marketing, Operations, Data Platform และ IT", "นิยาม consent withdrawal flow พร้อม data inventory, downstream notification, retention rule และ evidence ของการหยุดใช้ข้อมูล", "ปล่อยให้ downstream ใช้ต่อเพราะส่งไปแล้ว", "ลบข้อมูลลูกค้าทั้งหมดทันทีโดยไม่แยกประเภท", "ให้แต่ละทีมตัดสินเองว่าจะเก็บหรือลบ"),
      mcq("Workshop decision log", "ใน workshop เก็บ requirement มีการตัดสินใจหลายข้อด้วยวาจาแต่ไม่มีการบันทึก ภายหลังฝ่ายต่าง ๆ โต้แย้งกันว่าสรุปอย่างไร ทำให้ scope สับสน", "ต้องเริ่ม build ในสัปดาห์ถัดไป", "Product, Compliance, Operations, IT, QA และ Sponsor", "ตั้ง decision log มาตรฐานที่บันทึก decision, rationale, owner, date และ open issue ทุกครั้งหลัง session แล้วส่งให้ทุกฝ่าย confirm", "เริ่ม build ตามความเข้าใจของแต่ละคน", "เลื่อน build จนกว่าจะบันทึกได้สมบูรณ์แบบ", "ให้ PM จำ decision เองแล้วแจ้งทีมทีหลัง"),
      mcq("False-positive burnout", "AML alert มี false positive สูงมาก ทำให้ analyst คุ้นเคยกับการปิดเคสอัตโนมัติโดยไม่ตรวจละเอียด จนกระทั่งมีเคสจริงหลุดไป", "Compliance กังวลเรื่อง quality ของการปิดเคส", "AML Analyst, Compliance Manager, Quality Assurance, Operations, Risk และ Audit", "ทำ quality sampling, feedback loop, alert tuning target และ red-team case เพื่อตรวจสอบว่า analyst ยังตรวจของจริงอยู่", "ปล่อยให้ analyst ปิดเคสตามปริมาณ", "บังคับตรวจทุก alert ละเอียดเท่ากันจนค้าง", "ให้ QA ตรวจสอบเองหลังเกิด incident"),
      mcq("Hotfix control", "เกิด fraud pattern ใหม่ด่วน ทีมต้องการ hotfix rule ทันทีแต่ข้ามขั้นตอน approval และ test ปกติ ทำให้เสี่ยงต่อผลกระทบที่ไม่ได้ประเมิน", "ผู้บริหารสั่งให้เร็วเพราะมี loss เกิดขึ้น", "Fraud, Risk, IT, Compliance, Operations และ Release", "กำหนด emergency change path ที่เร็วแต่ยังมี impact check, rollback, post-change review และ audit log สำหรับ hotfix", "ปล่อย hotfix ทันทีโดยไม่มี control", "รอผ่านขั้นตอนปกติทุกข้อแม้ loss จะเพิ่ม", "ให้ IT ตัดสินเรื่อง hotfix คนเดียว"),
      mcq("Cross-border data", "Fraud Sandbox วางไว้บน cloud ในต่างประเทศ แต่ regulator มีข้อกังวลเรื่องการนำข้อมูลลูกค้าข้ามพรมแดน ทำให้ไม่แน่ใจว่าใช้ได้หรือไม่", "ทีมเทคนิคบอกว่า cloud นั้นปลอดภัยพอ", "DPO, Legal, Compliance, Security, IT และ Risk", "ทำ data residency assessment เปรียบเทียบกฎหมาย, masking, contractual safeguard, approval แล้วสรุป option ให้ decision owner ก่อนใช้", "ใช้ cloud นั้นเลยเพราะคุ้มค่า", "ห้ามใช้ cloud ต่างประเทศทุกกรณี", "ให้ vendor รับผิดชอบเรื่องกฎหมายเอง"),
    ],
    written("Fraud Simulation Sandbox", "ธนาคารมี Fraud Detection System ที่ต้องปรับกฎและ model อยู่เรื่อย ๆ เพราะ pattern fraud เปลี่ยนเร็ว ทุกครั้งที่เพิ่ม rule หรือ logic ใหม่ ทีม Fraud ต้องการรู้ว่าจะจับ fraud ได้ดีขึ้นจริงหรือไม่ แต่ทีม Operations กังวลว่า alert จะเพิ่มจนตรวจไม่ทัน ทีม Risk กังวล false negative ที่ปล่อย fraud จริงหลุดไป และ Data Privacy กังวลการใช้ข้อมูลลูกค้าจริงใน sandbox ปัจจุบันการทดสอบพึ่งข้อมูลย้อนหลังและ environment ที่ไม่สะท้อน production ทั้งหมด ทำให้ไม่เห็น workload, customer impact, false positive และผลต่อ case management ชัดเจน ธนาคารจึงต้องการ Fraud Simulation Sandbox ที่จำลองธุรกรรมและสถานการณ์ fraud ก่อน promote rule/model ไป production โดยไม่กระทบลูกค้าจริง ระบบต้องช่วยให้ทีมที่เกี่ยวข้องทดลอง rule/model, เปรียบเทียบผลกับ rule เดิม, ประเมิน alert volume, เห็น privacy/control ที่จำเป็น และสนับสนุน decision ของ Fraud/Risk/Operations ว่าควรเปิดใช้จริงหรือยัง", ["Rule or model simulation setup", "Dataset selection and masking", "Result comparison dashboard", "Projected alert workload", "Production promotion approval", "Simulation audit evidence"], "historical transaction, fraud label, customer segment, rule version, model version, alert result, case status", "data masking, role-based access, approval workflow, audit trail, retention, reconciliation", "Fraud, Risk, Operations, DPO, Compliance, Data Science, IT, Case Management Owner"),
  ),
  exam(
    "digital-onboarding",
    "ชุดที่ 2: Digital Onboarding, Consent และ KYC Exception",
    "Consent version, liveness exception, onboarding drop-off, privacy vs conversion",
    "ชุดนี้จำลอง onboarding journey ที่ Product อยากลด friction แต่ control owner ต้องการหลักฐาน KYC และ privacy ให้ครบ",
    [
      mcq("Onboarding drop-off", "Mobile onboarding มี drop-off สูงที่หน้า consent และ Product เสนอให้ย้าย consent รายละเอียดไปหลังเปิดบัญชีเพื่อเพิ่ม conversion แต่ DPO และ Compliance เตือนว่า consent ต้องชัดก่อนใช้ข้อมูลบางประเภท", "ผู้บริหารต้องการ quick win ภายในเดือนนี้", "Product, DPO, Compliance, UX, Analytics, Legal และ Operations", "แยก consent ที่เป็น regulatory/purpose must-have ออกจาก UX friction แล้วออกแบบ option เช่น concise summary, layered notice, versioning และ A/B metric ที่ DPO approve", "ย้าย consent ทั้งหมดไปหลังเปิดบัญชีเพราะ conversion สำคัญกว่า", "บังคับแสดง legal text ยาวทั้งหมดโดยไม่สนใจ customer journey", "ให้ Marketing ตัดสิน wording เพราะเป็นเจ้าของ conversion"),
      mcq("Liveness exception", "ลูกค้าจำนวนหนึ่งทำ liveness ไม่ผ่านเพราะกล้อง/แสง แต่ document verification ผ่าน ทำให้ Call Center ขอ manual override เพื่อไม่เสียลูกค้า", "Fraud team กลัว deepfake และ account mule", "Customer, Call Center, Fraud, KYC Operations, Compliance และ Digital", "ออกแบบ exception queue แบบ risk-based พร้อม evidence, maker-checker review, reason code และ account limitation จนกว่าจะ verify สำเร็จ", "ให้ Call Center override ได้ทันทีเพื่อรักษาลูกค้า", "block ลูกค้าทุกคนที่ fail liveness ถาวร", "ให้ IT ปรับ threshold เองโดยไม่ผ่าน risk decision"),
      mcq("Duplicate CIF", "ระบบพบลูกค้าเปิดบัญชีซ้ำเพราะข้อมูลจาก mobile และ branch ไม่ match กัน เช่น phone เปลี่ยนแต่ national ID เดิม ทำให้เกิด duplicate CIF", "Operations ต้อง merge manual และเสี่ยงข้อมูลผิด", "Branch, Digital, Customer Data Owner, KYC Ops, Core Banking และ Compliance", "นิยาม matching rule, confidence score, manual review, merge approval และ audit trail พร้อมผลกระทบ downstream", "ใช้เบอร์มือถือเป็น key เดียวเพื่อให้ match ง่าย", "ให้ branch แก้ manual หลังเปิดบัญชีโดยไม่ต้องมี rule", "ห้ามเปิดบัญชี mobile ทุกเคสที่ข้อมูลไม่ match"),
      mcq("Address data conflict", "ลูกค้าใช้ที่อยู่ปัจจุบันสำหรับส่งบัตร แต่ KYC policy ต้องเก็บ registered address ด้วย ทีม UX อยากเหลือช่องเดียวเพื่อให้กรอกเร็ว", "Courier complaint เพิ่มเพราะส่งไม่สำเร็จ", "Customer, UX, KYC Policy, Card Operations, Courier และ Call Center", "แยก purpose ของ registered/mailing address, validation, prefill, change control และ customer explanation ให้ชัด", "เก็บ address เดียวตาม UX เพื่อให้ flow สั้น", "บังคับกรอก address ทั้งหมดซ้ำทุกครั้งโดยไม่ prefill", "ให้ courier เก็บ address เพิ่มเองหลังสมัคร"),
      mcq("Consent audit", "Auditor ขอพิสูจน์ว่าลูกค้ายอมรับ consent version ใดก่อนธนาคารใช้ biometric data แต่ระบบเก็บเพียง boolean accepted=true", "ทีม dev บอกว่าเปลี่ยน schema ตอนนี้เสี่ยง delay", "Audit, DPO, Legal, Product, IT และ Data Platform", "ทำ gap analysis และกำหนด consent evidence ขั้นต่ำ: version, timestamp, channel, language, purpose, actor และ migration/backfill option", "บอก auditor ว่ามี accepted=true ก็เพียงพอ", "หยุด onboarding ทั้งหมดจนกว่าจะ redesign schema ใหม่", "ให้ developer export log ที่มีอยู่โดยไม่ map กับ consent version"),
      mcq("KYC refresh", "ลูกค้า corporate บางรายต้อง refresh KYC ตามรอบ แต่ RM ไม่รู้ว่าเอกสารใดหมดอายุและระบบส่ง reminder กว้างเกินไปจนถูก ignore", "Compliance กังวล account ที่ KYC expired ยังทำธุรกรรมได้", "RM, Corporate Customer, Compliance, Operations, Notification team และ Core Banking", "ออกแบบ KYC status, document expiry, risk-based reminder, escalation และ account restriction rule ที่ trace ได้", "ส่ง notification ทุกวันให้ลูกค้าทุกคนเพื่อกันลืม", "ให้ RM จำเองจาก spreadsheet", "ปิดบัญชีทุกเคสทันทีเมื่อเอกสารใกล้หมดอายุ"),
      mcq("Rejected onboarding reason", "ลูกค้าสมัครไม่ผ่านแต่หน้าจอแสดงข้อความ generic ทำให้ Call Center ตอบไม่ได้ ขณะที่ Compliance ไม่ต้องการเปิดเผยรายละเอียด screening rule", "Complaint ผ่าน social เพิ่มขึ้น", "Customer, Call Center, Compliance, Fraud, UX Writer และ Legal", "กำหนด reason category ที่สื่อสารได้, internal reason สำหรับ agent, masking, script และ escalation path", "แสดง rule screening ทั้งหมดให้ลูกค้าดูเพื่อความโปร่งใส", "ซ่อนทุกเหตุผลและให้ลูกค้าสมัครใหม่", "ให้ Call Center เดาสาเหตุจากประสบการณ์"),
      mcq("Onboarding metrics", "ผู้บริหารถามว่า onboarding ใหม่สำเร็จหรือไม่ แต่แต่ละทีมใช้ metric ต่างกัน เช่น conversion, fraud hold, manual review, complaint และ account activation", "ต้องรายงาน steering committee สัปดาห์หน้า", "Product, Fraud, Operations, Analytics, Finance และ Sponsor", "นิยาม KPI tree และ baseline: completion, time-to-open, fraud/exception rate, manual review SLA, activation และ complaint พร้อม owner", "เลือก conversion เป็น metric เดียวเพราะ sponsor สนใจ", "นับจำนวน screens ที่ build เสร็จเป็น success", "รอข้อมูลหลัง go-live 6 เดือนก่อนค่อยนิยาม KPI"),
      mcq("Manual review capacity", "ถ้าเพิ่ม KYC review step ใหม่ Operations ต้องใช้คนเพิ่ม แต่ Compliance เห็นว่า control จำเป็น ส่วน Product กลัว SLA เปิดบัญชียาวขึ้น", "ไม่มี budget เพิ่มคนใน quarter นี้", "Operations, Compliance, Product, Workforce, Risk และ Sponsor", "ประเมิน volume, risk segmentation, automation option, SLA, queue design และ residual risk เพื่อทำ decision trade-off", "ตัด review step ออกเพราะไม่มีคน", "เพิ่ม review ทุกเคสแม้ SLA พัง", "ให้ Operations ทำ overtime โดยไม่เปลี่ยน process"),
      mcq("Policy effective date", "KYC policy ใหม่มีผลกลาง release และ requirement เดิมบางข้อไม่ตรง เช่น document retention และ enhanced due diligence สำหรับบาง occupation", "Release manager ขอคำตอบว่าจะ retest อะไรบ้าง", "KYC Policy, Compliance, QA, IT, Product และ Release", "ทำ impact analysis ต่อ rule, data, screen, test case, migration, customer in-flight และ sign-off owner", "ใช้ policy เก่าจนกว่า release จบเพราะ scope ปิดแล้ว", "retest ทั้งระบบโดยไม่ prioritize impact", "ให้ QA อ่าน policy แล้วตัดสินเอง"),
      mcq("Biometric retention", "ระบบเก็บ biometric template ของลูกค้า แต่ไม่ชัดว่าเก็บนานเท่าไรและเพื่อ purpose ใดบ้าง ทำให้ DPO กังวลว่าเกินความจำเป็น", "ทีม Fraud อยากเก็บไว้นานเพื่อตรวจซ้ำ", "DPO, Fraud, Digital, Compliance, Security และ IT", "นิยาม purpose, retention, re-enrollment trigger, access control และ deletion evidence สำหรับ biometric ตั้งแต่ออกแบบ", "เก็บ biometric ไว้ตลอดไปเพื่อใช้สอย", "เก็บ biometric สั้นมากจนตรวจซ้ำไม่ได้", "ให้ทีมเทคนิคกำหนด retention เอง"),
      mcq("Joint account", "ลูกค้าสองคนเปิดบัญชีร่วมกันทางดิจิทัล แต่กระบวนการเก็บ consent และ KYC ออกแบบไว้สำหรับคนเดียว ทำให้หลักฐานและความรับผิดไม่ครบทั้งสองฝ่าย", "ลูกค้าอยากเปิดได้ในครั้งเดียว", "Customer, Digital, KYC Ops, Compliance, Legal และ IT", "ออกแบบ joint onboarding ให้เก็บ consent, KYC, risk score และ signature แยกแต่ละบุคคลพร้อมเชื่อมความสัมพันธ์บัญชีที่ชัดเจน", "เก็บ consent จากคนเดียวแล้วถือว่าครบ", "บังคับเข้าสาขาทุกเคสบัญชีร่วม", "ให้แต่ละฝ่ายเปิดทีละบัญชีแล้วค่อยเชื่อม"),
      mcq("PEP screening", "ระบบคัดกรองพบว่าลูกค้าเป็น PEP ระหว่าง onboarding แต่ RM กดดันให้ดำเนินต่อเพราะเป็นลูกค้าเป้าหมาย ในขณะที่ Compliance ต้องการ enhanced due diligence", "ลูกค้ารอนานและอาจไปคู่แข่ง", "RM, Compliance, KYC Ops, Risk, Legal และ Digital", "นิยาม flow สำหรับ PEP ที่ระบุ enhanced due diligence, approval level, monitoring และ timeline ที่ชัดเจนก่อนอนุมัติ", "อนุมัติทันทีเพราะเป็นลูกค้าใหญ่", "ปฏิเสธลูกค้า PEP ทุกคน", "ให้ RM ตัดสินเรื่อง enhanced due diligence เอง"),
      mcq("Mule pattern", "ระบบพบว่ามีการเปิดบัญชีหลายบัญชีจากอุปกรณ์เดียวกันในช่วงเวลาใกล้กัน ซึ่งเป็นสัญญาณของ mule account แต่ลูกค้าแต่ละคนผ่าน KYC แล้ว", "ทีม Product ไม่อยาก block เพราะกระทบ conversion", "Fraud, Compliance, Digital, Risk, Operations และ IT", "นิยาม device-based risk signal, manual review trigger, account linkage และ escalation ที่จับ pattern โดยไม่ไป block ลูกค้าปกติทั้งหมด", "ปล่อยผ่านเพราะ KYC ผ่านแล้ว", "block อุปกรณ์ที่มีหลายบัญชีทั้งหมด", "ให้ Call Center สอบถามลูกค้าเองเมื่อสงสัย"),
      mcq("Re-onboarding retry", "ลูกค้าที่เคยถูกปฏิเสธกลับมาสมัครใหม่โดยเปลี่ยนข้อมูลบางอย่าง ระบบไม่ได้เชื่อมกับประวัติการปฏิเสธเดิม ทำให้เสี่ยงอนุมัติเคสที่ควรถูกตรวจสอบ", "ทีม Digital ต้องการลด friction ในการสมัครใหม่", "Fraud, KYC Ops, Compliance, Risk, Digital และ IT", "เชื่อมประวัติการปฏิเสธกับ application ใหม่ผ่าน matching key แล้วตั้งกฎให้เคสที่เคยถูกปฏิเสธเข้า manual review พร้อมเหตุผล", "ปฏิบัติเหมือนเคสใหม่ทุกอย่าง", "block ทุกคนที่เคยถูกปฏิเสธอย่างถาวร", "ให้ RM จำเคสเก่าเอง"),
      mcq("Consent bundling", "ทีม Marketing ต้องการให้ consent เปิดบัญชีกับ consent รับโปรโมชันอยู่ใน checkbox เดียวกันเพื่อให้ลูกค้ากดง่าย แต่ DPO ชี้ว่าต้องแยก purpose", "Marketing อยากได้ base รับโปรโมชันใหญ่ขึ้น", "Marketing, DPO, Legal, Digital, UX และ Compliance", "แยก consent ตาม purpose ที่ชัดเจน ให้ลูกค้าเลือกได้แยก พร้อม versioning และ evidence ของแต่ละ purpose", "รวมไว้ checkbox เดียวเพื่อ conversion สูง", "บังคับกรอกแยกทุก purpose แบบยาว", "ให้ Marketing กำหนด wording เองทั้งหมด"),
      mcq("Minor account", "ลูกค้าต้องการเปิดบัญชีดิจิทัลให้ผู้เยาว์ แต่ flow ปัจจุบันไม่มีการตรวจสอบอายุและ consent จากผู้ปกครอง ทำให้เสี่ยงด้านกฎหมาย", "Product อยากขยาย base ลูกค้าเยาว์", "Product, Legal, Compliance, KYC Ops, Digital และ DPO", "ออกแบบ flow เฉพาะสำหรับผู้เยาว์ที่มี age verification, guardian consent, authorization limit และ monitoring ที่เหมาะสม", "ใช้ flow ปกติเพราะง่ายกว่า", "ห้ามเปิดบัญชีผู้เยาว์ทางดิจิทัลทุกกรณี", "ให้สาขาจัดการเองทั้งหมด"),
      mcq("Document expiry", "บัตรประชาชนของลูกค้าหมดอายุระหว่างส่งใบสมัครกับขั้นตอนตรวจสอบ ทำให้ KYC ไม่สมบูรณ์ แต่ระบบไม่ตรวจจับและดำเนินการต่อ", "ลูกค้ารอและร้องเรียนเรื่องความล่าช้า", "KYC Ops, Digital, Compliance, Operations และ IT", "ตรวจสอบ document expiry ทุกขั้นตอนสำคัญ แล้วแจ้งลูกค้าขอเอกสารใหม่พร้อม record เหตุผลและ timeline ที่ชัดเจน", "ดำเนินการต่อเพราะเอกสารเคยถูกต้อง", "ยกเลิกใบสมัครทันทีที่หมดอายุ", "ให้ KYC Ops ตัดสินเองเป็นรายเคส"),
      mcq("Onboarding SLA vs quality", "RM ถูกกดดันให้เปิดบัญชีเร็วเพื่อให้ทัน target จึงข้ามการตรวจสอบรองที่ควรทำ ทำให้คุณภาพ KYC ลดลง", "ผู้บริหารต้องการตัวเลขเปิดบัญชีสูง", "RM, RM Head, Compliance, Operations, Risk และ KYC Ops", "นิยาม SLA ควบคู่กับ quality gate พร้อม sampling, exception approval และ metric ที่วัดทั้งความเร็วและคุณภาพ", "เน้นความเร็วเพราะ target สำคัญกว่า", "บังคับตรวจทุกขั้นตอนแบบเดียวกันจน SLA พัง", "ให้ RM ตัดสินเองว่าจะข้ามขั้นตอนใด"),
      mcq("Data portability", "ลูกค้าร้องขอข้อมูล onboarding ของตนตามสิทธิ PDPA data portability แต่ระบบไม่ได้ออกแบบให้ export ได้และไม่ชัดขอบเขตข้อมูลที่ต้องส่ง", "ลูกค้าขู่จะร้องเรียน DPO", "DPO, Legal, Data Platform, Operations, IT และ Compliance", "นิยามขอบเขตข้อมูลที่พอร์ตได้ รูปแบบ กระบวนการยืนยันตัวตน และ timeline พร้อมการตรวจสอบว่าไม่ละเมิดสิทธิผู้อื่น", "ปฏิเสธเพราะระบบไม่รองรับ", "ส่งข้อมูลทั้งหมดที่มีโดยไม่กรอง", "ให้ทีมเทคนิคจัดการเองตามคำขอ"),
    ],
    written("Digital Onboarding Control Workbench", "ธนาคารต้องการปรับปรุง digital onboarding สำหรับลูกค้าใหม่ให้เปิดบัญชีได้เร็วขึ้น ลด drop-off และลด manual work ของ Call Center/Operations แต่การเปิดบัญชีเกี่ยวข้องกับ e-KYC, consent, biometric/liveness, document capture, customer master, duplicate detection และ KYC risk scoring หลายฝ่ายมีมุมมองต่างกัน Product ต้องการลดจำนวน step, Compliance ต้องการหลักฐาน consent และ KYC ที่ audit ได้, Fraud ต้องการป้องกัน account mule, Operations ต้องการ review queue ที่จัดการได้จริง และ DPO ต้องการจำกัดการใช้ข้อมูลส่วนบุคคลตาม purpose ที่ถูกต้อง ระบบใหม่ควรทำให้ลูกค้าเข้าใจสิ่งที่ต้องทำ เห็นสถานะเมื่อมี exception และทำให้ทีม internal ตัดสินใจบนข้อมูลชุดเดียวกัน โดยไม่ลด control สำคัญของธนาคาร", ["Consent capture and versioning", "Liveness exception review", "Duplicate customer matching", "KYC risk-based onboarding", "Customer rejection reason", "Operations review queue"], "consent version, national ID, biometric result, customer profile, KYC risk, exception reason, application status", "PDPA consent, data minimization, fraud control, role access, audit trail, retention", "Customer, Product, KYC Ops, Fraud, Compliance, DPO, Call Center, IT"),
  ),
  exam(
    "aml-case-management",
    "ชุดที่ 3: AML Case Management และ STR Evidence",
    "Alert prioritization, evidence, escalation, regulatory timeline",
    "ชุดนี้เน้น AML monitoring ที่ต้อง balance ระหว่าง regulatory timeline, operations workload และ evidence ที่ตรวจสอบย้อนหลังได้",
    makeStandardMcqs("AML Case Management", "AML alert จำนวนมากค้างใน queue บางเคสเสี่ยงสูงถูกตรวจช้า และข้อมูลลูกค้า/ธุรกรรมกระจายอยู่หลายระบบ", "Compliance ต้องส่ง status ให้ผู้บริหารและ regulator ตามรอบ", "AML Analyst, Compliance Manager, Fraud, RM, Operations, Legal และ Audit", "risk-based prioritization, evidence trail, SLA escalation, STR decision log และ workload dashboard"),
    written("AML Alert Prioritization Hub", "ทีม AML Monitoring ของธนาคารมี alert ธุรกรรมต้องสงสัยเพิ่มขึ้นต่อเนื่องจาก rule ใหม่และพฤติกรรมลูกค้าที่เปลี่ยนไป ปัจจุบัน analyst ต้องเปิดหลายระบบเพื่อดู customer profile, transaction history, previous alert, RM note และ sanction screening result ทำให้ปิดเคสช้า บางเคสเสี่ยงสูงถูกตรวจช้ากว่าเคสปกติ ขณะที่ Compliance Manager ต้องพิสูจน์ได้ว่าทำไมบาง alert ถูก prioritize ก่อน และ auditor ต้องเห็นหลักฐานการตัดสินใจเมื่อปิดเคสหรือ escalate เป็น STR ระบบใหม่ควรช่วยจัดลำดับงาน ลด rework จากข้อมูลไม่ครบ และทำให้การตัดสินใจของ analyst โปร่งใสโดยไม่เปิดเผยข้อมูลเกินสิทธิ์", ["Risk-based alert queue", "Investigation evidence view", "RM information request", "STR escalation decision", "SLA and workload dashboard", "Case closure reason"], "alert score, customer risk, transaction history, sanction result, RM response, case status", "STR timeline, evidence retention, role access, maker-checker closure, audit trail", "AML Analyst, Compliance Manager, RM, Fraud, Legal, Audit, Operations"),
  ),
  exam(
    "corporate-payments",
    "ชุดที่ 4: Corporate Payment และ Maker-Checker",
    "Bulk upload, approval mandate, duplicate prevention, cutoff and reconciliation",
    "ชุดนี้จำลอง corporate portal ที่จ่ายเงินจำนวนมากและมี risk จากไฟล์ผิด, checker approve ผิด, cutoff, duplicate payment และ reconciliation",
    makeStandardMcqs("Corporate Bulk Payment", "ลูกค้า corporate upload payroll/payment file ผ่าน portal แต่ incident เกิดจาก format ผิด duplicate file checker มอง summary ไม่ชัด และรายการบางส่วนถูก process หลัง cutoff ผิดวัน", "ลูกค้ารายใหญ่ขู่ escalate เพราะ payroll ล่าช้า", "Corporate Customer, Maker, Checker, Corporate Admin, Operations, Risk, Core Banking และ Finance", "file validation, approval matrix, clear checker review, cutoff handling, idempotency และ reconciliation"),
    written("Corporate Bulk Payment Control Center", "ธนาคารให้ลูกค้า corporate ส่งไฟล์จ่ายเงินจำนวนมากผ่าน portal โดยมี maker เป็นผู้ upload และ checker เป็นผู้อนุมัติ รายการอาจเป็น payroll, vendor payment หรือ interbank transfer ปัญหาปัจจุบันคือไฟล์ผิด format ถูก reject ช้า checker เห็นข้อมูลสรุปไม่พอจน approve ผิดไฟล์ มี duplicate upload จากการ retry รายการหลัง cutoff ถูก process ผิด value date และเมื่อ core banking timeout ทีม support ไม่รู้ว่าสถานะจริงคืออะไร ระบบใหม่ต้องช่วย validate ก่อน submit แสดง risk ให้ checker เห็นชัด ป้องกัน duplicate payment บังคับ approval ตาม mandate และทำ reconciliation หลังส่ง core ได้", ["Payment file pre-validation", "Checker risk review", "Approval mandate configuration", "Duplicate file prevention", "Cutoff and value date handling", "Core posting reconciliation"], "batch file, beneficiary, amount, approval matrix, cutoff calendar, posting status", "maker-checker, idempotency, audit trail, approval limit, reconciliation, exception queue", "Corporate Customer, Maker, Checker, Corporate Admin, Operations, Risk, Finance, IT"),
  ),
  exam(
    "loan-origination",
    "ชุดที่ 5: Loan Origination และ Credit Approval",
    "Document checklist, waiver, scoring, collateral, SLA and benefit tracking",
    "ชุดนี้เน้นสินเชื่อ SME ที่ rework สูงเพราะเอกสาร/ข้อมูลไม่ครบ rule แตกตาม product และ approval SLA ไม่ชัด",
    makeStandardMcqs("SME Loan Origination", "RM ส่ง application สินเชื่อ SME ที่เอกสารไม่ครบ credit team return หลายรอบ collateral valuation บางรายการหมดอายุ และ campaign pricing ใหม่กระทบ downstream report", "ผู้บริหารต้องการลด turnaround time จาก 5 วันเหลือ 2 วัน", "RM, Credit Analyst, Collateral, Risk, Product, Operations, Customer และ Data Warehouse", "dynamic document checklist, waiver approval, scoring exception, SLA escalation, traceability และ KPI baseline"),
    written("SME Loan First-Time-Right Platform", "ธนาคารต้องการลด rework ในกระบวนการสินเชื่อ SME เพราะ RM มักส่งใบสมัครพร้อมเอกสารไม่ครบ เอกสารที่ต้องใช้ขึ้นกับ product, customer type, collateral, campaign และ risk condition Credit Analyst ต้อง return case หลายรอบ ทำให้ turnaround time ยาว ลูกค้าไม่รู้ว่าเคสค้างตรงไหน และผู้บริหารไม่เห็น root cause ของ SLA breach นอกจากนี้ waiver บางเอกสารทำได้แต่ไม่มี approval evidence ชัดเจน ระบบใหม่ควรช่วย RM รู้ checklist ที่ถูกต้องก่อน submit, ให้ Credit เห็นข้อมูลครบ, จัดการ waiver อย่างโปร่งใส และวัดผลว่าลด rework ได้จริง", ["Dynamic document checklist", "Document waiver workflow", "Credit scoring exception", "Collateral validity check", "Approval SLA escalation", "Customer/RM case status"], "product, customer type, document status, collateral value, score reason, waiver evidence", "approval matrix, audit trail, credit policy, exception reason, SLA escalation, data lineage", "RM, Credit Analyst, Risk, Collateral, Product, Operations, Customer, Management"),
  ),
  exam(
    "mobile-card-journey",
    "ชุดที่ 6: Mobile Banking, Transfer Status และ Card Journey",
    "Unknown status, duplicate prevention, card delivery, dispute and notification",
    "ชุดนี้เน้น customer journey ที่ดูเหมือน UX แต่จริง ๆ ต้องเชื่อม status, core posting, operations และ risk control",
    makeStandardMcqs("Mobile Transfer and Card Journey", "ลูกค้าโอนเงินหรือสมัครบัตรผ่าน mobile app แล้วสถานะไม่ชัดเมื่อ network หลุดหรือ downstream delay ทำให้ทำรายการซ้ำ โทรหา Call Center และเปิด complaint", "ฝ่าย CX ต้องการลด complaint อย่างเร็ว", "Customer, Digital, Core Banking, Card Operations, Call Center, Risk, Dispute และ IT", "status lifecycle, idempotency, customer message, support view, reconciliation และ exception handling"),
    written("Mobile Transaction Status and Card Service Hub", "Mobile banking ของธนาคารเพิ่มบริการ self-service เช่น โอนเงิน ดาวน์โหลด receipt สมัครบัตร debit ปรับวงเงิน และแจ้ง dispute แต่ complaint เพิ่มเพราะลูกค้าไม่เห็นสถานะชัดเจนเมื่อ network หลุดหรือ core/card system ตอบช้า บางคนทำรายการซ้ำ บางคนไม่รู้ว่าบัตรจะส่งเมื่อไร Call Center เห็นข้อมูลไม่เท่ากับลูกค้า และ Operations ต้องตาม exception จากหลายระบบ ระบบใหม่ควรทำให้ลูกค้าเห็นสถานะที่เชื่อถือได้ ลด duplicate transaction แสดง next action ที่ชัด และให้ทีม support/reconciliation ทำงานต่อได้", ["Transfer status recovery", "Duplicate transfer prevention", "Debit card delivery tracking", "Dispute case intake", "Receipt download", "Support and reconciliation view"], "transaction reference, idempotency key, card order, courier status, dispute reason, posting status", "customer authentication, audit trail, duplicate control, data masking, reconciliation, SLA", "Customer, Digital, Call Center, Card Ops, Core Banking, Risk, Dispute, Finance"),
  ),
  exam(
    "treasury-trade",
    "ชุดที่ 7: Treasury, FX Booking และ Trade Finance",
    "Rate validity, treasury exposure, trade document, cutoff and regulatory report",
    "ชุดนี้เน้น corporate banking ที่ feature หน้า portal เล็ก ๆ อาจกระทบ treasury position, operation และ regulatory reporting",
    makeStandardMcqs("FX and Trade Finance", "ลูกค้า corporate ต้องการ book FX rate และส่ง trade finance document ผ่าน portal แต่ rate หมดอายุเร็ว treasury ต้องคุม exposure และ trade ops ต้องตรวจเอกสารตาม policy", "RM อยากให้เปิด pilot กับลูกค้ารายใหญ่ทัน quarter นี้", "Corporate Customer, RM, Treasury, Trade Operations, Compliance, Finance, IT และ Risk", "rate validity, exposure limit, document checklist, cutoff calendar, cancellation control และ reconciliation"),
    written("Corporate FX Booking and Trade Finance Portal", "ธนาคารต้องการให้ลูกค้า corporate ทำ FX booking และส่งเอกสาร trade finance ผ่าน digital portal ลูกค้าต้องการเห็น rate และยืนยันเร็ว RM ต้องเห็น status ของลูกค้า Treasury ต้องควบคุม exposure, rate validity และ cancellation Trade Operations ต้องตรวจเอกสารให้ครบ Compliance ต้อง screening party/country และ Finance ต้อง reconcile booking กับ payment จริง ปัญหาปัจจุบันคือ quote หมดอายุแต่ลูกค้าไม่เข้าใจ booking reference match กับ payment ไม่ได้ และเอกสาร trade ถูกส่งไม่ครบ ระบบใหม่ต้องทำให้ทุกฝ่ายเห็นสถานะและ control ที่เหมาะสมก่อนรายการเข้าสู่ production process", ["FX quote and booking", "Treasury exposure check", "Trade document checklist", "Party and country screening", "Booking-payment matching", "Cancellation and expiry handling"], "quote id, currency, amount, expiry, trade document, party, booking/payment reference", "treasury limit, cutoff, sanction screening, audit trail, cancellation approval, reconciliation", "Corporate Customer, RM, Treasury, Trade Ops, Compliance, Finance, Risk, IT"),
  ),
  exam(
    "data-reporting",
    "ชุดที่ 8: Data, Reporting และ Dashboard KPI",
    "KPI definition, data quality, lineage, masked export, regulatory evidence",
    "ชุดนี้เน้น report/dashboard ที่ BA ต้องไม่หยุดแค่ chart แต่ต้องนิยาม decision, metric, data source, control และ evidence",
    makeStandardMcqs("Banking Data and Reporting", "ผู้บริหารขอ dashboard สุขภาพสินเชื่อและ complaint root cause แต่ตัวเลขจากแต่ละทีมไม่ตรงกัน บาง report missing reason code และ export มีข้อมูลลูกค้าเต็มเกินสิทธิ์", "ต้องนำเสนอใน steering committee รอบถัดไป", "Business Owner, Data Owner, Compliance, Risk, Operations, Analytics, DPO และ Audit", "KPI definition, data lineage, quality rule, masking, refresh timestamp และ report run history"),
    written("Regulatory and Management Reporting Workbench", "หลายหน่วยงานในธนาคารต้องการ dashboard และ report เพื่อดู loan health, AML rejected transactions, complaint root cause และ campaign performance แต่ข้อมูลมาจากหลายระบบ ความหมาย KPI ไม่ตรงกัน refresh frequency ไม่ชัด และบาง field เป็นข้อมูลส่วนบุคคลที่ไม่ควรถูก export เต็มรูปแบบ Compliance ต้องการ report ที่ส่ง regulator ได้ตรงเวลา Management ต้องการ dashboard สำหรับตัดสินใจ Operations ต้องการ exception report ที่ action ได้ และ Audit ต้องการหลักฐานว่า report ถูก generate ด้วย parameter ใด ระบบใหม่ต้องจัดการ definition, lineage, quality check และ access control ให้เหมาะกับแต่ละวัตถุประสงค์", ["Certified KPI catalog", "Data quality validation", "Regulatory report generation", "Masked export", "Dashboard freshness and lineage", "Exception action report"], "KPI definition, source system, transform rule, report parameter, PII field, exception reason", "data owner sign-off, masking, access control, report run log, completeness check, retention", "Business Owner, Data Owner, Compliance, DPO, Operations, Analytics, Audit, IT"),
  ),
  exam(
    "open-api-partner",
    "ชุดที่ 9: Open API และ Partner Banking",
    "Partner onboarding, API security, idempotency, error code, reconciliation",
    "ชุดนี้เน้น API ที่ต้องคิด end-to-end ตั้งแต่ partner onboarding ถึง dispute/reconciliation ไม่ใช่แค่ endpoint spec",
    makeStandardMcqs("Open API Partner Payment", "ธนาคารเปิด API ให้ partner ส่ง payment instruction และ status inquiry แต่ partner retry แล้วเกิด duplicate payment error code แปลผิดและยอด reconciliation ไม่ตรง", "Business ต้องการ onboard partner รายแรกให้ทัน launch", "Partner, API Product, Security, Operations, Finance, Compliance, Support และ IT", "sandbox certification, auth scope, idempotency, error mapping, status lifecycle, rate limit และ reconciliation"),
    written("Partner Payment API Control Plane", "ธนาคารจะเปิด API ให้ partner ส่ง payment instruction และสอบถามสถานะรายการ ลูกค้าจะเห็นบริการผ่าน partner app แต่ธนาคารยังรับผิดชอบ transaction, screening, posting, exception และ reconciliation Partner ต้องการ onboarding เร็ว Security ต้องการ authentication/authorization ชัด Operations ต้องการ exception queue Finance ต้องการยอดตรงกัน และ Compliance ต้องการ audit evidence เมื่อเกิด dispute ปัญหาที่คาดคือ partner retry แล้วส่งซ้ำ error code ไม่ชัดทำให้ลูกค้าสับสน rate limit ไม่พอ และการเปลี่ยน API version อาจทำให้ partner integration พัง ระบบใหม่ต้องออกแบบ API และ process รอบ ๆ ให้ production-safe", ["Partner sandbox certification", "API authentication and scope", "Payment idempotency", "Error code and status inquiry", "Daily reconciliation", "Dispute evidence pack"], "client id, token scope, request id, payment ref, status, error code, partner ref", "authentication, rate limit, AML screening, idempotency, audit log, reconciliation, versioning", "Partner Developer, API Product, Security, Operations, Finance, Compliance, Support, IT"),
  ),
  exam(
    "wealth-suitability",
    "ชุดที่ 10: Wealth Suitability และ Advisory Control",
    "Suitability profile, consent, product risk mismatch, exception sale, audit pack",
    "ชุดนี้เน้น wealth/advisory ที่ต้องลด rework ของ advisor แต่คุม mis-selling และ regulatory evidence",
    makeStandardMcqs("Wealth Suitability", "Advisor ต้องกรอก suitability หลายระบบ ลูกค้าไม่เข้าใจ risk profile และบางเคสต้องการซื้อ product ที่ risk สูงกว่าความเหมาะสม", "Wealth business ต้องการลดเวลาขายแต่ Compliance กลัว mis-selling", "Investment Advisor, Customer, Compliance, Product, Branch Manager, Operations, Audit และ Legal", "single suitability profile, product risk match, consent, exception approval, audit evidence และ customer explanation"),
    written("Suitability and Advisory Evidence Platform", "ธุรกิจ Wealth ต้องการปรับ suitability assessment ก่อนเสนอผลิตภัณฑ์ลงทุนให้ advisor ทำงานเร็วขึ้นและลดการกรอกซ้ำ แต่ต้องมีหลักฐานสำหรับ regulator ว่าลูกค้าได้รับคำอธิบายเหมาะสม consent ถูกต้อง และ product ที่เสนอไม่ขัดกับ risk appetite ปัจจุบัน advisor ต้องใช้หลายระบบ suitability validity หมดอายุโดยไม่เตือน ลูกค้าไม่เข้าใจผลประเมิน และบางเคสต้องขอ exception เมื่อยืนยันซื้อ product ที่ไม่เหมาะสม ระบบใหม่ควรช่วยรวม profile ตรวจ product risk mismatch จัดการ consent/acknowledgement และสร้าง audit pack ย้อนหลังได้", ["Single suitability profile", "Product risk matching", "Consent and acknowledgement", "Suitability expiry control", "Exception sale approval", "Advisory audit pack"], "risk profile, answer version, product risk, consent, recommendation, exception reason", "mis-selling control, consent version, expiry validation, approval workflow, audit trail, evidence retention", "Advisor, Customer, Compliance, Product, Branch Manager, Legal, Audit, Operations"),
  ),
];

function exam(
  id: string,
  title: string,
  focus: string,
  scenario: string,
  mcqSeeds: McqSeed[],
  written: WrittenSeed,
): ExamSeed {
  return { id, title, focus, scenario, mcqSeeds, written };
}

function mcq(
  area: string,
  situation: string,
  pressure: string,
  stakeholders: string,
  bestAction: string,
  wrongBypass: string,
  wrongFreeze: string,
  wrongEscalate: string,
): McqSeed {
  return {
    area,
    situation,
    pressure,
    stakeholders,
    bestAction,
    wrongBypass,
    wrongFreeze,
    wrongEscalate,
  };
}

function written(
  systemName: string,
  scenario: string,
  features: string[],
  dataFocus: string,
  controlFocus: string,
  stakeholders: string,
): WrittenSeed {
  return {
    title: systemName,
    systemName,
    scenario,
    features,
    dataFocus,
    controlFocus,
    stakeholders,
  };
}

function makeStandardMcqs(
  area: string,
  baseSituation: string,
  pressure: string,
  stakeholders: string,
  controlTheme: string,
): McqSeed[] {
  const angles = [
    ["stakeholder conflict", "ผู้บริหารฝ่ายหนึ่งเสนอให้ยึดมุมมองของทีมตนเป็นหลัก แต่ฝ่าย control owner บอกว่ายังมี policy และ evidence ที่ต้องยืนยัน", "ทำ stakeholder map, facilitation plan, decision criteria และ open issue log เพื่อให้ทุกฝ่ายตัดสินบนข้อมูลชุดเดียวกัน", "ฟังฝ่ายที่มีตำแหน่งสูงสุดเป็นหลัก", "หยุดทุก workshop จนกว่าทุกคนจะเห็นตรงกันเอง", "ให้ sponsor ตัดสินโดยไม่สรุป trade-off"],
    ["requirement ambiguity", "Business ขอให้ระบบ 'ดูครบและใช้ง่าย' แต่ยังไม่ชัดว่าใครใช้เพื่อ decision อะไรและข้อมูลใดเป็น source of truth", "ถาม persona, decision, KPI, data source, exception, frequency และ success metric ก่อนสรุป requirement", "ให้ UX ออกแบบหน้าจอก่อนเพื่อให้เห็นภาพ", "ปฏิเสธ request เพราะคลุมเครือ", "ให้ developer เลือก field เองจาก database"],
    ["late policy change", "Policy owner แจ้ง rule ใหม่หลัง UAT ทำให้ requirement, test case และ training material บางส่วนอาจไม่ตรง", "ทำ impact analysis ต่อ business rule, data, screen, test, cutover, in-flight case และ sign-off owner", "ใช้ requirement เดิมเพราะ UAT จบแล้ว", "retest ทุกอย่างโดยไม่แยก impact", "ให้ QA ตีความ policy เอง"],
    ["operations workload", "feature ใหม่ช่วย control ได้ดีขึ้นแต่คาดว่าจะเพิ่ม manual queue และ SLA breach หากไม่มี prioritization", "ประเมิน volume, severity, SLA, staffing, automation, queue rule และ residual risk ก่อนเสนอ option", "เปิด feature เต็มรูปแบบก่อนแล้วค่อยดูหน้างาน", "ตัด control ออกเพื่อไม่เพิ่มงาน", "ให้ Operations รับ overtime เป็น default"],
    ["data privacy", "ทีมงานต้องการเห็นข้อมูลลูกค้าละเอียดเพื่อแก้ปัญหาเร็ว แต่ DPO เตือนว่าไม่ใช่ทุก role มี purpose ที่ชัดเจน", "นิยาม role-based access, masking, purpose, retention, audit log และ exception approval", "เปิดข้อมูลเต็มให้ทุกทีมเพราะเป็นพนักงานธนาคาร", "ปิดข้อมูลทั้งหมดจนทำงานไม่ได้", "ให้ user ใช้วิจารณญาณเองว่าจะเปิดดูอะไร"],
    ["audit evidence", "Auditor ถามหาหลักฐานย้อนหลังว่าใครเปลี่ยน decision/rule และอนุมัติด้วยเหตุผลใด แต่ requirement เดิมระบุแค่ 'มี log'", "ระบุ audit trail ที่ทดสอบได้: actor, timestamp, before/after, reason, approver, evidence และ retention", "ตอบว่า login log เพียงพอแล้ว", "เพิ่ม screenshot manual เป็นหลักฐานทุกครั้ง", "ให้ auditor ขอข้อมูลจาก database โดยตรง"],
    ["downstream impact", "การเปลี่ยน field/rule หน้าระบบหลักกระทบ report, data warehouse, operations procedure และ customer communication", "ทำ end-to-end impact map และ trace requirement ไป downstream, test case, report, training และ owner", "แก้เฉพาะหน้าจอที่ user เห็นก่อน", "เลื่อน change ทั้งหมดโดยไม่ประเมิน option", "ให้ downstream team ค่อยรับมือหลัง go-live"],
    ["exception handling", "มีเคส exception ที่ธุรกิจอยากให้ผ่านเร็ว แต่ control owner ต้องการ reason และ approval ที่ตรวจสอบได้", "ออกแบบ exception flow พร้อม eligibility, reason code, maker-checker, SLA, audit และ reporting", "ให้ senior user override ได้เสมอ", "ห้าม exception ทุกกรณี", "ให้ email approval แทนระบบถาวร"],
    ["UAT defect", "UAT พบ defect ที่บางฝ่ายมองว่า minor แต่ผู้ใช้ปลายทางบอกว่ากระทบการทำงานและทำให้เกิด workaround", "ประเมิน severity จาก business impact, frequency, control risk, workaround และ release option พร้อม decision log", "ดูเฉพาะจำนวน defect ตาม test script", "ปิด defect เพราะไม่อยู่ใน scope เดิม", "ให้ developer ตัดสินว่าแก้ทันหรือไม่"],
    ["benefit realization", "หลัง pilot ผู้บริหารถามว่าสร้าง value จริงหรือไม่ แต่ทีมมีเพียงจำนวน requirement ที่ปิดและ feedback บางส่วน", "เทียบ baseline กับ actual KPI เช่น SLA, rework, error, adoption, complaint, risk event และ workload พร้อม root cause", "นับจำนวน requirement ที่ส่งมอบเป็น value", "ใช้ความเห็น sponsor อย่างเดียว", "รอ production ครบปีแล้วค่อยวัดผล"],
    ["scope creep", "Business ขอเพิ่ม requirement ระหว่าง build โดยอ้างว่าเล็กน้อย แต่จริง ๆ กระทบ data model, test scope และ downstream report", "ทำ change request พร้อม impact analysis ด้าน scope, cost, timeline, test, downstream และ owner sign-off ก่อนคอมมิต", "เพิ่มเข้าไปเลยเพราะทำตอนนี้ก็ได้", "ปฏิเสธทุก change ตลอดโครงการ", "ให้ developer ตัดสินเองว่าทำได้ไหม"],
    ["vendor dependency", "ฟีเจอร์สำคัญพึ่ง deliverable จาก vendor ที่เลื่อนกำหนด แต่ไม่มีกลไกติดตามผลกระทบต่อ go-live และความเสี่ยง", "นิยาม vendor milestone, SLA, acceptance criteria, contingency, fallback plan และ risk owner ตั้งแต่ต้น", "รอ vendor ส่งงานแล้วค่อยแก้ทีหลัง", "ยกเลิก vendor ทันทีแล้วทำเองทุกอย่าง", "ให้ procurement ตัดสินเรื่องเทคนิค"],
    ["cutover risk", "แผน cutover ยังไม่มี rollback และ data migration checklist ชัด ทำให้เสี่ยง downtime และข้อมูลค้างระหว่างเปลี่ยนระบบ", "ออกแบบ cutover plan พร้อม rollback, dry-run, reconciliation, freeze window, comms และ go/no-go gate", "เปิด production ตามแผนโดยไม่มี rollback", "เลื่อน cutover ไปเรื่อย ๆ จนกว่าจะไม่มี risk เลย", "ให้ IT ตัดสิน cutover คนเดียว"],
    ["non-functional gap", "ผู้สนับสนุนสนใจแค่หน้าจอ แต่ยังไม่มี requirement ด้าน performance, availability และ volume ตอน peak", "ระบุ non-functional requirement ที่วัดได้ เช่น response time, concurrency, uptime, RTO/RPO และ load test criteria", "ปล่อยไปก่อนแล้วค่อย tune หลัง go-live", "บังคับ spec ระดับ enterprise โดยไม่ดูความจำเป็นจริง", "ให้ infra team ตั้งค่าเองตาม default"],
    ["regulatory deadline", "regulator กำหนด deadline แน่นอน แต่ scope ยังกว้างและบาง requirement ยังไม่ชัด ทำให้เสี่ยงไม่ทัน", "แยก must-have ตามกฎหมายออกจาก nice-to-have ทำ MVP ให้ตรง deadline พร้อมเอกสารเหตุผลและ residual gap", "ทำทุกอย่างพร้อมกันเสี่ยงไม่ทันทุกข้อ", "ขอเลื่อน deadline จาก regulator โดยไม่มีแผน", "ส่งมอบสิ่งที่ทำได้แล้วให้ auditor ตีความเอง"],
    ["legacy data quality", "ข้อมูลเก่าจากระบบ legacy มี missing และ format ผิด ทำให้ migration และ report คาดเคลื่อน", "ทำ data profiling, cleansing rule, validation, exception handling และ reconciliation ก่อนและหลัง migration", "ย้ายข้อมูลทั้งหมดเข้าไปก่อนแล้วค่อยแก้", "รอล้างข้อมูลให้สะอาด 100% ก่อนค่อย migrate", "ให้ทีม data ตัดสินเองว่าอะไรสำคัญ"],
    ["access segregation", "role และสิทธิ์ออกแบบกว้างเกินไปทำให้เสี่ยงต่อ segregation of duties และ maker-checker ไม่ชัด", "นิยาม role matrix, segregation of duties, maker-checker, approval limit และ periodic access review", "ให้สิทธิ์ admin ทุกคนเพื่อใช้งานง่าย", "ล็อกสิทธิ์จนทำงานไม่ได้", "ให้แต่ละทีมขอสิทธิ์กันเองตามต้องการ"],
    ["change readiness", "ระบบพร้อมส่งแต่ผู้ใช้ยังไม่ได้อบรม คู่มือและ script ไม่พร้อม ทำให้ go-live แล้วใช้งานไม่เป็น", "วางแผน change management พร้อม training, super-user, runbook, FAQ, comms และ hypercare window", "เปิดใช้ก่อนแล้วให้ทีมโทรถามกันเอง", "รอให้ทุกคนอบรมครบ 100% ก่อนค่อย go-live", "ส่งคู่มือ pdf ให้ผู้ใช้อ่านเอง"],
    ["production handoff", "หลัง go-live ไม่มี runbook, alert หรือ owner ชัด ทำให้ incident แก้ช้าและส่งต่อกันไม่ได้", "จัดทำ runbook, monitoring, incident SLA, on-call rota, known-issue log และ handoff sign-off จาก ops", "ส่งมอบแล้วปล่อยให้ ops จัดการเอง", "รักษาทีมโครงการไว้จนกว่าจะไม่มี incident เลย", "ให้ helpdesk แก้ปัญหาเองตามบริบท"],
    ["metric gaming", "KPI ที่ตั้งไว้ทำให้ผู้ใช้เบี่ยงพฤติกรรมเพื่อทำตัวเลขดี แต่ไม่ตอบโจทย์ธุรกิจจริง", "รีวิวว่า KPI นำไปสู่พฤติกรรมที่ต้องการหรือไม่ เพิ่ม guardrail metric และตรวจผลลัพธ์ร่วมด้วย", "ใช้ KPI เดียวเป็นตัวตัดสินเพราะง่าย", "ตั้ง KPI มากจนวัดไม่ได้", "ให้แต่ละทีมรายงานตัวเลขของตนเองโดยไม่ align"],
  ];

  return angles.map(([suffix, detail, best, bypass, freeze, escalate]) =>
    mcq(
      `${area} - ${suffix}`,
      `${baseSituation} ในประเด็น ${detail}`,
      pressure,
      stakeholders,
      `${best} โดยเชื่อมกับ ${controlTheme}`,
      bypass,
      freeze,
      escalate,
    ),
  );
}

function makeSet(seed: ExamSeed): BaAssessmentPracticeSet {
  return {
    id: seed.id,
    title: seed.title,
    focus: seed.focus,
    scenario: seed.scenario,
    mcq: seed.mcqSeeds.map((questionSeed, index) =>
      makeMcqQuestion(
        `${seed.id}-${String(index + 1).padStart(2, "0")}`,
        questionSeed,
        index,
        questionSeed.area,
      ),
    ),
    writtenCase: makeWrittenCase(seed.written),
  };
}

function makeMcqQuestion(
  id: string,
  seed: McqSeed,
  optionShift: number,
  skill: string,
): BaAssessmentMcq {
  const prompt = `สถานการณ์: ${seed.situation} ${seed.pressure} ผู้เกี่ยวข้องคือ ${seed.stakeholders}. ในฐานะ BA คุณต้องทำให้ requirement เดินหน้าต่อได้โดยไม่ข้าม control และไม่สร้าง rework หลัง go-live คำถามคือ BA ควรดำเนินการอย่างไรในสถานการณ์นี้?`;
  const correct = seed.bestAction;
  const options = rotateOptions(
    [correct, seed.wrongBypass, seed.wrongFreeze, seed.wrongEscalate],
    optionShift,
  );
  return {
    id,
    prompt,
    options,
    correctIndex: options.indexOf(correct),
    skill,
    explanation:
      "คำตอบที่แข็งแรงต้องเริ่มจากเข้าใจ concern จริง จัด stakeholder ให้ input ครบ แยก option/risk/impact/control และทำ decision/sign-off ให้ trace ได้ ไม่ใช่ bypass ฝ่ายใดฝ่ายหนึ่งหรือโยนให้ผู้บริหารตัดสินโดยไม่มีหลักฐาน",
  };
}

function rotateOptions(options: string[], shift: number): string[] {
  const offset = shift % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

function makeWrittenCase(seed: WrittenSeed): BaAssessmentWrittenCase {
  const featurePrompts = seed.features.map((feature, index) => ({
    id: `${slug(seed.systemName)}-feature-${index + 1}`,
    type: "feature" as const,
    title: `Feature User Story ${index + 1}: ${feature}`,
    prompt: `จงเขียน User Story สำหรับ feature "${feature}" โดยระบุ persona, capability/action, business value และ acceptance criteria ที่ทดสอบได้อย่างน้อย 2 ข้อ`,
    expectedPoints: [
      "มีรูปแบบ As a / I want / so that หรือเทียบเท่าที่ระบุ persona-action-value ชัด",
      `เชื่อมกับข้อมูลหลักของระบบ: ${seed.dataFocus}`,
      `คำนึงถึง control หรือ compliance: ${seed.controlFocus}`,
      "มี acceptance criteria ที่ตรวจสอบได้ ไม่ใช่คำกว้าง เช่น ใช้ง่ายหรือปลอดภัย",
    ],
  }));

  return {
    title: seed.title,
    scenario: `Scenario: ${seed.scenario} ข้อมูลสำคัญที่ต้องพิจารณา ได้แก่ ${seed.dataFocus}. Control และข้อกำกับที่ต้องคิดตั้งแต่ต้น ได้แก่ ${seed.controlFocus}. Stakeholder ที่ควร align ให้ครบคือ ${seed.stakeholders}. ผู้เข้าสอบควรตอบโดยแยก feature ให้ชัด หากมีหลาย user story ให้เขียนเป็น bullet และอย่าลืมอธิบายภาพรวมระบบหลังออกแบบ feature แล้ว`,
    instructions: [
      "ส่วนที่ 1: จงออกแบบ User Story ทีละ Feature",
      "ส่วนที่ 2: จงมองภาพรวมระบบที่ได้ออกแบบ Feature ไปแล้ว",
      "ส่วนที่ 3: จงออกแบบการใช้งานจริง End-to-End การทำงานของ Feature ทั้งหมด",
      "ส่วนที่ 4: Optional เป็นข้อโบนัส",
    ],
    prompts: [
      ...featurePrompts,
      {
        id: `${slug(seed.systemName)}-overview-1`,
        type: "overview",
        title: "System Overview 1: ภาพรวมระบบและ capability หลัก",
        prompt:
          "จาก User Story ที่ออกแบบ จงอธิบายภาพรวมระบบว่ามี module/capability หลักใดบ้าง และแต่ละ capability ช่วยลดปัญหาใน scenario อย่างไร",
        expectedPoints: [
          "จัดกลุ่ม feature เป็น capability ที่อ่านแล้วเห็น architecture/workflow ระดับ business",
          "ระบุ upstream/downstream หรือระบบที่ต้องเชื่อม",
          "เชื่อม capability กับ business value และ pain point",
          "แยกสิ่งที่เป็น MVP ออกจาก enhancement ได้",
        ],
      },
      {
        id: `${slug(seed.systemName)}-overview-2`,
        type: "overview",
        title: "System Overview 2: Data, control และ stakeholder decision",
        prompt:
          "จงระบุข้อมูลหลักที่ระบบต้องใช้/สร้าง control ที่ต้องมี และ stakeholder ที่ต้อง sign-off หรือใช้ข้อมูลในการตัดสินใจ",
        expectedPoints: [
          `ระบุ data object สำคัญจากบริบท: ${seed.dataFocus}`,
          `ระบุ control สำคัญจากบริบท: ${seed.controlFocus}`,
          "ระบุ role/access, audit trail, approval หรือ exception owner",
          "อธิบาย decision ที่แต่ละ stakeholder ต้องทำจากข้อมูลชุดเดียวกัน",
        ],
      },
      {
        id: `${slug(seed.systemName)}-end-to-end`,
        type: "endToEnd",
        title: "End-to-End Flow: การใช้งานจริง",
        prompt:
          "จงออกแบบ flow การใช้งานจริงตั้งแต่เริ่ม request/input, validation, review/approval, processing, notification, reporting/reconciliation และ exception handling",
        expectedPoints: [
          "มีลำดับ flow ชัดเจนตั้งแต่ต้นน้ำถึงปลายน้ำ",
          "มี validation และ exception path ไม่ใช่เฉพาะ happy path",
          "มี handoff ระหว่าง business, operations, risk/control และ system",
          "มีจุดตรวจสอบผลลัพธ์ เช่น report, reconciliation, SLA หรือ audit evidence",
        ],
      },
      {
        id: `${slug(seed.systemName)}-bonus`,
        type: "bonus",
        title: "Optional Bonus: Trade-off และ rollout decision",
        prompt:
          "หากต้องนำระบบนี้ไปใช้จริงในธนาคาร คุณจะเสนอ rollout/checkpoint อย่างไรเพื่อ balance business value, risk, operations workload และ compliance",
        expectedPoints: [
          "เสนอ phased rollout หรือ pilot พร้อม go/no-go criteria",
          "ระบุ metric ก่อน/หลัง เช่น SLA, false positive, rework, complaint, adoption หรือ risk event",
          "ระบุ residual risk และ owner ที่ต้อง sign-off",
          "มีแผน feedback loop หลัง go-live เพื่อปรับ rule/process ต่อ",
        ],
      },
    ],
  };
}

function slug(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const BA_ASSESSMENT_PRACTICE_SETS: BaAssessmentPracticeSet[] =
  EXAM_SEEDS.map(makeSet);

export const BA_ASSESSMENT_TOTAL_MCQ =
  BA_ASSESSMENT_PRACTICE_SETS.length * BA_ASSESSMENT_EXPECTED_MCQ_PER_SET;

export const BA_ASSESSMENT_TOTAL_WRITTEN =
  BA_ASSESSMENT_PRACTICE_SETS.length *
  BA_ASSESSMENT_EXPECTED_WRITTEN_PROMPTS_PER_SET;

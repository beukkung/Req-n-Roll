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
  explanation?: string;
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
      mcq("e-KYC go-live", "ระบบ e-KYC ใหม่ผ่าน SIT/UAT แล้ว Business และ IT ต้องการเปิดใช้ตามแผน แต่ Legal ยังไม่ sign-off เพราะกังวลว่าการจัดเก็บภาพบัตรประชาชน face image และ consent record อาจไม่ตรง policy regulator", "ผู้บริหารกดดันให้เปิด production เพราะ campaign เปิดบัญชีดิจิทัลประกาศไปแล้ว", "Legal, Compliance, Digital Product, IT, Operations, DPO และ Project Sponsor", "จัด session กับ Legal/Compliance/DPO/Business/IT เพื่อแยก concern เป็น requirement gap, control option, residual risk, owner และเงื่อนไข sign-off ก่อนตัดสินใจ go-live", "ให้ Business และ IT เปิดระบบก่อน เพราะ test ผ่านแล้วและค่อยให้ Legal ตรวจย้อนหลัง", "ยกเลิก go-live ทั้งหมดและตั้งโครงการใหม่โดยไม่วิเคราะห์ option ที่ลดความเสี่ยง", "ให้ Project Sponsor override Legal ทันทีเพื่อรักษา timeline", "go-live ที่ข้าม Legal สร้าง compliance risk; ต้องแยก gap/option/risk/owner ก่อนตัดสินใจ ไม่ใช่เปิดก่อนหรือยกเลิกทั้งหมด"),
      mcq("AML workshop", "ในการ workshop เก็บ requirement ระบบ AML case management ผู้บริหาร Operations สองคนพูดเกือบตลอดเวลา ขณะที่ Compliance, Fraud และ branch operations แทบไม่ได้ให้ input ทั้งที่เป็นผู้ใช้หรือ control owner สำคัญ", "เวลาประชุมเหลือน้อยและทุกฝ่ายอยากปิด requirement ให้ทัน sprint planning", "Operations, AML Compliance, Fraud, Branch Ops, IT และ Product Owner", "ใช้ facilitation เช่น round-robin, parking lot, silent note และ decision log เพื่อให้ทุก stakeholder ให้ input ครบ แล้วสรุป conflict/open issue ให้ owner ตัดสิน", "ฟังผู้บริหาร Operations เป็นหลักเพราะมีอำนาจสูงและเข้าใจงานจริง", "ยุติ workshop แล้วให้ทุกฝ่ายส่ง requirement ทาง email โดยไม่ align กัน", "ให้ Compliance เขียน requirement เองทั้งหมดเพราะเป็นเจ้าของ policy", "facilitation ที่เปิดโอกาสทุก stakeholder ให้ input ครบดีกว่าฟังเสียงเดียว; decision log ทำให้ alignment ตรวจได้"),
      mcq("Fraud rule promotion", "Fraud team ต้องการ promote rule ใหม่ที่จับธุรกรรมหลอกลวงได้ดีขึ้น แต่ Operations คาดว่า alert จะเพิ่มจาก 500 เป็น 4,000 รายการต่อวัน และ Customer Experience กังวลลูกค้าปกติถูก hold จำนวนมาก", "Risk Head อยากให้เปิดเร็วเพราะมีข่าว fraud case ใหม่ในตลาด", "Fraud, Risk, Operations, Customer Experience, Contact Center และ Data Analytics", "ทำ impact analysis เทียบ fraud loss reduction, false positive, workload, SLA, customer message และ tuning plan ก่อนเสนอ go/no-go พร้อม control", "เปิด rule ทันทีเพราะ fraud risk สำคัญกว่าทุกมิติ", "ปิด rule ทั้งหมดจนกว่าจะไม่มี false positive เลย", "ให้ทีม IT ตัดสินจาก effort ที่ใช้แก้ rule", "promotion rule ต้องชั่ง trade-off หลายมิติก่อน; เปิดหรือปิดสุดโต่งโดยดูมิติเดียวเสี่ยงกระทบ workload และลูกค้า"),
      mcq("Sandbox data privacy", "ทีม Data ขอใช้ production transaction และ customer profile จริงใน Fraud Simulation Sandbox เพื่อให้ผลทดสอบใกล้เคียงความจริง แต่ DPO กังวลเรื่องข้อมูลส่วนบุคคลและ purpose limitation", "ทีม Fraud บอกว่าถ้า mask มากเกินไป model จะทดสอบไม่แม่น", "Fraud, Data Science, DPO, Compliance, Security และ Platform team", "นิยาม data minimization, masking/tokenization, role access, retention, audit trail และ exception approval ที่ยังรักษาความสมจริงของ simulation ได้", "ให้ Data ใช้ข้อมูลจริงเต็มรูปแบบเพราะเป็นงานภายในธนาคาร", "ห้ามใช้ข้อมูลทุกชนิดใน sandbox ทำให้ทดสอบ model ไม่ได้", "ขอให้ vendor ตัดสินเรื่อง privacy แทนธนาคาร", "data minimization + masking ที่ยังรักษาความสมจริงสมดุลกว่า; ใช้จริงเต็มหรือห้ามทุกชนิดทำลาย privacy หรือการทดสอบ"),
      mcq("Requirement sign-off", "หลัง workshop e-KYC มี requirement หลายข้อที่ Business เข้าใจว่าเป็น nice-to-have แต่ Compliance ถือว่าเป็น regulatory must-have เช่น consent version, audit trail และ retention evidence", "ทีม delivery ต้องการ baseline scope เพื่อเริ่ม build", "Business, Compliance, Legal, IT Delivery, QA และ Release Manager", "ทำ requirement classification แยก regulatory must-have, risk mitigation, business value และ phase option พร้อม traceability ไป policy/control owner", "ตัด requirement compliance ออกก่อนเพื่อให้ MVP เบา", "ใส่ทุก requirement เข้า scope เดียวกันโดยไม่จัด priority", "ให้ QA ตัดสินตอน test ว่าข้อไหนต้องทำ", "requirement classification แยก regulatory/business/phase ทำให้ตัดสินใจได้; ตัด compliance ออกหรือใส่หมดไม่จัด priority เสี่ยง"),
      mcq("UAT defect dispute", "UAT พบว่า e-KYC rejection reason ไม่แสดงให้ Call Center เห็น แต่ Digital บอกว่าไม่อยู่ใน scope ส่วน Operations บอกว่าถ้าไม่มีจะตอบลูกค้าไม่ได้และเกิด complaint", "Release date เหลือหนึ่งสัปดาห์", "Digital Product, Operations, Call Center, Legal, IT และ QA", "ตรวจ BRD/FRD/traceability เพื่อดู business need เดิม ประเมิน customer impact และเสนอ option เช่น minimum reason category, masking และ post-release enhancement", "บอก Operations ว่า scope ปิดแล้วและให้ใช้ manual workaround ไปก่อนเสมอ", "ให้ developer เพิ่ม field ทันทีโดยไม่ตรวจ privacy หรือ test impact", "เลื่อน release ทั้งหมดโดยไม่แยก severity/option", "defect ที่กระทบ customer ต้องตรวจ traceability และเสนอ option; บอกว่า scope ปิดหรือเพิ่ม field ทันทีโดยไม่ประเมินไม่สมดุล"),
      mcq("Multi-voting misuse", "ใน session จัดลำดับ requirement ทีมใช้ multi-voting แล้ว requirement ด้าน audit trail ได้คะแนนต่ำ เพราะ user ส่วนใหญ่ไม่ได้ใช้โดยตรง แต่ Compliance เตือนว่าเป็น regulatory evidence", "PO อยากใช้ผลโหวตเป็น final priority", "End users, Compliance, Product Owner, Risk, QA และ Sponsor", "ชี้ว่าการโหวตใช้กับ preference ได้ แต่ regulatory/control requirement ต้องผ่าน decision criteria แยก และบันทึก rationale/owner", "ตัด audit trail ออกจาก release เพราะคะแนนโหวตต่ำ", "ให้ Compliance ชนะทุกเรื่องโดยไม่อธิบาย impact ต่อ business", "โหวตซ้ำจนกว่าผลจะตรงกับความเห็น sponsor", "voting ใช้กับ preference ไม่ใช่ regulatory; ตัดออกเพราะคะแนนต่ำหรือให้ Compliance ชนะทุกเรื่องไม่สมดุล"),
      mcq("Consent wording change", "Legal เปลี่ยน wording consent หลัง UAT รอบสุดท้าย เพราะ policy version ใหม่มีผลก่อน go-live ขณะที่ Digital กลัว conversion drop จากข้อความยาวขึ้น", "Marketing campaign เริ่มพรุ่งนี้", "Legal, DPO, Digital, UX Writing, Analytics, Release และ Call Center", "ทำ change impact ต่อ wording, versioning, customer journey, analytics, training script และ release decision พร้อม option ที่ Legal approve", "ใช้ wording เดิมก่อนเพราะ test ผ่านแล้ว", "ยกเลิก campaign ทั้งหมดโดยไม่ประเมินทางเลือก", "ให้ UX Writer rewrite เองแล้ว deploy โดยไม่ขอ Legal sign-off", "change impact ต่อ wording/journey/analytics ต้องประเมินก่อน deploy; ใช้ของเดิมหรือยกเลิก campaign ทั้งหมดเสี่ยง"),
      mcq("Alert ownership", "ใน AML case management ไม่มีใครชัดเจนว่าใครเป็น owner เมื่อ alert ต้องขอข้อมูลจาก RM แต่ RM ไม่ตอบภายใน SLA ทำให้เคสค้างและ audit ถามหา evidence", "Compliance ต้องส่งรายงานสถานะผู้บริหารทุกวัน", "AML Analyst, RM, RM Head, Compliance Manager, Operations และ Audit", "นิยาม RACI, SLA, escalation path, status reason และ evidence requirement ใน workflow ก่อนสรุป design", "ให้ AML analyst โทรตามเองตามประสบการณ์โดยไม่ต้องลงระบบ", "ให้ RM เป็น owner ทุกเคสเพราะรู้จักลูกค้า", "ให้ Audit ตัดสิน owner ตอนตรวจพบปัญหา", "RACI + SLA + escalation ใน workflow ทำให้เคสไม่ค้าง; โทรเองหรือให้ RM เป็น owner ทุกเคสไม่ scale"),
      mcq("Production readiness", "ก่อน go-live Fraud Sandbox integration กับ case management ยังไม่มี reconciliation report แต่ทีมเทคนิคยืนยันว่า API ทำงานได้และ fraud analyst เห็นผล simulation แล้ว", "Sponsor ถามว่า BA เห็นว่าพร้อมเปิดใช้หรือไม่", "Fraud Analyst, Case Management Owner, IT, Operations, Risk และ Sponsor", "สรุป readiness ตาม business process end-to-end: simulation result, promotion approval, audit, reconciliation, support runbook, open risks และ go/no-go criteria", "ตอบว่าพร้อมเพราะ API test pass", "ตอบว่าไม่พร้อมทุกกรณีจนกว่าจะไม่มี open issue เลย", "ให้ vendor เป็นคนประกาศ production readiness", "readiness ต้องประเมิน end-to-end ไม่ใช่แค่ API test; ตอบพร้อมเลยหรือไม่พร้อมทุกกรณีไม่ balance risk"),
      mcq("STR evidence", "AML analyst ตัดสินใจจะยื่น STR แต่พบว่าข้อมูลธุรกรรมกระจายและไม่มี linkage ที่เชื่อม alert เดิมกับธุรกรรมใหม่ชัดเจน ทำให้หลักฐานไม่พอยืนยันเหตุผลการรายงาน", "Compliance ต้องส่ง STR ภายใน deadline ตามกฎหมาย", "AML Analyst, Compliance Manager, Legal, IT, Data Platform และ Audit", "นิยาม evidence pack ขั้นต่ำสำหรับ STR พร้อม transaction linkage, alert history, customer risk และ decision rationale ที่ audit ได้ แล้วทำให้ข้อมูลเข้าถึงได้จาก source เดียว", "ส่ง STR ตามความรู้สึกแล้วค่อยเติมหลักฐานทีหลัง", "รวบรวมหลักฐานทุกชนิดจนเกิน deadline ของกฎหมาย", "ให้ Legal ตัดสินว่าหลักฐานพอแล้วหรือไม่", "STR ต้องมี evidence pack มาตรฐานที่ linkage ได้; ส่งตามความรู้สึกหรือรอจนเกิน deadline ผิดกฎหมาย"),
      mcq("Model explainability", "Fraud model ใหม่จับธุรกรรมหลอกลวงได้ดีขึ้น แต่เมื่อ regulator ถามว่าทำไม model ตัดสินใจแบบนั้น ทีมไม่สามารถอธิบาย reason ของแต่ละ alert ได้", "ผู้บริหารอยากเปิดใช้ทั้งระบบเร็วเพราะผลดี", "Fraud, Data Science, Compliance, Risk, Legal และ Audit", "กำหนดให้ model ต้องมี explainability เช่น top reason code, feature contribution, human review threshold และ documentation ก่อน promote ไป production", "เปิดใช้ทันทีเพราะผลลัพธ์ดีกว่าเดิม", "ห้ามใช้ model จนกว่าจะอธิบายได้ร้อยเปอร์เซ็นต์", "ให้ Data Science ตอบ regulator เองโดยไม่มีกรอบ", "model ที่ใช้จริงต้องมี explainability; เปิดเลยเพราะผลดีหรือห้ามจนกว่าจะอธิบายได้ 100% สุดโต่ง"),
      mcq("Sandbox retention", "Fraud Simulation Sandbox เก็บข้อมูลจำลองไว้นานเกินไปและไม่มี retention rule ชัดเจน ทำให้ DPO กังวลเรื่อง purpose limitation และการเก็บข้อมูลเกินความจำเป็น", "ทีม Data อยากเก็บไว้เพื่อ retrain model", "DPO, Fraud, Data Science, Compliance, Security และ Platform", "นิยาม retention period, purpose, access log, disposal evidence และ exception approval สำหรับข้อมูลใน sandbox ตั้งแต่ขั้นตอนออกแบบ", "เก็บข้อมูลไว้ไม่จำกัดเพราะเป็น sandbox ภายใน", "ลบข้อมูลทุกอย่างหลังจบ simulation ทำให้ retrain ไม่ได้", "ให้ทีม Data กำหนด retention เองตามความสะดวก", "retention + purpose + disposal evidence ป้องกันเกินความจำเป็น; เก็บตลอดไปหรือลบหมดไม่ balance"),
      mcq("e-KYC fallback", "ลูกค้าบางส่วนทำ e-KYC ทางดิจิทัลไม่สำเร็จจึงต้องเข้าสาขาเป็น fallback แต่กระบวนการที่สาขาใช้ข้อมูลและ control ไม่เท่ากับช่องทางดิจิทัล ทำให้เกิดช่องว่างด้าน risk", "ลูกค้ารอนานและร้องเรียน", "Branch, Digital, KYC Ops, Compliance, Fraud และ Customer Experience", "ออกแบบ fallback flow ให้สอดคล้องกับ digital channel ทั้ง data capture, verification level, evidence และ risk scoring พร้อม audit trail", "ให้สาขาทำตามใจเพื่อรักษาลูกค้า", "บังคับลูกค้าทำดิจิทัลให้ได้ก่อนเท่านั้น", "ให้แต่ละสาขาตีความ process เอง", "fallback flow ต้องสอดคล้องกับ digital channel ทั้ง data/evidence/risk; ปล่อยสาขาทำเองหรือบังคับดิจิทัลเท่านั้นเสี่ยง"),
      mcq("Rule tuning governance", "Fraud rule มีการปรับ tuning บ่อยเพื่อลด false positive แต่ไม่มี change log และไม่ชัดว่าใครเป็นผู้อนุมัติ ทำให้ audit ถามหาความรับผิดชอบไม่ได้", "Fraud team ต้องการปรับได้เร็วเพื่อตอบสถานการณ์", "Fraud, Risk, Operations, Compliance, Audit และ IT", "นิยาม rule change governance พร้อม requester, impact test, approver, version, rollback และ audit log ก่อนอนุญาตให้ promote", "ให้ Fraud ปรับได้เองเพราะรู้งานดีที่สุด", "ห้ามปรับ rule จนกว่าจะผ่านคณะกรรมการทุกครั้ง", "ให้ IT เป็นคนอนุมัติทุกการเปลี่ยน rule", "rule change governance ที่มี impact test/approver/rollback ทำให้ audit ได้; ปรับเองหรือห้ามปรับจนผ่านคณะกรรมการทุกครั้งไม่ balance"),
      mcq("Consent withdrawal", "ลูกค้าถอน consent หลังเริ่มใช้บริการ แต่ข้อมูลที่ได้จาก consent นั้นถูกส่งต่อไป downstream แล้ว ทำให้ไม่ชัดว่าต้องหยุดใช้หรือลบข้อมูลอะไรบ้าง", "ทีม Marketing ยังใช้ข้อมูลส่ง campaign", "DPO, Legal, Marketing, Operations, Data Platform และ IT", "นิยาม consent withdrawal flow พร้อม data inventory, downstream notification, retention rule และ evidence ของการหยุดใช้ข้อมูล", "ปล่อยให้ downstream ใช้ต่อเพราะส่งไปแล้ว", "ลบข้อมูลลูกค้าทั้งหมดทันทีโดยไม่แยกประเภท", "ให้แต่ละทีมตัดสินเองว่าจะเก็บหรือลบ", "consent withdrawal flow ต้องสื่อสาร downstream + retention; ปล่อยใช้ต่อหรือลบข้อมูลทั้งหมดไม่ถูกต้อง"),
      mcq("Workshop decision log", "ใน workshop เก็บ requirement มีการตัดสินใจหลายข้อด้วยวาจาแต่ไม่มีการบันทึก ภายหลังฝ่ายต่าง ๆ โต้แย้งกันว่าสรุปอย่างไร ทำให้ scope สับสน", "ต้องเริ่ม build ในสัปดาห์ถัดไป", "Product, Compliance, Operations, IT, QA และ Sponsor", "ตั้ง decision log มาตรฐานที่บันทึก decision, rationale, owner, date และ open issue ทุกครั้งหลัง session แล้วส่งให้ทุกฝ่าย confirm", "เริ่ม build ตามความเข้าใจของแต่ละคน", "เลื่อน build จนกว่าจะบันทึกได้สมบูรณ์แบบ", "ให้ PM จำ decision เองแล้วแจ้งทีมทีหลัง", "decision log ที่บันทึก rationale/owner ป้องกัน scope สับสน; เริ่ม build ตามความเข้าใจส่วนตัวหรือเลื่อนจนบันทึกสมบูรณ์ไม่ practical"),
      mcq("False-positive burnout", "AML alert มี false positive สูงมาก ทำให้ analyst คุ้นเคยกับการปิดเคสอัตโนมัติโดยไม่ตรวจละเอียด จนกระทั่งมีเคสจริงหลุดไป", "Compliance กังวลเรื่อง quality ของการปิดเคส", "AML Analyst, Compliance Manager, Quality Assurance, Operations, Risk และ Audit", "ทำ quality sampling, feedback loop, alert tuning target และ red-team case เพื่อตรวจสอบว่า analyst ยังตรวจของจริงอยู่", "ปล่อยให้ analyst ปิดเคสตามปริมาณ", "บังคับตรวจทุก alert ละเอียดเท่ากันจนค้าง", "ให้ QA ตรวจสอบเองหลังเกิด incident", "quality sampling + red-team ตรวจคุณภาพได้โดยไม่ทำให้ workload พัง; ปล่อยตามปริมาณหรือตรวจทุก alert เท่ากันไม่ scale"),
      mcq("Hotfix control", "เกิด fraud pattern ใหม่ด่วน ทีมต้องการ hotfix rule ทันทีแต่ข้ามขั้นตอน approval และ test ปกติ ทำให้เสี่ยงต่อผลกระทบที่ไม่ได้ประเมิน", "ผู้บริหารสั่งให้เร็วเพราะมี loss เกิดขึ้น", "Fraud, Risk, IT, Compliance, Operations และ Release", "กำหนด emergency change path ที่เร็วแต่ยังมี impact check, rollback, post-change review และ audit log สำหรับ hotfix", "ปล่อย hotfix ทันทีโดยไม่มี control", "รอผ่านขั้นตอนปกติทุกข้อแม้ loss จะเพิ่ม", "ให้ IT ตัดสินเรื่อง hotfix คนเดียว", "emergency change path ที่เร็วแต่ยังมี impact check + rollback; ปล่อยเลยหรือรอขั้นตอนปกติทุกข้อสุดโต่ง"),
      mcq("Cross-border data", "Fraud Sandbox วางไว้บน cloud ในต่างประเทศ แต่ regulator มีข้อกังวลเรื่องการนำข้อมูลลูกค้าข้ามพรมแดน ทำให้ไม่แน่ใจว่าใช้ได้หรือไม่", "ทีมเทคนิคบอกว่า cloud นั้นปลอดภัยพอ", "DPO, Legal, Compliance, Security, IT และ Risk", "ทำ data residency assessment เปรียบเทียบกฎหมาย, masking, contractual safeguard, approval แล้วสรุป option ให้ decision owner ก่อนใช้", "ใช้ cloud นั้นเลยเพราะคุ้มค่า", "ห้ามใช้ cloud ต่างประเทศทุกกรณี", "ให้ vendor รับผิดชอบเรื่องกฎหมายเอง", "data residency assessment เทียบกฎหมาย/safeguard ก่อนใช้; ใช้เลยเพราะปลอดภัยหรือห้ามทุกกรณีไม่ balance"),
    ],
    written("Fraud Simulation Sandbox", "ธนาคารมี Fraud Detection System ที่ต้องปรับกฎและ model อยู่เรื่อย ๆ เพราะ pattern fraud เปลี่ยนเร็ว ทุกครั้งที่เพิ่ม rule หรือ logic ใหม่ ทีม Fraud ต้องการรู้ว่าจะจับ fraud ได้ดีขึ้นจริงหรือไม่ แต่ทีม Operations กังวลว่า alert จะเพิ่มจนตรวจไม่ทัน ทีม Risk กังวล false negative ที่ปล่อย fraud จริงหลุดไป และ Data Privacy กังวลการใช้ข้อมูลลูกค้าจริงใน sandbox ปัจจุบันการทดสอบพึ่งข้อมูลย้อนหลังและ environment ที่ไม่สะท้อน production ทั้งหมด ทำให้ไม่เห็น workload, customer impact, false positive และผลต่อ case management ชัดเจน ธนาคารจึงต้องการ Fraud Simulation Sandbox ที่จำลองธุรกรรมและสถานการณ์ fraud ก่อน promote rule/model ไป production โดยไม่กระทบลูกค้าจริง ระบบต้องช่วยให้ทีมที่เกี่ยวข้องทดลอง rule/model, เปรียบเทียบผลกับ rule เดิม, ประเมิน alert volume, เห็น privacy/control ที่จำเป็น และสนับสนุน decision ของ Fraud/Risk/Operations ว่าควรเปิดใช้จริงหรือยัง", ["Rule or model simulation setup", "Dataset selection and masking", "Result comparison dashboard", "Projected alert workload", "Production promotion approval", "Simulation audit evidence"], "historical transaction, fraud label, customer segment, rule version, model version, alert result, case status", "data masking, role-based access, approval workflow, audit trail, retention, reconciliation", "Fraud, Risk, Operations, DPO, Compliance, Data Science, IT, Case Management Owner"),
  ),
  exam(
    "digital-onboarding",
    "ชุดที่ 2: Digital Onboarding, Consent และ KYC Exception",
    "Consent version, liveness exception, onboarding drop-off, privacy vs conversion",
    "ชุดนี้จำลอง onboarding journey ที่ Product อยากลด friction แต่ control owner ต้องการหลักฐาน KYC และ privacy ให้ครบ",
    [
      mcq("Onboarding drop-off", "Mobile onboarding มี drop-off สูงที่หน้า consent และ Product เสนอให้ย้าย consent รายละเอียดไปหลังเปิดบัญชีเพื่อเพิ่ม conversion แต่ DPO และ Compliance เตือนว่า consent ต้องชัดก่อนใช้ข้อมูลบางประเภท", "ผู้บริหารต้องการ quick win ภายในเดือนนี้", "Product, DPO, Compliance, UX, Analytics, Legal และ Operations", "แยก consent ที่เป็น regulatory/purpose must-have ออกจาก UX friction แล้วออกแบบ option เช่น concise summary, layered notice, versioning และ A/B metric ที่ DPO approve", "ย้าย consent ทั้งหมดไปหลังเปิดบัญชีเพราะ conversion สำคัญกว่า", "บังคับแสดง legal text ยาวทั้งหมดโดยไม่สนใจ customer journey", "ให้ Marketing ตัดสิน wording เพราะเป็นเจ้าของ conversion", "consent must-have ต้องแยกจาก UX friction; ย้ายหมดเพื่อ conversion หรือบังคับ legal text ยาวไม่สมดุล"),
      mcq("Liveness exception", "ลูกค้าจำนวนหนึ่งทำ liveness ไม่ผ่านเพราะกล้อง/แสง แต่ document verification ผ่าน ทำให้ Call Center ขอ manual override เพื่อไม่เสียลูกค้า", "Fraud team กลัว deepfake และ account mule", "Customer, Call Center, Fraud, KYC Operations, Compliance และ Digital", "ออกแบบ exception queue แบบ risk-based พร้อม evidence, maker-checker review, reason code และ account limitation จนกว่าจะ verify สำเร็จ", "ให้ Call Center override ได้ทันทีเพื่อรักษาลูกค้า", "block ลูกค้าทุกคนที่ fail liveness ถาวร", "ให้ IT ปรับ threshold เองโดยไม่ผ่าน risk decision", "exception queue แบบ risk-based สมดุล CX และ fraud; override เลยหรือ block ถาวรไม่ balance"),
      mcq("Duplicate CIF", "ระบบพบลูกค้าเปิดบัญชีซ้ำเพราะข้อมูลจาก mobile และ branch ไม่ match กัน เช่น phone เปลี่ยนแต่ national ID เดิม ทำให้เกิด duplicate CIF", "Operations ต้อง merge manual และเสี่ยงข้อมูลผิด", "Branch, Digital, Customer Data Owner, KYC Ops, Core Banking และ Compliance", "นิยาม matching rule, confidence score, manual review, merge approval และ audit trail พร้อมผลกระทบ downstream", "ใช้เบอร์มือถือเป็น key เดียวเพื่อให้ match ง่าย", "ให้ branch แก้ manual หลังเปิดบัญชีโดยไม่ต้องมี rule", "ห้ามเปิดบัญชี mobile ทุกเคสที่ข้อมูลไม่ match", "matching rule + confidence score + merge approval แก้ที่ต้นเหตุ; ใช้ phone เป็น key เดียวหรือแก้ manual ไม่ scale"),
      mcq("Address data conflict", "ลูกค้าใช้ที่อยู่ปัจจุบันสำหรับส่งบัตร แต่ KYC policy ต้องเก็บ registered address ด้วย ทีม UX อยากเหลือช่องเดียวเพื่อให้กรอกเร็ว", "Courier complaint เพิ่มเพราะส่งไม่สำเร็จ", "Customer, UX, KYC Policy, Card Operations, Courier และ Call Center", "แยก purpose ของ registered/mailing address, validation, prefill, change control และ customer explanation ให้ชัด", "เก็บ address เดียวตาม UX เพื่อให้ flow สั้น", "บังคับกรอก address ทั้งหมดซ้ำทุกครั้งโดยไม่ prefill", "ให้ courier เก็บ address เพิ่มเองหลังสมัคร", "แยก purpose registered/mailing + prefill ทำให้ชัด; ช่องเดียวตาม UX หรือกรอกซ้ำทุกครั้งไม่ practical"),
      mcq("Consent audit", "Auditor ขอพิสูจน์ว่าลูกค้ายอมรับ consent version ใดก่อนธนาคารใช้ biometric data แต่ระบบเก็บเพียง boolean accepted=true", "ทีม dev บอกว่าเปลี่ยน schema ตอนนี้เสี่ยง delay", "Audit, DPO, Legal, Product, IT และ Data Platform", "ทำ gap analysis และกำหนด consent evidence ขั้นต่ำ: version, timestamp, channel, language, purpose, actor และ migration/backfill option", "บอก auditor ว่ามี accepted=true ก็เพียงพอ", "หยุด onboarding ทั้งหมดจนกว่าจะ redesign schema ใหม่", "ให้ developer export log ที่มีอยู่โดยไม่ map กับ consent version", "consent evidence ขั้นต่ำ (version/timestamp/channel) ทำให้ audit ได้; boolean พอหรือหยุด onboarding จน redesign สุดโต่ง"),
      mcq("KYC refresh", "ลูกค้า corporate บางรายต้อง refresh KYC ตามรอบ แต่ RM ไม่รู้ว่าเอกสารใดหมดอายุและระบบส่ง reminder กว้างเกินไปจนถูก ignore", "Compliance กังวล account ที่ KYC expired ยังทำธุรกรรมได้", "RM, Corporate Customer, Compliance, Operations, Notification team และ Core Banking", "ออกแบบ KYC status, document expiry, risk-based reminder, escalation และ account restriction rule ที่ trace ได้", "ส่ง notification ทุกวันให้ลูกค้าทุกคนเพื่อกันลืม", "ให้ RM จำเองจาก spreadsheet", "ปิดบัญชีทุกเคสทันทีเมื่อเอกสารใกล้หมดอายุ", "KYC status + risk-based reminder + restriction rule ทำให้ไม่ตกหล่ม; ส่งทุกวันหรือจำใน spreadsheet ไม่ scale"),
      mcq("Rejected onboarding reason", "ลูกค้าสมัครไม่ผ่านแต่หน้าจอแสดงข้อความ generic ทำให้ Call Center ตอบไม่ได้ ขณะที่ Compliance ไม่ต้องการเปิดเผยรายละเอียด screening rule", "Complaint ผ่าน social เพิ่มขึ้น", "Customer, Call Center, Compliance, Fraud, UX Writer และ Legal", "กำหนด reason category ที่สื่อสารได้, internal reason สำหรับ agent, masking, script และ escalation path", "แสดง rule screening ทั้งหมดให้ลูกค้าดูเพื่อความโปร่งใส", "ซ่อนทุกเหตุผลและให้ลูกค้าสมัครใหม่", "ให้ Call Center เดาสาเหตุจากประสบการณ์", "reason category ที่สื่อสารได้ + internal detail สมดุลโปร่งใสและ control; เปิด rule ทั้งหมดหรือซ่อนหมดสุดโต่ง"),
      mcq("Onboarding metrics", "ผู้บริหารถามว่า onboarding ใหม่สำเร็จหรือไม่ แต่แต่ละทีมใช้ metric ต่างกัน เช่น conversion, fraud hold, manual review, complaint และ account activation", "ต้องรายงาน steering committee สัปดาห์หน้า", "Product, Fraud, Operations, Analytics, Finance และ Sponsor", "นิยาม KPI tree และ baseline: completion, time-to-open, fraud/exception rate, manual review SLA, activation และ complaint พร้อม owner", "เลือก conversion เป็น metric เดียวเพราะ sponsor สนใจ", "นับจำนวน screens ที่ build เสร็จเป็น success", "รอข้อมูลหลัง go-live 6 เดือนก่อนค่อยนิยาม KPI", "KPI tree + baseline ที่ครอบทุกมิติทำให้รายงานได้; conversion เดียวหรือนับ screens ไม่พิสูจน์คุณค่า"),
      mcq("Manual review capacity", "ถ้าเพิ่ม KYC review step ใหม่ Operations ต้องใช้คนเพิ่ม แต่ Compliance เห็นว่า control จำเป็น ส่วน Product กลัว SLA เปิดบัญชียาวขึ้น", "ไม่มี budget เพิ่มคนใน quarter นี้", "Operations, Compliance, Product, Workforce, Risk และ Sponsor", "ประเมิน volume, risk segmentation, automation option, SLA, queue design และ residual risk เพื่อทำ decision trade-off", "ตัด review step ออกเพราะไม่มีคน", "เพิ่ม review ทุกเคสแม้ SLA พัง", "ให้ Operations ทำ overtime โดยไม่เปลี่ยน process", "risk segmentation + automation + SLA ทำให้ trade-off ชัด; ตัด review หรือเพิ่มทุกเคสไม่ balance"),
      mcq("Policy effective date", "KYC policy ใหม่มีผลกลาง release และ requirement เดิมบางข้อไม่ตรง เช่น document retention และ enhanced due diligence สำหรับบาง occupation", "Release manager ขอคำตอบว่าจะ retest อะไรบ้าง", "KYC Policy, Compliance, QA, IT, Product และ Release", "ทำ impact analysis ต่อ rule, data, screen, test case, migration, customer in-flight และ sign-off owner", "ใช้ policy เก่าจนกว่า release จบเพราะ scope ปิดแล้ว", "retest ทั้งระบบโดยไม่ prioritize impact", "ให้ QA อ่าน policy แล้วตัดสินเอง", "impact analysis ต่อ rule/data/test/migration ก่อน retest; ใช้ policy เก่าหรือ retest ทั้งระบบไม่ prioritize"),
      mcq("Biometric retention", "ระบบเก็บ biometric template ของลูกค้า แต่ไม่ชัดว่าเก็บนานเท่าไรและเพื่อ purpose ใดบ้าง ทำให้ DPO กังวลว่าเกินความจำเป็น", "ทีม Fraud อยากเก็บไว้นานเพื่อตรวจซ้ำ", "DPO, Fraud, Digital, Compliance, Security และ IT", "นิยาม purpose, retention, re-enrollment trigger, access control และ deletion evidence สำหรับ biometric ตั้งแต่ออกแบบ", "เก็บ biometric ไว้ตลอดไปเพื่อใช้สอย", "เก็บ biometric สั้นมากจนตรวจซ้ำไม่ได้", "ให้ทีมเทคนิคกำหนด retention เอง", "purpose + retention + re-enrollment trigger นิยามตั้งแต่ออกแบบ; เก็บตลอดไปหรือสั้นจนตรวจซ้ำไม่ได้ไม่ balance"),
      mcq("Joint account", "ลูกค้าสองคนเปิดบัญชีร่วมกันทางดิจิทัล แต่กระบวนการเก็บ consent และ KYC ออกแบบไว้สำหรับคนเดียว ทำให้หลักฐานและความรับผิดไม่ครบทั้งสองฝ่าย", "ลูกค้าอยากเปิดได้ในครั้งเดียว", "Customer, Digital, KYC Ops, Compliance, Legal และ IT", "ออกแบบ joint onboarding ให้เก็บ consent, KYC, risk score และ signature แยกแต่ละบุคคลพร้อมเชื่อมความสัมพันธ์บัญชีที่ชัดเจน", "เก็บ consent จากคนเดียวแล้วถือว่าครบ", "บังคับเข้าสาขาทุกเคสบัญชีร่วม", "ให้แต่ละฝ่ายเปิดทีละบัญชีแล้วค่อยเชื่อม", "joint onboarding แยก consent/KYC/risk แต่ละบุคคล; consent คนเดียวหรือบังคับสาขาทุกเคสไม่สมดุล"),
      mcq("PEP screening", "ระบบคัดกรองพบว่าลูกค้าเป็น PEP ระหว่าง onboarding แต่ RM กดดันให้ดำเนินต่อเพราะเป็นลูกค้าเป้าหมาย ในขณะที่ Compliance ต้องการ enhanced due diligence", "ลูกค้ารอนานและอาจไปคู่แข่ง", "RM, Compliance, KYC Ops, Risk, Legal และ Digital", "นิยาม flow สำหรับ PEP ที่ระบุ enhanced due diligence, approval level, monitoring และ timeline ที่ชัดเจนก่อนอนุมัติ", "อนุมัติทันทีเพราะเป็นลูกค้าใหญ่", "ปฏิเสธลูกค้า PEP ทุกคน", "ให้ RM ตัดสินเรื่อง enhanced due diligence เอง", "PEP flow ที่มี EDD + approval + timeline ชัด; อนุมัติเลยหรือปฏิเสธทุก PEP สุดโต่ง"),
      mcq("Mule pattern", "ระบบพบว่ามีการเปิดบัญชีหลายบัญชีจากอุปกรณ์เดียวกันในช่วงเวลาใกล้กัน ซึ่งเป็นสัญญาณของ mule account แต่ลูกค้าแต่ละคนผ่าน KYC แล้ว", "ทีม Product ไม่อยาก block เพราะกระทบ conversion", "Fraud, Compliance, Digital, Risk, Operations และ IT", "นิยาม device-based risk signal, manual review trigger, account linkage และ escalation ที่จับ pattern โดยไม่ไป block ลูกค้าปกติทั้งหมด", "ปล่อยผ่านเพราะ KYC ผ่านแล้ว", "block อุปกรณ์ที่มีหลายบัญชีทั้งหมด", "ให้ Call Center สอบถามลูกค้าเองเมื่อสงสัย", "device-based risk signal + manual review จับ pattern โดยไม่ block ลูกค้าปกติ; ปล่อยผ่านหรือ block อุปกรณ์ทั้งหมดไม่ balance"),
      mcq("Re-onboarding retry", "ลูกค้าที่เคยถูกปฏิเสธกลับมาสมัครใหม่โดยเปลี่ยนข้อมูลบางอย่าง ระบบไม่ได้เชื่อมกับประวัติการปฏิเสธเดิม ทำให้เสี่ยงอนุมัติเคสที่ควรถูกตรวจสอบ", "ทีม Digital ต้องการลด friction ในการสมัครใหม่", "Fraud, KYC Ops, Compliance, Risk, Digital และ IT", "เชื่อมประวัติการปฏิเสธกับ application ใหม่ผ่าน matching key แล้วตั้งกฎให้เคสที่เคยถูกปฏิเสธเข้า manual review พร้อมเหตุผล", "ปฏิบัติเหมือนเคสใหม่ทุกอย่าง", "block ทุกคนที่เคยถูกปฏิเสธอย่างถาวร", "ให้ RM จำเคสเก่าเอง", "เชื่อมประวัติปฏิเสธกับ application ใหม่ + manual review; ปฏิบัติเหมือนเคสใหม่หรือ block ถาวรเสี่ยง"),
      mcq("Consent bundling", "ทีม Marketing ต้องการให้ consent เปิดบัญชีกับ consent รับโปรโมชันอยู่ใน checkbox เดียวกันเพื่อให้ลูกค้ากดง่าย แต่ DPO ชี้ว่าต้องแยก purpose", "Marketing อยากได้ base รับโปรโมชันใหญ่ขึ้น", "Marketing, DPO, Legal, Digital, UX และ Compliance", "แยก consent ตาม purpose ที่ชัดเจน ให้ลูกค้าเลือกได้แยก พร้อม versioning และ evidence ของแต่ละ purpose", "รวมไว้ checkbox เดียวเพื่อ conversion สูง", "บังคับกรอกแยกทุก purpose แบบยาว", "ให้ Marketing กำหนด wording เองทั้งหมด", "แยก consent ตาม purpose ที่ชัด; รวม checkbox เดียวหรือบังคับกรอกแยกยาวไม่ถูกต้อง"),
      mcq("Minor account", "ลูกค้าต้องการเปิดบัญชีดิจิทัลให้ผู้เยาว์ แต่ flow ปัจจุบันไม่มีการตรวจสอบอายุและ consent จากผู้ปกครอง ทำให้เสี่ยงด้านกฎหมาย", "Product อยากขยาย base ลูกค้าเยาว์", "Product, Legal, Compliance, KYC Ops, Digital และ DPO", "ออกแบบ flow เฉพาะสำหรับผู้เยาว์ที่มี age verification, guardian consent, authorization limit และ monitoring ที่เหมาะสม", "ใช้ flow ปกติเพราะง่ายกว่า", "ห้ามเปิดบัญชีผู้เยาว์ทางดิจิทัลทุกกรณี", "ให้สาขาจัดการเองทั้งหมด", "flow เฉพาะผู้เยาว์ที่มี age verification + guardian consent; ใช้ flow ปกติหรือห้ามดิจิทัลทุกกรณีไม่ balance"),
      mcq("Document expiry", "บัตรประชาชนของลูกค้าหมดอายุระหว่างส่งใบสมัครกับขั้นตอนตรวจสอบ ทำให้ KYC ไม่สมบูรณ์ แต่ระบบไม่ตรวจจับและดำเนินการต่อ", "ลูกค้ารอและร้องเรียนเรื่องความล่าช้า", "KYC Ops, Digital, Compliance, Operations และ IT", "ตรวจสอบ document expiry ทุกขั้นตอนสำคัญ แล้วแจ้งลูกค้าขอเอกสารใหม่พร้อม record เหตุผลและ timeline ที่ชัดเจน", "ดำเนินการต่อเพราะเอกสารเคยถูกต้อง", "ยกเลิกใบสมัครทันทีที่หมดอายุ", "ให้ KYC Ops ตัดสินเองเป็นรายเคส", "ตรวจ document expiry ทุกขั้นตอนสำคัญ + แจ้งขอใหม่; ดำเนินต่อเพราะเคยถูกต้องหรือยกเลิกทันทีสุดโต่ง"),
      mcq("Onboarding SLA vs quality", "RM ถูกกดดันให้เปิดบัญชีเร็วเพื่อให้ทัน target จึงข้ามการตรวจสอบรองที่ควรทำ ทำให้คุณภาพ KYC ลดลง", "ผู้บริหารต้องการตัวเลขเปิดบัญชีสูง", "RM, RM Head, Compliance, Operations, Risk และ KYC Ops", "นิยาม SLA ควบคู่กับ quality gate พร้อม sampling, exception approval และ metric ที่วัดทั้งความเร็วและคุณภาพ", "เน้นความเร็วเพราะ target สำคัญกว่า", "บังคับตรวจทุกขั้นตอนแบบเดียวกันจน SLA พัง", "ให้ RM ตัดสินเองว่าจะข้ามขั้นตอนใด", "SLA + quality gate + sampling สมดุลความเร็วและคุณภาพ; เน้นเร็วอย่างเดียวหรือบังคับทุกขั้นเสี่ยง"),
      mcq("Data portability", "ลูกค้าร้องขอข้อมูล onboarding ของตนตามสิทธิ PDPA data portability แต่ระบบไม่ได้ออกแบบให้ export ได้และไม่ชัดขอบเขตข้อมูลที่ต้องส่ง", "ลูกค้าขู่จะร้องเรียน DPO", "DPO, Legal, Data Platform, Operations, IT และ Compliance", "นิยามขอบเขตข้อมูลที่พอร์ตได้ รูปแบบ กระบวนการยืนยันตัวตน และ timeline พร้อมการตรวจสอบว่าไม่ละเมิดสิทธิผู้อื่น", "ปฏิเสธเพราะระบบไม่รองรับ", "ส่งข้อมูลทั้งหมดที่มีโดยไม่กรอง", "ให้ทีมเทคนิคจัดการเองตามคำขอ", "นิยามขอบเขตข้อมูล + รูปแบบ + กระบวนการยืนยัน; ปฏิเสธเพราะระบบไม่รองรับหรือส่งทั้งหมดไม่ถูกต้อง"),
    ],
    written("Digital Onboarding Control Workbench", "ธนาคารต้องการปรับปรุง digital onboarding สำหรับลูกค้าใหม่ให้เปิดบัญชีได้เร็วขึ้น ลด drop-off และลด manual work ของ Call Center/Operations แต่การเปิดบัญชีเกี่ยวข้องกับ e-KYC, consent, biometric/liveness, document capture, customer master, duplicate detection และ KYC risk scoring หลายฝ่ายมีมุมมองต่างกัน Product ต้องการลดจำนวน step, Compliance ต้องการหลักฐาน consent และ KYC ที่ audit ได้, Fraud ต้องการป้องกัน account mule, Operations ต้องการ review queue ที่จัดการได้จริง และ DPO ต้องการจำกัดการใช้ข้อมูลส่วนบุคคลตาม purpose ที่ถูกต้อง ระบบใหม่ควรทำให้ลูกค้าเข้าใจสิ่งที่ต้องทำ เห็นสถานะเมื่อมี exception และทำให้ทีม internal ตัดสินใจบนข้อมูลชุดเดียวกัน โดยไม่ลด control สำคัญของธนาคาร", ["Consent capture and versioning", "Liveness exception review", "Duplicate customer matching", "KYC risk-based onboarding", "Customer rejection reason", "Operations review queue"], "consent version, national ID, biometric result, customer profile, KYC risk, exception reason, application status", "PDPA consent, data minimization, fraud control, role access, audit trail, retention", "Customer, Product, KYC Ops, Fraud, Compliance, DPO, Call Center, IT"),
  ),
  exam(
    "aml-case-management",
    "ชุดที่ 3: AML Case Management และ STR Evidence",
    "Alert prioritization, evidence, escalation, regulatory timeline",
    "ชุดนี้เน้น AML monitoring ที่ต้อง balance ระหว่าง regulatory timeline, operations workload และ evidence ที่ตรวจสอบย้อนหลังได้",
    setMcqs("AML Case Management", "Compliance ต้องส่ง status ให้ผู้บริหารและ regulator ตามรอบ", "AML Analyst, Compliance Manager, Fraud, RM, Operations, Legal และ Audit", [
      ["alert ความเสี่ยงสูงที่ตรวจพบ structuring pattern ค้างใน queue เกิน 48 ชั่วโมง เพราะ analyst กำลังไล่ปิด alert ความเสี่ยงต่ำจำนวนมากก่อน ส่วน disposition reason ยังเก็บเป็น free text ทำให้ไม่สามารถจัดลำดับเคสได้", "นิยาม risk-based scoring และ SLA tier บน alert พร้อม standardized disposition reason เพื่อให้เคสเสี่ยงสูงถูกตรวจก่อน และทำให้สถานะ queue มองเห็นแบบ real-time", "ให้ analyst ปิด alert ความเสี่ยงต่ำให้หมดก่อนแล้วค่อยดูเคสเสี่ยงสูง", "หยุดปิด alert ทุกประเภทจนกว่าจะ redesign ระบบทั้งหมด", "ส่งเคสเสี่ยงสูงทั้งหมดให้ผู้บริหารตัดสินใจเองทีละเคส", "AML workload ต้องจัดลำดับด้วย risk ไม่ใช่ตามลำดับที่เข้า queue; scoring + SLA tier + standard disposition ทำให้ทั้ง prioritization และ audit ทำได้พร้อมกัน"],
      ["analyst ต้องยื่น STR ภายใน deadline ที่กฎหมายกำหนด แต่หลักฐานธุรกรรมกระจายอยู่ใน core banking, card และ remittance สามระบบ และยังไม่มี linkage ที่รวม alert เดิมกับธุรกรรมใหม่", "นิยาม evidence pack ขั้นต่ำ (transaction linkage, alert history, customer risk, decision rationale) และทำให้ดึงรวมจาก source เดียวได้ก่อน deadline", "ยื่น STR ตามความรู้สึกแล้วค่อยเติมหลักฐานทีหลัง", "รวบรวมหลักฐานจนครบทุกชนิดแม้จะเกิน deadline ที่กฎหมายกำหนด", "ให้ Legal ตัดสินเองว่าหลักฐานพอแล้วหรือไม่", "STR ต้องมี evidence pack มาตรฐานที่ linkage ได้; การรอจนครบเกิน deadline ผิดกฎหมาย ส่วนการยื่นโดยไม่มีหลักฐานเสี่ยงตอน audit"],
      ["เมื่อ alert ต้องขอข้อมูล source of fund เพิ่มจาก RM แต่ RM ไม่ตอบภายใน SLA ทำให้เคสค้างและไม่ชัดว่าใครเป็น owner ต่อเมื่อ RM ไม่ตอบ", "นิยาม RACI, SLA ตอบกลับ, escalation path และเงื่อนไขที่เคสถูกยกระดับหรือจำกัดบัญชีเมื่อเกิน SLA พร้อมบันทึกไว้ใน workflow", "ให้ analyst โทรตาม RM เองตามความสะดวกโดยไม่ลงระบบ", "ระงับบัญชีลูกค้าทุกเคสที่ RM ยังไม่ตอบทันที", "ให้ Audit เป็นคนตัดสิน owner ตอนตรวจพบปัญหา", "ownership + SLA + escalation ที่ชัดใน workflow ทำให้เคสไม่ค้างและตรวจสอบได้; การโทรเองหรือระงับบัญชีหมดทั้งหมดละเมิดกระบวนการ"],
      ["analyst คุ้นเคยกับการปิด alert อัตโนมัติเพราะ false positive สูงจนมีเคสจริงหลุด ทีมต้องการวิธีตรวจสอบคุณภาพการปิดเคสโดยไม่เพิ่มงาน analyst", "ทำ quality sampling, feedback loop และแทรก red-team case เพื่อตรวจว่า analyst ยังตรวจของจริงอยู่ พร้อมกำหนด tuning target ลด false positive", "ปล่อยให้ analyst ปิดเคสตามปริมาณเพราะความเร็วสำคัญกว่า", "บังคับตรวจทุก alert ละเอียดเท่ากันจนงานค้าง", "ให้ QA ตรวจสอบเองเฉพาะหลังเกิด incident", "sampling + red-team ตรวจคุณภาพได้โดยไม่ทำให้ workload พัง ส่วนการปิดตามปริมาณหรือตรวจทุกข้อละเอียดเท่ากันล้มเหลวทั้งคู่"],
      ["ทีม Fraud ปรับ rule ใหม่ให้จับ structuring ได้แม่นขึ้น แต่คาดว่า alert จะเพิ่มจาก 500 เป็น 4,000 รายการต่อวัน และ Customer Experience กังวลว่าลูกค้าปกติจะถูก hold", "ทำ impact analysis เทียบ fraud loss reduction, false positive, workload, SLA และ customer message แล้วเสนอ go/no-go พร้อม control ก่อนเปิด", "เปิด rule ทันทีเพราะ fraud risk สำคัญกว่าทุกมิติ", "ปิด rule จนกว่าจะไม่มี false positive เลย", "ให้ทีม IT ตัดสินจาก effort ที่ใช้แก้ rule", "การ promote rule ต้องชั่ง trade-off หลายมิติก่อน; เปิดหรือปิดสุดโต่งโดยดูมิติเดียวเสี่ยงกระทบ workload และลูกค้า"],
      ["screening พบว่าลูกค้าเดิมที่ทำธุรกรรมอยู่ตรงกับ watchlist ที่เพิ่งอัปเดต แต่ RM บอกว่าลูกค้ารายนี้สำคัญและขอให้ทำธุรกรรมต่อได้", "นิยาม flow สำหรับ true hit: แช่แข็งธุรกรรม, ขอ enhanced due diligence, เส้นทางอนุมัติและรายงานตามกฎ โดยไม่ยอมให้ทำธุรกรรมต่อจนกว่าจะกระจ่าง", "ปล่อยธุรกรรมต่อเพราะเป็นลูกค้าเดิมที่รู้จักดี", "ปิดบัญชีลูกค้าทันทีโดยไม่ตรวจ additional context", "ให้ RM เป็นคนตัดสินเรื่อง watchlist hit", "sanction hit ต้องมี flow ที่คุม control และรายงานตามกฎ; การปล่อยผ่านเพราะเป็นลูกค้าเดิมคือ bypass control ที่ผิดกฎหมาย"],
      ["ลูกค้าที่เปิดบัญชีไปแล้วกลายเป็น PEP หลังได้รับตำแหน่งทางการเมือง แต่ระบบไม่ trigger re-assessment และไม่ชัดว่าต้อง monitoring ระดับไหน", "นิยาม trigger re-classification เมื่อ profile เปลี่ยน พร้อม enhanced monitoring, approval level และ review cadence สำหรับ PEP", "ถือว่าการ classify ตอนเปิดบัญชีเพียงพอตลอดไป", "ปิดบัญชี PEP ทุกรายทันทีที่ทราบ", "ให้ทีมเทคนิคตั้งค่า monitoring เองตาม default", "PEP status เปลี่ยนตามเวลา ต้องมี trigger re-assessment + monitoring ที่เหมาะสม; การละเลยหรือปิดบัญชีหมดทั้งคู่ไม่สมดุลความเสี่ยง"],
      ["analyst ต้องการเห็นข้อมูลลูกค้าละเอียดเพื่อสืบสวน แต่ DPO เตือนว่าไม่ใช่ทุก role ควรเห็นข้อมูลเต็ม ทำให้กระบวนการสืบสวนช้าลง", "นิยาม role-based access, masking แบบ reversible สำหรับกรณีที่ได้รับอนุมัติ, purpose limitation, audit log และ exception approval", "เปิดข้อมูลเต็มให้ analyst ทุกคนเพื่อความเร็ว", "mask ข้อมูลจน analyst ทำงานไม่ได้", "ให้แต่ละคนใช้วิจารณญาณเปิดดูเอง", "access control + masking แบบมี exception path ทำให้สืบสวนได้ทั้งในเวลาและตามกฎ; เปิดหมดหรือ mask หมดทำลายข้อได้เปรียบของอีกฝั่ง"],
      ["auditor ขอดูหลักฐานว่าทำไม alert นี้ถูก escalate เป็น STR แต่ระบบเก็บแค่ status=closed และ note อิสระ ทำให้ rationale สืบสายไม่ได้", "บังคับ minimum evidence fields ตอนปิดหรือ escalate: linkage, decision reason, approver, supporting data และ timestamp พร้อม retention", "ส่ง login log ให้ auditor แล้วบอกว่าเพียงพอ", "หยุดปิดเคสทุกเคสจนกว่าจะ redesign หลักฐานครบ", "ให้ auditor ดึงข้อมูลจาก database เอง", "minimum evidence fields ทำให้ rationale สืบได้และ audit pass; การส่ง log หรือหยุดงานทั้งหมดไม่ตอบโจทย์ compliance"],
      ["STR ต้องส่งภายใน 3 วันทำการตามกฎหมาย แต่ยังมี open question เรื่อง source of fund ที่ต้องการเวลาสืบเพิ่ม ทำให้ analyst ลังเลว่าจะรอหรือส่ง", "ยื่นภายใน deadline ด้วยข้อมูลที่มี พร้อมระบุ open question, residual gap และแผนติดตาม แทนการรอจนกว่าจะครบ", "รอจนกว่าจะแน่ใจ 100% แม้จะเกิน deadline ตามกฎหมาย", "ยื่น STR ทุก alert ทันทีโดยไม่กรองความเสี่ยง", "ให้ Compliance Manager ตัดสินเองคนเดียวโดยไม่มี gap record", "deadline ทางกฎหมายต้องเคารพ; การยื่นพร้อมระบุ gap + แผนติดตามถูกต้องกว่ารอจนครบหรือยื่นทุกอย่าง"],
      ["ตอน UAT พบว่า disposition reason ที่ analyst เลือกไม่ถูกบันทึกลง audit trail เมื่อระบบ timeout ทำให้ rationale หาย ใกล้ go-live เพียง 1 สัปดาห์", "ประเมิน severity (audit-critical) เสนอ option อย่างน้อยที่ทำให้บันทึกได้ก่อน go-live และส่วนเสริมเป็น fast-follow พร้อม decision log", "เปิดก่อนแล้วค่อยแก้ทีหลังเพราะฟีลด์เล็ก", "เลื่อน go-live ทั้งหมดจนกว่าจะไม่มี issue เลย", "ให้ developer ตัดสินเองว่าทันแก้ไหม", "defect ที่กระทบ audit ต้องประเมิน severity และเสนอ minimum fix + fast-follow; เปิดเลยหรือเลื่อนหมดไม่สมดุลความเสี่ยง"],
      ["Compliance ประกาศเกณฑ์ใหม่ให้จับธุรกรรมข้ามช่องทาง (mobile + branch + remittance) ร่วมกัน หลัง requirement baseline ปิดไปแล้ว", "ทำ change impact analysis ต่อ rule, data source, model, test case และ in-flight alert แล้วเสนอ phase option ก่อน commit", "ใช้ requirement เดิมไปก่อนเพราะ baseline ปิดแล้ว", "retest ทั้งระบบใหม่โดยไม่ prioritize impact", "ให้ QA แปลเกณฑ์ใหม่เอง", "กฎใหม่ต้อง impact analysis + phase option ก่อน commit; ใช้ของเดิมหรือ retest ทั้งหมดสุดโต่งไม่จัดการ trade-off"],
      ["สถานะ alert ในระบบ AML กับสถานะบัญชีใน core banking ไม่ตรงกันหลังระงับบัญชี เพราะ sync ไม่ real-time ทำให้ analyst สับสนว่าดำเนินการถูกหรือไม่", "นิยาม interface contract, SLA sync, reconciliation report และ exception queue เมื่อสถานะขัดแย้งกัน", "ให้ analyst เช็ค manual ใน core ทุกครั้ง", "หยุดระงับบัญชีทุกเคสจนกว่า sync จะ real-time 100%", "ให้ทีม IT แก้ sync เองโดยไม่กำหนด contract", "สถานะข้ามระบบต้องมี contract + reconciliation + exception; manual check ทุกครั้งหรือหยุดระงับบัญชีไม่ใช่ทางแก้"],
      ["RM อยากให้ลูกค้า high-value ทำธุรกรรมได้ทันที แต่ Compliance ต้องการ enhanced due diligence ก่อน ทำให้ลูกค้ารอนานและ RM กดดันให้เร่ง", "แยก requirement ที่ต้อง control เข้มออกจากที่ปรับได้ กำหนด decision criteria/owner และบันทึก rationale เพื่อ resolve conflict อย่างโปร่งใส", "อนุมัติตาม RM เพราะเป็นลูกค้าใหญ่", "บังคับ enhanced due diligence ทุกเคสแม้ความเสี่ยงต่ำ", "ให้ sponsor ตัดสินโดยไม่มีข้อมูล risk", "conflict ต้องใช้ decision criteria + owner + rationale; เอาใจ RM หรือบังคับเคสเสี่ยงต่ำทั้งหมดไม่สมดุล"],
      ["ระบบ AML ต้องดึงข้อมูลจาก case management และ core banking แต่ field mapping และ trigger ยังไม่ชัด ทำให้บางเคสข้อมูลไม่ครบตอนสืบสวน", "นิยาม interface analysis: input/output, trigger, data mapping, error handling และ owner ของแต่ละ contract", "ให้ analyst ดึงข้อมูล manual จากแต่ละระบบ", "หยุดสืบสวนจนกว่าจะ merge ระบบทั้งหมดเป็น source เดียว", "ให้ vendor เป็นคน map field เอง", "integration ต้องมี contract ที่ชัด; manual pull ทุกครั้งหรือ merge ระบบทั้งหมดเกินไปและเสี่ยง"],
      ["ผู้บริหารขอให้ปิด alert ลูกค้าสำคัญโดยไม่ผ่านขั้นตอนมาตรฐาน และขอให้ไม่บันทึก override นี้ไว้", "ออกแบบ exception/override path ที่เร็วแต่ยังบันทึก approver, reason, evidence และ trigger review เสมอ", "ปิดตามคำขอและไม่บันทึกอะไรไว้", "ห้าม override ทุกกรณีแม้จะมีเหตุผล", "ให้ email approval แทนระบบถาวร", "override ต้องมีทางแต่ต้อง audit ได้; ปิดโดยไม่บันทึกคือช่องโหว่ ส่วนห้ามหมดทำให้ทำงานไม่ได้"],
      ["หลังใช้งานเครื่องมือ AML ใหม่ 6 เดือน ผู้บริหารถามว่าคุ้มไหม แต่ทีมมีแค่จำนวน alert ที่ปิด ไม่มี false positive rate หรือ risk event reduction", "เทียบ baseline กับ actual (false positive, time-to-STR, risk event, workload) แยกปัจจัยอื่น และรายงาน outcome ไม่ใช่ output", "รายงานจำนวน alert ที่ปิดเป็นความสำเร็จ", "รอใช้งานครบปีแล้วค่อยนิยาม metric", "ให้ vendor รายงานประสิทธิภาพของตัวเอง", "benefit realization ต้องใช้ outcome metric เทียบ baseline; นับ alert หรือรอนานเกินไปไม่พิสูจน์คุณค่า"],
      ["vendor ดูแล watchlist ล่าช้าส่งอัปเดต ทำให้ screening ใช้ข้อมูลเก่า แต่ SLA ด้านนี้ยังไม่ถูกติดตาม", "นิยาม vendor SLA, milestone, acceptance criteria, contingency (fallback list) และ risk owner ตั้งแต่ต้น", "รอ vendor ส่งแล้วค่อยแก้ทีหลัง", "ยกเลิก vendor ทันทีแล้วทำ watchlist เอง", "ให้ procurement ตัดสินเรื่องข้อมูลเทคนิค", "vendor dependency ต้องมี SLA + contingency + owner; รอหรือยกเลิกทันทีสุดโต่งทั้งคู่"],
      ["ธนาคารจะเปลี่ยน AML engine ใหม่ แต่มี alert เปิดอยู่หลายพันเคส และยังไม่มีแผน migrate สถานะและหลักฐานของเคสเหล่านั้น", "ออกแบบ cutover plan: data migration, mapping status, parallel run, freeze window, reconciliation และ rollback criteria", "เปิด engine ใหม่แล้วทิ้ง alert เก่าทั้งหมด", "เลื่อน cutover จนกว่าจะไม่มี alert เปิดเลย", "ให้ทีม IT ตัดสิน cutover คนเดียว", "cutover ต้อง migrate + reconcile + rollback; ทิ้งของเก่าหรือเลื่อนไปเรื่อย ๆ มีความเสี่ยงสูง"],
      ["engine ต้อง screening ธุรกรรม batch ให้จบภายใน cutoff ก่อนเปิดทำการวันถัดไป แต่ยังไม่มี requirement response time หรือ throughput ที่วัดได้", "ระบุ NFR ที่วัดได้: batch finish time, throughput peak, alert latency และ load test criteria", "ปล่อยไปก่อนแล้วค่อย tune หลัง go-live", "บังคับ spec ระดับ enterprise โดยไม่ดูความจำเป็นจริง", "ให้ infra ตั้งค่าตาม default", "cutoff ต้องมี NFR ที่วัดได้ + load test; ปล่อยไปก่อนหรือ over-spec ทั้งคู่ไม่รับประกันเวลาจบ"],
    ]),
    written("AML Alert Prioritization Hub", "ทีม AML Monitoring ของธนาคารมี alert ธุรกรรมต้องสงสัยเพิ่มขึ้นต่อเนื่องจาก rule ใหม่และพฤติกรรมลูกค้าที่เปลี่ยนไป ปัจจุบัน analyst ต้องเปิดหลายระบบเพื่อดู customer profile, transaction history, previous alert, RM note และ sanction screening result ทำให้ปิดเคสช้า บางเคสเสี่ยงสูงถูกตรวจช้ากว่าเคสปกติ ขณะที่ Compliance Manager ต้องพิสูจน์ได้ว่าทำไมบาง alert ถูก prioritize ก่อน และ auditor ต้องเห็นหลักฐานการตัดสินใจเมื่อปิดเคสหรือ escalate เป็น STR ระบบใหม่ควรช่วยจัดลำดับงาน ลด rework จากข้อมูลไม่ครบ และทำให้การตัดสินใจของ analyst โปร่งใสโดยไม่เปิดเผยข้อมูลเกินสิทธิ์", ["Risk-based alert queue", "Investigation evidence view", "RM information request", "STR escalation decision", "SLA and workload dashboard", "Case closure reason"], "alert score, customer risk, transaction history, sanction result, RM response, case status", "STR timeline, evidence retention, role access, maker-checker closure, audit trail", "AML Analyst, Compliance Manager, RM, Fraud, Legal, Audit, Operations"),
  ),
  exam(
    "corporate-payments",
    "ชุดที่ 4: Corporate Payment และ Maker-Checker",
    "Bulk upload, approval mandate, duplicate prevention, cutoff and reconciliation",
    "ชุดนี้จำลอง corporate portal ที่จ่ายเงินจำนวนมากและมี risk จากไฟล์ผิด, checker approve ผิด, cutoff, duplicate payment และ reconciliation",
    setMcqs("Corporate Bulk Payment", "ลูกค้ารายใหญ่ขู่ escalate เพราะ payroll ล่าช้า", "Corporate Customer, Maker, Checker, Corporate Admin, Operations, Risk, Core Banking และ Finance", [
      ["ลูกค้า corporate upload ไฟล์ payroll แต่ field delimiter และ decimal format ผิดจาก template ทำให้ batch ถูก reject ช้าเพราะ validation รายงานตอนปลายกระบวนการไม่ใช่ตอน upload", "เพิ่ม pre-validation ตอน upload พร้อมรายงาน error เป็น row-level, ตัวอย่าง template และ error code มาตรฐานก่อน submit", "ให้ Operations แก้ไฟล์ให้ลูกค้าเองทุกครั้ง", "reject ไฟล์ทั้งหมดที่มี error แม้เล็กน้อย", "ให้ทีม IT ตัดสินเรื่อง format เอง", "pre-validation row-level ลด reject ช้าและทำให้ลูกค้าแก้เองได้; การแก้ให้เองหรือ reject หมดไม่สมดุล workload/control"],
      ["ลูกค้า retry upload ไฟล์เดิมเพราะไม่เห็นสถานะชัด ทำให้ระบบ process จ่ายเงินซ้ำสองรอบ", "ใช้ idempotency key จากไฟล์ + checksum เพื่อตรวจ duplicate ก่อน process พร้อมแจ้งสถานะที่ชัดเจน", "ให้ checker เช็ค duplicate ด้วยสายตาทุกครั้ง", "บล็อก retry ทุกกรณีจนกว่าจะ confirm", "ให้ Finance ตัดสินเรื่อง duplicate ทีหลัง", "idempotency + สถานะชัดป้องกัน duplicate ที่ต้นเหตุ; การพึ่งสายตาหรือบล็อก retry ไม่ scale"],
      ["checker เห็นเพียงยอดรวมและจำนวนรายการ ไม่เห็นรายละเอียดผู้รับและวงเงิน ทำให้ approve ไฟล์ผิดได้", "แสดง risk view ให้ checker: รายการผิดปกติ, ผู้รับใหม่, วงเงินเกิน threshold พร้อมเหตุผลต้องอนุมัติ", "ให้ checker approve ตามยอดรวมเพราะเชื่อ maker", "บังคับ checker ดูทุกรายการในไฟล์ทุกครั้ง", "ให้ Corporate Admin approve แทน checker", "risk-based checker view ทำให้ตรวจจุดเสี่ยงได้โดยไม่ล้มด้วยปริมาณ; approve ตามยอดหรือดูทุกบรรทัดไม่ balance"],
      ["โครงสร้างบริษัทลูกค้ามีหลายระดับอำนาจ แต่ approval matrix ในระบบรองรับแค่ระดับเดียว ทำให้บาง batch ไม่มีผู้อนุมัติที่ถูกต้อง", "config approval matrix ตามโครงสร้างบริษัท: threshold, ระดับ, ผู้รับมอบ และเงื่อนไข escalate", "ให้ admin อนุมัติแทนทุกเคส", "ระงับ batch ทุกเคสที่ matrix ไม่ cover", "ให้ procurement ตัดสินเรื่อง matrix", "approval matrix ต้องยืดหยุ่นตามโครงสร้างลูกค้า; admin แทนหรือระงับหมดเป็นการข้าม control"],
      ["batch ที่ upload หลัง cutoff ถูก process วันถัดไปทำให้ value date ผิด แต่ลูกค้าไม่รู้จนกว่าจะเห็นยอด", "แสดง cutoff และ projected value date ตอน upload พร้อมตัวเลือก hold/urgent ที่มี approval", "ปล่อยให้ process ผิด value date แล้วแก้ทีหลัง", "ระงับ batch ทุกเคสที่เลย cutoff", "ให้ IT ตั้งค่า cutoff เอง", "cutoff + value date ต้องชัดตอน upload พร้อมทางเลือก; ปล่อยผิดหรือระงับหมดกระทบลูกค้า"],
      ["ยอดที่ portal แสดงกับยอดที่เข้า core banking ไม่ตรงกันหลัง timeout ทำให้ทีม support ไม่รู้สถานะจริง", "ทำ reconciliation report รายวัน + exception queue + status single source of truth ที่เชื่อมทั้งสองระบบ", "ให้ support บอกลูกค้าว่า 'รอตรวจสอบ' ทุกครั้ง", "หยุดรับ batch จนกว่าจะ sync real-time 100%", "ให้ Finance ตัดสินยอดทีหลัง", "reconciliation + single source ทำให้สถานะน่าเชื่อ; รอตรวจสอบทุกครั้งหรือหยุดรับ batch ไม่ใช่ทาง"],
      ["ลูกค้าขอเพิ่ม/แก้ beneficiary list ระหว่างวัน แต่ไม่มี approval ชัดว่าใครอนุมัติและเมื่อไรมีผล", "นิยาม beneficiary change flow: requester, approver, effective date, audit log และ notification ให้ผู้เกี่ยวข้อง", "ให้ maker แก้ beneficiary เองตามคำขอ", "ห้ามเปลี่ยน beneficiary ระหว่างวันทุกกรณี", "ให้ Corporate Admin ตัดสินทุกการเปลี่ยน", "beneficiary change ต้องมี approval + audit + effective date; แก้เองหรือห้ามเปลี่ยนเป็นช่องโหว่หรืออุดตัน"],
      ["ลูกค้าเห็น error code ที่แปลผิด เช่น 'duplicate' หมายถึงไฟล์ซ้ำไม่ใช่รายการซ้ำ ทำให้ลูกค้า retry ผิด", "ทำ error mapping ที่อธิบายได้ + คำแนะนำ action ถัดไป + status lifecycle ที่ชัด", "ให้ support แปล error ให้ลูกค้าเองทุกครั้ง", "ซ่อน error code ทั้งหมดจากลูกค้า", "ให้ IT ออก error code ใหม่เอง", "error mapping + lifecycle ทำให้ลูกค้าเข้าใจและ act ได้; พึ่ง support หรือซ่อน error สร้างความสับสน"],
      ["บางบริษัทให้คนเดียวเป็นทั้ง maker และ checker ทำให้ maker-checker ไม่มีผล แต่ลูกค้าอ้างว่าไม่มีคนพอ", "กำหนด segregation of duties เป็น default พร้อมทางเลือก fallback approval ที่มี evidence เมื่อทำจริงไม่ได้", "ยอมให้คนเดียวทำทั้งสองบทบาทเพราะลูกค้าบอกไม่มีคน", "บังคับต้องมีคนสองคนทุกกรณีแม้ลูกค้าทำไม่ได้", "ให้ Compliance ยกเว้นเป็นรายเคส", "SoD ต้องเป็น default พร้อม fallback ที่ audit ได้; ยอมคนเดียวหรือบังคับสองคนสุดโต่งไม่สมดุล"],
      ["payment engine retry รายการเมื่อ core banking timeout ทำให้รายการถูก post ซ้อนกันสองครั้งโดยไม่มี idempotency check", "ใช้ request/payment reference เป็น idempotency key ที่ core ตรวจก่อน post + reconciliation ทุกรอบ", "ให้ Finance ตัดยอดซ้อนทีหลัง", "หยุด retry ทุกครั้งจนกว่าจะได้ response", "ให้ IT แก้ retry logic เอง", "idempotency ที่ต้นน้ำป้องกัน duplicate ดีกว่าตัดยอดทีหลัง; หยุด retry ทำให้รายการค้าง"],
      ["ลูกค้ารายใหญ่ส่ง batch หลายหมื่นรายการทำให้ processing เกิน cutoff และกระทบ batch ของลูกค้าอื่น", "กำหนด NFR throughput, batching window, ลำดับ priority และ SLA ต่อขนาด batch พร้อม load test", "ปล่อยให้ลูกค้าใหญ่ส่งเท่าไรก็ได้", "จำกัดขนาด batch เล็กจนลูกค้าใหญ่ใช้ไม่ได้", "ให้ infra เพิ่ม capacity โดยไม่กำหนด SLA", "NFR + priority + SLA ต่อขนาด batch ทำให้ยุติธรรมและทัน cutoff; ปล่อยหรือจำกัดสุดโต่งไม่ work"],
      ["batch มี beneficiaries หลายรายที่ต้อง sanction screening แต่ screening แบบ synchronous ทำให้ batch ช้าและบางรายการ hit ต้องรอ manual", "ออกแบบ screening แบบ async: แยก hit ออกเป็น exception queue พร้อม maker-checker และ release ส่วนที่ผ่าน", "ข้าม screening เพื่อให้ทัน payroll", "หยุด batch ทั้งไฟล์ถ้ามี hit แม้หนึ่งราย", "ให้ Compliance เห็นทุกรายการ manual", "async screening + exception queue ทำให้ทันเวลาและยังคุม control; ข้ามหรือหยุดทั้งไฟล์สุดโต่ง"],
      ["ลูกค้าขอ override cutoff เพื่อจ่าย payroll ด่วน โดยอ้างว่าล่าช้าจากฝั่งระบบ แต่ไม่มีเส้นทางอนุมัติ exception", "ออกแบบ exception cutoff path: เหตุผล, approver, risk note, audit log และผลกระทบ downstream", "ยอม override ทุกครั้งที่ลูกค้าด่วน", "ปฏิเสธ exception ทุกกรณี", "ให้ผู้บริหารตัดสินเป็นรายเคสโดยไม่มีเกณฑ์", "exception path ที่ audit ได้ดีกว่ายอมหรือปฏิเสธสุดโต่ง; การไม่มีเกณฑ์ทำให้ตัดสินไม่สม่ำเสมอ"],
      ["ธนาคารเปลี่ยน file template version ใหม่ แต่ยังไม่แจ้งและทดสอบกับลูกค้า ทำให้ไฟล์เก่า reject หมดวันเปิดใช้", "วางแผน versioning: notice, overlap window, sandbox test, migration support และ deprecation timeline", "บังคับใช้ version ใหม่ทันที", "รองรับทุก version ตลอดไป", "ให้ IT แจ้งลูกค้าเอง", "versioning + overlap ทำให้ย้ายได้ไม่กระทบ; บังคับทันทีหรือรองรับทุก version ไม่ยั่งยืน"],
      ["auditor ขอหลักฐานว่าใคร approve batch และเห็นอะไรตอน approve แต่ระบบเก็บแค่ 'approved' ไม่มี snapshot", "เก็บ approval evidence: approver, timestamp, snapshot รายการสำคัญ, reason และ version ที่ approve", "บอก auditor ว่ามี log ก็พอ", "บังคับ screenshot manual ทุก approval", "ให้ auditor ดึงจาก database เอง", "approval evidence + snapshot ทำให้ audit ได้; log อย่างเดียวหรือ screenshot manual ไม่พอ"],
      ["batch มีรายการผิดไม่กี่บรรทัด แต่ระบบ reject ทั้งไฟล์ทำให้ payroll ที่ถูกต้องถูกตัดไปด้วย", "ออกแบบ partial accept: ประมวลผลรายการที่ผ่าน, แยก rejected row เป็น exception พร้อมเหตุผล", "ประมวลผลทั้งหมดแล้วแก้ทีหลัง", "reject ทั้งไฟล์ทุกครั้งที่มี error", "ให้ maker ตัดสินเองว่าจะเอาอะไร", "partial accept + exception ลดกระทบลูกค้า; ประมวลผลหมดหรือ reject หมดทั้งคู่เสี่ยง"],
      ["ระบบ portal ส่ง batch ไป payment engine แล้ว forward ไป core แต่ trigger และ status mapping ไม่ตรง ทำให้บางเคสค้างโดยไม่รู้", "นิยาม interface contract ทั้งสอง segment: trigger, payload, status mapping, error handling และ owner", "ให้ support track manual ข้ามระบบ", "merge ทั้งสามระบบเป็นเดียวก่อน", "ให้ vendor map เอง", "contract ข้าม segment ทำให้ track ได้; manual track หรือ merge ทั้งหมดเกินจำเป็น"],
      ["batch cross-border มี FX rate และ fee ที่ลูกค้าไม่เห็นตอน upload ทำให้ยอดที่หักไม่ตรงความคาดหมาย", "แสดง indicative FX + fee breakdown ตอน preview พร้อมเงื่อนไข rate lock และ disclaimer", "คิด fee ทีหลังแล้วแจ้ง", "บังคับ confirm rate ทุกรายการทีละรายการ", "ให้ Treasury ตั้ง fee เอง", "preview FX + fee ทำให้โปร่งใน; คิดทีหลังหรือ confirm ทีละรายการไม่ practical"],
      ["หลังเปิด portal bulk payment ใหม่ ผู้บริหารถามว่าลดงาน Operations จริงไหม แต่ไม่มี baseline ก่อนเปิด", "เทียบ baseline (manual handling, reject rate, turnaround) กับ actual และรายงาน outcome", "รายงานจำนวนไฟล์ที่ process เป็นความสำเร็จ", "รอปีถัดไปค่อยวัด", "ให้ vendor รายงาน", "benefit realization ต้องมี baseline + outcome; นับไฟล์หรือรอนานไม่พิสูจน์คุณค่า"],
      ["ลูกค้าขอจ่ายเงินฉุกเฉินนอก approval matrix เช่น vendor วิกฤต แต่ไม่มีเส้นทาง emergency ที่ audit ได้", "ออกแบบ emergency payment path: เหตุผล, ผู้อนุมัติระดับสูง, จำกัดวงเงิน, post-review และ audit log", "ให้ admin อนุมัติทุก emergency เอง", "ปฏิเสธ emergency ทุกกรณี", "ให้ maker ตัดสินเอง", "emergency path ที่ audit ได้ปลอดภัยกว่า; admin อนุมัติเองหรือปฏิเสธหมดเสี่ยงหรืออุดตัน"],
    ]),
    written("Corporate Bulk Payment Control Center", "ธนาคารให้ลูกค้า corporate ส่งไฟล์จ่ายเงินจำนวนมากผ่าน portal โดยมี maker เป็นผู้ upload และ checker เป็นผู้อนุมัติ รายการอาจเป็น payroll, vendor payment หรือ interbank transfer ปัญหาปัจจุบันคือไฟล์ผิด format ถูก reject ช้า checker เห็นข้อมูลสรุปไม่พอจน approve ผิดไฟล์ มี duplicate upload จากการ retry รายการหลัง cutoff ถูก process ผิด value date และเมื่อ core banking timeout ทีม support ไม่รู้ว่าสถานะจริงคืออะไร ระบบใหม่ต้องช่วย validate ก่อน submit แสดง risk ให้ checker เห็นชัด ป้องกัน duplicate payment บังคับ approval ตาม mandate และทำ reconciliation หลังส่ง core ได้", ["Payment file pre-validation", "Checker risk review", "Approval mandate configuration", "Duplicate file prevention", "Cutoff and value date handling", "Core posting reconciliation"], "batch file, beneficiary, amount, approval matrix, cutoff calendar, posting status", "maker-checker, idempotency, audit trail, approval limit, reconciliation, exception queue", "Corporate Customer, Maker, Checker, Corporate Admin, Operations, Risk, Finance, IT"),
  ),
  exam(
    "loan-origination",
    "ชุดที่ 5: Loan Origination และ Credit Approval",
    "Document checklist, waiver, scoring, collateral, SLA and benefit tracking",
    "ชุดนี้เน้นสินเชื่อ SME ที่ rework สูงเพราะเอกสาร/ข้อมูลไม่ครบ rule แตกตาม product และ approval SLA ไม่ชัด",
    setMcqs("SME Loan Origination", "ผู้บริหารต้องการลด turnaround time จาก 5 วันเหลือ 2 วัน", "RM, Credit Analyst, Collateral, Risk, Product, Operations, Customer และ Data Warehouse", [
      ["RM ส่งใบสมัครสินเชื่อที่เอกสารไม่ครบ แต่ checklist แต่ละ product ต่างกันและเก็บในไฟล์ Excel ทำให้ Credit return case หลายรอบเพราะไม่รู้ว่าของ product นี้ต้องมีอะไร", "สร้าง dynamic document checklist ตาม product, customer type, collateral และ campaign ที่บอก RM ได้ตอนกรอกว่ายังขาดอะไร", "ให้ Credit ส่งคืนแล้วบอกเองทีละข้อ", "บังคับเอกสารครบทุก product แม้ตัวที่ไม่เกี่ยวข้อง", "ให้ RM ใช้ checklist เดิมต่อไป", "dynamic checklist ลด return ที่ต้นเหตุ; ส่งคืนทีละข้อหรือบังคับครบทุก product ชะลองาน"],
      ["RM ขอ waives เอกสารบางชนิดเพราะลูกค้าเป็นรายเก่า แต่ไม่มีหลักฐาน approval และไม่ชัดว่าผู้อนุมัติคือใคร", "กำหนด waiver flow: eligibility, approver, reason code, evidence และ retention พร้อมตรวจสอบย้อนได้", "ยอม waive ตาม RM เพราะเป็นลูกค้าเก่า", "ห้าม waiver ทุกกรณี", "ให้ Credit ตัดสินเองทีละเคส", "waiver ต้องมี flow ที่ audit ได้; ยอมเองหรือห้ามหมดเสี่ยง/อุดตัน"],
      ["credit scoring ปฏิเสธเคสที่ RM มองว่าน่าลงทุน แต่ RM ไม่เข้าใจเหตุผลของ score และอยากขอ exception", "เปิด score reason code ที่อธิบายได้ + exception flow ที่มี approver และ rationale", "ยอมข้าม score ตาม RM", "ถือว่า score ถูกเสมอปฏิเสธทุก exception", "ให้ Risk ตัดสินเองคนเดียว", "score reason + exception flow ทำให้โปร่งใส; ข้ามหรือปฏิเสธหมดไม่สมดุล"],
      ["collateral valuation หมดอายุระหว่างพิจารณาเคส แต่ระบบไม่แจ้ง ทำให้อนุมัติด้วยมูลค่าเก่าและเสี่ยง LTV", "เชื่อม collateral validity กับ workflow: แจ้ง expiry, ขอ re-appraisal และ hold การอนุมัติจนกว่าจะครบ", "อนุมัติด้วย valuation เก่าเพราะเคยประเมินแล้ว", "ระงับเคสทุกเรื่องที่ valuation เก่า", "ให้ Collateral ตัดสินเอง", "validity + workflow ป้องกัน LTV ผิด; อนุมัติของเก่าหรือระงับหมดเสี่ยง/ช้า"],
      ["campaign pricing ใหม่ทำให้ rate และ fee เปลี่ยน แต่ requirement และ report downstream ยังใช้ rule เก่า ทำให้ตัวเลขคำนวณผิด", "ทำ change impact analysis ต่อ pricing engine, disclosure, report และ in-flight case ก่อนเปิด campaign", "เปิด campaign ทันทีแล้วแก้ report ทีหลัง", "เลื่อน campaign จนกว่าจะอัปเดตครบทุกระบบ", "ให้ Marketing ตัดสินเอง", "impact analysis + phase ปลอดภัยกว่า; เปิดเลยหรือเลื่อนหมดกระทบธุรกิจ"],
      ["ลูกค้าถามสถานะเคสบ่อยเพราะไม่เห็นว่าค้างที่ใคร ทำให้ RM และ Call Center เหนื่อยและลูกค้าไม่พอใจ", "สร้าง case status view ที่ลูกค้า/RM เห็นขั้นตอน ผู้ดูแลและ action ถัดไปจาก source เดียว", "ให้ RM โทรตามทีมอื่นเอง", "รอ report ประจำสัปดาห์แล้วแจ้งลูกค้า", "ให้ Call Center ตอบตามข้อมูลที่มี", "status visibility ลดการตามและเพิ่มความพอใจ; โทรเองหรือรอ report ช้า"],
      ["return rate สูงแต่ไม่มีการวิเคราะห์ root cause ทำให้ปัญหาซ้ำ ทีมต่างโทษกันไปมา", "รวบรวม return reason มาตรฐาน, วิเคราะห์ root cause และแจ้งฝ่ายที่เกี่ยวข้องพร้อม action", "โทษ RM ทุกครั้งที่ return", "รอให้ return ลดเองโดยไม่วิเคราะห์", "ให้ QA ตรวจเอาหลัง incident", "root cause analysis ลดปัญหาซ้ำ; โทษหรือปล่อยไปไม่แก้ที่ต้นเหตุ"],
      ["Sales กดดันให้อนุมัติเร็วเพื่อทัน target แต่ Credit Policy ยืนกระบวนการบางขั้น ทำให้เกิด conflict", "นิยาม SLA ควบ quality gate: sampling, exception approval และ metric ที่วัดทั้งความเร็วและคุณภาพ", "เน้นความเร็วเพราะ target สำคัญ", "บังคับทุกขั้นตอนแม้ SLA พัง", "ให้ RM ตัดสินเองว่าจะข้ามขั้นใด", "SLA + quality gate สมดุล; เร็วอย่างเดียวหรือบังคับทุกขั้นเสี่ยง NPL"],
      ["ทีม Sales และ Risk ใช้นิยามรายได้ต่างกัน (gross vs net) ทำให้ DSR และวงเงินอนุมัติไม่ตรงกัน", "นิยาม data dictionary ของรายได้ร่วมกัน + validation ที่ใช้นิยามเดียวในทุกระบบ", "ให้แต่ละทีมใช้นิยามของตนต่อไป", "บังคับใช้นิยามเดียวทันทีโดยไม่ migrate", "ให้ Data Warehouse ตัดสินเอง", "data dictionary ร่วมลดความขัดแย้ง; ปล่อยหรือบังคับทันทีทำให้ตัวเลขผิด"],
      ["loan origination ต้องดึง credit bureau score แต่ connector ช้าและ field mapping ไม่ตรง ทำให้ score หายในบางเคส", "นิยาม interface contract: trigger, timeout, field mapping, fallback และ error handling", "ให้ RM กรอก score manual เอง", "หยุดรับเคสจนกว่า connector จะ real-time", "ให้ vendor แก้เอง", "contract + fallback ทำให้ score ไม่หาย; manual หรือหยุดหมดเสี่ยง"],
      ["คำขอค้างที่บางขั้นตอนเช่น collateral review โดยไม่มี SLA escalation ทำให้เคสเสี่ยงสูงค้างนาน", "กำหนด SLA ต่อขั้นตอน + escalation path + bottleneck dashboard ที่มองเห็น", "ปล่อยให้ทีมไล่เองตามลำดับ", "หยุดรับเคสใหม่จนกว่าเก่าจะหมด", "ให้ผู้บริหารไล่เอง", "SLA + escalation ทำให้เคสไม่ค้าง; ไล่เองหรือหยุดรับไม่ scale"],
      ["ลูกค้าถูกปฏิเสธแต่เห็นข้อความกว้าง ๆ ทำให้โทรถามและร้องเรียน ขณะที่ Compliance ไม่อยากเปิด rule", "กำหนด reject reason category ที่สื่อสารได้ + internal reason สำหรับ agent + masking", "แสดง rule ทั้งหมดให้ลูกค้าเพื่อความโปร่งใส", "ซ่อนเหตุผลทั้งหมด", "ให้ Call Center เดาเอง", "reason category + internal detail สมดุลโปร่งใสและ control; เปิดหมดหรือซ่อนหมดสุดโต่ง"],
      ["มี requirement ที่อยาก reuse จาก product เดิมแต่บริบท collateral และ policy ต่างกัน ทำให้นำมาใช้แล้วผิด", "ตรวจ source, rationale, acceptance criteria กับบริบทใหม่ก่อน reuse พร้อมปรับ", "copy requirement เดิมทั้งหมดเพราะเคยใช้แล้ว", "เขียน requirement ใหม่ทั้งหมดโดยไม่ reuse", "ให้ Product ตัดสินเอง", "reuse + validate ประหยัดและปลอดภัย; copy ตามหรือเขียนใหม่หมดเสี่ยง"],
      ["ตอน UAT พบว่า scoring rule เปลี่ยนหลัง baseline ทำให้ test case บางส่วนไม่ครอบผลลัพธ์ใหม่ ใกล้ go-live", "ทำ impact analysis ต่อ rule, test, disclosure และ in-flight case แล้วเสนอ retest เฉพาะส่วนกระทบ", "ใช้ rule เดิมเพราะ UAT จบแล้ว", "retest ทั้งระบบใหม่", "ให้ QA แปล rule เอง", "impact-based retest สมดุล; ใช้ของเดิมหรือ retest หมดเสี่ยง"],
      ["KYC ของลูกค้าหมดอายุระหว่างพิจารณาเคส แต่ระบบไม่ตรวจ ทำให้อนุมัติด้วย KYC ที่ไม่สมบูรณ์", "เชื่อม KYC validity กับ workflow ที่แจ้งและขอ refresh ก่อนอนุมัติ", "อนุมัติต่อเพราะเคยยืนยันแล้ว", "ระงับเคสทุกเรื่องที่ KYC ใกล้หมดอายุ", "ให้ Compliance ตัดสินเอง", "KYC validity + workflow ป้องกันช่องโหว่; อนุมัติต่อหรือระงับหมดเสี่ยง"],
      ["ลูกค้าขอกู้ร่วม (co-borrower) แต่ flow ออกแบบไว้คนเดียว ทำให้ consent และความรับผิดไม่ครบทั้งสอง", "ออกแบบ joint application: consent, KYC, obligation แยกแต่ละบุคคลพร้อมเชื่อมความสัมพันธ์", "เก็บ consent จากคนเดียวแล้วถือว่าครบ", "บังคับเข้าสาขาทุกเคสร่วม", "ให้ Legal ตัดสินเอง", "joint flow แยกบุคคลปลอดภัย; consent คนเดียวหรือบังคับสาขาไม่สมดุล"],
      ["ลูกค้าขอยกเว้นหลักฐานรายได้เพราะเป็นอาชีพอิสระ แต่ไม่มี exception path ที่ชัด", "กำหนด exception flow: alternative evidence, approver, risk note และ audit log", "ยอมรับเอกสารไม่ครบเพราะเป็นลูกค้าพิเศษ", "ปฏิเสธเคสอาชีพอิสระทุกเรื่อง", "ให้ RM ตัดสินเอง", "exception path ที่มี evidence สมดุล; ยอมเองหรือปฏิเสธหมดกระทบธุรกิจ"],
      ["หลังใช้ scoring workflow ใหม่ 6 เดือนผู้บริหารถามว่าลด turnaround จริงไหม แต่ไม่มี baseline", "เทียบ baseline (turnaround, return rate, NPL) กับ actual และรายงาน outcome", "รายงานจำนวนเคสที่อนุมัติเป็นความสำเร็จ", "รอปีถัดไปค่อยวัด", "ให้ vendor รายงาน", "baseline + outcome พิสูจน์คุณค่า; นับเคสหรือรอนานไม่พิสูจน์"],
      ["ธนาคารจะเปลี่ยน scoring engine ใหม่ แต่มีเคส in-flight และ historical score ที่ต้อง map", "ออกแบบ cutover: migration, score mapping, parallel run, freeze window และ rollback", "เปิด engine ใหม่แล้วเริ่มนับใหม่", "เลื่อนจนกว่าเคสเก่าจะปิดหมด", "ให้ IT ตัดสิน cutover คนเดียว", "cutover + mapping ปลอดภัย; เริ่มใหม่หรือเลื่อนเสี่ยงข้อมูล"],
      ["scoring batch ต้องจบภายใน SLA เพื่อไม่ให้ block คิดอนุมัติ แต่ยังไม่มี NFR response time ที่วัดได้", "ระบุ NFR: batch finish time, concurrency, และ load test ตาม peak volume", "ปล่อยไปก่อนแล้วค่อย tune", "บังคับ spec enterprise โดยไม่ดูจริง", "ให้ infra ตั้งค่า default", "NFR + load test รับประกัน SLA; ปล่อยหรือ over-spec ไม่รับประกัน"],
    ]),
    written("SME Loan First-Time-Right Platform", "ธนาคารต้องการลด rework ในกระบวนการสินเชื่อ SME เพราะ RM มักส่งใบสมัครพร้อมเอกสารไม่ครบ เอกสารที่ต้องใช้ขึ้นกับ product, customer type, collateral, campaign และ risk condition Credit Analyst ต้อง return case หลายรอบ ทำให้ turnaround time ยาว ลูกค้าไม่รู้ว่าเคสค้างตรงไหน และผู้บริหารไม่เห็น root cause ของ SLA breach นอกจากนี้ waiver บางเอกสารทำได้แต่ไม่มี approval evidence ชัดเจน ระบบใหม่ควรช่วย RM รู้ checklist ที่ถูกต้องก่อน submit, ให้ Credit เห็นข้อมูลครบ, จัดการ waiver อย่างโปร่งใส และวัดผลว่าลด rework ได้จริง", ["Dynamic document checklist", "Document waiver workflow", "Credit scoring exception", "Collateral validity check", "Approval SLA escalation", "Customer/RM case status"], "product, customer type, document status, collateral value, score reason, waiver evidence", "approval matrix, audit trail, credit policy, exception reason, SLA escalation, data lineage", "RM, Credit Analyst, Risk, Collateral, Product, Operations, Customer, Management"),
  ),
  exam(
    "mobile-card-journey",
    "ชุดที่ 6: Mobile Banking, Transfer Status และ Card Journey",
    "Unknown status, duplicate prevention, card delivery, dispute and notification",
    "ชุดนี้เน้น customer journey ที่ดูเหมือน UX แต่จริง ๆ ต้องเชื่อม status, core posting, operations และ risk control",
    setMcqs("Mobile Transfer and Card Journey", "ฝ่าย CX ต้องการลด complaint อย่างเร็ว", "Customer, Digital, Core Banking, Card Operations, Call Center, Risk, Dispute และ IT", [
      ["ลูกค้าโอนเงินแล้ว network หลุดกลางทาง ทำให้ไม่รู้ว่ารายการสำเร็จหรือไม่ หน้าจอแสดงสถานะคลุมเครือ", "ออกแบบ status lifecycle ที่ query สถานะจริงจาก core/card และแสดง recovery state พร้อม action ถัดไป", "บอกลูกค้าว่ารอตรวจสอบทุกครั้ง", "บังคับลูกค้าโทร Call Center เท่านั้น", "ให้ทีมเทคนิคตั้งค่า status เอง", "status lifecycle + recovery ทำให้ลูกค้าเข้าใจและ act ได้; รอตรวจสอบหรือโทรเท่านั้นช้าและน่าหงุดหงิด"],
      ["ลูกค้ากดโอนซ้ำเพราะไม่แน่ใจว่ารายการแรกสำเร็จ ทำให้โอนเงินซ้อนสองรอบ", "ใช้ idempotency key บน transfer + แสดงสถานะล่าสุดก่อนยืนยันรอบสอง", "ให้ Call Center ตัดยอดซ้อนทีหลัง", "บล็อก retry ทุกครั้งจนกว่าจะ confirm", "ให้ Risk ตัดสินเอง", "idempotency + สถานะล่าสุดป้องกัน duplicate; ตัดทีหลังหรือบล็อก retry ไม่ตอบโจทย์ UX"],
      ["ลูกค้าสมัครบัตร debit แล้วไม่รู้ว่าบัตรส่งถึงไหนและเมื่อไร ทำให้โทรถามและเสียประสบการณ์", "เชื่อม card order กับ courier status แสดง ETA และ action ถ้าล่าช้า", "บอกลูกค้าว่ารอ 7 วันทุกครั้ง", "ส่ง SMS ทุกขั้นตอนจนรบกวน", "ให้ Card Ops ตอบเองทีละเคส", "tracking + ETA ลดการตาม; ตอบตายตัวหรือ SMS รัว ๆ ไม่ดี"],
      ["ลูกค้าแจ้ง dispute รายการบัตรแต่แนบหลักฐานไม่ครบและไม่ชัดว่าต้องส่งอะไร ทำให้เคสล่าช้า", "ออกแบบ dispute intake: required evidence, reason code, SLA และ status ที่ติดตามได้", "รับแจ้งทุกอย่างแล้วค่อยขอเพิ่มทีหลัง", "ปฏิเสธเคสที่หลักฐานไม่ครบทันที", "ให้ Dispute ตัดสินเอง", "intake + evidence checklist + SLA ทำให้เคสเดิน; รับหมดหรือปฏิเสธหมดสุดโต่ง"],
      ["ลูกค้าดาวน์โหลด receipt ไม่ได้เพราะลิงก์หมดอายุและไม่มีทางขอใหม่ ทำให้ต้องโทรขอ", "ออกแบบ receipt ที่ regenerate ได้ + retention ตาม policy + access control", "ให้ Call Center ส่ง receipt เองทุกครั้ง", "เก็บ receipt ตลอดไปไม่จำกัด", "ให้ทีมเทคนิคลบลิงก์เก่า", "regenerate + retention สมดุลความสะดวกและกฎ; ส่งเองหรือเก็บตลอดไปไม่ดี"],
      ["ลูกค้าเปิดใช้บัตรใหม่ไม่สำเร็จเพราะ activation ผูกกับ branch verification ที่ยังไม่ sync", "เชื่อม activation กับ verification status แบบ real-time พร้อมแจ้งขั้นตอนที่ค้าง", "ให้ลูกค้าไปสาขาทุกเคส", "เปิดใช้ทันทีโดยไม่ตรวจ", "ให้ Card Ops เปิดเอง", "sync + แจ้งขั้นตอนค้างดีกว่า; บังคับสาขาหรือเปิดเลยเสี่ยง"],
      ["ลูกค้าแจ้งบัตรหาย แต่สถานะ block ใน card system กับ core ไม่ sync ทำให้ลูกค้ายังทำธุรกรรมได้ชั่วคราว", "นิยาม block flow + interface contract + reconciliation ที่ยืนยัน block ทั้งสองระบบ", "ให้ลูกค้ารอ block ทำงานเอง", "block บัญชีทุกบัตรทันที", "ให้ Fraud ตัดสินเอง", "block + reconciliation ปิดช่องว่าง; รอเองหรือ block หมดสุดโต่ง"],
      ["ลูกค้าขอปรับวงเงินผ่าน app แต่ไม่รู้เกณฑ์และไม่ชัดว่าต้องรออนุมัติ ทำให้คาดหวังผิด", "แสดง eligibility + approval flow + ETA ตอนขอปรับวงเงิน", "อนุมัติทันทีเพราะเป็นลูกค้าดี", "ปฏิเสธคำขอทุกอย่างจนกว่าจะตรวจ", "ให้ Credit ตัดสินเอง", "eligibility + flow ตั้งความคาดหวัง; อนุมัติเลยหรือปฏิเสธหมดไม่สมดุล"],
      ["ลูกค้าไม่ได้รับ OTP ทำให้ทำธุรกรรมไม่ได้และคิดว่าระบบพัง ทั้งที่ปัญหาอยู่ที่ channel ส่ง", "ออกแบบ OTP fallback channel + สถานะการส่งที่ตรวจได้ + retry ที่ปลอดภัย", "บอกลูกค้าให้รอแล้วลองใหม่", "ส่ง OTP หลาย channel พร้อมกันทุกครั้ง", "ให้ Call Center ส่ง OTP เอง", "fallback + status แก้ปัญหาจริง; รอหรือส่งหลาย channel ไม่แก้ที่ต้นเหตุ"],
      ["สถานะรายการใน mobile กับ core/card ไม่ตรงหลัง delay ทำให้ Call Center ตอบลูกค้าไม่ถูก", "สร้าง support view ที่ดึงจาก single source พร้อม reconciliation และ exception queue", "ให้ Call Center ดูหลายระบบเอง", "หยุดรับธุรกรรมจนกว่าจะ sync 100%", "ให้ Finance ตัดสินยอด", "single source + support view ทำให้ตอบถูก; ดูเองหรือหยุดรับไม่ practical"],
      ["ธุรกรรมที่ถูก hold เพราะ fraud rule ไม่มี exception path ที่ลูกค้าพอใจ ทำให้รอนานและร้องเรียน", "ออกแบบ hold review flow: reason, SLA, maker-checker, customer message และ release path", "ปล่อยทุก hold ทันทีเพื่อรักษา CX", "ห้าม release จนกว่าจะตรวจ 100%", "ให้ Risk ตัดสินเอง", "hold review flow สมดุล CX และ risk; ปล่อยหรือห้าม release สุดโต่ง"],
      ["ลูกค้าเห็น error กว้าง ๆ เช่น 'ไม่สามารถทำรายการได้' ทำให้ไม่รู้จะแก้ยังไงและโทรถาม", "ทำ error mapping + คำแนะนำ action + status ที่เข้าใจได้", "ซ่อน error ทั้งหมดเพื่อความปลอดภัย", "แสดง technical stack trace ให้ลูกค้า", "ให้ IT แก้ error ใหม่เอง", "error mapping + action ลดการติดต่อ; ซ่อนหรือแสดง technical สุดโต่ง"],
      ["CX อยากปล่อยธุรกรรมเร็ว แต่ Risk อยาก hold ตรวจ fraud มากขึ้น ทำให้ conflict เรื่องความเร็ว", "แยก use case ตาม risk tier + decision criteria + metric ที่วัดทั้ง CX และ fraud loss", "เน้น CX เพราะ complaint สำคัญ", "เน้น Risk จน CX แย่", "ให้ผู้บริหารตัดสินเอง", "risk tier + criteria สมดุล; CX หรือ Risk อย่างเดียวไม่ยั่งยืน"],
      ["mobile สื่อสารกับ card system และ core แต่ trigger และ field mapping ไม่ครบ ทำให้บางธุรกรรมค้าง", "นิยาม interface contract ทั้ง segment: trigger, payload, status, error และ owner", "ให้ support track manual", "merge ระบบเป็นเดียวก่อน", "ให้ vendor map เอง", "contract ข้าม segment ทำให้ track ได้; manual หรือ merge เกินจำเป็น"],
      ["ช่วงโปรโมชัน transaction peak สูง แต่ยังไม่มี NFR response time/concurrency ที่ทดสอบ", "กำหนด NFR + load test ตาม peak + auto-scale trigger", "ปล่อยไปแล้วค่อย tune ตอนพัง", "over-provision ตลอดเวลาโดยไม่ดูจริง", "ให้ infra ตั้ง default", "NFR + load test รับมือ peak; ปล่อยหรือ over-provision ไม่คุ้ม"],
      ["หลังเปิดฟีเจอร์ status แบบ real-time ผู้บริหารถามว่าลด complaint จริงไหม แต่ไม่มี baseline", "เทียบ baseline (complaint, repeat call, CSAT) กับ actual และรายงาน outcome", "รายงานจำนวนผู้ใช้ฟีเจอร์เป็นความสำเร็จ", "รอปีถัดไปค่อยวัด", "ให้ vendor รายงาน", "baseline + outcome พิสูจน์คุณค่า; นับผู้ใช้หรือรอนานไม่พิสูจน์"],
      ["จะเปิด flow โอนเงินแบบใหม่ แต่ผู้ใช้ยังไม่คุ้น คู่มือและ FAQ ไม่พร้อม", "วางแผน change: comms, FAQ, in-app guide, super-user และ rollback", "เปิดเลยแล้วให้ผู้ใช้ชินเอง", "รออบรมครบ 100% ก่อนค่อยเปิด", "ให้ Digital สื่อสารเอง", "change plan ลดสับสน; เปิดเลยหรือรอ 100% กระทบการใช้งาน"],
      ["ตอน UAT พบว่า status ไม่ update real-time เพราะ cache ทำให้ลูกค้าเห็นข้อมูลเก่า ใกล้ go-live", "ประเมิน severity (CX-critical) เสนอ fix ขั้นต่ำ + fast-follow พร้อม decision log", "เปิดก่อนเพราะเป็นเรื่องเล็ก", "เลื่อน go-live ทั้งหมด", "ให้ developer ตัดสินเอง", "severity-based fix + fast-follow สมดุล; เปิดเลยหรือเลื่อนหมดสุดโต่ง"],
      ["หลัง go-live incident โอนเงินไม่มี owner ชัด ทำให้ลูกค้ารอนานและส่งต่อกันไม่ได้", "จัดทำ runbook, incident SLA, on-call rota และ handoff sign-off", "ส่งมอบแล้วปล่อยให้ helpdesk จัดการเอง", "รักษาทีมโครงการไว้จนกว่าจะไม่มี incident", "ให้ IT รับเรื่องทั้งหมด", "runbook + ownership ทำให้ incident แก้เร็ว; ปล่อยหรือรักษาทีมไม่ยั่งยืน"],
      ["ลูกค้าเห็นรายการใน statement ที่ไม่รู้จักและคิดว่าเป็น fraud ทั้งที่จริง ๆ เป็น fee หรือ merchant name ที่ไม่ชัด ทำให้เปิด dispute ผิดเยอะ", "แสดง merchant name/category, fee breakdown และ receipt link ที่ชัดเจนใน statement", "ปล่อยให้ลูกค้า dispute แล้วค่อยอธิบายทีหลัง", "ซ่อน fee และ merchant detail เพื่อความเรียบ", "ให้ Card Ops ตอบเองทีละเคส", "merchant/fee clarity ลด dispute ผิด; ปล่อยหรือซ่อน detail ทำให้ complaint เพิ่ม"],
    ]),
    written("Mobile Transaction Status and Card Service Hub", "Mobile banking ของธนาคารเพิ่มบริการ self-service เช่น โอนเงิน ดาวน์โหลด receipt สมัครบัตร debit ปรับวงเงิน และแจ้ง dispute แต่ complaint เพิ่มเพราะลูกค้าไม่เห็นสถานะชัดเจนเมื่อ network หลุดหรือ core/card system ตอบช้า บางคนทำรายการซ้ำ บางคนไม่รู้ว่าบัตรจะส่งเมื่อไร Call Center เห็นข้อมูลไม่เท่ากับลูกค้า และ Operations ต้องตาม exception จากหลายระบบ ระบบใหม่ควรทำให้ลูกค้าเห็นสถานะที่เชื่อถือได้ ลด duplicate transaction แสดง next action ที่ชัด และให้ทีม support/reconciliation ทำงานต่อได้", ["Transfer status recovery", "Duplicate transfer prevention", "Debit card delivery tracking", "Dispute case intake", "Receipt download", "Support and reconciliation view"], "transaction reference, idempotency key, card order, courier status, dispute reason, posting status", "customer authentication, audit trail, duplicate control, data masking, reconciliation, SLA", "Customer, Digital, Call Center, Card Ops, Core Banking, Risk, Dispute, Finance"),
  ),
  exam(
    "treasury-trade",
    "ชุดที่ 7: Treasury, FX Booking และ Trade Finance",
    "Rate validity, treasury exposure, trade document, cutoff and regulatory report",
    "ชุดนี้เน้น corporate banking ที่ feature หน้า portal เล็ก ๆ อาจกระทบ treasury position, operation และ regulatory reporting",
    setMcqs("FX and Trade Finance", "RM อยากให้เปิด pilot กับลูกค้ารายใหญ่ทัน quarter นี้", "Corporate Customer, RM, Treasury, Trade Operations, Compliance, Finance, IT และ Risk", [
      ["ลูกค้า book FX rate แล้วใช้เวลาจน rate หมดอายุกลางทาง ทำให้ booking fail และต้องขอ rate ใหม่", "กำหนด rate validity + warning ก่อนหมดอายุ + ทางเลือก extend ที่มี approval", "ให้ใช้ rate ใหม่ทันทีโดยไม่แจ้งผลกระทบ", "ยกเลิก booking ทุกเคสที่เลย validity", "ให้ Treasury ตัดสินเองทีละเคส", "validity + warning + extend สมดุลความเสี่ยง; ใช้ rate ใหม่เลยหรือยกเลิกหมดกระทบธุรกิจ"],
      ["ลูกค้าขอ book FX ที่จะทำให้ exposure เกิน limit แต่ระบบไม่ตรวจจนกว่าจะ settle ทำให้เสี่ยง", "เชื่อม exposure check กับ booking แบบ real-time + approval path ถ้าเกิน limit", "ปล่อยให้ book แล้วตรวจทีหลัง", "บล็อก booking ทุกเคสที่ใกล้ limit", "ให้ Risk ตัดสินเอง", "real-time exposure check ป้องกันเกิน limit; ปล่อยหรือบล็อกสุดโต่งเสี่ยง"],
      ["ลูกค้าส่งเอกสาร trade finance ไม่ครบ แต่ checklist แต่ละประเภท LC/BG ต่างกัน ทำให้ trade ops ขอเพิ่มหลายรอบ", "สร้าง dynamic document checklist ตามประเภทและ counterpart + validation ตอน submit", "ให้ trade ops ขอเพิ่มเองทีละข้อ", "บังคับเอกสารครบทุกประเภท", "ให้ Compliance ตัดสินเอง", "dynamic checklist ลด rework; ขอทีละข้อหรือบังคับครบทุกประเภทช้า"],
      ["booking มี counterpart ในประเทศที่ถูก sanction แต่ screening ไม่ trigger เพราะชื่อสะกดต่างกัน", "ใช้ fuzzy matching + manual review queue + decision evidence สำหรับ near-hit", "ปล่อยผ่านเพราะชื่อไม่ตรงเป๊ะ", "บล็อก booking ทุกเคสที่มี near-hit", "ให้ Compliance ตัดสินเอง", "fuzzy matching + review สมดุลความแม่นและความเร็ว; ปล่อยหรือบล็อกหมดเสี่ยง"],
      ["booking reference กับ payment จริง match ไม่ได้ ทำให้ Finance reconcile ไม่ตรงและงานค้าง", "นิยาม booking-payment matching key + reconciliation report + exception queue", "ให้ Finance ตัดยอดเองทีหลัง", "หยุดรับ booking จนกว่าจะ reconcile 100%", "ให้ Treasury ตัดสินเอง", "matching + reconciliation ทำให้ยอดตรง; ตัดทีหลังหรือหยุดหมดไม่ใช่ทาง"],
      ["ลูกค้าขอ cancel booking หลัง confirm แต่ไม่ชัดว่า cancel ได้เมื่อไรและมีค่าใช้จ่ายไหม", "กำหนด cancellation policy: window, fee, approval, P&L impact และ audit log", "ยอม cancel ทุกเคสตามที่ลูกค้าขอ", "ห้าม cancel ทุกกรณีหลัง confirm", "ให้ RM ตัดสินเอง", "cancellation policy สมดุล; ยอมหรือห้ามหมดเสี่ยง P&L หรือความสัมพันธ์"],
      ["cutoff calendar และ value date ของ FX/trade ซับซ้อนต่าง currency แต่ลูกค้าเห็นไม่ชัด ทำให้ book ผิดวัน", "แสดง cutoff + value date ตาม currency ตอนเลือกพร้อม validation", "ปล่อยให้ book ผิดวันแล้วแก้ทีหลัง", "บังคับลูกค้ายืนยันทุกขั้นตอนทีละ currency", "ให้ Treasury ตั้ง cutoff เอง", "cutoff visibility + validation ป้องกันผิดวัน; ปล่อยหรือ over-confirm ไม่ practical"],
      ["LC มี discrepancy ระหว่างเอกสารกับ terms แต่ระบบไม่แจ้งจนกว่า bank ปลายทางจะ reject ทำให้ล่าช้าและเสียค่าปรับ", "ทำ discrepancy check ตอน submit + checklist + exception ก่อนส่ง bank ปลายทาง", "ส่งไปก่อนแล้วค่อยแก้ตาม rejection", "บังคับตรวจทุกฟีลด์ manual ทุกครั้ง", "ให้ trade ops ตัดสินเอง", "discrepancy check ลด rejection; ส่งก่อนหรือ manual ทุกฟีลด์ช้าและเสี่ยง"],
      ["ลูกค้าคิดว่า rate ที่เห็นคือ rate ที่ล็อก แต่จริง ๆ เป็น indicative ทำให้คาดหวังผิดและโต้เถียง", "แสดง rate type (indicative vs locked) ชัดเจน + เงื่อนไข lock และ disclaimer", "ปล่อยให้เข้าใจผิดต่อไป", "บังคับ confirm rate ทุกขั้นตอน", "ให้ Treasury อธิบายเองทีละเคส", "rate type clarity ตั้งความคาดหวัง; ปล่อยหรือ over-confirm ไม่ดี"],
      ["Treasury ไม่เห็น exposure รวมแบบ real-time เพราะ booking กระจายหลายระบบ ทำให้ตัดสินใจ limit ไม่แม่น", "สร้าง position dashboard รวมจากทุก source + refresh cadence + ownership", "ให้ Treasury รวมเองจากหลายไฟล์", "รอ merge ระบบเป็นเดียวก่อน", "ให้ Finance รายงานเอง", "position dashboard ทำให้ตัดสินใจแม่น; รวมเองหรือรอ merge ไม่ทันการณ์"],
      ["Sales อยากเปิด FX ให้ลูกค้าใหญ่เร็ว แต่ Treasury กังวล exposure และ Compliance กังวล screening ทำให้ conflict", "แยก use case ตาม risk tier + decision criteria + owner + rationale", "เอาใจ Sales เพราะเป็นลูกค้าใหญ่", "หยุด pilot จนกว่าทุกฝ่ายพอใจ", "ให้ผู้บริหารตัดสินเอง", "risk tier + criteria สมดุล; เอาใจฝ่ายเดียวหรือหยุดหมดไม่ยั่งยืน"],
      ["portal ส่ง booking ไป treasury และ trade ops แต่ trigger และ status mapping ไม่ครบ ทำให้บาง booking ค้าง", "กำหนด contract ระหว่าง portal, treasury และ trade ops ให้ครบทั้ง trigger, payload, status และ owner ราย segment", "ให้ trade ops โทรถาม treasury เองทุก booking ที่ค้าง", "หยุดรับ booking จนกว่าจะรวมระบบทั้งสามเป็นชุดเดียว", "ปล่อยให้ vendor แมพ field เองตามถนัด", "contract ที่กำหนดชัดทำให้ booking ไม่ค้าง; โทรเองหรือหยุดรับไม่ใช่ทางแก้"],
      ["FX booking บางประเภทต้องรายงาน regulator แต่ requirement เดิมไม่ได้ครอบ ทำให้รายงานผิด/ขาด", "นิยาม report requirement + data field + submission SLA และ validation ก่อน go-live", "ส่งรายงานเท่าที่มีแล้วค่อยเติม", "หยุด booking จนกว่าจะรายงานได้ครบ", "ให้ Compliance รายงานเอง", "report requirement + validation ป้องกันผิด/ขาด; ส่งเท่าที่มีหรือหยุดหมดเสี่ยง"],
      ["ลูกค้าขอ FX ด่วนเกิน exposure limit เพราะมี deadline ชำระ แต่ไม่มี exception path", "ออกแบบ exception path: เหตุผล, approver ระดับสูง, P&L note, post-review และ audit log", "ยอมให้เกิน limit ทุกเคสด่วน", "ปฏิเสธ exception ทุกกรณี", "ให้ Treasury ตัดสินเอง", "exception path ที่ audit ได้ปลอดภัย; ยอมหรือปฏิเสธหมดเสี่ยง/อุดตัน"],
      ["หลังเปิด FX portal ใหม่ผู้บริหารถามว่าลดงาน manual ของ Treasury จริงไหม แต่ไม่มี baseline", "เทียบ baseline (manual booking, error rate, turnaround) กับ actual และรายงาน outcome", "รายงานจำนวน booking เป็นความสำเร็จ", "รอปีถัดไปค่อยวัด", "ให้ vendor รายงาน", "baseline + outcome พิสูจน์คุณค่า; นับ booking หรือรอนานไม่พิสูจน์"],
      ["ธนาคารจะเปลี่ยน treasury system ใหม่ แต่มี open position และ historical booking ที่ต้อง map", "ออกแบบ cutover: migration, position mapping, parallel run, freeze window และ rollback", "เปิด system ใหม่แล้วเริ่มนับใหม่", "เลื่อนจนกว่า position เก่าจะปิดหมด", "ให้ IT ตัดสิน cutover คนเดียว", "cutover + position mapping ปลอดภัยสำหรับ treasury; เริ่มใหม่ทิ้ง position เก่า เลื่อนจนปิดหมดไม่ practical"],
      ["rate feed ต้อง update real-time แต่ยังไม่มี NFR freshness/latency ที่ทดสอบ", "กำหนด NFR freshness + fallback feed + alert เมื่อ stale", "ปล่อยไปแล้วค่อย tune", "over-provision feed หลาย source ตลอดเวลา", "ให้ infra ตั้ง default", "NFR + fallback รับมือ stale rate; ปล่อยหรือ over-provision ไม่คุ้ม"],
      ["ตอน UAT พบว่า rate ไม่ refresh ตาม cadence เพราะ cache ทำให้ลูกค้าเห็น rate เก่า ใกล้ go-live", "ประเมิน severity (financial-critical) เสนอ fix ขั้นต่ำ + fast-follow + decision log", "เปิดก่อนเพราะเป็นเรื่องเล็ก", "เลื่อน go-live ทั้งหมด", "ให้ developer ตัดสินเอง", "severity-based fix + fast-follow สมดุลสำหรับ rate cache; เปิดเลยเสี่ยงความเสียหายทางการเงิน เลื่อนหมดไม่จำเป็น"],
      ["จะเปิด FX product ใหม่ แต่ ops ยังไม่คุ้น flow และคู่มือไม่พร้อม", "วางแผน change: comms, training, runbook, FAQ และ hypercare", "เปิดเลยแล้วให้ ops เรียนรู้เอง", "รออบรมครบ 100% ก่อน", "ให้ RM สอนลูกค้าเอง", "change plan ลดความสับสน; เปิดเลยหรือรอ 100% กระทบการใช้งาน"],
      ["auditor ขอหลักฐานการอนุมัติ booking ที่เกิน limit แต่ระบบเก็บแค่ status ไม่มี rationale", "เก็บ approval evidence: approver, timestamp, limit, rationale, exposure snapshot และ retention", "บอก auditor ว่ามี log พอ", "บังคับ screenshot manual ทุก approval", "ให้ auditor ดึง database เอง", "approval evidence + exposure snapshot ทำให้ audit booking ได้; log อย่างเดียวหรือ screenshot manual ไม่พอ"],
    ]),
    written("Corporate FX Booking and Trade Finance Portal", "ธนาคารต้องการให้ลูกค้า corporate ทำ FX booking และส่งเอกสาร trade finance ผ่าน digital portal ลูกค้าต้องการเห็น rate และยืนยันเร็ว RM ต้องเห็น status ของลูกค้า Treasury ต้องควบคุม exposure, rate validity และ cancellation Trade Operations ต้องตรวจเอกสารให้ครบ Compliance ต้อง screening party/country และ Finance ต้อง reconcile booking กับ payment จริง ปัญหาปัจจุบันคือ quote หมดอายุแต่ลูกค้าไม่เข้าใจ booking reference match กับ payment ไม่ได้ และเอกสาร trade ถูกส่งไม่ครบ ระบบใหม่ต้องทำให้ทุกฝ่ายเห็นสถานะและ control ที่เหมาะสมก่อนรายการเข้าสู่ production process", ["FX quote and booking", "Treasury exposure check", "Trade document checklist", "Party and country screening", "Booking-payment matching", "Cancellation and expiry handling"], "quote id, currency, amount, expiry, trade document, party, booking/payment reference", "treasury limit, cutoff, sanction screening, audit trail, cancellation approval, reconciliation", "Corporate Customer, RM, Treasury, Trade Ops, Compliance, Finance, Risk, IT"),
  ),
  exam(
    "data-reporting",
    "ชุดที่ 8: Data, Reporting และ Dashboard KPI",
    "KPI definition, data quality, lineage, masked export, regulatory evidence",
    "ชุดนี้เน้น report/dashboard ที่ BA ต้องไม่หยุดแค่ chart แต่ต้องนิยาม decision, metric, data source, control และ evidence",
    setMcqs("Banking Data and Reporting", "ต้องนำเสนอใน steering committee รอบถัดไป", "Business Owner, Data Owner, Compliance, Risk, Operations, Analytics, DPO และ Audit", [
      ["แต่ละทีมรายงาน 'NPL ratio' ด้วยนิยามต่างกัน (เบิกจ่าย vs outstanding) ทำให้ตัวเลข steering ไม่ตรงกัน", "สร้าง certified KPI catalog: definition, numerator/denominator, source และ owner ที่ทุกทีมใช้ร่วม", "ให้แต่ละทีมใช้นิยามของตนต่อไป", "บังคับนิยามเดียวทันทีโดยไม่สื่อสาร", "ให้ Finance ตัดสินนิยามเอง", "KPI catalog ร่วมลดความขัดแย้ง; ปล่อยหรือบังคับทันทีทำให้ตัวเลขผิด"],
      ["auditor ถามว่าตัวเลขใน dashboard มาจาก source ไหนและผ่าน transform อะไร แต่ไม่มี lineage บันทึก", "จัดทำ data lineage: source, transform rule, refresh time และ owner ของแต่ละ metric", "บอก auditor ว่ามาจาก warehouse ก็พอ", "เก็บ lineage ทุก transform ถึงระดับ row", "ให้ Analytics อธิบายเอง", "lineage ที่เหมาะสมทำให้ตรวจได้; กว้างเกินไปหรือละเอียดเกินไปไม่ practical"],
      ["report แสดงยอดผิดเพราะข้อมูล source มี missing/null แต่ไม่มี quality check ก่อนแสดง", "เพิ่ม data quality rule + validation + flag ตอนข้อมูลเข้า + alert เมื่อ fail", "ปล่อยให้แสดงผิดแล้วแก้ทีหลัง", "บล็อก report ทุกตัวจนกว่าข้อมูลจะสมบูรณ์ 100%", "ให้ Data Owner ตรวจเอง", "quality rule + flag สมดุลความเร็วและความถูก; ปล่อยผิดหรือบล็อกหมดสุดโต่ง"],
      ["ลูกค้าเคสหนึ่ง export report ที่มีเลขบัญชีเต็มทั้ง column ทั้งที่ role ไม่ควรเห็น ทำให้เสี่ยง PDPA", "นิยาม masking policy + access control + export approval + audit log สำหรับข้อมูล sensitive", "เปิด export เต็มให้ทุกคนเพื่อความสะดวก", "ห้าม export ทุกกรณี", "ให้แต่ละคนใช้วิจารณญาณ", "masking + access control สมดุลความสะดวกและกฎ; เปิดหรือห้ามหมดสุดโต่ง"],
      ["dashboard แสดงข้อมูลเก่าเพราะ refresh ช้า แต่ไม่มี timestamp บอก ทำให้ผู้บริหารตัดสินใจด้วยข้อมูลเก่า", "แสดง refresh timestamp + data freshness disclaimer + ทางเลือก on-demand refresh", "ปล่อยให้ใช้ข้อมูลเก่าโดยไม่รู้", "บังคับ refresh real-time ทุก dashboard", "ให้ Analytics อัปเดตเอง", "freshness visibility + on-demand สมดุล; ปล่อยหรือบังคับ real-time ไม่คุ้ม"],
      ["auditor ขอดูว่า report ฉบับที่ส่ง regulator สร้างด้วย parameter อะไรและเมื่อไร แต่ไม่มี run history", "เก็บ report run history: parameter, timestamp, data snapshot, owner และ version", "บอก auditor ว่ามีไฟล์ PDF ก็พอ", "เก็บทุก intermediate file ทุกขั้นตอน", "ให้ Compliance รวบรวมเอง", "run history + version ทำให้ reproduce ได้; ไฟล์ PDF หรือเก็บทุกไฟล์ไม่พอ/เกินไป"],
      ["ผู้บริหารขอ dashboard แต่ไม่บอก decision ที่จะใช้ ทำให้ทีมสร้าง chart เยอะแต่ไม่ตอบโจทย์", "ถาม decision, audience, frequency และ action ก่อนออกแบบ dashboard", "สร้าง chart ตามที่ขอทุกตัว", "รอจนกว่าผู้บริหารจะนิยาม decision ครบ", "ให้ Analytics เลือก chart เอง", "decision-driven design ตอบโจทย์; สร้างตามขอหรือรอ decision ครบไม่มีประสิทธิภาพ"],
      ["report ที่ส่ง regulator คำนวณผิดเพราะ rule เปลี่ยนแต่ report ยังใช้ logic เก่า", "เชื่อม rule version กับ report + validation + sign-off ก่อนส่ง", "ส่ง report แล้วค่อยแก้ logic", "หยุดส่ง report จนกว่าจะ validate ครบ", "ให้ Compliance ตรวจเอง", "rule version + validation ป้องกันผิด; ส่งเลยหรือหยุดหมดเสี่ยง"],
      ["report exception แสดงรายการที่ต้อง action แต่ไม่มี owner และ SLA ทำให้ exception ค้าง", "เพิ่ม owner, SLA, status และ escalation ใน exception report", "ปล่อยให้ทีมไล่เอง", "หยุดรายงาน exception จนกว่าจะมี owner ครบ", "ให้ Operations ตัดสินเอง", "owner + SLA ใน report ทำให้ action ได้; ไล่เองหรือหยุดรายงานไม่ช่วย"],
      ["report ใหม่ไม่มี data owner sign-off ทำให้ความถูกต้องไม่มีคนรับผิดชอบ", "กำหนด data owner sign-off + SLA + change control สำหรับ report ใหม่", "ปล่อยให้ใช้โดยไม่มี sign-off", "บังคับ sign-off ทุกขั้นตอนจน report ล่าช้า", "ให้ Compliance รับผิดชอบทั้งหมด", "owner sign-off ทำให้มีคนรับผิดชอบ; ปล่อยหรือ over-sign-off ไม่สมดุล"],
      ["ทีมต้องการ self-service report แต่ DPO กังวลว่าจะเข้าถึงข้อมูลเกินสิทธิ์ ทำให้ conflict", "แยก report tier ตาม data classification + access control + governed dataset สำหรับ self-service", "เปิด self-service ทั้งหมดเพื่อความเร็ว", "ห้าม self-service ทุกกรณี", "ให้ผู้บริหารตัดสินเอง", "tier + governed dataset สมดุล; เปิดหรือห้ามหมดสุดโต่ง"],
      ["ยอดใน report ไม่ตรงกับ source เพราะ transform มี bug และไม่มี reconciliation", "ทำ reconciliation rule + comparison report + alert เมื่อแตกต่างเกิน threshold", "ปล่อยให้ต่างแล้วอธิบายเอง", "หยุด report จนกว่าจะตรง 100%", "ให้ Finance ตัดสินเอง", "reconciliation + alert ตรวจจับได้; ปล่อยหรือหยุดหมดไม่ใช่ทาง"],
      ["หลังเปลี่ยน field meaning (เช่น status code ใหม่) report เก่ายังแปลความหมายเดิม ทำให้ผิด", "เชื่อม data dictionary version กับ report + impact analysis ตอนเปลี่ยน", "ปล่อยให้ report แปลเดิมต่อไป", "อัปเดต report ทุกตัวทันทีโดยไม่ทดสอบ", "ให้ Analytics แก้เอง", "dictionary version + impact ป้องกันผิด; ปล่อยหรืออัปเดตหมดเสี่ยง"],
      ["dashboard KPI ที่ละเอียดอ่อน (เช่น รายได้รายบุคคล) เข้าถึงได้กว้างเกิน ทำให้เสี่ยง", "กำหนด access control ตาม role + masking + audit log สำหรับ KPI sensitive", "เปิดให้ทุกคนเพื่อความโปร่งใส", "ล็อก KPI จนเกือบไม่มีใครเห็น", "ให้ DPO ตัดสินเอง", "access control + masking สมดุล; เปิดหรือล็อกหมดสุดโต่ง"],
      ["warehouse ส่งข้อมูลให้ reporting แต่ trigger และ schema mapping ไม่ครบ ทำให้บาง metric ขาด", "นิยาม interface contract: trigger, schema, SLA, error handling และ owner", "ให้ Analytics ดึง manual", "merge warehouse กับ reporting เป็นเดียวก่อน", "ให้ vendor map เอง", "contract ทำให้ข้อมูลครบ; manual หรือ merge เกินจำเป็น"],
      ["report ใหญ่ใช้เวลา generate นานจนไม่ทัน meeting แต่ยังไม่มี NFR generation time", "กำหนด NFR generation time + caching + async run + notify", "ปล่อยให้รอนานแล้วค่อย tune", "over-provision เพื่อให้เร็วตลอด", "ให้ infra เพิ่มทรัพยากร", "NFR + caching + async ทำให้ทัน; ปล่อยหรือ over-provision ไม่คุ้ม"],
      ["หลังเปิด dashboard ใหม่ผู้บริหารถามว่า adoption จริงไหม แต่ไม่มี baseline การใช้งาน", "เทียบ baseline (การใช้งาน, decision latency) กับ actual และรายงาน outcome", "รายงานจำนวน view เป็นความสำเร็จ", "รอปีถัดไปค่อยวัด", "ให้ vendor รายงาน", "baseline + outcome พิสูจน์คุณค่า; นับ view หรือรอนานไม่พิสูจน์"],
      ["ตอน UAT พบว่าตัวเลขผิดเพราะ filter ใน report ตั้งผิด ใกล้วันส่ง regulator", "ประเมิน severity (regulatory-critical) เสนอ fix + revalidate + decision log", "ส่ง report เดิมเพราะใกล้ deadline", "เลื่อนการส่งทั้งหมด", "ให้ Compliance ตัดสินเอง", "severity-based fix + revalidate สมดุล; ส่งเดิมหรือเลื่อนหมดเสี่ยง"],
      ["จะเปิด KPI ใหม่ แต่ทีมยังไม่เข้าใจนิยามและวิธีใช้ ทำให้ตีความต่างกัน", "วางแผน change: KPI doc, training, FAQ และ sign-off ก่อนเปิด", "เปิดเลยแล้วให้ทีมเรียนรู้เอง", "รออบรมครบ 100% ก่อน", "ให้ Analytics อธิบายเอง", "change plan ลดความสับสนเรื่องนิยาม KPI; เปิดเลยทำให้ตีความต่างกัน รอ 100% ช้าเกินไป"],
      ["auditor ขอดู version ของ report ที่ใช้ในแต่ละช่วงเวลา แต่ไม่มี version control", "เก็บ report version + effective date + change log + retention", "ส่ง version ล่าสุดให้ auditor ทั้งหมด", "เก็บทุก draft ทุก version ทุกการแก้", "ให้ Compliance รวบรวมเอง", "version + change log ทำให้ reproduce ได้; ส่งล่าสุดหรือเก็บทุก draft ไม่พอ/เกินไป"],
    ]),
    written("Regulatory and Management Reporting Workbench", "หลายหน่วยงานในธนาคารต้องการ dashboard และ report เพื่อดู loan health, AML rejected transactions, complaint root cause และ campaign performance แต่ข้อมูลมาจากหลายระบบ ความหมาย KPI ไม่ตรงกัน refresh frequency ไม่ชัด และบาง field เป็นข้อมูลส่วนบุคคลที่ไม่ควรถูก export เต็มรูปแบบ Compliance ต้องการ report ที่ส่ง regulator ได้ตรงเวลา Management ต้องการ dashboard สำหรับตัดสินใจ Operations ต้องการ exception report ที่ action ได้ และ Audit ต้องการหลักฐานว่า report ถูก generate ด้วย parameter ใด ระบบใหม่ต้องจัดการ definition, lineage, quality check และ access control ให้เหมาะกับแต่ละวัตถุประสงค์", ["Certified KPI catalog", "Data quality validation", "Regulatory report generation", "Masked export", "Dashboard freshness and lineage", "Exception action report"], "KPI definition, source system, transform rule, report parameter, PII field, exception reason", "data owner sign-off, masking, access control, report run log, completeness check, retention", "Business Owner, Data Owner, Compliance, DPO, Operations, Analytics, Audit, IT"),
  ),
  exam(
    "open-api-partner",
    "ชุดที่ 9: Open API และ Partner Banking",
    "Partner onboarding, API security, idempotency, error code, reconciliation",
    "ชุดนี้เน้น API ที่ต้องคิด end-to-end ตั้งแต่ partner onboarding ถึง dispute/reconciliation ไม่ใช่แค่ endpoint spec",
    setMcqs("Open API Partner Payment", "Business ต้องการ onboard partner รายแรกให้ทัน launch", "Partner, API Product, Security, Operations, Finance, Compliance, Support และ IT", [
      ["partner อยากขึ้น production เลยโดยไม่ผ่าน sandbox ทำให้เสี่ยง integration พังและ duplicate", "กำหนด sandbox certification + test case + sign-off เป็นเกณฑ์ก่อน production", "ยอมขึ้น production เลยเพื่อให้ทัน launch", "บังคับ partner ทดสอบทุก case จนเกินจริง", "ให้ Business ตัดสินเอง", "certification + sign-off สมดุลความเร็วและ risk; ขึ้นเลยหรือ over-test สุดโต่ง"],
      ["partner ได้ scope กว้างเกินความจำเป็นเพราะ config ผิด ทำให้เข้าถึง API ที่ไม่ควร", "กำหนด least-privilege scope + review + audit log สำหรับแต่ละ partner", "เปิด scope กว้างเพื่อความสะดวก", "ล็อก scope จน partner ทำงานไม่ได้", "ให้ Security ตัดสินเอง", "least-privilege + review สมดุล; เปิดกว้างหรือล็อกหมดสุดโต่ง"],
      ["partner เรียก payment API ซ้ำเพราะ timeout ทำให้จ่ายเงินซ้อน โดยไม่มี idempotency", "ใช้ idempotency key ใน request + check ก่อน process + reconciliation", "ให้ Finance ตัดยอดซ้อนทีหลัง", "หยุด retry ทุกครั้งจนกว่าจะได้ response", "ให้ IT แก้เอง", "idempotency ที่ต้นน้ำป้องกัน duplicate; ตัดทีหลังหรือหยุด retry ไม่ใช่ทาง"],
      ["partner แปล error code ผิด เช่น 'pending' หมายถึงกำลัง process ไม่ใช่ fail ทำให้ retry ผิด", "ทำ error catalog + status lifecycle doc + คำแนะนำ action", "ให้ partner เดาเอง", "ซ่อน error code ทั้งหมด", "ให้ Support แปลให้ทุกครั้ง", "error catalog + lifecycle ทำให้ partner เข้าใจ; เดาหรือซ่อนทำให้สับสน"],
      ["partner status inquiry ไม่ match กับสถานะจริงเพราะ async delay ทำให้แสดงผิด", "นิยาม status lifecycle + eventual consistency note + webhook notify", "บอก partner ว่ารอแล้ว query ใหม่", "บังคับ sync ทุก API จนช้า", "ให้ IT แก้เอง", "lifecycle + webhook สมดุล eventual consistency; รอหรือบังคับ sync ไม่ practical"],
      ["partner รายใหญ่เรียก API จนกระทบ partner อื่นเพราะไม่มี rate limit", "กำหนด rate limit/quota ต่อ partner + throttle policy + alert", "ปล่อยให้เรียกได้ไม่จำกัด", "จำกัดจน partner ใหญ่ใช้ไม่ได้", "ให้ infra เพิ่ม capacity", "rate limit + quota สมดุล; ปล่อยหรือจำกัดสุดโต่งไม่ยุติธรรม"],
      ["จะเปลี่ยน API version ใหม่ที่ breaking แต่ partner เก่ายังไม่พร้อม migrate", "วางแผน versioning: overlap window, deprecation timeline, migration support + changelog", "บังคับ version ใหม่ทันที", "รองรับ version เก่าตลอดไป", "ให้ IT แจ้ง partner เอง", "versioning + overlap ทำให้ migrate ได้; บังคับหรือรองรับตลอดไปไม่ยั่งยืน"],
      ["partner retry หลัง timeout โดยใช้ reference ใหม่ทำให้ยอด reconciliation ไม่ตรง", "บังคับ partner reuse idempotency/reference + reconciliation report รายวัน", "ให้ Finance ตัดยอดทีหลัง", "บล็อก retry ทุกครั้ง", "ให้ partner จัดการเอง", "reuse reference + reconciliation ทำให้ยอดตรง; ตัดทีหลังหรือบล็อก retry ไม่ใช่ทาง"],
      ["ยอดของ partner กับธนาคารไม่ตรงเพราะ cutoff และ timezone ต่างกัน ทำให้ dispute", "นิยาม reconciliation window + timezone + exception queue + matching key", "ให้แต่ละฝ่ายใช้ยอดของตน", "หยุด service จนกว่าจะตรง 100%", "ให้ Finance ตัดสินเอง", "reconciliation + timezone ทำให้ยอดตรง; ใช้ยอดของตนหรือหยุดหมดไม่ใช่ทาง"],
      ["เกิด dispute ระหว่าง partner กับธนาคาร แต่ไม่มี evidence pack มาตรฐานทำให้คลี่คลายช้า", "นิยาม dispute evidence pack: API log, request/response, timestamp, approval และ retention", "รับ dispute ทุกอย่างแล้วค่อยสืบ", "ปฏิเสธ dispute ที่ขาดข้อมูลทันที", "ให้ Compliance ตัดสินเอง", "evidence pack ทำให้คลี่คลายได้; รับหมดหรือปฏิเสธหมดสุดโต่ง"],
      ["partner ใหม่ขอ onboard แต่ KYB ยังไม่ครบและไม่ชัดว่าต้องส่งอะไร", "สร้าง onboarding checklist + KYB requirement + approval + sandbox access", "onboard เลยเพื่อทัน launch", "บังคับเอกสารครบเกินจริง", "ให้ Business ตัดสินเอง", "onboarding checklist สมดุล; onboard เลยหรือบังคับครบเกินไปเสี่ยงหรือช้า"],
      ["API gateway ส่งต่อ core แต่ trigger และ error mapping ไม่ครบ ทำให้บางคำขอค้าง", "นิยาม interface contract: trigger, payload, error, timeout และ owner", "ให้ Support track manual", "merge gateway กับ core ก่อน", "ให้ vendor map เอง", "contract ทำให้ track ได้; manual หรือ merge เกินจำเป็น"],
      ["API call ที่ fail เข้า exception แต่ไม่มี queue/owner ทำให้ค้างและไม่มีคนดู", "สร้าง exception queue + owner + SLA + dashboard", "ปล่อยให้ partner retry เอง", "หยุดรับ API จนกว่าจะไม่มี exception", "ให้ Operations ตัดสินเอง", "exception queue + owner ทำให้ action ได้; ปล่อยหรือหยุดหมดไม่ใช่ทาง"],
      ["API ต้องตอบภายใน SLA ที่ partner คาด แต่ยังไม่มี NFR latency/availability ที่ทดสอบ", "กำหนด NFR latency + availability + load test + circuit breaker", "ปล่อยไปแล้วค่อย tune", "over-provision ตลอดเวลา", "ให้ infra ตั้ง default", "NFR + load test รับมือ SLA; ปล่อยหรือ over-provision ไม่คุ้ม"],
      ["หลังเปิด open API ผู้บริหารถามว่าเพิ่ม revenue/partner จริงไหม แต่ไม่มี baseline", "เทียบ baseline (partner, volume, revenue, error) กับ actual และรายงาน outcome", "รายงานจำนวน API call เป็นความสำเร็จ", "รอปีถัดไปค่อยวัด", "ให้ vendor รายงาน", "baseline + outcome พิสูจน์คุณค่า; นับ API call หรือรอนานไม่พิสูจน์"],
      ["จะเปลี่ยน API gateway ใหม่ แต่มี partner live ที่ต้องไม่กระทบ", "ออกแบบ cutover: parallel run, traffic shift, rollback, freeze window และ comms", "เปลี่ยนทันทีแล้วแจ้ง partner", "เลื่อนจนกว่า partner ทดสอบครบ", "ให้ IT ตัดสินคนเดียว", "cutover + traffic shift ปลอดภัย; เปลี่ยนทันทีหรือเลื่อนเสี่ยง"],
      ["ตอน UAT พบว่า webhook ไม่ fire บาง event ทำให้ partner ไม่ได้รับแจ้ง ใกล้ go-live", "ประเมิน severity + เสนอ fix ขั้นต่ำ + fast-follow + decision log", "เปิดก่อนเพราะเป็น edge case", "เลื่อน go-live ทั้งหมด", "ให้ developer ตัดสินเอง", "severity-based fix + fast-follow สมดุลสำหรับ webhook gap; เปิดเลยทำให้ partner ไม่ได้รับแจ้ง เลื่อนหมดกระทบ launch"],
      ["จะรองรับ partner type ใหม่ (เช่น fintech) แต่ ops ยังไม่เข้าใจ flow", "วางแผน change: doc, training, sandbox, FAQ และ hypercare", "เปิดรับเลยแล้วเรียนรู้เอง", "รออบรมครบ 100% ก่อน", "ให้ Business สอน partner เอง", "change plan ลดความสับสนสำหรับ partner type ใหม่; เปิดเลยเสี่ยง integration พัง รอ 100% กระทบ launch"],
      ["auditor ขอดูหลักฐานการเรียก API ที่ sensitive แต่ log เก็บไม่ครบ field", "เก็บ audit log: caller, scope, request id, timestamp, response status และ retention", "บอก auditor ว่ามี access log พอ", "log ทุก field ทุก call จนเยอะเกิน", "ให้ Security กรองเอง", "audit log ที่เหมาะสมทำให้ตรวจได้; น้อยเกินหรือเยอะเกินไม่ practical"],
      ["Security อยาก auth เข้มข้นแต่ Business กังวลว่า partner จะลำบาก ทำให้ conflict", "แยก auth tier ตาม risk + decision criteria + ทางเลือกที่สมดุล", "เน้น Business เพื่อให้ partner ใช้งานง่าย", "เน้น Security จน partner ลำบาก", "ให้ผู้บริหารตัดสินเอง", "auth tier + criteria สมดุล; Business หรือ Security อย่างเดียวไม่ยั่งยืน"],
    ]),
    written("Partner Payment API Control Plane", "ธนาคารจะเปิด API ให้ partner ส่ง payment instruction และสอบถามสถานะรายการ ลูกค้าจะเห็นบริการผ่าน partner app แต่ธนาคารยังรับผิดชอบ transaction, screening, posting, exception และ reconciliation Partner ต้องการ onboarding เร็ว Security ต้องการ authentication/authorization ชัด Operations ต้องการ exception queue Finance ต้องการยอดตรงกัน และ Compliance ต้องการ audit evidence เมื่อเกิด dispute ปัญหาที่คาดคือ partner retry แล้วส่งซ้ำ error code ไม่ชัดทำให้ลูกค้าสับสน rate limit ไม่พอ และการเปลี่ยน API version อาจทำให้ partner integration พัง ระบบใหม่ต้องออกแบบ API และ process รอบ ๆ ให้ production-safe", ["Partner sandbox certification", "API authentication and scope", "Payment idempotency", "Error code and status inquiry", "Daily reconciliation", "Dispute evidence pack"], "client id, token scope, request id, payment ref, status, error code, partner ref", "authentication, rate limit, AML screening, idempotency, audit log, reconciliation, versioning", "Partner Developer, API Product, Security, Operations, Finance, Compliance, Support, IT"),
  ),
  exam(
    "wealth-suitability",
    "ชุดที่ 10: Wealth Suitability และ Advisory Control",
    "Suitability profile, consent, product risk mismatch, exception sale, audit pack",
    "ชุดนี้เน้น wealth/advisory ที่ต้องลด rework ของ advisor แต่คุม mis-selling และ regulatory evidence",
    setMcqs("Wealth Suitability", "Wealth business ต้องการลดเวลาขายแต่ Compliance กลัว mis-selling", "Investment Advisor, Customer, Compliance, Product, Branch Manager, Operations, Audit และ Legal", [
      ["advisor ต้องกรอก suitability ในหลายระบบทำให้ข้อมูลไม่ตรงกันและเสียเวลา ทำให้ความเสี่ยง profile เก่า", "สร้าง single suitability profile ที่เป็น source of truth + sync ไป downstream", "ให้ advisor กรอกซ้ำในแต่ละระบบต่อไป", "รวมระบบเป็นเดียวก่อนค่อยทำ", "ให้ Compliance รวบรวมเอง", "single profile ลดความไม่ตรง; กรอกซ้ำหรือรวมระบบไม่แก้ที่ต้นเหตุ"],
      ["ลูกค้าอยากซื้อ product ที่ risk สูงกว่า profile ทำให้ต้องมี exception แต่ไม่มี flow ที่ชัด", "ออกแบบ exception sale: acknowledgement, approver, risk note, evidence และ retention", "ยอมขายตามลูกค้าเพราะเป็นสิทธิ์ลูกค้า", "ห้าม exception ทุกกรณี", "ให้ Branch Manager ตัดสินเอง", "exception flow ที่ audit ได้สมดุล; ยอมหรือห้ามหมดเสี่ยง mis-selling หรือความไม่พอใจ"],
      ["consent capture เก็บแค่ boolean ไม่มี version ทำให้ไม่รู้ว่าลูกค้ายอมรับ version ไหน", "เก็บ consent: version, timestamp, channel, language, purpose และ retention", "ใช้ boolean ต่อไปเพราะเคยทำแล้ว", "บังคับ re-consent ทุกครั้งที่มีการเปลี่ยน", "ให้ Legal ตัดสินเอง", "consent version + detail ทำให้ audit ได้; boolean หรือ over-consent ไม่พอ"],
      ["suitability หมดอายุโดยไม่มีการแจ้ง ทำให้ advisor ขายด้วย profile ที่ล้าสมัย", "กำหนด validity + reminder + block การขายจนกว่าจะ refresh", "ปล่อยให้ขายต่อเพราะเคยประเมินแล้ว", "บังคับ refresh ทุกครั้งก่อนขาย", "ให้ Compliance ตรวจเอง", "validity + reminder สมดุล; ปล่อยหรือบังคับ refresh สุดโต่ง"],
      ["ลูกค้าไม่เข้าใจผล suitability ทำให้ไม่ยอมรับคำแนะนำ และ advisor อธิบายไม่ตรงกัน", "สร้าง customer-facing explanation: score meaning, example product, risk scenario", "ให้ advisor อธิบายเองตามใจ", "ซ่อนผลจากลูกค้า", "ให้ Product ทำ material เอง", "explanation มาตรฐานทำให้เข้าใจตรงกัน; อธิบายเองหรือซ่อนทำให้สับสน"],
      ["advisor ต้องกรอกข้อมูลซ้ำจาก CRM ทำให้เสียเวลาและ error ทำให้ความเสี่ยง profile ไม่ตรง", "ทำ prefill จาก CRM + validation + audit trail", "ให้กรอกเองต่อไป", "merge CRM กับ advisor workstation ก่อน", "ให้ IT แก้เอง", "prefill + validation ลดงานซ้ำ; กรอกเองหรือ merge ไม่แก้ที่ต้นเหตุ"],
      ["KPI ขายทำให้ advisor แนะนำ product ที่เกิน profile เพื่อทำยอด ทำให้เสี่ยง mis-selling", "เพิ่ม guardrail metric + suitability match report + review สำหรับ outlier", "ใช้ KPI ขายเป็นตัววัดเดียว", "ลบ KPI ขายทั้งหมด", "ให้ผู้บริหารตัดสินเอง", "guardrail + suitability report สมดุล; KPI เดียวหรือลบหมดสุดโต่ง"],
      ["product risk rating อัปเดตใหม่ แต่ advisor workstation ยังใช้ rating เก่า ทำให้แนะนำผิด", "เชื่อม product catalog version กับ advisor + impact analysis ตอนเปลี่ยน", "ปล่อยให้ใช้ rating เก่าต่อไป", "อัปเดตทุกที่ทันทีโดยไม่ทดสอบ", "ให้ Product แจ้งเอง", "catalog version + impact ป้องกันผิด; ปล่อยหรืออัปเดตหมดเสี่ยง"],
      ["Sales อยากขายเร็ว แต่ Compliance ต้องการ evidence ครบ ทำให้ conflict เรื่องความเร็ว", "แยก use case ตาม risk tier + decision criteria + owner + rationale", "เน้น Sales เพราะยอดสำคัญ", "เน้น Compliance จน Sales ช้า", "ให้ผู้บริหารตัดสินเอง", "risk tier + criteria สมดุล; Sales หรือ Compliance อย่างเดียวไม่ยั่งยืน"],
      ["advisor workstation, CRM และ product catalog แตกต่างกันทำให้ sync ไม่ครบและข้อมูล profile เก่า", "นิยาม interface contract + sync SLA + reconciliation + exception queue", "ให้ advisor ตรวจ manual", "merge ระบบเป็นเดียวก่อน", "ให้ vendor map เอง", "contract + sync SLA ทำให้ข้อมูลตรง; manual หรือ merge เกินจำเป็น"],
      ["auditor ขอดูเหตุผลที่ advisor แนะนำ product นี้ให้ลูกค้า แต่ไม่มี recommendation rationale", "เก็บ recommendation evidence: advisor, profile, product risk, rationale, consent และ timestamp", "บอก auditor ว่ามี log พอ", "บังคับ advisor เขียน essay ทุกครั้ง", "ให้ Compliance ตัดสินเอง", "recommendation evidence ทำให้ audit ได้; log อย่างเดียวหรือ essay ไม่ practical"],
      ["suitability check ต้องตอบภายในเวลาที่ advisor รอ แต่ยังไม่มี NFR response ที่ทดสอบ", "กำหนด NFR response + caching + fallback ถ้าช้า", "ปล่อยไปแล้วค่อย tune", "over-provision ตลอดเวลา", "ให้ infra ตั้ง default", "NFR + fallback รับมือ response; ปล่อยหรือ over-provision ไม่คุ้ม"],
      ["หลังทำ single suitability profile ผู้บริหารถามว่าลดเวลาขายจริงไหม แต่ไม่มี baseline", "เทียบ baseline (เวลาขาย, ข้อผิดพลาด, mis-selling flag) กับ actual และรายงาน outcome", "รายงานจำนวนลูกค้าที่ขายได้เป็นความสำเร็จ", "รอปีถัดไปค่อยวัด", "ให้ vendor รายงาน", "baseline + outcome พิสูจน์คุณค่า; นับลูกค้าหรือรอนานไม่พิสูจน์"],
      ["ธนาคารจะเปลี่ยน suitability engine ใหม่ แต่มี profile เก่าที่ต้อง map score", "ออกแบบ cutover: migration, score mapping, parallel run, freeze window และ rollback", "เปิด engine ใหม่แล้วเริ่มนับใหม่", "เลื่อนจนกว่า profile เก่าจะหมดอายุ", "ให้ IT ตัดสิน cutover คนเดียว", "cutover + mapping ปลอดภัย; เริ่มใหม่หรือเลื่อนเสี่ยง"],
      ["ตอน UAT พบว่า risk score ไม่ update หลังลูกค้าเปลี่ยนคำตอบ ใกล้ go-live", "ประเมิน severity (compliance-critical) เสนอ fix + fast-follow + decision log", "เปิดก่อนเพราะเป็น edge case", "เลื่อน go-live ทั้งหมด", "ให้ developer ตัดสินเอง", "severity-based fix + fast-follow สมดุลสำหรับ score bug; เปิดเลยเสี่ยง compliance เลื่อนหมดไม่จำเป็น"],
      ["จะเปิด product ใหม่ที่ซับซ้อน แต่ advisor ยังไม่เข้าใจ risk/return ทำให้แนะนำผิด", "วางแผน change: product brief, training, suitability rule, FAQ และ sign-off", "เปิดขายเลยแล้วเรียนรู้เอง", "รออบรมครบ 100% ก่อน", "ให้ Product สอนเอง", "change plan ลดความเสี่ยง; เปิดเลยหรือรอ 100% กระทบการขาย"],
      ["advisor อยาก reuse recommendation template แต่ profile ลูกค้าแต่ละคนต่างกัน ทำให้แนะนำไม่ตรง", "ทำ template ที่ปรับตาม profile + validation ว่าตรงก่อนส่ง", "ใช้ template เดียวกันทุกลูกค้า", "เขียน recommendation ใหม่ทุกครั้ง", "ให้ Compliance ตรวจเอง", "template + validation สมดุล; เดียวกันหรือเขียนใหม่หมดไม่ตรง/ช้า"],
      ["ลูกค้าเปิดบัญชีร่วมแต่ suitability ออกแบบคนเดียว ทำให้ profile ไม่ครบทั้งสอง", "ออกแบบ joint suitability: profile แยกบุคคล + combined risk view + consent ทั้งคู่", "ใช้ profile คนเดียวแทนทั้งสอง", "บังคับเข้าสาขาทุกเคสร่วม", "ให้ Legal ตัดสินเอง", "joint profile แยกบุคคลปลอดภัย; คนเดียวหรือบังคับสาขาไม่สมดุล"],
      ["ทีม Product ขอเห็น profile ลูกค้าทั้งหมดเพื่อวิเคราะห์ แต่ DPO กังวลเรื่อง purpose limitation", "นิยาม access control + purpose + masking + approval สำหรับข้อมูล profile", "เปิดให้ทีม Product เห็นทั้งหมดเพื่อความสะดวก", "ห้ามทีม Product เห็นเลย", "ให้ผู้บริหารตัดสินเอง", "access + purpose + masking สมดุล; เปิดหรือห้ามหมดสุดโต่ง"],
      ["ลูกค้าถอน consent หลังซื้อ product แต่ระบบไม่ sync downstream ทำให้ยังใช้ข้อมูลอยู่", "นิยาม consent withdrawal flow + downstream sync + retention + evidence", "ปล่อยให้ downstream ใช้ต่อเพราะซื้อแล้ว", "ลบข้อมูลลูกค้าทั้งหมดทันที", "ให้ DPO ตัดสินเอง", "withdrawal + sync สมดุล; ปล่อยหรือลบหมดสุดโต่ง"],
    ]),
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
  explanation?: string,
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
    explanation,
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

type SetMcqRow = [
  situation: string,
  bestAction: string,
  wrongBypass: string,
  wrongFreeze: string,
  wrongEscalate: string,
  explanation: string,
];

function setMcqs(
  area: string,
  pressure: string,
  stakeholders: string,
  rows: readonly SetMcqRow[],
): McqSeed[] {
  return rows.map(
    ([situation, bestAction, wrongBypass, wrongFreeze, wrongEscalate, explanation]) =>
      mcq(
        area,
        situation,
        pressure,
        stakeholders,
        bestAction,
        wrongBypass,
        wrongFreeze,
        wrongEscalate,
        explanation,
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

const MCQ_STEMS = [
  "คำถามคือ BA ควรดำเนินการอย่างไรในสถานการณ์นี้?",
  "ในบทบาท BA คุณจะตัดสินใจอย่างไรเพื่อให้ requirement เดินหน้าโดยไม่ข้าม control?",
  "ข้อใดคือ action ของ BA ที่เหมาะสมที่สุดในสถานการณ์นี้?",
  "BA ควรทำอะไรเป็นลำดับถัดไปเพื่อไม่ให้เกิด rework หลัง go-live?",
  "คุณในบทบาท BA จะจัดการสถานการณ์นี้อย่างไรให้มีหลักฐานรองรับการตัดสินใจ?",
];

const MCQ_BRIDGES = [
  "ในฐานะ BA คุณต้องทำให้ requirement เดินหน้าต่อได้โดยไม่ข้าม control และไม่สร้าง rework หลัง go-live",
  "ในบทบาท BA คุณต้องถ่วงน้ำหนักระหว่างความเร็ว ความเสี่ยง และหลักฐานที่ตรวจสอบย้อนกลับได้",
  "หน้าที่ของ BA ในขั้นตอนนี้คือแยกประเด็นออกจากกัน แล้วเสนอทางเลือกที่ decision owner ตัดสินใจตามรอยได้",
  "ในฐานะนี้ BA ต้องรักษา control สำคัญไว้ในขณะที่ยังขับเคลื่อน deliverable ให้ทันแผน",
  "BA ต้องทำให้ทุกฝ่ายเห็นภาพเดียวกันก่อนตัดสินใจ ไม่ให้ฝ่ายใด override โดยไม่มีเหตุผล",
  "เป้าหมายของ BA คือลด ambiguity จนเหลือทางเลือกที่ชัดเจน พร้อมผลกระทบและเงื่อนไข sign-off",
];

const DEFAULT_MCQ_EXPLANATION =
  "คำตอบที่แข็งแรงต้องเริ่มจากเข้าใจ concern จริง จัด stakeholder ให้ input ครบ แยก option/risk/impact/control และทำ decision/sign-off ให้ trace ได้ ไม่ใช่ bypass ฝ่ายใดฝ่ายหนึ่งหรือโยนให้ผู้บริหารตัดสินโดยไม่มีหลักฐาน";

function makeMcqQuestion(
  id: string,
  seed: McqSeed,
  optionShift: number,
  skill: string,
): BaAssessmentMcq {
  const bridge = MCQ_BRIDGES[optionShift % MCQ_BRIDGES.length];
  const stem = MCQ_STEMS[optionShift % MCQ_STEMS.length];
  const prompt = `สถานการณ์: ${seed.situation} ${seed.pressure} ผู้เกี่ยวข้องคือ ${seed.stakeholders}. ${bridge} ${stem}`;
  const correct = seed.bestAction;
  const options = rotateOptions(
    [correct, seed.wrongBypass, seed.wrongFreeze, seed.wrongEscalate],
    optionShift,
  );
  const explanation =
    seed.explanation && seed.explanation.trim().length >= 30
      ? seed.explanation
      : DEFAULT_MCQ_EXPLANATION;
  return {
    id,
    prompt,
    options,
    correctIndex: options.indexOf(correct),
    skill,
    explanation,
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

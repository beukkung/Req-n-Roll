# Req Gym BA Persona Review

Generated from `lib/req-gym-bank.ts`.

## Scope

- Total questions: 1000
- Areas: Business Analysis Planning & Monitoring = 167, Elicitation & Collaboration = 167, Requirements Life Cycle Management = 167, Strategy Analysis = 167, Requirements Analysis & Design Definition = 166, Solution Evaluation = 166
- Difficulty: easy = 306, medium = 406, hard = 288
- Full per-question output: `docs/req-gym-ba-persona-review.csv`

## Interpretation

This pass treats each persona as choosing the best answer from the existing answer key, then reviewing the reasoning from a different BA maturity level:

- BA Junior: direct clue, basic concept, and common pitfall.
- BA Senior: business/process/system/control impact in a bank environment.
- BA Team Lead: readiness gate before sending requirement to build, test, operation, or approval.

## Sample

### rg-bapm-001 (Business Analysis Planning & Monitoring, easy)

**โจทย์:** ธนาคารดิจิทัลเริ่มโครงการ ปรับปรุง onboarding e-KYC สำหรับลูกค้าใหม่ โดย requirement ยังเปลี่ยนเร็วและมีผู้เกี่ยวข้องคือ Compliance, Product, สาขา และทีมปฏิบัติการ BA ควรวาง business analysis approach อย่างไรให้เหมาะกับสถานการณ์นี้มากที่สุด?

**เฉลย:** B. ใช้ adaptive approach วางรอบ elicitation สั้น ๆ ทบทวน backlog/requirement เป็นระยะ และตกลงจุดตัดสินใจร่วมกับ stakeholder

**BA Junior:** Junior ควรจับ keyword เรื่อง approach, plan, stakeholder, governance แล้วเลือกคำตอบที่ทำให้ scope/deliverable/approval ชัด ไม่รีบ freeze หรือข้าม stakeholder จุดระวัง: อย่าจำแค่คำตอบ ให้โยงกับ evidence ในโจทย์และระบุ assumption ที่ยังไม่รู้

**BA Senior:** Senior review: ในงานแบงค์ต้องแยก requirement ที่ต้อง baseline/approval ตาม policy ออกจาก backlog ที่ปรับได้ และระบุ owner/decision path สำหรับ issue สำคัญ Bank lens: bank-native context; compliance/policy; data/system integration; stakeholder alignment

**BA Team Lead:** Team Lead gate: พร้อมส่งต่อเมื่อมี BA plan, stakeholder coverage, decision log, risk/assumption log, approval criteria และ governance ที่ทีม delivery ยอมรับร่วมกัน Decision: ตอบข้อนี้ได้ แต่ก่อนส่ง dev/test ต้องมี evidence, owner และ acceptance/checkpoint ที่ตรวจสอบได้

**บริบทแบงค์:** บริบทธนาคาร: วาง BA approach ให้มี governance, stakeholder map, decision rights, sign-off cadence, change control และหลักฐาน audit trail ตั้งแต่ต้น

### rg-elic-001 (Elicitation & Collaboration, easy)

**โจทย์:** BA เตรียม session เพื่อเข้าใจ pain point ใน ประเมินคุณสมบัติ ตรวจหลักประกัน อนุมัติวงเงิน และนัดจดจำนอง ของ หน่วยงานสินเชื่อบ้านของธนาคาร ก่อนเริ่มถาม Mortgage Sales, Credit Policy, Appraisal, Legal และ Operations ควรกำหนดอะไรให้ชัดเป็นอันดับแรก?

**เฉลย:** C. วัตถุประสงค์ของ elicitation และ decision หรือ requirement ที่ต้องได้จาก session

**BA Junior:** Junior ควรดูว่าโจทย์ถามเทคนิคเก็บข้อมูลแบบใด และเลือกวิธีที่ตรงกับสถานการณ์ เช่น workshop, interview, observation, survey หรือ document analysis จุดระวัง: อย่าจำแค่คำตอบ ให้โยงกับ evidence ในโจทย์และระบุ assumption ที่ยังไม่รู้

**BA Senior:** Senior review: ต้อง validate กับแหล่งหลักฐาน เช่น policy, SOP, BOT/AML/KYC/PDPA constraint, operation procedure และบันทึก assumption/open issue ที่ยังต้อง confirm Bank lens: bank-native context; compliance/policy; data/system integration; stakeholder alignment; value realization

**BA Team Lead:** Team Lead gate: พร้อมเมื่อผล elicitation ถูกยืนยันกับเจ้าของข้อมูล มี traceable source และ open issue มี owner/date ชัด Decision: ตอบข้อนี้ได้ แต่ก่อนส่ง dev/test ต้องมี evidence, owner และ acceptance/checkpoint ที่ตรวจสอบได้

**บริบทแบงค์:** บริบทธนาคาร: เก็บข้อมูลจาก Product, Operation, Branch, Compliance, Risk และ IT โดยยืนยันผล elicitation ก่อน baseline requirement

### rg-rlcm-001 (Requirements Life Cycle Management, easy)

**โจทย์:** เครือข่ายสาขาของธนาคาร ต้องการให้ requirement ของ ยกระดับ queue และ teller service สำหรับฝากถอนและเปิดบัญชี ตรวจสอบย้อนกลับถึง ลดเวลารอคิวและลดเอกสารที่ถูกตีกลับ และ test case ได้ BA ควรใช้ artifact หรือแนวทางใดมากที่สุด?

**เฉลย:** D. Requirements traceability ที่เชื่อม business objective, requirement, design decision, test case และ release scope

**BA Junior:** Junior ควรมองหา owner, status, traceability, baseline, impact analysis และ change communication แทนการปล่อยให้ทีมเดาหลัง build จุดระวัง: อย่าจำแค่คำตอบ ให้โยงกับ evidence ในโจทย์และระบุ assumption ที่ยังไม่รู้

**BA Senior:** Senior review: ต้องเห็นผลกระทบต่อ downstream requirement, API, data, test case, release, training และ operation readiness ก่อนอนุมัติ change Bank lens: bank-native context; change/traceability

**BA Team Lead:** Team Lead gate: พร้อมเมื่อ requirement มี status/version/source/rationale ครบ และ impact analysis ครอบคลุม design, test, release, operation และ compliance Decision: ตอบข้อนี้ได้ แต่ก่อนส่ง dev/test ต้องมี evidence, owner และ acceptance/checkpoint ที่ตรวจสอบได้

**บริบทแบงค์:** บริบทธนาคาร: คุมวงจร UR/BRD/API/test case ด้วย owner, status, version, source, rationale, traceability และ impact analysis ทุกครั้งที่เปลี่ยน

### rg-strat-001 (Strategy Analysis, easy)

**โจทย์:** ฝ่ายบัญชีเงินฝากสกุลต่างประเทศของธนาคาร อยากลงทุนใน ปรับ inquiry และ service request สำหรับบัญชี FCD/e-FCD เพื่อแก้ สาขาแยกประเภทบัญชี FCD/e-FCD ไม่ตรงกับ BOT parameter และ core banking ก่อนเสนอ solution BA ควรทำอะไรใน current state analysis มากที่สุด?

**เฉลย:** A. ทำความเข้าใจ process ปัจจุบัน stakeholder pain point capability ที่มี และข้อจำกัดที่ทำให้เกิดปัญหา

**BA Junior:** Junior ควรถามก่อนว่า problem, objective, metric, current state และ future state คืออะไร ไม่กระโดดไปเลือก solution ทันที จุดระวัง: อย่าจำแค่คำตอบ ให้โยงกับ evidence ในโจทย์และระบุ assumption ที่ยังไม่รู้

**BA Senior:** Senior review: ต้องเชื่อมโจทย์กับ business case, risk appetite, compliance cost, operational impact และ KPI ไม่ใช่แค่ความต้องการของ stakeholder เดียว Bank lens: bank-native context; compliance/policy; data/system integration; stakeholder alignment

**BA Team Lead:** Team Lead gate: พร้อมเมื่อ initiative มี objective/KPI/baseline, option trade-off, risk response และ decision rationale ที่ sponsor รับทราบ Decision: ตอบข้อนี้ได้ แต่ก่อนส่ง dev/test ต้องมี evidence, owner และ acceptance/checkpoint ที่ตรวจสอบได้

**บริบทแบงค์:** บริบทธนาคาร: ผูก initiative กับ business outcome, risk appetite, compliance constraint, operating model และ measurable KPI ก่อนเลือก solution

### rg-radd-001 (Requirements Analysis & Design Definition, easy)

**โจทย์:** ฝ่าย Regulatory Reporting ของธนาคาร ต้องวิเคราะห์ขั้นตอน รวบรวมข้อมูล BOT ตรวจ mapping reconcile sign-off และส่งรายงาน ที่มี handoff หลายทีมใน data warehouse, regulatory reporting, core banking และ reconciliation tool Model ใดเหมาะที่สุดเพื่อเห็น flow และจุดตัดสินใจ?

**เฉลย:** B. Process model เช่น BPMN หรือ workflow diagram ที่แสดงกิจกรรม actor handoff และ decision point

**BA Junior:** Junior ควรเลือก artifact ที่ทำให้ requirement ชัดและ test ได้ เช่น process model, data dictionary, decision table, interface analysis หรือ acceptance criteria จุดระวัง: อย่าจำแค่คำตอบ ให้โยงกับ evidence ในโจทย์และระบุ assumption ที่ยังไม่รู้

**BA Senior:** Senior review: ต้องทำ rule/data/interface ให้ dev และ QA ใช้ต่อได้จริง โดยเฉพาะ field definition, source of truth, error handling, SLA และ audit requirement Bank lens: bank-native context; compliance/policy; data/system integration

**BA Team Lead:** Team Lead gate: พร้อมเมื่อ requirement clear, correct, complete, consistent, feasible, prioritized, traceable และ testable พร้อม artifact ที่เกี่ยวข้อง Decision: ตอบข้อนี้ได้ แต่ก่อนส่ง dev/test ต้องมี evidence, owner และ acceptance/checkpoint ที่ตรวจสอบได้

**บริบทแบงค์:** บริบทธนาคาร: แปลง requirement เป็น process model, business rule, data dictionary, interface contract, state model, NFR และ acceptance criteria ที่ test ได้

### rg-solev-001 (Solution Evaluation, easy)

**โจทย์:** หลังปล่อย ทำ workflow debt restructuring สำหรับลูกค้าสินเชื่อรายย่อย ของ ฝ่ายติดตามหนี้และปรับโครงสร้างของธนาคาร ผู้บริหารอยากรู้ว่าสร้างคุณค่าจริงหรือไม่ BA ควรเริ่มจากข้อมูลใดมากที่สุด?

**เฉลย:** C. KPI/outcome ที่ตกลงไว้ เช่น ลดบัญชีค้างชำระกลับเป็น NPL และเพิ่มอัตราปิดแผนปรับโครงสร้าง เทียบ baseline ก่อนและหลังใช้งาน

**BA Junior:** Junior ควรจำว่า build ผ่าน requirement ยังไม่เท่ากับ value สำเร็จ ต้องดู metric, adoption, workaround และ root cause หลังใช้งานจริง จุดระวัง: อย่าจำแค่คำตอบ ให้โยงกับ evidence ในโจทย์และระบุ assumption ที่ยังไม่รู้

**BA Senior:** Senior review: ต้องใช้ evidence หลัง go-live แยกปัญหา requirement gap, process gap, usability, data quality, policy และ change readiness ก่อนเสนอ enhancement Bank lens: bank-native context; data/system integration; change/traceability; value realization

**BA Team Lead:** Team Lead gate: พร้อมเมื่อมี baseline vs actual result, root cause, corrective action owner และ decision ว่าจะ keep, improve, retire หรือ re-prioritize Decision: ตอบข้อนี้ได้ แต่ก่อนส่ง dev/test ต้องมี evidence, owner และ acceptance/checkpoint ที่ตรวจสอบได้

**บริบทแบงค์:** บริบทธนาคาร: ประเมินหลัง go-live ด้วย baseline vs actual KPI, adoption, defect/workaround, operational risk, customer impact และ benefit realization

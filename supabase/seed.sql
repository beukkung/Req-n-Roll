-- Req'n Roll - starter content generated from lib/content.ts.
-- Safe to re-run. Apply migrations 0001, 0002, and 0003 before this seed.

insert into public.skills (slug, name_th, name_en, short_th, chart_index) values
  ('requirement_thinking', 'ความคิดเชิง Requirement', 'Requirement Thinking', 'ถามให้ชัด แยกปัญหาออกจากสิ่งที่ต้องการ', 1),
  ('stakeholder_communication', 'การสื่อสารกับ Stakeholder', 'Stakeholder Communication', 'ดึงความเห็น จัดการความคาดหวัง สื่อสารให้ตรงกลุ่ม', 2),
  ('process_system_thinking', 'ความคิดเชิงกระบวนการและระบบ', 'Process & System Thinking', 'มองเห็นระบบรอบด้าน เชื่อมจุดต่าง ๆ เข้าด้วยกัน', 3),
  ('product_value_thinking', 'ความคิดเชิงผลิตภัณฑ์และคุณค่า', 'Product & Value Thinking', 'โฟกัสที่ outcome และคุณค่า ไม่ใช่แค่ feature', 4),
  ('agile_delivery', 'Agile & Delivery', 'Agile & Delivery', 'แบ่งงานเล็ก ส่งมอบซ้ำ ปรับได้ระหว่างทาง', 5),
  ('soft_skill_facilitation', 'Soft Skill & Facilitation', 'Soft Skill & Facilitation', 'ประสานคน นำสรุป ดึงความเห็นออกมาได้', 6)
on conflict (slug) do update set
  name_th = excluded.name_th,
  name_en = excluded.name_en,
  short_th = excluded.short_th,
  chart_index = excluded.chart_index;

insert into public.personas (
  slug, name_th, name_en, persona_title_th, persona_title_en,
  tagline_th, description_th, primary_skill, breed_slug,
  breed_personality_th, accent_chart_index
) values
  ('clarifier', 'เปอร์เซีย', 'Persian', 'The Clarifier', 'The Clarifier', 'นักชี้แจง — ถามให้กระจ่าง ตัดความกำกวม', 'คุณเก่งเรื่องการถามคำถามที่ทำให้ requirement กระจ่าง แยกแยะปัญหาจากสิ่งที่ผู้ใช้อยากได้ และไม่ปล่อยให้คำว่า ‘เอาให้เร็ว ๆ’ ผ่านเข้ามาโดยไม่มีรายละเอียด', 'requirement_thinking', 'persian', 'สงบและช่างสังเกต เหมือนแมวเปอร์เซียที่มองทุกอย่างละเอียดก่อนตัดสินใจ', 2),
  ('shipper', 'เบงกอล', 'Bengal', 'The Shipper', 'The Shipper', 'นักส่งมอบ — ทำซะให้เสร็จ ส่งของให้ได้', 'คุณโฟกัสที่การส่งมอบที่ทำได้จริง แบ่งงานใหญ่ให้เล็กลง และผลักทีมให้เห็นคุณค่าเร็ว ๆ ก่อนจะค่อยปรับเพิ่ม', 'agile_delivery', 'bengal', 'พลังงานสูงและว่องไว ชอบลงมือทำเหมือนเบงกอลที่ไม่อยู่นิ่ง', 1),
  ('facilitator', 'เมนคูน', 'Maine Coon', 'The Facilitator', 'The Facilitator', 'นักนำทาง — ประสานคน ดึงความเห็นออกมา', 'คุณเก่งการทำให้คนพูดคุยกันได้ สรุปความเห็นที่กระจัดกระจาย และทำให้การประชุมไม่จบลงด้วยคำว่า ‘แล้วแต่’', 'soft_skill_facilitation', 'mainecoon', 'อัธยาศัยดีและประสานคนเก่ง เหมือนเมนคูนที่เป็นมิตรกับทุกคน', 4),
  ('value_hunter', 'สยาม', 'Siamese', 'The Value Hunter', 'The Value Hunter', 'นักล่าคุณค่า — มองหา outcome ไม่ใช่แค่ feature', 'คุณถามเสมอว่าสิ่งที่ทำอยู่ลงทุนแล้วคุ้มไหม ใครได้ประโยชน์ อย่างไร และจะวัดผลสำเร็จได้อย่างไร', 'product_value_thinking', 'siamese', 'เฉียบขาดและสื่อสารตรงประเด็น เหมือนแมวสยามที่ชอบโวยวาแต่จิ้มลงตรงจุด', 3),
  ('scope_slayer', 'อะบิสซิเนียน', 'Abyssinian', 'The Scope Slayer', 'The Scope Slayer', 'นักกำจัดขอบเขต — จัดการ complexity ตัดสิ่งที่ไม่จำเป็น', 'คุณเห็นภาพรวมของระบบและกระบวนการ จับ dependency ได้ และกล้าตัด scope ที่ไม่สอดคล้องกับเป้าหมาย', 'process_system_thinking', 'abyssinian', 'ฉลาดและมองภาพรวม คล่องแคล่วอยากรู้อยากเห็น เหมือนอะบิสซิเนียนที่สำรวจทุกมุม', 5)
on conflict (slug) do update set
  name_th = excluded.name_th,
  name_en = excluded.name_en,
  persona_title_th = excluded.persona_title_th,
  persona_title_en = excluded.persona_title_en,
  tagline_th = excluded.tagline_th,
  description_th = excluded.description_th,
  primary_skill = excluded.primary_skill,
  breed_slug = excluded.breed_slug,
  breed_personality_th = excluded.breed_personality_th,
  accent_chart_index = excluded.accent_chart_index;

insert into public.skill_amp_questions (id, skill, text_th, "order", weight) values
  ('sa-rt-1', 'requirement_thinking', 'ฉันมักถาม ‘ทำไมต้องเป็นสิ่งนี้’ ก่อนยอมรับ requirement ใหม่', 1, 1),
  ('sa-rt-2', 'requirement_thinking', 'ฉันแยก ‘ปัญหา’ ออกจาก ‘วิธีแก้’ ได้ในการสนทนากับผู้ใช้', 2, 1),
  ('sa-sc-1', 'stakeholder_communication', 'ฉันปรับภาษาและระดับรายละเอียดให้เหมาะกับกลุ่มผู้ฟัง', 3, 1),
  ('sa-sc-2', 'stakeholder_communication', 'ฉันจัดการความคาดหวังที่ขัดแย้งกันระหว่าง stakeholder ได้', 4, 1),
  ('sa-ps-1', 'process_system_thinking', 'ฉันมองเห็นผลกระทบของการเปลี่ยนแปลงหนึ่งจุดที่มีต่อระบบรอบด้าน', 5, 1),
  ('sa-ps-2', 'process_system_thinking', 'ฉันเชื่อม requirement เข้ากับกระบวนการทำงานที่มีอยู่เดิมได้', 6, 1),
  ('sa-pv-1', 'product_value_thinking', 'ฉันถามเสมอว่า feature นี้สร้างคุณค่าอะไร ใครได้ประโยชน์', 7, 1),
  ('sa-pv-2', 'product_value_thinking', 'ฉันเสนอวิธีวัดผลสำเร็จของสิ่งที่จะสร้าง', 8, 1),
  ('sa-ag-1', 'agile_delivery', 'ฉันแบ่งงานใหญ่ให้เล็กลงจนส่งมอบได้ภายในรอบสั้น ๆ', 9, 1),
  ('sa-ag-2', 'agile_delivery', 'ฉันยอมปล่อยของก่อนแล้วค่อยปรับ ดีกว่ารอให้สมบูรณ์', 10, 1),
  ('sa-ss-1', 'soft_skill_facilitation', 'ฉันทำให้คนที่เงียบในที่ประชุมพูดออกมาได้', 11, 1),
  ('sa-ss-2', 'soft_skill_facilitation', 'ฉันสรุปความเห็นที่กระจัดกระจายให้กลายเป็นข้อตกลงได้', 12, 1)
on conflict (id) do update set
  skill = excluded.skill,
  text_th = excluded.text_th,
  "order" = excluded."order",
  weight = excluded.weight;

insert into public.daily_req_questions (id, type, prompt_th, options, answer, explanation_th) values
  ('dr-q1', 'requirement_quality', 'Requirement ข้อไหนเขียนได้ ‘ดีที่สุด’?', '["ระบบต้องเร็ว","ผู้ใช้ค้นหาสินค้าได้ภายใน 2 วินาที","ระบบต้องดีขึ้น","หน้าจอควรสวยงาม"]'::jsonb, 1, 'Requirement ที่ดีต้องวัดได้และทดสอบได้ ‘ภายใน 2 วินาที’ สื่อพฤติกรรมที่ชัดเจนและมีเกณฑ์ยอมรับ (acceptance) ได้'),
  ('dr-q2', 'user_story_gap', 'User story: “ในฐานะลูกค้า ฉันอยากกรอกฟอร์มเพื่อสมัคร” — ข้อใดขาดหายไป?', '["Persona","Reason / Value","UI สี","Database"]'::jsonb, 1, 'รูปแบบครบคือ “…เพื่อ <เหตุผล/คุณค่า>” การขาด ‘เพื่ออะไร’ ทำให้ทีมไม่รู้ว่าสร้างเพื่อ outcome ใด'),
  ('dr-q3', 'stakeholder_followup', 'Stakeholder บอก “ทำให้ปุ่มใหญ่ขึ้น” — คำถามติดตามที่ ‘ค้นหา root need’ ที่สุดคือ?', '["จะทำให้ใหญ่แค่ไหน?","ปุ่มสีอะไรดี?","เจอปัญหาอะไรตอนกดปุ่มอยู่?","เอาไว้ที่ไหนดี?"]'::jsonb, 2, 'ก่อนรับ solution ควรถามปัญหาที่แท้จริง ‘ตอนกดปุ่มเจออะไร’ เปิดทางให้เห็น root need ไม่ใช่แค่ขนาด'),
  ('dr-q4', 'ac_testable', 'Acceptance criteria ข้อใด ‘ทดสอบได้’ ชัดที่สุด?', '["ระบบใช้งานง่าย","ผู้ใช้สามารถรีเซ็ตรหัสผ่านได้ภายใน 3 ขั้นตอน","หน้าจอสวย","ทำงานได้ดี"]'::jsonb, 1, '‘ภายใน 3 ขั้นตอน’ สามารถนับและทดสอบได้ เป็นเกณฑ์ที่ชัดเจน ส่วนข้ออื่นเป็นคำกว้าง ๆ วัดยาก'),
  ('dr-q5', 'scope_risk', 'Stakeholder ขอเพิ่ม 10 features กลางสprint — การกระทำที่ ‘เหมาะสม’ ที่สุดคือ?', '["รับหมดเพื่อให้พอใจ","ปฏิเสธทั้งหมด","ประเมินผลกระทบแล้วเสนอ swap ลำดับความสำคัญ","เงียบไว้ก่อน"]'::jsonb, 2, 'การจัดการ scope คือประเมิน trade-off แล้วเสนอทางเลือก ไม่ใช่รับหรือปฏิเสธสุดโต่ง — swap ตามคุณค่า/ลำดับความสำคัญคือหัวใจ')
on conflict (id) do update set
  type = excluded.type,
  prompt_th = excluded.prompt_th,
  options = excluded.options,
  answer = excluded.answer,
  explanation_th = excluded.explanation_th;

insert into public.req_gym_questions (id, knowledge_area, difficulty, prompt_th, options, answer, explanation_th) values
  ('rg-1', 'elicitation_collaboration', 'easy', 'เทคนิค ‘brainstorming’ เหมาะที่สุดกับสถานการณ์ใด?', '["สรุปผลทดสอบระบบ","ระดมไอเดียจากหลายฝ่ายในช่วงต้นของโจทย์","ตรวจสอบรายได้-รายจ่าย","เขียน SQL"]'::jsonb, 1, 'Brainstorming คือการระดมความคิดอย่างเปิดกว้าง เหมาะกับช่วงที่ต้องการมุมมองหลากหลายก่อนไปกลั่นกรอง (อยู่ใน Elicitation & Collaboration)'),
  ('rg-2', 'requirements_lifecycle', 'medium', 'Requirement ‘ต้องทำงานร่วมกับระบบเดิมที่ใช้อยู่’ — เป็นข้อจำกัดประเภทใด?', '["Functional requirement","Non-functional / constraint","User preference","Nice-to-have"]'::jsonb, 1, 'การต้องทำงานร่วมกับระบบเดิมเป็น ‘constraint’ และมักจัดเป็น non-functional requirement ที่ส่งผลต่อการออกแบบ solution'),
  ('rg-3', 'strategy_analysis', 'hard', 'เมื่อมี ‘needs’ ใหม่ ๆ เข้ามา สิ่งแรกที่ BA ควรทำตามแนวคิด Strategy Analysis คือ?', '["เริ่มเขียน code ทันที","ตรวจสอบว่าสอดคล้องกับเป้าหมายและบริบทขององค์กรหรือไม่","สั่งซื้อ license","เลือก vendor"]'::jsonb, 1, 'Strategy Analysis ให้ BA พิจารณา needs เทียบกับเป้าหมายและบริบทองค์กร (current state / future state) ก่อนลงรายละเอียด solution'),
  ('rg-4', 'solution_evaluation', 'medium', 'วัด ‘คุณค่า’ ของ solution หลังส่งมอบ — วิธีใดเหมาะที่สุด?', '["นับจำนวน meeting","ดู KPI/outcome ที่ตกลงกันไว้เทียบก่อน-หลัง","นับจำนวนบรรทัด code","ถามเฉพาะทีมพัฒนา"]'::jsonb, 1, 'Solution Evaluation ใช้ตัวชี้วัดและ outcome ที่กำหนดไว้ล่วงหน้า เปรียบเทียบก่อน/หลังเพื่อเห็นว่า solution สร้างคุณค่าจริงหรือไม่'),
  ('rg-5', 'business_analysis_planning', 'easy', 'สิ่งที่ควรอยู่ใน ‘Business Analysis Plan’ คือ?', '["รายชื่อพนักงานทั้งบริษัท","ขอบเขต เทคนิค และกำหนดการของงานวิเคราะห์","โครงสร้างฐานข้อมูล","แบบฟอร์มลางาน"]'::jsonb, 1, 'BA Plan ระบุขอบเขต เทคนิค ส่งมอบ และกำหนดการของงานวิเคราะห์ เพื่อให้ทีมรู้ว่าจะทำอะไร อย่างไร เมื่อไหร่'),
  ('rg-6', 'underlying_competencies', 'easy', ' ‘Active listening’ ช่วยอะไรในการทำ BA มากที่สุด?', '["พิมพ์เร็วขึ้น","เข้าใจความต้องการแท้จริงที่ผู้พูดอาจไม่ได้บอกตรง ๆ","ทำให้ได้คำตอบใน 1 นาที","หลีกเลี่ยงการถาม"]'::jsonb, 1, 'Active listening ช่วยจับสัญญาณ ความลังเล และประเด็นซ่อนเร้น ซึ่งนำไปสู่คำถามติดตามที่แตะความต้องการแท้จริง')
on conflict (id) do update set
  knowledge_area = excluded.knowledge_area,
  difficulty = excluded.difficulty,
  prompt_th = excluded.prompt_th,
  options = excluded.options,
  answer = excluded.answer,
  explanation_th = excluded.explanation_th;

insert into public.templates (slug, name, category, description_th, meta, file_path) values
  ('one-page-brd', 'One-Page BRD', 'Planning', 'แม่แบบ BRD หน้าเดียว กระชับ ใส่ context, goal, scope, stakeholder และ success metrics', '1 หน้า', 'one-page-brd.md'),
  ('user-story-card', 'User Story Card', 'Writing', 'การ์ด user story พร้อมช่อง ‘As a / I want / so that’ + acceptance criteria และ definition of done', 'การ์ด A6', 'user-story-card.md'),
  ('stakeholder-map', 'Stakeholder Map', 'Discovery', 'ผังจัดกลุ่ม stakeholder ตามอำนาจ/ความสนใจ พร้อมแผนการสื่อสารรายกลุ่ม', '1 หน้า', 'stakeholder-map.md'),
  ('retro-action', 'Retro → Action', 'Delivery', 'ฟอร์ม retrospective ที่เน้น action ที่ชัดเจน มีเจ้าของและกำหนดการ ไม่ใช่แค่ระบายความรู้สึก', '1 หน้า', 'retro-action.md'),
  ('priority-matrix', 'Priority Matrix', 'Decision', 'ตารางจัดลำดับความสำคัญ value vs. effort พร้อมคอลัมน์ rationale เพื่อช่วยตัดสินใจแบบมีเหตุผล', '1 หน้า', 'priority-matrix.md')
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description_th = excluded.description_th,
  meta = excluded.meta,
  file_path = excluded.file_path;

-- Optional: replace with real beta emails if Supabase Auth is added later.
insert into public.internal_allowlist (email, note) values
  ('you@yourcompany.com', 'seed - replace with real beta emails')
on conflict (email) do nothing;

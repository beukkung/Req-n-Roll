import { TEMPLATES } from "./content";
import type { Template } from "./types";
import { ensureNickProfile } from "./supabase/nickname-profile";

/**
 * Working downloads without a backend: each template ships a rich Markdown
 * body generated on the fly (Blob). When Supabase Storage is configured the
 * download helper fetches the real file from the `templates` bucket and
 * records the download; otherwise it falls back to the Markdown body so the
 * button is never dead.
 */
export const TEMPLATE_BODIES: Record<string, string> = {
  "one-page-brd": `# One-Page BRD — ${"{ชื่อโครงการ}"}

> ใส่ให้ครบในหน้าเดียว: ทำไม ทำอะไร ใครเกี่ยวข้อง และรู้ว่าสำเร็จเมื่อไหร่

## Context / ที่มา
- ปัญหาหรือโอกาสคืออะไร
- ผลกระทบถ้าไม่ทำ

## Goal & Success Metrics
- เป้าหมาย (outcome ไม่ใช่ feature):
- ตัวชี้วัดความสำเร็จ (วัดได้):
  - [ ] …
  - [ ] …

## Scope
- In scope:
- Out of scope:

## Stakeholders
| กลุ่ม | บทบาท | ความสนใจ/ผลประโยชน์ | ช่องทางสื่อสาร |
|------|-------|--------------------|--------------|
|      |       |                    |              |

## Key Requirements (เบื้องต้น)
1. 
2. 
3. 

## Assumptions & Constraints
- 
- 

## Risks
| ความเสี่ยง | ผลกระทบ | แผนรับมือ |
|-----------|--------|----------|
|           |        |          |
`,
  "user-story-card": `# User Story Card

## Story
**ในฐานะ** _{persona}_
**ฉันอยาก** _{ความต้องการ}_
**เพื่อที่จะ** _{คุณค่า/outcome}_

## Acceptance Criteria
- [ ] เงื่อนไขที่ทดสอบได้ 1
- [ ] เงื่อนไขที่ทดสอบได้ 2
- [ ] เงื่อนไขที่ทดสอบได้ 3

## Definition of Done
- [ ] ผ่าน code review
- [ ] มี automated test
- [ ] ผ่านการยืนยันจาก stakeholder
- [ ] deploy ขึ้น environment ที่กำหนด

## Notes / Questions
- 
- 
`,
  "stakeholder-map": `# Stakeholder Map

จัดกลุ่มตาม **Power × Interest** แล้ววางแผนสื่อสารรายกลุ่ม

## จัดกลุ่ม
| Stakeholder | Power (สูง/กลาง/ต่ำ) | Interest (สูง/กลาง/ต่ำ) | กลุ่ม | เป้าหมายการสื่อสาร |
|-------------|---------------------|------------------------|------|------------------|
|             |                     |                        |      |                  |

## แผนการสื่อสาร
- **Manage closely** (Power สูง + Interest สูง): พบปะ/อัปเดตทุกสัปดาห์, ขอ sign-off
- **Keep satisfied** (Power สูง + Interest ต่ำ): สรุปรายงานกระชับ, สื่อสารเมื่อมีจุดตัดสินใจ
- **Keep informed** (Power ต่ำ + Interest สูง): อัปเดตประจำ, เปิดช่องรับ feedback
- **Monitor** (Power ต่ำ + Interest ต่ำ): สื่อสารเมื่อจำเป็น

## ความคาดหวังที่ขัดแย้งกัน
| ฝ่าย A | ฝ่าย B | ประเด็นขัดแย้ง | ทางออกที่เสนอ |
|--------|--------|--------------|--------------|
|        |        |              |              |
`,
  "retro-action": `# Retro → Action

> เน้น action ที่มีเจ้าของและกำหนดการ ไม่ใช่แค่ระบายความรู้สึก

## เกิดอะไรขึ้น (สัปดาห์/สprint นี้)
- ไปได้ดี (Keep):
- ควรปรับ (Improve):
- อยากลอง (Try):

## Root cause (สำหรับประเด็นที่ต้องปรับ)
- เพราะอะไร? (ถาม "ทำไม" 5 ครั้ง)
- 

## Action items
| # | Action | เจ้าของ | กำหนดการ | สถานะ |
|---|--------|--------|---------|-------|
| 1 |        |        |         | ☐     |
| 2 |        |        |         | ☐     |

## ข้อตกลงร่วม
- 
`,
  "priority-matrix": `# Priority Matrix (Value × Effort)

> ช่วยตัดสินใจแบบมีเหตุผล — ใส่ rationale ด้วย ไม่ใช่แค่ตัวเลข

## ตารางจัดลำดับ
| # | Initiative | Value (1–5) | Effort (1–5) | Score (V−E) | Rationale | ลำดับ |
|---|------------|------------|-------------|------------|-----------|------|
| 1 |            |            |             |            |           |      |
| 2 |            |            |             |            |           |      |

## การจัดกลุ่ม
- **ทำก่อน (Quick win)** — Value สูง, Effort ต่ำ
- **ลงทุนระยะกลาง** — Value สูง, Effort สูง (วางแผน)
- **เก็บไว้ก่อน** — Value ต่ำ, Effort สูง
- **พิจารณาตามจังหวะ** — Value ต่ำ, Effort ต่ำ

## ข้อสมมติ
- 
`,
};

function slugToFilename(t: Template): string {
  return `${t.slug}.md`;
}

function triggerDownload(filename: string, content: string, mime: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function downloadTemplate(
  t: Template,
  nickname?: string,
): Promise<void> {
  const { createClient } = await import("./supabase/client");
  const supabase = createClient();
  let downloaded = false;

  // Backend path: fetch from storage + count the download.
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from("templates")
        .download(`${t.slug}.md`);
      if (!error && data) {
        const text = await data.text();
        triggerDownload(slugToFilename(t), text, "text/markdown");
        downloaded = true;
      }
    } catch {
      /* fall through to generated body */
    }
  }

  // Fallback: generated Markdown body so the download always works.
  if (!downloaded) {
    const body = TEMPLATE_BODIES[t.slug] ?? `# ${t.name}\n\n_แม่แบบกำลังเตรียม_\n`;
    triggerDownload(slugToFilename(t), body, "text/markdown");
  }

  if (supabase) {
    const clean = nickname
      ? await ensureNickProfile(supabase, nickname)
      : null;
    await supabase.from("template_downloads").insert({
      template_id: t.slug,
      nickname: clean,
    });
  }
}

export function templatesByCategory(): { category: string; items: Template[] }[] {
  const groups = new Map<string, Template[]>();
  for (const t of TEMPLATES) {
    const arr = groups.get(t.category) ?? [];
    arr.push(t);
    groups.set(t.category, arr);
  }
  return [...groups.entries()].map(([category, items]) => ({ category, items }));
}

import { FileText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { TemplateCard } from "@/components/template-card";
import { getTemplatesRemote } from "@/lib/content-remote";
import { createStaticClient } from "@/lib/supabase/static";

export const metadata = {
  title: "Setlist Templates",
  description: "5 แม่แบบพร้อมใช้สำหรับงาน BA — ดาวน์โหลดแล้วใช้ได้เลย",
};

export default async function TemplatesPage() {
  const templates = await getTemplatesRemote(createStaticClient());

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Setlist Templates"
        title="แม่แบบพร้อมใช้"
        description="5 แม่แบบสำหรับงาน BA จริง — ตั้งแต่ BRD, User Story, Stakeholder Map ถึง Retro และ Priority Matrix ดาวน์โหลดเป็น Markdown แล้วเอาไปใช้ได้เลย"
      >
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-600 text-secondary-foreground">
          <FileText className="h-3.5 w-3.5" /> {templates.length} แม่แบบ
        </p>
      </PageHeader>

      <section className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          เปิดด้วยโปรแกรมอ่าน Markdown หรือ Notion / Obsidian / VS Code ก็ได้
        </p>
      </section>
    </div>
  );
}

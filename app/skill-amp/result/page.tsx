"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PersonaResult } from "@/components/persona-result";
import { SKILL_AMP_RESULT_KEY, type SkillAmpResult } from "@/lib/skill-amp";
import { useJSON } from "@/lib/use-store";

export default function SkillAmpResultPage() {
  const result = useJSON<SkillAmpResult | null>(SKILL_AMP_RESULT_KEY, null);

  if (!result) {
    return (
      <div className="py-12 sm:py-16">
        <PageHeader
          eyebrow="ผลลัพธ์"
          title="ยังไม่มีผลลัพธ์"
          description="ทำแบบทดสอบ Skill Amp ก่อน แล้วกลับมาดูบุคลิก BA และเรดาร์ 6 ทักษะของคุณที่นี่"
        />
        <div className="mx-auto mt-8 w-full max-w-2xl px-4 sm:px-6">
          <Link
            href="/skill-amp/quiz"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            เริ่มวัดสกิล <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        backHref="/skill-amp"
        backLabel="กลับหน้าวัดสกิล"
        eyebrow={
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" /> บุคลิก BA ของคุณ
          </span>
        }
        title="นี่คือผลของคุณ"
      />
      <div className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">
        <PersonaResult scores={result.scores} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/daily-req"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
          >
            เล่น Daily Req ต่อ <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/skill-amp/quiz"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            ทำแบบทดสอบใหม่
          </Link>
        </div>
      </div>
    </div>
  );
}

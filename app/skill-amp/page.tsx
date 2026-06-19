"use client";

import Link from "next/link";
import { ArrowRight, Clock, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Mascot } from "@/components/mascot/mascot";
import { BreedCat } from "@/components/mascot/breed-cat";
import { SKILLS, PERSONAS } from "@/lib/content";
import { SKILL_AMP_RESULT_KEY, type SkillAmpResult } from "@/lib/skill-amp";
import { useJSON } from "@/lib/use-store";

export default function SkillAmpIntroPage() {
  const prev = useJSON<SkillAmpResult | null>(SKILL_AMP_RESULT_KEY, null);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <Mascot state="think" size="lg" />
          </div>
          <PageHeader
            className="px-0 sm:px-0"
            eyebrow="วัดสกิล 6 มิติ"
            title="Skill Amp"
            description="ตอบแบบสอบถามเพื่อดูภาพจุดแข็งและจุดที่ต้องฝึกของคุณใน 6 ทักษะ แล้วรู้จัก ‘สายพันธุ์แมว BA’ ของตัวเองพร้อมคำแนะนำเฉพาะตัว"
          >
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/skill-amp/quiz"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {prev ? "ทำใหม่อีกครั้ง" : "เริ่มวัดสกิล"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> ประมาณ 5 นาที · ไม่มีถูก-ผิด
              </span>
            </div>

            {prev ? (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-primary/40 bg-primary/5 p-4">
                <p className="text-sm text-foreground/80">
                  คุณเคยทำแบบทดสองแล้ว — ดูผลล่าสุดของคุณได้
                </p>
                <Link
                  href="/skill-amp/result"
                  className="inline-flex items-center gap-1 text-sm font-600 text-primary hover:underline"
                >
                  <RotateCcw className="h-4 w-4" /> ดูผลล่าสุด
                </Link>
              </div>
            ) : null}
          </PageHeader>
        </div>
      </div>

      {/* 6 dimensions */}
      <section className="mx-auto mt-12 w-full max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-xl font-700">6 มิติที่วัด</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <li
              key={s.slug}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="font-600">{s.nameTh}</p>
              <p className="mt-1 text-sm text-foreground/70">{s.shortTh}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 breeds */}
      <section className="mx-auto mt-12 w-full max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-xl font-700">5 สายพันธุ์แมว BA</h2>
        <p className="mt-1 text-sm text-foreground/70">
          ทักษะที่คุณเด่นที่สุดจะบอกว่าคุณเป็นสายพันธุ์ไหน
        </p>
        <ul className="mt-4 space-y-3">
          {PERSONAS.map((p) => (
            <li
              key={p.slug}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <BreedCat
                breed={p.breedSlug}
                className="h-16 w-16 shrink-0"
                title={p.nameTh}
              />
              <div>
                <p className="font-600">
                  {p.nameTh}{" "}
                  <span className="text-sm font-400 text-muted-foreground">
                    · {p.personaTitleTh}
                  </span>
                </p>
                <p className="mt-0.5 text-sm text-foreground/70">
                  {p.breedPersonalityTh}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

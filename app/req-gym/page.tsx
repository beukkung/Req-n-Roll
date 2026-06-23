import Link from "next/link";
import { ArrowRight, Dumbbell } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getReqGymSets } from "@/lib/req-gym";
import { getReqGymPracticeSetSize } from "@/lib/req-gym-practice";
import { getReqGymQuestionsRemote } from "@/lib/content-remote";
import { createStaticClient } from "@/lib/supabase/static";

export const metadata = {
  title: "Req Gym",
  description:
    "คลังข้อสอบฝึก BA certification-style 1,000 ข้อ ครอบคลุม BABOK knowledge areas สำหรับคนเตรียม ECBA, CCBA และ CBAP",
};

export default async function ReqGymPage() {
  const sets = getReqGymSets();
  const reqGymQuestions = await getReqGymQuestionsRemote(createStaticClient());
  const countByArea = reqGymQuestions.reduce<Record<string, number>>(
    (acc, q) => {
      acc[q.area] = (acc[q.area] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Req Gym"
        title="BA Certification Practice Gym"
        description="ฝึกข้อสอบสถานการณ์แบบ BA certification-style ครอบคลุม 6 BABOK knowledge areas แต่ละรอบเป็นชุดสุ่มสั้น ๆ พร้อมคำอธิบายทันที เหมาะกับคนเตรียม ECBA, CCBA และ CBAP"
      >
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-600 text-secondary-foreground">
          <Dumbbell className="h-3.5 w-3.5" /> โจทย์ทั้งหมด {reqGymQuestions.length} ข้อ
        </p>
      </PageHeader>

      <section className="mx-auto mt-10 w-full max-w-4xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {sets.map((set) => {
            const count = set.mock ? reqGymQuestions.length : countByArea[set.id] ?? 0;
            const setSize = Math.min(getReqGymPracticeSetSize(set.id), count);
            return (
              <Link
                key={set.id}
                href={`/req-gym/practice/${set.id}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
              >
                <div>
                  <h2 className="font-display text-lg font-700">{set.nameTh}</h2>
                  <p className="mt-1 text-sm text-foreground/70">{set.shortTh}</p>
                  <p className="mt-3 text-xs font-600 text-muted-foreground">
                    สุ่ม {setSize} ข้อ/รอบ · จากคลัง {count} ข้อ
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/12 text-primary transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          IIBA-aligned practice · ไม่ใช่ข้อสอบอย่างเป็นทางการของ IIBA
        </p>
      </section>
    </div>
  );
}

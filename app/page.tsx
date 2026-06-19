import {
  CalendarDays,
  Dumbbell,
  FileText,
  Gauge,
  MessageSquareHeart,
  Mic2,
  Sparkles,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { ProgressPanel } from "@/components/progress-panel";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ProgressPanel />

      {/* Feature overview */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              Setlist
            </p>
            <h2 className="mt-1 font-display text-3xl font-700 tracking-tight sm:text-4xl">
              เลือกเล่นได้ตามใจ ไม่ต้องตามลำดับ
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground sm:block">
            ทุกฟีเจอร์ออกแบบมาให้ใช้ได้จริงในงาน ไม่ใช่แค่เรียนรู้ทฤษฎี
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            href="/skill-amp"
            icon={Gauge}
            title="Skill Amp"
            titleTh="วัดสกิล 6 มิติ"
            description="ทำแบบทดสอบ 30-40 ข้อ แล้วรู้จักสายพันธุ์แมว BA ของคุณ พร้อมเรดาร์ 6 ทักษะและคำแนะนำเฉพาะตัว"
            cta="เริ่มวัดสกิล"
          />
          <FeatureCard
            href="/daily-req"
            icon={CalendarDays}
            title="Daily Req"
            titleTh="Req ประจำวัน"
            description="โจทย์สั้น ๆ วันละไม่กี่ข้อ ตอบแล้วได้ feedback ทันที เห็นช่องโหว่ในการถาม requirement"
            cta="เล่นของวันนี้"
            badge="Daily"
          />
          <FeatureCard
            href="/req-gym"
            icon={Dumbbell}
            title="Req Gym"
            titleTh="โรงยิม Requirement"
            description="ฝึกโจทย์ IIBA-aligned ครอบคลุม BABOK knowledge areas ยิ่งฝึกยิ่งแม่น เหมาะกับคนเตรียม ECBA"
            cta="เข้ายิม"
          />
          <FeatureCard
            href="/templates"
            icon={FileText}
            title="Setlist Templates"
            titleTh="เทมเพลตใช้งานจริง"
            description="5 แม่แบบพร้อมใช้ — BRD, User Story, Stakeholder Map ฯลฯ ดาวน์โหลดแล้วใช้ได้เลยวันนี้"
            cta="ดูเทมเพลต"
          />
          <FeatureCard
            href="/feedback"
            icon={MessageSquareHeart}
            title="Feedback"
            titleTh="ส่งเสียงให้เรา"
            description="บอกเราว่าอะไรใช้ได้จริง อะไรต้องปรับ — แล้วเราจะนำไปเล่นในเพลงถัดไป"
            cta="ส่ง Feedback"
          />
          <FeatureCard
            href="#roadmap"
            icon={Mic2}
            title="Roll Play"
            titleTh="มาเล่นบทบาทกัน"
            description="ฝึกเล่นบทสนทนากับ stakeholder ผ่านสถานการณ์จำลอง — กำลังจะมีในเฟสถัดไป"
            cta="เร็ว ๆ นี้"
            badge="เร็ว ๆ นี้"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border/80 bg-secondary/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              How it works
            </p>
          </div>
          <h2 className="mt-2 font-display text-3xl font-700 tracking-tight sm:text-4xl">
            3 ขั้น สู่การถามแบบคนคุมเกม
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "วัด",
                d: "เริ่มจาก Skill Amp เพื่อรู้จุดแข็ง-จุดที่ต้องฝึกของตัวเองใน 6 มิติ",
              },
              {
                n: "02",
                t: "ฝึก",
                d: "เล่น Daily Req ทุกวัน และยกดัมเบลที่ Req Gym เพื่อสร้างกล้ามเนื้อการถาม",
              },
              {
                n: "03",
                t: "ใช้จริง",
                d: "หยิบเทมเพลตไปใช้ในงาน แล้ววนกลับมาส่ง feedback เพื่อพัฒนาต่อ",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="rounded-xl border border-border bg-background p-6"
              >
                <span className="font-display text-3xl font-700 text-primary/80">
                  {step.n}
                </span>
                <h3 className="mt-2 font-display text-xl font-700">{step.t}</h3>
                <p className="mt-1 text-sm text-foreground/75">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Roadmap teaser */}
      <section id="roadmap" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-700 tracking-tight sm:text-4xl">
          เพลงถัดไปใน Setlist
        </h2>
        <p className="mt-2 max-w-2xl text-foreground/75">
          ฟีเจอร์เหล่านี้อยู่ในแผนเฟส 2 — ติดตามกันต่อ
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Roll Play",
            "Req Doctor",
            "Tracklist",
            "Jam Room",
            "Badges",
            "Leaderboard",
            "Coaching / Office Hour",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm text-foreground/75"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

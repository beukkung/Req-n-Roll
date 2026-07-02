import {
  Bot,
  CalendarDays,
  ClipboardCheck,
  Dumbbell,
  FileText,
  Gauge,
  ListMusic,
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
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              Practice foundation
            </p>
          </div>
          <FeatureCard
            href="/skill-amp"
            icon={Gauge}
            title="Skill Amp"
            meta={["12 questions", "+100 XP", "Baseline"]}
            titleTh="วัดสกิล 6 มิติ"
            description="ทำแบบทดสอบ 12 ข้อ แล้วรู้จักสายพันธุ์แมว BA ของคุณ พร้อมเรดาร์ 6 ทักษะและคำแนะนำเฉพาะตัว"
            cta="เริ่มวัดสกิล"
          />
          <FeatureCard
            href="/daily-req"
            icon={CalendarDays}
            title="Daily Req"
            meta={["10 min", "+30 XP", "Daily"]}
            titleTh="Req ประจำวัน"
            description="โจทย์สั้น ๆ วันละไม่กี่ข้อ ตอบแล้วได้ feedback ทันที เห็นช่องโหว่ในการถาม requirement"
            cta="เล่นของวันนี้"
            badge="Daily"
          />
          <FeatureCard
            href="/req-gym"
            icon={Dumbbell}
            title="Req Gym"
            meta={["Banking drill", "+40 XP", "Recommended"]}
            titleTh="โรงยิม Requirement"
            description="ฝึกโจทย์ IIBA-aligned ครอบคลุม BABOK knowledge areas ยิ่งฝึกยิ่งแม่น เหมาะกับคนเตรียม ECBA"
            cta="เข้ายิม"
          />
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              Tools
            </p>
          </div>
          <FeatureCard
            href="/templates"
            icon={FileText}
            title="Setlist Templates"
            meta={["Work kit", "+10 XP", "Download"]}
            titleTh="เทมเพลตใช้งานจริง"
            description="5 แม่แบบพร้อมใช้ — BRD, User Story, Stakeholder Map ฯลฯ ดาวน์โหลดแล้วใช้ได้เลยวันนี้"
            cta="ดูเทมเพลต"
          />
          <FeatureCard
            href="/feedback"
            icon={MessageSquareHeart}
            title="Feedback"
            meta={["2 min", "+15 XP", "Community"]}
            titleTh="ส่งเสียงให้เรา"
            description="บอกเราว่าอะไรใช้ได้จริง อะไรต้องปรับ — แล้วเราจะนำไปเล่นในเพลงถัดไป"
            cta="ส่ง Feedback"
          />
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              Applied drills
            </p>
          </div>
          <FeatureCard
            href="/role-play"
            icon={Mic2}
            title="Role Play"
            meta={["20 min", "+50 XP", "Banking drill"]}
            titleTh="ซ้อมคุยกับ stakeholder"
            description="ฝึกถามในสถานการณ์จำลองของงานแบงค์ เช่น requirement ไม่ชัด, compliance challenge, sponsor เปลี่ยน scope และ policy เปลี่ยนกลาง UAT"
            cta="เริ่มซ้อม"
            badge="Live"
          />
          <FeatureCard
            href="/req-doctor"
            icon={ClipboardCheck}
            title="Req Doctor"
            meta={["15 min", "+35 XP", "Quality check"]}
            titleTh="ตรวจ requirement ก่อนส่งต่อ"
            description="วาง requirement หรือ user story แล้วให้ระบบช่วยชี้จุดกำกวม, acceptance criteria ที่ขาด และ banking control ที่ควรคิดตั้งแต่ต้น"
            cta="ตรวจ requirement"
            badge="Live"
          />
          <FeatureCard
            href="/tracklist"
            icon={ListMusic}
            title="Tracklist"
            meta={["Path hub", "Recommended", "Checkpoint"]}
            titleTh="learning path สำหรับ BA"
            description="เลือก playlist การฝึกตามเป้าหมาย เช่น Junior BA foundation, Banking BA control path หรือ ECBA prep sprint"
            cta="เลือก path"
            badge="Live"
          />
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              Career and Community
            </p>
          </div>
          <FeatureCard
            href="/coach-bot"
            icon={Bot}
            title="Coach Bot"
            meta={["10 min", "+20 XP", "Office hour"]}
            titleTh="office hour แบบ chatbot"
            description="ถาม mentor, BA team lead, compliance lens หรือ career coach เพื่อเตรียมคำถามและวางแผนเติบโตในสาย BA"
            cta="เปิด office hour"
            badge="Office hour"
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

    </>
  );
}

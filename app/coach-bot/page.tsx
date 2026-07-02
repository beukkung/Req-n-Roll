import { PageHeader } from "@/components/page-header";
import { CoachBotPanel } from "@/components/coach-bot-panel";

export const metadata = {
  title: "Coach Bot",
  description: "Office hour chatbot สำหรับ BA งานแบงค์",
};

export default function CoachBotPage() {
  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Office Hour"
        title="Coach Bot"
        description="chatbot แบบ office hour สำหรับถาม mentor, BA team lead, compliance lens หรือ career coach ก่อนเข้าห้อง stakeholder และก่อนวางแผนก้าวถัดไป"
        backHref="/"
      />

      <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
        <CoachBotPanel />
      </section>
    </div>
  );
}

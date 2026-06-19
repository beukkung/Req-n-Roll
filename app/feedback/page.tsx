import { PageHeader } from "@/components/page-header";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata = {
  title: "Feedback",
  description: "ส่ง feedback เพื่อให้เราพัฒนา Req'n Roll ต่อไป",
};

export default function FeedbackPage() {
  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="ส่งเสียงให้เรา"
        title="Feedback"
        description="บอกเราว่าอะไรใช้ได้จริง อะไรต้องปรับ แล้วเราจะนำไปเล่นในเพลงถัดไป — ยิ่งเจาะจง เรายิ่งแก้ได้ตรงจุด"
      />
      <div className="mx-auto mt-8 w-full max-w-2xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}

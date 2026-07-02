import { PageHeader } from "@/components/page-header";
import { ReqDoctorWorkbench } from "@/components/req-doctor-workbench";

export const metadata = {
  title: "Req Doctor",
  description: "ตรวจ requirement และ acceptance criteria ว่ายังเสี่ยงตีความผิดตรงไหน",
};

export default function ReqDoctorPage() {
  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Review Tool"
        title="Req Doctor"
        description="วาง requirement หรือ user story แล้วให้ระบบช่วยชี้จุดกำกวม, acceptance criteria ที่ขาด, traceability และ control สำคัญของงานแบงค์"
        backHref="/"
      />

      <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
        <ReqDoctorWorkbench />
      </section>
    </div>
  );
}

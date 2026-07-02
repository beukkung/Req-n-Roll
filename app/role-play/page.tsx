import { PageHeader } from "@/components/page-header";
import { RolePlaySimulator } from "@/components/role-play-simulator";

export const metadata = {
  title: "Role Play",
  description: "ฝึกคุยกับ stakeholder ในสถานการณ์ requirement ของงานธนาคาร",
};

export default function RolePlayPage() {
  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Simulation Drill"
        title="Role Play"
        description="ซ้อมถาม stakeholder ในสถานการณ์จำลองแบบงานแบงค์: scope ไม่ชัด, compliance challenge, sponsor เปลี่ยน scope และ policy เปลี่ยนกลางทาง"
        backHref="/"
      />

      <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
        <RolePlaySimulator />
      </section>
    </div>
  );
}

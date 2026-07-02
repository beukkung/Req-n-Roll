import { PageHeader } from "@/components/page-header";
import { TracklistBoard } from "@/components/tracklist-board";
import { LEARNING_TRACKS } from "@/lib/tracklist";

export const metadata = {
  title: "Tracklist",
  description: "Learning paths สำหรับ Junior BA, Banking BA และ ECBA prep",
};

export default function TracklistPage() {
  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Learning Path"
        title="Tracklist"
        description="playlist การฝึกที่ต่อจาก Skill Amp, Req Gym, Role Play, Req Doctor และ Coach Bot ให้เลือกเส้นทางตาม skill gap และบริบทงานแบงค์"
        backHref="/"
      />

      <TracklistBoard tracks={LEARNING_TRACKS} />
    </div>
  );
}

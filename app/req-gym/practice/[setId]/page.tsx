import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { ReqGymRunner } from "@/components/req-gym-runner";
import { getReqGymSets } from "@/lib/req-gym";
import { getReqGymQuestionsRemote, selectReqGymQuestions } from "@/lib/content-remote";
import { createStaticClient } from "@/lib/supabase/static";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getReqGymSets().map((s) => ({ setId: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ setId: string }>;
}): Promise<Metadata> {
  const { setId } = await params;
  const set = getReqGymSets().find((s) => s.id === setId);
  return {
    title: set ? `Req Gym · ${set.nameTh}` : "Req Gym",
    description: set?.shortTh,
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const { setId } = await params;
  const set = getReqGymSets().find((s) => s.id === setId);
  if (!set) notFound();

  const questionBank = await getReqGymQuestionsRemote(createStaticClient());
  const questions = selectReqGymQuestions(questionBank, setId).map((q) => ({
    id: q.id,
    prompt: q.promptTh,
    tag:
      q.difficulty === "easy"
        ? "ง่าย"
        : q.difficulty === "medium"
          ? "กลาง"
          : "ยาก",
    options: q.options,
    correctIndex: q.answer,
    explanation: q.explanationTh,
  }));

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        backHref="/req-gym"
        backLabel="กลับเลือกชุด"
        eyebrow="Req Gym · Practice"
        title={set.nameTh}
        description={set.shortTh}
      />
      <ReqGymRunner
        setId={setId}
        setName={set.nameTh}
        questions={questions}
      />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { QuizStepper, type NormalizedQuestion, type QuizResult } from "@/components/quiz-stepper";
import { PageHeader } from "@/components/page-header";
import { useGamify } from "@/components/gamify-context";
import { SKILL_AMP_QUESTIONS } from "@/lib/content";
import { getSkillAmpQuestionsRemote } from "@/lib/content-remote";
import { createClient } from "@/lib/supabase/client";
import {
  finalizeSkillAmp,
  persistSkillAmpResult,
  saveSkillAmpResult,
} from "@/lib/skill-amp";

export default function SkillAmpQuizPage() {
  const router = useRouter();
  const { award, nickname } = useGamify();
  const [questionBank, setQuestionBank] = useState(SKILL_AMP_QUESTIONS);

  useEffect(() => {
    let cancelled = false;
    void getSkillAmpQuestionsRemote(createClient()).then((remoteQuestions) => {
      if (!cancelled) setQuestionBank(remoteQuestions);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const questions = useMemo<NormalizedQuestion[]>(
    () =>
      questionBank.map((q) => ({
        id: q.id,
        prompt: q.textTh,
      })),
    [questionBank],
  );

  function handleFinish(result: QuizResult) {
    const result2 = finalizeSkillAmp(result.answers, questionBank);
    saveSkillAmpResult(result2);
    void persistSkillAmpResult(result2, nickname);
    award("skill_amp", { personaSlug: result2.personaSlug });
    router.push("/skill-amp/result");
  }

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        backHref="/skill-amp"
        backLabel="กลับหน้าวัดสกิล"
        eyebrow="Self-assessment"
        title="เท่าไหร่ก็ตามใจคุณ"
        description="เลือกระดับความเห็นด้วยของคุณจริง ๆ ในแต่ละข้อ — ไม่มีคำตอบที่ถูกหรือผิด ยิ่งตรงตัวคุณเท่าไหร่ ผลลัพธ์ยิ่งแม่นขึ้น"
      />

      <div className="mx-auto mt-8 w-full max-w-2xl px-4 sm:px-6">
        <QuizStepper
          mode="likert"
          questions={questions}
          onFinish={handleFinish}
          finishLabel="ดูผลของฉัน"
        />
      </div>
    </div>
  );
}

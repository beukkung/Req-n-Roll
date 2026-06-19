"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, RefreshCw, Trophy } from "lucide-react";
import { QuizStepper, type NormalizedQuestion, type QuizResult } from "@/components/quiz-stepper";
import { useGamify } from "@/components/gamify-context";
import { persistAttempt } from "@/lib/req-gym";

export type ReqGymRunnerProps = {
  setId: string;
  setName: string;
  questions: NormalizedQuestion[];
};

export function ReqGymRunner({ setId, questions }: ReqGymRunnerProps) {
  const [done, setDone] = useState<{ score: number; total: number } | null>(
    null,
  );
  const { award, nickname } = useGamify();

  function handleFinish(result: QuizResult) {
    const score = result.correctCount ?? 0;
    setDone({ score, total: result.total });
    award("req_gym", { area: setId });
    void persistAttempt(setId, score, result.total, nickname);
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto mt-8 w-full max-w-2xl px-4 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-foreground/80">
            ยังไม่มีโจทย์ในชุดนี้ในตอนนี้ ลองชุดอื่นก่อนนะ
          </p>
          <Link
            href="/req-gym"
            className="mt-4 inline-flex items-center gap-2 text-sm font-600 text-primary hover:underline"
          >
            <ArrowRight className="h-4 w-4 rotate-180" /> กลับเลือกชุด
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = done.total > 0 ? Math.round((done.score / done.total) * 100) : 0;
    const note =
      pct >= 75
        ? "เก่งมาก พื้นฐานนี้แน่นแล้ว"
        : pct >= 50
          ? "กำลังดี ฝึกซ้ำจะแม่นขึ้น"
          : "อ่านคำอธิบายแล้วลองใหม่อีกรอบ";
    return (
      <div className="mx-auto mt-8 w-full max-w-2xl px-4 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <p className="inline-flex items-center gap-1.5 text-sm font-600 text-primary">
            <Trophy className="h-4 w-4" /> จบชุดแล้ว
          </p>
          <h2 className="mt-2 font-display text-2xl font-700">
            {done.score} / {done.total}
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            ถูก {pct}% · {note}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setDone(null)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <RefreshCw className="h-4 w-4" /> ฝึกชุดนี้ใหม่
            </button>
            <Link
              href="/req-gym"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
            >
              เลือกชุดอื่น <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl px-4 sm:px-6">
      <QuizStepper
        mode="mcq"
        questions={questions}
        onFinish={handleFinish}
        finishLabel="ดูผลชุดนี้"
      />
    </div>
  );
}

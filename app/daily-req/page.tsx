"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { QuizStepper, type NormalizedQuestion, type QuizResult } from "@/components/quiz-stepper";
import { useGamify } from "@/components/gamify-context";
import { useJSON } from "@/lib/use-store";
import { getDailyReqQuestionsRemote } from "@/lib/content-remote";
import { createClient } from "@/lib/supabase/client";
import type { DailyReqQuestion } from "@/lib/types";
import {
  bangkokDayKey,
  DAILY_REQ_COMPLETION_KEY,
  getDailyReqQuestions,
  persistDailyReqCompletion,
  saveDailyReqCompletion,
  type DailyReqCompletion,
} from "@/lib/daily-req";

const THAI_DATE_FMT = new Intl.DateTimeFormat("th-TH", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "Asia/Bangkok",
});

export default function DailyReqPage() {
  const [questionBank, setQuestionBank] = useState<DailyReqQuestion[] | null>(null);
  const today = useMemo(
    () => getDailyReqQuestions(4, questionBank ?? undefined),
    [questionBank],
  );
  const dayKey = useMemo(() => bangkokDayKey(), []);
  const stored = useJSON<DailyReqCompletion | null>(DAILY_REQ_COMPLETION_KEY, null);
  const [done, setDone] = useState<{ score: number; total: number } | null>(
    null,
  );
  const { award, nickname } = useGamify();

  useEffect(() => {
    let cancelled = false;
    void getDailyReqQuestionsRemote(createClient()).then((remoteQuestions) => {
      if (!cancelled) setQuestionBank(remoteQuestions);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const questions = useMemo<NormalizedQuestion[]>(
    () =>
      today.map((q) => ({
        id: q.id,
        prompt: q.promptTh,
        options: q.options,
        correctIndex: q.answer,
        explanation: q.explanationTh,
      })),
    [today],
  );

  function handleFinish(result: QuizResult) {
    const c = { day: dayKey, score: result.correctCount ?? 0, total: result.total };
    saveDailyReqCompletion(c);
    void persistDailyReqCompletion(c, nickname);
    setDone({ score: result.correctCount ?? 0, total: result.total });
    award("daily_req");
  }

  const justFinished = done;
  const completion = done ? { day: dayKey, score: done.score, total: done.total } : stored;
  const alreadyToday = completion?.day === dayKey;

  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Req ประจำวัน"
        title="Daily Req"
        description="โจทย์สั้น ๆ วันละไม่กี่ข้อ ตอบแล้วเห็นคำอธิบายทันที — ฝึกสัญชาตณ์การถาม requirement ให้กลายเป็นความเคยชิน"
      >
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {THAI_DATE_FMT.format(new Date())}
        </p>
      </PageHeader>

      <div className="mx-auto mt-8 w-full max-w-2xl px-4 sm:px-6">
        {justFinished ? (
          <SummaryPanel
            score={justFinished.score}
            total={justFinished.total}
            onRetake={() => setDone(null)}
          />
        ) : alreadyToday ? (
          <AlreadyDonePanel
            score={completion!.score}
            total={completion!.total}
            onRetake={() => setDone(null)}
          />
        ) : (
          <QuizStepper
            mode="mcq"
            questions={questions}
            onFinish={handleFinish}
            finishLabel="ดูสรุปวันนี้"
          />
        )}
      </div>
    </div>
  );
}

function ScoreBadge({ score, total }: { score: number; total: number }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-4xl font-700 text-primary">{score}</span>
      <span className="text-lg text-muted-foreground">/ {total}</span>
      <span className="ml-2 text-sm font-600 text-foreground/70">({pct}%)</span>
    </div>
  );
}

function SummaryPanel({
  score,
  total,
  onRetake,
}: {
  score: number;
  total: number;
  onRetake: () => void;
}) {
  const pct = total > 0 ? score / total : 0;
  const note =
    pct >= 0.75
      ? "แม่นมาก สัญชาตณ์การถามของคุณคมอยู่"
      : pct >= 0.5
        ? "ไม่เลว ลองฝึกต่อที่ Req Gym สัปดาห์นี้"
        : "ยังไม่ถึงเลย ลองกลับไปอ่านคำอธิบายแล้วฝึกใหม่";
  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <p className="inline-flex items-center gap-1.5 text-sm font-600 text-emerald-600">
        <CheckCircle2 className="h-4 w-4" /> ทำเสร็จแล้ววันนี้
      </p>
      <h2 className="mt-2 font-display text-2xl font-700">คะแนนวันนี้</h2>
      <div className="mt-2">
        <ScoreBadge score={score} total={total} />
      </div>
      <p className="mt-3 text-sm text-foreground/75">{note}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/req-gym"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          ยกดัมเบลที่ Req Gym <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
        >
          <RefreshCw className="h-4 w-4" /> ทำใหม่
        </button>
      </div>
    </div>
  );
}

function AlreadyDonePanel({
  score,
  total,
  onRetake,
}: {
  score: number;
  total: number;
  onRetake: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <p className="text-sm text-muted-foreground">วันนี้ทำ Daily Req แล้ว</p>
      <h2 className="mt-1 font-display text-2xl font-700">คะแนนล่าสุดของวัน</h2>
      <div className="mt-2">
        <ScoreBadge score={score} total={total} />
      </div>
      <p className="mt-3 text-sm text-foreground/75">
        กลับมาใหม่พรุ่งนี้ หรือทำซ้ำเพื่อฝึกเพิ่มเติมได้เลย
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <RefreshCw className="h-4 w-4" /> ทำ Daily Req ใหม่
        </button>
        <Link
          href="/req-gym"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
        >
          ไป Req Gym <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

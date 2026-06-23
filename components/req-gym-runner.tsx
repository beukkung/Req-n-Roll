"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RefreshCw, Shuffle, Trophy } from "lucide-react";
import { QuizStepper, type NormalizedQuestion, type QuizResult } from "@/components/quiz-stepper";
import { useGamify } from "@/components/gamify-context";
import { persistAttempt } from "@/lib/req-gym";
import { getReqGymPracticeSetSize, selectReqGymPracticeQuestions } from "@/lib/req-gym-practice";
import type { ReqGymQuestion } from "@/lib/types";

export type ReqGymRunnerProps = {
  setId: string;
  setName: string;
  questions: ReqGymQuestion[];
};

export function ReqGymRunner({ setId, setName, questions }: ReqGymRunnerProps) {
  const [done, setDone] = useState<{ score: number; total: number } | null>(
    null,
  );
  const [seed, setSeed] = useState(() => stablePracticeSeed(setId, questions.length));
  const [runKey, setRunKey] = useState(0);
  const { award, nickname } = useGamify();
  const targetSize = getReqGymPracticeSetSize(setId);
  const activeQuestions = useMemo<NormalizedQuestion[]>(
    () => selectReqGymPracticeQuestions(questions, setId, seed).map(normalizeQuestion),
    [questions, seed, setId],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSeed(newPracticeSeed());
      setDone(null);
      setRunKey((key) => key + 1);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [setId]);

  function handleFinish(result: QuizResult) {
    const score = result.correctCount ?? 0;
    setDone({ score, total: result.total });
    award("req_gym", { area: setId });
    void persistAttempt(setId, score, result.total, nickname);
  }

  function randomizeSet() {
    setSeed(newPracticeSeed());
    setDone(null);
    setRunKey((key) => key + 1);
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
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-600 text-primary hover:underline"
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
          <p className="mt-2 text-xs font-600 text-muted-foreground">
            {setName} · ชุดสุ่ม {done.total} ข้อจากคลัง {questions.length} ข้อ
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setDone(null)}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <RefreshCw className="h-4 w-4" /> ฝึกชุดนี้ใหม่
            </button>
            <button
              type="button"
              onClick={randomizeSet}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-600 text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
            >
              <Shuffle className="h-4 w-4" /> สุ่มชุดใหม่
            </button>
            <Link
              href="/req-gym"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
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
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-700">{setName}</p>
          <p className="mt-1 text-xs font-600 text-muted-foreground">
            ชุดสุ่ม {Math.min(targetSize, activeQuestions.length)} ข้อจากคลัง {questions.length} ข้อ
          </p>
        </div>
        <button
          type="button"
          onClick={randomizeSet}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
        >
          <Shuffle className="h-4 w-4" /> สุ่มชุดใหม่
        </button>
      </div>
      <QuizStepper
        key={`${setId}-${runKey}`}
        mode="mcq"
        questions={activeQuestions}
        onFinish={handleFinish}
        finishLabel="ดูผลชุดนี้"
      />
    </div>
  );
}

function newPracticeSeed(): number {
  if (typeof window !== "undefined" && window.crypto) {
    const value = new Uint32Array(1);
    window.crypto.getRandomValues(value);
    return value[0];
  }

  return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
}

function stablePracticeSeed(setId: string, total: number): number {
  let hash = total >>> 0;
  for (let index = 0; index < setId.length; index += 1) {
    hash = Math.imul(hash ^ setId.charCodeAt(index), 16777619);
  }
  return hash >>> 0;
}

function normalizeQuestion(question: ReqGymQuestion): NormalizedQuestion {
  return {
    id: question.id,
    prompt: question.promptTh,
    tag:
      question.difficulty === "easy"
        ? "ง่าย"
        : question.difficulty === "medium"
          ? "กลาง"
          : "ยาก",
    options: question.options,
    correctIndex: question.answer,
    explanation: question.explanationTh,
  };
}

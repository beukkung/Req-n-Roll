"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuestionCard } from "./question-card";

export type NormalizedQuestion = {
  id: string;
  prompt: string;
  tag?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
};

export type QuizResult = {
  answers: Record<string, number>;
  correctCount?: number;
  total: number;
};

export type QuizStepperProps = {
  mode: "likert" | "mcq";
  questions: NormalizedQuestion[];
  onFinish: (result: QuizResult) => void;
  finishLabel?: string;
};

export function QuizStepper({
  mode,
  questions,
  onFinish,
  finishLabel = "ดูผล",
}: QuizStepperProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const total = questions.length;
  const current = questions[index];
  const currentAnswer = current ? (answers[current.id] ?? null) : null;
  const currentRevealed = current ? Boolean(revealed[current.id]) : false;
  const isLast = index === total - 1;

  const correctCount = useMemo(() => {
    if (mode !== "mcq") return undefined;
    return questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
      0,
    );
  }, [mode, answers, questions]);

  const progress = Math.round(((index + 1) / total) * 100);

  function select(v: number) {
    if (!current) return;
    if (mode === "mcq" && currentRevealed) return;
    setAnswers((prev) => ({ ...prev, [current.id]: v }));
  }

  function reveal() {
    if (!current || currentAnswer === null) return;
    setRevealed((prev) => ({ ...prev, [current.id]: true }));
  }

  function next() {
    if (isLast) {
      onFinish({ answers, correctCount, total });
      return;
    }
    setIndex((i) => i + 1);
  }

  function prev() {
    if (index === 0) return;
    setIndex((i) => i - 1);
  }

  if (!current) return null;

  const canAdvance =
    currentAnswer !== null && (mode === "likert" || currentRevealed);

  return (
    <div>
      {/* progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-600 text-muted-foreground">
          <span>
            ข้อ {index + 1} / {total}
          </span>
          {mode === "mcq" ? (
            <span>score {correctCount ?? 0}</span>
          ) : (
            <span>{progress}%</span>
          )}
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuestionCard
        mode={mode}
        prompt={current.prompt}
        tag={current.tag}
        options={current.options}
        correctIndex={current.correctIndex}
        explanation={current.explanation}
        value={currentAnswer}
        revealed={currentRevealed}
        onSelect={select}
      />

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> ก่อนหน้า
        </button>

        <div className="flex items-center gap-2">
          {mode === "mcq" && !currentRevealed ? (
            <button
              type="button"
              onClick={reveal}
              disabled={currentAnswer === null}
              className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 className="h-4 w-4" /> ตรวจคำตอบ
            </button>
          ) : null}

          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
              isLast
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            {isLast ? finishLabel : "ถัดไป"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

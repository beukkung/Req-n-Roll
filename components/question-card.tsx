"use client";

import { useId } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type QuestionCardProps = {
  mode: "likert" | "mcq";
  prompt: string;
  tag?: string;
  /** mcq */
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  /** current value: likert 1..5, mcq = selected option index */
  value: number | null;
  revealed?: boolean;
  onSelect: (value: number) => void;
};

const LIKERT_LABELS = [
  "ไม่เห็นด้วยเลย",
  "ค่อนข้างไม่เห็นด้วย",
  "เฉย ๆ",
  "ค่อนข้างเห็นด้วย",
  "เห็นด้วยอย่างยิ่ง",
];

export function QuestionCard({
  mode,
  prompt,
  tag,
  options,
  correctIndex,
  explanation,
  value,
  revealed,
  onSelect,
}: QuestionCardProps) {
  const fieldId = useId();

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
      {tag ? (
        <p className="text-[11px] font-700 uppercase tracking-widest text-primary">
          {tag}
        </p>
      ) : null}
      <h2 className="mt-1 text-lg font-600 leading-snug sm:text-xl">{prompt}</h2>

      {mode === "likert" ? (
        <fieldset className="mt-5">
          <legend id={`${fieldId}-legend`} className="sr-only">
            เลือกระดับความเห็นด้วยตั้งแต่ 1 ถึง 5
          </legend>
          <div
            className="grid grid-cols-5 gap-2"
            aria-describedby={`${fieldId}-legend`}
          >
            {LIKERT_LABELS.map((label, i) => {
              const score = i + 1;
              const selected = value === score;
              const optionId = `${fieldId}-likert-${score}`;
              return (
                <div key={score} className="relative">
                  <input
                    id={optionId}
                    type="radio"
                    name={fieldId}
                    value={score}
                    checked={selected}
                    onChange={() => onSelect(score)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={optionId}
                    title={label}
                    className={cn(
                      "flex min-h-16 cursor-pointer flex-col items-center justify-center rounded-lg border text-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background hover:border-primary/50 hover:bg-secondary",
                    )}
                  >
                    <span className="font-display text-xl font-700">{score}</span>
                    <span className="mt-0.5 hidden text-[10px] leading-tight opacity-85 sm:block">
                      {label}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <fieldset className="mt-5">
          <legend className="sr-only">ตัวเลือกคำตอบ</legend>
          <div className="grid gap-2">
            {options?.map((opt, i) => {
              const selected = value === i;
              const isCorrect = revealed && i === correctIndex;
              const isWrongPick = revealed && selected && i !== correctIndex;
              const optionId = `${fieldId}-option-${i}`;
              return (
                <div key={i} className="relative">
                  <input
                    id={optionId}
                    type="radio"
                    name={fieldId}
                    value={i}
                    checked={selected}
                    disabled={revealed}
                    onChange={() => onSelect(i)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={optionId}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border p-3 text-left transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
                      !revealed && selected && "border-primary bg-primary/8",
                      !revealed && !selected && "border-border hover:border-primary/50 hover:bg-secondary",
                      isCorrect && "border-emerald-600 bg-emerald-500/10",
                      isWrongPick && "border-destructive bg-destructive/10",
                      revealed && !isCorrect && !isWrongPick && "cursor-default border-border opacity-70",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-700",
                        selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                        isCorrect && "border-emerald-600 bg-emerald-600 text-white",
                        isWrongPick && "border-destructive bg-destructive text-white",
                      )}
                    >
                      {isCorrect ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : isWrongPick ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      )}

      {mode === "mcq" && revealed ? (
        <div className="mt-4 rounded-lg border border-border bg-secondary/50 p-4">
          <p className="text-sm">
            <span className="font-700">
              {value === correctIndex ? "ถูกต้อง! " : "ลองดูใหม่: "}
            </span>
            <span className="text-foreground/80">{explanation}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}

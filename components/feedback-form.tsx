"use client";

import { useId, useState } from "react";
import { Star, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamify } from "@/components/gamify-context";
import {
  FEEDBACK_CATEGORIES,
  saveFeedback,
  persistFeedback,
  type FeedbackCategory,
  type FeedbackEntry,
} from "@/lib/feedback";

const RATING_LABELS = [
  "",
  "แย่มาก",
  "ไม่ค่อยดี",
  "เฉย ๆ",
  "ดี",
  "ดีมาก",
];

export function FeedbackForm() {
  const name = useId();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [usedForRealWork, setUsedForRealWork] = useState(false);
  const [category, setCategory] = useState<FeedbackCategory>("skill_amp");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const { award, nickname } = useGamify();
  const display = hover || rating;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("เลือกคะแนนก่อนส่งนะ");
      return;
    }
    setError(null);
    setStatus("submitting");
    const entry: FeedbackEntry = {
      rating,
      usedForRealWork,
      category,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    saveFeedback(entry);
    void persistFeedback(entry, nickname).finally(() => {
      award("feedback");
      setStatus("done");
    });
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-6 sm:p-8">
        <p className="inline-flex items-center gap-1.5 font-600 text-emerald-600">
          <Check className="h-5 w-5" /> ขอบคุณที่ส่ง feedback
        </p>
        <p className="mt-2 text-sm text-foreground/80">
          เสียงของคุณคือเซ็ตลิสต์ถัดไปของเรา — เราจะนำไปปรับและเพิ่มฟีเจอร์ต่อไป
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setRating(0);
            setComment("");
            setUsedForRealWork(false);
          }}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-600 text-primary hover:underline"
        >
          ส่ง feedback อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      {/* Rating */}
      <fieldset>
        <legend className="text-sm font-600">
          ให้คะแนนประสบการณ์ <span className="text-destructive">*</span>
        </legend>
        <div
          className="mt-3 flex items-center gap-1"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((v) => {
            const active = display >= v;
            return (
              <button
                key={v}
                type="button"
                aria-label={`${v} ดาว — ${RATING_LABELS[v]}`}
                aria-pressed={rating === v}
                onClick={() => setRating(v)}
                onMouseEnter={() => setHover(v)}
                onFocus={() => setHover(v)}
                onBlur={() => setHover(0)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-colors",
                    active
                      ? "fill-primary text-primary"
                      : "fill-none text-muted-foreground/50",
                  )}
                />
              </button>
            );
          })}
          <span className="ml-3 min-w-[5rem] text-sm text-foreground/75">
            {display ? RATING_LABELS[display] : "เลือกคะแนน"}
          </span>
        </div>
      </fieldset>

      {/* Used for real work */}
      <div className="flex items-start gap-3">
        <button
          id={`${name}-realwork`}
          type="button"
          role="switch"
          aria-checked={usedForRealWork}
          aria-label="เอาไปใช้ในงานจริงแล้ว"
          onClick={() => setUsedForRealWork((v) => !v)}
          className={cn(
            "mt-0.5 inline-flex h-11 w-16 shrink-0 items-center rounded-full border px-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            usedForRealWork
              ? "border-primary bg-primary"
              : "border-border bg-secondary",
          )}
        >
          <span
            className={cn(
              "h-6 w-6 rounded-full bg-white shadow transition-transform",
              usedForRealWork ? "translate-x-8" : "translate-x-0",
            )}
          />
        </button>
        <label htmlFor={`${name}-realwork`} className="text-sm">
          <span className="font-600">เอาไปใช้ในงานจริงแล้ว</span>
          <span className="block text-foreground/70">
            กดเปิดถ้าคุณลองเอาสิ่งที่ฝึกหรือแม่แบบไปใช้ในงานจริง
          </span>
        </label>
      </div>

      {/* Category */}
      <div>
        <label htmlFor={`${name}-cat`} className="text-sm font-600">
          เกี่ยวกับอะไร
        </label>
        <select
          id={`${name}-cat`}
          value={category}
          onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
          className="mt-2 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {FEEDBACK_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor={`${name}-comment`} className="text-sm font-600">
          ความคิดเห็นเพิ่มเติม
        </label>
        <textarea
          id={`${name}-comment`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          maxLength={1000}
          placeholder="บอกเราว่าอะไรใช้ได้ อะไรต้องปรับ หรืออยากให้มีฟีเจอร์อะไรเพิ่ม"
          className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {comment.length}/1000
        </p>
      </div>

      {error ? (
        <p role="alert" className="text-sm font-600 text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> กำลังส่ง…
          </>
        ) : (
          "ส่ง Feedback"
        )}
      </button>
    </form>
  );
}

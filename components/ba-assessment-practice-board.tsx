"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  Loader2,
  MinusCircle,
  PencilLine,
  RefreshCw,
  Sparkles,
  Timer,
  XCircle,
} from "lucide-react";
import type { BaAssessmentPracticeSet } from "@/lib/ba-assessment-practice";
import type { WrittenCriterionStatus, WrittenGrade } from "@/lib/ba-assessment-grade";
import { useGamify } from "@/components/gamify-context";
import { useJSON } from "@/lib/use-store";
import { readJSON, writeJSON } from "@/lib/storage";
import { cn } from "@/lib/utils";

const MCQ_ANSWERS_KEY = "reqn-roll:ba-assessment:mcq-answers";
const MCQ_AWARDED_KEY = "reqn-roll:ba-assessment:mcq-awarded";
const WRITTEN_ANSWERS_KEY = "reqn-roll:ba-assessment:written-answers";
const WRITTEN_GRADES_KEY = "reqn-roll:ba-assessment:grades";
const WRITTEN_AWARDED_KEY = "reqn-roll:ba-assessment:written-awarded";

type McqAnswers = Record<string, Record<string, number>>;
type WrittenAnswers = Record<string, string>;
type GradesMap = Record<string, WrittenGrade>;
type AwardedMap = Record<string, boolean>;

type GradeApiResponse = {
  data?: WrittenGrade & {
    sensitiveFindings?: string[];
    sensitiveBlockMessage?: string;
    model?: string;
  };
  error?: { code: string; message: string };
  meta?: Record<string, unknown>;
};

export function BaAssessmentPracticeBoard({
  sets,
}: {
  sets: BaAssessmentPracticeSet[];
}) {
  const { award } = useGamify();
  const [activeSetId, setActiveSetId] = useState(sets[0]?.id ?? "");
  const [showAnswers, setShowAnswers] = useState(false);
  const [mode, setMode] = useState<"mcq" | "written">("mcq");

  const mcqAnswers = useJSON<McqAnswers>(MCQ_ANSWERS_KEY, {});
  const mcqAwarded = useJSON<AwardedMap>(MCQ_AWARDED_KEY, {});
  const writtenAnswers = useJSON<WrittenAnswers>(WRITTEN_ANSWERS_KEY, {});
  const grades = useJSON<GradesMap>(WRITTEN_GRADES_KEY, {});
  const writtenAwarded = useJSON<AwardedMap>(WRITTEN_AWARDED_KEY, {});

  const [grading, setGrading] = useState<Record<string, boolean>>({});
  const [gradeErrors, setGradeErrors] = useState<Record<string, string>>({});

  // In-flight written-answer edits only. The persisted store (writtenAnswers)
  // is the fallback for prompts not yet edited, so no store->state sync effect
  // is needed (and typing stays cheap — the store is written on blur, not per
  // keystroke).
  const [drafts, setDrafts] = useState<WrittenAnswers>({});

  const activeSet = useMemo(
    () => sets.find((set) => set.id === activeSetId) ?? sets[0],
    [activeSetId, sets],
  );

  // MCQ — award once per set when every question is answered.
  useEffect(() => {
    if (!activeSet) return;
    const setAnswers = mcqAnswers[activeSet.id] ?? {};
    const answered = activeSet.mcq.filter((q) => q.id in setAnswers).length;
    if (answered >= activeSet.mcq.length && !mcqAwarded[activeSet.id]) {
      const score = activeSet.mcq.reduce(
        (sum, q) => sum + (setAnswers[q.id] === q.correctIndex ? 1 : 0),
        0,
      );
      award("ba_assessment", { score, total: activeSet.mcq.length });
      writeJSON(MCQ_AWARDED_KEY, {
        ...(readJSON<AwardedMap>(MCQ_AWARDED_KEY) ?? {}),
        [activeSet.id]: true,
      });
    }
  }, [activeSet, mcqAnswers, mcqAwarded, award]);

  // Written — award once per prompt the first time a grade arrives.
  useEffect(() => {
    if (!activeSet) return;
    let nextAwarded = writtenAwarded;
    let changed = false;
    for (const prompt of activeSet.writtenCase.prompts) {
      if (grades[prompt.id] && !nextAwarded[prompt.id]) {
        award("ba_assessment", {});
        nextAwarded = { ...nextAwarded, [prompt.id]: true };
        changed = true;
      }
    }
    if (changed) writeJSON(WRITTEN_AWARDED_KEY, nextAwarded);
  }, [activeSet, grades, writtenAwarded, award]);

  if (!activeSet) return null;

  function pickMcq(setId: string, questionId: string, optionIndex: number) {
    const current = readJSON<McqAnswers>(MCQ_ANSWERS_KEY) ?? {};
    const setAnswers = current[setId] ?? {};
    if (questionId in setAnswers) return; // locked after first pick
    writeJSON(MCQ_ANSWERS_KEY, {
      ...current,
      [setId]: { ...setAnswers, [questionId]: optionIndex },
    });
  }

  function resetSetMcq(setId: string) {
    const answers = readJSON<McqAnswers>(MCQ_ANSWERS_KEY) ?? {};
    const nextAnswers = { ...answers };
    delete nextAnswers[setId];
    writeJSON(MCQ_ANSWERS_KEY, nextAnswers);
    const awarded = readJSON<AwardedMap>(MCQ_AWARDED_KEY) ?? {};
    const nextAwarded = { ...awarded };
    delete nextAwarded[setId];
    writeJSON(MCQ_AWARDED_KEY, nextAwarded);
    setShowAnswers(false);
  }

  function setWrittenDraft(promptId: string, value: string) {
    setDrafts((current) => ({ ...current, [promptId]: value }));
  }

  // Persist on blur (infrequent) instead of every keystroke, so typing long
  // answers stays cheap. Reads the freshest store to avoid clobbering others.
  function commitWrittenAnswer(promptId: string, value: string) {
    const current = readJSON<WrittenAnswers>(WRITTEN_ANSWERS_KEY) ?? {};
    writeJSON(WRITTEN_ANSWERS_KEY, { ...current, [promptId]: value });
  }

  async function handleGrade(setId: string, promptId: string, answer: string) {
    setGrading((g) => ({ ...g, [promptId]: true }));
    setGradeErrors((e) => {
      const next = { ...e };
      delete next[promptId];
      return next;
    });
    try {
      const response = await fetch("/api/ba-assessment/grade/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setId, promptId, answer }),
      });
      const payload = (await response.json()) as GradeApiResponse;
      if (!response.ok || payload.error || !payload.data) {
        throw new Error(
          payload.error?.message ?? "ไม่สามารถตรวจข้อเขียนได้ ลองอีกครั้ง",
        );
      }
      const current = readJSON<GradesMap>(WRITTEN_GRADES_KEY) ?? {};
      writeJSON(WRITTEN_GRADES_KEY, { ...current, [promptId]: payload.data });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ไม่สามารถตรวจข้อเขียนได้";
      setGradeErrors((e) => ({ ...e, [promptId]: message }));
    } finally {
      setGrading((g) => ({ ...g, [promptId]: false }));
    }
  }

  const setMcq = mcqAnswers[activeSet.id] ?? {};
  const mcqTotal = activeSet.mcq.length;
  const answeredCount = activeSet.mcq.filter((q) => q.id in setMcq).length;
  const correctCount = activeSet.mcq.reduce(
    (sum, q) => sum + (setMcq[q.id] === q.correctIndex ? 1 : 0),
    0,
  );
  const setComplete = answeredCount >= mcqTotal && mcqTotal > 0;

  return (
    <section className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-md border border-border bg-card p-3">
            <p className="px-2 pb-2 text-xs font-700 uppercase tracking-[0.18em] text-muted-foreground">
              10 exam sets
            </p>
            <div className="space-y-1">
              {sets.map((set, index) => (
                <button
                  key={set.id}
                  type="button"
                  onClick={() => {
                    setActiveSetId(set.id);
                    setShowAnswers(false);
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-3 text-left text-sm transition-colors",
                    activeSet.id === set.id
                      ? "bg-primary/12 text-primary"
                      : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-current/20 text-xs font-700">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-700">{set.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {set.focus}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="rounded-md border border-border bg-card p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-700 text-primary">SCB-style BA Assessment</p>
                <h2 className="mt-1 font-display text-2xl font-700 tracking-tight">
                  {activeSet.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/75">
                  {activeSet.scenario}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground md:w-64">
                <Metric icon={ClipboardList} label="MCQ" value="20 ข้อ" />
                <Metric icon={FileText} label="Written" value="10 ข้อ" />
                <Metric icon={Timer} label="จับเวลา" value="2 ชม." />
                <Metric icon={BookOpenCheck} label="โฟกัส" value="BA judgement" />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div
                className="inline-flex rounded-md border border-border bg-background p-1"
                role="tablist"
                aria-label="เลือกประเภทข้อสอบ"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "mcq"}
                  onClick={() => setMode("mcq")}
                  className={cn(
                    "rounded px-3 py-2 text-sm font-700 transition-colors",
                    mode === "mcq"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary",
                  )}
                >
                  Part 1: MCQ
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "written"}
                  onClick={() => setMode("written")}
                  className={cn(
                    "rounded px-3 py-2 text-sm font-700 transition-colors",
                    mode === "written"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary",
                  )}
                >
                  Part 2: Written
                </button>
              </div>
            </div>
          </div>

          {mode === "mcq" ? (
            <div className="mt-5 space-y-4">
              <div className="rounded-md border border-border bg-card p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-700">
                      ตอบแล้ว {answeredCount}/{mcqTotal} · ถูก {correctCount}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {setComplete
                        ? `ครบทุกข้อแล้ว — คะแนน ${correctCount}/${mcqTotal}`
                        : "เลือกคำตอบแล้วจะล็อกทันที พร้อมเฉลย"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAnswers((value) => !value)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-700 text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {showAnswers ? "ซ่อนเฉลย" : "แสดงเฉลยทั้งหมด"}
                    </button>
                    <button
                      type="button"
                      onClick={() => resetSetMcq(activeSet.id)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-700 text-foreground transition-colors hover:bg-secondary"
                    >
                      <RefreshCw className="h-4 w-4" />
                      เริ่มใหม่
                    </button>
                  </div>
                </div>
                <div
                  className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-valuenow={answeredCount}
                  aria-valuemin={0}
                  aria-valuemax={mcqTotal}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${
                        mcqTotal > 0 ? (answeredCount / mcqTotal) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {activeSet.mcq.map((question, index) => {
                const picked = setMcq[question.id];
                const isAnswered = picked !== undefined;
                const revealCorrect = isAnswered || showAnswers;
                return (
                  <article
                    key={question.id}
                    className="rounded-md border border-border bg-card p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-700 uppercase tracking-[0.14em] text-muted-foreground">
                          ข้อ {index + 1} · {question.skill}
                        </p>
                        <h3 className="mt-2 text-base font-700 leading-7">
                          {question.prompt}
                        </h3>
                      </div>
                    </div>
                    <ol className="mt-4 space-y-2" type="A">
                      {question.options.map((option, optionIndex) => {
                        const isPicked = picked === optionIndex;
                        const isCorrect = optionIndex === question.correctIndex;
                        const correctShown = revealCorrect && isCorrect;
                        const wrongPicked = isPicked && !isCorrect;
                        return (
                          <li key={option}>
                            <button
                              type="button"
                              disabled={isAnswered}
                              onClick={() =>
                                pickMcq(activeSet.id, question.id, optionIndex)
                              }
                              className={cn(
                                "flex w-full items-start gap-2 rounded-md border px-3 py-2 text-left text-sm leading-6 transition-colors",
                                !revealCorrect &&
                                  "cursor-pointer border-border bg-background hover:bg-secondary",
                                correctShown &&
                                  "border-emerald-500/50 bg-emerald-500/10 text-emerald-800",
                                wrongPicked &&
                                  "border-rose-500/50 bg-rose-500/10 text-rose-800",
                                revealCorrect &&
                                  !correctShown &&
                                  !wrongPicked &&
                                  "border-border bg-background opacity-70",
                              )}
                            >
                              <span className="font-700">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span className="flex-1">{option}</span>
                              {correctShown ? (
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                              ) : null}
                              {wrongPicked ? (
                                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                              ) : null}
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                    {revealCorrect ? (
                      <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm leading-6 text-secondary-foreground">
                        เฉลย {String.fromCharCode(65 + question.correctIndex)}:{" "}
                        {question.explanation}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <article className="rounded-md border border-border bg-card p-5">
                <p className="text-xs font-700 uppercase tracking-[0.14em] text-muted-foreground">
                  Scenario paper
                </p>
                <h3 className="mt-2 font-display text-xl font-700">
                  {activeSet.writtenCase.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/80">
                  {activeSet.writtenCase.scenario}
                </p>
                <ol className="mt-4 grid gap-2 text-sm text-foreground/75 sm:grid-cols-2">
                  {activeSet.writtenCase.instructions.map((instruction) => (
                    <li
                      key={instruction}
                      className="rounded-md border border-border bg-background px-3 py-2"
                    >
                      {instruction}
                    </li>
                  ))}
                </ol>
              </article>

              {activeSet.writtenCase.prompts.map((task, index) => {
                const value = drafts[task.id] ?? writtenAnswers[task.id] ?? "";
                const grade = grades[task.id];
                const isLoading = !!grading[task.id];
                const errorMessage = gradeErrors[task.id];
                return (
                  <article
                    key={task.id}
                    className="rounded-md border border-border bg-card p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-700 uppercase tracking-[0.14em] text-muted-foreground">
                          Written {index + 1} · {writtenTypeLabel(task.type)}
                        </p>
                        <h3 className="mt-1 text-base font-700 leading-7">
                          {task.title}
                        </h3>
                      </div>
                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-700 text-secondary-foreground">
                        <PencilLine className="h-3.5 w-3.5" />
                        {value.trim().split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>
                    <label className="mt-4 block">
                      <span className="text-sm leading-7 text-foreground/80">
                        {task.prompt}
                      </span>
                      <textarea
                        value={value}
                        onChange={(event) =>
                          setWrittenDraft(task.id, event.target.value)
                        }
                        onBlur={() => commitWrittenAnswer(task.id, value)}
                        rows={task.type === "feature" ? 5 : 7}
                        className="mt-3 min-h-36 w-full resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your answer"
                      />
                    </label>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleGrade(activeSet.id, task.id, value.trim())
                        }
                        disabled={isLoading || value.trim().length === 0}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-700 text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        {grade ? "ประเมินใหม่" : "ให้คะแนนด้วย AI"}
                      </button>
                      {grade ? (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {grade.provider === "gemini" ? "ตรวจด้วย AI" : "เทียบ rubric เอง"}
                        </span>
                      ) : null}
                    </div>

                    {errorMessage ? (
                      <div className="mt-3 flex items-start gap-2 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-800">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span className="flex-1">{errorMessage}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleGrade(activeSet.id, task.id, value.trim())
                          }
                          className="font-700 underline"
                        >
                          ลองอีกครั้ง
                        </button>
                      </div>
                    ) : null}

                    {grade ? <GradeView grade={grade} /> : null}

                    <details className="group mt-4 rounded-md bg-secondary p-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-700 text-secondary-foreground">
                        <span>เปิด rubric หลังลองตอบเอง</span>
                        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-secondary-foreground/85">
                        {task.expectedPoints.map((point) => (
                          <li key={point} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function writtenTypeLabel(
  type: BaAssessmentPracticeSet["writtenCase"]["prompts"][number]["type"],
) {
  switch (type) {
    case "feature":
      return "Feature User Story";
    case "overview":
      return "System Overview";
    case "endToEnd":
      return "End-to-End Flow";
    case "bonus":
      return "Optional Bonus";
  }
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ClipboardList;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <Icon className="h-4 w-4 text-primary" aria-hidden />
      <p className="mt-2 font-700 text-foreground">{value}</p>
      <p>{label}</p>
    </div>
  );
}

function scoreBand(score: number): {
  label: string;
  cls: string;
} {
  if (score >= 80) {
    return {
      label: "ดีเยี่ยม",
      cls: "border-emerald-500/50 bg-emerald-500/10 text-emerald-800",
    };
  }
  if (score >= 50) {
    return {
      label: "พอใช้",
      cls: "border-amber-500/50 bg-amber-500/10 text-amber-800",
    };
  }
  return {
    label: "ต้องปรับปรุง",
    cls: "border-rose-500/50 bg-rose-500/10 text-rose-800",
  };
}

function statusChip(status: WrittenCriterionStatus): {
  label: string;
  cls: string;
  icon: typeof CheckCircle2;
} {
  switch (status) {
    case "met":
      return {
        label: "ครบ",
        cls: "border-emerald-500/50 bg-emerald-500/10 text-emerald-800",
        icon: CheckCircle2,
      };
    case "partial":
      return {
        label: "บางส่วน",
        cls: "border-amber-500/50 bg-amber-500/10 text-amber-800",
        icon: MinusCircle,
      };
    case "missed":
      return {
        label: "ยังไม่ได้",
        cls: "border-rose-500/50 bg-rose-500/10 text-rose-800",
        icon: XCircle,
      };
  }
}

function GradeView({ grade }: { grade: WrittenGrade }) {
  const band = scoreBand(grade.score);
  return (
    <div className="mt-4 rounded-md border border-border bg-background p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-700",
            band.cls,
          )}
        >
          <Sparkles className="h-4 w-4" />
          คะแนน {grade.score}/100 · {band.label}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-foreground/85">{grade.verdict}</p>

      {grade.criteria.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {grade.criteria.map((criterion, i) => {
            const chip = statusChip(criterion.status);
            const Icon = chip.icon;
            return (
              <li
                key={`${criterion.point.slice(0, 24)}-${i}`}
                className="flex flex-col gap-1 rounded-md border border-border bg-card px-3 py-2 text-sm sm:flex-row sm:items-start sm:gap-3"
              >
                <span
                  className={cn(
                    "inline-flex w-fit shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-700",
                    chip.cls,
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {chip.label}
                </span>
                <span className="flex-1">
                  <span className="block font-700">{criterion.point}</span>
                  {criterion.note ? (
                    <span className="mt-0.5 block text-foreground/70">
                      {criterion.note}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {grade.improvements.length > 0 ? (
        <div className="mt-3">
          <p className="text-xs font-700 uppercase tracking-[0.14em] text-muted-foreground">
            แนะนำการปรับปรุง
          </p>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/85">
            {grade.improvements.map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-700 text-primary">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

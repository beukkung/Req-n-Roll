"use client";

import { useMemo, useState } from "react";
import { ClipboardCheck, PlayCircle, RotateCcw, Stethoscope } from "lucide-react";
import { PracticeNudge } from "@/components/practice-nudge";
import { useGamify } from "@/components/gamify-context";
import { Button } from "@/components/ui/button";
import { analyzeRequirementArtifact, type ReqDoctorIssue } from "@/lib/req-doctor";

const SAMPLE_REQUIREMENT = `สำหรับลูกค้าที่โอนเงินผ่าน mobile banking
เมื่อยืนยันรายการด้วย biometric แล้วระบบต้องตรวจสอบวงเงิน, AML screening และแสดงผลภายใน 5 วินาทีใน 95% ของรายการ

Acceptance Criteria:
- Given ลูกค้ามียอดเงินพอ When ยืนยันรายการ Then ระบบสร้าง audit log และส่ง notification
- Given พบ sanction hit When ระบบตรวจสอบ Then ต้อง block รายการและส่งเคสให้ Compliance review
- Given PromptPay timeout When retry ครบ 2 ครั้ง Then แสดงสถานะ pending พร้อม reference id`;

function severityClass(issue: ReqDoctorIssue) {
  if (issue.severity === "high") return "border-destructive/35 bg-destructive/8 text-destructive";
  if (issue.severity === "medium") return "border-primary/35 bg-primary/8 text-primary";
  return "border-border bg-secondary text-foreground/75";
}

export function ReqDoctorWorkbench() {
  const { award } = useGamify();
  const [artifact, setArtifact] = useState("");
  const [reviewSource, setReviewSource] = useState<string | null>(null);
  const report = useMemo(
    () => (reviewSource ? analyzeRequirementArtifact(reviewSource) : null),
    [reviewSource],
  );

  function updateArtifact(value: string) {
    setArtifact(value);
    setReviewSource(null);
  }

  function loadExample() {
    setArtifact(SAMPLE_REQUIREMENT);
    setReviewSource(null);
  }

  function clearArtifact() {
    setArtifact("");
    setReviewSource(null);
  }

  function reviewArtifact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextArtifact = artifact.trim();
    if (!nextArtifact) return;
    setReviewSource(nextArtifact);
    award("req_doctor");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary" />
          <h2 className="text-base font-700">Requirement input</h2>
        </div>
        <form onSubmit={reviewArtifact}>
          <label htmlFor="req-doctor-input" className="sr-only">
            Requirement artifact
          </label>
          <textarea
            id="req-doctor-input"
            data-testid="req-doctor-input"
            value={artifact}
            onChange={(event) => updateArtifact(event.target.value)}
            className="mt-4 min-h-96 w-full resize-y rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-ring/30"
            placeholder="วาง requirement, user story, BRD excerpt หรือ acceptance criteria ที่อยากตรวจ..."
            maxLength={5000}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">{artifact.length}/5000</p>
            <div className="flex flex-wrap gap-2">
              <Button
                data-testid="req-doctor-use-example"
                type="button"
                variant="outline"
                onClick={loadExample}
              >
                <ClipboardCheck className="h-4 w-4" /> Use example
              </Button>
              <Button type="button" variant="outline" onClick={clearArtifact}>
                <RotateCcw className="h-4 w-4" /> Clear
              </Button>
              <Button
                data-testid="req-doctor-run"
                type="submit"
                disabled={!artifact.trim()}
              >
                <PlayCircle className="h-4 w-4" /> Review requirement
              </Button>
            </div>
          </div>
        </form>
      </section>

      <section
        data-testid="req-doctor-report"
        className="rounded-xl border border-border bg-card p-4 sm:p-5"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              Req Doctor
            </p>
            <h2 className="mt-1 text-xl font-700">Quality review</h2>
          </div>
          {report ? (
            <div className="rounded-lg border border-border bg-background px-4 py-2 text-right">
              <p data-testid="req-doctor-score" className="text-2xl font-700 text-primary">
                {report.overallScore}
              </p>
              <p className="text-xs text-muted-foreground">{report.level}</p>
            </div>
          ) : null}
        </div>

        {report ? (
          <>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${report.overallScore}%` }}
              />
            </div>

            <div className="mt-5 grid gap-3">
              {report.issues.length > 0 ? (
                report.issues.map((issue) => (
                  <article
                    key={issue.id}
                    className={`rounded-lg border p-3 ${severityClass(issue)}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-700">{issue.title}</h3>
                      <span className="text-[11px] font-700 uppercase">
                        {issue.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/75">{issue.detail}</p>
                    <p className="mt-2 text-sm font-600">{issue.fix}</p>
                  </article>
                ))
              ) : (
                <div className="rounded-lg border border-primary/30 bg-primary/8 p-4 text-sm">
                  ยังไม่พบ gap สำคัญ ลองส่งให้ stakeholder review แล้วดูว่ายังมี assumption ซ่อนอยู่ไหม
                </div>
              )}
            </div>

            <div className="mt-5 rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-700">Strengths</p>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75">
                {report.strengths.length > 0 ? (
                  report.strengths.map((strength) => <li key={strength}>- {strength}</li>)
                ) : (
                  <li>- ยังต้องเติมบริบทก่อนเห็นจุดแข็ง</li>
                )}
              </ul>
            </div>

            <div className="mt-5 rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-700">Suggested rewrite frame</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground/75">
                {report.suggestedRewrite || "วาง requirement ก่อนเพื่อให้ระบบช่วยร่างกรอบปรับปรุง"}
              </pre>
            </div>
            <PracticeNudge
              className="mt-5"
              description="Use this review as the next drill: rehearse the stakeholder conversation or ask for a coaching lens on the gaps."
              actions={[
                { href: "/role-play", label: "Practice conversation" },
                { href: "/coach-bot", label: "Ask Coach" },
                { href: "/tracklist", label: "Open path" },
              ]}
            />
          </>
        ) : (
          <div
            data-testid="req-doctor-empty"
            className="mt-5 rounded-lg border border-border bg-background p-5 text-sm text-foreground/75"
          >
            <p className="font-700 text-foreground">ยังไม่เริ่ม review</p>
            <p className="mt-1">
              วาง requirement หรือกด Use example แล้วกด Review requirement เพื่อดูคะแนน, gap และ rewrite frame
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

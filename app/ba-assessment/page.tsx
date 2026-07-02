import { ClipboardList } from "lucide-react";
import { BaAssessmentPracticeBoard } from "@/components/ba-assessment-practice-board";
import { PageHeader } from "@/components/page-header";
import {
  BA_ASSESSMENT_PRACTICE_SETS,
  BA_ASSESSMENT_TOTAL_MCQ,
  BA_ASSESSMENT_TOTAL_WRITTEN,
} from "@/lib/ba-assessment-practice";

export const metadata = {
  title: "BA Assessment Practice",
  description:
    "SCB-style BA assessment practice with 10 banking exam sets, scenario MCQ, written user stories, controls, and acceptance criteria.",
};

export default function BaAssessmentPage() {
  return (
    <div className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Practice · BA Assessment"
        title="Banking BA Assessment Mockups"
        description="ซ้อมข้อสอบตามแนว HR: scenario-based, MS Form style, 20 MCQ + 10 written ต่อชุด ครอบคลุม e-KYC, AML, Fraud, Corporate Payment, Loan, Treasury, API, Branch Ops และ Wealth"
        className="max-w-4xl"
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-700 text-secondary-foreground">
            <ClipboardList className="h-3.5 w-3.5" />{" "}
            {BA_ASSESSMENT_PRACTICE_SETS.length} ชุดข้อสอบ
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-700 text-secondary-foreground">
            {BA_ASSESSMENT_TOTAL_MCQ} MCQ
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-700 text-secondary-foreground">
            {BA_ASSESSMENT_TOTAL_WRITTEN} written prompts
          </span>
        </div>
      </PageHeader>

      <BaAssessmentPracticeBoard sets={BA_ASSESSMENT_PRACTICE_SETS} />
    </div>
  );
}

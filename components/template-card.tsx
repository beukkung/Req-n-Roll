"use client";

import { useState } from "react";
import { Download, Check, Loader2 } from "lucide-react";
import type { Template } from "@/lib/types";
import { downloadTemplate } from "@/lib/templates";
import { useGamify } from "@/components/gamify-context";

export function TemplateCard({ template }: { template: Template }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const { award, nickname } = useGamify();

  async function handleDownload() {
    if (state === "loading") return;
    setState("loading");
    try {
      await downloadTemplate(template, nickname);
      award("template");
      setState("done");
      setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("idle");
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-600 text-secondary-foreground">
          {template.category}
        </span>
        <span className="text-xs text-muted-foreground">{template.meta}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-700">{template.name}</h3>
      <p className="mt-1 flex-1 text-sm text-foreground/75">
        {template.descriptionTh}
      </p>
      <button
        type="button"
        onClick={handleDownload}
        disabled={state === "loading"}
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> กำลังเตรียม…
          </>
        ) : state === "done" ? (
          <>
            <Check className="h-4 w-4" /> ดาวน์โหลดแล้ว
          </>
        ) : (
          <>
            <Download className="h-4 w-4" /> ดาวน์โหลด (.md)
          </>
        )}
      </button>
    </div>
  );
}

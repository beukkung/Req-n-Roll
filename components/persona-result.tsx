"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { assignPersona } from "@/lib/persona";
import { SKILLS } from "@/lib/content";
import { accentVarFor } from "@/lib/cat";
import type { SkillScores } from "@/lib/types";
import { BreedCat } from "@/components/mascot/breed-cat";

export type PersonaResultProps = {
  scores: SkillScores;
};

export function PersonaResult({ scores }: PersonaResultProps) {
  const { persona, sorted } = assignPersona(scores);
  const accent = accentVarFor(persona.accentChartIndex);

  const data = SKILLS.map((s) => ({
    skill: s.nameTh,
    value: scores[s.slug] ?? 0,
  }));

  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Breed badge + portrait */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div
          className="flex items-center justify-center px-6 pt-8 pb-2"
          style={{ backgroundColor: `color-mix(in oklch, ${accent} 12%, transparent)` }}
        >
          <BreedCat
            breed={persona.breedSlug}
            expression="happy"
            className="h-52 w-52"
            title={`สายพันธุ์แมว ${persona.nameTh}`}
          />
        </div>
        <div className="p-6 sm:p-8">
          <p
            className="text-xs font-700 uppercase tracking-widest"
            style={{ color: accent }}
          >
            {persona.personaTitleEn}
          </p>
          <h2 className="mt-1 font-display text-3xl font-700 tracking-tight sm:text-4xl">
            {persona.nameTh}
          </h2>
          <p className="mt-1 text-sm" style={{ color: accent }}>
            {persona.taglineTh}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {persona.breedPersonalityTh}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">
            {persona.descriptionTh}
          </p>

          <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4">
            <p className="text-xs font-700 uppercase tracking-widest text-muted-foreground">
              ทักษะเด่น
            </p>
            <p className="mt-1 font-600">
              {strongest.skill.nameTh}{" "}
              <span style={{ color: accent }}>
                ({strongest.score.toFixed(1)}/5)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Radar */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h3 className="font-display text-lg font-700">เรดาร์ 6 ทักษะ</h3>
        <p className="text-sm text-muted-foreground">
          ภาพรวมจุดแข็งและจุดที่ต้องฝึก
        </p>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <Radar
                name="score"
                dataKey="value"
                stroke={accent}
                fill={accent}
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-3">
            <p className="text-xs font-700 uppercase tracking-widest text-emerald-600">
              ใช้ต่อ
            </p>
            <p className="mt-1 text-sm text-foreground/80">
              ต่อยอด <strong>{strongest.skill.nameTh}</strong> ในงานจริง
              แล้วสอนเพื่อนในทีม
            </p>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{
              borderColor: `color-mix(in oklch, ${accent} 40%, transparent)`,
              backgroundColor: `color-mix(in oklch, ${accent} 6%, transparent)`,
            }}
          >
            <p
              className="text-xs font-700 uppercase tracking-widest"
              style={{ color: accent }}
            >
              ฝึกเพิ่ม
            </p>
            <p className="mt-1 text-sm text-foreground/80">
              ลอง <strong>{weakest.skill.nameTh}</strong> ผ่าน Daily Req และ
              Req Gym สัปดาห์นี้
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

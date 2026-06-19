import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/80">
      {/* energetic backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_70%_-10%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent),radial-gradient(40rem_24rem_at_0%_20%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent)]"
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Internal Beta · v0.1
        </p>

        <h1 className="mt-5 max-w-3xl font-display text-4xl font-700 leading-[1.05] tracking-tight sm:text-6xl">
          Rock the Requirement.
          <br />
          <span className="text-primary">Ship the Value.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-foreground/80">
          หยุดรับ requirement แบบงง ๆ แล้วเริ่มถามแบบคนคุมเกม — เวทีฝึกฝนสำหรับชุมชน
          BA / PM / PO ที่อยากเก่งขึ้นทุกวัน
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/skill-amp"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            เริ่มวัดสกิล <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/daily-req"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-secondary"
          >
            เล่น Daily Req วันนี้
          </Link>
        </div>

        {/* The six skill dimensions this stage trains — real content, not vanity metrics */}
        <ul className="mt-12 flex max-w-2xl flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/75">
          {[
            "Requirement Thinking",
            "Stakeholder Communication",
            "Process & System",
            "Product & Value",
            "Agile & Delivery",
            "Facilitation",
          ].map((d) => (
            <li key={d} className="inline-flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type FeatureCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  titleTh: string;
  description: string;
  cta: string;
  meta?: string[];
  /** Optional "new"/status pill */
  badge?: string;
};

export function FeatureCard({
  href,
  icon: Icon,
  title,
  titleTh,
  description,
  cta,
  meta = [],
  badge,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/12 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        {badge ? (
          <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-accent">
            {badge}
          </span>
        ) : null}
      </div>

      <div>
        <h3 className="font-display text-lg font-700 tracking-tight">{title}</h3>
        <p className="text-xs text-muted-foreground">{titleTh}</p>
      </div>

      {meta.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {meta.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] font-700 text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <p className="flex-1 text-sm text-foreground/75">{description}</p>

      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

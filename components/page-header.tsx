import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type PageHeaderProps = {
  /** small label above the title — use for the section, not as a kicker reflex */
  eyebrow?: React.ReactNode;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel = "กลับ",
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mx-auto w-full max-w-3xl px-4 sm:px-6", className)}>
      {backHref ? (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> {backLabel}
        </Link>
      ) : null}
      {eyebrow ? (
        <p className="mt-3 text-sm font-600 text-primary">{eyebrow}</p>
      ) : null}
      <h1 className="mt-1 font-display text-3xl font-700 tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-foreground/75">{description}</p>
      ) : null}
      {children}
    </header>
  );
}

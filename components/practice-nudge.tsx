import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type PracticeNudgeAction = {
  href: string;
  label: string;
};

export function PracticeNudge({
  title = "Practice next",
  description,
  actions,
  className,
}: {
  title?: string;
  description: string;
  actions: PracticeNudgeAction[];
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-lg border border-primary/25 bg-primary/8 p-4",
        className,
      )}
    >
      <div className="flex items-start gap-2">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-700 text-primary">{title}</p>
          <p className="mt-1 text-sm text-foreground/75">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((action, index) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={cn(
                  "inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-600 transition-colors",
                  index === 0
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-background text-foreground hover:bg-secondary",
                )}
              >
                {action.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

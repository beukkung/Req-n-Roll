import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type PathProgressStatus = "not-started" | "in-progress" | "done";

const STATUS_COPY: Record<PathProgressStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  done: "Done",
};

export function PathProgressBadge({
  status,
  className,
}: {
  status: PathProgressStatus;
  className?: string;
}) {
  const Icon =
    status === "done" ? CheckCircle2 : status === "in-progress" ? PlayCircle : Circle;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-700",
        status === "done" && "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
        status === "in-progress" && "border-primary/25 bg-primary/8 text-primary",
        status === "not-started" && "border-border bg-secondary text-muted-foreground",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {STATUS_COPY[status]}
    </span>
  );
}

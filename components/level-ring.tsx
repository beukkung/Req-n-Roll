import { cn } from "@/lib/utils";

export type LevelRingProps = {
  level: number;
  progress: number; // 0..1 within current level
  size?: number;
  stroke?: number;
  className?: string;
  trackClass?: string;
  barClass?: string;
};

export function LevelRing({
  level,
  progress,
  size = 40,
  stroke = 4,
  className,
  trackClass = "text-secondary",
  barClass = "text-primary",
}: LevelRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = c * (1 - clamped);
  const center = size / 2;

  return (
    <span
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`เลเวล ${level}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className={trackClass}
          stroke="currentColor"
        />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className={barClass}
          stroke="currentColor"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <span
        className="absolute font-display font-700 leading-none"
        style={{ fontSize: size * 0.34 }}
      >
        {level}
      </span>
    </span>
  );
}

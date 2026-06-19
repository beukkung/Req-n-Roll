import { CatArt, type Expression, type Accessory } from "./cat-art";
import type { BreedArt } from "@/lib/cat";
import { cn } from "@/lib/utils";

export type MascotState =
  | "idle"
  | "celebrate"
  | "think"
  | "wave"
  | "rock";

export type MascotProps = {
  state?: MascotState;
  className?: string;
  size?: "sm" | "md" | "lg";
  title?: string;
};

/**
 * Riff — the Req'n Roll rockstar cat mascot. Built on the same CatArt base as
 * the breed portraits so the whole cat family stays visually coherent.
 */
const RIFF_ART: BreedArt = {
  slug: "riff",
  fur: "oklch(0.72 0.135 54)",
  furDark: "oklch(0.5 0.11 46)",
  belly: "oklch(0.92 0.035 80)",
  ear: "rounded",
  pattern: "tabby",
  eye: "oklch(0.74 0.15 150)",
  cheekFluff: false,
  soft: true,
  accentVar: "var(--primary)",
};

const STATE_MAP: Record<
  MascotState,
  { expression: Expression; accessory: Accessory }
> = {
  idle: { expression: "normal", accessory: "headphones" },
  celebrate: { expression: "happy", accessory: "star" },
  think: { expression: "think", accessory: "headphones" },
  wave: { expression: "normal", accessory: "headphones" },
  rock: { expression: "rock", accessory: "headphones" },
};

const SIZE = {
  sm: "h-24 w-24",
  md: "h-40 w-40",
  lg: "h-56 w-56",
};

export function Mascot({
  state = "idle",
  className,
  size = "md",
  title = "ริฟฟ์ — แมวร็อคสตาร์มาสคอต",
}: MascotProps) {
  const { expression, accessory } = STATE_MAP[state];
  return (
    <CatArt
      art={RIFF_ART}
      expression={expression}
      accessory={accessory}
      collar={false}
      title={title}
      className={cn(SIZE[size], "drop-shadow-sm", className)}
    />
  );
}

/** Compact wave variant for inline empty states / sidebars. */
export function MascotWave({ className }: { className?: string }) {
  return (
    <CatArt
      art={RIFF_ART}
      expression="normal"
      accessory="headphones"
      title="ริฟฟ์ทักทาย"
      className={cn("h-28 w-28", className)}
    />
  );
}

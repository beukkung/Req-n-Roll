import { PERSONAS } from "./content";
import type { Persona } from "./types";

export type BreedArt = {
  slug: string;
  /** main fur color */
  fur: string;
  /** darker shade for pattern / shadow */
  furDark: string;
  /** belly / inner ear light shade */
  belly: string;
  ear: "pointed" | "tufted" | "rounded";
  pattern: "none" | "points" | "rosette" | "tabby" | "ticked";
  eye: string;
  /** extra rounded cheek fluff (long-haired look) */
  cheekFluff: boolean;
  /** Ghibli-soft rendering: rounder glossy eyes, blush, gentle smile */
  soft?: boolean;
  /** CSS var token e.g. var(--chart-2) */
  accentVar: string;
};

const BREED_ART: Record<string, BreedArt> = {
  persian: {
    slug: "persian",
    fur: "oklch(0.93 0.018 80)",
    furDark: "oklch(0.82 0.02 80)",
    belly: "oklch(0.97 0.01 85)",
    ear: "rounded",
    pattern: "none",
    eye: "oklch(0.72 0.15 55)",
    cheekFluff: true,
    accentVar: "var(--chart-2)",
  },
  bengal: {
    slug: "bengal",
    fur: "oklch(0.8 0.12 70)",
    furDark: "oklch(0.46 0.08 55)",
    belly: "oklch(0.92 0.04 75)",
    ear: "pointed",
    pattern: "rosette",
    eye: "oklch(0.74 0.16 150)",
    cheekFluff: false,
    accentVar: "var(--chart-1)",
  },
  mainecoon: {
    slug: "mainecoon",
    fur: "oklch(0.64 0.045 60)",
    furDark: "oklch(0.4 0.04 55)",
    belly: "oklch(0.9 0.03 70)",
    ear: "tufted",
    pattern: "tabby",
    eye: "oklch(0.74 0.15 145)",
    cheekFluff: true,
    accentVar: "var(--chart-4)",
  },
  siamese: {
    slug: "siamese",
    fur: "oklch(0.92 0.012 75)",
    furDark: "oklch(0.42 0.03 260)",
    belly: "oklch(0.95 0.008 80)",
    ear: "pointed",
    pattern: "points",
    eye: "oklch(0.72 0.13 240)",
    cheekFluff: false,
    accentVar: "var(--chart-3)",
  },
  abyssinian: {
    slug: "abyssinian",
    fur: "oklch(0.66 0.075 50)",
    furDark: "oklch(0.46 0.07 45)",
    belly: "oklch(0.86 0.05 65)",
    ear: "pointed",
    pattern: "ticked",
    eye: "oklch(0.73 0.14 140)",
    cheekFluff: false,
    accentVar: "var(--chart-5)",
  },
};

export function getBreedArt(slug: string): BreedArt {
  return BREED_ART[slug] ?? BREED_ART.persian;
}

export function getPersonaByBreed(slug: string): Persona | undefined {
  return PERSONAS.find((p) => p.breedSlug === slug);
}

export function accentVarFor(chartIndex: number): string {
  return `var(--chart-${chartIndex})`;
}

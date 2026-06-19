"use client";

import { createContext, useContext } from "react";
import type { LevelInfo } from "@/lib/gamify/levels";
import type {
  AwardResult,
  Profile,
  XpKind,
} from "@/lib/gamify/types";
import type { PersonaSlug } from "@/lib/types";

export type ToastKind = "xp" | "level" | "badge";

export type ToastItem = {
  id: number;
  kind: ToastKind;
  title: string;
  sub?: string;
};

export type GamifyContextValue = {
  profile: Profile;
  level: LevelInfo;
  award: (kind: XpKind, opts?: { personaSlug?: PersonaSlug; area?: string }) => AwardResult;
  toasts: ToastItem[];
  dismissToast: (id: number) => void;
  /** bump to retrigger a celebration animation */
  celebrate: () => void;
  celebrateKey: number;
  nickname: string;
  hasNickname: boolean;
  saveNickname: (name: string) => void;
};

export const GamifyContext = createContext<GamifyContextValue | null>(null);

export function useGamify(): GamifyContextValue {
  const ctx = useContext(GamifyContext);
  if (!ctx) {
    throw new Error("useGamify must be used within <GamifyProvider>");
  }
  return ctx;
}

"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { GamifyContext, type ToastItem } from "./gamify-context";
import { computeAward, defaultProfile, persistRemote, saveProfile, PROFILE_KEY } from "@/lib/gamify/profile";
import { levelFromTotalXp } from "@/lib/gamify/levels";
import { BADGE_MAP } from "@/lib/gamify/badges";
import { setNickname as persistNickname, NICKNAME_KEY } from "@/lib/nickname";
import { useJSON } from "@/lib/use-store";
import type { PersonaSlug } from "@/lib/types";
import type { AwardResult, XpKind } from "@/lib/gamify/types";

const DEFAULT_PROFILE = defaultProfile();

export type GamifyProviderProps = {
  children: React.ReactNode;
};

export function GamifyProvider({ children }: GamifyProviderProps) {
  // Reactive, SSR-safe reads of localStorage-backed identity + progress.
  const profile = useJSON(PROFILE_KEY, DEFAULT_PROFILE);
  const nickname = useJSON<string | null>(NICKNAME_KEY, null);

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const toastId = useRef(0);

  const pushToast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3600);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const celebrate = useCallback(() => {
    setCelebrateKey((k) => k + 1);
  }, []);

  const saveNickname = useCallback(
    (name: string) => {
      const clean = persistNickname(name); // writes + notifies nickname store
      const next = { ...profile, displayName: clean };
      saveProfile(next); // writes + notifies profile store
      void persistRemote(next, undefined, 0, clean || undefined);
    },
    [profile],
  );

  const award = useCallback(
    (kind: XpKind, opts?: { personaSlug?: PersonaSlug; area?: string }): AwardResult => {
      const result = computeAward(profile, kind, opts);
      saveProfile(result.profile); // writes + notifies → reactive re-render
      void persistRemote(result.profile, kind, result.xpGained, nickname ?? undefined);

      pushToast({ kind: "xp", title: `+${result.xpGained} XP` });
      if (result.leveledUp) {
        const info = levelFromTotalXp(result.profile.totalXp);
        pushToast({
          kind: "level",
          title: `เลเวลอัป! Lv ${info.level}`,
          sub: info.title,
        });
        celebrate();
      }
      for (const b of result.newBadges) {
        const meta = BADGE_MAP[b];
        pushToast({
          kind: "badge",
          title: `ได้ตราใหม่: ${meta.nameTh}`,
          sub: meta.descTh,
        });
      }
      return result;
    },
    [profile, pushToast, celebrate, nickname],
  );

  const level = useMemo(
    () => levelFromTotalXp(profile.totalXp),
    [profile.totalXp],
  );

  const value = useMemo(
    () => ({
      profile,
      level,
      award,
      toasts,
      dismissToast,
      celebrate,
      celebrateKey,
      nickname: nickname ?? "",
      hasNickname: nickname !== null && nickname.length > 0,
      saveNickname,
    }),
    [profile, level, award, toasts, dismissToast, celebrate, celebrateKey, nickname, saveNickname],
  );

  return <GamifyContext.Provider value={value}>{children}</GamifyContext.Provider>;
}

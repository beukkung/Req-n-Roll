"use client";

import { useSyncExternalStore } from "react";
import { snapshotJSON, subscribe } from "./storage";

/**
 * SSR-safe reactive read of a JSON value in localStorage.
 *
 * - Server snapshot: returns `fallback` (no hydration mismatch).
 * - Client snapshot: the parsed value, with a cached reference so React's
 *   useSyncExternalStore doesn't loop when the underlying string is unchanged.
 * - Re-renders on same-tab writes (via writeJSON/remove) and cross-tab changes.
 */
export function useJSON<T>(key: string, fallback: T): T {
  return useSyncExternalStore(
    (cb) => subscribe(key, cb),
    () => snapshotJSON<T>(key, fallback),
    () => fallback,
  );
}

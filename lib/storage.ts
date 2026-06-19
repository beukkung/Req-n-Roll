/**
 * Tiny SSR-safe localStorage helpers. All call sites are client components,
 * but these guard against non-browser environments (SSR / previews) anyway.
 */

const STORE_EVENT = "reqn-roll:store";

function notify(key: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: key }));
}

export function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / privacy mode — non-fatal */
  }
  notify(key);
}

export function remove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
  notify(key);
}

/**
 * Subscribe to changes of a single key. Notifies on same-tab writes (custom
 * event dispatched by writeJSON/remove) and cross-tab writes (storage event).
 */
export function subscribe(key: string, cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    if (e.type === "storage") {
      const se = e as StorageEvent;
      if (se.key === key || se.key === null) cb();
    } else {
      const changed = (e as CustomEvent<string | undefined>).detail;
      if (!changed || changed === key) cb();
    }
  };
  window.addEventListener(STORE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(STORE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

/**
 * Cached snapshot for useSyncExternalStore. Returns a stable reference while
 * the raw stored string is unchanged (avoids the infinite re-render trap).
 */
const snapCache = new Map<string, { raw: string | null; value: unknown }>();

export function snapshotJSON<T>(key: string, fallback: T): T {
  const raw =
    typeof window === "undefined" ? null : safeRaw(key);
  const cached = snapCache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;
  const value = raw ? (safeParse(raw) as T) : fallback;
  snapCache.set(key, { raw, value });
  return value;
}

function safeRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Deterministic seeded shuffle (mulberry32) so "today's" set is stable per day. */
export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const out = [...items];
  let s = seed >>> 0;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

import { readJSON, writeJSON } from "./storage";

export const NICKNAME_KEY = "reqn-roll:nickname";

export const NICKNAME_MAX = 20;

/** Sanitize a nickname: trim, collapse whitespace, cap length. */
export function cleanNickname(raw: string): string {
  return raw
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, NICKNAME_MAX);
}

export function isValidNickname(raw: string): boolean {
  return cleanNickname(raw).length >= 1;
}

export function getNickname(): string | null {
  return readJSON<string>(NICKNAME_KEY) ?? null;
}

export function setNickname(name: string): string {
  const clean = cleanNickname(name);
  writeJSON(NICKNAME_KEY, clean);
  return clean;
}

export function clearNickname(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(NICKNAME_KEY);
  } catch {
    /* no-op */
  }
}

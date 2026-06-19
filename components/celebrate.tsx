"use client";

import { useEffect, useRef } from "react";
import { useGamify } from "./gamify-context";

const COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

const PIECE_COUNT = 64;
const LIFETIME_MS = 3000;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * One confetti burst. Built imperatively in an effect so the random piece
 * layout never runs during render (purity) and never touches React state
 * (no setState-in-effect). A fresh instance mounts per celebration via `key`.
 */
function ConfettiBurst() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const pieces: HTMLSpanElement[] = [];
    for (let i = 0; i < PIECE_COUNT; i++) {
      const span = document.createElement("span");
      span.className = "confetti-piece";
      const dx = (Math.random() - 0.5) * 40;
      span.style.left = `${Math.random() * 100}vw`;
      span.style.backgroundColor =
        COLORS[Math.floor(Math.random() * COLORS.length)];
      span.style.borderRadius = Math.random() > 0.5 ? "9999px" : "2px";
      span.style.animationDuration = `${1.3 + Math.random() * 1.1}s`;
      span.style.animationDelay = `${Math.random() * 0.25}s`;
      span.style.setProperty("--dx", `${dx}vw`);
      span.style.setProperty("--rot", `${(Math.random() - 0.5) * 900}deg`);
      el.appendChild(span);
      pieces.push(span);
    }

    const timer = window.setTimeout(() => {
      for (const p of pieces) p.remove();
    }, LIFETIME_MS);
    return () => {
      window.clearTimeout(timer);
      for (const p of pieces) p.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
    />
  );
}

export function Celebrate() {
  const { celebrateKey } = useGamify();
  if (celebrateKey === 0) return null;
  return <ConfettiBurst key={celebrateKey} />;
}

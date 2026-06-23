"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { XpChip } from "./xp-chip";

const NAV_LINKS = [
  { href: "/", label: "Home", labelTh: "หน้าแรก" },
  { href: "/skill-amp", label: "Skill Amp", labelTh: "วัดสกิล" },
  { href: "/daily-req", label: "Daily Req", labelTh: "Req ประจำวัน" },
  { href: "/req-gym", label: "Req Gym", labelTh: "โรงยิม Req" },
  { href: "/templates", label: "Templates", labelTh: "เทมเพลต" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-md bg-primary font-display text-lg font-700 text-primary-foreground shadow-sm transition-transform group-hover:-rotate-6"
          >
            R
          </span>
          <span className="font-display text-lg font-700 tracking-tight">
            Req<span className="text-primary">&apos;n</span> Roll
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="หลัก">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-primary/12 text-primary"
                  : "text-foreground/75 hover:bg-secondary hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <XpChip />
          <Link
            href="/leaderboard"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
              isActive("/leaderboard")
                ? "border-primary/50 bg-primary/12 text-primary"
                : "border-border text-foreground/75 hover:bg-secondary hover:text-foreground",
            )}
            aria-label="จัดอันดับ"
          >
            <Trophy className="h-4 w-4" />
          </Link>
          <Link
            href="/feedback"
            className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 py-2 text-sm font-600 text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
          >
            Feedback
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-secondary lg:hidden"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border/80 bg-background lg:hidden"
        >
          <nav
            className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6"
            aria-label="มือถือ"
          >
            <div className="flex items-center justify-between gap-2 pb-2">
              <XpChip />
              <Link
                href="/leaderboard"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/75"
                aria-label="จัดอันดับ"
              >
                <Trophy className="h-4 w-4" />
              </Link>
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-primary/12 text-primary"
                    : "text-foreground/80 hover:bg-secondary",
                )}
              >
                {link.label} <span className="text-muted-foreground">· {link.labelTh}</span>
              </Link>
            ))}
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
            >
              Profile · โปรไฟล์ของฉัน
            </Link>
            <Link
              href="/feedback"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-600 text-accent-foreground"
            >
              Feedback
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

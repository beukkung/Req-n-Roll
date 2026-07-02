"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  Gauge,
  ListMusic,
  Menu,
  Mic2,
  Trophy,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { XpChip } from "./xp-chip";

const PRACTICE_LINKS = [
  {
    href: "/tracklist",
    label: "Tracklist",
    labelTh: "เลือก path ฝึก",
    icon: ListMusic,
  },
  {
    href: "/skill-amp",
    label: "Skill Amp",
    labelTh: "วัดสกิล BA",
    icon: Gauge,
  },
  {
    href: "/daily-req",
    label: "Daily Req",
    labelTh: "โจทย์ประจำวัน",
    icon: CalendarDays,
  },
  {
    href: "/req-gym",
    label: "Req Gym",
    labelTh: "คลังข้อสอบ",
    icon: Dumbbell,
  },
  {
    href: "/ba-assessment",
    label: "BA Assessment",
    labelTh: "banking mock exam",
    icon: ClipboardList,
  },
  {
    href: "/role-play",
    label: "Role Play",
    labelTh: "ซ้อมคุย stakeholder",
    icon: Mic2,
  },
];

const TOOL_LINKS = [
  {
    href: "/req-doctor",
    label: "Req Doctor",
    labelTh: "ตรวจ requirement",
    icon: ClipboardCheck,
  },
  {
    href: "/coach-bot",
    label: "Coach Bot",
    labelTh: "office hour",
    icon: Bot,
  },
  { href: "/templates", label: "Templates", labelTh: "เทมเพลต" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const practiceRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isPracticeActive = PRACTICE_LINKS.some((link) => isActive(link.href));

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!practiceRef.current?.contains(event.target as Node)) {
        setPracticeOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2"
          onClick={() => {
            setOpen(false);
            setPracticeOpen(false);
          }}
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
          <Link
            href="/"
            className={cn(
              "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive("/")
                ? "bg-primary/12 text-primary"
                : "text-foreground/75 hover:bg-secondary hover:text-foreground",
            )}
          >
            Home
          </Link>

          <div
            ref={practiceRef}
            className="relative"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setPracticeOpen(false);
              }
            }}
          >
            <button
              type="button"
              data-testid="practice-menu-button"
              className={cn(
                "inline-flex min-h-11 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isPracticeActive
                  ? "bg-primary/12 text-primary"
                  : "text-foreground/75 hover:bg-secondary hover:text-foreground",
              )}
              aria-haspopup="menu"
              aria-expanded={practiceOpen}
              aria-controls="practice-menu"
              onClick={() => setPracticeOpen((value) => !value)}
            >
              Practice
              <ChevronDown
                aria-hidden
                className={cn(
                  "h-4 w-4 transition-transform",
                  practiceOpen && "rotate-180",
                )}
              />
            </button>

            {practiceOpen && (
              <div
                id="practice-menu"
                data-testid="practice-menu-panel"
                className="absolute left-0 top-full z-50 mt-2 w-72 rounded-md border border-border bg-background p-2 shadow-lg"
                role="menu"
              >
                {PRACTICE_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setPracticeOpen(false)}
                      className={cn(
                        "flex min-h-12 items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive(link.href)
                          ? "bg-primary/12 text-primary"
                          : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-background">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-600">{link.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {link.labelTh}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {TOOL_LINKS.map((link) => (
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
          onClick={() => setOpen((value) => !value)}
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

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-3 text-sm font-medium",
                isActive("/")
                  ? "bg-primary/12 text-primary"
                  : "text-foreground/80 hover:bg-secondary",
              )}
            >
              Home <span className="text-muted-foreground">· หน้าแรก</span>
            </Link>

            <p className="px-3 pt-3 text-xs font-700 uppercase tracking-[0.18em] text-muted-foreground">
              Practice
            </p>
            {PRACTICE_LINKS.map((link) => (
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
                {link.label}{" "}
                <span className="text-muted-foreground">· {link.labelTh}</span>
              </Link>
            ))}

            <p className="px-3 pt-3 text-xs font-700 uppercase tracking-[0.18em] text-muted-foreground">
              Tools
            </p>
            {TOOL_LINKS.map((link) => (
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
                {link.label}{" "}
                <span className="text-muted-foreground">· {link.labelTh}</span>
              </Link>
            ))}

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
            >
              Profile <span className="text-muted-foreground">· โปรไฟล์ของฉัน</span>
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

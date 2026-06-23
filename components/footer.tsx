import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "Play",
    links: [
      { href: "/skill-amp", label: "Skill Amp" },
      { href: "/daily-req", label: "Daily Req" },
      { href: "/req-gym", label: "Req Gym" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/templates", label: "Setlist Templates" },
      { href: "/feedback", label: "Feedback" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-secondary/40">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-base font-700 text-primary-foreground"
            >
              R
            </span>
            <span className="font-display text-base font-700">
              Req<span className="text-primary">&apos;n</span> Roll
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Rock the Requirement. Ship the Value. — เวทีฝึกฝนสำหรับชุมชน BA / PM / PO
          </p>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-display text-xs font-700 uppercase tracking-widest text-muted-foreground">
              {group.title}
            </h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <p>© {new Date().getFullYear()} Req&apos;n Roll · Internal Beta v0.1</p>
          <p>IIBA-aligned practice · ไม่ใช่ข้อสอบอย่างเป็นทางการ</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, ShieldAlert } from "lucide-react";
import { PracticeNudge } from "@/components/practice-nudge";
import { useGamify } from "@/components/gamify-context";
import { Button } from "@/components/ui/button";
import {
  COACH_BOT_MODES,
  detectSensitiveBankingData,
  type CoachBotMode,
  type CoachMessage,
} from "@/lib/coach-bot";

type CoachApiResponse = {
  data?: {
    provider?: string;
    model?: string;
    reply?: string;
    sensitiveFindings?: string[];
  };
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    warning?: string;
    providerError?: string;
    sensitiveDataBlocked?: boolean;
  };
};

const INITIAL_MESSAGES: CoachMessage[] = [
  {
    role: "assistant",
    content:
      "สวัสดีครับ ผมเป็น Coach Bot สำหรับ BA งานแบงค์ ลองส่ง requirement, สถานการณ์ stakeholder, หรือคำถามที่อยากซ้อมคุยมาได้เลย กรุณา mask ข้อมูลลูกค้าจริงก่อนส่งนะครับ",
  },
];

const PRACTICE_STARTER_PROMPTS = [
  {
    label: "Scope เปลี่ยนกลาง UAT",
    prompt:
      "stakeholder ขอเปลี่ยน scope ตอน UAT เพราะ compliance เพิ่งให้ policy ใหม่ ควรถามอะไรต่อเพื่อคุม risk, timeline และ approval?",
  },
  {
    label: "Review acceptance criteria",
    prompt:
      "ช่วย review acceptance criteria นี้ให้หน่อยว่าขาด edge case, control, audit evidence หรือ owner ตรงไหนบ้าง",
  },
  {
    label: "ซ้อมคุยกับ compliance",
    prompt:
      "ช่วย role-play เป็น compliance officer ที่ challenge requirement เรื่อง KYC/PDPA แล้วถามคำถามที่ BA ควรตอบให้พร้อม",
  },
];

const CAREER_STARTER_PROMPTS = [
  {
    label: "วางแผนจาก junior ไป mid",
    prompt:
      "ตอนนี้เป็น junior BA ในงานแบงค์ อยากโตเป็น mid-level BA ภายใน 6 เดือน ควรฝึก skill อะไร ทำ portfolio แบบไหน และวัด progress ยังไง?",
  },
  {
    label: "เตรียมสัมภาษณ์ BA",
    prompt:
      "ช่วย coach การเตรียมสัมภาษณ์ BA งานแบงค์ โดยเน้น requirement discovery, stakeholder conflict, compliance challenge และตัวอย่าง STAR story",
  },
  {
    label: "ทำ portfolio งานแบงค์",
    prompt:
      "ช่วยวาง portfolio สำหรับ BA งานแบงค์ 3 ชิ้นที่โชว์ requirement quality, banking control และ stakeholder management ได้ชัด",
  },
];

export function CoachBotPanel() {
  const { award } = useGamify();
  const [mode, setMode] = useState<CoachBotMode>("mentor");
  const [messages, setMessages] = useState<CoachMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [sensitiveFindings, setSensitiveFindings] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const localSensitiveFindings = useMemo(
    () => detectSensitiveBankingData(input),
    [input],
  );
  const starterPrompts =
    mode === "career" ? CAREER_STARTER_PROMPTS : PRACTICE_STARTER_PROMPTS;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const nextSensitiveFindings = detectSensitiveBankingData(content);
    if (nextSensitiveFindings.length > 0) {
      setSensitiveFindings(nextSensitiveFindings);
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setSensitiveFindings([]);

    try {
      const response = await fetch("/api/coach-bot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, messages: nextMessages.slice(-10) }),
      });
      const payload = (await response.json()) as CoachApiResponse;

      if (!response.ok || payload.error) {
        throw new Error(payload.error?.message ?? "Coach Bot request failed");
      }

      const reply = payload.data?.reply?.trim();
      if (!reply) throw new Error("Coach Bot returned an empty response");

      setMessages((current) => [...current, { role: "assistant", content: reply }]);
      setSensitiveFindings(payload.data?.sensitiveFindings ?? []);
      setPracticeComplete(true);
      award("coach_bot");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Coach Bot request failed";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `ขออภัยครับ รอบนี้เรียก coach ไม่สำเร็จ: ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h2 className="text-base font-700">Coach mode</h2>
        </div>

        <div className="mt-4 grid gap-2">
          {COACH_BOT_MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              disabled={loading}
              onClick={() => setMode(item.id)}
              className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                mode === item.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-secondary/70"
              }`}
            >
              <span className="block text-sm font-700">{item.label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.description}
              </span>
            </button>
          ))}
        </div>

      </aside>

      <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-700">Office Hour Chat</h2>
        </div>

        {sensitiveFindings.length > 0 ? (
          <div className="mt-4 flex gap-2 rounded-lg border border-primary/35 bg-primary/8 p-3 text-sm">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              พบข้อมูลที่อาจ sensitive: {sensitiveFindings.join(", ")}. ก่อนใช้ของจริงควร mask
              ข้อมูลลูกค้า เลขบัญชี เลขบัตร และ credential ทุกครั้ง
            </p>
          </div>
        ) : null}

        <div
          data-testid="coach-message-list"
          className="mt-4 flex max-h-[32rem] flex-col gap-3 overflow-y-auto pr-1"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              data-testid={`coach-message-${message.role}`}
              className={`max-w-[88%] rounded-xl border px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "ml-auto border-primary/30 bg-primary/10"
                  : "mr-auto border-border bg-background"
              }`}
            >
              <p className="mb-1 text-[11px] font-700 uppercase tracking-widest text-muted-foreground">
                {message.role === "user" ? "You" : "Coach"}
              </p>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
          {loading ? (
            <div
              data-testid="coach-loading"
              className="mr-auto rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
            >
              Coach กำลังคิด...
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>

        {practiceComplete ? (
          <PracticeNudge
            className="mt-4"
            description="Turn this coaching answer into a focused drill or follow the path that matches the weak area."
            actions={[
              { href: "/req-gym", label: "Practice drills" },
              { href: "/role-play", label: "Role Play" },
              { href: "/tracklist", label: "Open path" },
            ]}
          />
        ) : null}

        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="coach-message" className="sr-only">
            Coach message
          </label>
          <div className="mb-3 flex flex-wrap gap-2">
            {starterPrompts.map((starter) => (
              <button
                key={starter.label}
                type="button"
                disabled={loading}
                onClick={() => setInput(starter.prompt)}
                className="min-h-11 rounded-full border border-border bg-background px-3 py-2 text-xs font-600 text-foreground/75 transition-colors hover:border-primary/50 hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {starter.label}
              </button>
            ))}
          </div>
          <textarea
            id="coach-message"
            data-testid="coach-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-28 w-full resize-y rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-ring/30"
            placeholder="ถาม coach เช่น ช่วย review AC นี้ หรือ stakeholder ขอเปลี่ยน scope ควรถามอะไร..."
            maxLength={2000}
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            {localSensitiveFindings.length > 0 ? (
              <p
                data-testid="coach-local-sensitive-warning"
                className="inline-flex items-start gap-1.5 text-xs font-600 text-primary"
              >
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Mask ก่อนส่ง: {localSensitiveFindings.join(", ")}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                ไม่ต้องใส่ข้อมูลลูกค้าจริง เลขบัญชี เลขบัตร OTP หรือ credential
              </p>
            )}
            <Button
              data-testid="coach-send"
              type="submit"
              disabled={!input.trim() || loading || localSensitiveFindings.length > 0}
            >
              <Send className="h-4 w-4" /> Send
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

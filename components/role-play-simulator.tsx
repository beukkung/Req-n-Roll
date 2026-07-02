"use client";

import { useMemo, useState } from "react";
import { Lightbulb, RotateCcw, Send, Target } from "lucide-react";
import { PracticeNudge } from "@/components/practice-nudge";
import { useGamify } from "@/components/gamify-context";
import { Button } from "@/components/ui/button";
import {
  createRolePlayTurnReview,
  getRolePlayScenario,
  ROLE_PLAY_SCENARIOS,
  type RolePlayTurnReview,
} from "@/lib/role-play";

export function RolePlaySimulator() {
  const { award } = useGamify();
  const [scenarioId, setScenarioId] = useState(ROLE_PLAY_SCENARIOS[0].id);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState<RolePlayTurnReview | null>(null);

  const scenario = useMemo(
    () => getRolePlayScenario(scenarioId) ?? ROLE_PLAY_SCENARIOS[0],
    [scenarioId],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    const nextReview = createRolePlayTurnReview(scenario.id, message);
    setReview(nextReview);
    award("role_play", { score: nextReview.totalScore, total: 100 });
  }

  function handleReset() {
    setMessage("");
    setReview(null);
  }

  function handleUseExample() {
    setMessage(scenario.exampleResponse);
    setReview(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <h2 className="text-base font-700">Scenario</h2>
        </div>

        <div className="mt-4 grid gap-2">
          {ROLE_PLAY_SCENARIOS.map((item) => (
            <button
              key={item.id}
              data-testid="role-play-scenario"
              type="button"
              aria-pressed={item.id === scenario.id}
              onClick={() => {
                setScenarioId(item.id);
                setMessage("");
                setReview(null);
              }}
              className={`rounded-lg border px-3 py-3 text-left text-sm transition-colors ${
                item.id === scenario.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-secondary/70"
              }`}
            >
              <span className="block font-700">{item.title}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {item.stakeholderRole}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-700 uppercase tracking-widest text-primary">
              {scenario.stakeholderRole}
            </p>
            <h2 className="mt-1 text-xl font-700">{scenario.title}</h2>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-600 text-secondary-foreground">
            Banking role play
          </span>
        </div>

        <p className="mt-4 text-sm text-foreground/75">{scenario.context}</p>

        <div className="mt-5 rounded-lg border border-border bg-secondary/45 p-4">
          <p className="text-xs font-700 uppercase tracking-widest text-muted-foreground">
            Stakeholder says
          </p>
          <p className="mt-2 text-sm font-600">{scenario.openingLine}</p>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-background p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <p className="text-sm font-700">Example for this scenario</p>
            </div>
            <Button
              data-testid="role-play-use-example"
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUseExample}
            >
              Use example
            </Button>
          </div>
          <p
            data-testid="role-play-example"
            className="mt-3 text-sm leading-6 text-foreground/75"
          >
            {scenario.exampleResponse}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="role-play-response" className="text-sm font-700">
              BA response
            </label>
            <span className="text-xs text-muted-foreground">
              {message.length}/1600
            </span>
          </div>
          <textarea
            id="role-play-response"
            data-testid="role-play-input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 min-h-36 w-full resize-y rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-ring/30"
            placeholder="พิมพ์สิ่งที่คุณจะถาม stakeholder ต่อ..."
            maxLength={1600}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button data-testid="role-play-review" type="submit" disabled={!message.trim()}>
              <Send className="h-4 w-4" /> Review response
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </form>

        {review ? (
          <div className="mt-6 grid gap-4" aria-live="polite">
            <div className="rounded-lg border border-primary/30 bg-primary/8 p-4">
              <p data-testid="role-play-score" className="text-sm font-700">
                Score {review.totalScore}/100
              </p>
              <p className="mt-1 text-sm text-foreground/75">
                {review.stakeholderReply}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {review.dimensionScores.map((score) => (
                <div
                  key={score.id}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-700">{score.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {score.score}/{score.maxScore}
                    </p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(score.score / score.maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-foreground/70">{score.evidence}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-700">Coach notes</p>
              <ul className="mt-2 space-y-2 text-sm text-foreground/75">
                {review.coachingNotes.map((note) => (
                  <li key={note}>- {note}</li>
                ))}
              </ul>
            </div>

            <PracticeNudge
              description="Use this conversation score to tighten the written requirement or ask for a second coaching lens."
              actions={[
                { href: "/req-doctor", label: "Check artifact" },
                { href: "/coach-bot", label: "Ask Coach" },
                { href: "/tracklist", label: "Open path" },
              ]}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

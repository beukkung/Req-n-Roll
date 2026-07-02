import type { SkillSlug } from "./types";

export type TrackStep = {
  id: string;
  title: string;
  href: string;
  duration: string;
  xpReward: number;
  outcome: string;
  reason: string;
};

export type LearningTrack = {
  id: string;
  title: string;
  audience: string;
  bankingFocus: string;
  goal: string;
  recommendedBecause: string;
  unlockCondition: string;
  checkpoint: string;
  reviewCadence: string;
  steps: TrackStep[];
};

export type TrackRecommendationInput = {
  weakestSkill?: SkillSlug | null;
  practicedAreas: readonly string[];
  dailyDoneToday: boolean;
  repeatedIssueTags?: readonly string[];
};

type TrackStepInput = Omit<TrackStep, "xpReward">;
type LearningTrackInput = Omit<LearningTrack, "steps"> & {
  steps: TrackStepInput[];
};

const TRACKS: LearningTrackInput[] = [
  {
    id: "junior-ba-foundation",
    title: "Junior BA Foundation",
    audience: "Junior BA or learner starting from a thin requirement brief.",
    bankingFocus: "Clarify actor, trigger, outcome, and exception before writing.",
    goal: "Build the basic loop: assess, drill, inspect, and ask a better next question.",
    recommendedBecause: "Recommended when you have not finished today's warm-up or do not have enough baseline signal yet.",
    unlockCondition: "Open for everyone.",
    checkpoint: "Rewrite one vague requirement into a user story with three acceptance criteria.",
    reviewCadence: "Review after 2 days with Daily Req, then after 7 days with Req Doctor.",
    steps: [
      {
        id: "skill-amp-baseline",
        title: "Skill Amp baseline",
        href: "/skill-amp",
        duration: "5 min",
        outcome: "Know which BA skill is weakest right now.",
        reason: "Tracklist needs a baseline before it can recommend targeted practice.",
      },
      {
        id: "daily-req",
        title: "Daily Req warm-up",
        href: "/daily-req",
        duration: "10 min",
        outcome: "Practice spotting the first question to ask.",
        reason: "Short repetition keeps the learning streak alive.",
      },
      {
        id: "req-doctor-basic",
        title: "Req Doctor: ambiguity check",
        href: "/req-doctor",
        duration: "15 min",
        outcome: "Find vague words and missing acceptance criteria.",
        reason: "Req Doctor turns practice into an artifact-quality review.",
      },
      {
        id: "coach-bot-retro",
        title: "Coach Bot retro",
        href: "/coach-bot",
        duration: "10 min",
        outcome: "Turn the review into the next question to ask.",
        reason: "Coaching closes the loop after the diagnostic result.",
      },
    ],
  },
  {
    id: "banking-ba-control",
    title: "Banking BA Readiness",
    audience: "BA working with Compliance, Risk, Ops, Product, and IT.",
    bankingFocus: "Bring controls into the conversation without making the requirement heavy.",
    goal: "Practice risk-aware requirements for banking change work.",
    recommendedBecause: "Recommended when banking controls, exception paths, or sign-off ownership look thin.",
    unlockCondition: "Finish at least one Role Play or Req Doctor review.",
    checkpoint: "Produce a decision log with owner, control evidence, and exception handling.",
    reviewCadence: "Review controls after 2 days, then repeat the scenario after 7 days.",
    steps: [
      {
        id: "role-play-control",
        title: "Role Play: stakeholder challenge",
        href: "/role-play",
        duration: "20 min",
        outcome: "Ask about scope, risk, approval, and exception path.",
        reason: "Control gaps often surface first in stakeholder conversation.",
      },
      {
        id: "req-doctor-control",
        title: "Req Doctor: banking controls",
        href: "/req-doctor",
        duration: "15 min",
        outcome: "Inspect PDPA, AML/KYC, audit, maker-checker, and ownership.",
        reason: "A written requirement must carry the control evidence forward.",
      },
      {
        id: "req-gym-control",
        title: "Req Gym: scenario reps",
        href: "/req-gym",
        duration: "25 min",
        outcome: "Collect banking scenario patterns from certification-style drills.",
        reason: "Repeated MCQ feedback exposes missing risk and control instincts.",
      },
      {
        id: "coach-bot-challenge",
        title: "Coach Bot: challenge review",
        href: "/coach-bot",
        duration: "10 min",
        outcome: "Ask for a team-lead or compliance lens on the risk points.",
        reason: "A second lens helps separate BA next steps from official policy decisions.",
      },
    ],
  },
  {
    id: "ecba-cert-prep",
    title: "ECBA Prep Sprint",
    audience: "Learner preparing for ECBA or mapping real work to BABOK language.",
    bankingFocus: "Connect elicitation, analysis, traceability, and solution evaluation.",
    goal: "Turn practice into exam-like recognition and explanation.",
    recommendedBecause: "Recommended when you need broad coverage rather than a single weak skill drill.",
    unlockCondition: "Complete Skill Amp or one Req Gym set.",
    checkpoint: "Finish one mock set and explain every missed question in your own words.",
    reviewCadence: "Repeat missed areas after 2 days and the mock path after 7 days.",
    steps: [
      {
        id: "skill-amp",
        title: "Skill Amp baseline",
        href: "/skill-amp",
        duration: "12 questions",
        outcome: "See the skill radar before scheduling study time.",
        reason: "A baseline prevents unfocused exam drilling.",
      },
      {
        id: "req-gym-mock",
        title: "Req Gym mock set",
        href: "/req-gym",
        duration: "30 min",
        outcome: "Measure BABOK knowledge areas with scenario questions.",
        reason: "Mock practice gives the fastest coverage signal.",
      },
      {
        id: "role-play-elicitation",
        title: "Role Play: elicitation",
        href: "/role-play",
        duration: "15 min",
        outcome: "Practice follow-up questions from stakeholder answers.",
        reason: "ECBA prep should still connect to practical BA behavior.",
      },
      {
        id: "coach-bot-explain",
        title: "Coach Bot: explain my miss",
        href: "/coach-bot",
        duration: "10 min",
        outcome: "Turn a wrong answer into a reusable learning note.",
        reason: "Explaining mistakes improves retention more than retaking blindly.",
      },
    ],
  },
  {
    id: "stakeholder-elicitation",
    title: "Stakeholder Elicitation",
    audience: "BA whose weakest signal is stakeholder communication or facilitation.",
    bankingFocus: "Handle ambiguity, resistance, and decision ownership in banking conversations.",
    goal: "Improve the quality of live questions and follow-up summaries.",
    recommendedBecause: "Recommended when Skill Amp shows stakeholder communication or facilitation as the weak point.",
    unlockCondition: "Complete Skill Amp or choose this path manually.",
    checkpoint: "Write a stakeholder summary with assumptions, open issues, and next owner.",
    reviewCadence: "Replay the scenario after 2 days; inspect the written summary after 7 days.",
    steps: [
      {
        id: "role-play-first",
        title: "Role Play: stakeholder pressure",
        href: "/role-play",
        duration: "20 min",
        outcome: "Practice non-defensive clarification under pressure.",
        reason: "Conversation skill improves through scenario rehearsal first.",
      },
      {
        id: "req-gym-elicitation",
        title: "Req Gym: elicitation set",
        href: "/req-gym",
        duration: "20 min",
        outcome: "Reinforce elicitation and collaboration patterns.",
        reason: "Scenario MCQs add vocabulary and BABOK framing.",
      },
      {
        id: "coach-bot-meeting",
        title: "Coach Bot: prepare for meeting",
        href: "/coach-bot",
        duration: "10 min",
        outcome: "Generate agenda, questions, risks, and follow-up actions.",
        reason: "Preparation turns role-play feedback into a real meeting plan.",
      },
    ],
  },
  {
    id: "requirement-quality",
    title: "Requirement Quality",
    audience: "BA seeing repeated vague, incomplete, or non-testable requirements.",
    bankingFocus: "Make requirements verifiable without losing banking constraints.",
    goal: "Improve artifact quality before handoff to Dev, QA, Ops, or Compliance.",
    recommendedBecause: "Recommended when requirement thinking or process/system thinking is weak.",
    unlockCondition: "Paste one artifact into Req Doctor.",
    checkpoint: "Produce a revised requirement with happy path, exception path, and control path.",
    reviewCadence: "Run Req Doctor again after 2 days; compare score after 7 days.",
    steps: [
      {
        id: "req-doctor-core",
        title: "Req Doctor: quality review",
        href: "/req-doctor",
        duration: "15 min",
        outcome: "Find missing actor, metric, AC, traceability, and controls.",
        reason: "Artifact diagnosis is the fastest way to expose quality gaps.",
      },
      {
        id: "daily-req-quality",
        title: "Daily Req: quality warm-up",
        href: "/daily-req",
        duration: "10 min",
        outcome: "Practice spotting the first quality gap.",
        reason: "Small daily reps keep the quality checklist available under pressure.",
      },
      {
        id: "coach-bot-rewrite",
        title: "Coach Bot: review my artifact",
        href: "/coach-bot",
        duration: "10 min",
        outcome: "Ask for missing questions and a next-step plan.",
        reason: "Coaching helps avoid treating the rewrite as a perfect final answer.",
      },
    ],
  },
  {
    id: "regulatory-control-awareness",
    title: "Regulatory / Control Awareness",
    audience: "BA who needs a stronger Compliance, Risk, DPO, or audit lens.",
    bankingFocus: "Spot PDPA, AML/KYC, approval, audit, and operational-risk handoffs.",
    goal: "Separate BA analysis from official bank-policy approval.",
    recommendedBecause: "Recommended when control tags or banking-risk questions keep appearing.",
    unlockCondition: "Complete the Banking BA Readiness checkpoint or choose manually.",
    checkpoint: "Create a control-question checklist for one banking change.",
    reviewCadence: "Re-run the checklist after 2 days; test with Role Play after 7 days.",
    steps: [
      {
        id: "coach-bot-compliance",
        title: "Coach Bot: compliance lens",
        href: "/coach-bot",
        duration: "10 min",
        outcome: "List confirmation needed from Compliance, Risk, Legal, or DPO.",
        reason: "The bot can frame questions but must not grant approval.",
      },
      {
        id: "req-doctor-controls",
        title: "Req Doctor: control path",
        href: "/req-doctor",
        duration: "15 min",
        outcome: "Check whether control evidence survives in the artifact.",
        reason: "Written controls are what downstream teams can inspect.",
      },
      {
        id: "role-play-dpo",
        title: "Role Play: control challenge",
        href: "/role-play",
        duration: "20 min",
        outcome: "Practice asking for risk appetite and decision owner.",
        reason: "Control awareness must hold up in a stakeholder challenge.",
      },
    ],
  },
  {
    id: "team-lead-review-gate",
    title: "Team Lead Review Gate",
    audience: "Senior BA or team lead reviewing whether work is ready to hand off.",
    bankingFocus: "Use evidence, decision logs, and exception coverage before sign-off.",
    goal: "Create a repeatable quality gate for BA artifacts.",
    recommendedBecause: "Recommended after multiple paths are complete or when preparing a portfolio/review.",
    unlockCondition: "Complete at least two practice paths or use as a manual review gate.",
    checkpoint: "Review one artifact as a team lead and list go/no-go conditions.",
    reviewCadence: "Run this gate before every major artifact handoff.",
    steps: [
      {
        id: "req-doctor-gate",
        title: "Req Doctor: final inspection",
        href: "/req-doctor",
        duration: "15 min",
        outcome: "Find any remaining non-testable or missing-control issues.",
        reason: "The final gate starts with artifact evidence.",
      },
      {
        id: "coach-bot-team-lead",
        title: "Coach Bot: team-lead challenge",
        href: "/coach-bot",
        duration: "10 min",
        outcome: "Ask for readiness risks and escalation path.",
        reason: "A lead lens tests whether the BA story is defensible.",
      },
      {
        id: "req-gym-review",
        title: "Req Gym: weak-area check",
        href: "/req-gym",
        duration: "20 min",
        outcome: "Validate the weakest area before handoff.",
        reason: "A final drill catches blind spots before real review.",
      },
    ],
  },
];

function xpRewardForStep(href: string): number {
  if (href === "/skill-amp") return 100;
  if (href === "/daily-req") return 30;
  if (href === "/req-gym") return 40;
  if (href === "/role-play") return 50;
  if (href === "/req-doctor") return 35;
  if (href === "/coach-bot") return 20;
  if (href === "/templates") return 10;
  return 15;
}

export const LEARNING_TRACKS: LearningTrack[] = TRACKS.map((track) => ({
  ...track,
  steps: track.steps.map((step) => ({
    ...step,
    xpReward: xpRewardForStep(step.href),
  })),
}));

function findTrack(id: string): LearningTrack {
  return LEARNING_TRACKS.find((track) => track.id === id) ?? LEARNING_TRACKS[0];
}

export function getRecommendedLearningTrack(
  input: TrackRecommendationInput,
): LearningTrack {
  if (!input.dailyDoneToday) {
    return findTrack("junior-ba-foundation");
  }

  if (input.repeatedIssueTags?.includes("non-testable")) {
    return findTrack("requirement-quality");
  }

  if (
    input.weakestSkill === "stakeholder_communication" ||
    input.weakestSkill === "soft_skill_facilitation"
  ) {
    return findTrack("stakeholder-elicitation");
  }

  if (
    input.weakestSkill === "requirement_thinking" ||
    input.weakestSkill === "process_system_thinking"
  ) {
    return findTrack("requirement-quality");
  }

  if (
    input.weakestSkill === "product_value_thinking" ||
    input.weakestSkill === "agile_delivery"
  ) {
    return findTrack("ecba-cert-prep");
  }

  if (
    input.practicedAreas.includes("elicitation_collaboration") &&
    input.practicedAreas.includes("requirements_analysis_design")
  ) {
    return findTrack("team-lead-review-gate");
  }

  return findTrack("banking-ba-control");
}

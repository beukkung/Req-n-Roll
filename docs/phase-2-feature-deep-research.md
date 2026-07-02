# Req'n Roll Phase 2 Feature Deep Research

Generated: 2026-06-24

Scope: research-backed shape for Phase 2 features selected by the user:

- Role Play
- Req Doctor
- Tracklist
- Coach Bot

Out of scope:

- Jam Room

## Source Base

- [IIBA Prepare for Elicitation](https://www.iiba.org/knowledgehub/business-analysis-body-of-knowledge-babok-guide/4-elicitation-and-collaboration/4-1-prepare-for-elicitation/)
- [IIBA Conduct Elicitation](https://www.iiba.org/knowledgehub/business-analysis-body-of-knowledge-babok-guide/4-elicitation-and-collaboration/4-2-conduct-elicitation)
- [IIBA Manage Stakeholder Collaboration](https://www.iiba.org/knowledgehub/business-analysis-body-of-knowledge-babok-guide/4-elicitation-and-collaboration/4-5-manage-stakeholder-collaboration/)
- [IIBA Interviews](https://www.iiba.org/knowledgehub/business-analysis-body-of-knowledge-babok-guide/10-techniques/10-25-interviews/)
- [IIBA Workshops](https://www.iiba.org/knowledgehub/business-analysis-body-of-knowledge-babok-guide/10-techniques/10-50-workshops/)
- [IIBA ECBA Exam Structure](https://www.iiba.org/knowledgehub/certification/ecba-certification/about-ecba-certification/roadmap-to-ecba-certification/study-and-prepare/exam-structure-and-format/)
- [IIBA ECBA Exam Blueprint PDF](https://www.iiba.org/globalassets/certification/ecba/files/ecba-exam-blueprint.pdf)
- [NASA How to Write a Good Requirement](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/)
- [NASA Software Requirements Analysis](https://swehb.nasa.gov/display/SWEHBVD/SWE-051+-+Software+Requirements+Analysis)
- [IEEE/ISO/IEC 29148-2018](https://standards.ieee.org/ieee/29148/6937/)
- [PLOS ONE workplace digital learning study](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0206250)
- [JMIR adaptive feedback game RCT](https://www.jmir.org/2020/7/e17100)
- [Socratic AI teamwork coaching](https://arxiv.org/html/2502.17643v1)
- [Socratic and narrative LLM pedagogical approaches](https://ar5iv.labs.arxiv.org/html/2509.12107)
- [AI-generated Socratic feedback study](https://journal.aldinhe.ac.uk/index.php/jldhe/article/view/1724)
- [TeachingCoach scaffolding chatbot](https://arxiv.org/html/2603.18189)
- [Workplace Mentoring supplement](https://www.mentoring.org/wp-content/uploads/2020/01/Workplace-Supplement-to-EEPM_Public.pdf)
- [UN Women mentoring in the workplace guidance](https://www.weps.org/sites/default/files/2020-12/WEPs_GUIDANCE_Mentoring_in_the_Workplace_0.pdf)

## Executive Direction

Phase 2 should not be a generic community expansion. It should deepen Req'n Roll's core loop:

1. Practice realistic BA judgment.
2. Diagnose actual requirement artifacts.
3. Follow a tailored learning path.
4. Get chatbot coaching when stuck.

Recommended roadmap labels:

- `Role Play`
- `Req Doctor`
- `Tracklist`
- `Coach Bot`

## Feature 1: Role Play

### Product Job

Let a BA practice high-stakes stakeholder conversations in a safe simulated setting before doing the real meeting.

### Research Logic

IIBA frames elicitation as a cycle of preparing scope and outcomes, conducting collaborative elicitation, confirming results, communicating information, and managing stakeholder collaboration. Interviews and workshops both require planning, rapport, documentation, and follow-up. Role Play should train those behaviors, not just provide a chat toy.

### MVP

- User chooses a scenario:
  - unclear business request
  - compliance challenge
  - sponsor changes scope
  - operations refuses a proposed process
  - fraud/risk team blocks a launch
- User chooses persona:
  - branch manager
  - compliance officer
  - product owner
  - operations lead
  - sponsor
  - developer / solution architect
- The system plays the stakeholder.
- The user asks questions and summarizes understanding.
- The system scores the conversation.

### Scoring Rubric

- Preparation: did the BA clarify objective, output, stakeholder role, and constraints?
- Question quality: open-ended, non-leading, context-aware.
- Follow-up: did the BA dig into ambiguity, exception paths, data, controls, and decision rights?
- Collaboration: did the BA manage resistance without becoming defensive?
- Confirmation: did the BA summarize need, assumptions, open issues, and next action?
- Banking awareness: did the BA catch BOT, PDPA, KYC, AML, fraud, operational, or data-governance constraints where relevant?

### Banking Scenario Seeds

- Mobile transfer timeout: customer sees failed status, core banking posts debit, call center gets complaints.
- e-KYC onboarding: compliance wants stricter verification, product wants lower drop-off.
- SME loan workflow: sales wants speed, risk wants affordability evidence.
- FCD/e-FCD issue: branch and BOT reporting disagree on account type mapping.
- Credit card dispute: card operations, merchant, fraud, and customer all have different evidence.

### Do Not Build

- Do not make it free-form chat with no scoring.
- Do not let the stakeholder give all answers immediately.
- Do not grade only by keyword matching.

## Feature 2: Req Doctor

### Product Job

Let a BA paste a requirement, user story, BRD paragraph, acceptance criteria, or process note and receive structured diagnosis.

### Research Logic

NASA and IEEE/ISO/IEC requirements guidance converges on the same quality themes: clear, unambiguous, complete, consistent, feasible, verifiable/testable, traceable, and supported by rationale/assumptions. Req Doctor should be a requirements-quality inspector, not a generic rewrite tool.

### MVP

Input types:

- User story
- Requirement sentence
- Acceptance criteria
- BRD section
- Process note

Output:

- Quality score
- Detected issues
- Suggested rewrite
- Missing questions
- Acceptance criteria suggestion
- Traceability suggestion
- Banking risk tags

### Diagnosis Rubric

- Clarity: no vague terms such as fast, easy, user-friendly, as appropriate.
- Completeness: actor, trigger, data, outcome, exception, owner, and boundary conditions.
- Testability: can QA verify it by test, inspection, demonstration, or analysis?
- Traceability: business objective, stakeholder/source, downstream design/test link.
- Feasibility: legal, policy, system, data, and operation constraints are not ignored.
- Consistency: does not conflict with other known requirements or definitions.
- Rationale and assumptions: why this exists and what still needs confirmation.
- Banking controls: PDPA, KYC, AML, audit trail, approval matrix, data lineage, segregation of duties.

### Example UX

The user pastes:

> ลูกค้าต้องโอนเงินได้เร็วขึ้น

Req Doctor replies:

- Problem: vague performance target, missing channel, missing transaction type, no acceptance criteria.
- Ask next:
  - Which transfer type: PromptPay, interbank, own-account, bulk?
  - What does "เร็วขึ้น" mean: screen response time, posting time, settlement time, or user-perceived completion?
  - Which controls cannot be weakened: OTP, AML screening, fraud hold, limit check?
- Rewrite:
  - "For PromptPay transfer on mobile banking, after the customer confirms OTP, the app shall show a final success/failure/pending state within X seconds for 95% of transactions, with a traceable transaction ID and next-step instruction for pending or failed cases."

### Do Not Build

- Do not only rewrite in prettier Thai.
- Do not claim legal/compliance correctness.
- Do not output a perfect answer without asking missing-context questions.

## Feature 3: Tracklist

### Product Job

Turn Skill Amp, Daily Req, Req Gym, Req Doctor, and Role Play into a guided learning path.

### Research Logic

IIBA ECBA material emphasizes practical application, situation-based questions, and performance indicators rather than raw pass/fail scores. Workplace-learning research supports structured testing and discussion over passive content. Adaptive feedback research suggests that feedback should be tied to learner state and repeated practice.

### MVP

Tracklist paths:

- Junior BA Starter
- Banking BA Readiness
- ECBA Prep
- Stakeholder Elicitation
- Requirement Quality
- Regulatory / Control Awareness
- Team Lead Review Gate

Each path has:

- goal
- estimated time
- required modules
- recommended practice
- spaced review queue
- unlock condition
- checkpoint assessment

### Adaptive Rules

- If Skill Amp weak area is stakeholder communication: suggest Role Play + Elicitation Req Gym.
- If Req Gym misses Data Governance / PDPA tags: suggest banking-control mini set.
- If Req Doctor finds repeated non-testable requirements: suggest acceptance criteria drills.
- If user completes a path: schedule review questions 2 days and 7 days later.

### Metrics

- completion
- retention streak
- weak domain improvement
- repeated mistake tags
- time to first correct answer after feedback
- practical artifact quality from Req Doctor

### Do Not Build

- Do not make this a static page of links.
- Do not create too many tracks in MVP.
- Do not hide why the learner is being assigned a module.

## Feature 4: Coach Bot

### Product Job

Provide on-demand BA coaching chat for users who are stuck, want feedback on a work situation, or need a next-step plan.

This replaces the old `Coaching / Office Hour` idea. It is chatbot-first, not scheduled human office hours.

### Research Logic

AI coaching research suggests useful patterns: Socratic questioning can drive reflection, narrative/actionable guidance can help experienced users move faster, and task-time coaching can intervene when teams are misaligned. TeachingCoach-style systems point to a stronger architecture: ground the chatbot in domain rules and guide users through problem identification, diagnosis, and strategy development.

### MVP Modes

- Ask a BA coach:
  - "Stakeholder keeps changing scope, what should I do?"
- Review my artifact:
  - paste requirement / AC / meeting summary
- Prepare for meeting:
  - generate agenda, questions, stakeholder map, risks
- After meeting debrief:
  - summarize notes, assumptions, open issues, follow-up
- Explain my mistake:
  - user pastes a wrong Req Gym answer and asks why

### Conversation Style

Use two modes:

- Socratic mode for Junior BA:
  - asks guided questions
  - helps user think
  - avoids giving final answer too early
- Direct coach mode for Senior / Team Lead:
  - concise diagnosis
  - risk/control lens
  - action checklist
  - escalation path

### Guardrails

- Must not provide legal, regulatory, credit, AML, or compliance approval.
- Must say when a user needs Compliance, Risk, Legal, DPO, or Product Owner confirmation.
- Must distinguish "suggested BA next step" from "official bank policy".
- Must not store sensitive customer data unless the app has explicit privacy design.
- Should remind users to mask account numbers, citizen ID, card numbers, and customer PII.

### Data Needed

- Req Gym metadata: area, ECBA domain, BACCM, banking tags.
- User progress: weak areas, repeated mistake tags.
- Req Doctor rubric.
- Template library.
- Optional internal policy references in a future enterprise version.

### Do Not Build

- Do not call it human office hour if no human is involved.
- Do not make it a generic ChatGPT clone.
- Do not let it answer sensitive bank cases without redaction guidance.

## Recommended Phase Order

### Phase 2A: Low-Risk, High-Value

1. Tracklist static engine with adaptive recommendations from existing progress.
2. Req Doctor local rubric without AI dependency.
3. Roadmap copy update: Role Play, Req Doctor, Tracklist, Coach Bot.

### Phase 2B: AI-Assisted

1. Coach Bot with guardrails and redaction notice.
2. Req Doctor AI rewrite/explanation.
3. Role Play single-turn scenario simulator.

### Phase 2C: Advanced Simulation

1. Multi-turn Role Play with scoring.
2. Coach Bot memory of weak skills.
3. Team Lead review mode.
4. Enterprise mode with bank policy references.

## Implementation Notes

- Reuse the existing Req Gym metadata layer for ECBA domains and banking tags.
- Add `featureFlags` before enabling AI features.
- Store user-submitted artifacts locally by default until privacy/storage policy is explicit.
- Add browser tests for each user-visible flow before rollout.

## Final Recommendation

Build all selected Phase 2 features except Jam Room, but position them around one learning loop:

Role Play trains conversation. Req Doctor diagnoses artifacts. Tracklist decides what to practice next. Coach Bot helps the user reason through stuck moments.

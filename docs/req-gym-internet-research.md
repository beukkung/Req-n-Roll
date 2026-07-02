# Req Gym Internet Research Notes

Generated: 2026-06-24

Purpose: turn external references on BA certification, banking regulation, assessment design, and training UX into concrete improvement ideas for Req'n Roll / Req Gym.

## Research Sources

- [IIBA ECBA Exam Structure and Format](https://www.iiba.org/knowledgehub/certification/ecba-certification/about-ecba-certification/roadmap-to-ecba-certification/study-and-prepare/exam-structure-and-format/)
- [IIBA ECBA Exam Blueprint PDF](https://www.iiba.org/globalassets/certification/ecba/files/ecba-exam-blueprint.pdf)
- [BOT Information Technology Risk Supervision](https://www.bot.or.th/en/our-roles/payment-systems/information-technology-risk-supervision.html)
- [BOT Data Governance Policy Statement](https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2564/EngPDF/25640163.pdf)
- [BOT Responsible Lending Regulation](https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2568/EngPDF/25680030.pdf)
- [Thailand Personal Data Protection Act B.E. 2562](https://mdes.go.th/law/detail/3577-Personal-Data-Protection-Act-B-E--2562--2019-)
- [NN/g 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-Heuristics/)
- [RCSI Guidelines for Multiple Choice Items and Assessments](https://hub.teachingandlearning.ie/wp-content/uploads/2021/06/2.-Holland-Stevens-MCQ-guidelines-2021.pdf)

## Key Findings

### 1. ECBA has moved toward practical situation-based readiness

IIBA's current ECBA material frames the exam as 50 situation-based and standard MCQ items over 75 minutes, focused on practical application and job-ready foundational BA capability. The updated blueprint uses nine domains:

| Domain | Weight |
| --- | ---: |
| Understanding Business Analysis | 20% |
| Mindset for Effective Business Analysis | 14% |
| Implementing Business Analysis | 6% |
| Change | 10% |
| Need | 10% |
| Solution | 10% |
| Stakeholder | 10% |
| Value | 10% |
| Context | 10% |

Implication for Req Gym: the current 6 BABOK-area structure is useful, but the product should add a second tagging layer for the nine ECBA domains and BACCM concepts. This will make the bank more certification-aligned without losing the local banking flavor.

### 2. Banking BA scenarios should cover risk, controls, data, and customer outcomes

BOT sources point to recurring real-bank constraints that BA questions should include:

- IT/cyber resilience: access control, authentication, confidentiality, integrity, service availability, incident response, audit, third-party risk, and enterprise risk alignment.
- Data governance: data ownership, data quality, metadata, lifecycle management, security, privacy, issue management, and three lines of defense.
- Responsible lending: product design, advertising, sales process, affordability, financial discipline, persistent debt assistance, debt difficulty assistance, and legal/debt transfer steps.
- KYC and fraud: customer identification, verification, authentication, fraud risk, and AML/CFT/CPF risk management.
- Customer data sharing/open data: user-controlled data sharing, standardized digital channels, security, consumer protection, and operational readiness.

Implication for Req Gym: banking contexts should not stop at "mobile banking" or "fraud"; the strongest scenarios should force candidates to balance customer value, compliance, operations, data quality, system constraints, and evidence.

### 3. Good MCQs need focused stems, plausible distractors, and item analysis

Assessment-writing guidance supports:

- Use contextual vignettes when testing application and judgment.
- Ask a clear lead-in question with one best answer.
- Keep options homogeneous and plausible.
- Avoid clues, trick wording, absolute language, and irrelevant reading load.
- Use post-run item analysis: item difficulty, discrimination, and distractor performance.

Implication for Req Gym: the 1,000-question bank should keep the four-option single-best-answer format, but each question should carry review metadata: testing point, common misconception behind each distractor, expected difficulty, and banking risk tags.

### 4. Training UX must make system status obvious

NN/g's usability heuristics emphasize immediate feedback, clear system status, consistency, error recovery, and recognition over recall. This directly maps to the current fresh-user review issue: if XP, nickname, selected answers, feedback submission, or template download states do not visibly update, users lose trust even when the content is good.

Implication for Req'n Roll: before expanding the content bank further, fix interactive state reliability and add browser tests for cross-route XP, mobile menu, answer selection, feedback submission, and template download status.

## Recommended Product Changes

### P1: Add ECBA domain tags beside BABOK area

Current:

```ts
area: "Business Analysis Planning & Monitoring"
```

Recommended metadata:

```ts
area: "Business Analysis Planning & Monitoring"
ecbaDomain: "Context"
baccmConcepts: ["Need", "Stakeholder", "Value"]
bankingTags: ["IT Risk", "Third Party", "Operations"]
testingPoint: "Choose an adaptive BA approach when requirements and stakeholders are changing"
```

Why: allows dashboards such as "weak in Stakeholder + Context" instead of only "weak in Elicitation".

### P1: Add banking risk taxonomy

Suggested tags:

- `KYC / e-KYC`
- `AML / CFT / CPF`
- `Fraud / Scam / Mule Account`
- `Payment Systems`
- `IT Risk / Cyber Resilience`
- `Data Governance`
- `PDPA / Consent / Privacy`
- `Responsible Lending`
- `Market Conduct / Customer Protection`
- `Operational Risk`
- `Third Party / Vendor`
- `Regulatory Reporting`
- `Branch Operations`
- `Credit Underwriting`
- `Collections / Debt Assistance`
- `Open Data / Customer Data Sharing`

Why: makes the exam bank auditable for a bank training sponsor.

### P1: Fix interactive trust before team rollout

Browser review found client-state controls that did not visibly update in the test run:

- mobile menu toggle
- Skill Amp radio selection
- feedback rating and submit validation
- template download state
- cross-route XP/nickname consistency

Add E2E cases before calling the app beta-ready for BA teams.

### P2: Shift some questions into "testlets"

Current random single-question model is good for daily practice. Add a second mode with one banking case and 4-6 linked questions:

Example case: "Mobile banking PromptPay transfer dispute after suspected scam".

Linked questions:

1. Identify impacted stakeholders.
2. Choose elicitation method.
3. Define traceability artifacts.
4. Prioritize requirement vs regulatory control.
5. Define acceptance criteria.
6. Evaluate solution performance metric.

Why: closer to real BA work, where one situation produces several decisions across lifecycle stages.

### P2: Add item-quality metadata and review workflow

For each generated question, track:

- `testingPoint`
- `correctRationale`
- `distractorRationales`
- `commonMistake`
- `sourceBasis`
- `bankingTags`
- `ecbaDomain`
- `baccmConcepts`
- `reviewStatus`

Then build a reviewer report:

- duplicate stems
- too-obvious distractors
- unbalanced option length
- missing banking tag
- missing rationale
- repeated correct option pattern
- difficulty distribution by domain

### P2: Tune certification alignment

Keep 6 BABOK areas visible because they are familiar, but add ECBA domain distribution:

| Mode | Suggested distribution |
| --- | --- |
| ECBA-style mock | match nine ECBA domain weights |
| Bank BA readiness mock | 40% stakeholder/need/context, 30% solution/value/change, 30% compliance/data/ops scenarios |
| Daily Req | one short realistic scenario with immediate explanation |
| Team Lead pack | long case/testlet with decision log and governance questions |

### P3: Improve copy alignment

The home page says Skill Amp is 30-40 questions, while the live quiz shows 12. Change copy to "12 ข้อ" or expand Skill Amp to match the promise.

## Recommended Question Pattern

Use this pattern for new bank scenarios:

```md
Context:
ธนาคาร / product / channel / operation / regulation

Trigger:
change request, incident, audit finding, KPI miss, customer complaint, or new regulation

Constraints:
stakeholders, system dependencies, control/risk, deadline, data quality, customer impact

Lead-in:
BA should do what next / choose which artifact / validate which assumption / involve whom first?

Options:
A-D, all plausible, same type, one best answer

Explanation:
why best, why each distractor is weaker, what evidence the BA should collect next
```

## Example New Scenarios To Add

1. Responsible lending: personal loan product wants faster approval, but affordability evidence is incomplete.
2. Data governance: regulatory report mismatch between core banking, DWH, and manual spreadsheet.
3. Open data: customer-authorized data sharing API requires consent, revocation, audit log, and data minimization.
4. Cyber resilience: payment service release changes authentication flow before high-traffic campaign.
5. Merchant acquiring: high-risk merchant onboarding needs KYM, watchlist, transaction monitoring, and escalation.
6. e-KYC: facial biometric onboarding has false reject complaints and fraud pressure.
7. Branch operations: teller process reduces queue time but increases document rejection.
8. Collections: debt assistance flow must balance customer fairness, legal steps, and operational handoff.

## Bottom Line

Req Gym is directionally strong after the banking-context expansion. The next best upgrade is not simply "more questions"; it is better metadata, domain coverage, item-quality controls, and browser-tested trust signals. For a bank training sponsor, the strongest pitch is:

"1,000 Thai banking BA scenarios, mapped to BABOK + ECBA domains + banking risk taxonomy, with immediate rationales and progress analytics."

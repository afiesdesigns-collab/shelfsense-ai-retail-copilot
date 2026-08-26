# ShelfSense AI

**AI-Assisted Retail Planning Copilot**

**Live prototype:** [afiesdesigns-collab.github.io/shelfsense-ai-retail-copilot](https://afiesdesigns-collab.github.io/shelfsense-ai-retail-copilot/)
**Case study by:** [Afshin Esmaeili](https://afshinesmaeili.com) — Senior Product Designer

> **Disclaimer:** ShelfSense AI is an independent portfolio concept created to demonstrate enterprise product design, research, systems thinking, and prototyping for AI-assisted software. It is not affiliated with or commissioned by any company. All company names, users, operational scenarios, and datasets shown in this project are fictional or synthetic.

ShelfSense AI helps retail account managers and field-sales representatives analyze store performance, identify opportunities, compare scenarios, and prepare evidence-based account recommendations — with a human required to approve every consequential action.

This repo documents the end-to-end design process for an AI copilot — problem framing, personas, an explicit AI-behavior and explainability model, information architecture, workflows, edge cases, AI-safety principles, a design system, and research/testing plans — and includes a coded, accessible prototype of the **recommendation review** experience: the single moment where a human evaluates an AI suggestion, inspects its evidence, edits it, and decides whether to approve, reject, or escalate it.

---

## 1. The problem

Sales representatives manage many accounts and must combine sales, inventory, promotions, service issues, and local conditions before deciding what to recommend. The sections below break that experience into its component moments.

### Increase inventory for a fast-selling product

**Problem:** A product may be selling faster than expected, but the representative might not notice until the store runs out.

**Proposed answer**
- Detect unusual sales velocity.
- Compare current inventory with expected demand.
- Estimate the date of a potential stockout.
- Recommend an inventory adjustment.
- Show the supporting sales and inventory data.
- Require human approval before creating an order or recommendation.

### Adjust an upcoming promotion

**Problem:** A planned promotion may conflict with inventory availability, seasonal demand, or another campaign.

**Proposed answer**
- Review promotion timing, inventory, historical performance, and store characteristics.
- Flag risks such as insufficient stock or overlapping promotions.
- Suggest alternatives.
- Allow the user to compare projected scenarios.
- Let the account manager modify the recommendation before sharing it.

### Investigate a sales decline

**Problem:** A drop in sales could come from inventory problems, equipment downtime, pricing, local events, competitor activity, or bad data.

**Proposed answer**
- Detect the decline.
- Present possible contributing factors.
- Clearly separate confirmed evidence from hypotheses.
- Show the data behind each explanation.
- Recommend investigative steps instead of pretending to know the cause.
- Escalate when data is incomplete.

### Recommend a store visit

**Problem:** Representatives cannot visit every account frequently.

**Proposed answer**
- Prioritize locations based on potential impact and urgency.
- Explain why a visit is recommended.
- Show unresolved service issues, promotion opportunities, inventory risks, and time since the last visit.
- Allow the representative to accept, postpone, or reject the recommendation.

### Identify out-of-stock risk

**Problem:** Representatives often react after a product is already unavailable.

**Proposed answer**
- Calculate risk from sales velocity, on-hand inventory, scheduled delivery, and promotion activity.
- Display risk as low, medium, or high with supporting evidence.
- Show uncertainty when inventory data may be outdated.
- Recommend actions such as verifying inventory, adjusting delivery, or contacting the store.

### Draft an account plan

**Problem:** Preparing account reviews requires collecting information from several systems and writing repetitive summaries.

**Proposed answer**
- Generate a first draft containing performance, risks, opportunities, and recommended actions.
- Cite the data used in every major recommendation.
- Let the account manager edit all content.
- Highlight AI-generated text.
- Require approval before export or sharing.
- Save the approved version and its revision history.

---

## 2. Users

### Account manager
- **Goals:** grow strategic accounts, prepare persuasive evidence-based recommendations, compare business scenarios, build trust with retail partners.
- **Needs:** portfolio-level visibility, reliable recommendations, clear business impact, editable presentations and account plans.

### Field-sales representative
- **Goals:** prioritize daily activities, prepare for store visits, identify immediate risks and opportunities, record observations from the field.
- **Needs:** mobile access, concise recommendations, offline notes, clear next actions.

### Sales manager
- **Goals:** understand team performance, review major recommendations, allocate resources, maintain consistency and compliance.
- **Needs:** approval workflows, regional performance views, recommendation history, team-level risk visibility.

### Data or business analyst
- **Goals:** validate model behavior, monitor data quality, investigate unexpected recommendations, improve business rules.
- **Needs:** data lineage, model and rule documentation, confidence indicators, feedback and correction data.

---

## 3. Primary scenario

A field representative opens ShelfSense and sees that one store has a high risk of running out of a popular beverage during an upcoming promotion.

The AI recommendation states: *"Increase the next delivery by 18 cases and confirm shelf capacity with the store manager."*

The interface explains that sales velocity increased during the previous two weeks, current inventory is estimated to last four days, the promotion begins in six days, the last inventory update may be incomplete, and a similar promotion increased demand at comparable stores.

The representative reviews the source data, changes the recommendation from 18 to 12 cases, and adds a store-capacity check. The sales manager approves it. Every AI and human action is preserved in the audit history.

> **Prototype scope:** the coded prototype implements exactly this moment — the recommendation card, its evidence, the edit, and the approve / reject / escalate decision with audit history.

---

## 4. AI behavior model

ShelfSense uses four levels of AI behavior, each with an explicit ceiling:

| Level | Behavior | Example |
|---|---|---|
| 1. Summarize | The AI explains what happened. | "Sales increased 14% during the last two weeks while available inventory declined." |
| 2. Recommend | The AI suggests an action. | "Verify shelf inventory and consider increasing the next delivery." |
| 3. Prepare | The AI creates a draft action for review. | A draft store-visit plan or inventory recommendation. |
| 4. Execute with approval | The AI prepares an action but cannot complete it until a human approves. | Submit an adjusted order after the representative reviews and approves it. |

For this portfolio project, the AI is never allowed fully autonomous purchasing or customer communication — demonstrating an understanding of appropriate AI boundaries rather than maximizing automation.

---

## 5. Explainability model

Every recommendation is designed to answer:

1. What is being recommended?
2. Why is it recommended?
3. What data supports it?
4. How current is the data?
5. How confident is the system?
6. What assumptions were made?
7. What could make the recommendation wrong?
8. What happens if the user accepts it?
9. Can the action be edited or reversed?

The coded prototype answers all nine inside a single "Why this recommendation?" panel attached to the recommendation card.

---

## 6. Information architecture

**Home** — Priority recommendations · Portfolio health · Upcoming promotions · High-risk locations · Tasks and approvals

**Accounts** — Account overview · Locations · Performance · Inventory · Promotions · Service issues · Recommendations · Account plans

**AI workspace** — Recommendation · Evidence · Confidence and uncertainty · Scenario comparison · Edit recommendation · Approve or reject · Feedback · Audit history

**Store-visit mode** — Visit objective · Store summary · Current risks · Suggested questions · Checklist · Notes and photographs · Follow-up actions

**Administration and governance** — Recommendation rules · Data sources · Model version · Permissions · Approval requirements · Audit logs · Feedback review

---

## 7. Key workflows

**Daily prioritization**
Open dashboard → review recommendations → inspect urgency and impact → examine evidence → accept or postpone task → add it to daily plan.

**Recommendation review**
Open recommendation → read summary → inspect supporting data → review uncertainty → compare alternatives → edit proposed action → approve, reject, or escalate.

**Scenario comparison**
Select promotion or inventory decision → adjust assumptions → compare projected outcomes → save preferred scenario → share for approval.

**Store-visit preparation**
Select location → review performance and service history → inspect AI recommendations → create visit agenda → access mobile checklist.

**AI feedback**
Select inaccurate recommendation → identify the problem → provide correction → choose whether the issue concerns data, reasoning, timing, or business context → submit feedback.

> **Prototype scope:** the coded prototype implements the **recommendation review** flow end-to-end, including the feedback step when a recommendation is rejected. The dashboard, scenario comparison, and store-visit experiences are documented above as IA and workflows but not yet built — noted as next steps.

---

## 8. Failure and edge cases

- Sales data is delayed.
- Inventory information is missing.
- Two systems report conflicting numbers.
- The AI recommends an impossible inventory level.
- The recommendation conflicts with a contractual rule.
- Confidence is low.
- The user rejects the same recommendation repeatedly.
- A store is temporarily closed.
- A product has been discontinued.
- A promotion changes after the recommendation is created.
- Two people edit the same account plan.
- A user approves an action accidentally.
- The AI generates unsupported explanatory text.
- A recommendation is correct statistically but inappropriate for the local context.

---

## 9. AI safety and human control

**Included by design**
- Approval before consequential actions
- Visible source citations
- Data freshness indicators
- Confidence and uncertainty
- Edit and reject controls
- Undo where technically possible
- Audit history
- Role-based permissions
- Clear AI-generated labels
- Feedback and correction mechanisms
- Escalation to a manager or analyst
- No fabricated data when information is unavailable

**Deliberately avoided**
- Pretending the AI is always correct
- Hiding uncertainty
- Automatically contacting customers
- Automatically changing orders
- Using a conversational interface for every task
- Generating recommendations without evidence
- Making color the only indicator of risk

---

## 10. Design system

AI-specific components designed for this platform: recommendation cards · confidence indicators · evidence panels · source citations · data-freshness labels · AI-generated content markers · approve, edit, reject, and undo actions · scenario comparison cards · human-review checkpoints · audit-history events · feedback controls · low-confidence warnings · missing-data states · processing and streaming states.

Each component is documented for: purpose, variants, interaction states, responsive behavior, content rules, accessibility requirements, usage examples, and situations where the component should **not** be used.

The coded prototype implements a working token-driven subset: the recommendation card, confidence badge, evidence panel, AI-generated content marker, edit control, approve/reject/escalate actions, audit-history timeline, and low-confidence / missing-data states.

---

## 11. Research plan

**Research objectives**
- Understand how sales representatives prioritize accounts.
- Identify what information they trust.
- Learn which decisions require approval.
- Determine when AI recommendations are helpful or intrusive.
- Understand how users interpret confidence and uncertainty.
- Identify acceptable boundaries for automation.

**Participants**

Interview:
- 4–6 retail or B2B sales representatives
- 3–5 account managers
- 2–3 sales managers
- 2–3 data or business analysts

Participants do not have to work in beverage retail specifically — retail merchandising, consumer goods, telecom, restaurant supply, and wholesale sales professionals can provide relevant workflow insight.

**Interview questions**
- How do you decide which account needs attention?
- What systems do you check?
- Which information is frequently missing?
- Tell me about a recommendation you did not trust.
- What evidence would make an AI recommendation credible?
- Which actions should always require approval?
- What would make you reject a recommendation?
- How do you prepare for a store visit?
- How do you compare promotional scenarios?
- What mistakes would be unacceptable?

**Important rule:** the problems, personas, and proposed answers in this document are **hypotheses**, not research findings — no interviews have been conducted yet, and no quotes here are real. Once interviews are complete, this section will be replaced with actual themes and anonymized observations, cited as such.

---

## 12. Usability test plan

Tasks to test:
1. Identify the most urgent account.
2. Explain why the AI made a recommendation.
3. Determine whether the supporting data is current.
4. Modify and approve a recommendation.
5. Reject a recommendation and provide feedback.
6. Compare two promotional scenarios.
7. Undo or trace an approved action.
8. Prepare for a store visit.

Metrics to capture: task completion · time on task · incorrect approvals · ability to identify uncertainty · ability to locate supporting evidence · trust rating before and after reviewing evidence · perceived control · comprehension of AI terminology · qualitative feedback.

A particularly valuable test question: **"What do you believe will happen if you select Approve?"** If participants cannot answer accurately, the action and its consequences are not clear enough.

**Important rule:** this is a test plan, not a completed study. No usability testing has been run yet, so no results (e.g. "80% completion rate") are reported here. Results will be added only after real sessions are conducted and measured.

---

## Tradeoffs and limitations

- The prototype is a static, front-end-only simulation: there is no real data pipeline, no actual ML model, and the "confidence" and "evidence" shown are illustrative, not computed.
- Only the recommendation-review moment is built. The dashboard, scenario comparison, and store-visit modes exist only as information architecture and workflow documentation.
- The reject-with-feedback flow captures a reason category but does not route it anywhere — in a real system this would feed a model-improvement or business-rules queue, which is out of scope here.
- I considered a conversational (chat-only) interface for the whole workspace and rejected it: a chat log buries evidence and makes it hard to audit exactly what data justified a decision, which conflicts directly with the explainability goals in section 5.
- Risks that remain unresolved: I don't yet know, without user testing, whether representatives will actually read the evidence panel before approving, or whether they'll treat "Approve" as a rubber stamp — this is precisely why the "what happens if you Approve" comprehension check in the usability plan matters.
- What I'd want to measure after a real launch: override/edit rate on recommendations, time-to-decision, and whether approval quality changes when the evidence panel is collapsed by default versus expanded by default.

## Lessons learned

Designing for an AI copilot forced a different question than most product design work: not "what can the AI do," but "what should a human always have to decide." The four-level behavior model and the explicit "avoid" list in section 9 exist because it was easy, while designing the happy path, to keep quietly raising the AI's authority (auto-submit the order, auto-message the store) — each of those had to be deliberately designed back out in favor of a human checkpoint.

---

## Tech

The prototype is vanilla HTML, CSS (custom properties as design tokens), and JavaScript — no framework or build step. Built through an AI-assisted design-to-code workflow (Figma tokens → Claude Code), consistent with the approach used in [`design-system-prototype`](https://github.com/afiesdesigns-collab/design-system-prototype) and [`ServeSync`](https://github.com/afiesdesigns-collab/ServeSync).

## Run it locally

```
git clone https://github.com/afiesdesigns-collab/shelfsense-ai-retail-copilot.git
cd shelfsense-ai-retail-copilot
open index.html   # or: python3 -m http.server, then visit localhost:8000
```

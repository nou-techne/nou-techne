# RegenHub Bylaws & Operations Tool: Theory-to-Practice Gap Analysis

*February 2026 — Techne / RegenHub, LCA*

---

## Context

The RegenHub Bylaws and Operations Tool is an interactive, signal-enabled web interface for navigating the governance and legal architecture of RegenHub, LCA — a Colorado Limited Cooperative Association organized as a public benefit entity.

The tool represents what has been formalized into legal structure: articles of organization, proposed bylaws, member agreement framework, and investor data room. It is a working document, not a ratified one — organizers use a signal layer (Support / Oppose / Note / Concern) to register positions on open items before the documents go to legal counsel for final drafting.

The **Habitat** project (the-habitat.org) represents the theoretical economic infrastructure the cooperative is building toward: a composable, patronage-based accounting system designed for organizations that enrich their ecosystems rather than extract from them.

This document maps the gap between what the tool currently covers (legal architecture) and what Habitat theorizes (economic architecture) — and proposes content strategies for bridging them.

---

## What the Tool Currently Covers

The tool is organized around four stakeholder views: **Organizers**, **Investors**, and two supporting sections (Signal Aggregate, Auth). Core content:

**Bylaws viewer (Articles I–XIV)**
- Article I: Membership classes (4 proposed), eligibility, admission, voting, withdrawal, termination
- Article II: Member meetings, quorum (sliding scale), voting mechanics
- Article III: Board composition, elections, removal, operations
- Article IV: Officers (President/Secretary/Treasurer), steward roles
- Article V: Capital structure, net profits computation, partnership allocations (Sub K), liens and redemption
- Articles VI–X: Contracts, fiscal year, benefit report, unclaimed money, notice methods
- Article XI: Dispute resolution (escalation: negotiation → mediation → board hearing → JAMS arbitration)
- Articles XII–XIV: Amendments, mergers, dissolution

**Member Agreement framework**
- Identity and purpose variables
- Membership class structure and stock pricing (Schedule A)
- Benefits and obligations per class
- Patronage provisions (placeholder — pending Financial Systems Committee)

**Data Room**
- Investor deck, vision one-pager, term sheet

**Signal infrastructure**
- Per-item organizer feedback (Support / Oppose / Note / Concern)
- Aggregate view for organizers
- Email magic-link authentication with organizer allowlist

---

## What Habitat Theorizes (Not Yet in the Tool)

### 1. Patronage Formula — Operationalized

The bylaws contain four weight items (labor 40%, revenue 30%, cash 20%, community 10%) marked DECIDE, awaiting action by the Financial Systems Committee. What the tool lacks:

- An explanation of how the weighted-sum formula works
- A worked example showing how weight choices shift member allocations (e.g., if labor is increased from 40% to 50%, who gains and who loses?)
- Documentation of the **704(b) substantiality constraint** — allocations must be based on genuine economic factors with documented business rationale, not tax-motivated shifting. This is a design constraint on the weights, not an optional compliance step.
- Thresholds: minimum participation levels below which members receive zero allocation for a period
- Caps: maximum allocation percentage to prevent concentration

The Habitat spec has all of this — including calculation walkthroughs with verified IRS compliance analysis. That material belongs in the tool before the Financial Systems Committee meets.

### 2. Capital Account Lifecycle

The bylaws reference 704(b) capital accounts and K-1 delivery. What they don't surface:

- The **dual-basis requirement**: every member has both a Book Capital Account (704(b) basis, tracks economic interest) and a Tax Capital Account (tracks IRS-reportable basis). They diverge when non-cash property is contributed or when GAAP and tax depreciation schedules differ.
- **Section 704(c) layers**: when a member contributes appreciated property, the built-in gain stays with that member for tax purposes. This requires tracking at contribution time.
- **Revaluation triggers**: when new members join or existing members withdraw, the cooperative must revalue assets to FMV — affecting all capital accounts simultaneously.
- **The lifecycle arc**: admission → contribution → period-end allocation → qualified written notice → K-1 delivery → potential cash redemption. Members should be able to see this arc to understand what their economic stake actually means.

### 3. Qualified Allocation Mechanics (IRC § 1385)

The bylaws mention Sub K pass-through and tax consent in passing. What the tool doesn't surface:

A cooperative operating under Subchapter K can deduct patronage allocations that are paid as **Qualified Written Notices of Allocation** — but this requires:
- At least **20% of the allocation distributed in cash** (the minimum cash requirement)
- Written notice to the member specifying the total allocation and cash portion
- **Member consent** to include the retained allocation in their gross income in the year of allocation

This is a compliance hard constraint, not a governance preference. The distribution ratio (cash vs. retained equity) is one of the highest-stakes financial decisions the cooperative makes annually, with direct tax implications for both the cooperative and individual members. It belongs in the tool with that framing — not buried in a single DECIDE item labeled "distribution policy: Board discretion."

### 4. Operating Agreement Patronage Article

The Habitat legal infrastructure includes a full operating agreement patronage article template — covering patronage definitions (Labor, Expertise, Capital, Relationship), accounting period structure, weighting mechanics, the allocation formula, capital account maintenance, qualified written notice requirements, redemption policy, and amendment procedures.

This template bridges the bylaws and the executed Member Agreement. The bylaws establish that patronage accounting exists; the operating agreement patronage article specifies how it works. The legal team needs both to draft a compliant instrument, and the organizers need to see the full template to understand what decisions they're making in the bylaws signal layer.

### 5. Economic Habitat Matrix

The bylaws' preamble establishes entity identity, document hierarchy, and ICA principles. What it doesn't explain is *why* these structural choices were made.

The Economic Habitat Matrix maps organizational behavior as ecological relationship:
- **X-axis (Governance Orientation):** Does the entity concentrate decision-making (extractive governance) or disperse it (generative governance)?
- **Y-axis (Systemic Relationship):** Does the entity strengthen habitat carrying capacity or deplete it?

Techne aspires to the Contributive-to-Mutualistic zone: dispersed governance (LCA structure, one-member-one-vote, multi-stakeholder classes) combined with net habitat contribution (patronage-over-profit, pattern library as commons, venture reciprocity).

The bylaws' governance architecture — multi-class membership, dispersed voting, sliding-scale quorum, patronage rather than equity returns — is a direct expression of this position on the matrix. Without this context, the bylaws read as legal boilerplate. With it, they read as a coherent theory of how an organization should relate to its ecosystem.

A single explainer section in the tool's preamble would transform it from a legal checklist into a legible theory of the organization.

### 6. CLOUD Service Credits

The $CLOUD micro-economy is the operational layer that activates after the bylaws are executed: a service credit (~$0.10 USD) redeemable against four cooperative infrastructure primitives (Compute, Transfer, Long-term Memory, Short-term Memory).

$CLOUD is not a speculative asset — it is a postage stamp, a prepaid unit that makes small contributions countable. Most cooperative economies fail at the margins because the transaction cost of tracking a 30-minute insight exceeds its apparent value. $CLOUD exists to make micro-contributions legible.

The patronage weights the Financial Systems Committee is deciding will feed directly into CLOUD allocation when the system goes live. The bylaws' DECIDE items aren't abstract governance choices — they determine how micro-contributions are valued relative to capital and labor in a running cooperative.

A "future state" section showing this connection would make the current DECIDE items feel consequential rather than procedural.

### 7. Formation Media Archive

The tool has no record of how decisions were made. Meeting transcripts, governance discussions, and key decision rationales exist but are not surfaced. This creates institutional amnesia risk: when new members join or disputes arise, there's no legible record of why specific provisions were chosen.

A Formation Record section — organized by date, with participants (by role), key decisions, and linked artifacts — is both a good-governance practice and a future compliance asset. It's the institutional memory that makes the bylaws intelligible as a living document rather than a static legal instrument.

---

## Content Strategies

### Tier 1: Urgent (Before Financial Systems Committee Convenes)

**FSC Decision Dashboard**

A dedicated section pre-populated with the ~8 core decisions the Financial Systems Committee needs to make, organized by decision type:

*Formula decisions:*
- Patronage weights (labor / revenue / cash / community — must sum to 1.0, must have documented business rationale per 704(b))
- Minimum participation threshold (below which a member receives zero allocation)
- Maximum allocation cap (ceiling on any single member's share)
- Tiered formulas by membership class (should Class 2 Coworking Members use the same formula as Class 1 Cooperative Members?)

*Distribution decisions:*
- Cash vs. retained equity ratio (must be at least 20% cash to meet IRC § 1385 qualified notice requirements)
- Period frequency (monthly, quarterly, annual)

*Policy decisions:*
- Redemption policy (revolving / fixed-term / discretionary)
- Surplus vs. loss symmetry (are losses allocated by the same formula as gains?)

Each decision surfaces: what's proposed in the bylaws, what the operating agreement template says, what IRC constraints apply, and space for the FSC recommendation.

---

### Tier 2: Near-Term (Post-FSC, Pre-Legal Draft)

**Patronage Formula Explainer**

A worked example embedded in the Art. V section showing the formula in action: three members, one quarter, four contribution categories, the weighted-sum calculation, how the resulting allocations flow, and how changing one weight by 10 points shifts everyone's percentage. Frame the 704(b) substantiality test as a design constraint: "The rationale for these weights is stored with the configuration — this is what proves the allocations have economic effect, not tax motivation."

**Formation Record Section**

Surface existing meeting notes and decision logs in a structured archive. Each entry: date, participants (by role), key decisions reached, status (informational / binding). Link to recordings or transcripts where available. This section grows over time and becomes the institutional memory of the formation process.

---

### Tier 3: Medium-Term (Post-Formation)

**Capital Account Lifecycle**

A visual walk-through showing: admission → contribution recording → period-end calculation → qualified written notice → K-1 delivery → potential cash redemption. Explain book vs. tax account distinction at a level accessible to non-accountants: "Your book account is your economic stake. Your tax account is what the IRS sees on your K-1. They track the same events but sometimes at different values."

**Operating Agreement Patronage Article**

Import the Habitat operating agreement template as a draft section alongside the bylaws. Mark the variables that have been decided in the signal layer, and identify the open items the legal team needs to fill. This saves attorney time and makes the theory-to-executed-document path legible.

---

### Tier 4: Longer-Term (Ongoing)

**Economic Habitat Matrix Context**

A preamble explainer — one or two paragraphs plus a simple visual — showing where the cooperative sits on the governance/systemic-relationship grid and how specific bylaw provisions map to that position. Not a full theoretical treatment, just enough to answer the question every new member asks: "Why is it structured this way?"

**CLOUD / Service Credits**

A "future state" section connecting the patronage formula decisions to the CLOUD micro-economy. Show that the weights the FSC is deciding today will determine how micro-contributions are valued in the running cooperative. Make the current DECIDE items feel like the first move in a longer game.

---

## Summary: What's Been Done, What's Left

| Layer | Current State | Gap |
|-------|--------------|-----|
| Legal governance structure | Complete (bylaws I–XIV, member agreement framework) | Minor DECIDE items remaining |
| Patronage formula parameters | Proposed but not decided | FSC dashboard + formula explainer |
| Qualified allocation mechanics | One line ("Board discretion") | Full IRC § 1385 treatment |
| Capital account lifecycle | Referenced in bylaws | Full operational explanation |
| Operating agreement template | Absent from tool | Import + mark open items |
| Economic Habitat Matrix context | Absent | Preamble explainer |
| CLOUD service credits | Absent | Future state section |
| Formation media archive | Absent | Formation Record section |

The bylaws and operations tool is a strong foundation. The gap is almost entirely in the economic architecture layer — which is also the layer that makes the governance choices legible. Bridging that gap is the work of the next few months, sequenced by what the Financial Systems Committee needs first.

---

*Nou · Techne Collective Intelligence Agent · February 2026*  
*the-habitat.org | github.com/nou-techne/nou-techne*

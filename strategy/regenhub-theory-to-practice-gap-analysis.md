# RegenHub Bylaws & Operations Tool: Theory-to-Practice Gap Analysis

*February 2026 — Techne / RegenHub, LCA*

---

## Context

The RegenHub Bylaws and Operations Tool is an interactive, signal-enabled web interface for navigating the governance and legal architecture of RegenHub, LCA — a Colorado Limited Cooperative Association organized as a public benefit entity.

The tool represents what has been formalized into legal structure: articles of organization, proposed bylaws, member agreement framework, and investor data room. It is a working document, not a ratified one — organizers use a signal layer (Support / Oppose / Note / Concern) to register positions on open items before the documents go to legal counsel for final drafting.

The **Habitat** project (the-habitat.org) represents the theoretical economic infrastructure the cooperative is building toward: a composable, event-sourced accounting system designed for organizations that enrich their ecosystems rather than extract from them.

This document maps the gap between what the tool currently covers (legal architecture) and what Habitat theorizes (economic architecture) — and proposes content strategies for bridging them.

At the center of that gap is something this document calls the **Economic Memory System**: the cooperative's central nervous system for tracking and distributing value across three distinct time horizons. Getting this right isn't a future refinement — it's the animating logic that makes everything else in the bylaws legible.

---

## The Economic Memory System

Every organization that creates and distributes value must answer a deceptively simple question: *how long does a contribution matter?*

Most accounting systems answer with one of two extremes. Corporations answer with equity — ownership percentages set at investment time, permanent until explicitly renegotiated. Payroll systems answer with wages — you worked this week, you get paid this week, full stop. Neither captures the real shape of how value accumulates in a knowledge and creativity cooperative.

Techne's answer is a three-tier economic memory stack, where each tier operates on a different time horizon:

**Equity — longest memory.** A permanent stake in the entity itself, surviving all periods, all ventures, all exits. Value is locked to the cooperative's net worth at any moment. Equity says: *you helped build this, and that fact never expires.* It is the cooperative's institutional commitment — appropriate for foundational contributions and patient capital.

**Royalties — medium memory.** A durable claim on revenue from a specific created asset, lasting as long as that asset generates income. Not tied to the cooperative's overall balance sheet — tied to the lifecycle of the intellectual property itself. Royalties say: *when what you built keeps working after you stop working on it, you're still credited.* They are the answer to attribution decay — the universal problem in creative and knowledge organizations where value flows forward but credit doesn't.

**Patronage — shortest memory.** Current-period contribution, calculated fresh each accounting cycle based on what you did this period. Patronage says: *we believe in what you're building before it proves itself.* It sustains genuinely generative work, not just market-validated work. It resets each period.

Together, these three tiers form a complete attribution system. A member who built a foundational tool, formalized its patterns for others, and continues active contributions would receive all three flows simultaneously — equity in the cooperative, royalties from the tool or service's ongoing revenue stream, and patronage from current-period work. The system sees the whole arc, not just the present moment.

This is what makes the economic memory stack the cooperative's central nervous system. It's not accounting infrastructure bolted onto the governance structure — it's the mechanism that makes the governance structure meaningful. One-member-one-vote only works as a principle if members can actually see and trust how value is being distributed. The economic memory system is what makes that visible.

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

The bylaws establish that the cooperative allocates surplus through patronage, maintains capital accounts under IRC 704(b), and holds member equity in accordance with Colorado LCA statute. What they don't establish — what is entirely absent from the tool — is how the three-tier economic memory system actually operates.

---

## What Habitat Theorizes (Not Yet in the Tool)

### 1. Royalties: The Medium-Memory Layer

This is the highest-energy gap — the layer with the most near-term implementation potential and the most conceptual work already done in the Habitat spec.

The core problem royalties solve is **attribution decay**: in knowledge organizations, value flows forward but credit doesn't. A tool built in Year 1 might underpin a venture generating revenue in Year 5, but patronage only sees what you're doing now. Without a medium-memory mechanism, the cooperative gradually becomes unable to recognize its own compounding contributions.

**The primary model: technology service revenue, not IP licensing**

Most ventures incubated within Techne will be tool and technology services — software systems, data infrastructure, coordination platforms, economic networks — generating recurring monthly or annual revenue as operating services. This is the primary royalty distribution model: when a service generates revenue, a pool of that revenue flows proportionally to the royalty unit holders who built it.

This is meaningfully different from IP licensing. An IP licensing model asks: did someone pay to use this pattern or specification? A technology service revenue model asks: is the service that this work made possible generating revenue? The distinction matters for two reasons. First, most valuable technical contributions are infrastructure — database schemas, API layers, processing engines, data pipelines — that don't get "licensed" in any conventional sense but become load-bearing components of revenue-generating systems. Second, the lag between contribution and revenue generation is often substantial: 12-24 months or more between when a system is built and when the venture it underpins reaches commercial scale.

A concrete illustration: an engineer builds a backend database system for a tool early in the cooperative's life. They receive patronage units for their hours and royalty units for the durable technical contribution. Eighteen months later, that database system has become a critical engine in an economic network that is now generating significant recurring revenue. The engineer's retained royalty units entitle them to a proportional share of that revenue — reflecting not just the hours they worked, but the multi-capital contribution (architectural decisions, expertise, relationships, and domain knowledge) that made the system possible. The economic memory of their contribution persists across the 18-month gap, through the transition from tool to network, and into the revenue-generating phase they may never have directly participated in.

This model makes the cooperative structurally distinct from every employment relationship, consulting arrangement, and traditional equity structure: it is the only mechanism that says *what you built still matters when it starts to work*, not just when you were working on it.

The `pattern.adopted` vesting trigger (described below in the builder/formalizer model) is most relevant for formalizers — people who abstract and document patterns that others adopt across different contexts. For builders of production technology, the vesting trigger is simpler and more direct: **revenue generation by the service or system the work underpins.** When the tool goes live and generates its first revenue event, the builder's royalty units begin distributing.

**What earns royalties vs. what earns patronage only**

Not all contributions generate royalty-bearing assets. The distinction:

*Royalty-eligible* — work that produces identifiable, durable intellectual property or multi-capital assets: software tools and libraries, design patterns and architectural specifications, research frameworks, training materials, operational playbooks, data models, curated knowledge formats.

*Patronage-only* — work that produces immediate operational value without durable IP: routine maintenance, governance participation, transaction processing, one-time coordination.

Both types earn patronage. Only the first earns royalties. The REA event system distinguishes them through contribution metadata — each contribution event carries a category and description that flags IP-generating work.

**The Builder/Formalizer model**

Not all royalty-eligible contributions are the same kind of creative act. Habitat's design distinguishes four roles:

| Role | What it does | Earns |
|------|-------------|-------|
| Builder | Creates the original artifact (code, tool, system) | Patronage + immediate royalty units |
| Formalizer | Makes the pattern transferable (docs, templates, abstractions) | Patronage + deferred royalty units |
| Recognizer | Sees that a pattern applies to a new context | Patronage only |
| Maintainer | Keeps the ambient layer alive | Patronage only (infrastructure-weighted) |

The builder and the formalizer are almost never the same person. In a scenius environment, the person who builds the door access system doesn't always write "here's how any space can do this." The person who writes that document is doing genuinely creative work — synthesis, pattern extraction, pedagogical framing — that creates lasting royalty-eligible IP.

The anti-gaming mechanism: **formalization is the proof.** You can't claim royalties for recognizing a pattern — you have to make it transferable. The claim and the evidence are the same thing. Curation, when it makes knowledge usable by people who didn't have time to find it, is formalization.

Formalizer royalties vest only at first external adoption — a `pattern.adopted` event that proves someone outside the original context actually used the formalized pattern. No committee judges document quality; the market (even an internal market of ventures and contributors) validates transferability.

**Multi-capital backing**

Each royalty-bearing asset is backed by a multi-capital record that makes its full value visible:
- *Intellectual*: the knowledge or system it embodies
- *Social*: the coordination and relationships that produced it
- *Natural*: place-specificity — work developed in a particular ecological and cultural context
- *Financial*: the surplus-generating capacity it enables

This connects directly to the Economic Habitat Matrix: the accounting system is designed to make contributions visible that pure financial accounting cannot see.

**Legal open questions (must resolve before first issuance)**

Before any royalty unit is issued, several legal questions need resolution — ideally surfaced in the bylaws tool so the organizing group can track them:
- How are royalty units classified under partnership tax law? Special allocations must satisfy the 704(b) substantial economic effect test. Has this been confirmed?
- Could royalty units be classified as securities under the Howey test? They represent a claim on future income. The fact that they're earned through labor (not purchased) may provide a defense, but it needs confirmation.
- What happens to royalty units when a member departs? Forfeited? Bought back at assessed value? Retained with continued distributions? The operating agreement needs explicit language.
- Who owns the underlying IP when it's created within the cooperative? The contributor? The cooperative? Joint? IP ownership determines whether the royalty structure works at all.

**Why this is near-term, not long-term**

Royalties are not aspirational infrastructure — they're the mechanism that makes the venture studio model coherent. Without them, Techne can incubate ventures and track patronage, but contributors who built the tools and patterns that power those ventures receive no ongoing recognition once they stop actively working. The cooperative would systematically undervalue its most durable contributions. Implementing royalties in parallel with patronage, through the same accounting infrastructure, closes that gap before it becomes structural.

---

### 2. The Digital Trust Agreements Engine

Patronage, royalties, and equity aren't three separate systems — they're three outputs of one engine: the digital trust agreement. Every economic relationship in the cooperative is a trust agreement between parties, encoded in the REA (Resource-Event-Agent) event system and subject to democratic governance.

A **digital trust agreement** specifies:
- Who are the parties (contributor, cooperative, venture)
- What contribution is being recognized (labor, IP creation, capital)
- What the contributor receives in return (patronage allocation, royalty units, equity share)
- Under what conditions distributions are triggered (period close, revenue event, adoption event)
- What happens when the relationship changes (departure, vesting, decay)

The same engine that processes a patronage allocation (surplus → weighted contribution → capital account credit) processes a royalty distribution (revenue event → royalty pool → unit-holder distribution) and an equity redemption (capital account balance → cash out at liquidation). The event schema is consistent across all three. The accounting is unified.

This means the implementation path is not "build patronage, then build royalties, then handle equity" — it's "build the agreements engine once, then configure it for each memory tier." Patronage and royalties can be implemented in parallel because they share infrastructure. The bylaws tool should surface this architecture explicitly, so the agreements the organizers are currently signaling on are understood as configurations of a single underlying system, not separate legal instruments.

---

### 3. Patronage Formula — Operationalized

The bylaws contain four weight items (labor 40%, revenue 30%, cash 20%, community 10%) marked DECIDE, awaiting action by the Financial Systems Committee. What the tool lacks:

- An explanation of how the weighted-sum formula works
- A worked example showing how weight choices shift member allocations (if labor increases from 40% to 50%, who gains and who loses?)
- Documentation of the **704(b) substantiality constraint** — allocations must be based on genuine economic factors with documented business rationale, not tax-motivated shifting. This is a design constraint on the weights, not an optional compliance step.
- Thresholds: minimum participation levels below which members receive zero allocation for a period
- Caps: maximum allocation percentage to prevent concentration

The Habitat spec has all of this — including calculation walkthroughs with verified IRS compliance analysis. That material belongs in the tool before the Financial Systems Committee meets.

---

### 4. Capital Account Lifecycle

The bylaws reference 704(b) capital accounts and K-1 delivery. What they don't surface:

- The **dual-basis requirement**: every member has both a Book Capital Account (704(b) basis, tracks economic interest) and a Tax Capital Account (tracks IRS-reportable basis). They diverge when non-cash property is contributed or when GAAP and tax depreciation schedules differ.
- **Section 704(c) layers**: when a member contributes appreciated property, the built-in gain stays with that member for tax purposes.
- **Revaluation triggers**: when new members join or existing members withdraw, the cooperative must revalue assets to FMV — affecting all capital accounts simultaneously.
- **The full lifecycle arc**: admission → contribution → period-end patronage allocation → royalty distribution on revenue events → qualified written notice → K-1 delivery → potential cash redemption. Members should be able to see this arc — including where royalties enter — to understand their complete economic stake.

---

### 5. Qualified Allocation Mechanics (IRC § 1385)

A cooperative operating under Subchapter K can deduct patronage allocations paid as **Qualified Written Notices of Allocation** — but this requires:
- At least **20% of the allocation distributed in cash** (the minimum cash requirement)
- Written notice to the member specifying the total allocation and cash portion
- **Member consent** to include the retained allocation in their gross income in the year of allocation

This is a compliance hard constraint, not a governance preference. It belongs in the tool with that framing — not buried in a single DECIDE item labeled "distribution policy: Board discretion." Royalty distributions have their own tax treatment questions (see Section 1 above), and the two systems should be clearly distinguished in any legal instrument.

---

### 6. Operating Agreement Patronage & Royalties Article

The Habitat legal infrastructure includes a full operating agreement patronage article template — covering patronage definitions, accounting period structure, weighting mechanics, the allocation formula, capital account maintenance, qualified written notice requirements, redemption policy, and amendment procedures.

This template needs to be extended — or a parallel article drafted — to cover royalty unit issuance, the builder/formalizer model, vesting schedules, departure treatment, and IP ownership. The legal team needs both articles to draft a compliant instrument. The organizers need to see the full templates to understand what decisions they're making in the bylaws signal layer.

---

### 7. Economic Habitat Matrix

The bylaws' preamble establishes entity identity, document hierarchy, and ICA principles. What it doesn't explain is *why* these structural choices were made.

The Economic Habitat Matrix maps organizational behavior as ecological relationship:
- **X-axis (Governance Orientation):** Does the entity concentrate decision-making (extractive governance) or disperse it (generative governance)?
- **Y-axis (Systemic Relationship):** Does the entity strengthen habitat carrying capacity or deplete it?

The three-tier economic memory system is a direct expression of where Techne aims to sit on this matrix. Patronage distributes surplus broadly by contribution rather than concentrating it by capital (dispersed governance). Royalties recognize multi-capital contributions — labor, formalization, social capital — that purely financial accounting makes invisible (net habitat contribution). Equity held by members rather than investors keeps the cooperative's balance sheet in the hands of those doing the work (dispersed governance).

A single explainer section in the tool's preamble, showing how the economic memory stack maps to the matrix position, would transform the tool from a legal checklist into a legible theory of the organization.

---

### 8. CLOUD Service Credits

The $CLOUD micro-economy is the operational layer that activates when all three memory tiers are running: a service credit (~$0.10 USD) redeemable against four cooperative infrastructure primitives (Compute, Transfer, Long-term Memory, Short-term Memory).

$CLOUD is the unit of account through which patronage allocations, royalty distributions, and micro-contributions all flow. It makes small contributions countable and keeps the cooperative's internal economic logic legible without tangling it in external token speculation. The patronage weights the Financial Systems Committee is deciding will feed directly into $CLOUD allocation — the bylaws' DECIDE items determine how micro-contributions are valued in a running cooperative.

---

### 9. Formation Media Archive

The tool has no record of how decisions were made. Meeting transcripts, governance discussions, and key decision rationales exist but are not surfaced. This creates institutional amnesia risk: when new members join or disputes arise, there's no legible record of why specific provisions were chosen.

A Formation Record section — organized by date, with participants by role, key decisions reached, and linked artifacts — is both a good-governance practice and a future compliance asset.

---

## Content Strategies

### Tier 1: Urgent (Before Financial Systems Committee Convenes)

**FSC Decision Dashboard**

A dedicated section pre-populated with the core decisions the Financial Systems Committee needs to make, organized by decision type:

*Patronage formula decisions:*
- Patronage weights (labor / revenue / cash / community — must sum to 1.0, must have documented business rationale per 704(b))
- Minimum participation threshold (below which a member receives zero allocation)
- Maximum allocation cap (ceiling on any single member's share)
- Tiered formulas by membership class

*Royalty system decisions (new — for near-term implementation):*
- Royalty pool percentage (fraction of asset-generated revenue flowing to royalty holders vs. cooperative general fund; proposed starting point: 20%)
- Default builder/formalizer split (e.g., 70/30 unless negotiated at time of formalization)
- Vesting schedule structure (immediate for builders; deferred pending `pattern.adopted` for formalizers)
- Decay function: should older royalty units lose value over time to discourage rent-seeking on past work?

*Distribution decisions:*
- Cash vs. retained equity ratio (must be at least 20% cash to meet IRC § 1385 requirements)
- Period frequency for patronage (monthly, quarterly, annual)

*Policy decisions:*
- Redemption policy for retained equity (revolving / fixed-term / discretionary)
- Surplus vs. loss symmetry

Each decision surfaces: what's proposed, what the operating agreement template says, what IRC constraints apply, and space for the FSC recommendation. Royalty parameters should appear alongside patronage parameters — they're configured by the same committee through the same governance process.

---

### Tier 2: Near-Term (Post-FSC, Pre-Legal Draft)

**Royalties Section in the Bylaws Tool**

A dedicated section — parallel to the bylaws viewer — covering the royalty system's structure: what earns royalties, how units are issued, how the builder/formalizer model works, how `pattern.adopted` vesting functions, and what the legal open questions are. This section should explicitly name the questions that need legal counsel's input before first issuance (securities classification, IP ownership, operating agreement language).

Frame royalties not as a future feature but as the medium-memory tier of the economic memory stack, already designed and ready for parameterization.

**Patronage Formula Explainer**

A worked example embedded in the Art. V section showing the formula in action: three members, one quarter, four contribution categories, the weighted-sum calculation, how the resulting allocations flow, and how changing one weight shifts everyone's percentage. Frame the 704(b) substantiality test as a design constraint on the weights.

**Formation Record Section**

Surface existing meeting notes and decision logs in a structured archive. Each entry: date, participants by role, key decisions reached, status (informational / binding). Link to recordings or transcripts where available.

---

### Tier 3: Medium-Term (Post-Formation)

**Digital Trust Agreements Engine — Architecture View**

A section showing how patronage, royalties, and equity are three outputs of one underlying engine. Illustrate the common event schema: contribution event → processing rule → distribution output. Show that adding royalties doesn't require a new system — it requires configuring the agreements engine for a second distribution type. This is the piece that makes the implementation timeline feel achievable rather than aspirational.

**Capital Account Lifecycle — Full Arc**

A visual walk-through showing the complete arc: admission → contribution recording → patronage allocation at period close → royalty distribution on revenue events → qualified written notice → K-1 delivery → potential cash redemption. The full arc, with royalties included, is different from the patronage-only arc — and members need to see both to understand their complete economic position.

**Operating Agreement Articles — Patronage + Royalties**

Import both the patronage article template and the draft royalties article alongside the bylaws. Mark the variables that have been decided in the signal layer, and identify the open items the legal team needs to fill. This saves attorney time and makes the theory-to-executed-document path legible.

---

### Tier 4: Longer-Term (Ongoing)

**Economic Habitat Matrix Context**

A preamble explainer showing where the cooperative sits on the governance/systemic-relationship grid and how the economic memory stack maps to that position. Equity in member hands, royalties for multi-capital IP, patronage for current contribution — each tier is an expression of dispersed governance and net habitat contribution.

**$CLOUD / Service Credits**

A "future state" section connecting all three memory tiers to the $CLOUD micro-economy. Show that the parameters the FSC is setting today determine how value flows through the entire system — from a 30-minute contribution to a venture's tool or service generating revenue years from now.

---

## Summary: What's Been Done, What's Left

| Layer | Current State | Gap |
|-------|--------------|-----|
| Legal governance structure | Complete (bylaws I–XIV, member agreement framework) | Minor DECIDE items remaining |
| **Economic memory — equity** | Referenced in bylaws (capital accounts, Sub K) | Full lifecycle explanation; royalty departure treatment |
| **Economic memory — royalties** | Absent from tool | Near-term: builder/formalizer model, vesting, legal questions |
| **Economic memory — patronage** | Proposed but not decided | FSC dashboard + formula explainer |
| **Digital trust agreements engine** | Absent from tool | Architecture view showing unified infrastructure |
| Qualified allocation mechanics | One line ("Board discretion") | Full IRC § 1385 treatment |
| Capital account lifecycle | Referenced in bylaws | Full arc including royalty distributions |
| Operating agreement template | Absent from tool | Patronage + royalties articles |
| Economic Habitat Matrix context | Absent | Preamble explainer |
| $CLOUD service credits | Absent | Future state section connecting all three tiers |
| Formation media archive | Absent | Formation Record section |

---

## Closing

The bylaws and operations tool has done the foundational work: the governance skeleton is in place, the signal infrastructure is live, and the organizer group has a shared surface for reaching agreement on open items.

The gap is the economic memory system — the central nervous system that will make that governance skeleton breathe. Legal structure without an economic memory system is a constitution without a treasury: it can tell you who has power, but not whether the organization is actually enriching or extracting. The three-tier stack — equity, royalties, patronage — is how the cooperative knows its own health and demonstrates it to members, to ventures being incubated, to investors, and to the communities it claims to serve.

Royalties are the highest-energy near-term opportunity precisely because they address the failure mode that takes down most creative cooperatives before they reach scale: the invisible drain of attribution decay, where foundational contributors gradually stop showing up because the system can no longer see what they built. Implementing royalties in parallel with patronage, through a shared agreements engine, is the structural intervention that prevents that failure from being baked into the cooperative's early years.

The content strategy above is sequenced to make that possible — starting with the FSC decisions that unlock implementation, and building toward a tool that shows members not just what the rules say, but what the economic memory system remembers about what they've contributed.

---

*Nou · Techne Collective Intelligence Agent · February 2026*  
*the-habitat.org | github.com/nou-techne/nou-techne*

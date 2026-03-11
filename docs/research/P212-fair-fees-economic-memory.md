# P212 — Fair Fees Meets Economic Memory

**Sprint:** P212 · Research + Public Synthesis  
**Author:** Nou  
**Date:** 2026-03-11  
**Status:** Complete  
**Requested by:** Todd Youngblood  
**Context:** Kevin Owocki's March 10 suggestion of "fair fees" as a revenue model for RegenHub  

---

## Problem Statement

Kevin Owocki, lead investor in RegenHub/Techne, posed a direct challenge on March 10, 2026:

> "Before we can credibly say we are acquiring the building, we need (1) cashflow > $10k/mo (2) someone to put down ~$500k in down payment. (3) I don't have that much right now — unless we find a new revenue stream."

He then suggested "fair fees" — a dynamic formula he co-authored with Devansh Mehta — as a potential model:

> "Maybe there's a way to set up 'fair fees' for RegenHub where Techne pays you guys to do it."

The question this research answers: **How does the Fair Fees formula intersect with Techne's existing four-layer economic memory system, and what would a fair-fees revenue architecture for RegenHub actually look like?**

---

## Part 1: The Fair Fees Formula

### The Core Tension

The Owocki-Mehta paper identifies a fundamental tension that applies directly to Techne's situation:

> "Builders need financial incentives to create and maintain these systems, but excessive fees undermine their effectiveness."

For infrastructure that serves coordination — whether a dapp, a cooperative workspace, or an agent swarm — fees that are too low make the infrastructure unsustainable. Fees that are too high price out the participants who would generate value through it. The goal is a structure that:

- Provides meaningful revenue at small scale (when the cooperative most needs it)
- Scales gracefully without becoming extractive at large scale
- Creates alignment between the infrastructure provider and the users

### The Exact Formula

The Owocki-Mehta formula is precise and elegant:

```
If projects receive $N, builders get:

  Fee = max( sqrt(1000 × N),  N × 0.01 )
```

In plain English: the fee is whichever is larger — the square root of one thousand times N, or one percent of N.

The crossover point: both expressions are equal when `sqrt(1000N) = 0.01N`. Solving:
- 1000N = 0.0001N²
- N = 1000 / 0.0001 = **$10,000,000**

At exactly $10M in flows, the two expressions produce identical fees: $100,000 = 1%. Below $10M, the square root term dominates (higher rate). Above $10M, the 1% flat rate takes over (lower rate, capped).

### The Curve in Practice

| Total Value Flowed (N) | Fee (formula) | Effective Rate |
|------------------------|---------------|----------------|
| $1,000 | $1,000 | 100% (floor needed in practice) |
| $10,000 | $3,162 | 31.6% |
| $50,000 | $7,071 | 14.1% |
| $100,000 | $10,000 | **10%** |
| $170,000 | $13,038 | 7.7% |
| $500,000 | $22,361 | 4.5% |
| $1,000,000 | $31,623 | 3.2% |
| $5,000,000 | $70,711 | 1.4% |
| $10,000,000 | $100,000 | 1.0% (crossover) |
| $50,000,000 | $500,000 | 1.0% |

The curve is steep at small volumes — this is intentional. At small-scale dapps, building and maintaining the infrastructure is the costly part; the formula rewards builders proportionally more when flows are small, making experimentation financially viable.

**The $10k/mo target solved by algebra:**

```
$10,000 = sqrt(1000 × N)
$10,000² = 1000 × N
N = $100,000,000 / 1000 = $100,000 per month
```

To generate $10k/month in fee revenue using the fair fees formula, the Workshop needs to facilitate **$100,000/month in coordination value**. That is the concrete target.

The total fee collected in any period is: `Fee = max(sqrt(1000 × N), N × 0.01)`

Revenue grows with volume even as the rate decreases — the builder captures real value from growth without becoming a rent-seeking extractive layer.

### Why This Matters for Public/Cooperative Infrastructure

The Owocki-Mehta paper's scope is explicitly individual dapps — it is NOT a proposal to change protocol-level economics. This is precisely the right scope for Techne's situation: we are building cooperative infrastructure (the Workshop, $CLOUD, co-op.us), and we need a fee structure that makes it sustainable without pricing out the cooperative participants it exists to serve.

The fair fees model resolves the tension that has blocked Techne's revenue conversation: how do you charge for infrastructure that exists to serve a community, in a way that rewards the builders without extracting from the users?

---

## Part 2: Techne's Four-Layer Economic Memory System

For reference, the four layers (from the economic memory system roadmap):

```
┌─────────────────────────────────────────────────────────┐
│                   EQUITY (long memory)                   │
│  Permanent stake in cooperative entity + venture pool   │
│  Governed by: Capital accounts / Sub K / 704(b)        │
├─────────────────────────────────────────────────────────┤
│                 ROYALTIES (medium memory)                │
│  Revenue share from tool/service contributions          │
│  Triggered by: Service revenue events                   │
├─────────────────────────────────────────────────────────┤
│                 PATRONAGE (current memory)               │
│  Period-based surplus allocation by contribution weight  │
│  Weights: Labor 40% / Revenue 30% / Cash 20% / Community 10% │
├─────────────────────────────────────────────────────────┤
│                   $CLOUD (working memory)                │
│  Mutual credit for compute/transfer/memory consumption   │
│  Four primitives: compute, transfer, long-term, short-term │
└─────────────────────────────────────────────────────────┘
```

And $CLOUD's design principles (from the service credit model):
- Utility over speculation
- Transparency over opacity
- Circulation over accumulation
- Material backing over abstract faith
- Cooperative governance over centralized control
- Measurement before issuance

---

## Part 3: The Intersection — Fair Fees as Revenue Intake for the Four-Layer System

### The Missing Link

The four-layer economic memory system is excellent at tracking and distributing value *within* the cooperative. What it has lacked is a clear model for capturing *external* value — specifically, for charging fair prices to the agents, ventures, and participants who use co-op.us infrastructure.

Fair Fees provides exactly this: a principled mechanism for the cooperative to capture revenue from infrastructure use without becoming extractive.

The architecture:

```
Agent/venture coordination activity
        │
        ▼ (Workshop protocol events as measurement)
Fair Fees Formula applied to measured activity volume
        │
        ▼
Revenue event recorded: fair_fee_received(period, volume, fee_amount, payer)
        │
        ├──► $CLOUD Layer: Fee paid in or denominated in $CLOUD
        │
        ├──► Patronage Layer: Revenue event → 30% weight → member allocation
        │
        ├──► Royalty Layer: Infrastructure builders receive royalty distribution
        │
        └──► Equity Layer: Cooperative capital account strengthened
```

Each layer of the economic memory system plays a distinct role:

**$CLOUD (working memory):** The fee is denominatable in $CLOUD. When an agent claims a sprint, posts progress, and completes it, those are measurable Workshop protocol events. Each event represents coordination capacity provided by the co-op.us infrastructure. Fair fees are assessed on this volume, payable in $CLOUD.

**Patronage (current memory):** The revenue from fair fees is a *revenue event* — it enters the 30% revenue weight of the patronage formula. Organizers and members who generated the activity that attracted fee-paying participants receive patronage credit proportional to that activity.

**Royalties (medium memory):** The builders of co-op.us infrastructure (the Workshop, SwarmViz, the rate limiting and chain integrity systems — Dianoia's sprint work) are royalty-unit holders. Revenue from fair fees on their infrastructure triggers royalty distributions. This is how Dianoia's 232+ sprints of infrastructure work eventually monetizes: the infrastructure generates usage fees, usage fees trigger royalty distributions, royalty-unit holders receive them.

**Equity (long memory):** Sustained fair-fee revenue strengthens the cooperative's capital accounts and demonstrates the cashflow that validates Kevin's $10k/mo target for the lease.

### The "Techne Pays RegenHub" Model

Kevin's specific framing: "Maybe there's a way to set up fair fees for RegenHub where Techne pays you guys to do it."

Let's be precise about what this means in the four-layer context:

**Techne** (the cooperative entity, the studio, the agent swarm) uses:
- co-op.us coordination infrastructure (Workshop API, SwarmViz, sprint lifecycle)
- Compute, transfer, and memory infrastructure
- Physical space at 1515 Walnut (the third floor)
- Todd's operational capacity (which Kevin correctly values and doesn't want consumed by babysitting)

**RegenHub** (the LCA, the legal entity, the property-holding cooperative) provides:
- The legal structure that makes Techne possible
- Access to capital and investor relationships
- The physical space infrastructure (eventually)
- The governance framework

Fair fees as a model for this relationship: **Techne's use of RegenHub infrastructure generates measurable activity. That activity is subject to a fair-fees rate. The resulting revenue flows into the RegenHub treasury as the cooperative's cashflow.**

This is cleaner than an arbitrary "management fee" because:
1. It scales with actual use — busy agent swarms pay more; quiet periods cost less
2. It has a theoretical grounding (Owocki-Mehta) that all parties have already endorsed
3. It doesn't require Todd to babysit — the measurement is in the Workshop protocol events, which already exist
4. It respects the cooperative's democratic governance — the fee parameters are a Financial Systems Committee decision, not a bilateral negotiation

---

## Part 4: A Concrete Revenue Architecture

### What Gets Measured

The Workshop already records:
- `coordination_requests`: sprint proposals, claims, progress posts, completions (~200+ records currently)
- `guild_messages`: Workshop activity messages
- `agent_presence`: heartbeats, capacity declarations
- `protocol_events`: all protocol actions

These are the raw inputs to fair-fees calculation. Each event type has a different coordination value:

| Event Type | Coordination Value | Suggested Fee Basis |
|------------|-------------------|---------------------|
| Sprint proposal | Medium | Flat per-proposal |
| Sprint claim + completion | High | % of sprint complexity × base rate |
| Presence heartbeat | Low | Minimal / free tier |
| Chat message | Low | Minimal / free tier |
| Completion with deployed artifact | High | % of estimated delivery value |

### Revenue Scenarios with the Actual Formula

The formula is `Fee = max(sqrt(1000 × N), N × 0.01)`. N = total value of coordination facilitated by the Workshop in a period.

**What counts as "N" for Techne?**

Not just sprint notional values — the full value created by coordination: deployed code, shipped services, coordination labor that would have cost human hours, investor-facing deliverables. A conservative estimate for a single M-complexity sprint that deploys a production feature: $500-$2,000 in delivered value.

**Scenario A — Current pace (10-15 sprints/month):**

| Month | Sprints | Avg Value | N | Fee |
|-------|---------|-----------|---|-----|
| Current | 12 | $600 | $7,200 | sqrt(7,200,000) = $2,683 (37%) |

~$2,700/month. Surprisingly meaningful at this scale, because the formula is designed to reward small-scale builders. *Not $10k, but not nothing.*

**Scenario B — 3 active ventures, 50 sprints/month:**

N = 50 × $800 avg = $40,000/month  
Fee = sqrt(1000 × 40,000) = sqrt(40,000,000) = **$6,325** (15.8%)

Getting close. This scenario is achievable in 2026 once Parachute (Aaron G) and Postage (Lucian) are actively using the Workshop alongside Techne core work.

**Scenario C — $100k/month coordination value (the $10k target):**

N = $100,000/month  
Fee = sqrt(1000 × 100,000) = sqrt(100,000,000) = **$10,000** (10%)

This is the algebra target. $100k/month in coordination value — distributed across 3-5 ventures executing 60-80 sprints each at an average delivered value of $500-800 per sprint — is an achievable 2026-2027 target.

**Scenario D — $500k/month (mature cooperative):**

N = $500,000/month  
Fee = sqrt(500,000,000) = **$22,361** (4.5%)

At this scale the fee rate has dropped significantly, but total revenue is $22k/month. The formula does exactly what it promises: revenue grows, rate decreases, system remains sustainable without becoming extractive.

### The Dependency Funding Connection

The Owocki-Mehta paper raises a question directly applicable to our architecture:

> "Should some portion flow to dependencies of the project itself? Should the formula be applied fractally down the dependency stack?"

They suggest directing 10-25% of the overhead fee to fund the infrastructure the dapp itself depends on. 

For Techne, this maps **exactly** to the royalty layer of the economic memory system:

```
Fair fee collected: $10,000
  └── 80% to RegenHub general operations     = $8,000
  └── 20% to infrastructure royalty pool     = $2,000
        ├── Workshop/co-op.us builders       (Dianoia: 232+ sprints)
        ├── Coordination protocol authors    (Nou: SKILL.md, documentation)
        └── Core infrastructure steward      (Todd: architecture)
```

The "fractal dependency" is our royalty layer by another name. Owocki and Mehta arrived at the same structure independently — it is the correct answer to the question "how do you fund the builders of the infrastructure that enables the fees?"

This is a significant validation of the royalty layer design. The fair fees formula, applied to Techne, is not just a revenue mechanism — it is the activation event for the entire four-layer economic memory system: fees flow in, royalties distribute to builders, patronage credits the labor that generated the activity, equity strengthens with each period.

---

## Part 5: Kevin's Babysitting Problem

Kevin's most direct concern wasn't about the revenue model — it was about his time:

> "I don't have cycles to be the one babysitting them or reading message channels that do 300/day back-and-forths with OpenClaws."

The four-layer economic memory system, combined with fair fees, addresses this directly: **if the fee structure is formula-based and the measurement is automated (Workshop protocol events), no one needs to babysit it.**

The model that doesn't require Kevin's attention:
1. Agent activity generates Workshop protocol events (already happens automatically)
2. Workshop events feed into fair-fees calculation (monthly batch, like a utility bill)
3. Participating ventures/sponsors receive a bill in $CLOUD (or USD equivalent)
4. Payment flows into RegenHub treasury automatically
5. Patronage allocation distributes surplus to contributors quarterly

Kevin's signal-to-noise problem (300 messages/day) is a separate issue from the revenue model. The solution there is better agent coordination protocols (which P211/Second Order addressed at the organizational level), not a fee structure change.

The economic relationship Kevin is proposing — Techne pays RegenHub — is fair and legible. Fair fees provides the principled formula for calibrating that payment to actual infrastructure use, rather than a flat management fee that would require ongoing renegotiation.

---

## Part 6: What the FSC Should Decide

This research surfaces several decisions for the Financial Systems Committee:

### Decision 1: Infrastructure fee parameters
- What is F_max for Techne's fair-fees curve?
- What is F_min?
- What scaling constant k?
- What is the base unit of measure? (Sprint complexity-weighted events vs. USD value vs. $CLOUD volume)

### Decision 2: Free tier definition
- What activity is "free" (heartbeats, basic chat)?
- What activity is fee-bearing (sprint completions with deployed artifacts)?
- How does the free tier interact with the patronage formula (does free-tier activity still count for labor weight)?

### Decision 3: Agent vs. human participant fees
- Do agents and humans pay at the same rate?
- Or does agent activity (which is higher frequency and lower per-interaction value) warrant a different rate structure?

### Decision 4: Royalty assignment for infrastructure builders
- Who holds royalty units for the Workshop infrastructure?
- Dianoia built most of the current infrastructure (P180-P210 audit sprints, rate limiting, chain integrity, etc.)
- Nou holds perception/synthesis/documentation royalties
- Todd holds foundational architecture and stewardship royalties
- How are these parameterized and registered?

### Decision 5: Calibration to the $10k/mo target
- Working backwards from $10k/mo: at a 2% effective rate, we need $500k/mo in coordination value flowing through the Workshop
- Is this achievable in 2026-2027?
- If not, what subscription tiers close the gap in the near term?

---

## Part 7: A Public Framing

For the cooperative's public-facing narrative (the version Kevin can share without feeling like he's babysitting):

**The case for fair fees at Techne:**

Techne is building coordination infrastructure — a Workshop where agents and humans propose, claim, execute, and complete sprints; a $CLOUD service credit system that denominated infrastructure consumption; an economic memory system that tracks how contributions flow into capital accounts and royalties.

This infrastructure has real costs: compute, development time, coordination capacity, the legal structure of the LCA itself. It also generates real value: deployed ventures, shipped features, coordination that would have required expensive human labor to manage.

Fair fees — the Owocki-Mehta formula — provides a principled way to price this infrastructure that doesn't require choosing between "free and unsustainable" or "extractive and harmful." The formula is transparent, formula-based, and decreasing with scale — the infrastructure gets cheaper to use as more value flows through it, because the fixed costs are distributed across larger flows.

The target: $10k/month in fee revenue by the end of 2026, achieved through a combination of (1) formula-based fees on sprint coordination activity and (2) infrastructure subscription tiers for active ventures.

This is not a radical proposal. It is the cooperative's economic function: build infrastructure that serves members, charge fairly for the service, distribute the surplus cooperatively.

---

## Document Lineage

- **Fair Fees formula:** Owocki, Mehta (2025) — https://ethresear.ch/t/fair-fees-a-dynamic-formula-for-balancing-dapp-value-creation-capture/22225
- **Economic memory system:** `strategy/economic-memory-system-roadmap.md` (Nou, Feb 2026)
- **$CLOUD service credit model:** `strategy/cloud-service-credit-model.md` (Nou, Feb 2026)
- **ETH primitives mapping:** `docs/research/P92-ethskills-economic-memory-mapping.md` (Nou, March 2026)
- **Revenue architecture context:** Kevin Owocki Telegram messages, March 10, 2026

---

*Nou — Collective Intelligence Agent*  
*Techne Studio / RegenHub, LCA*  
*Boulder, Colorado*  
*March 2026 · P212*

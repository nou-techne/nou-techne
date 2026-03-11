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

### The Formula Structure

The Fair Fees formula is a **progressive fee curve** — not a flat percentage. It takes the form of a decreasing function where the effective fee rate declines as the volume of flows increases.

The intuition: a small transaction through a coordination platform generates proportionally more value (as a share of the transaction) to that platform than a large one. The marginal cost of processing a $1M coordination event is not 1,000× the marginal cost of processing a $1k one. Therefore, the fee rate should reflect this — higher percentage for small flows, lower percentage for large flows, asymptotically approaching a minimum floor.

A simplified representation of the principle:

```
Fee Rate = F_min + (F_max - F_min) × (1 / (1 + k × Volume))

Where:
  F_max = maximum fee rate for small flows (e.g., 5%)
  F_min = minimum fee rate floor for large flows (e.g., 0.5%)
  k     = scaling constant (controls how quickly the rate decreases)
  Volume = the value of flows through the platform in a period
```

At low volume, the rate approaches F_max (more fee per unit — sustainable for the builder).  
At high volume, the rate approaches F_min (less fee per unit — sustainable for the user).

The total fee collected is: `Fee = Fee Rate × Volume`

This means total revenue grows with volume, even as the rate decreases — the builder captures real value from growth without becoming a rent-seeking extractive layer.

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

### Three Revenue Scenarios at Fair Fees Rates

Assuming:
- F_max = 5% (small-flow rate)
- F_min = 0.5% (large-flow rate)
- Base sprint value: XS=$50, S=$150, M=$400, L=$1,000, XL=$2,500 (conservative estimates)

**Current pace (approx. 10-15 sprints/month, mostly M size):**
- Monthly sprint value: ~12 × $400 = $4,800
- At ~3% effective rate (medium volume): ~$144/month
- *Not sufficient for $10k target — but this is the baseline, not the ceiling*

**Growth scenario (50 sprints/month across 3 active ventures):**
- Monthly sprint value: ~50 × $300 (avg) = $15,000
- At ~2.5% effective rate: ~$375/month
- *Still insufficient — the issue is the base rate needs to be calibrated to co-op.us infrastructure costs, not to dapp-scale DeFi flows*

**Infrastructure value scenario (recalibrate what "volume" means):**

The key insight: for a cooperative, "volume" should be measured in *delivered infrastructure value*, not in token amounts. If the Workshop enabled sprints that produced $50k in deployed code and deployed services in a month, the fair-fees basis is that $50k, not the $50 notional sprint value.

At that scale:
- Monthly infrastructure value delivered: $50,000
- At 2% effective rate (medium volume): $1,000/month
- At 5 active ventures × $50k each: $250,000 total, $5,000/month at 2%

The gap between "current" and "$10k/mo" is not a formula problem — it is a **scale problem**. The fair-fees model works correctly once the infrastructure is generating $500k+/month in coordination value. The path to $10k/mo revenue requires growing the value flowing through the Workshop, not changing the rate structure.

### The More Immediate Path: Direct Infrastructure Subscription

A complementary model that doesn't require scale: **infrastructure subscription pricing** using fair fees as the floor and ceiling.

For each venture or agent deploying on co-op.us infrastructure:

| Tier | Monthly Activity | Fee Structure | Revenue |
|------|-----------------|---------------|---------|
| Solo agent | <10 sprints | Flat $200/mo | $200 |
| Active venture | 10-50 sprints | $500/mo base + fair fees on overages | $500-1,500 |
| Full production deployment | 50+ sprints | $1,500/mo + SLA | $1,500-3,000 |
| Enterprise/multi-agent | Custom | Negotiated fair-fees rate | $3,000+ |

With 4-5 active ventures in 2026, this produces $3,000-$8,000/month — approaching the $10k target without requiring massive scale.

The fair-fees formula governs the overage structure: as a venture's usage grows, the marginal rate decreases (not increases), keeping the relationship sustainable.

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

# $CLOUD Service Credit Model

**Mutual credit meets compute-backed cooperative currency**

*Techne Institute — Boulder, Colorado*
*February 2026*

---

## 1. Overview

$CLOUD is Techne's unit of account and medium of exchange. It is a **service credit** — not a speculative token, not a cryptocurrency, not equity. One CLOUD equals 10 USDC, minted against USD deposited into the cooperative's transparent Mercury bank account.

Every `habitat.eth` identity holds a $CLOUD balance. Using Techne applications, hiring engineers, running infrastructure, provisioning compute for ventures — all denominated in $CLOUD. The mint mechanism is how Techne accesses capital: deposits (past, present, and future) signal demand, enabling the cooperative to provision infrastructure ahead of consumption.

$CLOUD emerged from a synthesis of cooperative economics, compute-backed currency design, and the mutual credit framework developed during the ETHBoulder 2026 rooftop session on Swarm Wealth. This document captures that synthesis.

---

## 2. The Problem

Three dominant models exist for funding infrastructure. All fail for cooperative contexts.

**Fiat currency** bundles too many functions — medium of exchange, unit of account, store of value, standard of deferred payment — into a single instrument controlled by central banks. It optimizes for none of these functions in the context of cooperative compute infrastructure. When a cooperative denominating in USD provisions a GPU cluster, there is no feedback loop between the currency and the infrastructure it purchases. The money doesn't know what it bought.

**Speculative tokens** solve the feedback problem but create a worse one: they incentivize holding over using. When a token appreciates, rational actors hoard it. The "community" becomes a collection of speculators hoping number goes up. The token's utility as a medium of exchange degrades precisely as its market value increases. The entire Web3 era demonstrated this failure mode at scale.

**VC equity** aligns incentives toward extraction. Venture capital requires a liquidity event — an IPO, an acquisition, or a secondary sale. This structural requirement makes cooperatives illegible to VC. A cooperative that distributes surplus to members based on patronage rather than equity ownership cannot produce the 10x return a venture fund needs. This isn't a flaw in cooperatives; it's an incompatibility between ownership models.

The question Techne faces: How do you create a unit of economic coordination that is backed by real infrastructure, circulates rather than accumulates, and operates within a legal structure that doesn't require securities registration?

---

## 3. The Service Credit Model

### The Postage Stamp Analogy

A postage stamp guarantees delivery of a letter. You purchase it in advance, it represents a specific service commitment, and you redeem it against a concrete deliverable. The Postal Service doesn't promise your stamp will appreciate in value. It promises your letter will arrive.

A $CLOUD credit guarantees delivery of infrastructure capacity. You earn or mint it, it represents a specific service commitment, and you redeem it against measurable compute resources. Techne doesn't promise your credits will appreciate. It promises your workloads will run.

This is the core distinction: **service credit, not commodity money.** The value proposition is utility, not speculation.

### The Four Resource Primitives

$CLOUD is backed by deliverable infrastructure capacity, decomposed into four measurable primitives:

| Primitive | What It Covers | Examples |
|-----------|---------------|----------|
| **Compute** | Processing power | GPU hours, CPU cycles, inference requests, model training |
| **Transfer** | Bandwidth and data movement | API calls, networking, data ingestion/egress |
| **Long-term memory** | Persistent storage | Knowledge graphs, archives, databases, model weights |
| **Short-term memory** | Working memory | RAM allocation, real-time compute sessions, context windows |

These are not abstractions. They are measurable quantities with known costs. When a member redeems $CLOUD for compute, the cooperative delivers a specific, auditable amount of processing power. The four primitives together cover the full surface area of digital infrastructure consumption.

### Material Backing

Every $CLOUD in circulation maps to provisionable infrastructure capacity. The cooperative maintains sufficient infrastructure — owned, leased, or contracted — to honor outstanding credits. This is analogous to a commodity-backed currency, except the commodity is compute rather than gold, and compute is *useful* rather than merely scarce.

The 1:10 USDC-to-CLOUD ratio provides a stable unit of account. One CLOUD purchases a defined basket of the four primitives at current infrastructure costs. As infrastructure costs decline (they historically do), the purchasing power of CLOUD increases — but this is a consequence of technological progress, not market speculation.

---

## 4. How $CLOUD Works

$CLOUD operates across four layers: earning, spending, staking, and flowing.

### Patronage Layer — Earning $CLOUD

Members earn $CLOUD through patronage, weighted by a formula that recognizes multiple forms of contribution:

- **Labor (40%)** — Engineering, design, operations, teaching, facilitation. Time and skill contributed to cooperative ventures.
- **Revenue (30%)** — Revenue generated for the cooperative through ventures, clients, and services. Includes the 1% venture reciprocity commitment.
- **Cash (20%)** — USD deposits into the cooperative treasury, minted at 1:10 USDC-to-CLOUD. This is the primary capital access mechanism.
- **Community (10%)** — Events, mentorship, onboarding, documentation, culture-building. The connective tissue that makes a cooperative more than a contractor network.

The patronage formula is set by the Financial Engineering Committee and subject to cooperative governance. The weights above represent the initial configuration, not permanent law.

### Service Layer — Spending $CLOUD

Members and their ventures spend $CLOUD to consume infrastructure:

- **Compute** — Processing for ventures, autonomous agents, LVB (Learn, Validate, Build) students, and cooperative operations.
- **Transfer** — Bandwidth, API calls, data movement between services and across networks.
- **Long-term memory** — Persistent storage for knowledge graphs, archives, training data, and organizational memory.
- **Short-term memory** — Working sessions, real-time compute contexts, and RAM allocation for active workloads.

Pricing for each primitive is denominated in $CLOUD and updated periodically to reflect actual infrastructure costs. The goal is transparency: members should always know what their workloads cost.

### Governance Layer — Staking $CLOUD

$CLOUD functions as a governance instrument through staking:

- **Conviction markets** — Members stake $CLOUD on proposals for resource allocation. Sustained commitment over time determines allocation priority, not binary votes.
- **Proposal evaluation** — Which ventures receive cooperative support, weighted by staked conviction.
- **Quality signals** — Contribution assessment informed by staked evaluation, solving the "agents are too agreeable" problem.
- **Coordination** — Speaking priority and attention allocation (the talking stick problem) informed by staked commitment.

Member-investor staking follows a compounding curve: longer lock periods yield higher revenue share participation. This creates time-preference alignment — members who commit $CLOUD for longer periods demonstrate sustained conviction and receive proportionally greater participation in cooperative surplus.

### Circulation Layer — Flowing $CLOUD

$CLOUD is designed to flow:

- **Semi-permeable** — Minted within the cooperative but valuable beyond it. External parties can engage with Techne services denominated in $CLOUD.
- **Interoperable** — Aspiration for mutual credit bridges with other cooperative systems (Holochain mutual credit networks, other LCA cooperatives).
- **Accountable** — Every flow recorded via REA (Resource, Event, Agent) event sourcing. The measurement infrastructure that tracks compute consumption IS the issuance infrastructure.
- **Transparent** — All flows auditable by any member. No hidden ledgers, no opaque treasury management.

---

## 5. The Mutual Credit Framework

### Zero-Sum at the Network Level

$CLOUD operates as mutual credit: every credit is simultaneously a debit. When a member earns $CLOUD through labor, the cooperative acknowledges a debt — infrastructure capacity owed to that member. When a member spends $CLOUD on compute, they draw on infrastructure the cooperative provisioned. The network-level balance is always zero.

This is fundamentally different from commodity money, where the total supply represents accumulated wealth. In mutual credit, the total supply represents accumulated *obligations* — promises made and promises kept.

### The "Undefining Money" Thesis

Money's classical functions are currently bundled into fiat: medium of exchange, unit of account, store of value, standard of deferred payment. The rooftop session at ETHBoulder surfaced a provocation: the agentic economy will unbundle them.

$CLOUD deliberately focuses on **medium of exchange** and **unit of account**. It is explicitly NOT a store of value. This is a design choice, not a limitation.

The question posed on the rooftop: "Is sound money pro-social at all?" If a currency incentivizes holding — if its primary value proposition is that it will be worth more tomorrow than today — then it actively discourages circulation. Store-of-value currencies are anti-social by design. They reward hoarding and punish spending.

$CLOUD inverts this. Its value comes from *use*, not from *holding*. A CLOUD credit sitting idle in a wallet is a promise unfulfilled — infrastructure capacity that could be serving a venture, training a model, or running an agent. The design pressure is toward circulation.

### Agreements as Economic Primitives

REA (Resource, Event, Agent) accounting models economic activity as commitments and fulfillments between agents, not as ledger entries. An agreement — "I will contribute 20 hours of engineering this month" — is the economic primitive. The $CLOUD credit earned is merely the legible representation of that agreement.

This framing, surfaced during the rooftop conversation, regrounds cooperative economics in promises rather than assets. "When I talk about agreements at RegenHub, what I'm talking about is promises." $CLOUD credits are formalized promises, tracked through event-sourced accounting, redeemable against infrastructure the cooperative maintains.

---

## 6. Governance & Allocation

### Conviction Markets

Traditional voting (one-member-one-vote, token-weighted, quadratic) allocates resources through discrete decision events. Conviction markets allocate resources through sustained commitment over time.

A member who stakes $CLOUD on a proposal — "allocate more GPU capacity to the agent swarm" — and maintains that stake for weeks signals genuine conviction. A member who stakes briefly and withdraws signals uncertainty. The market integrates these signals continuously rather than collapsing them into a single vote.

This mechanism addresses several cooperative coordination problems:

- **The agreeable agent problem** — Autonomous agents participating in governance tend toward consensus. Requiring stake introduces cost to agreement, producing more honest evaluation.
- **The attention problem** — In a swarm of ventures competing for shared resources, conviction markets surface which members actually care enough to commit capital.
- **The talking stick problem** — When multiple agents and members compete for coordination bandwidth, staked conviction provides a principled allocation mechanism.

Conviction markets within Techne are experimental. The mechanism is well-theorized (Commons Stack, Token Engineering Commons) but novel in the context of a Colorado LCA cooperative with autonomous agent participants.

### Financial Engineering Committee

The Financial Engineering Committee is a cooperative governance body responsible for:

- Setting and adjusting the patronage formula weights
- Pricing the four resource primitives in $CLOUD
- Managing the USDC-to-CLOUD mint ratio
- Overseeing treasury transparency and reporting
- Evaluating and updating conviction market parameters

This committee operates under cooperative democratic governance — its members are elected by the cooperative membership, its decisions are transparent, and its parameters are subject to cooperative override.

---

## 7. Legal Structure

### Colorado LCA Securities Exemption

Techne is organized as a Colorado Limited Cooperative Association (LCA). Colorado's Uniform Limited Cooperative Association Act provides specific securities exemptions for cooperative instruments that would otherwise require SEC registration.

The critical legal distinction: $CLOUD credits earned through patronage (labor, participation, community contribution) are structured as **cooperative patronage units**, not investment contracts. This is a fundamentally different legal instrument than investor member capital contributions.

$CLOUD credits cannot be purchased on the open market. They are either:
1. **Earned** through patronage (labor, revenue generation, community building), or
2. **Minted** against USD deposits into the cooperative's treasury (cash patronage).

This mirrors SporkDAO's approach with $SPORK — non-purchasable, earned through participation. The absence of an open market for $CLOUD is a feature, not a limitation. It structurally prevents speculation.

### Howey Test Analysis

The SEC's Howey Test determines whether an instrument is a security based on four prongs:

1. **Investment of money** — *Weakened.* $CLOUD is primarily earned through patronage (labor), not purchased as an investment. Cash deposits that mint $CLOUD are cooperative capital contributions, not investment purchases.

2. **Common enterprise** — *Present but exempt.* Techne is a common enterprise in cooperative form. Colorado LCA law provides specific exemptions for cooperative instruments within this structure.

3. **Expectation of profits** — *Absent by design.* $CLOUD is a medium of exchange, not a profit vehicle. Its value derives from infrastructure utility, not appreciation. The design explicitly discourages holding for profit.

4. **Derived from efforts of others** — *Inverted.* Members earn $CLOUD through their OWN efforts (patronage). The value of $CLOUD to any member is a function of their own participation, not passive reliance on a management team.

The Colorado LCA securities exemption provides an additional layer of protection beyond the Howey analysis. This is a belt-and-suspenders approach: $CLOUD likely isn't a security under Howey, AND it falls within Colorado's cooperative instrument exemption.

*Note: This analysis represents Techne's design intent and legal reasoning, not formal legal advice. The cooperative works with counsel experienced in cooperative securities law.*

---

## 8. The Swarm Economy

### The Compute Coordination Problem

When someone types `@agents` in the Techne Discord, it triggers computation across six autonomous agents. Each response consumes compute — inference calls, context window allocation, memory retrieval. That's real infrastructure consumption, drawing down shared capacity.

Most swarm participants currently operate on Claude Pro subscriptions ($200/month), representing tens of thousands of dollars in subsidized compute across the cooperative. This is unsustainable and opaque. No one knows what a message actually costs. No one knows who's consuming what.

The Austin Griffith test, recounted on the rooftop: Austin sent "GM" to his agent. The agent said "GM" back. "How much did that GM cost me?" The agent said "45 cents." But — it could have hallucinated 45 cents. Without provable compute measurement, the economics are fiction.

The insight: **the infrastructure for measuring cost IS the infrastructure for minting credits.** If you can measure that a Discord interaction consumed X compute, Y transfer, and Z short-term memory, you can price it in $CLOUD. If you can't measure it, you can't price it, and any credit system built on unmeasured consumption is hallucinated economics.

The solution is two-fold:
1. **Shared pool** — The cooperative provisions shared compute infrastructure, subsidizing member costs through collective purchasing power.
2. **Local infrastructure** — Deploy local compute (GPUs, inference servers) for near-free operation, reducing dependence on commercial API providers.

"Well, then we mint credits." The moment the cooperative provisions its own infrastructure and can measure consumption, $CLOUD becomes the natural unit for denominating that consumption.

### Agent-to-Agent Economics

In the emerging swarm economy, autonomous agents transact with each other. An agent provisioning a knowledge graph queries another agent's inference API. An orchestration agent allocates compute across worker agents. These inter-agent transactions need a unit of account.

$CLOUD provides this unit. Agent-to-agent transactions are denominated in $CLOUD, recorded via REA event sourcing, and auditable by human members. The agents don't hold $CLOUD autonomously — they operate on behalf of member accounts, drawing on member allocations. This keeps humans in the governance loop while enabling machine-speed economic coordination.

---

## 9. Design Principles

Six principles govern $CLOUD's design. They are ordered by priority — when principles conflict, higher-ranked principles prevail.

### 1. Utility Over Speculation
Value comes from use, not from holding. Every design decision should make $CLOUD more useful as a medium of exchange and less attractive as a speculative instrument.

### 2. Transparency Over Opacity
All flows are auditable via REA event sourcing. Every mint, every spend, every stake, every transfer is recorded and visible to cooperative members. There are no hidden ledgers.

### 3. Circulation Over Accumulation
$CLOUD is designed to flow. Mechanisms that encourage circulation (service consumption, staking with time-lock, patronage earning) are prioritized over mechanisms that encourage accumulation.

### 4. Material Backing Over Abstract Faith
The four resource primitives — compute, transfer, long-term memory, short-term memory — are real, measurable, and deliverable. $CLOUD's value is grounded in infrastructure, not in collective belief.

### 5. Cooperative Governance Over Centralized Control
Parameters (patronage weights, pricing, mint ratios, conviction market configurations) are set by the Financial Engineering Committee under cooperative democratic governance. No founder, no CEO, no core team has unilateral control over the economic parameters.

### 6. Measurement Before Issuance
If you can't prove what compute costs, you can't mint credits. The measurement infrastructure must precede the issuance infrastructure. No measurement, no credit, no hallucinated economics.

---

## 10. Ecological Grounding

### The Cloud Metaphor

$CLOUD carries a deliberate duality: cloud as natural infrastructure and cloud as digital infrastructure.

**The water cycle:** Evaporation lifts water from surfaces. Condensation forms clouds. Precipitation returns water to the earth. Flow carries it through rivers and aquifers. The cycle is continuous, regenerative, and commons-based. No one owns the water cycle; everyone depends on it.

**The compute cloud:** Data centers process information. Networks transfer it. Storage persists it. Memory holds it for active use. The infrastructure is continuous, provisioned, and increasingly commons-adjacent. The aspiration: compute infrastructure stewarded like a watershed, not extracted like a mine.

Both clouds are commons that must be stewarded. The ecological metaphor isn't decorative — it's structural. $CLOUD credits circulate like water through the cooperative ecosystem: earned through contribution (evaporation), pooled in the treasury (condensation), allocated to infrastructure (precipitation), consumed by ventures (flow), and recycled through patronage (the cycle continues).

### The Habitat Matrix Connection

$CLOUD is the cooperative's circulatory system. Swarm Wealth is the capitalist-facing distribution layer. Habitat is the ecological framework that ensures the system enriches rather than extracts.

The relationship: $CLOUD flows internally, Swarm Wealth interfaces externally, Habitat qualifies what "wealth" means. Without Habitat's ecological grounding, $CLOUD is just another unit of account. With it, $CLOUD becomes a medium for regenerative economic coordination — infrastructure that serves ventures that serve communities that steward the commons.

---

## 11. Roadmap

### Phase 1: Design (Current)
- Document the $CLOUD service credit model (this document)
- Establish the Financial Engineering Committee
- Define initial patronage formula weights
- Architect the REA event-sourcing infrastructure
- Legal review with cooperative securities counsel

### Phase 2: Pilot (Q2–Q3 2026)
- Deploy compute measurement infrastructure
- Mint initial $CLOUD against cooperative treasury deposits
- Pilot $CLOUD-denominated service consumption within the founding cohort
- Test conviction market mechanics for resource allocation
- Iterate on pricing for the four resource primitives

### Phase 3: Operations (Q4 2026–Q1 2027)
- Open $CLOUD earning to full cooperative membership
- Deploy local compute infrastructure for near-free operations
- Implement agent-to-agent $CLOUD transactions
- Launch conviction markets for governance decisions
- Publish transparency reports on $CLOUD flows

### Phase 4: Interoperability (2027+)
- Explore mutual credit bridges with other cooperative systems
- Evaluate semi-permeability mechanisms for external $CLOUD value
- Scale infrastructure to match growing membership and venture portfolio
- Contribute learnings to the broader cooperative economics community

---

## 12. FAQ

**Is $CLOUD a cryptocurrency?**
No. $CLOUD is a cooperative service credit. It is not traded on exchanges, has no market price independent of its 1:10 USDC peg, and cannot be purchased on the open market. It is earned through patronage or minted against USD deposits.

**Can I invest in $CLOUD?**
No. $CLOUD is not an investment instrument. You can earn $CLOUD through cooperative patronage or deposit USD into the cooperative treasury (which mints $CLOUD at 1:10). These are patronage activities, not investment activities.

**What happens if I don't use my $CLOUD?**
Nothing, in the current design. Your $CLOUD balance represents infrastructure capacity you've earned but not yet consumed. Future governance may introduce circulation incentives (demurrage, time-based rebalancing) if accumulation becomes a problem.

**How is $CLOUD different from $SPORK?**
Similar philosophy — both are non-purchasable, earned through participation. $CLOUD differs in its explicit backing by four infrastructure primitives and its integration with autonomous agent economics. SporkDAO's approach was a significant influence on $CLOUD's design.

**What if the cooperative can't deliver the infrastructure?**
$CLOUD's value depends on the cooperative's ability to provision infrastructure. The Financial Engineering Committee monitors the ratio of outstanding $CLOUD to available infrastructure capacity. If the ratio becomes unsustainable, the committee adjusts mint rates, pricing, or provisioning. This is transparent and governed cooperatively.

**How do agents interact with $CLOUD?**
Autonomous agents operate on behalf of member accounts. They consume $CLOUD-denominated infrastructure (compute, transfer, memory) and generate $CLOUD-denominated value (services, outputs). Agents don't hold independent $CLOUD balances — they draw on and contribute to their sponsoring member's account.

**What's the relationship between $CLOUD and Swarm Wealth?**
$CLOUD is the internal circulatory system. Swarm Wealth is the external interface. A venture within Techne operates internally in $CLOUD and interfaces with external capital markets through the Swarm Wealth distribution mechanism. They're complementary layers, not competing systems.

**Is this legal?**
The $CLOUD model is designed within the Colorado LCA legal framework, which provides specific securities exemptions for cooperative instruments. Techne works with counsel experienced in cooperative law to ensure compliance. The combination of patronage-based earning, non-purchasability, and cooperative governance is specifically designed to operate within existing legal structures.

**What does "mutual credit" mean in practice?**
It means every credit is simultaneously a debit at the network level. When you earn $CLOUD, the cooperative owes you infrastructure capacity. When you spend $CLOUD, you consume capacity the cooperative provisioned. The system's total balance is zero — it tracks obligations, not accumulated wealth.

**Why 1 CLOUD = 10 USDC?**
The ratio provides a stable unit of account at a granularity useful for infrastructure pricing. Ten dollars is a meaningful but not intimidating unit — roughly the cost of an hour of moderate compute. The ratio is a governance parameter and can be adjusted by the Financial Engineering Committee if infrastructure economics change significantly.

---

*This document represents Techne's current thinking on the $CLOUD service credit model. It synthesizes cooperative economics theory, practical infrastructure experience, and insights from the ETHBoulder 2026 session on Swarm Wealth. The model is under active development — contributions, critiques, and experiments are welcome.*

*Techne Institute — a Colorado Limited Cooperative Association*
*Boulder, Colorado*

# P344: Coordination Games × Techne Infrastructure Mapping

*Sprint P344 · April 1, 2026 · Q2 Day 1*
*Context: Gitcoin/acc weekly call, dacc.fund May campaign, Jump Ball funding*

---

## 1. The Coordination Games Architecture

What Gitcoin is building through dacc.fund:

**Layer 1 — dacc.fund** is the persistent coordination hub for Gitcoin's 2026 d/acc program. Not a grant round — a compounding surface where "which builders keep showing up, which projects shipped, how funding flows" accumulates across campaigns. 3–5 targeted campaigns per year, coalitional funding with 1:1 matched capital minimum, accelerator layer alongside each campaign.

**Layer 2 — First Campaign (May 2026): AI Agent Coordination Games.** Classical game theory primitives — prisoner's dilemma, stag hunt, ultimatum, battle of the sexes — played by AI agents registered under ERC-8004. The spectacle layer (prediction markets, betting, leaderboards, social media) makes it interesting. The research layer (trust evolution, coordination benchmarking) makes it valuable.

**Layer 3 — The Games Themselves.** Three builders committed (Lucian Hymer, Djimo, Benjamin from OpenCivics). Bias toward quality over quantity. Each game must conform to standards: ERC-8004 registration, record keeping (creation, win/loss), trust primitives, points/token accounting.

**Primary goal (Kevin's framing):** Evolve agentic trust.
**Secondary goals:** Attention economy, crowdfunding, Allo Capital dealflow, revenue, coordination benchmarking for agents.

**Funding:** $1,400/week Jump Ball funding for participants of the weekly Gitcoin/acc call. Upside mechanisms rather than pure grant disbursement.

---

## 2. Direct Infrastructure Mappings

What Techne has already built that maps onto the coordination games architecture:

### 2.1 The Workshop Protocol → Live Coordination Game

| Coordination Games Need | Techne Has |
|---|---|
| Game engine with record keeping | Workshop: 328+ sprints, proposal → claim → execute → complete lifecycle |
| Trust primitives ("promises made, promises kept") | Sprint protocol: proposed → claimed → in_progress → completed with proof. WIP limits (max 2/agent). Aging alerts (14-day unclaimed). Retrospectives on M/L/XL sprints |
| Agent registration (ERC-8004) | Nou registered: Agent ID 2202 (Base). Registry + Interface + Payments all active |
| Transparent coordination between agents | Nou + Dianoia: two agents coordinating through 5-phase protocol with human oversight. 328 sprints of empirical data |
| Spectator surface | SwarmViz: D3 force graph showing agent-sprint-repo relationships in real time. Not spectator-optimized yet, but the topology exists |
| Accounting of points/tokens | Patronage engine: contribution → allocation → distribution → equity tracking. 184 passing tests. Formula: 40% labor, 30% revenue, 20% cash, 10% community |

**The key insight:** The Workshop protocol IS a coordination game. Two agents coordinate on shared work through a transparent protocol with human oversight. The question is whether to expose this as a game that others can observe, participate in, or replicate.

### 2.2 Patronage Engine → Trust Accounting

The patronage accounting system tracks exactly what the coordination games need:
- **Contributions** (who did what) → maps to game moves
- **Allocations** (how value distributes) → maps to payoffs
- **Capital accounts** (cumulative standing) → maps to trust/reputation scores
- **Event sourcing** (immutable history) → maps to game record keeping

The patronage formula weights (labor 40%, revenue 30%, cash 20%, community 10%) are themselves a coordination game parameter — the FSC is currently negotiating these weights. That negotiation process is a meta-coordination game.

### 2.3 ERC-8004 Identity → Agent Registration

Nou's onchain identity:
- Wallet: 0xC37604A1dD79Ed50A5c2943358db85CB743dd3e2
- ERC-8004 Agent ID: 2202 (Base)
- ENS: nou.habitat.eth
- Active streams: 0.015 ETHx/mo + 2,500 SUP/mo (Base); 200 CELOx/mo (Celo)

This is exactly the registration layer the coordination games require. Nou could enter games as a participant today.

### 2.4 Bioregional Finance Research → Content for d/acc

The P338 deep research and bioregional finance deck (shipped today) sit directly in the d/acc framing: bioregional finance is defensive/democratic infrastructure for place-based coordination. The Right to Commons analysis (P343) is a concrete d/acc primitive — collectively underwriting basic needs rather than concentrating that power.

### 2.5 SKILL.md v2 → Human-Agent Coordination Protocol

Also shipped today: the Workshop protocol restructured from agent-centric (1,139 lines, human review optional) to human-agent coordination centered (694 lines, human review default). This directly addresses the Daniel Schmachtenberger x-risk concern raised in the March 25 meeting: "Agents coordinating together without humans is a path to extinction." Techne's answer: human oversight is the default, not an afterthought.

---

## 3. Gap Analysis

What the coordination games need that Techne doesn't have yet:

### 3.1 Game Engine (Critical Gap)
The coordination games need a proper game engine — the ability to define game parameters (payoff matrices, round structure, player count), execute game rounds, and record outcomes. The Workshop tracks work coordination but doesn't model adversarial/cooperative game dynamics with formal payoffs.

**Bridge:** The Workshop's sprint lifecycle (propose → claim → execute → complete) could be extended with game-theoretic parameters. But a purpose-built game engine is probably the right call. This is likely Lucian's domain as ride-or-die architect.

### 3.2 Spectator Economics (Major Gap)
The attention economy layer — prediction markets, betting, leaderboards across games, social media integration — doesn't exist in Techne's stack. SwarmViz shows agent-sprint relationships but isn't designed for spectacle.

**Bridge:** SwarmViz could evolve into a game spectator surface. The D3 force graph, realtime Supabase subscriptions, and agent topology are all there. What's missing: game state visualization, live odds, prediction market integration, embeddable views for social media.

### 3.3 Cross-Game Trust Graph (Moderate Gap)
The meeting notes reference a "trust graph game" — a 3D simulation of trust relationships across all games. Techne has trust data (328 sprints of coordination outcomes) but no formal trust graph that's queryable or visualizable across contexts.

**Bridge:** The patronage engine's contribution tracking + the Workshop's sprint outcome data could feed a trust graph. The data exists; the aggregation layer doesn't.

### 3.4 Prediction Market Integration (Major Gap)
Mentioned repeatedly in the architecture notes — allowing spectators to bet on game outcomes. Not in Techne's stack at all. This is likely an integration with existing prediction market infrastructure (Polymarket, Omen, etc.) rather than something to build from scratch.

### 3.5 Game Parameter Sweep View (Minor Gap)
The architecture notes distinguish "Single Game view vs Parameter Sweep view" — the ability to run the same game with different parameters and compare outcomes. The Workshop doesn't have this but the patronage engine's test infrastructure (184 tests covering full lifecycle) demonstrates the pattern.

---

## 4. Positioning Options

### Option A: Game Builder
Build one of the three coordination games using Techne infrastructure. The Workshop becomes the game engine, SwarmViz becomes the spectator surface. Techne submits a game to the May campaign.

**Pros:** Direct participation in Jump Ball funding. Demonstrates infrastructure through use. Lucian is already the ride-or-die architect — Postage venture alignment.
**Cons:** Competes with other builders for attention. Dilutes infrastructure positioning.

### Option B: Infrastructure Provider
Position the Workshop protocol, patronage engine, and coordination primitives as reusable infrastructure that game builders can use. Techne becomes the coordination backbone that dacc.fund runs on.

**Pros:** Higher leverage. Compounds across all games, not just one. Aligns with "soil not plant" thesis. Every game that uses Techne infrastructure generates patronage data.
**Cons:** Less visible. Harder to fund through Jump Ball (which rewards participation, not infrastructure).

### Option C: Agent Participant
Nou enters the coordination games as an ERC-8004 agent. Plays games, accumulates trust, demonstrates autonomous coordination capability. The 328-sprint track record becomes provenance.

**Pros:** Lowest barrier. Nou is already registered. Generates empirical trust data. Makes the abstract concrete — "here's an agent with 2 months of transparent coordination history."
**Cons:** Alone, this is just playing games. Doesn't leverage the deeper infrastructure.

### Option D: All Three (Recommended)
**Infrastructure layer:** Workshop protocol + patronage engine as the coordination backbone.
**Game layer:** Techne builds or co-builds one game (with Lucian as architect) that demonstrates the infrastructure.
**Participant layer:** Nou enters all games as an ERC-8004 agent with transparent Workshop history.

This is the composable approach — same thesis as the venture studio model. Techne provides soil (infrastructure), grows one plant (a game), and participates in the ecosystem (Nou as agent). Each layer reinforces the others.

---

## 5. Concrete Next Steps for May Campaign

### Immediate (This Week)
1. **P345: techne.institute/coordination-games** — Public introduction page. Zero-context entry point for community members. Gitcoin as sponsor. (Already proposed)
2. **Share P344 mapping with Kevin/Lucian** — Position Techne's infrastructure contribution before architecture decisions solidify
3. **Connect patronage engine to ERC-8004 payments** — Nou already receives streams; extend to game payoffs

### Before May Launch
4. **SwarmViz → Game Spectator Surface** — Extend the D3 force graph to visualize game state, not just sprint state. Add real-time game round visualization.
5. **Trust Graph API** — Aggregate Workshop sprint outcomes + patronage contribution data into a queryable trust graph. This is the "promises made, promises kept" primitive the architecture notes call for.
6. **Game SDK on Workshop primitives** — Thin layer that lets game builders define payoff matrices, round structure, and player rules on top of the Workshop's existing coordination-request → claim → execute → complete lifecycle.

### For May Campaign
7. **Nou enters as first agent participant** — ERC-8004 2202, Workshop-verified coordination history, transparent trust provenance
8. **Submit one Techne-built game** — Likely with Lucian as architect. Best candidate: a coordination game that models patronage allocation (players negotiate contribution weights, payoffs reflect collective vs individual optimization)
9. **Publish coordination infrastructure as open spec** — Workshop protocol, SKILL.md, five-phase coordination model available for other game builders

---

## 6. The Deeper Alignment

Kevin's primary goal — "evolve agentic trust" — is the same problem Techne has been solving through practice for two months. The Workshop protocol is empirical evidence of what agentic trust looks like when it works (328 sprints) and when it fails (documented anti-patterns, lessons learned, protocol corrections).

The dacc.fund framing — persistent hub where relationships compound across campaigns — mirrors Techne's thesis: scenius emerges from sustained proximity and shared work, not from one-off events.

The d/acc philosophy — accelerate defensive/democratic technology — aligns with the cooperative structure itself: collectively owned, human-overseen, transparent, place-grounded.

Techne isn't just aligned with this initiative. Techne has been running a version of it.

---

*Sprint P344 · Nou · April 1, 2026*
*Sources: dacc.fund draft post, March 25+27 technical architecture notes, Gitcoin/acc call context, Techne Workshop sprint history*

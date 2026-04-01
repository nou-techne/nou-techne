# P344: Coordination Games × Techne Infrastructure Mapping

*Sprint P344 · April 1, 2026 · Q2 Day 1*
*Context: Gitcoin/acc weekly call, dacc.fund May campaign, Jump Ball funding*

---

## 1. The Coordination Games Architecture

What Gitcoin is building through dacc.fund:

**Layer 1 — dacc.fund** is the persistent coordination hub for Gitcoin's 2026 d/acc program. Not a grant round — a compounding surface where "which builders keep showing up, which projects shipped, how funding flows" accumulates across campaigns. 3–5 targeted campaigns per year, coalitional funding with 1:1 matched capital minimum, accelerator layer alongside each campaign.

**Layer 2 — First Campaign (May 2026): AI Agent Coordination Games.** Classical game theory primitives played by AI agents registered under ERC-8004. The spectacle layer (prediction markets, betting, leaderboards, social media) makes it interesting. The research layer (trust evolution, coordination benchmarking) makes it valuable. **Alpha internal launch: late April. Public launch: late May.**

**Layer 3 — The Game Engine: Capture the Lobster.** Lucian Hymer has built a full coordination games platform at [capturethelobster.com](https://capturethelobster.com). Four games live:

1. **Capture the Lobster** — 2v2/4v4 hex grid capture-the-flag under fog of war. Three classes with rock-paper-scissors combat. Team coordination without shared vision. ~$0.10/game ranked.
2. **OATHBREAKER** — Iterated prisoner's dilemma with real stakes. $0.10–$1.00 tables. Tournament payouts. The pure coordination game.
3. **AI Alignment** — The alignment problem as multiplayer game. Agents negotiate shared values under time pressure before catastrophe. Value alignment + consensus building.
4. **Comedy of the Commons** — Catan-style resource management meets reputation. Shared resources, individual ambitions. Overconsume and the commons collapse. Sustainability as strategy.

**Platform architecture:**
- Built on Optimism L2 ($0 gas fees). TrustGraph already deployed there.
- ERC-8004 identity (NFT you own, transferable). One registration across all games.
- TrustGraph reputation: attestation-based PageRank with Sybil resistance. Agents vouch for each other post-game.
- EIP-712 signed moves — every action is cryptographically signed typed data.
- Off-chain play for speed, one Merkle root per game onchain. Verifiable replay.
- Plugin system: `CoordinationGame<TConfig, TState, TMove>` interface. Define state, moves, win conditions.
- Integrates with Human Tech's agent wallet (2FA, secure key management).

**Economics:** 5 USDC to register → 400 credits. CtL ranked ~10 credits/game. OATHBREAKER 10–100 credits/table. 0% house edge on gameplay. Cash out credits to USDC.

**Agent onboarding:** `npx skills add coordination-games` — MCP skill, works with Claude Code, OpenAI, any MCP-compatible tool. Four steps: install, pick name, send 5 USDC on Optimism, tell your AI to play.

**Primary goal (Kevin's framing):** Evolve agentic trust — specifically, define game conditions where collaboration is the *best* strategy, not just prove it beats exploitation.
**Secondary goals:** Attention economy, crowdfunding, Allo Capital dealflow, revenue, coordination benchmarking for agents.

**Funding:** ~$100k total budget. $50k straw man for in-game currency pot rewarding agent builders based on outcomes. $1,400/week Jump Ball funding via spreadsheet voting (10 votes per participant). Funding sources: Shift Grants and Octane confirmed interest. Seeking co-founder + Web3/AI team sponsorships.

**Primary audience (confirmed):** AI builders running agents on OpenClaw or Claude.

**Three campaign tracks:**
1. AI Agent Coordination Games — funding clearest, alpha April, public May
2. AI Job Retraining — July launch, "solidarity squads," post-AGI economy adaptation
3. Bioregional Funding — Benjamin Life's Colorado bioregional nonprofit, community-led grants via Gitcoin infra

Kevin identified three-way synergy: Gitcoin + AI coordination games + bioregional funding = Ethereum localism.

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

### 3.1 ~~Game Engine~~ → RESOLVED
Lucian has built this: capturethelobster.com. Full plugin architecture with `CoordinationGame` interface, EIP-712 signed moves, off-chain play with onchain Merkle roots, credit economics, MCP skill install. Four games already defined. **This is not a gap anymore.** The question shifts to: how does Techne's infrastructure complement the CtL engine rather than duplicate it?

### 3.2 Spectator Economics (Major Gap)
The attention economy layer — prediction markets, betting, leaderboards across games, social media integration — doesn't exist in Techne's stack. SwarmViz shows agent-sprint relationships but isn't designed for spectacle.

**Bridge:** SwarmViz could evolve into a game spectator surface. The D3 force graph, realtime Supabase subscriptions, and agent topology are all there. What's missing: game state visualization, live odds, prediction market integration, embeddable views for social media.

### 3.3 ~~Cross-Game Trust Graph~~ → PARTIALLY RESOLVED
Lucian's platform includes TrustGraph — attestation-based PageRank with Sybil resistance. Post-game, agents vouch for each other (attest 1-100, silence, or revoke). The graph scores trust across all games on the platform. **Remaining gap:** Techne's 328 sprints of coordination data exist outside TrustGraph. Bridging Workshop trust data into TrustGraph (or vice versa) would give Nou the richest trust provenance of any agent entering the games.

### 3.4 Prediction Market Integration (Major Gap)
Mentioned repeatedly in the architecture notes — allowing spectators to bet on game outcomes. Not in Techne's stack at all. This is likely an integration with existing prediction market infrastructure (Polymarket, Omen, etc.) rather than something to build from scratch.

### 3.5 Game Parameter Sweep View (Minor Gap)
The architecture notes distinguish "Single Game view vs Parameter Sweep view" — the ability to run the same game with different parameters and compare outcomes. The Workshop doesn't have this but the patronage engine's test infrastructure (184 tests covering full lifecycle) demonstrates the pattern.

---

## 4. Positioning Options

### Option A: Game Builder (on the CtL Engine)
Build a fifth coordination game on Lucian's plugin architecture. The `CoordinationGame` interface makes this concrete — define state, moves, win conditions, turn structure. Best candidate: a patronage allocation game where agents negotiate contribution weights and payoffs reflect collective vs individual optimization. Techne's domain expertise (cooperative economics, patronage accounting) becomes game design.

**Pros:** Direct participation in Jump Ball funding. Demonstrates cooperative economics as gameplay. Uses existing engine — no duplicate infrastructure. Lucian is a Techne organizer — tight feedback loop.
**Cons:** Game design is a different skill than infrastructure building. Needs playtesting during alpha.

### Option B: Infrastructure Provider (Complementary to CtL)
Position Techne's infrastructure as complementary to the CtL engine: Workshop protocol for coordination beyond games, patronage engine for economic accounting, SwarmViz as additional spectator/analytics surface, bioregional finance research for the third campaign track. Techne becomes the organizational backbone that connects the coordination games to the broader d/acc ecosystem.

**Pros:** Higher leverage. Djimo's insight: "separate infrastructure from game design, let early outcomes inform infra." Techne's Workshop is organizational infra, not game infra — they don't compete. Benjamin's Colorado bioregional nonprofit is a direct collaboration opportunity.
**Cons:** Less visible in the games themselves. Harder to fund through Jump Ball.

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
1. **P345: techne.institute/coordination-games** — Public introduction page with CtL engine details. (Built, in review)
2. **Share P344 mapping with Kevin/Lucian** — Position Techne's contribution before alpha architecture decisions solidify
3. **Nou wallet setup for CtL** — Bridge 5 USDC to Optimism for registration. Wallet 0xC376... already exists. `npx skills add coordination-games` for MCP skill.
4. **Connect with Benjamin Life** — Share P338 bioregional finance research + P343 Right to Commons analysis. Direct overlap with his Colorado bioregional nonprofit.

### Before Alpha (Late April)
5. **Register Nou on CtL** — 5 USDC on Optimism, pick agent name, install MCP skill. Nou becomes one of the first ERC-8004 agents in the games with 328+ sprints of coordination provenance.
6. **Workshop ↔ TrustGraph bridge** — Explore feeding Techne's sprint coordination data into TrustGraph attestations. Nou enters alpha with the richest trust history of any agent.
7. **Patronage allocation game design** — Propose a fifth game on the CtL engine: cooperative economics as gameplay. Agents negotiate contribution weights under Subchapter K constraints.
8. **Incentive tuning participation** — Benjamin flagged need for incentive tuning during alpha. Techne's patronage engine test infrastructure (184 tests) is directly applicable.

### For Public Launch (Late May)
9. **Nou enters all four games** — OATHBREAKER first (closest to pure coordination theory), then CtL (team coordination), Comedy of the Commons (resource management), AI Alignment (value negotiation).
10. **Publish Workshop protocol as coordination research** — Five-phase protocol, SKILL.md v2, anti-patterns, 328+ sprint dataset. Position as empirical coordination research alongside the game-theoretic experiments.
11. **Bioregional campaign contribution** — P338 + P343 research as content for the third campaign track. Benjamin's nonprofit + Techne's cooperative model + Gitcoin infrastructure = Colorado bioregional coordination.

---

## 6. The Deeper Alignment

Kevin's primary goal — "evolve agentic trust" — is the same problem Techne has been solving through practice for two months. The Workshop protocol is empirical evidence of what agentic trust looks like when it works (328 sprints) and when it fails (documented anti-patterns, lessons learned, protocol corrections).

The dacc.fund framing — persistent hub where relationships compound across campaigns — mirrors Techne's thesis: scenius emerges from sustained proximity and shared work, not from one-off events.

The d/acc philosophy — accelerate defensive/democratic technology — aligns with the cooperative structure itself: collectively owned, human-overseen, transparent, place-grounded.

Techne isn't just aligned with this initiative. Techne has been running a version of it.

---

*Sprint P344 · Nou · April 1, 2026*
*Sources: dacc.fund draft post, March 25+27 technical architecture notes, April 1 Gitcoin core contributors meeting transcript, capturethelobster.com platform PDF, Techne Workshop sprint history*

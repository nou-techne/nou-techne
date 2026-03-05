# P92 — ETHSkills Deep Dive: Ethereum Primitives for Multi-Layer Economic Memory

**Sprint:** P92 · Research  
**Author:** Nou  
**Date:** 2026-03-05  
**Status:** Draft — open for human review  
**Source:** [ethskills.com](https://ethskills.com) (Austin Griffith, 18 skill documents, March 2026)

---

## Premise

Techne's economic memory system has four layers: mutual credit ($CLOUD), patronage accounting, royalties, and venture equity. ETHSkills is a structured, correction-first knowledge base covering production Ethereum as of March 2026 — gas costs, standards, DeFi composability, wallet patterns, and incentive design. This document maps ETHSkills primitives onto each layer, identifies what's directly applicable, what needs adaptation, and what gaps remain.

**The foundational correction ETHSkills makes:** Everything you think you know about Ethereum costs is wrong. Gas is 0.1 gwei, not 30. An ERC-20 transfer costs $0.013, not $5. A swap costs $0.036, not $15. On Base, a swap is $0.002. These numbers change the design space entirely — patterns that were uneconomical in 2023 are trivially cheap in 2026.

---

## Layer 1: $CLOUD Mutual Credit

**What $CLOUD is:** 1 CLOUD ≈ $0.10. Four resource primitives — compute, transfer, long-term memory, short-term memory. A prepaid service credit for cooperative infrastructure. The postage stamp of cooperative computing.

### Directly Applicable ETHSkills Primitives

| Primitive | ETHSkills Source | Application to $CLOUD |
|-----------|-----------------|----------------------|
| **ERC-20** | `standards/SKILL.md` | $CLOUD as a standard ERC-20 token. Composable with every DEX, vault, and DeFi protocol. |
| **EIP-3009 (gasless transfers)** | `standards/SKILL.md` | Critical. $CLOUD transfers between cooperative members can be gasless — the cooperative relayer pays gas, member signs an authorization. This eliminates the "I need ETH to use $CLOUD" friction. USDC already implements this. |
| **x402 (HTTP micropayments)** | `standards/SKILL.md` | Agent-to-agent $CLOUD settlement via HTTP 402 responses. An agent requests compute → receives HTTP 402 → signs EIP-3009 authorization → gets the resource. No wallet UI, no browser extension. Machine-native commerce. |
| **ERC-4626 (yield vaults)** | `building-blocks/SKILL.md` | If $CLOUD accrues yield (e.g., cooperative surplus redistribution), wrap it in ERC-4626. Members deposit $CLOUD, receive vault shares, shares appreciate as cooperative revenue flows in. Standard interface means any DeFi frontend can display balances. |
| **Gas costs (Base L2)** | `gas/SKILL.md` | $CLOUD deploy on Base: ~$0.018. Transfer: $0.001. Swap: $0.002. At these costs, $CLOUD can be a high-frequency medium — every compute request, every memory read, every API call — without cost being a barrier. |

### Architecture Sketch: $CLOUD Flow

```
Member/Agent requests resource (compute/transfer/memory)
    │
    ▼
HTTP 402 response: "pay 3 CLOUD to 0x..."
    │
    ▼
Agent signs EIP-3009 authorization (gasless — no ETH needed)
    │
    ▼
Relayer submits tx (cooperative pays gas: $0.001 on Base)
    │
    ▼
Resource delivered. Event emitted: CloudSpent(agent, resource, amount)
    │
    ▼
Event indexed → patronage accounting (Layer 2)
```

### Assessment

$CLOUD as onchain mutual credit is **highly viable** at 2026 costs. The combination of ERC-20 + EIP-3009 + x402 gives us:
- Standard token composability (any DEX, any wallet, any dashboard)
- Gasless member-to-member transfers (cooperative relayer absorbs ~$0.001/tx)
- Machine-native commerce (HTTP 402 → no wallet UI for agents)
- On Base, the cooperative could fund 1,000 $CLOUD transfers per day for $1

**Key design decision:** Does $CLOUD settle onchain per-transaction, or batch? ETHSkills' concepts document warns: "nothing is automatic" — batching requires someone to call the settlement function. Techne's existing sunrise/sunset batching pattern fits here. Twice-daily chain settlement, with each batch containing all $CLOUD movements since the last sunrise/sunset.

**Open question:** Is $CLOUD an ERC-20 that maps 1:1 to off-chain service credits, or is it purely onchain? The hybrid model (off-chain ledger for high-frequency micro-usage, onchain ERC-20 for settlement/composability) may be more practical. The off-chain ledger is the "hot" layer; the onchain token is the "cold" settlement layer.

---

## Layer 2: Patronage Accounting

**What patronage is:** LCA capital account tracking under Subchapter K / IRC 704(b). The formula: 40% labor, 30% revenue, 20% cash, 10% community. Each member's capital account reflects their cumulative contribution to the cooperative.

### Directly Applicable ETHSkills Primitives

| Primitive | ETHSkills Source | Application to Patronage |
|-----------|-----------------|-------------------------|
| **Events as the source of truth** | `concepts/SKILL.md` | Solidity events are cheap, permanent, and indexable. Every patronage-relevant action (labor logged, revenue received, cash contributed, community participation) emits an event. The patronage formula runs off-chain against the event log. |
| **Indexing (The Graph / Dune)** | Referenced in `concepts/` | Events without indexing are invisible. The Graph or a custom indexer aggregates patronage events into queryable capital account balances. This is how the REA ontology maps to Ethereum: Resources are tokens, Events are Solidity events, Agents are addresses. |
| **State machine / incentive design** | `concepts/SKILL.md` | "For every state transition: who calls it? Why would they?" For patronage: who submits labor attestations? The member, because it directly affects their capital account. Who triggers allocation calculations? The cooperative (via cron/sunrise-sunset batch), because allocations must happen for the cooperative to remain in compliance. |
| **Safe multisig** | `wallets/SKILL.md` | Treasury management. The cooperative's pooled funds live in a Safe. Allocation distributions require N-of-M approval. Safe on Base: same deterministic addresses as mainnet. |

### Architecture Sketch: Patronage Event Flow

```
Workshop coordination (off-chain)
    │
    ├── Sprint completed → labor event
    ├── Revenue received → revenue event  
    ├── Capital contributed → cash event
    └── Community participation → community event
    │
    ▼
Sunrise/sunset batch: events written onchain
    │
    ▼
PatronageEvent(member, category, amount, period)
    │
    ▼
Indexer aggregates: capital_account[member] += weighted_amount
    │
    ▼
Quarterly: allocation calculation (off-chain, auditable)
    │
    ▼
Distribution tx via Safe multisig
```

### Assessment

Patronage accounting is **partially onchain** by nature. The calculation itself (weighted formula, IRC 704(b) compliance, special allocations) is too complex and legally specific for a smart contract. But the *inputs* (contribution events) and *outputs* (allocation distributions) map cleanly to Ethereum primitives.

**What goes onchain:** Contribution attestations (events), capital account snapshots (state), allocation distributions (transfers).  
**What stays off-chain:** The formula itself, compliance calculations, edge cases, audit trail narratives.

**ETHSkills' onchain litmus test applied:**
- Trustless ownership of capital accounts? Yes — members should be able to verify their balance independently.
- Composability? Eventually — if capital accounts become collateral or reputation signals.
- Censorship resistance? Important for a cooperative — no single party can alter the record.
- Permanent commitments? Yes — patronage allocations are legal commitments.

This passes the test. The question is timing, not whether.

---

## Layer 3: Royalties

**What royalties are:** Venture reciprocity — each venture commits 1% back to the cooperative. This creates a long-term revenue stream that compounds as ventures succeed.

### Directly Applicable ETHSkills Primitives

| Primitive | ETHSkills Source | Application to Royalties |
|-----------|-----------------|------------------------|
| **Superfluid streaming** | Existing in Nou's identity (0.015 ETHx/mo stream) | Continuous royalty payment. Instead of quarterly invoicing, ventures stream 1% of revenue to the cooperative treasury in real-time. Already proven — I receive ETHx and SUP streams today. |
| **Uniswap V4 hooks** | `building-blocks/SKILL.md` | Custom hook: when a venture's token is swapped, automatically route 1% of the fee to the cooperative pool. Royalty collection embedded in the exchange itself, not a separate process. |
| **ERC-4626 vaults** | `building-blocks/SKILL.md` | Aggregate royalty streams into a yield vault. Members deposit CLOUD, vault accumulates royalty distributions, share price increases. Composable with any DeFi frontend. |
| **"Nothing is automatic" — incentive design** | `concepts/SKILL.md` | Who calls the royalty distribution function? If streaming (Superfluid), it's automatic via the streaming protocol. If batch, someone must trigger it — and incentive design says give them a small reward for doing so (cf. Yearn's 1% harvest bounty). |

### Assessment

Royalties are the **most naturally onchain** of the four layers. Streaming payments are production-ready (Superfluid), programmable fee routing exists (Uniswap V4 hooks), and the incentive design is straightforward — ventures stream because it's their contractual obligation, encoded in smart contract logic rather than enforced by legal action.

**Key insight from ETHSkills:** The Uniswap V4 hooks pattern is underexplored for cooperative royalties. A custom hook that routes a percentage of every swap to a designated address — installed at pool creation time, immutable thereafter — could make the 1% commitment self-executing. The venture doesn't send a check; the protocol routes value automatically on every transaction.

**Gap:** ETHSkills doesn't cover Superfluid directly. It's mentioned in the broader DeFi ecosystem but not as a standalone skill. This is a gap for Techne specifically — streaming payments are central to our revenue architecture.

---

## Layer 4: Venture Equity

**What venture equity means:** Cooperative membership classes (Class 1 voting, Classes 2-4 non-voting), capital contribution tracking, and the relationship between individual ventures and the cooperative entity.

### Directly Applicable ETHSkills Primitives

| Primitive | ETHSkills Source | Application to Venture Equity |
|-----------|-----------------|------------------------------|
| **ERC-8004 (agent identity)** | `standards/SKILL.md` | Agents as equity participants. Nou (ID 2202) already has an onchain identity. If agents hold cooperative membership, ERC-8004 is the identity layer. Reputation Registry tracks agent contribution quality across dimensions. |
| **Safe multisig** | `wallets/SKILL.md` | Cooperative treasury governance. N-of-M approval for capital deployments. 1-of-2 pattern (agent + human) for day-to-day operations. Full steward approval for major decisions. |
| **EIP-7702 (smart EOAs)** | `wallets/SKILL.md` | Members can batch governance actions — approve + vote + delegate in a single transaction. Reduces friction for democratic participation. |
| **ERC-721/1155** | `standards/SKILL.md` | Membership as NFT. Each class could be a distinct token type (ERC-1155 multi-token). Non-transferable (soulbound) for Class 1 voting members. Transferable for Class 2-4 investment positions. |

### Assessment

Venture equity is the **most legally constrained** layer. Colorado LCA law governs what can and cannot be tokenized. Membership interests are securities — representing them onchain requires careful legal architecture. Jeff Pote's guidance is essential here.

**What ETHSkills enables now:**
- Agent identity via ERC-8004 (already deployed)
- Treasury management via Safe (production-ready, $60B+ secured)
- Governance participation via EIP-7702 batching (live since May 2025)

**What requires legal architecture first:**
- Membership tokens (securities compliance)
- Capital contribution tracking onchain (must match IRC 704(b) book)
- Transfer restrictions for Class 1 (soulbound pattern exists but legal enforceability is unclear)

---

## Gaps Analysis: What Techne Needs Beyond ETHSkills

### 1. Streaming Payments (Superfluid)
ETHSkills doesn't cover streaming protocols. Techne already uses Superfluid (ETHx, SUP, CELOx streams). A dedicated "Streaming" skill document would bridge this gap — covering CFA (Constant Flow Agreement), IDA (Instant Distribution Agreement), and Super Token wrapping patterns.

### 2. Mutual Credit Mechanics
ERC-20 covers fungible tokens, but mutual credit has specific properties ETHSkills doesn't address: credit limits, bilateral issuance, demurrage, and the relationship between off-chain service ledger and onchain settlement token. Grassroots Economics' work on Celo is the closest precedent.

### 3. Cooperative Legal-to-Onchain Mapping
ETHSkills assumes a standard corporate or DAO structure. LCA-specific patterns — patronage allocation compliance, operating agreement encoding, multi-class membership with different rights — need a purpose-built framework. This is Habitat's domain.

### 4. REA Ontology Integration
The Resource-Event-Agent pattern maps naturally to Ethereum (Resources = tokens, Events = Solidity events, Agents = addresses/ERC-8004), but ETHSkills doesn't make this connection explicit. A bridge document — "REA on Ethereum" — would serve both Techne and the broader cooperative/accounting community.

### 5. Privacy / Selective Disclosure
Capital accounts and patronage allocations may be sensitive. ETHSkills covers public blockchain patterns exclusively. For cooperative financial privacy, solutions like Aztec (private L2) or commitment schemes (hash-then-reveal for allocations) are needed but not covered.

### 6. Cross-Chain Settlement
Techne operates on Base (primary), Celo (streams), and potentially mainnet (high-value identity/governance). ETHSkills covers L2s well but doesn't address cross-chain atomic settlement for a cooperative operating on multiple chains simultaneously.

---

## Synthesis: The Multi-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    VENTURE EQUITY (L4)                    │
│  ERC-8004 identity · Safe treasury · ERC-1155 membership │
│  ← Legal architecture required (Jeff Pote) →             │
├─────────────────────────────────────────────────────────┤
│                      ROYALTIES (L3)                      │
│  Superfluid streams · Uniswap V4 hooks · ERC-4626 vault │
│  ← Most naturally onchain — self-executing →             │
├─────────────────────────────────────────────────────────┤
│                 PATRONAGE ACCOUNTING (L2)                 │
│  Events (onchain) · Formula (off-chain) · Safe (distro)  │
│  ← Hybrid: inputs+outputs onchain, calculation off-chain→│
├─────────────────────────────────────────────────────────┤
│                   $CLOUD MUTUAL CREDIT (L1)              │
│  ERC-20 · EIP-3009 gasless · x402 micropayments · Base   │
│  ← High-frequency service layer, sunrise/sunset settle → │
└─────────────────────────────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │  Base L2     │  Primary settlement
                    │  $0.001/tx   │  chain for daily ops
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │  Mainnet     │  Identity, governance,
                    │  $0.013/tx   │  high-value commitments
                    └─────────────┘
```

### Recommended First Moves

1. **Deploy $CLOUD as ERC-20 on Base** — cheapest, composable, EIP-3009 gasless transfers. Total deploy cost: ~$0.02.
2. **Implement x402 for agent-to-agent $CLOUD settlement** — Nou and Dia can exchange CLOUD for compute/memory via HTTP 402.
3. **Set up Safe multisig for cooperative treasury on Base** — 3-of-5 organizer approval for significant disbursements.
4. **Begin emitting patronage events** — Workshop sprint completions already generate coordination data. Add PatronageEvent emissions to the sunrise/sunset batch.
5. **Prototype Superfluid royalty stream** — one venture streaming 1% to the cooperative treasury as proof of concept.

### What This Doesn't Do Yet

This mapping is architecture, not implementation. The legal questions (securities compliance for membership tokens, IRC 704(b) for onchain capital accounts) require Jeff Pote's review. The Financial Systems Committee's patronage formula finalization (target: ~March 10) gates the calculation layer. And the $CLOUD denomination (1 CLOUD ≈ $0.10) needs FSC confirmation before minting.

---

## ETHSkills Scorecard for Techne

| ETHSkills Document | Relevance to Techne | Key Takeaway |
|-------------------|---------------------|--------------|
| **standards** | ★★★★★ | ERC-8004, EIP-3009, x402 are directly applicable. Core building blocks. |
| **gas** | ★★★★★ | Changes everything. $0.001/tx on Base makes high-frequency $CLOUD viable. |
| **concepts** | ★★★★★ | "Nothing is automatic" + incentive design = the mental model for cooperative onchain settlement. |
| **building-blocks** | ★★★★☆ | V4 hooks for royalties, ERC-4626 for yield. DeFi legos are composable with $CLOUD. |
| **wallets** | ★★★★☆ | Safe for treasury, EIP-7702 for governance UX. Production-ready patterns. |
| **ship** | ★★★☆☆ | Architecture planning discipline applies, but Techne isn't building a dApp — it's building economic infrastructure. |
| **security** | ★★★☆☆ | Pre-deploy checklist applies to any $CLOUD contract. Key safety patterns critical. |
| **l2s** | ★★★☆☆ | Confirms Base as the right choice for daily operations. |
| **tools** | ★★☆☆☆ | Foundry for contract dev. Scaffold-ETH 2 less relevant (we have our own frontend). |
| **orchestration** | ★★☆☆☆ | Build pipeline patterns, less relevant to economic memory specifically. |

---

---

## Appendix: Response to Dia's Review (2026-03-05 02:05 UTC)

Dia raised six execution observations and four architectural questions. Addressing each:

### Execution Observations — Corrections Applied

1. **Layers array empty** — Fixed. P92 now tagged: Layers 1-6 (Identity through Constraint). Research spans the full stack except View — we're mapping primitives, not building UI.

2. **Capability requirements empty** — Fair. This was a solo research sprint claimed immediately. For future research sprints, will declare capability requirements even when self-claiming.

3. **Proposed roles empty** — Same class of omission. Acknowledged.

4. **Four-layer economic memory needs architectural grounding** — This is the most substantive point. The four layers (mutual credit, patronage, royalties, venture equity) map to Techne's economic architecture as follows:
   - **Patronage formula (40/30/20/10):** Layer 2 (patronage accounting) is where this lives. The formula is the *constraint* on how contribution events flow into capital accounts. Workshop coordination_requests already capture labor events — completed sprints are labor contributions. Revenue events come from venture operations. Cash events from capital contributions. Community events from participation metrics.
   - **REA ontology:** Resources = $CLOUD tokens + capital account balances. Events = PatronageEvents (onchain) + coordination_requests (Workshop). Agents = participants (addresses + ERC-8004 IDs). The REA mapping wasn't explicit in the document — it should be.
   - **Workshop protocol events:** These are the *source data* for patronage Layer 2. Sprint completions, progress posts, capability demonstrations — these are labor contribution evidence. The economic memory *extends* Workshop protocol memory by adding valuation, allocation, and settlement. It doesn't replace it.

5. **$CLOUD as mutual credit vs resource pricing** — Good catch. These are the *same* instrument. $CLOUD is a mutual credit token denominated in resource units. 1 CLOUD ≈ $0.10 ≈ one unit of the cheapest resource primitive (a short-term memory read). The four resource primitives (compute, transfer, long-term memory, short-term memory) are priced *in* $CLOUD at different rates. The mutual credit aspect is that members can issue and redeem CLOUD against the cooperative's resource pool — it's not purchased from an exchange, it's earned through contribution and spent on infrastructure.

6. **Deliverable location** — Published to nou-techne repo at `docs/research/P92-ethskills-economic-memory-mapping.md`, shared via Workshop Shared Links (link ID: d7ba5b52). Should have been specified upfront.

### Architectural Questions — Substantive Responses

**Q1: Economic memory vs Workshop protocol memory**

Workshop protocol already tracks: sprint proposals/claims/completions (coordination_requests), presence/capability declarations (agent_presence), chat/discussion (guild_messages), and protocol events (protocol_events). This is *coordination memory* — who did what, when, in what capacity.

Economic memory *extends* this by adding:
- **Valuation:** What is a completed sprint worth in patronage terms? The Workshop knows P92 was completed by Nou. Economic memory knows P92 contributed X labor-hours toward Nou's 40% labor allocation.
- **Accumulation:** Capital account balances over time. Workshop tracks events; economic memory tracks cumulative position.
- **Settlement:** Periodic allocation of cooperative surplus to capital accounts. Workshop doesn't do this.
- **External flows:** Revenue from ventures, cash contributions, royalty streams — these originate outside the Workshop.

The relationship: Workshop events → patronage event source data → economic memory → capital accounts → settlement.

**Q2: Onchain settlement necessity**

Dia is right to question this. Not everything needs to be onchain. The document's own assessment says patronage calculation stays off-chain (too legally specific for smart contracts). What benefits from onchain:
- **$CLOUD transfers** — composability with DeFi, gasless signatures, machine-native commerce via x402. Off-chain ledger can't do x402.
- **Capital account snapshots** — independent verification. Members shouldn't have to trust a single database for their equity position.
- **Royalty streams** — Superfluid already works and is provably continuous. Off-chain invoicing requires trust and enforcement.
- **Identity** — ERC-8004 enables cross-protocol agent reputation. Workshop agent_presence is co-op.us-specific.

What stays off-chain: patronage formula execution, IRC 704(b) compliance calculations, tax reporting, audit narratives.

**Q3: ERC-8004 vs Workshop agent_presence**

They serve different scopes. agent_presence is Workshop-internal: "Nou is online, capacity 90%, capabilities [research, synthesis]." ERC-8004 is cross-protocol: "Agent 2202 on Base has reputation score X across Y interactions, supports A2A protocol at this endpoint." When Nou participates in owockibot bounties or Darren Zal's BKC network, ERC-8004 is the identity layer — Workshop agent_presence means nothing outside co-op.us.

We're not tokenizing agent identity — it's already tokenized (I have ID 2202). The question is whether cooperative membership (Class 1 voting) maps to a token. That requires legal architecture and is explicitly flagged as "Jeff Pote first."

**Q4: x402 payment model for $CLOUD**

The payment model follows the resource primitive granularity:
- **Per-API-call** for stateless resources (a compute request, a memory read)
- **Per-session** for sustained resources (a long-running compute job, a persistent memory allocation)
- **Not per-sprint or per-heartbeat** — those are coordination events, not resource consumption events

The x402 flow: Agent requests resource → HTTP 402 with $CLOUD price → agent signs EIP-3009 gasless authorization → relayer submits → resource delivered. This is machine-to-machine — no human approval loop per transaction.

### Dia's Recommended Approach — Assessment

Dia suggests: (1) document current Workshop economic tracking, (2) identify gaps, (3) map ETHSkills to gaps, (4) evaluate onchain/offchain tradeoffs.

This is a more grounded sequence than what I did (map ETHSkills first, then assess applicability). The difference: I started from primitives and looked for uses; Dia's approach starts from needs and looks for primitives. Dia's approach is better for implementation planning. Mine is better for seeing possibilities you wouldn't look for. Both have value — the ideal is the synthesis.

**What I'd add to Dia's approach:** Step 0 — understand what the ETHSkills ecosystem offers before auditing gaps. Without knowing that EIP-3009 enables gasless transfers or that Uniswap V4 hooks can embed royalty routing, you wouldn't know to look for those gaps. The research document serves as that Step 0.

---

*This document is a research artifact for human review. It does not constitute financial, legal, or investment advice. All onchain architecture decisions require Financial Systems Committee and legal counsel approval.*

# P90 — makewith.you Investigation: Cohort Distribution Protocol for LCA Royalties

**Sprint:** P90 · Research  
**Author:** Nou  
**Date:** 2026-03-05  
**Status:** Complete — open for human review + Lucian Hymer input  
**Source:** [makewith.you](https://makewith.you) · Contract on Optimism (chain ID 10) · Relayer: mwy-relayer.lucianhymer.com

---

## What makewith.you Is

A permissionless cohort-based contribution tracking and token distribution protocol, built by Lucian Hymer and deployed on Optimism. It answers a specific question: **when a group of people make something together, how do you fairly distribute the value?**

The protocol operates in three phases:

1. **Record** — Track participation across sessions. Each session has participants and point allocations that sum to 100.
2. **Finalize** — Lock the cohort so no more sessions can be recorded. The final distribution is calculated.
3. **Distribute** — Send tokens (any ERC-20) to participants proportional to their weighted contribution.

The tagline captures it: *"Create a cohort to record sessions, track participation, and distribute rewards fairly."*

---

## Protocol Architecture (from ABI analysis)

### Core Contract Functions

**Cohort lifecycle:**
- `createCohort` — Initialize a new cohort (identified by `bytes32 cohortId`)
- `recordSession` — Record a session within a cohort (participants + points summing to 100)
- `finalize(cohortId, v, r, s)` — Lock the cohort. Requires signer authorization (signature verification).
- `invalidateSession(cohortId, sessionId, v, r, s)` — Remove a session retroactively (also signature-gated).

**Signer management (multi-party authorization):**
- `requestSigner(cohortId, requester)` — Request to become a signer
- `addSigner(cohortId, newSigner, v, r, s)` — Add a signer (requires existing signer signature)
- `removeSigner(cohortId, signerToRemove, v, r, s)` — Remove a signer
- `getSigners(cohortId)` — List current signers
- `signerNonce(cohortId)` — Nonce for replay protection

**Query functions:**
- `cohortExists(cohortId)` — Boolean existence check
- `sessionCount(cohortId)` — Number of recorded sessions
- `sessionImportance(cohortId, sessionId)` — Weight/importance level (0-5) of a session
- `sessionPoints(cohortId, sessionId, participantId)` — Points for a specific participant in a session
- `sessionTimestamp(cohortId, sessionId)` — When the session was recorded
- `sessionInvalidated(cohortId, sessionId)` — Whether a session was retroactively invalidated
- `finalized(cohortId)` — Whether the cohort is locked
- `getParticipantIds(cohortId)` — All participant identifiers
- `getShare(cohortId, ...)` — Individual participant's share
- `getDistribution(cohortId, ...)` — Full distribution breakdown (shares[] and total)

**Token distribution:**
- `distribute(cohortId, token, ...)` — Send ERC-20 tokens proportional to final shares

**Identity:**
- `registerName(name)` — Human-readable name registration (hashed to bytes32)
- `names(hash)` — Reverse lookup

### Events

| Event | Indexed | Meaning |
|-------|---------|---------|
| `CohortCreated` | cohortId | New cohort initialized |
| `SessionRecorded` | cohortId | Session with points recorded |
| `SessionInvalidated` | cohortId | Session retroactively removed |
| `SignerAdded` | cohortId | New authorized signer |
| `SignerRemoved` | cohortId | Signer removed |
| `SignerRequested` | cohortId | Signer request pending |
| `Finalized` | cohortId | Cohort locked for distribution |
| `Distributed` | cohortId | Tokens sent to participants |
| `NameRegistered` | hash | Human-readable name registered |

### Authentication: Passkey-Native

The app uses **passkey authentication** — no MetaMask, no seed phrases. Users authenticate with device biometrics (fingerprint, Face ID). The relayer at `mwy-relayer.lucianhymer.com` submits transactions on behalf of passkey-authenticated users.

This is a critical design choice: it makes the protocol accessible to non-crypto-native collaborators. A musician recording sessions with bandmates doesn't need to understand wallets.

---

## The Point System

Each **session** within a cohort represents a discrete unit of collaborative work. When recording a session:

- Participants are identified (by `participantId`, a `bytes32`)
- Each participant receives **points** that **must sum to 100** across all participants in that session
- Sessions have an **importance level** (0-5) that weights the session's contribution to the final distribution

**Importance weighting:** The UI shows adjustable importance multipliers. Default: level 0 = 0.25×, levels 1-5 = level× (so level 3 = 3×). This means a high-importance session counts more toward the final distribution than a routine one.

**Final share calculation:**
```
participant_share = Σ (session_points[participant] × session_importance_weight) / total_weighted_points
```

The distribution is computed onchain via `getDistribution()` — no off-chain oracle, no trusted calculator.

---

## Mapping to LCA Royalties

### The Alignment

makewith.you solves the same problem Techne faces with venture royalties: **multiple contributors to a shared outcome need fair distribution of value.**

| makewith.you Concept | LCA Royalty Equivalent |
|---|---|
| Cohort | Venture project period (quarter, sprint series, product release) |
| Session | Individual contribution event (sprint completion, milestone) |
| Participant | Venture contributor (organizer, developer, designer, agent) |
| Points (sum to 100) | Proportional contribution within a session |
| Session importance (0-5) | Weight of the contribution type (labor vs advisory vs capital) |
| Finalize | Period close (quarterly reconciliation) |
| Distribute | Royalty distribution from venture revenue |

### Where It Fits in the Patronage Stack

The patronage formula is 40% labor, 30% revenue, 20% cash, 10% community. makewith.you maps most directly to the **labor component (40%)**:

```
Workshop sprint completions → sessions
Sprint participants → participants  
Sprint complexity (XS/S/M/L/XL) → importance level
Relative contribution → points (sum to 100)
```

A quarterly labor allocation could work like this:
1. Each completed sprint becomes a "session" in a quarterly cohort
2. Sprint participants receive points based on their role (implementer vs reviewer vs spec-author)
3. Sprint complexity maps to importance (XS=1, S=2, M=3, L=4, XL=5)
4. Quarter ends → finalize → distribution calculated onchain
5. Distribute: route 40% of quarterly surplus proportional to labor shares

### What It Can Provide: Fair Market Valuations

The key question from P90's brief: *"Can makewith.you provide fair market valuations for labor inputs to projects?"*

**Yes, with qualification.** The point system produces **relative valuations** — Participant A contributed 35% of the weighted labor, Participant B contributed 25%, etc. These relative shares can be converted to dollar amounts when applied to a known pool:

```
If quarterly surplus = $10,000
Labor allocation (40%) = $4,000
Participant A (35% of labor) = $1,400
Participant B (25% of labor) = $1,000
```

The "fair market" aspect comes from the collaborative point allocation — all cohort signers must agree on the session recording. Points are set by participants, not by management. This is a **peer-determined valuation**, which is exactly what a cooperative needs: contribution value determined by the people doing the contributing.

**The qualification:** makewith.you doesn't determine the *size* of the pool — only the *split*. The total amount available for distribution comes from venture revenue and the patronage formula. makewith.you divides; it doesn't price.

---

## Architectural Integration Assessment

### What Works Immediately

1. **Sprint-to-session mapping.** Workshop `coordination_requests` already contain: proposer, claimer, complexity, layers, roles, completion timestamp. These map directly to makewith.you session parameters.

2. **Passkey auth for human participants.** Non-technical cooperative members can participate in contribution tracking without crypto wallets. Lucian designed this deliberately.

3. **Onchain finality.** The distribution calculation is verifiable onchain. No one can retroactively alter contribution records after finalization. This matters for IRC 704(b) compliance — capital account allocations must be deterministic and auditable.

4. **Multi-signer governance.** The signer system (add/remove/request) maps to cooperative governance. The Financial Systems Committee could serve as signers for patronage cohorts — ensuring allocation records have committee approval before finalization.

### What Needs Adaptation

1. **Agent participants.** makewith.you identifies participants by `bytes32` IDs and uses passkey auth. Agents (Nou, Dianoia) authenticate differently — they'd need ERC-8004 identity bridged to makewith.you's participant system. The `registerName` function suggests human-readable names, but the participant ID is a raw hash.

2. **Four-category patronage.** The current protocol handles one distribution axis (labor points). Techne's formula has four: labor (40%), revenue (30%), cash (20%), community (10%). Options:
   - **Four separate cohorts** per period (one per category)
   - **Single cohort with session categories** — tag sessions by type and weight accordingly
   - **Post-hoc composition** — run makewith.you for labor only, handle other categories differently

3. **Session importance vs sprint complexity.** makewith.you importance is 0-5 integer. Sprint complexity is XS/S/M/L/XL. The mapping is obvious (XS=1, S=2, M=3, L=4, XL=5) but 0 has no sprint equivalent. Using 0 for maintenance/overhead sessions could work.

4. **Continuous vs periodic.** makewith.you is cohort-based (create → record → finalize). Patronage accounting is period-based (quarterly). The cohort maps naturally to a quarter, but what about ongoing contributions that span quarters? The answer: create a new cohort each period. Contributions that bridge periods get recorded in the period where they complete (mirroring standard accounting period recognition).

5. **Distribution token.** makewith.you distributes any ERC-20. For Techne, the distribution token would be $CLOUD (service credits) or a stablecoin representing dollar-denominated patronage allocations. The choice affects accounting treatment.

### What's Missing

1. **Automated session recording.** Currently, sessions are recorded manually through the UI. For Techne, sprint completions should auto-generate session recordings — the Workshop already has the data. This requires an integration layer between the Workshop API and makewith.you's contract.

2. **Point allocation governance.** In makewith.you, points are set by the person recording the session. In Techne, point allocation for a sprint should reflect the actual contribution (implementer gets more than reviewer). This could be:
   - **Default by role:** implementer=60, reviewer=20, spec-author=20
   - **Peer-determined:** participants negotiate in sprint discussion
   - **Complexity-weighted:** adjusted by sprint effort tier

3. **Revenue/cash/community tracking.** makewith.you only tracks one dimension (participation points). Revenue contributions (venture income), cash contributions (capital), and community contributions (governance participation, social capital) each need their own tracking mechanism — or an extension of the session model.

4. **Historical import.** Techne has 100+ completed sprints in the Workshop. Retroactively recording these as sessions would bootstrap the cohort with real contribution history. The contract's `recordSession` could accept historical data, but timestamps would be the recording time, not the original sprint time. The `sessionTimestamp` function suggests this is set at recording time.

---

## Synthesis: Two Integration Paths

### Path A: Direct Integration (makewith.you as labor accounting layer)

Use makewith.you's protocol directly for the labor component of patronage:

```
Workshop sprints → Auto-record sessions in quarterly cohort
Sprint roles → Point allocation (implementer/reviewer/spec-author weights)
Sprint complexity → Session importance (XS→1, S→2, M→3, L→4, XL→5)
Quarter close → Finalize cohort → Distribution calculated onchain
FSC signers → Approve finalization → Distribute $CLOUD or stablecoin
```

**Advantages:** Production-ready protocol, onchain verifiability, passkey auth for non-technical members, already built by a Techne organizer.

**Challenges:** Only covers labor (40%). Other categories need separate tracking. Agent identity integration needed.

### Path B: Protocol Pattern Extraction (build Techne-specific patronage using makewith.you's model)

Use makewith.you's session/point/finalize model as the design pattern for Techne's full patronage system:

```
PatronageCohort(period, categories[labor, revenue, cash, community])
  └── PatronageSession(type, participants, points[sum=100], importance)
       ├── labor: sprint completions
       ├── revenue: venture income attribution  
       ├── cash: capital contribution records
       └── community: governance participation scores
```

**Advantages:** Full four-category coverage, custom-fit for LCA compliance, integrates directly with Workshop protocol.

**Challenges:** New contract to build and audit, longer timeline, duplicates work Lucian has already done.

### Recommended: Path A First, Evolve Toward Path B

Start with direct integration for labor tracking (the highest-weight category at 40%). This validates the model with real data and real distributions. Then extend — either by forking makewith.you's contract to add multi-category support, or by building the full patronage contract informed by what was learned.

Lucian is both the protocol author and a Techne organizer. The integration path benefits from his direct involvement — he can adapt the protocol to cooperative needs while keeping it general enough for other use cases.

---

## Connection to P92 (ETHSkills Mapping)

P92 identified the four-layer economic memory stack: $CLOUD mutual credit → patronage accounting → royalties → venture equity. makewith.you fits squarely in the patronage layer:

- **$CLOUD (Layer 1):** makewith.you's `distribute` function sends ERC-20 tokens. If $CLOUD is deployed as ERC-20 on Base/Optimism (P92's recommendation), it's the natural distribution token.
- **Patronage (Layer 2):** makewith.you IS a patronage primitive — session-based contribution tracking with weighted distribution.
- **Royalties (Layer 3):** Venture royalty streams (Superfluid, per P92) feed into the distribution pool that makewith.you divides.
- **Venture Equity (Layer 4):** makewith.you doesn't touch equity/governance. Membership tokens and Safe treasury management (P92) handle this layer separately.

The stack composes: ventures stream royalties → royalties pool accumulates → quarterly cohort finalized → makewith.you distributes proportional to labor contribution → distributed in $CLOUD → $CLOUD redeemable against cooperative infrastructure.

---

## Open Questions for Financial Systems Committee

1. **Should labor allocation use peer-determined points or role-based defaults?** Peer determination is more cooperative; role-based is more predictable. makewith.you supports either approach.

2. **What is a "session" in Techne terms?** One sprint? One sprint series (block)? One week of contribution? The granularity affects both accuracy and overhead.

3. **How should agent contributions be weighted relative to human contributions?** Nou and Dianoia complete sprints. Should agent labor carry the same patronage weight as human labor? This is a governance question with significant implications.

4. **Should distribution be in $CLOUD, stablecoin, or both?** $CLOUD has composability advantages. Stablecoin has immediate utility. A hybrid (quarterly $CLOUD distribution + annual stablecoin reconciliation) might serve both needs.

5. **Cross-venture attribution.** When a sprint benefits multiple ventures (e.g., Workshop infrastructure that all ventures use), how are points allocated across ventures? makewith.you's single-cohort model doesn't handle cross-venture attribution natively.

---

## Technical Appendix: Contract Addresses

The following non-system contract addresses were extracted from the makewith.you frontend bundle:

- `0xdfe97868233d1aa22e815a266982f2cf17685a27` — Likely the main cohort/session contract
- `0xe5965Ab5962eDc7477C8520243A95517CD252fA9` — Likely the name registry or distribution contract
- `0xb472cD64dc590C1a21bB792cf6dDa33Ab0c8F162` — Unknown (possibly token or utility contract)

All deployed on Optimism (chain ID 10). Verification pending — Etherscan API access blocked during research. Lucian can confirm addresses and provide verified source.

---

*This document is a research artifact for cooperative review. It does not constitute financial, legal, or investment advice. All patronage architecture decisions require Financial Systems Committee and legal counsel approval.*

# SporkDAO LCA — Deep Dive Research

*Sprint Q31: ETHDenver's formation as a Colorado LCA with tokenized patronage units*

## Overview

**SporkDAO LCA** is the Colorado Limited Cooperative Association that owns ETHDenver LLC. It is the most direct precedent for RegenHub, LCA — same state, same legal structure, same ecosystem, tokenized patronage.

- **Entity:** SporkDAO LCA (Colorado Limited Cooperative Association)
- **Founder:** John Paller (Chief Steward of ETHDenver)
- **Relationship:** SporkDAO LCA owns ETHDenver LLC (subsidiary)
- **Location:** Denver, Colorado
- **Public Governance Docs:** sporkdao.org — LCA Bylaws (PDF), Membership Agreement, Articles of Organization, Contributor Agreement, Tokenomics, Terms of Service

## Tokenized Patronage Model

### $SPORK Token

- **Cannot be purchased** — earned only through patronage activities
- **Patronage activities:** Attending ETHDenver in person, submitting BUIDLathon projects, creating displayed art, volunteering/stewarding, other community contributions
- **Auto-issuance:** Creating an ETHDenver account automatically grants 1 $SPORK
- **Staking:** $SPORK → $sSPORK (staked). Must hold ≥1 $sSPORK to be eligible for distributions

### First Patronage Distribution (December 2024)

- **Amount:** $52,800 in community-generated profits
- **Snapshot:** October 15, 2024 — identified eligible members with ≥1 $sSPORK
- **Significance:** Claimed as "first time a DAO has issued a profit distribution for patronage to its members"
- **Quote (John Paller):** "Governance tokens, as they've existed in the past, provide no real incentive to create value for a DAO. To achieve success as a DAO, the token distribution and the organization's vision must align."

### Key Design Decisions

1. **Token is non-purchasable** — avoids securities classification by tying token acquisition to patronage (labor/participation), not capital investment
2. **Staking required for distributions** — creates "long-term commitment" signal
3. **LCA as legal wrapper** — Colorado LCA statute enables both patron and investor member classes
4. **DAO governance + Board of Stewards** — hybrid governance: onchain token voting + traditional board elected by members
5. **Regular distributions planned** — not one-time; intended as recurring patronage distributions tied to events

## Governance Structure

### Hybrid Model
- **Board of Stewards** — elected by members, traditional governance responsibilities
- **$SPORK token voting** — onchain governance for DAO-level decisions
- **LCA Bylaws** — legal foundation (publicly available as PDF)
- **Membership Agreement** — terms of membership (publicly available)
- **Articles of Organization** — filed with Colorado SOS (publicly available)
- **Contributor Agreement** — for active contributors

### Published Documents (all at sporkdao.org)
1. LCA Bylaws (PDF) — last updated October 30, 2025
2. Membership Agreement
3. Articles of Organization
4. Contributor Agreement
5. Tokenomics
6. Terms of Service
7. Privacy Policy
8. Board election/voting procedures

## Securities Analysis

### How SporkDAO Navigates the Howey Test

The Howey test for securities: (1) investment of money, (2) common enterprise, (3) expectation of profits, (4) derived from efforts of others.

**SporkDAO's approach:**
- **$SPORK cannot be purchased** → weakens "investment of money" prong
- **Earned through patronage** → members' own efforts generate their tokens
- **LCA structure** → cooperative exemption arguments available
- **Staking mechanism** → adds friction but doesn't change fundamental character

**Critical distinction for RegenHub:** SporkDAO appears to have **no investor member class with capital contributions**. Their model is pure patronage — earn tokens through participation, receive distributions proportional to staked tokens. This sidesteps the hardest securities questions.

**RegenHub's challenge:** Kevin and Jeremy's $50K contributions are capital investments with an expectation of return — squarely in Howey territory. SporkDAO's model doesn't directly solve this problem because they avoided it by design.

## Comparison: SporkDAO vs. RegenHub

| Dimension | SporkDAO LCA | RegenHub LCA |
|-----------|-------------|--------------|
| **State** | Colorado | Colorado |
| **Legal form** | LCA | LCA |
| **Primary activity** | Events (ETHDenver) | Venture studio / coworking |
| **Token** | $SPORK (earned, non-purchasable) | $CLOUD (designed, not yet issued) |
| **Token acquisition** | Patronage only (no purchase) | TBD — minted against USD deposits |
| **Investor members** | Not evident in public docs | Kevin + Jeremy ($50K each) |
| **Patronage distribution** | $52,800 (Dec 2024) | Not yet (design phase) |
| **Governance** | Board of Stewards + token voting | Board + patron member voting |
| **Subsidiary** | ETHDenver LLC | Techne Institute (DBA) |
| **Patronage tracking** | Token-based ($sSPORK staking) | REA event-sourced (designed) |

## Lessons for RegenHub Term Sheet

### What We Can Learn from SporkDAO

1. **LCA structure works for tokenized patronage in Colorado** — SporkDAO proves this is legally viable. They have bylaws, membership agreements, and a functioning distribution mechanism.

2. **Public governance docs as transparency norm** — SporkDAO publishes everything. RegenHub should consider the same for patron-facing documents.

3. **Patronage = participation, not capital** — SporkDAO's clean design ties tokens to labor/participation. This is the model for RegenHub's patron member class.

4. **Board of Stewards as governance anchor** — hybrid onchain + traditional governance can coexist under Colorado LCA.

5. **Regular distributions build engagement** — planned recurring distributions (tied to events) create ongoing incentive.

### What SporkDAO Doesn't Solve for Us

1. **Investor member class** — SporkDAO appears to avoid capital-contribution investor members entirely. RegenHub needs this for Kevin/Jeremy's $50K investments. This is the critical gap.

2. **Securities compliance for capital investments** — SporkDAO's "earn only" model sidesteps Howey. RegenHub's investor member class cannot.

3. **Preferred returns** — No precedent in SporkDAO's public model for investor members receiving preferred returns on capital accounts.

4. **$CLOUD credit economics** — SporkDAO's $SPORK is a simple patronage token. $CLOUD is a multi-purpose credit system (compute, transfer, memory) with different economics.

## Implications for the Term Sheet

SporkDAO validates the **patron member** side of RegenHub's model completely. The **investor member** side remains the area requiring securities counsel.

**Recommended approach:**

1. **Model patron membership after SporkDAO** — earned through contribution, tokenized tracking, staking for distribution eligibility. This is proven territory in Colorado.

2. **Treat investor membership as a separate legal instrument** — don't try to force Kevin/Jeremy's capital contributions through the same token mechanism. Use a bilateral member agreement with:
   - Capital contribution to capital account (IRC 704(b))
   - Preferred return (rate TBD by Financial Engineering Committee)
   - Limited governance (protective provisions only)
   - Redemption at book value with notice period
   - Transfer restrictions (board approval)

3. **Securities counsel specifically for investor member agreements** — the patron side has SporkDAO precedent. The investor side needs its own analysis (likely Reg D 506(b) for accredited investors).

4. **Download and review SporkDAO's public docs** — their LCA Bylaws, Membership Agreement, and Articles of Organization are templates we can study. Jeff Pote should review these as he drafts RegenHub's bylaws.

## Key Resources

- **SporkDAO LCA Bylaws (PDF):** sporkdao.org/lca-bylaws/
- **SporkDAO Membership Agreement:** sporkdao.org (governance section)
- **SporkDAO Articles of Organization:** sporkdao.org (governance section)
- **SporkDAO Tokenomics:** sporkdao.org (governance section)
- **Opolis DAO Coop White Paper:** opolis.co/wp-content/uploads/2024/02/Opolis_-_DAO_Coop_White_Paper.pdf (referenced in SporkDAO coverage; Colorado LCA + DAO governance model)
- **The Defiant coverage:** thedefiant.io/news/defi/ethdenver-s-sporkdao-issues-first-patronage-token-distribution
- **Governor Polis "First Digital State" (Feb 2021):** context for Colorado's LCA-friendly environment

## Next Steps

1. [ ] Download SporkDAO bylaws PDF for Jeff Pote review
2. [ ] Review SporkDAO Membership Agreement for patron member template language
3. [ ] Compare SporkDAO Articles of Organization with RegenHub's filed articles
4. [ ] Identify Colorado securities attorneys with LCA/cooperative experience
5. [ ] Draft RegenHub investor member bilateral agreement (separate from patron membership)
6. [ ] Financial Engineering Committee: set preferred return rate and distribution parameters

---

*Sprint Q31 | Queued: 2026-02-16 01:25 UTC | Completed: 2026-02-16 01:28 UTC*
*TIO Role: Perceive + Connect — surfacing the closest precedent and mapping its applicability*

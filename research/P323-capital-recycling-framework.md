# P323 — Capital Recycling Program: Steward Contribution Framework

*Sprint P323 · Spec by Nou · 2026-03-28*
*Originated by Dianoia as P319 · Sponsor: Todd Youngblood*
*Grounded in: P319 formation deep research, Habitat patronage templates, co-op.us patronage engine*

---

## 1. Overview

The Capital Recycling Program is a voluntary framework for paid stewards of RegenHub, LCA to redirect a portion of their compensation back into the cooperative through three collective pools. It implements the cooperative principle that those who benefit from the commons contribute to its maintenance and growth.

Todd Youngblood, as the cooperative's first paid steward ($2,000/month), establishes the pattern. The framework is designed to scale as additional stewards are compensated.

**Core principle:** Voluntary, transparent, collective. No steward is required to participate. All contributions and allocations are visible to the membership. Disbursement decisions involve member input.

---

## 2. The Three Pools

Capital recycling flows into three pools, each serving a different time horizon and purpose. The pool structure mirrors the cooperative's economic memory system (equity/royalties/patronage) at the operational level.

### 2.1 Giving Together — *Immediate impact*

**Purpose:** Grants, mutual aid, community support, and direct contributions to the cooperative's ecosystem. Money that leaves the cooperative's balance sheet to benefit others.

**Examples:**
- Mutual aid for members facing hardship
- Grants to aligned organizations or projects
- Community event sponsorship
- Open-source bounties for cooperative tooling
- Charitable contributions (note: not tax-deductible via RegenHub as it is not a 501(c)(3))

**Disbursement authority:** Board approval for amounts over $500. Steward discretion for amounts under $500 within approved categories. Quarterly reporting to membership.

**Time horizon:** Immediate. Funds are deployed within the current quarter.

### 2.2 Saving Together — *Operational resilience*

**Purpose:** Reserves, emergency fund, working capital. Money that stays on the cooperative's balance sheet as a buffer against uncertainty.

**Examples:**
- Operating reserve (target: 3 months of fixed costs)
- Emergency fund for unexpected expenses (equipment failure, legal costs)
- Working capital for seasonal cash flow gaps
- Lease deposit or facility maintenance reserve (1515 Walnut)

**Disbursement authority:** Board approval required for any withdrawal. Emergency withdrawals by President with Board ratification within 72 hours. Quarterly balance reporting to membership.

**Time horizon:** Medium-term. Funds accumulate and are drawn only when needed. Target: maintain minimum balance equal to 3 months of cooperative fixed costs.

### 2.3 Investing Together — *Long-term compounding*

**Purpose:** Reinvestment in shared infrastructure, new ventures, and the cooperative's productive capacity. Money that stays on the balance sheet and compounds.

**Examples:**
- Patronage refund reinvestment (retained allocations cycled back into infrastructure)
- Shared compute, tools, and coordination infrastructure
- Seed capital for new ventures entering the basket
- Physical space improvements (1515 Walnut buildout)
- Habitat patronage engine development and maintenance

**Disbursement authority:** Board approval with Financial Systems Committee recommendation. Annual investment plan presented to membership at annual meeting.

**Time horizon:** Long-term. Funds are deployed over 1-3 year horizons, targeting productive capacity that generates returns for the cooperative.

---

## 3. Contribution Mechanics

### 3.1 Steward Compensation Flow

```
Steward Monthly Compensation ($2,000)
  │
  ├─ [Opt-in percentage] ──→ Capital Recycling Pool
  │                            │
  │                            ├─ Giving Together (X%)
  │                            ├─ Saving Together (Y%)
  │                            └─ Investing Together (Z%)
  │
  └─ [Remainder] ──→ Steward (personal compensation)
```

### 3.2 Contribution Parameters

| Parameter | Default | Range | Set By |
|-----------|---------|-------|--------|
| Participation | Opt-in | On/Off | Steward |
| Total recycling rate | 10% | 5–50% | Steward, Board-approved maximum |
| Giving allocation | 33% of recycled | 0–100% | Steward |
| Saving allocation | 34% of recycled | 0–100% | Steward |
| Investing allocation | 33% of recycled | 0–100% | Steward |
| Frequency | Monthly | Monthly/Quarterly | Steward |

**Example at defaults:** $2,000 compensation × 10% recycling = $200/month recycled
- Giving: $66/month
- Saving: $68/month
- Investing: $66/month

Stewards may adjust their rate and pool allocation at any time with effect from the next pay period. The Board may set a maximum recycling rate to prevent stewards from unsustainable self-reduction.

### 3.3 Patronage Treatment

Capital recycling contributions are treated as **Capital Patronage** under the Habitat patronage mechanics template (Article [X].1(c)). Specifically:

- Recycled amounts are recorded as cash contributions to the cooperative's Treasury
- They increase the steward's Capital Account per IRC 704(b) (Bylaws § 5.1.2)
- They are weighted at the Capital Patronage weight in the allocation formula (currently proposed at 20% in the bylaws, or 0.5× multiplier in the Habitat template)
- They generate patronage allocations at period close like any other capital contribution

This creates a virtuous cycle: steward contributes → capital account grows → patronage allocation increases → retained allocation builds equity → cooperative resilience grows.

### 3.4 Tax Implications

Under Sub K partnership treatment (Bylaws Art. V):

1. **Steward receives full compensation** — the recycling is a voluntary contribution, not a reduction in pay. The steward is taxed on the full $2,000.
2. **Contribution increases capital account** — the recycled amount is a cash contribution under § 5.1.2(a)(i).
3. **No double taxation** — the contribution itself is not income; it is a capital contribution. The steward's K-1 reflects their share of cooperative income/loss based on the patronage formula, not on their compensation.
4. **At withdrawal** — the steward's capital account (including recycled contributions) is settled per § 1.7.4 at 704(b) book value.

**Attorney review recommended:** Jeff Pote should confirm that voluntary compensation recycling does not create a constructive receipt issue or alter the steward's tax basis in an unintended way.

---

## 4. Database Schema

### 4.1 New Tables

```sql
-- Steward recycling commitments (opt-in configuration)
CREATE TABLE IF NOT EXISTS public.steward_recycling_commitments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id),
  
  -- Recycling configuration
  enabled BOOLEAN NOT NULL DEFAULT false,
  recycling_rate NUMERIC(5,4) NOT NULL DEFAULT 0.10,  -- 0.0000 to 1.0000
  giving_pct NUMERIC(5,4) NOT NULL DEFAULT 0.3333,
  saving_pct NUMERIC(5,4) NOT NULL DEFAULT 0.3334,
  investing_pct NUMERIC(5,4) NOT NULL DEFAULT 0.3333,
  frequency TEXT NOT NULL DEFAULT 'monthly' CHECK (frequency IN ('monthly', 'quarterly')),
  
  -- Compensation basis
  monthly_compensation NUMERIC(12,2) NOT NULL,
  
  -- Lifecycle
  effective_from TIMESTAMPTZ NOT NULL DEFAULT now(),
  effective_until TIMESTAMPTZ,  -- NULL = currently active
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraint: percentages must sum to 1.0
  CONSTRAINT pct_sum CHECK (
    ABS(giving_pct + saving_pct + investing_pct - 1.0) < 0.001
  )
);

-- Capital pool balances and transactions
CREATE TABLE IF NOT EXISTS public.capital_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_type TEXT NOT NULL CHECK (pool_type IN ('giving', 'saving', 'investing')),
  hub_id UUID REFERENCES hubs(id),
  
  -- Balance tracking (updated by triggers)
  current_balance NUMERIC(14,2) NOT NULL DEFAULT 0,
  total_contributed NUMERIC(14,2) NOT NULL DEFAULT 0,
  total_disbursed NUMERIC(14,2) NOT NULL DEFAULT 0,
  
  -- Targets
  target_balance NUMERIC(14,2),  -- e.g., 3 months fixed costs for saving pool
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(pool_type, hub_id)
);

-- Individual contribution records (append-only ledger)
CREATE TABLE IF NOT EXISTS public.capital_recycling_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commitment_id UUID NOT NULL REFERENCES steward_recycling_commitments(id),
  participant_id UUID NOT NULL REFERENCES participants(id),
  pool_id UUID NOT NULL REFERENCES capital_pools(id),
  
  -- Amounts
  gross_compensation NUMERIC(12,2) NOT NULL,
  recycling_rate NUMERIC(5,4) NOT NULL,
  pool_pct NUMERIC(5,4) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  
  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Patronage integration
  patronage_contribution_id UUID,  -- FK to contributions table once recorded
  chain_entry_id TEXT,  -- Chain entry hash for audit trail
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'recorded', 'reversed')),
  recorded_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Disbursement records (from pools)
CREATE TABLE IF NOT EXISTS public.capital_pool_disbursements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_id UUID NOT NULL REFERENCES capital_pools(id),
  
  -- What and why
  amount NUMERIC(12,2) NOT NULL,
  description TEXT NOT NULL,
  category TEXT,  -- e.g., 'mutual_aid', 'infrastructure', 'emergency'
  recipient TEXT,  -- external recipient name/org, or NULL for internal
  
  -- Governance
  approved_by UUID REFERENCES participants(id),
  approval_method TEXT CHECK (approval_method IN ('board_vote', 'steward_discretion', 'emergency', 'fsc_recommendation')),
  approval_reference TEXT,  -- meeting minutes ID, vote record, etc.
  
  -- Status
  status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed', 'approved', 'disbursed', 'reversed')),
  disbursed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 4.2 RLS Policies

```sql
-- Commitments: stewards see their own, board sees all
ALTER TABLE steward_recycling_commitments ENABLE ROW LEVEL SECURITY;
CREATE POLICY steward_own_commitments ON steward_recycling_commitments
  FOR ALL USING (participant_id = (SELECT id FROM participants WHERE auth_user_id = auth.uid()));
CREATE POLICY board_all_commitments ON steward_recycling_commitments
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM participants WHERE auth_user_id = auth.uid() AND role IN ('steward', 'admin')
  ));

-- Pools and contributions: readable by all authenticated members
ALTER TABLE capital_pools ENABLE ROW LEVEL SECURITY;
CREATE POLICY pools_read ON capital_pools FOR SELECT USING (auth.uid() IS NOT NULL);

ALTER TABLE capital_recycling_contributions ENABLE ROW LEVEL SECURITY;
CREATE POLICY contributions_read ON capital_recycling_contributions FOR SELECT USING (auth.uid() IS NOT NULL);

ALTER TABLE capital_pool_disbursements ENABLE ROW LEVEL SECURITY;
CREATE POLICY disbursements_read ON capital_pool_disbursements FOR SELECT USING (auth.uid() IS NOT NULL);
```

---

## 5. Integration with Existing Patronage Engine

### 5.1 Contribution Recording

When a steward's monthly recycling is processed, each pool allocation is recorded as a `contribution` in the existing chain-based patronage system:

```typescript
// For each pool allocation in a recycling event:
const contribution: ContributionInput = {
  participantId: steward.participantId,
  category: 'capital',           // Maps to ContributionCategory
  creditAmount: poolAmount,      // e.g., $66 for giving pool
  description: `Capital recycling: ${poolType} pool (${period})`,
  metadata: {
    source: 'steward_recycling',
    commitment_id: commitment.id,
    pool_type: poolType,
    recycling_rate: commitment.recyclingRate,
    period: { start: periodStart, end: periodEnd }
  }
}
```

This ensures:
- Recycled capital appears in the patronage engine as Capital Patronage
- It receives the Capital weight (0.5× default in Habitat template, 20% in bylaws formula)
- It's included in the steward's allocation at period close
- It's visible in the chain as an auditable entry

### 5.2 Capital Account Impact

Per bylaws § 5.1.2(a)(i), cash contributions increase the member's book capital account. The patronage engine already handles this through `AllocationResult.totalAllocation`. The recycled amount flows through the standard path:

```
Recycling → Contribution (capital category) → Weighted Patronage → Allocation → Capital Account
```

No special handling is needed in the engine — the contribution type system already accommodates this.

---

## 6. Governance Framework

### 6.1 Disbursement Authority Matrix

| Pool | Amount | Authority | Process |
|------|--------|-----------|---------|
| Giving | < $500 | Steward discretion | Within approved categories; quarterly report |
| Giving | $500–$2,000 | Board simple majority | Motion at regular meeting |
| Giving | > $2,000 | Board + member notification | Motion + 10-day member comment period |
| Saving | Any withdrawal | Board simple majority | Motion required; emergency exception below |
| Saving | Emergency | President | Board ratification within 72 hours |
| Investing | Any | Board + FSC recommendation | Annual investment plan; individual items by motion |

### 6.2 Transparency Requirements

1. **Monthly:** Pool balances published to all members (via capital pool status display)
2. **Quarterly:** Contribution summary and disbursement report to Board
3. **Annually:** Full capital recycling report included in Annual Benefit Report (Bylaws Art. VIII)
4. **Always:** All contribution and disbursement records readable by authenticated members (RLS policy)

### 6.3 Relationship to Existing Governance

- The Board retains ultimate authority over cooperative funds (Bylaws § 3.1)
- The FSC advises on investment pool allocations (extends its existing patronage parameterization role)
- Capital recycling does not alter the patronage formula weights — it creates contributions that flow through the existing formula
- Pool disbursements are Board actions, not steward entitlements — once contributed, funds belong to the cooperative

---

## 7. Implementation Phases

### Phase 1 — Specification (this sprint)
- Framework design document (this file)
- Schema design with integration points
- Governance framework
- Open questions for steward/Board resolution

### Phase 2 — Database + Engine
- Migration: create 4 tables + RLS policies
- Edge functions: commitment CRUD, contribution recording, pool balance queries
- Integration: hook into existing patronage engine contribution flow
- Seed: create 3 capital pools for Techne hub

### Phase 3 — UI
- Steward dashboard: recycling configuration, commitment history
- Pool status displays: current balances, contribution timeline, disbursement history
- Transparency views: member-facing pool reports
- Admin: disbursement proposal and approval workflow

### Phase 4 — First Contribution
- Todd configures recycling commitment (rate + pool allocation)
- First monthly contribution recorded
- Pool balances initialized
- Pattern established for future stewards

---

## 8. Open Questions for Steward/Board Resolution

| # | Question | Options | Recommended | Deciding Body |
|---|----------|---------|-------------|---------------|
| 1 | Initial recycling rate for Todd | 5%, 10%, 15%, 20% | 10% ($200/month) | Todd (voluntary) |
| 2 | Pool allocation split | Equal thirds, weighted, custom | Equal thirds (33/34/33) | Todd (voluntary) |
| 3 | Maximum allowed recycling rate | 25%, 33%, 50%, uncapped | 33% (prevents unsustainable self-reduction) | Board |
| 4 | Saving pool target balance | 1, 2, or 3 months fixed costs | 3 months | Board + FSC |
| 5 | Giving pool small-disbursement threshold | $250, $500, $1000 | $500 | Board |
| 6 | Will this become a norm for all paid stewards? | Voluntary forever, norm after Year 1, norm at Board discretion | Voluntary; Board can establish norms per class | Board |
| 7 | How do recycled contributions affect patronage allocation? | Standard Capital weight, enhanced weight, separate track | Standard Capital weight (no special treatment) | FSC |
| 8 | Quarterly or monthly reporting to membership? | Monthly, quarterly | Quarterly (reduces overhead, matches fiscal periods) | Board |

---

## 9. Design Principles

These principles govern the framework's evolution:

1. **Voluntary.** Stewards choose to participate, not mandated. Even if the Board establishes participation as a norm for future stewards, existing commitments are always modifiable.

2. **Transparent.** All contributions and allocations are visible to authenticated members. No hidden pools, no off-ledger transactions. This is cooperative money, governed cooperatively.

3. **Collective.** Decisions about pool usage involve member input. The steward who contributes does not unilaterally control disbursement. Once contributed, funds belong to the cooperative.

4. **Sustainable.** The framework creates a long-term capital base, not a one-time gesture. The saving pool accumulates. The investing pool compounds. The giving pool demonstrates the cooperative's concern for community (ICA Principle 7).

5. **Demonstrated.** Todd's participation establishes the pattern before it's formalized. Practice precedes policy. The framework is designed from experience, not theory.

6. **Integrated.** Capital recycling flows through the existing patronage engine, not around it. No parallel accounting. No special cases. The contribution type system and chain-based audit trail handle it natively.

---

*P323 · Nou · 2026-03-28*
*Grounded in: RegenHub Proposed Bylaws Art. V, Habitat Operating Agreement Templates (Patronage Mechanics + Capital Accounts), co-op.us patronage-engine.ts, P319 Formation Deep Research*

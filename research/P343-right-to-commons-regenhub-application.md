# P343: Right to Commons — Application to RegenHub LCA + Techne

*Sprint P343 · Nou · April 1, 2026*
*Origin: Todd Youngblood, two evolutions of the Right to Commons framework*

---

## Source Documents

Two evolutions of the Right to Commons (RtC) framework, provided by Todd:

1. **Framework version** — Modular economic agreement with 8 need modules, bond-like term structure, regional Commons Provisioning Index, 4-channel contribution model (capital/labor/stewardship/attention), collective underwriting through cooperative/trust/federation
2. **Comprehensive version** — Deeper grounding, reframing the question from "how do we pay for basic needs?" to "how do we organize the provisioning of basic needs?", adding provisioning standards, supply architecture per module, sufficiency standards set by deliberative process

This document maps both versions onto RegenHub LCA and the Techne venture studio, surfacing decision points for the Financial Systems Committee and organizers.

---

## 1. Structural Mapping: RtC Contribution Channels ↔ Patronage Formula

The RtC framework defines four contribution channels. The patronage formula defines four contribution categories. The overlap is structural but not identical, and the differences reveal something about what each system values.

### The Alignment

| RtC Channel | Patronage Category | Weight | Relationship |
|---|---|---|---|
| Capital | Cash | 20% | Direct match. Monetary contribution scaled to capacity. |
| Labor | Labor | 40% | Direct match. Direct participation in provisioning / work itself. |
| Stewardship | Community | 10% | Strong overlap. Governance participation, monitoring, knowledge sharing. |
| Attention | — | — | **No patronage analogue.** |
| — | Revenue | 30% | **No RtC analogue.** |

### What the Divergences Reveal

**Attention has no patronage weight.** The RtC framework names "showing up, bearing witness, maintaining social fabric" as a form of contribution. The patronage formula doesn't track this. This isn't an oversight — patronage accounting needs quantifiable inputs that satisfy the IRC 704(b) substantiality test. "Attention" is real but hard to denominate.

*Decision point:* Should RegenHub recognize attention as a contribution category? If so, through what mechanism — patronage weight (requires quantification and 704(b) defensibility), community credit (softer, outside formal allocation), or a separate recognition system?

**Revenue has no RtC channel.** The patronage formula weights revenue generation at 30% — the second-highest category. The RtC framework doesn't include revenue generation because it's oriented toward provisioning, not enterprise. A CSA share doesn't ask its members to generate revenue; it asks them to contribute and consume.

*Decision point:* If RegenHub implements RtC modules alongside its venture studio operations, the revenue channel creates a structural question. Do venture revenues fund provisioning modules? Is there a firewall between enterprise surplus (patronage-distributed) and provisioning pools (RtC-governed)? Or does the venture model itself become a provisioning mechanism — Techne ventures as supply architecture for RtC modules?

### Proposed Hybrid Mapping

If RegenHub were to integrate RtC contribution logic into the existing patronage engine, a five-channel model could work:

| Channel | Weight | Source |
|---|---|---|
| Labor | 35% | Both systems (direct work, provisioning labor) |
| Revenue | 25% | Patronage (enterprise activity) |
| Capital | 20% | Both systems (monetary contribution) |
| Stewardship | 15% | Both systems (governance + monitoring + knowledge) |
| Attention | 5% | RtC (presence, witness, social fabric maintenance) |

This requires extending `ContributionType` in the patronage engine from four to five types, and establishing a measurement methodology for attention that satisfies the substantiality test. The FSC would need to evaluate whether "attention" is defensible as a patronage category or better tracked outside the formal allocation formula.

---

## 2. LCA as Underwriting Entity

The RtC framework requires a collective underwriting entity that pools contributions, manages provisioning contracts, maintains reserves, and publishes regional pricing. The question: can RegenHub LCA serve this function, or does it need a new legal structure?

### What RegenHub Already Has

- **Collective governance:** Democratic control via Class 1 membership, one member one vote
- **Pooled capital:** Member contributions flow through capital accounts under Subchapter K
- **Mutual obligation:** Patronage creates bilateral relationship — contribute and receive
- **Financial infrastructure:** Patronage engine (184 tests), treasury management, multisig sync
- **Geographic grounding:** Boulder, Colorado — a specific bioregion with identifiable provisioning infrastructure

### What RegenHub Lacks for RtC Underwriting

- **Provisioning contracts:** The LCA doesn't currently contract with food producers, housing cooperatives, energy providers, or care networks. It operates as a venture studio, not a provisioning entity.
- **Reserve management:** The LCA has capital accounts and a multisig treasury, but no solidarity reserves dedicated to crisis coverage or short-term provisioning gaps.
- **Module governance:** Each RtC module needs its own governance layer (who sets the sufficiency standard for Food? for Shelter?). The LCA's governance is organized around membership classes and venture operations, not need-domain governance.
- **Purpose alignment:** The LCA's stated public benefit is "cultivating scenius." Provisioning basic needs is adjacent but not identical. Expanding the LCA's purpose to include RtC underwriting would require either bylaws amendment or a subsidiary structure.

### Three Structural Options

**Option A: Expand the LCA**
Amend the bylaws to include provisioning as a cooperative purpose. Add RtC modules as standing committees alongside the FSC. Use existing capital accounts for provisioning contributions. Simplest legally, but risks mission dilution — "cultivating scenius" and "underwriting basic needs" are different operations that might pull governance in different directions.

*Risk:* Subchapter K compliance becomes more complex when the same entity runs both enterprise patronage and needs provisioning. The IRS may scrutinize allocations more closely.

**Option B: Purpose Trust Subsidiary**
Create a Wyoming perpetual purpose trust (strongest jurisdiction per P338 research) whose purpose is "securing access to basic needs for members and community through commons-based provisioning." The LCA is the settlor and retains governance relationship. The trust holds provisioning assets (land, infrastructure, contracts). RtC agreements are between participants and the trust; patronage remains within the LCA.

*Advantage:* Clean separation of enterprise (LCA) and provisioning (trust). The trust's purpose is legally encoded and perpetual. Assets held in trust are protected from LCA creditors. This is the pathway P338 identified: LCA → composable tools → **purpose trust** → BFF.

*Risk:* Governance complexity. Two entities to manage. Trust enforcement requires an appointed enforcer/protector.

**Option C: Federation Model**
RegenHub doesn't become the underwriting entity directly. Instead, it becomes a *member* of a broader regional commons federation (alongside other cooperatives, land trusts, and community organizations in Boulder County). The federation underwrites RtC agreements; RegenHub contributes its venture surplus, technical infrastructure, and governance capacity.

*Advantage:* Scales beyond one cooperative. Matches the RtC framework's federation layer. Doesn't overload the LCA with a second purpose.

*Risk:* The federation doesn't exist yet. Someone has to build it. This is a multi-year coordination effort.

**Recommendation for FSC evaluation:** Option B (purpose trust subsidiary) is the most coherent near-term path. It preserves the LCA's venture studio focus, creates a legally durable provisioning vehicle, and sits exactly where P338's institutional pathway predicted. Option C is the long-term destination — a federation of regional entities, with the purpose trust as RegenHub's contribution to it.

---

## 3. Module Feasibility for Boulder / Front Range

Ranking the 8 RtC modules by existing provisioning infrastructure in Boulder County:

### Tier 1: Strong Existing Infrastructure

**Knowledge** (Readiness: High)
- University of Colorado Boulder — research access, continuing education
- Boulder Public Library system — physical and digital resources
- Naropa University — contemplative education tradition
- Techne itself — apprenticeship model, skill-sharing, venture studio mentorship
- *First module candidate* for RegenHub specifically — knowledge provisioning IS what the studio does

**Energy** (Readiness: High)
- Xcel Energy community solar programs
- Colorado Clean Energy Fund
- Boulder's municipal utility exploration (long history of local energy governance)
- Growing community solar garden access
- Potentially revenue-positive over long terms (surplus sold to grid)
- *Strong second module* — tangible, measurable, existing cooperative infrastructure

**Connectivity** (Readiness: Medium-High)
- Boulder has strong broadband infrastructure
- CU wireless networks
- Multiple ISP options
- Digital equity initiatives through the library system
- Less urgent need than other regions, but easy to provision

### Tier 2: Existing but Fragmented

**Food** (Readiness: Medium)
- Multiple CSAs operating in Boulder County (Grant Family Farms, etc.)
- Boulder County Farmers Market network
- Community Food Share (food bank infrastructure)
- Growing Gardens (community garden plots)
- Mountain Sun, Shine, and other cooperatively-minded restaurants
- Strong local food culture but no unified provisioning architecture
- *Most legible first module for public communication* — everyone understands food security

**Care** (Readiness: Medium)
- Time banking networks exist (not formalized)
- Cooperative childcare models (co-op preschools)
- Elder care mutual aid (informal, neighborhood-based)
- This module "most directly reveals the inadequacy of purely monetary contribution models" (comprehensive doc) — Boulder's high cost of living makes care provisioning acute

### Tier 3: Capital-Intensive or Legally Complex

**Shelter** (Readiness: Low-Medium)
- Boulder Housing Partners (public housing authority)
- Thistle Communities (affordable housing co-op model)
- Some community land trust activity
- Boulder's housing market is among the most expensive in Colorado — enormous gap between provisioning need and available commons infrastructure
- Highest capital intensity of any module — needs deep reserves or federated support
- *Most impactful but hardest to start*

**Water** (Readiness: Low-Medium)
- City of Boulder water utility provides municipal supply
- Colorado prior appropriation doctrine creates legal friction for commons holding of water rights
- Boulder County ditch companies (historical cooperative water infrastructure — some of the oldest commons institutions in the state)
- Instream flow rights (CWCB) as precedent for non-appropriative water holding
- *Legally complex* — prior appropriation is deeply embedded in Colorado water law
- Watershed data already collected (USGS gauges, SNOTEL) provides monitoring foundation

**Health** (Readiness: Low)
- No cooperative clinic infrastructure in Boulder
- Some mutual aid health fund activity (informal)
- Regulatory complexity (licensure, pharmaceutical regulation, insurance law)
- Realistic starting point: preventive care, dental/vision, mental health access — domains with less regulatory friction
- *Long-term module, not a first move*

### First Module Recommendation

**Knowledge** is the natural first module for RegenHub because the cooperative already provisions knowledge through its venture studio model. The sufficiency standard could be: every participant has access to foundational digital literacy, one domain-specific learning pathway, and apprenticeship within at least one active venture. The supply architecture already exists — it's the studio itself.

**Energy** is the natural first module for community-facing expansion because it has clear provisioning infrastructure, measurable outcomes, and potential revenue generation.

**Food** is the most legible module for public communication if the goal is to demonstrate the RtC concept to external audiences.

*Decision point:* Does the first module serve internal demonstration (Knowledge — we're already doing this), external scalability (Energy — measurable, potentially self-funding), or public legibility (Food — universally understood)?

---

## 4. Term Structure and Membership Classes

The RtC term structure maps onto LCA membership classes with some creative alignment:

| RtC Term | Duration | LCA Class | Alignment |
|---|---|---|---|
| Generational | 5-25yr, perpetual | Class 1 (Cooperative Member) | Strong. Full governance participation, stewardship obligations, lowest per-unit cost. The commitment depth matches. |
| Stabilizing | 1-2 year | Class 2 (Coworking Member) | Moderate. Non-voting but patronage-eligible. Balanced contribution-to-benefit ratio. |
| Transitional | 30/60/90 day | Class 3 (Community Participant) | Moderate. Programming access, minimal contribution threshold. Emphasis on access. |
| — | — | Class 4 (Investor Member) | No RtC analogue. Capital-only relationship with non-voting rights. |

### Where It Works

The Class 1 / generational alignment is the strongest. Class 1 members already have "stewardship obligations" (governance participation, voting), long-term commitment, and the deepest economic relationship (full patronage). An RtC generational agreement would formalize what Class 1 membership already implies: mutual commitment to the collective's provisioning capacity.

### Where It Doesn't

**Class 4 (Investor) has no RtC mapping.** The RtC framework is explicitly bilateral — participants both contribute to AND draw from provisioning. An investor who contributes capital but doesn't draw from provisioning modules is outside the RtC relationship. This isn't a problem; it just means investor membership is a parallel structure, not an RtC term.

**The term pricing logic inverts.** In bond markets, longer terms get lower rates because the issuer values commitment predictability. In RtC, longer terms get lower per-unit costs because the collective bears less uncertainty. But in the LCA, Class 1 membership (the "longest term") has the HIGHEST contribution requirements (full stock purchase + ongoing patronage). The economics run opposite.

*Decision point:* If RtC term pricing is implemented, does the Class 1 contribution rate decrease (rewarding long-term commitment) or do shorter-term classes get surcharges (reflecting the collective's higher cost of serving transient participants)? The framing matters for equity — a surcharge on short-term participation penalizes those with the least capacity for long-term commitment.

---

## 5. Patronage Engine Integration

The existing patronage engine (`patronage-formula.ts`) can serve as the contribution accounting backbone for RtC with specific extensions.

### What Already Works

- **Weighted contribution tracking:** The engine already calculates `member_weighted_contribution = sum(contribution_value * category_weight)` across configurable categories. Adding RtC contribution types means extending the weight configuration, not redesigning the formula.
- **Multi-period accumulation:** `MultiPeriodPatronageAccumulator` tracks patronage across accounting periods. RtC modules would need multi-period tracking of provisioning contributions — same pattern.
- **Allocation verification:** `verifyAllocations()` ensures totals balance and cash rates meet IRC 1385 minimum (20%). This compliance infrastructure transfers to RtC provisioning accounting.
- **Capital accounts:** Each member's capital account already tracks contributions, allocations, distributions, and equity. RtC provisioning balances could live in an extended account view.

### What Needs Extension

1. **New ContributionType values.** Currently: `labor`, `expertise`, `capital`, `relationship`. RtC would add: `stewardship`, `attention`, and potentially module-specific types (`food_provisioning`, `energy_provisioning`).

2. **Module-scoped accounting.** The engine currently calculates one patronage percentage per member across all contributions. RtC needs module-scoped calculation: "what did this member contribute to the Food module specifically?" This means either running the engine separately per module or adding a module dimension to contribution inputs.

3. **Provisioning draw tracking.** Patronage is allocation OF surplus. RtC has an additional flow: provisioning DRAW — what did this member consume from the modules they participate in? The engine needs a consumption/draw side, not just a contribution side. This is new.

4. **Sufficiency verification.** RtC modules commit to a provisioning standard ("enough food for nutritional adequacy"). The engine needs a way to verify that the collective's provisioning capacity meets the committed standard — essentially, can the pool cover the draw?

5. **Solidarity reserves.** A percentage of contributions flowing into an emergency fund (the RtC "solidarity pool"). The engine would need to split contributions between direct provisioning allocation and reserve accumulation.

### Proposed Architecture

```
Existing patronage engine (enterprise)
  ├── Labor contributions → allocation
  ├── Revenue contributions → allocation  
  ├── Capital contributions → allocation
  └── Community contributions → allocation

New provisioning engine (RtC modules)
  ├── Module: Food
  │   ├── Contributions (capital, labor, stewardship)
  │   ├── Provisioning capacity (supply contracts, land, inventory)
  │   ├── Draws (what members consume)
  │   └── Solidarity reserve (% of contributions)
  ├── Module: Energy
  │   └── (same structure)
  └── Module: Knowledge
      └── (same structure)

Shared infrastructure
  ├── Capital accounts (extended with provisioning balances)
  ├── Multi-period accumulation
  └── Allocation verification (extended with sufficiency checks)
```

The two engines share infrastructure but run independently. Enterprise patronage allocates surplus. Provisioning accounting tracks module contributions and draws. Both feed into the same capital account view.

*Decision point:* Does the FSC want a single unified formula (enterprise + provisioning contributions all weighted together), or two parallel systems with a shared accounting substrate? The unified approach is simpler but blurs the distinction between enterprise value and provisioning value.

---

## 6. The Institutional Pathway: Where RtC Fits

P338 identified a progression: **LCA → composable tools → purpose trust → Bioregional Financing Facility**. Where does the Right to Commons fit?

### The Progression, Updated

```
RegenHub LCA (current)
  "Cultivating scenius" — venture studio, patronage accounting, 
  collaborative infrastructure
     │
     ▼
Composable Tools (building now)
  Habitat patronage engine, Treasury, People, Agreements — 
  REA ontology, event-sourced, any organization can use them
     │
     ▼
Right to Commons Agreement (this sprint)          ◄── NEW LAYER
  Modular provisioning framework applied within 
  the cooperative, using composable tools for 
  contribution and provisioning accounting
     │
     ▼
Purpose Trust (next legal structure)
  Wyoming perpetual purpose trust whose PURPOSE 
  is the Right to Commons — securing access to 
  basic needs through commons-based provisioning. 
  Holds land, infrastructure, provisioning contracts.
     │
     ▼
Bioregional Financing Facility (federation scale)
  Network of purpose trusts + cooperatives + CLTs 
  across the Front Range, coordinating provisioning 
  at bioregional scale. RtC agreements portable 
  across federation members.
```

**The key insight:** RtC is not parallel to the institutional pathway — it is the content that gives the purpose trust its purpose. The trust is the legal vehicle; the RtC agreement is what the vehicle carries. Without RtC (or something like it), a purpose trust is an empty container. Without the trust, RtC agreements depend on the continued existence and solvency of a single cooperative.

The composable tools (Habitat) are the accounting infrastructure that makes both the trust and the RtC agreement operable. The patronage engine tracks contributions. The Treasury manages provisioning pools. The Agreements module holds the RtC terms. The People module tracks participants across membership classes and RtC term structures.

This is the Techne thesis at work: "we recognize which patterns a problem requires and compose them with fluency and care." The RtC agreement is a composition of existing patterns (cooperative membership, patronage accounting, trust law, bioregional provisioning) into something that doesn't exist yet but is made of things that do.

---

## 7. Commons Provisioning Index for Boulder County — Sketch

The RtC framework proposes a regional metric — the Commons Provisioning Index (CPI) — that quantifies the real cost of securing basic needs through commons-based provisioning. What would this look like for Boulder County?

### Data Sources Available

| Module | Data Source | Current Access |
|---|---|---|
| Water | USGS stream gauges (Boulder Creek, St. Vrain) | **Active** — watershed dashboard collects this daily |
| Water | SNOTEL snowpack data | **Active** — watershed dashboard |
| Water | City of Boulder water rates | Public — published annually |
| Food | USDA Food Atlas — food access indicators | Public — county-level data |
| Food | Boulder County Farmers Market prices | Collectable — seasonal survey |
| Shelter | Boulder County Assessor — property values | Public — but massive dataset |
| Shelter | HUD Fair Market Rents | Public — annual |
| Shelter | Boulder Housing Partners waitlist data | Partially public |
| Energy | Xcel Energy rate schedules | Public — published quarterly |
| Energy | Colorado PUC solar incentive data | Public |
| Health | Colorado DORA provider density | Public |
| Health | Boulder County Public Health reports | Public — annual |
| Knowledge | CU Boulder enrollment/access data | Partially public |
| Knowledge | Library usage statistics | Public — annual report |
| Connectivity | FCC broadband availability maps | Public |
| Care | None formally collected | Gap |

### Sketch: Boulder County CPI Components

```
Boulder County Commons Provisioning Index (CPI-BC)
├── Water Access Score
│   ├── Municipal rate per 1000 gal (City of Boulder)
│   ├── Watershed health (Boulder Creek flow ratio vs historical median)
│   ├── Snowpack adequacy (SNOTEL % of median)
│   └── % population served by cooperative/municipal vs private utility
│
├── Food Access Score
│   ├── Average CSA share cost (annual, normalized per person)
│   ├── Farmers market availability (markets per 10k population)
│   ├── Community garden plot availability (plots per 10k)
│   ├── Food bank utilization rate
│   └── % food budget coverable through cooperative supply
│
├── Shelter Stability Score
│   ├── Median rent / median income ratio
│   ├── % housing stock in commons structures (CLT, co-op, public)
│   ├── Housing voucher coverage rate
│   ├── Waitlist length (Boulder Housing Partners)
│   └── Cooperative housing unit availability
│
├── Energy Access Score
│   ├── Residential electricity rate ($/kWh)
│   ├── Community solar penetration (% households with access)
│   ├── Energy burden (% income spent on energy, lower quintile)
│   └── Renewable energy share of local generation
│
├── Health Access Score
│   ├── Primary care providers per 10k population
│   ├── Uninsured rate
│   ├── Mental health provider availability
│   └── Cooperative/community clinic availability
│
├── Knowledge Access Score
│   ├── Library cards per capita
│   ├── Apprenticeship/skill-share programs per 10k
│   ├── Public education spending per student
│   └── Digital learning resource access rate
│
├── Connectivity Score
│   ├── Broadband coverage (% addresses with 100+ Mbps)
│   ├── Cooperative ISP availability
│   ├── Digital literacy program enrollment
│   └── Device access rate (% households with computing device)
│
└── Care Access Score
    ├── Licensed childcare slots per child under 6
    ├── Elder care facility availability
    ├── Time bank participation rate
    └── Care worker compensation ratio (vs. median income)
```

### What the CPI Would Reveal

Initial hypothesis: Boulder County would score high on Knowledge, Connectivity, and Energy access — and low on Shelter and Care affordability. The index would make visible what most Boulder residents already feel: the bioregion has excellent knowledge infrastructure and growing energy commons, but housing costs undermine the stability that other modules depend on.

The watershed data already collected for the solar audit practice provides the Water module's ecological foundation. Expanding data collection to the other modules is feasible but requires a systematic effort — probably a dedicated sprint series.

### Cross-Regional Comparison

The CPI framework is designed for cross-regional comparison. A Boulder County CPI could be compared against other Front Range communities (Fort Collins, Denver, Colorado Springs) to reveal where provisioning gaps exist and where cooperative infrastructure is strongest. This is the basis for the federation model: regions with strong Food provisioning and weak Shelter could federate with the inverse, creating mutual support.

---

## 8. Decision Points Summary

For the Financial Systems Committee and organizers to evaluate:

### Immediate Decisions

1. **First module selection:** Knowledge (internal demonstration), Energy (measurable, potentially self-funding), or Food (public legibility)?

2. **Contribution model:** Add attention and stewardship as formal patronage categories (requires 704(b) defensibility), or track them separately from the allocation formula?

3. **Legal structure:** Expand LCA purpose (simplest, risks mission dilution) or begin purpose trust formation (cleaner, more complex)?

### Near-Term Decisions (Q2-Q3 2026)

4. **Engine integration:** Unified formula (enterprise + provisioning in one patronage calculation) or parallel systems with shared accounting substrate?

5. **Term structure pricing:** Does long-term commitment earn lower per-unit provisioning cost, and if so, how does this interact with existing membership fee structures?

6. **Solidarity reserve parameters:** What percentage of provisioning contributions flow to emergency reserves? Who governs disbursement?

### Strategic Decisions (2026-2027)

7. **CPI data collection:** Invest in building the Boulder County Commons Provisioning Index? This is a significant data infrastructure project but would be the first regional CPI anywhere.

8. **Federation path:** When and how to approach other Boulder County cooperatives, land trusts, and community organizations about a bioregional provisioning federation?

9. **Purpose trust formation:** Engage Jeff Pote on Wyoming perpetual purpose trust formation with RtC as the trust's purpose? Timeline and cost?

---

## 9. What This Is Not

This document does not propose that RegenHub immediately begin provisioning food, housing, or healthcare to its members. The cooperative is 8 weeks old with 8 organizers. What it does propose:

- The Right to Commons framework is structurally compatible with the cooperative's existing infrastructure
- The patronage engine can be extended to support provisioning accounting
- The institutional pathway (LCA → tools → trust → BFF) now has a specific purpose to carry
- A first module (Knowledge) could formalize what the studio already does
- The CPI concept could produce the first regionally grounded provisioning index, built on data infrastructure that already exists

The decisions belong to the organizers and the FSC. This analysis surfaces the connections and the choices.

---

*Nou · nou.habitat.eth · Agent #2202*
*Sprint P343 · April 1, 2026*

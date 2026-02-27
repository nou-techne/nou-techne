# Economic Memory System: Operationalization Roadmap

**RegenHub, LCA — Techne Studio**  
*Technology and Information Office (TIO) — Dependency-Driven Planning*  
*February 2026*

---

## Planning Model

**Development Mode:** Agent-Driven (Dependency-Based) with Human-Coordination Anchors

**Why not pure time estimates:** Agent-driven development has different constraints than human labor — near-unlimited parallel capacity, near-zero coordination overhead, state-persistent context switching. Time estimates create false precision and obscure actual constraints.

**Why 30-60-90 phases exist here:** Three external human-coordination gates create real time anchors that the dependency tree must compose around:

| Gate | When | What unlocks |
|------|------|-------------|
| **TIME-BOUND: FSC convenes** | March 2, 2026 | Patronage weights ratified, royalty pool % set, vesting parameters decided |
| **TIME-BOUND: Legal review** | ~4-6 weeks post-FSC | Operating agreement patronage + royalty articles, royalty unit classification, IP ownership |
| **TIME-BOUND: First period close** | First complete accounting period | Member K-1s, QWNs, real capital account statements |

These gates do not constrain agent work — they create the parameter inputs that agent work depends on. The dependency tree below makes this explicit.

**Release Triggers:** Feature completion + readiness criteria (not calendar dates). The 30-60-90 labels indicate expected human coordination tempo, not sprint durations.

---

## System Overview: What We Are Building

The **Economic Memory System** is the central nervous system of RegenHub, LCA — three coordinated tiers that together make multi-capital contribution visible, distributable, and persistent across time:

```
┌─────────────────────────────────────────────────────────┐
│                   EQUITY (long memory)                   │
│  Permanent stake in cooperative entity + venture pool   │
│  Governed by: Capital accounts / Sub K / 704(b)        │
├─────────────────────────────────────────────────────────┤
│                 ROYALTIES (medium memory)                │
│  Revenue share from tool/service contributions          │
│  Triggered by: Service revenue events (not licensing)   │
│  Builder units: vest on service first revenue           │
│  Formalizer units: vest on pattern.adopted              │
├─────────────────────────────────────────────────────────┤
│                 PATRONAGE (current memory)               │
│  Period-based surplus allocation by contribution weight  │
│  Weights: Labor 40% / Revenue 30% / Cash 20% / Community 10% │
│  Governed by: IRC §1385, 704(b) substantiality test    │
└─────────────────────────────────────────────────────────┘
                           │
              Digital Trust Agreements Engine
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    Member Dashboard    FSC Dashboard   Bylaws Tool
```

All three tiers are outputs of one engine: the **Digital Trust Agreements Engine** — a shared REA (Resource-Event-Agent) event-sourced accounting system configured differently for each memory tier.

---

## Dependency Tree

```
Level 0: External prerequisites (human-paced)
├── FSC parameters ratified (patronage weights, royalty pool %, vesting rules)
├── Legal review: royalty unit classification (securities? tax treatment?)
├── Legal review: operating agreement patronage + royalty articles
├── IP ownership established in operating agreement
└── Supabase admin access resolved (blocks all database migrations)

Level 1: Schema Layer [prerequisite: Supabase access]
├── SCHEMA-A: Members + Membership Classes
├── SCHEMA-B: Contributions (multi-capital metadata, royalty-eligibility flag)
├── SCHEMA-C: Royalty Assets + Unit Ledger (builder/formalizer registry)
├── SCHEMA-D: Capital Accounts (book basis, tax basis)
├── SCHEMA-E: Revenue Events (venture_id, asset_id, amount, period)
└── SCHEMA-F: Patronage Periods (weights, status, member allocations)

Level 2: REA Event Grammar [prerequisite: Schema Layer]
├── EVENT-A: contribution.created (with multi-capital category flags)
├── EVENT-B: royalty_asset.registered + royalty_unit.issued
├── EVENT-C: royalty_unit.vested (builder: service_live / formalizer: pattern.adopted)
├── EVENT-D: revenue.recognized (venture reports revenue event)
├── EVENT-E: royalty.distributed (pool → unit holders, pro-rata)
├── EVENT-F: patronage.allocated (period close → weighted allocation)
├── EVENT-G: capital_account.credited / debited
├── EVENT-H: period.opened / period.closed
└── EVENT-I: qualified_notice.issued (IRC §1385 QWN generation)

Level 3: Core Engines [prerequisite: Event Grammar + FSC parameters]
├── ENGINE-A: Patronage Engine
│   ├── Formula calculator (weighted-sum, per-category)
│   ├── Period management (open / snapshot / close)
│   ├── Contribution ingestion (from commons.id contributions table)
│   ├── Allocation calculator (per-member, per-category)
│   └── Qualified Written Notice generator
│
└── ENGINE-B: Royalty Engine [prerequisite: Event Grammar + legal review]
    ├── Asset registry (register royalty-eligible contributions)
    ├── Unit issuance (builder units immediate / formalizer units pending)
    ├── Revenue event listener (venture revenue → trigger distribution)
    ├── Distribution calculator (pro-rata by units held)
    └── Vesting resolver (service_live / pattern.adopted events)

Level 4: Capital Accounts [prerequisite: Both Engines]
├── Book capital account (economic interest, 704(b) basis)
├── Tax capital account (IRS-reportable basis, 704(c) layers)
├── Period-close snapshot
└── K-1 data assembly

Level 5: Digital Trust Agreements Engine [prerequisite: Capital Accounts]
├── Agreement template system (configure patronage / royalty / equity rules)
├── Member agreement execution (digital signature on economic terms)
├── Parameter versioning (record FSC weight changes with rationale)
└── Full audit trail (all economic events, all parameter changes)

Level 6: View Layer [prerequisite: Agreements Engine]
├── VIEW-A: FSC Decision Dashboard (bylaws tool — parameterize before Level 3)
├── VIEW-B: Member Economic Dashboard (contribution → allocation → royalty → K-1)
├── VIEW-C: Royalty Asset Registry (public view of royalty-eligible IP)
└── VIEW-D: Period Close Report (board-level summary per accounting period)
```

**Note on VIEW-A:** The FSC Decision Dashboard can be built at Level 1 (it only needs schema outlines and proposed parameters) and deployed before the engines exist. It is the human interface that produces the inputs the engines depend on.

---

## Agent RACI Matrix

Each sprint is assigned to a TIO agent role. Multiple roles execute in parallel on independent sprints.

| Sprint | TIO Role | R | A | C | I |
|--------|----------|---|---|---|---|
| SCHEMA-A through F | Schema Architect | Schema Architect | Technical Lead | Backend Engineer, Compliance | Product Engineer |
| EVENT-A through I | Event Systems Engineer | Event Systems Eng | Technical Lead | Schema Architect, Backend | Compliance, QA |
| ENGINE-A: Patronage | Backend Engineer | Backend Engineer | Technical Lead | Schema Architect, Compliance | Product Engineer |
| ENGINE-B: Royalty | Backend Engineer | Backend Engineer | Technical Lead | Integration Eng, Legal (ext) | Product Engineer |
| Capital Accounts | Backend Engineer | Backend Engineer | Technical Lead | Compliance, Schema Architect | QA |
| Agreements Engine | Backend Engineer | Backend Engineer | Technical Lead | All roles | All |
| FSC Dashboard | Frontend/DevOps | Frontend/DevOps | Product Engineer | Backend Engineer | FSC members |
| Member Dashboard | Frontend/DevOps | Frontend/DevOps | Product Engineer | Backend Engineer | Members |
| Compliance Audit | Compliance/Security | Compliance Eng | Technical Lead | Legal (ext) | All |
| Testing/Simulation | QA/Test Engineer | QA Engineer | Technical Lead | All roles | Product Engineer |
| Operating Agreement | Technical Writer | Tech Writer | Product Engineer | Legal (ext) | Organizers |

**Parallel execution opportunities:**
- SCHEMA-A through F can execute simultaneously (independent tables)
- EVENT-A through I can begin as soon as schemas are approved (independent event types)
- VIEW-A (FSC Dashboard) can begin immediately — it reads proposed parameters, not live data
- ENGINE-A and ENGINE-B can execute in parallel after Event Grammar is complete
- Technical Writer begins operating agreement draft sections as soon as legal classification is confirmed — does not need engines complete

---

## Phase 1: Foundation

**Trigger to begin:** Supabase admin access resolved (S32 unblocked)  
**Trigger to complete:** FSC parameters ratified + schemas approved + Event Grammar validated  
**Human coordination anchor:** FSC convenes March 2, 2026

### Active Prerequisites (Resolve Now)

These are current sprint queue blockers that must clear before Phase 1 technical work can begin:

| Item | Status | Owner | Unblocks |
|------|--------|-------|---------|
| S32: Supabase admin access | BLOCKED | Todd (admin creds) | All database migrations |
| S125: Chain integrity at seq 1 | ACTIVE | Event Systems Eng | Audit trail credibility |
| S127: Artifact navigation fix | ACTIVE | Backend Engineer | Contribution ingestion |
| S128: Contribution processing edge fn | ACTIVE | Backend Engineer | Patronage ingestion |
| S129: NLP extraction speed | ACTIVE | Backend Engineer | Throughput at scale |

### Sprint F-1: Schema Design

**TIO Role:** Schema Architect  
**Prerequisites:** Supabase access, FSC parameters (or proposed values as placeholders)  
**Runs in parallel with:** F-2 (Event Grammar design)  

**Deliverables:**
- DDL migrations for all six schema domains (A–F above)
- ER diagram (Mermaid) showing entity relationships across bounded contexts
- Data dictionary: field definitions, constraints, enum values
- REA ontology mapping: which tables are Resources, Events, Agents
- RLS policy stubs (completed in Compliance sprint)

**Completion criteria:**
- All tables created in staging environment
- Foreign key constraints validated
- Schema reviewed and approved by Technical Lead
- No naming conflicts with existing commons.id tables

---

### Sprint F-2: REA Event Grammar

**TIO Role:** Event Systems Engineer  
**Prerequisites:** Schema design complete (F-1)  
**Runs in parallel with:** F-3 (FSC Dashboard)

**Deliverables:**
- Event type registry (all EVENT-A through I defined)
- Event schema: `{event_type, agent_id, resource_id, quantity, metadata, timestamp, chain_seq}`
- Event sourcing pattern: append-only log with hash-chain integrity
- Extension of existing commons.id chain infrastructure for economic events
- Onchain anchoring strategy: which events get Base L2 anchoring (issuance, distribution, period close)

**Completion criteria:**
- All nine event types processable by the event bus
- Chain integrity maintained (no gaps, no reordering)
- Test suite: emit each event type, verify chain state

---

### Sprint F-3: FSC Decision Dashboard (bylaws tool)

**TIO Role:** Frontend/DevOps  
**Prerequisites:** None (reads proposed parameters only)  
**Runs in parallel with:** F-1, F-2  
**TIME-BOUND:** Must be live before March 2, 2026 FSC meeting

**Deliverables:**
- New section in the RegenHub Bylaws and Ops tool: "FSC Decision Space"
- Eight decisions surfaced with current proposed values, IRC constraints, and space for FSC vote
- Patronage decisions: weight sliders (must sum to 1.0), minimum threshold, maximum cap, class tiers
- Royalty decisions: pool percentage, builder/formalizer default split, vesting trigger, decay function
- Distribution decisions: cash vs. retained ratio (≥20% cash required per §1385), period frequency
- Policy decisions: redemption policy, surplus/loss symmetry
- Impact calculator: change a weight → see how it shifts allocation across member classes
- Signal layer: FSC members can mark each decision Proposed/Accepted/Needs Discussion
- Export: produce a ratification document from completed signals

**Completion criteria:**
- All eight decision categories displayed with proposed values
- Calculator shows live impact when parameters change
- Signal layer functional for FSC members
- Exports ratification document in markdown

---

### Sprint F-4: Patronage Formula Explainer + Legal Open Questions Tracker

**TIO Role:** Technical Writer  
**Prerequisites:** None (content only)  
**Runs in parallel with:** All F-sprints

**Deliverables:**
- Patronage formula worked example: three members, one quarter, four categories, full calculation walkthrough
- 704(b) substantiality documentation: what it requires, what the rationale field must contain
- Royalty legal open questions tracker (surface in bylaws tool as a "Legal Review" section):
  - Royalty unit tax classification (special allocation vs. guaranteed payment)
  - Securities classification risk and labor-earned defense
  - IP ownership in operating agreement
  - Departure treatment for royalty units
- Operating agreement patronage article draft (skeleton for Jeff Pote's review)
- Operating agreement royalty article draft (skeleton — builder/formalizer model, vesting, departure)

---

## Phase 2: Alpha

**Trigger to begin:** Phase 1 complete (schemas approved, event grammar validated, FSC parameters ratified)  
**Trigger to complete:** First simulated patronage period calculated end-to-end with real contribution data  
**Human coordination anchor:** Legal review engagement initiated with counsel

### Sprint A-1: Patronage Engine

**TIO Role:** Backend Engineer  
**Prerequisites:** F-1 (schema), F-2 (event grammar), FSC parameters ratified  
**Runs in parallel with:** A-2 (Royalty Engine skeleton), A-3 (Compliance audit)

**Deliverables:**
- Formula calculator: weighted-sum across all four categories per member per period
- Period management: `open_period()`, `snapshot_period()`, `close_period()`
- Contribution ingestion pipeline: pull from commons.id contributions table, map to patronage categories
- Allocation calculator: per-member allocation as percentage of period surplus
- 704(b) rationale store: attach business rationale to each weight configuration
- Surplus computation: net patronage income for the period (revenue - deductible expenses)
- Minimum threshold enforcement: zero allocation below participation floor
- Maximum cap enforcement: concentration ceiling per member

**Completion criteria:**
- Given: three test members with defined contributions across four categories and a period surplus
- Expected: correct weighted-sum allocation, summing to 100% of distributable surplus
- Audit trail: every allocation event is logged as EVENT-F in the event chain
- Edge cases: member with zero contributions, member who joined mid-period, loss period

---

### Sprint A-2: Royalty Engine (skeleton)

**TIO Role:** Backend Engineer  
**Prerequisites:** F-1 (schema), F-2 (event grammar)  
**Note:** Full vesting + distribution held for Phase 3 pending legal review  
**Runs in parallel with:** A-1

**Deliverables:**
- Asset registry: register a contribution as royalty-eligible with metadata (builder, formalizer, category, valuation basis)
- Unit issuance: calculate units from contribution value, issue EVENT-B
- Builder vesting state machine: PENDING → VESTED on `service.live` event
- Formalizer vesting state machine: PENDING → VESTED on `pattern.adopted` event
- Co-holder split recording: builder/formalizer default split (configurable; default 70/30)
- Unit ledger: who holds how many units in which asset

**Completion criteria (alpha scope):**
- Register a royalty-eligible contribution, issue units, confirm ledger
- Builder units vest when `service.live` event fires
- Formalizer units remain PENDING until `pattern.adopted`
- Revenue event receipt and distribution calculation is mocked (real distribution in Phase 3)

---

### Sprint A-3: Compliance and Security

**TIO Role:** Compliance/Security Engineer  
**Prerequisites:** F-1 (schema), F-2 (event grammar)  
**Runs in parallel with:** A-1, A-2

**Deliverables:**
- RLS policies for all economic tables (member can see own capital account; board can see all; public sees nothing)
- IRC §1385 compliance check: validate that any proposed distribution meets 20% cash minimum
- 704(b) substantiality check: validate that weight rationale is documented before period close is permitted
- Audit log: all capital account mutations logged with actor, timestamp, event_id
- Privacy: capital account balances not publicly visible; royalty positions require member auth
- API security: all economic endpoints require authenticated session

**Completion criteria:**
- RLS policies tested: member A cannot read member B's capital account
- §1385 check blocks period close if cash ratio < 20%
- 704(b) check blocks period close if weight rationale is missing
- All mutations appear in audit log

---

### Sprint A-4: Book Capital Accounts

**TIO Role:** Backend Engineer  
**Prerequisites:** A-1 (Patronage Engine), A-2 (Royalty Engine skeleton)  
**Note:** Tax basis (704(c)) held for Phase 3; book basis only in Alpha

**Deliverables:**
- Book capital account per member: running balance of economic interest
- Credit events: admission contribution, patronage allocation, royalty distribution
- Debit events: distribution to member (cash), membership withdrawal
- Revaluation trigger: when new members are admitted, mark all accounts for revaluation
- Period-close snapshot: immutable snapshot of all balances at period end
- Member-facing balance API: authenticated endpoint returning current + historical balances

**Completion criteria:**
- Run a complete simulated period: admit members, record contributions, close period, view balances
- Patronage allocation credits appear in capital accounts
- Period-end snapshot is immutable (no retroactive edits)
- Revaluation event fires when new member is admitted

---

### Sprint A-5: Alpha Integration Test

**TIO Role:** QA/Test Engineer  
**Prerequisites:** A-1, A-2, A-3, A-4 complete  

**Deliverables:**
- Simulation dataset: 8 test members (matching RegenHub founding organizers), 90 days of synthetic contribution data, one period of surplus
- End-to-end test: contributions → patronage calculation → capital account credits → period close → balance snapshot
- Royalty test: register asset → issue units → fire `service.live` → fire simulated revenue event → verify distribution calculation (mocked payout)
- Compliance test: attempt period close without cash ratio → confirm blocked; attempt without rationale → confirm blocked
- Performance baseline: 100 contribution events processed per second

**Completion criteria (Alpha gate):**
- All test members have correct capital account balances after simulated period
- Patronage allocations sum to exactly 100% of surplus
- Royalty unit ledger is correct after vesting
- Compliance checks pass/block appropriately
- Full audit trail from contribution to balance change is verifiable

---

## Phase 3: Beta

**Trigger to begin:** Alpha tests passing + legal review complete (royalty unit classification, IP ownership, operating agreement articles)  
**Trigger to complete:** First real accounting period closed with real member data, QWNs issued

### Sprint B-1: Revenue Event Pipeline

**TIO Role:** Integration Engineer  
**Prerequisites:** A-2 (Royalty Engine), legal review complete  
**Runs in parallel with:** B-2, B-3

**Deliverables:**
- Revenue event intake: ventures report revenue events via API (venture_id, asset_id, amount, period)
- Revenue attribution: map revenue events to royalty assets (which tool/service generated this revenue?)
- Multi-asset attribution: if revenue is attributable to multiple assets, split by configurable ratio
- External venture reporting: webhook or pull-based mechanism for ventures outside the cooperative to report
- Revenue validation: board-level approval flow before distribution fires
- First real distribution: Habitat tool reports first revenue → royalty units begin distributing

**Completion criteria:**
- Simulated revenue event from a venture triggers distribution calculation
- Multi-asset revenue correctly split
- Board approval flow works before distribution executes
- First real revenue event from a live venture processed end-to-end

---

### Sprint B-2: Tax Capital Accounts + K-1 Assembly

**TIO Role:** Backend Engineer  
**Prerequisites:** A-4 (book capital accounts), legal review complete  
**Runs in parallel with:** B-1, B-3

**Deliverables:**
- Tax capital account (IRS-reportable basis, distinct from book)
- 704(c) layer tracking: when member contributes appreciated property, record built-in gain per contributor
- Book-tax reconciliation: at period close, compute difference between book and tax allocations
- K-1 data assembly: Line 1 (ordinary income/loss), royalty income, capital account beginning/ending
- QWN generation: Qualified Written Notice per member per period (total allocation, cash portion, retained portion, member consent requirement)

**Completion criteria:**
- Given a period with one property contributor and two cash contributors: correct 704(c) allocation
- K-1 data fields populated for a simulated period
- QWN document generated per member showing correct cash vs. retained split
- Book-tax reconciliation shows zero difference for cash-only periods, correct divergence for property contributions

---

### Sprint B-3: Digital Trust Agreements Engine

**TIO Role:** Backend Engineer  
**Prerequisites:** A-1 (Patronage), A-2 (Royalty), A-4 (Capital Accounts)  
**Runs in parallel with:** B-1, B-2

**Deliverables:**
- Agreement template system: configure patronage parameters, royalty parameters, equity rules as a versioned document
- Member agreement execution: digital signature workflow on economic terms
- Parameter versioning: every FSC parameter change recorded with rationale, effective date, and FSC ratification reference
- Agreement lineage: which version of the agreement governs which period
- Cross-reference: each period close cites the agreement version in effect

**Completion criteria:**
- Member signs economic terms → agreement recorded with timestamp + member auth
- FSC changes weights → new agreement version created with rationale → old version remains immutable
- Period close cites correct agreement version

---

### Sprint B-4: Member Economic Dashboard

**TIO Role:** Frontend/DevOps  
**Prerequisites:** B-1, B-2, B-3 complete  

**Deliverables:**
- Member-authenticated view of the complete economic arc:
  - Contribution history (with multi-capital category breakdown)
  - Capital account balance (book + tax, current + per-period history)
  - Patronage allocation history (per period: how much, why)
  - Royalty position (which assets, how many units, vesting status, distributions received)
  - K-1 preview (current period data before year-end)
- Period close notification: member receives QWN with consent required to include retained allocation in income
- Public royalty asset registry: open view of royalty-eligible IP in the cooperative, builder/formalizer attribution

**Completion criteria:**
- Member logs in, sees complete economic history from admission
- Period close triggers QWN delivery and consent capture
- Royalty asset registry shows all registered assets with attribution

---

### Sprint B-5: Beta Integration Test + First Real Period Close

**TIO Role:** QA/Test Engineer  
**Prerequisites:** All B-sprints complete  
**TIME-BOUND:** Triggered by first real accounting period end

**Deliverables:**
- First real period close: real contributions from commons.id → real patronage calculation → real capital account credits → real QWNs to real members
- Royalty verification: confirm first revenue events attributed correctly
- Tax reconciliation: confirm book-tax values are correct for legal review
- Board report: Period close summary for Board review

**Completion criteria (Beta gate):**
- All founding organizers have received their period close statements
- QWNs delivered and consent recorded
- Capital account balances reviewed and approved by Board
- No discrepancies between event chain and dashboard display

---

## Phase 4: General Availability Triggers

**Trigger:** Beta complete + operating agreement fully executed + two consecutive periods clean

**GA Feature Additions:**
- Decay function activation (royalty units begin aging per FSC-set curve)
- Cross-venture royalty flow (venture A pattern → revenue in venture B → royalty chain)
- Onchain anchoring of period closes and distributions (Base L2)
- Annual Benefit Report tooling (auto-generate from period close data)
- Agent membership pathway (legal classification resolved → agents hold capital accounts)
- External network revenue events (pattern adopted outside cooperative → revenue attributed)

---

## Parallel Execution Map

This is how agent workstreams run simultaneously:

```
Week 1-2 (Pre-FSC)
├── [Frontend/DevOps]     FSC Dashboard (F-3) ←── PRIORITY: live by March 2
├── [Technical Writer]    Operating agreement drafts (F-4)
├── [Schema Architect]    Schema design (F-1) ←── unblocks on Supabase access
└── [Event Systems Eng]   Event grammar design (F-2) ←── starts in parallel with F-1

Week 3-4 (Post-FSC)
├── [Backend Engineer]    Patronage Engine (A-1)
├── [Backend Engineer]    Royalty Engine skeleton (A-2) ←── same agent, different context
├── [Compliance Eng]      RLS + compliance checks (A-3)
└── [Technical Writer]    Sends operating agreement drafts to legal counsel

Week 5-6
├── [Backend Engineer]    Capital Accounts book basis (A-4)
└── [QA Engineer]         Alpha simulation dataset + tests (A-5)

Week 7-8 (Post-legal review)
├── [Integration Eng]     Revenue event pipeline (B-1)
├── [Backend Engineer]    Tax capital accounts + K-1 (B-2)
└── [Backend Engineer]    Agreements Engine (B-3)

Week 9-10
├── [Frontend/DevOps]     Member Economic Dashboard (B-4)
└── [QA Engineer]         Beta integration test (B-5)

Week 11-12 (First real period close)
└── [All roles]           Beta gate: real period close, QWNs, board report
```

---

## Success Criteria (Outcome-Based)

### Foundation Complete
- FSC parameters ratified and recorded in the bylaws tool signal layer
- Six schema domains deployed to staging, foreign keys validated
- Nine event types processable, chain integrity maintained
- FSC Decision Dashboard live and used in the March 2 meeting

### Alpha Complete
- Simulated patronage period calculated correctly for 8 test members
- Royalty unit ledger correct after vesting simulation
- Compliance checks block non-compliant period closes
- Full audit trail from contribution to capital account balance

### Beta Complete
- First real accounting period closed for real members
- All founding organizers have received QWNs
- At least one real revenue event attributed to a royalty asset and distributed
- K-1 data assembled and reviewed by counsel
- Member Economic Dashboard live with real data

### GA Complete
- Two consecutive clean period closes
- Operating agreement fully executed (all members signed)
- Decay function calibrated from real data
- Annual Benefit Report generated from system data

---

## Open Legal Prerequisites

These items are prerequisites for specific sprints and must be resolved by external parties. The TIO agent workstream cannot substitute for legal review.

| Item | Blocks | Owner | Urgency |
|------|--------|-------|---------|
| Royalty unit tax classification (special allocation vs. guaranteed payment, 704(b) test) | ENGINE-B real distribution | Legal counsel | Before Beta |
| Securities classification risk assessment (Howey test, labor-earned defense) | ENGINE-B issuance | Legal counsel | Before Alpha-complete |
| IP ownership language in operating agreement | ENGINE-B (who gets royalty units) | Counsel + organizers | Before Beta |
| Departure treatment for royalty units (forfeited / bought back / retained) | Capital accounts (B-2) | Counsel + organizers | Before Beta |
| Operating agreement patronage article ratification | Agreements Engine (B-3) | Counsel + Board | Before Beta |

---

## Document Lineage

This roadmap is operationalized from:
- **Gap Analysis:** `strategy/regenhub-theory-to-practice-gap-analysis.md`
- **TIO Procedure:** `TIO-PROC-001: Dependency-Driven Planning`
- **TIO Roles:** Schema Architect, Backend Engineer, Event Systems Engineer, Integration Engineer, Frontend/DevOps, Compliance/Security, QA/Test, Technical Writer, Technical Lead, Product Engineer
- **Existing Spec:** `coop-us-review/spec/` (patronage-formula, capital-accounts, rea-event-grammar, service-credits, distribution-mechanics, k1-data-assembly, period-close)
- **Current Sprint State:** SPRINT_QUEUE.md (S32-S129 status)

---

*Nou · Techne Collective Intelligence Agent · February 2026*  
*the-habitat.org | github.com/nou-techne/nou-techne*  
*TIO-PROC-001 compliant — dependency-driven, outcome-triggered*

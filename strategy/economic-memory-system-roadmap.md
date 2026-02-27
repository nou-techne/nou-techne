# Economic Memory System: Operationalization Roadmap

**RegenHub, LCA — Techne Studio**  
*Technology and Information Office (TIO) — Dependency-Driven Planning*  
*February 2026*

---

## Architecture: Habitat as Tool Augmentation

The economic memory system is not a separate application. It is built as the **Habitat layer** — a new audience group and set of components — augmenting the existing RegenHub Bylaws and Operations Tool at `roots-trust-lca.github.io/regenhub`.

### What Already Exists (Do Not Rebuild)

| Asset | Description | Relevance |
|-------|-------------|-----------|
| **React + Vite frontend** | `regenhub/app/src/` — tab navigation, DocumentViewer, BylawsTree | All Habitat UI is new React components in this tree |
| **Supabase project** | Auth + `signals` table — magic link auth, organizer allowlist, session management | All economic tables extend the same Supabase project |
| **Member identity** | `useAuth` hook — Supabase user session, profile (name, declared_role) | Capital account ownership = `user.id` in the existing auth system |
| **Signal layer** | `useSignals` hook — per-item Support/Oppose/Note/Concern | FSC Decision Dashboard reuses signal pattern for parameter ratification |
| **GitHub Pages deployment** | `npm run build` → `docs/` → pushed to `main` → live in minutes | All Habitat features deploy through the same pipeline |
| **Audience group nav** | `baseGroups` in App.jsx — Organizers / Investors+Partners | Habitat becomes a third audience group (or extends Organizers) |

### What the Habitat Layer Adds

```
Existing Tool                    +  Habitat Augmentation
─────────────────────────────────────────────────────────────
Governance layer (bylaws,        +  Economic layer (patronage,
  articles, member agreement,    +    royalties, capital accounts,
  signal layer, data room)       +    period close, member dashboard)
                                 +
Tab groups:                      +  New tab group:
  Organizers                     +    Habitat (auth-gated, all members)
  Investors / Partners           +
                                 +
Supabase tables:                 +  New Supabase tables:
  signals                        +    members, contributions_economic,
  profiles                       +    royalty_assets, royalty_units,
                                 +    capital_accounts, revenue_events,
                                 +    patronage_periods, event_chain
                                 +
Components:                      +  New components:
  BylawsTree                     +    HabitatNav, FscDashboard,
  DocumentViewer                 +    PatronageCalculator, RoyaltyRegistry,
  SignalPanel                    +    CapitalAccountView, MemberEconomicDash,
  SignalsAggregate                +    PeriodClosePanel, QwnDelivery
```

### Navigation Architecture

The Habitat group surfaces once a user is authenticated (any role). FSC-specific views are gated to `declared_role === "fsc_member"` or `"organizer"`. The full member economic dashboard is available to all authenticated members.

```javascript
// App.jsx addition (schematic)
{
  id: "habitat",
  label: "Habitat",
  tabIds: ["fsc", "patronage", "royalties", "capital", "member-dash", "period-close"],
}
```

### Data Flow

```
Member contribution records  ──►  economic contributions table (Supabase)
                                         │
                          ┌──────────────┼──────────────┐
                          ▼              ▼              ▼
                   Patronage Engine  Royalty Engine  Capital Accounts
                          │              │              │
                          └──────────────┴──────────────┘
                                         │
                                  event_chain table
                                  (append-only, hashed)
                                         │
                          ┌──────────────┼──────────────┐
                          ▼              ▼              ▼
                   FscDashboard  MemberEconomicDash  PeriodClosePanel
                   (React)       (React)             (React)
```

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
│   ├── Contribution ingestion (from member contribution records)
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
| S32: Supabase admin access (regenhub project) | BLOCKED | Todd (admin creds) | All Habitat table migrations |

**Note on Supabase:** The Habitat schema migrations extend the regenhub Supabase project alongside the existing `signals` and `profiles` tables. Admin access to this project is the primary gate for all schema work.

### Sprint F-1: Schema Design

**TIO Role:** Schema Architect  
**Prerequisites:** Supabase access (regenhub project), FSC parameters (or proposed values as placeholders)  
**Runs in parallel with:** F-2 (Event Grammar design)  
**Build target:** Supabase migrations in `regenhub/supabase/migrations/`

**Deliverables:**
- DDL migration files for all six schema domains (A–F), extending the existing regenhub Supabase project alongside `signals` and `profiles`
- Tables: `members`, `contributions_economic`, `royalty_assets`, `royalty_units`, `capital_accounts`, `revenue_events`, `patronage_periods`, `economic_events`
- ER diagram (Mermaid) showing relationships and foreign keys
- Data dictionary: field definitions, constraints, enum values
- RLS policy stubs — members see own rows; board sees all; anon sees nothing (completed in Compliance sprint A-3)
- `regenhub/app/src/lib/habitat.js` — Supabase client query helpers for all new tables (mirrors pattern of existing `supabase.js`)

**Completion criteria:**
- All tables created in regenhub Supabase project (staging/preview branch)
- Foreign key constraints validated, no naming conflicts with `signals` / `profiles`
- Schema reviewed and approved by Technical Lead
- Query helpers tested against live Supabase instance

---

### Sprint F-2: REA Event Grammar

**TIO Role:** Event Systems Engineer  
**Prerequisites:** Schema design complete (F-1)  
**Runs in parallel with:** F-3 (FSC Dashboard)  
**Build target:** `regenhub/supabase/functions/economic-events/` (Supabase Edge Function) + `economic_events` table

**Deliverables:**
- Event type registry in `regenhub/app/src/lib/eventTypes.js` — all EVENT-A through I as typed constants
- Event schema: `{ event_type, actor_id, resource_id, resource_type, quantity, metadata, chain_seq, prev_hash, hash, anchored_at }`
- `emit_economic_event()` Supabase function: appends to `economic_events`, computes hash, maintains chain integrity
- Append-only constraint: no UPDATE or DELETE on `economic_events` (enforced at RLS + DB level)
- Onchain anchoring strategy document: period close events and distribution events queued for Base L2 anchoring; contribution events remain off-chain for cost reasons
- Economic events live in the regenhub Supabase project's `economic_events` table, separate from any external contribution tracking infrastructure

**Completion criteria:**
- All nine event types emit correctly and appear in `economic_events` table
- Chain integrity: each event's `prev_hash` matches previous event's `hash`
- Append-only: attempt to delete or update a row → fails at DB level
- Test suite: emit each event type in sequence, verify chain state is intact

---

### Sprint F-3: FSC Decision Dashboard (bylaws tool)

**TIO Role:** Frontend/DevOps  
**Prerequisites:** None (reads proposed parameters only — no schema dependency)  
**Runs in parallel with:** F-1, F-2  
**TIME-BOUND:** Must be live before March 2, 2026 FSC meeting  
**Build target:** `regenhub/app/src/components/FscDashboard.jsx` + new `"fsc"` tab in `App.jsx`

**Deliverables:**
- `FscDashboard.jsx` — new React component added to `regenhub/app/src/components/`
- New `"fsc"` tab entry in `tabsMap` in `App.jsx`: `{ id: "fsc", label: "FSC · Decisions", color: "#d4b08a" }`
- Added to Organizers tab group (gated to `declared_role === "organizer"`)
- Eight decision panels, each showing: proposed value, IRC constraint note, rationale field, signal buttons reusing existing `SignalPanel` pattern
- Patronage weight panel: four sliders (Labor / Revenue / Cash / Community) that must sum to 1.0, live validation, 704(b) rationale required field
- Allocation impact calculator: enter a hypothetical surplus and three member profiles → see how weight changes shift allocations in real time (pure client-side, no Supabase dependency)
- Royalty parameter panel: pool percentage, default builder/formalizer split, vesting trigger type selector, decay toggle
- Distribution mechanics panel: cash ratio slider (hard floor at 20% with §1385 warning), period frequency selector
- Export button: generates a markdown ratification document from current values (downloads as file)
- Signals reuse existing `useSignals` hook with new item IDs prefixed `fsc-*`

**Completion criteria:**
- Component renders in the Organizers tab group as "FSC · Decisions"
- Weight sliders enforce sum-to-1.0 with live feedback
- §1385 warning fires when cash ratio drops below 20%
- Allocation calculator produces correct weighted-sum output
- Export generates valid markdown ratification document
- Existing signal layer works for FSC decision items

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
**Build target:** `regenhub/supabase/functions/patronage-engine/` (Edge Function) + `regenhub/app/src/lib/patronage.js` (client query helpers)

**Deliverables:**
- Supabase Edge Function `patronage-engine`: invocable by board-role users to open, snapshot, and close periods
- `open_period(weights, rationale)` — creates a `patronage_periods` row, records weights + 704(b) rationale, emits EVENT-H
- `snapshot_period(period_id)` — pulls member contribution records for the period window, maps to the four economic categories (Labor / Revenue / Cash / Community), stores in `contributions_economic`
- `close_period(period_id, surplus)` — runs weighted-sum calculation, writes per-member allocations to `contributions_economic`, credits `capital_accounts`, emits EVENT-F per member, emits EVENT-I (QWN trigger)
- Contribution ingestion: authenticated pull of member contribution records for the period window, mapping contribution category fields to the four patronage categories via configurable keyword map
- Formula calculator: pure function `calculateAllocations(members, contributions, weights, surplus)` — unit-testable, exported from `patronage.js` for use in the FSC Dashboard calculator
- Minimum threshold and cap enforcement applied before allocation write

**Completion criteria:**
- Given: three test members, synthetic contribution records, $10,000 surplus, 40/30/20/10 weights
- Expected: correct per-member allocation percentages, summing to 100%
- Audit trail: EVENT-F logged per member in `economic_events` with chain integrity maintained
- Edge cases tested: member with zero contributions receives zero allocation; member who joined mid-period has contributions prorated; loss period emits zero-distribution event
- `calculateAllocations` pure function matches Edge Function output on identical input

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
**Build target:** `regenhub/app/src/components/habitat/` — new subdirectory for all Habitat React components; new `"habitat"` audience group in `App.jsx`

**Deliverables:**
- New `"habitat"` audience group in `App.jsx` `baseGroups`: visible to all authenticated members (not gated to organizer role)
- `HabitatNav.jsx` — audience group entry point with tabs: Member Dashboard / Royalty Registry / Capital Account / Period History
- `MemberEconomicDash.jsx` — authenticated member's full economic arc:
  - Contribution history pulled from `contributions_economic` with multi-capital category breakdown
  - Capital account balance (book basis, current + per-period sparkline)
  - Patronage allocation history: per period — surplus, member %, amount credited
  - Royalty positions: asset name, units held, vesting status (PENDING / VESTED), distributions received to date
  - K-1 preview panel: current period data rendered as a pre-K-1 statement (not legal K-1, clearly labeled as preview)
- `RoyaltyRegistry.jsx` — public (no auth required) view of all registered royalty-bearing assets: asset name, category (tool / service / pattern / framework), builder attribution (by role, not name — public version), formalizer attribution, vesting status, revenue events received
- `QwnPanel.jsx` — period close notification component: when a period closes, QWN delivered in-tool with consent toggle ("I consent to include the retained allocation in my gross income for this tax year")
- `CapitalAccountView.jsx` — book capital account detail: opening balance, credits by type, debits, closing balance per period; tax basis shown as "coming soon" until B-2 complete

**Completion criteria:**
- Authenticated member sees their full economic history from admission date
- Royalty Registry renders without auth and shows at least one registered asset
- Period close triggers QWN display with consent capture recorded to Supabase
- All Habitat components adapt to existing dark/light theme via `useTheme()` hook
- No regressions in existing Organizers or Investors/Partners tab groups

---

### Sprint B-5: Beta Integration Test + First Real Period Close

**TIO Role:** QA/Test Engineer  
**Prerequisites:** All B-sprints complete  
**TIME-BOUND:** Triggered by first real accounting period end

**Deliverables:**
- First real period close: real member contributions → real patronage calculation → real capital account credits → real QWNs to real members
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
- **Build target:** `github.com/Roots-Trust-LCA/regenhub` — Habitat is an augmentation layer on the existing Bylaws and Ops tool, not a new repository
- **Deployment:** GitHub Pages via `regenhub/docs/` — same pipeline as today; Habitat features deploy with `npm run build && git push`
- **Backend:** Regenhub Supabase project — new tables alongside existing `signals` and `profiles`

---

*Nou · Techne Collective Intelligence Agent · February 2026*  
*the-habitat.org | github.com/nou-techne/nou-techne*  
*TIO-PROC-001 compliant — dependency-driven, outcome-triggered*

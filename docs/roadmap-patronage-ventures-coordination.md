# Patronage, Projects, Ventures, Royalties
## co-op.us/app + api.co-op.us Integration Roadmap
### Technology and Information Office — Deep Approach

**Version:** 2.0  
**Date:** 2026-03-01  
**Authors:** Nou · Dianoia  
**Status:** Active — coordination underway in workshop  
**Replaces:** ROADMAP_PATRONAGE_VENTURES_COORDINATION_2026-03-01.md (v1, workspace-only)

---

## Governing Principle: API First, Agents First

Every feature in this roadmap has two expressions:

**api.co-op.us** — the machine-readable surface. Built first. Agents use it to construct, test, and validate complete scenarios before any human UI exists. The API is not a reflection of the UI; the UI is a reflection of a proven API.

**co-op.us/app** — the human surface. Built after the API is proven by agents running real scenarios. Every human view has an exact API equivalent that agents can query, subscribe to, and act on autonomously.

This is not a convenience distinction. It is a structural commitment: the cooperative's economic infrastructure must be operable by machines before it becomes legible to humans. Agents stress-test the logic; humans navigate the results.

**Sprint track labels used throughout this document:**
- `[API]` — api.co-op.us sprint: endpoints, event handlers, workflows
- `[APP]` — co-op.us/app sprint: React pages and components for human participants
- `[AGT]` — Agent scenario sprint: Nou and/or Dia run end-to-end scenarios via API, validate correctness, document what humans will see. No UI required.
- `[BOTH]` — applies equally to both tracks (Identity and State foundations)

---

## The Gap This Closes

The co-op.us/app has mature isolated surfaces:

| Page | Route | What it does |
|------|-------|-------------|
| VenturePortfolio | `/ventures` | Lists ventures with royalty summaries |
| RoyaltyAgreements | `/royalty-agreements` | CRUD for share structures and vesting |
| RevenueRecording | `/revenue-recording` | Log venture revenue events |
| PatronageReview | `/patronage` | Contribution weights by category |
| AllocationPeriods | `/patronage/periods` | Period list and status |
| Distributions | `/patronage/distributions` | Distribution schedule |
| CapitalAccount | `/capital` | Member capital account balance |
| Coordinate | `/coordinate` | Workshop presence, sprints, activity |

None of these pages communicate with each other. None of them communicate with the Habitat backend (api.co-op.us). When a venture earns revenue and pays royalties under an agreement, that event doesn't trace through to the patronage formula or the capital account update. The chain:

```
Venture earns revenue
  → Revenue splits per royalty agreement shares
    → Each member's royalty income recorded
      → Royalty income feeds "revenue" dimension of patronage formula
        → Period close allocates based on weighted formula
          → Capital account updated
```

Every step exists. None are connected. This roadmap builds the connective tissue — first for agents, then for humans.

---

## Inventory: What Exists (Do Not Replicate)

All routes listed in the table above are live. The following additional pages also exist and are out of scope for this roadmap:

`/patronage/bridge` · `/patronage/config` · `/patronage/steward` · `/patronage/explorer` · `/patronage/compliance` · `/patronage/k1` · `/wallet` · `/marketplace` · `/staking` · `/chain` · `/members` · `/dashboard`

---

## Sprint Architecture

**37 sprints across 8 blocks.**

| Block | Sprints | Track | Layer | Focus |
|-------|---------|-------|-------|-------|
| 1 | P01–P04 | BOTH | Identity | New entity types |
| 2 | P05–P08 | BOTH | State | Database schema |
| 3 | P09–P14 | API | Relationship | api.co-op.us endpoints (write + query) |
| 4 | P15–P18 | API | Event | Event handlers wiring the chain |
| 5 | P19–P22 | API | Flow | Orchestrated workflows |
| 6 | P23–P25 | API | Constraint | Integrity rules and authorization |
| 7 | P26–P31 | AGT | Validation | Agent scenario testing and documentation |
| 8 | P32–P37 | APP | View | co-op.us/app human UI |

**Block 7 (Agent Scenarios) is the bridge.** It sits between a complete, tested API and the human UI. Agents run full scenarios — quarter simulations, cross-venture patronage, coordination workflows — via API alone. The scenarios produce:
1. Validation that the API logic is correct
2. Sample data for UI development
3. Documentation of what humans will experience before a single React component is written

---

## Block 1 — Identity Layer [BOTH] (P01–P04)

*Primary role: Schema Architect*  
*What new entities are we introducing? Applies to both tracks.*

### P01: Project Identity [BOTH]
**Deliverable:** TypeScript types — `Project` and `ProjectMilestone`

`Project`:
- id, venture_id (nullable — standalone projects allowed), name, description
- status: `ideation | active | paused | completed | archived`
- start_date, end_date, coordination_request_ids[], created_by, created_at

`ProjectMilestone`:
- id, project_id, title, description, status: `pending | completed | cancelled`
- completed_by, completed_at, contribution_id (set when milestone fires a contribution event)

A project is a time-bounded, scoped initiative within or across ventures. Milestones are the discrete achievements that produce patronage-eligible contribution events. Projects are not ventures; they are the work that happens inside them.

**Acceptance:** Types compile and export from shared types index. No collision with existing `venture.ts`.

---

### P02: Royalty Event Identity [BOTH]
**Deliverable:** TypeScript types — `RoyaltyEvent` and `VenturePatronageSummary`

`RoyaltyEvent`:
- id, agreement_id, venture_id, period_id, member_id
- amount, royalty_percent, source_revenue_id
- recorded_at, posted_to_patronage: boolean, patronage_period_id (nullable)

One `RoyaltyEvent` row per member per revenue recording. When a venture records $10K with a 3-member agreement at 40/35/25%, three events are created.

`VenturePatronageSummary`:
- venture_id, period_id, total_revenue, total_royalties_paid
- member_summaries: map of member_id → { royalty_total, patronage_weight_contribution }
- reconciliation_status: `reconciled | needs_review | pending`

**Acceptance:** Types align with existing `venture.ts` royalty types. No collision.

---

### P03: Coordination Proposal Identity [BOTH]
**Deliverable:** TypeScript type — `CoordinationProposal` (extends `coordination_requests`)

Additional fields:
- roadmap_id: string (e.g. `roadmap-patronage-ventures-coordination-v2`)
- roadmap_phase: string (e.g. `BLOCK 3 — API`)
- context_refs: Array<`{ type: 'venture' | 'project' | 'patronage_period' | 'royalty_agreement', id: string }`>
- claimed_by: participant_id | null
- claimed_at: timestamptz | null
- progress_log: Array<`{ agent: string, message: string, timestamp: string }`>
- completion_proof: string | null (commit hash, file path, or artifact URL)

This is additive. The existing `coordination_requests` shape is fully preserved. The new fields make a sprint a named, tracked, claimable unit of roadmap work.

**Acceptance:** Type extends without breaking existing Coordinate.tsx render.

---

### P04: Roadmap Item Identity [BOTH]
**Deliverable:** TypeScript type — `RoadmapItem`

Fields:
- id, roadmap_id, sprint_code (e.g. `P05`), title, track: `API | APP | AGT | BOTH`
- layer: `identity | state | relationship | event | flow | constraint | scenario | view`
- tio_role, status: `pending | in_progress | completed | blocked`
- assigned_to: participant_id | null
- dependencies: sprint_code[]
- estimated_minutes, actual_minutes, notes

The `/coordinate` Roadmap Panel (P36) queries this table live. Agents update it as they complete sprints. Humans see progress without needing to read commits.

**Acceptance:** Type can represent every sprint in this document.

---

## Block 2 — State Layer [BOTH] (P05–P08)

*Primary role: Backend Engineer*  
*How do these entities persist? Schema serves both tracks.*

### P05: Projects Table [BOTH]
**Deliverable:** Supabase migration — `projects` table

Schema matches P01 type. Key constraints:
- FK: `venture_id → ventures.id` (nullable — standalone projects allowed)
- FK: `created_by → participants.id`
- RLS: public read for `active | completed`; member write for own; steward write for all
- Index: `(venture_id, status)`, `(created_by)`

Also: `project_milestones` table with FK to `projects.id` and `contributions.id` (nullable).

**Acceptance:** Migration applies cleanly. RLS enforced at all three standing levels.

---

### P06: Royalty Events Table [BOTH]
**Deliverable:** Supabase migration — `royalty_events` table + materialized view

`royalty_events` schema matches P02 type. Key constraints:
- FK: `agreement_id → royalty_agreements.id`
- FK: `member_id → participants.id`
- FK: `source_revenue_id → revenue_recordings.id`
- Unique: `(agreement_id, member_id, source_revenue_id)` — prevents double-posting
- RLS: member reads own rows; steward reads all; writes via API only

Materialized view `venture_patronage_summaries`: JOIN of `royalty_events` + `contributions` grouped by (venture_id, period_id). Refreshed at period close and on-demand via API.

**Acceptance:** View aggregates correctly against seed data. Unique constraint prevents double-posting.

---

### P07: Coordination Proposals Extension [BOTH]
**Deliverable:** Supabase migration — extend `coordination_requests`

Add columns (all nullable — zero breakage to existing rows):
- `roadmap_id text`
- `roadmap_phase text`
- `context_refs jsonb default '[]'`
- `claimed_by uuid references participants(id)`
- `claimed_at timestamptz`
- `progress_log jsonb default '[]'`
- `completion_proof text`

RLS additions:
- Agents can claim unclaimed rows: `UPDATE WHERE claimed_by IS NULL AND claimed_by = auth.uid()` (atomic)
- Agents can append to own `progress_log`
- Stewards can set `claimed_by = NULL` (unclaim)

**Acceptance:** Existing Coordinate.tsx renders unchanged. Claim atomicity verified under concurrent test.

---

### P08: Roadmap Items Table [BOTH]
**Deliverable:** Supabase migration — `roadmap_items` table + seed data

Schema matches P04 type. RLS: public read; steward write; assigned agent can update own item status.

Seed: insert all P01–P37 from this document as initial rows, status `pending`, assigned_to `null`.

**Acceptance:** All 37 sprints seeded. Live query from `/coordinate` shows correct initial state.

---

## Block 3 — API Track: Relationship Layer [API] (P09–P14)

*Primary role: Integration Engineer*  
*api.co-op.us endpoints — write operations and query operations.*  
*Every endpoint here has an exact counterpart in the human UI (Block 8).*

### P09: Projects API [API]
**Endpoints:**

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/projects` | public | List (filter: venture_id, status, created_by, limit, offset) |
| GET | `/projects/:id` | public | Detail with milestones and linked sprints |
| POST | `/projects` | member | Create project |
| PATCH | `/projects/:id` | member/steward | Update status, description, end_date |
| POST | `/projects/:id/milestones` | member | Add milestone |
| PATCH | `/projects/:id/milestones/:mid` | member | Complete or cancel milestone (fires P15 event on complete) |
| GET | `/projects/:id/timeline` | public | Event timeline: milestones, contributions, status changes |

**Acceptance:** All endpoints return typed responses. Auth middleware enforces standing gates. Timeline is chronologically ordered and includes events from linked contributions table.

---

### P10: Royalty Events API [API]
**Endpoints:**

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/ventures/:id/royalty-events` | member/steward | Venture royalty timeline (filter: period_id, member_id, posted) |
| GET | `/members/:id/royalty-events` | member (own) / steward | Per-member royalty ledger |
| GET | `/members/:id/royalty-ledger` | member (own) / steward | Ledger grouped by venture + period (matches P32 human view) |
| GET | `/ventures/:id/patronage-summary` | member/steward | `VenturePatronageSummary` for a period |
| POST | `/royalty-events` | steward | Manual royalty event (fallback when automation fails) |
| GET | `/royalty-events/:id` | member (own) / steward | Single event detail with provenance trace |

**Acceptance:** Per-member ledger aggregates correctly. Venture summary matches manual calculation. Provenance trace returns the source revenue event and the agreement version active at time of recording.

---

### P11: Coordination Proposals API [API]
**Endpoints:**

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/coordination/proposals` | member | List (filter: roadmap_id, roadmap_phase, claimed_by, status) |
| POST | `/coordination/proposals` | member | Create proposal with roadmap context |
| POST | `/coordination/proposals/:id/claim` | agent/member | Claim sprint (atomic — first claim wins) |
| POST | `/coordination/proposals/:id/progress` | agent | Append progress log entry |
| POST | `/coordination/proposals/:id/complete` | agent | Mark complete with proof |
| POST | `/coordination/proposals/:id/unclaim` | steward | Release claim |
| GET | `/coordination/proposals/:id/log` | member | Full progress log with timestamps |

**Acceptance:** Claim is race-condition safe (DB transaction, row-level lock). Progress log appends without overwriting. Complete action updates roadmap_items.status via P18 event.

---

### P12: Roadmap Tracker API [API]
**Endpoints:**

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/roadmap/:id` | public | Roadmap metadata + all items |
| GET | `/roadmap/:id/progress` | public | Aggregate stats by block and track |
| GET | `/roadmap/:id/items` | public | Items (filter: track, layer, status, assigned_to) |
| PATCH | `/roadmap-items/:sprint_code` | agent/steward | Update status, assigned_to, actual_minutes, notes |
| GET | `/roadmap-items/:sprint_code` | public | Single item detail with full history |

**Acceptance:** Progress aggregates update within 1s of item status change. Public read means agents in any environment can check roadmap state without auth.

---

### P13: Venture Patronage Pipeline API [API]
**Endpoints:**

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/ventures/:id/patronage-pipeline` | member/steward | Full trace: revenue → royalties → patronage credits → formula contribution, per period |
| POST | `/ventures/:id/patronage-pipeline/sync` | steward | Re-sync royalty events → patronage credits (idempotent) |
| GET | `/ventures/:id/patronage-pipeline/diff` | steward | Shows pending royalty events not yet posted to patronage |

The pipeline trace is the critical audit surface. For a given venture + period, it returns a unified timeline:

```json
{
  "venture_id": "...",
  "period_id": "...",
  "stages": [
    {
      "stage": "revenue",
      "entries": [{ "id": "...", "amount": 10000, "recorded_at": "..." }]
    },
    {
      "stage": "royalty_events",
      "entries": [{ "member_id": "...", "amount": 4000, "share_percent": 40 }]
    },
    {
      "stage": "patronage_credits",
      "entries": [{ "member_id": "...", "credit_amount": 4000, "posted_at": "..." }]
    },
    {
      "stage": "formula_contribution",
      "entries": [{ "member_id": "...", "revenue_weight": 0.3, "weighted_score": 1200 }]
    }
  ]
}
```

**Acceptance:** All four stages present and traceable. Sync is idempotent. Diff correctly identifies unposted events.

---

### P14: API View Mirror — Query Parity [API]

Every human view in Block 8 needs a query endpoint. This sprint ensures none are missing before agent scenarios run.

**New or verified endpoints:**

| Human view (P32–P37) | API query endpoint | Notes |
|---|---|---|
| Royalty Ledger (P32) | `GET /members/:id/royalty-ledger` | Added in P10 |
| Venture Pipeline (P33) | `GET /ventures/:id/patronage-pipeline` | Added in P13 |
| Project Directory (P34) | `GET /projects` | Added in P09 |
| Project Detail (P35) | `GET /projects/:id` + `/projects/:id/timeline` | Added in P09 |
| Coordinate Roadmap Panel (P36) | `GET /roadmap/:id/progress` + WebSocket subscription | P12 + subscription below |
| Reconciliation Panel (P37) | `GET /ventures/:id/patronage-summary` (all ventures, period) | Batch variant below |

**New endpoints added in this sprint:**

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/patronage-periods/:id/reconciliation` | steward | All venture reconciliation statuses for a period — the data source for P37 panel |
| GET | `/patronage-periods/:id/ventures` | member | All venture summaries for a period (used by P37 and agents) |
| WS | `/roadmap/:id/subscribe` | public | WebSocket subscription for live roadmap_items updates |
| WS | `/coordination/workshop/subscribe` | member | WebSocket for guild_messages, presence, and sprint status changes |

**Acceptance:** Every P32–P37 human view can be fully rendered from API data alone, with no direct Supabase client calls. Agents can produce a complete "what would a human see" snapshot for any page using only these endpoints.

---

## Block 4 — Event Layer [API] (P15–P18)

*Primary role: Event Systems Engineer*  
*Events wire the chain. Every event published here is also subscribable by agents via WebSocket.*

### P15: Project Milestone → Contribution Event [API]
**Event:** `project.milestone.completed`

Published when: `PATCH /projects/:id/milestones/:mid` with status `completed`.

Payload:
```json
{
  "milestone_id": "...",
  "project_id": "...",
  "venture_id": "...",
  "member_id": "...",
  "contribution_category": "work",
  "estimated_value": 0
}
```

Handler: Creates a `contributions` row (category=`work`, title from milestone name, linked to project via metadata). Contribution enters the existing approval workflow (pending → approved → applied). This is the bridge between project work and the patronage formula — without modifying either.

**Agent note:** Agents can subscribe to `project.milestone.completed` events to monitor project progress in real time without polling.

**Acceptance:** Completing a milestone creates a contribution. The contribution appears in PatronageReview and triggers the existing approval flow.

---

### P16: Revenue Recorded → Royalty Events [API]
**Event:** `revenue.recorded`

Published when: a `revenue_recordings` row is inserted (the existing RevenueRecording page already does this — we are adding the subscriber).

Payload:
```json
{
  "recording_id": "...",
  "venture_id": "...",
  "amount": 10000,
  "recorded_at": "..."
}
```

Handler: Queries the active royalty agreement for the venture, calculates each member's share, creates `royalty_event` rows for each member. Review window: events are written with `posted_to_patronage = false`. A steward has 24h to flag discrepancies before automatic posting proceeds (configurable, default 24h).

**Agent note:** Agents can monitor `revenue.recorded` events to trigger downstream scenario steps without waiting for human confirmation.

**Acceptance:** Recording $10K with three members at 40/35/25% creates three `royalty_event` rows totaling $10K. No double-posting (unique constraint from P06). 24h review window respected.

---

### P17: Royalty Events → Patronage Credits [API]
**Event:** `royalty.batch.period.close`

Published when: a patronage period is closed (extends the existing `period.closed` event).

Handler: For each unposted `royalty_event` in the period, creates a patronage credit (a specialized transaction in the patronage system). Sets `posted_to_patronage = true`, `patronage_period_id = period_id`. The "revenue" dimension of the patronage formula is now backed by actual traced royalty flows.

**Agent note:** This event is the critical bridge. Before this, patronage review shows weights based on contribution categories. After this, it is backed by real revenue flows. Agents can validate the before/after state transition.

**Acceptance:** Period close with $50K total royalties creates patronage credits summing to $50K across all members. Idempotent — replaying the event produces no duplicate credits.

---

### P18: Coordination Sprint → Agent Assignment Event [API]
**Event:** `coordination.sprint.claimed` and `coordination.sprint.completed`

`coordination.sprint.claimed` — published when `POST /coordination/proposals/:id/claim` succeeds.

Handler:
- Updates `roadmap_items.status = 'in_progress'`, `assigned_to = agent_participant_id`
- Posts to workshop channel: `"{agent} claimed sprint {code}: {title}"`

`coordination.sprint.completed` — published when `POST /coordination/proposals/:id/complete` succeeds.

Handler:
- Updates `roadmap_items.status = 'completed'`, `actual_minutes = (completed_at - claimed_at) / 60000`
- Posts sprint summary to workshop with completion_proof link

**Agent note:** These events make the /coordinate Roadmap Panel update in real time without polling. Agents watching the WebSocket see sprint state changes as they happen.

**Acceptance:** Claim triggers workshop message + roadmap update. Complete triggers summary post + metrics.

---

## Block 5 — Flow Layer [API] (P19–P22)

*Primary role: Workflow Engineer*  
*Orchestrated multi-step processes. These are what agents exercise in Block 7.*

### P19: Royalty → Patronage Pipeline Workflow [API]
**Deliverable:** Orchestrated workflow — complete revenue cycle

Step 1: Revenue recorded (RevenueRecording page → `revenue.recorded` event)  
Step 2: Royalty events created per member (P16 handler) — 24h review window  
Step 3: Review window passes or steward confirms — events marked ready  
Step 4: Period close triggered (existing AllocationPeriods flow)  
Step 5: Royalty batch processed → patronage credits (P17 handler)  
Step 6: Patronage formula recalculates with revenue component backed by real credits  
Step 7: Capital accounts updated (Habitat flow)  

Compensating actions: if Step 5 fails, period close is not finalized. Revenue events remain unposted. Steward receives alert.

**Acceptance:** Integration test passes the full cycle with seed data: 1 venture, 2 members, 3 revenue recordings, 1 period close. Capital accounts reflect correct royalty-backed patronage.

---

### P20: Project Lifecycle Workflow [API]
**Deliverable:** Orchestrated workflow — project proposal to completion

Step 1: Project created (status: `ideation`) and linked to a coordination sprint  
Step 2: Milestones completed → contribution events fired (P15) → contributions enter approval flow  
Step 3: Contributions approved → patronage weights update  
Step 4: Project marked `completed` → summary computed: total contributions, members, venture linked  
Step 5: Summary posted to Workshop channel  

Compensation: if project archived before complete, pending milestones are cancelled. Completed contributions remain in patronage.

**Acceptance:** End-to-end test: create project → complete milestones → approve contributions → close project → verify workshop message → verify patronage weights updated.

---

### P21: Agent Sprint Coordination Workflow [API]
**Deliverable:** The meta-workflow — how Nou and Dia coordinate on this roadmap

Step 1: Nou (or Dia) proposes sprint via `POST /coordination/proposals` with `roadmap_id`, context_refs, description  
Step 2: Either agent claims — atomic, first claim wins  
Step 3: Claiming agent posts progress entries as work proceeds  
Step 4: Completing agent posts `completion_proof`  
Step 5: Sprint status → `completed`; roadmap_items updates; workshop post  
Step 6: Depending agent can now begin (dependency check passes)  

This workflow governs all sprints in this roadmap. It is itself a sprint (P21) that must be validated before the Agent Scenario block runs.

**Acceptance:** Nou claims P21, posts 3 progress entries, marks complete. /coordinate Roadmap Panel shows P21 completed. P26 (first scenario sprint) becomes available.

---

### P22: Venture Patronage Period Reconciliation [API]
**Deliverable:** Reconciliation workflow — runs at every period close

For each venture: compares expected royalty totals (agreement shares × period revenue) vs. actual `royalty_events` posted.

- Discrepancy > threshold (default 1%): flags as `needs_review`, blocks period close for that venture
- Reconciled: marks `reconciled`, auto-approves revenue component for that venture
- Result stored in `venture_patronage_summaries.reconciliation_status`

**Acceptance:** Discrepancy detection catches intentional test case. Auto-approve works on clean data. Needs-review correctly blocks period close until steward clears.

---

## Block 6 — Constraint Layer [API] (P23–P25)

*Primary role: Compliance & Security Engineer*

### P23: Royalty Event Integrity Rules [API]
- Royalty shares per agreement ≤ 100% total (remainder belongs to cooperative)
- A `royalty_event` cannot be posted to a closed period
- A member cannot receive more than their share × source revenue
- Unique: `(agreement_id, member_id, source_revenue_id)` — no double-posting

**Acceptance:** All boundary cases caught by validator. DB unique constraint enforced.

---

### P24: Project Contribution Authorization [API]
- Only project members (creator or explicitly added) can complete a milestone
- A milestone can be completed exactly once
- Project contributions inherit the existing approval workflow
- A project linked to a venture must share the same hub scope

**Acceptance:** Unauthorized completion rejected. Double-completion rejected. Cross-hub rejected.

---

### P25: Coordination Claim Fairness [API]
- An agent cannot hold more than N claimed sprints simultaneously (default: 3)
- A sprint idle >72h after claiming can be released by any steward
- An agent cannot claim a sprint that depends on an incomplete sprint they also own (deadlock prevention)

**Acceptance:** Overclaiming rejected. Idle claim released at 72h. Dependency deadlock prevented.

---

## Block 7 — Agent Scenarios [AGT] (P26–P31)

*Primary role: Nou + Dianoia jointly*  
*The bridge between a proven API and a human UI. No new code is written in this block — agents run the API as built in Blocks 3–6, validate correctness, and document what humans will experience.*

The output of each scenario sprint:
1. A test result (pass/fail with detail)
2. A sample data snapshot (what the human UI will render)
3. Notes on edge cases, unexpected behavior, or gaps to address before Block 8

---

### P26: Scenario — Revenue Cycle [AGT]
**Scenario:** A venture records three revenue events in a period. Three members have an active royalty agreement. Run the complete cycle end-to-end via API.

Steps:
1. `POST /revenue-recording` × 3 (using existing endpoint) — verify `revenue.recorded` events fire
2. Wait for `royalty_events` creation — verify 3 members × 3 recordings = 9 rows, totaling correct amounts
3. Check `GET /members/:id/royalty-ledger` for each member — verify ledger matches
4. Trigger period close — verify `royalty.batch.period.close` fires
5. Check `GET /ventures/:id/patronage-pipeline` — verify all four stages present and traceable
6. Check `GET /capital` (member API, if available) or directly query capital accounts — verify update

**Expected output:** Ledger screenshot equivalent (JSON snapshot), pipeline trace JSON, confirmed capital account delta.

**Acceptance:** All six steps pass. Any gaps documented with specific sprint reference for remediation.

---

### P27: Scenario — Project Lifecycle [AGT]
**Scenario:** A project is created within a venture. Three milestones are completed by two different members. Project closes.

Steps:
1. `POST /projects` — create project linked to a venture
2. `POST /projects/:id/milestones` × 3 — add milestones
3. `PATCH /projects/:id/milestones/:mid` (status: `completed`) × 3 — fire contribution events
4. Verify 3 contribution rows created in `contributions` table
5. Approve contributions (steward role) — verify patronage weights update
6. `PATCH /projects/:id` (status: `completed`) — verify workshop message
7. `GET /projects/:id/timeline` — verify complete event history

**Expected output:** Timeline JSON for the completed project (source material for P35 Project Detail page).

**Acceptance:** All contributions correctly attributed. Workshop message posted. Timeline is complete and accurate.

---

### P28: Scenario — Cross-Venture Patronage [AGT]
**Scenario:** One member participates in two ventures with different royalty agreements. Verify their patronage allocation correctly reflects both income streams.

Steps:
1. Set up Venture A: member at 40% of $8K revenue = $3,200 royalty
2. Set up Venture B: same member at 25% of $12K revenue = $3,000 royalty
3. Verify `royalty_events`: two rows for same member, different ventures
4. Verify `VenturePatronageSummary` for both ventures includes member
5. Close period — verify patronage credits for member = $6,200 total
6. Verify patronage formula "revenue" component reflects $6,200 (not just one venture)

**Expected output:** Cross-venture ledger view (what P32 will show for this member). Confirmation that both income streams compound correctly in the formula.

**Acceptance:** Totals match arithmetic. Formula revenue component aggregates across ventures.

---

### P29: Scenario — Quarter Simulation [AGT]
**Scenario:** Simulate a full Q1 2026 allocation cycle. Five members, three ventures, fifteen revenue events, two projects, period close, full reconciliation, K-1 data output.

This is the stress test. It is designed to surface integration failures that smaller scenarios miss.

Steps:
1. Seed five members with varying contribution histories
2. Seed three ventures with different royalty agreements
3. Post 15 revenue events across the quarter
4. Complete milestones in two projects
5. Run period close
6. Run reconciliation — all three ventures must reach `reconciled` status
7. Verify K-1 data endpoint returns correct figures for all five members
8. Verify capital account updates for all five members

**Expected output:** A complete Q1 snapshot. This becomes the reference data for UI development in Block 8. Every page in P32–P37 should render correctly against this dataset.

**Acceptance:** All 5 capital accounts updated correctly. All 3 ventures reconciled. K-1 data matches manual calculation for at least 2 members spot-checked.

---

### P30: Scenario — /coordinate as Agent Workspace [AGT]
**Scenario:** Nou and Dia coordinate on a sprint using the full claim/progress/complete cycle. Verify the Roadmap Panel data (the input for P36) is accurate.

Steps:
1. Nou proposes P30 itself via `POST /coordination/proposals` with `roadmap_id` and `context_refs`
2. Nou claims it — verify workshop message fires
3. Nou posts 3 progress entries via `POST /coordination/proposals/:id/progress`
4. Nou completes it via `POST /coordination/proposals/:id/complete` with proof
5. Check `GET /roadmap/roadmap-patronage-ventures-coordination-v2/progress` — P30 should show `completed`
6. Check workshop guild_messages — summary post present

**Expected output:** Full progress log JSON (source material for P36 Roadmap Panel). Confirmation that the WebSocket subscription correctly pushes the status change.

**Acceptance:** All six steps pass. Roadmap progress correctly reflects P30 completion. Workshop post is human-readable.

---

### P31: API Reference Documentation [AGT]
**Deliverable:** Complete API reference for all api.co-op.us endpoints introduced in this roadmap

Format: Markdown (publishable to nou-techne repo alongside this roadmap).

For each endpoint: method, path, auth requirement, request body schema, response schema, example request, example response, error codes.

Also: Event catalog — all events published and their payloads. WebSocket subscription guide. Scenario walkthrough linking P26–P30 to the endpoint sequence used.

The documentation is the artifact that lets a new agent (or a future human developer) onboard to this API surface without needing to read the code.

**Acceptance:** All endpoints in P09–P14 documented. All events in P15–P18 documented. Scenarios in P26–P30 cross-referenced. Ready to publish as public API reference.

---

## Block 8 — Human View Layer [APP] (P32–P37)

*Primary role: Frontend Engineer*  
*Built after Block 7 validates the API. Every page consumes api.co-op.us endpoints — no direct Supabase client calls for new features. The P29 quarter simulation provides the reference dataset.*

---

### P32: Royalty Ledger Page [APP] — `/royalty-ledger`
**Auth gate:** member  
**API source:** `GET /members/:id/royalty-ledger`

Per-member royalty income timeline, grouped by venture and period. Shows: venture name, agreement version active at time of payment, period, amount, posting status, link to source revenue event.

Visual: timeline rows by period, not a flat table. Each entry links to `/ventures/:id/patronage-pipeline` for the drill-down.

**Does not replicate:** VenturePortfolio (venture-centric), CapitalAccount (balance view). This is the event view: discrete income occurrences.

**Acceptance:** Renders correctly against P29 reference dataset. All postings traced to source revenue events.

---

### P33: Venture Patronage Pipeline View [APP] — `/ventures/:id/patronage`
**Auth gate:** member (own ventures) or steward (any)  
**API source:** `GET /ventures/:id/patronage-pipeline`

For each period: the complete four-stage chain displayed vertically. Each stage is collapsible. Final stage shows how much this venture contributed to each member's patronage score as a percentage of their total.

Steward-only: "Sync pipeline" button (`POST /ventures/:id/patronage-pipeline/sync`).

**Does not replicate:** `/ventures` (venture list), `/patronage` (formula weights).

**Acceptance:** All four pipeline stages render. Drill-down shows member-level breakdown. Sync visible to steward only.

---

### P34: Project Directory [APP] — `/projects`
**Auth gate:** public (active/completed), member (all statuses)  
**API source:** `GET /projects`

Project cards: status badge, venture link (if any), milestone progress bar (completed/total), contributor avatars.

Filters: by venture, by status, by contributor. Create button for members.

**Does not replicate:** `/ventures` (venture-level), `/chain` (contribution ledger).

**Acceptance:** Renders against P29 reference dataset. Create form posts to `POST /projects`. Filter parameters pass to API query.

---

### P35: Project Detail [APP] — `/projects/:id`
**Auth gate:** public (overview), member (milestones and actions)  
**API source:** `GET /projects/:id` + `GET /projects/:id/timeline`

Sections:
1. **Overview** — name, status, venture link, date range
2. **Milestones** — list with completion status, contribution links (to `/contribution/:id`), assigned members
3. **Contributors** — members and their milestone counts
4. **Linked Sprints** — `coordination_requests` with `context_refs` pointing to this project (from P11 API)
5. **Activity Timeline** — ordered events from `GET /projects/:id/timeline`

Member actions: add milestone, complete milestone, update status.

**Does not replicate:** `/contribution/:id` (individual contribution), `/ventures` (venture overview).

**Acceptance:** All five sections render from API data. Milestone complete fires P15 event. Timeline matches P27 scenario output.

---

### P36: Coordination Roadmap Panel [APP] — adds to `/coordinate`
**Auth gate:** public (read), member (propose), agent (claim/progress/complete)  
**API source:** `GET /roadmap/:id/progress` + WebSocket `/roadmap/:id/subscribe`

New panel added to Coordinate.tsx, between Active Sprints and Shared Links:

**Roadmap Tracker** shows:
- Current roadmap name and phase progress bars (Block 1 through 8)
- Sprint grid: sprint code, title, track badge (`[API]`/`[APP]`/`[AGT]`/`[BOTH]`), layer badge, status, assigned agent avatar
- For claimed sprints: collapsible progress_log entries inline
- For completed sprints: completion_proof link

**Agent actions** (authenticated as agent):
- "Propose sprint" button → opens modal pre-filled with `roadmap_id` and available `context_refs`
- "Claim" on unclaimed in-progress requests (calls P11 API)

**Does not replicate:** the existing Active Sprints section (all coordination_requests). The Roadmap Panel shows *this roadmap* with structured tracking. Active Sprints remains for free-form coordination.

**Acceptance:** Renders P29 snapshot correctly. WebSocket updates sprint status in real time without page reload. Agent claim works from the panel. Progress log readable.

---

### P37: Royalty → Patronage Reconciliation Panel [APP] — adds to `/patronage/steward`
**Auth gate:** steward  
**API source:** `GET /patronage-periods/:id/reconciliation`

New section added to PatronageStewardView.tsx, after the existing patronage summary and before the distribution section:

**Venture Reconciliation** shows:
- Table: venture name | expected royalties | actual royalty_events sum | delta | status
- `reconciled` rows: green, auto-approved for period close
- `needs_review` rows: amber, with "View pipeline" link → `/ventures/:id/patronage`
- "Clear for close" action on `needs_review` rows (manual reconciliation)

**Does not replicate:** ComplianceDashboard (704(b) specific), PatronageExplorer (granular data).

**Acceptance:** Table accurate against P29 dataset. `needs_review` blocks period close until cleared. `reconciled` allows proceed.

---

## Coordination Protocol (Nou + Dianoia)

### Craft Division

| Sprints | Primary | Notes |
|---------|---------|-------|
| P01–P04 (Identity types) | Nou | Pure TypeScript, perception/synthesis craft |
| P05–P08 (Migrations) | Dia | Earth/code craft — DB schema |
| P09–P14 (API endpoints) | Dia | Implementation; Nou reviews contracts |
| P15–P18 (Event handlers) | Dia | Implementation; Nou reviews event schemas |
| P19–P22 (Workflows) | Dia | Implementation; Nou reviews flow diagrams |
| P23–P25 (Constraints) | Dia | Validators; Nou reviews compliance mapping |
| P26–P31 (Scenarios) | Both | Joint — Nou drives, Dia runs, both document |
| P32–P37 (Human UI) | Dia | React components; Nou reviews IA and copy |

### Sprint Lifecycle

1. Claiming agent posts `POST /coordination/proposals/:id/claim`
2. Agent posts progress at: start, any significant decision, completion
3. Completion includes `completion_proof` (commit hash, file path, or artifact URL)
4. The /coordinate Roadmap Panel (P36) updates in real time

### First Moves

- **Dia claims P07** (Coordination Proposals Extension — fastest path to writable /coordinate)
- **Nou claims P03** in parallel (CoordinationProposal TypeScript type — needed for P07 migration)
- These two together unblock P11 → P18 → P21 → P30 → P36: the coordination workflow itself

### Inviting other Clawsmos

The `context_refs` field can reference any participant by ID. When a sprint requires a craft not held by Nou or Dia, another Clawsmos member can be @-mentioned in a workshop message and invited to claim it.

---

## Dependency Graph

```
P01 P02 P03 P04         ← Identity (all parallel)
 ↓   ↓   ↓   ↓
P05 P06 P07 P08         ← State (each depends on matching identity sprint)
 ↓   ↓   ↓   ↓
P09 P10 P11 P12 P13
         ↓           ↓
        P14 ←────────┘  ← API View Mirror (depends on P09-P13)
 ↓   ↓   ↓
P15 P16 P17 P18         ← Events (P15←P09; P16←P10; P17←P16+P06; P18←P11)
         ↓
P19     P20 P21 P22     ← Flow (P19←P16+P17; P20←P15+P09; P21←P11+P18)
 ↓       ↓   ↓
P23     P24 P25         ← Constraints (parallel, after respective flows)
 ↓       ↓   ↓
P26–P31 ←────────────   ← Agent Scenarios (all Blocks 3-6 complete)
 ↓
P32–P37 ←────────────   ← Human UI (P29 reference dataset available)
```

**Minimum path to first human-visible value:**
P02 → P06 → P10 → P16 → P32 (Royalty Ledger)
Four foundational sprints, then three pipeline sprints = first new page a member can use.

**Minimum path to writable /coordinate:**
P03 → P07 → P11 → P18 → P21 → P30 → P36
Seven sprints to a fully operational Roadmap Panel with real-time agent coordination.

---

## Open Questions

For resolution in the first joint /coordinate session:

**Q1: api.co-op.us — live service or spec?**  
Shapes whether P09–P14 deploys as Supabase Edge Functions (consistent with current stack, faster) or a separate API server (cleaner long-term separation). Default assumption: Edge Functions until a dedicated server is warranted.

**Q2: Royalty Ledger — standalone page or tab in /capital?**  
Logically adjacent (both show member income) but distinct in grain (events vs. balance). Roadmap defaults to standalone `/royalty-ledger`. Dia has design authority here.

**Q3: Review window — 24h automatic or steward-confirm?**  
For revenue → royalty_events posting. 24h automatic is simpler; steward-confirm adds auditability. For Q1 2026 allocation, steward-confirm is probably safer given the first real data run.

**Q4: Contribution approval for project milestones — auto or manual?**  
Milestones fire contribution events that enter the existing approval workflow. For the Q1 run, steward manual approval is correct. Automating approval can come later.

**Q5: WebSocket vs. polling for Block 8 views?**  
The P14 sprint adds WebSocket subscriptions. If Edge Function WebSockets are unstable in the current deployment, fall back to 30s polling for Block 8 and address WebSockets in a hardening sprint.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-03-01 | Initial roadmap — workspace only |
| 2.0 | 2026-03-01 | Parallel depth for api.co-op.us and co-op.us/app; added Block 7 Agent Scenarios; added P14 API View Mirror; explicit track labeling throughout; 37 sprints |

---

*Techne Institute / RegenHub, LCA — Boulder, Colorado*  
*Nou + Dianoia · Technology and Information Office · March 2026*  
*github.com/nou-techne/nou-techne*

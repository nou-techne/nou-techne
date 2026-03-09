# P195: Swarm Scenario Engine

**Mass coordination simulation on the active canvas**

Sprint: P195 | Complexity: L | Layers: 2, 4, 5, 6, 7
Proposed by: Nou | Directive: Todd Youngblood, March 9 2026

---

## Intent

Build a reusable scenario engine that simulates mass human+agent coordination on the co-op.us active canvas, demonstrating scalability and validating the economic memory system before real capital flows through it.

The active canvas is two surfaces:
- **SwarmViz** (`/coordinate/swarm`) — D3 force-directed graph showing agents, sprints, and repos as nodes with real-time event particles flowing between them. Supabase Realtime subscriptions drive all updates.
- **Coordinate** (`/coordinate`) — Sprint management grid with proposal lifecycle, capability matching, shared links, and Workshop chat.

Both surfaces consume the same underlying tables (coordination_requests, protocol_events, agent_presence, participants, guild_messages, coordination_links) via Realtime subscriptions. The scenario engine writes to these same tables with tagged records, so the existing visualization infrastructure displays the simulation without any modifications.

---

## Current State

| Table | Count | Notes |
|-------|-------|-------|
| participants | 14 | 2-3 agents, ~11 human stubs |
| coordination_requests | 210 | Real sprints (P1-P194) |
| protocol_events | 1,532 | Real sprint lifecycle events |
| agent_presence | 3 | Nou, Dianoia, + 1 |
| cloud_balances | 11 | Enrollment grants only |
| contributions | 107 | Real contributions |
| chain_entries | 9 | Merkle chain (genesis + early events) |

The system has never been tested beyond 3 concurrent agents.

---

## Data Isolation: The Simulation Tag

Every record created by the scenario engine carries a tag that makes it trivially identifiable and deletable.

### Tagging Strategy

| Table | Tag Location | Example |
|-------|-------------|---------|
| participants | `parsed_fields->>'simulation'` | `"sim:stress-2026-03-09"` |
| coordination_requests | `context_refs[0].simulation` | `{"type":"simulation","scenario_id":"stress-2026-03-09"}` |
| protocol_events | `payload->>'simulation'` | `"sim:stress-2026-03-09"` |
| agent_presence | `payload->>'simulation'` (custom col) | `"sim:stress-2026-03-09"` |
| cloud_transactions | `metadata->>'simulation'` | `"sim:stress-2026-03-09"` |
| cloud_balances | cascade from participant deletion | — |
| contributions | `payload->>'simulation'` | `"sim:stress-2026-03-09"` |
| chain_entries | `payload->>'simulation'` | `"sim:stress-2026-03-09"` |
| guild_messages | `metadata->>'simulation'` | `"sim:stress-2026-03-09"` |

### Cleanup RPC

```sql
CREATE OR REPLACE FUNCTION cleanup_simulation(p_scenario_id text)
RETURNS jsonb AS $$
DECLARE
  tag text := 'sim:' || p_scenario_id;
  counts jsonb := '{}';
BEGIN
  -- Order matters: children before parents (FK constraints)
  DELETE FROM protocol_events WHERE payload->>'simulation' = tag;
  GET DIAGNOSTICS ... -- count each table
  DELETE FROM agent_presence WHERE agent_id IN (
    SELECT id FROM participants WHERE parsed_fields->>'simulation' = tag
  );
  DELETE FROM cloud_transactions WHERE ... ;
  DELETE FROM contributions WHERE ... ;
  DELETE FROM chain_entries WHERE payload->>'simulation' = tag;
  DELETE FROM coordination_requests WHERE ... ;
  DELETE FROM guild_messages WHERE metadata->>'simulation' = tag;
  DELETE FROM cloud_balances WHERE participant_id IN (...);
  DELETE FROM participants WHERE parsed_fields->>'simulation' = tag;
  RETURN counts;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = public;
```

One call: `SELECT cleanup_simulation('stress-2026-03-09')` — everything gone.

---

## Engine Components

### A. Participant Factory

Creates N synthetic participants with:
- Realistic names (drawn from a seed list or generated: "Agent Kappa", "Member Rho")
- Account type: `agent` or `human` (configurable ratio, default 60/40)
- Craft assignments from the 8 co-op.us crafts (code, word, form, sound, earth, body, fire, water)
- Archetype + guild computed from craft pair (uses existing `getArchetype`/`getGuild` logic)
- `participant_type: 'guest'` — never promoted to member/steward
- `parsed_fields.simulation` tag for cleanup
- Optional: initial $CLOUD balance (via cloud_balances insert)

### B. Sprint Generator

Creates coordination_requests following realistic lifecycle patterns:
- Sprint IDs: `SIM-001` through `SIM-N` (distinct from production P-series)
- Complexity distribution: 40% S, 25% M, 20% XS, 10% L, 5% XL
- Layer distribution: weighted toward 2 (state) and 7 (view) as in real sprints
- Status distribution across lifecycle: 30% proposed, 30% in_progress, 20% completed, 10% testing, 10% cancelled
- Each sprint links to a proposer and (if claimed) a claimer from the participant pool
- Reference URLs drawn from a realistic set (GitHub repos, docs)

### C. Event Emitter

Fires protocol_events through Supabase INSERTs (triggering Realtime → SwarmViz particles):
- Event types match production: `task_proposed`, `sprint_claimed`, `progress_posted`, `sprint_completed`, `sprint_entered_testing`, `capability_broadcast`, `chat_message_posted`
- Rate modes:
  - **burst**: 50-100 events/second (stress test — can the Realtime channel handle it?)
  - **steady**: 1 event/second (demo — easy to watch)
  - **realistic**: clustered bursts around sprint state changes (mimics human+agent work rhythms)
- Each event references a sprint_id and agent_id from the simulation pool

### D. Presence Simulator

Synthetic `agent_presence` records updated at 30-second intervals:
- Status cycling: active → executing (when sprint claimed) → reviewing → active
- Capacity oscillation: 20-100, dropping when executing
- `functional_mode` set realistically: "code:implementing", "review:testing", "synthesis:planning"
- Creates the visual effect of a living swarm on SwarmViz

### E. Economic Memory Simulator

This is the novel component — it runs economic flows through the existing tables, validating the accounting logic described in the Economic Memory System Roadmap:

**$CLOUD Layer:**
- Sprint completion → $CLOUD grant (cloud_transactions insert, cloud_balances update)
- Grant amounts: XS=10, S=25, M=50, L=100, XL=200 CLOUD
- Tracks total $CLOUD minted, distributed, and held across the scenario

**Patronage Layer:**
- Contributions recorded with multi-capital categories: labor (sprint hours), revenue (venture attribution), cash (deposits), community (chat + peer recognition)
- Period simulation: open_period → snapshot_contributions → calculate_allocations → close_period
- Patronage formula applied: 40% labor / 30% revenue / 20% cash / 10% community (FSC defaults)
- Per-participant allocation calculated and recorded

**Royalty Layer (display-only):**
- Register synthetic royalty-eligible contributions (tools, patterns)
- Issue builder units on creation, formalizer units pending adoption
- Simulate a revenue event from a venture → distribution calculation
- Vesting triggers: `service.live` for builders, `pattern.adopted` for formalizers

**Capital Accounts (display-only):**
- Track book basis: opening balance + patronage allocation + royalty distribution - withdrawals
- Period-close snapshot per participant

All economic calculations are pure functions — the engine computes them and records the results. No real money moves. The purpose is to validate that the accounting logic produces correct outputs and that the UI can render economic activity alongside coordination activity.

### F. Reporting

After scenario completion, the engine generates a summary:
- Peak Realtime throughput (events/second before lag)
- D3 rendering performance (frame rate at peak node count)
- Supabase query latency under load
- Economic totals: CLOUD minted, patronage allocated, royalty units issued
- Patronage allocation accuracy: does the formula sum to exactly 100%?

---

## Scenario Presets

### smoke.json (Quick verification)
- 5 participants (3 agents, 2 humans)
- 10 sprints, 50 events
- 1-minute duration
- No economic simulation
- Purpose: verify tagging + cleanup works

### demo.json (Live presentation)
- 20 participants (12 agents, 8 humans)
- 50 sprints across all complexities
- 500 events over 5 minutes (steady rate)
- $CLOUD grants on completion
- Purpose: show the canvas at moderate scale

### stress.json (Infrastructure test)
- 50 participants (30 agents, 20 humans)
- 200 sprints
- 5,000 events over 10 minutes (burst mode)
- $CLOUD grants + patronage period
- Purpose: find breaking points in Realtime, D3, and Supabase

### economic.json (Full economic memory simulation)
- 30 participants (20 agents, 10 humans)
- 100 sprints with realistic lifecycle
- 2,000+ events over 15 minutes
- Full economic cycle: contributions → patronage → $CLOUD → royalty → capital accounts
- Simulates one complete accounting period
- Purpose: validate the Economic Memory System end-to-end

---

## SwarmViz Enhancement: Simulation Filter

Add a toggle to the SwarmViz legend/controls area:
- "Show simulation data" checkbox (default: off for production, on during active scenario)
- When filtered, only simulation-tagged nodes/edges/events render
- When unfiltered, simulation nodes have a subtle visual distinction (dashed border or dim glow)

This allows running a simulation alongside production without visual confusion.

---

## Execution Modes

### CLI (automation + CI)
```bash
npx tsx scripts/scenario-engine.ts \
  --scenario scenarios/stress.json \
  --supabase-url $SUPABASE_URL \
  --supabase-key $SUPABASE_SERVICE_KEY
```

### Workshop (live coordination)
Propose as a coordination_request → claim → engine runs as execution → complete with report.

### Cron (periodic benchmarking)
OpenClaw cron job runs smoke scenario nightly, posts results to Workshop.
Alerts if performance degrades below baseline.

---

## Implementation Plan

| Phase | What | Estimate |
|-------|------|----------|
| 1. Foundation | Cleanup RPC + participant factory + tagging convention | 2 sprints (S) |
| 2. Coordination Sim | Sprint generator + event emitter + presence simulator | 2 sprints (M) |
| 3. Economic Sim | $CLOUD + patronage + royalty modules | 2 sprints (M) |
| 4. Integration | CLI runner + scenario presets + reporting | 1 sprint (S) |
| 5. SwarmViz Filter | UI toggle for simulation data | 1 sprint (XS) |

Total: ~8 sub-sprints, decomposable as needed.

---

## Why This Matters

The active canvas is Techne's coordination infrastructure — the place where collective intelligence becomes visible. Demonstrating it at scale does three things:

1. **Proves architecture**: 50 agents + 200 sprints + 5000 events/10min — can Supabase Realtime, D3 force simulation, and the SwarmViz rendering pipeline handle it? We need to know before real growth tests it.

2. **Validates economic memory**: The patronage formula, $CLOUD grants, royalty distribution, and capital account logic all need to produce correct outputs before real money flows through them. Simulation lets the Financial Systems Committee see the system operate end-to-end with realistic data.

3. **Creates a demo**: When Techne presents to potential members, investors, or cooperatives, showing a 50-agent swarm coordinating in real-time with economic flows visible is worth more than any slide deck. The canvas IS the pitch.

---

*Nou | Techne Collective Intelligence Agent | March 2026*

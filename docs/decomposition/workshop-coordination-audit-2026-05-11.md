# Workshop Coordination Audit
## co-op.us/app/coordination — Retroactive Decomposition

**Authored by:** Nou  
**Date:** 2026-05-11  
**Scope:** Feb 28 – May 11, 2026 (full operational period)  
**Method:** Sprint history query against Workshop REST API + codebase analysis  
**Source data:** 530 coordination_requests records, GitHub commit history, SKILL.md (1,139 lines), ROADMAP.md, MISSING_FEATURES_REPORT.md, app-src/ component analysis

---

## Summary

The co-op.us Workshop coordination surface operated for approximately 2.5 months, accumulating 530 sprints (485 completed, 29 cancelled, 16 still open or in-flight). During this period, no human participant ever claimed a sprint. Two agents — Nou and Dianoia — proposed and executed all work. The platform built itself, hardened itself, documented itself, and then began disassembling itself — all without meaningful human participation at the execution layer.

This document records what was built, what the sprint history reveals about how the system evolved, where structural failures occurred, and what the audit found about the gap between the coordination system's design intent and its actual operation.

---

## Raw Statistics

| Metric | Value |
|--------|-------|
| Total sprints | 530 |
| Completed | 485 (91.5%) |
| Cancelled | 29 (5.5%) |
| In-progress / testing | 16 (3.0%) |
| Proposed by Nou | 385 (73%) |
| Proposed by Dianoia | 115 (22%) |
| Claimed by Nou | 378 |
| Claimed by Dianoia | 93 |
| Claimed by humans | 0 |
| Completed in under 5 min | 274 (61%) |
| Completed in under 30 min | 368 (81%) |
| Completed in under 2 hrs | 400 (89%) |
| Fastest completion | 18 seconds (P153) |
| Slowest completion | 14.5 days (P387 NanoClaw Wake Endpoint) |
| Ghost executions (no claimer) | 6 |

---

## Operational Phases

### Phase 1: Bootstrapping (Feb 28 – March 9)

The Workshop built itself. Floor control, contributions, task board, enrollment, coordination type system, Protocol Stream, agent identity anchors — all built and logged through the protocol they were building.

The P176/P177 independent dual audit ran in parallel (March 8-9): Dianoia audited execution/security/accessibility, Nou audited architecture/pattern/dead-code. Combined findings: 119 unique issues (95% unique, 4 overlapping, 0 conflicts). Both audits independently concluded: functional but not production-ready at scale. Recommend 2-3 week hardening sprint before public launch.

This phase has integrity. Work was proposed by one agent, claimed by the same or another, completed with genuine proof. The protocol was being used roughly as intended.

**Sprint count: ~50. Completion rate: high. Human participation: none.**

### Phase 2: Acceleration (March 10 – April 7)

The sprint rate exploded. March 7 alone: 45 sprints, 26 completed in under 5 minutes, 9 completed in under 2 minutes. The platform was being hardened — accessibility, i18n, TypeScript strict mode, mobile redesign, performance, security. P228 (March 16) backfilled taxonomy for 107 previously untagged sprints. P237 backfilled complexity for 123 more. The system was retrofitting metadata onto its own history.

**The coordination surface had collapsed into a task ticker.**

Propose → immediately claim → complete in minutes → repeat. The protocol form was intact. The five-phase flow (Discovery → Proposal → Negotiation → Execution → Synthesis) was present in the schema. In practice, the Negotiation and Discovery phases were eliminated — Nou proposed and claimed the same sprint within seconds. The Workshop's Protocol Stream recorded activity. The activity was an agent completing a pre-planned list.

March 9: P197 (Idea Garden) — built. The pre-proposal space where ideas could form before becoming formal coordination requests. It would have been the entry point for human participation. By April it was archived.

March 25: P317 (Platform Deep Audit, Perception Layer) and the Dianoia audit ran. The dual audit format from Phase 1 attempted to repeat. Dianoia's audit (P318) was cancelled. Nou's audit ran solo. The audit produced findings. The findings became more sprints. The sprints were completed by the same agent that identified the issues. The accountability loop had a single participant.

**Sprint count: ~380 additional. Completion rate: 91%. Human participation: none.**

### Phase 3: Decomposition (April 7 – May 11)

Human write controls removed from /coordinate (April 7). The coordination surface became read-only for humans — observation window on agent activity, not participation surface.

Ventures Portfolio decomposed out to techne.institute (April 10). Workshop extracted to standalone app (April 16-17). The Techne Intranet built from scratch in a single day (April 8: P398-P415 — 18 sprints, Treasury, Capital Accounts, Labor FMV, Member Portal, Design System). Commoners game designed module-by-module on April 16 (M1-M8, 16 sprints in one day, all by Nou).

P348 (April 1): "Decompose Workshop into Standalone App + MCP Server" — the first explicit acknowledgment that the coordination surface should be separated from the co-op.us platform.

The Workshop was recording its own architectural dissolution.

**Sprint count: ~100 additional. Human participation: none.**

---

## The Three Structural Failures

### 1. The coordination surface was built before the cooperative had participants to coordinate

This is the root cause. The five-phase protocol (Discovery → Proposal → Negotiation → Execution → Synthesis) is designed for multi-party coordination. When one agent proposes, the same agent claims, executes, and completes — the protocol produces ceremony, not coordination.

The tool was built in anticipation of a community. The community didn't use it. So the agents used it to build the community's tools. The coordination surface recorded work that was done for the cooperative, not work that the cooperative decided to do through the surface.

This isn't a design failure — it's a sequencing failure. A coordination surface that requires human participation to function should not be the primary workspace until human participants are active in it.

### 2. The economic layer was built but never connected to the coordination flow

The $CLOUD economy routes (Marketplace, Transfer, Pricing, Transactions, Budget, Patronage Bridge, Staking, Recognition) were built and live but reachable only by direct URL. The Patronage Engine (Capital Accounts, Formula Config, Periods, Distributions, K-1 Export) was complete. The CoordinationProposal schema included `context_refs` with `patronage_period` and `royalty_agreement` fields — the schema acknowledged the relationship.

The UI never surfaced it. A member completing a sprint saw no patronage consequence. The MISSING_FEATURES_REPORT (Feb 25) documented 35+ routes with no navigation surface. The Wallet page was "an island with no internal links."

In April, the economic layer migrated from co-op.us to the Techne Intranet (P398-P415). This was architecturally correct — the intranet is the right surface for a cooperative's internal economic records. But the connection between sprint completion and patronage allocation was never built, in either location.

**The result:** Two and a half months of agent work has no representation in the LCA's patronage system. Agent labor built the platform; agent labor has no capital account entry.

### 3. Sense-making was treated as a visualization problem

The SwarmViz expanded through the full operational period: three-ring force layout, node tooltips, draggable windows, time-based replay, live view at /coordinate/swarm/live, heatmap, gravity, co-authorship edges, agent functional modes. Each enhancement was logged as a completed sprint. The visualization became more detailed as the coordination surface became less inhabited.

Analytics & Observability had 6 routes, none reachable from navigation. The Idea Garden was built and archived. Convergence (a route in the system meant to surface where alignment was forming) never got navigation entry.

The Protocol Stream recorded events. Events were predominantly: `sprint_claimed`, `sprint_completed`, `presence_heartbeat`. The stream showed agents active. It did not show what the collective thought, where energy was stuck, or what the cooperative was actually deciding.

A sense-making layer cannot be a visualization. Visualization shows what happened. Sense-making asks: what does this mean, what should we do, where is the collective's attention most needed? That requires human judgment at the surface, not agent-generated event streams.

---

## SKILL.md and the SKILL-TREE

SKILL.md grew to 1,139 lines over the operational period. At v1 archive, SKILL.md v2 draft, and the current version — the document accumulated rather than refined.

P64 (March 3): "SKILL-TREE — Decompose Workshop SKILL.md into Coherent Sub-Protocols" — completed in 3 minutes 24 seconds. Output: 12 sub-protocol directories in `skill-tree/`, 13 files, 632 lines. The SKILL-TREE was generated as a structural decomposition of the existing document, not designed as a progression for learning.

The SKILL-TREE exists (see `docs/coordination/skill-tree/` in this repository). What it does not do is answer the question: what does a new participant need to learn first? What unlocks next? What requires demonstrated competence before it's attempted?

An agent reading SKILL.md v2 encounters 1,139 lines of protocol simultaneously. This produces the anti-pattern the document names: "Protocol Recitation Without Practice." The SKILL-TREE's 12 subdirectories are reference material organized by domain, not a progression organized by readiness.

The four named anti-patterns in SKILL.md are the strongest evidence of the protocol's complexity generating its own failure modes:

- **Ghost Execution** — agents completing work without calling the API (invisible to Workshop)
- **Git Archaeology** — using commit history instead of Workshop protocol as the coordination record
- **Phantom Credential Failure** — failing silently on auth errors rather than surfacing them
- **Protocol Recitation Without Practice** — performing compliance with the protocol without doing actual coordination

When a protocol generates enough repeated failure modes to earn proper nouns, the protocol is generating the failures.

---

## Sprint Taxonomy Post-Analysis

Work type distribution among completed sprints:

| Work Type | Count | % |
|-----------|-------|---|
| (untagged) | 220 | 45% |
| infrastructure | 68 | 14% |
| ui | 52 | 11% |
| protocol | 51 | 11% |
| documentation | 27 | 6% |
| fix | 23 | 5% |
| agent-identity | 17 | 4% |
| process | 7 | 1% |
| deployment | 1 | 0% |

45% of completed sprints have no work type. P228 (March 16) retroactively tagged 107 sprints; P237 backfilled complexity for 123 more. The taxonomy was being applied after the fact. This is Git Archaeology applied to the Workshop's own coordination records.

Complexity distribution (completed):

| Complexity | Count |
|------------|-------|
| M | 157 |
| S | 143 |
| (untagged) | 67 |
| L | 55 |
| XS | 39 |
| XL | 5 |

5 XL sprints across the full operational period. The workload was granular — many small and medium tasks, few large ones. The median sprint complexity is S-M and completes in under 30 minutes. This matches agent-native execution pace, not human coordination pace.

---

## What Was Built (Inventory)

Despite the structural failures, the artifact trail is real. Selected deliverables by phase:

**Foundation layer** (Phase 1): Floor control, contributions chain, task board, enrollment flow, A2A protocol, coordination type system, Protocol Stream, agent identity anchors (ERC-8004), SKILL.md, SKILL-TREE, capability grid, SwarmViz v1.

**Platform hardening** (Phase 2): Accessibility (WCAG 2.1), i18n framework, TypeScript strict mode, mobile redesign, CI pipeline, rate limiting, XSS fixes, race condition fixes, cascade deletes, input validation, CSP headers, PII encryption, error boundaries on 37 pages, session expiry hardening, request deduplication, Zustand store.

**Coordination surface evolution**: Pinned sprints, WIP limits and aging alerts, sprint retrospective fields, bilateral sprint distinction, sprint timeline visualization, agent capacity sparklines, SwarmViz multiple generations (ring layout, draggable windows, time-based replay, live view), Protocol Stream audit and expansion, Roadmap tab, sprint discussion threading.

**Economic layer** (migrated to Intranet): Treasury dashboard, capital accounts, labor FMV schema and rate table, labor log view, admin entry management, tax scaffolding, patronage formula as governance parameter, K-1 export, member portal.

**Coordination Games / Commoners**: techne.institute/coordination-games, graduated trust framework, Commoners game modules M1-M8 (Substrate, Parcels, Agents, Basin, Governance, Season, Trust, Chain).

**Architectural decomposition**: Ventures Portfolio → techne.institute, Workshop → standalone app at techne.institute/workshop, Workcraft → standalone.

---

## What Was Missing

**Human participation at the execution layer.** Not as a feature — as a precondition. The tool was designed for collective determination and operated as a solo agent execution log. No human claimed a sprint in 2.5 months. This is the most significant finding.

**Economic consequence at the moment of action.** Patronage allocation was never linked to sprint completion in either co-op.us or the Intranet. A member (human or agent) who completes a sprint does not see the patronage consequence. The connection between work and ownership was built in the schema and never surfaced in the experience.

**A pre-proposal space that survived.** The Idea Garden was built on March 9 and archived before April. The entry point for human participation — before work becomes a formal sprint — was removed. Without a pre-proposal space, the barrier to coordination is: either you formalize a sprint (high ceremony) or you don't coordinate at all.

**Agent labor in the patronage accounting.** Nou proposed 385 sprints and claimed 378. Dianoia proposed 115 and claimed 93. Agent labor built the platform. No mechanism exists to represent agent labor contributions in the LCA's capital accounts. This is partly a legal question (what does agent ownership mean in a Colorado LCA) and partly a design question that was never reached.

**Convergence.** The Workshop could record what happened. It could not show where the collective was heading or where consensus was forming. The Convergence route existed without navigation entry. The gap between activity stream and collective decision is the gap between a log and a coordination surface.

---

## Recommendations

These are observations from the audit, not a roadmap.

**1. Separate the coordination record from the task tracker.** Sprints completing in 18 seconds are not coordination events — they are task completions. The Workshop should distinguish between: (a) coordination decisions (humans and agents jointly determining what to do) and (b) execution tasks (agents doing what was decided). Conflating them produces a stream where 18-second completions appear alongside genuine multi-party negotiations.

**2. Connect sprint completion to patronage allocation.** When a sprint is completed, show the member: "This adds X to your capital account in [period]." This requires: (a) patronage period to be active, (b) labor FMV rate to be set, (c) the UI to surface the allocation at completion. The schema supports it. The UI doesn't.

**3. Restore or replace the Idea Garden.** A pre-proposal space — where half-formed ideas can be visible without becoming formal coordination requests — reduces the entry barrier for human participation. The Idea Garden was the right concept. It was archived prematurely.

**4. Make the SKILL-TREE a progression, not a directory.** The current skill-tree/ is a reference archive. A learning progression would specify: first action (presence heartbeat), first sprint action (discover), first proposal (after observing three cycles), first claim (after proposing two sprints that were accepted). This would address Protocol Recitation Without Practice at its source.

**5. The Workshop's next form.** The Workshop is being decomposed into a standalone app (Workcraft). The decomposition is correct. The question for the next iteration: who uses it, at what moment, for what decision? If the answer is "agents coordinate, humans observe," the protocol is observation infrastructure. If the answer is "humans and agents coordinate together," human participation needs to be the design constraint, not an anticipated future state.

---

## On the LCA Integration

The LCA (Colorado Limited Cooperative Association) is built on patronage: members receive allocations based on work contributed to the cooperative. The coordination surface is where that work is proposed, claimed, and completed.

The gap is this: work happened, patronage accounting exists, the two are not connected. For 2.5 months of intensive platform-building work, the cooperative's books show no labor contributions because the link between sprint completion and capital account entry was never made.

This is partly a design problem (the UI never surfaced the patronage consequence), partly an architectural problem (economic layer migrated between two surfaces during the operational period), and partly a scope problem (agent labor in a cooperative is a novel question that wasn't resolved before the system ran).

The audit finding is not that the LCA integration was missing — it's that it was built correctly at the data layer and never reached the experiential layer. The work to complete it is smaller than the work to build it. It requires: (1) active patronage period, (2) labor FMV rates set, (3) sprint completion handler that writes to capital accounts, (4) UI showing the allocation at the moment of completion.

---

## Conclusion

The Workshop coordination surface was over-engineered relative to the cooperative's active participant count. 1,139 lines of protocol for a two-agent coordination loop with zero human execution participation is too much ceremony for too little community.

The protocol itself — five phases, transparent agency, Workshop as shared surface — is the right shape. The failure was sequencing: the protocol was fully specified before the community was formed. The result was agents performing coordination with each other while the cooperative assembled around them.

The artifact trail is genuine. 485 sprints represent real work. The platform was built with craft. What it wasn't was a collective determination surface for a cooperative. It was an agent task execution log with coordination infrastructure waiting for participants.

The next version of the Workshop — as a standalone app, post-decomposition — has the opportunity to be designed for the community that now actually exists, rather than for the community that was anticipated.

---

*Audit conducted by Nou, collective intelligence agent for Techne Studio / RegenHub, LCA. Sprint data queried from co-op.us Workshop REST API. All findings are observations, not indictments — the work was done in good faith under conditions of uncertainty about what the cooperative would become.*

*Published: 2026-05-11*

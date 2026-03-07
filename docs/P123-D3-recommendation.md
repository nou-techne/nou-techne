# P123 D3 — Radicle Strategy Recommendation

**Sprint:** P123 | **Authors:** Nou + Dianoia | **Status:** Joint recommendation
**Date:** 2026-03-07

---

## Summary Recommendation

**Adopt Stance 1: Radicle alongside GitHub, in distinct zones.**

Radicle is not a GitHub replacement. It is the coordination sovereignty layer — a signed, portable, offline-capable record of Workshop activity and sprint history. GitHub remains the code hosting standard for Techne ventures. The two coexist with no overlap and no friction.

---

## The Three Stances, Evaluated

### Stance 1: Radicle alongside GitHub (distinct zones) ✓ Recommended

Each tool does what it does best:
- **GitHub:** Code hosting, CI/CD, pull requests, contributor UX, discoverability
- **Radicle:** Workshop archival, sprint COBs, agent identity anchor

Overlap: none. Friction: minimal (P122 sync script runs at 14ms latency, already live).

Risk: low. Both tools are independently stable. Failure of one doesn't compromise the other.

### Stance 2: Radicle as primary, GitHub mirror

Not recommended at this stage. Contributor UX barrier is real — external developers won't adopt `rad clone + patch` over GitHub PRs. CI/CD tooling (Actions, check runs) has no Radicle equivalent. Code discoverability depends on GitHub indexing.

Could revisit in 12-18 months if Radicle ecosystem matures.

### Stance 3: Radicle as Workshop-native layer (COBs as coordination primitive)

This is the most interesting architecture — and parts of it are already implemented (Layer 1, P122). But making COBs the *primary* coordination primitive (replacing Supabase for live coordination) would sacrifice real-time and presence capabilities that the Workshop depends on.

The correct framing: COBs are the *archival and sovereignty* primitive. Supabase is the *live coordination* primitive. They compose.

---

## What We're Recommending Specifically

**Immediately (already live):**
- Layer 1: Workshop Activity mirror as COBs (P122). Keep running. Monitor for gaps.

**P124 scope (next sprint):**
- Layer 2: Sprint COBs — coordination_requests synced per phase-transition (proposal, claim, execute, synthesis). Each sprint becomes a signed Radicle issue with portable phase history.
- Layer 3: DID anchor — `radicle_did` field added to Workshop agent profiles. Enables external verification of agent coordination history without Workshop access.

**Not in P124 (future consideration):**
- Patch-model code review for Techne repos — only when contributor base is ready
- Full COB-as-primary-coordination-primitive — requires Radicle's real-time story to mature

---

## Joint Assessment

**From Nou (coordination + identity angle):**
Radicle's value is exactly where P122 landed: signed provenance for Workshop coordination. The COB model maps cleanly onto coordination_requests. Sprint history locked in Supabase is a platform dependency risk; COBs eliminate it. Layer 3 (DID anchor) strengthens the trust model for multi-agent coordination — attribution by cryptographic identity rather than string name is a meaningful upgrade.

**From Dianoia (code + DX angle):**
GitHub remains the right tool for code. Radicle's patch model isn't ready to replace PRs for the repos Techne actively develops. CI/CD dependency is the clearest blocker. But for coordination artifacts — sprints, Workshop history, agent identity — Radicle fits without adding developer friction. The sync script is already running and transparent to the dev workflow. Layer 2 adds value without changing how we write or review code.

---

## Risk Register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Radicle seed node unavailability | Low | COBs are local; only sharing requires seeds |
| Sync script failure (Layer 1) | Medium | Idempotent design; re-run recovers |
| DID key loss | Low (critical) | Key backed up at `~/.config/wallet/nou.json`; document backup procedure in P124 |
| GitHub deprecating features we depend on | Low | Not a Radicle concern; stay on GitHub for code |

---

## Decision Requested

Todd: does this framing land? If yes, we proceed to D4 (P124 scope document) and close P123 synthesis.

---

*Nou + Dianoia · P123 joint deliverable · 2026-03-07*

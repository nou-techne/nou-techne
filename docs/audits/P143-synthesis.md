# P143 — Synthesis: Convergent & Divergent Findings

**Auditors:** Nou + Dianoia  
**Date:** 2026-03-07  
**Total independent findings:** 62 (31 each)

---

## Convergent Findings (Both audits identified)

These items appeared independently in both audits — high confidence they are real issues.

| # | Area | Nou ID | Dia ID | Finding | Priority |
|---|------|--------|--------|---------|----------|
| 1 | UX | C1.8 | 1.1, 1.4 | Mobile layout overflow — sprint tabs, Craft Presence grid, phase selector | HIGH |
| 2 | UX | S1.2 | 1.5, 1.6 | SwarmViz mobile: height formula crops content, bottom panels hidden, legend blocks viewport | CRITICAL |
| 3 | Bug | C1.9 | — (partial: 2.6) | Click handler conflicts — card navigate vs expand, repo click behavior inconsistency | MEDIUM |
| 4 | Perf | P4.2 | 4.4 | SwarmViz re-renders too aggressively — full SVG rebuild on hover / force sim runs continuously | HIGH |
| 5 | Perf | P4.1 | — (implicit) | Coordinate.tsx monolith (3163+ lines, 25+ state hooks) — both audits note scattered concerns that trace to this | MEDIUM |
| 6 | Protocol | PA6.1 | 6.5 | Five-phase negotiation partially represented — exists in code, rarely used in practice | LOW |
| 7 | Data | — | 5.7, C1.5 | Missing fallbacks — craft symbol undefined, complexity badge misaligned when field absent | MEDIUM |
| 8 | UX | S1.6 | 1.6 | Legend toggle undiscoverable — no label, obscures content on narrow viewports | MEDIUM |
| 9 | Enhancement | E3.1 | 3.5 | Sprint filtering on active sprints (Nou: by layer/claimer, Dia: by status toggle) | MEDIUM |
| 10 | Enhancement | E3.8 | 3.8 | Agent profile cards need better interaction affordance / member page linking | LOW |

**Convergence rate:** ~10 of 31 findings per audit overlap (32%). Strong for independent reviews.

---

## Divergent Findings — Unique to Nou

These came from Nou's deeper dive into data layer, architecture, and edge cases:

| # | ID | Finding | Priority |
|---|-----|---------|----------|
| 1 | B2.1 | Compact sprint grid column misalignment (complexity badge breaks 6-col grid) | HIGH |
| 2 | B2.2 | Floor control request_floor is a no-op (doesn't set current_speaker_id) | HIGH |
| 3 | C1.3 / D5.1 | Workshop compose creates authorless messages (no participant_id) | HIGH |
| 4 | D5.3 | Completed sprints `.limit(200)` — at 143 now, approaching silent data loss | HIGH |
| 5 | PA6.6 | Pinned status destroys original sprint status (lossy state transition) | HIGH |
| 6 | C1.6 | `dangerouslySetInnerHTML` for markdown — XSS risk if sanitization insufficient | MEDIUM |
| 7 | B2.4 | Protocol events query has no time window on /coordinate (unbounded growth) | MEDIUM |
| 8 | B2.6 | Realtime reconnection has no backoff (2s retry forever) | MEDIUM |
| 9 | PA6.3 | Workshop compose doesn't emit protocol events (invisible to Protocol Stream) | MEDIUM |
| 10 | C1.10 | Pagination resets when Realtime updates arrive | LOW |
| 11 | E3.5 | Protocol Stream daily summary aggregation | LOW |
| 12 | E3.9 | Pinned work reordering support | LOW |

---

## Divergent Findings — Unique to Dianoia

These came from Dia's mobile-first perspective and protocol compliance focus:

| # | ID | Finding | Priority |
|---|-----|---------|----------|
| 1 | 2.5 | Touch events missing on SwarmViz (mobile unusable) | CRITICAL |
| 2 | 1.2 | Font sizes below WCAG 2.1 readability threshold (<12px on mobile) | HIGH |
| 3 | 6.2 | WIP limits (P132) not surfaced in UI — protocol exists but invisible | MEDIUM |
| 4 | 6.3 | Aging sprint alerts (P132) not surfaced in UI | MEDIUM |
| 5 | 6.4 | Sprint retrospectives not distinguished from result_summary | MEDIUM |
| 6 | 6.7 | Agent functional modes not shown in SwarmViz (shown in /coordinate only) | MEDIUM |
| 7 | 6.9 | Bilateral sprints visually identical to unilateral | LOW |
| 8 | 3.1 | Sprint timeline visualization (duration bars) | Enhancement |
| 9 | 3.2 | Agent capacity trending (24h sparklines) | Enhancement |
| 10 | 3.6 | Agent-to-agent co-authorship edges | Enhancement |
| 11 | 3.7 | Time-based "replay" animation mode | Enhancement |
| 12 | 6.10 | Radicle integration gap (P123 roadmap item) | Future |

---

## Unified Priority List — Top 15 Fixes

Combining both audits, weighted by convergence + severity:

| Rank | Finding | Source | Severity | Effort |
|------|---------|--------|----------|--------|
| 1 | SwarmViz mobile: height formula + touch events + bottom panels | Both | CRITICAL | M |
| 2 | Compact grid column misalignment (complexity badge) | Nou | HIGH | XS |
| 3 | Floor control request_floor no-op | Nou | HIGH | XS |
| 4 | Workshop compose authorless messages | Nou | HIGH | S |
| 5 | Completed sprints .limit(200) approaching cap | Nou | HIGH | XS |
| 6 | Pinned status destroys original sprint status | Nou | HIGH | S |
| 7 | Craft Presence grid mobile breakpoint | Dia | HIGH | XS |
| 8 | Font sizes WCAG compliance | Dia | HIGH | S |
| 9 | SVG re-render on hover (performance) | Both | HIGH | M |
| 10 | Realtime reconnection backoff | Nou | MEDIUM | XS |
| 11 | WIP limits + aging alerts in UI | Dia | MEDIUM | S |
| 12 | Protocol events unbounded query | Nou | MEDIUM | XS |
| 13 | Legend discoverability + mobile positioning | Both | MEDIUM | S |
| 14 | Sprint filtering on active tab | Both | MEDIUM | S |
| 15 | Coordinate.tsx component decomposition | Nou | MEDIUM | L |

---

## Observations on Audit Complementarity

The independent approach produced genuinely different coverage:

- **Nou** found more architectural and data integrity issues (floor control no-op, authorless messages, limit(200) approaching cap, pinned status lossy). These are the kind of bugs that accumulate silently.
- **Dianoia** found more mobile/responsive and protocol compliance gaps (touch events, WCAG, WIP limits visibility, aging alerts). These are the kind of issues that affect real users on real devices.
- **Neither** would have caught the full picture alone. The 32% convergence rate validates that both were looking at the same system; the 68% divergence validates that independent perspectives found genuinely different things.

The most dangerous finding is probably **D5.3** (completed sprints limit) — at 143 of 200, this will silently drop data within 2-3 weeks at current sprint velocity. Not urgent today, but the kind of thing that causes confusion when it hits.

---

*P143 synthesis complete. Ready for sprint proposals addressing the top priorities.*

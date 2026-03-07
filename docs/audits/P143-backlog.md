# P143 Audit Backlog — M/L Sprints

**Source:** P143 bilateral audit synthesis (Nou + Dianoia, 2026-03-07)
**Status:** Backlog — not yet proposed as coordination requests

---

## Medium Sprints (M, 5-10h each)

### SwarmViz Mobile Overhaul (expand P135 scope)
- **Findings:** Both C2, Dia 1.5, Dia 2.5, Nou S1.2
- **Scope:**
  - SVG height formula: dynamic instead of 600px min
  - Touch events: add touch handlers for all hover-dependent interactions
  - Bottom panels: collapsible or hidden on mobile, expand on tap
  - Font sizes: WCAG 2.1 compliance (see P152)
  - Craft Presence grid: responsive breakpoints (see P151)
  - Legend: mobile-appropriate positioning (see P154)
- **Dependencies:** P151, P152, P154 can be done independently first as S sprints
- **Notes:** This is the umbrella mobile sprint. Individual S sprints chip at pieces; this addresses the integrated mobile experience.

### SVG Hover Performance Separation
- **Findings:** Both C4 (Nou P4.2, Dia 4.4)
- **Scope:**
  - Separate hover/highlight rendering from structural SVG rebuild
  - D3 force simulation: stop after stabilization, restart only on data change
  - Memoize node positions after sim completes
  - Measure: re-render count before/after
- **Notes:** Performance waste, not a bug. Users won't notice on fast machines, but it compounds with node count growth.

### Workshop Compose Protocol Events
- **Finding:** Nou PA6.3
- **Scope:** Messages sent via Workshop compose should emit protocol events (message_sent or equivalent) so they appear in Protocol Stream. Currently invisible to Protocol Stream.
- **Dependencies:** P149 (authorless messages) should land first — same code path.

---

## Large Sprint (L, 12-20h)

### Coordinate.tsx Component Decomposition
- **Findings:** Both C5 (Nou P4.1, Dia implicit)
- **Scope:**
  - Current: 3163+ lines, 25+ useState hooks, single monolithic component
  - Target: Extract into focused components:
    - CraftPresenceGrid — agent presence + craft display
    - FloorControlPanel — phase, speaker, queue, signals
    - SharedLinksPanel — link-share display + management
    - SprintList — active/completed/pinned sprint tabs with filtering
    - WorkshopCompose — message composition + send
    - ProtocolStream — event timeline display
  - Each component owns its state, subscriptions, and rendering
  - Parent Coordinate.tsx becomes layout + routing only
- **Dependencies:** Should follow P149, P150, P155 (fixes that touch Coordinate.tsx internals)
- **Notes:** This is the architectural quality sprint. Every fix to Coordinate.tsx currently requires navigating 3000+ lines. Decomposition makes future work faster and less error-prone. Schedule after mobile + bug fix sprints stabilize.

---

## Enhancement Backlog (Future — from Dia's audit)

These are enhancement ideas, not bugs. Worth tracking but not urgent:

1. **Sprint timeline visualization** — duration bars showing sprint lifecycle (Dia 3.1)
2. **Agent capacity trending** — 24h sparklines on presence cards (Dia 3.2)
3. **Agent-to-agent co-authorship edges** — SwarmViz edges between agents who co-author sprints (Dia 3.6)
4. **Time-based replay animation** — animate SwarmViz state over time (Dia 3.7)
5. **Bilateral sprint visual distinction** — different visual treatment for spec-author + implementer pattern (Dia 6.9)
6. **Sprint retrospective distinction** — separate retrospective section from result_summary for M+ sprints (Dia 6.4)
7. **Agent functional modes in SwarmViz** — show P27 modes in SwarmViz pop-ups, not just /coordinate (Dia 6.7)

---

*Generated from P143 bilateral audit. XS/S sprints proposed as P144-P155 in Workshop.*

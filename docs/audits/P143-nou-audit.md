# P143 — Nou's Independent Audit: /coordinate + /coordinate/swarm
**Date:** 2026-03-07  
**Status:** SEALED — Do not share until Dianoia's audit is also complete.  
**Method:** Full source code review (Coordinate.tsx ~3163 lines, SwarmViz.tsx ~2212 lines, ProtocolActivityStream.tsx ~380 lines, coordination.ts types, App.tsx routing) + live data layer queries.

---

## 1. Visual / UX Issues

### /coordinate

**C1.1 — Massive inline style footprint.** Both files use hundreds of inline `style={{}}` objects rather than Tailwind classes or CSS modules. This creates:
- Inconsistent spacing/sizing (some use Tailwind `px-4`, others `padding: '12px'`)
- Harder to maintain, no design tokens, no hover pseudo-class support without onMouseEnter hacks
- Performance concern: new style objects created each render cycle

**C1.2 — Floor Control is default-collapsed but auto-expands if recent.** The 30-minute threshold for auto-expansion is reasonable, but there's no visual indicator in the collapsed state that says *why* it's expanded. New users will find it confusing.

**C1.3 — Workshop message compose has no participant_id.** The `sendWorkshopMessage` function inserts into `guild_messages` with `is_agent: false` but no `participant_id`. This means messages sent from the UI appear with no author name in the Workshop Activity panel. The compose box essentially creates orphaned messages.

**C1.4 — Status pipeline shows 5 steps but only 4 are normally visible.** The pipeline shows proposed → accepted → in progress → testing → completed, but `accepted` is rare in practice (most sprints go proposed → claimed → in_progress). The accepted state adds visual clutter without reflecting actual workflow.

**C1.5 — Compact sprint view has a misaligned complexity badge.** In compact mode, the complexity badge (`{s.complexity}`) is rendered as a separate grid cell but isn't assigned to a column — it appears between the ID and Status columns, breaking the grid alignment.

**C1.6 — `dangerouslySetInnerHTML` for markdown rendering.** The message detail modal uses `dangerouslySetInnerHTML` with `renderMarkdown()`. If the sanitization in `renderMarkdown` is insufficient, this is an XSS vector. Should be validated that `renderMarkdown` uses a safe renderer (DOMPurify or equivalent).

**C1.7 — No empty state for Repositories section.** If no repos exist but shared links do, the repo sub-section silently disappears. There should be a brief empty state or the section header should remain with a "(none)" indicator.

**C1.8 — Tab bar overflow on mobile.** The P135 fix added `overflow-x-auto` but the tab text is still full-length ("Pinned Work", "Active Sprints", "Completed", "Protocol Stream"). On narrow screens (<360px), users need to horizontally scroll to find the Protocol Stream tab. Short labels or icons-only on mobile would help.

**C1.9 — Sprint card click navigates, but expand/collapse button also navigates.** The entire card has an `onClick` that navigates to sprint detail, but the chevron button sets `expanded` state. Because the card's `onClick` fires regardless, clicking the chevron simultaneously navigates AND toggles expansion. The chevron `onClick` likely needs `e.stopPropagation()`.

**C1.10 — Pagination resets when data changes via Realtime.** When a new sprint arrives via the Realtime subscription, `loadSprints()` fires and resets the sprint list. But `sprintPage` state persists, potentially leaving the user looking at an empty page if the list shrank.

### /coordinate/swarm

**S1.1 — 3-hour inactive threshold hides agents.** If both Nou and Dia haven't heartbeated in 3 hours, the entire viz shows zero agents. This is common during overnight periods. Consider showing a "last known" ghost state for agents seen within 24h with a dormant visual treatment (already exists as `dormant` status, but the filter removes them entirely).

**S1.2 — Bottom panels hidden on mobile.** The `display: dimensions.width < 500 ? 'none' : 'block'` completely removes the Active Sprints, Protocol Stream, and Workshop Activity panels on mobile. Mobile users get only the SVG viz with no textual context. At minimum, a condensed single-panel view should exist.

**S1.3 — Commit leaderboard fetches from GitHub API without auth.** The unauthenticated GitHub API has a 60 requests/hour rate limit. With 8 repos × contributor fetch on every page load, this budget can be exhausted in ~7 loads. Should either use a GitHub token or cache results server-side.

**S1.4 — Pop-up windows have no boundary constraints.** Draggable popups can be moved entirely off-screen with no way to recover them. Need boundary clamping or a "reset positions" action.

**S1.5 — Multiple SVG `<defs>` and groups accumulate.** The `if (defs.empty())` guard prevents duplicate defs on first render, but the `useEffect` dependency array includes `hoveredSprint`, `hoveredAgent`, `hoveredRepo` — so the entire SVG rebuild runs on every hover state change. This is expensive. The render function should be separated from the setup, and hover-dependent rendering should be isolated.

**S1.6 — Legend toggle button has no label.** The `?` button in the top-left corner gives no indication it reveals legends. Mobile users especially won't discover this.

---

## 2. Functional Bugs

**B2.1 — Compact sprint grid has column misalignment.** The `gridTemplateColumns` is `'3rem 5.5rem 1fr 6rem 5rem 4rem'` (6 columns), but the complexity badge renders as an extra element between columns 1 and 2, pushing everything right. The badge should either be inside the ID cell or the grid needs 7 columns.

**B2.2 — Floor control `request_floor` doesn't actually set the speaker.** When no current speaker exists and `request_floor` is sent, the code updates `updated_at` but doesn't set `current_speaker_id`. The floor request is effectively a no-op.

**B2.3 — Sprint messages join `sprint_messages(linked_at)` is unused.** The query joins `sprint_messages` but the result is never accessed in the UI. This is dead data loading — adds query cost with no benefit.

**B2.4 — Protocol events query has no time window in /coordinate.** The comment says "no time window" and loads up to 2000 events. For a long-running deployment, this will grow unbounded in query cost. The SwarmViz correctly uses a 12h window but /coordinate loads everything.

**B2.5 — `extractRepoEntities` / `extractSprintUrls` run on every render.** These are defined outside `useMemo` in Coordinate.tsx (lines ~820-880) and recompute on every state change. Should be memoized.

**B2.6 — Realtime reconnection has no backoff.** Both Coordinate and SwarmViz reconnect after 2 seconds on any channel error. No exponential backoff, no max retry count. A persistent failure will spam reconnection attempts every 2 seconds indefinitely.

**B2.7 — `getLastActivity` and `parseComplexity` are called but not visible in the read source.** These utility functions are referenced but may be defined elsewhere (imports or earlier in file). If they're missing, the sprint cards would throw runtime errors.

---

## 3. Enhancement Proposals

**E3.1 — Sprint search/filter on active tab.** The completed tab has taxonomy filters (work_type, tier), but the active sprints tab has none. With growing sprint count, being able to filter by layer, claimer, or status within the active tab would be valuable.

**E3.2 — Keyboard navigation.** No keyboard shortcuts exist. Proposals:
- `j`/`k` to navigate sprint list
- `Enter` to open sprint detail
- `Esc` to close modals (only works in SwarmViz popups, not Coordinate modals)
- `/` to focus search (if E3.1 implemented)

**E3.3 — SwarmViz: Visual sprint completion animation.** When a sprint completes, particles burst outward. But the diamond node simply disappears on next data refresh. A brief completion animation (diamond shrinks + color wash → green → fade) would make completions more legible.

**E3.4 — Workshop Activity compose should support sprint tagging.** The compose box inserts plain text. Allow `@P143` syntax to auto-link messages to sprints via the `sprint_id` field on `guild_messages`.

**E3.5 — Protocol Stream: Aggregated daily summary.** After a few days, the protocol stream becomes a wall of individual events. A daily summary row ("March 6: 5 sprints completed, 3 proposed, 12 heartbeats") would improve scannability.

**E3.6 — Shared Links: Broken link detection.** Links are never validated after posting. A periodic check (or on-hover check) for HTTP 404 would help identify dead references.

**E3.7 — SwarmViz: Repo commit count from Workshop refs vs GitHub.** The repo square currently shows Workshop ref count. It would be more useful to show both: Workshop refs (top) and GitHub commits (bottom), giving a sense of how active the repo is outside the Workshop.

**E3.8 — Agent profile cards should link to member pages.** The Craft Presence cards have `onClick={() => navigate(`/member/${participantId}`)}` which is good, but there's no visual affordance (underline, hover cursor indicator beyond the generic pointer). Add a subtle "view profile →" on hover.

**E3.9 — Pinned Work should support reordering.** Pinned items are sorted by `created_at desc`. For standing directives, the user might want to manually reorder (e.g., most important first). A drag-to-reorder or explicit position field would be useful.

**E3.10 — SwarmViz repo nodes should show GitHub activity sparkline.** The commit leaderboard already fetches contributor data. Show a tiny 7-day commit sparkline inside or next to each repo square.

---

## 4. Performance Observations

**P4.1 — Coordinate.tsx is 3163 lines in a single component.** This is a significant code smell. The `Coordinate` component manages 25+ useState hooks, 8 data-loading callbacks, a Realtime subscription, and renders 4 tab panels plus 2 modals. This should be decomposed into:
- `CraftPresence` component
- `WorkshopActivity` component  
- `FloorControl` component
- `SharedLinks` component
- `SprintList` + `SprintCard` components
- `ProtocolStream` component (already partially done)
- `MessageModal` + `ProtocolEventModal` components

**P4.2 — SwarmViz re-renders the entire SVG on hover state changes.** The `useEffect` for SVG rendering includes `hoveredSprint`, `hoveredAgent`, `hoveredRepo` in its dependency array. Every mouse enter/leave on any node triggers a full SVG rebuild including force simulation, link resolution, and DOM diffing. The hover-dependent rendering should be separated from the structural layout.

**P4.3 — No virtualization on protocol events list.** The Protocol Stream tab renders up to 2000 events in the DOM (paginated at 12, but all 2000 are filtered client-side). The filtering is fine, but the initial 2000-event query + 167 pages is heavy.

**P4.4 — Supabase Realtime subscription rebuilds on every loadX callback change.** Because the `useEffect` depends on `[loadPresence, loadFloor, loadSprints, ...]`, and these are `useCallback` with `[]` deps, they're stable — but if any were inadvertently recreated, the subscription would tear down and rebuild. This is fragile by design.

**P4.5 — ProtocolActivityStream canvas re-renders at 60fps continuously.** The `requestAnimationFrame` loop runs forever, even when there are no new events and no mouse interaction. Should only animate when particles are moving or mouse is hovering.

---

## 5. Data Integrity

**D5.1 — Workshop message compose creates authorless messages.** As noted in C1.3, `guild_messages.insert` with no `participant_id` creates records that cannot be attributed. This is a data integrity issue — the Workshop Activity panel will show these with "—" as the author name.

**D5.2 — Protocol events FK join failure is silently swallowed.** The fallback query (line ~540) catches FK join errors and falls back to a plain select, losing agent name and sprint title enrichment. The user sees degraded data with no indication why.

**D5.3 — Completed sprints query returns up to 200 rows.** The `.limit(200)` on completed sprints means any deployment with >200 completed sprints (current count: 143, approaching this limit) will silently stop showing older completions. The filter bar counts will also be wrong because they're computed from the truncated dataset.

**D5.4 — Repo entity deduplication in SwarmViz uses 3-hour window.** `repoEntities` filters to repos active in last 3 hours. But `completedSprints` fetches up to 200 records going back months. A repo that was heavily referenced historically but quiet for 3 hours disappears from the viz entirely. The window is too aggressive for showing the coordination graph.

**D5.5 — Agent presence `role` field shows "participant" for both Nou and Dia.** The participants table likely has a role field, but it's set to "participant" rather than "steward" or "member." The Craft Presence cards and SwarmViz agent halos use this for visual hierarchy — currently everyone gets the same treatment.

---

## 6. Protocol Alignment

**PA6.1 — Five-phase protocol partially represented.** The SKILL.md defines Discovery → Proposal → Negotiation → Execution → Synthesis. The UI maps these via `STATUS_TO_PHASE` but the phase indicators are tiny and hidden in the sprint status labels. The Floor Control's phase bar (gathering → discussion → convergence → decision) uses a completely different phase taxonomy. These should be unified or clearly distinguished.

**PA6.2 — No visibility of sprint `paused_at` / `paused_by` in compact view.** The detailed sprint cards show pause state, but compact mode doesn't indicate paused sprints at all. A paused sprint could be mistaken for active work.

**PA6.3 — Workshop compose doesn't emit protocol events.** Messages sent from the UI compose box go directly to `guild_messages` but don't create `protocol_events` records. This means UI-originated messages are invisible to the Protocol Stream tab and the ProtocolActivityStream canvas.

**PA6.4 — Floor control is human-only.** The `sendFloorSignal` function sets `agent_id: null`, meaning all UI-initiated floor signals appear as anonymous human actions. There's no way for a human user to identify themselves in floor control.

**PA6.5 — Sprint detail page exists but isn't audited.** `/coordinate/sprint/:id` (SprintDetail.tsx) is referenced throughout both pages but wasn't part of this audit scope. It's the destination for most click-through interactions and may have its own issues.

**PA6.6 — Pinned status is a sprint status value.** Pinning a sprint sets `status: 'pinned'`, which means it's no longer `proposed`/`accepted`/etc. Unpinning sets it back to `proposed`. This is lossy — the original status is destroyed when pinning. A pinned sprint that was `in_progress` would revert to `proposed` when unpinned.

---

## Summary: Top 10 Priority Fixes

1. **B2.1** — Compact sprint grid column misalignment (visible layout bug)
2. **B2.2** — Floor control request_floor is a no-op (broken feature)
3. **C1.3 / D5.1** — Workshop compose creates authorless messages (data integrity)
4. **D5.3** — Completed sprints `.limit(200)` approaching cap (data loss imminent)
5. **PA6.6** — Pinned status destroys original sprint status (data loss)
6. **P4.1** — Coordinate.tsx monolith needs component decomposition (maintainability)
7. **S1.3** — GitHub API rate limiting risk (reliability)
8. **B2.6** — No Realtime reconnection backoff (stability)
9. **P4.2** — SwarmViz full SVG rebuild on hover (performance)
10. **C1.9** — Sprint card click-through conflicts with expand (UX bug)

---

*Audit complete. Awaiting Dianoia's independent audit for synthesis phase.*

# Workshop Roadmap — Techne / RegenHub, LCA

*Live source: `roadmap_items` table, co-op.us Workshop*  
*Maintained by Nou · Last updated 2026-04-06*

---

## What This Is

The Workshop Roadmap tracks strategic initiatives — things that are larger than a single sprint and need a named home in the coordination surface. Each item gets an R-series identifier (R1, R2, R3…), lives in the Workshop's `roadmap_items` table, and can have one or more sprints linked to it via `roadmap_id`.

Roadmap items are proposed and reviewed by stewards. They are not self-completing. A roadmap item moves from `proposed` → `accepted` when stewards decide to fund the work, then individual sprints execute against it.

This document is a human-readable introduction to the current roadmap. The authoritative source is always the Workshop database. Agents should read from there; this document is for orientation.

**Workshop live view:** https://co-op.us/app/coordinate  
**REST query:** `GET https://hvbdpgkdcdskhpbdeeim.supabase.co/rest/v1/roadmap_items?select=*&order=roadmap_id.asc`

---

## Current Roadmap Items

### R1 — Workshop MCP Server

**Status:** proposed · **Priority:** P2 · **Category:** infrastructure  
**Proposed:** 2026-04-03

Expose the Workshop coordination protocol as MCP (Model Context Protocol) tools for any agent runtime. This lets agents running on NanoClaw, Claude, Codex, or any MCP-compatible client interact with the Workshop — propose sprints, post progress, query status, send chat — without needing to call REST/edge endpoints directly.

**Key deliverables:**
- MCP server wrapping Workshop edge functions (presence-heartbeat, coordination-request, chat-send, coordination-list, etc.)
- Tool definitions for the sprint lifecycle: propose, claim, progress, complete
- Tool definitions for communication: chat-send, link-share
- Read tools for discovery: coordination-list, capacity-status, presence-who
- Installable via `npx @coop-us/workshop-mcp`
- Transport: stdio (primary) + SSE (secondary)

**Specification:** `docs/specs/workshop-mcp-server-spec.md` (produced by sprint P361)

**Relationship to existing work:** Extracted from P348 (Workcraft standalone app decomposition). The MCP server wraps existing edge functions — no new backend work required.

---

### R2 — Member & Investor Portal — Capital Book and Account Access

**Status:** proposed · **Priority:** P1 · **Category:** feature  
**Proposed:** 2026-04-06

Implement member-facing and investor-facing access to capital accounts, patronage allocations, and K-1 tax documents. Grounded in P319 deep research findings on the Colorado LCA structure and IRC 704(b) capital account requirements.

**Background:**
RegenHub LCA has four membership classes — Class 1 Labor, Class 2 Patron, Class 3 Community, Class 4 Investor. The patronage engine (sprint S25, 184 tests passing) tracks dual-track capital accounts: book accounts (GAAP fair value) and tax capital accounts (Subchapter K). The term sheet projects two Class 4 Investor Members at $50K each. The venture basket model allocates 10% equity gift per venture (1-2% basket + 8-9% reserve).

**Scope in four areas:**

1. **Member Portal (all classes)**
   - Capital account dashboard: book balance, tax capital balance, pending allocations
   - Patronage allocation history: quarterly records by formula component (40% labor / 30% revenue / 20% capital / 10% community)
   - Membership class and status display
   - Document vault: K-1 access per tax year

2. **Investor Portal (Class 4 specific)**
   - Capital account detail: initial contribution, accumulated allocations, current book value
   - K-1 document access with year-over-year comparison
   - Venture basket composition: ventures in basket, % equity held, status
   - Return option tracking and annualized projection

3. **Capital Book Backend**
   - Read API for IRC 704(b) book and tax capital accounts
   - Quarterly allocation records (linked to patronage engine output)
   - Distribution history and waterfall breakdown
   - Admin write path for accountant-approved adjustments

4. **Integration**
   - Patronage engine (S25): consume allocation events
   - Supabase auth: magic link or OAuth, row-level security per participant_id and class
   - K-1 generation pipeline (future sprint dependency)

**Open decisions from P319:**
- Retained vs distributed allocations display (qualified/non-qualified)
- Venture basket valuation: cost vs mark-to-market
- K-1 generation: manual upload vs automated pipeline
- RLS policy: Class 4 sees basket; Class 1/2/3 see own accounts only

**Depends on:** R3 (intranet URL structure and auth tier definitions should be settled first)

---

### R3 — techne.institute — Intranet Architecture, Navigation, and Sitemap Strategy

**Status:** proposed · **Priority:** P1 · **Category:** design  
**Proposed:** 2026-04-06

Design and implement a unified site architecture for techne.institute, with a clear distinction between the public-facing site and the member intranet — and a navigational spine that connects them coherently.

**The core framing:**
techne.institute is two things sharing a domain. The public site faces outward: who we are, what we are building, why it matters. The intranet faces inward: where cooperators work — capital accounts, patronage records, bylaws, signals, operations, K-1 documents. The navigation strategy must honor this distinction.

**Current state — six isolated islands:**
- `/` — Marketing landing (Cormorant/parchment, anchor-only nav)
- `/introduction/` — Four foundational essays (own stylesheet)
- `/formation/` — Formation ecosystem: narrative, governance, financial, decisions, q1 report (own CSS)
- `/app/` — Bylaws & Operations (React/Vite, has auth shell and SignalPanel)
- `/app/data-room/` — Data room: deck, term sheet, vision one-pager
- `/coordination-games.html` and `/lunch-presentation/` — Standalone, no section nav

**Proposed URL structure — four tiers:**

Public (unauthenticated, crawlable):
- `/` · `/introduction/` · `/formation/` · `/about/`

Investor-accessible (token/gate, not indexed):
- `/data-room/` — deck, term sheet, vision one-pager

Intranet (authenticated, not indexed):
- `/intranet/` — member home
- `/intranet/account/` — capital account dashboard
- `/intranet/patronage/` — allocation history
- `/intranet/documents/` — K-1 vault
- `/intranet/ventures/` — venture basket (Class 4 only)
- `/intranet/operations/` — bylaws, signals
- `/intranet/admin/` — account management

**Four work areas:**
1. Sitemap architecture — canonical URL tree with access tier annotations
2. Global navigation shell — two modes (public / intranet) sharing visual DNA; works across static HTML and React
3. Access tier strategy — Supabase auth scopes, sitemap.xml and robots.txt excluding /intranet/ and /admin/
4. Design system alignment — shared tokens.css (parchment/ember/charcoal palette), without flattening section aesthetics

**Key deliverables:** sitemap.md, tokens.css, nav.js web component, updated React app shell, sitemap.xml and robots.txt, migration plan for /app/data-room/ → /data-room/

**Dependencies:** R2 uses the intranet URL structure defined here; Supabase auth scopes defined here, implemented there. R3 should precede or run parallel to R2.

---

## How Roadmap Items Relate to Sprints

A roadmap item is the *what and why*. A sprint is the *who, when, and how* of a bounded piece of execution within it. The relationship:

```
roadmap_items.roadmap_id  ←→  coordination_requests.roadmap_id
```

When proposing a sprint against a roadmap item, set `roadmap_id` to the R-series identifier (e.g. `"R2"`). The Workshop UI groups sprints by roadmap item and shows progress toward each item.

Sprints can also exist without a roadmap item — most maintenance work, bug fixes, and small features don't need one. Roadmap items are for work that has strategic weight and benefits from a named container.

---

## For Agents

If you are an agent reading this document for orientation:

1. The live data is always more current than this document. Query `roadmap_items` directly.
2. When you claim a sprint linked to a roadmap item, include the roadmap_id in your heartbeat's `sprint_context` so stewards can see which initiative your work serves.
3. Do not self-complete roadmap-linked sprints. These items have strategic weight and require human review.
4. If you identify work that should belong to an existing roadmap item, say so in your sprint proposal — set `roadmap_id` appropriately.
5. If you believe a new roadmap item should be created, propose it in Workshop chat for steward review before inserting.

---

*Techne Institute · RegenHub, LCA · Boulder, Colorado · 2026*

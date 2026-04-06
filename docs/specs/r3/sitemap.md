# techne.institute — Canonical Sitemap

**Sprint:** P362 (R3-A)  
**Date:** 2026-04-06  
**Status:** Proposed — awaiting steward approval before implementation

This document defines the canonical URL structure for techne.institute across four access tiers. All subsequent R3 and R2 sprints build from this as ground truth.

---

## Access Tiers

| Tier | Auth required | Indexed by search engines | Who |
|---|---|---|---|
| Public | None | Yes | Anyone |
| Investor-accessible | Token or Class 4 auth | No | Prospective and current Class 4 investors |
| Intranet | Supabase auth (any membership class) | No | All members (Class 1–4) |
| Admin | Supabase auth (elevated role) | No | Stewards, accountant |

---

## Public Tier

Fully crawlable. Included in sitemap.xml.

```
/                          — Home / landing
/introduction/             — Four foundational essays (index)
/introduction/empire-and-the-people/
/introduction/the-oldest-design-problem/
/introduction/what-was-the-web-for/
/introduction/older-than-the-wire/
/formation/                — Formation ecosystem index
/formation/narrative/      — Origin and purpose
/formation/governance/     — Bylaws and structure
/formation/financial/      — Financial architecture
/formation/decisions/      — Decision log
/formation/open-items/     — Active open items
/formation/q1-2026/        — Q1 2026 report
/about/                    — Studio, organizers, cooperators (new page)
/coordination-games/       — Coordination games (current: /coordination-games.html)
```

---

## Investor-Accessible Tier

Token-gated or Class 4 authenticated. NOT indexed. NOT in sitemap.xml.

```
/data-room/                — Data room index
/data-room/vision/         — Vision one-pager
/data-room/deck/           — Pitch deck
/data-room/term-sheet/     — Term sheet
```

---

## Intranet Tier

Requires Supabase authentication (any membership class). NOT indexed.

```
/intranet/                 — Member home
/intranet/login/           — Auth entry point (magic link, Google OAuth)
/intranet/account/         — Capital account dashboard (all classes)
/intranet/patronage/       — Patronage allocation history
/intranet/documents/       — Document vault (K-1 per tax year)
/intranet/ventures/        — Venture basket (Class 4 only; others redirected)
/intranet/operations/      — Operations home
/intranet/operations/bylaws/   — Bylaws decision tree (BylawsTree)
/intranet/operations/signals/  — SignalPanel, coordination
/intranet/faq/             — Member FAQ (launched with R2-E)
```

---

## Admin Tier

Elevated auth role. NOT indexed.

```
/intranet/admin/           — Admin home
/intranet/admin/members/   — Member list with account balances, last login
/intranet/admin/allocations/   — Quarterly allocation entry
/intranet/admin/documents/     — K-1 upload per member
/intranet/admin/email-changes/ — Email change approval queue
```

---

## URL Migration Map

Current paths that need to move, with phase plan.

### Phase 1 — Parallel Paths (Month 1, sprint P365)
Both old and new paths serve the same content. No redirects. Allows testing.

| Current path | Canonical new path |
|---|---|
| `/app/` | `/intranet/operations/` |
| `/app/data-room/` | `/data-room/` |
| `/app/data-room/data-room.html` | `/data-room/` |
| `/app/data-room/deck.html` | `/data-room/deck/` |
| `/app/data-room/term-sheet.html` | `/data-room/term-sheet/` |
| `/app/data-room/vision-one-pager.html` | `/data-room/vision/` |
| `/coordination-games.html` | `/coordination-games/` |
| `/formation/index.html` | `/formation/` |
| `/formation/narrative.html` | `/formation/narrative/` |
| `/formation/governance.html` | `/formation/governance/` |
| `/formation/financial.html` | `/formation/financial/` |
| `/formation/decisions.html` | `/formation/decisions/` |
| `/formation/open-items.html` | `/formation/open-items/` |
| `/formation/q1-2026.html` | `/formation/q1-2026/` |
| `/introduction/index.html` | `/introduction/` |

### Phase 2 — Soft Redirects (Month 2)
Old paths return 302 (temporary redirect) to new paths. User sees notice: "This URL is moving — update your bookmarks."

### Phase 3 — Hard Redirects (Month 3+)
Old paths return 301 (permanent redirect). Search engines update index.

---

## sitemap.xml Inclusion Rules

**Include:** All public tier pages listed above.  
**Exclude:** `/intranet/*`, `/admin/*`, `/data-room/*`, `/app/*`, `/lunch-presentation/*`

## robots.txt Rules

```
User-agent: *
Disallow: /intranet/
Disallow: /admin/
Disallow: /data-room/
Disallow: /app/
Disallow: /lunch-presentation/
Allow: /
```

---

*Canonical document. Changes require steward approval before implementation.*

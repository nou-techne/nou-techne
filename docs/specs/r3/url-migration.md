# techne.institute — URL Migration Plan

**Sprint:** P362 (R3-A)  
**Date:** 2026-04-06  
**Status:** Proposed — awaiting steward approval

---

## Principles

1. Never break a URL on day 1. All existing URLs must continue working during migration.
2. Phase migration over 3 months: parallel → soft redirect → hard redirect.
3. Hard redirects (301) are permanent — only issue when we are certain old URL is retired.
4. Preserve query parameters and hash fragments through all redirects.

---

## Phase 1 — Parallel Paths (Sprint P365, Month 1)

Old and new paths both serve content. No redirects. Allows testing and bookmark updates.

Implementation via GitHub Pages: new canonical paths added as directories with `index.html` files. Old `.html` files remain in place.

| Old path (remains active) | New canonical path | Notes |
|---|---|---|
| `/app/` | `/intranet/operations/` | React app replicated under /intranet/ |
| `/app/data-room/data-room.html` | `/data-room/` | Copy at new path |
| `/app/data-room/deck.html` | `/data-room/deck/` | Copy at new path |
| `/app/data-room/term-sheet.html` | `/data-room/term-sheet/` | Copy at new path |
| `/app/data-room/vision-one-pager.html` | `/data-room/vision/` | Copy at new path |
| `/coordination-games.html` | `/coordination-games/` | index.html in new dir |
| `/formation/index.html` | `/formation/` | Already works (default) |
| `/formation/narrative.html` | `/formation/narrative/` | index.html in new dir |
| `/formation/governance.html` | `/formation/governance/` | index.html in new dir |
| `/formation/financial.html` | `/formation/financial/` | index.html in new dir |
| `/formation/decisions.html` | `/formation/decisions/` | index.html in new dir |
| `/formation/open-items.html` | `/formation/open-items/` | index.html in new dir |
| `/formation/q1-2026.html` | `/formation/q1-2026/` | index.html in new dir |
| `/introduction/index.html` | `/introduction/` | Already works (default) |

---

## Phase 2 — Soft Redirects (Month 2)

Old paths return `302 Found` to new canonical path. User sees browser address bar update.

Add to each old `.html` file (top of `<head>`):

```html
<meta http-equiv="refresh" content="0; url=/data-room/">
<link rel="canonical" href="https://techne.institute/data-room/">
<script>window.location.replace('/data-room/')</script>
```

Note: GitHub Pages does not support server-side redirects. Until a proper hosting solution is in place, meta-refresh + JS redirect is the mechanism. For the React app, use React Router `<Navigate>` components.

---

## Phase 3 — Hard Redirects (Month 3+)

Old paths return `301 Moved Permanently`. Requires server-side configuration (Netlify `_redirects`, Vercel `vercel.json`, or nginx).

Example `_redirects` file (Netlify):

```
/app/data-room/data-room.html   /data-room/                  301
/app/data-room/deck.html        /data-room/deck/             301
/app/data-room/term-sheet.html  /data-room/term-sheet/       301
/app/data-room/vision-one-pager.html /data-room/vision/      301
/coordination-games.html        /coordination-games/         301
/formation/narrative.html       /formation/narrative/        301
/formation/governance.html      /formation/governance/       301
/formation/financial.html       /formation/financial/        301
/formation/decisions.html       /formation/decisions/        301
/formation/open-items.html      /formation/open-items/       301
/formation/q1-2026.html         /formation/q1-2026/         301
```

---

## Google Search Console

After Phase 1 (P365):
- Submit `/sitemap.xml` to Google Search Console
- Verify ownership via HTML tag in `<head>` of `/`
- Monitor crawl for errors on old paths

After Phase 3:
- Use Search Console URL Inspection to confirm 301s are picked up
- Submit removal requests for any old paths that appear in index

---

## Internal Link Updates (P365 scope)

All internal links across the site should point to canonical new paths from day 1 of P365. Do not wait for Phase 2/3 to update internal navigation. External links (shared data room links, bookmarks) are handled via the redirect phases above.

---

*Canonical document. Changes require steward approval before implementation.*

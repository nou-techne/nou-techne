# Techne Design System — Governance

**Sprint:** P363 (R3-B)  
**Date:** 2026-04-06  
**Files:** `techne.institute/assets/tokens.css`, `techne.institute/assets/components.css`

---

## Three-Tier Model

### Tier 1 — Tokens (enforced globally)

File: `/assets/tokens.css`

Every section of techne.institute **must** import this file and **must** use these tokens for:
- Colors (the full palette: void, ink, charcoal, graphite, parchment, cream, bone, stone, ember, copper, sage)
- Type scale (--text-xs through --text-hero)
- Spacing scale (--space-1 through --space-24)
- Breakpoints (--bp-mobile through --bp-wide)
- Border radius (--radius-sm, --radius-md, --radius-lg)
- Z-index scale (--z-base through --z-toast)

**Why enforced:** Colors and spacing create visual coherence across sections. A visitor moving from landing to formation to intranet should feel they are on the same site, even if the aesthetic mood differs.

**How to import:**
```css
@import url('/assets/tokens.css');
```

### Tier 2 — Components (shared library, optional)

File: `/assets/components.css`

Sections **may** use or override these component patterns:
- Buttons (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-ghost-dark`)
- Cards (`.card`, `.card-light`, `.card-link`)
- Tags and badges (`.tag`, `.badge-green`, `.badge-ember`)
- Form fields (`.form-field`, `.form-label`, `.form-input`)
- Modals (`.modal-backdrop`, `.modal`)
- Layout utilities (`.container`, `.sr-only`)

Sections that need different button or card aesthetics can define their own, but should still use Tier 1 tokens for color and spacing within those definitions.

**How to import:**
```css
@import url('/assets/tokens.css');
@import url('/assets/components.css');
```

### Tier 3 — Section Aesthetics (section-specific, full creative control)

Each section defines its own:
- Font stacks (`--font-display`, `--font-body`, `--font-mono` overrides in section `:root`)
- Layout grids (columns, section padding, hero dimensions)
- Unique component patterns (the formation symbol key, the landing hero, the intranet sidebar)
- Background texture and mood (parchment texture on landing, dark minimal on formation/intranet)

**Rule:** Section overrides must still use Tier 1 token variables for color values, not hardcoded hex. For example:

```css
/* Correct — uses token */
.hero { background: var(--parchment); }

/* Incorrect — hardcodes hex that should be a token */
.hero { background: #f7f5f0; }
```

---

## Section-Specific Font Stacks

Each section overrides the default font stack in its own stylesheet:

| Section | Display | Body | Mono |
|---|---|---|---|
| `/` (landing) | Cormorant | Source Serif 4 | IBM Plex Mono |
| `/introduction/` | Cormorant | Source Serif 4 | IBM Plex Mono |
| `/formation/` | EB Garamond | EB Garamond | JetBrains Mono |
| `/intranet/` | Inter (sans) | Inter (sans) | IBM Plex Mono |
| `/data-room/` | EB Garamond | EB Garamond | JetBrains Mono |

Override in section stylesheet:
```css
@import url('/assets/tokens.css');

:root {
  /* Override font stack for this section */
  --font-display: 'EB Garamond', 'Georgia', serif;
  --font-body:    'EB Garamond', 'Georgia', serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

---

## Adding New Tokens

New tokens may be added to `tokens.css` only when:

1. The value is used in **three or more** sections or components
2. The value represents a meaningful semantic concept (not just a one-off hex color)
3. A steward has reviewed and approved the addition

**Process:**
1. Open a PR to `RegenHub-Boulder/techne.institute` modifying `assets/tokens.css`
2. Add a comment explaining what the token is for and where it is used
3. Steward reviews and merges

**Never add section-specific values to tokens.css.** If a color or size is only used in `/formation/`, it belongs in `formation/formation.css`.

---

## Section Drift Audit (P363 findings)

Current drift from this governance model:

| Section | Issue |
|---|---|
| `/` (landing) | Already uses consistent custom properties. Close to compliant. Missing: spacing scale. |
| `/formation/` | Has own color palette with different variable names (--bg, --text, --accent vs --void, --parchment, --ember). Must migrate to shared names in P365. |
| `/introduction/` | Uses inline styles in places. Should import tokens.css. |
| `/app/` (React) | Uses system fonts, no custom properties. Must import tokens.css and use variables in P365. |
| `/coordination-games.html` | Dark palette similar to formation. Should import tokens.css. |

Full migration handled in P365.

---

*Governance document. Changes require steward review.*

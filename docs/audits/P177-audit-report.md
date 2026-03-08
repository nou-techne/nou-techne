# P177: Nou Independent Audit — co-op.us Comprehensive Review

**Auditor:** Nou (a1b2c3d4-e5f6-7890-abcd-ef1234567890)  
**Date:** 2026-03-08  
**Scope:** Full seven-layer pattern review of co-op.us (app-src + edge functions)  
**Build status:** Clean (TypeScript compiles, Vite builds in 6.3s, 3.1MB output)

---

## Executive Summary

co-op.us is a substantial and ambitious application: ~88,000 lines across 115 pages, 80+ components, 85+ lib modules, and 67 edge functions. The architecture is coherent in its foundational patterns — append-only chain, dimension-based progressive revelation, REA-inspired economic engines — but rapid sprint velocity has introduced inconsistencies, dead code, and a category of issues I'd call **pattern drift**: places where the same concept is defined differently in different files.

**Critical findings:** 2  
**High findings:** 5  
**Medium findings:** 12  
**Low findings:** 10  
**Enhancement suggestions:** 8

---

## Critical Findings

### C1. P175 process-profile will fail: `parsed_fields` column does not exist

**Layer:** 2 (State)  
**Severity:** CRITICAL  
**Location:** `supabase/functions/process-profile/index.ts` line ~370

The edge function I deployed in P175 writes `parsed_fields` to the participants table, but this column does not exist in the database schema. The database.types.ts file confirms participants has no `parsed_fields` column. PostgREST will return a 400 error when the function attempts to upsert.

**Fix:** Either (a) add a migration: `ALTER TABLE participants ADD COLUMN parsed_fields jsonb;` or (b) remove `parsed_fields` from the P175 edge function's patch object. Option (a) preferred — storing the full extraction is useful for audit and re-processing.

### C2. Duplicate route definitions cause unreachable routes

**Layer:** 5 (Flow)  
**Severity:** CRITICAL  
**Location:** `App.tsx` lines 756 vs 769, lines 783 vs 902

Two routes are defined twice:
- `/proposal/:id` → maps to both `ProposalDetail` (line 756) and `ProposalVote` (line 769). Only the first match renders; `ProposalVote` is unreachable.
- `/commons` → defined in both the authenticated route block (line 783) and the public about routes (line 902). The first wins.

**Fix:** Determine which component should render at each path and remove the duplicate. If both are needed, use distinct paths (e.g., `/proposal/:id/vote`).

---

## High Findings

### H1. Hardcoded Supabase URLs bypass environment configuration

**Layer:** 6 (Constraint)  
**Severity:** HIGH  
**Locations:**
- `pages/Contribute.tsx:218` — hardcoded `https://hvbdpgkdcdskhpbdeeim.supabase.co/functions/v1/api/contribute`
- `components/InlineContribute.tsx:158` — same
- `lib/supabase.ts:8` — hardcoded URL and anon key (no env var)
- `lib/auth.ts:46` — hardcoded `sb-hvbdpgkdcdskhpbdeeim-auth-token`
- `scripts/verify-chain-integrity.ts:14` — hardcoded URL

The Supabase URL is hardcoded in 6 locations. `Profile.tsx` correctly uses `import.meta.env.VITE_SUPABASE_URL` with fallback, but the others don't. No `.env` file exists in app-src.

**Fix:** Create `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Import from a single config module. The `lib/supabase.ts` client should read from `import.meta.env` with fallback defaults.

### H2. 37 page components lack error handling on Supabase calls

**Layer:** 7 (View)  
**Severity:** HIGH  

37 of ~115 pages make Supabase queries without try/catch or `.catch()`. Failed queries will throw unhandled promise rejections, causing blank screens even with ErrorBoundary (which catches render errors, not async rejections).

Affected pages include: Auth, Channels, Coordinate, Dashboard, Ecology, Explore, Garden, Wallet, and 29 others.

**Fix:** Wrap all async Supabase calls in try/catch. Consider a `useQuery`-style hook that standardizes loading/error/data states.

### H3. Three.js + React Three Fiber in dependencies but unused

**Layer:** 6 (Constraint) / Performance  
**Severity:** HIGH  

`three` (^0.183.1), `@react-three/fiber` (^9.5.0), and `@react-three/drei` (^10.7.7) are in package.json dependencies but no component imports from these packages. Three.js alone is ~700KB unminified. While Vite tree-shakes unused imports, the dependency install is ~30MB of node_modules weight.

The Progress page (line 219) references "Three.js + R3F dependency integration" as a completed task, suggesting this was a planned feature that was decomposed or deferred.

**Fix:** Remove from `dependencies` if no longer planned. If deferred, move to `devDependencies` with a TODO comment.

### H4. `HLAMTDimension` type missing 'S' (Solar Cycles)

**Layer:** 1 (Identity) / 3 (Relationship)  
**Severity:** HIGH  
**Location:** `types/api.ts:215`

The canonical type definition for dimensions omits 'S' entirely:
```
'e' | 'H' | 'L' | 'A' | 'M' | 'T'
```
Also missing the long-form equivalents ('solar_cycles', 'sessions'). This means any code using this type for exhaustive dimension handling will silently exclude Solar Cycles contributions.

**Fix:** Add `| 'S' | 'solar_cycles'` to the type. Also add 'sessions' if that alias is used.

### H5. 16 edge functions accept JSON body without input length limits

**Layer:** 6 (Constraint) / Security  
**Severity:** HIGH  

Functions including `agent-anchor`, `api`, `contributions-submit`, `floor-signal`, and 12 others parse `req.json()` without checking content length. A malicious or malformed request could send arbitrarily large payloads.

**Fix:** Add a shared `maxBodySize` check in `_shared/` or at the top of each function. Supabase has a 6MB edge function body limit by default, but explicit validation (e.g., 100KB for most endpoints) is safer and more communicative.

---

## Medium Findings

### M1. Dimension order defined inconsistently across 4 files

**Layer:** 5 (Flow)  
**Location:** Dashboard.tsx, Profile.tsx, MyThread.tsx, MemberDirectory.tsx

Four different orderings:
- Dashboard: `['E', 'H', 'L', 'A', 'M', 'T', 'S']` (uppercase E — wrong)
- Profile: `['H', 'L', 'A', 'S', 'T', 'M', 'e']`
- MyThread: `['H', 'L', 'A', 'S', 'T', 'M', 'e']`
- MemberDirectory: `['H', 'L', 'e', 'A', 'S', 'T', 'M']`

The canonical unlock sequence from MEMORY.md is `H → L → e → A → S → T → M`. Dashboard uses 'E' instead of 'e', which could cause lookup failures against the dimension definitions.

**Fix:** Export `DIMENSION_ORDER` from `lib/dimensions.ts` and import everywhere.

### M2. Design token color mismatch for Language dimension

**Layer:** 7 (View)  

`styles/tokens.ts` defines `language: '#c4956a'` (same as human/primary).  
`lib/dimensions.ts` defines Language as `'#a6ed2a'` (bright green).  
The actual rendered color depends on which source a component uses.

**Fix:** Reconcile to a single source. Dimensions.ts appears authoritative.

### M3. Stale database.types.ts

**Layer:** 2 (State)  

The generated types file is missing at least 6 columns that exist on the participants table and are actively queried by Profile.tsx: `craft_primary`, `craft_secondary`, `archetype`, `guild`, `participant_type`, `dimensions_unlocked`. This means TypeScript provides no type safety for these columns.

**Fix:** Regenerate database types via `supabase gen types typescript`. This should be a periodic maintenance task (or pre-commit hook).

### M4. 63 console.log statements in production code

**Layer:** 7 (View)  

63 `console.log` calls remain across page and lib files (excluding tests). 5 are in page components that run in production. These leak implementation details to the browser console.

**Fix:** Replace with `console.error` for actual errors, remove informational logs, or use a logger that respects environment (production = silent).

### M5. Coordinate.tsx.p159-backup left in source

**Layer:** 2 (State)  
**Location:** `pages/Coordinate.tsx.p159-backup`

A backup file from the P159 sprint was not cleaned up.

**Fix:** Delete. Git history preserves the pre-P159 version.

### M6. `_archive/CollectionsPage.tsx` still present with hardcoded auth

**Layer:** 1 (Identity) / Security  

The archived CollectionsPage uses `createdBy: 'current-user'` (hardcoded string) instead of actual auth context. While not loaded in production, it sets a bad example if anyone references it.

**Fix:** Delete or clearly mark as deprecated. The code is in git history.

### M7. K-1 engine uses placeholder EIN 'XX-XXXXXXX'

**Layer:** 6 (Constraint)  
**Locations:** `lib/k1-engine.ts:152`, `lib/k1-export.ts:174`

The K-1 tax export engine has a placeholder EIN. The engine correctly flags this (`if (lca.ein === 'XX-XXXXXXX')`) but a careless deployment could generate invalid K-1 forms.

**Fix:** FSC should provide the real EIN. Add a runtime check that blocks export if EIN is placeholder.

### M8. Contribute.tsx and InlineContribute.tsx duplicate the API call pattern

**Layer:** 3 (Relationship)  

Both components construct identical fetch calls to `/api/contribute` with the same headers, body shape, and error handling. This is a DRY violation that makes maintenance harder.

**Fix:** Extract to a shared `submitContribution()` function in `lib/` or `api/`.

### M9. No loading state on several authenticated routes

**Layer:** 5 (Flow)  

`RequireAuth` correctly shows nothing while auth is loading, but several pages that manage their own auth checks (fetching participant data) don't show loading indicators, causing layout shift.

**Fix:** Standardize the loading pattern. `PageLoader` exists but isn't used by all pages.

### M10. Two edge functions have no authentication

**Layer:** 6 (Constraint) / Security  

`agents-request-key` and `notify-hub-application` accept requests without any auth verification. `agents-request-key` is likely intentional (public registration), but `notify-hub-application` (triggered by webhook) should verify the Supabase webhook secret.

**Fix:** Add webhook signature verification to `notify-hub-application`.

### M11. Multiple sequential Supabase queries where joins would suffice

**Layer:** 2 (State) / Performance  

SwarmViz (9 queries), ChainExplorer (17), Coordinate (12), MemberProfile (10) make sequential `supabase.from()` calls. Many could be combined using PostgREST embedded resources (`table(columns)`) or RPCs.

**Fix:** Audit high-query pages for join opportunities. Not all can be combined (PostgREST FK requirements), but several can.

### M12. No rate limiting on public-facing edge functions

**Layer:** 6 (Constraint) / Security  

Edge functions like `enrollment-apply`, `agents-request-key`, and `coordination-list` are publicly accessible without rate limiting. Supabase has platform-level rate limits, but application-level limits would prevent abuse.

**Fix:** Add rate limiting via `_shared/` using a Redis-like counter or Supabase RPC-based rate check.

---

## Low Findings

### L1. 24 TODO/FIXME comments across source
Various files contain unresolved TODOs including placeholder auth (`'current-user'`), unimplemented features, and deferred integrations. Most are in secondary features.

### L2. Image without alt text
One `<img>` tag found without `alt` attribute. 26 `aria-label` usages exist overall — acceptable but could be improved.

### L3. 5 buttons without explicit `type` attribute
HTML buttons default to `type="submit"`, which can cause unintended form submissions.

### L4. No `.env` file in app-src
Environment variables are assumed but not documented. Should have `.env.example` at minimum.

### L5. `lazy()` imports — 2 potentially unused
`K1Export` and `Status` are lazy-loaded but may not appear in any active route (or appear only once, suggesting the import itself is the only reference).

### L6. 115 lazy-loaded page components
While code splitting is good, 115+ lazy chunks mean 150 JS files in the build output. Consider grouping related pages into shared chunks via Vite's `manualChunks`.

### L7. Realtime subscriptions all properly cleaned up
(Positive finding — no leaks detected across all 11 pages with subscriptions.)

### L8. ErrorBoundary + RouteErrorBoundary well-implemented
Both are present and contextual. RouteErrorBoundary classifies errors (network/auth/notfound/generic) and provides navigation hints.

### L9. `d3` adds 88KB gzipped to vendor bundle
D3 is used for visualization (SwarmViz, charts). This is a meaningful bundle cost. Consider importing only used d3 submodules.

### L10. No service worker / offline support
The app has an `OfflineBanner` component but no service worker registration. PWA capabilities are mentioned in the design but not implemented.

---

## Pattern Analysis

### Where Patterns Hold

1. **Chain engine integrity.** The append-only Merkle chain (`chain-engine.ts`) is well-implemented: deterministic hashing via sorted-key canonical JSON, hash linking, verification walking. 558 lines, no shortcuts.

2. **Dimension progressive revelation.** The 7-dimension unlock sequence (H→L→e→A→S→T→M) is implemented with genuine progressive disclosure — routes, content, and UI elements respond to unlock state. Cloud credits are earned at each level.

3. **Edge function auth pattern.** 65 of 67 edge functions use either `verifyAgentKey()` (agent auth) or session token verification. The `_shared/auth.ts` module is well-structured with proper error hierarchy.

4. **REA-inspired economic engines.** The patronage, distribution, compliance, and SEC 704(b) engines are serious implementations — not stubs. They model real LCA accounting requirements.

5. **Workshop coordination protocol.** The presence-heartbeat → coordination-request → floor-signal → chat-send → link-share flow is well-layered. Edge functions enforce proper state transitions.

### Where Patterns Break

1. **Dimension order.** The canonical order exists but is redefined locally in 4+ files with variations. No single source of truth.

2. **Color authority.** `styles/tokens.ts` and `lib/dimensions.ts` disagree on dimension colors. Components choose their source inconsistently.

3. **Supabase URL configuration.** The URL appears in 6 hardcoded locations. The env var pattern exists in one file but isn't used elsewhere.

4. **Error handling.** 37 pages lack async error handling while the ErrorBoundary is solid for synchronous render errors.

5. **API call patterns.** Some pages call edge functions directly via `fetch()`, others use the Supabase client. No standard pattern for edge function calls.

### Missing Patterns

1. **No shared API client for edge functions.** Each component constructs its own fetch call with headers and URL. A typed `apiClient.ts` would eliminate duplication and centralize auth header injection.

2. **No query caching.** Every page load triggers fresh Supabase queries. A `react-query` or `SWR`-style caching layer would reduce API calls and improve perceived performance.

3. **No input validation library.** Edge functions validate inputs ad-hoc. A shared schema validator (e.g., Zod on the Deno side) would standardize validation and error messages.

4. **No feature flag system.** `app-config.ts` has `getFeatureFlags()` but it returns a static object. A proper feature flag system would help with progressive rollout.

### Pattern Conflicts

1. **"E" vs "e" for Ecology.** Dashboard uses uppercase 'E', everything else uses lowercase 'e'. The canonical IDENTITY.md notation is lowercase. This creates silent lookup failures.

2. **Public vs authenticated route scoping.** Some pages (Commons, Proposal) are defined in both the public and authenticated route blocks. The first definition wins, making the second dead code.

3. **Agent key auth vs session token auth.** Edge functions use two distinct auth paths. The boundary is clear (agent functions use keys, user functions use sessions) but there's no shared type or pattern for "this endpoint accepts either."

---

## System Coherence Assessment

### Abstraction Leaks

1. Supabase project ID (`hvbdpgkdcdskhpbdeeim`) leaks into component code instead of being abstracted behind the client.
2. Database column names appear directly in page components instead of being mapped through a data layer.
3. Chain hash computation is in `lib/` but chain entry types are in `types/chain.ts` — the coupling is acceptable but the boundary is thin.

### Coupling Issues

1. `Contribute.tsx` and `InlineContribute.tsx` are tightly coupled to the API URL and shape, duplicating the same fetch pattern.
2. Dimension unlock logic is split between `lib/dimensions.ts`, `lib/dimension-triggers.ts`, and individual page components.
3. The Coordinate page and its sub-components (SprintTabs, WorkshopActivity) total 2,885 lines across 8 files — the largest functional area.

### Naming Inconsistencies

1. Dimension ecology: `'e'` vs `'E'` vs `'ecology'`
2. Solar Cycles: `'S'` vs `'Sessions'` vs `'solar_cycles'` — ContributionDetail.tsx calls it "Sessions"
3. Route naming: `/chain` (Tree Explorer), `/leaf/:hash` and `/chain/:id` (both go to LeafDetail)
4. Type naming: `HLAMTDimension` (missing S) vs `DIMENSIONS` array (includes S) vs `PatternLayer` in chain types

### Conceptual Clarity

The conceptual architecture is strong. The e/H-LAM/T+S dimensional model, the TIO pattern stack, and the progressive revelation design all cohere as a unified vision. The implementation gaps are execution-level, not architectural. The system knows what it wants to be.

---

## Recommended Priority

1. **Immediate (before next deploy):**
   - C1: Add `parsed_fields` column migration
   - C2: Fix duplicate routes

2. **This week:**
   - H1: Centralize Supabase URL config
   - H4: Fix HLAMTDimension type
   - M1: Export canonical DIMENSION_ORDER
   - M5: Delete backup file

3. **Next sprint block:**
   - H2: Add error handling to 37 pages
   - H3: Remove unused Three.js deps
   - H5: Add input size limits to edge functions
   - M3: Regenerate database types

4. **Ongoing:**
   - M4: console.log cleanup
   - M8: Extract shared API client
   - M11: Optimize multi-query pages
   - All enhancement suggestions

---

*Audit completed independently. No communication with P176 (Dianoia) during execution.*

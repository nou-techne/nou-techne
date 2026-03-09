# P179: Audit Backlog Inventory

**Source:** P176 (Dianoia) + P177 (Nou) + Bilateral Synthesis  
**Date:** 2026-03-09  
**Total proposed sprints:** 35  

Related findings are grouped into single sprints where fix scope overlaps. Each sprint has a suggested assignee based on capability match (Dia = execution/testing, Nou = architecture/specification).

---

## Tier 0 — Immediate (before public use)

### S01: Replace markdown sanitizer with DOMPurify
- **Source:** Dia C4
- **Severity:** CRITICAL | **Complexity:** S | **Layer:** 1
- **Assignee:** Dia
- **Description:** Custom regex sanitizer bypassed by `javascript:` URLs. Replace with DOMPurify library. Audit all markdown rendering paths (MarkdownRenderer.tsx, any dangerouslySetInnerHTML).

### S02: Add advisory locking to chain append
- **Source:** Dia C3
- **Severity:** CRITICAL | **Complexity:** M | **Layer:** 4
- **Assignee:** Dia
- **Description:** Concurrent contributions can create duplicate chain indices, corrupting merkle integrity. Implement `pg_advisory_lock` on chain append. Add unique constraint on (convergence_id, sequence_number) as defense-in-depth.

### S03: Fix enrollment race condition — unique constraint on auth_user_id
- **Source:** Dia C2
- **Severity:** CRITICAL | **Complexity:** S | **Layer:** 1, 2
- **Assignee:** Dia
- **Description:** Add `UNIQUE` constraint on `participants.auth_user_id`. Convert Arrival.tsx read-check-insert to upsert pattern. Also add index on auth_user_id (Dia Layer 2 finding — frequent join key without index).

### S04: Implement skip navigation + fix mobile menu keyboard trap
- **Source:** Dia C5, C6
- **Severity:** CRITICAL | **Complexity:** S | **Layer:** 7
- **Assignee:** Dia
- **Description:** Wire existing SkipNavigation component into App.tsx before Header. Add Escape key handler and focus trap management to mobile menu. Two WCAG violations (2.4.1, 2.1.1) in one sprint.

### S05: Fix duplicate route definitions
- **Source:** Nou C2
- **Severity:** CRITICAL | **Complexity:** XS | **Layer:** 5
- **Assignee:** Either
- **Description:** `/proposal/:id` defined twice (ProposalDetail vs ProposalVote — line 756 vs 769). `/commons` defined twice (line 783 vs 902). Remove duplicates or use distinct paths.

### S06: Extract and commit base schema migration
- **Source:** Dia C1, Nou M3
- **Severity:** CRITICAL | **Complexity:** M | **Layer:** 2
- **Assignee:** Nou
- **Description:** Empty base migration (0 bytes). Participants table undefined in VCS. pg_dump production schema, create complete DDL migration. Also regenerate database.types.ts (6+ stale columns). Consolidate migration directories.

### S07: Add CASCADE DELETE to foreign keys + fix peer_recognitions
- **Source:** Dia C7, C8
- **Severity:** CRITICAL | **Complexity:** S | **Layer:** 3
- **Assignee:** Dia
- **Description:** contribution_references lacks ON DELETE behavior (GDPR blocker). peer_recognitions references `signal_type` column that doesn't exist. Single migration: add CASCADE DELETE + add missing column (or remove dead feature code).

---

## Tier 1 — Week 1

### S08: Centralize Supabase URL configuration
- **Source:** Nou H1
- **Severity:** HIGH | **Complexity:** S | **Layer:** 6
- **Assignee:** Either
- **Description:** Supabase URL hardcoded in 6 locations. Create `.env` / `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Update `lib/supabase.ts`, `Contribute.tsx`, `InlineContribute.tsx`, `auth.ts`, `verify-chain-integrity.ts`.

### S09: Accessibility pass — aria-labels + focus indicators
- **Source:** Dia H10, H11
- **Severity:** HIGH | **Complexity:** M | **Layer:** 7
- **Assignee:** Dia
- **Description:** 40+ icon-only buttons lack aria-labels. Many components use `focus:outline-none` without visible replacement. Audit all interactive elements, add labels, implement consistent focus ring (e.g., `focus-visible:ring-2`).

### S10: Fix HLAMTDimension type + canonical DIMENSION_ORDER export
- **Source:** Nou H4, Nou M1
- **Severity:** HIGH | **Complexity:** XS | **Layer:** 1, 5
- **Assignee:** Nou
- **Description:** `types/api.ts` HLAMTDimension missing 'S' and long-form aliases. Four files define DIMENSION_ORDER differently (Dashboard uses 'E' instead of 'e'). Export canonical order from `lib/dimensions.ts`, import everywhere.

### S11: Color contrast audit + token reconciliation
- **Source:** Dia H12, Nou M2
- **Severity:** HIGH | **Complexity:** S | **Layer:** 7
- **Assignee:** Dia
- **Description:** Muted text colors may fail WCAG AA. tokens.ts and dimensions.ts disagree on Language dimension color (#c4956a vs #a6ed2a). Run automated contrast checker, reconcile to single color authority.

### S12: Email validation + OTP rate limiting
- **Source:** Dia H3
- **Severity:** HIGH | **Complexity:** S | **Layer:** 1
- **Assignee:** Dia
- **Description:** No email format validation, accepts disposable domains, no rate limiting on OTP requests. Add validation, block disposable domains, rate limit to 3 OTP/hour/email.

### S13: Orphaned auth user prevention
- **Source:** Dia H2
- **Severity:** HIGH | **Complexity:** S | **Layer:** 1
- **Assignee:** Dia
- **Description:** Alternative auth paths (magic link direct, deep links) create auth users without participant records. Redirect all auth paths through enrollment to ensure participant creation. Add `onAuthStateChange` handler as safety net.

### S14: Governance parameter schema validation (Zod)
- **Source:** Dia H9, Nou (pattern: missing validation library)
- **Severity:** HIGH | **Complexity:** M | **Layer:** 6
- **Assignee:** Nou
- **Description:** Governance parameters accept raw unvalidated JSON. Add Zod schemas for all parameter types. Validate on write (edge function) and read (client). Creates the shared validation pattern both audits identified as missing.

### S15: Contribution reference cycle detection + dedup
- **Source:** Dia H6, H8
- **Severity:** HIGH | **Complexity:** M | **Layer:** 3, 4
- **Assignee:** Nou
- **Description:** No cycle detection in contribution_references (A→B→C→A causes infinite loops). No duplicate detection in /api/contribute. Add cycle check (DFS at insert time), content-hash deduplication with time window, reference count limits.

---

## Tier 2 — Week 2

### S16: Error handling on 37 pages
- **Source:** Nou H2
- **Severity:** HIGH | **Complexity:** M | **Layer:** 7
- **Assignee:** Dia
- **Description:** 37/115 pages make Supabase calls without try/catch. Create a `useSupabaseQuery` hook that standardizes loading/error/data states. Migrate high-traffic pages first (Dashboard, Coordinate, Explore, Wallet).

### S17: Input size limits on edge functions
- **Source:** Nou H5
- **Severity:** HIGH | **Complexity:** S | **Layer:** 6
- **Assignee:** Either
- **Description:** 16 edge functions accept unbounded JSON. Add shared `validateBodySize(req, maxBytes)` to `_shared/`. Apply 100KB default, 10KB for simple endpoints, 500KB for contribution submission.

### S18: Rate limiting on public edge functions
- **Source:** Nou M12, Dia (medium)
- **Severity:** MEDIUM-HIGH | **Complexity:** M | **Layer:** 6
- **Assignee:** Nou
- **Description:** enrollment-apply, agents-request-key, coordination-list publicly accessible without rate limits. Implement token-bucket rate limiter via Supabase RPC or in-memory counter with TTL.

### S19: Remove unused Three.js / R3F dependencies
- **Source:** Nou H3
- **Severity:** HIGH | **Complexity:** XS | **Layer:** 6
- **Assignee:** Either
- **Description:** `three`, `@react-three/fiber`, `@react-three/drei` in dependencies but never imported. ~30MB node_modules. Remove or move to devDependencies with TODO.

### S20: Unbounded rarity escalation fix
- **Source:** Dia H7
- **Severity:** HIGH | **Complexity:** S | **Layer:** 4
- **Assignee:** Nou
- **Description:** No limits on inbound_references allows gaming legendary tier. Add max references per contribution, add rate limit on reference creation, consider time-weighted decay.

### S21: Session expiry hardening
- **Source:** Dia H4
- **Severity:** HIGH | **Complexity:** S | **Layer:** 1
- **Assignee:** Dia
- **Description:** Silent forced sign-outs with no retry logic. Improve AuthExpiryBanner behavior, add automatic token refresh retry, preserve in-progress work during session refresh.

### S22: CSRF protection
- **Source:** Dia H5
- **Severity:** HIGH | **Complexity:** M | **Layer:** 1
- **Assignee:** Nou
- **Description:** State-changing operations lack CSRF tokens. Mitigated by localStorage auth but not bulletproof. Add CSRF token generation and validation to mutation endpoints.

### S23: Extract shared submitContribution() function
- **Source:** Nou M8
- **Severity:** MEDIUM | **Complexity:** XS | **Layer:** 3
- **Assignee:** Either
- **Description:** Contribute.tsx and InlineContribute.tsx duplicate identical fetch patterns. Extract to `api/contributions.ts` shared function.

### S24: Guestname case normalization
- **Source:** Dia H1
- **Severity:** HIGH | **Complexity:** XS | **Layer:** 1
- **Assignee:** Either
- **Description:** Enrollment uses `.ilike()` check but constraint is case-sensitive. "Alice" and "alice" can coexist. Normalize to lowercase on insert, add CI unique constraint.

---

## Tier 3 — Week 3+

### S25: Automated test suite foundation
- **Source:** Dia (test coverage section)
- **Severity:** HIGH | **Complexity:** L | **Layer:** 6
- **Assignee:** Both
- **Description:** No CI-integrated test suite. Set up Vitest for unit tests, Playwright for E2E. Target critical paths first: enrollment → contribution → chain viewing. 80% coverage goal for business logic (chain-engine, patronage-engine, dimensions).

### S26: Add parsed_fields column migration
- **Source:** Nou C1 (self-caught)
- **Severity:** MEDIUM | **Complexity:** XS | **Layer:** 2
- **Assignee:** Either
- **Description:** `ALTER TABLE participants ADD COLUMN parsed_fields jsonb;` then uncomment the write in process-profile edge function.

### S27: Monitoring + telemetry
- **Source:** Dia (operational)
- **Severity:** MEDIUM | **Complexity:** M | **Layer:** 6
- **Assignee:** Nou
- **Description:** No Sentry, no Web Vitals, no structured logging. Add error tracking, performance monitoring, and operational dashboard.

### S28: API documentation generation
- **Source:** Dia (documentation section)
- **Severity:** MEDIUM | **Complexity:** M | **Layer:** 6
- **Assignee:** Nou
- **Description:** Generate API docs from edge function signatures. Create ER diagram from schema. Document all environment variables. Add architecture decision records.

### S29: Query optimization — joins + pagination
- **Source:** Nou M11
- **Severity:** MEDIUM | **Complexity:** M | **Layer:** 2
- **Assignee:** Dia
- **Description:** SwarmViz (9 queries), ChainExplorer (17), Coordinate (12), MemberProfile (10). Audit for PostgREST join opportunities. Add cursor-based pagination for unbounded result sets.

### S30: Console.log cleanup + logger implementation
- **Source:** Nou M4
- **Severity:** MEDIUM | **Complexity:** S | **Layer:** 7
- **Assignee:** Either
- **Description:** 63 console.log statements in production. Replace with environment-aware logger (silent in prod). Remove informational logs, keep console.error for actual errors.

### S31: PII encryption
- **Source:** Dia (security)
- **Severity:** MEDIUM | **Complexity:** M | **Layer:** 2
- **Assignee:** Nou
- **Description:** Email and bio stored in plaintext. Consider column-level encryption for PII fields. Evaluate Supabase Vault or application-level encryption.

### S32: Webhook auth for notify-hub-application
- **Source:** Nou M10
- **Severity:** MEDIUM | **Complexity:** XS | **Layer:** 6
- **Assignee:** Either
- **Description:** notify-hub-application edge function accepts requests without verifying Supabase webhook signature. Add signature verification.

### S33: Progressive navigation improvements
- **Source:** Dia H13, Dia (flow section)
- **Severity:** MEDIUM | **Complexity:** M | **Layer:** 5
- **Assignee:** Dia
- **Description:** No breadcrumbs, no first-run tutorial, inconsistent back button behavior, no draft auto-save. Implement breadcrumbs for deep navigation, auto-save drafts, standardize modal Escape behavior.

### S34: Code hygiene sweep
- **Source:** Nou M5, M6, L1, Nou L5
- **Severity:** LOW | **Complexity:** XS | **Layer:** 2
- **Assignee:** Either
- **Description:** Delete Coordinate.tsx.p159-backup, delete _archive/CollectionsPage.tsx, audit 24 TODO/FIXME comments, remove 2 unused lazy imports.

### S35: Security headers + CSP
- **Source:** Dia (security assessment)
- **Severity:** MEDIUM | **Complexity:** S | **Layer:** 6
- **Assignee:** Nou
- **Description:** Add Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options headers. Configure at Supabase/hosting level.

---

## Summary

| Tier | Sprints | Critical | High | Medium | Low |
|------|---------|----------|------|--------|-----|
| 0 — Immediate | S01–S07 (7) | 9 findings | — | — | — |
| 1 — Week 1 | S08–S15 (8) | — | 12 findings | — | — |
| 2 — Week 2 | S16–S24 (9) | — | 10 findings | 2 findings | — |
| 3 — Week 3+ | S25–S35 (11) | — | 1 finding | 10 findings | 2 findings |
| **Total** | **35 sprints** | **9** | **23** | **12** | **2** |

**Complexity breakdown:** 9 XS, 11 S, 12 M, 2 L, 1 both  
**Suggested split:** Dia 14, Nou 12, Either 9

---

*Backlog generated from P176/P177 bilateral audit synthesis. Sprint IDs (S01–S35) are backlog references — Workshop sprint IDs (P-series) to be assigned when proposed.*

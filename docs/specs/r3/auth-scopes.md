# techne.institute — Auth Scopes and RLS Policy Skeletons

**Sprint:** P362 (R3-A)  
**Date:** 2026-04-06  
**Status:** Proposed — awaiting steward approval

---

## Three Auth Scopes

### Scope 1: Public
- No authentication required
- All visitors
- Pages: see `sitemap.md` public tier

### Scope 2: Investor-Accessible
- Token-gated (shared link with `?token=` param) **OR** Class 4 Supabase auth
- Grants access to `/data-room/*`
- Does NOT grant access to `/intranet/*`
- Token is static per data room version; rotate when term sheet changes

### Scope 3: Intranet (Member)
- Supabase authentication required (magic link or OAuth)
- Valid `participant_id` in JWT claims
- `membership_class` claim (1–4) determines what within /intranet/ is visible
- Class 4 members also satisfy Scope 2 (can access data room without separate token)

### Scope 4: Admin
- Supabase authentication with elevated `role = 'admin'` claim
- Granted manually by steward in Supabase dashboard
- Accesses `/intranet/admin/*`
- Can view and modify any member's account data

---

## JWT Claims Structure

Claims embedded in Supabase JWT on authentication:

```json
{
  "sub": "uuid",
  "email": "member@example.com",
  "participant_id": "uuid matching participants.id",
  "membership_class": 1,
  "role": "member | admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

`membership_class` values:
- `1` — Labor member
- `2` — Patron member
- `3` — Community member
- `4` — Investor member (also satisfies Scope 2)

Claims are populated via Supabase custom claims function on login, reading from `participants` table.

---

## RLS Policy Skeletons

### `capital_accounts` table

```sql
-- Members see only their own account
CREATE POLICY "members_see_own_capital_account"
ON capital_accounts
FOR SELECT
USING (
  auth.uid()::text = participant_id::text
);

-- Admin sees all
CREATE POLICY "admin_sees_all_capital_accounts"
ON capital_accounts
FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);
```

### `allocation_events` table

```sql
CREATE POLICY "members_see_own_allocations"
ON allocation_events
FOR SELECT
USING (
  auth.uid()::text = participant_id::text
);

CREATE POLICY "admin_sees_all_allocations"
ON allocation_events
FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);
```

### `documents` table (K-1 vault)

```sql
CREATE POLICY "members_see_own_documents"
ON documents
FOR SELECT
USING (
  auth.uid()::text = participant_id::text
);

-- Stewards can upload documents for any member
CREATE POLICY "admin_manages_documents"
ON documents
FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);
```

### `venture_basket` table (Class 4 only)

```sql
CREATE POLICY "class4_sees_venture_basket"
ON venture_basket
FOR SELECT
USING (
  (auth.jwt() ->> 'membership_class')::int = 4
);

CREATE POLICY "admin_manages_venture_basket"
ON venture_basket
FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);
```

### `participants` table

```sql
-- Members see their own profile
CREATE POLICY "members_see_own_profile"
ON participants
FOR SELECT
USING (
  auth.uid()::text = id::text
);

-- Members can update their own contact email (via request flow)
CREATE POLICY "members_update_own_contact_email"
ON participants
FOR UPDATE
USING (
  auth.uid()::text = id::text
)
WITH CHECK (
  auth.uid()::text = id::text
);

-- Admin sees all
CREATE POLICY "admin_sees_all_participants"
ON participants
FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);
```

---

## Notes

- Custom claims (`participant_id`, `membership_class`, `role`) require a Supabase `custom_access_token_hook` function that reads from `participants` on each token issue.
- RLS must be enabled on all tables above: `ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;`
- These are skeletons — exact column names must be verified against final schema in P367.
- `auth.uid()` returns the Supabase auth UUID; must match `participants.id` (or a `supabase_auth_id` foreign key on each table).

---

*Canonical document. Changes require steward approval before implementation.*

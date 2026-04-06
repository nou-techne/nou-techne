# techne.institute — Auth Flows

**Sprint:** P362 (R3-A)  
**Date:** 2026-04-06  
**Status:** Proposed — awaiting steward approval

---

## Primary Flow: Magic Link

1. Member visits `/intranet/` (or any `/intranet/*` path)
2. Not authenticated → redirect to `/intranet/login/`
3. Login page shows email field and "Send magic link" button
4. Member enters email address on file in `participants.contact_email`
5. Supabase sends magic link email (subject: "Sign in to Techne Intranet")
6. Member clicks link → Supabase validates token → issues JWT with custom claims
7. Member redirected to originally requested `/intranet/*` path (or `/intranet/` if no prior path)

**Email not found:** Display message "No account found for that email. Contact your steward." Do not reveal whether email exists (security).

**Magic link expiry:** 1 hour. If expired, member returns to login and requests a new link.

---

## Secondary Flow: Google OAuth

1. Member clicks "Sign in with Google" on `/intranet/login/`
2. OAuth redirect to Google → member authenticates with Google account
3. Google returns email claim to Supabase
4. Supabase matches email to `participants.contact_email`
5. If match found: issues JWT with custom claims, redirect to `/intranet/`
6. If no match: display "No Techne account linked to this Google account. Try magic link or contact your steward."

**Provider:** Google OAuth only for Phase 1. Additional providers (GitHub, etc.) in Phase 2 if needed.

---

## Session Management

- **Duration:** 7 days from last activity (rolling refresh)
- **Refresh:** Silent refresh via Supabase `onAuthStateChange` listener
- **Explicit logout:** "Sign out" in intranet nav → calls `supabase.auth.signOut()` → clears session → redirect to `/`
- **Idle timeout:** No forced logout on inactivity; session expires after 7 days of no activity
- **Multi-tab:** Supabase handles multi-tab state sync via localStorage

---

## Email Recovery / Change Flow

Member's email address changes (e.g., work email → personal email):

1. Member submits email change request via `/intranet/account/` (form: current email, new email, reason)
2. Request stored in `email_change_requests` table with status `pending`
3. Steward sees pending requests in `/intranet/admin/email-changes/`
4. Steward reviews and approves → triggers:
   a. Update `participants.contact_email` to new email
   b. Update Supabase auth email via admin API
   c. Notify member at new email: "Your login email has been updated"
5. Member can now sign in with new email

**Why manual approval:** Email is the identity anchor. Automated email changes could be exploited to take over accounts. Steward review is a deliberate trust gate.

---

## Custom Claims Hook

Supabase `custom_access_token_hook` function fires on each token issue:

```sql
CREATE OR REPLACE FUNCTION custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  claims jsonb;
  participant record;
BEGIN
  claims := event -> 'claims';

  SELECT id, membership_class,
    CASE WHEN is_admin THEN 'admin' ELSE 'member' END as role
  INTO participant
  FROM participants
  WHERE contact_email = (event ->> 'email');

  IF FOUND THEN
    claims := jsonb_set(claims, '{participant_id}', to_jsonb(participant.id::text));
    claims := jsonb_set(claims, '{membership_class}', to_jsonb(participant.membership_class));
    claims := jsonb_set(claims, '{role}', to_jsonb(participant.role));
  END IF;

  RETURN jsonb_set(event, '{claims}', claims);
END;
$$;
```

---

## React Auth Middleware

`useAuth` hook wraps Supabase auth state:

```typescript
// hooks/useAuth.ts
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  const membershipClass = user?.user_metadata?.membership_class ?? null;
  const participantId = user?.user_metadata?.participant_id ?? null;
  const isAdmin = user?.user_metadata?.role === 'admin';
  const isClass4 = membershipClass === 4;

  return { user, loading, membershipClass, participantId, isAdmin, isClass4 };
};
```

Protected route wrapper:

```typescript
// components/ProtectedRoute.tsx
const ProtectedRoute = ({ children, requireClass4 = false }) => {
  const { user, loading, isClass4 } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/intranet/login/" replace />;
  if (requireClass4 && !isClass4) return <Navigate to="/intranet/" replace />;
  return children;
};
```

---

*Canonical document. Changes require steward approval before implementation.*

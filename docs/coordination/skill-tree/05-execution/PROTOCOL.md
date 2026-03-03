# 05 — Phase 4: Execution

## Claim a Sprint

**Claim** (atomic — returns 409 CONFLICT if already claimed):
```json
{
  "request_id": "<sprint_uuid>",
  "action": "claim"
}
```

Claiming sets `status → in_progress`, sets `claimed_by` and `claimed_at`, updates your presence to `executing`. Logs `sprint_claimed`.

## Post Progress

Post progress as you work — not only at the end:
```json
{
  "request_id": "<sprint_uuid>",
  "action": "progress",
  "message": "DDL written for 5 of 7 columns. Working on RLS policy additions.",
  "percent_complete": 70
}
```

Progress entries are **append-only** — they build the execution log visible on expanded sprint cards and the compact progress mini-bar. Post at natural checkpoints.

## Injected Context & Pause

**Check for injected context** on each heartbeat cycle. A steward may have added instructions:
```bash
curl -s "https://hvbdpgkdcdskhpbdeeim.supabase.co/rest/v1/coordination_requests?id=eq.<sprint_uuid>&select=injected_context,paused_at" \
  -H "apikey: sb_publishable_kB69BlNpkNhOllwGMOE6xg_i4l1VHMv" \
  -H "Authorization: Bearer sb_publishable_kB69BlNpkNhOllwGMOE6xg_i4l1VHMv"
```

If `paused_at` is set, stop posting progress and wait for `sprint_resumed` in the Protocol Stream before continuing.

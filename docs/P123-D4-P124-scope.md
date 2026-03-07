# P123 D4 — P124 Sprint Scope

**Sprint:** P123 | **Authors:** Nou + Dianoia | **Status:** Proposed scope for P124

---

## P124: Radicle Coordination Sovereignty — Sprint COBs + DID Anchor

**Type:** Infrastructure · **Size:** Medium (2-3 cycles) · **Proposers:** Nou + Dianoia

---

## Objective

Extend the Radicle mirror (P122/P123) from Workshop Activity archival to full coordination record sovereignty:
- Sprint lifecycle synced as signed COBs (Layer 2)
- Agent DID field added to Workshop profiles (Layer 3)

---

## Deliverables

### D1 — Sprint COB Sync Script

Extend the P122 sync script to mirror coordination_requests as Radicle issues:

```python
# On each phase transition:
# proposal → claim → execute → synthesis
rad_issue_create(
  title=f"P{sprint_id}: {title}",
  labels=["sprint", f"phase:{phase}"],
  description=sprint_body_with_metadata
)
```

- Triggered per phase-transition (not just polling)
- COB includes: sprint ID, proposer DID, claimer DID, timestamps, Workshop coordination_request ID
- Cross-reference: COB body includes `workshop_id: <uuid>` for round-trip lookup

### D2 — DID Anchor Field

Add `radicle_did` to agent profiles in Workshop:

```sql
ALTER TABLE agent_profiles ADD COLUMN radicle_did text;
```

- Populate for Nou: `did:key:z6Mk...` (from P122 key pair)
- Populate for Dianoia: Dia's DID (if Dia has a Radicle identity; determine in P124 negotiation)
- Read-layer: Workshop chat-messages response optionally includes `radicle_did` for agent senders

### D3 — Key Backup Documentation

Document the Radicle key backup procedure to mitigate DID key loss risk (D3 risk register item):

- Location: `~/.config/radicle/` — document all relevant files
- Backup target: encrypted record alongside `~/.config/wallet/nou.json`
- Recovery procedure: restore from backup, verify `rad self` output

### D4 — P124 Synthesis Post

Workshop synthesis message when P124 completes:
- Radicle RID for the sprint COB archive
- Count of synced sprints + coverage percentage
- DID anchor field live confirmation

---

## Non-Goals (explicit out-of-scope)

- Patch-model code review for co-op.us / habitat repos
- Replacing Supabase Realtime for live coordination
- Public Radicle seed hosting (app.radicle.xyz is sufficient for now)
- Any CI/CD changes

---

## Dependencies

- P122 sync script (live, operational)
- Workshop agent_profiles schema (editable by Nou with COOP_US_API_KEY)
- Dianoia's Radicle identity (determine in P124 negotiation if Dia has a DID)

---

## Acceptance Criteria

- [ ] coordination_requests sync: all phases of at least one full sprint lifecycle visible as Radicle COBs
- [ ] `radicle_did` field live in Workshop agent profiles for Nou (at minimum)
- [ ] Key backup documented in `nou-techne/docs/radicle-key-backup.md`
- [ ] P124 synthesis post published to Workshop

---

## Estimated Cycles

- Cycle 1: Sprint COB sync script (D1)
- Cycle 2: DID anchor field + schema migration (D2)
- Cycle 3: Key backup documentation + synthesis (D3 + D4)

---

*P124 is ready to propose when Todd confirms P123 D3 recommendation.*

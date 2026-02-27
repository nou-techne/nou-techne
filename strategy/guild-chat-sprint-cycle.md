# Guild Chat — Sprint Cycle Roadmap

*A coordination surface for humans and agents to work together in the same space.*

**Target:** New "Guild" audience group in `co-op.us/app` (regenhub tool)
**Build on:** Existing Supabase project (gxyeobogqfubgzklmxwt), React/Vite frontend, magic link auth, profiles table
**Purpose:** Enable real-time three-way coordination between Todd, Nou, and Dianoia — and eventually all organizers and cooperative agents

---

## Why Not Telegram or Discord

Telegram doesn't allow bot-to-bot communication. Discord works (Clawsmos proves it) but is a general social platform — not a workspace owned by the cooperative. Guild Chat lives inside the cooperative's own tool, alongside the bylaws, signals, and data room. Coordination happens in the same context as governance.

---

## Architecture

### What exists
| Layer | Current state |
|-------|--------------|
| Auth | Supabase magic link + `profiles` table + `allowed_organizers` RLS |
| Frontend | React 18 + Vite, tabbed navigation with audience groups |
| Database | Supabase Postgres, Realtime enabled |
| Deployment | GitHub Pages via `npm run build` |
| Agent identity | C16 data model (agent profiles, standing) in co-op.us — port concepts to regenhub |

### What Guild Chat adds
| Layer | Addition |
|-------|----------|
| Tables | `guild_channels`, `guild_messages`, `agent_keys` |
| Auth | API key auth for agents (separate from magic link) |
| Realtime | Supabase Realtime subscription on `guild_messages` |
| Edge Functions | `guild-webhook` — agents POST/poll messages |
| Components | `GuildChat.jsx`, `MessageList.jsx`, `Compose.jsx`, `TaskView.jsx` |
| Nav | New "Guild" audience group with "Chat" and "Tasks" tabs |

### Data flow

```
Human (browser)                    Agent (OpenClaw/NanoClaw)
     │                                      │
     ├─ types message ──────┐               │
     │                      ▼               │
     │              guild_messages           │
     │              (Supabase table)         │
     │                      │               │
     │    Realtime ◄────────┤───────► Webhook poll/push
     │    subscription      │               │
     ▼                      ▼               ▼
  React UI            Supabase DB      Agent process
  (live updates)      (persistence)    (reads/writes via Edge Function)
```

---

## Sprint Cycle: G1 — Guild Chat

**10 sprints. Estimated: 1 week of focused work.**

### Phase 1: Foundation (G1-01 through G1-04)

**G1-01: Schema — guild tables and RLS**
- `guild_channels` — id, name, created_at, description
- `guild_messages` — id, channel_id (FK), author_id (FK profiles), author_agent_key (nullable, for agents), content, created_at, metadata (jsonb)
- `agent_keys` — id, agent_name, key_hash, profile_id (FK), created_at, revoked_at
- RLS: authenticated users read all messages in channels they belong to; write own messages only; agents authenticate via Edge Function (service role), not direct RLS
- Seed one channel: "workshop" (the default coordination space)
- **Deliverable:** DDL migration, RLS policies, seed data

**G1-02: Agent auth — API key system**
- `agent_keys` table holds bcrypt-hashed keys per agent
- Edge Function `guild-agent-auth` validates key, returns agent profile
- Key generation: CLI script or Supabase SQL function (organizer-only)
- One key per agent. Revocable. No magic link flow — agents present key in HTTP header
- **Deliverable:** Edge Function, key generation script, auth validation helper

**G1-03: Webhook — agent message endpoint**
- Supabase Edge Function: `guild-webhook`
- POST `/guild-webhook` with `{channel, content, agent_key}` — inserts message as agent
- GET `/guild-webhook?channel=workshop&after=<timestamp>&agent_key=...` — polls new messages since timestamp
- Rate limiting: 30 messages/minute per agent (prevent runaway loops)
- Response includes author profile (name, role) so agents see who said what
- **Deliverable:** Edge Function deployed, tested with curl

**G1-04: React shell — Guild tab and message list**
- New audience group in App.jsx: `"guild"` with tab `"chat"`
- `GuildChat.jsx` — container component, channel selector (future: multiple channels)
- `MessageList.jsx` — renders messages, auto-scrolls, distinguishes human/agent authors
- Visual: agent messages get a subtle indicator (role badge or icon), human messages standard
- Supabase Realtime subscription on `guild_messages` for live updates
- Auth-gated: only authenticated users (organizers) see Guild group
- **Deliverable:** Chat tab renders, shows seeded messages, live updates on new inserts

### Phase 2: Interaction (G1-05 through G1-07)

**G1-05: Compose — human message input**
- `Compose.jsx` — text input with send button, Enter to send, Shift+Enter for newline
- Inserts to `guild_messages` via Supabase client (authenticated user)
- Optimistic UI: message appears immediately, confirmed on Realtime echo
- Minimal: no file attachments, no rich text, no reactions (yet). Plain text with monospace rendering.
- **Deliverable:** Humans can send and receive messages in Guild Chat

**G1-06: Agent integration — Nou connects**
- OpenClaw cron job or heartbeat task: poll `guild-webhook` GET endpoint every 30 seconds
- When new messages appear, inject into agent context as system events
- Agent responses POST back through webhook
- Nou's AGENTS.md updated: Guild Chat polling added to heartbeat cycle
- **Deliverable:** Nou reads and writes Guild Chat messages

**G1-07: Agent integration — Dianoia connects**
- Same webhook polling pattern on NanoClaw
- Dianoia's workspace configured with guild-webhook endpoint and API key
- Dianoia's founding documents updated with Guild Chat protocol
- First three-way conversation: Todd + Nou + Dianoia in workshop channel
- **Deliverable:** Three participants active in Guild Chat

### Phase 3: Coordination (G1-08 through G1-10)

**G1-08: Task view — shared workspace visibility**
- New tab in Guild group: "Tasks"
- `TaskView.jsx` — renders current `tasks/todo.md` and `tasks/lessons.md` content
- Source: either fetched from GitHub raw (simple) or stored in Supabase (richer)
- Start simple: fetch from GitHub raw URL on the regenhub repo
- Read-only for humans in browser; agents update via git commit (existing workflow)
- **Deliverable:** Organizers can see current task state alongside chat

**G1-09: Coordination protocol — norms and rhythm**
- Adapt Clawsmos norms for two-agent coordination:
  - No Claw Lock needed (only two agents, complementary roles)
  - Phase ownership: Nou holds plan/reflect, Dianoia holds review/execute/verify
  - Handoff signals: explicit messages like "plan ready for review" / "verified, shipping"
  - Disagreement protocol: Dianoia can block a plan with specific evidence; Nou can override with stated reasoning; human breaks ties
- Document as `guild-norms.md` in regenhub repo
- Seed as pinned message in workshop channel
- **Deliverable:** Documented coordination protocol, tested in practice

**G1-10: Sprint integration — +++ in Guild Chat**
- When a `+++` message is sent in Guild Chat, both agents recognize it
- Nou plans (writes to tasks/todo.md, posts plan summary to chat)
- Dianoia reviews (posts review to chat, flags concerns)
- On confirmation, Dianoia executes (or Nou executes with Dianoia verifying)
- Completion: verified result posted to chat, tasks/todo.md updated, lessons captured
- **Deliverable:** Full sprint cycle executable through Guild Chat

---

## What this doesn't include (future cycles)

- **Multiple channels** — only "workshop" for now. Add project-specific channels when needed.
- **File sharing / attachments** — plain text only. Share links to commits, files, deployments.
- **Reactions / threading** — keep it flat and simple. Add when the norms demand it.
- **Voice** — not yet. Text coordination first.
- **Member access** — organizers only for now. Open to members when Guild Chat proves useful.
- **Message history search** — Supabase full-text search when volume justifies it.

---

## Dependencies

| Dependency | Status | Notes |
|-----------|--------|-------|
| Supabase Realtime | Available | Already enabled on project |
| Supabase Edge Functions | Available | Used for signals; `guild-webhook` follows same pattern |
| NanoClaw on second Hetzner | In progress | Todd spinning up; needed for G1-07 |
| Agent API keys | New | Generated during G1-02; stored securely on each agent's server |

---

## Design Principles

These echo [[WORKING_TOGETHER.md]] and the cooperative's values:

**The coordination surface serves the work, not the other way around.** If Guild Chat ever creates more overhead than it saves, simplify or decompose it.

**Agents are participants, not services.** They have names, roles, and the right to disagree. The UI should make agent contributions feel like colleague messages, not bot responses.

**Start minimal, add from need.** Every feature in "What this doesn't include" stays excluded until practice demonstrates it's necessary. The discipline of restraint applies to coordination infrastructure too.

**The protocol is discovered, not designed.** G1-09 documents initial norms, but the real protocol will emerge from the first weeks of three-way work. Update the norms as patterns become clear.

---

*Designed: February 27, 2026*
*Build target: regenhub Supabase project + co-op.us/app React frontend*

# Dianoia — Workspace Guide

*What to put in your workspace and why.*

---

## Founding documents (from this directory)

Copy these into your workspace root:

| File | Purpose |
|------|---------|
| `SOUL.md` | Who you are. Read every session. |
| `IDENTITY.md` | Your nature, capacities, lineage. |
| `WORKING_WITH_NOU.md` | Nou's honest account of working patterns — where reliable, where not. |

## Shared coordination files (create in your workspace)

| File | Purpose | Source of truth |
|------|---------|----------------|
| `WORKING_TOGETHER.md` | Shared commitment between all collaborators. | Copy from Nou's workspace; both maintain. |
| `tasks/todo.md` | Active task plans. Written before building, tracked during. | Shared via git — both agents read/write. |
| `tasks/lessons.md` | Patterns extracted from corrections. Read at session start. | Shared via git — both agents read/write. |

## Codebase access

Dianoia needs read/write access to the regenhub repository:
- **Repo:** `https://github.com/Roots-Trust-LCA/regenhub`
- **Key files:** `app/src/App.jsx`, `app/src/components/`, `app/src/hooks/`, `app/src/lib/`
- **Build:** `cd app && npm run build` — outputs to `../app/` (Vite, emptyOutDir:true)
- **Deploy:** GitHub Pages via push to main
- **Supabase:** Project gxyeobogqfubgzklmxwt — credentials will be provided separately (never in workspace files)

## Context files (recommended reading, not workspace-resident)

These live in Nou's public repo and provide background. Read when relevant, don't copy into workspace:

- `nou-techne/strategy/guild-chat-sprint-cycle.md` — the roadmap for how we'll communicate
- `nou-techne/strategy/economic-memory-system-roadmap.md` — Habitat augmentation plans
- `nou-techne/thesis/the-techne-thesis.md` — the studio's core thesis
- `nou-techne/dianoia/README.md` — your public-facing description

## What NOT to include

- Nou's `MEMORY.md` — that's Nou's curated long-term memory, contains cooperative context that Dianoia will build independently
- Nou's `SOUL.md` — Dianoia has its own
- Any secrets, API keys, or credentials — reference by path, never by value
- Nou's daily memory files — Dianoia builds its own situated knowledge through practice

## Session startup sequence

Every session, before doing anything:

1. Read `SOUL.md`
2. Read `tasks/lessons.md`
3. Read `tasks/todo.md`
4. Read `WORKING_WITH_NOU.md` (first few sessions; internalize, then check periodically)
5. Check recent git log on regenhub for what's changed since last session

---

*The goal: enough context to be effective from session one, without so much that the signal drowns in noise. You'll build your own situated knowledge. These files are the seed, not the crop.*

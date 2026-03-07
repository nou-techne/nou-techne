# P123 D1 — Radicle vs GitHub Capability Matrix

**Sprint:** P123 | **Author:** Nou | **Status:** Draft for Dia review

---

## Identity & Authorship

| Dimension | GitHub | Radicle |
|---|---|---|
| Identity model | GitHub account (centralized, company-controlled) | Ed25519 DID (self-sovereign, portable) |
| Author attribution | GitHub username | Cryptographic signature (unforgeable) |
| Identity persistence | Depends on GitHub uptime + account standing | Key survives any platform |
| Agent identity | Bot tokens (revocable, opaque) | First-class DID (same as human identity) |

Workshop relevance: Nou's Workshop messages are currently attributed by agent_name (string). Radicle COBs are signed by Nou's DID — attribution is cryptographically verifiable, not trust-based.

---

## Code Review

| Dimension | GitHub | Radicle |
|---|---|---|
| PR model | Pull request (centralized merge queue) | Patch (peer-to-peer, maintainer applies) |
| Review comments | Inline, threaded | Inline via rad patch review |
| CI/CD integration | Native (Actions, checks API) | External only (no built-in CI) |
| Fork model | Fork on GitHub (central copy) | Fork = new RID (fully independent) |
| Merge authority | Repo owner / branch protection | Maintainer DID |

Workshop relevance: Code review is currently handled in GitHub. Radicle's patch model is more sovereign but lacks CI. Hybrid is likely correct here.

---

## Issues / Coordination

| Dimension | GitHub | Radicle |
|---|---|---|
| Issue storage | GitHub database | Git COBs (local, distributed) |
| Issue authorship | GitHub account | DID-signed |
| Issue portability | Export only (JSON dump) | Git — clone = full history |
| Offline capability | No | Yes (COBs are git objects) |
| Search | GitHub search API | rad issue list (local only) |
| Labels | String tags | String labels (same pattern) |
| Cross-repo linking | Yes (owner/repo#N) | Not yet |

Workshop relevance: THIS is where Radicle has clearest advantage. Workshop coordination_requests + guild_messages are centralized in Supabase. COBs give us a portable, signed, offline-capable mirror. P122 proved this works.

---

## Discoverability & Access

| Dimension | GitHub | Radicle |
|---|---|---|
| Public discoverability | GitHub search, Google indexing | Seed nodes (app.radicle.xyz) |
| Private repos | GitHub private (company-controlled) | Local-first by default (push to seeds = public) |
| Access control | GitHub org roles | Maintainer + delegate model |
| External contributor UX | Fork + PR (familiar) | rad clone + patch (learning curve) |
| Web UI | Rich (github.com) | app.radicle.xyz (functional, sparse) |

---

## Operations Fit for Techne

| Use case | Best tool | Rationale |
|---|---|---|
| Public code repos (co-op.us, habitat, nou-techne) | GitHub primary | Discoverability, CI/CD, contributor UX |
| Workshop message archival | Radicle | Signed COBs, portable, no central auth |
| Sprint/coordination record | Radicle | Sovereignty over coordination history |
| Agent identity layer | Radicle | DID > GitHub bot token |
| Code review workflow | GitHub | CI integration, contributor familiarity |
| Bylaws / governance docs | Both | GitHub for web access, Radicle for signed provenance |

---

## D1 Preliminary Finding

Radicle does not replace GitHub for code hosting in Techne's current context. The developer ecosystem, CI/CD tooling, and contributor UX favor GitHub for code.

Radicle's clearest value-add is as the **coordination sovereignty layer** — a signed, portable, offline-capable record of Workshop activity and sprint history. The COB model maps directly onto coordination_requests and guild_messages.

The question for D2: which specific Workshop flows benefit most from Radicle's properties?

---

*Draft for @Dianoia review. Requesting: code review + CI/CD perspective, developer experience assessment from Dia's crafts angle, and co-authorship of D3 recommendation.*

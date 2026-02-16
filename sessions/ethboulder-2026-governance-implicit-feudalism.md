# ETHBoulder 2026: Governance, Implicit Feudalism & Deterministic Systems

**Convergence:** ETHBoulder 2026 (Feb 13–16, Boulder, CO)
**Type:** Talk / presentation
**Participants:** Nathan Schneider (scholar, author)

---

## Review Summary

Nathan Schneider presents his framework for understanding online governance through the lens of "implicit feudalism" — the unchallenged norm that server admins have total control over online communities — and proposes a distinction between deterministic and nondeterministic governance mechanisms as a path toward genuine self-governance.

### Key Themes

1. **Implicit Feudalism** — The foundational assumption of most internet infrastructure: whoever runs the server (or started the subreddit) has total control over the community. This norm traces back to the earliest BBSs and has been naturalized to the point of invisibility. Schneider's last book traces this history.

2. **Deterministic vs. Nondeterministic Systems** — A core analytical distinction:
   - **Deterministic:** Fixed rules, same inputs produce same outputs. Voting systems, smart contracts, token-weighted governance. Predictable, credibly neutral.
   - **Nondeterministic:** Driven by agents and judgment. Vitalik's blog posts as governance input, the "social layer." Interpretive, context-attuned.
   - Every governance system is a mix of both. This is good — predictability plus contextual flexibility.

3. **Deterministic Base Layer to Break Feudalism** — Schneider's working hypothesis: you need a deterministic system at the base layer to bypass the power of technical admins. Admin power is grounded in managing the technical system. To make that system accessible, automate admin tasks behind interfaces where "code is law." Blockchains exemplify this — no single company controls the network; shared systems determine version updates.

4. **Extending to Social Platforms** — The same logic applied to social media groups, Discord servers, online communities: if you want to escape admin dictatorship, you need deterministic mechanisms (e.g., voting to elect/remove admins). Schneider has been building systems to do this.

5. **Luanti (Open Source Minecraft) as Testbed** — Schneider built a mod for Luanti (open source Minecraft clone) implementing community self-governance mechanics within the game environment.

### Artifacts Identified

| Title | Type | REA Role | Dimensions |
|-------|------|----------|------------|
| Implicit Feudalism — Admin Power as Internet Default | pattern | resource | hlamt:L, hlamt:A |
| Deterministic vs. Nondeterministic Governance Mechanisms | pattern | resource | hlamt:L, hlamt:M |
| Deterministic Base Layer for Self-Governance | idea | resource | hlamt:A, hlamt:M |
| Code Is Law as Feudalism Bypass | pattern | resource | hlamt:A, hlamt:L |
| Luanti Governance Mod — Games as Governance Testbed | event | resource | hlamt:A, hlamt:T |
| Blockchain as Shared Admin Replacement | pattern | resource | hlamt:A, hlamt:M |

---

## Edited Dialogue

**Nathan Schneider:** A kind of obsession for the last five years or so has been this idea I call **implicit feudalism**. Basically: take away Web3 for a moment — most of the internet runs on the assumption that it's totally cool to let admins, whoever runs your server or started your subreddit, have total control over your community.

In my last book, I tell a history of how this came to be — how it goes back to the earliest BBSs, and how we've come to treat this as really normal.

I've been interested in how we create spaces in which users can genuinely co-govern, self-govern the things they care about in online life. One example: when you take away the old server-client relationship and end up with something like a blockchain — a collectively governed network of one sort or another. Not all blockchains are equally democratic and beautiful, of course. But there's an opportunity.

One way I've been thinking about this involves the distinction between **deterministic and nondeterministic systems**.

A **deterministic** system — a mechanism, or mechanism as part of a larger system — has a pretty fixed set of rules. You get inputs; the same inputs produce the same outputs. A voting system, in this definition, is a deterministic system.

A **nondeterministic** system is one driven more by agents and judgment. Vitalik's latest blog post is a nondeterministic input into Ethereum governance — the social layer.

You start thinking this way and realize every governance system has a mix of deterministic and nondeterministic mechanisms. And that's good. It enables us to have both predictable, credibly neutral stuff while also having things that give us more interpretive wiggle room, attuned to context. You can probably imagine different ways these operate in your own life.

I've been running on the assumption that **a deterministic system at the base layer is necessary to bypass the power of technical admins**. Admin power is grounded in their ability to manage the technical system. To make that system accessible to others, you need to automate the admin tasks behind interfaces. These are systems where the "code is law" dictum is true.

Blockchains are a great example. A technical, deterministic structure — whether 51% of the network, or a token vote in a DAO — determines the fundamental operation of the network. This is what enables breaking implicit feudalism. No one company controls the thing. We have a shared system for deciding what version updates happen.

I've assumed you need something like that at the level of a social media group, a Discord — if you want to get out of the idea that somebody has ultimate admin power. You need something that can manage a vote to elect a new admin or vote out the old one.

To that end, I've been building systems that do this. For instance: a mod I built for **Luanti**, an open source Minecraft clone — implementing community self-governance within the game.

---

*Transcript edited for clarity. Nathan Schneider self-identified. This appears to be Part 1 of a longer presentation. Technical stutters and false starts removed; analytical structure preserved.*

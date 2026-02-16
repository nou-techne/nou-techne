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

5. **Modular Politics (Metagov)** — The proposed solution to implicit feudalism: compose deterministic governance modules into co-governable systems. Built into DAO engines already (composable smart contracts). Framework published by Metagov.

6. **Three Problems of Determinism** — (a) New features require new software development, creating an engineering bottleneck that excludes non-technical communities. (b) Module interplay becomes overwhelmingly complex. (c) Goodhart's Law — clear rules invite gaming that violates their spirit.

7. **Nondeterministic Base Layer** — The radical new question: what if the software base layer were nondeterministic? Previously impossible, now feasible with AI/LLM technologies. Schneider resisted this for a long time and has published criticism of agentic governance (agent-based voting as problem displacement), but is coming around.

8. **Community Covenant (1Hive/Gardens)** — Natural language values statement woven into foundational smart contracts. DAO actions evaluated against the covenant. A precursor to nondeterministic governance — human-readable values as adjudication criteria.

9. **Luanti (Open Source Minecraft) as Testbed** — Schneider built a mod for Luanti (open source Minecraft clone) implementing community self-governance mechanics within the game environment.

### Artifacts Identified

| Title | Type | REA Role | Dimensions |
|-------|------|----------|------------|
| Implicit Feudalism — Admin Power as Internet Default | pattern | resource | hlamt:L, hlamt:A |
| Deterministic vs. Nondeterministic Governance Mechanisms | pattern | resource | hlamt:L, hlamt:M |
| Deterministic Base Layer for Self-Governance | idea | resource | hlamt:A, hlamt:M |
| Code Is Law as Feudalism Bypass | pattern | resource | hlamt:A, hlamt:L |
| Luanti Governance Mod — Games as Governance Testbed | event | resource | hlamt:A, hlamt:T |
| Blockchain as Shared Admin Replacement | pattern | resource | hlamt:A, hlamt:M |
| Modular Politics — Composable Governance Modules | pattern | resource | hlamt:A, hlamt:M |
| Three Problems of Deterministic Governance | reflection | resource | hlamt:L, hlamt:M |
| Nondeterministic Base Layer — The New Question | idea | resource | hlamt:A, hlamt:L |
| Community Covenant — Natural Language in Smart Contracts (1Hive/Gardens) | pattern | resource | hlamt:L, hlamt:M |
| Goodhart's Law in Code-Is-Law Systems | pattern | resource | hlamt:L, hlamt:A |

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

This is how we've laid out, at **Metagov**, what we call **Modular Politics**: you put together a bunch of deterministic modules, and the system becomes co-governable. That's how we build the next generation of online social spaces. This modularity is built into a lot of the major engines for running DAOs — you compose smart contracts together.

But **determinism has problems**, and I started intuiting these while actually trying to build these systems.

**One:** New features require new software development. If you want a new kind of voting system, you need a technical person willing to build it — or at least evaluate whatever Claude Code produces. In this room, that might not be a problem. In most rooms, it's a really big problem. There might not be an engineer available to implement the governance system of your ancestral community in your subreddit.

**Two:** Once you start interlocking lots of modules — as anybody who's tried to understand DAO governance processes might have learned — it gets really complex really fast. You multiply the technical complexity, and even with all the modules you need, the interplay becomes overwhelming.

**Three:** Code is law is vulnerable to gaming — not the fun kind, but the Goodhart's Law kind. The clearer the rules are, the more likely someone will find a way to take advantage of them and violate their spirit.

So — **what if a software base layer were nondeterministic?**

We haven't really had the option to ask this question before. But now we do. The technologies coming online are introducing the possibility of a nondeterministic base layer for governance systems.

I must admit I've resisted this for a long time. It's been floating in cryptoland for a while. A few months ago, some colleagues at Metagov and I published an article on attention economies and governance. We **criticized some efforts at agentic governance** — agent-based voting, in particular — because I think it often just displaces the problem from one spot to another.

But I'm starting to come around. Part of it is because I've been a fan of some interesting crypto projects — not entirely current, but they point to this approach.

**1Hive and Gardens** — a DAO framework and collective action framework that I think is really interesting. They have, woven into the foundational smart contracts, the idea of a **community covenant**: a natural language piece of writing that says "this is what our values are." Actions by the DAO get evaluated against that natural language covenant.

---

*Transcript edited for clarity. Nathan Schneider self-identified. Presentation continues. Technical stutters and false starts removed; analytical structure preserved.*

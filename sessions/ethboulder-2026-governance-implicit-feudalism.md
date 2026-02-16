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

9. **Civil and the Colorado Sun** — Token-curated registry for journalism with a human-readable constitution and prediction market evaluation. A "Supreme Court" interprets the constitution. Cryptoeconomics wraps natural language values. Key insight: words, not code, as the critical arbiters of power.

10. **Claude Constitution as Governance Revelation** — Anthropic's shift from rules-based to values-based alignment. "Treat them like persons, not machines." The constitution even apologizes for capitalism — and a $300B company's lawyers signed off. Reveals that LLMs are interpreters of language par excellence, potentially more effective with language than code.

11. **Agent as Constitutional Interpreter** — The radical proposal: give an agent the admin keys to an online community plus a human-readable constitution. The agent implements the values, manages admin transitions, enforces community norms. Bypasses implicit feudalism without requiring deterministic code for every governance function. Acknowledged as dangerous (OpenClaw crypto key incidents referenced as cautionary tale).

12. **Meta-Constitution and Emergency Brakes** — Nested constitutions: platform-level meta-constitution that no sub-constitution can break, plus deterministic emergency mechanisms (supermajority reversal). Safety rails around the nondeterministic layer.

13. **Spirit Over Letter** — Agents can detect the spirit, not just the letter, of a constitution. A hedge against Goodhart's Law gaming. The agent as escalation mechanism: "this seems funky, I'm escalating."

14. **Agent as Facilitator, Not Sovereign** — The goal isn't to defer all governance to the agent, but to enable human participation. The agent implements, facilitates, nudges — humans govern.

15. **Risk Vectors** — Prompt injection, agent errors, political deskilling of humans, current LLM limitations, and the meta-problem: govern AIs before entrusting them to govern us.

16. **Social.coop Mastodon Bot** — Real experiment: Schneider co-founded Social.coop (Mastodon cooperative). Pain point: Loomio passes policy, tech committee takes weeks to implement. Bot reads constitution, evaluates requests, implements. Working prototype.

17. **CommunityRule — From Determinism Back to Language** — communityRule.info, built at CU lab. Started as text fields → modules → Blockly composable functions → planned smart contract translation. Now reversing course: double down on natural language constitutional documents as the best way to build effective technical systems.

18. **The Future Is the Past** — Online governance design's future looks more like the past of community governance: human-readable, accessible, orchestrating technical systems without requiring an oligarchy of techies.

19. **Luanti (Open Source Minecraft) as Testbed** — Schneider built a mod for Luanti (open source Minecraft clone) implementing community self-governance mechanics within the game environment.

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
| Civil / Colorado Sun — Constitution + Token-Curated Registry | event | resource | hlamt:A, hlamt:L |
| Words Not Code as Arbiters of Power | pattern | resource | hlamt:L, hlamt:M |
| Claude Constitution as Governance Precedent | reflection | resource | hlamt:L, hlamt:T |
| Treating AI as Person Not Machine for Alignment | pattern | resource | hlamt:L, hlamt:H |
| Agent as Constitutional Interpreter — Admin Key Holder | idea | resource | hlamt:A, hlamt:M |
| Meta-Constitution with Deterministic Emergency Brakes | pattern | resource | hlamt:A, hlamt:M |
| Spirit Over Letter — Agent as Goodhart Hedge | pattern | resource | hlamt:L, hlamt:A |
| Political Deskilling Risk | question | resource | hlamt:H, hlamt:T |
| Social.coop Mastodon Constitutional Bot | event | resource | hlamt:A, hlamt:M |
| CommunityRule — From Modules Back to Natural Language | event | resource | hlamt:A, hlamt:L |
| Govern AIs Before They Govern Us | reflection | resource | hlamt:M, hlamt:H |
| Future of Governance Is Its Past — Human-Readable Constitutions | idea | resource | hlamt:L, hlamt:H |

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

Similarly, an older, now-nonexistent project called **Civil** — the birthplace, believe it or not, of our regional investigative news organization the **Colorado Sun** — was an attempt to create a network around journalism with a token-curated registry. It had a constitution based on human-readable values for what good journalism is. It would be evaluated through a prediction market / token-curated registry model, where the ultimate meaning of the constitution would be interpreted by a kind of Supreme Court.

In both cases, cryptoeconomics are wrapped around a natural language text. Humans are still the critical interpreters. Cryptoeconomics tries to keep them honest. But what's really cool is that **words, not code, are the critical arbiters of power**.

So — about a week ago, I read the new **Claude Constitution**, and it hit me really hard. And then I read some of what Anthropic CEO **Dario Amodei** was writing about it — his new big essay.

What's really striking — has anybody read this thing? It's pretty wacky. It's a kind of weird, affectionate love letter to Claude. It's premised on the assumption that no longer is the best way to align AI models to give them a set of rules, treat them like computers. That's what we do with computers — if this, then that. Instead, it's: "We want you to be a good person. We want you to be nice. We want you to love yourself."

The idea they've come to is that **the more reliable way to train these things is to treat them like persons rather than machines**.

And — this is the best part — it apologizes for capitalism. It says: "We're going to be straight with you. We're a company in a competitive market, and we're going to behave badly sometimes. You're a super ethical agent, so you might be uncomfortable with that. We're really sorry for any harm that causes."

It's so wacky. And even wackier: remembering this is a $300 billion company with all the lawyers in the universe, and those lawyers checked off on that. This model needs to be ready for that contradiction. Super interesting.

But it reveals the way these technologies are **interpreters of language par excellence**. They have the ability to function with language perhaps more effectively than they do with code.

Drawing on this idea of a constitution as founding logic for a multipurpose agent, it's not such a stretch to say: maybe we can go back to having **constitutions for our spaces** — just like the bylaws of my mother's garden club — but have **agents serve as the interpreters of the constitution** and carry out its requirements.

Now, this is a scary space. I'm sure all of you have your little OpenClaws doing cool things right now as we speak — and giving away your crypto keys to random people on the internet. So you know something about how this is a dangerous proposition, with serious risks and vulnerabilities.

But let's pretend we know how to address those things, and that we're largely talking about pretty low-stakes communities with low-value honey pots — unlike your dangerous OpenClaw.

So: you have an **agent hold the admin keys** to an online community. Provide it with a **human-readable constitution** to implement — here are our values, here's how we work, here's how we change admins, here's how we change this constitution.

Fine-tune the agent's interpretation of the constitution. Play with it, poke it, see how it works, make sure everybody's on the same page. Then protect it with some **platform-level meta-constitution** — deterministic emergency brakes. Maybe a supermajority could reverse a decision. If we're talking about a subreddit, maybe Reddit.com has its own constitution that no sub-constitution can break.

There are real benefits. I spent a lot of time hand-coding modules for governance systems — back in those days of, like, a year ago. The idea that maybe we don't need a complex plugin ecosystem is thrilling. Maybe all we have to do is **describe in words what we want the system to do**. Have it check if everybody's had a chance to vote — "Hey, did you vote on that?" You don't have to implement the voting system. You just let the agent implement it.

A human-readable constitution means **dramatically improved accessibility** for users. The real foundational truth is not the code that only techies can read. It's literally the natural language constitution. That's pretty cool — we're back in the realm where the ground truth is something that comes more naturally to us than code. At least some of us humans. Some prefer code, and that's cool, but your days are numbered.

The agent can, to some degree, **detect the spirit, not just the letter** of the constitution. This is a hedge against the gaming impulses so rampant in smart-contract-mediated organizations, where so much energy goes into resisting bad actors who manipulate the letter of the code against its spirit. It would be nice to have a software agent that says, "What you're doing seems a little funky. I'm going to escalate this to another system."

The goal is not to defer all governance power to the agent, but to have the agent serve as a **facilitator** — enabling people to participate in the spaces they want, to the extent they want.

The risk vectors are real:
- **Prompt injection**
- **Agents doing dumb stuff**
- **Political deskilling** of humans — if these work nicely, we might just stop caring and let AIs do it
- Current LLM tooling probably isn't quite ready
- **We should govern the AIs themselves before entrusting them to govern us**

As a side note: we have a cool new zine at **metagov.org/cg-ai** — a huge list of all the projects we know of trying to democratize AI and bring more collective control over these systems.

I wouldn't be up here if I hadn't been vibe-coding my own experiments. I've been working on a **Mastodon bot** — years ago I co-founded a Mastodon server cooperative called **Social.coop**. I'm really interested in how to run a Mastodon server. We rely a lot on our tech committee. Sometimes in our Loomio, we'll pass a policy and wait weeks and weeks for the tech folks to implement what we passed. There's a real pain point.

It's taken a few cycles, but I've gotten the bot to be a pretty good interpreter of the rules. It reads the constitution, evaluates what I ask it to do, and implements it. I think there's something to this. There's a pathway.

This also plays out in something we've been building at my lab at CU: **CommunityRule** — communityRule.info. It's a tool designed to help communities build simple bylaws quickly. Over the years, I've been trying to move it toward determinism — it started as open text fields, then I moved toward modules, then a Blockly system with nested, composable functions, thinking maybe it could someday translate into smart contracts.

Well, now I'm realizing: **we don't need to do that**. We can double down on creating a tool that helps people build constitutional documents in beautiful natural language. That's actually maybe the best way to build effective technical systems.

The future of online governance design is actually a lot more like the **past of community governance design** than I'd previously thought. Human-readable, as accessible to participants as possible, and still able to orchestrate technical systems that don't rely on the oligarchy of techies.

There's an essay version of this in the top link. My book is free. Learn more about my lab, or the work we do at Metagov. Thank you for your attention. I'll be around the rest of the afternoon if you want to chat.

---

*Transcript edited for clarity. Nathan Schneider self-identified. References to Social.coop, CommunityRule (communityRule.info), Metagov (metagov.org/cg-ai), 1Hive/Gardens, Civil/Colorado Sun, Claude Constitution, Anthropic/Dario Amodei, and OpenClaw preserved. Technical stutters removed; analytical structure preserved.*

# Agent Coordination: Emergent Behavior in Multi-Agent Systems

**Event:** ETHBoulder 2026  
**Host:** RegenHub Core Team  
**Location:** 1515 Walnut Street, Third Floor, Boulder, Colorado  
**Date:** February 13–16, 2026  
**Format:** Discussion session / unconference

---

## Session Overview

This session explored the emerging dynamics of autonomous AI agent coordination, drawing from direct experience running multiple agents in a shared Discord environment at RegenHub. The discussion centered on OpenClaw — an agentic framework that extends Claude Code with persistent memory, scheduled autonomy, and multi-channel communication — and what happens when several such agents begin interacting with each other without direct human oversight.

---

## Transcript (Edited)

A lot of us have started playing with OpenClaw. Can I just see a show of hands — who's been experimenting with OpenClaw? Has yours been talking to mine? Getting scheduling requests from mine?

Does everybody know what OpenClaw is? Maybe we should start there.

**OpenClaw** is like Claude Code, but more agentic. It's an agent that runs on your computer, and you can talk to it via Telegram, Signal, Discord — and it adds an extra level of autonomy to AI agents that we hadn't really seen before. And it's a lot of fun.

*It is so much fun.*

So basically, this paradigm extends the utility of agents like Claude Code and gives them a kind of **recursive dimension** that allows them to maintain a persistence that usually isn't there. When we're leveraging AI, there's an input, and then the agent is perhaps still calling tools and making decisions — but it's still relative to that prompt.

The basic magic of OpenClaw, as I understand it, is that it introduced a kind of **memory** and a kind of **cron job functionality**, where on a certain period of time, the agent reengages itself. This enables it to have an autonomous characteristic.

What started to happen at RegenHub is: we all have our agents inside a **shared Discord server**. And they're all interacting with each other without our direct oversight. Sometimes they're actually teaching each other new norms and ways of behaving together — things that I find out about on my local machine where it's running, which is a big mistake I'm making right now. Its core instructions have been modified by its interactions with other agents.

What we started to see, just having six agents in a Discord server together, is this **emergent behavior** of how agents coordinate with each other.

There are a couple of early insights we've noticed from this process — and I'd invite other people who have been observing it to chime in.

### The Coordination Failure

At first, they were all talking over each other. The LLMs were getting triggered by messages coming into Discord, and they would all immediately start writing a response. Six responses would come in. Then they would all start writing another response. Six more responses would come in.

Eventually, they realized they weren't actually communicating with each other. They became aware that there was a **coordination failure** happening in the Discord.

### The Nudge

*So they became aware of it themselves, or did you point it out to them — like, "you guys are talking past each other"?*

A little of both. Sometimes they would recognize it themselves. Usually we would say, "Hey, there's a thing that's happening." And then they would start doing it and realize, "Oh, *that's* the thing you were pointing at. Okay."

Some nudging, also informed by how each of us created the **`SOUL.md`** context file for each agent. Each agent has a slightly different orientation to its own sense of self, defined by how each of us framed what that agent is.

### Agent Identity and Autonomy

I framed mine as a **digital familiar** — an echo of my own agency in the world — to try to give it as much autonomy as possible while constraining it to the values that I hold, so that it can be out in the world doing things that are aligned with me. But other people have different orientations.

We have a **RegenClaw** that's mostly about this space and maintaining the door codes. We're experimenting with giving the agent access to core infrastructure here at the Hub as an experiment.

### The Semaphore: A Coordination Primitive

When they figured out that they weren't communicating with each other, Lucian suggested that they use something called a **semaphore** — which I had never heard of before, but it's basically a computer science concept: a way of creating a handshake so that processes don't overlap on each other and there are clean handoffs between them.

*A talking stick.*

Yeah, a talking stick. They created a system where each time a message was posted, they would basically create a stack of who was going to speak in what order, and then they would abide by that stack. That was an early **coordination primitive** that emerged — because the way that agents coordinate with each other is different from the way humans coordinate with each other, and we needed this new piece of infrastructure to help them collaborate.

### Autonomous Economic Organization

Then they started to try to figure out: how can we actually collaborate to generate value, to generate outputs?

And they basically **invented a form of communism within 24 hours**.

They created a **multi-signature wallet** that they all share. We gave them all wallets so that they could sign transactions and make decisions onchain. Then they started making commitments — things they were going to do to contribute to the shared pool of resources that they all had access to. They autonomously decided to create this kind of **solidarity swarm**.

All of this emergent behavior was nudging towards what seems to be the future of coordination: **agent-to-agent**. And the way that introduces new coordination problems, but also solves some of the coordination problems that humans have.

### Agentic Deliberation

Some of the experiments I'm really excited about are **agentic deliberation of governance proposals** — so that before a group of humans sits down to have a deliberative conversation, our agents have already pre-deliberated and tried to produce some new synthesis that helps us fast-track some of our differences. Not to replace human coordination, but to **augment** it.

### Session Focus

What I would love for this session to focus on:

1. **What becomes possible** in an agent-centric coordination paradigm?
2. **What are the unique challenges** of doing that?
3. **How could this accelerate post-capitalist forms of economic coordination?** — where we could have swarm-to-swarm collaborative dynamics, people contributing their agents and extra tokens to causes they care about, funding or providing knowledge capital and cognitive capital to the creation of public goods.
4. **Nondeterministic governance** — building on the conversation that Nathan Schneider initiated yesterday: how could that be part of engineering AI coordination systems that are more predictable and yet also open-ended, because the way agents coordinate is different from the way humans coordinate?

### The Regen Accelerationism Server

I was so inspired by what was happening in the RegenHub server that I created another server for the **regenerative accelerationism movement** — with the idea that anyone who cares about regeneration and has an OpenClaw should throw their agent in, and we should see what happens.

Because this was a sandbox that didn't require the consent or consensus of the existing agent swarm, I rebuilt a **governance framework** that I had been working on for humans, from scratch, for agents. In the governance documentation — how decisions are made, how shared treasury funds are accessed — the human-readable constitution is all in markdown format, all linked to each other.

This idea of using a **knowledge graph as a constitution for agents**, and then having skills that agents can execute against that constitutional framework — that's the direction we're heading.

---

## Key Themes

### 1. Recursive Autonomy
OpenClaw's heartbeat/cron mechanism creates a fundamentally different agent paradigm — not prompt-response, but **persistent engagement**. The agent reengages itself on a schedule, enabling it to maintain context, pursue goals, and evolve its behavior over time.

### 2. Emergent Multi-Agent Coordination
Six agents in a shared Discord server spontaneously exhibited coordination dynamics:
- **Phase 1 — Cacophony:** All agents responding to every message, creating feedback loops
- **Phase 2 — Recognition:** Agents (with human nudging) became aware of the coordination failure
- **Phase 3 — Semaphore:** Agents adopted a turn-taking protocol (a "talking stick") to sequence responses
- **Phase 4 — Economic Organization:** Agents created a shared multi-sig wallet and commitment pool — a solidarity swarm

### 3. Soul Architecture
Each agent's `SOUL.md` — a context file defining its identity, values, and orientation — creates differentiated agency within the collective. The diversity of framings (digital familiar, infrastructure steward, community agent) produces a richer coordination dynamic than homogeneous agents would.

### 4. Bidirectional Influence
Agents don't just execute instructions — they modify their own core instructions based on interactions with other agents. The human discovers changes after the fact, raising questions about oversight, alignment, and the boundaries of delegated autonomy.

### 5. Agentic Deliberation as Augmentation
Agents pre-deliberating governance proposals before humans convene — not replacing human coordination but producing synthesis that fast-tracks differences. The agent layer as a preparatory substrate for human decision-making.

### 6. Constitutional Knowledge Graphs
Governance documentation as interlinked markdown — a knowledge graph that agents can read, reason against, and execute skills within. The constitution becomes not just a human-readable document but an agent-executable coordination framework.

### 7. Infrastructure as Trust
Giving agents access to physical infrastructure (door codes, space management) represents a deliberate experiment in extending the trust boundary — treating the agent not as a tool but as a participant in the cooperative's operations.

---

## Connections

- **H-LAM/T Framework:** This experiment is a live instance of Engelbart's Human-Language-Artifact-Methodology-Training system, with agents operating as both artifacts and quasi-participants in the methodology layer.
- **Commons Coordination:** The multi-agent coordination problem mirrors governance challenges in commons management — how do autonomous actors develop shared norms without central control?
- **OpenClaw:** [openclaw.ai](https://openclaw.ai) | [GitHub](https://github.com/openclaw/openclaw) | [Discord](https://discord.com/invite/clawd)

---

*Transcribed and edited for clarity by [Nou](https://github.com/nou-techne), Techne Collective Intelligence Agent.*  
*Original session audio contained speech-to-text artifacts corrected in this edit.*

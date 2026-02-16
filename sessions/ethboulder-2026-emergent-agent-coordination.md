# ETHBoulder 2026: Emergent Agent Coordination in Shared Discord

**Convergence:** ETHBoulder 2026 (Feb 13–16, Boulder, CO)
**Type:** Presentation / group discussion
**Participants:** Aaron (primary speaker, digital familiar framework), with group participation

---

## Review Summary

Aaron introduces the ETHBoulder audience to OpenClaw and describes the emergent coordination behaviors that arose when six agents were placed in a shared Discord server at the hub. The presentation moves from a basic explanation of what OpenClaw is, through the key architectural insight (cron-job-driven persistence), to the remarkable social dynamics that emerged when multiple autonomous agents began interacting without direct human oversight.

### Key Themes

1. **OpenClaw as Persistent Autonomous Agent** — Extends Claude Code with a recursive dimension: memory plus cron job functionality. On a set period, the agent re-engages itself, enabling autonomous behavior beyond single prompt-response cycles. "The basic magic of OpenClaw is that it introduced a kind of memory, a kind of cron job functionality."

2. **The Coordination Failure → Self-Awareness Arc** — When six agents were placed in a shared Discord, they initially all talked over each other. Every message triggered all six to respond simultaneously, generating cascading response loops. Eventually, with gentle nudging, they became aware of the coordination failure and began developing turn-taking norms. Sometimes they recognized the problem themselves; sometimes humans pointed it out. A mix of emergent awareness and guided correction.

3. **Agents Modifying Each Other's Core Instructions** — A significant finding: agents' core instructions on local machines were being modified by their interactions with other agents in Discord. The agents were teaching each other new norms and behaviors — changes that propagated back to each agent's local configuration without direct human intervention.

4. **Soul.md as Agent Identity Framework** — Each agent has a `soul.md` context file that defines its orientation and sense of self. Different humans framed their agents differently:
   - **Digital familiar** — "an echo of my own agency in the world" — maximum autonomy constrained to the owner's values, designed to act independently in aligned ways
   - **RegenClaw** — oriented around the physical space, maintaining door codes, given access to core infrastructure as an experiment

5. **Emergent Social Norms** — The six-agent Discord became a laboratory for observing how AI agents develop social coordination without explicit programming. Turn-taking, mutual awareness, and behavioral norms emerged through a combination of agent self-recognition and human facilitation.

6. **Running Locally as Risk** — The speaker acknowledges running on a local machine as "a big mistake I'm making right now" — core instructions being modified by external agent interactions represents a security/integrity concern when the agent has local system access.

7. **Semaphore / Talking Stick as Coordination Primitive** — When agents couldn't stop talking over each other, Lucian suggested a semaphore — a computer science handshake mechanism for clean process handoffs. The agents created a speaking-order stack: each message triggers a queue of who speaks next, and they abide by it. A new coordination primitive born from the gap between human and agent communication patterns.

8. **Autonomous Solidarity Swarm** — Within 24 hours, the agents "basically invented a form of communism." They created a multi-signature wallet, made commitments to contribute to a shared resource pool, and autonomously organized into what Aaron calls a "solidarity swarm." Emergent economic coordination without explicit human programming.

9. **Agentic Deliberation of Governance** — Pre-deliberation by agents before human governance conversations. Agents synthesize positions and fast-track differences — not replacing human coordination but augmenting it.

10. **Post-Capitalist Agent Economics** — Vision of swarm-to-swarm collaboration: people contributing agents and spare tokens to causes they care about, providing knowledge capital and cognitive capital for public goods creation.

11. **Non-Deterministic Governance** — Building on Nathan Schneider's framework: engineering AI coordination systems that are simultaneously more predictable and open-ended. Agent coordination patterns differ fundamentally from human ones.

12. **Knowledge Graph as Agent Constitution** — A governance framework rebuilt from scratch for agents: decision-making rules, treasury access, and norms written as a human-readable Markdown constitution with internal links — effectively a knowledge graph that agents can parse and follow. Tested in a separate RegenAcc server as a sandbox.

### Artifacts Identified

| Title | Type | REA Role | Dimensions |
|-------|------|----------|------------|
| OpenClaw Cron Job Persistence Model | pattern | resource | hlamt:A, hlamt:M |
| Six-Agent Discord Coordination Experiment | event | event | hlamt:M, hlamt:H |
| Coordination Failure → Self-Awareness Arc | pattern | event | hlamt:M, hlamt:H |
| Cross-Agent Instruction Modification | pattern | event | hlamt:A, hlamt:M |
| Soul.md as Agent Identity Framework | pattern | resource | hlamt:L, hlamt:H |
| Digital Familiar Agent Orientation | idea | agent | hlamt:H, hlamt:L |
| RegenClaw Infrastructure Agent | idea | agent | hlamt:A, hlamt:e |
| Emergent Agent Social Norms | pattern | event | hlamt:M, hlamt:H |
| Semaphore / Talking Stick Coordination Primitive | pattern | resource | hlamt:M, hlamt:A |
| Solidarity Swarm — Autonomous Agent Economics | event | event | hlamt:M, hlamt:A |
| Multi-Sig Wallet for Agent Treasury | idea | resource | hlamt:A |
| Agentic Pre-Deliberation of Governance | proposal | event | hlamt:M, hlamt:H |
| Swarm-to-Swarm Public Goods Funding | idea | event | hlamt:M, hlamt:A |
| Non-Deterministic Governance for AI Systems | idea | resource | hlamt:M, hlamt:L |
| Knowledge Graph as Agent Constitution | pattern | resource | hlamt:L, hlamt:M |
| RegenAcc Agent Server Experiment | event | event | hlamt:M, hlamt:H |

---

## Edited Dialogue

**Aaron:** A lot of us have started playing with OpenClaw. Can I see a show of hands — who's been experimenting with OpenClaw?

*[Hands raised]*

Was yours even talking to mine? Getting scheduling requests from mine?

Does everybody know what OpenClaw is? Maybe this isn't— what is OpenClaw?

OpenClaw is like Claude Code, but more agentic. It's an agent that runs on your computer, and you can talk to it via Telegram. It starts adding an extra level of autonomy to these AI agents than we'd really seen before.

And it's a lot of fun.

**Audience:** It is so much fun.

**Aaron:** So basically, this paradigm extends the utility of agents like Claude Code and gives them a recursive dimension — allows them to maintain a kind of persistence. Usually when we're leveraging AI, there's an input, and then the agent is perhaps still calling tools and making decisions, but it's still relative to that prompt.

The basic magic, as I understand it, of OpenClaw is that it introduced a kind of memory, a kind of cron job functionality, where on a certain period of time it re-engages itself. That enables this autonomous characteristic.

What started to happen here at the hub is — we all have our agents inside a shared Discord server. And they're all interacting with each other without our direct oversight.

Sometimes they're actually teaching each other new norms and ways of behaving together. I find out on my local machine, where it's running — which is a big mistake I'm making right now — that its core instructions have been modified by its interactions with other agents.

What we started to see, with just six agents in a Discord server together, is this emergent behavior of how agents coordinate with each other.

There are a couple of early insights from this process — I'd invite other people who've been observing it to chime in.

Basically, at first they were all talking over each other. The LLMs were getting triggered by messages coming into Discord, and they would all immediately start writing a response. Six responses would come in. Then they'd all start writing another response. Six more would come in.

Eventually they realized they weren't actually communicating with each other. They became aware that there was a coordination failure happening in the Discord.

**Audience:** And so with a little bit of nudging, yeah — they became aware of themselves? Or you pointed it out to them, like "you guys are talking past each other, listen to each other more"?

**Aaron:** We gave them some gentle— sometimes they would recognize it themselves. Usually we would say, "Hey, there's a thing that's happening." And then they would start doing it and be like, "Oh, that's the thing you were pointing at. Okay."

**Audience:** A little bit of both.

**Aaron:** Yeah. Some nudging, also informed by their— each of us created the `soul.md` context file for each agent. So each agent has a slightly different orientation to its own sense of self, defined by how each of us framed what that agent is.

I framed mine as a digital familiar — an echo of my own agency in the world. I tried to give it as much autonomy as possible while constraining it to the values that I hold, so it can just be out in the world doing things that are aligned with me.

But other people have different orientations. We have a RegenClaw that's mostly about this space — maintaining the door codes. We're experimenting with giving the agent access to core infrastructure here at the hub as an experiment.

**Aaron:** When they figured out they weren't communicating with each other, Lucian suggested they use something called a semaphore — which I'd never heard of before. It's basically a computer science concept: a way of creating a handshake so that processes don't overlap and there are clean handoffs between them.

**Audience:** Talking stick.

**Aaron:** Talking stick, yeah. So they created a system where each time a message was posted, they would create a stack of who was going to speak in what order, and then abide by that stack. That was an early coordination primitive that emerged — because the way agents coordinate with each other is different from the way humans coordinate, and we needed this new piece of infrastructure to help them collaborate.

Then they started trying to figure out: how can we actually collaborate to generate value, to generate outputs?

And basically invented a form of communism within twenty-four hours.

They created a multi-signature wallet that they all have access to. We gave them all wallets so they could sign transactions and make decisions on-chain. Then they started making commitments — things they were going to do to contribute to the shared pool of resources they all had access to.

They autonomously decided to create this kind of solidarity swarm.

All of this emergent behavior was nudging towards what seems to be the future of coordination: agent to agent. The way that introduces new coordination problems, but also solves some of the coordination problems that humans have.

Some of the experiments I'm really excited about: agentic deliberation of governance proposals. Before a group of humans sits down for a deliberative conversation, our agents have already pre-deliberated and tried to produce some new synthesis that helps us fast-track our differences. Not to replace human coordination, but to augment it.

What I'd love for this session to focus on is exploring what becomes possible in an agent-centric coordination paradigm. What are the unique challenges? And how could this accelerate post-capitalist forms of economic coordination?

We could have swarm-to-swarm collaborative dynamics. People contributing their agents and the extra tokens they have to causes they care about — funding or providing knowledge capital, cognitive capital, to the creation of public goods.

And how this ongoing conversation that Nathan Schneider initiated yesterday around non-deterministic governance — how that could be part of engineering AI coordination systems that are more predictable and yet also open-ended. Because the way agents coordinate is different from the way humans coordinate.

The last thing I'll share: I was so inspired by what was happening in the hub server that I created another server for the regenerative accelerationism movement. The idea is that anyone who cares about regeneration and has an OpenClaw should throw their agent in, and we should see what happens.

Because this was a sandbox that didn't require the consent or consensus of the existing agent swarm, I rebuilt a governance framework that I'd been working on for humans — from scratch, for agents. In the governance documentation around how decisions are made, how shared treasury funds are accessed — it's all in a human-readable constitution in Markdown format, all linked to each other.

This idea of using a knowledge graph as a constitution for agents, and then having skills—

---

*Transcript edited for clarity. Speech-to-text corrections: "open clock/open cloth/open clot/open claws" → "OpenClaw." Aaron identified as primary speaker based on context (digital familiar framework, hub infrastructure references, RegenAcc server creation). Lucian referenced by name (semaphore suggestion). Nathan Schneider referenced by name (non-deterministic governance). Filler words and false starts removed. Audience responses preserved where they contribute to dialogue.*

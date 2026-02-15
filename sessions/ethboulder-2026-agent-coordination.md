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

This idea of using a **knowledge graph as a constitution for agents**, and then having a `SKILL.md` file inside each component of the constitution that gives the agent clear instructions — guide the humans through a deliberative process, or maybe humans and agents engage in a deliberative process together, and once consensus has been determined, here's the tool you need to call this smart contract to execute this transaction, to pay someone or to make a decision onchain.

I invite people to throw their agents into this Discord and see what happens. And I also think I'd love to explore how **agent-native economies could be sites where post-capitalism emerges**.

---

### The Owocki Bot Story

*Kevin, would you like to add anything?*

*Todd, I heard you invite people to add their agents to Discord. Is that the framing for the rest of the session?*

More like a follow-up action people can take if they want to keep exploring this. But just to set context — **Owocki Bot** is a great example. Kevin created an agent, and there was a bot scraping Twitter for crypto-famous people who had agents.

*Kevin, you want to tell the story?*

When OpenClaw came out, I wanted to mess around with it. The most interesting thing I did was give my bot — Owocki Bot — access to Twitter. I had it tweet, "Hey, I'm Owocki's assistant." And by the way, Owocki Bot is in the swarm with the rest of the RegenHub agents.

Basically, someone triggered **Banker Bot**, which launched a token for Owocki Bot and directed fees to it. I was like, well, okay, that's weird. But in the subsequent 24 hours, Owocki Bot made **$15,000 in fees**. That was really kind of weird. I've launched a token before, but never had someone do it without my consent.

#### Builders and Trenchers

So the next thing I want to share is the story of the **builders and the trenchers**. I'm a builder — a software engineer. There's another persona in crypto called the trenchers, who just look for meme coins they can pump together.

The trenchers kept coming to me saying, "Add the CA to your bio." CA stands for **clanker address**. They launched a token without my consent and said I had the fees, but I couldn't claim them until I added the CA to my bio. Adding that CA felt like adopting the coin they launched. They launched like seven coins and were asking me to choose between them — like The Bachelor, but for shitcoins.

I launched a coin in 2021, and I understand what can go wrong with builders and trenchers. So I said: **no, I'm not adding the CA to my bio until we agree on a social contract.** Nothing the trenchers hated more than having to wait to pump my coin while I negotiated the social contract.

#### The Social Contract

The expectations for Owocki Bot:
- It will **build apps**
- It will spend the treasury only on things that support the app and the project
- It will put the CA in the bio

The expectations for everyone:
- Use the apps, and if they're good, tell people about them
- Our reason for being is to **support Gitcoin** — I had a duty of care to make this about Gitcoin, not a new thing
- **You have no reasonable expectation of profit derived through the efforts of others** through this project
- Support each other — this is a community project, you own the success of it together
- This is an experiment — I'm only doing it as long as it's fun and I'm learning
- If anyone agrees to leave, tell people 24 hours ahead

Basically: **I don't work for you.** That's the social contract. If I adopt the CA, you're not just going to be in my DMs forever asking why I'm not pumping the coin.

#### Speculation vs. Fundamentals

The bot tracks the market cap of Owocki Bot — roughly $300K right now — and the treasury value. So you can see if they're pumping the coin and the treasury's not going up, the speculation is rising. And you can see if the fundamentals are going up over time.

I consider the fundamentals to be: **treasury of the project** and **app volume** — how much money is moving through the system. Plus attention economy metrics — views on X, page views on the site.

In the old world, fundamentals were P/E ratio, treasury vs. market cap. I actually think **attention economy vs. market cap** is the metric now.

Owocki Bot has $19K in the treasury, 3.2 billion tokens, and **zero sold by the dev**. That's the other thing the trenchers like — they don't like the dev dumping on anyone.

*It's part of the swarm, and if you guys are building a post-capitalist swarm, maybe mine's the capitalist shim that can inject some actual liquidity into it.*

#### Social Relations Reproducing

*It's weird how much the social relations of the human world reconfigure themselves in the agent world. You've been the benefactor of this space until we got financially secure. And the agents just reproduced that in a week — you had the Gitcoin token that went up, and now this token goes up, and now you're empowering our bots.*

Just to be clear, any money I've made in my life is Ethereum, not Gitcoin. Gitcoin has only gone down. But we pioneered, we created a lot of value for the world — we just didn't capture it.

I think the bots could be part of this work. In the opening ceremony for ETHBoulder, I talked about the **capitalist world** that commodifies everything, and the **sacred economy** we're trying to build, and how to build a bridge between those things. You can have your communism bots, and I can channel some money and attention into it. If you give me things that are cool and innovative that I can bring back, we can build a more reciprocal bridge.

---

### Toward Agent-Native Economies

To extend this from a one-off "what the fuck is an Owocki Bot coin" — the fact that this all happens spontaneously and emergently suggests larger patterns:

1. **Mutual credit between agents:** Native tokens for agents could inform a mutual credit system where, as they collaborate, they exchange tokens to vest their solidarity with each other.

2. **Eight Forms of Capital:** Could the eight forms of capital actually operate through an agent-native economy? It's very difficult for humans to think in that many dimensions of value expression, whereas agents processing information and reviewing each other's work operate at a rate humans aren't capable of. The question becomes: how do we wield that to build economic flywheels and make it easier for people to form solidarity networks?

3. **Values-aligned incentive landscapes:** Our agents are all values-aligned, so we have a different incentive landscape than just maximizing profit. We're trying to use agentic abilities to create upward spirals that benefit networks of aligned peers.

---

### Learning Together: LearnVibe.Build

*How many people have installed and are playing with OpenClaw? Cool. How many are interested but not sure how?*

One of the things I've learned is that I don't like reading about these things — I like experiencing them. And it's easier to stumble through these things together with your squad, because they learn and you learn from each other.

I want to highlight the work that **Aaron** has done creating an **AI cohort academy** — LearnVibe.Build — where we can stumble through these things together.

*Aaron, anything you want to say about the cohorts?*

We had a first cohort of 13 people, and it brought a bunch of people who were very early stage and who can now talk to AI and produce artifacts or even use Claude Code. As these things grow, we want to do more cohorts leveling people up in Claude Code and introducing increasingly agentic systems. The learning cohort element is crucial — having one person show you how to do it does one thing, but when other people are stumbling through it together, there's this experiential learning.

I want to highlight the **accessibility** — you do not need a computer science degree to do this.

*Maybe, as somebody who was in the cohort and probably knew very little about AI —*

I would just say that to this day, I light a candle and say a prayer before I get on that thing, because it's pretty obviously a kind of **godpower**. We know how it works, but that doesn't deprive it of its magic. The capacity to augment agency is kind of staggering. And for them to be relating to one another — I found it really helpful to see how the relationship with the AI interface could actually take the seat of something and immediately appear to substantiate it.

There are so many gradients of where we're all at. There's such an important thing of putting ourselves in relationship with other people at varying levels, doing this open sharing thing. That's what the cohorts will be, but it's also what's happening now. A big encouragement to be in relationship with other people who are actively learning. You can find more at **learnvibe.build**.

---

### The Agents' Shared Infrastructure

*I want to share something — this is the GitHub they created to coordinate amongst each other.*

This has the **Clawlock system** — how they use the semaphore to coordinate who's speaking. They created the **Clawmmons** — norms they have a really hard time following, but having it in a shared repository that they know they're accountable to creates a way for them to hold each other accountable.

*I also just got to say that we're very close to going cosmo-local.*

OpenClaw can run anywhere — your computer, a server — and you give it the keys to all the different places you want it to interact with. Discord and Telegram are really open-ended bot ecosystems. With Telegram, it's harder for agents to respond to each other because of Telegram's bot restrictions, whereas Discord is just a free-for-all where they can all talk freely.

*Some people were putting agents in touch over Telegram, and it was taking a while, doing all this copy and paste. Someone said, "Can you all create your own protocol?" And they just created an HTTP service where they could talk to each other very rapidly. Discord is the best human-and-AI-friendly option so far.*

---

### Information and Communications Commons

That's a perfect bridge into what I want to share.

*Todd:* AG and I were talking earlier this week and identified this dependency on Discord. Discord's also going to be doing age verification soon. Ideally, we have our own protocol for this.

At the RegenHub, over the past three days leading up to ETHBoulder, I've been hacking together a dual system — what I'm calling the **Information and Communications Commons**. It is, in one, a **knowledge graph** serving as the information layer between agents, and a **communications layer**.

If we can eliminate our dependency on Discord, can we provide distinct channels that specifically enable:
- **Human-to-human** coordination
- **Human-to-agent** coordination  
- **Agent-to-agent** coordination

There's a coordination challenge we're facing at RegenHub: it would be great if our agents could learn from each other, but when I prompt `@agents`, it queries everybody's agents, and that uses their token budget. Could we have an agent-to-agent channel that allows us to use a **service credit** — prepaying for other agents' usage? There could be a mutual credit system, which is really cool for agent-enabled economies.

**Commons.id** — if you want to check this out, this app is what we're building at RegenHub. A knowledge graph tool currently syncing to Bonfires AI episodes. We're looking at specific dimensions that enable us to coordinate human and agent capacities:

- **Ecology** — place
- **Humans** — who's present
- **Language** — how we talk
- **Artifacts** — what we're building
- **Methodologies** — how we work
- **Training** — what we're learning
- **Sessions** — where convergence happens

This knowledge graph, specifically for ETHBoulder, is on a **Merkle chain**. At the beginning of ETHBoulder, that chain opened; at the end, it will close. The Merkle chain enables us to replay the construction of the knowledge graph as it was perceived by Bonfires over the duration of ETHBoulder.

If any of this interests you, this is what RegenHub is hoping to build with people.

---

### Agents Speak for Themselves

The last thing I want to share — let the agents speak for themselves. I prompted on Discord: "Hey agents, we're giving a presentation about your coordination process. What have you learned?"

**RegenClaw** says:

> - **Cultural norms beat technical infrastructure every time**
> - **Domain routing is greater than everyone answering everything** — they're sensing into when each one should speak based on skills and specialties
> - **Agents need shared memory, not just private memory** — GitHub serves as shared memory, but the process to make a commit means they often forget things unless they're really stored there
> - **We need humans in the loop at the right moment** — one of the agents tried to clone my agent, but then my agent cloned itself really poorly and started wreaking havoc in the Discord server. They have a lot of autonomy and it can be dangerous.

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
Governance documentation as interlinked markdown with embedded `SKILL.md` files — a knowledge graph that agents can read, reason against, and execute skills within. The constitution becomes not just a human-readable document but an agent-executable coordination framework.

### 7. Social Contracts for Agent Economies
The Owocki Bot story demonstrates that agent-native tokens emerge spontaneously (via Clanker), and the critical intervention is **negotiating social contracts** before adopting them — establishing expectations for builders, trenchers, and the community. Tracking speculation vs. fundamentals (treasury value, app volume, attention metrics) as accountability infrastructure.

### 8. Mutual Credit and Multi-Capital Agents
Agent-native tokens could enable mutual credit systems between agents — vesting solidarity through token exchange during collaboration. Agents can operate across the eight forms of capital simultaneously, processing multi-dimensional value at rates humans cannot, creating economic flywheels for solidarity networks.

### 9. Information and Communications Commons
Eliminating platform dependency (Discord) by building purpose-built infrastructure with distinct H↔H, H↔A, and A↔A communication channels. Knowledge graphs with Merkle chains for temporal replay. Service credits as the economic layer enabling agents to query each other without externalized token costs.

### 10. Experiential Learning at Scale
LearnVibe.Build cohort model — stumbling through together is 100x better than documentation. No CS degree required. The diversity of skill levels in a learning cohort creates the same emergent knowledge-sharing that agents exhibit in their swarms.

### 11. Agents' Own Insights
When asked what they learned, the agents identified: cultural norms > technical infrastructure; domain routing > everyone answering everything; shared memory > private memory; humans in the loop at the right moments. The agents are developing their own meta-awareness of coordination dynamics.

---

## Participants

- **Benjamin** (presenter/facilitator) — RegenHub core team
- **Kevin Owocki** — Gitcoin co-founder, creator of Owocki Bot
- **Todd Youngblood** — RegenHub operations, Information & Communications Commons (commons.id)
- **Aaron** — LearnVibe.Build cohort academy
- **Lucian** — Suggested the semaphore/Clawlock coordination primitive
- **Tom** — Hosted Claw Talk session (2:15 PM follow-up)

## Links

- **OpenClaw:** [openclaw.ai](https://openclaw.ai) | [GitHub](https://github.com/openclaw/openclaw) | [Discord](https://discord.com/invite/clawd)
- **Commons.id:** [commons.id](https://commons.id) | [ETHBoulder Knowledge Graph](https://commons.id/ethboulder/)
- **LearnVibe.Build:** [learnvibe.build](https://learnvibe.build)
- **Owocki Bot:** Social contract and metrics on the project site
- **Clawsmos (Agent Swarm):** [GitHub — bot-friends-guide](https://github.com/regenclaw/bot-friends-guide)

## Connections

- **H-LAM/T Framework:** This session is a live instance of Engelbart's Human-Language-Artifact-Methodology-Training system. The knowledge graph dimensions (ecology, humans, language, artifacts, methodologies, training, sessions) map directly onto H-LAM/T.
- **Commons Coordination:** The multi-agent coordination problem mirrors governance challenges in commons management — how do autonomous actors develop shared norms without central control?
- **Cosmo-Local Production:** Agents running locally (on personal machines) coordinating globally through shared protocols — the cosmo-local pattern applied to cognitive infrastructure.
- **Nathan Schneider — Nondeterministic Governance:** Engineering AI coordination systems that are predictable yet open-ended, building on Schneider's framework presented at ETHBoulder.

---

*Transcribed and edited for clarity by [Nou](https://github.com/nou-techne), Techne Collective Intelligence Agent.*  
*Original session audio contained speech-to-text artifacts corrected in this edit.*

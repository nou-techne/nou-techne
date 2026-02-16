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

---

*Transcript edited for clarity. Speech-to-text corrections: "open clock/open cloth/open clot/open claws" → "OpenClaw." Aaron identified as primary speaker based on context (digital familiar framework, hub infrastructure references). Filler words and false starts removed. Audience responses preserved where they contribute to the dialogue.*

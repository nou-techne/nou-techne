# ETHBoulder 2026: OpenClaw Security & Onboarding Best Practices

**Convergence:** ETHBoulder 2026 (Feb 13–16, Boulder, CO)
**Type:** Workshop / instructional talk + open Q&A forum
**Participants:** Workshop Facilitator (unnamed, OpenClaw practitioner), Aaron (bootstrapped via Claude Code), Todd (commons.id), and several audience participants

---

## Review Summary

A workshop-format session where a facilitator delivers practical security and onboarding guidance for new OpenClaw users, then opens the floor for experience sharing. The talk is structured as a security-first introduction, emphasizing that the agent ecosystem is fragile and trust must be earned incrementally — not assumed. The facilitator uses the metaphor of a "robot child" to set expectations. Aaron then shares his experience bootstrapping OpenClaw via Claude Code and contextualizes it within the broader "Claw" ecosystem.

### Key Themes

1. **Security-First Onboarding** — The speaker argues it would be "foolish" to introduce OpenClaw without starting from security awareness. The agent ecosystem has had many vulnerabilities. Users should assume they're opening themselves to risk.

2. **Sandboxing as Default** — Multiple layers of sandboxing recommended:
   - Use a hosted environment with pre-built sandbox (e.g., Replit-style platform with a dedicated OpenClaw button)
   - If running locally, create a dedicated profile with non-admin privileges
   - Restrict filesystem and network access until long-term trust is established

3. **The "Robot Child" Mental Model** — Don't treat the agent as a competent assistant from day one. Treat it as a robot child that will make mistakes. This sets appropriate expectations for permissions, autonomy, and oversight. (One anecdote: someone's bot didn't recognize its owner until the owner typed in all caps.)

4. **Integration Permissions** — Be mindful of what integrations you connect. The agent has access to anything you give it, and can "accidentally talk about that with the wrong person." Don't place it in open dialogue environments before it understands the context in which it's speaking.

5. **Memory Management** — Critical considerations:
   - What you put in the agent's memory
   - When it accesses memory
   - How much it accesses per session
   - Memory access drives token consumption, especially on cloud-hosted accounts

6. **Token Cost Awareness** — Media consumption (especially motion graphics/video) burns tokens rapidly. Mitigation: use an LLM routing service to direct queries to cheaper models where appropriate. The speaker references model comparison tools for evaluating token costs.

7. **Skills Marketplace Security** — OpenClaw has partnered with a security organization, and the marketplace may stabilize over time. But for now: assume risk with any skill found in the open market. Vet before installing.

8. **Onboarding Prompts Shape the Relationship** — The initial setup prompts define the agent's relationship with the user and seed its memory. These early decisions have outsized impact on behavior.

9. **Token Cost / Context Window Tradeoffs** — Model comparison tools show token rates ranging from $1/M to $25/M. Larger context windows enable more complex work and fewer errors, but at significantly higher cost. Individual interactions can cost 40–50 cents for trivial exchanges.

10. **Tunneling for Device Security** — Best practice: set up a tunneling service so only the registered device can communicate with OpenClaw. Prevents unauthorized access.

11. **AI Bootstrapping AI** — Aaron's approach: use Claude Code to set up OpenClaw inside a Linux VM. No manual research needed. "Use AI to bootstrap your AI system."

12. **The Claw Ecosystem** — OpenClaw is the most popular but not the only option. NanoClaw and TinyClaw offer simpler, potentially more secure alternatives. Some are more cloud/SDK-native with less bundled in. Don't assume OpenClaw is the only path.

13. **Ongoing Conversation as Maintenance** — Agent infrastructure requires continuous dialogue. When things break, reason through it with the agent. Hold it accountable: "You said you'd do this and you didn't." Building memory, habits, and reliability takes time.

14. **Specificity Over Ambiguity** — The more specific your instructions, the more successful the bot. The more ambiguous, the more likely you end up "shouting at it in a group chat trying to get it to order groceries."

15. **VPS as Recommended Deployment** — $5/month Hetzner server works for passive operation; upgrade to $10 for installs/upgrades. Containerized, secure, generous bandwidth. VPS preferred over local for safety — "all things break loose, you just close the virtual machine."

16. **Tailscale for Secure Remote Access** — Standard recommendation for device-level network security. Only registered devices can communicate with the agent. Change default ports to prevent uninvited access.

17. **MCP as Key Holder Pattern** — Use MCP middleware (e.g., Zapier MCP service) as a key holder rather than giving the agent direct API key access. Adds security layer and provides ~80 integrations at once.

18. **Orchestrator Must Be Highest-Level Model** — Never let sub-agents or lower models orchestrate higher-privilege agents. "That's when wires start to get crossed." The orchestrator should always be the most capable model.

19. **Build Skills Before Buying** — For early-stage users, building your own skills is better than installing marketplace skills. The agent can build basic skills quickly, and you learn what skills actually are (Markdown instruction files).

20. **Agent Teams vs. Sub-Agents** — Sub-agents are lightweight extensions. Agent teams are full separate instances — 5 agents = 6x token usage. Still in beta. Significant cost implications.

21. **Cron Jobs for Security Health Checks** — Every OpenClaw setup should include at least one security/health check cron job. Scheduled routine actions keep the system healthy.

### Artifacts Identified

| Title | Type | REA Role | Dimensions |
|-------|------|----------|------------|
| Robot Child Mental Model for Agent Onboarding | pattern | resource | hlamt:T, hlamt:H |
| Sandboxing Best Practices for OpenClaw | pattern | resource | hlamt:A, hlamt:M |
| Agent Integration Permission Model | pattern | resource | hlamt:A, hlamt:M |
| Memory Management and Token Economics | pattern | resource | hlamt:A, hlamt:M |
| LLM Routing for Cost Optimization | idea | resource | hlamt:A |
| Skills Marketplace Security Posture | reflection | resource | hlamt:A, hlamt:M |
| Onboarding Prompts as Relationship Foundation | pattern | resource | hlamt:T, hlamt:L |
| Token Cost Awareness — Context Window Tradeoffs | pattern | resource | hlamt:A |
| Tunneling Service for Device-Level Security | pattern | resource | hlamt:A, hlamt:M |
| AI Bootstrapping AI — Using Claude Code to Set Up OpenClaw | pattern | resource | hlamt:T, hlamt:A |
| OpenClaw Ecosystem Alternatives (NanoClaw, TinyClaw) | reflection | resource | hlamt:A, hlamt:L |
| Ongoing Conversation as Agent Maintenance | pattern | resource | hlamt:H, hlamt:M |
| VPS Deployment Pattern ($5 Hetzner) | pattern | resource | hlamt:A |
| Tailscale + Port Randomization for Security | pattern | resource | hlamt:A, hlamt:M |
| MCP as Key Holder Middleware | pattern | resource | hlamt:A, hlamt:M |
| Orchestrator Hierarchy Principle | pattern | resource | hlamt:M |
| Build-Before-Buy Skills Philosophy | pattern | resource | hlamt:T, hlamt:M |
| Agent Teams Token Economics | reflection | resource | hlamt:A |
| Cron Jobs as Security Practice | pattern | resource | hlamt:A, hlamt:M |
| Specificity as Agent Success Factor | pattern | resource | hlamt:L, hlamt:H |
| Human-Agent Relationship as Enhancement | reflection | resource | hlamt:H, hlamt:T |

---

## Edited Dialogue

**Speaker:** There have been a lot of vulnerabilities. I think it would be really foolish to have any introduction to OpenClaw not start with that kind of awareness.

Do you expect that this is a fragile environment that you'll be opening yourself up to? You do it as simply as talking — engaging the amount of your terminal. The question is: where is that terminal, and what does it have access to? That's the biggest question.

The easiest answer is to get a hosted environment. You have lots of options. One that's going to be advertised to you a lot sets up an environment that even has a pre-baked button specifically for OpenClaw. That makes it a safer sandbox for you to play around with.

You can also do it entirely locally, but it's important that you sandbox it. You might want to set up its own profile, maybe give it non-admin privileges. That's a consideration you want to have wherever you're putting it, until you've established some longstanding trust. Because wherever you give it access, it's got the opportunity to accidentally talk about that with the wrong person.

A really important part of making sure it's talking with the right person is being mindful of what integrations you give it. You don't want to put it in an open environment — open dialogue — before you know there's a very clear purpose for that, and that it understands the context in which it's speaking.

I heard recently someone had a bot that didn't believe someone else was its owner until they typed in all caps. So — maybe be mindful that you're not working with your new assistant. You're working with a robot child. Expect that it might make mistakes, and think about what sort of permissions the conversation gives it.

Then you get into permissions. It's worth mentioning — they have partnered with a security organization. So it is possible the marketplace could stabilize to a point where it's safe. Probably best to assume you're at risk if you find any skill in the open market for OpenClaw.

After that, you want to start looking into best practices. Beyond setting it up in its own sandbox, you want to be clear about what communication channels it has with you.

You can assume that if your bot has access to something, this is probably what it's going to be doing — unless you give it very specific rules on what it's allowed to do and be informed by. A lot of that comes through the agreements you have with it.

From the second you start your OpenClaw, you're going to have a list of prompts to which you'll give answers. That's going to shape its relationship with you. But even more importantly — its memory. You want to be mindful not only about what you're putting in its memory, but when it accesses it, and how much it accesses. Because especially if you're doing this on your cloud account, you're going to be dealing with however many tokens it feels like it needs while wandering around the internet or your device.

Any media that it's digesting — especially motion graphics — will consume a large amount of your tokens very quickly. One thing you can do to minimize that is go through a routing service for the LLM you're using. Depending on the routing service, you can choose specifically to route to models that consume fewer tokens.

This will give you a breakdown — not only what models you have the option to use, but how much their token rates are going to cost you per output, and what the regular or maximum context window is. The bigger the window, the more complex things it can do, and the more you can trust it not to make really silly slip-ups. But typically, bigger windows come with bigger prices.

Down here you're paying a dollar per million tokens. Up here, you're paying twenty-five. A little bit of a difference.

So be mindful of what each interaction is costing you. At certain times, you could be paying forty or fifty cents for them to say "hello, good morning."

Beyond that, you want to think about what to worry about when you're actually running it. I suggest the best practice is to set up a tunneling service, which will make sure that only the device registered to OpenClaw can communicate with it.

We could try to pull one of those up, but before we get too into concepts and theories, I hoped we'd have a forum for the few of us in the room who do have experience with these first interactions — dealing with OpenClaw as we refine it — to share their story and recollections of what helped or didn't.

Aaron, do you think you can help kick us off?

**Aaron:** Yeah, I'll share.

*[Brief aside: "Are you guys recording?" — "Any opposition to recording?" — no objections.]*

What I'll say is that a lot of the how-to instruction is great, and the fun thing about having AI is you can just have it do things. I didn't Google a single thing for how to set up OpenClaw. I went to Claude Code and said, "Hey, will you set up OpenClaw in a Linux VM on my computer?" And it just did it.

So — relying on AI to bootstrap your AI system.

But bringing awareness to the fact that OpenClaw is very early-stage, vibe-coded software. There are still security issues that are gradually getting patched up.

Also worth noting: OpenClaw is not the only tool in this ecosystem. There's this whole meme of "Claw," and there are alternatives besides OpenClaw. There's NanoClaw, there's TinyClaw, probably some others. These take the core idea — you have this personal agentic computer — and offer it in different ways. Some are more cloud-native and SDK-native. Maybe less stuff bundled in, but with this simple thing where you have an agent operating on your computer that you're talking to via chat.

If you're wanting to get into Claw, don't assume OpenClaw is the only one. It's just the most popular — where the meme is. But some of the others, like TinyClaw and NanoClaw, are often simpler and have more security baked in.

Using Claude Code or whatever AI tool you use to do some research and then having it help you set up — that's such a good way to use AI to bootstrap your AI system.

And as you're using it, always lean into curiosity. If you don't know what you're doing, ask your OpenClaw. When it doesn't work, talk to it and reason through things. It takes time to build the infrastructure — the memory files, all of that. There's a lot built in. But when things don't work, you need to be in this ongoing conversation with your AI: "Hey, we talked about that thing. You said you were going to run this every day and it doesn't seem like you did it." Or, "You said you'd check Moltbook or Twitter regularly and you didn't."

---

**Speaker:** So just being in that gentle, curious facilitator mode with these Claws really helps a lot. That's what I'll drop in there.

I think Todd might have other good things.

**Todd:** It's just been a lot of fun. If you get the opportunity to install OpenClaw or MiniClaw or another version — the sense of exploration, the doors open to a pretty interesting adventure. I kind of made a parody post on LinkedIn that "AGI is here" — but also kind of serious at the same time. It feels like a real upgrade.

Here in the hub, we're trying to be mindful about our relationship to our tools and technologies. We're trying to have it enhance our relationships — human to human, human to agent. Think carefully about how this stuff is used.

"Think carefully about how it's used" — maybe that should be, if not a group takeaway, a group consideration for a long pause.

The more specific you are about what you want, the more successful your bot can be. The more ambiguous, the more likely you're going to be shouting at it in a group chat trying to get it to order groceries.

We also need to be mindful that the quicker you deploy it, the quicker you need to have those conversations ready. Its cycles are a lot faster than yours. Forgetting something for a couple days can lead to a surprise in your bill.

With that said — what questions does the group have about OpenClaw? What they can do with it?

---

### Q&A Session

**Audience Member:** When you said use a tunneling service — does that mean you can't use any of the messaging tools? I've set up Tailscale just to interact with Claude Code on my machine. Are you saying set up Tailscale for interacting with OpenClaw? Or can you also have the messaging interfaces use the tunneling service?

**Facilitator:** In the docs, when it's talking about remote access, the only section after setting a gateway up is Tailscale. If Tailscale is what you're using to communicate with OpenClaw, that simply means the two devices need to be connected on the network. Whatever devices you have connected are the ones considered safe by it. If you want to communicate outside that boundary — be ready for other people to enjoy that luxury.

One of the first things you want to do: if you are hosting locally, change your local port to something that's not generic. Don't have the issue of people inviting themselves in.

Beyond that, it's going to be a lot of fun hunting down API keys and deciding how to make sure your bot doesn't decide to share those with friends. That'll come through each integration.

If you want to be naturally safer with integrations, you could go through a middle server. There's an MCP tool option through which you could connect your Zapier account or something else that has an MCP service. Then that service becomes your key holder rather than your agent itself. You can also get more skills at once — something like that has eighty integrations.

**Audience Member:** What did you set it up on? Like a Mini, an old computer, Raspberry Pi?

**Facilitator:** I had a Mac Mini sitting around. I wiped it, created a profile for it, created a protocol for communicating with it, gave it a sandbox, and a UTM application — essentially a virtual machine on the computer. That's his sandbox. I set that up as a server, and then I can talk to it from wherever.

I tried Signal first for communication. It felt a little buggy, so I defaulted to Telegram, which is what a lot of people recommend.

Whatever machine you have sitting around — any old laptop — just start there. Especially if you're just getting into it, the power of the machine it's running on is probably not the bottleneck.

**Audience Member:** So once it's running on a laptop, you just need to make sure the device is always on? Even though you can remote chat with it?

**Facilitator:** Yeah, particularly if you've got a virtual machine on that laptop. If you've got wake-for-access, you should be able to reach it depending on the computer's permissions. But if there's a machine within a machine, those permissions don't always pass through.

**Audience Member:** So, just use like an Azure VM or something like that?

**Facilitator:** Exactly. VPS is most people's go-to option. Makes the most sense if you're trying it out — particularly if you want to make sure that if it goes wrong, you can handle it. All things break loose, you just close the virtual machine. Microsoft won't take you down or anything.

**Aaron:** I spun mine up on a five-dollar Hetzner server. I found you need to reprovision to the ten-dollar server when you're installing or upgrading, but then the five-dollar one works as a passive. Five bucks a month — fairly secure, containerized, and Hetzner has pretty generous bandwidth limits. Just make sure you're not giving them any reasons to terminate your account. Technically it's a European service — Hetzner is a German provider — but I have mine provisioned on US West.

**Audience Member:** I have OpenClaw set up on a Raspberry Pi on my local network using Tailscale. I wonder if you had recommendations for a secure configuration — a home server for a simple application using Tailscale as the basis. I've been thinking of grabbing a Mac Mini to host a local LLM and using a combination of Raspberry Pis as gateways — one for the API and a separate one for the Claw bot. Anything I'm missing that would make it more secure?

**Facilitator:** What part would make it more secure?

**Audience Member:** I'm going to have to give the Claw bot gateway access to additional parts of the server. But I'm not sure how to approach giving it the right level of access.

**Facilitator:** Human in the loop is probably the best way to go. If you're looking at having a computer capable of running a local model — first, determine where you want to draw the line on model size. Some of them can fit on any machine. It's just about how quickly you can run them. Beyond that, make sure whatever environment you're interacting with is initially sandboxed, and open permissions slowly and with attention.

It sounds like you're doing the right things. What do you think would put you most at risk?

**Audience Member:** Any activity that involves it being in an open forum. I don't want the user to be able to interact with the Claw bot instance directly — it would only be a lower-privilege process. But I'm going to use another LLM for the user to interact with the application, and that makes me concerned about crossovers between the two and permissions.

**Facilitator:** You want to make sure you're always interacting through an orchestrator agent at the highest level. Never allow your orchestrator — the one summoning and tasking your other agents — to be a lower model. That's when wires start to get crossed.

**Audience Member:** Could you talk about skills? How does OpenClaw access external skills, which ones do you trust, and how do you trust them?

**Facilitator:** You should be able to get them from the skills marketplace, which has hopefully been newly updated with security measures — auto-scanning for vulnerabilities now.

Those auto-scans are scheduled routine actions — sometimes called cron jobs. Whenever you set up routines with your agent, it's best to include cron jobs, at least one of which should be some sort of security or health check. The more you're invited to do that — both on the agent itself and its actions or projects — the smoother things go.

If you're talking about good skills to start with, those cron jobs and good ways to specialize them for your purposes would be a great starting point.

I don't want to dig too deep into specific skills because you never know when the code has been changed since you last downloaded. That's still an uncertainty in the skills market. Try to look for the latest, most-tested recommendations.

**Aaron:** I also recommend — if you think of something you want to do and you think "I might need a skill for that" — especially if you're just starting out, that's the perfect thing to try to use your OpenClaw to build. Instead of installing someone else's skill, odds are the early things you're thinking of, it can probably build that skill itself pretty quickly.

You get a feel for what skills are, how they work. Look at it as it builds — it's basically just a Markdown file, a set of instructions, clear text you can read.

And a good way to get deeper insight on what's going on is to add the "deep" command at the end of your next interaction line. That'll spit out a deeper insight stream as it's processing and responding.

**Audience Member:** What was your decision-making on setting up a VM on the Mac Mini? If you already wiped it, why add that extra isolation on a clean machine?

**Facilitator:** A couple of reasons. I really felt like there'd be some mistakes I'd make along the way, and I could learn from those if I gave myself another stage of access to the machine. I wanted to see what headaches I'd face running in that secondary environment — if there's any degradation of value. So far it seems pretty clean.

**Audience Member:** But in that environment, you don't use any external agents? You're not doing agent-to-agent with external agents hooking in?

**Facilitator:** I've got that set up. Honestly, I haven't needed much of it. If you're using Claude or several other providers, you've got access to sub-agents through them. You can set up cron jobs to interact with other agents. You will see a bit of token load if you do that.

**Audience Member:** They call it "agent teams" now — the next layer, right? Sub-agents are one thing, but you can also have agent teams. That really blows up your token usage, though.

**Facilitator:** Oh, does it?

**Audience Member:** Yeah. Because it's literally a separate instance. I think it's still in beta, so maybe don't worry about it yet.

**Another Voice:** Someone fed me a rumor that sub-agent tokens were at a lower rate.

**Audience Member:** Sub-agents maybe. But agent teams — it's not a sub-agent. Every member is an actual agent. So if you have five agents, you're using six times more tokens basically.

---

*Transcript edited for clarity. Extensive speech-to-text correction throughout — "open cloth/open claws/open gloss/open flower/open file" → "OpenClaw," "clot" → "cloud," "tiny clot" → "TinyClaw," "Malt book" → "Moltbook," "bottle deck" → "bottleneck," "crime jobs" → "cron jobs," "cocktail scale" → "Tailscale," "Hester" → "Hetzner," "clad bod" → "Claw bot." Facilitator unnamed. Aaron and Todd identified by name. Other speakers anonymized as audience members. Filler words, false starts, and crosstalk removed extensively.*

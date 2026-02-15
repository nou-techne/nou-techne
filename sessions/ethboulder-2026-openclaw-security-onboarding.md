# ETHBoulder 2026: OpenClaw Security & Onboarding Best Practices

**Convergence:** ETHBoulder 2026 (Feb 13–16, Boulder, CO)
**Type:** Workshop / instructional talk
**Participants:** Workshop Facilitator (unnamed, OpenClaw practitioner), Aaron (OpenClaw user, bootstrapped via Claude Code)

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

*Transcript edited for clarity. Significant speech-to-text correction required throughout — "open cloth/open claws/open gloss" → "OpenClaw," "clot account" → "cloud account," "clotage" → "cloud-native," "tiny clot" → "TinyClaw," "nanoclaw" preserved, "Malt book" → "Moltbook." Speaker 1 unnamed (workshop facilitator, OpenClaw practitioner). Aaron identified by name when invited to speak. Filler words, false starts, and crosstalk removed.*

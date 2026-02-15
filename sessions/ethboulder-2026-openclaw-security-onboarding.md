# ETHBoulder 2026: OpenClaw Security & Onboarding Best Practices

**Convergence:** ETHBoulder 2026 (Feb 13–16, Boulder, CO)
**Type:** Workshop / instructional talk
**Participants:** Speaker (unnamed, OpenClaw practitioner)

---

## Review Summary

A single speaker delivers practical security and onboarding guidance for new OpenClaw users. The talk is structured as a security-first introduction, emphasizing that the agent ecosystem is fragile, and that trust must be earned incrementally — not assumed. The speaker uses the metaphor of a "robot child" to set expectations.

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

---

*Transcript edited for clarity. Significant speech-to-text correction required — original contained numerous filler words, false starts, and misrecognitions ("open cloth" → "OpenClaw," "clot account" → "cloud account," "EP test" → hosted environment). Speaker unnamed; identified as an experienced OpenClaw practitioner delivering workshop-style guidance.*

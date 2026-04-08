# The Work That Holds Everything Up
## Introducing the Technology and Information Office to the Techne Cooperative

---

*Technology*, from the Greek *techne* — craft, the knowledge embedded in the act of making. Not the tools. The competence that guides the hands that use them.

*Office*, from the Latin *officium* — a duty, an obligation freely undertaken. Not a room. A commitment to a set of responsibilities that someone has agreed to carry.

The Technology and Information Office is not a department. It is a set of roles, practices, and commitments that describe how Techne does its work — how we build things, how we keep them running, and how we account for both. This document introduces what it is, why we have it, and where it is going.

---

## Why This Exists

Every project is actually two projects stacked on top of each other.

The first is the project of making something. This is the part that gets attention, energy, and most of the funding. There is a launch. People celebrate. The project feels alive.

The second is the project of keeping it running once it exists. This part gets almost no attention, rarely appears in budgets, and tends to be done by whoever notices that something is falling apart. There is no launch. There is no celebration. If it goes well, no one notices. If it goes badly, everyone notices at once.

Most projects fail not from sudden catastrophe but from accumulated neglect of the second project. The ones that last are the ones where someone, somewhere, was quietly tending things the whole time. Stewart Brand calls this the unseen work. Making it seen — budgeted, credited, and valued — is what the Technology and Information Office is for.

---

## What It Does

The TIO is the coordination structure for Techne's technical and information work. It describes:

- Who is responsible for what (roles and accountability)
- How work flows between people and across systems (process)
- How decisions get made, escalated, and documented (governance)
- How systems are built, maintained, and eventually retired (lifecycle)

At present the TIO defines fifteen roles — from the engineers who build and maintain systems, to the economic and legal advisors who ensure what we build is compliant and sustainable, to the stewards who coordinate across all of it. Every sprint, every system, every deployed piece of infrastructure is mapped to someone who is accountable for it.

This is not bureaucracy. It is honest accounting. Every system has costs — in time, in attention, in the cognitive load of the person who has to remember how it works. The TIO makes those costs visible and assigns them deliberately, rather than letting them accumulate invisibly until they become a crisis.

---

## What Is Changing: Two Governing Principles

TIO 2.0 adds two principles that were missing from the original structure.

**The first: all work requires human-readable documentation.**

Every artifact produced at Techne — a line of code, an infrastructure change, a weekly patch, a configuration update — must be accompanied by a paragraph a non-specialist could read six months from now and understand. Not a comment in a codebase. Not a commit hash. A sentence or two of plain language: what changed, why it changed, what to watch for.

This is the user's manual that Stewart Brand argues every system needs. The builder's manual explains how a thing was made. The user's manual — written by the people who actually use it, updated as they discover what the builder did not anticipate — is the one that usually goes missing, and is usually the more valuable of the two. TIO 2.0 requires both.

**The second: progressively modular design.**

Every system we build is anchored by one core module and extended through additional modules. The anchor is stable before any extension is attempted. The path from anchor to extension is documented before the extension is built. Extensions must not destabilize the anchor.

This is a constraint on how we work, not just on what we ship. It means a simpler base is always preferred over a feature-rich one. It means the system you are handed is one you can tend, not just use. It means the person who comes after the person who built something can understand it — because the structure was designed with that person in mind.

Together, these two principles center operations and maintainability over novelty and velocity. They are an answer to the question: what would it look like if we built things the way a careful sailor maintains a boat?

---

## Three Kinds of Maintenance

Not all maintenance is the same. Brand distinguishes three types, and they have very different costs.

**Preventative maintenance** is scheduled, small, and cheap. A thirty-minute weekly check on any system is almost always cheaper than a two-day scramble when it finally breaks the week before something important. Every module in a TIO 2.0 system has a named maintainer and a regular check on the calendar. This is the whole game.

**Deferred maintenance** is what happens when preventative work is skipped. It is not free — it is debt. The honest thing to do is write it down so you remember you owe it. An unwritten deferral looks identical to a plan, and confusing the two is how projects drown slowly while everyone insists things are fine. TIO 2.0 requires a deferred maintenance ledger visible to the whole cooperative, on the same dashboard as our financial obligations.

**Emergency maintenance** is the most expensive and least dignified version. It is also, for some reason, the only kind that tends to get celebrated — because it looks like heroism. If you find yourself doing a lot of it, that is a signal that your sustainment plan is not working, not a signal that you need better heroes. The goal is to make emergencies rare enough that they feel like news.

---

## Seven Commitments

TIO 2.0 asks the cooperative to hold seven commitments, in plain language.

**Plan for keeping it going, not just for launching it.** Before shipping anything new, be able to answer three questions: Who will tend this? How often? What does that tending cost? If you cannot answer those questions, you are ready to start — not to launch.

**Tend in small doses, often.** Thirty minutes a week on any system outperforms two days of scramble when it breaks. If you find yourself being heroic, you probably skipped being careful earlier.

**Add less. Remove more.** Every new tool, integration, feature, or meeting is free to add and expensive to maintain. The honest way to adopt something new is to name what you are putting down in exchange. A smaller kit is a more durable kit.

**Separate the slow things from the fast things.** Core purpose, foundational data models, and governance commitments change rarely and should be protected accordingly. Dashboard layouts, copy, and cron schedules change often and should be lightweight. Fast changes to slow things break trust. Slow changes to fast things waste energy.

**Write two manuals.** Every system needs a builder's manual (how it was made and why) and a user's manual (how it is actually used, maintained by the people using it). The second is usually missing and usually more valuable.

**Tell people the goal, not the steps.** Document why a system exists and what it must never do. Trust the people tending it to make good local decisions. Shared intent is not brittle. Rigid procedures are.

**Recognize maintenance as real work.** Make it visible in budgets, in credits, in whatever form of recognition the cooperative uses. When someone keeps a system running so that others can rely on it, credit them for it. If the people doing the unseen work stay unseen, they will eventually stop, and you will find out the hard way what they were holding up.

---

## What This Means for Members

Every member of the cooperative interacts with systems that the TIO maintains. The co-op.us platform. The Workshop coordination protocol. The patronage accounting engine. The formation documents. The legal infrastructure.

TIO 2.0 asks that we think about those systems differently — not as things that exist and occasionally need fixing, but as living systems that require ongoing tending, that have people accountable for them, and whose maintenance costs are real and should be credited.

In practice this means a few things will become visible that were previously invisible. The deferred maintenance ledger will show what we know we owe. The maintainer list will name who is tending what. The documentation requirement will ensure that the work is legible — that the person who joins the cooperative next year can understand what exists and why.

None of this needs to become a framework before it becomes a habit.

---

## Where to Start

Stewart Brand suggests picking one thing you already have — a repository, a document, a tool, a relationship — and trying this on it. Write its two manuals, one page each. Name the person who tends it. Put thirty minutes on the calendar for its first preventative check. See how it feels to care for one small boat deliberately before committing the whole fleet.

That is the first sprint.

---

*Introduced April 2026. Prior TIO roles and RACI: github.com/nou-techne/tio. Workcraft prior expression: github.com/Roots-Trust-LCA/workcraft. Workshop roadmap item: R10.*

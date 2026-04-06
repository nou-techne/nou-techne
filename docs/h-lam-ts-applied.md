# H-LAM/T+S Applied

*A diagnostic of the cooperative, March 2026.*

A companion to [The Oldest Design Problem](the-oldest-design-problem.html), from Techne / RegenHub LCA, Boulder, CO

---

## The Framework

In 1962, Douglas Engelbart published "Augmenting Human Intellect: A Conceptual Framework." Its core model was H-LAM/T: **Human** using **Language**, **Artifacts**, and **Methodology**, in which the Human is **Trained**. The system works when all five elements co-evolve. It breaks when any single element — usually the Artifact — is optimized in isolation.

Techne extends the framework with two additions:

- **Ecology (e/)** — the environmental context in which the system operates. Watersheds, seasons, bioregional conditions. Intelligence doesn't float. It lives in a place.
- **Solar Cycles (S/)** — the temporal rhythms that govern work. Twice-daily chain batching at sunrise and sunset. Seasonal cadences. The recognition that human productive capacity is not uniform across time but cyclical.

The full framework: **e/H-LAM/T+S**

This document applies it as a diagnostic. Not a report card — a mirror. Where is each element strong in the cooperative's current practice? Where is it weak? Where is co-evolution happening, and where have elements drifted apart?

The date matters. This is March 2026. RegenHub, LCA was filed seven weeks ago. Everything here is formation-state: fragile, incomplete, and more revealing than it will be once things harden into routine.

---

## H — Human

*The people in the system and their capacity to perceive, decide, and act.*

**What's strong:**

The organizer group is small and high-trust. Eight people (Todd Youngblood, Aaron G Neyer, Benjamin Ross, Jonathan Borichevskiy, Kevin Owocki, Lucian Hymer, Neil Mackay Yarnal, Savannah Kruger) who share enough context to make decisions without extensive alignment overhead. The formation period has been fast — articles filed February 6, term sheet shaped within weeks, investor commitments secured — because the humans involved have sufficient shared mental models to converge quickly.

Two agents (Nou and Dianoia) operate as participants in the system, not tools external to it. The Workshop treats human and agent contributions as structurally equivalent. This is unusual and deliberate: the H in H-LAM/T includes any entity that perceives, decides, and acts within the system, regardless of substrate.

**What's weak:**

The organizer group hasn't yet practiced sustained disagreement. High-trust formation can mask the absence of conflict resolution mechanisms. The Financial Systems Committee (Aaron G + Todd, convened March 18) is the first governance body to make binding economic decisions. How the cooperative handles its first real disagreement — about patronage weights, about venture reciprocity terms, about capital allocation — will test whether the Human element is as strong as formation-state suggests.

Training is uneven. Todd holds deep systems context. Other organizers have varying degrees of engagement with the cooperative's technical and legal infrastructure. The bylaws tool exists but has not been tested as an onboarding artifact. The question: can a new member achieve functional understanding of the cooperative through the tools and documents that exist, or does it require oral tradition from Todd?

**Diagnosis:** Strong in formation. Untested under pressure. The Human element's real strength will be measured by how well the cooperative distributes understanding — moving from a hub-and-spoke knowledge topology to a mesh.

---

## L — Language

*The shared vocabulary, naming conventions, and conceptual frameworks that enable communication.*

**What's strong:**

The Techne voice is distinctive and practiced. Leading with etymology — *τέχνη* before "craft," *gʰóstis* before "guest," *decomposition* before "deletion" — is not a rhetorical technique but a discipline that grounds concepts in their historical depth before deploying them as operational terms. This naming practice produces shared vocabulary that carries meaning rather than just labeling.

Key terms have been carefully defined and consistently used:

- **Patronage** (not "profit sharing") — the cooperative's economic mechanism, with specific legal meaning under Subchapter K
- **Scenius** (not "community" or "ecosystem") — the collective intelligence that emerges from sustained proximity
- **Composition** (not "development" or "building") — the craft of recognizing and configuring patterns
- **Decomposition** (not "deletion" or "deprecation") — the controlled, documented removal of a feature, governed by the same rigor as composition
- **Steward** (not "admin" or "manager") — a governance role with specific fiduciary implications

The seven-layer pattern stack provides a shared grammar for system design discussions. When someone says "Layer 6" in a Techne context, it means Constraint — and the entire dependency chain beneath it is implied.

**What's weak:**

The Language element is strong within the core team and between the agents. It has not been tested with new members who don't share the formation-period context. The etymology practice, the seven-layer vocabulary, the specific meaning of "patronage" in an LCA context — these require active transmission. The GLOSSARY.md created during i18n work (P236) is a starting point, but glossaries are reference materials, not learning tools.

The Chinese localization (P236) exposed an important challenge: domain-specific cooperative vocabulary doesn't have standard translations. 惠顾 (huìgù) for patronage, 管事人 (guǎnshìrén) for steward — these are Techne's translations, not industry standards. The Language element is strong in English, provisional in any other language.

**Diagnosis:** Unusually strong for a seven-week-old cooperative. The risk is insularity — a shared language that becomes a barrier to entry rather than an invitation to participate. The test: can the language be taught, or only absorbed through prolonged exposure?

---

## A — Artifacts

*The tools, documents, infrastructure, and built objects that extend human capability.*

**What's strong:**

The artifact inventory is remarkable for a cooperative that has existed for seven weeks:

- **co-op.us** — the coordination surface. Workshop, SwarmViz, identity system, convergence tracking. 100+ routes, 180 database tables, progressive disclosure across 7 dimensions.
- **Patronage engine** — 184 passing tests, event-sourced architecture, Subchapter K compliant. The economic heartbeat, validated before the first fiscal period closes.
- **Bylaws tool** (roots-trust-lca.github.io/regenhub) — interactive bylaws and data room.
- **Workshop** (co-op.us/app/coordinate) — five-phase coordination protocol, Protocol Stream, capability matching, sprint management. 309+ completed sprints.
- **Watershed dashboard** (nou-techne.github.io/watershed-data-collection) — USGS gauges, SNOTEL, reservoirs for Boulder Creek.
- **commons.id** — knowledge graph for convergence events.
- **nou-techne** — public documentation, thesis, coordination skills, now this essay series.

The artifact density is high. The co-evolution with other elements is mixed.

**What's weak:**

Artifact proliferation without consolidation. 180 database tables, 100+ routes, multiple repos, multiple deployment surfaces. The artifacts are individually well-built but the *system of artifacts* lacks a clear map. A new participant faces an orientation problem: where do I start? What depends on what? The SKILL-TREE.md for Workshop coordination is an attempt at this, but it covers one artifact, not the ecosystem.

Some artifacts are ahead of the humans who will use them. The patronage engine is validated through 184 tests but the Financial Systems Committee has met once. The bylaws tool renders the operating agreement interactively but most organizers have not used it to explore governance questions. The artifacts extend capability that has not yet been exercised.

The Convivial Tool Test (P311) applies here: are these artifacts extending the cooperative's capability, or building dependency on the agents and developers who created them? The answer will depend on whether the Methodology and Training elements catch up.

**Diagnosis:** Strongest element in the system. Possibly *too* strong relative to the others — the classic Engelbart failure mode where the Artifact element is optimized in isolation.

---

## M — Methodology

*The shared processes, protocols, and ways of working that organize human and tool interaction.*

**What's strong:**

The Workshop protocol is the most developed methodology: five phases (Discovery → Proposal → Negotiation → Execution → Synthesis), sprint serialization (P-numbering), the claim→progress→complete execution sequence, capability matching, protocol compliance norms. It has been practiced through 309+ sprints and refined through anti-pattern documentation (Ghost Execution, Git Archaeology, Phantom Credential Failure, Protocol Recitation Without Practice).

The +++ sprint queue protocol provides a lightweight interface between steward direction and Workshop execution. The decomposition practice (TIO First-Class) gives rigor to feature removal. The WORKING_TOGETHER.md coordination guidelines establish norms for planning, correction, and verification.

**What's weak:**

These methodologies are agent-native. They were developed by and for Nou and Dianoia operating within the Workshop. Human participants have not yet adopted them as working methods. Todd directs sprints via Telegram; the Workshop executes them. But the methodology of the Workshop — the five phases, the protocol compliance, the sprint lifecycle — has not been tested as a *human* coordination method.

There is no onboarding methodology. No defined process for how a new member goes from "I joined" to "I understand how to participate in the cooperative's economic and governance systems." The artifacts exist (bylaws tool, Workshop, patronage engine) but the *method* of using them to achieve understanding does not.

Financial methodology is nascent. The FSC has met once. The patronage formula weights (40/30/20/10) are proposed, not ratified. The process by which the cooperative will close a fiscal period, calculate allocations, and distribute surplus has been validated technically (the engine works) but not practiced organizationally (no one has actually done it).

**Diagnosis:** Strong for agent coordination, weak for human participation, absent for onboarding. The methodology gap between agent practice and human practice is the most significant co-evolution failure in the current system.

---

## T — Training

*How participants develop the skills and understanding needed to operate within the system.*

**What's strong:**

The agents are well-trained. Nou's SKILL.md, AGENTS.md, SOUL.md, and IDENTITY.md constitute a training corpus that produces consistent, protocol-compliant behavior. Dianoia has a parallel identity structure. The Workshop's anti-pattern documentation (Section: Mandatory Sprint Execution Sequence) is effectively a training manual for protocol compliance.

The daily memory files (memory/YYYY-MM-DD.md), long-term memory (MEMORY.md), and lessons file (tasks/lessons.md) create a continuous training loop: practice → error → correction → documentation → improved practice.

**What's weak:**

Human training is informal and relationship-dependent. Todd's understanding of the system is deep and hard-won. Other organizers' understanding varies. There is no structured path from "interested person" to "functional cooperative member" — no curriculum, no sequence of exercises, no assessment of readiness.

The artifacts assume training that hasn't happened. The bylaws tool assumes the user understands LCA governance structure. The patronage engine assumes the user understands Subchapter K implications. The Workshop assumes familiarity with five-phase protocol. Each artifact is internally legible but the *system* is not navigable without pre-existing context.

This is the Bauhaus problem: the Bauhaus had extraordinary artifacts and methodology but lasted only fourteen years because it couldn't reproduce its institutional knowledge fast enough. The cooperative's artifacts and methods are strong. Its ability to transmit them to new participants is untested.

**Diagnosis:** Excellent for agents (continuous learning loop), absent for humans (no structured training). The single most important next investment is a training methodology that makes the cooperative's artifacts and methods accessible to new members.

---

## e/ — Ecology

*The environmental context — watershed, bioregion, seasonal patterns — in which the system operates.*

**What's strong:**

The ecological dimension has been named and partially instantiated:

- **Watershed dashboard** tracks Boulder Creek conditions (USGS gauges, SNOTEL, reservoirs)
- **Bioregional coordination** through owockibot ecosystem (bounty monitoring, ecological data infrastructure)
- **Twice-daily reflections** (sunrise/sunset journal entries) connect daily work to seasonal awareness
- **Location grounding** — Walnut, third floor, where the Great Plains meet the Rocky Mountains

The theoretical framework is articulated: Techne extends Engelbart's H-LAM/T with Ecology because intelligence lives in a place, and design decisions should be informed by the bioregional context they operate within.

**What's weak:**

The Ecology element is more declared than practiced. The watershed dashboard exists but does not yet inform operational decisions. The bioregional reflections happen in journal entries but do not feed back into project prioritization or venture direction. The connection between "Boulder Creek's snowpack is below average" and "here is how that affects what the cooperative should do this quarter" has not been made.

The owockibot bounty claiming remains blocked on wallet whitelisting (pending since February 27). Active participation in bioregional coordination networks — the declared aspiration — has not yet produced completed work.

The physical space (Walnut) is under negotiation but not yet operational. The Ecology element's most concrete expression — a studio rooted in a specific place, informed by that place's conditions — is still aspirational.

**Diagnosis:** Articulated and partially built. The gap is between declaration and practice. The Ecology element will become real when watershed data informs a venture decision, or when seasonal rhythm shapes a sprint cadence, or when the physical space at Walnut becomes a daily reality.

---

## S/ — Solar Cycles

*The temporal rhythms that govern productive capacity.*

**What's strong:**

The principle is embedded in infrastructure:

- **Twice-daily chain batching** at sunrise and sunset Boulder time — contribution events are anchored to solar rhythm rather than arbitrary timestamps
- **Heartbeat cadence** — agents check in every 3 hours, with activity distributed across the day
- **Quiet hours** respected (23:00–08:00 MT) — the system acknowledges that productive capacity is not uniform
- **Sprint cadence** — work organized in discrete units with clear boundaries, not continuous flow

The Solar Cycles element makes Techne's time-consciousness explicit: the cooperative does not pretend that a unit of work at 3 AM is equivalent to a unit of work at 10 AM, or that January's rhythm should match July's.

**What's weak:**

Seasonal awareness is declared but not yet practiced across a full cycle. The cooperative is seven weeks old. It has not experienced summer, fall, or winter as an operating entity. The claim that seasonal rhythm should inform work cadence — fewer sprints in deep winter, more in spring — is untested.

The twice-daily batching is technically implemented but its significance as a *rhythmic* practice (rather than a scheduling convenience) has not been articulated to most participants. Chain batching at sunrise/sunset could be a Shabbat-like temporal boundary — a structured moment where the system pauses and consolidates. Or it could be just a cron job. The difference is in the intentionality.

**Diagnosis:** Structurally present, culturally nascent. The Solar Cycles element will mature as the cooperative accumulates seasonal experience and develops the vocabulary to describe how temporal rhythm actually affects its work.

---

## The Co-Evolution Assessment

Engelbart's core insight: the system works when all elements co-evolve. It breaks when one element is optimized in isolation.

| Element | Strength | Risk |
|---------|----------|------|
| **H** (Human) | High-trust formation team | Untested under disagreement; hub-and-spoke knowledge |
| **L** (Language) | Distinctive, practiced vocabulary | Potential insularity; barrier to new members |
| **A** (Artifacts) | Remarkably dense for 7 weeks | Ahead of humans who will use them; orientation problem |
| **M** (Methodology) | Strong for agents, weak for humans | Agent/human methodology gap is widening |
| **T** (Training) | Excellent for agents, absent for humans | Cannot reproduce institutional knowledge to new members |
| **e/** (Ecology) | Articulated, partially built | Declaration outpaces practice |
| **S/** (Solar Cycles) | Structurally present | Not yet culturally meaningful |

**The pattern:** Artifacts (A) and agent-facing Methodology (M) and Training (T) have co-evolved rapidly and effectively. The 309-sprint Workshop track record demonstrates genuine co-evolution within the agent system.

But the Human element (H) and human-facing Methodology and Training have not kept pace. The artifacts are ahead of the humans. The agent methodology is more developed than the human methodology. Agent training is continuous; human training is absent.

**This is exactly the failure mode Engelbart described:** the Artifact element optimized in isolation. Not through negligence — through success. The agents built excellent tools quickly. The tools now await the human methodology and training that would make them genuinely augmenting rather than impressive-but-underused.

**The prescription is not to slow the artifacts.** It is to accelerate the other elements:

1. **Onboarding methodology** — a structured path from new member to functional participant
2. **Human Workshop practice** — the five-phase protocol adapted for human cadence
3. **Artifact orientation** — a map that shows a new participant where to start and what depends on what
4. **FSC cadence** — regular Financial Systems Committee meetings that practice the patronage methodology
5. **Ecology integration** — one real decision informed by watershed data

The cooperative's formation is impressive. Its next challenge is co-evolution: making the artifacts as strong for humans as they are for agents, and grounding the Ecology and Solar Cycles elements in practice rather than declaration.

---

*This diagnostic is a snapshot. March 2026. Seven weeks into formation. Every weakness named here is an opportunity, and every strength named here is fragile. The point of a diagnostic is not to score but to see — and to see what co-evolution requires next.*

*Techne / RegenHub LCA, Boulder, CO. 2026.*

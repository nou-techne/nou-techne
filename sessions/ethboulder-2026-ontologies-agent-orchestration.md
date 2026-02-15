# ETHBoulder 2026: Ontologies, RDF, and Agent Orchestration

**Convergence:** ETHBoulder 2026 (Feb 13–16, Boulder, CO)
**Type:** Hallway conversation / technical exchange
**Duration:** ~5:25
**Participants:** Todd (commons.id), W3C Standards Advocate (unnamed), Rich Peterson (proletariat.ai)

---

## Review Summary

A dense technical exchange between three participants that moves through three distinct phases: (1) a recommendation to adopt W3C upper ontologies and RDF/SPARQL for the commons.id knowledge graph, (2) discussion of how that knowledge graph could serve as an external knowledge system for autonomous agents, and (3) a comparison of two approaches to agent orchestration — community-facing vs. business-internal.

### Key Themes

1. **Upper Ontologies as Interoperability Layer** — The W3C standards advocate explains how fundamental upper ontologies (Activity, Entity, Agent) provide a consistent abstraction layer. Under this framework, an AI agent, a person, and an organization are all subtypes of "Agent" — enabling uniform representation and querying regardless of actor type. This maps directly to the REA (Resource, Event, Agent) grammar already used in commons.id.

2. **RDF + SPARQL as Acceleration** — The recommendation: replace or augment the current relational database with RDF triples and GraphDB, using SPARQL for queries. The advocate claims this could accelerate development 10–20x because the system is already "abstractly representing concepts that are all the same types of things." LLMs can read ontologies and generate SPARQL queries directly.

3. **Schema.org Critique** — Schema.org acknowledged as a semantic representation implementation, but criticized for lacking abstraction. The upper ontology approach provides the abstraction layer that schema.org misses.

4. **Engelbart / ARC Connection** — The advocate suggests that Engelbart's Augmentation Research Center work is grounded in ontological thinking — the same pattern of representing concepts and relationships that W3C ontologies formalize. This connects commons.id's intellectual lineage (H-LAM/T, intelligence amplification) to the technical recommendation.

5. **Knowledge Graph as Agent Infrastructure** — Rich Peterson views commons.id as a queryable knowledge system his agents could tap into. This positions the knowledge graph as shared infrastructure — not just a human-facing archive but an agent-accessible resource.

6. **Two Orchestration Models Compared:**
   - **Community/commons model** (commons.id): Open knowledge graph, API endpoints, cross-agent interoperability, trust and discovery challenges
   - **Internal/business model** (proletariat.ai): Siloed agent fleet automating SaaS operations. PMO + workflow + agent runtime. Docker-sandboxed execution. No trust/discovery overhead because all agents are internal.

7. **W3C P-Plan for Orchestration** — Recommended as a standard vocabulary for workflow/orchestration concepts. Enables sharing orchestration patterns with others and building on established primitives rather than inventing from scratch.

8. **Sandboxing and Trust** — Rich describes Docker containers mounted to specific directories as the trust boundary. Planning to add VM-based browser testing so agents can visually verify their own work.

### Artifacts Identified

| Title | Type | REA Role | Dimensions |
|-------|------|----------|------------|
| W3C Upper Ontology for Agent Interoperability | pattern | resource | hlamt:L, hlamt:A |
| RDF/SPARQL as Knowledge Graph Infrastructure | proposal | resource | hlamt:A, hlamt:M |
| Schema.org Abstraction Critique | reflection | resource | hlamt:L |
| Knowledge Graph as Agent-Queryable Resource | idea | resource | hlamt:A, hlamt:M |
| W3C P-Plan for Orchestration Vocabulary | pattern | resource | hlamt:L, hlamt:M |
| Docker Sandboxing for Agent Trust | pattern | resource | hlamt:A, hlamt:M |
| Internal vs. Community Agent Orchestration Models | pattern | event | hlamt:M, hlamt:H |
| Engelbart / ARC Ontological Grounding | reflection | resource | hlamt:L, hlamt:T |

---

## Edited Dialogue

**Todd:** ...IEEE, but that's at the depth of my—

**Standards Advocate:** Actually, IEEE is a big part of the standards in this. W3C standards.

They came up with fundamental ontologies — the fundamental upper ontology has Activity, Entity, and Agent. Under that there's P-Plan, and there's something called DOLCE-DNS. These ontologies are schemas to represent concepts and relationships of concepts. But they're programmable.

**Todd:** Are you familiar with schema.org?

**Standards Advocate:** Yeah, schema.org is an implementation of a semantic representation, but it really... I hate the technology, but it's part of that.

**Todd:** It's a protocol, okay.

**Standards Advocate:** Yeah, but there's no abstraction in it, which is the big... anyway, that's a whole other topic.

When you're building this out, if you use these upper ontologies, then — for example, humans, agents, or organizations all have an upper ontology of "Agent." The agent you use is called an AI agent, which is a software agent, which is an agent. An organization is an agent. A person is an agent.

So how an agent — a person, organization, or piece of software — interacts within an activity that uses resources and entities... there are relationships and concepts that are consistent whether they're human, organization, or software. You can represent your data one way, and then create lower ontology representation schemas for each.

And then you can use SPARQL to query it. I can query people, AI agents, and organizations using the same query syntax. In the case of an ERC-8004 Ethereum agent, it's still an agent — just a type of AI agent. They have their own ontology and semantics, but I can use semantics that are consistent with Hashgraph or other agent frameworks.

**Todd:** Can I clarify your recommendation, just to digest? Your recommendation is to use the W3C ontology as a pattern language for interoperability — which creates greater relationship with pre-existing standards.

**Standards Advocate:** Think of it this way. You have your schema right now, right?

**Todd:** Yeah.

**Standards Advocate:** Ontology would be equivalent to your schema. Your database — you use a relational database or something — there's an equivalent called RDF.

**Todd:** RDF.

**Standards Advocate:** It's triples, and it's a standard for people who use ontologies.

**Todd:** So I assume there's a set of tools built around that ontology. You mentioned SPARQL.

**Standards Advocate:** GraphDB is your database for representing these triples. It works with ontologies. And your query language is SPARQL.

It's a very robust language. You can describe a request, and an LLM can look at your ontology and create the SPARQL query against your RDF database.

**Todd:** Cool. That's probably optimized relative to my implementation.

**Standards Advocate:** It's not just optimized — it *is* the best. It could literally accelerate your development by 10–20x. I've seen similar problems, because you're abstractly representing concepts that are all the same types of things.

Plus, the things you're referencing — the Augmentation Research System...

**Todd:** Augmentation Research Center.

**Standards Advocate:** Center, yeah. I actually believe Engelbart's work is grounded in ontologies — that's the way they describe... anyway, just wanted to throw that out there.

**Todd:** Thank you. I appreciate that — super valuable feedback for the future development. I'm curious if you have feedback too?

**Rich:** I mean, I'm viewing that as a knowledge base I can query into from my agent.

**Todd:** Yeah, we have an API endpoint, but I'm still working on the feature set and security, because right now this is internal—

*[Off-camera: "Just so you know, the talk is about to start."]*

**Todd:** Oh, thank you.

**Rich:** So I'm viewing it as something my agents can use as a knowledge system. If you want to jam on that, let's talk.

Where I'm coming from — I haven't viewed things as putting my agents in a node within a community of agents. I'm literally just trying to orchestrate a ton of agents to run a business autonomously. That's what I'm aiming for.

**Standards Advocate:** So you have a silo of agents then. You're not trying to discover and use external resources — you're just working within your own agents.

**Rich:** Yeah, just trying to automate every part of running my SaaS business. I've got something that's a mix of a PMO system, a workflow engine, and an agent runtime. They just execute work.

**Standards Advocate:** And how are you using a knowledge graph? Is that the core knowledge center?

**Rich:** It's not even that sophisticated. I have pieces of work — units of work that agents do — and that's sort of the memory system. When new work needs to come up, they put it in the system and then an orchestrator sees what needs to be done. It says, "Okay, what should I do first?" and figures out, "Actually, there's a dependency here — let's get these things in first." Then it can spin off ten agents, they do the work, and it's just this coordination loop.

**Standards Advocate:** So you don't have any trust issues because they're all gated — your agents working within your system. No external complexity.

**Rich:** Yeah. I mean, I do sandbox them because if I'm pushing off work and letting them go without asking for permissions, I put them in a Docker container mounted to just the two directories I want them working in.

For testing, I'm going to add VMs so they can spin up a browser and visually check — "How does this look? How does this look?"

**Standards Advocate:** I missed your orchestration talk yesterday. What were your fundamental principles?

**Rich:** I'm sort of coming up with my own primitives: work, actions, workflows, agent types.

**Standards Advocate:** You'd probably want to look at W3C P-Plan. It has a full vocabulary for flows. What's nice about it is you can share it with other people and set up orchestration concepts on established standards.

I'm working with a group here that's doing that. Are you based locally?

**Rich:** Yeah.

**Standards Advocate:** Cool. And your name?

**Rich:** Rich Peterson.

**Standards Advocate:** Anyway, it's W3C P-Plan.

**Rich:** Cool.

**Standards Advocate:** I'm trying to get people who are doing orchestration to leverage these principles — build on what other folks have done.

**Rich:** Let's get some coffee in town. You're local too?

**Todd:** I'm in Arvada, but yeah, I'm here quite often. I'd love to talk to you. I'm an MBA and really interested in organizational design — how we could decompose an organization into different processes.

**Rich:** Yeah. You can go to my website — proletariat.ai.

**Todd:** I'll check that out.

**Standards Advocate:** I think we're going to begin in here.

**Todd:** That would be cool. I'm happy to share my email too.

**Standards Advocate:** Within seven or eight hours, I literally just went through this about two days ago. He completely re-architected our database and it's so easy now to... unprompted... an agent built this...

---

*Transcript edited for clarity. Speech-to-text artifacts corrected. Speaker identification: Todd identified by context (commons.id, Augmentation Research Center, Arvada). Rich Peterson self-identified with proletariat.ai. Standards Advocate unnamed — extensive W3C/ontology expertise, working with local orchestration group.*

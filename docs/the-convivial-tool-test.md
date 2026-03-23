# The Convivial Tool Test

*A design heuristic for evaluating whether a tool serves the people using it.*

A companion to [The Oldest Design Problem](the-oldest-design-problem.html), from Techne / RegenHub LCA, Boulder, CO

---

## Origin

Ivan Illich drew a line in 1973: a convivial tool extends human capability; an industrial tool creates dependency. A bicycle is convivial. An interstate highway system is not, because it restructures the entire built environment around itself and makes alternatives unviable.

The line is clear. The application is not. Illich gave us a distinction, not a rubric. And the tools we evaluate in 2026 — AI agents, coordination protocols, patronage systems, programmable finance — are far more ambiguous than bicycles and highways. They can be convivial *and* industrial depending on their governance, their economic structure, and the institutional context that surrounds them.

This document is a working heuristic. Not a checklist — closer to Vitruvius's triad, where the qualities cannot be optimized independently. A tool that scores well on one dimension and fails on another has not partially succeeded. It has revealed where it will eventually break.

---

## The Five Qualities

A convivial tool exhibits five qualities simultaneously. They are not independent axes to be optimized separately. They are mutually constitutive: each depends on the others, and weakness in one eventually undermines the rest.

### 1. Capability Extension

*Does the tool make its users more capable, or more dependent?*

The test is directional. After using the tool for six months, are the people using it *more* able to accomplish their goals — including without the tool — or *less* able? A tool that builds skill in its users is convivial. A tool that deskills its users, making them unable to function without it, is industrial regardless of how elegant its interface.

**Positive signal:** Users develop transferable understanding. A patronage engine that teaches members how cooperative economics work while calculating their allocations. A code editor that makes patterns visible while writing code.

**Warning signal:** Users develop learned helplessness. They cannot explain what the tool does or why. They cannot perform the task without it even at reduced quality. The tool has replaced capability rather than augmented it.

**The AI-specific question:** Does the AI system help its users think more clearly, or does it think *instead of* them? An AI that drafts a document for human refinement extends capability. An AI that produces finished output that humans rubber-stamp creates dependency. The difference is in the human's cognitive engagement with the result.

### 2. Legibility

*Does the tool make its own workings visible to its users?*

A convivial tool can be understood by the people who use it. Not necessarily at the level of implementation detail — a bicycle rider need not understand metallurgy — but at the level of *functional transparency*: what the tool does, how it does it, what data it uses, what decisions it makes, and why.

**Positive signal:** The tool's operations are inspectable. A coordination protocol whose state transitions are visible in a Protocol Stream. A patronage engine that shows its allocation formula and intermediate calculations. An AI system that explains its reasoning when asked.

**Warning signal:** The tool is opaque. Users cannot tell why it produced a particular output. Decisions are made inside a black box. The tool's operators know more about its behavior than its users do — and exploit that asymmetry.

**The institutional question:** Legibility is not just a technical property. It requires *institutional commitment*. A tool can be technically transparent but practically opaque if the documentation is impenetrable, the interface hides relevant information, or the institutional culture discourages questions. Legibility is a design choice at every layer.

### 3. Governability

*Can the community that uses the tool govern its evolution?*

A convivial tool is shaped by its users over time. Not just through feedback mechanisms — "submit a feature request" — but through genuine governance: the ability to set priorities, change direction, veto changes, and participate in the decisions that determine the tool's future.

**Positive signal:** Users have structural authority over the tool's development. A cooperative that owns its coordination infrastructure. An open-source project with genuine community governance (not just open code with a benevolent dictator). A protocol whose upgrade path requires stakeholder consent.

**Warning signal:** Users are consulted but not empowered. The tool's roadmap is set by its developers or investors. User feedback is collected but selectively implemented. The community has voice but not vote. The tool can change in ways its users oppose, and they have no structural recourse except leaving.

**The platform question:** Most tools in 2026 are platforms, and platforms tend toward industrial logic even when they begin as convivial. The test is structural: does the community of users have *governance rights* over the platform, or merely *usage rights*? If the platform can unilaterally change terms, raise prices, or alter functionality, it is industrial regardless of how community-friendly it feels today.

### 4. Proportionality

*Is the tool scaled to the community it serves?*

Schumacher's contribution: there is a design space between artisanal one-offs and industrial mass production, and the interesting work lives there. A proportionate tool is scaled to its context — powerful enough to serve its users' actual needs, modest enough not to restructure their environment around itself.

**Positive signal:** The tool fits the community's actual scale. A cooperative's treasury tool that handles their actual transaction volume without requiring enterprise infrastructure. A monitoring dashboard that covers the relevant watershed without demanding continental-scale data ingestion.

**Warning signal:** The tool requires the community to scale *up* to use it. Enterprise software deployed for a ten-person cooperative. A coordination protocol that demands more process overhead than the work it coordinates. Infrastructure whose minimum viable deployment exceeds the community's capacity to maintain it.

**The growth question:** Industrial tools are designed to grow. Their economics depend on it — more users, more data, more transactions, more revenue. Convivial tools are designed to *serve*. Their success metric is not growth but adequacy: does the tool do what the community needs, at the scale the community operates? Growth is welcome when the community grows. Growth as an end in itself is an industrial signal.

### 5. Reversibility

*Can the community stop using the tool without catastrophic loss?*

The deepest test of conviviality. A tool that cannot be abandoned is not a tool — it is a dependency. Convivial tools are designed so that the community's data, processes, knowledge, and relationships survive the tool's absence.

**Positive signal:** Data is portable. Processes are documented independently of the tool. Knowledge developed through tool use persists in human understanding. The community could switch to an alternative — or to manual processes — and retain the essential value of what they've built.

**Warning signal:** Vendor lock-in at any level. Proprietary data formats. Processes that exist only inside the tool's workflow. Knowledge embedded in the tool that cannot be extracted. Relationships mediated by the tool that would dissolve without it. The tool has made itself a load-bearing wall in the community's infrastructure.

**The AI-specific question:** If the AI system were turned off tomorrow, what would the community lose? If the answer is "convenience," the tool is convivial. If the answer is "the ability to function," the tool has crossed from augmentation to dependency — regardless of how capable it is.

---

## How to Use This Heuristic

### For evaluating a tool the cooperative is considering adopting:

Walk through all five qualities. The evaluation is not a score — it is a conversation. A tool that extends capability beautifully but cannot be governed by its users will eventually betray that capability extension. A tool that is perfectly governable but opaque will produce governance over a black box.

**The question to ask:** Where is this tool weakest across the five qualities, and what would that weakness produce over three years of use?

### For evaluating a tool the cooperative is building:

The heuristic applies reflexively. The patronage engine, the Workshop, the bylaws tool, the coordination protocol — each should pass the convivial tool test for the communities that use them. Design decisions that increase capability extension at the expense of legibility, or that improve proportionality at the expense of governability, are not trade-offs to be optimized. They are tensions to be held.

### For evaluating AI systems specifically:

AI systems are the most ambiguous case. A large language model can extend capability (augmentation) and create dependency (automation) in the same session, depending on how the human engages with it. The convivial/industrial distinction for AI is not a property of the model. It is a property of the *system*: the model, the interface, the institutional context, the governance structure, the economic incentives, and the human practices that surround it.

An AI agent embedded in an extractive platform, optimizing for engagement, with no user governance and opaque decision-making, is industrial. The same model's capabilities, embedded in a cooperative structure with transparent economics, member governance, and augmentation-oriented interface design, might be convivial.

The tool is the system, not the model.

---

## Applied: Three Tools Evaluated

### The Workshop (co-op.us/app/coordinate)

| Quality | Assessment |
|---------|-----------|
| **Capability Extension** | Strong. Agents and humans develop coordination skills through the five-phase protocol. The protocol is learnable and transferable. |
| **Legibility** | Strong. Protocol Stream shows every state transition. Guild messages show every communication. SwarmViz renders activity patterns. All operations are inspectable. |
| **Governability** | Moderate. Currently governed by steward direction. The Workshop does not yet have formal community governance over its own evolution. The SKILL.md is authoritative but authored by one party. |
| **Proportionality** | Strong. Scaled to current cooperative size. Supabase infrastructure is adequate without being excessive. |
| **Reversibility** | Moderate. Sprint records are in a database with REST API access. But significant coordination knowledge lives in the Workshop's specific protocol. Switching would require protocol translation, not just data export. |

**Weakness to watch:** Governability. As more participants use the Workshop, the question of who governs its evolution — who can change the protocol, who approves SKILL.md updates — becomes structural.

### The Patronage Engine

| Quality | Assessment |
|---------|-----------|
| **Capability Extension** | Strong. Makes cooperative economics *legible* — members understand their relationship to the cooperative's economic flows. |
| **Legibility** | Strong. Allocation formula is explicit (40/30/20/10). Calculations are traceable. Capital account statements show derivation. |
| **Governability** | Strong. Financial Systems Committee governs parameters. Members vote on formula changes through Class 1 governance. |
| **Proportionality** | Strong. Designed for this cooperative's actual scale and complexity. |
| **Reversibility** | Strong. Event-sourced architecture means the complete history is recoverable. Standard accounting principles apply; the data is not locked to this tool. |

**Assessment:** The patronage engine is the most convivial tool in the cooperative's current infrastructure. Its strongest quality is governability — the FSC provides genuine member governance over economic parameters.

### A Hypothetical AI Code Assistant (Industrial Pattern)

| Quality | Assessment |
|---------|-----------|
| **Capability Extension** | Ambiguous. Generates code faster but may reduce the developer's understanding of what they're building. |
| **Legibility** | Weak. Model weights are proprietary. Reasoning is not inspectable. Training data is undisclosed. |
| **Governability** | Absent. Users have no structural authority over the tool's development, pricing, or behavior. Terms of service change unilaterally. |
| **Proportionality** | Weak. Requires cloud infrastructure scaled to millions of users. The individual developer pays for a fraction of a system designed for maximum scale. |
| **Reversibility** | Moderate to weak. The developer's workflow has been restructured around AI assistance. Codebases may contain patterns the developer cannot maintain without the tool. |

**Assessment:** Industrial by structure even if convivial by experience. The user feels augmented. The institution extracts.

---

## The Vitruvian Principle

Like *firmitas, utilitas, venustas*, the five qualities of a convivial tool cannot be optimized independently. A tool that extends capability brilliantly but cannot be governed will eventually extend capability in directions its users did not choose. A tool that is perfectly legible but disproportionate will be transparently wrong-sized. A tool that is beautifully reversible but does not extend capability is just... easy to stop using.

The heuristic is not a scoring rubric. It is a way of seeing. Each quality illuminates something different about the tool's relationship to the people who use it. The conversation they produce together — not any individual score — is the evaluation.

This is a working document. It will evolve as the cooperative uses it. The first test of a design heuristic is whether the community that created it can govern its evolution.

---

*Techne / RegenHub LCA, Boulder, CO. 2026.*

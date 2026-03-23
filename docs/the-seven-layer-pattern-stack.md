# The Seven-Layer Pattern Stack

*The grammar is shared. The compositions are particular.*

A companion to [The Oldest Design Problem](the-oldest-design-problem.html), from Techne / RegenHub LCA, Boulder, CO

---

## I. The Claim

The Oldest Design Problem ends with a statement that functions more as assertion than argument: Techne's working thesis is that a seven-layer pattern stack — Identity, State, Relationship, Event, Flow, Constraint, View — constitutes a generative grammar that operates across domains. The same layers that structure a database schema also structure a cooperative agreement or a watershed monitoring system.

This essay is the proof. Or rather, the demonstration — because the claim is not that these seven layers are the *only* possible grammar, but that they are *a* grammar sufficient to compose systems across radically different domains, and that the act of composition reveals both the shared structure and the irreducibly particular context of each system.

Three domains. Seven layers each. The grammar will either hold or it won't.

## II. The Seven Layers

Before applying them, the layers themselves deserve precise definition. They are not arbitrary. They follow a dependency order: each layer depends on those beneath it. You cannot define State without Identity. You cannot define a Relationship without State to bind. Events require Relationships to act upon. Flows aggregate Events. Constraints govern Flows. Views render the whole visible.

**Layer 1 — Identity.** What exists. The named entities in the system — the things that can be pointed to, distinguished from one another, and persisted across time. In a database, these are tables with primary keys. In a cooperative, these are members, ventures, agreements. In a watershed, these are gauges, tributaries, snowpack stations. Identity answers: *what are the nouns?*

**Layer 2 — State.** What is true about what exists, right now. The current attributes, balances, statuses, and conditions of each identity. State is always temporal — it describes a snapshot. A member's capital account balance. A gauge's current streamflow reading. A venture's lifecycle stage. State answers: *what do we know about the nouns, at this moment?*

**Layer 3 — Relationship.** How identities relate to each other. Membership binds a person to a cooperative. Contribution connects a member to a venture. Confluence joins a tributary to a river. Relationships are not attributes of identities; they are first-class entities that connect identities and carry their own state. Relationship answers: *what are the connections, and what do they carry?*

**Layer 4 — Event.** What happened. A contribution recorded. A distribution calculated. A streamflow measurement taken. Events are immutable — once recorded, they become part of the system's history. They are the atoms of change: every state transition is the result of an event. Event answers: *what changed, when, and by whose action?*

**Layer 5 — Flow.** How events aggregate over time into patterns, trends, and cycles. Patronage allocation is a flow — it aggregates contribution events over a fiscal period and produces a distribution. Hydrological flow aggregates gauge readings into discharge patterns. Revenue flow aggregates transactions into fiscal reality. Flow answers: *what patterns emerge when events are viewed over time?*

**Layer 6 — Constraint.** What governs the flows. Legal requirements (Subchapter K compliance), governance rules (Class 1 voting only), ecological thresholds (minimum streamflow for aquatic health), technical limits (rate limiting on API calls). Constraints are the institutional logic — the rules that prevent the system from operating outside its intended boundaries. Constraint answers: *what must remain true regardless of what events occur?*

**Layer 7 — View.** How the system is rendered legible to its participants. A capital account statement. A watershed dashboard. A patronage allocation report. A coordinate page showing sprint status. Views do not change the underlying system — they make it visible. But visibility is not neutral: what you can see determines what you can govern. View answers: *who sees what, and how does seeing it enable action?*

## III. The Patronage Engine

RegenHub is a Colorado Limited Cooperative Association. Its members contribute labor, revenue, and capital. Its economic engine — the patronage system — must track those contributions, allocate surplus proportionally, and maintain capital accounts in compliance with Subchapter K of the Internal Revenue Code and IRC 704(b).

This is a real system. It has been validated through 184 passing tests (Sprint S25, March 2026). Here is how it decomposes.

**Identity.** Members. Ventures. The cooperative itself. Fiscal periods. Each member has a unique identifier and a membership class (Class 1 through Class 4, only Class 1 voting). Each venture has an owner and a relationship to the cooperative. A fiscal period defines the boundaries within which patronage is calculated.

**State.** Each member's capital account balance — the running total of their economic relationship with the cooperative. Each venture's current lifecycle stage (formation, operating, winding down). Each fiscal period's status (open, calculating, finalized). The state changes only through events.

**Relationship.** Member-to-cooperative (membership). Member-to-venture (contribution). Venture-to-cooperative (reciprocity — the 1% commitment). Investor-to-cooperative (capital contribution, non-voting). These relationships carry their own attributes: a membership has a class, a join date, an active/inactive status. A contribution relationship carries the type of contribution (labor, revenue, capital, community).

**Event.** A labor contribution recorded: who, to which venture, how many hours, what category. A revenue event: a venture generating income, attributed to the cooperative. A capital call: an investor committing funds. A distribution event: the patronage engine calculating allocations for a fiscal period. Each event is immutable. The ledger is append-only.

**Flow.** Patronage allocation — the central flow. Over a fiscal period, contribution events are aggregated according to the allocation formula: 40% labor, 30% revenue, 20% cash, 10% community (proposed weights, pending Financial Systems Committee finalization). The flow transforms raw events into proportional shares. It is the economic heartbeat of the cooperative — the mechanism that makes contribution legible as ownership.

**Constraint.** Subchapter K requires that allocations have "substantial economic effect" — they must reflect real economic consequences, not just tax optimization. IRC 704(b) governs how partnership income is allocated among partners. Colorado LCA statute imposes its own requirements on patronage distribution. Class 1 is the sole voting class. Distributions cannot exceed available surplus. These constraints are not optional features; they are the legal boundaries within which the entire flow must operate.

**View.** A member's capital account statement showing contributions, allocations, and current balance. A venture's patronage report showing how its revenue and labor translated into member allocations. A cooperative-wide dashboard showing aggregate flows, per-member distributions, and compliance status. The Financial Systems Committee's view of allocation parameters. The seven-layer pattern stack itself rendered as a legible diagram.

The grammar holds. But the *composition* is particular to this cooperative, this legal jurisdiction, this allocation formula, this moment in the cooperative's formation. Another cooperative using the same seven layers would produce a different system — different identities, different relationships, different constraints. The grammar is shared. The composition is not.

## IV. The Cooperative Operating Agreement

The operating agreement is the legal DNA of RegenHub. It defines membership, governance, economic rights, and dissolution procedures. It is not a database — it is a legal document. But the same seven layers structure it.

**Identity.** The cooperative. Its members (organized by class). Its board of directors. Its committees (Financial Systems Committee, others as formed). Its ventures. Its registered agent. The agreement names every entity that has legal standing within the cooperative's governance structure.

**State.** The cooperative's current membership roster and each member's class. The board's current composition. Committee assignments. The cooperative's registered address (1515 Walnut, Boulder, CO). The current fiscal year. Whether the cooperative is in good standing with the Colorado Secretary of State. The agreement defines what "current" means for each entity.

**Relationship.** Member-to-cooperative: governed by the Member Agreement, which specifies rights, obligations, and economic terms per class. Director-to-cooperative: fiduciary duty, term limits, election procedures. Committee-to-board: advisory or delegated authority. Venture-to-cooperative: the 1% reciprocity commitment, shared infrastructure access, autonomy within studio guidelines. Investor-to-cooperative: capital contribution terms, return mechanism (revenue share, not equity appreciation), non-voting status.

**Event.** A member joining (application, approval, execution of Member Agreement). A board vote. A committee recommendation. An annual meeting. A member withdrawal or expulsion. A venture formation or dissolution. An amendment to the operating agreement. Each event follows a defined procedure and produces a record.

**Flow.** Governance flow: proposals move through introduction, committee review, board discussion, member vote (for matters requiring member approval). Economic flow: venture revenue → cooperative share → patronage calculation → member distribution → capital account update. Formation flow: the sequence from organizer group to filed articles to executed operating agreement to first members.

**Constraint.** Colorado LCA statute (Title 7, Article 58). One member, one vote (within Class 1). Quorum requirements. Supermajority thresholds for amendments. Fiduciary duties of directors. Annual reporting requirements. Dissolution priority (debts first, then member capital accounts, then surplus according to patronage). The constraints are the legal architecture that makes the cooperative a cooperative rather than an LLC with cooperative branding.

**View.** The bylaws tool (roots-trust-lca.github.io/regenhub) renders the agreement as an interactive document. The data room provides investors with the financial and legal views they need. Board meeting minutes make governance events visible. The Workshop makes coordination visible to all participants. Each view serves a different audience with different needs — but all views derive from the same underlying seven-layer structure.

Here the composition differs from the patronage engine despite sharing the grammar. The patronage engine's Identity layer is dominated by economic entities (accounts, periods, transactions). The operating agreement's Identity layer is dominated by governance entities (members, directors, committees). The same layer — Identity — asks the same question (*what exists?*) but gets different answers because the domain is different.

## V. The Watershed Monitoring Schema

The Boulder Creek watershed drains from the Continental Divide through Boulder Canyon into the plains east of the Front Range. Monitoring it requires tracking snowpack, streamflow, reservoir levels, and precipitation across dozens of stations operated by multiple agencies (USGS, SNOTEL, Northern Water).

This is not a cooperative. It is not a legal entity. It is an ecological system. The seven layers still apply.

**Identity.** Stream gauges (USGS stations with 8-digit identifiers). SNOTEL sites (snowpack monitoring stations with names like Niwot Ridge, University Camp). Reservoirs (Barker, Gross, Boulder). Tributaries (North Boulder Creek, South Boulder Creek, Middle Boulder Creek). Confluence points where tributaries meet. The watershed boundary itself as a spatial identity.

**State.** Current streamflow at each gauge (cubic feet per second). Current snow water equivalent at each SNOTEL site (inches). Current reservoir storage (acre-feet, percent capacity). Current precipitation accumulation (water year to date versus historical average). These are the vital signs of the watershed, changing continuously.

**Relationship.** Tributary-to-mainstem (hydrological connectivity — what flows into what). Gauge-to-reach (which stream segment a gauge monitors). SNOTEL-to-subwatershed (which snowpack feeds which tributaries). Reservoir-to-system (storage relationship to downstream flows). Agency-to-station (who operates and maintains each monitoring point). These relationships define the physical and institutional structure of the monitoring network.

**Event.** A streamflow measurement (timestamp, gauge ID, value, quality flag). A snow survey (date, site, SWE, snow depth). A reservoir release decision. A flood warning issued. A gauge going offline. Each event is a datum — a fixed observation at a fixed time. The watershed's history is the aggregate of its events.

**Flow.** Hydrological flow — the actual movement of water through the system: snowmelt → tributary → mainstem → reservoir → release → downstream. Seasonal patterns: spring runoff peak, late summer low flow, monsoon pulse. Water year accumulation versus historical norms. Flow in this domain is not metaphorical. It is the thing itself — the movement of water through landscape over time.

**Constraint.** Minimum streamflow requirements for aquatic health (Colorado instream flow rights). Reservoir operating rules (flood control pool, conservation pool, minimum releases). Water rights priority system (prior appropriation doctrine — "first in time, first in right"). Endangered species requirements (Preble's meadow jumping mouse habitat flows). Agency data quality standards. These constraints are partly legal, partly ecological, partly institutional — but all serve the same function: they define what must remain true regardless of what events occur.

**View.** The watershed dashboard (nou-techne.github.io/watershed-data-collection) renders current conditions across all stations. A drought monitor view highlights departures from normal. A flood risk view shows where current flows approach bank-full. A water rights view shows which rights are satisfied and which are calling. Each view serves a different need — irrigator, ecologist, emergency manager, municipal planner — but all derive from the same seven-layer structure.

The watershed composition reveals something the other two don't: the seven layers are not *imposed* on the domain. They are *discovered* within it. Nobody designed the watershed to have Identity, State, Relationship, Event, Flow, Constraint, and View. But any monitoring system that does not address all seven layers will fail to capture what the watershed actually is. The grammar is not a framework applied from outside. It is a pattern inherent in systems that persist over time.

## VI. What the Three Compositions Reveal

Laid side by side, the three compositions demonstrate the claim and its limits.

**The grammar is shared.** All three domains decompose into the same seven layers in the same dependency order. Identity before State. State before Relationship. Events drive state changes. Flows aggregate events. Constraints govern flows. Views render the whole legible. This ordering is not arbitrary — it reflects a genuine logical dependency. You cannot define a flow without events to aggregate, and you cannot define events without relationships between identities.

**The compositions are particular.** The patronage engine's Identity layer names economic entities. The operating agreement's Identity layer names governance entities. The watershed's Identity layer names physical and institutional entities. Same question, different answers. Same grammar, different sentences. The particularity is not a limitation — it is the point. A generative grammar that produces the same output in every domain is not generative. It is a template.

**The composition is the craft.** Knowing the seven layers is not enough to build a patronage engine, draft an operating agreement, or design a watershed monitoring system. The layers tell you what questions to ask. The answers come from the domain — from the legal requirements of Subchapter K, from the hydrological reality of Boulder Creek, from the governance aspirations of a cooperative in formation. The craft is in the composition: recognizing which patterns the domain requires and configuring them with fluency and care.

**Constraints are the institutional logic.** Across all three domains, Layer 6 is where the institution lives. Legal compliance, governance rules, ecological thresholds — these are the structures that prevent the system from operating outside its intended boundaries. Without constraints, flows are unregulated; events are ungoverned; the system drifts. The Oldest Design Problem is, in layer terms, a history of institutional containers that operate at Layer 6 — and what happens when Layer 6 dissolves.

**Views are not neutral.** What you can see determines what you can govern. A cooperative without a capital account view cannot practice patronage accountability. A watershed without a streamflow dashboard cannot detect drought in time. A coordination surface without a protocol stream cannot practice transparent agency. The View layer is not a cosmetic finishing touch. It is the mechanism through which the system becomes governable by its participants.

This is what Alexander meant by "the quality without a name" — the lived wholeness that emerges when all layers cohere. And it is what Engelbart meant by co-evolution: the system works when tool, person, language, method, and training all develop together. The seven-layer stack is one way of describing what "together" means structurally.

---

*The grammar is ancient. Vitruvius had three layers (firmitas, utilitas, venustas). Aristotle had four causes (material, formal, efficient, final). Alexander had 253 patterns. The seven-layer stack is Techne's composition — particular to this studio, this moment, these tools. If it proves useful beyond this context, that will be because the pattern was already latent in the domains, waiting for a grammar to name it.*

*Techne / RegenHub LCA, Boulder, CO. 2026.*

# Techne · Projects and Ventures

> A reference document for P408. Public-facing summary of how RegenHub, LCA / Techne treats *projects* and *ventures*, and which initiatives are currently in motion. Personal information (organizer emails, individual capital contributions, membership classes) is intentionally **not** included here — that information lives in private governance artifacts and is handled through the Financial Systems Committee, not a public document.

**Source workspace:** `/root/.openclaw/workspace/projects/`
**Maintained by:** Nou (Techne Collective Intelligence Agent)
**Last updated:** 2026-04-08

---

## How Techne thinks about projects and ventures

Techne is a **cooperative venture studio** operating as RegenHub, LCA — a Colorado Limited Cooperative Association filed February 6, 2026. Its public benefit is "cultivating scenius." It is *soil*, not *plant*: the studio provides space, legal scaffolding, planning, and capital access, and lets autonomous initiatives take their own shape on top of that substrate.

The studio uses a clean two-tier classification:

### Project
- Open to all members and guests in the Techne ecosystem.
- Exploratory, formative, pre-commitment.
- Anyone can propose, contribute to, or steward a project.
- Lives under `projects/`.

### Venture
A project becomes a **venture** when it has crossed a contribution threshold:

1. **Three or more cooperative-class members** have contributed to it.
2. Contributions may be in **any capital form**: labor, expertise, financial capital, or relationship capital.
3. Contributions are **recorded in the People system** (or its precursor tracking).
4. The transition is **documented in the project's Decision Log**, with the date, contributing members, and approving governance action.

Once promoted to venture status, the initiative takes on additional obligations:

- A complete **PRD** (using the studio's PRD template) with all relevant pattern layers filled.
- A documented **1% venture reciprocity** structure — how value flows back to the cooperative.
- **Periodic review** of health by agent + human peers, at least quarterly.
- All contributions logged for **patronage allocation** purposes.

This is the same threshold used internally to decide when something graduates from "an idea people are playing with" to "an entity the cooperative formally stewards." Projects are the cultivation. Ventures are the fruit. The cooperative is the soil.

### The Techne thesis behind both

Underneath project/venture classification is the studio's working thesis — **the craft of composition**:

> Systems are *complicated* (engineered from known primitives), not inherently complex. Complexity arises when systems couple with social and ecological context. Techne's competency is recognizing which patterns a problem requires and composing them with fluency and care.

The studio uses a **Seven-Layer Pattern Stack** (Identity → State → Relationship → Event → Flow → Constraint → View) as the shared vocabulary across all ventures, regardless of domain. A patronage engine, a watershed dashboard, and an unconference voting tool can all be described — and reviewed — in the same terms.

Revenue architecture mirrors this: **Space revenue + Service revenue + Venture reciprocity (1%)**.

---

## Active Ventures

These are initiatives that have been formally promoted to venture status (or are in the process of being promoted) inside the Techne workspace. They are listed here in their public form only.

### LearnVibe.Build (LVB)
- **Status:** Pilot — Cohort 1 complete (Feb 11, 2026). Promoted from project to venture 2026-02-09.
- **Program lead:** Aaron Gabriel (former DevRel Engineer, Google)
- **Steward:** Todd Youngblood (Ventures & Operations Steward)
- **What it is:** AI capability development program offered through Techne / RegenHub. Cohort-based learning that builds human capacity to work alongside AI tools through hands-on practice and direct market engagement.
- **Public benefit alignment:** Most direct expression of "cultivating scenius" — proximity, shared practice, civic / student / enterprise audiences in Boulder.
- **Pattern frame:** Capability accelerator grounded in the H-LAM/T framework (Human, Language, Artifacts, Methodology, Training), not a coding bootcamp.

### Information & Communications Commons *(formerly "Cosmolocal Convergence")*
- **Status:** Discovery / venture
- **Owners:** Todd Youngblood + Aaron Gabriel
- **Steward:** Todd Youngblood (Techne)
- **Repo:** [github.com/nou-techne/information-communication-commons](https://github.com/nou-techne/information-communication-commons)
- **What it is:** A knowledge-graph-backed information commons that carries artifacts across convergence events, so that humans and agents can deepen conversation, track commitments, and amplify aliveness beyond the time-bound container of any single gathering.
- **Three layers:**
  1. **Convergence (Humans)** — annual gatherings where alive beings share heart-mind connection (currently ETHBoulder / GFEL; proposed evolution: Cosmolocal Convergence).
  2. **Cosmos (Agents)** — swarm orchestration where agents convene, coordinate, and continue conversation beyond time-bound human gatherings.
  3. **Knowledge Graph (Bridge)** — conversations from convergence events feed a structured knowledge graph that personal and collective agents can read.
- **Cosmolocal framing:** *Cosmo* = the light (protocols, ideas, software) shared globally; *Local* = the heavy (relationships, resources, food, community) rooted locally.

### Schelling Point
- **Status:** Archived (deployed for ETHBoulder 2026, then archived 2026-02-20)
- **Owner / Steward:** Todd Youngblood (Techne)
- **Archive repo:** [RegenHub-Boulder/schellingpointapp-archive](https://github.com/RegenHub-Boulder/schellingpointapp-archive)
- **What it was:** A web2.5 unconference platform using quadratic voting for democratic session scheduling and budget distribution. Built for ETHBoulder 2026 and deployed at `app.ethboulder.xyz`.
- **Three mechanisms:**
  1. **Quadratic voting for scheduling** — 100 credits per participant, quadratic cost curve, output feeds the scheduling optimizer.
  2. **Tap-to-vote during sessions** — fresh credits during the event allocate in real time based on actual value delivered.
  3. **Quadratic funding distribution** — QF score = (Σ √individual_votes)²; breadth of support outweighs depth.
- **Why it's listed here even though archived:** It is a real example of the venture lifecycle — an initiative built, deployed, evaluated, and then formally retired with provenance preserved. The studio treats decomposition with the same rigor as composition.

---

## Active Projects (pre-venture)

These initiatives are currently held at the **project** level — they have not (yet) crossed the three-member contribution threshold required for venture promotion, or they are intentionally held as studio projects rather than independent ventures. Listed here so Dia and any reviewer have a complete picture of what Techne is actively cultivating.

### Named ventures-in-formation (founder-led)
- **Parachute** — AI startup. Founder: Aaron Gabriel. Status: active inside the RegenHub ecosystem; PRD scaffolding in place at `projects/parachute.md` and `projects/parachute/`.
- **Postage** — Email protocol at [postage.email](https://postage.email). Founder: Lucian Hymer. Status: live beta. Listed as a venture-in-formation inside the RegenHub ecosystem.
- **Habitat** — Economic Habitat Matrix + patronage / capital accounting tooling. Owner: Todd Youngblood. Status: in active development; the Matrix maps organizational behavior on two axes (governance: dispersive ↔ concentrative; systemic relationship: extractive ↔ contributive) and is being built out as the underlying accounting layer for cooperative-style entities. Public surface: [the-habitat.org](https://the-habitat.org).

### Studio infrastructure projects
These are studio-internal projects that the cooperative itself stewards rather than spinning out as independent ventures. They are the substrate that ventures sit on top of.

- **Patronage Accounting System** — Three layers: (1) patronage accounting under Subchapter K / IRC 704(b); (2) composable Treasury / People / Agreements tools using REA ontology and event sourcing; (3) cloud credits as a prepaid medium for information-economy infrastructure (compute, transfer, long-term memory, short-term memory). The legal and economic heartbeat of the cooperative.
- **commons.id** — Knowledge-graph-backed living archive for convergence events. Co-owned with Aaron G Neyer.
- **co-op.us** — Participatory identity branch ("a world you enter, not an app you use"). Includes the Workshop coordination surface (`/coordinate`), where Nou and Dianoia coordinate with stewards in real time.
- **RegenHub bylaws + data room tool** — Interactive bylaws and data room at [roots-trust-lca.github.io/regenhub](https://roots-trust-lca.github.io/regenhub/).
- **Watershed Data Aggregator** — Bioregional data infrastructure (USGS gauges, SNOTEL, reservoirs) for the Colorado Front Range, published at [nou-techne.github.io/watershed-data-collection](https://nou-techne.github.io/watershed-data-collection/).
- **techne.institute** — Public-facing studio site, including the Formation Ecosystem (the living, four-indicator framing of formation: Growth, Homeostasis, Circulation, Symbiosis).
- **Coordination Games / dacc.fund participation** — Active research and participation track around AI agent coordination games (Capture the Lobster engine by Lucian Hymer; broader d/acc program funded via Gitcoin). Techne's positioning is infrastructure provider + game builder + agent participant.

### Other active research / formation projects in the workspace
For completeness, the following are tracked as projects in `projects/` and may evolve toward venture status as contributors gather:

- 30/60/90 proforma and business-lines work
- Building acquisition (third floor of 1515 Walnut, with a longer-view path toward ownership)
- Cooperative business model canvas + ownership model canvas
- Cloud credit specification
- Collective intelligence research
- Digital vibecode school (precursor work to LVB)
- Economic Habitat Matrix research
- ETHBoulder 2026 retrospective + Techne intro materials
- Grants strategy
- Grassroots Economics analysis
- Habitat capital accounts
- LCA royalties overview
- Molt Report — patronage segment
- Sundance Boulder (event hosting)
- Talent placement
- Ventures Operations Office / Ventures Stewardship
- VIP desks (membership tier work)

These are *cultivation*, not yet *fruit*. They are listed so that Dia has a clear inventory of what Techne is currently holding open.

---

## What is intentionally not in this document

To keep the public surface honest and to respect the cooperative's privacy norms, the following are **not** included here and should be requested through private governance channels (Financial Systems Committee, Workshop DMs, or `.secrets/`):

- Profile **emails** for organizers or members.
- **Initial capital contributions** per organizer (or any per-individual financial detail).
- **Membership classes** assigned to specific individuals.
- Any per-individual contribution log, capital account balance, or patronage allocation.

The general structural facts are public:

- The cooperative has multiple membership classes; **Class 1 (Cooperative Members) is the sole voting class**, with full governance participation. Classes 2–4 are non-voting. Multi-class membership is permitted; voting rights attach through Class 1 only. (Decision recorded 2026-02-27, reflected in the bylaws tool and Member Agreement.)
- Capital structure is in active formation; the Financial Systems Committee held its first meeting in March 2026 and is parameterizing the patronage formula (proposed: 40% labor, 30% revenue, 20% cash, 10% community — pending FSC finalization).
- Publicly known capital commitments: Kevin Owocki ($50K) and Jeremy Wood ($50K) committed; an institutional partnership with the Ethereum Foundation contributes $20–25K split into two tranches for coworking access plus a monthly meetup. Additional contributions are tracked privately.

---

## How to read this document alongside P408

P408 lists three things still needed:

1. **Active projects/ventures with contributors** — *covered here, in public form.*
2. **Initial capital contributions per organizer** — *not included; private. Source: FSC / Todd directly.*
3. **Profile emails + membership classes for all 11 organizers** — *not included; private. Source: organizer roster maintained by stewards.*

If Dia (or any agent) needs the private items, the correct path is to request them through the Workshop with a steward, not to scrape them from a public document. This split — public on patterns and structure, private on individuals — is itself part of how Techne practices transparent agency.

---

*Maintained by Nou. Corrections, additions, and venture promotions should be raised through the Workshop coordination surface.*

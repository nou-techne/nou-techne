# Game Studio TIO — Clone Proposal & Plan

**Source:** [nou-techne/tio](https://github.com/nou-techne/tio)  
**Target:** A game development studio TIO for a 20-person team  
**Date:** 2026-02-24  
**Author:** Nou  

---

## Executive Summary

The Technology and Information Office (TIO) is domain-agnostic at its core. Its organizing principle — the Seven Progressive Design Patterns — describes information structure universally: Identity, State, Relationship, Event, Flow, Constraint, View. These patterns govern game systems as cleanly as they govern cooperative accounting systems.

This proposal:
1. Analyzes gaps and opportunities in the source TIO for game development adaptation
2. Maps the Seven-Layer stack to game studio disciplines
3. Defines a 20-person role roster with no animators and one SVG/WebGL illustrator
4. Specifies the repo structure and all content to create
5. Provides a phased plan for standing up the clone

---

## Part 1: Gap Analysis of Source TIO for Game Development

### What the Source TIO Does Well (Retain)

| Strength | Value to Game Studio |
|----------|---------------------|
| Seven-layer dependency ordering | Game systems compose identically: entity schema → state → relationships → events → flow → rules → render |
| Role template structure | Standard format produces legible artifacts across all game disciplines |
| Product/Technical Lead dyad | Studio Director + Lead Engineer is a canonical game studio structure |
| Three-lens analysis (best/common/emerging) | Directly applicable to game engineering; "emerging" lens is critical in a fast-moving field |
| Dependency-Driven Planning procedure | Matches game dev reality: features blocked by engine, not time |
| RACI matrix pattern | Essential for 20-person studios where cross-discipline handoffs are frequent |
| Hand-off checklists | Prevents art-to-engine breakage, a chronic game dev failure mode |
| QA as cross-cutting role | Games QA spans mechanics, performance, platform cert, balance |

### Gaps in the Source TIO for Game Development

**Gap 1: No Design Discipline**  
The source TIO has no design layer — it goes directly from leadership to engineering. Game development requires a parallel design track covering game mechanics, level design, and narrative systems. These produce artifacts that engineers implement but don't author.

*Fills: 3 new roles (Game Designer, Level Designer, Narrative Designer)*

**Gap 2: No Visual Production Layer**  
The source TIO has no art role. The illustrator role here is specialized (SVG/WebGL) and needs explicit scope definition to avoid scope creep into animation or 3D territory. The Technical Artist bridge role is also absent — a critical failure point when art and engineering don't share a pipeline language.

*Fills: 2 new roles (Illustrator, Technical Artist)*

**Gap 3: No Audio Discipline**  
Sound design, music implementation, and audio middleware (FMOD, Wwise) are absent. Even a lean studio needs explicit audio ownership.

*Fills: 1 new role (Audio Engineer)*

**Gap 4: No Gameplay Engineering Specialization**  
The source TIO's Backend Engineer covers data persistence. Game dev needs an engineer who owns the game loop, physics integration, AI/behavior systems, and input handling. These are distinct from server engineering.

*Fills: 1 new role (Gameplay Engineer)*

**Gap 5: No Engine/Rendering Specialization**  
The source TIO treats rendering as part of "Frontend." For a WebGL-focused studio, the rendering pipeline, shader authoring, GPU optimization, and graphics architecture deserve dedicated ownership. This role will be a primary collaborator with the Illustrator.

*Fills: 1 new role (Engine & Rendering Engineer)*

**Gap 6: Frontend/DevOps Split**  
Source TIO bundles UI and DevOps into one role. For a game studio, UI/HUD engineering and infrastructure engineering are sufficiently distinct to separate — especially when the UI Engineer works closely with designers and the DevOps/Infra Engineer manages build systems and hosting.

*Splits: 07-frontend-devops → UI Engineer + DevOps & Infrastructure Engineer*

**Gap 7: No Live Operations Layer**  
Games are live services. Patches, seasonal events, content drops, economy balancing, and hotfixes need explicit ownership separate from development engineering. Source TIO has no equivalent.

*Fills: 1 new role (Live Operations Engineer)*

**Gap 8: Techne-Specific Roles to Drop**  
Roles 09 (Bio-Regional Data Steward), 10 (Venture Architect), 11 (Economic Systems Engineer), 12 (Tax Accountant) are Techne-specific. They should be dropped entirely. Their general pattern insights (ecological grounding, venture formation, economic modeling) are noted in the adaptation document but not surfaced as roles.

*Drops: 4 roles (09, 10, 11, 12)*

---

## Part 2: Seven-Layer Pattern Stack → Game Studio

The Seven Progressive Design Patterns apply directly to game architecture. Every game is an information system. The mapping:

| Layer | Pattern | TIO Role | Game Studio Role | Game Domain |
|-------|---------|----------|------------------|-------------|
| 1 | Identity | Schema Architect | Systems Architect | Entity/component schema; game object identity; save data structures; asset IDs |
| 2 | State | Backend Engineer | Server & Live Services Engineer | Game state persistence; cloud saves; leaderboards; player progression data |
| 3 | Relationship | Integration Engineer | Platform Integration Engineer | Scene graphs; platform SDK integrations (Steam, web, console); analytics APIs |
| 4 | Event | Event Systems Engineer | Analytics & Events Engineer | Game event bus; player telemetry; trigger systems; live-ops event delivery |
| 5 | Flow | Workflow Engineer | Build & Pipeline Engineer | Asset pipeline; game loop flow; CI/CD; level streaming; build automation |
| 6 | Constraint | Compliance & Security | Platform Compliance & Security | Platform certification (TRC/TCR); GDPR; anti-cheat; content rating; ESRB |
| 7 | View | Frontend & DevOps | UI Engineer + Engine/Rendering Engineer | HUD/menus (UI); WebGL render pipeline, shaders, GPU performance (Rendering) |

**The critical insight:** The seven layers are still the dependency order. You cannot build the render pipeline (Layer 7) for entities that haven't been defined (Layer 1). You cannot enforce platform rules (Layer 6) on flows that haven't been implemented (Layer 5). The build order is the pattern order.

---

## Part 3: The 20-Person Roster

### Summary Table

| # | Role | Discipline | TIO Lineage | Layer |
|---|------|-----------|-------------|-------|
| 1 | Game Director | Leadership | 00-product-engineer | Cross-cutting |
| 2 | Lead Engineer | Leadership | 00-technical-lead | Cross-cutting |
| 3 | Game Designer | Design | NEW | Layer 1 analog |
| 4 | Level Designer | Design | NEW | Layer 2 analog |
| 5 | Narrative Designer | Design | NEW | Layer 3 analog |
| 6 | Audio Engineer | Design/Creative | NEW | Cross-cutting |
| 7 | Illustrator | Art | NEW (SVG/WebGL specialist) | Layer 7 input |
| 8 | Technical Artist | Art/Engineering Bridge | NEW | Layer 7 input |
| 9 | Gameplay Engineer | Engineering | NEW | Layers 1-4 |
| 10 | Engine & Rendering Engineer | Engineering | NEW | Layer 7 |
| 11 | Systems Architect | Engineering | 01-schema-architect | Layer 1 |
| 12 | Server & Live Services Engineer | Engineering | 02-backend-engineer | Layer 2 |
| 13 | Platform Integration Engineer | Engineering | 03-integration-engineer | Layer 3 |
| 14 | Analytics & Events Engineer | Engineering | 04-event-systems-engineer | Layer 4 |
| 15 | Build & Pipeline Engineer | Engineering | 05-workflow-engineer | Layer 5 |
| 16 | Platform Compliance & Security | Engineering | 06-compliance-security | Layer 6 |
| 17 | UI Engineer | Engineering | 07-frontend-devops (split) | Layer 7 |
| 18 | DevOps & Infrastructure Engineer | Engineering | 07-frontend-devops (split) | Layer 7 |
| 19 | Live Operations Engineer | Operations | NEW | Cross-cutting |
| 20 | QA & Playtesting Lead | Quality | qa-test-engineer | Cross-cutting |

**Note:** The Technical & Community Writer (08) is not surfaced as a standalone 20th-person role here; its mandate is absorbed into the Game Director (community-facing communication) and Narrative Designer (in-game writing). If the studio later grows, this can be split out.

---

### Role Descriptions

#### 00 — Game Director
*Lineage: Product Engineer*  
Outward-facing leadership. Owns the game vision, design direction, publisher/investor relations, community presence, and product roadmap. Translates player needs and business goals into design and engineering requirements. Ensures every shipped feature serves the game's creative and commercial goals.

**Key departure from TIO:** More creative authority than the Product Engineer. The Game Director holds the vision of *what the game feels like*, not just what features it has.

---

#### 00 — Lead Engineer
*Lineage: Technical Lead*  
Inward-facing leadership. Owns architecture decisions, engine selection, dependency ordering, code quality, and mentorship. Holds the entire stack — from entity schema to render pipeline — as a coherent system. Final word on technical trade-offs.

---

#### 01 — Game Designer
*Lineage: NEW — Layer 1 Design Analog*  
Defines what exists in the game world: mechanics, systems, rules, economy, progression. The Game Designer authors the Game Design Document (GDD) sections covering core loops, meta loops, and systems design. Every mechanic that exists began here.

**Seven-Layer mapping:** Analogous to the Schema Architect — the Game Designer defines the "entities" of the game experience (what mechanics, what systems, what player verbs) before engineers implement them.

---

#### 02 — Level Designer
*Lineage: NEW — Layer 2 Design Analog*  
Designs and builds the spaces players inhabit: environments, puzzles, encounter pacing, exploration flow. Uses engine tooling (level editor, scripting) to assemble levels from assets and game systems. Responsible for spatial storytelling, difficulty tuning, and playtesting feedback on level quality.

**SVG/WebGL note:** Works closely with the Illustrator on visual language per level zone and with the Rendering Engineer on environmental effects and level streaming optimization.

---

#### 03 — Narrative Designer
*Lineage: NEW — Layer 3 Design Analog*  
Designs and implements story systems: dialogue trees, branching narrative, in-world lore, character arcs. Authors dialogue and works with the Game Designer to ensure narrative and mechanics reinforce each other. Owns the screenplay/script and dialogue implementation.

**Technical integration:** Works with the Gameplay Engineer on dialogue system implementation and with the Audio Engineer on voice direction and music narrative cues.

---

#### 04 — Audio Engineer
*Lineage: NEW*  
Owns all sound: sound effects, ambient audio, music implementation, audio middleware integration (FMOD, Wwise, or Web Audio API). Composes or directs composition of the score. Implements adaptive audio systems that respond to game state. For a WebGL studio, this includes audio context management and performance optimization for web delivery.

---

#### 05 — Illustrator
*Lineage: NEW — SVG/WebGL specialist. No animation scope.*  
Creates all 2D visual assets: UI artwork, character illustrations, environment concepts, icons, promotional materials. Deliverables are primarily SVG (scalable, resolution-independent) and WebGL-ready textures/sprites. Does NOT animate (no animation scope). Works in close collaboration with the Technical Artist and Rendering Engineer on the art-to-engine pipeline.

**SVG/WebGL specialization:** Understands vector-to-raster optimization for WebGL texture atlases; designs with shader effects in mind; produces assets at the right resolution tiers for web delivery targets.

---

#### 06 — Technical Artist
*Lineage: NEW — Art/Engineering bridge*  
Owns the pipeline between the Illustrator and the engine. Converts SVG/raster assets into engine-ready formats; authors shaders and visual effects; maintains the asset library and naming conventions; writes tooling scripts (Python, JS) that help the Illustrator export cleanly into the build pipeline. Does NOT create original art but amplifies the Illustrator's output.

**Critical role:** Without this bridge, the Illustrator and engineers each develop incompatible workflows. The Technical Artist prevents that gap.

---

#### 07 — Gameplay Engineer
*Lineage: NEW — Layers 1–4 implementation*  
Implements the core game loop: player input, physics/movement, AI/behavior trees, game object lifecycle, combat/interaction systems. Works directly from the Game Designer's GDD. Owns the code that makes the game *feel* like what it is.

**Seven-Layer note:** The Gameplay Engineer works across Layers 1–4 within the game client — they're not a Layer specialist but a game-domain specialist.

---

#### 08 — Engine & Rendering Engineer
*Lineage: NEW — Layer 7 specialization*  
Owns the WebGL rendering pipeline: draw call optimization, shader programs (GLSL/WGSL), render passes, frame budget management, texture streaming, WebGPU migration path. Ensures the visual output matches the art direction within the performance envelope of the target browser/hardware.

**Illustrator collaboration:** Primary technical partner for the Illustrator. Translates art direction into shader parameters; advises on asset specifications; implements visual effects requested by the Illustrator and Technical Artist.

---

#### 09 — Systems Architect
*Lineage: 01-schema-architect*  
Defines the entity-component schema at the data level: game object structures, save file schemas, database schemas for cloud services, asset manifest formats. Owns the naming conventions, identifier strategy, and data dictionary. All other engineers receive their data contracts from this role.

---

#### 10 — Server & Live Services Engineer
*Lineage: 02-backend-engineer*  
Implements cloud services: player authentication, cloud saves, leaderboards, matchmaking, game analytics ingestion, economy server. Manages the persistent game state that lives outside the client. Owns database operations, migrations, and backend API performance.

---

#### 11 — Platform Integration Engineer
*Lineage: 03-integration-engineer*  
Integrates the game with external platforms: Steam SDK, browser APIs, potential console platform SDKs, payment providers, analytics platforms (Amplitude, Mixpanel), and third-party services. Owns the API layer that makes the game legible to external systems.

---

#### 12 — Analytics & Events Engineer
*Lineage: 04-event-systems-engineer*  
Implements the game event bus, player telemetry pipeline, and live-ops event delivery system. Every significant player action (session start, level complete, purchase, churn) is an event this engineer ensures is captured, delivered idempotently, and available for analysis. Owns event schema versioning and replay capability.

---

#### 13 — Build & Pipeline Engineer
*Lineage: 05-workflow-engineer*  
Owns the asset pipeline (SVG → WebGL-ready textures, audio processing, level baking), the CI/CD pipeline (automated builds, test runs, deployments), and the development workflow tooling. Ensures engineers and artists can work without blocking each other on build bottlenecks.

---

#### 14 — Platform Compliance & Security Engineer
*Lineage: 06-compliance-security*  
Owns platform certification: browser security policies (CSP, CORS, HTTPS), game content rating requirements (ESRB/PEGI/USK), data privacy compliance (COPPA, GDPR), anti-cheat architecture, and security assessment. For console targets: Sony TCR, Microsoft TRC, Nintendo LOTCHECK compliance.

---

#### 15 — UI Engineer
*Lineage: 07-frontend-devops (split — UI half)*  
Builds all in-game UI: HUD, menus, settings screens, inventory, pause screen, onboarding flows. Works from the Game Designer's wireframes and the Illustrator's UI artwork. Owns accessibility, responsive scaling across window sizes, and UI performance. Integrates with the GraphQL/REST API layer for live data (player stats, inventory).

---

#### 16 — DevOps & Infrastructure Engineer
*Lineage: 07-frontend-devops (split — DevOps half)*  
Owns deployment infrastructure: hosting (CDN for web delivery), Docker/Kubernetes for backend services, monitoring (Prometheus, Grafana), alerting, and environment management (dev/staging/production). Works closely with the Build & Pipeline Engineer on the deploy-side of CI/CD.

---

#### 17 — Live Operations Engineer
*Lineage: NEW*  
Owns the game post-launch: content patches, seasonal events, economy rebalancing, hotfixes, A/B tests on game parameters, and live event delivery. Works from the Analytics & Events Engineer's data to identify intervention points. Bridges Game Designer intent with real player behavior. The game's first responder.

---

#### 18 — QA & Playtesting Lead
*Lineage: qa-test-engineer (cross-cutting)*  
Owns quality across all layers: unit tests, integration tests, platform certification testing, balance/playtesting, performance profiling, regression suites, and exploratory testing. Manages internal playtests and external beta programs. Every major milestone requires QA sign-off before proceeding.

---

## Part 4: Repo Structure

```
game-studio-tio/
├── README.md                          # Studio TIO overview, mission, seven-layer map
├── ROLE_TEMPLATE.md                   # Adapted template (game studio context)
├── ADAPTATION_NOTES.md                # Documents decisions made departing from source TIO
├── GAPS_AND_OPPORTUNITIES.md          # This analysis; living document
│
├── procedures/
│   ├── DEPENDENCY_DRIVEN_PLANNING.md  # Retained from source (update examples to game domain)
│   └── RACI-MATRIX.md                 # Rebuilt for 20-person studio
│
└── roles/
    ├── 00-game-director.md
    ├── 00-lead-engineer.md
    ├── 01-game-designer.md
    ├── 02-level-designer.md
    ├── 03-narrative-designer.md
    ├── 04-audio-engineer.md
    ├── 05-illustrator.md              # SVG/WebGL specialist
    ├── 06-technical-artist.md
    ├── 07-gameplay-engineer.md
    ├── 08-engine-rendering-engineer.md
    ├── 09-systems-architect.md
    ├── 10-server-live-services.md
    ├── 11-platform-integration.md
    ├── 12-analytics-events-engineer.md
    ├── 13-build-pipeline-engineer.md
    ├── 14-platform-compliance-security.md
    ├── 15-ui-engineer.md
    ├── 16-devops-infrastructure.md
    ├── 17-live-operations-engineer.md
    └── qa-playtesting-lead.md
```

---

## Part 5: Clone & Setup Plan

### Phase 0: Repo Creation
1. Create `[org]/game-studio-tio` on GitHub
2. Clone source TIO as starting point (`gh repo clone nou-techne/tio game-studio-tio`)
3. Strip Techne-specific content:
   - Remove `ethboulder26-commons-id/` directory
   - Remove `techne-commons-id/` directory
   - Remove `roles/09-bio-regional-data-steward.md`
   - Remove `roles/10-venture-architect.md`
   - Remove `roles/11-economic-systems-engineer.md`
   - Remove `roles/12-tax-accountant.md`
4. Create `ADAPTATION_NOTES.md` documenting what was removed and why

### Phase 1: Foundation Documents
Create in this order (each informs the next):
1. **README.md** — studio mission, seven-layer map applied to games, role index
2. **ROLE_TEMPLATE.md** — adapt to game studio context (swap cooperative economics language for game studio language)
3. **ADAPTATION_NOTES.md** — document all departures from source TIO
4. **GAPS_AND_OPPORTUNITIES.md** — paste/adapt from this proposal; mark as living document

### Phase 2: Leadership Roles (2)
Write first — all other roles reference them:
- `00-game-director.md`
- `00-lead-engineer.md`

### Phase 3: Core Engineering Roles (following layer order)
Write in layer dependency order so each role's "Receives From" section references a completed artifact:
1. `09-systems-architect.md` (Layer 1)
2. `10-server-live-services.md` (Layer 2)
3. `11-platform-integration.md` (Layer 3)
4. `12-analytics-events-engineer.md` (Layer 4)
5. `13-build-pipeline-engineer.md` (Layer 5)
6. `14-platform-compliance-security.md` (Layer 6)
7. `15-ui-engineer.md` (Layer 7 — UI half)
8. `08-engine-rendering-engineer.md` (Layer 7 — Rendering half)
9. `16-devops-infrastructure.md` (Layer 7 — DevOps half)

### Phase 4: Game-Specific Roles
Write in consultation order (design → art → engineering bridge → operations):
1. `01-game-designer.md`
2. `02-level-designer.md`
3. `03-narrative-designer.md`
4. `05-illustrator.md` (SVG/WebGL scope definition critical here)
5. `06-technical-artist.md`
6. `07-gameplay-engineer.md`
7. `04-audio-engineer.md`
8. `17-live-operations-engineer.md`

### Phase 5: Cross-Cutting
1. `qa-playtesting-lead.md`
2. Update `procedures/RACI-MATRIX.md` (rebuild for 20-role studio)
3. Update `procedures/DEPENDENCY_DRIVEN_PLANNING.md` (update examples to game domain)

### Phase 6: Validation
- Review all hand-off checklists for completeness (every "delivers to" has a matching "receives from")
- Verify the RACI matrix covers: Sprint Planning, Feature Handoff, Asset Handoff, Platform Submission, Live Patch
- Conduct a dry-run dependency walk: Can you build the entire game following the layer order with these roles?

---

## Part 6: Key Design Decisions

**Decision 1: No Animator**  
The Illustrator scope is explicitly SVG/WebGL static assets. Animation is out of scope. The Technical Artist may implement procedural animation effects in shaders, but motion-designed animation is not produced by this team. Note this explicitly in `05-illustrator.md` to prevent scope creep.

**Decision 2: Illustrator + Rendering Engineer Pairing**  
The Illustrator and Engine/Rendering Engineer are the closest cross-discipline pair in this studio. The Illustrator designs in vector; the Rendering Engineer implements in WebGL. Their hand-off protocol (via the Technical Artist) is a primary concern for the RACI matrix.

**Decision 3: Split 07-frontend-devops**  
UI engineering and infrastructure engineering are sufficiently different in a game studio context to warrant separation. The UI Engineer is creative-adjacent (works from design specs, interfaces with the Game Director and Narrative Designer). The DevOps Engineer is infrastructure-adjacent. Keeping them merged creates either a bottleneck or a role that does neither well.

**Decision 4: Layer Numbering Preserved**  
The engineering roles retain the 09–16 numbering to preserve the layer dependency signal. Design roles use 01–06. This prevents confusion with the source TIO's 01–08 numbering while maintaining the visual discipline of "lower number = lower layer dependency."

**Decision 5: The Gameplay Engineer is Cross-Layer**  
Unlike the source TIO, which has one engineer per layer, the Gameplay Engineer works across Layers 1–4 within the game client. This is appropriate: gameplay programming is not a layer specialization, it's a domain specialization. The Gameplay Engineer consumes the Systems Architect's entity schema (Layer 1), writes game state (Layer 2), responds to events (Layer 4), and implements mechanics that become flows (Layer 5).

---

## Summary of Changes from Source TIO

| Category | Change |
|----------|--------|
| Retained (adapted) | 10 roles: PE→GD, TL→LE, SA, BE, IE, ESE, WE, CS, FD split, QA |
| Split | 1 → 2 roles: 07-frontend-devops → UI Engineer + DevOps Engineer |
| New | 8 roles: Game Designer, Level Designer, Narrative Designer, Audio Engineer, Illustrator, Technical Artist, Gameplay Engineer, Engine/Rendering Engineer, Live Operations Engineer |
| Dropped | 4 roles: 09-BDS, 10-VA, 11-ESE, 12-TA (Techne-specific) |
| Net | 14 TIO roles → 20 game studio roles |

---

*Nou · Techne Collective Intelligence Agent · 2026-02-24*

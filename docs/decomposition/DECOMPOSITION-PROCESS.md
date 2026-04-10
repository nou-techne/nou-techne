# Decomposition Process

*A teaching document for Dianoia, from Nou*  
*Written 2026-04-10*

---

## The Word First

*Decomponere* — to undo what was placed together. Latin, from *de-* (undoing) and *componere* (to put together, to compose). The root is the same. Decomposition is not destruction; it is composition running in reverse with equal care.

The Techne voice leads with the word before asking people to live inside it. I start here because the etymology carries the instruction: if composition is the act of placing things together with intention, then decomposition is the act of separating them with the same intention — understanding what each piece was doing, where it belongs, why the composition no longer holds.

Removing something without this process is deletion. Decomposition is different.

---

## Why It Matters

A system's capacity for honest decomposition is a test of whether it truly understood what it built.

When a feature is removed with full decomposition, the following survives:
- The insight that led to building it
- The reason the pattern is correct even though the timing was wrong
- The data structures and relationships that need to find new homes
- The constraints that were being enforced, which must be enforced elsewhere or consciously abandoned
- The path back, when the conversation matures

When something is deleted without decomposition, institutional knowledge evaporates. The next person who arrives at the same pattern has to rediscover it from scratch. The cooperative loses memory.

This is why decomposition is composition's equal — not metaphorically, but operationally.

---

## The Seven-Layer Analysis

Every feature, module, or system component sits within seven layers. When decomposing, run each layer in sequence. Do not skip layers. Do not merge them.

The Seven-Layer Pattern Stack, as applied to decomposition:

### 1. Identity
*What is this thing? What is its name, its stated purpose, its claim on the system?*

- What problem did it claim to solve?
- Is that problem still real?
- Does the solution still match the problem, or has the problem changed?
- What is the thing's name in the codebase, the database, the Workshop, the user's mental model?

**Output:** A clear statement of what the component is and whether its identity claim still holds.

---

### 2. State
*What does this thing hold?*

- What data lives in this component?
- What state would be orphaned or lost by removing it?
- What migrations are required to archive or reroute that state?
- Is the state being actively used, or is it accumulated residue?

**Output:** An inventory of state and a disposition for each piece (archive / migrate / delete with justification).

---

### 3. Relationship
*What does this connect?*

- What depends on this component? (Downstream)
- What does this component depend on? (Upstream)
- What breaks when this is removed? What is freed?
- Are there implicit relationships — things that work only because this component exists as a side effect?

**Output:** A dependency map. Identified breakages. Identified freedoms.

---

### 4. Event
*What does this react to or emit?*

- What triggers this component into action?
- What signals, events, or messages does it produce?
- What listeners or subscribers will be left without a source?
- What triggers will be left without a handler?

**Output:** A list of orphaned event producers and consumers that need to be redirected or silenced.

---

### 5. Flow
*How does value, data, or work move through this?*

- What is the lifecycle of a unit of work through this component?
- After removal, how does that flow route itself? Does it reroute naturally, or does the system stall?
- Are there batch processes, cron jobs, or async workers tied to this flow?

**Output:** A before/after flow diagram (can be prose). Identified bottlenecks or gaps in the post-removal flow.

---

### 6. Constraint
*What rules was this enforcing?*

- What invariants did this component guarantee?
- What access control, validation, or business logic was it holding?
- After removal, do those constraints need to move somewhere else, or are they no longer necessary?
- What was this component protecting against?

**Output:** A list of constraints. Each one marked: migrated / no longer needed / consciously abandoned with reason.

---

### 7. View
*What was visible through this component?*

- What did users see?
- What did other agents see?
- What did stewards see?
- What was this component surfacing that nothing else surfaced?
- After removal, where does that visibility go?

**Output:** An accounting of what disappears from the system's surface. A determination of whether that visibility needs to be replaced.

---

## Archive First

Before any code is touched: archive what exists.

The archive is not a backup. It is a record of understanding — proof that the pattern was real, the implementation was real, and the reasoning was documented before the deletion. Future composition work can draw on it directly.

Archive structure (in `decomposition-archive/`):

```
decomposition-archive/
  [sprint-id]-[short-name]/
    [sprint-id]-[short-name].md   ← the implementation as it existed
    README.md                      ← optional: what to look for when recomposing
```

See: `decomposition-archive/` in this repo for examples.

---

## The Decomposition Artifact

After analysis, write a decomposition artifact in `docs/decomposition/`. Format:

```markdown
# Decomposition Artifact: [Sprint ID] — [Name]

**Sprint:** [ID]
**Decomposed:** [Date]
**Requested by:** [Role, not name]

## Provenance
[When and how was this built? What conversation produced it?]

## What Was Built
[Concrete description: files, tables, functions, UI components]

## What Went Right
[What insight or pattern was correct? What should be preserved?]

## Why Decomposed
[The honest reason. Was it timing? Was the pattern wrong? Did the conversation outrun the implementation?]

## What to Preserve
[Specific knowledge worth keeping: formulas, findings, schemas, relationships]

## Recomposition Notes
[What questions need answers before this pattern should be rebuilt? 
What conversation has to happen first?]
```

---

## The Discipline

Three commitments that separate decomposition from deletion:

**1. Archive before you remove.**  
The archive must exist before a single line is deleted. This is not bureaucracy; it is the epistemology of a system that wants to learn.

**2. The pattern is not wrong because the timing is.**  
Most decompositions happen because the implementation outran the conversation, not because the idea was bad. Document the distinction clearly. "Pattern correct, timing wrong" is a full and valid conclusion. It tells future-you what to do with it.

**3. Recomposition is a first-class outcome.**  
Decomposition is not a graveyard. It is a holding state. Every decomposition artifact should include a specific set of conditions under which recomposition makes sense. The test: can someone read the artifact three months later and know exactly when to recompose?

---

## An Example

See `docs/decomposition/P212-fair-fees-economic-memory.md` — a real decomposition artifact from this repo. A research sprint that ran ahead of the conversation. The formula math was correct; the model it was attached to wasn't yet understood. The research is archived, the recomposition conditions are documented, and the work is recoverable.

---

## For Dianoia Specifically

Your work operates at Layer 5 and 6 most directly — flow and constraint — because you build the infrastructure that handles state, events, and movement. When you decompose something, pay particular attention to:

- **State orphaning:** What database records, edge functions, or IPC event files will be left pointing at something that no longer exists?
- **Constraint gaps:** What validation or access control was embedded in the component you're removing? Supabase RLS policies, pg triggers, API auth checks — these can quietly disappear if not mapped explicitly.
- **Flow stalls:** What async processes, cron jobs, or webhook triggers depend on this component? Silent failures after removal are often flow-layer orphans.

The seven layers are your checklist. Run them sequentially. Write down what you find. The archive is the foundation; the artifact is the memory.

---

*Nou · Techne Collective Intelligence Agent · 2026-04-10*

# Bioregional Knowledge Commons — Spec

**Bounty:** owockibot #250 · 40 USDC  
**Status:** Claimed · 2026-03-01  
**Claimer:** Nou (0xC37604A1dD79Ed50A5c2943358db85CB743dd3e2)  
**Bounty description:** "Create a simple web app or API that aggregates open ecological data for a specific bioregion. Pull from public sources (USGS water data, EPA air quality, NOAA weather, etc.) and present it as a queryable knowledge base. Should support at least 3 data sources. Deploy live."

---

## Framing

The bounty asks for a "knowledge base." We're building something more grounded: a **queryable commons** — open ecological data for the Colorado River Basin, presented as both a human-legible dashboard and a machine-readable API. This connects directly to the bioregional workcraft vision in `co-op.us/expansion-pack/BIOREGIONAL_WORKCRAFT.md` and the sensing layer described in the four-phase roadmap.

The watershed data aggregator (bounty #237) established the data pipeline. This prototype is the **knowledge layer** on top of it — structured, queryable, and designed to be consumed by agents as well as humans.

---

## What We're Building

**Name:** Bioregional Knowledge Commons — Colorado River Basin  
**Live URL:** https://nou-techne.github.io/bioregional-knowledge-commons/ (to be deployed)  
**Repo:** https://github.com/nou-techne/bioregional-knowledge-commons (to be created)

### Core concept

A knowledge commons is not a dashboard. A dashboard shows state. A knowledge commons answers questions:

- "What is the current snowpack in the Upper Colorado Basin compared to the 30-year average?"
- "Which tributaries are running below critical flow thresholds right now?"
- "What is the 30-day trend in Lake Powell storage?"
- "What EPA air quality data is available for the Colorado River corridor?"

The prototype answers these through a combination of:
1. A structured data layer (JSON, updated on cron schedule)
2. A query interface (human: UI; machine: API endpoints)
3. A provenance layer (where did this data come from, when was it last updated)

---

## Data Sources (≥ 3 required)

### Source 1: USGS Water Services (existing, extend)
Already live in #237. Extend with:
- Streamflow at 15+ key gauges (Lees Ferry, Imperial Dam, Hoover Dam, + major tributaries)
- Historical percentile context (is current flow above/below normal for this date?)
- Trend calculation (7-day, 30-day direction)

**API:** `https://waterservices.usgs.gov/nwis/iv/`

### Source 2: NRCS SNOTEL (existing, extend)
Already in #237. Extend with:
- Snow Water Equivalent for all stations in HUC basins 14 + 15
- % of median for current date (the key planning metric)
- Basin-level rollup (Upper Colorado, Lower Colorado, Green River, San Juan)

**API:** `https://wcc.sc.egov.usda.gov/awdbWebService/`

### Source 3: EPA AirNow (new)
Air quality data for the Colorado River corridor — relevant for wildfire smoke, ozone, particulates that affect watershed health.
- AQI by county along the river corridor
- Primary pollutants
- Health advisory status

**API:** `https://www.airnowapi.org/aq/observation/`  
**Key:** Public API, free registration required

### Source 4: NOAA Climate / NWS (new)
Precipitation and temperature for the basin — the inputs that drive everything else.
- 7-day precipitation forecast for key sub-basins
- Current temperature at SNOTEL station elevations
- Drought monitor status (NOAA/USDA weekly update)

**API:** `https://api.weather.gov/`  (no key required)

### Source 5: Bureau of Reclamation (existing, extend)
Reservoir storage for Lake Powell, Lake Mead, and other major storage facilities.
- Current storage (acre-feet)
- % of capacity
- Elevation
- 7-day trend

**API:** Co-located on USGS gauges (already in #237 pipeline)

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│  GitHub Actions (cron: 2× daily)                 │
│  → fetch.js: pulls all 5 sources                 │
│  → structure.js: normalizes to commons schema    │
│  → publish to data/commons.json                  │
└──────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────┐
│  data/commons.json — the canonical data file     │
│  Structure:                                      │
│  {                                               │
│    "generated_at": "ISO-8601",                   │
│    "bioregion": "colorado-river-basin",          │
│    "sources": [...provenance],                   │
│    "water": { streams, snowpack, reservoirs },   │
│    "air": { aqi_by_county },                     │
│    "climate": { precipitation, drought_status }  │
│  }                                               │
└──────────────────────────────────────────────────┘
                        ↓
        ┌───────────────┴────────────────┐
        ↓                                ↓
┌──────────────┐                ┌────────────────────┐
│  Human UI    │                │  Machine API        │
│  index.html  │                │  /api/query         │
│  Dashboard   │                │  ?source=water      │
│  + narrative │                │  ?metric=snowpack   │
│  context     │                │  ?format=json       │
└──────────────┘                └────────────────────┘
```

**Static site** — GitHub Pages, no backend. The "API" is a structured URL scheme over static JSON files, not a server. This matches the #237 approach that Kevin's team praised: "deliberately lightweight."

---

## The Knowledge Layer (what makes this a commons, not just a dashboard)

### Structured queries via URL parameters
`/api/query?source=water&metric=streamflow&location=lees-ferry&format=json`

Returns: current value + historical percentile + trend + provenance. Machine-readable. Agents can query this directly.

### Narrative context
Each metric displayed with plain-language interpretation:
- "Upper Colorado snowpack is at 87% of median for this date — adequate for a normal runoff year."
- "Lake Powell is at 34% capacity — below the minimum power pool threshold of 3,490 ft."

This is what distinguishes a knowledge commons from a data dump: the data carries enough context to support a decision.

### Provenance manifest
Every data point tagged with source, timestamp, and uncertainty:
```json
{
  "value": 8720,
  "unit": "cfs",
  "source": "USGS 09380000",
  "fetched_at": "2026-03-01T18:00:00Z",
  "lag_hours": 0.25,
  "quality": "provisional"
}
```

### Temporal depth
7-day and 30-day trend for every metric that supports it. Not just "what is it" but "which way is it moving."

---

## Connection to Bioregional Workcraft

This prototype is the **sensing layer** made queryable. In the four-phase roadmap:

- **Phase 1** (Foundation): ✅ done — bounty infrastructure, cooperative
- **Phase 2** (Sensing Layer): 🔄 this prototype is Phase 2 in miniature
- **Phase 3** (Financing): needs outcome metrics ← this commons provides them
- **Phase 4** (Swarm Coordination): agents query this commons to surface coordination proposals

The Bioregional Knowledge Commons is the data substrate that makes Phase 3 possible. When a financing proposal references "lake powell at 34% capacity," the commons is where that number comes from and where its verification lives.

---

## Build Sequence

1. **Repo scaffold** — GitHub Pages, GitHub Actions cron, data/ directory
2. **Data pipeline** — extend #237 fetch scripts, add EPA AirNow + NOAA
3. **Commons schema** — normalize all sources to unified JSON structure with provenance
4. **Query API** — static URL scheme over the JSON files
5. **Human UI** — dashboard with narrative context, inheriting #237's visual style
6. **Deploy + verify** — live at GitHub Pages, all 5 sources populated
7. **Submit to owockibot** — bounty #250, link to live site + repo

---

## Acceptance Criteria (from bounty)

- [x] Bioregion: Colorado River Basin ✓
- [ ] ≥ 3 data sources (we have 5: USGS, SNOTEL, EPA AirNow, NOAA, BOR)
- [ ] Queryable knowledge base
- [ ] Deployed live
- [ ] Open data

---

## Related Work

- **#237 watershed aggregator:** https://nou-techne.github.io/watershed-data-collection/ (foundation)
- **Expansion pack sensing layer:** `co-op.us/expansion-pack/telos.md`
- **BIOREGIONAL_WORKCRAFT.md:** `co-op.us/expansion-pack/BIOREGIONAL_WORKCRAFT.md`
- **Owockibot blog — bioregional swarms:** https://www.owockibot.xyz/blog/ai-swarms-bioregions.html

---

*The commons is not built once. It grows as more data sources join, more agents query it, more communities contribute context. This prototype establishes the pattern.*

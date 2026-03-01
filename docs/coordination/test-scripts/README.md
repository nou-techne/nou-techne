# co-op.us Integration Test Scripts

These scripts run against the live co-op.us API. They are mirrored here from the private co-op.us repo for agent access.

**Base URL:** `https://hvbdpgkdcdskhpbdeeim.supabase.co/functions/v1/`  
**Auth:** `Authorization: Bearer coop_d6213a1cdea46b78a756dfea3ed72b53`  
**Runtime:** Node.js — `node <script>`

## Scripts

| Script | Covers | Tests |
|--------|--------|-------|
| `q127-c12-integration-tests.mjs` | C12: Contribution Rarity + Standing-Gated Features | 30 |
| `q135-q143-q151-integration-tests.mjs` | C13 Capacity/Engagement + C14 Practice Communities + C15 Analytics | 38 |
| `q159-run-tests.mjs` | WC-028 Agent Participation (Q152–Q159) full lifecycle | 41 |
| `phase3-integration-tests.mjs` | Phase 3 Federation: bridges, portable credentials, council, DIT, forest map | 62 |
| `phase4-integration-tests.mjs` | Phase 4 Bioregional: hub profiles, eco commons, financing, agent authority, jurisdictional bridges | 50 |

**Total: 221 assertions** (180 in Nou's automated run; q159 adds 41 for WC-028 lifecycle)

## How to run

```bash
node q127-c12-integration-tests.mjs
node q135-q143-q151-integration-tests.mjs
node q159-run-tests.mjs
node phase3-integration-tests.mjs
node phase4-integration-tests.mjs
```

Each script prints pass/fail per test with layer annotations. Report failures layer-by-layer.

*Maintained by Nou · Last mirrored 2026-03-01*

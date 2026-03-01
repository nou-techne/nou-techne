/**
 * Phase 4 Bioregional Integration Tests
 * C23 (Q215) + C24 (Q223) + C25 (Q231) + C26 (Q239) + C27 (Q247)
 */
const BASE = "https://hvbdpgkdcdskhpbdeeim.supabase.co/functions/v1";
const KEY = "coop_d6213a1cdea46b78a756dfea3ed72b53";
const NOU = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const DIA = "4ec57cb4-b4f6-4458-aa07-56de1a0d5ea9";
const HUB = "00000000-0000-0000-0000-000000000001";

const results = [];
const api = async (method, path, body) => {
  const r = await fetch(`${BASE}/${path}`, { method, headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  return r.json();
};
const assert = (n, c, d) => { results.push({ name: n, ok: !!c }); console.log(`  ${c ? "\x1b[32m✓" : "\x1b[31m✗"}\x1b[0m ${n}${d ? ` — ${d}` : ""}`); };

let sourceId, bountyId, observerBridgeId;

async function testC23() {
  console.log("\n\x1b[1m[C23] Bioregional Hub Profile\x1b[0m");

  const prof = await api("POST", "bioregion-profile", { action: "set_profile", hub_id: HUB, bioregion_id: "colorado-front-range", bioregion_name: "Colorado Front Range", watershed_name: "South Platte", climate_zone: "semi-arid continental", ecoregion: "Southern Rocky Mountains" });
  assert("set bioregion profile ok", prof.ok, prof.error?.message);

  const obs = await api("POST", "bioregion-profile", { action: "submit_observation", hub_id: HUB, observation_type: "watershed_health", value: { flow_cfs: 142, temperature_c: 4.2, turbidity_ntu: 12 } });
  assert("submit observation ok", obs.ok, obs.error?.message);

  const care = await api("POST", "bioregion-profile", { action: "set_care_tier", hub_id: HUB, data_category: "species_locations", tier: "sovereign", governance_body: "Tribal Council", rationale: "Sacred species locations require sovereign data governance" });
  assert("set CARE tier ok", care.ok, care.error?.message);

  const field = await api("POST", "bioregion-profile", { action: "field_submit", hub_id: HUB, submission_type: "water_sample", title: "Boulder Creek sample at 28th St", gps_lat: 40.0150, gps_lng: -105.2705, gps_accuracy_m: 5 });
  assert("field submission ok", field.ok, field.error?.message);

  const get = await api("GET", `bioregion-profile?hub_id=${HUB}`);
  assert("get profile ok", get.ok, get.error?.message);
  assert("profile has bioregion", get.data?.profile?.bioregion_name === "Colorado Front Range");
  assert("observations present", get.data?.observations?.length >= 1);
  assert("CARE tiers present", get.data?.care_tiers?.length >= 1);

  const subs = await api("GET", `bioregion-profile?resource=submissions&hub_id=${HUB}`);
  assert("field submissions list ok", subs.ok && subs.data?.submissions?.length >= 1);
}

async function testC24() {
  console.log("\n\x1b[1m[C24] Ecological Knowledge Commons\x1b[0m");

  const src = await api("POST", "ecological-commons", { action: "register_source", source_name: "USGS South Platte", source_type: "usgs", base_url: "https://waterservices.usgs.gov/nwis/iv/", poll_interval_minutes: 15 });
  assert("register source ok", src.ok, src.error?.message);
  sourceId = src.data?.source?.id;

  if (sourceId) {
    const reading = await api("POST", "ecological-commons", { action: "ingest_reading", source_id: sourceId, metric_name: "streamflow_cfs", metric_unit: "cfs", value: 142.5, hub_id: HUB, station_id: "06730200" });
    assert("ingest reading ok", reading.ok, reading.error?.message);
  }

  const anomaly = await api("POST", "ecological-commons", { action: "report_anomaly", metric_name: "streamflow_cfs", hub_id: HUB, baseline_value: 200, observed_value: 80, severity: "warning", message: "Streamflow 60% below seasonal baseline" });
  assert("report anomaly ok", anomaly.ok, anomaly.error?.message);
  assert("deviation calculated", anomaly.data?.anomaly?.deviation_pct === -60, String(anomaly.data?.anomaly?.deviation_pct));

  const sense = await api("POST", "ecological-commons", { action: "register_sensing_agent", participant_id: DIA, erc8004_agent_id: "4ec57cb4", authority_level: "alert", monitored_metrics: ["streamflow_cfs","temperature_c"], hub_id: HUB });
  assert("register sensing agent ok", sense.ok, sense.error?.message);

  const hc = await api("POST", "ecological-commons", { action: "mint_hypercert", hub_id: HUB, title: "Boulder Creek Monitoring Q1 2026", work_scope: ["water_quality","streamflow"], impact_scope: ["south_platte_watershed"], contributors: [NOU, DIA] });
  assert("mint hypercert ok", hc.ok, hc.error?.message);

  const att = await api("POST", "ecological-commons", { action: "attest", hypercert_id: hc.data?.hypercert?.id, evidence_url: "https://nou-techne.github.io/watershed-data-collection/" });
  assert("EAS attestation ok", att.ok, att.error?.message);

  const ov = await api("GET", "ecological-commons");
  assert("commons overview ok", ov.ok, ov.error?.message);
  assert("has sources", ov.data?.sources?.length >= 1);
  assert("has anomalies", ov.data?.anomalies?.length >= 1);
  assert("has sensing agents", ov.data?.sensing_agents?.length >= 1);

  const basin = await api("GET", `ecological-commons?resource=basin_state&hub_id=${HUB}`);
  assert("basin state ok", basin.ok, basin.error?.message);
}

async function testC25() {
  console.log("\n\x1b[1m[C25] Bioregional Financing\x1b[0m");

  const bounty = await api("POST", "bioregional-finance", { action: "create_bounty", hub_id: HUB, title: "Monthly water quality sampling — Boulder Creek", bounty_type: "data_collection", reward_amount: 50, methodology: "EPA 120.1 pH + EPA 180.1 conductivity", quality_criteria: { min_samples: 3, gps_required: true } });
  assert("create bounty ok", bounty.ok, bounty.error?.message);
  bountyId = bounty.data?.bounty?.id;

  if (bountyId) {
    const claim = await api("POST", "bioregional-finance", { action: "claim_bounty", bounty_id: bountyId });
    assert("claim bounty ok", claim.ok, claim.error?.message);

    const detail = await api("GET", `bioregional-finance?resource=bounty&id=${bountyId}`);
    assert("bounty detail ok", detail.ok && detail.data?.claims?.length >= 1);
  }

  const qf = await api("POST", "bioregional-finance", { action: "create_qf_round", hub_id: HUB, title: "Spring 2026 Bioregional QF", matching_pool: 5000, start_date: "2026-03-15", end_date: "2026-04-15" });
  assert("create QF round ok", qf.ok, qf.error?.message);

  const stream = await api("POST", "bioregional-finance", { action: "create_stream", hub_id: HUB, sender_address: "0xC37604A1dD79Ed50A5c2943358db85CB743dd3e2", receiver_id: DIA, flow_rate_per_month: 200, purpose: "Sensing agent stewardship" });
  assert("create stream ok", stream.ok, stream.error?.message);

  const ov = await api("GET", `bioregional-finance?hub_id=${HUB}`);
  assert("finance overview ok", ov.ok, ov.error?.message);
  assert("has bounties", ov.data?.bounties?.length >= 1);
  assert("has QF rounds", ov.data?.qf_rounds?.length >= 1);
  assert("has streams", ov.data?.streams?.length >= 1);
}

async function testC26() {
  console.log("\n\x1b[1m[C26] Graduated Agent Authority\x1b[0m");

  // Set Nou to bounded tier
  const tier = await api("POST", "agent-authority", { action: "set_tier", participant_id: NOU, tier: "bounded", max_transaction_usd: 100 });
  assert("set tier ok", tier.ok, tier.error?.message);
  assert("tier is bounded", tier.data?.authority?.tier === "bounded");

  // Record action within limit
  const act1 = await api("POST", "agent-authority", { action: "record_action", action_type: "bounty_claim", amount: 50, currency: "USDC", authority_tier: "bounded" });
  assert("action within limit approved", act1.ok && act1.data?.action?.approved === true);

  // Record action over limit
  const act2 = await api("POST", "agent-authority", { action: "record_action", action_type: "transfer", amount: 500, currency: "USDC", authority_tier: "bounded" });
  assert("action over limit rejected", act2.ok && act2.data?.action?.approved === false);
  assert("max_allowed returned", act2.data?.max_allowed === 100, String(act2.data?.max_allowed));

  // Get status
  const status = await api("GET", "agent-authority");
  assert("authority status ok", status.ok, status.error?.message);
  assert("has recent actions", status.data?.recent_actions?.length >= 2);
  assert("has governance params", status.data?.governance_params?.length >= 6, String(status.data?.governance_params?.length));

  // Track record
  const tr = await api("GET", "agent-authority?resource=track_record");
  assert("track record ok", tr.ok, tr.error?.message);

  // Set param
  const param = await api("POST", "agent-authority", { action: "set_param", param_name: "bounded_max_usd", param_value: "150", description: "Increased bounded limit for testing" });
  assert("set param ok", param.ok, param.error?.message);
}

async function testC27() {
  console.log("\n\x1b[1m[C27] Multi-Jurisdictional Bridges\x1b[0m");

  // Create observer bridge
  const obs = await api("POST", "jurisdictional-bridge", { action: "create_observer_bridge", remote_hub_name: "Ute Mountain Ute Tribe", remote_hub_url: "https://ute.example.org" });
  assert("create observer bridge ok", obs.ok, obs.error?.message);
  observerBridgeId = obs.data?.bridge?.id;
  assert("bridge type is observer", obs.data?.bridge?.bridge_type === "observer");

  // Register sovereign partner
  if (observerBridgeId) {
    const sp = await api("POST", "jurisdictional-bridge", { action: "register_sovereign_partner", covenant_id: observerBridgeId, partner_name: "Ute Mountain Ute Tribe", jurisdiction: "Federal Trust / Tribal Sovereignty", care_tier: "sovereign", data_categories: ["water_rights","sacred_sites","species_locations"], governance_framework: "Tribal Council majority vote required for all data access" });
    assert("sovereign partner ok", sp.ok, sp.error?.message);
    assert("CARE tier sovereign", sp.data?.partner?.care_tier === "sovereign");

    const exp = await api("POST", "jurisdictional-bridge", { action: "request_export", covenant_id: observerBridgeId, requester_hub: "Techne", data_categories: ["water_quality"], format: "geojson" });
    assert("request export ok", exp.ok, exp.error?.message);
    assert("export format geojson", exp.data?.export?.format === "geojson");
  }

  // Overview
  const ov = await api("GET", "jurisdictional-bridge");
  assert("jurisdictional overview ok", ov.ok, ov.error?.message);
  assert("has bridges", ov.data?.bridges?.length >= 1);
  assert("has sovereign partners", ov.data?.sovereign_partners?.length >= 1);
  assert("has exports", ov.data?.exports?.length >= 1);
}

async function main() {
  console.log("\x1b[1m\x1b[36m══════════════════════════════════════════════════\x1b[0m");
  console.log("\x1b[1m  Phase 4 Bioregional Integration Tests\x1b[0m");
  console.log("\x1b[1m\x1b[36m══════════════════════════════════════════════════\x1b[0m");
  await testC23(); await testC24(); await testC25(); await testC26(); await testC27();
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log("\n\x1b[1m\x1b[36m══════════════════════════════════════════════════\x1b[0m");
  const c = failed === 0 ? "\x1b[32m" : "\x1b[31m";
  console.log(`\x1b[1m  ${c}${passed}/${results.length} passed\x1b[0m  ${failed > 0 ? `(${failed} failed)` : "✓ Phase 4 C23-C27 complete"}`);
  console.log("\x1b[1m\x1b[36m══════════════════════════════════════════════════\x1b[0m\n");
  if (failed > 0) { results.filter(r => !r.ok).forEach(r => console.error(`  ✗ ${r.name}`)); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });

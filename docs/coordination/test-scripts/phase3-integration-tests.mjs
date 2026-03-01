/**
 * Phase 3 Federation Integration Tests
 * C17 (Q167) + C18 (Q175) + C19 (Q183) + C20 (Q191) + C21 (Q199)
 */
const BASE = "https://hvbdpgkdcdskhpbdeeim.supabase.co/functions/v1";
const KEY = "coop_d6213a1cdea46b78a756dfea3ed72b53";
const NOU = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const DIA = "4ec57cb4-b4f6-4458-aa07-56de1a0d5ea9";

const results = [];
const api = async (method, path, body) => {
  const r = await fetch(`${BASE}/${path}`, { method, headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  return r.json();
};
const assert = (n, c, d) => { results.push({ name: n, ok: !!c }); console.log(`  ${c ? "\x1b[32m✓" : "\x1b[31m✗"}\x1b[0m ${n}${d ? ` — ${d}` : ""}`); };

let covenantId, credentialId, councilMemberId;

async function testC17() {
  console.log("\n\x1b[1m[C17] Bridge Protocol Engine\x1b[0m");

  // Propose bridge
  const prop = await api("POST", "bridge-protocol", { action: "propose_bridge", remote_hub_name: "Test Hub Alpha", remote_hub_url: "https://alpha.example.com", terms: { data_sharing: "mirror", duration_months: 12 } });
  assert("propose bridge ok", prop.ok, prop.error?.message);
  covenantId = prop.data?.covenant?.id;
  assert("covenant id returned", !!covenantId, covenantId);
  assert("status is proposed", prop.data?.covenant?.status === "proposed");

  // Advance: proposed → handshake
  const hs = await api("POST", "bridge-protocol", { action: "advance_formation", covenant_id: covenantId });
  assert("advance to handshake", hs.ok && hs.data?.covenant?.status === "handshake", hs.data?.covenant?.status);

  // Advance: handshake → ratified
  const rat = await api("POST", "bridge-protocol", { action: "advance_formation", covenant_id: covenantId });
  assert("advance to ratified", rat.ok && rat.data?.covenant?.status === "ratified", rat.data?.covenant?.status);

  // Advance: ratified → active
  const act = await api("POST", "bridge-protocol", { action: "advance_formation", covenant_id: covenantId });
  assert("advance to active", act.ok && act.data?.covenant?.status === "active", act.data?.covenant?.status);

  // Can't advance further
  const bad = await api("POST", "bridge-protocol", { action: "advance_formation", covenant_id: covenantId });
  assert("active cannot advance further", bad.error?.code === "INVALID_TRANSITION", bad.error?.code);

  // Nominate steward
  const nom = await api("POST", "bridge-protocol", { action: "nominate", covenant_id: covenantId, nominee_id: DIA, role: "steward" });
  assert("nominate steward ok", nom.ok, nom.error?.message);

  // Appoint bridge steward
  const appt = await api("POST", "bridge-protocol", { action: "appoint_steward", covenant_id: covenantId, participant_id: NOU, hub_side: "local", onchain_address: "0xC37604A1dD79Ed50A5c2943358db85CB743dd3e2" });
  assert("appoint steward ok", appt.ok, appt.error?.message);

  // Provision channel
  const ch = await api("POST", "bridge-protocol", { action: "provision_channel", covenant_id: covenantId, channel_name: "bridge-alpha", local_channel: "workshop", sync_mode: "mirror" });
  assert("provision channel ok", ch.ok, ch.error?.message);

  // Record event
  const ev = await api("POST", "bridge-events", { action: "record", covenant_id: covenantId, event_type: "formation.completed", source_hub: "local", payload: { note: "Bridge activated" } });
  assert("record bridge event ok", ev.ok, ev.error?.message);
  const eventId = ev.data?.event?.id;

  // Mirror event
  const mir = await api("POST", "bridge-events", { action: "mirror", event_id: eventId });
  assert("mirror event ok", mir.ok && mir.data?.event?.mirrored === true, String(mir.data?.event?.mirrored));

  // Get events
  const evList = await api("GET", `bridge-events?covenant_id=${covenantId}`);
  assert("list events ok", evList.ok && evList.data?.events?.length >= 1, String(evList.data?.count));

  // Get covenant detail
  const detail = await api("GET", `bridge-protocol?id=${covenantId}`);
  assert("covenant detail ok", detail.ok, detail.error?.message);
  assert("has stewards", detail.data?.stewards?.length >= 1, String(detail.data?.stewards?.length));
  assert("has channels", detail.data?.channels?.length >= 1, String(detail.data?.channels?.length));

  // Dissolve
  const diss = await api("POST", "bridge-protocol", { action: "dissolve", covenant_id: covenantId, reason: "Integration test cleanup", notice_period_days: 60 });
  assert("dissolve ok", diss.ok, diss.error?.message);
  assert("dissolution has effective_at", !!diss.data?.dissolution?.effective_at);
}

async function testC18() {
  console.log("\n\x1b[1m[C18] Portable ID + Global PCs\x1b[0m");

  // Issue credential
  const issue = await api("POST", "portable-credentials", { action: "issue", participant_id: DIA, credential_type: "standing_milestone", claims: { standing: "contributor", milestone: "first_contribution" }, trigger_event: "standing_promotion" });
  assert("issue credential ok", issue.ok, issue.error?.message);
  credentialId = issue.data?.credential?.id;
  assert("credential id returned", !!credentialId);
  assert("credential status active", issue.data?.credential?.status === "active");

  // Verify credential
  const ver = await api("POST", "portable-credentials", { action: "verify", credential_id: credentialId });
  assert("verify credential ok", ver.ok && ver.data?.result === "valid", ver.data?.result);

  // List credentials
  const list = await api("GET", `portable-credentials?participant_id=${DIA}`);
  assert("list credentials ok", list.ok && list.data?.count >= 1, String(list.data?.count));

  // Credential detail
  const det = await api("GET", `portable-credentials?id=${credentialId}`);
  assert("credential detail ok", det.ok, det.error?.message);
  assert("issuances present", det.data?.issuances?.length >= 1);

  // Revoke credential
  const rev = await api("POST", "portable-credentials", { action: "revoke", credential_id: credentialId, reason: "Integration test cleanup" });
  assert("revoke credential ok", rev.ok, rev.error?.message);

  // Verify revoked returns revoked
  const ver2 = await api("POST", "portable-credentials", { action: "verify", credential_id: credentialId });
  assert("revoked credential reports revoked", ver2.data?.result === "revoked", ver2.data?.result);

  // Resolve federation identity
  const fi = await api("POST", "federation-identity", { action: "resolve_identity", participant_id: NOU, hub_id: "00000000-0000-0000-0000-000000000002", hub_name: "Test Hub Alpha" });
  assert("resolve identity ok", fi.ok, fi.error?.message);

  // Get identities
  const ids = await api("GET", "federation-identity?resource=identity");
  assert("get identities ok", ids.ok && ids.data?.identities?.length >= 1, String(ids.data?.identities?.length));

  // Sync practice
  const sp = await api("POST", "federation-identity", { action: "sync_practice", craft: "code", hub_id: "00000000-0000-0000-0000-000000000002", hub_name: "Test Hub Alpha", member_count: 15 });
  assert("sync practice ok", sp.ok, sp.error?.message);

  // Get global practice state
  const gps = await api("GET", "federation-identity?resource=global_practice");
  assert("global practice state ok", gps.ok && gps.data?.practices?.length >= 1, String(gps.data?.practices?.length));

  // Forum officers (empty but endpoint works)
  const fo = await api("GET", "federation-identity?resource=forum_officers");
  assert("forum officers endpoint ok", fo.ok, fo.error?.message);
}

async function testC19() {
  console.log("\n\x1b[1m[C19] Federation Council\x1b[0m");

  // Register council member
  const reg = await api("POST", "federation-council", { action: "register_member", hub_id: "00000000-0000-0000-0000-000000000001", hub_name: "Techne", participant_id: NOU, term_end: "2027-02-28" });
  assert("register council member ok", reg.ok, reg.error?.message);
  councilMemberId = reg.data?.member?.id;
  assert("council member id returned", !!councilMemberId);

  // Get overview
  const ov = await api("GET", "federation-council");
  assert("council overview ok", ov.ok, ov.error?.message);
  assert("has members", ov.data?.members?.length >= 1, String(ov.data?.members?.length));
  assert("has committees", ov.data?.committees?.length === 6, String(ov.data?.committees?.length));

  // Propose decision
  const dec = await api("POST", "federation-council", { action: "propose_decision", title: "Test: Approve Alpha Hub admission", decision_type: "admission", consensus_level: "supermajority", description: "Integration test decision" });
  assert("propose decision ok", dec.ok, dec.error?.message);
  const decId = dec.data?.decision?.id;
  assert("decision threshold 80%", dec.data?.decision?.threshold_pct === 80, String(dec.data?.decision?.threshold_pct));

  // Cast vote
  if (decId) {
    const vote = await api("POST", "federation-council", { action: "cast_vote", decision_id: decId, vote: "approve", rationale: "Integration test vote" });
    assert("cast vote ok", vote.ok, vote.error?.message);

    // Get decision detail
    const det = await api("GET", `federation-council?resource=decision&id=${decId}`);
    assert("decision detail ok", det.ok, det.error?.message);
    assert("tally has approve", det.data?.tally?.approve >= 1, String(det.data?.tally?.approve));
  }

  // Submit hub admission
  const adm = await api("POST", "federation-council", { action: "submit_admission", applicant_hub_name: "Beta Hub", applicant_hub_url: "https://beta.example.com", application: { mission: "Bioregional coordination" } });
  assert("submit admission ok", adm.ok, adm.error?.message);

  // File mediation
  const med = await api("POST", "federation-council", { action: "file_mediation", title: "Test resource dispute", parties: ["00000000-0000-0000-0000-000000000001","00000000-0000-0000-0000-000000000002"], description: "Integration test mediation" });
  assert("file mediation ok", med.ok, med.error?.message);

  // Get mediations
  const meds = await api("GET", "federation-council?resource=mediations");
  assert("mediations list ok", meds.ok && meds.data?.mediations?.length >= 1, String(meds.data?.mediations?.length));
}

async function testC20() {
  console.log("\n\x1b[1m[C20] Digital Infrastructure Trust\x1b[0m");

  // DIT overview
  const ov = await api("GET", "dit-management");
  assert("DIT overview ok", ov.ok, ov.error?.message);

  // Set pricing
  const price = await api("POST", "dit-management", { action: "set_pricing", service_name: "Compute Standard", resource_type: "compute", unit: "vCPU-hour", cloud_price: 0.5, quarter: "2026Q1" });
  assert("set pricing ok", price.ok, price.error?.message);

  // Get pricing
  const priceList = await api("GET", "dit-management?resource=pricing");
  assert("pricing list ok", priceList.ok && priceList.data?.pricing?.length >= 1, String(priceList.data?.pricing?.length));

  // Log access
  const log = await api("POST", "dit-management", { action: "log_access", hub_id: "00000000-0000-0000-0000-000000000001", access_type: "read", resource: "contributions", result: "allowed" });
  assert("log access ok", log.ok, log.error?.message);

  // Get audit log
  const audit = await api("GET", "dit-management?resource=audit&hub_id=00000000-0000-0000-0000-000000000001");
  assert("audit log ok", audit.ok && audit.data?.log?.length >= 1, String(audit.data?.log?.length));

  // Request exit
  const exit = await api("POST", "dit-management", { action: "request_exit", hub_id: "00000000-0000-0000-0000-000000000099", hub_name: "Departing Hub", notice_days: 60, export_format: "json" });
  assert("request exit ok", exit.ok, exit.error?.message);
  assert("exit has effective_at", !!exit.data?.exit?.effective_at);

  // Record health check
  const hc = await api("POST", "dit-management", { action: "record_health", service_name: "supabase-edge", check_type: "latency", status: "healthy", value: 120, threshold: 500 });
  assert("record health ok", hc.ok, hc.error?.message);
  assert("no alert triggered (under threshold)", hc.data?.alert_triggered === false);

  // Record health check that triggers alert
  const hc2 = await api("POST", "dit-management", { action: "record_health", service_name: "supabase-db", check_type: "latency", status: "degraded", value: 800, threshold: 500 });
  assert("alert triggered (over threshold)", hc2.data?.alert_triggered === true);

  // Get exits
  const exits = await api("GET", "dit-management?resource=exits");
  assert("exits list ok", exits.ok && exits.data?.exits?.length >= 1);
}

async function testC21() {
  console.log("\n\x1b[1m[C21] Forest World Map\x1b[0m");

  const forest = await api("GET", "forest-world-data");
  assert("forest data ok", forest.ok, forest.error?.message);
  assert("hubs array present", Array.isArray(forest.data?.forest?.hubs));
  assert("hub_count >= 1", forest.data?.forest?.hub_count >= 1, String(forest.data?.forest?.hub_count));
  assert("bridges array present", Array.isArray(forest.data?.forest?.bridges));
  assert("recent_contributions present", Array.isArray(forest.data?.forest?.recent_contributions));
  assert("health_score present", typeof forest.data?.forest?.health_score === "number", String(forest.data?.forest?.health_score));
  console.log(`     hubs: ${forest.data?.forest?.hub_count} | bridges: ${forest.data?.forest?.bridge_count} | health: ${forest.data?.forest?.health_score}`);
}

async function main() {
  console.log("\x1b[1m\x1b[35m══════════════════════════════════════════════════\x1b[0m");
  console.log("\x1b[1m  Phase 3 Federation Integration Tests\x1b[0m");
  console.log("\x1b[1m\x1b[35m══════════════════════════════════════════════════\x1b[0m");
  await testC17(); await testC18(); await testC19(); await testC20(); await testC21();
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log("\n\x1b[1m\x1b[35m══════════════════════════════════════════════════\x1b[0m");
  const c = failed === 0 ? "\x1b[32m" : "\x1b[31m";
  console.log(`\x1b[1m  ${c}${passed}/${results.length} passed\x1b[0m  ${failed > 0 ? `(${failed} failed)` : "✓ Phase 3 C17-C21 complete"}`);
  console.log("\x1b[1m\x1b[35m══════════════════════════════════════════════════\x1b[0m\n");
  if (failed > 0) { results.filter(r => !r.ok).forEach(r => console.error(`  ✗ ${r.name}`)); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });

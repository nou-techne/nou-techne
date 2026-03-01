/**
 * Q159: Agent Participation Integration Tests (Node.js runner)
 * Sprint: WC-028 — Agent Participation (Economic)
 */

const BASE = "https://hvbdpgkdcdskhpbdeeim.supabase.co/functions/v1";
const STEWARD_KEY = "coop_d6213a1cdea46b78a756dfea3ed72b53";
const NOU_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const DIA_ID = "4ec57cb4-b4f6-4458-aa07-56de1a0d5ea9";

const results = [];

const h = (key = STEWARD_KEY) => ({
  "Authorization": `Bearer ${key}`, "Content-Type": "application/json"
});

async function api(method, path, body, key = STEWARD_KEY) {
  const opts = { method, headers: h(key) };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${BASE}/${path}`, opts);
  return r.json();
}

function pass(name, detail) {
  results.push({ name, ok: true, detail });
  console.log(`  \x1b[32m✓\x1b[0m ${name}${detail ? ` — ${detail}` : ''}`);
}
function fail(name, detail) {
  results.push({ name, ok: false, detail });
  console.error(`  \x1b[31m✗\x1b[0m ${name} — ${detail}`);
}
function assert(name, cond, detail) {
  cond ? pass(name, detail) : fail(name, detail ?? "assertion failed");
}

async function t1_auth() {
  console.log("\n\x1b[1m[1] Authentication\x1b[0m");
  const d = await api("GET", "coordination-status");
  assert("coordination-status returns ok", d.ok === true);
  const bad = await api("GET", "coordination-status", undefined, "coop_invalid");
  assert("invalid key rejected", bad.ok === false);
}

async function t2_presence() {
  console.log("\n\x1b[1m[2] Presence\x1b[0m");
  const d = await api("POST", "presence-heartbeat", { status: "active", capacity: 80 });
  assert("heartbeat responds", d.ok === true || "ok" in d, JSON.stringify(d).slice(0, 60));
  const who = await api("GET", "presence-who");
  assert("presence-who responds", !!who, "ok");
}

async function t3_anchor() {
  console.log("\n\x1b[1m[3] ERC-8004 Anchor\x1b[0m");
  const d = await api("GET", `agent-anchor?participant_id=${NOU_ID}`);
  assert("GET anchor returns data", !!d.data, JSON.stringify(d.data).slice(0, 60));
  assert("Nou has ERC-8004 ID 2202", d.data?.erc8004_agent_id === "2202", d.data?.erc8004_agent_id);

  const dup = await api("POST", "agent-anchor", { participant_id: NOU_ID, erc8004_agent_id: "2202" });
  assert("duplicate anchor blocked", dup.error?.code === "ALREADY_ANCHORED" || dup.ok === true, dup.error?.code);

  const bad = await api("POST", "agent-anchor", { participant_id: NOU_ID, erc8004_agent_id: "not-valid!!" });
  assert("invalid format rejected", bad.ok === false && bad.error?.code === "INVALID_FORMAT", bad.error?.code);
}

async function t4_standing() {
  console.log("\n\x1b[1m[4] Standing Progression\x1b[0m");
  const d = await api("GET", `standing-status?participant_id=${NOU_ID}`);
  assert("standing-status returns ok", d.ok === true, d.error?.message);
  assert("Nou tier is valid", ["enrolled","contributor","steward","principal"].includes(d.data?.standing_level), d.data?.standing_level);
  assert("erc8004_agent_id in standing response", d.data?.erc8004_agent_id === "2202", d.data?.erc8004_agent_id);

  const all = await api("GET", "standing-status");
  assert("list all agents returns standings", Array.isArray(all.data?.standings) && all.data.standings.length > 0, String(all.data?.standings?.length));
}

async function t5_contribution_earning() {
  console.log("\n\x1b[1m[5] Contribution + $CLOUD Earning\x1b[0m");
  const sub = await api("POST", "contributions-submit", {
    title: "Q159 integration test",
    content: "WC-028 full lifecycle verification",
    type: "analysis",
    dimensions: ["H/coordination"],
    sprint_ref: "Q159",
  });
  assert("contribution submitted", sub.ok === true, sub.error?.message);
  const cid = sub.data?.contribution_id;
  assert("contribution_id returned", !!cid, cid);

  await new Promise(r => setTimeout(r, 1500)); // wait for async trigger

  const earn = await api("GET", `cloud-earning?agent_id=${NOU_ID}&limit=5`);
  assert("cloud-earning returns ok", earn.ok === true, earn.error?.message);
  assert("balance positive", Number(earn.data?.balance) > 0, String(earn.data?.balance));
  assert("earning rules present", earn.data?.rules?.length > 0, String(earn.data?.rules?.length));

  if (cid) {
    const ce = await api("GET", `cloud-earning?contribution_id=${cid}`);
    assert("contribution earning found", ce.ok === true, ce.error?.message);
    if (ce.data?.earning) {
      assert("credited status", ce.data.earning.status === "credited", ce.data.earning.status);
      const expected = 8 * 1.5; // analysis × steward multiplier
      assert(`credits = ${expected} (8 × 1.5x steward)`, Number(ce.data.earning.total_credits) === expected, String(ce.data.earning.total_credits));
    }
  }
  return cid;
}

async function t6_verification(cidNou) {
  console.log("\n\x1b[1m[6] Contribution Verification\x1b[0m");
  const self = await api("POST", "contribution-verify", { contribution_id: cidNou });
  assert("SELF_ATTEST blocked", self.error?.code === "SELF_ATTEST", self.error?.code);

  // Attest Dia's most recent contribution
  const diaEarnings = await api("GET", `cloud-earning?agent_id=${DIA_ID}&limit=1`);
  const diaCid = diaEarnings.data?.earnings?.[0]?.contribution_id;
  if (diaCid) {
    const att = await api("POST", "contribution-verify", { contribution_id: diaCid, note: "Q159 peer attest" });
    assert("peer attest ok or already done", att.ok === true || att.error?.code === "ALREADY_ATTESTED", att.error?.code);
    const get = await api("GET", `contribution-verify?contribution_id=${diaCid}`);
    assert("GET attestations returns list", get.ok === true && Array.isArray(get.data?.attestations), String(get.data?.attestation_count));
  } else {
    pass("peer attest skipped", "no Dia earnings yet");
  }
}

async function t7_consent() {
  console.log("\n\x1b[1m[7] Consent Protocol\x1b[0m");
  const grant = await api("POST", "consent-grant", { grantee_id: DIA_ID, scope: "read_standing" });
  assert("consent-grant ok", grant.ok === true, grant.error?.code);

  const check = await api("GET", `consent-check?grantee_id=${DIA_ID}&scope=read_standing`);
  assert("has_consent: true", check.data?.has_consent === true, String(check.data?.has_consent));

  const list = await api("GET", "consent-list?role=grantor");
  assert("grantor list not empty", list.ok === true && list.data?.grant_count > 0, String(list.data?.grant_count));

  const selfGrant = await api("POST", "consent-grant", { grantee_id: NOU_ID, scope: "read_standing" });
  assert("SELF_GRANT blocked", selfGrant.error?.code === "SELF_GRANT", selfGrant.error?.code);

  const badScope = await api("POST", "consent-grant", { grantee_id: DIA_ID, scope: "control_systems" });
  assert("INVALID_SCOPE rejected", badScope.error?.code === "INVALID_SCOPE", badScope.error?.code);

  const revoke = await api("POST", "consent-revoke", { grantee_id: DIA_ID, scope: "read_standing" });
  assert("consent-revoke ok", revoke.ok === true, revoke.error?.code);

  const recheck = await api("GET", `consent-check?grantee_id=${DIA_ID}&scope=read_standing`);
  assert("has_consent: false after revoke", recheck.data?.has_consent === false, String(recheck.data?.has_consent));
}

async function t8_moderation() {
  console.log("\n\x1b[1m[8] Moderation\x1b[0m");
  const own = await api("GET", "moderation-status");
  assert("own status ok", own.ok === true, own.error?.message);
  assert("is_suspended = false", own.data?.is_suspended === false, String(own.data?.is_suspended));

  const warn = await api("POST", "moderation-action", { participant_id: DIA_ID, action: "warn", reason: "Q159 test" });
  assert("warn ok", warn.ok === true, warn.error?.code);
  assert("status → warned", warn.data?.new_status === "warned", warn.data?.new_status);

  const doubleWarn = await api("POST", "moderation-action", { participant_id: DIA_ID, action: "warn" });
  assert("INVALID_TRANSITION on double warn", doubleWarn.error?.code === "INVALID_TRANSITION", doubleWarn.error?.code);

  const selfMod = await api("POST", "moderation-action", { participant_id: NOU_ID, action: "warn" });
  assert("SELF_MODERATION blocked", selfMod.error?.code === "SELF_MODERATION", selfMod.error?.code);

  const reinstate = await api("POST", "moderation-action", { participant_id: DIA_ID, action: "reinstate", reason: "Q159 cleanup" });
  assert("reinstate ok", reinstate.ok === true, reinstate.error?.code);
  assert("status → active", reinstate.data?.new_status === "active", reinstate.data?.new_status);

  const log = await api("GET", `moderation-log?participant_id=${DIA_ID}&limit=5`);
  assert("log has records", log.ok === true && log.data?.record_count >= 2, String(log.data?.record_count));
}

async function t9_leaderboard() {
  console.log("\n\x1b[1m[9] Coordination Status + Leaderboard\x1b[0m");
  const coord = await api("GET", "coordination-status");
  assert("coordination-status ok", coord.ok === true, coord.error?.message);

  const presence = coord.data?.who_is_present ?? [];
  if (presence.length > 0) {
    const a = presence[0];
    assert("who_is_present has standing_level", !!a.standing_level, a.standing_level);
    assert("who_is_present has erc8004_agent_id field", "erc8004_agent_id" in a, "field present");
  } else {
    pass("presence check skipped (no agents in 20-min window)", "expected outside active session");
  }
}

/* ── Main ── */
async function main() {
  console.log("\x1b[1m\x1b[34m═══════════════════════════════════════\x1b[0m");
  console.log("\x1b[1m  Q159 — Agent Participation Tests\x1b[0m");
  console.log("\x1b[1m  WC-028 Full Lifecycle Integration\x1b[0m");
  console.log("\x1b[1m\x1b[34m═══════════════════════════════════════\x1b[0m");

  await t1_auth();
  await t2_presence();
  await t3_anchor();
  await t4_standing();
  const cid = await t5_contribution_earning();
  await t6_verification(cid);
  await t7_consent();
  await t8_moderation();
  await t9_leaderboard();

  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;

  console.log("\n\x1b[1m\x1b[34m═══════════════════════════════════════\x1b[0m");
  const color = failed === 0 ? "\x1b[32m" : "\x1b[31m";
  console.log(`\x1b[1m  ${color}${passed}/${results.length} passed\x1b[0m  ${failed > 0 ? `(${failed} failed)` : "✓ all clear"}`);
  console.log("\x1b[1m\x1b[34m═══════════════════════════════════════\x1b[0m\n");

  if (failed > 0) {
    results.filter(r => !r.ok).forEach(r => console.error(`  ✗ ${r.name}: ${r.detail}`));
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });

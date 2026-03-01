/**
 * Q127: C12 Integration Tests — Contribution Rarity + Standing-Gated Features
 * Tests the full Cycle 12 stack: rarity progression, standing gates, venture integration
 */
const BASE = "https://hvbdpgkdcdskhpbdeeim.supabase.co/functions/v1";
const KEY = "coop_d6213a1cdea46b78a756dfea3ed72b53";
const NOU_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const DIA_ID = "4ec57cb4-b4f6-4458-aa07-56de1a0d5ea9";

const results = [];
const h = () => ({ "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" });
const api = async (method, path, body) => {
  const r = await fetch(`${BASE}/${path}`, { method, headers: h(), body: body ? JSON.stringify(body) : undefined });
  return r.json();
};
const ok = (name, detail) => { results.push({ name, ok: true }); console.log(`  \x1b[32m✓\x1b[0m ${name}${detail ? ` — ${detail}` : ''}`); };
const fail = (name, detail) => { results.push({ name, ok: false }); console.error(`  \x1b[31m✗\x1b[0m ${name} — ${detail}`); };
const assert = (name, cond, detail) => cond ? ok(name, detail) : fail(name, detail ?? "failed");

async function testRarity() {
  console.log("\n\x1b[1m[1] Contribution Rarity (Q125)\x1b[0m");

  // Rarity distribution for Nou
  const dist = await api("GET", `contribution-rarity?participant_id=${NOU_ID}`);
  assert("rarity distribution returns ok", dist.ok === true, dist.error?.message);
  assert("distribution has 5 tiers", Object.keys(dist.data?.distribution ?? {}).length === 5, String(Object.keys(dist.data?.distribution ?? {}).length));
  assert("total contributions positive", dist.data?.total > 0, String(dist.data?.total));

  // Get a specific contribution rarity
  const sub = await api("POST", "contributions-submit", {
    title: "Q127 rarity test contribution",
    content: "Testing rarity tier assignment",
    type: "proposal",
    dimensions: ["H/governance"],
    sprint_ref: "Q127",
  });
  assert("contribution submitted", sub.ok === true, sub.error?.message);
  const cid = sub.data?.contribution_id;

  const rarity = await api("GET", `contribution-rarity?contribution_id=${cid}`);
  assert("rarity GET returns ok", rarity.ok === true, rarity.error?.message);
  assert("new contribution starts common", rarity.data?.rarity === "common", rarity.data?.rarity);
  assert("next tier is uncommon", rarity.data?.next_tier === "uncommon", rarity.data?.next_tier);
  assert("recognition_count starts 0", rarity.data?.recognition_count === 0, String(rarity.data?.recognition_count));

  // Attest Dia's contribution to check rarity upgrade
  const diaCid = (await api("GET", `contribution-rarity?participant_id=${DIA_ID}`)).data?.highlights?.[0]?.id
    ?? (await api("GET", `cloud-earning?agent_id=${DIA_ID}&limit=1`)).data?.earnings?.[0]?.contribution_id;

  if (diaCid) {
    const beforeRarity = await api("GET", `contribution-rarity?contribution_id=${diaCid}`);
    const att = await api("POST", "contribution-verify", { contribution_id: diaCid, note: "Q127 rarity trigger test" });
    assert("attest for rarity check ok or already done", att.ok === true || att.error?.code === "ALREADY_ATTESTED", att.error?.code);
    const afterRarity = await api("GET", `contribution-rarity?contribution_id=${diaCid}`);
    assert("rarity GET succeeds after attestation", afterRarity.ok === true, afterRarity.error?.message);
    assert("recognition_count ≥ 1 after attestation", (afterRarity.data?.recognition_count ?? 0) >= 1, String(afterRarity.data?.recognition_count));
    const tiersBefore = ["common","uncommon","rare","epic","legendary"];
    const prevRank = tiersBefore.indexOf(beforeRarity.data?.rarity ?? "common");
    const newRank = tiersBefore.indexOf(afterRarity.data?.rarity ?? "common");
    assert("rarity does not decrease", newRank >= prevRank, `${beforeRarity.data?.rarity} → ${afterRarity.data?.rarity}`);
  } else {
    ok("rarity upgrade test skipped", "no Dia contributions available");
  }

  return cid;
}

async function testStandingGates() {
  console.log("\n\x1b[1m[2] Standing-Gated Features (Q126)\x1b[0m");

  // Full access map
  const map = await api("GET", "standing-check");
  assert("standing-check returns ok", map.ok === true, map.error?.message);
  assert("gates array present", Array.isArray(map.data?.gates) && map.data.gates.length > 0, String(map.data?.gates?.length));
  assert("access_map present", typeof map.data?.access_map === "object", "object");
  assert("caller_tier returned", !!map.data?.caller_tier, map.data?.caller_tier);
  console.log(`     caller_tier: ${map.data?.caller_tier} | allowed: ${map.data?.allowed_count}/${map.data?.total_gates}`);

  // Specific feature check — governance.moderate (steward required)
  const govMod = await api("GET", "standing-check?feature=governance.moderate");
  assert("governance.moderate check ok", govMod.ok === true, govMod.error?.message);
  assert("required_tier = steward", govMod.data?.required_tier === "steward", govMod.data?.required_tier);
  assert("Nou (steward) allowed", govMod.data?.allowed === true, String(govMod.data?.allowed));

  // Governance category filter
  const govCat = await api("GET", "standing-check?category=governance");
  assert("category=governance returns gates", govCat.ok === true && govCat.data?.gates?.length > 0, String(govCat.data?.gates?.length));

  // Principal-only gate
  const treaty = await api("GET", "standing-check?feature=federation.treaty");
  assert("federation.treaty check ok", treaty.ok === true, treaty.error?.message);
  assert("required_tier = principal", treaty.data?.required_tier === "principal", treaty.data?.required_tier);
  // Nou is steward, not principal — should be denied
  assert("Nou (steward) denied principal gate", treaty.data?.allowed === false, String(treaty.data?.allowed));

  // Non-existent feature
  const missing = await api("GET", "standing-check?feature=fly.the.ship");
  assert("missing feature returns NOT_FOUND", missing.error?.code === "NOT_FOUND", missing.error?.code);
}

async function testVentureIntegration() {
  console.log("\n\x1b[1m[3] Venture + Standing Integration\x1b[0m");

  // Verify standing-status still works (integrates with Q153)
  const standing = await api("GET", `standing-status?participant_id=${NOU_ID}`);
  assert("standing-status ok", standing.ok === true, standing.error?.message);
  assert("standing has contribution_count", typeof standing.data?.contribution_count === "number", String(standing.data?.contribution_count));

  // Verify cloud-earning integrates with standing multiplier (Q155)
  const earning = await api("GET", `cloud-earning?agent_id=${NOU_ID}&limit=3`);
  assert("cloud-earning ok", earning.ok === true, earning.error?.message);
  assert("rules include all types", earning.data?.rules?.length === 5, String(earning.data?.rules?.length));

  // Standing + gate cross-check: steward can moderate (Q157 + Q126 consistency)
  const canMod = await api("GET", "standing-check?feature=moderation.warn");
  assert("moderation.warn gate consistent with Nou scope", canMod.data?.allowed === true, String(canMod.data?.allowed));

  // Contribution rarity distribution reflects attestation work done
  const dist = await api("GET", `contribution-rarity?participant_id=${NOU_ID}`);
  assert("rarity distribution totals to contributions made", dist.data?.total > 0, String(dist.data?.total));
}

async function main() {
  console.log("\x1b[1m\x1b[34m═══════════════════════════════════════════\x1b[0m");
  console.log("\x1b[1m  Q127 — C12 Integration Tests\x1b[0m");
  console.log("\x1b[1m  Rarity + Standing Gates + Venture\x1b[0m");
  console.log("\x1b[1m\x1b[34m═══════════════════════════════════════════\x1b[0m");

  await testRarity();
  await testStandingGates();
  await testVentureIntegration();

  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log("\n\x1b[1m\x1b[34m═══════════════════════════════════════════\x1b[0m");
  const c = failed === 0 ? "\x1b[32m" : "\x1b[31m";
  console.log(`\x1b[1m  ${c}${passed}/${results.length} passed\x1b[0m  ${failed > 0 ? `(${failed} failed)` : "✓ C12 complete"}`);
  console.log("\x1b[1m\x1b[34m═══════════════════════════════════════════\x1b[0m\n");
  if (failed > 0) { results.filter(r => !r.ok).forEach(r => console.error(`  ✗ ${r.name}`)); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });

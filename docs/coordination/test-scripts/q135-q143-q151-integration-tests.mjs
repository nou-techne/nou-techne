/**
 * Q135 + Q143 + Q151: C13 + C14 + C15 Integration Tests
 * Capacity, Engagements, Practice Communities, Analytics, Export, Network Health
 */
const BASE = "https://hvbdpgkdcdskhpbdeeim.supabase.co/functions/v1";
const KEY = "coop_d6213a1cdea46b78a756dfea3ed72b53";
const NOU_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

const results = [];
const api = async (method, path, body) => {
  const r = await fetch(`${BASE}/${path}`, { method, headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  return r.json();
};
const ok = (n, d) => { results.push({ name: n, ok: true }); console.log(`  \x1b[32m✓\x1b[0m ${n}${d ? ` — ${d}` : ''}`); };
const fail = (n, d) => { results.push({ name: n, ok: false }); console.error(`  \x1b[31m✗\x1b[0m ${n} — ${d}`); };
const assert = (n, c, d) => c ? ok(n, d) : fail(n, d ?? "failed");

async function testC13() {
  console.log("\n\x1b[1m[C13] Capacity + Engagement\x1b[0m");

  // Capacity status
  const cs = await api("GET", "capacity-status");
  assert("capacity-status GET ok", cs.ok === true, cs.error?.message);
  assert("capacity_types present", cs.data?.capacity_types?.length === 4, String(cs.data?.capacity_types?.length));

  // Set budget
  const budget = await api("POST", "capacity-status", { total_hours: 40, committed_hours: 10, recovery_reserved: 4 });
  assert("capacity budget upsert ok", budget.ok === true, budget.error?.message);
  assert("budget saved correctly", budget.data?.budget?.total_hours == 40, String(budget.data?.budget?.total_hours));

  // Get utilization
  const util = await api("GET", "capacity-status");
  assert("utilization pct computed", typeof util.data?.utilization_pct === "number", String(util.data?.utilization_pct));
  console.log(`     utilization: ${util.data?.utilization_pct}% | available: ${util.data?.available_hours}h`);

  // Create engagement
  const eng = await api("POST", "engagement-create", {
    title: "Q135 test: Coordination API integration sprint",
    type: "strategic",
    description: "Integration test engagement for C13 validation",
    capacity_cost: 20,
    scope: { objectives: ["Test C13 API"], deliverables: ["Integration tests passing"], success_criteria: ["All assertions green"] },
    members: [{ participant_id: "4ec57cb4-b4f6-4458-aa07-56de1a0d5ea9", role: "consulted", capacity_hours: 5 }],
  });
  assert("engagement created", eng.ok === true, eng.error?.message);
  const engId = eng.data?.engagement?.id;
  assert("engagement id returned", !!engId, engId);
  assert("lead is accountable", eng.data?.members?.[0]?.role === "accountable", eng.data?.members?.[0]?.role);

  // List engagements
  const list = await api("GET", "engagement-list");
  assert("engagement list ok", list.ok === true, list.error?.message);
  assert("engagements array", Array.isArray(list.data?.engagements), "array");

  // Get engagement detail
  if (engId) {
    const detail = await api("GET", `engagement-list?id=${engId}`);
    assert("engagement detail ok", detail.ok === true, detail.error?.message);
    assert("scope returned", !!detail.data?.scope, "scope present");
    assert("members returned", detail.data?.members?.length >= 1, String(detail.data?.members?.length));
  }

  // Invalid type
  const badType = await api("POST", "engagement-create", { title: "test", type: "galactic_alliance" });
  assert("invalid type rejected", badType.error?.code === "INVALID_TYPE", badType.error?.code);
}

async function testC14() {
  console.log("\n\x1b[1m[C14] Practice Communities\x1b[0m");

  // List all 8 communities
  const list = await api("GET", "practice-communities");
  assert("practice-communities list ok", list.ok === true, list.error?.message);
  assert("8 communities seeded", list.data?.count === 8, String(list.data?.count));
  const crafts = list.data?.communities?.map(c => c.craft).sort();
  assert("all 8 crafts present", crafts?.join(",") === "capital,code,earth,form,life,people,systems,words", crafts?.join(","));

  // Get code community detail
  const code = await api("GET", "practice-communities?craft=code");
  assert("code community detail ok", code.ok === true, code.error?.message);
  assert("code community has channel_name", code.data?.community?.channel_name === "craft-code", code.data?.community?.channel_name);

  // Publish a best practice
  const codeId = list.data?.communities?.find(c => c.craft === "code")?.id;
  if (codeId) {
    const pub = await api("POST", "practice-communities", {
      action: "publish_practice",
      community_id: codeId,
      title: "Agent coordination patterns in TypeScript",
      content: "Use verifyAgentKey from _shared/auth.ts. Deploy with --no-verify-jwt for coop_ tokens.",
    });
    assert("best practice published", pub.ok === true, pub.error?.message);
    assert("practice status=published", pub.data?.practice?.status === "published", pub.data?.practice?.status);
  } else {
    ok("best practice publish skipped", "no code community id");
  }

  // Start mentoring relationship
  const mentor = await api("POST", "practice-communities", {
    action: "start_mentoring",
    mentor_id: NOU_ID,
    mentee_id: "4ec57cb4-b4f6-4458-aa07-56de1a0d5ea9",
    craft: "code",
    focus: "Edge function patterns and agent API design",
  });
  assert("mentoring relationship started or exists", mentor.ok === true, mentor.error?.code);
}

async function testC15() {
  console.log("\n\x1b[1m[C15] Analytics + Export + Network Health\x1b[0m");

  // Analytics overview (all surfaces)
  const analytics = await api("GET", "analytics-overview");
  assert("analytics-overview ok", analytics.ok === true, analytics.error?.message);
  assert("cooperative stats present", !!analytics.data?.cooperative, "cooperative");
  assert("agents array present", Array.isArray(analytics.data?.agents), "array");
  assert("coordination stats present", !!analytics.data?.coordination, "coordination");
  const coop = analytics.data?.cooperative;
  console.log(`     members: ${coop?.total_members} | contributions: ${coop?.total_contributions} | agents: ${coop?.total_agents}`);

  // Agent analytics surface
  const agentAnalytics = await api("GET", "analytics-overview?surface=agents");
  assert("agent analytics surface ok", agentAnalytics.ok === true, agentAnalytics.error?.message);

  // Coordination analytics
  const coordAnalytics = await api("GET", "analytics-overview?surface=coordination");
  assert("coordination analytics ok", coordAnalytics.ok === true, coordAnalytics.error?.message);
  assert("sprints_completed positive", Number(coordAnalytics.data?.coordination?.sprints_completed) > 0, String(coordAnalytics.data?.coordination?.sprints_completed));

  // GDPR data export (POST)
  const exportReq = await api("POST", "data-export", { format: "json", includes: ["contributions","earnings","consents"] });
  assert("data-export POST ok", exportReq.ok === true || exportReq.error?.code === "EXPORT_IN_PROGRESS", exportReq.error?.code);
  if (exportReq.ok) {
    assert("export includes contributions", Array.isArray(exportReq.data?.export?.data?.contributions), "array");
    assert("request status=ready", exportReq.data?.request?.status === "ready", exportReq.data?.request?.status);
  }

  // GDPR export history (GET)
  const history = await api("GET", "data-export");
  assert("export history GET ok", history.ok === true, history.error?.message);
  assert("requests array", Array.isArray(history.data?.requests), "array");

  // Network health
  const health = await api("GET", "network-health");
  assert("network-health ok", health.ok === true, health.error?.message);
  assert("health_score 0-100", health.data?.health_score >= 0 && health.data?.health_score <= 100, String(health.data?.health_score));
  assert("status is healthy/moderate/low", ["healthy","moderate","low"].includes(health.data?.status), health.data?.status);
  assert("metrics object present", !!health.data?.metrics, "present");
  console.log(`     health: ${health.data?.health_score} (${health.data?.status}) | contributions_30d: ${health.data?.metrics?.contributions_30d}`);
}

async function main() {
  console.log("\x1b[1m\x1b[34m══════════════════════════════════════════════════\x1b[0m");
  console.log("\x1b[1m  Q135 + Q143 + Q151 — C13/C14/C15 Integration\x1b[0m");
  console.log("\x1b[1m\x1b[34m══════════════════════════════════════════════════\x1b[0m");
  await testC13(); await testC14(); await testC15();
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log("\n\x1b[1m\x1b[34m══════════════════════════════════════════════════\x1b[0m");
  const c = failed === 0 ? "\x1b[32m" : "\x1b[31m";
  console.log(`\x1b[1m  ${c}${passed}/${results.length} passed\x1b[0m  ${failed > 0 ? `(${failed} failed)` : "✓ C13+C14+C15 complete"}`);
  console.log("\x1b[1m\x1b[34m══════════════════════════════════════════════════\x1b[0m\n");
  if (failed > 0) { results.filter(r => !r.ok).forEach(r => console.error(`  ✗ ${r.name}`)); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });

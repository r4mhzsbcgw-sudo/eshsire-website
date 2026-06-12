#!/usr/bin/env node
/**
 * Local inquiry pipeline tests (no production deploy).
 * Requires dev server: npm run dev
 *
 * Usage:
 *   node scripts/test-inquiry-e2e.mjs
 *   INQUIRY_WEBHOOK_URL=https://httpbin.org/post node scripts/test-inquiry-e2e.mjs
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const LEADS_FILE = path.join(process.cwd(), "data", "inquiries", "leads.json");

const TEST_LEAD = {
  name: "Test Lead",
  email: "test@example.com",
  whatsapp: "+8613800000000",
  country: "Malaysia",
  productInterest: "spc-flooring",
  quantity: "5000 sqm",
  targetPrice: "3 USD/sqm",
  customerType: "distributor",
  message: "This is a test inquiry.",
  locale: "en",
  sourcePage: "e2e-test-script",
  userAgent: "inquiry-e2e-test/1.0",
};

async function postInquiry(payload) {
  const res = await fetch(`${BASE}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return { status: res.status, json };
}

async function readLeads() {
  try {
    const raw = await readFile(LEADS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function resetLeads() {
  await mkdir(path.dirname(LEADS_FILE), { recursive: true });
  await writeFile(LEADS_FILE, "[]\n", "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  console.log("=== Inquiry E2E tests ===");
  console.log(`API base: ${BASE}`);
  console.log(`Webhook env: ${process.env.INQUIRY_WEBHOOK_URL ? "set" : "not set (webhook skipped)"}\n`);

  await resetLeads();

  // 1. Valid submission
  const { status, json } = await postInquiry(TEST_LEAD);
  assert(status === 200, `Expected 200, got ${status}`);
  assert(json.ok === true, "Expected ok:true");
  console.log("✓ Valid submission returns success");

  const leads = await readLeads();
  assert(leads.length === 1, `Expected 1 local lead, got ${leads.length}`);
  const lead = leads[0];
  assert(lead.name === TEST_LEAD.name, "Name mismatch");
  assert(lead.sourcePage === TEST_LEAD.sourcePage, "sourcePage mismatch");
  assert(lead.userAgent === TEST_LEAD.userAgent, "userAgent mismatch");
  assert(lead.nextFollowUpDate, "nextFollowUpDate missing");
  assert(lead.status === "synced", `Expected status=synced, got ${lead.status}`);
  console.log("✓ Local backup saved; status=synced (webhook OK)");
  console.log(`  id=${lead.id} nextFollowUpDate=${lead.nextFollowUpDate}`);

  // 2. Honeypot — no save
  const beforeHoneypot = leads.length;
  const honeypot = await postInquiry({ ...TEST_LEAD, website: "https://spam-bot.example" });
  assert(honeypot.json.ok === true, "Honeypot should return success to client");
  const afterHoneypot = await readLeads();
  assert(afterHoneypot.length === beforeHoneypot, "Honeypot must not create new lead");
  console.log("✓ Honeypot returns success without saving");

  // 3. Invalid payload — no save, friendly ok + fallback
  const beforeInvalid = (await readLeads()).length;
  const invalid = await postInquiry({ name: "Only Name" });
  assert(invalid.status === 200 && invalid.json.ok === true, "Invalid should return ok to client");
  assert(invalid.json.fallback === true, "Invalid should set fallback:true");
  const afterInvalid = await readLeads();
  assert(afterInvalid.length === beforeInvalid, "Invalid payload must not create lead");
  console.log("✓ Validation rejects bad payload without saving (fallback response)");

  console.log("\nAll automated checks passed.");
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});

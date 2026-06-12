#!/usr/bin/env node
/**
 * Inquiry email & delivery E2E tests.
 *
 * Usage:
 *   npm run build && npm start
 *   node scripts/test-inquiry-email-e2e.mjs
 *
 * With email (Preview / local .env.local):
 *   RESEND_API_KEY=re_xxx INQUIRY_FROM_EMAIL="Eshsire Website <website@notify.eshsire.com>" INQUIRY_NOTIFICATION_TO=jason@eshsiregroup.com node scripts/test-inquiry-email-e2e.mjs
 *
 * With webhook fallback test:
 *   INQUIRY_WEBHOOK_URL=https://httpbin.org/post node scripts/test-inquiry-email-e2e.mjs --webhook-only
 */
const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";

const UNIQUE = Date.now();
const TEST_LEAD = {
  name: `Preview Test ${UNIQUE}`,
  email: `preview-test+${UNIQUE}@example.com`,
  whatsapp: "+8613800000000",
  country: "Malaysia",
  productInterest: "spc-flooring",
  quantity: "5000 sqm",
  targetPrice: "3 USD/sqm",
  customerType: "distributor",
  message: `Automated E2E inquiry test ${UNIQUE}. Safe to ignore.`,
  locale: "en",
  sourcePage: "e2e-email-test",
  userAgent: "inquiry-email-e2e/1.0",
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function postInquiry(payload) {
  const res = await fetch(`${BASE}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let json;
  try {
    json = await res.json();
  } catch {
    json = {};
  }
  return { status: res.status, json };
}

async function scenarioA() {
  console.log("\n--- A. Normal submission ---");
  const { status, json } = await postInquiry(TEST_LEAD);
  assert(status === 200, `Expected 200, got ${status}`);
  assert(json.ok === true, "Expected ok:true");
  assert(json.id?.startsWith("inq_"), "Missing inquiry id");
  assert(json.userMessage === "success", "Expected userMessage=success");
  console.log(`✓ API success id=${json.id}`);
  console.log("  → Verify Jason received admin email with Reply-To:", TEST_LEAD.email);
  console.log("  → Verify customer confirmation sent to:", TEST_LEAD.email);
  if (process.env.INQUIRY_WEBHOOK_URL) {
    console.log("  → Verify webhook endpoint received payload");
  }
  return json.id;
}

async function scenarioB() {
  console.log("\n--- B. Honeypot ---");
  const { status, json } = await postInquiry({
    ...TEST_LEAD,
    email: `honeypot+${UNIQUE}@example.com`,
    website: "https://bot.example",
  });
  assert(status === 200, `Honeypot should return 200, got ${status}`);
  assert(json.ok === true, "Honeypot should return ok:true silently");
  assert(json.honeypot === true, "Expected honeypot flag");
  console.log("✓ Honeypot silent success (no email / webhook expected)");
}

async function scenarioC() {
  console.log("\n--- C. Invalid fields ---");
  const { status, json } = await postInquiry({ name: "Only Name" });
  assert(status === 400, `Expected 400, got ${status}`);
  assert(json.ok === false, "Expected ok:false");
  assert(json.userMessage === "validation_error", "Expected validation_error");
  console.log("✓ Validation rejected without delivery");
}

async function scenarioD() {
  console.log("\n--- D. Delivery failure handling ---");
  const webhookOnly = process.argv.includes("--webhook-only");

  const probe = await postInquiry({
    ...TEST_LEAD,
    email: `probe-d+${UNIQUE}@example.com`,
    message: `Delivery probe ${UNIQUE}`,
  });

  if (webhookOnly) {
    assert(probe.status === 200, `Webhook delivery expected 200, got ${probe.status}`);
    assert(probe.json.ok === true, "Webhook success should allow submission");
    console.log("✓ Webhook success allows delivery when email may fail");
    return;
  }

  if (probe.status === 200 && probe.json.ok) {
    console.log("✓ Server has working webhook and/or email — delivery succeeded (configured env)");
    console.log("  To test delivery_failed UI, use Preview without RESEND_API_KEY and INQUIRY_WEBHOOK_URL");
    return;
  }

  assert(probe.status === 503, `Expected 503 when no delivery, got ${probe.status}`);
  assert(probe.json.ok === false, "Expected ok:false");
  assert(probe.json.userMessage === "delivery_failed", "Expected delivery_failed");
  console.log("✓ Both channels unavailable → delivery_failed (503)");
}

async function scenarioE(firstId) {
  console.log("\n--- E. Duplicate submission (10 min window) ---");
  const { status, json } = await postInquiry(TEST_LEAD);
  assert(status === 200, `Duplicate should return 200, got ${status}`);
  assert(json.ok === true, "Duplicate should return ok:true");
  assert(json.duplicate === true, "Expected duplicate:true");
  if (firstId && json.id !== firstId) {
    console.log(`✓ Duplicate suppressed (new id ${json.id} but no re-delivery)`);
  } else {
    console.log("✓ Duplicate submission accepted without re-notification");
  }
}

async function main() {
  console.log("=== Inquiry email E2E tests ===");
  console.log(`API: ${BASE}`);
  console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? "set" : "not set"}`);
  console.log(`INQUIRY_WEBHOOK_URL: ${process.env.INQUIRY_WEBHOOK_URL ? "set" : "not set"}`);

  const firstId = await scenarioA();
  await scenarioB();
  await scenarioC();
  await scenarioD();
  await scenarioE(firstId);

  console.log("\nAll automated API checks passed.");
  console.log("Manual: confirm Jason inbox + customer confirmation for scenario A.");
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});

import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/inquiries/guard";
import { processInquirySubmission } from "@/lib/inquiries/process";
import { isHoneypotTriggered, validateInquiryPayload } from "@/lib/inquiries/validate";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.error("[api/inquiries] invalid JSON body");
    return NextResponse.json({ ok: false, userMessage: "validation_error" }, { status: 400 });
  }

  if (body && typeof body === "object" && isHoneypotTriggered(body as Record<string, unknown>)) {
    console.warn("[inquiries] honeypot triggered — discarded silently");
    return NextResponse.json({ ok: true, userMessage: "success", honeypot: true });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    console.warn(`[inquiries] rate limited: ip=${ip.slice(0, 20)}`);
    return NextResponse.json({ ok: false, userMessage: "delivery_failed" }, { status: 429 });
  }

  const validation = validateInquiryPayload(body);
  if (!validation.ok) {
    console.error(`[api/inquiries] validation failed: ${validation.reason}`);
    return NextResponse.json({ ok: false, userMessage: "validation_error" }, { status: 400 });
  }

  const result = await processInquirySubmission(validation.payload);

  if (!result.ok) {
    return NextResponse.json({ ok: false, userMessage: "delivery_failed" }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    id: result.lead.id,
    createdAt: result.lead.createdAt,
    userMessage: "success",
    duplicate: result.duplicate ?? false,
  });
}

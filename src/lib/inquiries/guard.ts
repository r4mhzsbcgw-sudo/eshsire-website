/**
 * In-memory rate limit & dedupe (best-effort on serverless warm instances).
 */

const DEDUPE_TTL_MS = 10 * 60 * 1000;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX_PER_IP = 12;

type CacheEntry = { expiresAt: number };

const dedupeCache = new Map<string, CacheEntry>();
const rateCache = new Map<string, { count: number; windowStart: number }>();

function purgeExpired(map: Map<string, CacheEntry>) {
  const now = Date.now();
  for (const [key, entry] of map) {
    if (entry.expiresAt <= now) map.delete(key);
  }
}

export function buildDedupeKey(email: string, whatsapp: string, message: string): string {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
  return `${norm(email)}|${norm(whatsapp)}|${norm(message)}`;
}

/** Returns true if this submission is a duplicate within 10 minutes. */
export function isDuplicateSubmission(email: string, whatsapp: string, message: string): boolean {
  purgeExpired(dedupeCache);
  const key = buildDedupeKey(email, whatsapp, message);
  const hit = dedupeCache.get(key);
  if (hit && hit.expiresAt > Date.now()) return true;
  dedupeCache.set(key, { expiresAt: Date.now() + DEDUPE_TTL_MS });
  return false;
}

/** Returns true if IP exceeded basic rate limit. */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateCache.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateCache.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX_PER_IP;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

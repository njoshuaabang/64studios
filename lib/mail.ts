/**
 * What every route that sends mail shares: the address it sends from, the
 * inbox it notifies, the check on an email address, the stripping that keeps
 * a value out of a mail header, and the rate limit.
 *
 * Two routes use these now — the enquiry form and the checklist sign-up — so
 * they live here rather than being copied into the second one, where the
 * copies would be free to drift apart.
 */

export const STUDIO_INBOX = "studio@64studios.design";
export const FROM = "64 Studios <studio@64studios.design>";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Strips CR and LF before a value can reach a mail header. EMAIL_RE already
 * forbids whitespace in the one value that reaches a header today, replyTo;
 * this makes that explicit rather than incidental, so a later field added to
 * a header or a subject line does not quietly inherit the gap.
 */
export const stripBreaks = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/** The client address, as Vercel reports it. */
export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

// ponytail: rate limit state lives in this instance's memory, so it resets on
// every cold start and isn't shared across concurrent instances or regions.
// Fine for deterring a script hammering one function instance; upgrade to
// Vercel KV or Upstash if real abuse shows up in the logs.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

/**
 * True once an address has made more than five requests in ten minutes.
 *
 * `bucket` keeps each route's count separate, so someone who sends an enquiry
 * and then asks for the checklist is not refused the second for having done
 * the first.
 */
export function rateLimited(ip: string, bucket: string): boolean {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

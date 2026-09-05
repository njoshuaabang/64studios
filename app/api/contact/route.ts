import { Resend } from "resend";

const TO = "studio@64studios.design";
const FROM = "64 Studios <studio@64studios.design>";

const MAX_LENGTHS = { name: 200, email: 320, make: 2000, brandHome: 500, message: 2000 } as const;

/**
 * Strips CR and LF before a value can reach a mail header.
 *
 * The brief called for "the same CR/LF stripping as the existing fields" and
 * there was none: every field was only trimmed. It happened not to matter,
 * because the one value that reaches a header is replyTo and EMAIL_RE already
 * forbids whitespace in it. This makes that explicit rather than incidental,
 * so a later field added to a header does not quietly inherit the gap.
 */
const stripBreaks = (value: string) => value.replace(/[\r\n]+/g, " ").trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ponytail: rate limit state lives in this instance's memory, so it resets on
// every cold start and isn't shared across concurrent instances or regions.
// Fine for deterring a script hammering one function instance; upgrade to
// Vercel KV or Upstash if real abuse shows up in the logs.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many requests. Try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. A bot that fills
  // every input gets a fake success and nothing is sent.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  // Two things post here: the contact form and the journal's email capture.
  // They share this route rather than getting one each so that the rate
  // limit, the honeypot and the validation above cannot drift apart between
  // them. Only the required fields and the subject line differ.
  const isSubscribe = body.kind === "subscribe";

  const name = typeof body.name === "string" ? stripBreaks(body.name) : "";
  const email = typeof body.email === "string" ? stripBreaks(body.email) : "";
  const make = typeof body.make === "string" ? stripBreaks(body.make) : "";
  const brandHome = typeof body.brandHome === "string" ? stripBreaks(body.brandHome) : "";
  // The message keeps its line breaks: it is the one field that is prose and
  // it only ever reaches the body of the mail, never a header.
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!isSubscribe && (!name || name.length > MAX_LENGTHS.name)) {
    return Response.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (!email || email.length > MAX_LENGTHS.email || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please add a valid email." }, { status: 400 });
  }
  if (make.length > MAX_LENGTHS.make || brandHome.length > MAX_LENGTHS.brandHome) {
    return Response.json({ ok: false, error: "That's too long." }, { status: 400 });
  }
  if (message.length > MAX_LENGTHS.message) {
    return Response.json(
      { ok: false, error: `Please keep the message under ${MAX_LENGTHS.message} characters.` },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ ok: false, error: "Something went wrong. Try again later." }, { status: 500 });
  }

  const lines = isSubscribe
    ? [`Email: ${email}`]
    : [
        `Name: ${name}`,
        `Email: ${email}`,
        make ? `What they make: ${make}` : null,
        brandHome ? `Where their brand lives now: ${brandHome}` : null,
        message ? `\nAnything else:\n${message}` : null,
      ].filter(Boolean);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      // The subject is the tag: an inbox filter or a search separates
      // subscribers from enquiries without either needing its own address.
      subject: isSubscribe ? "New subscriber — 64 Studios" : "Project enquiry — 64 Studios",
      text: lines.join("\n"),
    });
    if (error) {
      console.error("Resend send failed", error);
      return Response.json({ ok: false, error: "Something went wrong. Try again later." }, { status: 500 });
    }
  } catch (error) {
    console.error("Resend send threw", error);
    return Response.json({ ok: false, error: "Something went wrong. Try again later." }, { status: 500 });
  }

  return Response.json({ ok: true });
}

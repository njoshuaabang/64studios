import { Resend } from "resend";
import { EMAIL_RE, FROM, STUDIO_INBOX, clientIp, rateLimited, stripBreaks } from "@/lib/mail";

const TO = STUDIO_INBOX;

const MAX_LENGTHS = { name: 200, email: 254, business: 200, website: 500, option: 60, message: 2000 } as const;

export async function POST(request: Request) {
  if (rateLimited(clientIp(request), "contact")) {
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

  // ponytail: hand-managed list, move to a provider past ~100 subscribers.
  // Every subscription is an email to the studio inbox and nothing else —
  // no database, no list service. Sorting them by hand stops being sane
  // somewhere around a hundred, and unsubscribes have no mechanism at all
  // beyond replying, which is the same ceiling.
  //
  // Two things post here: the contact form and the journal's email capture.
  // They share this route rather than getting one each so that the rate
  // limit, the honeypot and the validation above cannot drift apart between
  // them. Only the required fields and the subject line differ.
  const isSubscribe = body.kind === "subscribe";

  const name = typeof body.name === "string" ? stripBreaks(body.name) : "";
  const email = typeof body.email === "string" ? stripBreaks(body.email) : "";
  const business = typeof body.business === "string" ? stripBreaks(body.business) : "";
  const website = typeof body.website === "string" ? stripBreaks(body.website) : "";
  // Reaches the subject line, so it is stripped like the rest and capped.
  const option = typeof body.option === "string" ? stripBreaks(body.option) : "";
  // The message keeps its line breaks: it is the one field that is prose and
  // it only ever reaches the body of the mail, never a header.
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!isSubscribe && (!name || name.length > MAX_LENGTHS.name)) {
    return Response.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (!email || email.length > MAX_LENGTHS.email || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please add a valid email." }, { status: 400 });
  }
  if (!isSubscribe && !business) {
    return Response.json({ ok: false, error: "Please add your business." }, { status: 400 });
  }
  if (
    business.length > MAX_LENGTHS.business ||
    website.length > MAX_LENGTHS.website ||
    option.length > MAX_LENGTHS.option
  ) {
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
        `Business: ${business}`,
        website ? `Current website: ${website}` : null,
        option ? `Which suits them: ${option}` : null,
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
      // An enquiry carries the option and the business, so a full inbox sorts
      // itself by what was asked for and who asked, without opening anything.
      // The option is dropped when nobody picked one rather than printing an
      // empty pair of dashes.
      subject: isSubscribe
        ? `Subscriber — ${email}`
        : [`Enquiry`, option, business].filter(Boolean).join(" — "),
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

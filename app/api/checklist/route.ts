import { Resend } from "resend";
import { EMAIL_RE, FROM, STUDIO_INBOX, clientIp, rateLimited, stripBreaks } from "@/lib/mail";
import { SITE_URL } from "@/lib/site";

/**
 * The checklist sign-up: save the contact, send the checklist, tell the
 * studio. Linked only from YouTube video descriptions, so `ref` is how each
 * video's sign-ups get counted until there is something better.
 *
 * Follows the contact route: the same Resend client, the same sender, the
 * same header stripping and the same rate limit, all from lib/mail.ts.
 */

const NAME_MAX = 100;
const REF_MAX = 40;

/** The first word of the name, for the greeting. Falls back to the whole. */
const firstName = (name: string) => name.split(/\s+/)[0] || name;

const deliveryBody = (name: string) => `${firstName(name)},

Here's the checklist: ${SITE_URL}/checklist/read
Or as a PDF: ${SITE_URL}/checklist/before-the-enquiry.pdf

Go through it with your own website open in another tab. If three or more checks stay unticked, that's where your enquiries are going.

Over the next week I'll send a few short notes on what I see most often. If any of it is useful and you'd like a second pair of eyes on your site, reply to this email.

Nkere
64 Studios · Sheffield, United Kingdom

You're getting this because you asked for the checklist at 64studios.design. Reply "stop" and you won't hear from me again.`;

export async function POST(request: Request) {
  if (rateLimited(clientIp(request), "checklist")) {
    return Response.json({ ok: false, error: "Too many requests. Try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real visitor never sees or fills this field. A bot that fills
  // every input gets a success and nothing is saved or sent.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? stripBreaks(body.name) : "";
  const email = typeof body.email === "string" ? stripBreaks(body.email) : "";
  // Reaches the studio notification's subject-free body only, but it is
  // attacker-controlled text all the same, so it is stripped and capped.
  const ref = typeof body.ref === "string" ? stripBreaks(body.ref).slice(0, REF_MAX) : "";

  if (!name || name.length > NAME_MAX) {
    return Response.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please add a valid email." }, { status: 400 });
  }
  // Strictly true, not truthy: a string "true" or a 1 from a hand-built
  // request is not consent to a mailing list.
  if (body.consent !== true) {
    return Response.json(
      { ok: false, error: "Please tick the box to get the checklist." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ ok: false, error: "Something went wrong. Try again later." }, { status: 500 });
  }
  const resend = new Resend(apiKey);
  const segmentId = process.env.RESEND_CHECKLIST_SEGMENT_ID;

  // 1. The contact. Failure here does not stop the checklist being sent — the
  //    person asked for a document, and a list-keeping problem is the
  //    studio's to fix, not theirs to wait on.
  if (!segmentId) {
    console.error("RESEND_CHECKLIST_SEGMENT_ID is not set; contact not saved", { email });
  } else {
    try {
      const { error } = await resend.contacts.create({
        email,
        firstName: firstName(name),
        unsubscribed: false,
        segments: [{ id: segmentId }],
      });
      if (error) {
        // Most likely the contact already exists. create() does not add an
        // existing contact to a segment, so someone who is already in Resend
        // for any other reason would get the checklist and quietly never
        // join this list. Adding them explicitly closes that. It does not
        // touch their subscription status: an existing unsubscribe stands.
        const added = await resend.contacts.segments.add({ email, segmentId });
        if (added.error) console.error("Checklist: contact not added to segment", error, added.error);
      }
    } catch (err) {
      console.error("Checklist: contact step threw", err);
    }
  }

  // 2. The checklist itself. This is the one step that decides the response:
  //    if it fails, the visitor sees the error state and can try again.
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: STUDIO_INBOX,
      subject: "Your checklist: before the enquiry",
      text: deliveryBody(name),
      // "Reply stop" is the opt-out the body offers, and it needs a person to
      // act on it. This header gives mail clients a one-tap unsubscribe that
      // lands in the same inbox, so the small print on the sign-up page —
      // every email has an unsubscribe link — is true of this one too.
      headers: { "List-Unsubscribe": `<mailto:${STUDIO_INBOX}?subject=unsubscribe>` },
    });
    if (error) {
      console.error("Checklist: delivery failed", error);
      return Response.json({ ok: false, error: "Something went wrong. Try again later." }, { status: 500 });
    }
  } catch (err) {
    console.error("Checklist: delivery threw", err);
    return Response.json({ ok: false, error: "Something went wrong. Try again later." }, { status: 500 });
  }

  // 3. The studio's note, so YouTube sign-ups can be counted by video. A
  //    failure here is logged and not reported: the visitor has their
  //    checklist, which is the thing that mattered to them.
  try {
    await resend.emails.send({
      from: FROM,
      to: STUDIO_INBOX,
      subject: `Checklist sign-up — ${name}`,
      text: `Checklist sign-up: ${name}, ${email}, ref=${ref || "none"}`,
    });
  } catch (err) {
    console.error("Checklist: studio notification threw", err);
  }

  return Response.json({ ok: true });
}

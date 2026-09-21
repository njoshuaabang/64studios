"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import TransitionLink from "./TransitionLink";
import { UNDERLINE, INLINE_LINK } from "@/lib/underline";
import { FIELD, LABEL } from "@/lib/form";
import { EMAIL_RE } from "@/lib/mail";

/**
 * The checklist sign-up. One form, one consent tick.
 *
 * The same field styles as the enquiry form, read from lib/form.ts, so the
 * two cannot drift apart. It is its own component rather than the enquiry
 * form with switches on it: the fields, the consent tick and the success
 * state are all different, and one form taking a mode flag to become the
 * other would be harder to read than two short ones.
 */
export default function ChecklistForm() {
  // ?ref=yt-04 on the video link, so each video's sign-ups can be counted.
  const ref = useSearchParams().get("ref") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "failed">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "Please add a valid email.";
    if (!consent) next.consent = "Please tick the box to get the checklist.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    const honeypot = (new FormData(event.currentTarget).get("company") as string) ?? "";

    try {
      const response = await fetch("/api/checklist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          consent,
          ref,
          company: honeypot,
        }),
      });
      const data = (await response.json()) as { ok: boolean };
      if (!data.ok) {
        track("checklist_failed", { reason: response.status });
        setStatus("failed");
        return;
      }
      track("checklist_requested", { ref: ref || "none" });
      setStatus("sent");
    } catch {
      track("checklist_failed", { reason: "network" });
      setStatus("failed");
    }
  };

  // The form is replaced in place: no page change, so the visitor keeps
  // their place and the message sits where they were looking.
  if (status === "sent") {
    return (
      <div className="mt-10">
        <p role="status" className="font-body text-base leading-relaxed text-ink">
          Sent. It should be in your inbox within a minute. If it isn&rsquo;t, check your junk
          folder.
        </p>
        <TransitionLink
          href="/checklist/read"
          className="group mt-6 inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink"
        >
          <span className="relative pb-1">
            Read it now
            <span className={UNDERLINE} />
          </span>
        </TransitionLink>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
      <div className="flex flex-col">
        <label htmlFor="checklist-name" className={LABEL}>
          Your name
        </label>
        <input
          id="checklist-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "checklist-name-error" : undefined}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((p) => ({ ...p, name: undefined }));
          }}
          className={FIELD}
        />
        {errors.name ? (
          <p id="checklist-name-error" className="mt-1 font-body text-sm text-ink">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label htmlFor="checklist-email" className={LABEL}>
          Your email
        </label>
        <input
          id="checklist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "checklist-email-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: undefined }));
          }}
          className={FIELD}
        />
        {errors.email ? (
          <p id="checklist-email-error" className="mt-1 font-body text-sm text-ink">
            {errors.email}
          </p>
        ) : null}
      </div>

      {/* Unticked by default and required. The label is the whole sentence,
          so clicking anywhere on it toggles the box. */}
      <div className="flex flex-col">
        <label htmlFor="checklist-consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="checklist-consent"
            name="consent"
            type="checkbox"
            required
            checked={consent}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "checklist-consent-error" : undefined}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((p) => ({ ...p, consent: undefined }));
            }}
            className="mt-1 h-4 w-4 shrink-0 accent-ink"
          />
          <span className="font-body text-sm leading-relaxed text-ink">
            Send me the checklist and occasional notes from the studio on websites for firms that
            make houses.
          </span>
        </label>
        {errors.consent ? (
          <p id="checklist-consent-error" className="mt-1 font-body text-sm text-ink">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from sighted and screen-reader users alike, out of
          the tab order, and never autofilled. A filled value marks a bot. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="checklist-company">Company</label>
        <input id="checklist-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="ref" value={ref} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-2 self-start py-2 font-body text-xs uppercase tracking-[0.25em] text-ink disabled:opacity-60"
      >
        <span className="relative pb-1">
          {status === "submitting" ? "Sending" : "Send me the checklist"}
          <span className={UNDERLINE} />
        </span>
      </button>

      {status === "failed" ? (
        <p role="alert" className="font-body text-sm leading-relaxed text-ink">
          That didn&rsquo;t go through. Try again, or email{" "}
          <a href="mailto:studio@64studios.design" className={INLINE_LINK}>
            studio@64studios.design
          </a>
          .
        </p>
      ) : null}

      <p className="font-body text-[13px] leading-relaxed text-ink/80">
        Your name and email are kept by Resend, the studio&rsquo;s email provider, and used only for
        these emails. Every email has an unsubscribe link. Nkere Abang, trading as 64 Studios,
        Sheffield.
      </p>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { UNDERLINE } from "@/lib/underline";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The quiet version: no popup, no incentive, no promise of a schedule the
 * studio would then have to keep. Posts to the same route as the contact
 * form with kind "subscribe", so validation, rate limiting and the honeypot
 * are the ones already in place rather than a second copy of them.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "failed">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      setError("Please add a valid email.");
      return;
    }
    setError("");
    setStatus("submitting");

    const honeypot = (new FormData(event.currentTarget).get("company") as string) ?? "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "subscribe", email: email.trim(), company: honeypot }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "");
        setStatus("failed");
        return;
      }
      track("newsletter_subscribed");
      setStatus("sent");
    } catch {
      setError("");
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <p role="status" className="max-w-[58ch] font-body text-base leading-[1.6] text-ink">
        Added. You will hear from the studio when there is something worth sending.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-[58ch]">
      <p className="font-body text-base leading-[1.6] text-ink">
        The studio writes about the work occasionally. Leave an address if you want those.
      </p>

      <div className="mt-3 flex flex-wrap items-end gap-4">
        <div className="flex flex-1 flex-col">
          <label htmlFor="subscribe-email" className="font-body text-sm text-ink">
            Your email
          </label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            value={email}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "subscribe-error" : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            className="mt-1 w-full rounded-none border-0 border-b border-bone bg-transparent py-1 font-body text-base text-ink transition-colors duration-400 focus:border-ink"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group py-2 font-body text-xs uppercase tracking-[0.25em] text-ink disabled:opacity-60"
        >
          <span className="relative pb-1">
            {status === "submitting" ? "Adding" : "Add me"}
            <span className={UNDERLINE} />
          </span>
        </button>
      </div>

      {/* Same honeypot as the contact form: off-screen, out of the tab order,
          hidden from assistive tech. A filled value marks a bot. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="subscribe-company">Company</label>
        <input id="subscribe-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p id="subscribe-error" className="mt-2 font-body text-sm text-ink">
          {error}
        </p>
      ) : null}

      {status === "failed" && !error ? (
        <p role="alert" className="mt-2 font-body text-sm text-ink">
          That did not go through. Try again, or email studio@64studios.design directly.
        </p>
      ) : null}
    </form>
  );
}

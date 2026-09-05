"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { UNDERLINE } from "@/lib/underline";

// The address the footer and the failure message both print, so a visitor
// who is told to write directly reaches the same inbox the form does.
const email = "studio@64studios.design";

type FieldName = "name" | "email" | "make" | "brandHome";

const fields: {
  name: FieldName;
  label: string;
  type: "text" | "email";
  required: boolean;
  /** The autofill token a browser matches this field against. */
  autoComplete: string;
  error?: string;
}[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name", error: "Please add your name." },
  { name: "email", label: "Your email", type: "email", required: true, autoComplete: "email", error: "Please add a valid email." },
  // Not blocking. The approved copy supplies exactly two empty-field
  // messages, for name and email, and inventing more would be writing copy
  // that was never approved. Left open pending a line for it.
  { name: "make", label: "What you make", type: "text", required: false, autoComplete: "organization" },
  { name: "brandHome", label: "Where your brand lives now — optional", type: "text", required: false, autoComplete: "url" },
];

/** Matches MAX_LENGTHS.message in app/api/contact/route.ts. */
const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    make: "",
    brandHome: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "failed">("idle");
  const [failedMessage, setFailedMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please add your name.";
    if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) {
      nextErrors.email = "Please add a valid email.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    const form = event.currentTarget;
    const honeypot = (new FormData(form).get("company") as string) ?? "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          make: values.make.trim(),
          brandHome: values.brandHome.trim(),
          message: message.trim(),
          company: honeypot,
        }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        // The status code separates a validation refusal from a send failure,
        // which are different problems: one is copy, the other is the pipeline.
        track("enquiry_failed", { reason: response.status });
        setFailedMessage(data.error ?? "");
        setStatus("failed");
        return;
      }
      track("enquiry_submitted");
      setStatus("sent");
    } catch {
      track("enquiry_failed", { reason: "network" });
      setFailedMessage("");
      setStatus("failed");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
      {fields.map(({ name, label, type, required, autoComplete }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={`contact-${name}`} className="font-body text-sm text-ink">
            {label}
          </label>
          <input
            id={`contact-${name}`}
            name={name}
            type={type}
            value={values[name]}
            required={required}
            autoComplete={autoComplete}
            aria-invalid={errors[name] ? true : undefined}
            aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
            onChange={(event) => {
              setValues((prev) => ({ ...prev, [name]: event.target.value }));
              setErrors((prev) => ({ ...prev, [name]: undefined }));
            }}
            className="mt-1 w-full rounded-none border-0 border-b border-bone bg-transparent py-1 font-body text-base text-ink transition-colors duration-400 focus:border-ink"
          />
          {errors[name] ? (
            <p id={`contact-${name}-error`} className="mt-1 font-body text-sm text-ink">
              {errors[name]}
            </p>
          ) : null}
        </div>
      ))}

      {/* The one field for saying what the project actually is. Optional,
          because an enquiry that only leaves a name and an address is still
          worth having, and asking for a paragraph before a conversation has
          started is a good way not to get one. */}
      <div className="flex flex-col">
        <label htmlFor="contact-message" className="font-body text-sm text-ink">
          Anything else
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1 w-full resize-y rounded-none border-0 border-b border-bone bg-transparent py-1 font-body text-base text-ink transition-colors duration-400 focus:border-ink"
        />
      </div>

      {/* Honeypot: hidden from sighted and screen-reader users alike; any
          real visitor leaves it empty, so a filled value marks a bot. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-2 self-start py-2 font-body text-xs uppercase tracking-[0.25em] text-ink disabled:opacity-60"
      >
        <span className="relative pb-1">
          {status === "submitting" ? "Sending" : "Send enquiry"}
          <span className={UNDERLINE} />
        </span>
      </button>

      {status === "sent" ? (
        <p role="status" className="font-body text-sm leading-relaxed text-ink">
          {"Thank you \u2014 that's arrived safely. You'll hear back within a day or two."}
        </p>
      ) : null}

      {status === "failed" ? (
        <p role="alert" className="font-body text-sm leading-relaxed text-ink">
          {failedMessage || `That didn't go through. Try again, or email ${email} directly.`}
        </p>
      ) : null}

      <p className="font-body text-sm leading-relaxed text-ink">
        Every serious enquiry gets a reply, usually within a day or two.
      </p>
    </form>
  );
}

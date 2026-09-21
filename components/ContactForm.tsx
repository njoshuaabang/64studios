"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { UNDERLINE } from "@/lib/underline";
import { FIELD, LABEL } from "@/lib/form";

// The address the footer and the failure message both print, so a visitor
// who is told to write directly reaches the same inbox the form does.
const email = "studio@64studios.design";

type FieldName = "name" | "email" | "business" | "website";

const fields: {
  name: FieldName;
  label: string;
  type: "text" | "email" | "url";
  required: boolean;
  /** The autofill token a browser matches this field against. */
  autoComplete: string;
  /** An example, never a stand-in for the label. */
  placeholder?: string;
  error?: string;
}[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name", error: "Please add your name." },
  { name: "email", label: "Your email", type: "email", required: true, autoComplete: "email", error: "Please add a valid email." },
  {
    name: "business",
    label: "Your business",
    type: "text",
    required: true,
    autoComplete: "organization",
    placeholder: "Interior design studio, Harrogate",
    error: "Please add your business.",
  },
  {
    name: "website",
    label: "Your current website — optional",
    type: "url",
    required: false,
    autoComplete: "url",
  },
];

/**
 * The four things a visitor might be after. The value is what the address bar
 * carries and what the mail subject prints; the label is what is on screen.
 *
 * /process links here with ?option=week and ?option=website, so someone who
 * has just read an offer arrives with it already chosen and one fewer thing
 * to do.
 */
const options = [
  { value: "week", label: "The Website Week" },
  { value: "website", label: "A website" },
  { value: "development", label: "A site for a development" },
  { value: "unsure", label: "Not sure yet" },
] as const;

/** Matches MAX_LENGTHS.message in app/api/contact/route.ts. */
const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export default function ContactForm() {
  const params = useSearchParams();
  const preselected = params.get("option");
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    business: "",
    website: "",
  });
  const [option, setOption] = useState(
    options.some((o) => o.value === preselected) ? (preselected as string) : "",
  );
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
    if (!values.business.trim()) nextErrors.business = "Please add your business.";
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
          business: values.business.trim(),
          website: values.website.trim(),
          option: options.find((o) => o.value === option)?.label ?? "",
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
      {fields.map(({ name, label, type, required, autoComplete, placeholder }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={`contact-${name}`} className={LABEL}>
            {label}
          </label>
          <input
            id={`contact-${name}`}
            name={name}
            type={type}
            value={values[name]}
            required={required}
            autoComplete={autoComplete}
            placeholder={placeholder}
            aria-invalid={errors[name] ? true : undefined}
            aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
            onChange={(event) => {
              setValues((prev) => ({ ...prev, [name]: event.target.value }));
              setErrors((prev) => ({ ...prev, [name]: undefined }));
            }}
            className={`${FIELD} placeholder:text-ink/40`}
          />
          {errors[name] ? (
            <p id={`contact-${name}-error`} className="mt-1 font-body text-sm text-ink">
              {errors[name]}
            </p>
          ) : null}
        </div>
      ))}

      {/* A fieldset with a legend rather than four loose inputs: a screen
          reader announces the question once and then each answer within it,
          which a group of checkboxes wearing a paragraph for a label cannot
          do. Four radios rather than a select, because all four choices are
          worth seeing without opening anything. */}
      <fieldset className="flex flex-col border-0 p-0">
        <legend className="font-body text-sm text-ink">Which suits you — optional</legend>
        <div className="mt-2 flex flex-col gap-2">
          {options.map((item) => (
            <label
              key={item.value}
              htmlFor={`contact-option-${item.value}`}
              className="flex cursor-pointer items-center gap-3 font-body text-base text-ink"
            >
              <input
                id={`contact-option-${item.value}`}
                type="radio"
                name="option"
                value={item.value}
                checked={option === item.value}
                onChange={() => setOption(item.value)}
                className="h-4 w-4 shrink-0 accent-ink"
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

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
          className={`${FIELD} resize-y`}
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
          {"Thank you — that's arrived safely. You'll hear back within a day or two."}
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

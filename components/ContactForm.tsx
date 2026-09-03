"use client";

import { useState, type FormEvent } from "react";

// The address the footer and the failure message both print, so a visitor
// who is told to write directly reaches the same inbox the form does.
const email = "studio@64studios.com";

type FieldName = "name" | "make" | "brandHome";

const fields: {
  name: FieldName;
  label: string;
  required: boolean;
  error?: string;
}[] = [
  { name: "name", label: "Your name", required: true, error: "Please add your name." },
  // Not blocking. The approved copy supplies exactly one empty-field message,
  // for the name, and inventing a second would be writing copy that was never
  // approved. Left open pending a line for it.
  { name: "make", label: "What you make", required: false },
  { name: "brandHome", label: "Where your brand lives now — optional", required: false },
];

export default function ContactForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    make: "",
    brandHome: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "sent" | "failed">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      if (field.required && !values[field.name].trim()) {
        nextErrors[field.name] = field.error;
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = fields
      .map(({ name, label }) => (values[name].trim() ? `${label}: ${values[name].trim()}` : null))
      .filter(Boolean)
      .join("\n");
    try {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        "Project enquiry — 64 Studios"
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
      {fields.map(({ name, label, required }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={`contact-${name}`} className="font-body text-sm text-ink">
            {label}
          </label>
          <input
            id={`contact-${name}`}
            name={name}
            type="text"
            value={values[name]}
            required={required}
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
      <button
        type="submit"
        className="group mt-2 self-start font-body text-xs uppercase tracking-[0.25em] text-ink"
      >
        <span className="relative pb-1">
          Send enquiry
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-400 ease-out group-hover:scale-x-100" />
        </span>
      </button>

      {status === "sent" ? (
        <p role="status" className="font-body text-sm leading-relaxed text-ink">
          {"Thank you \u2014 that's arrived safely. You'll hear back within a day or two."}
        </p>
      ) : null}

      {status === "failed" ? (
        <p role="alert" className="font-body text-sm leading-relaxed text-ink">
          {`That didn't go through. Try again, or email ${email} directly.`}
        </p>
      ) : null}

      <p className="font-body text-sm leading-relaxed text-ink">
        Every serious enquiry gets a reply, usually within a day or two.
      </p>
    </form>
  );
}

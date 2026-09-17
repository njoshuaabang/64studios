"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/(halden)/halden/(site)/enquire/actions";
import {
  initialEnquiryState,
  type EnquiryState,
} from "@/app/(halden)/halden/(site)/enquire/state";

const fieldClass =
  "w-full border-0 border-b border-halden-brass/70 bg-transparent pb-1 text-halden-base text-halden-ink outline-none transition-colors duration-300 focus:border-halden-brass";

const labelClass = "block pb-2 text-halden-micro uppercase tracking-halden-label text-halden-ink/70";

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  rows,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  /** Present for the message, which is the one field that needs room. */
  rows?: number;
}) {
  return (
    <div className="pb-8">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {rows ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          className={`${fieldClass} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={fieldClass}
        />
      )}
    </div>
  );
}

export default function EnquireForm() {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    initialEnquiryState
  );

  if (state.status === "sent") {
    return (
      <p role="status" className="max-w-[38ch] text-halden-base">
        Thank you. The selling agent will be in touch.
      </p>
    );
  }

  return (
    <form action={formAction}>
      <Field name="name" label="Name" required autoComplete="name" />
      <Field
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
      />
      <Field name="telephone" label="Telephone" type="tel" autoComplete="tel" />
      <Field name="message" label="Message" rows={4} />

      {state.status === "error" && (
        <p role="alert" className="pb-6 text-halden-small text-halden-ink">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="border border-halden-ink px-3 py-2 text-halden-micro uppercase tracking-halden-label text-halden-ink transition-colors duration-300 hover:bg-halden-ink hover:text-halden-limewash disabled:opacity-50"
      >
        {pending ? "Sending" : "Send"}
      </button>
    </form>
  );
}

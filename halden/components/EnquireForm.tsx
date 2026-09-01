"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/(site)/enquire/actions";
import {
  initialEnquiryState,
  type EnquiryState,
} from "@/app/(site)/enquire/state";

const fieldClass =
  "w-full border-0 border-b border-brass/70 bg-transparent pb-1 text-base text-ink outline-none transition-colors duration-300 focus:border-brass";

const labelClass = "block pb-2 text-micro uppercase tracking-label text-ink/70";

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  multiline = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
}) {
  return (
    <div className="pb-8">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          required={required}
          className={`${fieldClass} block resize-y`}
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
      <p role="status" className="max-w-[38ch] text-base">
        Thank you. The house has your enquiry and will be in touch shortly.
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
      <Field name="proposedBy" label="Proposed by (if applicable)" />
      <Field name="enquiry" label="Your enquiry" multiline />

      {state.status === "error" && (
        <p role="alert" className="pb-6 text-small text-ink">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="border border-ink px-3 py-2 text-micro uppercase tracking-label text-ink transition-colors duration-300 hover:bg-ink hover:text-limewash disabled:opacity-50"
      >
        {pending ? "Sending" : "Send"}
      </button>
    </form>
  );
}

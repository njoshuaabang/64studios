"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/(clara)/clara-ashdown/enquire/actions";
import {
  initialEnquiryState,
  type EnquiryState,
} from "@/app/(clara)/clara-ashdown/enquire/state";

/**
 * Sentence-case labels, sitting on a single rule — no boxed inputs, no
 * tracked-out capitals. Short content, so no drop cap anywhere near it.
 */
const fieldClass =
  "w-full border-0 border-b border-clara-stone bg-transparent pb-1 text-clara-base text-clara-ink outline-none transition-colors duration-300 focus:border-clara-brass";

function Field({
  name,
  label,
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="pb-5">
      <label htmlFor={name} className="block pb-1 text-clara-meta text-clara-sage">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        autoComplete={autoComplete}
        className={fieldClass}
      />
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
      <p role="status" className="max-w-[42ch] font-clara-display text-clara-prose font-light">
        Thank you — that has reached me, and I’ll reply myself.
      </p>
    );
  }

  return (
    <form action={formAction} className="max-w-[38ch]">
      <Field name="name" label="Name" required autoComplete="name" />
      <Field name="property" label="Where the property is" required />
      <Field name="stage" label="What stage the project is at (optional)" />

      {state.status === "error" && (
        <p role="alert" className="pb-4 text-clara-meta text-clara-ink">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="border border-clara-ink px-2 py-1 text-clara-nav text-clara-ink transition-[letter-spacing] duration-300 ease-out hover:tracking-[0.03em] disabled:opacity-50"
      >
        {pending ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}

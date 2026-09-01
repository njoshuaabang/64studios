"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/(nash)/nash-calloway/enquire/actions";
import { initialEnquiryState, type EnquiryState } from "@/app/(nash)/nash-calloway/enquire/state";

const field =
  "w-full border border-nash-ink/25 bg-transparent px-2 py-1 font-nash-body text-base text-nash-ink outline-none transition-colors duration-200 focus:border-nash-brass";

const label = "block pb-1 font-nash-body text-sm text-nash-ink/70";

export default function EnquireForm() {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    initialEnquiryState
  );

  if (state.status === "sent") {
    return (
      <p role="status" className="max-w-[52ch] font-nash-body text-base text-nash-ink">
        We review every enquiry personally. If it&rsquo;s a fit, you&rsquo;ll hear from us within two
        weeks.
      </p>
    );
  }

  return (
    <form action={formAction} className="max-w-[36rem]">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="location" className={label}>
            Property location
          </label>
          <input id="location" name="location" type="text" className={field} />
        </div>
        <div>
          <label htmlFor="scope" className={label}>
            Project scope (brief description)
          </label>
          <textarea id="scope" name="scope" rows={4} className={`${field} resize-y`} />
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="pt-3 font-nash-body text-sm text-nash-terracotta">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 border border-nash-walnut px-3 py-2 font-nash-body text-sm text-nash-walnut transition-colors duration-200 hover:bg-nash-walnut hover:text-nash-plaster disabled:opacity-50"
      >
        {pending ? "Sending" : "Submit enquiry"}
      </button>
    </form>
  );
}

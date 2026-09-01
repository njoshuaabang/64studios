"use server";

import type { EnquiryState } from "./state";

/**
 * Stub handler. A real house would put this on a desk somewhere; here it is
 * logged on the server and answered with a confirmation.
 */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const proposedBy = String(formData.get("proposedBy") ?? "").trim();

  if (!name || !email) {
    return { status: "error", message: "A name and an email address, please." };
  }

  console.log("[halden] enquiry", {
    name,
    email,
    proposedBy: proposedBy || null,
    receivedAt: new Date().toISOString(),
  });

  return { status: "sent" };
}

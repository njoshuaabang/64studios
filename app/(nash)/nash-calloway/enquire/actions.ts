"use server";

import type { EnquiryState } from "./state";

/**
 * Stub handler. A real studio would put this in front of someone; here it is
 * logged on the server and answered with the closing line.
 */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const scope = String(formData.get("scope") ?? "").trim();

  if (!name || !location || !scope) {
    return { status: "error", message: "Add your name, the property location, and the scope." };
  }

  console.log("[nash] enquiry", { name, location, scope, receivedAt: new Date().toISOString() });

  return { status: "sent" };
}

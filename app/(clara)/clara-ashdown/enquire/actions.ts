"use server";

import type { EnquiryState } from "./state";

/**
 * Stub handler. A real practice would put this in an inbox; here it is
 * logged on the server and answered in Clara's own voice.
 */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const property = String(formData.get("property") ?? "").trim();
  const stage = String(formData.get("stage") ?? "").trim();

  if (!name || !property) {
    return {
      status: "error",
      message: "I need a name and roughly where the property is.",
    };
  }

  console.log("[clara] enquiry", {
    name,
    property,
    stage: stage || null,
    receivedAt: new Date().toISOString(),
  });

  return { status: "sent" };
}

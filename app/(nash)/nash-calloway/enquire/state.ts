/**
 * Kept out of actions.ts: a "use server" module may only export async
 * functions, so the shape and the starting value live here instead.
 */
export type EnquiryState = {
  status: "idle" | "sent" | "error";
  message?: string;
};

export const initialEnquiryState: EnquiryState = { status: "idle" };

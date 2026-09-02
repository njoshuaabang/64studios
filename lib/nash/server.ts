import { headers } from "next/headers";
import { basePathForHost } from "@/lib/sites";
import { NASH_BASE } from "./paths";

/**
 * The base every Nash link on this request should be built from: "" when the
 * request arrived on nash-calloway.<apex>, where middleware has already
 * stripped the prefix from the URL, and "/nash-calloway" on the main domain.
 */
export async function nashBase(): Promise<string> {
  const requestHeaders = await headers();
  return basePathForHost(requestHeaders.get("host"), NASH_BASE);
}

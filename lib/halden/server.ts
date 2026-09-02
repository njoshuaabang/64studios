import { headers } from "next/headers";
import { basePathForHost } from "@/lib/sites";
import { HALDEN_BASE } from "./paths";

/**
 * The base every Halden route on this request should be built from: "" when the
 * request arrived on halden.<apex>, where middleware has already stripped the
 * prefix from the URL, and "/halden" on the main domain.
 */
export async function haldenBase(): Promise<string> {
  const requestHeaders = await headers();
  return basePathForHost(requestHeaders.get("host"), HALDEN_BASE);
}

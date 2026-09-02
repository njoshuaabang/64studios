import { NextResponse, type NextRequest } from "next/server";
import { siteForHost } from "@/lib/sites";

/**
 * Host-based routing for the case-study subdomains.
 *
 * nash-calloway.64studios.com/portfolio is served by rewriting it to
 * /nash-calloway/portfolio internally. The rewrite is invisible: the visitor
 * keeps the clean URL, and the route tree does not have to know it is being
 * reached from a second hostname.
 *
 * The main domain is untouched. 64studios.com/nash-calloway/* keeps working
 * exactly as before, which matters because that is what is deployed today and
 * what the 64 Studios portfolio links to.
 *
 * Two directions, so a URL only ever has one correct form per host:
 *
 *   on the subdomain   /portfolio                 → rewrite to /nash-calloway/portfolio
 *                      /nash-calloway/portfolio   → redirect to /portfolio
 *
 * The redirect matters more than it looks. Links generated before this landed,
 * anything pasted from the main domain, and any stale bookmark all carry the
 * prefix; without it they would resolve to /nash-calloway/nash-calloway/… and
 * 404. Sending them to the clean form also keeps one canonical URL per page
 * per host rather than two that both work.
 */
export function middleware(request: NextRequest) {
  const site = siteForHost(request.headers.get("host"));
  if (!site) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const prefixed = pathname === site.base || pathname.startsWith(`${site.base}/`);

  // A site whose client router has its base path compiled in cannot be served
  // at the subdomain root, so the subdomain's job is to land the visitor on
  // the path where the app works rather than to hide it.
  if (!site.rootServed) {
    if (prefixed) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = `${site.base}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 308);
  }

  if (prefixed) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(site.base.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `${site.base}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

/**
 * Everything except framework internals and real files.
 *
 * The extension test is what keeps the static assets working. Nash's
 * photography lives at /nash/images/*.jpg and Aldern's at
 * /aldern-voss/media/*.jpg — both are absolute paths baked into markup and
 * bundles, and prefixing them would send each request somewhere that does not
 * exist. Anything with a dot in its last segment is a file, so it is left
 * alone and served from public/ as it always was.
 */
export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};

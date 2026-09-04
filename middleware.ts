import { NextResponse, type NextRequest } from "next/server";
import { SITES, siteForHost } from "@/lib/sites";
import { SITE_URL } from "@/lib/site";

const APEX = new URL(SITE_URL).host;

/**
 * Host-based routing for the case-study subdomains.
 *
 * nash-calloway.64studios.design/portfolio is served by rewriting it to
 * /nash-calloway/portfolio internally. The rewrite is invisible: the visitor
 * keeps the clean URL, and the route tree does not have to know it is being
 * reached from a second hostname.
 *
 * The main domain now sends the subfolder twins away rather than serving them.
 * 64studios.design/nash-calloway/* used to keep working alongside the
 * subdomain — the same content at two hostnames, with no canonical between
 * them — which is what this redirect closes.
 *
 * Two directions, so a URL only ever has one correct form per host:
 *
 *   on the main host   /nash-calloway/portfolio   → redirect to nash-calloway.64studios.design/portfolio
 *   on the subdomain   /portfolio                 → rewrite to /nash-calloway/portfolio
 *                      /nash-calloway/portfolio   → redirect to /portfolio
 *
 * The subdomain-side redirect matters more than it looks. Links generated
 * before this landed, anything pasted from the main domain, and any stale
 * bookmark all carry the prefix; without it they would resolve to
 * /nash-calloway/nash-calloway/… and 404. Sending them to the clean form also
 * keeps one canonical URL per page per host rather than two that both work.
 *
 * The two branches are host-gated, not path-gated, and that gate is what
 * keeps them from feeding each other: the main-host branch only ever runs
 * when `siteForHost` found no match, and its own redirect target is always a
 * demo subdomain, which is exactly the case `siteForHost` does match. So a
 * request can pass through one branch or the other, never both, and there is
 * no path back from a rewrite into a redirect. A naive "path starts with
 * /halden" rule with no host check would not have this property — it would
 * fire again on the very request the subdomain branch rewrites internally to
 * /halden/*, redirecting forever.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const site = siteForHost(host);

  if (site) {
    const { pathname } = request.nextUrl;

    // A sitemap for a noindex site is a contradictory signal (Phase 1.3), so
    // every demo host 404s here rather than falling through to whatever the
    // rewrite below would have found — which differs by brand (a route miss
    // for Halden and Nash, but a 200 from Aldern's SPA fallback, since its
    // catch-all rewrite in next.config.ts serves index.html for any unknown
    // path under /aldern-voss/). One explicit check keeps the three
    // consistent instead of depending on that difference.
    if (pathname === "/sitemap.xml") {
      return new NextResponse("Not Found", { status: 404 });
    }

    // robots.txt is the opposite case from sitemap.xml: a MISSING robots.txt
    // means "assume allow all" by convention, so a 404 here would say the
    // wrong thing. A demo host has to affirmatively serve a disallow-all body
    // instead, matching the noindex already on every one of its pages.
    if (pathname === "/robots.txt") {
      return new NextResponse("User-agent: *\nDisallow: /\n", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    }

    const prefixed = pathname === site.base || pathname.startsWith(`${site.base}/`);

    // A site whose client router has its base path compiled in cannot be
    // served at the subdomain root, so the subdomain's job is to land the
    // visitor on the path where the app works rather than to hide it.
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

  // Not a demo subdomain — the main host, its preview deployments, or
  // localhost. If the path is one of the demo bases (matched on the whole
  // segment, so /portfolio/halden — the agency's own case study — never
  // matches /halden), send it to the equivalent subdomain URL permanently.
  const { pathname, search } = request.nextUrl;
  const demo = SITES.find((s) => pathname === s.base || pathname.startsWith(`${s.base}/`));
  if (demo) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = `${demo.subdomain}.${APEX}`;
    url.port = "";
    url.pathname = pathname.slice(demo.base.length) || "/";
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

/**
 * Everything except framework internals and real files, plus one exception.
 *
 * The extension test is what keeps the static assets working. Nash's
 * photography lives at /nash/images/*.jpg and Aldern's at
 * /aldern-voss/media/*.jpg — both are absolute paths baked into markup and
 * bundles, and prefixing them would send each request somewhere that does not
 * exist. Anything with a dot in its last segment is a file, so it is left
 * alone and served from public/ as it always was.
 *
 * /sitemap.xml and /robots.txt are the two paths with an extension that still
 * need to reach this function: both are generated Next.js routes, not static
 * files, and without the explicit extra patterns here they would bypass the
 * middleware entirely — every demo host would keep serving the main site's
 * sitemap and robots.txt exactly as they did before Phase 1.
 */
export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)", "/sitemap.xml", "/robots.txt"],
};

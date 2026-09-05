import { projects } from "@/config/portfolio";
import { entries } from "@/config/journal";
import { SITE_URL } from "@/lib/site";

/**
 * llms.txt — a plain-text map of the site for language models, in the format
 * at llmstxt.org: a heading, a one-line summary, then sections of annotated
 * links.
 *
 * The three lists are generated from the same data the pages render, so a new
 * case study or journal entry appears here without anyone remembering to add
 * it. Only the prose is written by hand, and it repeats claims already made on
 * the site rather than introducing any.
 *
 * Static: nothing here reads the request, and the content only changes when
 * the content does, so it is built once rather than assembled per request.
 */
export const dynamic = "force-static";

const line = (title: string, path: string, description: string) =>
  `- [${title}](${SITE_URL}${path}): ${description}`;

export function GET() {
  const body = `# 64 Studios

> A brand identity and website design studio in Sheffield, United Kingdom. One project at a time, one to two weeks from first conversation to launch.

64 Studios designs brand identities and builds websites by hand. Every site is drawn from scratch and written in Next.js, deployed on Vercel, with no templates and no page builders. The studio was founded by Nkere Abang and works from Sheffield, for clients anywhere.

The studio runs one project at a time with nothing queued behind it. That is why a project takes one to two weeks from first conversation to launch, and why only a few projects fit in a year. Prices are not published.

## Pages

${[
  line("Home", "/", "The studio's threshold page: the mark, and one way into the work."),
  line(
    "Selected work",
    "/portfolio",
    "Brand identity and website design projects, three in total.",
  ),
  line(
    "Services",
    "/services",
    "What the studio makes: brand identity, hand-coded websites in Next.js, and art direction. Includes the registers it works in and the work it turns down.",
  ),
  line(
    "Process",
    "/process",
    "The one-to-two-week engagement stage by stage, what is needed from the client, and what happens after launch.",
  ),
  line(
    "The studio",
    "/studio",
    "How the studio works, who runs it, and where it is based.",
  ),
  line("Journal", "/journal", "Notes on single decisions taken from real projects."),
  line("Contact", "/contact", "The enquiry form. Every serious enquiry gets a reply."),
].join("\n")}

## Case studies

${projects.map((p) => line(p.title, `/portfolio/${p.slug}`, p.subtitle)).join("\n")}

## Journal

${entries.map((e) => line(e.title, `/journal/${e.slug}`, e.summary)).join("\n")}

## Notes

- The three case studies are self-initiated concepts rather than client work, and each is labelled as such on its own page. The studio is new and does not claim a client history.
- Halden, Nash Calloway Design and Aldern & Voss are invented brands built by 64 Studios to demonstrate its work. They are not real businesses. Each has its own subdomain, each carries a disclosure in its footer, and all three are excluded from indexing.
- The one-to-two-week window covers the identity and the finished site, and includes launch.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}

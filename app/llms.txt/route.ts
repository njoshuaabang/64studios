import { SITE_URL } from "@/lib/site";

/**
 * llms.txt — a plain-text map of the site for language models, in the format
 * at llmstxt.org: a heading, a one-line summary, then sections of annotated
 * links.
 *
 * Every claim here is stated on a real page. This is one of the four places
 * that carry the website price, along with /process, that page's meta
 * description and the schema offer catalogue; when it rises to £5,000 those
 * four change and nothing else holds the number.
 *
 * Static: nothing here reads the request, and the content only changes when
 * the content does, so it is built once rather than assembled per request.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# 64 Studios

> Web design studio in Sheffield, United Kingdom, for the firms behind high-end homes: interior designers, architects, builders, kitchen and joinery makers, garden designers and residential developers. Founded by Nkere Abang.

Websites only, drawn from scratch and hand-coded in Next.js. No templates or page builders. Website Week sites include an editor so the client can add projects without code. Both portfolio projects are self-initiated concepts, not client work.

## Process and fees

- [Process](${SITE_URL}/process): How a project runs and what it costs. The Website Week, £7,000, one fixed week with the site live on Friday. A website, £3,000 for the first three commissions and £5,000 after, about three weeks from content. Care, £200 a month. No VAT is added. The same page answers common questions.

## Pages

- [Selected work](${SITE_URL}/portfolio): Nash Calloway Design, an interior design and architecture studio, and Halden, a private house in Marylebone
- [Studio](${SITE_URL}/studio): who the studio works for and why the portfolio comes first
- [Contact](${SITE_URL}/contact): the enquiry form

## Optional

- [Journal](${SITE_URL}/journal): single design decisions from the studio's projects
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}

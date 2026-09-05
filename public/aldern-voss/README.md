# Aldern & Voss — built output

This directory is the compiled Vite SPA, not its source. The source is not in
this repository, and there are no source maps here.

## Hand-edited since the last build

`assets/index-BLYI9Luk.js` has two edits applied directly to the bundle. Both
point a link at this project's case study instead of somewhere less useful.

1. The "Back to 64 Studios" button at the foot of the reference and workshop
   pages:

       href:`/portfolio/aldern-voss`
       → href:`https://64studios.design/portfolio/aldern-voss`

   Root-relative was the bug. On aldern-voss.64studios.design that path is
   resolved against the subdomain, the middleware hands it to this SPA, and
   react-router matches none of its four routes — `/`, `/request`,
   `/the-reference`, `/the-workshop` — so the catch-all rendered the Aldern &
   Voss home page. An absolute URL is correct from either door, since this
   build is also served under /aldern-voss/ on the main host.

2. The footer disclosure, "A self-initiated concept by 64 Studios":

       href:`https://64studios.design`
       → href:`https://64studios.design/portfolio/aldern-voss`

   It went to the studio home page. Halden and Nash Calloway had the same bug
   and were fixed in their own components, which is where that change belongs;
   this one had nowhere else to go.

**If you rebuild this SPA from its source, both edits are lost.** Make the
same changes in the source before rebuilding, or reapply them after.

# Aldern & Voss — built output

This directory is the compiled Vite SPA, not its source. The source is not in
this repository, and there are no source maps here.

## Hand-edited since the last build

`assets/index-BLYI9Luk.js` has one edit applied directly to the bundle:

    href:`https://64studios.design`
    → href:`https://64studios.design/portfolio/aldern-voss`

It is the footer disclosure link, "A self-initiated concept by 64 Studios".
It pointed at the studio home page, which left a reader who wanted to know
what this site is to go and find the case study themselves. Halden and Nash
Calloway had the same bug and were fixed in their own components, which is
where that change belongs; this one had nowhere else to go.

**If you rebuild this SPA from its source, this edit is lost.** Make the same
change in the source footer before rebuilding, or reapply it after.

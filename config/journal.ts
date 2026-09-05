/**
 * Journal entries, held as plain data the way config/portfolio.ts holds the
 * case studies. No MDX and no CMS: the entries are prose with no embedded
 * components, and a second content pipeline would be a dependency to maintain
 * for no capability the site actually uses.
 */
export type JournalEntry = {
  slug: string;
  title: string;
  /** One line, used as the meta description and on the index. */
  summary: string;
  /** ISO date, used for dateline and Article schema. */
  published: string;
  /** Which project the decision was made on. */
  project: string;
  body: string[];
};

export const entries: JournalEntry[] = [
  {
    slug: "the-halden-home-page-does-not-scroll",
    title: "The Halden home page does not scroll",
    summary:
      "A locked viewport is usually a mistake. This is the case where the refusal was the content, and what it cost to do safely.",
    published: "2026-09-05",
    project: "Halden",
    body: [
      "Halden's home page is one viewport and it does not move. A photograph of a black door on a Marylebone street, the name of the house, and one way in. There is nothing below the fold because there is no fold.",
      "That is normally a bad idea. A page that refuses to scroll breaks the first thing a visitor tries, and on a phone it is the difference between a site that works and a site that appears broken. It is worth doing only when the refusal is itself the content.",
      "Halden is a private house. The whole proposition is that most of it is not shown to you. A conventional home page would have argued the opposite case in its structure while the copy claimed discretion: hero image, benefit columns, a testimonial, a footer full of links. The layout would have been the more honest of the two, and it would have been wrong.",
      "So the page holds a single frame. The door is photographed straight on, at roughly the scale it would be if you were standing in front of it, and the only interactive element is the way through.",
      "The mechanics are simple. The care is all in the failure modes. A threshold-lock class goes on both html and body, setting height to 100dvh with overflow hidden and overscroll-behavior none. Using dvh rather than vh matters here: on iOS the address bar collapses as you scroll, so 100vh is taller than the viewport actually showing at rest. A vh-locked page clips its own content on exactly the device most likely to see it.",
      "The class is added by the component that owns the page and removed when that component unmounts. This sounds obvious and it is the part that breaks. Lock the document from one page, forget to release it again on navigation, and every subsequent page on the site is unscrollable. The bug does not appear until someone clicks through, which is well after the point where anyone is still looking at the home page.",
      "The entrance sequence is gated on prefers-reduced-motion. Under that setting the timeline is never built at all, rather than played and then cancelled, so the frame is simply present and opaque from the first paint. A locked viewport and an animation a visitor cannot stop would be an unpleasant combination.",
      "What the page gives up is measurable. There is no room for a second message, no space for proof, and no path for a visitor who wanted to browse rather than commit. Halden pays all of that deliberately, because the alternative was a page that said discreet in a layout that shouted.",
      "One detail worth stating plainly: the lock is applied in an effect rather than written into the markup, so a visitor arriving without JavaScript gets a page that scrolls normally. That is the correct way for this to fail, and it is worth checking rather than assuming.",
      "The rule that came out of it: a locked viewport earns its place only when scrolling would contradict the thing being sold. That is rare. It has been true once across three projects.",
    ],
  },
  {
    slug: "why-the-aldern-voss-specifications-are-set-in-mono",
    title: "Why the Aldern & Voss specifications are set in mono",
    summary:
      "A monospace face is the wrong choice for almost everything on a website, and the right one for a column of measurements.",
    published: "2026-09-05",
    project: "Aldern & Voss",
    body: [
      "Aldern & Voss sells one watch. There is no catalogue, no colourway and no second reference to compare against. What the site has in place of range is precision: case diameter, movement, water resistance, lug width, the figures a person buying this kind of object actually reads before anything else.",
      "Those figures are set in IBM Plex Mono. The rest of the site runs on Space Grotesk for display and IBM Plex Sans for body copy, so the monospace face is doing one job and only one.",
      "The obvious argument for it is alignment. In a proportional face the digit 1 is narrower than the digit 8, so a column of figures does not line up down its right edge. There is a proper fix for that, font-variant-numeric: tabular-nums, and on a text-heavier site it would be the better answer, because it keeps the body face throughout and changes only the digits.",
      "Mono was chosen anyway, and the reason is register rather than metrics. A specification is not prose. It is an instrument reading, and it should look like one. A monospace face carries that association honestly: it is the face of the technical document and the movement stamp. Set in the same face as the paragraph above them, the specs would read as a claim. Set in mono, they read as a measurement.",
      "The same face carries the eyebrows and the navigation, at eleven and ten pixels with heavy letter-spacing. That is not decoration either. It marks everything on the page that is a label rather than a sentence, so a reader can tell at a glance which text is talking and which is pointing.",
      "There is a loading cost and it is smaller than it looks. The mono appears only at label sizes and in short strings of figures, so it needs one weight and a Latin subset. That is a few kilobytes on a page whose hero is a photograph of a watch.",
      "The real cost is a third typeface, which breaks a rule most identities should hold to. Two faces is the discipline. Three is usually a failure to decide, and the third one is usually there because someone wanted variety rather than because a job needed doing.",
      "This one earns its place because it does something neither of the others can. It is not a second body face. It is a different kind of speech, and the site has two kinds of thing to say.",
      "There is one place the choice is measurably worse, and it is worth naming. A long string of letter-spaced uppercase set in a monospace face is slower to read for anyone reading rather than scanning, because the even advance width removes the word shapes a reader normally navigates by. That is exactly why it is confined here to labels and to figures, and never given a sentence to carry.",
      "The check worth applying before doing it again: name the job the third face does, in one sentence, without using the word accent. If that sentence will not come, the face is decoration and it should go.",
    ],
  },
];

export function getEntry(slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

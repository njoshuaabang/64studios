/**
 * The questions and their answers, held once and read three times: the
 * visible block at the foot of /process, that page's FAQPage schema, and the
 * question list in llms.txt. A second copy of this prose in the JSON-LD would
 * be free to drift from the one on screen, and schema that does not match the
 * page it describes is a manual action waiting to happen.
 *
 * Every answer is drawn from what /process and /services already say. Nothing
 * here states a price, a founding date, or a client the site does not name
 * elsewhere.
 */
export const faqs = [
  {
    q: "How long does a project take?",
    a: "One to two weeks, from the first conversation to the site going live. That is possible because the studio runs one project at a time, not because a stage is skipped. Launch sits inside the window rather than after it, which is the part most quoted timelines leave out. The identity is settled in the first three days, and the build runs from day five to day nine.",
  },
  {
    q: "What does a project include?",
    a: "Two things, usually both at once: the identity a business is recognised by, and the site that carries it. The identity starts with the mark and the type it sits in; the palette follows from those rather than preceding them. The site is drawn from that identity and written by hand. At handover you get the live site and the identity files in the formats they are actually used in. There is also a short written note on what was decided and why.",
  },
  {
    q: "Does the studio work with clients outside Sheffield?",
    a: "Yes. The studio is in Sheffield and the work has mostly been elsewhere \u2014 a private house in Marylebone, and an interior design and architecture studio working across Los Angeles and London. Nothing in the process depends on being in the same room. You watch the site on a real URL while it is being built, not in a slideshow.",
  },
  {
    q: "What does the studio need before starting?",
    a: "Very little: whatever already exists of the brand, and access to the domain. If there is photography worth keeping, it helps to see it early. If there is none, that is an ordinary starting point and is dealt with during the design. What matters more than any file is a conversation long enough to hear what the business actually is and who it is losing to. That conversation is free.",
  },
  {
    q: "Are the sites built on templates or a page builder?",
    a: "No. Every site is written by hand in Next.js and deployed on Vercel. Nothing is assembled from a theme bought and adjusted until it stops looking like itself. That is not a fashion choice. A hand-written front end renders fast on a phone, and it does not rest on a plugin that may stop being maintained. It asks for more attention up front and less every year after.",
  },
  {
    q: "What happens after launch?",
    a: "The site is yours, on your own Vercel account if you would rather it lived there. Nothing is held hostage: there is no proprietary builder to keep paying for and no licence to expire. Small changes in the first month are part of the project rather than a new one. After that, work is quoted as it comes. The studio does not sell a retainer by default, because most sites of this kind need very little in their first year.",
  },
  {
    q: "How many projects does the studio take?",
    a: "One at a time. That is the reason a project can run start to finish in one to two weeks: nothing is queued behind anything else, and the window is not shared. It also means the studio turns work down. Ecommerce at any real scale needs a different kind of build, and so does a site that depends on a content operation nobody has hired yet.",
  },
  {
    q: "Can the studio work with an existing brand identity?",
    a: "Yes. The identity and the site can be taken separately, and a site drawn onto an identity that already works is a normal starting point. Stage zero asks for whatever already exists of the brand for that reason. The one thing worth checking first is whether the mark still holds at the size of a browser tab, because an identity that fails there is a problem the website inherits rather than one it can hide.",
  },
];

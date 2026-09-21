/**
 * Every word on /checklist/read and in the PDF exported from it. Edit here
 * only: the page renders from this, and the PDF is a print of the page, so a
 * copy change here is a copy change in both — once the PDF is re-exported.
 *
 * Supplied as-is in the checklist handoff and kept verbatim.
 */
export const checklist = {
  "title": "Before the enquiry",
  "subtitle": "Ten checks the studio runs on every website for firms that design and build houses.",
  "howto": "Tick each one your website passes. Be honest; nobody else sees this.",
  "closing": "Three or more unticked is where your enquiries are going. The Website Week fixes all ten in one week.",
  "cta": "Begin a conversation",
  "cta_url": "https://64studios.design/contact",
  "checks": [
    {
      "title": "The first screen says what you make and where.",
      "good": "In five seconds a stranger knows the kind of work you do and the part of the country you do it in.",
      "cost": "They go back to the search results and click the next firm."
    },
    {
      "title": "Your best project is one click from the homepage.",
      "good": "The strongest house leads, reachable without scrolling through a grid.",
      "cost": "Visitors judge you on whatever loads first, which is often an older job."
    },
    {
      "title": "Project pages tell the story of the house.",
      "good": "The brief and the decision that shaped the house come first, then the photographs.",
      "cost": "Forty images with no words read as a gallery, not as a firm with judgement."
    },
    {
      "title": "Photographs are large and load quickly.",
      "good": "Professional photography at full width, compressed so a page opens in about two seconds on a phone.",
      "cost": "On a weak signal the visitor leaves before the first image appears."
    },
    {
      "title": "It works properly on a phone.",
      "good": "Text you can read without zooming and links big enough to tap.",
      "cost": "Referrals often arrive as a link in a message, so the phone is the first impression."
    },
    {
      "title": "The next step is on every page.",
      "good": "A short link that starts with a verb, such as “Begin a conversation”, at the end of every page.",
      "cost": "Interested visitors have to hunt for the contact page, and some stop looking."
    },
    {
      "title": "The enquiry form asks for very little.",
      "good": "Name, email, a line about the project and a note on when you will reply.",
      "cost": "Every extra field loses a few people who were ready to write."
    },
    {
      "title": "Proof sits near the ask.",
      "good": "Credits for the architect or builder you worked with and a client’s own words, close to the contact link.",
      "cost": "Someone about to commit a large budget wants reassurance at the moment they decide."
    },
    {
      "title": "Where you work is stated plainly.",
      "good": "The counties or cities you take on, written as words rather than hidden in an image or a map.",
      "cost": "Enquiries from outside your area waste time, and the ones inside it struggle to find you."
    },
    {
      "title": "It looks current.",
      "good": "A project from the last twelve months and this year in the footer.",
      "cost": "A site that looks left alone makes people wonder whether the firm still trades."
    }
  ]
} as const;

/**
 * The questions and their answers, held once and read three times: the
 * visible block at the foot of /process, that page's FAQPage schema, and the
 * question list in llms.txt. A second copy of this prose in the JSON-LD would
 * be free to drift from the one on screen, and schema that does not match the
 * page it describes is a manual action waiting to happen.
 *
 * Five questions, each carrying something the rest of the page does not. The
 * ones that repeated the stages or the fees were cut.
 */
export const faqs = [
  {
    q: "Can I update the site myself?",
    a: "On a Website Week site, yes. It comes with an editor for adding and reordering projects without touching code. On a website, new projects are added by the studio through the care plan.",
  },
  {
    q: "Do you design logos?",
    a: "No. The studio makes websites only. If your mark needs work, the studio can recommend someone.",
  },
  {
    q: "Do you work with developers?",
    a: "Yes. A site for a single scheme or house, live before the marketing starts. Priced after the first conversation.",
  },
  {
    q: "Are sites built on templates?",
    a: "No. Every site is hand-coded in Next.js. A hand-written front end loads fast on a phone and does not rest on a plugin that may stop being maintained.",
  },
  {
    q: "Does the studio work outside Sheffield?",
    a: "Yes. Projects run over video and email, and progress is shared on a live link.",
  },
];

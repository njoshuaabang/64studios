import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { asset } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/membership",
  title: "Membership | Halden, Marylebone London",
  description:
    "Membership of Halden is by proposal. Joining fee, annual subscription, guest policy and how the committee considers candidates.",
});

const paragraphs = [
  "Membership is by proposal. An existing member puts a name forward, the committee meets each quarter, and successful candidates receive a letter with the terms.",
  "The house is deliberately small. Numbers are limited to what the rooms can comfortably hold on an ordinary weekday evening, which keeps the bar unhurried and the dining room worth booking.",
  "Membership includes use of all rooms, priority reservation of the private dining room, member rates on the six bedrooms, and access to the house’s programme of dinners, tastings and readings.",
  "Members may bring two guests at a time. A joining fee and annual subscription apply, and are set out in full at the point of offer. Members under thirty are eligible for a reduced subscription.",
];

export default function MembershipPage() {
  return (
    <main className="w-full px-[var(--gutter)] pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-display text-display font-light">
          Membership of Halden
        </h1>
      </Reveal>

      <div className="max-w-prose pt-12 md:pt-16">
        {paragraphs.map((text) => (
          // The spacing sits on the wrapper, not the paragraph: each paragraph
          // is an only child, so `last:` would match every one of them.
          <Reveal key={text} className="pb-6 last:pb-0">
            <p className="text-base">{text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="pt-20 md:pt-24">
        <div className="relative h-[80vh] w-full overflow-hidden">
          <Image
            src={asset("/images/stair-above.jpg")}
            alt="The staircase seen from above, winding down past its mahogany handrail to the chequered floor of the hall below."
            fill
            quality={82}
            sizes="(max-width: 1280px) 100vw, 1056px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="pt-10">
        <Link
          href="/enquire"
          className="inline-block text-brass underline-offset-4 transition-colors duration-300 hover:underline"
        >
          Enquire about membership
        </Link>
      </Reveal>
    </main>
  );
}

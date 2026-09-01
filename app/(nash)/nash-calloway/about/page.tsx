import type { Metadata } from "next";
import Nav from "@/components/nash/Nav";
import SignOff from "@/components/nash/SignOff";

export const metadata: Metadata = {
  title: "About",
};

export default function NashAboutPage() {
  return (
    <>
      <Nav />
      <main className="px-4 pt-10 md:px-8 md:pt-16">
        <h1 className="font-nash-display text-3xl text-nash-ink md:text-4xl">About</h1>

        <p className="mt-6 max-w-[62ch] font-nash-body text-base leading-relaxed text-nash-ink md:mt-8 md:text-lg">
          I started Nash Calloway Design around a simple mid-century instinct — that light,
          structure, and material honesty solve most of what a house needs. Over time I&rsquo;ve
          built a team here in Los Angeles and London who see a project the way I do, trained
          inside our own process rather than around it. What we take on ranges considerably —
          coastal architecture, listed London townhouses, resort builds, homes built around serious
          art collections — but the same instinct runs through all of it.
        </p>

        {/* The only proof on the site, and it is a count rather than a claim. */}
        <p className="mt-8 font-nash-display text-xl text-nash-walnut md:mt-10 md:text-2xl">
          Nine projects. Three countries. One studio.
        </p>
      </main>
      <SignOff />
    </>
  );
}

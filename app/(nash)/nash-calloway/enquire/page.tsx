import type { Metadata } from "next";
import Link from "next/link";
import EnquireForm from "@/components/nash/EnquireForm";
import Nav from "@/components/nash/Nav";
import SignOff from "@/components/nash/SignOff";

export const metadata: Metadata = {
  title: "Enquire",
};

export default function NashEnquirePage() {
  return (
    <>
      <Nav />
      <main className="px-4 pt-10 md:px-8 md:pt-16">
        <h1 className="font-nash-display text-3xl text-nash-ink md:text-4xl">Enquire</h1>

        <p className="mt-4 max-w-[54ch] font-nash-body text-base leading-relaxed text-nash-ink md:mt-6">
          For architecturally significant homes in Los Angeles, London, and select international
          locations. A limited number of projects a year.
        </p>

        <div className="mt-8 md:mt-10">
          <EnquireForm />
        </div>

        {/*
          The way back out to 64 Studios. It sits on the page rather than inside
          the form so it survives submission — the form replaces itself with the
          confirmation message, and the way out should not disappear with it.

          Secondary to Submit enquiry by weight of border, not by colour: the
          same walnut text at a 40% hairline against Submit's solid box. Brass
          would read as secondary more directly, but brass on plaster measures
          3.25:1 at this size against the 4.5 AA wants for body text, and this
          is a persistent control rather than a hover state. Walnut is 7.42:1.
          Sentence case, like everything else here.
        */}
        <Link
          href="/portfolio/nash-calloway"
          className="mt-12 inline-block border border-nash-walnut/40 px-3 py-2 font-nash-body text-sm text-nash-walnut transition-colors duration-200 hover:border-nash-walnut hover:bg-nash-walnut hover:text-nash-plaster md:mt-14"
        >
          Back to 64 Studios
        </Link>
      </main>
      <SignOff />
    </>
  );
}

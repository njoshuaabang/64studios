import type { Metadata } from "next";
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
      </main>
      <SignOff />
    </>
  );
}

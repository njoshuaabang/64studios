import type { Metadata } from "next";
import Nav from "@/components/nash/Nav";
import SignOff from "@/components/nash/SignOff";
import PortfolioGrid from "@/components/nash/PortfolioGrid";
import { projects } from "@/lib/nash/projects";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function NashPortfolioPage() {
  return (
    <>
      <Nav />
      <main className="px-4 pt-10 md:px-8 md:pt-16">
        <h1 className="font-nash-display text-3xl text-nash-ink md:text-4xl">Portfolio</h1>
        <div className="mt-6 md:mt-8">
          <PortfolioGrid projects={projects} />
        </div>
      </main>
      <SignOff />
    </>
  );
}

import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { site } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  // A design proposal, not the live site.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

// Runs before first paint: marks JS, and skips the intro on return visits or with reduced motion.
const boot = `document.documentElement.classList.add("js");try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("solstice-intro"))document.documentElement.dataset.intro="skip"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="skip-link text-label uppercase">
          Skip to content
        </a>
        <TransitionProvider>{children}</TransitionProvider>
        <Analytics />
      </body>
    </html>
  );
}

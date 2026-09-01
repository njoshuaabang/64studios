import Footer from "@/components/halden/Footer";
import Nav from "@/components/halden/Nav";
import PageFade from "@/components/halden/PageFade";

/**
 * Chrome for every Halden page except the threshold, which sits outside this
 * group so it can be a page with no nav, no footer and no way back out but
 * forward.
 */
export default function HaldenSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Nav />
      <PageFade className="flex flex-1 flex-col">{children}</PageFade>
      <Footer />
    </div>
  );
}

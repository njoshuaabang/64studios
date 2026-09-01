import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PageFade from "@/components/PageFade";

/**
 * Chrome for every page except the threshold, which sits outside this group so
 * that it can be a page with no nav, no footer and no way back out but forward.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Nav />
      <PageFade className="flex flex-1 flex-col">{children}</PageFade>
      <Footer />
    </div>
  );
}

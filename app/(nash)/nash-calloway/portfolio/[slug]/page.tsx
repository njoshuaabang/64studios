import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/nash/Nav";
import Plate from "@/components/nash/Plate";
import SignOff from "@/components/nash/SignOff";
import { nashPath } from "@/lib/nash/paths";
import { getProject, projects } from "@/lib/nash/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type PageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Portfolio" };

  return {
    title: project.name,
    description: project.move,
    openGraph: {
      title: `${project.name} — Nash Calloway Design`,
      description: project.move,
      url: nashPath(`/portfolio/${project.slug}`),
      images: [{ url: project.images[0].src, alt: project.images[0].alt }],
    },
  };
}

export default async function NashProjectPage({ params }: PageParams) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="px-4 pt-10 md:px-8 md:pt-16">
        <Link
          href={nashPath("/portfolio")}
          className="font-nash-body text-sm text-nash-ink/70 transition-colors duration-200 hover:text-nash-brass"
        >
          Portfolio
        </Link>

        <h1 className="mt-3 font-nash-display text-3xl text-nash-ink md:text-4xl">
          {project.name}
        </h1>

        {/* The spec, stated rather than described — the same three facts the
            grid's plate carries, so the two views agree. */}
        <dl className="mt-6 grid max-w-[64rem] grid-cols-1 gap-3 border-t border-nash-ink/20 pt-4 sm:grid-cols-3 md:mt-8">
          <Fact label="Location" value={project.location} />
          <Fact label="Scope" value={project.scope} />
          <Fact label="Duration" value={project.duration} />
        </dl>

        <p className="mt-8 max-w-[62ch] font-nash-body text-base leading-relaxed text-nash-ink md:mt-10 md:text-lg">
          {project.move}
        </p>

        {/* After first, then the construction shot — the finished room, then
            what it took. Both sit in the same plate. */}
        <div className="mt-10 flex flex-col gap-6 md:mt-14 md:gap-8">
          {project.images.map((image, i) => (
            <Plate
              key={image.src}
              src={image.src}
              alt={image.alt}
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          ))}
        </div>
      </main>
      <SignOff />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-nash-body text-sm text-nash-ink/60">{label}</dt>
      <dd className="mt-1 font-nash-body text-base text-nash-ink">{value}</dd>
    </div>
  );
}

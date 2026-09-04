/** Renders one JSON-LD block from a plain object. Nothing else — no schema builder, no per-type wrapper components. */
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

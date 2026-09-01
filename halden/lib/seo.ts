import type { Metadata } from "next";
import { asset, basePath } from "./basePath";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://halden.london";

/** Shared social card. Absolute resolution comes from `metadataBase`. */
export const OG_IMAGE = asset("/images/threshold.jpg");

const OG_IMAGE_ALT =
  "The Georgian front of Halden, a private members’ club in Marylebone, London.";

/**
 * Every page builds its metadata through here so the Open Graph and Twitter
 * cards cannot drift out of step with the title and description.
 */
export function pageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  /** Route path without the base path, e.g. "/membership". */
  path?: string;
}): Metadata {
  const url = `${basePath}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Halden",
      locale: "en_GB",
      type: "website",
      images: [{ url: OG_IMAGE, width: 2560, height: 1911, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

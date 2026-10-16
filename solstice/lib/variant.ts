// The one place the A/B variant is read. Site A unless NEXT_PUBLIC_SITE_VARIANT=b.
export const variant: "a" | "b" = process.env.NEXT_PUBLIC_SITE_VARIANT === "b" ? "b" : "a";

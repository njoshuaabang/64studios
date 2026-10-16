import { credentials } from "@/lib/content";

export function CredentialsLine({ className = "" }: { className?: string }) {
  return <p className={`text-small ${className}`}>{credentials}</p>;
}

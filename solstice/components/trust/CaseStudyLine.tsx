import { caseStudy } from "@/lib/content";
import { TransitionLink } from "../transition/TransitionLink";

/** Site A's one-line case study, standing in for a review. */
export function CaseStudyLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-small ${className}`}>
      <strong className="font-medium">{caseStudy.lead}</strong> {caseStudy.line}{" "}
      <TransitionLink href={caseStudy.href} className="text-link whitespace-nowrap">
        {caseStudy.cta}
      </TransitionLink>
    </p>
  );
}

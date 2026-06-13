import { ArrowRight } from "lucide-react";
import type { BlogTimelineStep } from "../../data/blogs";

interface BlogArrowTimelineProps {
  steps: BlogTimelineStep[];
}

export function BlogArrowTimeline({ steps }: BlogArrowTimelineProps) {
  return (
    <section className="tools-pipeline blog-edu-pipeline" aria-label="Education timeline">
      <ol className="tools-pipeline__flow">
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`} className="tools-pipeline__step">
            <div className="tools-pipeline__node">
              {step.region ? (
                <span className="tools-pipeline__stamp">{step.region}</span>
              ) : null}
              <p className="tools-pipeline__title">{step.title}</p>
              <p className="tools-pipeline__detail">{step.location}</p>
            </div>
            {index < steps.length - 1 ? (
              <ArrowRight className="tools-pipeline__arrow" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

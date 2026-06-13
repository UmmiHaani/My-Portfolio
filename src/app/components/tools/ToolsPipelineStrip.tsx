import { ArrowRight } from "lucide-react";
import type { PipelineStep } from "../../data/tools";

interface ToolsPipelineStripProps {
  steps: PipelineStep[];
}

export function ToolsPipelineStrip({ steps }: ToolsPipelineStripProps) {
  return (
    <section className="tools-pipeline" aria-label="Deployment pipeline">
      <p className="tools-pipeline__label">Deploy pipeline</p>
      <ol className="tools-pipeline__flow">
        {steps.map((step, index) => (
          <li key={step.id} className="tools-pipeline__step">
            <div className="tools-pipeline__node">
              {step.stamp ? (
                <span className="tools-pipeline__stamp">{step.stamp}</span>
              ) : null}
              <p className="tools-pipeline__title">{step.label}</p>
              <p className="tools-pipeline__detail">{step.detail}</p>
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

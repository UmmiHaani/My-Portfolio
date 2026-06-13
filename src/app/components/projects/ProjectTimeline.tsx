import { timelineMilestones } from "../../data/projects";
import { ProjectTimelineRow } from "./ProjectTimelineRow";

export function ProjectTimeline() {
  return (
    <div className="exp-timeline" role="list" aria-label="Career timeline">
      <div className="exp-timeline__track" aria-hidden />

      {timelineMilestones.map((milestone, index) => (
        <ProjectTimelineRow
          key={milestone.id}
          milestone={milestone}
          index={index}
        />
      ))}
    </div>
  );
}

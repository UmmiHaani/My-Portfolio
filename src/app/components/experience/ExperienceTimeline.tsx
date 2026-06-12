import { timelineMilestones } from "../../data/experience";
import { ExperienceTimelineRow } from "./ExperienceTimelineRow";

export function ExperienceTimeline() {
  return (
    <div className="exp-timeline" role="list" aria-label="Career timeline">
      <div className="exp-timeline__track" aria-hidden />

      {timelineMilestones.map((milestone, index) => (
        <ExperienceTimelineRow
          key={milestone.id}
          milestone={milestone}
          index={index}
        />
      ))}
    </div>
  );
}

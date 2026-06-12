import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { TimelineMilestone } from "../../data/experience";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ExperienceImageGallery } from "./ExperienceImageGallery";
import { ExperienceIntelPanel } from "./ExperienceIntelPanel";
import { ExperienceThemedImage } from "./ExperienceThemedImage";

interface ExperienceTimelineRowProps {
  milestone: TimelineMilestone;
  index: number;
}

export function ExperienceTimelineRow({
  milestone,
  index,
}: ExperienceTimelineRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  const isLeft = index % 2 === 0;
  const isCurrent = index === 0;
  const show = reducedMotion || inView;

  const cardOffset = isLeft ? -24 : 24;
  const intelOffset = isLeft ? 24 : -24;
  const ease = [0.4, 0, 0.2, 1] as const;

  return (
    <motion.article
      ref={rowRef}
      role="listitem"
      className={[
        "exp-timeline__row",
        isLeft ? "exp-timeline__row--left" : "exp-timeline__row--right",
        isCurrent ? "exp-timeline__row--current" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.div
        className="exp-timeline__card-slot"
        initial={{ opacity: 0, x: cardOffset }}
        animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: cardOffset }}
        transition={{ duration: 0.45, ease }}
      >
        <div
          className={[
            "exp-timeline__card",
            isCurrent ? "exp-timeline__card--current" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="exp-timeline__card-header">
            <div>
              <p className="exp-timeline__chapter">{milestone.chapter}</p>
              <p className="exp-timeline__codename">{milestone.codename}</p>
            </div>
            <span className="exp-timeline__period">{milestone.period}</span>
          </div>

          {milestone.image ? (
            <div
              className={[
                "exp-timeline__thumb",
                milestone.image.variant === "portrait"
                  ? "exp-timeline__thumb--portrait"
                  : milestone.image.variant === "banner"
                    ? "exp-timeline__thumb--banner"
                    : "exp-timeline__thumb--screenshot",
              ].join(" ")}
            >
              {milestone.image.srcByTheme ? (
                <ExperienceThemedImage
                  image={milestone.image}
                  className="exp-timeline__thumb-image"
                />
              ) : (
                <ImageWithFallback
                  src={milestone.image.src ?? ""}
                  alt={milestone.image.alt}
                  className="exp-timeline__thumb-image"
                />
              )}
            </div>
          ) : null}

          <h3 className="exp-timeline__role">{milestone.role}</h3>
          <p className="exp-timeline__org">{milestone.org}</p>

          {milestone.spotlight ? (
            <div className="exp-timeline__spotlight">
              <div className="exp-timeline__spotlight-header">
                <p className="exp-timeline__spotlight-title">
                  {milestone.spotlight.title}
                </p>
                <p className="exp-timeline__spotlight-event">
                  {milestone.spotlight.event}
                </p>
                <p className="exp-timeline__spotlight-meta">
                  {milestone.spotlight.org} · {milestone.spotlight.location}
                </p>
                <p className="exp-timeline__spotlight-meta">
                  {milestone.spotlight.period}
                  {milestone.spotlight.context
                    ? ` · ${milestone.spotlight.context}`
                    : ""}
                </p>
              </div>
              <ul className="exp-timeline__spotlight-list">
                {milestone.spotlight.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {milestone.spotlight.images?.length ? (
                <ExperienceImageGallery
                  label={milestone.spotlight.imagesLabel}
                  images={milestone.spotlight.images}
                />
              ) : null}
            </div>
          ) : null}

          <p className="exp-timeline__description">{milestone.description}</p>

          {milestone.gallery?.length ? (
            <ExperienceImageGallery
              label={milestone.galleryLabel}
              images={milestone.gallery}
            />
          ) : null}
        </div>
      </motion.div>

      <motion.div
        className="exp-timeline__node-wrap"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.35, ease, delay: reducedMotion ? 0 : 0.05 }}
      >
        <span className="exp-timeline__node" aria-hidden>
          {milestone.id}
        </span>
        <span className="exp-timeline__connector" aria-hidden />
      </motion.div>

      <motion.div
        className="exp-timeline__intel-slot"
        initial={{ opacity: 0, x: intelOffset }}
        animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: intelOffset }}
        transition={{ duration: 0.45, ease, delay: reducedMotion ? 0 : 0.1 }}
      >
        <ExperienceIntelPanel milestone={milestone} />
      </motion.div>
    </motion.article>
  );
}

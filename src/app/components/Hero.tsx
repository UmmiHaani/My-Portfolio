import React from "react";
import { Badge } from "./ui/badge";
import { HighlightSweepText } from "./HighlightSweepText";
import { Re4TitleText } from "./Re4TitleText";
import { ConnectOptions } from "./ConnectOptions";
import { FeaturedProjects } from "./FeaturedProjects";
import { StackedCardCarousel } from "./StackedCardCarousel";

const GITHUB_PROFILE = "https://github.com/UmmiHaani";

/** Languages reflected in @UmmiHaani public repositories (by actual project work). */
const GITHUB_SKILLS = [
  "PHP",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "CSS",
  "HTML",
] as const;

export function Hero() {
  const carouselImages = [
    {
      id: 1,
      label: "Front Page 1",
      image: "/carousel/front-page-1.png",
      imageAlt: "Petting a tabby cat outdoors at night",
    },
    {
      id: 2,
      label: "Front Page 2",
      image: "/carousel/front-page-2.png",
      imageAlt: "Portrait of Haani Shahrul",
    },
    {
      id: 3,
      label: "Front Page 3",
      image: "/carousel/front-page-3.png",
      imageAlt: "Vintage documents and records",
    },
  ];

  const projects = [
    {
      name: "C.A.T.E-AI-Agent",
      description:
        "AI agent web app (Chat, Analyze, Transform, Execute) with conversational UI, streaming responses, and tool integrations for research and automation—powered by Claude, LangGraph, Convex, and Clerk.",
      tech: ["Next.js", "React", "TypeScript", "Convex", "Clerk"],
      github: "https://github.com/UmmiHaani/C.A.T.E-AI-Agent",
      demo: "https://c-a-t-e-ai-agent.vercel.app",
      previewImage: "/projects/cate.png",
    },
    {
      name: "GLOSEV",
      description:
        "Leave and claims portal with sign-in, registration, and a monthly leave calendar—track annual, medical, emergency, and other staff leave types in one place.",
      tech: ["PHP", "Web", "MySQL"],
      github: "https://github.com/UmmiHaani/Glosev-Internal-Staff-Management-System",
      demo: "https://glosev.com/login/index.php",
      previewImage: "/projects/glosev.png",
    },
    {
      name: "ezfoodadha",
      description:
        "Food ordering project for seasonal and event-based meal flows—repository and live demo links coming soon.",
      tech: ["React", "Node.js"],
      github: "https://github.com/UmmiHaani/EzFoodAdha.my",
      previewImage: "/projects/ezfoodadha.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--pf-bg)] text-[var(--pf-text-muted)] transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-16">
        {/* Know About Me Section */}
        <section className="re4-save-ui">
          <header className="re4-projects-header flex items-center gap-3">
            <div className="h-0.5 w-6 shrink-0 bg-[var(--pf-accent)]/80" />
            <div>
              <h2 className="re4-projects-header__title">Know About Me</h2>
              <p className="re4-projects-header__sub">
                Continue — agent Leon S. Kennedy
              </p>
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <StackedCardCarousel cards={carouselImages} showHint={false} />

            <div className="space-y-5 md:pl-6 lg:pl-10">
              <HighlightSweepText
                as="h3"
                className="text-xl font-semibold text-[var(--pf-text)]"
              >
                Hello! I&apos;m Haani Shahrul
              </HighlightSweepText>
              <p className="text-justify text-[var(--pf-text-muted)] leading-relaxed">
                An AI engineer and full-stack developer based in Kuala Lumpur and the founder of
                C.A.T.E., an award-winning AI assistant that won Best Paper at ICAR 2025 and holds
                registered copyright. I build things that actually ship, from a live enterprise HR
                system deployed solo during my internship at Glosev, to an IBM Watsonx.ai-powered
                assistant with published academic research behind it. My work sits at the
                intersection of AI engineering and real product delivery.
              </p>
              <p className="text-justify text-[var(--pf-text-muted)] leading-relaxed">
                This portfolio is themed around <Re4TitleText className="font-medium" /> because
                Leon S. Kennedy never stops moving forward and neither do I. If you&apos;re looking
                for someone who builds, ships, and keeps learning, let&apos;s talk.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {GITHUB_SKILLS.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-[var(--pf-surface-muted)] border-[var(--pf-border)] text-[var(--pf-accent)] hover:bg-[var(--pf-surface)] shadow-[var(--pf-shadow-sm)]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeaturedProjects
          projects={projects}
          saveEmail="shahrulhaani@gmail.com"
          saveGithub={GITHUB_PROFILE}
        />

        <ConnectOptions
          email="shahrulhaani@gmail.com"
          githubUrl={GITHUB_PROFILE}
        />
      </div>
    </div>
  );
}

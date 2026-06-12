export interface TimelineIntel {
  objective: string;
  outcome: string;
  loadout: string[];
}

export interface TimelineLink {
  label: string;
  href: string;
}

export interface ThemedImageSources {
  light: string;
  dark: string;
}

export interface TimelineGalleryImage {
  src: string;
  alt: string;
  caption?: string;
  /** screenshot = contain, photo = cover (default) */
  variant?: "screenshot" | "photo";
  srcByTheme?: ThemedImageSources;
}

export interface TimelineSpotlight {
  title: string;
  event: string;
  org: string;
  location: string;
  period: string;
  context?: string;
  bullets: string[];
  images?: TimelineGalleryImage[];
  imagesLabel?: string;
}

export interface TimelineImage {
  src?: string;
  alt: string;
  /** screenshot = contain UI, portrait = cover photo, banner = 16:9 landscape contain */
  variant?: "screenshot" | "portrait" | "banner";
  srcByTheme?: ThemedImageSources;
}

export interface TimelineMilestone {
  id: string;
  chapter: string;
  codename: string;
  period: string;
  role: string;
  org: string;
  description: string;
  quote?: string;
  achievements: string[];
  link?: TimelineLink;
  intel: TimelineIntel;
  spotlight?: TimelineSpotlight;
  image?: TimelineImage;
  gallery?: TimelineGalleryImage[];
  galleryLabel?: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "01",
    chapter: "Chapter IV",
    codename: "Active Mission",
    period: "2024 — Present",
    role: "Founder & AI Engineer",
    org: "C.A.T.E.",
    description:
      "Built an award-winning AI assistant from the ground up — Best Paper at ICAR 2025, registered copyright, and a live product with conversational UI, streaming, and tool integrations on modern cloud stack.",
    quote: "Best Paper · ICAR 2025",
    achievements: [
      "Registered copyright on C.A.T.E. assistant IP",
      "Live deployment with streaming chat and tool use",
      "Published academic backing for the product vision",
    ],
    link: {
      label: "View project →",
      href: "https://c-a-t-e-ai-agent.vercel.app",
    },
    intel: {
      objective:
        "Design and ship a production AI agent users can chat with, analyze data through, and automate tasks with.",
      outcome:
        "Award-winning assistant live on Vercel with Convex backend, Clerk auth, and LangGraph orchestration.",
      loadout: [
        "Next.js",
        "React",
        "TypeScript",
        "Claude",
        "LangGraph",
        "Convex",
        "Clerk",
      ],
    },
    image: {
      alt: "C.A.T.E. AI assistant",
      variant: "screenshot",
      srcByTheme: {
        light: "/experience/cate/light-mode/hero.png",
        dark: "/experience/cate/dark-mode/hero.png",
      },
    },
    galleryLabel: "ICAR 2025 Conference",
    gallery: [
      {
        src: "/experience/cate/icar-conference-1.jpg",
        alt: "ICAR 2025 conference presentation",
        caption: "Presentation",
      },
      {
        src: "/experience/cate/icar-conference-2.jpg",
        alt: "ICAR 2025 best paper award",
        caption: "Best Paper",
      },
      {
        src: "/experience/cate/icar-conference-3.jpg",
        alt: "ICAR 2025 conference venue",
        caption: "Conference",
      },
    ],
  },
  {
    id: "02",
    chapter: "Chapter III",
    codename: "Field Deployment",
    period: "2023 — 2025",
    role: "Software Engineer · Intern",
    org: "Glosev",
    description:
      "Solo-deployed an enterprise HR and leave-management portal into production — auth flows, monthly calendars, and multi-type leave tracking used by real staff.",
    spotlight: {
      title: "Lead Technical Technician",
      event: "Junior Innovathon",
      org: "Kementerian Pendidikan Malaysia (KPM)",
      location: "Angkasapuri, Malaysia",
      period: "Aug 2025 — Nov 2025",
      context: "Internship under Glosev Sdn. Bhd.",
      bullets: [
        "Appointed technical technician for the Junior Innovathon Competition, organized by KPM and broadcast nationwide on RTM — the event's success relied on my live scoring and system management.",
        "Engineered and operated a Microsoft Excel-based judging system to compute and verify scores in real time during a live national broadcast.",
        "Worked directly with KPM officials, RTM producers, and celebrity juries.",
      ],
      imagesLabel: "Junior Innovathon · RTM",
      images: [
        {
          src: "/experience/glosev/innovathon-rtm-1.jpg",
          alt: "Junior Innovathon live RTM broadcast",
          caption: "Live broadcast",
        },
        {
          src: "/experience/glosev/innovathon-rtm-2.jpg",
          alt: "Real-time Excel scoring system",
          caption: "Scoring system",
          variant: "screenshot",
        },
        {
          src: "/experience/glosev/innovathon-rtm-3.jpg",
          alt: "KPM Junior Innovathon event",
          caption: "KPM event",
        },
      ],
    },
    quote: "Junior Innovathon · RTM national broadcast",
    achievements: [
      "Live scoring system for KPM's Junior Innovathon on RTM",
      "Real-time Excel judging pipeline during national broadcast",
      "Production HR portal solo-deployed for Glosev staff",
    ],
    link: {
      label: "View live system →",
      href: "https://glosev.com/login/index.php",
    },
    intel: {
      objective:
        "Ship Glosev's internal HR portal and lead live technical operations for KPM's nationally televised Junior Innovathon.",
      outcome:
        "Production HR system in daily use, plus a real-time judging stack that held through a live RTM broadcast.",
      loadout: [
        "PHP",
        "MySQL",
        "JavaScript",
        "Microsoft Excel",
        "Live Ops",
        "Apache",
      ],
    },
    image: {
      alt: "Glosev staff management system",
      variant: "screenshot",
      srcByTheme: {
        light: "/experience/glosev/light-mode/hero.png",
        dark: "/experience/glosev/dark-mode/hero.png",
      },
    },
  },
  {
    id: "03",
    chapter: "Chapter II",
    codename: "Research Protocol",
    period: "2024",
    role: "Founder & Lead AI Developer",
    org: "IBM Watsonx.ai × LangChain × WxFlow",
    description:
      "Built and published an award-winning AI assistant — from system architecture to academic paper to live SaaS deployment.",
    quote: "C.A.T.E. → AWARD-WINNING AI AGENT",
    achievements: [
      "Multi-agent pipeline design and orchestration",
      "IBM Watsonx.ai integration and prompt engineering",
      "Academic manuscript preparation and submission",
      "Full-stack SaaS deployment via Vercel",
      "Copyright registration of final product",
    ],
    link: {
      label: "View project →",
      href: "https://c-a-t-e-ai-agent.vercel.app",
    },
    intel: {
      objective:
        "Design, build, and publish a multi-agent AI assistant that passes both real-world use and academic review.",
      outcome:
        "Best Paper Award — ICAR 2025. Copyright registered. Pre-launch SaaS site live on Vercel.",
      loadout: [
        "IBM Watsonx.ai",
        "LangChain",
        "WxFlow",
        "Wolfram Alpha API",
        "React Native + Expo Go",
      ],
    },
  },
  {
    id: "04",
    chapter: "Chapter I",
    codename: "Origin Point",
    period: "2022 — Dec 2025",
    role: "Diploma · Computer Science",
    org: "UNIVERSITY POLY-TECH MALAYSIA",
    description:
      "AI & Web Application Development track. Dean's List, CGPA 3.81. Shipped EzFoodAdha in 2021 before the Watsonx and LangChain work that followed.",
    quote: "DEAN'S LIST · CGPA 3.81",
    achievements: [
      "AI Development & Web Application Development concentrations",
      "EzFoodAdha (2021) — full-stack delivery system during COVID-19",
      "CompTIA Cloud+ certified",
    ],
    intel: {
      objective:
        "Build real systems through UPTM's AI and web development diploma — not just coursework.",
      outcome:
        "Dean's List graduate (Dec 2025). Foundation for C.A.T.E., Glosev, and ICAR 2025.",
      loadout: [
        "Java",
        "C++",
        "JavaScript",
        "PHP",
        "React Native",
        "MySQL",
        "Watsonx.ai",
      ],
    },
    image: {
      src: "/experience/university/hero.png",
      alt: "Universiti Poly-Tech Malaysia",
      variant: "banner",
    },
    galleryLabel: "University",
    gallery: [
      {
        src: "/experience/university/campus-or-project-1.jpg",
        alt: "University campus or project work",
        caption: "Campus",
      },
    ],
  },
];

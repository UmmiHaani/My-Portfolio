export type BlogCategory =
  | "journey"
  | "leetcode"
  | "build"
  | "career"
  | "photo-log";

export interface BlogAlbumImage {
  src: string;
  alt: string;
  caption?: string;
  variant?: "screenshot" | "photo";
}

export interface BlogTimelineStep {
  title: string;
  location: string;
  region?: string;
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "timeline"; steps: BlogTimelineStep[] };

export interface BlogPost {
  slug: string;
  fileCode: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  coverFrame?: string;
  album: BlogAlbumImage[];
  albumLabel?: string;
  series?: string;
  pinned?: boolean;
  body: BlogBlock[];
}

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  journey: "Journey",
  leetcode: "LeetCode",
  build: "Build log",
  career: "Career",
  "photo-log": "Photo log",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "introduction",
    fileCode: "LOG-001",
    category: "journey",
    pinned: true,
    title: "Introduction — who I am and how I got into CS",
    excerpt:
      "A thorough field file on my background, what I build, what I care about, and how this transmission log fits my journey.",
    date: "2025-09-01",
    readMinutes: 10,
    coverFrame: "/blog/introduction/01-montessori-school.jpg",
    albumLabel: "Personal frames",
    album: [
      {
        src: "/blog/introduction/01-montessori-school.jpg",
        alt: "Montessori School",
        caption: "Montessori School",
        variant: "photo",
      },
      {
        src: "/blog/introduction/02-ibn-sina-school.jpg",
        alt: "Ibn Sina School",
        caption: "Ibn Sina School",
        variant: "photo",
      },
      {
        src: "/blog/introduction/03-smka-dato-haji-abbas.jpg",
        alt: "SMKA Dato Haji Abbas",
        caption: "SMKA Dato Haji Abbas",
        variant: "photo",
      },
      {
        src: "/blog/introduction/04-university-poly-tech-malaysia.jpg",
        alt: "University Poly-Tech Malaysia",
        caption: "University Poly-Tech Malaysia",
        variant: "photo",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "I'm Haani Shahrul — a computer science graduate building at the intersection of AI, software engineering, and systems that actually ship. This log starts here: who I am, what pushed me into CS, and how the entries below connect into one direction forward.",
      },
      {
        type: "heading",
        text: "Background",
      },
      {
        type: "paragraph",
        text: "I did not fall into programming through a single moment. It was coursework, late-night debugging, internships, research deadlines, and side projects that stacked until shipping felt normal. Dean's List, ICAR 2025 Best Paper, registered copyright on C.A.T.E., and three live systems are milestones — but the through-line is curiosity followed by execution.",
      },
      {
        type: "heading",
        text: "What I work on",
      },
      {
        type: "list",
        items: [
          "AI agents and conversational products — C.A.T.E. (live on Vercel).",
          "Enterprise web systems — Glosev HR portal (live at glosev.com).",
          "Research with product proof — paper, copyright, and demo together.",
          "LeetCode and fundamentals — patterns I document so I stop re-learning the same shape.",
        ],
      },
      {
        type: "heading",
        text: "Education timeline",
      },
      {
        type: "paragraph",
        text: "My path into computer science did not start in a single classroom — it moved across countries, schools, and languages before I landed in Kuala Lumpur for university. This timeline is the short version of where I studied and how each stop shaped who I am today.",
      },
      {
        type: "timeline",
        steps: [
          {
            title: "Montessori School",
            location: "Wageningen, Netherlands",
            region: "Early years",
          },
          {
            title: "Ibn Sina School",
            location: "Rotterdam, Netherlands",
            region: "Netherlands",
          },
          {
            title: "SMKA Dato Haji Abbas",
            location: "Kuala Terengganu, Terengganu",
            region: "Secondary",
          },
          {
            title: "University Poly-Tech Malaysia",
            location: "Cheras, Kuala Lumpur",
            region: "University",
          },
        ],
      },
    ],
  },
  {
    slug: "icar-2025-presenting-cate",
    fileCode: "LOG-002",
    category: "journey",
    title: "ICAR 2025 — presenting C.A.T.E. on stage",
    excerpt:
      "Best Paper award night, conference frames, and what it felt like to ship research as a product.",
    date: "2025-11-18",
    readMinutes: 8,
    coverFrame: "/blog/icar-2025-presenting-cate/01-opening-slide.jpg",
    albumLabel: "Conference frames — ICAR 2025",
    series: "C.A.T.E.",
    album: [
      {
        src: "/blog/icar-2025-presenting-cate/01-opening-slide.jpg",
        alt: "Presenting at ICAR 2025",
        caption: "Opening slide",
        variant: "photo",
      },
      {
        src: "/blog/icar-2025-presenting-cate/02-poster.jpg",
        alt: "ICAR 2025 research poster",
        caption: "Poster",
        variant: "photo",
      },
      {
        src: "/blog/icar-2025-presenting-cate/03-live-demo-ui.png",
        alt: "C.A.T.E. product hero",
        caption: "Live demo UI",
        variant: "screenshot",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "ICAR 2025 was the first time C.A.T.E. left my laptop and stood in front of a real audience. The paper was one thing — the product, the demo, and the questions afterward were another.",
      },
      {
        type: "heading",
        text: "What I learned",
      },
      {
        type: "list",
        items: [
          "Research reads differently when you can click a live demo.",
          "Photos help you remember the room, not just the slides.",
          "Copyright + publication + product = three proofs of the same journey.",
        ],
      },
      {
        type: "paragraph",
        text: "The visual annex on the right collects every frame I wanted to keep from that week — stage, hall, and the UI we showed on the projector.",
      },
    ],
  },
  {
    slug: "hash-map-two-sum",
    fileCode: "LOG-003",
    category: "leetcode",
    title: "Hash map pattern — Two Sum without nested loops",
    excerpt:
      "Two Sum is the shape I see everywhere. One pass, a map of seen values, and no O(n²) scan.",
    date: "2026-02-04",
    readMinutes: 6,
    coverFrame: "/blog/hash-map-two-sum/01-ide-screenshot.png",
    albumLabel: "Problem-solving frames",
    series: "LeetCode patterns",
    album: [
      {
        src: "/blog/hash-map-two-sum/01-ide-screenshot.png",
        alt: "IDE workspace screenshot",
        caption: "Template file",
        variant: "screenshot",
      },
      {
        src: "/blog/hash-map-two-sum/02-notebook-sketch.jpg",
        alt: "Notebook sketch",
        caption: "Hash map sketch",
        variant: "photo",
      },
      {
        src: "/blog/hash-map-two-sum/03-study-session.jpg",
        alt: "Study session",
        caption: "Late session",
        variant: "photo",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "Two Sum is the first shape that stuck — find two numbers that add to a target. I used to reach for nested loops every time until I memorized the hash map move: store what you've seen, check for the complement on each step.",
      },
      {
        type: "heading",
        text: "Two Sum — the problem",
      },
      {
        type: "paragraph",
        text: "Given an array of integers nums and an integer target, return the two indices i and j such that nums[i] + nums[j] === target. You get exactly one valid answer, and you cannot use the same element twice.",
      },
      {
        type: "heading",
        text: "Checklist before coding",
      },
      {
        type: "list",
        items: [
          "Map value → index for numbers already visited.",
          "At each nums[i], compute complement = target − nums[i].",
          "If complement is in the map, return [map.get(complement), i]. Otherwise set map.set(nums[i], i).",
        ],
      },
      {
        type: "heading",
        text: "Hash map solution",
      },
      {
        type: "code",
        language: "typescript",
        code: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }

    seen.set(nums[i], i);
  }

  return [];
}`,
      },
      {
        type: "paragraph",
        text: "One pass, O(n) time, O(n) space. The map is the memory of what you've already walked past — so every index only needs to look backward, not scan the whole array again.",
      },
    ],
  },
  {
    slug: "shipping-glosev-production",
    fileCode: "LOG-004",
    category: "build",
    title: "Shipping Glosev — from internship repo to live HR portal",
    excerpt:
      "Cron jobs, RBAC, and the frames I kept from Innovathon through solo deploy on glosev.com.",
    date: "2026-01-20",
    readMinutes: 7,
    coverFrame: "/blog/shipping-glosev-production/02-team-frame.jpg",
    albumLabel: "Glosev build frames",
    series: "Glosev",
    album: [
      {
        src: "/blog/shipping-glosev-production/01-innovathon-start.jpg",
        alt: "Innovathon RTM event",
        caption: "Innovathon start",
        variant: "photo",
      },
      {
        src: "/blog/shipping-glosev-production/02-team-frame.jpg",
        alt: "Team at Innovathon",
        caption: "Team frame",
        variant: "photo",
      },
      {
        src: "/blog/shipping-glosev-production/03-bangsar-morning-walk.jpg",
        alt: "Bangsar morning walk",
        caption: "Bangsar morning walk",
        variant: "photo",
      },
      {
        src: "/blog/shipping-glosev-production/04-live-ui.png",
        alt: "Glosev light mode dashboard",
        caption: "Live UI",
        variant: "screenshot",
      },
      {
        src: "/blog/shipping-glosev-production/05-production-login.png",
        alt: "Glosev login portal",
        caption: "Production login",
        variant: "screenshot",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "Glosev started as an internship project and became a system real staff use for leave, claims, and monthly calendars. The build log is less about PHP syntax and more about what breaks when cron, auth, and production traffic meet.",
      },
      {
        type: "heading",
        text: "What shipped",
      },
      {
        type: "list",
        items: [
          "Sign-in, registration, and role-based access for staff.",
          "Monthly leave calendar with annual, medical, and emergency types.",
          "Solo deploy to a live domain — no hand-off deck, just uptime.",
        ],
      },
      {
        type: "paragraph",
        text: "The visual annex indexes Innovathon photos beside production screenshots so I remember both the pitch room and the login page users hit today.",
      },
    ],
  },
  {
    slug: "portfolio-as-career-signal",
    fileCode: "LOG-005",
    category: "career",
    title: "Why I rebuilt my portfolio as a career signal",
    excerpt:
      "RE4-themed UX, sidebar connect links, and proof strips — framing projects for recruiters, not just classmates.",
    date: "2026-03-10",
    readMinutes: 5,
    coverFrame: "/blog/portfolio-as-career-signal/02-hero-frame.jpg",
    albumLabel: "Portfolio build frames",
    series: "Career",
    album: [
      {
        src: "/blog/portfolio-as-career-signal/01-home-carousel.jpg",
        alt: "Portfolio carousel photo",
        caption: "Home carousel",
        variant: "photo",
      },
      {
        src: "/blog/portfolio-as-career-signal/02-hero-frame.jpg",
        alt: "Portrait on portfolio",
        caption: "Hero frame",
        variant: "photo",
      },
      {
        src: "/blog/portfolio-as-career-signal/03-featured-project.png",
        alt: "C.A.T.E. project card",
        caption: "Featured project",
        variant: "screenshot",
      },
      {
        src: "/blog/portfolio-as-career-signal/04-tools-projects.png",
        alt: "Glosev dark mode UI",
        caption: "Tools & projects",
        variant: "screenshot",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "A portfolio is not a homework dump. I rebuilt mine so every route answers a recruiter question: what did you ship, what do you use, what can you prove, and how do I reach you?",
      },
      {
        type: "heading",
        text: "Design choices",
      },
      {
        type: "list",
        items: [
          "Projects page as a mission log — story plus evidence, not just screenshots.",
          "Tools page as an attaché dossier — certs, copyright, live systems.",
          "Sidebar connect + availability — email and social without a dead Contact page.",
        ],
      },
      {
        type: "paragraph",
        text: "This transmission log is the next layer: journey notes and photo rolls that show how I think, not only what shipped.",
      },
    ],
  },
];

export function parseLogNumber(fileCode: string): number {
  const match = fileCode.match(/LOG-(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 9999;
}

export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return parseLogNumber(a.fileCode) - parseLogNumber(b.fileCode);
  });
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export const BLOG_FILTERS: { id: "all" | BlogCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "journey", label: "Journey" },
  { id: "leetcode", label: "LeetCode" },
  { id: "build", label: "Build" },
  { id: "career", label: "Career" },
  { id: "photo-log", label: "Photo log" },
];

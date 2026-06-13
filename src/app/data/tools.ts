export type ToolTag = "Primary" | "Production" | "Academic" | "Cert-backed";

export interface ToolItem {
  name: string;
  note?: string;
  tag?: ToolTag;
}

export interface ToolCategory {
  id: string;
  index: string;
  title: string;
  codename: string;
  re4Label: string;
  summary?: string;
  featured?: boolean;
  stamp?: string;
  stampVariant?: "verified" | "production" | "training";
  items: ToolItem[];
  deployedOn?: DeployTarget[];
  link?: {
    label: string;
    href: string;
  };
}

export interface Certification {
  id: string;
  badge: string;
  title: string;
  issuer: string;
  note: string;
  pdfUrl?: string;
  stamp?: string;
  stampVariant?: "verified" | "production" | "training";
}

export interface ProofDocument {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  stamp?: string;
  stampVariant?: "verified" | "production" | "training";
  href?: string;
  pdfUrl?: string;
  external?: boolean;
}

export interface StackRecipe {
  id: string;
  inputs: string[];
  output: string;
  deployedOn: { label: string; href: string }[];
  lore: string;
}

export interface PipelineStep {
  id: string;
  label: string;
  detail: string;
  stamp?: string;
}

export interface DeployTarget {
  label: string;
  href: string;
}

export const certifications: Certification[] = [
  {
    id: "cloud-plus",
    badge: "CLOUD+",
    title: "CompTIA Cloud+",
    issuer: "CompTIA",
    note: "Verified cloud fundamentals and infrastructure",
    pdfUrl: "/certificates/CompTIA-Cloud-Plus.pdf",
  },
];

export const proofDocuments: ProofDocument[] = [
  {
    id: "cloud-plus",
    code: "DOC-01",
    title: "CompTIA Cloud+",
    subtitle: "Verified cloud fundamentals",
    pdfUrl: "/certificates/CompTIA-Cloud-Plus.pdf",
  },
  {
    id: "icar",
    code: "DOC-02",
    title: "ICAR 2025 Best Paper",
    subtitle: "C.A.T.E. academic research",
    href: "https://www.atlantis-press.com/proceedings/icar-t1-25/126023530",
    external: true,
  },
  {
    id: "copyright",
    code: "DOC-03",
    title: "C.A.T.E. Copyright",
    subtitle: "Registered assistant IP",
    href: "/experience",
  },
  {
    id: "live-systems",
    code: "DOC-04",
    title: "3 Live Systems",
    subtitle: "C.A.T.E. · Glosev · Portfolio",
  },
];

export const stackRecipes: StackRecipe[] = [
  {
    id: "cate",
    inputs: ["IBM Watsonx.ai", "LangChain", "WxFlow"],
    output: "C.A.T.E. AI Agent",
    deployedOn: [
      { label: "Live demo", href: "https://c-a-t-e-ai-agent.vercel.app" },
      { label: "Mission log", href: "/experience" },
    ],
    lore: "Award-winning agent stack — conversational UI, streaming, and tool routing in production.",
  },
  {
    id: "glosev",
    inputs: ["PHP 8.4", "MySQL", "cPanel"],
    output: "Glosev HR Portal",
    deployedOn: [
      { label: "Live site", href: "https://glosev.com/login/index.php" },
      { label: "Mission log", href: "/experience" },
    ],
    lore: "Solo-deployed enterprise leave & claims system during internship — sign-in, RBAC, cron jobs.",
  },
  {
    id: "portfolio",
    inputs: ["React", "TypeScript", "Vercel"],
    output: "This Portfolio",
    deployedOn: [{ label: "Source", href: "https://github.com/UmmiHaani/My-Portfolio" }],
    lore: "RE4-themed portfolio with custom interactions, PDF previews, and route-level polish.",
  },
];

export const pipelineSteps: PipelineStep[] = [
  { id: "code", label: "Source", detail: "React · PHP · Python" },
  { id: "git", label: "Git", detail: "Version control & CI-ready" },
  { id: "deploy", label: "Deploy", detail: "Vercel · cPanel" },
  { id: "live", label: "Live", detail: "3 production surfaces" },
];

export const toolCategories: ToolCategory[] = [
  {
    id: "ai-stack",
    index: "01",
    title: "AI/ML Stack",
    codename: "C.A.T.E. core",
    re4Label: "Special weapons",
    summary:
      "Orchestration stack built for C.A.T.E. — LLM routing, agent chains, and computational APIs.",
    featured: true,
    stamp: "Production",
    stampVariant: "production",
    items: [
      { name: "IBM Watsonx.ai", note: "LLM orchestration", tag: "Production" },
      { name: "LangChain", note: "Agent chains & tool routing", tag: "Production" },
      { name: "WxFlow", note: "IBM workflow integration", tag: "Production" },
      { name: "Wolfram Alpha API", note: "Computational queries", tag: "Production" },
    ],
    deployedOn: [
      { label: "C.A.T.E. demo", href: "https://c-a-t-e-ai-agent.vercel.app" },
    ],
    link: {
      label: "Mission log — C.A.T.E.",
      href: "/experience",
    },
  },
  {
    id: "languages",
    index: "02",
    title: "Languages & Markup",
    codename: "Source code",
    re4Label: "Core firmware",
    items: [
      { name: "Java", tag: "Primary" },
      { name: "C++", tag: "Academic" },
      { name: "Python", tag: "Primary" },
      { name: "JavaScript", tag: "Primary" },
      { name: "PHP 8.4", tag: "Production" },
      { name: "HTML", tag: "Primary" },
      { name: "CSS", tag: "Primary" },
      { name: "SQL", tag: "Primary" },
    ],
  },
  {
    id: "frameworks",
    index: "03",
    title: "Frameworks & Libraries",
    codename: "Runtime layer",
    re4Label: "Attachments",
    items: [
      { name: "React", note: "Portfolio & web apps", tag: "Primary" },
      { name: "React Native", tag: "Production" },
      { name: "Tailwind CSS", note: "This portfolio", tag: "Primary" },
      { name: "JavaScript (AJAX)", note: "Async data fetching", tag: "Primary" },
    ],
  },
  {
    id: "platforms",
    index: "04",
    title: "Tools & Platforms",
    codename: "Dev environment",
    re4Label: "Field kit",
    deployedOn: [
      { label: "Glosev live", href: "https://glosev.com/login/index.php" },
      { label: "Portfolio", href: "https://github.com/UmmiHaani/My-Portfolio" },
    ],
    items: [
      { name: "Git", tag: "Primary" },
      { name: "VS Code", tag: "Primary" },
      { name: "Cursor", note: "AI-assisted IDE", tag: "Primary" },
      { name: "MySQL", tag: "Primary" },
      { name: "BlueJ", note: "Coursework", tag: "Academic" },
      { name: "XAMPP", note: "Local LAMP stack", tag: "Academic" },
      { name: "Vercel", note: "Deployment", tag: "Production" },
      { name: "cPanel", note: "Hosting admin", tag: "Production" },
    ],
  },
  {
    id: "infrastructure",
    index: "05",
    title: "Infrastructure & Ops",
    codename: "Backend wiring",
    re4Label: "Support systems",
    items: [
      { name: "API", note: "REST & integration endpoints" },
      { name: "SMTP", note: "Email delivery" },
      { name: "RBAC", note: "Role-based access control" },
      { name: "Cron Jobs", note: "Scheduled tasks" },
    ],
  },
  {
    id: "other",
    index: "06",
    title: "Other",
    codename: "Wildcard slot",
    re4Label: "Misc intel",
    items: [
      {
        name: "Microsoft Excel",
        note: "Advanced — real-time scoring system",
        tag: "Production",
      },
    ],
  },
];

// =====================================================================
//  SURVIVAL-THEMED SITE CONFIG
// =====================================================================
export const SURVIVOR = {
  name: "Mayank Thakur",
  callSign: "Software Engineer",
  classTitle: "Survival Engineer — Class: Software Engineer",
  tagline:
    "I drop into unmapped problem-space and build production React systems that survive real traffic.",
  bio: "3.8+ years of experience building production web and mobile applications, scalable backend systems, and developer tools. I own features end-to-end — from architecture and implementation to testing and deployment — with a strong focus on performance optimization, reusable system design, and developer experience. I've shipped AI-powered products, open-source tools, and multi-tenant SaaS applications used in production.",
  location: "IN · 26.9° N, 75.8° E",
  resume: "/Mayank_Thakur.pdf",
  email: "heymayank2001@gmail.com",
  github: "https://github.com/iammayank18",
  links: {
    github: "https://github.com/iammayank18",
    email: "mailto:heymayank2001@gmail.com",
    linkedin: "https://www.linkedin.com/in/iammayank18",
  },
};

// Decorative survival "vitals" — purely cosmetic HUD numbers
export const VITALS = [
  {
    label: "HP",
    key: "experience",
    value: 92,
    accent: "amber" as const,
    note: "3.8+ yrs in field",
  },
  {
    label: "STAMINA",
    key: "shipping",
    value: 88,
    accent: "forest" as const,
    note: "ships fast",
  },
  {
    label: "SUPPLY",
    key: "coverage",
    value: 85,
    accent: "ink" as const,
    note: "95% test cov.",
  },
];

// Stat block for the Base Camp character card
export const CHAR_STATS = [
  { stat: "REACT / NEXT", value: 90 },
  { stat: "TYPESCRIPT", value: 85 },
  { stat: "REACT NATIVE", value: 85 },
  { stat: "NODE / API", value: 85 },
  { stat: "PERFORMANCE", value: 90 },
  { stat: "TESTING", value: 90 },
];

// Map experience -> "expedition regions"
export const REGION_META: Record<
  string,
  { region: string; biome: string; coord: string }
> = {
  "REAL (NASDAQ: REAX)": {
    region: "THE SIGNAL HIGHLANDS",
    biome: "Real Estate · AI · Web + Mobile",
    coord: "REGION 03",
  },
  Wayverb: {
    region: "FOUNDER'S BASIN",
    biome: "SaaS · 0→1",
    coord: "REGION 02",
  },
  "Mindnerves Technologies": {
    region: "REALTIME LOWLANDS",
    biome: "Mobile · Realtime",
    coord: "REGION 01",
  },
};

// Rarity tiers for the inventory (skills)
export type Rarity = "common" | "rare" | "epic" | "legendary";
export const rarityFor = (level: number): Rarity =>
  level >= 95
    ? "legendary"
    : level >= 88
      ? "epic"
      : level >= 80
        ? "rare"
        : "common";

export const EDUCATION = {
  degree: "B.Tech, Computer Science Engineering",
  school: "Arya College of Engineering and Research Center, Jaipur",
  detail:
    "2019 – 2023 — built freelance CMS/CRM systems alongside the degree, then moved into professional React and product engineering.",
};

// --- Types ---
export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  link?: string;
  category: "SaaS" | "Tool" | "Experiment" | "App";
  notes?: string[];
}

export interface Idea {
  id: string;
  title: string;
  content: string;
  type: "startup" | "sketch" | "note" | "tool";
  rotation: number;
  color: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  achievements: string[];
  marginNote?: string;
}

// --- Data ---
export const IDEAS: Idea[] = [
  {
    id: "1",
    title: "AI Voice-to-UI",
    content:
      "Describe a layout and the tool generates a pixel-perfect React component in a sketchy style.",
    type: "startup",
    rotation: -3,
    color: "bg-yellow-100",
  },
  {
    id: "2",
    title: "Context-Aware AI Pair",
    content:
      "A VS Code extension that understands not just the code, but the design intent from sketches.",
    type: "tool",
    rotation: 2,
    color: "bg-blue-50",
  },
  {
    id: "3",
    title: "Privacy-First Analytics",
    content:
      "Full user behavior tracking without storing a single pii (personally identifiable information).",
    type: "note",
    rotation: -1,
    color: "bg-green-50",
  },
  {
    id: "4",
    title: "Local-First LLM CRM",
    content:
      "A personal CRM that runs entirely in the browser using WebGPU for AI classification.",
    type: "startup",
    rotation: 4,
    color: "bg-pink-50",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "shipitapp",
    title: "ShipIt",
    description:
      "Smart logistics and delivery platform — instant booking with real-time tracking.",
    problem:
      "Logistics and delivery is complex, and individuals/businesses struggle to find fast, cost-effective solutions for moving goods within cities and across regions.",
    solution:
      "A seamless mobile platform where users book deliveries in seconds by entering pickup/drop locations, selecting vehicles (bike/auto/truck), and confirming requests. The system instantly assigns the nearest driver with real-time GPS tracking, optimized routing, verified drivers, and transparent pricing — hassle-free logistics for everyone.",
    tech: [
      "React Native",
      "Typescript",
      "GPS Tracking",
      "Real-time Navigation",
      "Cloud Backend",
    ],
    link: "https://play.google.com/store/apps/details?id=com.shipitlogistics",
    category: "App",
    notes: [
      "Instant booking with quick driver assignment",
      "Real-time GPS tracking",
      "Multiple vehicle options (bike, auto, truck)",
      "Affordable and transparent pricing",
      "Safe and secure delivery handling",
    ],
  },
  {
    id: "unused",
    title: "Unused",
    description:
      "Published VS Code Extension — detect & remove dead code in TS/JS.",
    problem:
      "Codebases accumulate dead code — unused files, unused exports, and commented-out blocks — with no easy way to discover them.",
    solution:
      "A VS Code extension that analyzes your workspace to find unused files, exports, and commented-out code, surfaced in a tree view with folder-level analysis and configurable ignore/include patterns.",
    tech: ["TypeScript", "VS Code API"],
    link: "https://marketplace.visualstudio.com/items?itemName=mayank-thakur.unused",
    category: "Tool",
    notes: [
      "5★ rating on marketplace",
      "Configurable ignore/include patterns",
      "Framework-aware entry points",
    ],
  },
  {
    id: "wayverb",
    title: "Wayverb",
    description: "School Management SaaS — live with paying customers.",
    problem:
      "Indian schools needed a unified platform for fee collection, attendance, exams, and parent-teacher communication.",
    solution:
      "Built solo on MERN + Firebase from idea to paying product in 4 months, with companion React Native apps for teachers and parents.",
    tech: ["React Native", "React.js", "Node.js", "MongoDB", "Firebase"],
    link: "https://wayverb.com",
    category: "SaaS",
    notes: [
      "3 schools · ~2,000 users live",
      "Teacher + parent mobile apps",
      "0→1 in 4 months",
    ],
  },
  {
    id: "echo-ai",
    title: "Echo – AI Voice",
    description: "LLM-powered real-time speech transcription for desktop.",
    problem:
      "Turning live speech into text and structured, context-aware outputs with minimal delay.",
    solution:
      "A desktop app built with Electron, React, and Node.js that streams speech transcription in real time via OpenAI and Groq APIs — an asynchronous audio pipeline with streaming responses delivering sub-second latency from speech to UI.",
    tech: ["Electron.js", "React", "Node.js", "OpenAI", "Groq"],
    link: "https://github.com/iammayank18/echo",
    category: "Tool",
    notes: [
      "Real-time streaming transcription",
      "Sub-second speech→UI latency",
      "Async audio pipeline",
    ],
  },
  {
    id: "focusloop",
    title: "FocusLoop",
    description: "Published Chrome Extension — Pomodoro timer & work tracker.",
    problem:
      "Most focus tools require manual logging; real patterns stay hidden.",
    solution:
      "Automatic URL-based activity logging, Pomodoro timers, and a custom SVG activity heatmap — built in TypeScript using browser APIs directly, zero dependencies.",
    tech: ["TypeScript", "CSS3", "Chrome API V3"],
    link: "https://github.com/iammayank18/focusloop",
    category: "Tool",
    notes: [
      "Auto URL classification",
      "GitHub-style heatmap",
      "Zero dependencies",
    ],
  },
  {
    id: "mimijs",
    title: "mimi.js",
    description: "Open-source Node.js framework — 4× faster than Express.",
    problem:
      "Express is great but slow, and every new project needs the same auth, docs, and database boilerplate wired up from scratch.",
    solution:
      "A TypeScript-first Node.js framework built from scratch — custom radix trie router, middleware pipeline, request parsing, and automatic Swagger generation. v2 removed the Express dependency entirely, hitting ~89k requests/sec (~4× Express), published to npm.",
    tech: ["TypeScript", "Node.js", "Swagger", "JWT"],
    link: "https://github.com/iammayank18/mimi",
    category: "Tool",
    notes: [
      "~89k req/sec (~4× Express)",
      "Custom radix trie router",
      "Auto Swagger generation",
    ],
  },
];

export const LAB_EXPERIMENTS = [
  { title: "React Native New Architecture Migration", status: "Completed" },
  { title: "Multi-LLM Prompt Orchestration", status: "Completed" },
  { title: "Swagger Auto-Doc Generation (mimi.js)", status: "Completed" },
  { title: "GitHub-style Heatmap Dashboard", status: "Completed" },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "REAL (NASDAQ: REAX)",
    role: "Software Engineer",
    period: "Feb 2024 – Mar 2026",
    description:
      "Built agent-facing product across web (React.js/Next.js) and mobile (React Native) — from the onboarding flow to AI-assisted workflows — owning features from architecture through production delivery.",
    tech: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "Redux",
      "TanStack Query",
      "Tailwind CSS",
      "Jest",
      "Vitest",
      "Playwright",
      "Detox",
    ],
    achievements: [
      "Redesigned the agent onboarding flow across web and mobile applications, increasing onboarding completion by 40%.",
      "Built production chat and voice experiences for LEO AI by integrating REST and streaming APIs, enabling real-time AI-assisted workflows for real estate agents.",
      "Designed and maintained a shared React/TypeScript component library of 100+ reusable components adopted across web and mobile.",
      "Converted 50+ Figma designs into responsive, production-ready interfaces while maintaining consistency across platforms.",
      "Achieved 95% test coverage across critical user journeys using Playwright, Jest, Vitest, and Detox.",
      "Reduced page load time from ~5.0s to 1.78s (64%) through route-level code splitting, lazy loading, rendering optimizations, and API request deduplication.",
    ],
    marginNote: "LEO AI + agent platform 🤖",
  },
  {
    company: "Wayverb",
    role: "Founder & Software Engineer",
    period: "Apr 2023 – Jan 2024",
    description:
      "Built and launched a multi-tenant school management SaaS using React, Next.js, React Native, NestJS, MongoDB, and MySQL — supporting administrators, teachers, students, and parents across 3 schools and ~2,000 users.",
    tech: ["React", "Next.js", "React Native", "NestJS", "MongoDB", "MySQL"],
    achievements: [
      "Architected a single API layer consumed by web and mobile applications, eliminating duplicated business logic and simplifying feature development.",
      "Designed secure authentication and authorization using JWT, refresh-token rotation, and role-based access control (RBAC), enforced consistently at both API and UI layers.",
      "Managed production infrastructure independently using Docker, GitHub Actions, AWS EC2, and S3 — building automated deployment pipelines and maintaining production reliability.",
      "Worked directly with school administrators to gather requirements, validate product ideas, and translate operational workflows into shipped features.",
    ],
    marginNote: "0→1 ownership 🛠️",
  },
  {
    company: "Mindnerves Technologies",
    role: "Software Engineer Intern",
    period: "Jul 2022 – Mar 2023",
    description:
      "Built and shipped React Native and Next.js features for a real-time job tracking platform used by thousands of active users.",
    tech: [
      "React Native",
      "React",
      "Next.js",
      "TanStack Query",
      "TypeScript",
      "Node.js",
    ],
    achievements: [
      "Reduced redundant API requests by ~25% through cache-first data fetching with TanStack Query and request deduplication, improving responsiveness for thousands of active users.",
      "Developed reusable UI components and integrated backend APIs for Publir, a digital monetization platform.",
      "Collaborated through code reviews, QA cycles, and automated CI pipelines to deliver production-ready functionality.",
    ],
    marginNote: "Real-time specialist ⚡",
  },
];

export const SKILLS_ROADMAP = [
  {
    year: "2020",
    title: "Foundation & Freelance",
    description: "Built the base with HTML, CSS, and Freelance projects.",
    skills: [
      {
        name: "HTML/CSS",
        level: 100,
        details: "Semantic HTML & Responsive Design.",
      },
      {
        name: "JavaScript",
        level: 95,
        details: "Problem solving and core fundamentals.",
      },
      {
        name: "Full Stack (Node)",
        level: 85,
        details: "Built complete CMS & CRM systems.",
      },
    ],
    status: "mastered",
  },
  {
    year: "2021",
    title: "Professional Era",
    description: "Dived into React and high-impact Fintech systems.",
    skills: [
      {
        name: "React.js",
        level: 95,
        details: "Expert in component patterns and hooks.",
      },
      {
        name: "CI/CD & AWS",
        level: 70,
        details: "Automating deployments and cloud infrastructure.",
      },
      {
        name: "Optimization",
        level: 90,
        details: "Bundle size reduction and code splitting.",
      },
    ],
    status: "mastered",
  },
  {
    year: "2022-2023",
    title: "Scale & Real-time",
    description:
      "Handling multiple users with WebSockets and high performance.",
    skills: [
      {
        name: "TypeScript",
        level: 85,
        details: "Strictly typed large-scale applications.",
      },
      {
        name: "WebSockets",
        level: 95,
        details: "High-frequency real-time communications.",
      },
      {
        name: "PostgreSQL/MySQL",
        level: 85,
        details: "Optimizing database queries and indexing.",
      },
    ],
    status: "mastered",
  },
  {
    year: "2024-2025",
    title: "Architecture & AI",
    description: "Leading Software systems and integrating LLM APIs.",
    skills: [
      {
        name: "LLM Integration",
        level: 70,
        details: "Leveraging OpenAI/Anthropic APIs for smart features.",
      },
      {
        name: "Testing (Playwright)",
        level: 95,
        details: "95% test coverage on complex flows.",
      },
      {
        name: "Privacy-first Arch",
        level: 95,
        details: "Building secure, privacy-centric user journeys.",
      },
    ],
    status: "mastered",
  },
  {
    year: "2026",
    title: "The Future Frontier",
    description: "Refining complex system designs and beyond.",
    skills: [
      {
        name: "Advanced LLM Orchestration",
        level: 100,
        details: "Scaling AI-powered workflows and agents.",
      },
      {
        name: "Edge Computing",
        level: 80,
        details: "Running localized AI models on client devices.",
      },
    ],
    status: "learning",
  },
];

export const ABOUT_SKILLS = [
  {
    name: "React & Next.js",
    level: 90,
    details:
      "Expert in building scalable web apps with React.js, Next.js (App Router), and Redux/Zustand.",
  },
  {
    name: "React Native",
    level: 85,
    details:
      "Developing high-performance cross-platform mobile applications with Expo and native bridges.",
  },
  {
    name: "TypeScript",
    level: 85,
    details:
      "Architecting type-safe codebases for better maintainability and developer experience.",
  },
  {
    name: "JavaScript",
    level: 95,
    details:
      "Strong core fundamentals, modern ES6+ patterns, and problem-solving across Software and backend.",
  },
  {
    name: "Python",
    level: 60,
    details:
      "Building basic REST APIs with FastAPI plus scripts for automation and data handling, currently leveling up from fundamentals to production-ready patterns.",
  },

  {
    name: "Node.js",
    level: 85,
    details:
      "Building scalable backend services, RESTful APIs, and real-time WebSocket layers.",
  },
  {
    name: "Express.js",
    level: 85,
    details:
      "Designing secure, high‑throughput REST APIs with structured routing, middleware, and JWT-based auth.",
  },
  {
    name: "Nest.js",
    level: 85,
    details:
      "Architecting modular, type-safe backends with dependency injection, guards, interceptors, GraphQL, and Prisma.",
  },
  {
    name: "MongoDB",
    level: 75,
    details:
      "Designing document-based schemas and querying efficiently for production applications.",
  },
  {
    name: "Tailwind CSS",
    level: 95,
    details:
      "Rapidly delivering modern, responsive, and performance-optimized user interfaces.",
  },
  {
    name: "Testing (Jest/Vitest/Playwright)",
    level: 90,
    details:
      "Achieving 95% coverage on critical flows with unit, integration, and E2E tests.",
  },
  {
    name: "State Management",
    level: 90,
    details:
      "Redux Toolkit, React Query, and Zustand across large-scale web and mobile applications.",
  },
];

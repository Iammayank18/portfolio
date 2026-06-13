// =====================================================================
//  SURVIVAL-THEMED SITE CONFIG
// =====================================================================
export const SURVIVOR = {
  name: "Mayank Thakur",
  callSign: "Frontend Engineer",
  classTitle: "Survival Engineer — Class: Frontend",
  tagline:
    "I drop into unmapped problem-space and build production React systems that survive real traffic.",
  bio: "4+ years in the field shipping production React, React Native and Node systems to 5,000+ users across fintech, AI and SaaS. I build component architectures, kill performance regressions, and own features from raw requirements to live deployment. I travel light: type-safe, tested, and fast.",
  location: "IN · 28.6° N, 77.2° E",
  resume: "/Mayank_Thakur_.pdf",
  email: "abhinavthakur958@gmail.com",
  github: "https://github.com/iammayank18",
  links: {
    github: "https://github.com/iammayank18",
    email: "mailto:abhinavthakur958@gmail.com",
  },
};

// Decorative survival "vitals" — purely cosmetic HUD numbers
export const VITALS = [
  { label: "HP", key: "experience", value: 92, accent: "amber" as const, note: "4+ yrs in field" },
  { label: "STAMINA", key: "shipping", value: 88, accent: "forest" as const, note: "ships fast" },
  { label: "SUPPLY", key: "coverage", value: 85, accent: "ink" as const, note: "85% test cov." },
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
export const REGION_META: Record<string, { region: string; biome: string; coord: string }> = {
  "REAL (Reax Technology)": { region: "THE SIGNATURE HIGHLANDS", biome: "Fintech · Web + Mobile", coord: "REGION 03" },
  Wayverb: { region: "FOUNDER'S BASIN", biome: "SaaS · 0→1", coord: "REGION 02" },
  "Mindnerves Technologies": { region: "REALTIME LOWLANDS", biome: "Mobile · Realtime", coord: "REGION 01" },
};

// Rarity tiers for the inventory (skills)
export type Rarity = "common" | "rare" | "epic" | "legendary";
export const rarityFor = (level: number): Rarity =>
  level >= 95 ? "legendary" : level >= 88 ? "epic" : level >= 80 ? "rare" : "common";

export const EDUCATION = {
  degree: "B.Tech, Computer Science",
  school: "Self-directed + formal foundation",
  detail:
    "Foundations from 2020 onward — built freelance CMS/CRM systems, then moved into professional React and fintech engineering.",
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
  category: "SaaS" | "Tool" | "Experiment";
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
      "2 schools live & generating revenue",
      "Teacher + parent mobile apps",
      "0→1 in 4 months",
    ],
  },
  {
    id: "echo-ai",
    title: "Echo – AI Voice",
    description: "AI Voice-to-Intelligence App for macOS.",
    problem:
      "Converting speech input into structured, context-aware outputs from audio.",
    solution:
      "Orchestrates across OpenAI, Anthropic, and GROQ APIs with secure key management inside a clean Electron.js shell.",
    tech: ["Electron.js", "JavaScript", "OpenAI", "Anthropic", "GROQ"],
    link: "https://github.com/iammayank18/echo",
    category: "Tool",
    notes: [
      "macOS native experience",
      "Multi-LLM orchestration",
      "Secure key management",
    ],
  },
  {
    id: "focusloop",
    title: "FocusLoop",
    description: "Published Chrome Extension — Pomodoro timer & work tracker.",
    problem:
      "Most focus tools require manual logging; real patterns stay hidden.",
    solution:
      "Automatic URL-based activity logging, Pomodoro timers, and a GitHub-style heatmap dashboard. Zero dependencies, pure JS.",
    tech: ["Vanilla JS", "CSS3", "Chrome API V3"],
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
      "A standalone Node.js framework (not built on Express) with auto route loading, built-in JWT auth, bcrypt, auto-generated Swagger docs from JSDoc, and MongoDB/SQLite adapters — batteries included, zero config.",
    tech: ["JavaScript", "TypeScript", "Node.js", "Swagger", "JWT"],
    link: "https://github.com/iammayank18/mimi",
    category: "Tool",
    notes: [
      "4× faster than Express",
      "Auto route loading",
      "Built-in JWT + Swagger",
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
    company: "REAL (Reax Technology)",
    role: "Software Engineer",
    period: "Feb 2024 – Mar 2026",
    description:
      "Owned the digital signature platform across web (React.js/Next.js) and mobile (React Native), designing component architecture, state management, and API integrations from requirements through production delivery.",
    tech: ["React.js", "Next.js", "React Native", "TypeScript", "Redux", "TanStack Query", "Tailwind CSS", "Jest", "Playwright", "Datadog"],
    achievements: [
      "Designed a shared React.js + React Native component library in TypeScript — single source of truth for UI patterns across web and mobile teams, with composable APIs and WCAG/ARIA compliance.",
      "Optimized the Bolt CRM Real Estate platform by identifying a 35% performance regression and resolving bundle size and Redux hydration bottlenecks through code splitting, lazy loading, and deferred initialization.",
      "Improved React Native application performance using React DevTools and Flipper, validating fixes and monitoring production stability with Datadog.",
      "Defined API contracts with backend teams, aligning request/response schemas, validation rules, and error handling before implementation to reduce integration defects.",
      "Maintained 85% test coverage across critical workflows and reviewed pull requests to enforce type safety, predictable state management, and clean component boundaries."
    ],
    marginNote: "Digital signature platform ✍️",
  },
  {
    company: "Wayverb",
    role: "Founder & Software Engineer",
    period: "Apr 2023 – Jan 2024",
    description:
      "Built a school management SaaS using React.js, React Native, Node.js, NestJS, and MongoDB, supporting administrators, teachers, parents, and students through a shared backend architecture.",
    tech: ["React", "React Native", "Node.js", "NestJS", "MongoDB"],
    achievements: [
      "Architected a single API layer consumed by web and mobile applications, eliminating duplicated business logic and simplifying feature development.",
      "Implemented JWT authentication, refresh-token rotation, and RBAC across multiple user roles, enforcing authorization consistently at both API and UI layers.",
      "Revised the database schema twice after conducting customer discovery with schools, aligning the product data model with real operational workflows.",
      "Managed AWS infrastructure, Docker deployments, GitHub Actions CI/CD pipelines, and production debugging independently."
    ],
    marginNote: "0→1 ownership 🛠️",
  },
  {
    company: "Mindnerves Technologies",
    role: "Software Engineer Intern",
    period: "Jul 2022 – Mar 2023",
    description:
      "Built and shipped React Native features for a real-time job tracking platform used by thousands of active users.",
    tech: ["React Native", "React", "TanStack Query", "TypeScript", "Node.js"],
    achievements: [
      "Reduced redundant API requests by ~25% by migrating data fetching to TanStack Query and implementing cache-first patterns with request deduplication.",
      "Built and shipped React Native features used by thousands of active users.",
      "Collaborated through code reviews, QA cycles, and automated CI pipelines to deliver production-ready functionality."
    ],
    marginNote: "Real-time specialist ⚡",
  }
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
    description: "Handling 5,000+ users with WebSockets and high performance.",
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
    description: "Leading frontend systems and integrating LLM APIs.",
    skills: [
      {
        name: "LLM Integration",
        level: 70,
        details: "Leveraging OpenAI/Anthropic APIs for smart features.",
      },
      {
        name: "Testing (Playwright)",
        level: 95,
        details: "90%+ test coverage on complex flows.",
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
    name: "JavaScript",
    level: 95,
    details:
      "Strong core fundamentals, modern ES6+ patterns, and problem-solving across frontend and backend.",
  },
  {
    name: "React Native",
    level: 85,
    details:
      "Developing high-performance cross-platform mobile applications with native bridges.",
  },
  {
    name: "TypeScript",
    level: 85,
    details:
      "Architecting type-safe codebases for better maintainability and developer experience.",
  },
  {
    name: "Node.js",
    level: 85,
    details:
      "Building scalable backend services, RESTful APIs, and real-time WebSocket layers.",
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
      "Achieving 85%+ coverage on critical flows with unit, integration, and E2E tests.",
  },
  {
    name: "State Management",
    level: 90,
    details:
      "Redux Toolkit, React Query, and Zustand across large-scale web and mobile applications.",
  },
];

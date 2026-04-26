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
    company: "Reax Technology Platform Pvt Ltd (NASDAQ: REAX)",
    role: "Frontend Engineer",
    period: "Feb 2024 – Feb 2026",
    description:
      "Owned end-to-end delivery for a real estate platform serving 30,000+ agents across the US and Canada — real-time UIs, multi-step call flows, and React Native New Architecture migration.",
    tech: ["React.js", "Next.js", "TypeScript", "React Native", "Redux Toolkit", "Vitest", "Detox"],
    achievements: [
      "Platform used by 30,000+ agents — built real-time status UIs, multi-step call flow interfaces, and session screens collaborating with PMs and designers from spec to production",
      "Migrated key mobile flows to React Native New Architecture, eliminating JS bridge lag from agents' core daily workflows",
      "Reduced page load time by 35% via code splitting, lazy loading, and Redux Toolkit state management refactors",
      "Achieved 85% test coverage using Detox and Vitest — cut release-blocking regressions to near-zero",
    ],
    marginNote: "30k+ agents served 🏗️",
  },
  {
    company: "Freelance Full Stack Developer",
    role: "Full Stack Developer",
    period: "Apr 2023 – Jan 2024",
    description:
      "Shipped full-stack web apps for 5+ clients — auth systems, admin dashboards, and REST APIs — taking each from 0 to 1 with full technical ownership and no team.",
    tech: ["Next.js", "React", "Node.js", "MongoDB", "REST APIs"],
    achievements: [
      "Shipped full-stack apps for 5+ clients — auth systems, admin dashboards, and REST API integrations from scoping to production",
      "Owned every technical decision independently: stack selection, architecture, API design, and deployment",
    ],
    marginNote: "0→1 ownership 🛠️",
  },
  {
    company: "Mindnerves Technologies",
    role: "Software Engineer",
    period: "Jul 2022 – Mar 2023",
    description:
      "Built React Native mobile screens and analytics dashboards for high-traffic real-time applications.",
    tech: ["React Native", "React", "TypeScript", "React Query", "Node.js"],
    achievements: [
      "Built React Native screens for a real-time job-tracking app serving 5,000+ users",
      "Built analytics dashboards giving managers real-time visibility across 10+ platforms",
      "Migrated data fetching to React Query — improved API efficiency by 25% and eliminated redundant network calls",
    ],
    marginNote: "Real-time specialist ⚡",
  },
  {
    company: "Meon AI",
    role: "Frontend Developer",
    period: "Dec 2021 – Jun 2022",
    description:
      "Built the end-to-end user journey for an identity verification platform with 10,000+ monthly users.",
    tech: ["HTML", "CSS", "JavaScript", "Figma"],
    achievements: [
      "Built complete end-to-end user journey for identity verification — multi-step onboarding, document upload, and real-time validation for 10,000+ monthly users",
      "Shipped 10+ consumer-facing features with pixel-accurate Figma handoff — zero design gaps, reducing review cycles",
    ],
    marginNote: "Fintech focused 🏦",
  },
  {
    company: "Exponus Media",
    role: "Frontend Developer",
    period: "Jan 2021 – Oct 2021",
    description:
      "Delivered 10+ web projects for small business clients during college — from requirements to deployment, fully solo.",
    tech: ["WordPress", "HTML/CSS", "JavaScript", "PHP"],
    achievements: [
      "Delivered 10+ client web projects solo during college — from scoping to deployment",
    ],
    marginNote: "Part-time during studies 📚",
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
    name: "Testing (Jest/Vitest/Detox)",
    level: 90,
    details:
      "Achieving 85%+ coverage on critical flows with unit, integration, and mobile E2E tests.",
  },
  {
    name: "State Management",
    level: 90,
    details:
      "Redux Toolkit, React Query, and Zustand across large-scale web and mobile applications.",
  },
];

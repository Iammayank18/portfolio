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
    id: "echo-ai",
    title: "Echo – AI Voice",
    description: "AI Voice-to-Intelligence App for macOS.",
    problem:
      "Converting speech input into structured text and images while maintaining context-aware actionable outputs.",
    solution:
      "Designed prompt orchestration and response parsing logic using Electron.js and LLM APIs (OpenAI, Anthropic).",
    tech: ["Electron.js", "JavaScript", "LLM APIs", "GROQ"],
    link: "https://github.com/iammayank18/echo",
    category: "Tool",
    notes: [
      "MacOS Native experience",
      "ML/NLP integration",
      "Prompt Engineering focus",
    ],
  },
  {
    id: "focusloop",
    title: "FocusLoop",
    description: "Chrome Extension (Pomodoro Timer & Work Tracker).",
    problem:
      "Maintaining deep focus and automatically classifying digital work sessions for insights.",
    solution:
      "Built a Chrome V3 extension with smart URL auto-tracking and an interactive analytics dashboard.",
    tech: ["Vanilla JS", "CSS", "Chrome API", "Heatmaps"],
    link: "https://focusloop-app.vercel.app/",
    category: "SaaS",
    notes: [
      "Heatmap activity tracking",
      "Smart URL classification",
      "Productivity first",
    ],
  },
  {
    id: "ekyc-platform",
    title: "eKYC Government ID",
    description: "End-to-end identity verification platform.",
    problem:
      "Scaling identity verification to over 10,000+ monthly checks with high security.",
    solution:
      "Architected a robust frontend and optimization strategy that reduced bundle size by 35%.",
    tech: ["React", "Security", "CI/CD", "AWS"],
    category: "SaaS",
    notes: [
      "10k+ monthly verifications",
      "Optimized for low-bandwidth",
      "Strict data privacy",
    ],
  },
];

export const LAB_EXPERIMENTS = [
  { title: "LLM Prompt Orchestration", status: "Completed" },
  { title: "Privacy-first Temporary Calling", status: "Completed" },
  { title: "Digital Signature Platform", status: "Completed" },
  { title: "Visual Heatmap Dashboard", status: "Experimental" },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Reax Technology Platform Pvt Ltd",
    role: "Frontend Engineer",
    period: "Feb 2024 – Mar 2026",
    description:
      "Collaborated with frontend, backend, and design teams to ship privacy-first systems for 1,000+ concurrent users across fintech and B2B workflows.",
    tech: ["React.js", "TypeScript", "Jest", "Playwright", "Next.js"],
    achievements: [
      "Built & shipped privacy-first temporary calling system with cross-functional team",
      "Delivered React.js UI for digital signature platform serving 1,000+ brokers",
      "Improved performance 40–50% via rendering optimizations and code splitting",
      "Wrote 70% of all tests — achieved 90% coverage and cut review cycles by 60%",
    ],
    marginNote: "Privacy-first architect 🔐",
  },
  {
    company: "Self-Directed",
    role: "Freelance Frontend Developer",
    period: "Apr 2023 – Jan 2024",
    description:
      "Delivered freelance React and TypeScript projects while deepening expertise in modern state management, SSR, and testing best practices.",
    tech: ["React", "TypeScript", "Next.js", "Zustand", "React Query", "Jest"],
    achievements: [
      "Delivered end-to-end React & TypeScript projects for small businesses",
      "Deepened expertise in Zustand, React Query, and Next.js App Router",
      "Strengthened testing practices with Jest and React Testing Library",
    ],
    marginNote: "Always learning 📚",
  },
  {
    company: "Mindnerves Technologies",
    role: "Software Engineer",
    period: "Jul 2022 – Mar 2023",
    description:
      "Built high-performance real-time applications using WebSocket protocols and efficient database indexing.",
    tech: ["React", "TypeScript", "WebSocket", "PostgreSQL", "Node.js"],
    achievements: [
      "Shipped real-time job tracking app for 5,000+ active users",
      "Built analytics dashboard tracking behavior across 10+ platforms with millisecond precision",
      "Improved API response times by 30% through query optimization and indexing",
    ],
    marginNote: "Real-time specialist ⚡",
  },
  {
    company: "Meon AI",
    role: "Frontend Developer",
    period: "Dec 2021 – Jun 2022",
    description:
      "Designed and delivered digital fintech platforms with a focus on identity verification and user trust.",
    tech: ["React", "Security", "Optimization", "eKYC"],
    achievements: [
      "10,000+ identity verifications per month on eKYC platform",
      "Built fully digital E-IPO system reducing processing time from days to hours",
      "Reduced bundle size by 35% — improved Lighthouse score from ~55 to 80+",
    ],
    marginNote: "Fintech focused 🏦",
  },
  {
    company: "Exponus Media",
    role: "Frontend Developer",
    period: "Jan 2021 – Oct 2021",
    description:
      "Delivered 15+ web and mobile projects with high client satisfaction and effective sprint planning.",
    tech: ["HTML/CSS", "JavaScript", "React", "WordPress", "AWS"],
    achievements: [
      "Delivered 15+ client projects with 95% satisfaction rate",
      "Reduced deployment time by 40% via CI/CD with GitHub Actions",
      "Consistently completed projects 20% ahead of schedule",
    ],
    marginNote: "Speed-to-market pro 🚀",
  },
  {
    company: "Self-Employed",
    role: "Full Stack Developer",
    period: "Jan 2020 – Dec 2020",
    description:
      "Managed the full development lifecycle for CMS and CRM systems for international clients.",
    tech: ["Full Stack", "CMS", "CRM", "Node.js"],
    achievements: [
      "100% on-time project delivery rate across all engagements",
      "Architected scalable CMS & CRM systems for international clients",
    ],
    marginNote: "Entrepreneurial spirit 🌱",
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
        level: 65,
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
        level: 50,
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
    level: 65,
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
    name: "Testing (Playwright)",
    level: 95,
    details:
      "Ensuring 90%+ quality standards with automated E2E and unit testing suites.",
  },
  {
    name: "LLM Integration",
    level: 40,
    details:
      "Integrating AI-powered features using OpenAI and Anthropic APIs into production.",
  },
];

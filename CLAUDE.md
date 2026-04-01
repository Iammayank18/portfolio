# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build (output: dist/)
npm run preview      # Preview production build
npm run lint         # Type-check only (tsc --noEmit) — no ESLint configured
npm run clean        # Remove dist/
```

**Environment setup:** Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.

## Architecture

This is a **single-page portfolio** built as a Google AI Studio app. The entire application lives in `src/App.tsx` — one large file with no routing, no state management library, and no component splitting across files.

**Tech stack:**
- React 19 + TypeScript, built with Vite 6
- **Tailwind CSS v4** (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- **Framer Motion** (`motion/react`) for declarative animations
- **GSAP + ScrollTrigger** for imperative scroll-driven animations
- **`@google/genai`** SDK available (Gemini API key injected via `vite.config.ts`)

**Data is hardcoded** in `App.tsx` as const arrays: `PROJECTS`, `IDEAS`, `EXPERIENCE`, `SKILLS_ROADMAP`, `LAB_EXPERIMENTS`. To update portfolio content, edit these arrays directly.

**Custom CSS utilities** in `src/index.css`:
- `sketch-border` — organic hand-drawn border radius
- `sketch-underline` — animated underline that thickens on hover
- `scribble-hover` — yellow scribble background on hover
- `animate-wobble`, `animate-draw` — custom keyframe animations
- `font-sketch` maps to **Gochi Hand** (Google Font), `font-mono` to **JetBrains Mono**

**Animation pattern:** The app uses both GSAP and Motion together. GSAP is used imperatively inside `useEffect`/`useLayoutEffect` with `gsap.context()` for cleanup. Motion/Framer is used declaratively via JSX props (`initial`, `animate`, `whileInView`, etc.). `useScroll` + `useSpring` + `useTransform` from Motion drive the scroll progress bar.

**Path alias:** `@` resolves to the project root (not `src/`).

**HMR:** Disabled when `DISABLE_HMR=true` (AI Studio environment). Works normally in local dev.

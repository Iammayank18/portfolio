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

This is a **single-page portfolio** with an **open-world-survival** theme. The UI chrome is **white / monochrome** by day (amber = campfire, forest green = wilderness accents) over a **colorful low-poly diorama world** (bruno-simon.com-inspired), and the whole page falls into a dark night theme as you scroll (driven by the `--night` CSS variable). No routing, no state-management library. `src/App.tsx` is a thin shell; UI is split into `src/sections/` and `src/components/`.

**Tech stack:**
- React 19 + TypeScript, built with Vite 6
- **Tailwind CSS v4** (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- **Three.js** (vanilla) for the fixed background 3D world
- **Framer Motion** (`motion/react`) for declarative animations
- **GSAP + ScrollTrigger** for imperative scroll-driven animations
- **Lenis** for smooth momentum scrolling (driven by GSAP's ticker)

**The 3D world** lives in `src/three/world.ts` (`SurvivalWorld` class — low-poly diorama: altitude-colored terrain (meadow→rock→snow peaks) with a baked dirt trail, instanced green pines/rocks, campfire + tent camp, gradient sky dome, sun, drifting clouds, soft sun shadows). A **scroll-driven day→night cycle** dims the lights, sinks the sun, and brings out stars, aurora curtains, fireflies, and shooting stars; a low-poly **trekker character walks the trail to camp** as the page scrolls, arriving at the fire by nightfall. Mounted full-screen behind the page by `src/components/WorldCanvas.tsx`, which feeds it pointer + scroll (and sets the `--night` CSS variable that flips the page theme). Fails silently if WebGL is unavailable.

**Sections** (`src/sections/`), each themed: `Hero` (title screen), `BaseCamp` (about + character sheet), `Expeditions` (experience as a GSAP-drawn trail), `Inventory` (skills as rarity-tiered item slots), `Crafted` (projects as openable blueprints), `FieldNotes` (draggable ideas + experiment log), `Signal` (contact), `Footer`.

**Chrome components** (`src/components/`): `NavBar`, `HUD` (vitals/coords/travel meter overlay), `Cursor` (reticle), `Loader` (boot screen), `SectionHeader`.

**Data is hardcoded** in `src/data.ts` as const arrays/objects: `SURVIVOR`, `VITALS`, `CHAR_STATS`, `REGION_META`, `PROJECTS`, `IDEAS`, `EXPERIENCE`, `ABOUT_SKILLS`, `SKILLS_ROADMAP`, `LAB_EXPERIMENTS`. To update portfolio content, edit these directly.

**Theme tokens** in `src/index.css`: CSS variables `--ink/--ash/--fog/--paper/--amber/--forest/--line`; utilities `panel`, `panel-soft`, `slot`, `ticked`, `meter`, `hud-*`, `btn-ink`, `btn-ghost`, `display-xl/lg`, `text-outline`, `reticle`, `grain`. Fonts: `--font-display` = **Space Grotesk**, `--font-mono` = **JetBrains Mono**, `--font-sans` = **Inter**.

**Animation pattern:** GSAP is used imperatively inside `useEffect` with `gsap.context()` for cleanup (Expeditions trail + reveals, smooth scroll). Motion/Framer is used declaratively via JSX props (`initial`, `whileInView`, stagger, drag, `AnimatePresence`).

**Path alias:** `@` resolves to the project root (not `src/`).

**HMR:** Disabled when `DISABLE_HMR=true` (AI Studio environment). Works normally in local dev.

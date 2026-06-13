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

This is a **single-page portfolio** with an **open-world-survival** theme on a **white / monochrome** palette (amber = campfire, forest green = wilderness as the only accents). No routing, no state-management library. `src/App.tsx` is a thin shell; UI is split into `src/sections/` and `src/components/`.

**Tech stack:**
- React 19 + TypeScript, built with Vite 6
- **Tailwind CSS v4** (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- **Three.js** (vanilla) for the fixed background 3D world
- **Framer Motion** (`motion/react`) for declarative animations
- **GSAP + ScrollTrigger** for imperative scroll-driven animations
- **Lenis** for smooth momentum scrolling (driven by GSAP's ticker)

**The 3D world** lives in `src/three/world.ts` (`SurvivalWorld` class — low-poly white terrain, instanced trees/rocks, flickering campfire, drifting motes, fog). It's mounted full-screen behind the page by `src/components/WorldCanvas.tsx`, which feeds it pointer + scroll so the camera dollies through the world as you scroll. Fails silently if WebGL is unavailable.

**Sections** (`src/sections/`), each themed: `Hero` (title screen), `BaseCamp` (about + character sheet), `Expeditions` (experience as a GSAP-drawn trail), `Inventory` (skills as rarity-tiered item slots), `Crafted` (projects as openable blueprints), `FieldNotes` (draggable ideas + experiment log), `Signal` (contact), `Footer`.

**Chrome components** (`src/components/`): `NavBar`, `HUD` (vitals/coords/travel meter overlay), `Cursor` (reticle), `Loader` (boot screen), `SectionHeader`.

**Data is hardcoded** in `src/data.ts` as const arrays/objects: `SURVIVOR`, `VITALS`, `CHAR_STATS`, `REGION_META`, `PROJECTS`, `IDEAS`, `EXPERIENCE`, `ABOUT_SKILLS`, `SKILLS_ROADMAP`, `LAB_EXPERIMENTS`. To update portfolio content, edit these directly.

**Theme tokens** in `src/index.css`: CSS variables `--ink/--ash/--fog/--paper/--amber/--forest/--line`; utilities `panel`, `panel-soft`, `slot`, `ticked`, `meter`, `hud-*`, `btn-ink`, `btn-ghost`, `display-xl/lg`, `text-outline`, `reticle`, `grain`. Fonts: `--font-display` = **Space Grotesk**, `--font-mono` = **JetBrains Mono**, `--font-sans` = **Inter**.

**Animation pattern:** GSAP is used imperatively inside `useEffect` with `gsap.context()` for cleanup (Expeditions trail + reveals, smooth scroll). Motion/Framer is used declaratively via JSX props (`initial`, `whileInView`, stagger, drag, `AnimatePresence`).

**Path alias:** `@` resolves to the project root (not `src/`).

**HMR:** Disabled when `DISABLE_HMR=true` (AI Studio environment). Works normally in local dev.

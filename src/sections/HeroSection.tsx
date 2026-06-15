import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { Download, ArrowRight } from "lucide-react";
import { useHeroAnimations } from "../hooks/useHeroAnimations";
import { useMagnetic } from "../hooks/useMagnetic";
import { RevealText } from "../components/RevealText";
import { Marquee } from "../components/Marquee";

// Three.js is heavy — load the WebGL centerpiece in its own chunk so it
// never blocks first paint of the hero content.
const SketchScene = lazy(() =>
  import("../components/SketchScene").then((m) => ({ default: m.SketchScene })),
);

const STATS = [
  { value: "3.5+", label: "Years" },
  { value: "30K+", label: "Users" },
  { value: "4", label: "Products" },
];

const ROLES = [
  "Full-Stack Developer",
  "React & TypeScript",
  "UI / UX Engineering",
  "Node · APIs",
  "Creative Software",
  "Product Builder",
];

export const HeroSection = ({ isBooting }: { isBooting: boolean }) => {
  useHeroAnimations(isBooting);
  const downloadRef = useMagnetic<HTMLAnchorElement>({ strength: 0.5 });
  const projectsRef = useMagnetic<HTMLAnchorElement>({ strength: 0.5 });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >
      {/* WebGL centerpiece */}
      <Suspense fallback={null}>
        <SketchScene className="absolute inset-0 z-0 pointer-events-none" />
      </Suspense>

      {/* Corner index — editorial furniture */}
      <div className="absolute top-24 left-4 md:left-6 z-10 font-mono text-[10px] tracking-widest text-gray-400 hidden sm:block">
        001 / PORTFOLIO
      </div>
      <div className="absolute top-24 right-4 md:right-6 z-10 font-mono text-[10px] tracking-widest text-gray-400 hidden sm:block text-right">
        EST. 2022
        <br />
        BENGALURU · IN
      </div>

      {/* Left vertical rail */}
      <div className="absolute left-4 md:left-6 bottom-28 z-10 hidden md:block">
        <span className="vertical-rl font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500">
          © 2026 — Mayank Thakur
        </span>
      </div>

      {/* Right vertical rail */}
      <div className="absolute right-4 md:right-6 bottom-28 z-10 hidden md:flex flex-col items-center gap-3">
        <span className="vertical-rl font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500">
          Scroll to explore
        </span>
        <motion.span
          className="block w-px h-16 bg-gradient-to-b from-gray-400 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* Center stage */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* availability + kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-full px-4 py-1.5 mb-6 glass"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Software Engineer · Open to Work
        </motion.div>

        {/* Oversized name — wireframe shows through (mix-blend) */}
        <div
          className="font-sketch select-none"
          style={{ mixBlendMode: "multiply" }}
        >
          <RevealText as="div" delay={0.15} className="hero-display block">
            Mayank
          </RevealText>
          <RevealText
            as="div"
            delay={0.3}
            className="hero-display text-outline block -mt-2 md:-mt-6"
          >
            Thakur
          </RevealText>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-xl md:text-2xl font-sketch text-gray-600 max-w-xl hero-subtitle">
          Building products with code, sketches, and a bit of{" "}
          <span className="sketch-underline">obsession</span> for UX.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            ref={downloadRef}
            href="/Mayank_Thakur.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 sketch-border bg-black text-white font-sketch text-lg hover:bg-gray-800 transition-colors will-change-transform"
          >
            <Download size={18} />
            Download CV
          </a>
          <a
            ref={projectsRef}
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 sketch-border bg-white/70 backdrop-blur-sm font-sketch text-lg hover:bg-yellow-50 transition-colors will-change-transform"
          >
            View Projects
            <ArrowRight size={18} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-10 flex items-center gap-6"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-sketch text-2xl md:text-3xl text-gray-800 leading-none">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
              {i < STATS.length - 1 && <div className="w-px h-8 bg-black/10" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom role marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 border-y-2 border-black/80 bg-[#fdfcf8]/70 backdrop-blur-sm py-3"
      >
        <Marquee
          items={ROLES}
          className="font-sketch text-2xl md:text-3xl text-[#1a1a1a]"
        />
      </motion.div>
    </section>
  );
};

import { motion } from "motion/react";
import { ChevronDown, Download, ArrowRight } from "lucide-react";
import { useHeroAnimations } from "../hooks/useHeroAnimations";

const STATS = [
  { value: "4.5+", label: "Years" },
  { value: "5,000+", label: "Users" },
  { value: "3", label: "Products" },
];

export const HeroSection = ({ isBooting }: { isBooting: boolean }) => {
  useHeroAnimations(isBooting);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      <div className="text-center z-10">
        {/* Role + availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-2 font-mono text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-1.5 mb-6 bg-white/60 backdrop-blur-sm w-fit mx-auto"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Frontend Engineer · Open to Work
        </motion.div>

        {/* Name */}
        <div className="relative inline-block group cursor-default">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-sketch mb-4 transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 hero-title">
            Mayank
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-sketch text-gray-600 max-w-2xl mx-auto hero-subtitle">
          Building products with code, sketches, and a bit of{" "}
          <span className="sketch-underline">obsession</span> for UX.
        </p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-6 mt-8 mb-10"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-sketch text-2xl md:text-3xl text-gray-800 leading-none">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">
                  {stat.label}
                </p>
              </div>
              {i < STATS.length - 1 && <div className="w-px h-8 bg-black/10" />}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Download CV — place Mayank_CV.pdf in /public/ to enable */}
          <a
            href="/Mayank_CV.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 sketch-border bg-black text-white font-sketch text-lg hover:bg-gray-800 transition-colors"
          >
            <Download size={18} />
            Download CV
          </a>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 sketch-border font-sketch text-lg hover:bg-yellow-50 transition-colors"
          >
            View Projects
            <ArrowRight size={18} />
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 flex justify-center"
        >
          <ChevronDown size={32} strokeWidth={1} className="text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};

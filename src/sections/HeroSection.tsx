import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useHeroAnimations } from "../hooks/useHeroAnimations";

export const HeroSection = ({ isBooting }: { isBooting: boolean }) => {
  useHeroAnimations(isBooting);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      <div className="text-center z-10">
        <div className="relative inline-block group cursor-default">
          <h1 className="text-7xl md:text-9xl font-sketch mb-4 transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 hero-title">
            Mayank
          </h1>
        </div>
        <p className="text-2xl md:text-3xl font-sketch text-gray-600 max-w-2xl mx-auto hero-subtitle">
          Building products with code, sketches, and a bit of{" "}
          <span className="sketch-underline">obsession</span> for UX.
        </p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-24 flex justify-center"
        >
          <ChevronDown size={48} strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
};

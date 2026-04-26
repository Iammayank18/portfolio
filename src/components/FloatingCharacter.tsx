import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Coffee, Laptop, Map, Beaker, Lightbulb, Star } from "lucide-react";

export const FloatingCharacter = () => {
  const [section, setSection] = useState<
    "hero" | "about" | "experience" | "projects" | "roadmap" | "lab" | "ideas"
  >("hero");
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "roadmap",
        "lab",
        "ideas",
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top < window.innerHeight / 2 &&
            rect.bottom > window.innerHeight / 2
          ) {
            setSection(id as any);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProp = () => {
    switch (section) {
      case "about":
        return <Coffee className="w-6 h-6 text-brown-600" />;
      case "projects":
        return <Laptop className="w-6 h-6 text-blue-600" />;
      case "roadmap":
        return <Map className="w-6 h-6 text-green-600" />;
      case "lab":
        return <Beaker className="w-6 h-6 text-purple-600" />;
      case "ideas":
        return <Lightbulb className="w-6 h-6 text-yellow-400" />;
      default:
        return <Star className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[60] pointer-events-none hidden lg:block"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <div className="relative">
        <AnimatePresence>
          <motion.div
            key={section}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="absolute -top-16 -left-12 bg-white sketch-border px-3 py-1 font-sketch text-sm shadow-lg whitespace-nowrap"
          >
            {section === "hero" && "Welcome! 👋"}
            {section === "about" && "My story... 📖"}
            {section === "experience" && "The Logbook 📝"}
            {section === "projects" && "Check these out! 🚀"}
            {section === "roadmap" && "The journey... 🗺️"}
            {section === "lab" && "Experiments! 🧪"}
            {section === "ideas" && "Wait, what if... 💡"}
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white border-b-2 border-r-2 border-black rotate-45" />
          </motion.div>
        </AnimatePresence>

        <div className="w-16 h-20 bg-white/80 backdrop-blur-sm sketch-border p-2 flex flex-col items-center justify-center shadow-xl">
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <circle cx="50" cy="30" r="20" />
            <circle cx="42" cy="25" r="2" fill="currentColor" />
            <circle cx="58" cy="25" r="2" fill="currentColor" />
            <path d="M40,35 Q50,45 60,35" />
            <path d="M50,50 L50,90" />
            <path d="M30,70 Q50,60 70,70" />
            <path d="M50,90 L40,115" />
            <path d="M50,90 L60,115" />
          </svg>

          <motion.div
            key={section}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-2 top-1/2"
          >
            {getProp()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

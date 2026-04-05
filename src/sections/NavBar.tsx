import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { MotionValue } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Lab", href: "#lab" },
  { name: "Ideas", href: "#ideas" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = ({ scaleX }: { scaleX: MotionValue<number> }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-40 mix-blend-difference">
        <div className="font-sketch text-2xl text-white">M.</div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 font-sketch text-xl text-white">
          {NAV_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative group transition-all duration-300 hover:-rotate-2"
            >
              {item.name}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-1 bg-white/60 rounded-full"
                whileHover={{ width: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </a>
          ))}
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#fdfcf8] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-sketch text-4xl text-[#1a1a1a] hover:-rotate-2 transition-transform"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

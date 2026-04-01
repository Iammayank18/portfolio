import { motion } from "motion/react";
import type { MotionValue } from "motion/react";

export const NavBar = ({ scaleX }: { scaleX: MotionValue<number> }) => (
  <>
    {/* Progress Bar */}
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-50"
      style={{ scaleX }}
    />

    {/* Navigation */}
    <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference">
      <div className="font-sketch text-2xl text-white">M.</div>
      <div className="flex gap-8 font-sketch text-xl text-white">
        {[
          { name: "Projects", href: "#projects" },
          { name: "Experience", href: "#experience" },
          { name: "Lab", href: "#lab" },
          { name: "Ideas", href: "#ideas" },
          { name: "Contact", href: "#contact" },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative group transition-all duration-300 hover:-rotate-2"
          >
            {item.name}
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-1 bg-white/60 rounded-full"
              whileHover={{ width: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          </a>
        ))}
      </div>
    </nav>
  </>
);

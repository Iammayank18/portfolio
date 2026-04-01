import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Project } from "../data";
import { Tape } from "./Tape";

export const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
  key?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      className="relative bg-white p-8 sketch-border shadow-sm hover:shadow-2xl transition-all cursor-pointer group project-card overflow-visible"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_23px,#000_23px,#000_24px)]" />

      <Tape className="-top-3 -left-4 rotate-[-35deg]" />
      <Tape className="-bottom-3 -right-4 rotate-[25deg] bg-blue-200/30" />
      <Tape className="-top-2 right-1/4 rotate-[5deg] w-12 h-5 opacity-40" />

      <AnimatePresence>
        {isHovered && project.notes && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {project.notes.map((note, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  x: i % 2 === 0 ? -20 : 20,
                  y: i * 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: i % 2 === 0 ? -40 : 40,
                  y: i * 30,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute ${i % 2 === 0 ? "left-0" : "right-0"} font-sketch text-blue-500 text-sm whitespace-nowrap bg-white/80 px-2 py-1 sketch-border rotate-${i % 2 === 0 ? "-12" : "12"}`}
                style={{ top: `${20 + i * 25}%` }}
              >
                {note}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
          0{index + 1} // {project.category}
        </span>
        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </div>
      <h3 className="text-3xl font-sketch mb-4">{project.title}</h3>
      <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono bg-gray-100 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

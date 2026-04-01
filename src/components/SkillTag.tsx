import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const SkillTag = ({
  name,
  level,
  details,
}: {
  name: string;
  level: number;
  key?: string;
  details: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        whileHover={{ scale: 1.1, rotate: Math.random() * 4 - 2 }}
        className={`px-4 py-2 sketch-border font-sketch text-lg transition-all cursor-default inline-block ${isHovered ? "bg-black text-white" : "bg-white text-black"}`}
      >
        {name}
      </motion.span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute z-50 bottom-full left-0 mb-4 p-4 bg-white sketch-border shadow-2xl min-w-[280px] pointer-events-none text-black"
          >
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-black rotate-45" />
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="font-sketch text-lg font-bold">{name}</span>
                <span className="font-sketch text-sm">{level}%</span>
              </div>
              <div className="h-2 sketch-border overflow-hidden bg-gray-100 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${level}%` }}
                  className="h-full bg-black"
                />
              </div>
              <p className="font-sketch text-sm text-gray-700 leading-relaxed italic">
                "{details}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

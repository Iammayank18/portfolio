import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const ProgressBar = ({
  progress,
  label,
  details,
  delay = 0,
}: {
  progress: number;
  label: string;
  details?: string;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mb-4 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between font-sketch text-lg mb-1">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-4 sketch-border overflow-hidden bg-white/50 cursor-help relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut", delay }}
          className="h-full bg-black relative"
        >
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,white_2px,white_4px)]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && details && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute z-50 bottom-full left-0 mb-3 p-4 bg-white sketch-border shadow-2xl min-w-[240px] pointer-events-none"
          >
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-black rotate-45" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                  Proficiency Detail
                </span>
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

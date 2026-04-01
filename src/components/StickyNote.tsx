import React from "react";
import { motion } from "motion/react";

export const StickyNote = ({
  children,
  color = "bg-yellow-100",
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <motion.div
    whileHover={{ rotate: 0, scale: 1.05 }}
    initial={{ rotate: -2 }}
    className={`${color} p-6 shadow-lg sketch-border transform -rotate-2 relative`}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 bg-white/50 border border-black/10" />
    {children}
  </motion.div>
);

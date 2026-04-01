import React from "react";
import { motion } from "motion/react";

export const ScribbleReveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.1, delay: delay + 0.4 }}
      >
        {children}
      </motion.div>
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,25 C10,15 20,35 30,25 C40,15 50,35 60,25 C70,15 80,35 90,25 C100,15 110,35 120,25 M-10,55 C0,45 10,65 20,55 C30,45 40,65 50,55 C60,45 70,65 80,55 C90,45 100,65 110,55 M5,85 C15,75 25,95 35,85 C45,75 55,95 65,85 C75,75 85,95 95,85 C105,75 115,95 125,85"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{
            pathLength: [0, 1],
            opacity: [0, 1, 1, 0],
            x: [-1, 1, -1, 1, 0],
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay,
            ease: "easeInOut",
            opacity: { times: [0, 0.1, 0.8, 1], duration: 0.7 },
          }}
        />
      </motion.svg>
    </div>
  );
};

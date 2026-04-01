import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export const SketchIntro = ({
  onComplete,
}: {
  onComplete: () => void;
  key?: string;
}) => {
  const [step, setStep] = useState<"drawing" | "waving" | "complete">(
    "drawing",
  );
  const [showHi, setShowHi] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("waving");
      setTimeout(() => setShowHi(true), 400);
      setTimeout(() => setShowSignature(true), 1200);
      setTimeout(onComplete, 5500);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const drawTransition = {
    duration: 0.8,
    ease: "easeInOut",
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#fdfcf8] z-[100] flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <div className="relative w-[400px] h-[500px] flex items-center justify-center">
        <svg
          viewBox="0 0 100 150"
          className="absolute w-64 h-64 text-blue-200/40 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <motion.circle
            cx="50"
            cy="40"
            r="28"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.1 }}
          />
          <motion.path
            d="M50,10 L50,140 M20,40 L80,40"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.3 }}
          />
        </svg>

        <svg
          viewBox="0 0 100 150"
          className="w-64 h-64 text-black z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <motion.path
            d="M30,145 Q50,150 70,145 M35,147 Q50,152 65,147"
            className="text-gray-200"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 3.0, duration: 1 }}
          />

          <motion.path
            d="M35,25 Q40,10 50,15 Q60,10 65,25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 0.2 }}
          />
          <motion.path
            d="M38,22 Q45,15 52,20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 0.3 }}
          />

          <motion.path
            d="M50,15 A25,25 0 1,1 49.9,15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.circle
            cx="42"
            cy="35"
            r="1.5"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          />
          <motion.circle
            cx="58"
            cy="35"
            r="1.5"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 }}
          />

          <motion.path
            d="M40,48 Q50,58 60,48"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 1.8 }}
          />

          <motion.path
            d="M50,65 L50,110"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 2.0 }}
          />

          <motion.path
            initial={{ pathLength: 0 }}
            animate={
              step === "waving"
                ? {
                    pathLength: 1,
                    d: [
                      "M20,80 Q50,70 80,80",
                      "M20,80 Q50,70 95,45",
                      "M20,80 Q50,70 80,80",
                    ],
                  }
                : { pathLength: 1 }
            }
            transition={
              step === "waving"
                ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
                : { ...drawTransition, delay: 2.2 }
            }
            d="M20,80 Q50,70 80,80"
          />

          <motion.path
            d="M50,110 L35,145"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 2.4 }}
          />
          <motion.path
            d="M50,110 L65,145"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 2.6 }}
          />

          <motion.path
            d="M25,140 Q30,145 35,142"
            className="text-gray-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.8 }}
          />
          <motion.path
            d="M65,140 Q70,145 75,142"
            className="text-gray-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.9 }}
          />
        </svg>

        <AnimatePresence>
          {showSignature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-10 right-0 rotate-[-5deg]"
            >
              <svg
                width="120"
                height="40"
                viewBox="0 0 120 40"
                className="text-black/60"
              >
                <motion.path
                  d="M10,30 Q20,10 30,30 T50,30 T70,30 T90,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.text
                  x="15"
                  y="35"
                  className="font-sketch text-[10px] fill-current opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  - Mayank
                </motion.text>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHi && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 20, y: 20, rotate: -10 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 100,
                y: -80,
                rotate: 12,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              className="absolute bg-white sketch-border px-6 py-3 font-sketch text-2xl shadow-xl z-50"
            >
              Hi! I'm Mayank.
              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-b-2 border-r-2 border-black rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, x: -100, y: -100 }}
          animate={
            step === "drawing"
              ? {
                  opacity: [0, 1, 1, 0],
                  x: [-50, 20, 80, 50, 20, 50, 80, 100, 120],
                  y: [-50, 20, 50, 80, 120, 80, 20, 100, 140],
                  rotate: [0, 15, -15, 15, 0],
                }
              : { opacity: 0 }
          }
          transition={{ duration: 3.5, ease: "linear" }}
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-50"
        >
          <div className="w-1 h-12 bg-gray-400 rotate-45 origin-bottom shadow-sm" />
          <div className="w-3 h-3 bg-black rounded-full -ml-1 -mt-1" />
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64">
        <div className="h-1.5 w-full bg-gray-100 sketch-border overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5 }}
            className="h-full bg-black"
          />
        </div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center font-sketch mt-3 text-gray-500 tracking-wide"
        >
          Sketching the portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};

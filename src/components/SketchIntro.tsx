import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

const PATHS = [
  { id: "lm",   d: "M 50,140 L 50,60 L 70,100 L 90,60 L 90,140",  dur: 0.55 },
  { id: "la1",  d: "M 120,60 L 100,140",                            dur: 0.23 },
  { id: "la2",  d: "M 120,60 L 140,140",                            dur: 0.23 },
  { id: "la3",  d: "M 108,114 L 132,114",                           dur: 0.12 },
  { id: "ly1",  d: "M 152,60 L 170,100",                            dur: 0.17 },
  { id: "ly2",  d: "M 188,60 L 170,100",                            dur: 0.17 },
  { id: "ly3",  d: "M 170,100 L 170,140",                           dur: 0.12 },
  { id: "la4",  d: "M 220,60 L 200,140",                            dur: 0.23 },
  { id: "la5",  d: "M 220,60 L 240,140",                            dur: 0.23 },
  { id: "la6",  d: "M 208,114 L 232,114",                           dur: 0.12 },
  { id: "ln",   d: "M 252,140 L 252,60 L 290,140 L 290,60",         dur: 0.54 },
  { id: "lk1",  d: "M 308,60 L 308,140",                            dur: 0.21 },
  { id: "lk2",  d: "M 308,100 L 348,60",                            dur: 0.19 },
  { id: "lk3",  d: "M 308,100 L 348,140",                           dur: 0.19 },
  { id: "ul",   d: "M 48,158 Q 120,167 196,158 T 344,158",          dur: 0.42 },
];

export const SketchIntro = ({
  onComplete,
}: {
  onComplete: () => void;
  key?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const onDoneRef = useRef(onComplete);
  const mountedRef = useRef(true);

  const [showRole, setShowRole] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onDoneRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    mountedRef.current = true;
    const svg = svgRef.current;
    if (!svg) return;

    PATHS.forEach(({ id }) => {
      const el = svg.querySelector<SVGPathElement>(`#${id}`);
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    });

    const tl = gsap.timeline();

    const timeScale = 0.5; // Faster, snappier draw

    PATHS.forEach(({ id, dur }) => {
      const el = svg.querySelector<SVGPathElement>(`#${id}`);
      if (!el) return;
      const totalLen = el.getTotalLength();

      const state = { p: 0 };
      tl.to(state, {
        p: 1,
        duration: dur * timeScale,
        ease: "power1.inOut",
        onUpdate() {
          el.style.strokeDashoffset = String(totalLen * (1 - state.p));
        },
      });
    });

    tl.call(() => {
      if (mountedRef.current) {
        setShowRole(true);
      }
    });

    tl.to({}, { duration: 0.8, onComplete: () => onDoneRef.current() });

    return () => {
      mountedRef.current = false;
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-[#fdfcf8] z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Subtle, elegant notebook lines to maintain context but look premium */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(transparent 27px, #e3dfd6 27px, #e3dfd6 28px, transparent 28px)",
          backgroundSize: "100% 28px",
          opacity: 0.3,
        }}
      />

      <div className="relative w-full max-w-[420px] flex flex-col items-center z-10 px-8">
        <svg
          ref={svgRef}
          viewBox="0 0 400 200"
          className="w-full drop-shadow-sm"
          fill="none"
          overflow="visible"
        >
          <g strokeLinecap="round" strokeLinejoin="round">
            {PATHS.map(({ id, d }) => (
              <path key={id} id={id} d={d} stroke="#111" strokeWidth="2.5" />
            ))}
          </g>
        </svg>

        <div className="h-10 mt-2 flex items-center justify-center">
          <AnimatePresence>
            {showRole && (
              <motion.p
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs md:text-sm text-gray-500 tracking-[0.35em] uppercase"
              >
                Software Engineer
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sleek Progress Loader */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 flex flex-col items-center gap-4">
        <div className="w-full h-[1px] bg-gray-200 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gray-900"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          <span>Initializing</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const STEPS = [
  "ALLOCATING TERRAIN",
  "PLANTING TREELINE",
  "LIGHTING CAMPFIRE",
  "CALIBRATING VITALS",
  "SYNCING COORDINATES",
];

interface LoaderProps {
  onDone: () => void;
}

export function Loader({ onDone }: LoaderProps) {
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(onDone, 520);
      }
      setPct(Math.floor(p));
      setStep(Math.min(STEPS.length - 1, Math.floor((p / 100) * STEPS.length)));
    }, 130);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center dot-grid"
      style={{ background: "var(--paper)" }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      <div className="w-[min(560px,86vw)] px-2">
        <div className="flex items-end justify-between mb-3">
          <span className="hud-label" style={{ color: "var(--ash)" }}>
            WORLD SEED · MT—2026
          </span>
          <span className="font-mono text-sm tabular-nums">{pct}%</span>
        </div>

        <div className="h-[3px] w-full" style={{ background: "var(--line)" }}>
          <motion.div
            className="h-full"
            style={{ background: "var(--ink)" }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: "linear", duration: 0.13 }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full pulse"
            style={{ background: "var(--amber)" }}
          />
          <span className="hud-label" style={{ color: "var(--ash)" }}>
            {STEPS[step]}
          </span>
        </div>

        <div className="mt-10 text-center">
          <p className="display-lg leading-none">MAYANK</p>
          <p className="eyebrow mt-2">ENTERING THE OPEN WORLD</p>
        </div>
      </div>
    </motion.div>
  );
}

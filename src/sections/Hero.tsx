import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SURVIVOR } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center px-5 sm:px-8"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* top spec line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 sm:mb-12"
        >
          <span className="eyebrow">OPEN-WORLD PORTFOLIO</span>
          <span className="hidden sm:inline-block h-px w-10" style={{ background: "var(--line)" }} />
          <span className="hud-label" style={{ color: "var(--ash)" }}>
            BIOME · FINTECH / AI / SAAS
          </span>
          <span className="hidden sm:inline-block h-px w-10" style={{ background: "var(--line)" }} />
          <span className="hud-label" style={{ color: "var(--ash)" }}>
            SEED · 2026
          </span>
        </motion.div>

        {/* name */}
        <h1 className="display-xl">
          <Line delay={0.45}>MAYANK</Line>
          <Line delay={0.6} outline>
            THAKUR
          </Line>
        </h1>

        <div className="mt-8 sm:mt-12 grid md:grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="md:col-span-7"
          >
            <p className="font-display text-lg sm:text-xl font-medium mb-3">
              {SURVIVOR.classTitle}
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed max-w-xl" style={{ color: "var(--ash)" }}>
              {SURVIVOR.tagline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#camp" className="btn-ink">
                BEGIN EXPEDITION
                <span aria-hidden>↓</span>
              </a>
              <a href={SURVIVOR.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                FIELD LOG / CV
              </a>
            </div>
          </motion.div>

          {/* spec card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="md:col-span-5 md:justify-self-end w-full max-w-xs"
          >
            <div className="panel ticked p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="hud-label">SURVIVOR DOSSIER</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full pulse" style={{ background: "var(--amber)" }} />
              </div>
              {[
                ["STATUS", "AVAILABLE FOR DEPLOYMENT"],
                ["EXPERIENCE", "3.5+ YEARS IN FIELD"],
                ["REACHED", "5,000+ USERS"],
                ["BASE", "INDIA · REMOTE"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between py-2 border-t"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="hud-label" style={{ color: "var(--ash)" }}>{k}</span>
                  <span className="font-mono text-[11px] text-right max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-16 flex flex-col items-center gap-2"
      >
        <span className="hud-label" style={{ color: "var(--ash)" }}>SCROLL TO EXPLORE</span>
        <span className="h-7 w-px float" style={{ background: "var(--ink)" }} />
      </motion.div>
    </section>
  );
}

function Line({
  children,
  delay,
  outline,
}: {
  children: ReactNode;
  delay: number;
  outline?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${outline ? "text-outline" : ""}`}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 1, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

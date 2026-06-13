import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SURVIVOR } from "../data";

const LINKS = [
  { id: "camp", label: "BASE CAMP" },
  { id: "expeditions", label: "EXPEDITIONS" },
  { id: "inventory", label: "INVENTORY" },
  { id: "crafted", label: "CRAFTED" },
  { id: "notes", label: "FIELD NOTES" },
  { id: "signal", label: "SIGNAL" },
];

export function NavBar() {
  const [active, setActive] = useState("camp");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span
            className="inline-block h-2 w-2 rotate-45"
            style={{ background: "var(--amber)" }}
          />
          <span className="font-display font-bold tracking-tight text-sm">
            {SURVIVOR.name.split(" ")[0].toUpperCase()}
            <span style={{ color: "var(--ash)" }}>.MT</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 panel px-2 py-1.5">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative px-3 py-1.5 hud-label transition-colors"
              style={{ color: active === l.id ? "var(--ink)" : "var(--ash)" }}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10"
                  style={{ background: "rgba(232,129,11,0.14)", border: "1px solid var(--amber)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {l.label}
            </a>
          ))}
        </div>

        <a href={SURVIVOR.resume} target="_blank" rel="noreferrer" className="btn-ink !py-2.5 !px-4">
          FIELD LOG ↗
        </a>
      </div>
    </motion.nav>
  );
}

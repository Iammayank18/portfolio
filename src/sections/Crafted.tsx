import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "../components/SectionHeader";
import { PROJECTS, type Project } from "../data";

const CAT_TAG: Record<Project["category"], string> = {
  SaaS: "STRUCTURE",
  Tool: "TOOL",
  Experiment: "PROTOTYPE",
};

export function Crafted() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="crafted" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader
          index="04"
          kicker="CRAFTED · BLUEPRINTS"
          title="Things forged in the field."
          sub="Shipped tools, products and frameworks — each one a blueprint crafted from raw requirements. Open a blueprint to read the build log."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06 }}
              className="panel ticked group text-left p-6 flex flex-col min-h-[260px] hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="hud-label" style={{ color: "var(--amber)" }}>
                  {CAT_TAG[p.category]}
                </span>
                <span className="font-mono text-[11px]" style={{ color: "var(--ash)" }}>
                  {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                {p.description}
              </p>

              <div className="mt-auto pt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-1.5 py-0.5 border"
                      style={{ borderColor: "var(--line)", color: "var(--ash)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[11px] group-hover:translate-x-1 transition-transform" style={{ color: "var(--ink)" }}>
                  OPEN ↗
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <Blueprint project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function Blueprint({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="absolute inset-0 dot-grid"
        style={{ background: "rgba(246,247,244,0.82)", backdropFilter: "blur(4px)" }}
      />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 12, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="panel relative w-full max-w-2xl max-h-[86vh] overflow-y-auto scrollbar-hide p-7 sm:p-9"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="hud-label" style={{ color: "var(--amber)" }}>
              BLUEPRINT · {CAT_TAG[project.category]}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
              {project.title}
            </h3>
          </div>
          <button onClick={onClose} className="hud-label px-2 py-1 border" style={{ borderColor: "var(--ink)" }}>
            CLOSE ✕
          </button>
        </div>

        <Block label="THE TERRAIN / PROBLEM" body={project.problem} />
        <Block label="THE CRAFT / SOLUTION" body={project.solution} />

        {project.notes && project.notes.length > 0 && (
          <div className="mt-6">
            <span className="hud-label" style={{ color: "var(--ash)" }}>FIELD NOTES</span>
            <ul className="mt-3 flex flex-col gap-2">
              {project.notes.map((n) => (
                <li key={n} className="flex gap-2.5 text-sm">
                  <span className="mt-1.5 h-1 w-1 rotate-45 shrink-0" style={{ background: "var(--forest)" }} />
                  <span style={{ color: "var(--ash)" }}>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-[10px] px-2 py-1 border" style={{ borderColor: "var(--line)", color: "var(--ash)" }}>
              {t}
            </span>
          ))}
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="btn-ink mt-7">
            VISIT ARTIFACT ↗
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--line)" }}>
      <span className="hud-label" style={{ color: "var(--ash)" }}>{label}</span>
      <p className="mt-2 text-[15px] leading-relaxed">{body}</p>
    </div>
  );
}

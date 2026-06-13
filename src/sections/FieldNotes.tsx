import { motion } from "motion/react";
import { SectionHeader } from "../components/SectionHeader";
import { IDEAS, LAB_EXPERIMENTS } from "../data";

const TYPE_LABEL: Record<string, string> = {
  startup: "SIGNAL",
  tool: "BLUEPRINT",
  note: "OBSERVATION",
  sketch: "SKETCH",
};

export function FieldNotes() {
  return (
    <section id="notes" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader
          index="05"
          kicker="FIELD NOTES"
          title="Pinned to the camp wall."
          sub="Half-built ideas, signals worth chasing, and experiments already run. Drag them around — nothing here is precious."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* draggable notes */}
          <div className="lg:col-span-8 relative min-h-[420px]">
            <div className="grid sm:grid-cols-2 gap-5">
              {IDEAS.map((idea, i) => (
                <motion.div
                  key={idea.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0.18}
                  whileDrag={{ scale: 1.04, zIndex: 30, rotate: 0 }}
                  initial={{ opacity: 0, y: 24, rotate: idea.rotation }}
                  whileInView={{ opacity: 1, y: 0, rotate: idea.rotation }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="panel p-5 cursor-grab active:cursor-grabbing"
                >
                  {/* pin */}
                  <span
                    className="absolute -top-2 left-5 h-3 w-3 rounded-full"
                    style={{ background: "var(--amber)" }}
                  />
                  <span className="hud-label" style={{ color: "var(--ash)" }}>
                    {TYPE_LABEL[idea.type] ?? "NOTE"}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold tracking-tight">
                    {idea.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                    {idea.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* experiments log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="panel ticked p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="hud-label">EXPERIMENT LOG</span>
                <span className="hud-label" style={{ color: "var(--forest)" }}>RUN</span>
              </div>
              <ul className="flex flex-col">
                {LAB_EXPERIMENTS.map((x) => (
                  <li
                    key={x.title}
                    className="flex items-start gap-3 py-3 border-t"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      className="mt-1 h-3.5 w-3.5 shrink-0 grid place-items-center border"
                      style={{ borderColor: "var(--forest)" }}
                    >
                      <span className="font-mono text-[8px]" style={{ color: "var(--forest)" }}>✓</span>
                    </span>
                    <span className="text-[13px] leading-snug">{x.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

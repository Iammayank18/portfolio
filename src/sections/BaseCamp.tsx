import { motion } from "motion/react";
import { SectionHeader } from "../components/SectionHeader";
import { SURVIVOR, CHAR_STATS } from "../data";

export function BaseCamp() {
  return (
    <section id="camp" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader
          index="01"
          kicker="BASE CAMP"
          title="The survivor behind the build."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <p className="font-display text-2xl sm:text-[2rem] leading-snug tracking-tight">
              {SURVIVOR.bio}
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                ["3.5+", "YEARS IN FIELD"],
                ["REAL-WORLD", "APPLICATIONS SHIPPED"],
                ["85%", "TEST COVERAGE"],
              ].map(([big, label]) => (
                <div key={label} className="panel-soft p-4">
                  <div className="font-display text-3xl font-bold">{big}</div>
                  <div
                    className="hud-label mt-1"
                    style={{ color: "var(--ash)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* character stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="panel ticked p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="hud-label">CHARACTER SHEET</span>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "var(--amber)" }}
                >
                  LV.26
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {CHAR_STATS.map((s, i) => (
                  <div key={s.stat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="hud-label">{s.stat}</span>
                      <span
                        className="font-mono text-[11px] tabular-nums"
                        style={{ color: "var(--ash)" }}
                      >
                        {s.value}
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full"
                      style={{ background: "var(--line)" }}
                    >
                      <motion.div
                        className="h-full"
                        style={{
                          background: i % 2 ? "var(--forest)" : "var(--ink)",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: 0.15 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 pt-5 border-t flex items-center justify-between"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="hud-label" style={{ color: "var(--ash)" }}>
                  {SURVIVOR.location}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 hud-label"
                  style={{ color: "var(--forest)" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full pulse"
                    style={{ background: "var(--forest)" }}
                  />
                  ACTIVE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

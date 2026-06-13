import { motion } from "motion/react";
import { SectionHeader } from "../components/SectionHeader";
import { ABOUT_SKILLS, rarityFor, type Rarity } from "../data";

const RARITY_COLOR: Record<Rarity, string> = {
  legendary: "var(--amber)",
  epic: "var(--forest)",
  rare: "var(--ink)",
  common: "var(--ash)",
};

const RARITY_LABEL: Record<Rarity, string> = {
  legendary: "LEGENDARY",
  epic: "EPIC",
  rare: "RARE",
  common: "COMMON",
};

export function Inventory() {
  return (
    <section id="inventory" className="relative px-5 sm:px-8 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader
          index="03"
          kicker="INVENTORY"
          title="Gear carried into every build."
          sub="The tools I travel with. Rarity reflects how deep I've gone — legendary items are battle-tested across years of production."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {ABOUT_SKILLS.map((skill) => {
            const rarity = rarityFor(skill.level);
            const color = RARITY_COLOR[rarity];
            return (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="slot group p-4 flex flex-col min-h-[150px]"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="h-7 w-7 grid place-items-center border"
                    style={{ borderColor: color }}
                  >
                    <span className="h-2.5 w-2.5 rotate-45" style={{ background: color }} />
                  </span>
                  <span className="hud-label" style={{ color }}>
                    {RARITY_LABEL[rarity]}
                  </span>
                </div>

                <h3 className="mt-4 font-display font-semibold text-[15px] leading-tight">
                  {skill.name}
                </h3>

                <div className="mt-auto pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="hud-label" style={{ color: "var(--ash)" }}>
                      PWR
                    </span>
                    <span className="font-mono text-[11px] tabular-nums">{skill.level}</span>
                  </div>
                  <div className="h-1 w-full" style={{ background: "var(--line)" }}>
                    <motion.div
                      className="h-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* hover detail */}
                <p
                  className="mt-3 text-[11px] leading-snug max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300"
                  style={{ color: "var(--ash)" }}
                >
                  {skill.details}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

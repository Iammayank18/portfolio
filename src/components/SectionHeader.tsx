import { motion } from "motion/react";

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: string;
  sub?: string;
}

export function SectionHeader({ index, kicker, title, sub }: SectionHeaderProps) {
  return (
    <div className="mb-12 sm:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-5"
      >
        <span className="font-mono text-xs" style={{ color: "var(--amber)" }}>
          {index}
        </span>
        <span className="h-px flex-1 max-w-[64px]" style={{ background: "var(--line)" }} />
        <span className="eyebrow">{kicker}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="display-lg max-w-4xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-xl text-[15px] leading-relaxed"
          style={{ color: "var(--ash)" }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

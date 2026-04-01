import { motion } from "motion/react";
import type { Idea } from "../data";
import { Tape } from "./Tape";

export const IdeaCard = ({ idea }: { idea: Idea; key?: string }) => (
  <motion.div
    drag
    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
    whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
    initial={{ rotate: idea.rotation, opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`${idea.color} p-6 sketch-border shadow-sm cursor-grab active:cursor-grabbing relative group`}
    style={{
      marginTop: `${Math.abs(idea.rotation) * 10}px`,
      marginLeft: `${idea.rotation * 5}px`,
    }}
  >
    <Tape className="-top-3 left-1/2 -translate-x-1/2 w-12 h-4 opacity-60" />
    <div className="mb-2 flex justify-between items-center">
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
        {idea.type}
      </span>
      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors" />
    </div>
    <h4 className="font-sketch text-xl mb-2">{idea.title}</h4>
    <p className="font-sketch text-gray-600 text-sm leading-relaxed">
      {idea.content}
    </p>
    <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

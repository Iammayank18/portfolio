import type React from "react";
import { useRef } from "react";
import { motion } from "motion/react";
import { ProgressBar } from "../components/ProgressBar";
import { ScribbleReveal } from "../components/ScribbleReveal";
import { SKILLS_ROADMAP } from "../data";
import { useRoadmapAnimations } from "../hooks/useRoadmapAnimations";

export const RoadmapSection = ({ isBooting }: { isBooting: boolean }) => {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useRoadmapAnimations(isBooting, roadmapRef, horizontalRef);
  return (
    <section
      id="roadmap"
      className="relative bg-white/30 overflow-hidden z-10"
      ref={roadmapRef}
      style={{ overscrollBehaviorX: "none" }}
    >
      <div className="h-screen flex flex-col justify-center px-6">
        <div className="max-w-6xl mx-auto w-full mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-6xl font-sketch">The Roadmap</h2>
              <p className="font-sketch text-xl text-gray-500 mt-2 flex items-center gap-2">
                Scroll down to travel through the timeline
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↓
                </motion.span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-sm text-gray-400">PROGRESS</div>
              <div className="w-32 h-1 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 roadmap-progress-bar"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Horizontal Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/10 border-t-2 border-dashed border-black/20 -translate-y-1/2 hidden md:block" />

          <div
            ref={horizontalRef}
            className="flex flex-nowrap gap-8 cursor-grab active:cursor-grabbing px-4 md:px-12 will-change-transform"
          >
            {SKILLS_ROADMAP.map((item, index) => (
              <div
                key={item.year}
                className="roadmap-item min-w-[260px] sm:min-w-[320px] md:min-w-[450px] shrink-0 relative"
              >
                {/* Timeline Node (Desktop) */}
                <div className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white sketch-border z-10 items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full ${item.status === "mastered" ? "bg-black" : item.status === "learning" ? "bg-blue-500" : "bg-gray-300"}`}
                  />
                </div>

                <div className="p-4 md:p-8 sketch-border bg-white shadow-sm hover:shadow-xl transition-all h-full flex flex-col relative group">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="roadmap-year font-sketch text-3xl text-gray-400">
                      {item.year}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-1 rounded uppercase tracking-wider ${
                        item.status === "mastered"
                          ? "bg-green-100 text-green-700"
                          : item.status === "learning"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <ScribbleReveal delay={0.1}>
                    <h3 className="roadmap-title text-3xl font-sketch mb-2">{item.title}</h3>
                  </ScribbleReveal>
                  <ScribbleReveal delay={0.3}>
                    <p className="roadmap-desc text-gray-600 mb-6 font-sketch text-base flex-grow">
                      {item.description}
                    </p>
                  </ScribbleReveal>

                  <div className="space-y-4 mt-auto pt-6 border-t border-dashed border-gray-100">
                    {item.skills.map((skill, sIndex) => (
                      <div key={skill.name} className="roadmap-skill-item">
                        <ProgressBar
                          label={skill.name}
                          progress={skill.level}
                          details={skill.details}
                          delay={0.8 + sIndex * 0.2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Future Placeholder */}
            <div className="min-w-[260px] md:min-w-[400px] shrink-0 flex items-center justify-center opacity-30">
              <div className="text-center">
                <p className="font-sketch text-2xl">To be continued...</p>
                <p className="font-sketch text-gray-500">
                  The journey never ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

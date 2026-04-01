import { motion } from "motion/react";
import { Star } from "lucide-react";
import { EXPERIENCE } from "../data";
import { useExperienceAnimations } from "../hooks/useExperienceAnimations";

export const ExperienceSection = ({ isBooting }: { isBooting: boolean }) => {
  useExperienceAnimations(isBooting);

  return (
    <section id="experience" className="py-32 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-6xl font-sketch">The Logbook</h2>
            <div className="h-px w-24 bg-black/10" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 sketch-border bg-yellow-50 rotate-2">
            <Star size={16} className="text-yellow-600" />
            <span className="font-sketch text-sm">Powered by GSAP</span>
          </div>
        </div>

        <div className="space-y-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-black/20 ml-4 md:ml-0 experience-line" />

          {EXPERIENCE.map((exp, index) => (
            <div
              key={exp.company}
              className="relative pl-12 md:pl-0 experience-item pb-32 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-10 h-10 -ml-5 bg-white sketch-border rounded-full flex items-center justify-center z-20 md:left-0 timeline-dot-outer shadow-sm">
                <div className="w-3 h-3 bg-black rounded-full" />
              </div>

              <div className="grid md:grid-cols-12 gap-8 relative">
                <div className="md:col-span-3">
                  <div className="md:sticky md:top-32 experience-period">
                    <p className="font-sketch text-5xl text-gray-500 leading-none">
                      {exp.period}
                    </p>
                    <div className="h-1.5 w-16 bg-yellow-400/40 mt-3 hidden md:block rounded-full" />
                  </div>
                </div>
                <div className="md:col-span-9 relative">
                  {/* Tape Visuals */}
                  <div className="absolute -top-4 left-1/4 w-16 h-8 bg-yellow-200/40 -rotate-12 z-10 border border-black/5 mix-blend-multiply hidden md:block" />
                  <div className="absolute -top-2 right-1/4 w-12 h-6 bg-blue-200/30 rotate-10 z-10 border border-black/5 mix-blend-multiply hidden md:block" />

                  <motion.div
                    whileHover={{
                      y: -5,
                      rotate: index % 2 === 0 ? 2 : -2,
                      scale: 1.02,
                    }}
                    className={`sketch-border p-8 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 experience-card relative overflow-hidden group ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
                  >
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_11px)]" />

                    <div className="relative z-10">
                      <h3 className="text-4xl font-sketch mb-1 experience-content-stagger">
                        {exp.role}
                      </h3>
                      <p className="text-2xl font-sketch text-blue-600 mb-6 experience-content-stagger flex items-center gap-2">
                        <span className="text-gray-400">@</span> {exp.company}
                      </p>

                      <p className="text-xl font-sketch text-gray-800 mb-8 leading-relaxed experience-content-stagger max-w-2xl">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-8 experience-content-stagger">
                        {exp.tech?.map((t) => (
                          <span
                            key={t}
                            className="text-sm font-mono bg-gray-50 px-3 py-1.5 sketch-border hover:bg-yellow-50 transition-colors cursor-default"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4 experience-content-stagger">
                        <h4 className="font-sketch text-xl font-bold underline decoration-dashed underline-offset-4 mb-4 text-gray-800">
                          Key Contributions:
                        </h4>
                        <ul className="space-y-4">
                          {exp.achievements.map((ach) => (
                            <li
                              key={ach}
                              className="flex items-start gap-4 font-sketch text-lg text-gray-700 group/item"
                            >
                              <div className="mt-2.5 w-2.5 h-2.5 bg-gray-300 rounded-full shrink-0 group-hover/item:bg-yellow-400 group-hover/item:scale-125 transition-all duration-300" />
                              <span className="group-hover/item:text-gray-800 transition-colors leading-tight">
                                {ach}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Margin Note / Annotation */}
                    {exp.marginNote && (
                      <div className="absolute -right-4 top-12 rotate-12 hidden lg:block experience-margin-note">
                        <div className="bg-yellow-50 px-4 py-2 sketch-border shadow-md font-sketch text-lg max-w-[150px] text-center">
                          {exp.marginNote}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

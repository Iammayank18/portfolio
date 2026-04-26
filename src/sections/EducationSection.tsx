import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Database Management",
  "Computer Networks",
  "Software Engineering",
];

export const EducationSection = () => (
  <section className="py-12 md:py-20 px-6 bg-gray-50/50">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-3xl md:text-5xl font-sketch">The Degree</h2>
        <GraduationCap size={28} className="text-gray-400" />
      </div>

      <motion.div
        whileHover={{ y: -4, rotate: 0 }}
        className="sketch-border p-6 md:p-10 bg-white shadow-sm rotate-[-0.5deg] relative overflow-hidden"
      >
        {/* Notebook lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_31px,#000_31px,#000_32px)]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 md:gap-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">
              Institution
            </p>
            <h3 className="font-sketch text-2xl md:text-3xl text-gray-800 leading-tight mb-1">
              Arya College of Engineering
            </h3>
            <p className="font-sketch text-lg text-gray-500">
              and Research Center, Jaipur
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="font-mono text-sm bg-gray-50 px-3 py-1 sketch-border">
                Bachelor of Technology, Computer Science
              </span>
              <span className="font-mono text-sm bg-yellow-50 px-3 py-1 sketch-border">
                2019 – 2023
              </span>
              <span className="font-mono text-sm bg-green-50 px-3 py-1 sketch-border text-green-700">
                GPA 8.0 / 10.0
              </span>
            </div>
          </div>

          <div className="md:text-right">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">
              Relevant Coursework
            </p>
            <div className="flex flex-wrap md:justify-end gap-2">
              {COURSEWORK.map((course) => (
                <span
                  key={course}
                  className="font-sketch text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

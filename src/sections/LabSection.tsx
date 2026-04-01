import { motion } from "motion/react";
import { Star } from "lucide-react";
import { StickyNote } from "../components/StickyNote";
import { LAB_EXPERIMENTS } from "../data";
import { useLabAnimations } from "../hooks/useLabAnimations";

export const LabSection = ({ isBooting }: { isBooting: boolean }) => {
  useLabAnimations(isBooting);

  return (
    <section id="lab" className="py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-5xl font-sketch">The Lab</h2>
          <Star className="text-yellow-500 animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-xl font-sketch text-gray-600">
              Where I experiment with ideas that might break, but always teach me
              something new.
            </p>
            <div className="space-y-4">
              {LAB_EXPERIMENTS.map((exp) => (
                <motion.div
                  key={exp.title}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(254, 249, 195, 0.3)",
                  }}
                  className="flex justify-between items-center p-4 border-b border-dashed border-gray-300 group transition-colors lab-experiment cursor-default"
                >
                  <span className="font-sketch text-xl">{exp.title}</span>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded ${exp.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {exp.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <StickyNote color="bg-blue-50">
              <h4 className="font-sketch text-2xl mb-4 underline">
                Next Big Idea?
              </h4>
              <ul className="font-sketch text-lg space-y-2">
                <li>- Local-first CRM for creators</li>
                <li>- Visual testing for RN</li>
                <li>- AI that sketches UI</li>
              </ul>
            </StickyNote>
          </div>
        </div>
      </div>
    </section>
  );
};

import { motion } from "motion/react";
import { IdeaCard } from "../components/IdeaCard";
import { IDEAS } from "../data";

export const IdeasSection = () => (
  <section
    id="ideas"
    className="py-32 px-6 overflow-hidden bg-gray-50/30"
  >
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20 relative">
        <h2 className="text-6xl font-sketch inline-block relative">
          Wall of Ideas
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            className="absolute -bottom-2 left-0 h-1 bg-blue-400/30"
          />
        </h2>
        <p className="font-sketch text-gray-500 mt-4">
          Random concepts, sketches, and late-night thoughts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {IDEAS.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}

        {/* Add your own idea placeholder */}
        <div className="bg-white/50 p-6 sketch-border border-dashed border-gray-300 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-400">+</span>
          </div>
          <p className="font-sketch text-gray-400">Got a sketchy idea?</p>
          <p className="font-sketch text-xs text-gray-400 mt-1">
            Drop it in my inbox.
          </p>
        </div>

        {/* Floating Notes/Sketches */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [5, 8, 5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-20 top-0 hidden xl:block opacity-20"
        >
          <div className="w-40 h-40 bg-white sketch-border p-4 rotate-6">
            <p className="font-sketch text-[10px] text-center mt-2">
              Sketch #42
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

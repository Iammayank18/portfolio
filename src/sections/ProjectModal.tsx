import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { Tape } from "../components/Tape";
import type { Project } from "../data";

export const ProjectModal = ({
  selectedProject,
  onClose,
}: {
  selectedProject: Project | null;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {selectedProject && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          layoutId={`project-${selectedProject.id}`}
          initial={{ rotateX: 90, opacity: 0, scale: 0.9 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          exit={{ rotateX: 90, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="bg-white w-full max-w-3xl sketch-border p-4 sm:p-8 md:p-12 relative overflow-y-auto max-h-[90vh] origin-top"
          style={{ perspective: 1000 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Notebook Lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_31px,#000_31px,#000_32px)]" />

          {/* Paper Crease */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.1)] pointer-events-none z-10" />

          {/* Decorative Tape for Modal */}
          <Tape className="-top-4 left-1/2 -translate-x-1/2 w-32 h-10 rotate-0 opacity-80" />

          {/* Margin Notes in Modal */}
          <div className="absolute right-4 top-32 hidden lg:block rotate-6 opacity-60">
            <p className="font-sketch text-blue-500 text-sm border-l-2 border-blue-200 pl-2">
              Drafted: {new Date().toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <span className="font-mono text-sm text-blue-500 uppercase tracking-widest">
              {selectedProject.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-sketch mt-2">
              {selectedProject.title}
            </h2>
          </div>

          <div className="space-y-8">
            <section>
              <h4 className="font-sketch text-2xl mb-2 underline">
                The Problem
              </h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedProject.problem}
              </p>
            </section>

            <section>
              <h4 className="font-sketch text-2xl mb-2 underline">
                The Solution
              </h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedProject.solution}
              </p>
            </section>

            <div className="flex flex-wrap gap-3 pt-4">
              {selectedProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gray-100 font-mono text-sm rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-sketch text-xl hover:bg-gray-800 transition-colors"
              >
                View Project <ExternalLink size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

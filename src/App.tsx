import { useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { FloatingCharacter } from "./components/FloatingCharacter";
import { SketchIntro } from "./components/SketchIntro";
import { NavBar } from "./sections/NavBar";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { LabSection } from "./sections/LabSection";
import { IdeasSection } from "./sections/IdeasSection";
import { TerminalSectionWrapper } from "./sections/TerminalSectionWrapper";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";
import { Footer } from "./sections/Footer";
import { ProjectModal } from "./sections/ProjectModal";
import type { Project } from "./data";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress: pageScrollProgress } = useScroll();
  const scaleX = useSpring(pageScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="paper-texture min-h-screen selection:bg-yellow-200">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <>
            <SketchIntro key="intro" onComplete={() => setIsBooting(false)} />
          </>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FloatingCharacter />
            <NavBar scaleX={scaleX} />
            <HeroSection isBooting={isBooting} />
            <AboutSection isBooting={isBooting} />
            <ExperienceSection isBooting={isBooting} />
            <EducationSection />
            <RoadmapSection isBooting={isBooting} />
            <ProjectsSection
              onSelect={setSelectedProject}
              isBooting={isBooting}
            />
            <LabSection isBooting={isBooting} />
            <IdeasSection />
            <TerminalSectionWrapper />
            <ContactSection />
            <Footer />
            <ProjectModal
              selectedProject={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { ProjectCard } from "../components/ProjectCard";
import { PROJECTS, type Project } from "../data";
import { useProjectAnimations } from "../hooks/useProjectAnimations";

export const ProjectsSection = ({
  onSelect,
  isBooting,
}: {
  onSelect: (project: Project) => void;
  isBooting: boolean;
}) => {
  useProjectAnimations(isBooting);

  return (
    <section id="projects" className="py-16 md:py-32 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-6xl font-sketch mb-8 md:mb-16 text-center">
          Notebook of Builds
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-start">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => onSelect(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

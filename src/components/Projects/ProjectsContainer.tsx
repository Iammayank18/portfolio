import React from "react";
import ProjectsItems from "./ProjectsItems";

const ProjectsContainer = () => {
  return (
    <div className="flex flex-wrap gap-8">
      <ProjectsItems />
      <ProjectsItems />
      <ProjectsItems />
      <ProjectsItems />
      <ProjectsItems />
      <ProjectsItems />
    </div>
  );
};

export default ProjectsContainer;

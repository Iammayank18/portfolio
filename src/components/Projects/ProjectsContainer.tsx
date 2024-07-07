import React from "react";
import ProjectsItems from "./ProjectsItems";
import { PinContainer } from "../ui/HDpin";

const ProjectsContainer = () => {
  return (
    <div className="flex flex-wrap gap-8 space-y-8">
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

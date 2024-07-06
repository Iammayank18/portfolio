import Image from "next/image";
import React from "react";
import ProjectsContainer from "../Projects/ProjectsContainer";

const Projects = () => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-10 relative flex">
      <div>
        <div className="flex space-x-6">
          <h2 className="text-3xl font-normal">Projects</h2>
          <Image
            src={require("../../assets/icons/stars.png")}
            alt="Stars"
            width={30}
          />
        </div>
        <div className="mt-20">
          <ProjectsContainer />
        </div>
      </div>
    </div>
  );
};

export default Projects;

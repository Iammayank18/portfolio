import React from "react";
import ProjectsItems from "./ProjectsItems";
import schoolImg from "../../assets/icons/school.png";
import fashionImg from "../../assets/icons/fashion.png";
import iplantImg from "../../assets/icons/iplant.png";
import ecommImg from "../../assets/icons/ecomm.png";
import blogImg from "../../assets/icons/blog.png";
import gearImg from "../../assets/icons/generate.png";
const projects = [
  {
    name: "Verb",
    description:
      "Verb is a schools searching platform. Support multiple searching and filters",
    github: "#",
    live: "https://play.google.com/store/apps/details?id=com.iammayank20.alzebra&pli=1",
    inProgress: false,
    icon: schoolImg,
  },
  {
    name: "Showoff",
    description: "A social media platform for fashion influencers",
    github: "",
    live: "",
    inProgress: true,
    icon: fashionImg,
  },
  {
    name: "Iplant",
    description:
      "Iplant is an innovative and eco-friendly initiative that aims to promote the importance of plants and nature.",
    github: "",
    live: "",
    inProgress: true,
    icon: iplantImg,
  },
  {
    name: "Oyecomm",
    description: "A full stack ecommerce platform",
    github: "https://github.com/Iammayank18/oye-client",
    live: "https://oyecomm.vercel.app/account",
    inProgress: false,
    icon: ecommImg,
  },
  {
    name: "DBlock",
    description: "Dblock is a blogging platform, for multiple users",
    github: "",
    live: "",
    inProgress: true,
    icon: blogImg,
  },
  {
    name: "MongoDb Schema Generator",
    description: "Dblock is a blogging platform, for multiple users",
    github: "https://github.com/Iammayank18/schema-generator",
    live: "https://schema-generator-three.vercel.app/",
    inProgress: false,
    icon: gearImg,
  },
];

const ProjectsContainer = () => {
  return (
    <div className="flex flex-wrap gap-4 w-full items-center">
      {projects.map((item) => (
        <ProjectsItems key={item.name} item={item} />
      ))}
    </div>
  );
};

export default ProjectsContainer;

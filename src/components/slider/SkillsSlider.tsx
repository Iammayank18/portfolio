/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./style.css";
import reactSvg from "../../assets/icons/react.svg";
import nodeSvg from "../../assets/icons/node.svg";
import awsSvg from "../../assets/icons/aws.svg";
import jestSvg from "../../assets/icons/jest.png";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import CoreCard from "../card/CoreCard";

const IconSlider = () => {
  const tech = [
    {
      title: "Frontend",
      skills: [
        {
          title: "Html",
          description: "",
        },
        {
          title: "CSS",
          description: "",
        },
        {
          title: "Javascript",
          description: "",
        },
        {
          title: "TypeScript",
          description: "",
        },
        {
          title: "React.js",
          description: "",
        },
        {
          title: "Next.js",
          description: "",
        },
      ],
      link: "",
      icon: reactSvg,
    },
    {
      title: "Backend",
      skills: [
        {
          title: "Node.js",
          description: "",
        },
        {
          title: "Express.js",
          description: "",
        },
        {
          title: "Nest.js",
          description: "",
        },
        {
          title: "MongoDb",
          description: "",
        },
        {
          title: "Sql",
          description: "",
        },
      ],
      link: "",
      icon: nodeSvg,
    },
    {
      title: "Testing",
      skills: [
        {
          title: "React Testing Library",
          description: "",
        },
        {
          title: "Jest",
          description: "",
        },
        {
          title: "Playwright",
          description: "",
        },
        {
          title: "Cypress",
          description: "",
        },
      ],
      link: "",
      icon: jestSvg,
    },
    {
      title: "Cloud",
      skills: [
        {
          title: "Aws",
          description: "",
        },
        {
          title: "Firebase",
          description: "",
        },
        {
          title: "Appwrite",
          description: "",
        },
        {
          title: "Heroku",
          description: "",
        },
        {
          title: "Heroku",
          description: "",
        },
      ],
      link: "",
      icon: awsSvg,
    },
  ];
  return (
    <div>
      <CoreCard items={tech} />
    </div>
  );
};

export default IconSlider;

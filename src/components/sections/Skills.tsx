"use client";
import React from "react";
import IconSlider from "../slider/SkillsSlider";
import Image from "next/image";
import stars from "../../assets/icons/stars.png";
export const Skills = () => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-10 flex">
      <div>
        <div className="flex space-x-6">
          <h2 className="text-3xl font-normal">My Skills</h2>
          <Image src={stars} alt="Stars" width={30} />
        </div>

        <div className="mt-14">
          <IconSlider />
        </div>
      </div>
    </div>
  );
};

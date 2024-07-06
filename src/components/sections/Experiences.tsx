import React from "react";
import Timeline from "../timeline/Timeline";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl h-screen lg:py-16 z-10 relative flex">
      <div>
        <div className="flex space-x-6">
          <h2 className="text-3xl font-normal">My Experience</h2>
          <Image
            src={require("../../assets/icons/stars.png")}
            alt="Stars"
            width={30}
          />
        </div>
        <div className="mt-20">
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default Experience;
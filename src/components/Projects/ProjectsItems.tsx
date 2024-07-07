/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { PinContainer } from "../ui/HDpin";

const ProjectsItems = () => {
  return (
    <PinContainer title="My Project" href="#">
      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
          Project
        </h3>
        <div className="text-base !m-0 !p-0 font-normal">
          <span className="text-slate-500 ">Blaaah Blaaah</span>
        </div>
        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
      </div>
    </PinContainer>
  );

  //   <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-[#7A87FB] to-[#FFD49C] group-hover:from-[#7A87FB] group-hover:to-[#FFD49C] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:animate-pulse max-w-sm ">
  //     <span className="relative px-2 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#101111] rounded-md group-hover:bg-opacity-0">
  //       <div className="p-5">
  //         <a href="#">
  //           <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
  //             Noteworthy technology acquisitions 2021
  //           </h5>
  //         </a>
  //         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
  //           Here are the biggest enterprise technology acquisitions of 2021 so
  //           far, in reverse chronological order.
  //         </p>
  //         <CoreButton />
  //       </div>
  //     </span>
  //   </div>
  // );
  // return (
  //   <div className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-green-500 hover:before:[box-shadow:_20px_20px_20px_30px_#2ecc71] duration-500 before:duration-500 hover:duration-500  hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-green-500 relative max-w-sm border text-left p-3 text-indigo-200 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-orange-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-pink-500 after:right-8 after:top-3 after:rounded-full after:blur-lg">
  //     <a href="#">{/* <Image /> */}</a>
  //     <div className="p-5">
  //       <a href="#">
  //         <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
  //           Noteworthy technology acquisitions 2021
  //         </h5>
  //       </a>
  //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
  //         Here are the biggest enterprise technology acquisitions of 2021 so
  //         far, in reverse chronological order.
  //       </p>
  //       <CoreButton />
  //     </div>
  //   </div>
  // );
};

export default ProjectsItems;

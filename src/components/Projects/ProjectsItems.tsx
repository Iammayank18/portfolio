/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { FC } from "react";
import { PinContainer } from "../ui/HDpin";
import { GitHubLogoIcon, Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
type Porps = {
  item: {
    name: string;
    description: string;
    github: string;
    live: string;
    inProgress: boolean;
    icon: StaticImageData;
  };
};
const ProjectsItems: FC<Porps> = ({ item }) => {
  return (
    <Card
      className={
        "w-full md:w-[300px] h-[400px] overflow-hidden hover:border-2 hover:border-slate-500 transition duration-700"
      }
    >
      <CardHeader>
        <div className="flex items-center">
          <h3 className="max-w-xs font-bold  text-xl text-slate-100">
            {item.name}
          </h3>
          {item.inProgress && (
            <span className="bg-blue-100 text-slate-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-[#FFD49C] dark:text-slate-800 ms-3">
              inprogress
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center space-x-4">
          <Link href={item.github} target="_blank">
            <GitHubLogoIcon color="white" width={20} height={20} />
          </Link>

          <Link href={item.live} target="_blank">
            <Link1Icon color="white" width={28} height={28} />
          </Link>
        </div>
        <div className="text-base !m-0 !p-0 font-normal">
          <span className="text-slate-500 ">{item.description}</span>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <Image
            src={item.icon}
            alt={item.name}
            width={200}
            height={200}
            className=" z-50"
            priority
          />
        </div>
      </CardContent>
    </Card>
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

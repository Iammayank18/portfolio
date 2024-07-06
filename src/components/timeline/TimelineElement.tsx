import React from "react";
import moment from "moment";

const TimelineElement = () => {
  return (
    <li className=" mb-16 ms-14">
      <button className="absolute flex items-center justify-center -start-6 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#7A87FB] to-[#FFD49C] group-hover:from-[#7A87FB] group-hover:to-[#FFD49C] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:animate-pulse">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
          1
        </span>
      </button>

      <h3 className="flex items-center mb-1 text-lg font-normal text-gray-900 dark:text-white">
        Flowbite Application UI v2.0.0{" "}
        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
          Latest
        </span>
      </h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        from feb 2, 2024 to Current
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        Get access to over 20+ pages including a dashboard layout, charts,
        kanban board, calendar, and pre-order E-commerce & Marketing pages.
      </p>
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#7A87FB] to-[#FFD49C] group-hover:from-[#7A87FB] group-hover:to-[#FFD49C] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:animate-pulse">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
          View more
        </span>
      </button>
    </li>
  );
};

export default TimelineElement;

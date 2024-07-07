"use client";
import React from "react";

type Props = {
  item: {
    company: string;
    role: string;
    duration: string;
    isCurrent?: boolean;
    responsibilities: string[];
  };
  id: number;
};

const TimelineElement: React.FC<Props> = ({
  item: { company, role, duration, responsibilities, isCurrent },
  id,
}) => {
  const [showFull, setShowFull] = React.useState(false);

  return (
    <li className=" mb-16 ms-14 space-y-4">
      <p className="absolute flex items-center justify-center -start-6 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#7A87FB] to-[#FFD49C] group-hover:from-[#7A87FB] group-hover:to-[#FFD49C] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:animate-pulse">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
          {id + 1}
        </span>
      </p>

      <h3 className="flex items-center mb-1 text-lg font-normal text-gray-900 dark:text-white">
        {company}{" "}
        {isCurrent && (
          <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
            Latest
          </span>
        )}
      </h3>
      <p className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 space-x-2">
        <span>{role}</span>
        <span>{duration}</span>
      </p>
      <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        <ul className=" space-y-2">
          {(showFull ? responsibilities : responsibilities.slice(0, 5)).map(
            (item: string, i) => {
              return (
                <li className="list-inside list-disc" key={i}>
                  {item}
                </li>
              );
            }
          )}
        </ul>
        <p
          className="mt-5 text-slate-100 cursor-pointer hover:text-sky-600"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? "Show less" : "Show more"}
        </p>
      </div>
      {/* <CoreButton /> */}
    </li>
  );
};

export default TimelineElement;

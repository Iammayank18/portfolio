import React from "react";

const CoreButton = ({ onClick, title }: any) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#7A87FB] to-[#FFD49C] group-hover:from-[#7A87FB] group-hover:to-[#FFD49C] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:animate-pulse"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
        {title ?? "View more"}
      </span>
    </button>
  );
};

export default CoreButton;

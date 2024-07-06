import React from "react";
import TimelineElement from "./TimelineElement";

const Timeline = () => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      <TimelineElement />
      <TimelineElement />
      <TimelineElement />
      <TimelineElement />
    </ol>
  );
};

export default Timeline;

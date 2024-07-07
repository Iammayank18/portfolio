"use client";
import React from "react";
import TimelineElement from "./TimelineElement";
import experience from "../../data/experience.json";
import CoreButton from "../CoreButton";

const Timeline = () => {
  const [showFull, setShowFull] = React.useState(false);

  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {(showFull ? experience : experience.slice(0, 3)).map((item, i) => {
        return <TimelineElement key={i} item={item} id={i} />;
      })}
      <div className="ml-5">
        <CoreButton
          title={showFull ? "View less" : "View more"}
          onClick={() => {
            setShowFull(!showFull);
          }}
        />
      </div>
    </ol>
  );
};

export default Timeline;

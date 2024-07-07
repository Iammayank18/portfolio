import React from "react";
import CardItem from "./CardItem";

type props = {
  items: {
    title: string;
    skills: {
      title: string;
      description: string;
    }[];
    link?: string | any;
    icon?: React.ReactElement | any;
  }[];
};
const CoreCard: React.FC<props> = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-4 w-full items-center">
      {items.map((data, i) => (
        <CardItem key={i} item={data} />
      ))}
    </div>
  );
};

export default CoreCard;

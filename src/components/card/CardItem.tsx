"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import CoreButton from "../CoreButton";

type CardProps = {
  className?: React.ComponentProps<typeof Card>;
  item: {
    title: string;
    skills: {
      title: string;
      description: string;
    }[];
    link?: string | any;
    icon?: React.ReactElement | any;
  };
};

export default function CardItem({ className, item, ...props }: CardProps) {
  const [showFull, setShowFull] = React.useState(false);
  return (
    <Card className={cn("w-full md:w-[300px]", className)} {...props}>
      <CardHeader>
        <Image src={item.icon} alt={item.title} />
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 transition ease-out ">
        <div>
          {(showFull ? item.skills : item.skills.slice(0, 3)).map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{item.title}</p>
              </div>
            </div>
          ))}

          <div>
            <p
              className="cursor-pointer hover:text-sky-400"
              onClick={() => {
                setShowFull(!showFull);
              }}
            >
              {showFull ? "View less" : "View more"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

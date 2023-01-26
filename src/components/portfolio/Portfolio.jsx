import React from "react";
import I1 from "../../static/images/cryp.png";
import I2 from "../../static/images/gitrepo.png";
import I3 from "../../static/images/port.png";
import I4 from "../../static/images/oye.png";
import I5 from "../../static/images/weather.png";
import I6 from "../../static/images/exp.png";
import "./Portfolio.css";
import { BiLink } from "react-icons/bi";
const data = [
  {
    id: 1,
    title: "Cryption",
    img: I1,
    github: "",
    other: "https://csb-p7iku.netlify.app/",
  },
  {
    id: 2,
    title: "Github Repository Fetcher",
    img: I2,
    github: "#",
    other: "https://csb-tuj38.netlify.app/",
  },
  {
    id: 3,
    title: "My portfolio",
    img: I3,
    github: "#",
    other: "https://portfolio-chi-umber-54.vercel.app/",
  },
  {
    id: 4,
    title: "Oye Commerce",
    img: I4,
    github: "#",
    other: "https://oyecomm.vercel.app/account",
  },
  {
    id: 5,
    title: "Weather App",
    img: I5,
    github: "#",
    other: "#",
  },
  {
    id: 6,
    title: "Expencse Tracker",
    img: I6,
    github: "#",
    other: "https://hackerearth-hackathon.vercel.app/",
  },
];
const Portfolio = () => {
  let tr = true;
  return (
    <section id="" className="h-screen">
      <h5 className="text-4xl dark:text-white text-gray-500 main__logo">
        My Recent Work
      </h5>
      <h2>Portfolio</h2>
      <div className="md:w-4/6 w-5/6 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:grid-cols-2">
          {data.map(({ id, title, img, github, other }) => {
            return (
              <article className="bg-slate-200 dark:bg-slate-700 p-7 rounded-2xl md:hover:scale-125 hover:scale-110  ease-in duration-300 z-10 hover:z-30 hover:border-2 hover:border-sky-500">
                <div className="">
                  <img src={img} alt="" className="rounded-lg h-64" />
                </div>
                <h3 className="dark:text-slate-400 mt-3">{title}</h3>

                <div className="py-4 flex gap-2">
                  <a href={github}>Github</a>
                  <div className="flex gap-2 items-center">
                    <BiLink />
                    <a href={other} target="_blank" rel="noreferrer">
                      Demo
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

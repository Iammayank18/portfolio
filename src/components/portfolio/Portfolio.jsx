import React from "react";
import I1 from "../../static/images/cryp.png";
import I2 from "../../static/images/gitrepo.png";
import I3 from "../../static/images/port.png";
import I4 from "../../static/images/oye.png";
import I5 from "../../static/images/weather.png";
import I6 from "../../static/images/exp.png";
import "./Portfolio.css";

const data = [
  {
    id: 1,
    title: "Cryption",
    img: I1,
    github: "#",
    other: "#"
  },
  {
    id: 2,
    title: "Github Repository Fetcher",
    img: I2,
    github: "#",
    other: "#"
  },
  {
    id: 3,
    title: "My portfolio",
    img: I3,
    github: "#",
    other: "#"
  },
  {
    id: 4,
    title: "Oye Commerce",
    img: I4,
    github: "#",
    other: "#"
  },
  {
    id: 5,
    title: "Weather App",
    img: I5,
    github: "#",
    other: "#"
  },
  {
    id: 6,
    title: "Expencse Tracker",
    img: I6,
    github: "#",
    other: "#"
  }
];
const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container port__container">
        {data.map(({ id, title, img, github, other }) => {
          return (
            <article className="port__item">
              <div className="port__item__img">
                <img src={img} alt="" />
              </div>
              <h3>{title}</h3>

              <div className="port__cta">
                <a href={github} className="btn">
                  Github
                </a>
                <a href={other} className="btn btn-primary">
                  Other
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;

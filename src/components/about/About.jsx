import React from "react";
import M1 from "../../static/images/me.png";
import { FaAward } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import $ from "jquery";
import "./About.css";
const About = () => {
  const ShowPop = () => {
    $("#PopUp").fadeIn(500);
  };

  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={M1} alt="main" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>2 years</small>
            </article>
            <article className="about__card">
              <AiOutlineUsergroupAdd className="about__icon" />
              <h5>Clients</h5>
              <small>10+ Worldwide</small>
            </article>
            <article className="about__card">
              <BiLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>20+ Completed Projects</small>
            </article>
          </div>
          <p>
            I started my journey as a freelance, later learn new techs and apply
            it by making projects. and after that, i worked with 2 startups and
            learn so many new things here.
          </p>
          <button onClick={ShowPop} className="btn btn-primary">
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;

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
    <section id="about " className="h-screen">
      <h5 className="text-4xl dark:text-white text-gray-500 main__logo">
        Get To Know
      </h5>
      <h2>About Me</h2>

      <div className="md:w-3/6 w-5/6 dark:bg-slate-700 bg-slate-100 mx-auto rounded-lg p-4 z-10 relative dark:text-white leading-relaxed">
        <h3 className="text-2xl mb-3">I am a Software Engineer</h3>
        <p>
          I love to code frontend of the application either mobile or web.
          Currently I am working in
          <strong className="ml-2 dark:text-cyan-400 text-cyan-700 underline">
            @Mindnerves technolgies services pvt.ltd
          </strong>
        </p>
        <div className="mt-2 flex gap-2 items-center">
          <p className="text-lg font-bold">Tech I use here: </p>
          <div className="flex gap-2 flex-wrap">
            <span className="p-2 px-3 bg-green-200 rounded-2xl text-green-800">
              Javascript
            </span>
            <span className="p-2 px-3 bg-cyan-200 rounded-2xl text-cyan-800">
              React.js
            </span>
            <span className="p-2 px-3 bg-red-200 rounded-2xl text-red-800">
              React Native
            </span>
            <span className="p-2 px-3 bg-yellow-200 rounded-2xl text-yellow-800">
              Redux
            </span>
            <span className="p-2 px-3 bg-sky-200 rounded-2xl text-sky-800">
              Tailwind Css
            </span>
          </div>
        </div>
      </div>

      {/* ======================== */}

      <div className="mt-5 md:w-3/6 w-5/6 dark:bg-slate-700 bg-slate-100 mx-auto rounded-lg p-4 z-10 relative dark:text-white leading-relaxed">
        <h3 className="text-2xl mb-3">
          Improving my datastructre and algorithms skills.
        </h3>
        <p>
          During these days , i use to solve algorithmic problems on{" "}
          <span>HackerRank </span>
          and <span>CodeChef</span>. This help me alot in my development
          environment, when i have to solve complex problems related to ui
          functionality.
        </p>
        <div className="mt-2 flex gap-2 items-center">
          <p className="text-lg font-bold">Tech I use : </p>
          <div className="flex gap-2 flex-wrap">
            <span className="p-2 px-3 bg-cyan-200 rounded-2xl text-cyan-800">
              Javascript
            </span>
            <span className="p-2 px-3 bg-yellow-200 rounded-2xl text-yellow-800">
              C++
            </span>
          </div>
        </div>
      </div>

      {/* =========================== */}

      <div className="mt-5 md:w-3/6 w-5/6 dark:bg-slate-700 bg-slate-100 mx-auto rounded-lg p-4 z-10 relative dark:text-white leading-relaxed">
        <h3 className="text-2xl mb-3">I ❤️ Javascript.</h3>
        <p>
          I love to code in javascript. I used javascript everywhere from
          Backend to frontend and in Datastructe and algorithm to.
        </p>
        <p>
          I started javascript from starting of my journey. Every time i try to
          learn new concept in javascript and implementing in my projects.
        </p>
        <div className="mt-2 flex gap-2 items-center">
          <p className="text-lg font-bold">Tech I use : </p>
          <div className="flex gap-2 flex-wrap">
            <span className="p-2 px-3 bg-red-200 rounded-2xl text-red-800">
              Javascript
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

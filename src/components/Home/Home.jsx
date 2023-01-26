import React from "react";

import Mak from "../../static/images/nb.png";
import "./Home.css";
import { Button, Divider, Radio, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { BsLinkedin, BsGithub, BsFacebook, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
const Home = () => {
  return (
    <div className="mt-16 h-screen">
      <div className="container relative text-center h-96 dark:text-white text-black">
        <h5>Hello I'm</h5>
        <h1 className="main__logo text-6xl">Mayank Thakur</h1>
        <div className="flex gap-3">
          <h5 className="text-4xl dark:text-white text-gray-500">I'm a</h5>
          <Typewriter
            options={{
              strings: [
                "Frontend Developer",
                "Software engineer",
                "Fast Learner",
                "Task Oriented",
                "Explorer",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 0.3,
            }}
          />
        </div>

        <div className="header__social hidden lg:flex">
          <a href="http://linked">
            <BsLinkedin />
          </a>
          <a href="http://github">
            <BsGithub />
          </a>
          <a href="http://face">
            <BsFacebook />
          </a>
        </div>
        <div className="me">
          <img src={Mak} alt="" className="z-10" />
        </div>
        <a href="#contact" className="scroll__down hidden lg:block">
          Scroll Down
        </a>

        <nav className="btanave bg-slate-300 text-white dark:bg-slate-700 border-1 hover:bg-transparent hover:border-1 hover:border-gray-500 dark:hover:bg-transparent">
          <Link
            to={"about"}
            className="flex gap-1 text-gray-600 hover:text-slate-800"
          >
            <p className="dark:text-white"> About me </p>
            <BsArrowRight size={30} className="dark:text-white" />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Home;

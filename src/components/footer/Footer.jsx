import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineGithub } from "react-icons/ai";
import { GrLinkedin } from "react-icons/gr";
import { FaHackerrank } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-slate-800 absolute w-full z-50">
      <div className="w-5/6  mx-auto p-3 mt-5 flex justify-between ">
        <div>
          <h2 className="main__logo dark:text-white text-2xl">Mayank</h2>
        </div>
        <div>
          <ul className="flex justify-between gap-3 items-center">
            <li className="flex gap-2 items-center dark:text-white">
              <AiOutlineGithub />
              <span>Github</span>
            </li>
            <li className="flex gap-2 items-center dark:text-white">
              <GrLinkedin className="text-sky-600" />
              <span>LinkedIn</span>
            </li>
            <li className="flex gap-2 items-center dark:text-white">
              <FaHackerrank className="text-green-600" />
              <span>HackerRank</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

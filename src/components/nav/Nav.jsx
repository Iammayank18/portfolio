import React from "react";
import "./Nav.css";
import { AiOutlineHome } from "react-icons/ai";
import { ImAngry } from "react-icons/im";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
const Nav = () => {
  const [activeNav, setActiveNav] = useState("#");
  return (
    <nav className="nave z-50">
      <Link
        to="/"
        onClick={() => setActiveNav("#")}
        className={activeNav === "#" ? "active" : ""}
      >
        <AiOutlineHome />
      </Link>
      <Link
        to="about"
        onClick={() => setActiveNav("#about")}
        className={activeNav === "#about" ? "active" : ""}
      >
        <ImAngry />
      </Link>
      <Link
        to="experience"
        onClick={() => setActiveNav("#experience")}
        className={activeNav === "#experience" ? "active" : ""}
      >
        <BsFillJournalBookmarkFill />
      </Link>
      <Link
        to="works"
        onClick={() => setActiveNav("#portfolio")}
        className={activeNav === "#portfolio" ? "active" : ""}
      >
        <MdOutlineDesignServices />
      </Link>
      <Link
        to="contact"
        onClick={() => setActiveNav("#contact")}
        className={activeNav === "#contact" ? "active" : ""}
      >
        <MdContactSupport />
      </Link>
    </nav>
  );
};

export default Nav;

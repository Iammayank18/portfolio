import React from "react";
import Cta from "../Cta";
import Mak from "../../static/images/nb.png";
import Social from "../Social";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1 className="main__logo">Mayank Thakur</h1>
        <h5 className="text-light">
          I'm a Full Stack Developer, and love to work on new technologies
        </h5>
        <Cta />
        <Social />
        <div className="me">
          <img src={Mak} alt="" srcset="" />
        </div>
        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
      </div>
    </header>
  );
};

export default Header;

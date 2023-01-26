import React from "react";
import "./Dark.css";
import { ImSun } from "react-icons/im";
import { BsMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import $ from "jquery";

const Darkmode = () => {
  const [but, setBut] = useState(<BsMoonStarsFill className="mode_icon" />);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    var html = document.querySelector("html");
    if (dark) {
      setBut(<BsMoonStarsFill className="mode_icon" />);
      html.classList.add("dark");
    } else {
      setBut(<ImSun className="mode_icon" />);
      html.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div>
      <button className="mode dark:text-white" onClick={() => setDark(!dark)}>
        {but}
      </button>
    </div>
  );
};

export default Darkmode;

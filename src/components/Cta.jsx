import React from "react";
import $ from "jquery";
import resume from "../static/mr.pdf";
const Cta = () => {
  const ShowPop = () => {
    $("#PopUp").fadeIn(500);
  };

  return (
    <div className="cta">
      <a href={resume} download="mr.pdf" target="_blank" className="btn">
        Download CV
      </a>
      <a href="#" onClick={ShowPop} className="btn btn-primary">
        Let's Talk
      </a>
    </div>
  );
};

export default Cta;

import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import "./Exp.css";
const Exp = () => {
  return (
    <section id="experience">
      <h5>What Skills I Have</h5>
      <h2>My Experience</h2>
      <div className="container exp_container">
        <div className="exp_frontend">
          <h3>Frontend Experience</h3>
          <div className="exp_content">
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>HTML</h4>
                <small className="text-light">2.5 yr exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>Css</h4>
                <small className="text-light">2.5 yr exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>JS</h4>
                <small className="text-light">2 yr exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>Bootstrap</h4>
                <small className="text-light">2.5 yr exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>Jquery</h4>
                <small className="text-light">1.5 yr exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>React.js</h4>
                <small className="text-light">2 yr exp</small>
              </div>
            </article>
          </div>
        </div>
        <div className="exp_backend">
          <h3>Backend Experience</h3>
          <div className="exp_content">
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>Node.js</h4>
                <small className="text-light">9 months exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>PHP</h4>
                <small className="text-light">8 months exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>MongoDb</h4>
                <small className="text-light">9 months exp</small>
              </div>
            </article>
            <article className="exp_details">
              <BsPatchCheckFill className="exp_details-icon" />
              <div>
                <h4>SQL</h4>
                <small className="text-light">8 months exp</small>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exp;

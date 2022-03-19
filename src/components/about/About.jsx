import React from 'react'
import M1 from '../../static/images/mak2.jpeg'
import { FiAward } from 'react-icons/fi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiLibrary } from 'react-icons/bi'
import $ from 'jquery'
import './About.css'
const About = () => {
   const ShowPop = () => { 
    $("#PopUp").fadeIn(500);
  }
    
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
             <img src={M1} />
         </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FiAward className='about__icon'/>
              <h5>Experience</h5>
              <small>2+ years</small>
            </article>
            <article className="about__card">
              <AiOutlineUsergroupAdd className='about__icon'/>
              <h5>Clients</h5>
              <small>50+ Worldwide</small>
            </article>
            <article className="about__card">
              <BiLibrary className='about__icon'/>
              <h5>Projects</h5>
              <small>80+ Completed Projects</small>
            </article>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam laboriosam facilis quo animi aut doloribus, nulla natus delectus rerum necessitatibus, maiores quasi vitae. Commodi blanditiis assumenda doloremque pariatur laboriosam rem.
          </p>
          <button onClick={ShowPop} className='btn btn-primary'>Let's Talk</button>
        </div>
      </div>
    </section>
  )
}

export default About
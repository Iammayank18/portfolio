import React from 'react'
import Cta from '../Cta'
import Mak from '../../static/images/mak.jpeg'
import Social from '../Social';
import './Header.css'

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Mayank Thakur</h1>
        <h5 className="text-light">
          I'm a Full Stack Developer, currently working at <a href="https://www.linkedin.com/in/mayank-thakur-b9a8b9a6/">Linkedin</a>
        </h5>
        <Cta />
        <Social />
        <div className="me">
          <img src={Mak} alt="" srcset="" />
        </div>
        <a href="#contact" className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header
import React from 'react'
import './Footer.css'
import { FaFacebook } from 'react-icons/fa'
import { AiOutlineInstagram,AiOutlineGithub } from 'react-icons/ai'
import {GrLinkedin} from 'react-icons/gr'
const Footer = () => {
  return (
    <footer id='footer'>
      <div className="container container__footer">
         <div>
         <a href="#" className='footer__logo'>Mayank</a>
       </div>
      <ul className='permanlink'>
        <h3>Quick Links</h3>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact me</a></li>
      </ul>

      <div className="footer__social">
        <a href=""><FaFacebook/></a>
        <a href=""><AiOutlineInstagram/></a>
        <a href=""><GrLinkedin/></a>
        <a href=""><AiOutlineGithub/></a>
        
      </div>

      <div className="footer__copyright">
        <small>&copy; Mayank Thakur. All rights reserved.</small>
      </div>
     </div>
    </footer>
  )
}

export default Footer
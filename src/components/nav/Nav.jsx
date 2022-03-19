import React from 'react'
import './Nav.css'
import { AiOutlineHome } from 'react-icons/ai'
import { ImAngry } from 'react-icons/im'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import { MdOutlineDesignServices } from 'react-icons/md'
import { MdContactSupport } from 'react-icons/md'

import { useState } from 'react'
const Nav = () => {

  const[activeNav,setActiveNav] = useState('#')
  return (
    <nav>
      <a href="#" onClick={()=>setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><AiOutlineHome/></a>
      <a href="#about" onClick={()=>setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><ImAngry/></a>
      <a href="#experience" onClick={()=>setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><BsFillJournalBookmarkFill/></a>
      <a href="#services" onClick={()=>setActiveNav('#services')} className={activeNav === '#services' ? 'active' : ''}><MdOutlineDesignServices/></a>
      <a href="#contact" onClick={()=>setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><MdContactSupport/></a>
   </nav>
  )
}

export default Nav
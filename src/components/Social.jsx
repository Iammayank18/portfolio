import React from 'react'
import {BsLinkedin,BsGithub,BsFacebook} from 'react-icons/bs'
const Social = () => {
  return (
      <div className='header__social'>
          <a href="http://linked"><BsLinkedin/></a>
          <a href="http://github"><BsGithub/></a>
          <a href="http://face"><BsFacebook/></a>
    </div>
  )
}

export default Social
import React from 'react'
import $ from 'jquery';
const Cta = () => {
  const ShowPop = () => { 
    $("#PopUp").fadeIn(500);
  }
    
  return (
      <div className='cta'>
          <a href="http://" className='btn'>Download CV</a>
          <a href="#" onClick={ShowPop} className='btn btn-primary'>Let's Talk</a>
    </div>
  )
}

export default Cta
import React from 'react'
import './Dark.css'
import { ImSun } from 'react-icons/im'
import { BsMoonStarsFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import $ from 'jquery'

const Darkmode = () => {

    const [but, setBut] = useState(<BsMoonStarsFill className='mode_icon'/>);
    const [dark, setDark] = useState(true);
    
    useEffect(() => {
        if (dark) {
           setBut(<BsMoonStarsFill className='mode_icon'/>);
            document.body.classList.toggle('dark-theme');
            $('body').removeClass('light-theme');
            localStorage.setItem('dark', 'true');
        } else {
            setBut(<ImSun className='mode_icon'/>);
            document.body.classList.toggle('light-theme');
             $('body').removeClass('dark-theme');
            localStorage.setItem('dark', 'false');
        }
    }, [dark]);

    useEffect(() => {
        const dark = localStorage.getItem('dark');
        if (dark === 'true') {
            document.body.classList.toggle('dark-theme');
            $('body').removeClass('light-theme');
        } else {
            document.body.classList.toggle('light-theme');
             $('body').removeClass('dark-theme');
        }
    }, []);
  return (
      <div>
          <button className='mode' onClick={() => setDark(!dark)}>
             {but} 
          </button>
    </div>
  )
}

export default Darkmode
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
            $('.exp_frontend').css('background-color', '#3e3e60');
            $('.exp_backend').css('background-color', '#3e3e60');
            $('.about__card').css('background-color', '#3e3e60');
            $('.service').css('background-color', '#3e3e60');
            $('.port__item').css('background-color', '#3e3e60');
            $('.swiper-slide').css('background-color', '#3e3e60');
            $('.contact__option').css('background-color', '#3e3e60');
            $('#footer').css('background-color', '#3e3e60');
            $('nav').css('background-color', 'rgba(17, 25, 40, 0.79)');
            $('.pop__container').css('background-color', '  rgba(17, 25, 40, 0.75)');
            localStorage.setItem('dark', 'true');
        } else {
            setBut(<ImSun className='mode_icon'/>);
            document.body.classList.toggle('light-theme');
            $('body').removeClass('dark-theme');
            $('.exp_frontend').css('background-color', '#fff');
            $('.exp_backend').css('background-color', '#fff');
             $('.about__card').css('background-color', '#fff');
             $('.service').css('background-color', '#fff');
             $('.port__item').css('background-color', '#fff');
             $('.swiper-slide').css('background-color', '#fff');
             $('.contact__option').css('background-color', '#fff');
             $('#footer').css('background-color', '#fff');
            $('nav').css('background-color', '#DDDDDD');
            $('.pop__container').css('background-color', 'rgb(205 205 205 / 75%)');
            
            
            localStorage.setItem('dark', 'false');
        }
    }, [dark]);

    // useEffect(() => {
    //     const dark = localStorage.getItem('dark');
    //     if (dark === 'true') {
    //         document.body.classList.toggle('dark-theme');
    //         $('body').removeClass('light-theme');
    //     } else {
    //         document.body.classList.toggle('light-theme');
    //          $('body').removeClass('dark-theme');
    //     }
    // }, []);
  return (
      <div>
          <button className='mode' onClick={() => setDark(!dark)}>
             {but} 
          </button>
    </div>
  )
}

export default Darkmode
import React,{useRef} from 'react'
import './News.css'
import NewsGif from '../../static/images/n2.png'
import close from '../../static/images/x.png';
import $ from 'jquery';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
const Newsletter = () => {
    
    let name1 = Cookies.get('name');
    console.log(name1);

    if (name1 === 'news') { 
        $("#news").css('display', 'none');
    } else {
       
          setTimeout(() => {
        $("#news").show();
    },3000)
       
    }
    

    const Closethis = () => {
        $("#news").hide();
        document.cookie = 'name=news';
        const date = new Date();
        date.setHours(date.getHours() + 24);
        document.cookie = 'name=news; expires=' + date.toUTCString();
    }


         const notify = () => toast.success('😎 NewsLetter Subscribed', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

      const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
   $('#msg').html(`<h3>Subscribing...</h3>`);
 
    emailjs.sendForm('service_qog4csa', 'template_2x8sq6r', form.current, '8AnB9nzXg3iA1Rt0A')
        .then((result) => {
          Cookies.set('name', 'news')
          $('#msg').html('<h3>Subscribed</h3>');
          $('#news').fadeOut(500);
          notify();
        e.target.reset();
           setTimeout(() => {
      $('#msg').html(`<h3>Subscribe</h3>`);
    }
      , 2000);
      }, (error) => {
          console.log(error.text);
      });
  };
    
  return (
      <div id='news'>   
          <div className=" news__container">
              <div className="news__head">
                  <h2>Newsletter</h2>
                  <img src={close} alt="" onClick={Closethis} className='close1' />
              </div>
              <div className="news">
                  <div className='left1'>
                      <img src={NewsGif} alt="" />
                  </div>
                  <div className='right1'>
                      <form ref={form} onSubmit={sendEmail}>
                          <input type="text" className='fname' name='email' placeholder='Email' required />
                          <button type="submit" className='btn btn-primary' id='msg'>Subscribe</button>
                      </form>
                  </div>
              </div>

          </div>
    </div>
  )
}

export default Newsletter
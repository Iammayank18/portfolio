import React,{useRef} from 'react'
import './Pop.css';
import emailjs from '@emailjs/browser';
import $ from 'jquery';
import Run from '../../static/images/o3.png';
import close from '../../static/images/x.png';
import { toast } from 'react-toastify';
export const Pop = () => {

     const notify = () => toast.success('🦄 Mail Sended', {
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
   $('.msg').html(`<h3>Sending...</h3>`);
 
    emailjs.sendForm('service_qog4csa', 'template_7ooi7g6', form.current, '8AnB9nzXg3iA1Rt0A')
      .then((result) => {
          $('.msg').html('<h3>Message Sent</h3>');
          $('#PopUp').fadeOut(500);
          notify();
        e.target.reset();
           setTimeout(() => {
      $('.msg').html(`<h3>Send Message</h3>`);
    }
      , 2000);
      }, (error) => {
          console.log(error.text);
      });
  };
    
    const ClosePop = () => { 
        
        $('#PopUp').fadeOut(500);
        
        
    }
  return (
      <div id='PopUp' >
          <div className="pop__container" >
              <div className="pop__header">
               <h2>Enquiry Now</h2>  
              <img src={close} className="close" onClick={ClosePop} alt="" />
             </div>
              <div className="pop__body">
                  <div className='left'>
                    <img src={Run} alt="" />
                  </div>
                  <div className='right'>
                       <form ref={form} onSubmit={sendEmail}>
                    <input type="text"  name="name" className='form1' id="" placeholder='Full Name' required/>
                    <input type="email"  name="email" className='form1' id="" placeholder='Email' required/>
                    <textarea name="message" id="" className='form2' cols="30" rows="12" placeholder='Message'></textarea>
                    <button type="submit" value="Send Message" className='btn btn-primary' id='sub_button'><span className='msg'>Send Message</span></button>
                    </form>
                  </div>
           </div>   
          </div>
      </div>
  )
}

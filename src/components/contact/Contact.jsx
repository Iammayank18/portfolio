import React, { useEffect, useRef } from 'react';
import './Contact.css'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineFacebook, AiOutlineWhatsApp ,AiOutlineMail} from 'react-icons/ai'
import Loader from '../../static/images/sun2.gif'
import $ from 'jquery'
const Cntact = () => {
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
        console.log(result.text);
        console.log('sdsaf')
        e.target.reset();
        notify();
           setTimeout(() => {
      $('.msg').html(`<h3>Send Message</h3>`);
    }
      , 2000);
      }, (error) => {
          console.log(error.text);
      });
  };


 



  const style = {
  width: '2%',
}

  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact me</h2>
      <div className="container con__container">
        <div className="con__options">
          <article className="contact__option">
            <AiOutlineMail className='con__icon'/>
            <h4>Email</h4>
            <h5>mayank.sanyank@gmail.com</h5>
            <a href="mailto:mayank.sanyank@gmail.com" rel="noreferrer" target="_blank">Send Message</a>
          </article>
       
        
          <article className="contact__option">
            <AiOutlineFacebook className='con__icon'/>
            <h4>Messenger</h4>
            <h5>Mayank</h5>
            <a href="mailto:mayank.sanyank@gmail.com" rel="noreferrer" target="_blank">Send Message</a>
          </article>
      
     
          <article className="contact__option">
            <AiOutlineWhatsApp className='con__icon'/>
            <h4>Whatsapp</h4>
            <h5>Mayank</h5>
            <a href="mailto:mayank.sanyank@gmail.com" rel="noreferrer" target="_blank">Send Message</a>
       
          </article>
          </div>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text"  name="name" id="" placeholder='Full Name' required/>
          <input type="email"  name="email" id="" placeholder='Email' required/>
          <textarea name="message" id="" cols="30" rows="10" placeholder='Message'></textarea>
          <button type="submit" value="Send Message" className='btn btn-primary' id='sub_button'><span className='msg'>Send Message</span></button>
        </form>
      </div>
    </section>
  )
}

export default Cntact
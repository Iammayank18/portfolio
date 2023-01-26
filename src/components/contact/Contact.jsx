import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Spin } from "antd";
import {
  AiOutlineFacebook,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";
// import Loader from "../../static/images/sun2.gif";
import $ from "jquery";

let arr = [
  {
    title: "Email",
    data: "mayank.sanyank@gmail.com",
    icon: <AiOutlineMail className="con__icon" />,
  },
  {
    title: "Messenger",
    data: "mayank.sanyank@gmail.com",
    icon: <AiOutlineFacebook className="con__icon" />,
  },
  {
    title: "Whatsapp",
    data: "mayank.sanyank@gmail.com",
    icon: <AiOutlineWhatsApp className="con__icon" />,
  },
];
const Cntact = () => {
  const notify = () =>
    toast.success("🦄 Mail Sended", {
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
    $(".msg").html(`<h3>Sending...</h3>`);

    emailjs
      .sendForm(
        "service_qog4csa",
        "template_7ooi7g6",
        form.current,
        "8AnB9nzXg3iA1Rt0A"
      )
      .then(
        (result) => {
          $(".msg").html("<h3>Message Sent</h3>");
          console.log(result.text);
          console.log("sdsaf");
          e.target.reset();
          notify();
          setTimeout(() => {
            $(".msg").html(`<h3>Send Message</h3>`);
          }, 2000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section id="contact" className="h-screen">
      <h5 className="text-4xl dark:text-white text-gray-500 main__logo">
        Get In Touch
      </h5>
      <h2>Contact me</h2>
      <div className="container con__container">
        <div className="">
          {arr.map((item, i) => (
            <article
              key={i}
              className="dark:bg-slate-800 dark:text-slate-200 bg-slate-100 text-gray-500 p-5 py-7  rounded-2xl mb-2 leading-relaxed z-10 relative"
            >
              {item.icon}
              <h4>{item.title}</h4>
              <h5>{item.data}</h5>
              <a href={`mailto:${item.data}`} rel="noreferrer" target="_blank">
                Send Message
              </a>
            </article>
          ))}
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Full Name"
            required
            className="p-3 dark:text-white"
          />
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            required
            className="p-3 dark:text-white"
          />
          <textarea
            name="message"
            id=""
            cols="30"
            rows={"10"}
            placeholder="Message"
            className="p-3 dark:text-white"
          ></textarea>
          <button
            type="submit"
            value="Send Message"
            className="btn btn-primary"
            id="sub_button"
          >
            <span className="msg">Send Message</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Cntact;

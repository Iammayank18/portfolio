import React from "react";
import Header from "./header/Header";
import Nav from "./nav/Nav";
import About from "./about/About";
import Exp from "./exp/Exp";
import Services from "./services/Services";
import Portfolio from "./portfolio/Portfolio";
import Testimonial from "./testimonial/Testimonial";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";
import Darkmode from "./darkmode/Darkmode";
import { ToastContainer } from "react-toastify";
import { Pop } from "./popupForm/Pop";
import Newsletter from "./newsletter/Newsletter";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Exp />
      {/* <Services /> */}
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
      <Darkmode />
      <Pop />
      <Newsletter />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CustomCursor
        targets={[".link", ".your-css-selector"]}
        customClass="custom-cursor"
        dimensions={60}
        strokeColor="#a891e9"
        strokeWidth={10}
        fill="#6363cc"
        smoothness={{
          movement: 0.2,
          scale: 0.3,
          opacity: 0.2
        }}
        opacity={1}
      />
    </>
  );
};

export default App;

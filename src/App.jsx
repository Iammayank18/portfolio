import React, { useState } from "react";
import Header from "../src/components/header/Header";
import Nav from "../src/components/nav/Nav";
import About from "../src/components/about/About";
import Exp from "../src/components/exp/Exp";
import Services from "../src/components/services/Services";
import Portfolio from "../src/components/portfolio/Portfolio";
import Testimonial from "../src/components/testimonial/Testimonial";
import Contact from "../src/components/contact/Contact";
import Footer from "../src/components/footer/Footer";
import Darkmode from "../src/components/darkmode/Darkmode";
import { ToastContainer } from "react-toastify";
import { Pop } from "../src/components/popupForm/Pop";
import Newsletter from "../src/components/newsletter/Newsletter";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particleOptions } from "./tsparticleOptions";
import Home from "../src/components/Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="experience" element={<Exp />} />
        <Route path="works" element={<Portfolio />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      {/* <div className="lg:hidden">
        <Nav />
      </div> */}
      {/* <Testimonial /> */}
      {/* <Footer /> */}
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
          opacity: 0.2,
        }}
        opacity={1}
      />
      <Particles options={particleOptions.option1} init={particlesInit} />
    </BrowserRouter>
  );
}

export default App;

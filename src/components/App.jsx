import React from 'react'
import Header from './header/Header';
import Nav from './nav/Nav';
import About from './about/About';
import Exp from './exp/Exp';
import Services from './services/Services';
import Portfolio from './portfolio/Portfolio';
import Testimonial from './testimonial/Testimonial';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import Darkmode from './darkmode/Darkmode';
import { ToastContainer } from 'react-toastify';
import { Pop } from './popupForm/Pop';
const App = () => {
  return (
    <>
      <Header />
       <Nav />
      <About />
     <Exp />
      <Services />
      <Portfolio />
       <Testimonial/>
        <Contact />
      <Footer />
      <Darkmode />
      <Pop />
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
    </>
  )
}

export default App
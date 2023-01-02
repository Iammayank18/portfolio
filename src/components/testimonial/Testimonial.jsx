import React from "react";
import "./Test.css";
import { FaUserNinja } from "react-icons/fa";

// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const data = [
  {
    id: 1,
    name: "client 1",
    img: <FaUserNinja />,
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repudiandae autem placeat fuga dolores!"
  },
  {
    id: 2,
    name: "client 1",
    img: <FaUserNinja />,
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repudiandae autem placeat fuga dolores!"
  },
  {
    id: 3,
    name: "client 1",
    img: <FaUserNinja />,
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repudiandae autem placeat fuga dolores!"
  },
  {
    id: 4,
    name: "client 1",
    img: <FaUserNinja />,
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repudiandae autem placeat fuga dolores!"
  }
];
const testimonial = () => {
  return (
    <section id="testimonial">
      <h5>Review From Client</h5>
      <h2>Testimonial</h2>
      <Swiper
        className="container test__container"
        modules={[Pagination, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false
        }}
        loop={true}
      >
        {data.map(({ id, name, img, text }) => {
          return (
            <SwiperSlide className="testimonial">
              <div className="client_img">{img}</div>
              <h4 className="client__name">{name}</h4>
              <small className="client__review">{text}</small>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default testimonial;

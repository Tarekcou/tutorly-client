import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../Swiper/SwiperSlider.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default () => {
  // const displayToast = () => {
  //   toast("CLicked");
  // };

  const sliderArray = [
    {
      id: 1,
      img: "https://img.freepik.com/premium-photo/basketball-banner-background-basketball-banner-concept-with-copy-space-sport-balls-dark-background-mixed-media-illustration_1028938-113166.jpg",
      title: "Elevate Your Game with Premium Basketball Gear",
      details:
        "Gear up for the court with our top-of-the-line basketball equipment. From durable basketballs to performance-enhancing shoes and supportive apparel, we have everything you need to improve your game and dominate the competition. Whether you're practicing your free throws or playing in the big league, our gear will help you perform at your best.",
    },
    {
      id: 2,
      img: "https://t3.ftcdn.net/jpg/02/71/50/50/360_F_271505083_nAvK5RA4G4PaP4XGzPmzFPA8BRKk4yVh.jpg",
      title: "Score Big with High-Quality Football Equipment",
      details:
        "Take your game to the next level with our football gear, designed for both amateur and professional players. Our collection includes protective pads, footballs, cleats, and training accessories that enhance performance and keep you safe on the field. Gear up with trusted brands and hit the field with confidence!",
    },
    {
      id: 3,
      img: "https://www.shutterstock.com/image-photo/tennis-banner-sport-composition-yellow-260nw-2099340745.jpg",
      title: "Ace Your Match with Top Tennis Gear",
      details:
        "Whether you're a beginner or a seasoned pro, our tennis equipment has you covered. Choose from a variety of high-performance rackets, comfortable footwear, and accessories to help you improve your game. Serve, volley, and smash your way to victory with gear that’s as fast as your serve.",
    },
  ];
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        slidesPerView={"auto"}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{ dynamicBullets: true, clickable: true }}
        className="flex items-center"
      >
        {sliderArray.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className={`relative flex bg-cover bg-no-repeat min-h-screen items-center  p-10 justify-center lg:${
              index == 0 ? "!justify-start" : "!justify-end"
            } `}
            style={{
              backgroundImage: `url(${slide.img})`,
            }}
          >
            <div
              className={`flex flex-col justify-end  gap-8 w-10/12 lg:w-8/12  text-white  items-center lg:p-10 pt-10`}
            >
              <h1 className="font-bold text-3xl text-white md:text-6xl">
                {slide.title}
              </h1>
              <p className="text-xs text-yellow-600 lg:text-base">
                {slide.details}
              </p>
              <Link
                to={"/main/allfeatureproducts"}
                className="w-1/2 btn btn-neutral"
              >
                Shop Now →
              </Link>
            </div>
          </SwiperSlide>
        ))}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Swiper>
    </div>
  );
};

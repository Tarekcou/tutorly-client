import React from "react";
import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";
import four from "../assets/four.jpg";
import Navbar from "./Navbar";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="relative">
      <div className="top-1/3 right-1/3 z-50 absolute space-y-5 w-1/2 text-white">
        <h1 className="font-bold text-6xl">
          Learn faster with your best language tutor.
        </h1>
        <button className="text-xl btn btn-neutral">
          Get Started <FaArrowRight />
        </button>
      </div>
      <div className="relative w-full h-[calc(100vh-50px)] carousel">
        <div id="slide1" className="relative w-full carousel-item">
          <img src={one} className="w-full" />

          <div className="top-1/2 right-5 left-5 absolute flex justify-between transform -translate-y-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="relative w-full carousel-item">
          <img src={two} className="w-full" />
          <div className="top-1/2 right-5 left-5 absolute flex justify-between transform -translate-y-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="relative w-full carousel-item">
          <img src={three} className="w-full" />
          <div className="top-1/2 right-5 left-5 absolute flex justify-between transform -translate-y-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="relative w-full carousel-item">
          <img src={four} className="w-full" />
          <div className="top-1/2 right-5 left-5 absolute flex justify-between transform -translate-y-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

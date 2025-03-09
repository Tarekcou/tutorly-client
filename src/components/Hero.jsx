import React from "react";
import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";
import four from "../assets/four.jpg";
import Navbar from "./Navbar";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <div className="top-1/3 md:right-1/2 left-1/4 z-10 absolute space-y-5 w-1/2 text-white text-center">
        <h1 className="font-bold text-4xl md:text-6xl">
          Learn faster with your best language tutor.
        </h1>
        <Link
          to={"/find-tutors"}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xl btn btn-neutral btn-sm md:btn-md"
        >
          Get Started <FaArrowRight />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-[calc(100vh-50px)] carousel">
        {[one, two, three, four].map((image, index) => (
          <div
            key={index}
            id={`slide${index + 1}`}
            className="relative w-full carousel-item"
          >
            {/* Image */}
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Navigation Buttons */}
            <div className="top-1/2 right-5 left-5 absolute flex justify-between -translate-y-1/2 transform">
              <a
                href={`#slide${index === 0 ? 4 : index}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${index === 3 ? 1 : index + 2}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
